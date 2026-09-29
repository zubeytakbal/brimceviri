"use client";

import { useState } from "react";
import {
  AYLAR,
  nettenBrute,
  yillikBordro,
  type MaasSecenek,
} from "../converter/turkishMaas";

const tl = (n: number) =>
  `${n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL`;

function sayi(raw: string) {
  let s = raw.replace(/[\sTL₺]/gi, "");
  if (!s) return Number.NaN;
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
  else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, "");
  const n = Number(s);
  return Number.isFinite(n) ? n : Number.NaN;
}

export default function MaasHesaplama() {
  const [yon, setYon] = useState<"brut" | "net">("brut");
  const [tutar, setTutar] = useState("50.000");
  const [emekli, setEmekli] = useState(false);
  const [tesvik, setTesvik] = useState<0 | 2 | 5>(0);

  const t = sayi(tutar);
  const s: MaasSecenek = { emekli, tesvikPuan: tesvik };
  const r =
    Number.isFinite(t) && t > 0
      ? yon === "brut"
        ? yillikBordro(t, s)
        : nettenBrute(t, s)
      : null;

  return (
    <div className="date-calc">
      <div className="date-converter-modes is-light" role="tablist">
        {(
          [
            ["brut", "Brütten nete"],
            ["net", "Netten brüte"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={yon === id}
            className={yon === id ? "is-active" : undefined}
            onClick={() => setYon(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>
              {yon === "brut"
                ? "Aylık brüt maaş (TL)"
                : "İstenen aylık net maaş (TL)"}
            </span>
            <input
              inputMode="decimal"
              value={tutar}
              onChange={(event) => setTutar(event.target.value)}
            />
          </label>
          {!emekli && (
            <label className="date-calc-field">
              <span>İşveren teşviki</span>
              <select
                value={tesvik}
                onChange={(event) =>
                  setTesvik(Number(event.target.value) as 0 | 2 | 5)
                }
              >
                <option value={0}>Teşviksiz</option>
                <option value={2}>2 puan (imalat dışı)</option>
                <option value={5}>5 puan (imalat sektörü)</option>
              </select>
              <small>yalnız işveren maliyetini etkiler</small>
            </label>
          )}
        </div>
        <div className="date-calc-checks">
          <label>
            <input
              type="checkbox"
              checked={emekli}
              onChange={(event) => setEmekli(event.target.checked)}
            />{" "}
            Emekli çalışan (SGDP)
          </label>
        </div>
      </div>

      {r ? (
        <>
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>
                {yon === "brut" ? "Ocak ayı net maaş" : "Ocak ayı brüt maaş"}
              </span>
              <strong>
                {tl(yon === "brut" ? r.aylar[0].net : r.aylar[0].brut)}
              </strong>
              <em>
                {yon === "brut"
                  ? `Aralık: ${tl(r.aylar[11].net)} · yıllık ortalama ${tl(r.netYil / 12)}`
                  : `Aralık: ${tl(r.aylar[11].brut)} · vergi dilimi arttıkça brüt yükselir`}
              </em>
            </div>
            <div className="date-calc-stat">
              <span>Yıllık net</span>
              <strong>{tl(r.netYil)}</strong>
              <em>yıllık brüt {tl(r.brutYil)}</em>
            </div>
            {!emekli && (
              <div className="date-calc-stat">
                <span>İşverene aylık maliyet (Ocak)</span>
                <strong>{tl(r.aylar[0].isverenMaliyeti)}</strong>
                <em>
                  SGK %{(21.75 - tesvik).toLocaleString("tr-TR")} + işsizlik %2
                </em>
              </div>
            )}
          </div>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <thead>
                <tr>
                  <th scope="col">Ay</th>
                  <th scope="col">Net</th>
                  <th scope="col">Brüt</th>
                  <th scope="col">Gelir vergisi</th>
                  <th scope="col">SGK + işsizlik</th>
                  <th scope="col">Damga</th>
                </tr>
              </thead>
              <tbody>
                {r.aylar.map((a) => (
                  <tr key={a.ay}>
                    <td>{AYLAR[a.ay - 1]}</td>
                    <td>
                      <strong>{tl(a.net)}</strong>
                    </td>
                    <td>{tl(a.brut)}</td>
                    <td>{tl(a.gelirVergisi)}</td>
                    <td>{tl(a.sgk + a.issizlik)}</td>
                    <td>{tl(a.damga)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="date-calc-note">
            Gelir vergisi yıl içindeki toplam (kümülatif) matraha göre
            hesaplandığı için üst dilime geçilen aylarda net maaş düşer. Asgari
            ücret kadar kısmın gelir ve damga vergisi alınmaz.
          </p>
        </>
      ) : (
        <p className="date-calc-note">Lütfen bir tutar girin.</p>
      )}
    </div>
  );
}
