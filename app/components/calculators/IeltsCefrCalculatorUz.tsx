"use client";

import { useMemo, useState } from "react";
import { findCefrByIeltsBand, ieltsCefrTable } from "../../converter/ieltsCefrUz";

const bandOptions = Array.from({ length: 19 }, (_, index) => index * 0.5);

export default function IeltsCefrCalculatorUz() {
  const [band, setBand] = useState(6.5);

  const result = useMemo(() => findCefrByIeltsBand(band), [band]);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>IELTS Bali</span>
          <select
            value={band}
            onChange={(event) => setBand(Number(event.target.value))}
          >
            {bandOptions.map((option) => (
              <option key={option} value={option}>
                {option.toFixed(1)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>Ball tanlab CEFR darajasini ko&apos;rishingiz mumkin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>CEFR Darajasi</span>
              <strong>{result.cefrLevel}</strong>
            </div>
            <div>
              <span>Ta&apos;rifi</span>
              <strong>{result.cefrLabel}</strong>
            </div>
          </div>
        )}
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>IELTS - CEFR taxminiy mos kelish jadvali</caption>
          <thead>
            <tr>
              <th scope="col">CEFR</th>
              <th scope="col">Ta&apos;rifi</th>
              <th scope="col">IELTS Oralig&apos;i</th>
            </tr>
          </thead>
          <tbody>
            {ieltsCefrTable.map((row) => (
              <tr
                key={row.cefrLevel}
                className={result?.cefrLevel === row.cefrLevel ? "is-active" : undefined}
              >
                <td>{row.cefrLevel}</td>
                <td>{row.cefrLabel}</td>
                <td>{row.ieltsRange}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="calculator-usage-hint">
        Eslatma: IELTS rasmiy tashkilotlari (British Council, Cambridge
        English, IDP) IELTS bali bilan CEFR darajasi orasida qat&apos;iy
        bir martali moslik yo&apos;qligini alohida ta&apos;kidlaydi —
        IELTS uzluksiz 9 balli shkala, CEFR esa keng darajalar tizimi.
        Chegara ballar (masalan, 6.5-7.0 oralig&apos;i) &quot;chegara
        oldi&quot; hisoblanadi. Bu jadval umumiy yo&apos;naltiruvchi
        ma&apos;lumot, rasmiy imtiyoz/qabul shartlari uchun tegishli
        tashkilot yoki universitet talablarini tekshiring.
      </p>
    </div>
  );
}
