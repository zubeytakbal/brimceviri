"use client";

import { useState } from "react";
import { KREDI_TURLERI, krediHesapla, type KrediTuru } from "../converter/turkishKredi";

const tl = (n: number) =>
  `${n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL`;
const yuzde = (n: number) =>
  `%${n.toLocaleString("tr-TR", { maximumFractionDigits: 4 })}`;

/** "100.000", "3,49", "100000.5" → sayı */
function parseSayi(raw: string) {
  let s = raw.replace(/[\sTL₺%]/gi, "");
  if (!s) return Number.NaN;
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
  else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, "");
  const n = Number(s);
  return Number.isFinite(n) ? n : Number.NaN;
}

export default function KrediHesaplama() {
  const [tur, setTur] = useState<KrediTuru>("ihtiyac");
  const [tutar, setTutar] = useState("100.000");
  const [vade, setVade] = useState("12");
  const [faiz, setFaiz] = useState("3,49");
  const [kkdf, setKkdf] = useState("15");
  const [bsmv, setBsmv] = useState("15");

  const turSec = (id: KrediTuru) => {
    const secilen = KREDI_TURLERI.find((t) => t.id === id)!;
    setTur(id);
    setKkdf(String(secilen.kkdf));
    setBsmv(String(secilen.bsmv));
  };

  const r = krediHesapla({
    anapara: parseSayi(tutar),
    vade: parseSayi(vade),
    aylikFaiz: parseSayi(faiz),
    kkdf: parseSayi(kkdf),
    bsmv: parseSayi(bsmv),
  });

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Kredi türü</span>
            <select value={tur} onChange={(event) => turSec(event.target.value as KrediTuru)}>
              {KREDI_TURLERI.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>
          <label className="date-calc-field">
            <span>Kredi tutarı (TL)</span>
            <input inputMode="decimal" value={tutar} onChange={(event) => setTutar(event.target.value)} />
          </label>
          <label className="date-calc-field">
            <span>Vade (ay)</span>
            <input inputMode="numeric" value={vade} onChange={(event) => setVade(event.target.value)} />
          </label>
          <label className="date-calc-field">
            <span>Aylık faiz oranı (%)</span>
            <input inputMode="decimal" value={faiz} onChange={(event) => setFaiz(event.target.value)} />
            <small>bankanın teklifindeki aylık oran</small>
          </label>
          <label className="date-calc-field">
            <span>KKDF oranı (%)</span>
            <input inputMode="decimal" value={kkdf} onChange={(event) => setKkdf(event.target.value)} />
          </label>
          <label className="date-calc-field">
            <span>BSMV oranı (%)</span>
            <input inputMode="decimal" value={bsmv} onChange={(event) => setBsmv(event.target.value)} />
          </label>
        </div>
      </div>

      {r ? (
        <>
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>Aylık taksit</span>
              <strong>{tl(r.taksit)}</strong>
              <em>
                vergiler dahil aylık oran {yuzde(r.vergiliAylikOran)}
              </em>
            </div>
            <div className="date-calc-stat">
              <span>Toplam geri ödeme</span>
              <strong>{tl(r.toplamOdeme)}</strong>
              <em>{r.plan.length} taksit</em>
            </div>
            <div className="date-calc-stat">
              <span>Toplam kredi maliyeti</span>
              <strong>{tl(r.toplamMaliyet)}</strong>
              <em>faiz + KKDF + BSMV</em>
            </div>
          </div>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <tbody>
                <tr>
                  <th scope="row">Toplam faiz</th>
                  <td>{tl(r.toplamFaiz)}</td>
                </tr>
                <tr>
                  <th scope="row">Toplam KKDF</th>
                  <td>{tl(r.toplamKkdf)}</td>
                </tr>
                <tr>
                  <th scope="row">Toplam BSMV</th>
                  <td>{tl(r.toplamBsmv)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <details className="date-calc-note">
            <summary>Ödeme planını göster ({r.plan.length} ay)</summary>
            <div className="holiday-table-wrap">
              <table className="holiday-table">
                <thead>
                  <tr>
                    <th scope="col">Ay</th>
                    <th scope="col">Taksit</th>
                    <th scope="col">Anapara</th>
                    <th scope="col">Faiz</th>
                    <th scope="col">KKDF</th>
                    <th scope="col">BSMV</th>
                    <th scope="col">Kalan anapara</th>
                  </tr>
                </thead>
                <tbody>
                  {r.plan.map((row) => (
                    <tr key={row.ay}>
                      <td>{row.ay}</td>
                      <td>{tl(row.taksit)}</td>
                      <td>{tl(row.anapara)}</td>
                      <td>{tl(row.faiz)}</td>
                      <td>{tl(row.kkdf)}</td>
                      <td>{tl(row.bsmv)}</td>
                      <td>{tl(row.kalan)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </>
      ) : (
        <p className="date-calc-note">
          Lütfen kredi tutarını, vadeyi (1–600 ay, tam sayı) ve oranları girin.
        </p>
      )}
    </div>
  );
}
