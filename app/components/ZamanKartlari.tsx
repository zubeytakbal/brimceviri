"use client";

// Ana sayfadaki "Zaman" kartları: bugün (canlı saat, Hicri tarih, hafta), sıradaki gün (seçilebilir canlı geri sayım)
// ve gökyüzü bugün (ay evresi, İstanbul'da güneş doğuşu ve batışı). Hızlı çeviri kartlarıyla aynı görünüm.
// İlk görünüm derleme anına göre sunucuda çizilir; tarayıcıda saat her saniye, tarih ve ay evresi o anki zamana göre güncellenir.
import { useEffect, useState } from "react";
import Link from "@/app/components/SiteLink";
import { gregorianToHijri, HIJRI_MONTHS_TR } from "../converter/time/calendars";
import { isoWeek } from "../converter/time/dateMath";
import { moonState, phaseName, type PhaseName } from "../converter/time/moon";
import { sunTimes } from "../converter/time/solar";

/** Geri sayım: slug, ad ve sıradaki iki tarihin başlangıcı (ms, Türkiye saatiyle gece yarısı). */
export type KartGeriSayim = { slug: string; ad: string; anlar: number[] };

const EVRE: Record<PhaseName, string> = {
  new: "Yeni ay",
  "waxing-crescent": "Büyüyen hilal",
  first: "İlk dördün",
  "waxing-gibbous": "Büyüyen şişkin ay",
  full: "Dolunay",
  "waning-gibbous": "Küçülen şişkin ay",
  last: "Son dördün",
  "waning-crescent": "Küçülen hilal",
};
const SAKLAMA = "zamanKarti.geriSayim";
const TR = "Europe/Istanbul";
const ISTANBUL = { lat: 41.01, lon: 28.98 };

const trGun = (ms: number) => {
  const t = new Date(ms + 3 * 3600000);
  return { year: t.getUTCFullYear(), month: t.getUTCMonth() + 1, day: t.getUTCDate() };
};
const saat = (d: Date, saniye = false) =>
  new Intl.DateTimeFormat("tr-TR", { hour: "2-digit", minute: "2-digit", ...(saniye ? { second: "2-digit" } : {}), timeZone: TR }).format(d);

