"use client";

import { useEffect, useRef, useState } from "react";
import { jpegDpiYaz, pngDpiYaz } from "../../converter/gorsel/dpi";
import {
  boyutMetni,
  FORMATLAR,
  formatTahmin,
  type GorselFormat,
} from "../../converter/gorsel/formatlar";
import {
  boyutPlani,
  type BoyutAyar,
  type Sigdirma,
} from "../../converter/gorsel/sikistirma";
import { socialMediaSizes } from "../../converter/socialMediaImageSizes";
import DosyaBirak from "./DosyaBirak";
import { bitmapAc, indir, kodla, zipUrlOlustur } from "./tuval";

type Mod = "piksel" | "yuzde" | "cm" | "hazir";

type Ayar = {
  mod: Mod;
  genislik: string;
  yukseklik: string;
  genislikCm: string;
  yukseklikCm: string;
  dpi: number;
  yuzde: number;
  oranKoru: boolean;
  sigdirma: Sigdirma;
  hazir: string;
  format: GorselFormat | "ayni";
  kalite: number;
  arkaPlan: string;
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
    kaynak: string;
  };
};

const MAX_DOSYA = 30;
const SAYI = (s: string) => (Number(s) > 0 ? Number(s) : undefined);

function plan(a: Ayar): BoyutAyar {
  if (a.mod === "yuzde") return { mod: "yuzde", yuzde: a.yuzde };
  if (a.mod === "cm")
    return {
      mod: "cm",
      genislikCm: SAYI(a.genislikCm),
      yukseklikCm: SAYI(a.yukseklikCm),
      dpi: a.dpi,
      oranKoru: a.oranKoru,
      sigdirma: a.sigdirma,
    };
  if (a.mod === "hazir") {
    const h =
      socialMediaSizes.find((x) => x.id === a.hazir) ?? socialMediaSizes[0];
    return {
      mod: "piksel",
      genislik: h.widthPx,
      yukseklik: h.heightPx,
      oranKoru: true,
      sigdirma: a.sigdirma,
    };
  }
  return {
    mod: "piksel",
    genislik: SAYI(a.genislik),
    yukseklik: SAYI(a.yukseklik),
    oranKoru: a.oranKoru,
    sigdirma: a.sigdirma,
  };
}

const SIGDIRMA: Array<{ id: Sigdirma; ad: string }> = [
  { id: "doldur", ad: "Doldur (taşan kısmı ortadan kırp)" },
  { id: "bosluk", ad: "Boşluklu sığdır (kırpmadan, kenarlar renkli)" },
  { id: "sigdir", ad: "Sığdır (kırpmadan, ölçü kutuya göre küçülür)" },
  { id: "esnet", ad: "Esnet (oran bozulur)" },
];

async function isleDosya(dosya: File, a: Ayar) {
  const bitmap = await bitmapAc(dosya);
  try {
    const p = boyutPlani(
      { genislik: bitmap.width, yukseklik: bitmap.height },
      plan(a),
    );
    const format: GorselFormat =
      a.format === "ayni"
        ? (formatTahmin(dosya.name, dosya.type) ?? "jpg")
        : a.format;
    let blob = await kodla(bitmap, {
      genislik: p.genislik,
      yukseklik: p.yukseklik,
      format,
      kalite: a.kalite,
      arkaPlan: a.arkaPlan,
      bolge: p.bolge,
      yerlesim: p.yerlesim,
    });
    if (a.mod === "cm" && format !== "webp") {
      const veri = new Uint8Array(await blob.arrayBuffer());
      const dpili =
        format === "jpg" ? jpegDpiYaz(veri, a.dpi) : pngDpiYaz(veri, a.dpi);
      blob = new Blob([dpili as BlobPart], { type: blob.type });
    }
    const taban = dosya.name.replace(/\.[^./\\]+$/, "") || "gorsel";
    return {
      blob,
      url: URL.createObjectURL(blob),
      ad: `${taban}-${p.genislik}x${p.yukseklik}.${FORMATLAR[format].uzanti}`,
      genislik: p.genislik,
      yukseklik: p.yukseklik,
      kaynak: `${bitmap.width}×${bitmap.height}`,
    };
  } finally {
    bitmap.close();
  }
}

