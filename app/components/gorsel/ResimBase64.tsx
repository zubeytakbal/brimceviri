"use client";

import { useEffect, useRef, useState } from "react";
import { boyutMetni } from "../../converter/gorsel/formatlar";
import DosyaBirak from "./DosyaBirak";
import { indir } from "./tuval";

const UZANTI: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "image/avif": "avif",
  "image/bmp": "bmp",
  "image/x-icon": "ico",
  "image/vnd.microsoft.icon": "ico",
};

/** Base64 verisinin ilk baytlarından görsel türünü tahmin eder. */
function turBul(b: Uint8Array): string | null {
  const h = (...x: number[]) => x.every((v, i) => b[i] === v);
  if (h(0x89, 0x50, 0x4e, 0x47)) return "image/png";
  if (h(0xff, 0xd8, 0xff)) return "image/jpeg";
  if (h(0x47, 0x49, 0x46, 0x38)) return "image/gif";
  if (
    h(0x52, 0x49, 0x46, 0x46) &&
    String.fromCharCode(...b.subarray(8, 12)) === "WEBP"
  )
    return "image/webp";
  if (h(0x42, 0x4d)) return "image/bmp";
  if (h(0, 0, 1, 0)) return "image/x-icon";
  if (String.fromCharCode(...b.subarray(4, 12)).startsWith("ftypavi"))
    return "image/avif";
  const bas = new TextDecoder().decode(b.subarray(0, 256));
  if (/<svg[\s>]/i.test(bas)) return "image/svg+xml";
  return null;
}

type Cikti = { ad: string; mime: string; dataUri: string; boyut: number };

