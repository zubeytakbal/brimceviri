"use client";

// Türkçe geri sayım sayfalarının saat bölümü başlığı: siyah tam ekran alanda soru başlığı, Anton harflerle dev kalan
// gün sayısı, altında saat/dakika/saniye, önceki tarihten bu yana geçen sürenin çubuğu, tam ekran ve paylaşma.
// İlk çizim derleme anıyla yapılır (sunucu ve tarayıcı aynı HTML'i üretir), sonra tarayıcının saatiyle her saniye
// yenilenir. Hedef gün gelince "bugün" gösterir, gün bitince listedeki bir sonraki tarihe geçer.
import { useEffect, useRef, useState } from "react";

const iki = (n: number) => String(n).padStart(2, "0");
const GUN = 86400000;

export default function GeriSayimHero({
  baslik,
  ad,
  hedefler,
  oncekiMs,
  olusturma,
  tahmini,
}: {
  baslik: string;
  ad: string;
  /** Türkiye saatiyle günün başlangıcı (ms), sıradaki tarihler. */
  hedefler: number[];
  /** Bir önceki tarih (ilerleme çubuğu için). */
  oncekiMs: number | null;
  olusturma: number;
  tahmini: boolean;
}) {
  const [simdi, setSimdi] = useState(olusturma);
  const [tam, setTam] = useState(false);
  const [kopyalandi, setKopyalandi] = useState(false);
  const kutu = useRef<HTMLElement>(null);

  useEffect(() => {
    setSimdi(Date.now()); // eslint-disable-line react-hooks/set-state-in-effect
    const id = window.setInterval(() => setSimdi(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  // Tam ekran: tarayıcının tam ekranı ve ekranın kapanmaması (destekleyen tarayıcılarda).
  useEffect(() => {
    if (!tam) return;
    let kilit: { release: () => Promise<void> } | null = null;
    const nav = navigator as Navigator & { wakeLock?: { request: (t: "screen") => Promise<{ release: () => Promise<void> }> } };
    nav.wakeLock?.request("screen").then((l) => (kilit = l)).catch(() => {});
    kutu.current?.requestFullscreen?.().catch(() => {});
    const cik = () => !document.fullscreenElement && setTam(false);
    document.addEventListener("fullscreenchange", cik);
    return () => {
      kilit?.release().catch(() => {});
      document.removeEventListener("fullscreenchange", cik);
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    };
  }, [tam]);

  const hedef = hedefler.find((h) => h + GUN > simdi) ?? hedefler[hedefler.length - 1];
  const kalan = Math.max(0, hedef - simdi);
  const bugun = simdi >= hedef && simdi < hedef + GUN;
  const gun = Math.floor(kalan / GUN);
  const sa = Math.floor((kalan % GUN) / 3600000);
  const dk = Math.floor((kalan % 3600000) / 60000);
  const sn = Math.floor((kalan % 60000) / 1000);
  // Önceki tarih yalnızca ilk hedef için geçerlidir (sayfa açıkken bir sonraki yıla geçilirse çubuk gizlenir).
  const yuzde = oncekiMs !== null && hedef === hedefler[0] && hedef > oncekiMs ? Math.min(100, Math.max(0, ((simdi - oncekiMs) / (hedef - oncekiMs)) * 100)) : null;
  const tarih = new Intl.DateTimeFormat("tr-TR", { timeZone: "Europe/Istanbul", weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(hedef);

  const paylas = async () => {
    const url = location.origin + location.pathname;
    const metin = `${ad} için ${gun} gün ${sa} saat kaldı! Canlı geri sayım:`;
    try {
      if (navigator.share) await navigator.share({ title: baslik, text: metin, url });
      else {
        await navigator.clipboard.writeText(`${metin} ${url}`);
        setKopyalandi(true);
        window.setTimeout(() => setKopyalandi(false), 1500);
      }
    } catch {
      // Paylaşım iptal edildi.
    }
  };

  return (
    <section ref={kutu} className={`saat-hero gs-hero${tam ? " is-tam" : ""}`}>
      <div className="saat-hero-ic">
        <div className="saat-hero-ust">
          <div>
            <h1 className="saat-baslik">{baslik}</h1>
            <p className="saat-ulke" suppressHydrationWarning>
              {tarih}
              {tahmini ? " (tahmini)" : ""} · Türkiye saatiyle 00:00
            </p>
          </div>
          <div className="saat-eylemler">
            <button type="button" onClick={() => setTam((t) => !t)} aria-pressed={tam}>
              {tam ? "Tam ekrandan çık" : "Tam ekran"}
            </button>
            <button type="button" onClick={paylas}>
              {kopyalandi ? "Kopyalandı" : "Paylaş"}
            </button>
          </div>
        </div>

        {bugun ? (
          <p className="saat-dev gs-dev gs-bugun" role="status">
            Bugün
          </p>
        ) : (
          <div className="gs-sayac" role="timer" aria-live="off" aria-label={`${gun} gün ${sa} saat ${dk} dakika kaldı`} suppressHydrationWarning>
            <p className="saat-dev gs-dev">
              <span suppressHydrationWarning>{gun}</span>
              <small>gün</small>
            </p>
            <ul className="gs-parca" aria-hidden="true">
              {(
                [
                  [sa, "saat"],
                  [dk, "dakika"],
                  [sn, "saniye"],
                ] as const
              ).map(([v, etiket]) => (
                <li key={etiket}>
                  <b suppressHydrationWarning>{iki(v)}</b>
                  <span>{etiket}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="saat-alt" suppressHydrationWarning>
          {bugun ? (
            <>
              <b>{ad}</b> bugün. Kutlu olsun!
            </>
          ) : (
            <>
              <b>{ad}</b> için {gun ? `${gun} gün ${sa} saat` : `${sa} saat ${dk} dakika`} kaldı
              {gun >= 7 ? ` (${Math.floor(gun / 7)} hafta${gun % 7 ? ` ${gun % 7} gün` : ""})` : ""} · <a href="#ozet">Ayrıntılar ↓</a>
            </>
          )}
        </p>

        {yuzde !== null && !bugun ? (
          <div className="gs-cubuk" role="img" aria-label={`Önceki ${ad} tarihinden bu yana sürenin yüzde ${Math.floor(yuzde)}'i geçti`} suppressHydrationWarning>
            <span style={{ width: `${yuzde}%` }} />
            <small suppressHydrationWarning>%{Math.floor(yuzde)} geçti</small>
          </div>
        ) : null}
      </div>
    </section>
  );
}
