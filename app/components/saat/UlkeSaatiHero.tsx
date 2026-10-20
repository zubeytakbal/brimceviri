"use client";

import { useEffect, useState } from "react";
import type { SehirGorseli } from "./SehirSaatiHero";

export type HeroDilimi = { ad: string; timeZone: string; sehirler: string[] };

function utcFarkiDakika(timeZone: string, an: Date) {
  const p = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "longOffset" }).formatToParts(an).find((x) => x.type === "timeZoneName")?.value ?? "";
  const m = /GMT([+-])(\d{2}):(\d{2})/.exec(p);
  return m ? (m[1] === "-" ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3])) : 0;
}

function farkKisa(dakika: number) {
  if (dakika === 0) return "İstanbul ile aynı";
  const a = Math.abs(dakika);
  const s = Math.floor(a / 60);
  const d = a % 60;
  return `${dakika > 0 ? "+" : "−"}${s}${d ? `:${String(d).padStart(2, "0")}` : ""} sa`;
}

const saatYaz = (timeZone: string, an: Date) =>
  new Intl.DateTimeFormat("tr-TR", { timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(an);

/** Ülkenin fotoğrafı üzerinde her saat diliminin kalın, canlı saati. */
export default function UlkeSaatiHero({
  baslik,
  alt,
  dilimler,
  gorsel,
}: {
  baslik: string;
  alt: string;
  dilimler: HeroDilimi[];
  gorsel: SehirGorseli | null;
}) {
  // Sunucu çiziminde saat yok (derleme anının saati yanlış olurdu); sayfa açılınca dolar.
  const [an, setAn] = useState<Date | null>(null);
  useEffect(() => {
    const tik = () => setAn(new Date());
    const ilk = window.setTimeout(tik, 0);
    const aralik = window.setInterval(tik, 1000);
    return () => {
      window.clearTimeout(ilk);
      window.clearInterval(aralik);
    };
  }, []);

  return (
    <section className={`saat-hero ulke-hero${gorsel ? "" : " is-gorselsiz"}`}>
      {gorsel && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="saat-hero-foto"
          src={`/saat/${gorsel.dosya}-1920.webp`}
          srcSet={`/saat/${gorsel.dosya}-960.webp 960w, /saat/${gorsel.dosya}-1920.webp 1920w`}
          sizes="100vw"
          alt={gorsel.yer}
          fetchPriority="high"
        />
      )}
      <div className="saat-hero-ic">
        <h1 className="saat-baslik">{baslik}</h1>
        <p className="saat-ulke">{alt}</p>
        <ol className="ulke-dilimler">
          {dilimler.map((d) => (
            <li key={d.timeZone} className="ulke-dilim">
              <span className="ulke-dilim-ad">{d.ad}</span>
              <b className="ulke-dilim-saat" suppressHydrationWarning>
                {an ? saatYaz(d.timeZone, an) : "--:--"}
              </b>
              <span className="ulke-dilim-alt" suppressHydrationWarning>
                {d.sehirler.slice(0, 3).join(", ")}
                {an && <em> · {farkKisa(utcFarkiDakika(d.timeZone, an) - utcFarkiDakika("Europe/Istanbul", an))}</em>}
              </span>
            </li>
          ))}
        </ol>
        <p className="saat-alt">
          <a href="#dilimler">Dilimler, {dilimler.length > 4 ? "bölgeler" : "şehirler"} ve aranacak saatler ↓</a>
        </p>
      </div>
      {gorsel && (
        <a className="saat-kredi" href={gorsel.kaynak} target="_blank" rel="noreferrer">
          {gorsel.yer} · Fotoğraf: {gorsel.yazar}, {gorsel.lisans}
        </a>
      )}
    </section>
  );
}
