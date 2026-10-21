"use client";

import { useEffect, useState } from "react";
import { moonPhasesBetween, moonState, phaseName, type PhaseName } from "../../converter/time/moon";
import { moonSign, ZODIAC_TR } from "../../converter/time/moonPosition";
import MoonIcon from "./MoonIcon";

// Ay evreleri sayfasının saat bölümü başlığı: gece göğünde dev, gerçek görünümlü Ay (NASA fotoğrafı, o anın evresiyle
// gölgelenmiş), Anton harflerle aydınlanma yüzdesi ve evre adı, altında dünden itibaren 7 günün ayı. İlk çizim
// derleme anıyla yapılır (sunucu ve tarayıcı aynı HTML'i üretir), sonra tarayıcının saatiyle her dakika yenilenir.

const TR = "Europe/Istanbul";
const GUN = 86400000;

const yuzde = (x: number) => `%${Math.round(x * 100)}`;
const kalan = (ms: number) => {
  const g = Math.floor(ms / GUN);
  const s = Math.floor((ms % GUN) / 3600000);
  return g ? `${g} gün ${s} saat` : `${s} saat`;
};

/** Türkiye saatiyle o günün 21:00'i (akşam görünümü; aşağıdaki şeritle aynı kural). */
function aksam(an: number, ekGun: number) {
  const p = new Intl.DateTimeFormat("en-CA", { timeZone: TR, year: "numeric", month: "2-digit", day: "2-digit" }).format(an).split("-").map(Number);
  return new Date(Date.UTC(p[0], p[1] - 1, p[2] + ekGun, 18));
}

export default function AyHero({ adlar, olusturma }: { adlar: Record<PhaseName, string>; olusturma: number }) {
  const [an, setAn] = useState(olusturma);
  useEffect(() => {
    setAn(Date.now()); // eslint-disable-line react-hooks/set-state-in-effect
    const id = window.setInterval(() => setAn(Date.now()), 60000);
    return () => window.clearInterval(id);
  }, []);

  const simdi = new Date(an);
  const durum = moonState(simdi);
  const evre = phaseName(durum.age);
  const burc = moonSign(simdi);
  const sonraki = moonPhasesBetween(simdi, new Date(an + 32 * GUN));
  const dolunay = sonraki.find((e) => e.kind === "full");
  const yeniAy = sonraki.find((e) => e.kind === "new");
  const tarih = new Intl.DateTimeFormat("tr-TR", { timeZone: TR, weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(simdi);
  const saat = new Intl.DateTimeFormat("tr-TR", { timeZone: TR, hour: "2-digit", minute: "2-digit" }).format(simdi);
  const gunler = [-1, 0, 1, 2, 3, 4, 5].map((g) => {
    const t = aksam(an, g);
    const s = moonState(t);
    return {
      g,
      ad: g === -1 ? "Dün" : g === 0 ? "Bugün" : g === 1 ? "Yarın" : new Intl.DateTimeFormat("tr-TR", { timeZone: TR, weekday: "long" }).format(t),
      s,
    };
  });

  return (
    <section className="saat-hero ay-hero">
      <div className="ay-hero-ay" aria-hidden="true">
        <MoonIcon fraction={durum.fraction} size={720} />
      </div>
      <div className="saat-hero-ic">
        <div className="saat-hero-ust">
          <div>
            <h1 className="saat-baslik">Bugün ay nasıl?</h1>
            <p className="saat-ulke" suppressHydrationWarning>
              {tarih} · Türkiye saatiyle {saat}
            </p>
          </div>
        </div>
        <div className="saat-dev ay-dev" suppressHydrationWarning>
          {yuzde(durum.illumination)}
        </div>
        <p className="ay-evre" suppressHydrationWarning>
          {adlar[evre]}
        </p>
        <p className="saat-alt" suppressHydrationWarning>
          Ay yaşı <b>{durum.age.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} gün</b> · {ZODIAC_TR[burc.sign]} burcunda
          {dolunay && (
            <>
              {" "}
              · dolunaya <b>{kalan(dolunay.date.getTime() - an)}</b>
            </>
          )}
          {yeniAy && dolunay && yeniAy.date < dolunay.date && (
            <>
              {" "}
              · yeni aya <b>{kalan(yeniAy.date.getTime() - an)}</b>
            </>
          )}{" "}
          · <a href="#ozet">Ayrıntılar ↓</a>
        </p>
        <nav className="saat-serit ay-serit" aria-label="Dünden itibaren 7 günün ayı">
          {gunler.map(({ g, ad, s }) => (
            <a key={g} href="#hafta" className={g === 0 ? "is-bu" : undefined}>
              <MoonIcon fraction={s.fraction} size={38} />
              <span suppressHydrationWarning>{ad}</span>
              <b suppressHydrationWarning>{yuzde(s.illumination)}</b>
            </a>
          ))}
        </nav>
      </div>
      <a className="saat-kredi" href="https://svs.gsfc.nasa.gov/5587/" target="_blank" rel="noreferrer">
        Ay görüntüsü: NASA Scientific Visualization Studio · evre bu sayfada hesaplanır
      </a>
    </section>
  );
}
