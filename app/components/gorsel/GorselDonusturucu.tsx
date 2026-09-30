"use client";

import { useEffect, useRef, useState } from "react";
import {
  boyutMetni,
  ciktiAdi,
  FORMAT_LISTESI,
  FORMATLAR,
  type GorselFormat,
} from "../../converter/gorsel/formatlar";
import { olcuHesapla } from "../../converter/gorsel/sikistirma";
import { zipOlustur } from "../../converter/gorsel/zip";

type Ayar = {
  hedef: GorselFormat;
  kalite: number;
  arkaPlan: string;
  genislik: number | null;
};

type Oge = {
  id: number;
  dosya: File;
  durum: "bekliyor" | "hazir" | "hata";
  hata?: string;
  cikti?: {
    blob: Blob;
    url: string;
    ad: string;
    genislik: number;
    yukseklik: number;
  };
};

const MAX_DOSYA = 30;

async function donustur(dosya: File, a: Ayar) {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(dosya);
  } catch {
    throw new Error(
      "Bu dosya tarayıcınızda açılamadı. JPG, PNG veya WebP bir görsel seçin.",
    );
  }
  const { genislik, yukseklik } = olcuHesapla(
    { genislik: bitmap.width, yukseklik: bitmap.height },
    a.genislik && a.genislik < bitmap.width ? { genislik: a.genislik } : {},
  );
  const tuval = document.createElement("canvas");
  tuval.width = genislik;
  tuval.height = yukseklik;
  const ctx = tuval.getContext("2d")!;
  const f = FORMATLAR[a.hedef];
  if (!f.seffaflik) {
    ctx.fillStyle = a.arkaPlan;
    ctx.fillRect(0, 0, genislik, yukseklik);
  }
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bitmap, 0, 0, genislik, yukseklik);
  bitmap.close();
  const blob = await new Promise<Blob | null>((res) =>
    tuval.toBlob(res, f.mime, f.kaliteli ? a.kalite : undefined),
  );
  if (!blob) throw new Error("Görsel kaydedilemedi.");
  if (blob.type !== f.mime)
    throw new Error(
      `Tarayıcınız ${f.ad} olarak kaydetmeyi desteklemiyor. Chrome, Edge veya Firefox'un güncel sürümünü deneyin.`,
    );
  return {
    blob,
    url: URL.createObjectURL(blob),
    ad: ciktiAdi(dosya.name, a.hedef),
    genislik,
    yukseklik,
  };
}

/**
 * Görsel formatı dönüştürücü. Dosyalar kullanıcının tarayıcısında işlenir, hiçbir sunucuya yüklenmez.
 * `hedef` verilirse çıktı formatı sabittir (ör. PNG'den JPG'ye sayfası).
 */
