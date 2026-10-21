"use client";

// Yılbaşı sayacı: gece temalı büyük geri sayım (Türkiye saatiyle 00:00), kar efekti, saniye ve yazı boyutu ayarı,
// tam ekran (ekran kapanmaz), paylaşma, gece yarısı havai fişek kutlaması ve dünyada yeni yıla girmiş yerlerin
// canlı sayısı. Ayarlar bu tarayıcıda saklanır.
import { useEffect, useRef, useState } from "react";

export type YeniYilSatiri = { ad: string; ulke: string; an: number };

const ANAHTAR = "birimceviri-yilbasi-v1";
const TR_SAAT = (ms: number) => new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", timeZone: "Europe/Istanbul" }).format(ms);
const iki = (n: number) => String(n).padStart(2, "0");

type Ayar = { saniye: boolean; kar: boolean; boyut: "orta" | "buyuk" };

export function Kar() {
  // Sabit dağılım (her çizimde aynı): sunucu ve tarayıcı aynı HTML'i üretir.
  return (
    <div className="ys-kar" aria-hidden="true">
      {Array.from({ length: 36 }, (_, i) => (
        <i key={i} style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i * 0.71) % 9}s`, animationDuration: `${7 + ((i * 13) % 7)}s`, opacity: 0.35 + ((i * 7) % 6) / 10 }} />
      ))}
    </div>
  );
}

/** Basit havai fişek: tuvalde parçacık patlamaları (dosya ve kütüphane yok). */
export function HavaiFisek() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    type P = { x: number; y: number; vx: number; vy: number; omur: number; renk: string };
    let parcalar: P[] = [];
    let son = 0;
    let id = 0;
    const renkler = ["#ffd166", "#ef476f", "#06d6a0", "#118ab2", "#ffffff", "#f78c6b"];
    const boyutla = () => {
      c.width = c.clientWidth * devicePixelRatio;
      c.height = c.clientHeight * devicePixelRatio;
    };
    boyutla();
    window.addEventListener("resize", boyutla);
    const patlat = () => {
      const x = c.width * (0.15 + Math.random() * 0.7);
      const y = c.height * (0.15 + Math.random() * 0.4);
      const renk = renkler[Math.floor(Math.random() * renkler.length)];
      for (let i = 0; i < 70; i += 1) {
        const a = (i / 70) * Math.PI * 2;
        const h = (1.5 + Math.random() * 2.5) * devicePixelRatio;
        parcalar.push({ x, y, vx: Math.cos(a) * h, vy: Math.sin(a) * h, omur: 60 + Math.random() * 30, renk });
      }
    };
    const ciz = (t: number) => {
      if (t - son > 650) {
        patlat();
        son = t;
      }
      ctx.fillStyle = "rgba(5, 10, 30, 0.22)";
      ctx.fillRect(0, 0, c.width, c.height);
      parcalar = parcalar.filter((p) => p.omur > 0);
      for (const p of parcalar) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04 * devicePixelRatio;
        p.omur -= 1;
        ctx.globalAlpha = Math.max(0, p.omur / 90);
        ctx.fillStyle = p.renk;
        ctx.fillRect(p.x, p.y, 2.5 * devicePixelRatio, 2.5 * devicePixelRatio);
      }
      ctx.globalAlpha = 1;
      id = requestAnimationFrame(ciz);
    };
    id = requestAnimationFrame(ciz);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", boyutla);
    };
  }, []);
  return <canvas ref={ref} className="ys-fisek" aria-hidden="true" />;
}

export default function YilbasiSayaci({ hedefMs, yil, olusturma, sira }: { hedefMs: number; yil: number; olusturma: number; sira: YeniYilSatiri[] }) {
  const [simdi, setSimdi] = useState(olusturma);
  const [ayar, setAyar] = useState<Ayar>({ saniye: true, kar: true, boyut: "orta" });
  const [tam, setTam] = useState(false);
  const [onizleme, setOnizleme] = useState(false);
  const [kopyalandi, setKopyalandi] = useState(false);
  const kutu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSimdi(Date.now()); // eslint-disable-line react-hooks/set-state-in-effect
    setOnizleme(new URLSearchParams(location.search).has("kutlama"));
    try {
      const k = JSON.parse(localStorage.getItem(ANAHTAR) ?? "null") as Partial<Ayar> | null;
      if (k) setAyar((a) => ({ ...a, ...k }));
    } catch {
      /* depolama kapalı */
    }
    const id = setInterval(() => setSimdi(Date.now()), 250);
    return () => clearInterval(id);
  }, []);
  const ayarla = (p: Partial<Ayar>) =>
    setAyar((a) => {
      const y = { ...a, ...p };
      try {
        localStorage.setItem(ANAHTAR, JSON.stringify(y));
      } catch {
        /* depolama kapalı */
      }
      return y;
    });

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
  // Yeni yılın ilk gününde (Türkiye saatiyle) kutlama gösterilir.
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
  const birimler: Array<[number, string]> = [
    [gun, "gün"],
    [sa, "saat"],
    [dk, "dakika"],
    ...(ayar.saniye ? ([[sn, "saniye"]] as Array<[number, string]>) : []),
  ];

  return (
    <div ref={kutu} className={`ys${tam ? " is-tam" : ""} is-${ayar.boyut}`}>
      {ayar.kar ? <Kar /> : null}
      {kutlama ? <HavaiFisek /> : null}
      <div className="ys-ic">
        {kutlama ? (
          <div className="ys-kutlama" role="status">
            <strong>Mutlu yıllar {yil}!</strong>
            <span>Yeni yılınız kutlu olsun.</span>
          </div>
        ) : (
          <>
            <p className="ys-ust">{yil} yılına kalan süre</p>
            <div className="ys-sayac" role="timer" aria-live="off">
              {birimler.map(([v, ad]) => (
                <span key={ad}>
                  <strong suppressHydrationWarning>{ad === "gün" ? v : iki(v)}</strong>
                  <small>{ad}</small>
                </span>
              ))}
            </div>
            <p className="ys-hedef">1 Ocak {yil}, 00:00 (Türkiye saati)</p>
          </>
        )}
        <p className="ys-dunya" suppressHydrationWarning>
          {girenler > 0
            ? `Dünyada ${girenler} yer yeni yıla girdi${siradaki ? `; sıradaki ${siradaki.ad} (${siradaki.ulke}), Türkiye saatiyle ${TR_SAAT(siradaki.an)}` : ""}.`
            : siradaki
              ? `Yeni yıla ilk giren yer ${siradaki.ad} (${siradaki.ulke}): Türkiye saatiyle ${TR_SAAT(siradaki.an)}.`
              : ""}
        </p>
        <div className="ys-dugmeler">
          <button type="button" className="is-ana" onClick={() => setTam((t) => !t)}>
            {tam ? "Tam ekrandan çık" : "Tam ekran"}
          </button>
          <button type="button" onClick={paylas}>
            {kopyalandi ? "Bağlantı kopyalandı" : "Paylaş"}
          </button>
        </div>
        <div className="ys-ayarlar">
          <label>
            <input type="checkbox" checked={ayar.saniye} onChange={(e) => ayarla({ saniye: e.target.checked })} /> Saniye
          </label>
          <label>
            <input type="checkbox" checked={ayar.kar} onChange={(e) => ayarla({ kar: e.target.checked })} /> Kar efekti
          </label>
          <label>
            <input type="checkbox" checked={ayar.boyut === "buyuk"} onChange={(e) => ayarla({ boyut: e.target.checked ? "buyuk" : "orta" })} /> Büyük yazı
          </label>
        </div>
      </div>
    </div>
  );
}