/** Resim boyutlandırma: piksel, yüzde, santimetre (DPI) veya hazır sosyal medya ölçüleri. Toplu çalışır. */
export default function ResimBoyutlandir() {
  const [ayar, setAyar] = useState<Ayar>({
    mod: "piksel",
    genislik: "1200",
    yukseklik: "",
    genislikCm: "10",
    yukseklikCm: "15",
    dpi: 300,
    yuzde: 50,
    oranKoru: true,
    sigdirma: "doldur",
    hazir: "ig-square",
    format: "ayni",
    kalite: 0.9,
    arkaPlan: "#ffffff",
  });
  const [ogeler, setOgeler] = useState<Oge[]>([]);
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
        const cikti = await isleDosya(o.dosya, a);
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

  const ekle = (dosyalar: File[]) => {
    const yeni = dosyalar.map(
      (dosya): Oge => ({ id: ++sayac.current, dosya, durum: "bekliyor" }),
    );
    void isle([...ogeler, ...yeni].slice(-MAX_DOSYA), ayar);
  };

  /** Ayarı değiştirir; `uygula` ise dosyaları yeniden işler (metin kutularında odak çıkınca). */
  const ayarla = (p: Partial<Ayar>, uygula = true) => {
    const a = { ...ayar, ...p };
    setAyar(a);
    if (uygula && ogeler.length) void isle(ogeler, a);
  };

  const zipYap = async () => {
    const url = await zipUrlOlustur(
      ogeler.flatMap((o) =>
        o.cikti ? [{ ad: o.cikti.ad, blob: o.cikti.blob }] : [],
      ),
    );
    urller.current.push(url);
    setZipUrl(url);
    indir(url, "boyutlandirilmis.zip");
  };

  const kutu =
    ayar.mod === "hazir" ||
    (ayar.mod === "piksel"
      ? !!(SAYI(ayar.genislik) && SAYI(ayar.yukseklik))
      : ayar.mod === "cm" &&
        !!(SAYI(ayar.genislikCm) && SAYI(ayar.yukseklikCm)));
  const cikisFormat = ayar.format === "ayni" ? null : FORMATLAR[ayar.format];
  const renkGerekli =
    (kutu && ayar.sigdirma === "bosluk") ||
    ayar.format === "jpg" ||
    ayar.format === "ayni";
  const hazir = ogeler.filter((o) => o.cikti).length;
  const platformlar = [...new Set(socialMediaSizes.map((s) => s.platform))];

  const sayiAlani = (
    etiket: string,
    alan: "genislik" | "yukseklik" | "genislikCm" | "yukseklikCm",
    birim: string,
  ) => (
    <label className="date-calc-field">
      <span>{etiket}</span>
      <span className="date-calc-field-row">
        <input
          type="number"
          inputMode="decimal"
          min={birim === "px" ? 1 : 0.1}
          step={birim === "px" ? 1 : 0.1}
          placeholder="otomatik"
          value={ayar[alan]}
          onChange={(e) => ayarla({ [alan]: e.target.value }, false)}
          onBlur={(e) => ayarla({ [alan]: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === "Enter")
              ayarla({ [alan]: (e.target as HTMLInputElement).value });
          }}
        />
        <span className="gorsel-birim">{birim}</span>
      </span>
    </label>
  );

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak baslik="Görselleri seçin" max={MAX_DOSYA} onSec={ekle} />

      <div className="date-calc-input">
        <div
          className="date-converter-modes"
          role="tablist"
          aria-label="Boyutlandırma yöntemi"
        >
          {(
            [
              ["piksel", "Piksel"],
              ["yuzde", "Yüzde"],
              ["cm", "Santimetre (baskı)"],
              ["hazir", "Sosyal medya"],
            ] as const
          ).map(([k, l]) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={ayar.mod === k}
              className={ayar.mod === k ? "is-active" : undefined}
              onClick={() => ayarla({ mod: k })}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="date-calc-fields">
          {ayar.mod === "piksel" ? (
            <>
              {sayiAlani("Genişlik", "genislik", "px")}
              {sayiAlani("Yükseklik", "yukseklik", "px")}
            </>
          ) : null}
          {ayar.mod === "cm" ? (
            <>
              {sayiAlani("Genişlik", "genislikCm", "cm")}
              {sayiAlani("Yükseklik", "yukseklikCm", "cm")}
              <label className="date-calc-field">
                <span>Çözünürlük</span>
                <span className="date-calc-field-row">
                  <select
                    value={ayar.dpi}
                    onChange={(e) => ayarla({ dpi: Number(e.target.value) })}
                  >
                    {[72, 96, 150, 200, 300, 600].map((d) => (
                      <option key={d} value={d}>
                        {d} DPI
                        {d === 300
                          ? " (baskı)"
                          : d === 72 || d === 96
                            ? " (ekran)"
                            : ""}
                      </option>
                    ))}
                  </select>
                </span>
              </label>
            </>
          ) : null}
          {ayar.mod === "yuzde" ? (
            <label className="date-calc-field">
              <span>Ölçek: %{ayar.yuzde}</span>
              <span className="date-calc-field-row">
                <input
                  type="range"
                  min={5}
                  max={100}
                  step={5}
                  value={ayar.yuzde}
                  onChange={(e) =>
                    ayarla({ yuzde: Number(e.target.value) }, false)
                  }
                  onPointerUp={(e) =>
                    ayarla({
                      yuzde: Number((e.target as HTMLInputElement).value),
                    })
                  }
                  onKeyUp={(e) =>
                    ayarla({
                      yuzde: Number((e.target as HTMLInputElement).value),
                    })
                  }
                  aria-label="Ölçek yüzdesi"
                />
              </span>
            </label>
          ) : null}
          {ayar.mod === "hazir" ? (
            <label className="date-calc-field">
              <span>Hazır ölçü</span>
              <span className="date-calc-field-row">
                <select
                  value={ayar.hazir}
                  onChange={(e) => ayarla({ hazir: e.target.value })}
                >
                  {platformlar.map((pl) => (
                    <optgroup key={pl} label={pl}>
                      {socialMediaSizes
                        .filter((s) => s.platform === pl)
                        .map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.contentType} — {s.widthPx}×{s.heightPx}
                          </option>
                        ))}
                    </optgroup>
                  ))}
                </select>
              </span>
            </label>
          ) : null}
          {ayar.mod === "piksel" || ayar.mod === "cm" ? (
            <label className="date-calc-check">
              <input
                type="checkbox"
                checked={ayar.oranKoru}
                onChange={(e) => ayarla({ oranKoru: e.target.checked })}
              />{" "}
              Oranı koru
            </label>
          ) : null}
        </div>

        {kutu && ayar.oranKoru ? (
          <div className="date-calc-fields">
            <label className="date-calc-field">
              <span>Oran farklıysa</span>
              <span className="date-calc-field-row">
                <select
                  value={ayar.sigdirma}
                  onChange={(e) =>
                    ayarla({ sigdirma: e.target.value as Sigdirma })
                  }
                >
                  {SIGDIRMA.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.ad}
                    </option>
                  ))}
                </select>
              </span>
            </label>
          </div>
        ) : null}

        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Çıktı formatı</span>
            <span className="date-calc-field-row">
              <select
                value={ayar.format}
                onChange={(e) =>
                  ayarla({ format: e.target.value as Ayar["format"] })
                }
              >
                <option value="ayni">Aynı format</option>
                <option value="jpg">JPG</option>
                <option value="png">PNG</option>
                <option value="webp">WebP</option>
              </select>
            </span>
          </label>
          {!cikisFormat || cikisFormat.kaliteli ? (
            <label className="date-calc-field">
              <span>Kalite: %{Math.round(ayar.kalite * 100)}</span>
              <span className="date-calc-field-row">
                <input
                  type="range"
                  min={0.4}
                  max={1}
                  step={0.05}
                  value={ayar.kalite}
                  onChange={(e) =>
                    ayarla({ kalite: Number(e.target.value) }, false)
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
          {renkGerekli ? (
            <label className="date-calc-field">
              <span>
                {kutu && ayar.sigdirma === "bosluk"
                  ? "Kenar rengi"
                  : "Saydam alanların rengi"}
              </span>
              <span className="date-calc-field-row">
                <input
                  type="color"
                  value={ayar.arkaPlan}
                  onChange={(e) => ayarla({ arkaPlan: e.target.value })}
                  aria-label="Renk"
                />
              </span>
            </label>
          ) : null}
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
                  {o.cikti ? (
                    <>
                      {o.cikti.kaynak} →{" "}
                      <b>
                        {o.cikti.genislik}×{o.cikti.yukseklik}
                      </b>{" "}
                      · {boyutMetni(o.dosya.size)} →{" "}
                      {boyutMetni(o.cikti.blob.size)}
                    </>
                  ) : (
                    boyutMetni(o.dosya.size)
                  )}
                </span>
                {o.durum === "bekliyor" ? (
                  <span className="gorsel-durum">Boyutlandırılıyor…</span>
                ) : null}
                {o.hata ? <span className="gorsel-hata">{o.hata}</span> : null}
                {o.cikti ? (
                  <a
                    className="time-tool-button is-secondary"
                    href={o.cikti.url}
                    download={o.cikti.ad}
                  >
                    İndir
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
          <div className="gorsel-alt">
            <span>
              {hazir}/{ogeler.length} hazır
            </span>
            {hazir > 1 ? (
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
                download="boyutlandirilmis.zip"
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
        {ayar.mod === "cm"
          ? `Santimetre modunda ${ayar.dpi} DPI bilgisi JPG ve PNG dosyasına yazılır; baskı programları görseli doğru ölçüde açar.`
          : "Görseller tarayıcınızda boyutlandırılır, hiçbir yere yüklenmez."}{" "}
        Konum ve kamera bilgileri (EXIF) çıktıya aktarılmaz.
      </p>
    </div>
  );
}
