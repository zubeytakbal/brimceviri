"use client";

import { useEffect, useRef, useState } from "react";
import {
  boyutMetni,
  ciktiAdi,
  FORMATLAR,
  formatTahmin,
  type GorselFormat,
} from "../../converter/gorsel/formatlar";
import type { Bolge } from "../../converter/gorsel/sikistirma";
import DosyaBirak from "./DosyaBirak";
import { bitmapAc } from "./tuval";

type Etki = "bulanik" | "piksel" | "siyah";
type Alan = Bolge & { id: number; etki: Etki };

const ETKILER: Array<{ id: Etki; ad: string }> = [
  { id: "bulanik", ad: "Bulanık" },
  { id: "piksel", ad: "Pikselli (mozaik)" },
  { id: "siyah", ad: "Siyah kutu" },
];

/**
 * Bir alana etki uygular. Bulanıklık ve mozaik, alanı çok küçültüp geri büyüterek yapılır
 * (her tarayıcıda aynı sonuç; ayrıntı geri kazanılamaz).
 */
function etkiUygula(
  ctx: CanvasRenderingContext2D,
  kaynak: CanvasImageSource,
  a: Alan,
  guc: number,
  olcek = 1,
) {
  const x = Math.round(a.x * olcek);
  const y = Math.round(a.y * olcek);
  const w = Math.max(1, Math.round(a.w * olcek));
  const h = Math.max(1, Math.round(a.h * olcek));
  if (a.etki === "siyah") {
    ctx.fillStyle = "#000000";
    ctx.fillRect(x, y, w, h);
    return;
  }
  // güç 1–10: blok boyutu alanın kısa kenarının %12–%50 arası (yazının okunmaması için iri tutulur)
  const blok = Math.max(
    2,
    (Math.min(w, h) * (a.etki === "piksel" ? 8 + guc * 4 : 10 + guc * 4)) /
      100,
  );
  const kw = Math.max(1, Math.round(w / blok));
  const kh = Math.max(1, Math.round(h / blok));
  const kucuk = document.createElement("canvas");
  kucuk.width = kw;
  kucuk.height = kh;
  const kx = kucuk.getContext("2d")!;
  kx.imageSmoothingEnabled = true;
  kx.imageSmoothingQuality = "high";
  kx.drawImage(kaynak, a.x, a.y, a.w, a.h, 0, 0, kw, kh);
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.imageSmoothingEnabled = a.etki === "bulanik";
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(kucuk, x, y, w, h);
  ctx.restore();
}

