"use client";

import { useEffect, useRef, useState } from "react";
import {
  boyutMetni,
  ciktiAdi,
  FORMATLAR,
  formatTahmin,
  type GorselFormat,
} from "../../converter/gorsel/formatlar";
import DosyaBirak from "./DosyaBirak";
import { filigranCiz, type FiligranAyar, type Konum } from "./filigranCiz";
import { bitmapAc, indir, zipUrlOlustur } from "./tuval";

const KONUMLAR: Array<{ id: Konum; ad: string }> = [
  { id: "sol-ust", ad: "↖" },
  { id: "ust", ad: "↑" },
  { id: "sag-ust", ad: "↗" },
  { id: "sol", ad: "←" },
  { id: "orta", ad: "•" },
  { id: "sag", ad: "→" },
  { id: "sol-alt", ad: "↙" },
  { id: "alt", ad: "↓" },
  { id: "sag-alt", ad: "↘" },
];

const MAX_DOSYA = 30;

type Oge = {
  id: number;
  dosya: File;
  bitmap?: ImageBitmap;
  cikti?: { blob: Blob; url: string; ad: string };
  hata?: string;
};

const bugun = () =>
  new Date().toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

async function uygula(
  bitmap: ImageBitmap,
  dosya: File,
  a: FiligranAyar,
  logo: ImageBitmap | null,
) {
  const c = document.createElement("canvas");
  c.width = bitmap.width;
  c.height = bitmap.height;
  const ctx = c.getContext("2d")!;
  const format: GorselFormat = formatTahmin(dosya.name, dosya.type) ?? "jpg";
  if (!FORMATLAR[format].seffaflik) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, c.width, c.height);
  }
  ctx.drawImage(bitmap, 0, 0);
  filigranCiz(ctx, c.width, c.height, a, logo);
  const f = FORMATLAR[format];
  const blob = await new Promise<Blob | null>((r) =>
    c.toBlob(r, f.mime, f.kaliteli ? 0.92 : undefined),
  );
  if (!blob) throw new Error("Görsel kaydedilemedi.");
  return {
    blob,
    url: URL.createObjectURL(blob),
    ad: ciktiAdi(dosya.name, format).replace(/(\.[a-z]+)$/, "-filigranli$1"),
  };
}

