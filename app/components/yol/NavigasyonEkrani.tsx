"use client";

import { useEffect, useState } from "react";
import type { IlGorseli } from "./ilGorselleri";

export type ProfilNoktasi = { ad: string; km: number; rakim: number };

const MOLA_ARASI_DK = 150;
const MOLA_DK = 20;
const fmt = (n: number) => n.toLocaleString("tr-TR", { maximumFractionDigits: 0 });

function saatYaz(dk: number) {
  const m = ((Math.round(dk) % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

/** Bir km'ye varış süresi (dk): sürüş + o noktaya kadar verilen 20 dakikalık molalar (2,5 saatte bir). */
function varisDk(km: number, hiz: number) {
  const surus = (km / hiz) * 60;
  return surus + Math.max(0, Math.ceil(surus / MOLA_ARASI_DK) - 1) * MOLA_DK;
}

/** Yükselti profili: güzergâhtaki il merkezlerinin rakamından yumuşak arazi silueti (SVG yolu). */
function profilYolu(noktalar: ProfilNoktasi[], toplamKm: number, tavan: number) {
  const x = (km: number) => 50 + (km / toplamKm) * 900;
  const y = (r: number) => 300 - 40 - (r / tavan) * 200;
  const p = noktalar.map((n) => [x(n.km), y(n.rakim)] as const);
  let d = `M0,300 L0,${p[0][1].toFixed(1)} L${p[0][0].toFixed(1)},${p[0][1].toFixed(1)}`;
  for (let i = 0; i < p.length - 1; i += 1) {
    const [x1, y1] = p[i];
    const [x2, y2] = p[i + 1];
    const mx = (x1 + x2) / 2;
    d += ` C${mx.toFixed(1)},${y1.toFixed(1)} ${mx.toFixed(1)},${y2.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
  }
  return { d: `${d} L1000,${p[p.length - 1][1].toFixed(1)} L1000,300 Z`, noktalar: p };
}

/** Sıkışık duraklarda yalnızca birbirinden yeterince uzak olanların adı yazılır (uçlar her zaman). */
function etiketSec(xler: number[]) {
  const sonuc: boolean[] = [];
  let son = -999;
  xler.forEach((px, i) => {
    const uc = i === 0 || i === xler.length - 1;
    const sec = uc || (px - son > 95 && 950 - px > 95);
    if (sec && i !== xler.length - 1) son = px;
    sonuc.push(sec);
  });
  return sonuc;
}

/**
 * İller arası mesafe sayfasının açılışı: araç navigasyonu gibi tam ekran; dev mesafe, "şimdi çıkarsan" canlı
 * varış saati ve arka planda güzergâhın yükselti silueti. Çıkış saati elle de seçilebilir.
 */
export default function NavigasyonEkrani({
  baslik,
  nereden,
  nereye,
  km,
  kusUcusu,
  hiz,
  profil,
  gorsel,
}: {
  baslik: string;
  nereden: string;
  nereye: string;
  km: number;
  kusUcusu: number;
  hiz: number;
  profil: ProfilNoktasi[];
  /** Varış ilinin fotoğrafı (arka plan). */
  gorsel: IlGorseli | null;
}) {
  const [simdi, setSimdi] = useState<number | null>(null);
  const [secili, setSecili] = useState<string | null>(null);

  useEffect(() => {
    const tik = () => {
      const p = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Istanbul", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(new Date()).split(":").map(Number);
      setSimdi(p[0] * 60 + p[1]);
    };
    const ilk = window.setTimeout(tik, 0);
    const id = window.setInterval(tik, 15000);
    return () => {
      window.clearTimeout(ilk);
      window.clearInterval(id);
    };
  }, []);

  const cikis = secili ? secili.split(":").map(Number).reduce((a, b, i) => (i ? a + b : b * 60), 0) : simdi;
  const toplam = varisDk(km, hiz);
  const molalar = Math.max(0, Math.ceil(((km / hiz) * 60) / MOLA_ARASI_DK) - 1);
  const tavan = Math.max(1200, ...profil.map((p) => p.rakim)) * 1.1;
  const { d, noktalar } = profilYolu(profil, km, tavan);
  const etiketli = etiketSec(noktalar.map(([px]) => px));
  const sure = `${Math.floor(toplam / 60)} sa ${Math.round(toplam % 60)} dk`;

  return (
    <section className={`nav-ekran${gorsel ? " is-fotolu" : ""}`}>
      {gorsel && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="nav-foto"
          src={`${gorsel.taban}-1920.webp`}
          srcSet={`${gorsel.taban}-960.webp 960w, ${gorsel.taban}-1920.webp 1920w`}
          sizes="100vw"
          alt={`${nereye}: ${gorsel.yer}`}
          fetchPriority="high"
        />
      )}
      <svg className="nav-profil" viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="nav-arazi" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2b5a3f" />
            <stop offset="1" stopColor="#0d1013" />
          </linearGradient>
        </defs>
        <path d={d} fill="url(#nav-arazi)" />
        <path d={d.replace(/ L1000,300 Z$/, "").replace(/^M0,300 L/, "M")} className="nav-profil-yol" />
      </svg>
      <ol className="nav-duraklar" aria-label="Güzergâh">
        {profil.map((p, i) => (
          <li
            key={p.ad}
            style={{ left: `${(noktalar[i][0] / 10).toFixed(2)}%`, top: `${((noktalar[i][1] / 300) * 100).toFixed(2)}%` }}
            className={i === 0 || i === profil.length - 1 ? "is-uc" : etiketli[i] ? undefined : "is-gizli"}
          >
            <span>{p.ad}</span>
            <small>
              {fmt(p.km)} km · {fmt(p.rakim)} m
            </small>
          </li>
        ))}
      </ol>

      <div className="nav-ic">
        <h1 className="nav-baslik">{baslik}</h1>
        <p className="nav-yon">
          {nereden} <span aria-hidden="true">➜</span> {nereye}
        </p>
        <p className="nav-km">
          {fmt(km)}
          <small>KM</small>
        </p>
        <div className="nav-varis">
          <p>
            {secili ? `${secili}'de çıkarsan` : "Şimdi çıkarsan"} {nereye}&apos;desin:
          </p>
          <b suppressHydrationWarning>{cikis === null ? "--:--" : saatYaz(cikis + toplam)}</b>
          <span>
            {sure}
            {molalar > 0 ? ` · ${molalar} mola dahil` : ""} · ortalama {hiz} km/sa
          </span>
          <label className="nav-cikis">
            Çıkış saati
            <input type="time" value={secili ?? (cikis === null ? "" : saatYaz(cikis))} onChange={(e) => setSecili(e.target.value || null)} />
          </label>
        </div>
        <p className="nav-alt">
          Kuş uçuşu {fmt(kusUcusu)} km · <a href="#rota">Rota ve hesaplar ↓</a>
        </p>
      </div>
      {gorsel && (
        <a className="nav-kredi" href={gorsel.kaynak} target="_blank" rel="noreferrer">
          {nereye}, {gorsel.yer} · Fotoğraf: {gorsel.yazar}, {gorsel.lisans}
        </a>
      )}
    </section>
  );
}
