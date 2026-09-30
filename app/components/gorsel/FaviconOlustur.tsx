"use client";

import { useEffect, useRef, useState } from "react";
import {
  FAVICON_HTML,
  icoOlustur,
  webManifest,
} from "../../converter/gorsel/ico";
import { boyutMetni } from "../../converter/gorsel/formatlar";
import DosyaBirak from "./DosyaBirak";
import { bitmapAc, indir, zipUrlOlustur } from "./tuval";

type Ayar = {
  saydam: boolean;
  renk: string;
  /** Kenar boşluğu, kenara oranla yüzde. */
  bosluk: number;
  kose: "kare" | "yuvarlak" | "daire";
};

const ICO_BOYUTLARI = [16, 32, 48];
const PNG_DOSYALARI = [
  { ad: "favicon-16x16.png", boyut: 16 },
  { ad: "favicon-32x32.png", boyut: 32 },
  { ad: "apple-touch-icon.png", boyut: 180, zemin: true },
  { ad: "android-chrome-192x192.png", boyut: 192 },
  { ad: "android-chrome-512x512.png", boyut: 512 },
];

/** Görseli kare simgeye çizer: ortalanmış, kenar boşluklu, isteğe bağlı zemin ve köşe yuvarlama. */
function simgeCiz(
  kaynak: ImageBitmap,
  boyut: number,
  a: Ayar,
  zeminZorunlu = false,
): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = c.height = boyut;
  const x = c.getContext("2d")!;
  x.imageSmoothingQuality = "high";
  const r =
    a.kose === "daire" ? boyut / 2 : a.kose === "yuvarlak" ? boyut * 0.2 : 0;
  if (r) {
    x.beginPath();
    x.roundRect(0, 0, boyut, boyut, r);
    x.clip();
  }
  if (!a.saydam || zeminZorunlu) {
    x.fillStyle = a.saydam ? "#ffffff" : a.renk;
    x.fillRect(0, 0, boyut, boyut);
  }
  const ic = boyut * (1 - (2 * a.bosluk) / 100);
  const k = ic / Math.max(kaynak.width, kaynak.height);
  const w = kaynak.width * k;
  const h = kaynak.height * k;
  x.drawImage(kaynak, (boyut - w) / 2, (boyut - h) / 2, w, h);
  return c;
}

const pngBayt = async (c: HTMLCanvasElement) => {
  const b = await new Promise<Blob | null>((r) => c.toBlob(r, "image/png"));
  if (!b) throw new Error("PNG oluşturulamadı.");
  return new Uint8Array(await b.arrayBuffer());
};