/** İlk çizim sunucudaki derleme anıyla yapılır (sunucu ve tarayıcı aynı HTML'i üretir), sonra tarayıcının saatine geçilir. */
function useSimdi(baslangic: number) {
  const [simdi, setSimdi] = useState(baslangic);
  useEffect(() => {
    setSimdi(Date.now()); // eslint-disable-line react-hooks/set-state-in-effect
    const id = setInterval(() => setSimdi(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return simdi;
}

/** Ayın aydınlık kısmı: k aydınlanma oranı (0–1), büyüyorsa sağ taraf aydınlıktır. */
function AyCizimi({ k, buyuyor }: { k: number; buyuyor: boolean }) {
  const r = 26;
  const rx = Math.abs(1 - 2 * k) * r;
  const d = buyuyor
    ? `M30 4 A${r} ${r} 0 0 1 30 56 A${rx} ${r} 0 0 ${k > 0.5 ? 1 : 0} 30 4`
    : `M30 4 A${r} ${r} 0 0 0 30 56 A${rx} ${r} 0 0 ${k > 0.5 ? 0 : 1} 30 4`;
  return (
    <svg viewBox="0 0 60 60" width="56" height="56" aria-hidden="true">
      <circle cx="30" cy="30" r={r} fill="#24324a" />
      <path d={d} fill="#f4ecc8" />
    </svg>
  );
}

function BugunKarti({ simdi }: { simdi: number }) {
  const g = trGun(simdi);
  const h = gregorianToHijri(g);
  const tarih = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric", weekday: "long", timeZone: TR }).format(simdi);
  return (
    <div className="hizli-kart">
      <div className="hizli-kart-baslik">
        <h3>Bugün</h3>
      </div>
      <div className="hizli-sonuc zaman-saat" aria-live="off">
        <strong suppressHydrationWarning>{saat(new Date(simdi), true)}</strong>
      </div>
      <dl className="zaman-liste">
        <div>
          <dt>Tarih</dt>
          <dd suppressHydrationWarning>{tarih}</dd>
        </div>
        <div>
          <dt>Hicri</dt>
          <dd suppressHydrationWarning>
            {h.day} {HIJRI_MONTHS_TR[h.month - 1]} {h.year}
          </dd>
        </div>
        <div>
          <dt>Hafta</dt>
          <dd suppressHydrationWarning>{isoWeek(g).week}. hafta</dd>
        </div>
      </dl>
      <p className="hizli-alt">
        <span>Türkiye saati</span>
        <Link href="/takvim">Türkiye takvimi</Link>
      </p>
    </div>
  );
}

function GeriSayimKarti({ simdi, liste }: { simdi: number; liste: KartGeriSayim[] }) {
  const siradaki = (g: KartGeriSayim) => g.anlar.find((a) => a + 86400000 > simdi) ?? g.anlar[g.anlar.length - 1];
  const enYakin = [...liste].sort((a, b) => siradaki(a) - siradaki(b))[0].slug;
  const [secili, setSecili] = useState(enYakin);
  const [ayar, setAyar] = useState(false);

  useEffect(() => {
    try {
      const kayit = localStorage.getItem(SAKLAMA);
      if (kayit && liste.some((g) => g.slug === kayit)) setSecili(kayit); // eslint-disable-line react-hooks/set-state-in-effect
    } catch {
      /* depolama kapalı */
    }
  }, [liste]);

  const g = liste.find((x) => x.slug === secili) ?? liste[0];
  const hedef = siradaki(g);
  const kalan = Math.max(0, hedef - simdi);
  const gun = Math.floor(kalan / 86400000);
  const sa = Math.floor((kalan % 86400000) / 3600000);
  const dk = Math.floor((kalan % 3600000) / 60000);
  const sn = Math.floor((kalan % 60000) / 1000);
  const tarih = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric", weekday: "long", timeZone: TR }).format(hedef);

  return (
    <div className="hizli-kart">
      <div className="hizli-kart-baslik">
        <h3>{g.ad}</h3>
        <button type="button" className="hizli-ikon" aria-label="Geri sayımı değiştir" aria-expanded={ayar} onClick={() => setAyar((a) => !a)}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" />
          </svg>
        </button>
      </div>
      {ayar ? (
        <label className="hizli-alan">
          <span>Geri sayım</span>
          <select
            value={g.slug}
            onChange={(e) => {
              setSecili(e.target.value);
              setAyar(false);
              try {
                localStorage.setItem(SAKLAMA, e.target.value);
              } catch {
                /* depolama kapalı */
              }
            }}
          >
            {liste.map((x) => (
              <option key={x.slug} value={x.slug}>
                {x.ad}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      <div className="zaman-sayac" suppressHydrationWarning>
        {kalan === 0 ? (
          <strong>Bugün!</strong>
        ) : (
          [
            [gun, "gün"],
            [sa, "saat"],
            [dk, "dakika"],
            [sn, "saniye"],
          ].map(([v, ad]) => (
            <span key={ad}>
              <strong suppressHydrationWarning>{v}</strong>
              <small>{ad}</small>
            </span>
          ))
        )}
      </div>
      <p className="zaman-not" suppressHydrationWarning>
        {tarih}
      </p>
      <p className="hizli-alt">
        <span>Canlı geri sayım</span>
        <Link href={`/geri-sayim/${g.slug}`}>{g.ad} sayfası</Link>
      </p>
    </div>
  );
}

function GokyuzuKarti({ simdi }: { simdi: number }) {
  const ay = moonState(new Date(simdi));
  const g = trGun(simdi);
  const gunes = sunTimes(g.year, g.month, g.day, ISTANBUL.lat, ISTANBUL.lon);
  return (
    <div className="hizli-kart">
      <div className="hizli-kart-baslik">
        <h3>Gökyüzü bugün</h3>
      </div>
      <div className="zaman-ay">
        <AyCizimi k={ay.illumination} buyuyor={ay.waxing} />
        <div>
          <strong suppressHydrationWarning>{EVRE[phaseName(ay.age)]}</strong>
          <span suppressHydrationWarning>%{Math.round(ay.illumination * 100)} aydınlık</span>
        </div>
      </div>
      {gunes.kind === "normal" ? (
        <dl className="zaman-liste">
          <div>
            <dt>İstanbul gün doğumu</dt>
            <dd suppressHydrationWarning>{saat(gunes.sunrise)}</dd>
          </div>
          <div>
            <dt>Gün batımı</dt>
            <dd suppressHydrationWarning>{saat(gunes.sunset)}</dd>
          </div>
        </dl>
      ) : null}
      <p className="hizli-alt">
        <Link href="/gunes-dogusu-ve-batisi">Güneş saatleri</Link>
        <Link href="/ay-evreleri">Ay evreleri</Link>
      </p>
    </div>
  );
}

export default function ZamanKartlari({ geriSayimlar, olusturma }: { geriSayimlar: KartGeriSayim[]; olusturma: number }) {
  const simdi = useSimdi(olusturma);
  return (
    <section className="hizli-cevirme" aria-labelledby="zaman-kartlari-baslik">
      <div className="hizli-cevirme-ust">
        <h2 id="zaman-kartlari-baslik">Zaman</h2>
        <p>Türkiye saati, sıradaki bayram ya da özel güne kalan süre ve bugün gökyüzünde ay ile güneş.</p>
      </div>
      <div className="hizli-kartlar">
        <BugunKarti simdi={simdi} />
        <GeriSayimKarti simdi={simdi} liste={geriSayimlar} />
        <GokyuzuKarti simdi={simdi} />
      </div>
    </section>
  );
}
