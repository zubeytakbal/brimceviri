"use client";

import { useState } from "react";
import {
  indirmeSuresi,
  sureMetni,
  type BoyutBirimi,
  type HizBirimi,
} from "../../converter/ag/indirme";

const BOYUTLAR: BoyutBirimi[] = ["MB", "GB", "TB", "MiB", "GiB", "TiB"];
const HIZLAR: HizBirimi[] = ["Mbps", "Gbps", "kbps", "MB/s", "KB/s"];
const HAZIR: Array<[string, number, BoyutBirimi]> = [
  ["Şarkı (MP3)", 8, "MB"],
  ["Film (HD)", 4, "GB"],
  ["Film (4K)", 20, "GB"],
  ["Telefon güncellemesi", 6, "GB"],
  ["Büyük oyun", 100, "GB"],
];
const TABLO = [8, 16, 25, 35, 50, 100, 200, 500, 1000];

/** Dosya boyutu ve bağlantı hızından indirme süresi. */
export default function IndirmeSuresi() {
  const [boyut, setBoyut] = useState("4");
  const [bb, setBb] = useState<BoyutBirimi>("GB");
  const [hiz, setHiz] = useState("100");
  const [hb, setHb] = useState<HizBirimi>("Mbps");
  const [verim, setVerim] = useState(0.9);
  const b = parseFloat(boyut.replace(",", "."));
  const h = parseFloat(hiz.replace(",", "."));
  const sn = indirmeSuresi(b, bb, h, hb, verim);
  const ideal = indirmeSuresi(b, bb, h, hb, 1);
  return (
    <div className="date-calc gorsel-arac">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Dosya boyutu</span>
            <span className="date-calc-field-row">
              <input
                type="text"
                inputMode="decimal"
                value={boyut}
                onChange={(e) => setBoyut(e.target.value)}
              />
              <select
                value={bb}
                onChange={(e) => setBb(e.target.value as BoyutBirimi)}
              >
                {BOYUTLAR.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </span>
          </label>
          <label className="date-calc-field">
            <span>İnternet hızı</span>
            <span className="date-calc-field-row">
              <input
                type="text"
                inputMode="decimal"
                value={hiz}
                onChange={(e) => setHiz(e.target.value)}
              />
              <select
                value={hb}
                onChange={(e) => setHb(e.target.value as HizBirimi)}
              >
                {HIZLAR.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </span>
          </label>
          <label className="date-calc-field">
            <span>Gerçek hız payı</span>
            <span className="date-calc-field-row">
              <select
                value={verim}
                onChange={(e) => setVerim(Number(e.target.value))}
              >
                <option value={1}>%100 (teorik)</option>
                <option value={0.9}>%90 (kablolu, iyi bağlantı)</option>
                <option value={0.7}>%70 (Wi-Fi, yoğun saat)</option>
                <option value={0.5}>%50 (zayıf Wi-Fi)</option>
              </select>
            </span>
          </label>
        </div>
        <div className="ag-ornekler">
          {HAZIR.map(([ad, v, u]) => (
            <button
              key={ad}
              type="button"
              onClick={() => {
                setBoyut(String(v));
                setBb(u);
              }}
            >
              {ad} · {v} {u}
            </button>
          ))}
        </div>
      </div>
      {sn !== null && ideal !== null ? (
        <>
          <div className="ag-buyuk-sonuc">
            <span>Tahmini indirme süresi</span>
            <strong>{sureMetni(sn)}</strong>
            {verim < 1 ? (
              <small>Teorik en kısa süre: {sureMetni(ideal)}</small>
            ) : null}
          </div>
          {hb === "Mbps" || hb === "Gbps" || hb === "kbps" ? (
            <p className="date-calc-note">
              {h.toLocaleString("tr-TR")} {hb} ≈{" "}
              <b>
                {(
                  (h * { Mbps: 1, Gbps: 1000, kbps: 0.001 }[hb]) /
                  8
                ).toLocaleString("tr-TR", {
                  maximumFractionDigits: 2,
                })}{" "}
                MB/s
              </b>{" "}
              indirme hızı (tarayıcı ve Steam gibi programlar MB/s gösterir).
            </p>
          ) : null}
          <div className="fatura-liste">
            <table>
              <thead>
                <tr>
                  <th>Hız</th>
                  <th className="s">
                    {b.toLocaleString("tr-TR")} {bb} için süre
                  </th>
                </tr>
              </thead>
              <tbody>
                {TABLO.map((t) => (
                  <tr key={t}>
                    <td>{t >= 1000 ? `${t / 1000} Gbps` : `${t} Mbps`}</td>
                    <td className="s">
                      {sureMetni(indirmeSuresi(b, bb, t, "Mbps", verim)!)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="gorsel-hata">
          Dosya boyutunu ve hızı sıfırdan büyük yazın.
        </p>
      )}
    </div>
  );
}