/** Fotoğraflara yazı veya logo filigranı ekler; tek konum ya da tüm görsele döşeme. Toplu çalışır. */
export default function FiligranEkle() {
  const [ayar, setAyar] = useState<FiligranAyar>({
    tur: "yazi",
    yazi: "© Adınız",
    renk: "#ffffff",
    boyut: 6,
    saydamlik: 0.6,
    aci: 0,
    konum: "sag-alt",
    kalin: true,
    golge: true,
  });
  const [ogeler, setOgeler] = useState<Oge[]>([]);
  const [logo, setLogo] = useState<ImageBitmap | null>(null);
  const [isleniyor, setIsleniyor] = useState(false);
  const [zipUrl, setZipUrl] = useState<string | null>(null);
  const tuval = useRef<HTMLCanvasElement>(null);
  const sayac = useRef(0);
  const urller = useRef<string[]>([]);
  const bitmaplar = useRef<ImageBitmap[]>([]);

  useEffect(() => {
    const u = urller.current;
    const b = bitmaplar.current;
    return () => {
      for (const x of u) URL.revokeObjectURL(x);
      for (const x of b) x.close();
    };
  }, []);

  const onizlemeBitmap = ogeler.find((o) => o.bitmap)?.bitmap;

  // Canlı önizleme: ilk görsel küçültülmüş olarak, aynı oransal ayarlarla çizilir.
  useEffect(() => {
    const c = tuval.current;
    if (!c || !onizlemeBitmap) return;
    const k = Math.min(
      1,
      900 / Math.max(onizlemeBitmap.width, onizlemeBitmap.height),
    );
    c.width = Math.round(onizlemeBitmap.width * k);
    c.height = Math.round(onizlemeBitmap.height * k);
    const ctx = c.getContext("2d")!;
    ctx.drawImage(onizlemeBitmap, 0, 0, c.width, c.height);
    filigranCiz(ctx, c.width, c.height, ayar, logo);
  }, [onizlemeBitmap, ayar, logo]);

  const ciktilariTemizle = () => {
    for (const u of urller.current) URL.revokeObjectURL(u);
    urller.current = [];
    setZipUrl(null);
    setOgeler((s) => s.map((o) => ({ ...o, cikti: undefined })));
  };

  const ayarla = (p: Partial<FiligranAyar>) => {
    setAyar((a) => ({ ...a, ...p }));
    if (ogeler.some((o) => o.cikti)) ciktilariTemizle();
  };

  const ekle = async (dosyalar: File[]) => {
    for (const dosya of dosyalar.slice(0, MAX_DOSYA - ogeler.length)) {
      const id = ++sayac.current;
      try {
        const bitmap = await bitmapAc(dosya);
        bitmaplar.current.push(bitmap);
        setOgeler((s) => [...s, { id, dosya, bitmap }]);
      } catch (e) {
        setOgeler((s) => [
          ...s,
          { id, dosya, hata: e instanceof Error ? e.message : "Hata" },
        ]);
      }
    }
  };

  const logoSec = async (f?: File) => {
    if (!f) return;
    try {
      const b = await bitmapAc(f);
      bitmaplar.current.push(b);
      setLogo(b);
      ayarla({ tur: "logo", boyut: 20 });
    } catch {
      /* geçersiz logo */
    }
  };

  const hepsiniUygula = async () => {
    setIsleniyor(true);
    ciktilariTemizle();
    for (const o of ogeler) {
      if (!o.bitmap) continue;
      try {
        const cikti = await uygula(o.bitmap, o.dosya, ayar, logo);
        urller.current.push(cikti.url);
        setOgeler((s) => s.map((x) => (x.id === o.id ? { ...x, cikti } : x)));
      } catch (e) {
        setOgeler((s) =>
          s.map((x) =>
            x.id === o.id
              ? { ...x, hata: e instanceof Error ? e.message : "Hata" }
              : x,
          ),
        );
      }
    }
    setIsleniyor(false);
  };

  const kimlikHazir = () =>
    ayarla({
      tur: "yazi",
      yazi: `YALNIZCA ................ BAŞVURUSU İÇİN VERİLMİŞTİR\n${bugun()}`,
      renk: "#d32f2f",
      boyut: 4,
      saydamlik: 0.4,
      aci: -30,
      konum: "dose",
      kalin: true,
      golge: false,
    });

  const zipYap = async () => {
    const url = await zipUrlOlustur(
      ogeler.flatMap((o) =>
        o.cikti ? [{ ad: o.cikti.ad, blob: o.cikti.blob }] : [],
      ),
    );
    urller.current.push(url);
    setZipUrl(url);
    indir(url, "filigranli.zip");
  };

  const hazir = ogeler.filter((o) => o.cikti).length;

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak
        baslik={ogeler.length ? "Başka görsel ekleyin" : "Görselleri seçin"}
        max={MAX_DOSYA}
        onSec={(d) => void ekle(d)}
      />

      <div className="date-calc-input">
        <div
          className="date-converter-modes"
          role="tablist"
          aria-label="Filigran türü"
        >
          <button
            type="button"
            role="tab"
            aria-selected={ayar.tur === "yazi"}
            className={ayar.tur === "yazi" ? "is-active" : undefined}
            onClick={() =>
              ayarla({
                tur: "yazi",
                boyut: ayar.tur === "logo" ? 6 : ayar.boyut,
              })
            }
          >
            Yazı
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={ayar.tur === "logo"}
            className={ayar.tur === "logo" ? "is-active" : undefined}
            onClick={() =>
              ayarla({
                tur: "logo",
                boyut: ayar.tur === "yazi" ? 20 : ayar.boyut,
              })
            }
          >
            Logo
          </button>
          <button
            type="button"
            className="filigran-hazir"
            onClick={kimlikHazir}
          >
            🪪 Kimlik fotokopisi
          </button>
        </div>

        <div className="date-calc-fields">
          {ayar.tur === "yazi" ? (
            <label className="date-calc-field filigran-yazi">
              <span>Filigran yazısı (yeni satır için Enter)</span>
              <span className="date-calc-field-row">
                <textarea
                  rows={2}
                  value={ayar.yazi}
                  onChange={(e) => ayarla({ yazi: e.target.value })}
                />
              </span>
            </label>
          ) : (
            <label className="date-calc-field">
              <span>Logo (saydam PNG önerilir)</span>
              <span className="date-calc-field-row">
                <input
                  type="file"
                  accept="image/png,image/*"
                  onChange={(e) => void logoSec(e.target.files?.[0])}
                />
              </span>
            </label>
          )}
          {ayar.tur === "yazi" ? (
            <label className="date-calc-field">
              <span>Renk</span>
              <span className="date-calc-field-row">
                <input
                  type="color"
                  value={ayar.renk}
                  onChange={(e) => ayarla({ renk: e.target.value })}
                  aria-label="Yazı rengi"
                />
              </span>
            </label>
          ) : null}
        </div>

        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Boyut: %{ayar.boyut}</span>
            <span className="date-calc-field-row">
              <input
                type="range"
                min={1}
                max={ayar.tur === "logo" ? 60 : 25}
                step={0.5}
                value={ayar.boyut}
                onChange={(e) => ayarla({ boyut: Number(e.target.value) })}
                aria-label="Boyut"
              />
            </span>
          </label>
          <label className="date-calc-field">
            <span>Opaklık: %{Math.round(ayar.saydamlik * 100)}</span>
            <span className="date-calc-field-row">
              <input
                type="range"
                min={0.1}
                max={1}
                step={0.05}
                value={ayar.saydamlik}
                onChange={(e) => ayarla({ saydamlik: Number(e.target.value) })}
                aria-label="Opaklık"
              />
            </span>
          </label>
          <label className="date-calc-field">
            <span>Açı: {ayar.aci}°</span>
            <span className="date-calc-field-row">
              <input
                type="range"
                min={-60}
                max={60}
                step={5}
                value={ayar.aci}
                onChange={(e) => ayarla({ aci: Number(e.target.value) })}
                aria-label="Açı"
              />
            </span>
          </label>
        </div>

        <div className="filigran-konum">
          <span>Konum</span>
          <div
            className="filigran-izgara"
            role="group"
            aria-label="Filigran konumu"
          >
            {KONUMLAR.map((k) => (
              <button
                key={k.id}
                type="button"
                aria-pressed={ayar.konum === k.id}
                aria-label={k.id}
                className={ayar.konum === k.id ? "is-active" : undefined}
                onClick={() => ayarla({ konum: k.id })}
              >
                {k.ad}
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-pressed={ayar.konum === "dose"}
            className={`filigran-dose${ayar.konum === "dose" ? " is-active" : ""}`}
            onClick={() => ayarla({ konum: "dose" })}
          >
            ▦ Tüm görsele döşe
          </button>
          {ayar.tur === "yazi" ? (
            <>
              <label className="date-calc-check">
                <input
                  type="checkbox"
                  checked={ayar.kalin}
                  onChange={(e) => ayarla({ kalin: e.target.checked })}
                />{" "}
                Kalın
              </label>
              <label className="date-calc-check">
                <input
                  type="checkbox"
                  checked={ayar.golge}
                  onChange={(e) => ayarla({ golge: e.target.checked })}
                />{" "}
                Gölge
              </label>
            </>
          ) : null}
        </div>
      </div>

      {onizlemeBitmap ? (
        <div className="filigran-onizleme">
          <canvas ref={tuval} aria-label="Filigran önizlemesi" />
        </div>
      ) : null}

      {ogeler.length ? (
        <>
          <div className="gorsel-alt">
            <span>{ogeler.length} görsel</span>
            <button
              type="button"
              className="time-tool-button"
              disabled={isleniyor || (ayar.tur === "logo" && !logo)}
              onClick={() => void hepsiniUygula()}
            >
              {isleniyor
                ? "Uygulanıyor…"
                : `Filigranı ${ogeler.length > 1 ? "hepsine " : ""}uygula`}
            </button>
            {hazir > 1 ? (
              <button
                type="button"
                className="time-tool-button is-secondary"
                onClick={() => void zipYap()}
              >
                Tümünü ZIP olarak indir
              </button>
            ) : null}
            {zipUrl ? (
              <a
                href={zipUrl}
                download="filigranli.zip"
                className="gorsel-zip-link"
              >
                ZIP indirilmediyse tıklayın
              </a>
            ) : null}
          </div>
          <ul className="gorsel-liste">
            {ogeler.map((o) => (
              <li key={o.id}>
                <span className="gorsel-ad" title={o.dosya.name}>
                  {o.dosya.name}
                </span>
                <span className="gorsel-boyut">
                  {o.bitmap ? `${o.bitmap.width}×${o.bitmap.height} · ` : ""}
                  {boyutMetni(o.dosya.size)}
                  {o.cikti ? (
                    <>
                      {" "}
                      → <b>{boyutMetni(o.cikti.blob.size)}</b>
                    </>
                  ) : null}
                </span>
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
        </>
      ) : null}
      <p className="date-calc-note">
        Görseller tarayıcınızda işlenir; kimlik fotokopisi gibi kişisel belgeler
        hiçbir sunucuya gönderilmez. Önizleme ilk görseli gösterir; filigran her
        görselin boyutuna orantılı uygulanır.
      </p>
    </div>
  );
}
