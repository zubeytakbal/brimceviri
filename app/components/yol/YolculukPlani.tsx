"use client";

import { useState } from "react";

type Durak = { ad: string; km: number };

const fmt = (n: number, d = 0) => n.toLocaleString("tr-TR", { maximumFractionDigits: d, minimumFractionDigits: d });
const MOLA_ARASI_DK = 150;
const MOLA_DK = 20;

function saatYaz(dakika: number) {
  const g = Math.floor(dakika / 1440);
  const m = ((Math.round(dakika) % 1440) + 1440) % 1440;
  return { saat: `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`, gun: g };
}

function sureYaz(dk: number) {
  const m = Math.round(dk);
  const s = Math.floor(m / 60);
  return s ? `${s} sa${m % 60 ? ` ${m % 60} dk` : ""}` : `${m} dk`;
}

/** Varış saati, yol üstündeki illerden geçiş saatleri ve yakıt maliyeti: çıkış saati, hız, mola ve araç tüketimine göre. */
export default function YolculukPlani({
  nereden,
  nereye,
  km,
  duraklar,
  yakitFiyati,
}: {
  nereden: string;
  nereye: string;
  km: number;
  duraklar: Durak[];
  yakitFiyati: number | null;
}) {
  const [cikis, setCikis] = useState("08:00");
  const [hiz, setHiz] = useState(85);
  const [mola, setMola] = useState(true);
  const [tuketim, setTuketim] = useState(7);
  const [fiyat, setFiyat] = useState(yakitFiyati ? Math.round(yakitFiyati * 100) / 100 : 0);
  const [kisi, setKisi] = useState(1);

  const [sa, dk] = cikis.split(":").map(Number);
  const basla = (sa || 0) * 60 + (dk || 0);
  // Belirli bir km'ye varış: sürüş süresi + o ana kadar verilen molalar.
  const varisDk = (mesafe: number) => {
    const surus = (mesafe / hiz) * 60;
    const molaSayisi = mola ? Math.floor(surus / MOLA_ARASI_DK) : 0;
    return surus + molaSayisi * MOLA_DK;
  };
  // Mola yalnızca yolun ortasında verilir: 2,5 saatin tam katında varılıyorsa son mola sayılmaz.
  const surus = (km / hiz) * 60;
  const molaSayisi = mola ? Math.max(0, Math.ceil(surus / MOLA_ARASI_DK) - 1) : 0;
  const toplam = surus + molaSayisi * MOLA_DK;
  const varis = saatYaz(basla + toplam);
  const litre = (km * tuketim) / 100;
  const maliyet = litre * fiyat;

  return (
    <div className="yol-plan">
      <div className="yol-plan-girdiler">
        <label>
          <span>Çıkış saati</span>
          <input type="time" value={cikis} onChange={(e) => setCikis(e.target.value || "08:00")} />
        </label>
        <label>
          <span>Ortalama hız</span>
          <select value={hiz} onChange={(e) => setHiz(Number(e.target.value))}>
            {[70, 80, 85, 90, 100, 110].map((v) => (
              <option key={v} value={v}>
                {v} km/sa
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Tüketim (L/100 km)</span>
          <input type="number" min={2} max={30} step={0.1} value={tuketim} onChange={(e) => setTuketim(Math.max(0, Number(e.target.value)))} />
        </label>
        <label>
          <span>Yakıt fiyatı (TL/L)</span>
          <input type="number" min={0} step={0.01} placeholder="ör. 48,50" value={fiyat || ""} onChange={(e) => setFiyat(Math.max(0, Number(e.target.value)))} />
        </label>
        <label>
          <span>Kişi sayısı</span>
          <input type="number" min={1} max={9} value={kisi} onChange={(e) => setKisi(Math.min(9, Math.max(1, Math.round(Number(e.target.value)) || 1)))} />
        </label>
        <label className="yol-plan-kutu">
          <input type="checkbox" checked={mola} onChange={(e) => setMola(e.target.checked)} />
          <span>2,5 saatte bir 20 dk mola</span>
        </label>
      </div>

      <div className="yol-plan-sonuc" aria-live="polite">
        <div>
          <small>{nereye} varış</small>
          <b>
            {varis.saat}
            {varis.gun > 0 && <em> +{varis.gun} gün</em>}
          </b>
          <span>
            {sureYaz(toplam)}
            {molaSayisi > 0 ? ` · ${molaSayisi} mola dahil` : ""}
          </span>
        </div>
        <div>
          <small>Yakıt</small>
          <b>{fmt(litre, 1)} L</b>
          <span>{fiyat > 0 ? `≈ ${fmt(maliyet)} TL` : "fiyat girin"}</span>
        </div>
        <div>
          <small>{kisi > 1 ? `Kişi başı (${kisi} kişi)` : "Gidiş-dönüş yakıt"}</small>
          <b>{fiyat > 0 ? `${fmt(kisi > 1 ? maliyet / kisi : maliyet * 2)} TL` : `${fmt(litre * 2, 1)} L`}</b>
          <span>{kisi > 1 ? "tek yön yakıt payı" : `${fmt(km * 2)} km`}</span>
        </div>
      </div>

      {duraklar.length > 0 && (
        <ol className="yol-plan-akis">
          <li>
            <b>{cikis}</b> {nereden} <small>çıkış</small>
          </li>
          {duraklar.map((d) => (
            <li key={d.ad}>
              <b>{saatYaz(basla + varisDk(d.km)).saat}</b> {d.ad} <small>{fmt(d.km)}. km</small>
            </li>
          ))}
          <li>
            <b>{varis.saat}</b> {nereye} <small>varış</small>
          </li>
        </ol>
      )}
    </div>
  );
}
