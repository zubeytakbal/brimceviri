"use client";

// Yılbaşı geri sayımının saat bölümü görünümü: fotoğrafın üstünde ekranı dolduran kalın sayaç (Türkiye saatiyle
// 1 Ocak 00:00), tam ekran (ekran kapanmaz), paylaşma, dünyada yeni yıla girenlerin canlı sayısı ve gece yarısı
// havai fişek kutlaması.
import { useEffect, useRef, useState } from "react";
import type { SehirGorseli } from "../saat/SehirSaatiHero";
import { HavaiFisek, type YeniYilSatiri } from "./YilbasiSayaci";

const TR_SAAT = (ms: number) => new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", timeZone: "Europe/Istanbul" }).format(ms);
const iki = (n: number) => String(n).padStart(2, "0");

export default function YilbasiHero({
  hedefMs,
  yil,
  olusturma,
  sira,
  alt,
  gorsel,
}: {
  hedefMs: number;
  yil: number;
  olusturma: number;
  sira: YeniYilSatiri[];
  /** "1 Ocak 2027 Cuma · 00:00 (Türkiye saati)" */
  alt: string;
  gorsel: SehirGorseli | null;
}) {
  // İlk çizim derleme anına göre yapılır (gün sayısı doğru), saniyeler sayfa açılınca işler.
  const [simdi, setSimdi] = useState(olusturma);
  const [canli, setCanli] = useState(false);
  const [tam, setTam] = useState(false);
  const [onizleme, setOnizleme] = useState(false);
  const [kopyalandi, setKopyalandi] = useState(false);
  const kutu = useRef<HTMLElement>(null);

  useEffect(() => {
    const ilk = window.setTimeout(() => {
      setSimdi(Date.now());
      setCanli(true);
      setOnizleme(new URLSearchParams(location.search).has("kutlama"));
    }, 0);
    const id = window.setInterval(() => setSimdi(Date.now()), 250);
    return () => {
      window.clearTimeout(ilk);
      window.clearInterval(id);
    };
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

  const kalan = Math.max(0, hedefMs - simdi);
  const kutlama = onizleme || (simdi >= hedefMs && simdi < hedefMs + 86400000);
  const gun = Math.floor(kalan / 86400000);
  const sa = Math.floor((kalan % 86400000) / 3600000);
  const dk = Math.floor((kalan % 3600000) / 60000);
  const sn = Math.floor((kalan % 60000) / 1000);
  const girenler = sira.filter((s) => s.an <= simdi).length;
  const siradaki = sira.find((s) => s.an > simdi);

  const paylas = async () => {
    const url = location.origin + location.pathname;
    const metin = `Yılbaşına ${gun} gün ${sa} saat kaldı! Canlı geri sayım:`;
    try {
      if (navigator.share) await navigator.share({ title: "Yılbaşı geri sayım", text: metin, url });
      else {
        await navigator.clipboard.writeText(`${metin} ${url}`);
        setKopyalandi(true);
        setTimeout(() => setKopyalandi(false), 1500);
      }
    } catch {
      /* paylaşım iptal edildi */
    }
  };

  return (
    <section ref={kutu} className={`saat-hero gs-hero${gorsel ? "" : " is-gorselsiz"}${tam ? " is-tam" : ""}`}>
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
      {kutlama ? <HavaiFisek /> : null}
      <div className="saat-hero-ic">
        <div className="saat-hero-ust">
          <div>
            <h1 className="saat-baslik">Yılbaşına kaç gün kaldı?</h1>
            <p className="saat-ulke">{alt}</p>
          </div>
          <div className="saat-eylemler">
            <button type="button" onClick={() => setTam((t) => !t)} aria-pressed={tam}>
              {tam ? "Tam ekrandan çık" : "⛶ Tam ekran"}
            </button>
            <button type="button" onClick={paylas}>
              {kopyalandi ? "Bağlantı kopyalandı" : "↗ Paylaş"}
            </button>
          </div>
        </div>

        {kutlama ? (
          <div className="gs-dev gs-kutlama" role="status">
            MUTLU YILLAR <span>{yil}</span>
          </div>
        ) : (
          <div className="gs-sayac" role="timer" aria-live="off">
            <div className="gs-dev">
              <span suppressHydrationWarning>{gun}</span>
              <small>gün</small>
            </div>
            <div className="gs-saat" suppressHydrationWarning>
              {iki(sa)}
              <small>sa</small> {iki(dk)}
              <small>dk</small> {canli ? iki(sn) : "--"}
              <small>sn</small>
            </div>
          </div>
        )}

        <p className="saat-alt" suppressHydrationWarning>
          {girenler > 0 ? (
            <>
              <b>Dünyada {girenler} yer yeni yıla girdi</b>
              {siradaki && <> · sıradaki {siradaki.ad} ({siradaki.ulke}), Türkiye saatiyle {TR_SAAT(siradaki.an)}</>}
            </>
          ) : (
            sira[0] && (
              <>
                <b>Yeni yıla ilk giren: {sira[0].ad}</b> ({sira[0].ulke}), Türkiye saatiyle {TR_SAAT(sira[0].an)}
              </>
            )
          )}{" "}
          · <a href="#dunya">Dünyada yeni yıl ↓</a>
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
