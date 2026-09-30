"use client";

import { useEffect, useRef, useState } from "react";
import { boyutMetni } from "../../converter/gorsel/formatlar";
import DosyaBirak from "../gorsel/DosyaBirak";
import { bitmapAc, indir } from "../gorsel/tuval";
import { pdfAc, sayfaCiz, type PdfBelge } from "./pdfjs";

type Oge = {
  id: number;
  sayfa: number; // 0 tabanlı
  /** Merkez konumu, sayfa genişliği/yüksekliğine oranla (0–1). */
  x: number;
  y: number;
  /** Genişlik, sayfa genişliğine oranla. */
  gen: number;
  resim: HTMLCanvasElement;
  url: string;
  tur: "imza" | "metin";
};

const RENKLER = [
  { ad: "Siyah", deger: "#111111" },
  { ad: "Mavi", deger: "#1a3fa6" },
];

const YAZI_TIPLERI = [
  {
    ad: "El yazısı",
    css: '"Segoe Script", "Brush Script MT", "Snell Roundhand", cursive',
  },
  { ad: "İtalik", css: 'Georgia, "Times New Roman", serif' },
];

/** Tuvaldeki boş (saydam) kenarları kırpar. */
function kirp(c: HTMLCanvasElement): HTMLCanvasElement | null {
  const x = c.getContext("2d")!;
  const { data, width: w, height: h } = x.getImageData(0, 0, c.width, c.height);
  let x0 = w,
    y0 = h,
    x1 = -1,
    y1 = -1;
  for (let y = 0; y < h; y++)
    for (let i = 0; i < w; i++)
      if (data[(y * w + i) * 4 + 3] > 8) {
        if (i < x0) x0 = i;
        if (i > x1) x1 = i;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
  if (x1 < 0) return null;
  const p = 6;
  x0 = Math.max(0, x0 - p);
  y0 = Math.max(0, y0 - p);
  x1 = Math.min(w - 1, x1 + p);
  y1 = Math.min(h - 1, y1 + p);
  const o = document.createElement("canvas");
  o.width = x1 - x0 + 1;
  o.height = y1 - y0 + 1;
  o.getContext("2d")!.drawImage(c, -x0, -y0);
  return o;
}

/** Yazıyı saydam tuvale çizer (yazılı imza veya tarih). */
function metinTuvali(metin: string, font: string, renk: string, px = 96) {
  const c = document.createElement("canvas");
  const x = c.getContext("2d")!;
  x.font = `${px}px ${font}`;
  c.width = Math.ceil(x.measureText(metin).width + px * 0.6);
  c.height = Math.ceil(px * 1.6);
  x.font = `${px}px ${font}`;
  x.fillStyle = renk;
  x.textBaseline = "middle";
  x.fillText(metin, px * 0.3, c.height / 2);
  return kirp(c);
}

/** Fotoğrafı çekilmiş imzada açık renkli zemini saydam yapar. */
async function zeminiSil(dosya: File, renk: string) {
  const b = await bitmapAc(dosya);
  const k = Math.min(1, 1200 / Math.max(b.width, b.height));
  const c = document.createElement("canvas");
  c.width = Math.round(b.width * k);
  c.height = Math.round(b.height * k);
  const x = c.getContext("2d", { willReadFrequently: true })!;
  x.drawImage(b, 0, 0, c.width, c.height);
  b.close();
  const d = x.getImageData(0, 0, c.width, c.height);
  const [r, g, bl] = [1, 3, 5].map((i) => parseInt(renk.slice(i, i + 2), 16));
  for (let i = 0; i < d.data.length; i += 4) {
    const l = 0.299 * d.data[i] + 0.587 * d.data[i + 1] + 0.114 * d.data[i + 2];
    // Açık pikseller saydam; koyular seçilen mürekkep rengine boyanır.
    const a = Math.max(0, Math.min(255, ((190 - l) / 90) * 255));
    d.data[i] = r;
    d.data[i + 1] = g;
    d.data[i + 2] = bl;
    d.data[i + 3] = Math.round(a * (d.data[i + 3] / 255));
  }
  x.putImageData(d, 0, 0);
  return kirp(c);
}

const bugun = () =>
  new Date().toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

/** PDF'e çizilmiş, yazılmış veya yüklenmiş imza ve tarih ekler. */
export default function PdfImza() {
  const [dosya, setDosya] = useState<File | null>(null);
  const [toplam, setToplam] = useState(0);
  const [sayfa, setSayfa] = useState(0);
  const [sayfaResmi, setSayfaResmi] = useState("");
  const [mod, setMod] = useState<"ciz" | "yaz" | "yukle">("ciz");
  const [renk, setRenk] = useState(RENKLER[0].deger);
  const [ad, setAd] = useState("");
  const [yaziTipi, setYaziTipi] = useState(0);
  const [imza, setImza] = useState<{
    c: HTMLCanvasElement;
    url: string;
  } | null>(null);
  const [ogeler, setOgeler] = useState<Oge[]>([]);
  const [secili, setSecili] = useState<number | null>(null);
  const [sonuc, setSonuc] = useState<{ url: string; boyut: number } | null>(
    null,
  );
  const [hata, setHata] = useState("");
  const [calisiyor, setCalisiyor] = useState(false);
  const veri = useRef<Uint8Array | null>(null);
  const belge = useRef<PdfBelge | null>(null);
  const ped = useRef<HTMLCanvasElement>(null);
  const cizim = useRef<{ x: number; y: number } | null>(null);
  const alan = useRef<HTMLDivElement>(null);
  const surukle = useRef<{ id: number; dx: number; dy: number } | null>(null);
  const sayac = useRef(0);
  const url = useRef<string | null>(null);

  useEffect(
    () => () => {
      if (url.current) URL.revokeObjectURL(url.current);
      void belge.current?.destroy();
    },
    [],
  );

  const sonucTemizle = () => {
    if (url.current) URL.revokeObjectURL(url.current);
    url.current = null;
    setSonuc(null);
  };

  const ac = async (d: File[]) => {
    sonucTemizle();
    setHata("");
    try {
      const v = new Uint8Array(await d[0].arrayBuffer());
      await belge.current?.destroy();
      belge.current = await pdfAc(v);
      veri.current = v;
      setToplam(belge.current.numPages);
      setDosya(d[0]);
      setOgeler([]);
      setSayfa(0);
      await sayfaGoster(0);
    } catch (e) {
      setHata(e instanceof Error ? e.message : "PDF okunamadı.");
      setDosya(null);
    }
  };

  const sayfaGoster = async (n: number) => {
    const b = belge.current;
    if (!b) return;
    setSayfa(n);
    setSecili(null);
    const c = await sayfaCiz(b, n + 1, 1.5);
    setSayfaResmi(c.toDataURL("image/jpeg", 0.85));
  };

  // Çizim pedi
  const pedKonum = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const c = e.currentTarget;
    const r = c.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) * c.width) / r.width,
      y: ((e.clientY - r.top) * c.height) / r.height,
    };
  };
  const pedTemizle = () => {
    const c = ped.current;
    c?.getContext("2d")!.clearRect(0, 0, c.width, c.height);
  };

  const imzaHazirla = async (f?: File) => {
    setHata("");
    let c: HTMLCanvasElement | null = null;
    if (mod === "ciz" && ped.current) c = kirp(ped.current);
    else if (mod === "yaz" && ad.trim())
      c = metinTuvali(ad.trim(), YAZI_TIPLERI[yaziTipi].css, renk);
    else if (mod === "yukle" && f) {
      try {
        c = await zeminiSil(f, renk);
      } catch {
        setHata("Görsel açılamadı.");
        return;
      }
    }
    if (!c) {
      setHata(
        mod === "ciz"
          ? "Önce kutuya imzanızı çizin."
          : mod === "yaz"
            ? "Adınızı yazın."
            : "İmza görseli seçin.",
      );
      return;
    }
    setImza({ c, url: c.toDataURL("image/png") });
  };

  const yerlestir = (
    resim: HTMLCanvasElement,
    tur: Oge["tur"],
    x = 0.7,
    y = 0.85,
  ) => {
    sonucTemizle();
    const id = ++sayac.current;
    const gen = tur === "imza" ? 0.25 : Math.min(0.2, resim.width / 1600);
    setOgeler((l) => [
      ...l,
      { id, sayfa, x, y, gen, resim, url: resim.toDataURL("image/png"), tur },
    ]);
    setSecili(id);
  };

  const guncelle = (id: number, p: Partial<Oge>) => {
    sonucTemizle();
    setOgeler((l) => l.map((o) => (o.id === id ? { ...o, ...p } : o)));
  };

  const kaydet = async () => {
    if (!veri.current || !dosya || !ogeler.length) return;
    setCalisiyor(true);
    setHata("");
    try {
      const { katmanEkle } = await import("../../converter/pdf/pdfIslem");
      const sayfalar = [...new Set(ogeler.map((o) => o.sayfa))].sort(
        (a, b) => a - b,
      );
      const pdf = await katmanEkle(
        veri.current,
        async (w, h, i) => {
          const k = Math.min(3, 3000 / Math.max(w, h));
          const c = document.createElement("canvas");
          c.width = Math.round(w * k);
          c.height = Math.round(h * k);
          const x = c.getContext("2d")!;
          x.imageSmoothingQuality = "high";
          for (const o of ogeler.filter((o) => o.sayfa === i)) {
            const ow = o.gen * c.width;
            const oh = (ow * o.resim.height) / o.resim.width;
            x.drawImage(
              o.resim,
              o.x * c.width - ow / 2,
              o.y * c.height - oh / 2,
              ow,
              oh,
            );
          }
          const b = await new Promise<Blob | null>((r) =>
            c.toBlob(r, "image/png"),
          );
          return b ? new Uint8Array(await b.arrayBuffer()) : null;
        },
        sayfalar,
        false,
      );
      sonucTemizle();
      const blob = new Blob([pdf as BlobPart], { type: "application/pdf" });
      url.current = URL.createObjectURL(blob);
      setSonuc({ url: url.current, boyut: blob.size });
      indir(url.current, dosya.name.replace(/\.pdf$/i, "") + "-imzali.pdf");
    } catch (e) {
      setHata(e instanceof Error ? e.message : "Kaydedilemedi.");
    } finally {
      setCalisiyor(false);
    }
  };

  const seciliOge = ogeler.find((o) => o.id === secili);
  const buSayfa = ogeler.filter((o) => o.sayfa === sayfa);

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak
        tur="pdf"
        coklu={false}
        max={1}
        baslik={dosya ? "Başka bir PDF seçin" : "İmzalanacak PDF'i seçin"}
        onSec={(d) => void ac(d)}
      />

      <div className="date-calc-input">
        <div
          className="date-converter-modes"
          role="tablist"
          aria-label="İmza türü"
        >
          {(
            [
              ["ciz", "✍️ Çiz"],
              ["yaz", "Aa Yaz"],
              ["yukle", "🖼 Yükle"],
            ] as const
          ).map(([m, etiket]) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mod === m}
              className={mod === m ? "is-active" : undefined}
              onClick={() => setMod(m)}
            >
              {etiket}
            </button>
          ))}
        </div>

        <div className="pdf-imza-renk" role="group" aria-label="Mürekkep rengi">
          {RENKLER.map((r) => (
            <button
              key={r.deger}
              type="button"
              aria-pressed={renk === r.deger}
              aria-label={r.ad}
              title={r.ad}
              className={renk === r.deger ? "is-active" : undefined}
              style={{ background: r.deger }}
              onClick={() => setRenk(r.deger)}
            />
          ))}
        </div>

        {mod === "ciz" ? (
          <div className="pdf-imza-ped">
            <canvas
              ref={ped}
              width={600}
              height={200}
              aria-label="İmza çizim alanı"
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                cizim.current = pedKonum(e);
              }}
              onPointerMove={(e) => {
                if (!cizim.current) return;
                const p = pedKonum(e);
                const x = e.currentTarget.getContext("2d")!;
                x.strokeStyle = renk;
                x.lineWidth = 3.2;
                x.lineCap = "round";
                x.lineJoin = "round";
                x.beginPath();
                x.moveTo(cizim.current.x, cizim.current.y);
                x.lineTo(p.x, p.y);
                x.stroke();
                cizim.current = p;
              }}
              onPointerUp={() => {
                cizim.current = null;
              }}
            />
            <div className="pdf-imza-ped-alt">
              <span>Fare, parmak veya kalemle imzanızı atın</span>
              <button type="button" onClick={pedTemizle}>
                Temizle
              </button>
            </div>
          </div>
        ) : mod === "yaz" ? (
          <div className="date-calc-fields">
            <label className="date-calc-field">
              <span>Adınız soyadınız</span>
              <span className="date-calc-field-row">
                <input
                  type="text"
                  value={ad}
                  maxLength={60}
                  onChange={(e) => setAd(e.target.value)}
                  placeholder="Ayşe Yılmaz"
                />
              </span>
            </label>
            <label className="date-calc-field">
              <span>Yazı tipi</span>
              <span className="date-calc-field-row">
                <select
                  value={yaziTipi}
                  onChange={(e) => setYaziTipi(Number(e.target.value))}
                >
                  {YAZI_TIPLERI.map((y, i) => (
                    <option key={y.ad} value={i}>
                      {y.ad}
                    </option>
                  ))}
                </select>
              </span>
            </label>
          </div>
        ) : (
          <label className="date-calc-field">
            <span>
              Beyaz kâğıda attığınız imzanın fotoğrafı (zemin otomatik silinir)
            </span>
            <span className="date-calc-field-row">
              <input
                type="file"
                accept="image/*,.heic,.heif"
                onChange={(e) => void imzaHazirla(e.target.files?.[0])}
              />
            </span>
          </label>
        )}
        {mod !== "yukle" ? (
          <button
            type="button"
            className="time-tool-button is-secondary ocr-yeniden"
            onClick={() => void imzaHazirla()}
          >
            İmzayı hazırla
          </button>
        ) : null}
        {imza ? (
          <div className="pdf-imza-hazir">
            {/* eslint-disable-next-line @next/next/no-img-element -- yerel önizleme */}
            <img src={imza.url} alt="Hazırlanan imza" />
          </div>
        ) : null}
      </div>

      {dosya && sayfaResmi ? (
        <>
          <div
            className="pdf-imza-arac"
            role="toolbar"
            aria-label="Yerleştirme"
          >
            <button
              type="button"
              className="time-tool-button"
              disabled={!imza}
              onClick={() => imza && yerlestir(imza.c, "imza")}
            >
              + İmza ekle
            </button>
            <button
              type="button"
              className="time-tool-button is-secondary"
              onClick={() => {
                const c = metinTuvali(bugun(), "Arial, sans-serif", renk, 64);
                if (c) yerlestir(c, "metin", 0.3, 0.85);
              }}
            >
              + Tarih ekle
            </button>
            <span className="pdf-imza-sayfa">
              <button
                type="button"
                disabled={sayfa === 0}
                onClick={() => void sayfaGoster(sayfa - 1)}
                aria-label="Önceki sayfa"
              >
                ‹
              </button>
              Sayfa {sayfa + 1} / {toplam}
              <button
                type="button"
                disabled={sayfa >= toplam - 1}
                onClick={() => void sayfaGoster(sayfa + 1)}
                aria-label="Sonraki sayfa"
              >
                ›
              </button>
            </span>
          </div>
          {seciliOge ? (
            <div className="pdf-imza-secili">
              <label>
                Boyut
                <input
                  type="range"
                  min={0.05}
                  max={0.6}
                  step={0.01}
                  value={seciliOge.gen}
                  onChange={(e) =>
                    guncelle(seciliOge.id, { gen: Number(e.target.value) })
                  }
                  aria-label="Seçili öğenin boyutu"
                />
              </label>
              <button
                type="button"
                onClick={() => {
                  sonucTemizle();
                  setOgeler((l) => l.filter((o) => o.id !== seciliOge.id));
                  setSecili(null);
                }}
              >
                🗑 Kaldır
              </button>
              {toplam > 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    sonucTemizle();
                    const o = seciliOge;
                    setOgeler((l) => [
                      ...l,
                      ...Array.from({ length: toplam }, (_, s) => s)
                        .filter(
                          (s) =>
                            !l.some(
                              (x) =>
                                x.sayfa === s &&
                                x.resim === o.resim &&
                                x.x === o.x &&
                                x.y === o.y,
                            ),
                        )
                        .map((s) => ({ ...o, id: ++sayac.current, sayfa: s })),
                    ]);
                  }}
                >
                  Tüm sayfalara kopyala (paraf)
                </button>
              ) : null}
            </div>
          ) : null}
          <div
            className="pdf-imza-alan"
            ref={alan}
            onPointerMove={(e) => {
              const s = surukle.current;
              const r = alan.current?.getBoundingClientRect();
              if (!s || !r) return;
              guncelle(s.id, {
                x: Math.min(
                  1,
                  Math.max(0, (e.clientX - r.left) / r.width - s.dx),
                ),
                y: Math.min(
                  1,
                  Math.max(0, (e.clientY - r.top) / r.height - s.dy),
                ),
              });
            }}
            onPointerUp={() => {
              surukle.current = null;
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- yerel önizleme */}
            <img
              src={sayfaResmi}
              alt={`Sayfa ${sayfa + 1}`}
              draggable={false}
            />
            {buSayfa.map((o) => (
              // eslint-disable-next-line @next/next/no-img-element -- yerel önizleme
              <img
                key={o.id}
                src={o.url}
                alt={o.tur === "imza" ? "İmza" : "Tarih"}
                draggable={false}
                className={`pdf-imza-oge${o.id === secili ? " is-secili" : ""}`}
                style={{
                  left: `${o.x * 100}%`,
                  top: `${o.y * 100}%`,
                  width: `${o.gen * 100}%`,
                }}
                onPointerDown={(e) => {
                  e.preventDefault();
                  const r = alan.current!.getBoundingClientRect();
                  alan.current!.setPointerCapture(e.pointerId);
                  surukle.current = {
                    id: o.id,
                    dx: (e.clientX - r.left) / r.width - o.x,
                    dy: (e.clientY - r.top) / r.height - o.y,
                  };
                  setSecili(o.id);
                }}
              />
            ))}
          </div>
          <div className="gorsel-alt">
            <span>
              {ogeler.length
                ? `${ogeler.length} öğe · sürükleyerek konumlandırın`
                : "İmzanızı hazırlayıp “İmza ekle” deyin"}
            </span>
            <button
              type="button"
              className="time-tool-button"
              disabled={!ogeler.length || calisiyor}
              onClick={() => void kaydet()}
            >
              {calisiyor ? "Kaydediliyor…" : "İmzalı PDF'i indir"}
            </button>
            {sonuc ? (
              <a
                className="time-tool-button is-secondary"
                href={sonuc.url}
                download={dosya.name.replace(/\.pdf$/i, "") + "-imzali.pdf"}
              >
                Tekrar indir ({boyutMetni(sonuc.boyut)})
              </a>
            ) : null}
          </div>
        </>
      ) : null}
      {hata ? <p className="gorsel-hata">{hata}</p> : null}
      <p className="date-calc-note">
        İmzanız ve PDF tarayıcınızda işlenir, hiçbir sunucuya yüklenmez ve
        saklanmaz. Bu araç imzanın görüntüsünü ekler; 5070 sayılı Elektronik
        İmza Kanunu&apos;ndaki güvenli elektronik imza (e-imza) yerine geçmez.
      </p>
    </div>
  );
}
