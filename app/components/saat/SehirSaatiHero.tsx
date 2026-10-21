"use client";

import Link from "@/app/components/SiteLink";
import { useEffect, useState } from "react";
import { trAblative } from "../../converter/turkishSuffix";

/** dosya: public/saat/<dosya>-1920.webp ve -960.webp. */
export type SehirGorseli = { dosya: string; yer: string; yazar: string; lisans: string; kaynak: string };
export type SaatSehri = { slug: string; ad: string; timeZone: string };

// Ziyaretçinin favori şehirleri ve "ana şehri" yalnızca kendi tarayıcısında tutulur.
const FAVORI_ANAHTAR = "bc-saat-favoriler";
const ANA_ANAHTAR = "bc-saat-ana-sehir";
const VARSAYILAN_FAVORILER = ["istanbul", "londra", "berlin", "new-york", "dubai", "mekke", "tokyo"];

function oku<T>(anahtar: string, yedek: T): T {
  try {
    const v = window.localStorage.getItem(anahtar);
    return v ? (JSON.parse(v) as T) : yedek;
  } catch {
    return yedek;
  }
}

function yaz(anahtar: string, deger: unknown) {
  try {
    window.localStorage.setItem(anahtar, JSON.stringify(deger));
  } catch {
    // Gizli sekmede ya da depolama kapalıyken tercih yalnızca bu oturumda kalır.
  }
}

function utcFarkiDakika(timeZone: string, an: Date) {
  const p = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "longOffset" }).formatToParts(an).find((x) => x.type === "timeZoneName")?.value ?? "";
  const m = /GMT([+-])(\d{2}):(\d{2})/.exec(p);
  return m ? (m[1] === "-" ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3])) : 0;
}

function farkYazisi(dakika: number) {
  const a = Math.abs(dakika);
  const s = Math.floor(a / 60);
  const d = a % 60;
  return `${s ? `${s} saat` : ""}${s && d ? " " : ""}${d ? `${d} dakika` : ""} ${dakika > 0 ? "ileride" : "geride"}`;
}

/** ISO hafta numarası (pazartesi başlar). */
function haftaNo(yil: number, ay: number, gun: number) {
  const t = new Date(Date.UTC(yil, ay - 1, gun));
  const g = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - g);
  const yilBasi = Date.UTC(t.getUTCFullYear(), 0, 1);
  return Math.ceil(((t.getTime() - yilBasi) / 86400000 + 1) / 7);
}

const saatYaz = (timeZone: string, an: Date) =>
  new Intl.DateTimeFormat("tr-TR", { timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(an);

/** Şehre özel fotoğrafın üzerinde ekranı dolduran canlı saat, favori şehir şeridi ve ana şehir seçimi. */
export default function SehirSaatiHero({
  sehir,
  baslik,
  ulke,
  gunes,
  gorsel,
  sehirler,
}: {
  sehir: SaatSehri;
  baslik: string;
  ulke: string;
  /** "Gün doğumu 07:32 · batımı 17:59 · gün 10 sa 27 dk" */
  gunes: string;
  gorsel: SehirGorseli | null;
  sehirler: SaatSehri[];
}) {
  // Sunucu çiziminde saat yok (derleme anının saati yanlış olurdu); sayfa açılınca dolar.
  const [an, setAn] = useState<Date | null>(null);
  const [favoriler, setFavoriler] = useState<string[]>(VARSAYILAN_FAVORILER);
  const [anaSehir, setAnaSehir] = useState("istanbul");

  useEffect(() => {
    const tik = () => setAn(new Date());
    const ilk = window.setTimeout(() => {
      tik();
      setFavoriler(oku(FAVORI_ANAHTAR, VARSAYILAN_FAVORILER));
      setAnaSehir(oku(ANA_ANAHTAR, "istanbul"));
    }, 0);
    const aralik = window.setInterval(tik, 1000);
    return () => {
      window.clearTimeout(ilk);
      window.clearInterval(aralik);
    };
  }, []);

  const bul = (slug: string) => sehirler.find((s) => s.slug === slug);
  const ana = bul(anaSehir) ?? bul("istanbul")!;
  const favoride = favoriler.includes(sehir.slug);
  const anaBu = ana.slug === sehir.slug;

  const favoriDegistir = () => {
    const yeni = favoride ? favoriler.filter((f) => f !== sehir.slug) : [...favoriler, sehir.slug];
    setFavoriler(yeni);
    yaz(FAVORI_ANAHTAR, yeni);
  };
  const anaYap = () => {
    setAnaSehir(sehir.slug);
    yaz(ANA_ANAHTAR, sehir.slug);
  };

  const parca = (opt: Intl.DateTimeFormatOptions) => (an ? new Intl.DateTimeFormat("tr-TR", { timeZone: sehir.timeZone, ...opt }).format(an) : null);
  const saat = an ? saatYaz(sehir.timeZone, an) : "--:--";
  const saniye = parca({ second: "2-digit" })?.padStart(2, "0") ?? "--";
  let tarih = "";
  if (an) {
    const y = new Intl.DateTimeFormat("en-CA", { timeZone: sehir.timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(an).split("-").map(Number);
    tarih = `${parca({ weekday: "long", day: "numeric", month: "long", year: "numeric" })} · ${haftaNo(y[0], y[1], y[2])}. hafta`;
  }
  const farkDk = an && !anaBu ? utcFarkiDakika(sehir.timeZone, an) - utcFarkiDakika(ana.timeZone, an) : null;
  const fark = farkDk === null ? null : farkDk === 0 ? `${ana.ad} ile aynı saatte` : `${trAblative(ana.ad)} ${farkYazisi(farkDk)}`;

  const serit = favoriler.map(bul).filter((s): s is SaatSehri => Boolean(s));

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
        <div className="saat-hero-ust">
          <div>
            <h1 className="saat-baslik">{baslik}</h1>
            <p className="saat-ulke">
              {ulke}
              {tarih && <> · {tarih}</>}
            </p>
          </div>
          <div className="saat-eylemler">
            <button type="button" onClick={favoriDegistir} aria-pressed={favoride}>
              {favoride ? "★ Favoride" : "☆ Favorilere ekle"}
            </button>
            <button type="button" onClick={anaYap} aria-pressed={anaBu} disabled={anaBu}>
              {anaBu ? "⌂ Ana şehrin" : "⌂ Ana şehrim yap"}
            </button>
          </div>
        </div>

        <div className="saat-dev" aria-live="off" suppressHydrationWarning>
          {saat}
          <span className="saat-sn">{saniye}</span>
        </div>

        <p className="saat-alt">
          {fark && <b>{fark}</b>}
          {fark && " · "}
          {gunes} · <a href="#ozet">Ayrıntılar ↓</a>
        </p>

        {serit.length > 0 && (
          <nav className="saat-serit" aria-label="Favori şehirler">
            {serit.map((s) => (
              <Link key={s.slug} href={`/dunya-saatleri/${s.slug}`} className={s.slug === sehir.slug ? "is-bu" : undefined} prefetch={false}>
                <span>
                  {s.ad}
                  {s.slug === ana.slug && " ⌂"}
                </span>
                <b suppressHydrationWarning>{an ? saatYaz(s.timeZone, an) : "--:--"}</b>
              </Link>
            ))}
          </nav>
        )}
      </div>
      {gorsel && (
        <a className="saat-kredi" href={gorsel.kaynak} target="_blank" rel="noreferrer">
          {gorsel.yer} · Fotoğraf: {gorsel.yazar}, {gorsel.lisans}
        </a>
      )}
    </section>
  );
}