/** Fotoğrafta seçilen alanları bulanıklaştırır, pikselleştirir veya siyah kutuyla kapatır. */
export default function FotoBulanik() {
  const [dosya, setDosya] = useState<File | null>(null);
  const [bitmap, setBitmap] = useState<ImageBitmap | null>(null);
  const [alanlar, setAlanlar] = useState<Alan[]>([]);
  const [etki, setEtki] = useState<Etki>("bulanik");
  const [guc, setGuc] = useState(6);
  const [cizim, setCizim] = useState<Bolge | null>(null);
  const [sonuc, setSonuc] = useState<{
    url: string;
    ad: string;
    boyut: number;
  } | null>(null);
  const [hata, setHata] = useState("");
  const tuval = useRef<HTMLCanvasElement>(null);
  const baslangic = useRef<{ x: number; y: number } | null>(null);
  const sayac = useRef(0);
  const sonucUrl = useRef<string | null>(null);
  const bmRef = useRef<ImageBitmap | null>(null);

  useEffect(
    () => () => {
      bmRef.current?.close();
      if (sonucUrl.current) URL.revokeObjectURL(sonucUrl.current);
    },
    [],
  );

  // Önizleme: küçültülmüş görsel + etkiler + çizilmekte olan alan.
  useEffect(() => {
    const c = tuval.current;
    if (!c || !bitmap) return;
    const k = Math.min(1, 1000 / Math.max(bitmap.width, bitmap.height));
    c.width = Math.round(bitmap.width * k);
    c.height = Math.round(bitmap.height * k);
    const ctx = c.getContext("2d")!;
    ctx.drawImage(bitmap, 0, 0, c.width, c.height);
    for (const a of alanlar) etkiUygula(ctx, bitmap, a, guc, k);
    ctx.lineWidth = 2;
    for (const a of alanlar) {
      ctx.strokeStyle = "rgba(255,255,255,0.9)";
      ctx.setLineDash([6, 4]);
      ctx.strokeRect(a.x * k, a.y * k, a.w * k, a.h * k);
    }
    if (cizim) {
      ctx.setLineDash([]);
      ctx.strokeStyle = "#f0b429";
      ctx.strokeRect(cizim.x * k, cizim.y * k, cizim.w * k, cizim.h * k);
    }
  }, [bitmap, alanlar, guc, cizim]);

  const sonucTemizle = () => {
    if (sonucUrl.current) URL.revokeObjectURL(sonucUrl.current);
    sonucUrl.current = null;
    setSonuc(null);
  };

  const ac = async (d: File[]) => {
    setHata("");
    sonucTemizle();
    try {
      const b = await bitmapAc(d[0]);
      bmRef.current?.close();
      bmRef.current = b;
      setBitmap(b);
      setDosya(d[0]);
      setAlanlar([]);
    } catch (e) {
      setHata(e instanceof Error ? e.message : "Hata");
    }
  };

  const nokta = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const k = bitmap!.width / r.width;
    return {
      x: Math.min(bitmap!.width, Math.max(0, (e.clientX - r.left) * k)),
      y: Math.min(bitmap!.height, Math.max(0, (e.clientY - r.top) * k)),
    };
  };
  const kutu = (
    a: { x: number; y: number },
    b: { x: number; y: number },
  ): Bolge => ({
    x: Math.round(Math.min(a.x, b.x)),
    y: Math.round(Math.min(a.y, b.y)),
    w: Math.round(Math.abs(a.x - b.x)),
    h: Math.round(Math.abs(a.y - b.y)),
  });

  const kaydet = async () => {
    if (!bitmap || !dosya) return;
    const c = document.createElement("canvas");
    c.width = bitmap.width;
    c.height = bitmap.height;
    const ctx = c.getContext("2d")!;
    ctx.drawImage(bitmap, 0, 0);
    for (const a of alanlar) etkiUygula(ctx, bitmap, a, guc);
    const format: GorselFormat = formatTahmin(dosya.name, dosya.type) ?? "jpg";
    const f = FORMATLAR[format];
    const blob = await new Promise<Blob | null>((r) =>
      c.toBlob(r, f.mime, f.kaliteli ? 0.92 : undefined),
    );
    if (!blob) return;
    sonucTemizle();
    const url = URL.createObjectURL(blob);
    sonucUrl.current = url;
    setSonuc({
      url,
      ad: ciktiAdi(dosya.name, format).replace(/(\.[a-z]+)$/, "-sansurlu$1"),
      boyut: blob.size,
    });
  };

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak
        baslik={bitmap ? "Başka bir fotoğraf seçin" : "Fotoğraf seçin"}
        max={1}
        coklu={false}
        onSec={(d) => void ac(d)}
      />
      {hata ? <p className="gorsel-hata">{hata}</p> : null}
      {bitmap ? (
        <>
          <div className="date-calc-input">
            <div
              className="date-converter-modes"
              role="radiogroup"
              aria-label="Yeni alan için etki"
            >
              {ETKILER.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  role="radio"
                  aria-checked={etki === x.id}
                  className={etki === x.id ? "is-active" : undefined}
                  onClick={() => setEtki(x.id)}
                >
                  {x.ad}
                </button>
              ))}
            </div>
            <div className="date-calc-fields">
              <label className="date-calc-field">
                <span>Etki gücü: {guc}</span>
                <span className="date-calc-field-row">
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={guc}
                    onChange={(e) => {
                      setGuc(Number(e.target.value));
                      sonucTemizle();
                    }}
                    aria-label="Etki gücü"
                  />
                </span>
              </label>
            </div>
          </div>
          <p className="bulanik-ipucu">
            Kapatmak istediğiniz yüzün, plakanın veya yazının üzerinde
            sürükleyerek bir alan çizin. Birden fazla alan ekleyebilirsiniz.
          </p>
          <div className="filigran-onizleme">
            <canvas
              ref={tuval}
              className="bulanik-tuval"
              aria-label="Fotoğraf: alan çizmek için sürükleyin"
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                baslangic.current = nokta(e);
              }}
              onPointerMove={(e) => {
                if (baslangic.current)
                  setCizim(kutu(baslangic.current, nokta(e)));
              }}
              onPointerUp={(e) => {
                const s = baslangic.current;
                baslangic.current = null;
                setCizim(null);
                if (!s) return;
                const b = kutu(s, nokta(e));
                if (b.w < 8 || b.h < 8) return;
                sonucTemizle();
                setAlanlar((l) => [...l, { ...b, id: ++sayac.current, etki }]);
              }}
            />
          </div>
          {alanlar.length ? (
            <ul className="bulanik-alanlar">
              {alanlar.map((a, i) => (
                <li key={a.id}>
                  <span>
                    Alan {i + 1}: {a.w}×{a.h}
                  </span>
                  <select
                    value={a.etki}
                    aria-label={`Alan ${i + 1} etkisi`}
                    onChange={(e) => {
                      sonucTemizle();
                      setAlanlar((l) =>
                        l.map((x) =>
                          x.id === a.id
                            ? { ...x, etki: e.target.value as Etki }
                            : x,
                        ),
                      );
                    }}
                  >
                    {ETKILER.map((x) => (
                      <option key={x.id} value={x.id}>
                        {x.ad}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="vesikalik-sil"
                    aria-label={`Alan ${i + 1} kaldır`}
                    onClick={() => {
                      sonucTemizle();
                      setAlanlar((l) => l.filter((x) => x.id !== a.id));
                    }}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="kirp-alt">
            <button
              type="button"
              className="time-tool-button"
              disabled={!alanlar.length}
              onClick={() => void kaydet()}
            >
              Uygula
            </button>
            {sonuc ? (
              <a
                className="time-tool-button is-secondary"
                href={sonuc.url}
                download={sonuc.ad}
              >
                İndir ({boyutMetni(sonuc.boyut)})
              </a>
            ) : null}
          </div>
        </>
      ) : null}
      <p className="date-calc-note">
        Plaka, kimlik numarası veya yazı gibi okunmaması gereken bilgiler için
        &quot;Siyah kutu&quot; en güvenli seçenektir. İşlem tam çözünürlükte,
        tarayıcınızda yapılır; fotoğraf hiçbir yere yüklenmez ve konum bilgisi
        çıktıya aktarılmaz.
      </p>
    </div>
  );
}