export default function GorselDonusturucu({
  hedef,
  kaynak,
}: {
  hedef?: GorselFormat;
  kaynak?: GorselFormat;
}) {
  const [ayar, setAyar] = useState<Ayar>({
    hedef: hedef ?? "jpg",
    kalite: 0.9,
    arkaPlan: "#ffffff",
    genislik: null,
  });
  const [ogeler, setOgeler] = useState<Oge[]>([]);
  const [surukle, setSurukle] = useState(false);
  const [zipUrl, setZipUrl] = useState<string | null>(null);
  const sayac = useRef(0);
  const calisma = useRef(0);
  const urller = useRef<string[]>([]);

  useEffect(
    () => () => {
      for (const u of urller.current) URL.revokeObjectURL(u);
    },
    [],
  );

  const temizle = () => {
    for (const u of urller.current) URL.revokeObjectURL(u);
    urller.current = [];
    setZipUrl(null);
  };

  const isle = async (liste: Oge[], a: Ayar) => {
    const no = ++calisma.current;
    temizle();
    setOgeler(
      liste.map((o) => ({
        ...o,
        durum: "bekliyor",
        cikti: undefined,
        hata: undefined,
      })),
    );
    for (const o of liste) {
      let yeni: Oge;
      try {
        const cikti = await donustur(o.dosya, a);
        if (no !== calisma.current) {
          URL.revokeObjectURL(cikti.url);
          return;
        }
        urller.current.push(cikti.url);
        yeni = { ...o, durum: "hazir", cikti };
      } catch (e) {
        if (no !== calisma.current) return;
        yeni = {
          ...o,
          durum: "hata",
          hata: e instanceof Error ? e.message : "Hata",
        };
      }
      setOgeler((s) => s.map((x) => (x.id === o.id ? yeni : x)));
    }
  };

  const ekle = (dosyalar: FileList | null) => {
    if (!dosyalar?.length) return;
    const yeni = [...dosyalar]
      .filter(
        (d) =>
          d.type.startsWith("image/") ||
          /\.(jpe?g|jfif|png|webp|gif|bmp|avif)$/i.test(d.name),
      )
      .slice(0, MAX_DOSYA)
      .map((dosya): Oge => ({ id: ++sayac.current, dosya, durum: "bekliyor" }));
    if (!yeni.length) return;
    void isle([...ogeler, ...yeni].slice(-MAX_DOSYA), ayar);
  };

  const ayarla = (p: Partial<Ayar>) => {
    const a = { ...ayar, ...p };
    setAyar(a);
    if (ogeler.length) void isle(ogeler, a);
  };

  const zipYap = async () => {
    const hazir = ogeler.filter((o) => o.cikti);
    const dosyalar = await Promise.all(
      hazir.map(async (o) => ({
        ad: o.cikti!.ad,
        veri: new Uint8Array(await o.cikti!.blob.arrayBuffer()),
      })),
    );
    const url = URL.createObjectURL(
      new Blob([zipOlustur(dosyalar) as BlobPart], { type: "application/zip" }),
    );
    urller.current.push(url);
    setZipUrl(url);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gorseller-${FORMATLAR[ayar.hedef].uzanti}.zip`;
    a.click();
  };

  const f = FORMATLAR[ayar.hedef];
  const hazirSayi = ogeler.filter((o) => o.cikti).length;
  const girdiToplam = ogeler.reduce((s, o) => s + o.dosya.size, 0);
  const ciktiToplam = ogeler.reduce((s, o) => s + (o.cikti?.blob.size ?? 0), 0);

  return (
    <div className="date-calc gorsel-arac">
      <label
        className={`gorsel-birak${surukle ? " is-drag" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setSurukle(true);
        }}
        onDragLeave={() => setSurukle(false)}
        onDrop={(e) => {
          e.preventDefault();
          setSurukle(false);
          ekle(e.dataTransfer.files);
        }}
      >
        <input
          type="file"
          multiple
          accept={kaynak ? `${FORMATLAR[kaynak].kabul},image/*` : "image/*"}
          onChange={(e) => {
            ekle(e.target.files);
            e.target.value = "";
          }}
        />
        <strong>
          {kaynak
            ? `${FORMATLAR[kaynak].ad} dosyalarını seçin`
            : "Görselleri seçin"}
        </strong>
        <span>veya buraya sürükleyip bırakın · en fazla {MAX_DOSYA} dosya</span>
        <small>
          🔒 Dosyalarınız bilgisayarınızdan çıkmaz; dönüştürme tarayıcınızda
          yapılır.
        </small>
      </label>

      <div className="date-calc-input">
        <div className="date-calc-fields">
          {hedef ? null : (
            <label className="date-calc-field">
              <span>Çıktı formatı</span>
              <span className="date-calc-field-row">
                <select
                  value={ayar.hedef}
                  onChange={(e) =>
                    ayarla({ hedef: e.target.value as GorselFormat })
                  }
                >
                  {FORMAT_LISTESI.map((x) => (
                    <option key={x.id} value={x.id}>
                      {x.ad}
                    </option>
                  ))}
                </select>
              </span>
            </label>
          )}
          {f.kaliteli ? (
            <label className="date-calc-field">
              <span>Kalite: %{Math.round(ayar.kalite * 100)}</span>
              <span className="date-calc-field-row">
                <input
                  type="range"
                  min={0.3}
                  max={1}
                  step={0.05}
                  value={ayar.kalite}
                  onChange={(e) =>
                    setAyar({ ...ayar, kalite: Number(e.target.value) })
                  }
                  onPointerUp={(e) =>
                    ayarla({
                      kalite: Number((e.target as HTMLInputElement).value),
                    })
                  }
                  onKeyUp={(e) =>
                    ayarla({
                      kalite: Number((e.target as HTMLInputElement).value),
                    })
                  }
                  aria-label="Kalite"
                />
              </span>
            </label>
          ) : null}
          {!f.seffaflik ? (
            <label className="date-calc-field">
              <span>Saydam alanların rengi</span>
              <span className="date-calc-field-row">
                <input
                  type="color"
                  value={ayar.arkaPlan}
                  onChange={(e) => ayarla({ arkaPlan: e.target.value })}
                  aria-label="Arka plan rengi"
                />
              </span>
            </label>
          ) : null}
          <label className="date-calc-field">
            <span>En fazla genişlik (px, isteğe bağlı)</span>
            <span className="date-calc-field-row">
              <input
                type="number"
                inputMode="numeric"
                min={16}
                placeholder="Orijinal"
                value={ayar.genislik ?? ""}
                onChange={(e) =>
                  setAyar({
                    ...ayar,
                    genislik: e.target.value ? Number(e.target.value) : null,
                  })
                }
                onBlur={(e) =>
                  ayarla({
                    genislik: e.target.value ? Number(e.target.value) : null,
                  })
                }
              />
            </span>
          </label>
        </div>
      </div>

      {ogeler.length ? (
        <>
          <ul className="gorsel-liste">
            {ogeler.map((o) => (
              <li key={o.id}>
                <span className="gorsel-ad" title={o.dosya.name}>
                  {o.dosya.name}
                </span>
                <span className="gorsel-boyut">
                  {boyutMetni(o.dosya.size)}
                  {o.cikti ? (
                    <>
                      {" → "}
                      <b>{boyutMetni(o.cikti.blob.size)}</b> ·{" "}
                      {o.cikti.genislik}×{o.cikti.yukseklik}
                    </>
                  ) : null}
                </span>
                {o.durum === "bekliyor" ? (
                  <span className="gorsel-durum">Dönüştürülüyor…</span>
                ) : null}
                {o.hata ? <span className="gorsel-hata">{o.hata}</span> : null}
                {o.cikti ? (
                  <a
                    className="time-tool-button is-secondary"
                    href={o.cikti.url}
                    download={o.cikti.ad}
                  >
                    İndir ({f.ad})
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
          <div className="gorsel-alt">
            <span>
              {hazirSayi}/{ogeler.length} hazır · {boyutMetni(girdiToplam)} →{" "}
              {boyutMetni(ciktiToplam)}
            </span>
            {hazirSayi > 1 ? (
              <button
                type="button"
                className="time-tool-button"
                onClick={() => void zipYap()}
              >
                Tümünü ZIP olarak indir
              </button>
            ) : null}
            {zipUrl ? (
              <a
                href={zipUrl}
                download={`gorseller-${f.uzanti}.zip`}
                className="gorsel-zip-link"
              >
                ZIP indirilmediyse tıklayın
              </a>
            ) : null}
            <button
              type="button"
              className="time-tool-button is-secondary"
              onClick={() => {
                calisma.current++;
                temizle();
                setOgeler([]);
              }}
            >
              Listeyi temizle
            </button>
          </div>
        </>
      ) : null}
      <p className="date-calc-note">
        Dönüştürmede konum ve kamera bilgileri (EXIF) çıktı dosyasına
        aktarılmaz.{" "}
        {f.seffaflik
          ? ""
          : `${f.ad} saydamlığı desteklemediği için saydam alanlar seçtiğiniz renkle doldurulur.`}
      </p>
    </div>
  );
}
