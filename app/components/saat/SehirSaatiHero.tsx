"use client";

import { useEffect, useState } from "react";

/** dosya: public/saat/<dosya>-1920.webp ve -960.webp. */
export type SehirGorseli = { dosya: string; yer: string; yazar: string; lisans: string; kaynak: string };

/** Şehre özel fotoğrafın üzerinde ekranı dolduran canlı saat. */
export default function SehirSaatiHero({
  baslik,
  ulke,
  timeZone,
  alt,
  gorsel,
}: {
  baslik: string;
  ulke: string;
  timeZone: string;
  /** Saatin altındaki tek satır: Türkiye farkı, UTC, gün doğumu/batımı. */
  alt: string;
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

  const parca = (opt: Intl.DateTimeFormatOptions) => (an ? new Intl.DateTimeFormat("tr-TR", { timeZone, ...opt }).format(an) : null);
  const saat = an ? new Intl.DateTimeFormat("tr-TR", { timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(an) : "--:--";
  const saniye = parca({ second: "2-digit" })?.padStart(2, "0") ?? "--";
  const tarih = parca({ weekday: "long", day: "numeric", month: "long", year: "numeric" }) ?? "";

  return (
    <section className={`saat-hero${gorsel ? "" : " is-gorselsiz"}`}>
      {gorsel && (
        // Başlık alanının asıl görseli; telefonda küçük, geniş ekranda büyük dosya iner.
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
        <h1 className="saat-baslik">
          {baslik}
        </h1>
        <p className="saat-ulke">
          {ulke}
          {tarih && <> · {tarih}</>}
        </p>
        <div className="saat-dev" aria-live="off" suppressHydrationWarning>
          {saat}
          <span className="saat-sn">{saniye}</span>
        </div>
        <p className="saat-alt">{alt}</p>
      </div>
      {gorsel && (
        <a className="saat-kredi" href={gorsel.kaynak} target="_blank" rel="noreferrer">
          {gorsel.yer} · Fotoğraf: {gorsel.yazar}, {gorsel.lisans}
        </a>
      )}
    </section>
  );
}