/** Tek görselden favicon.ico ve web/uygulama simgeleri üretir. */
export default function FaviconOlustur() {
  const [dosya, setDosya] = useState<File | null>(null);
  const [kaynak, setKaynak] = useState<ImageBitmap | null>(null);
  const [ayar, setAyar] = useState<Ayar>({
    saydam: true,
    renk: "#1f4f66",
    bosluk: 0,
    kose: "kare",
  });
  const [ico, setIco] = useState<{ url: string; boyut: number } | null>(null);
  const [kopyalandi, setKopyalandi] = useState(false);
  const [hata, setHata] = useState("");
  const [uyari, setUyari] = useState("");
  const onizleme = useRef<HTMLDivElement>(null);
  const urller = useRef<string[]>([]);

  useEffect(
    () => () => {
      for (const u of urller.current) URL.revokeObjectURL(u);
    },
    [],
  );

  const ac = async (d: File[]) => {
    setHata("");
    setUyari("");
    try {
      const b = await bitmapAc(d[0]);
      kaynak?.close();
      setKaynak(b);
      setDosya(d[0]);
      if (b.width !== b.height)
        setUyari(
          "Görsel kare değil; simge ortalanarak kareye yerleştirildi. En iyi sonuç için kare (1:1) görsel kullanın.",
        );
    } catch (e) {
      setHata(e instanceof Error ? e.message : "Görsel açılamadı.");
    }
  };

  // Önizlemeler ve ICO her ayar değişiminde yeniden üretilir.
  useEffect(() => {
    if (!kaynak) return;
    let iptal = false;
    const kap = onizleme.current;
    if (kap) {
      kap.replaceChildren(
        ...[16, 32, 48, 180, 512].map((s) => {
          const f = document.createElement("figure");
          const c = simgeCiz(kaynak, s, ayar, s === 180);
          c.style.width = c.style.height = `${Math.min(s, 96)}px`;
          const cap = document.createElement("figcaption");
          cap.textContent = `${s}×${s}`;
          f.append(c, cap);
          return f;
        }),
      );
    }
    void (async () => {
      const girisler = await Promise.all(
        ICO_BOYUTLARI.map(async (s) => ({
          boyut: s,
          png: await pngBayt(simgeCiz(kaynak, s, ayar)),
        })),
      );
      if (iptal) return;
      const v = icoOlustur(girisler);
      const u = URL.createObjectURL(
        new Blob([v as BlobPart], { type: "image/x-icon" }),
      );
      urller.current.push(u);
      setIco({ url: u, boyut: v.length });
    })();
    return () => {
      iptal = true;
    };
  }, [kaynak, ayar]);

  const paketIndir = async () => {
    if (!kaynak || !ico) return;
    const dosyalar = [
      { ad: "favicon.ico", blob: await (await fetch(ico.url)).blob() },
      ...(await Promise.all(
        PNG_DOSYALARI.map(async (p) => ({
          ad: p.ad,
          blob: new Blob(
            [
              (await pngBayt(
                simgeCiz(kaynak, p.boyut, ayar, p.zemin),
              )) as BlobPart,
            ],
            { type: "image/png" },
          ),
        })),
      )),
      {
        ad: "site.webmanifest",
        blob: new Blob([webManifest("", ayar.saydam ? "#ffffff" : ayar.renk)], {
          type: "application/manifest+json",
        }),
      },
      {
        ad: "favicon-html.txt",
        blob: new Blob([FAVICON_HTML], { type: "text/plain" }),
      },
    ];
    const u = await zipUrlOlustur(dosyalar);
    urller.current.push(u);
    indir(u, "favicon.zip");
  };

  const ayarla = (p: Partial<Ayar>) => setAyar((a) => ({ ...a, ...p }));

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak
        coklu={false}
        max={1}
        baslik={
          dosya
            ? "Başka bir görsel seçin"
            : "Logo veya görsel seçin (PNG, SVG, JPG)"
        }
        onSec={(d) => void ac(d)}
      />
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Arka plan</span>
            <span className="date-calc-field-row">
              <select
                value={ayar.saydam ? "saydam" : "renk"}
                onChange={(e) =>
                  ayarla({ saydam: e.target.value === "saydam" })
                }
              >
                <option value="saydam">Saydam</option>
                <option value="renk">Renkli</option>
              </select>
              {!ayar.saydam ? (
                <input
                  type="color"
                  value={ayar.renk}
                  onChange={(e) => ayarla({ renk: e.target.value })}
                  aria-label="Arka plan rengi"
                />
              ) : null}
            </span>
          </label>
          <label className="date-calc-field">
            <span>Köşeler</span>
            <span className="date-calc-field-row">
              <select
                value={ayar.kose}
                onChange={(e) =>
                  ayarla({ kose: e.target.value as Ayar["kose"] })
                }
              >
                <option value="kare">Kare</option>
                <option value="yuvarlak">Yuvarlak köşe</option>
                <option value="daire">Daire</option>
              </select>
            </span>
          </label>
          <label className="date-calc-field">
            <span>Kenar boşluğu: %{ayar.bosluk}</span>
            <span className="date-calc-field-row">
              <input
                type="range"
                min={0}
                max={25}
                value={ayar.bosluk}
                onChange={(e) => ayarla({ bosluk: Number(e.target.value) })}
                aria-label="Kenar boşluğu"
              />
            </span>
          </label>
        </div>
      </div>
      {kaynak ? (
        <>
          <div className="favicon-onizleme" ref={onizleme} />
          <div className="gorsel-alt">
            <span>
              {ico
                ? `favicon.ico · 16, 32, 48 px · ${boyutMetni(ico.boyut)}`
                : ""}
            </span>
            {ico ? (
              <a
                className="time-tool-button"
                href={ico.url}
                download="favicon.ico"
              >
                favicon.ico indir
              </a>
            ) : null}
            <button
              type="button"
              className="time-tool-button is-secondary"
              onClick={() => void paketIndir()}
            >
              Tüm paketi ZIP indir
            </button>
          </div>
          <label className="date-calc-field favicon-html">
            <span>Sitenizin &lt;head&gt; bölümüne ekleyin</span>
            <textarea
              readOnly
              rows={5}
              value={FAVICON_HTML}
              spellCheck={false}
            />
          </label>
          <button
            type="button"
            className="time-tool-button is-secondary"
            onClick={() => {
              void navigator.clipboard.writeText(FAVICON_HTML).then(() => {
                setKopyalandi(true);
                setTimeout(() => setKopyalandi(false), 1500);
              });
            }}
          >
            {kopyalandi ? "Kopyalandı ✓" : "HTML kodunu kopyala"}
          </button>
        </>
      ) : null}
      {uyari ? <p className="vesikalik-ozet">{uyari}</p> : null}
      {hata ? <p className="gorsel-hata">{hata}</p> : null}
      <p className="date-calc-note">
        Simgeler tarayıcınızda üretilir; görseliniz hiçbir sunucuya yüklenmez.
        ZIP paketinde favicon.ico, 16/32 px PNG, Apple (180 px) ve Android
        (192/512 px) simgeleri ile site.webmanifest bulunur.
      </p>
    </div>
  );
}