/** Görseli Base64 / data URI'ye, Base64 metnini görsele çevirir. */
export default function ResimBase64() {
  const [mod, setMod] = useState<"kodla" | "coz">("kodla");
  const [cikti, setCikti] = useState<Cikti | null>(null);
  const [bicim, setBicim] = useState<"uri" | "ham" | "css" | "html">("uri");
  const [girdi, setGirdi] = useState("");
  const [cozulen, setCozulen] = useState<{
    url: string;
    mime: string;
    boyut: number;
  } | null>(null);
  const [hata, setHata] = useState("");
  const [kopyalandi, setKopyalandi] = useState(false);
  const url = useRef<string | null>(null);

  useEffect(
    () => () => {
      if (url.current) URL.revokeObjectURL(url.current);
    },
    [],
  );

  const kodla = async (d: File[]) => {
    setHata("");
    const f = d[0];
    const mime = f.type || "image/png";
    const dataUri = await new Promise<string>((tamam, red) => {
      const r = new FileReader();
      r.onload = () => tamam(String(r.result));
      r.onerror = () => red(r.error);
      r.readAsDataURL(new Blob([f], { type: mime }));
    });
    setCikti({ ad: f.name, mime, dataUri, boyut: f.size });
  };

  const metin = cikti
    ? bicim === "uri"
      ? cikti.dataUri
      : bicim === "ham"
        ? cikti.dataUri.slice(cikti.dataUri.indexOf(",") + 1)
        : bicim === "css"
          ? `background-image: url("${cikti.dataUri}");`
          : `<img src="${cikti.dataUri}" alt="">`
    : "";

  const coz = (deger: string) => {
    setGirdi(deger);
    setHata("");
    if (url.current) URL.revokeObjectURL(url.current);
    url.current = null;
    setCozulen(null);
    const t = deger.trim();
    if (!t) return;
    try {
      const m = t.match(/^data:([^;,]+)?(;base64)?,/i);
      const govde = (m ? t.slice(m[0].length) : t)
        .replace(/\s/g, "")
        .replace(/-/g, "+")
        .replace(/_/g, "/");
      const ikili = atob(govde);
      const b = Uint8Array.from(ikili, (c) => c.charCodeAt(0));
      const mime = turBul(b) ?? m?.[1] ?? null;
      if (!mime || !mime.startsWith("image/"))
        throw new Error("Bu Base64 verisi tanınan bir görsel değil.");
      url.current = URL.createObjectURL(new Blob([b], { type: mime }));
      setCozulen({ url: url.current, mime, boyut: b.length });
    } catch (e) {
      setHata(
        e instanceof Error && e.message.includes("görsel")
          ? e.message
          : "Geçersiz Base64 metni. Başında 'data:image/…;base64,' olabilir ya da olmayabilir; boşluklar sorun değildir.",
      );
    }
  };

  const kopyala = async () => {
    try {
      await navigator.clipboard.writeText(metin);
      setKopyalandi(true);
      setTimeout(() => setKopyalandi(false), 1500);
    } catch {
      /* pano erişimi yok */
    }
  };

  return (
    <div className="date-calc gorsel-arac">
      <div
        className="date-converter-modes is-light"
        role="tablist"
        aria-label="Yön"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mod === "kodla"}
          className={mod === "kodla" ? "is-active" : undefined}
          onClick={() => setMod("kodla")}
        >
          Resim → Base64
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mod === "coz"}
          className={mod === "coz" ? "is-active" : undefined}
          onClick={() => setMod("coz")}
        >
          Base64 → Resim
        </button>
      </div>

      {mod === "kodla" ? (
        <>
          <DosyaBirak
            coklu={false}
            max={1}
            baslik="Base64'e çevrilecek görseli seçin"
            onSec={(d) => void kodla(d)}
          />
          {cikti ? (
            <>
              <p className="vesikalik-ozet">
                <b>{cikti.ad}</b> · {cikti.mime} · {boyutMetni(cikti.boyut)} →
                Base64 {boyutMetni(metin.length)}
              </p>
              <div
                className="gorsel-hedefler base64-bicim"
                role="radiogroup"
                aria-label="Çıktı biçimi"
              >
                {(
                  [
                    ["uri", "Data URI"],
                    ["ham", "Yalnız Base64"],
                    ["css", "CSS"],
                    ["html", "HTML <img>"],
                  ] as const
                ).map(([b, ad]) => (
                  <button
                    key={b}
                    type="button"
                    role="radio"
                    aria-checked={bicim === b}
                    className={bicim === b ? "is-active" : undefined}
                    onClick={() => setBicim(b)}
                  >
                    {ad}
                  </button>
                ))}
              </div>
              <textarea
                className="ocr-metin"
                readOnly
                rows={8}
                value={metin}
                aria-label="Base64 çıktısı"
                spellCheck={false}
              />
              <div className="gorsel-alt">
                <span>{metin.length.toLocaleString("tr-TR")} karakter</span>
                <button
                  type="button"
                  className="time-tool-button"
                  onClick={() => void kopyala()}
                >
                  {kopyalandi ? "Kopyalandı ✓" : "Kopyala"}
                </button>
                <button
                  type="button"
                  className="time-tool-button is-secondary"
                  onClick={() => {
                    const u = URL.createObjectURL(
                      new Blob([metin], { type: "text/plain" }),
                    );
                    indir(u, cikti.ad.replace(/\.[^.]+$/, "") + "-base64.txt");
                    setTimeout(() => URL.revokeObjectURL(u), 5000);
                  }}
                >
                  TXT indir
                </button>
              </div>
            </>
          ) : null}
        </>
      ) : (
        <>
          <label className="date-calc-field">
            <span>Base64 metnini veya data URI&apos;yi yapıştırın</span>
            <textarea
              className="ocr-metin"
              rows={8}
              value={girdi}
              onChange={(e) => coz(e.target.value)}
              placeholder="data:image/png;base64,iVBORw0KGgo…"
              spellCheck={false}
            />
          </label>
          {cozulen ? (
            <>
              <div className="filigran-onizleme">
                {/* eslint-disable-next-line @next/next/no-img-element -- yerel önizleme */}
                <img
                  src={cozulen.url}
                  alt="Çözülen görsel"
                  className="base64-resim"
                />
              </div>
              <div className="gorsel-alt">
                <span>
                  {cozulen.mime} · {boyutMetni(cozulen.boyut)}
                </span>
                <a
                  className="time-tool-button"
                  href={cozulen.url}
                  download={`gorsel.${UZANTI[cozulen.mime] ?? "bin"}`}
                >
                  Görseli indir
                </a>
              </div>
            </>
          ) : null}
        </>
      )}
      {hata ? <p className="gorsel-hata">{hata}</p> : null}
      <p className="date-calc-note">
        Dönüştürme tarayıcınızda yapılır; görseller ve yapıştırdığınız metin
        hiçbir sunucuya gönderilmez.
      </p>
    </div>
  );
}
