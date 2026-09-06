"use client";

import { useState } from "react";
import { findClosestHardnessRow, hardnessTable } from "../converter/hardnessConversion";

type Scale = "hb" | "hrc" | "hrb" | "hv";

const scaleLabels: Record<Scale, string> = {
  hb: "Brinell (HB)",
  hrc: "Rockwell C (HRC)",
  hrb: "Rockwell B (HRB)",
  hv: "Vickers (HV)",
};

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

export default function HardnessConversionCalculator() {
  const [scale, setScale] = useState<Scale>("hrc");
  const [valueInput, setValueInput] = useState("50");

  const value = parseNumericValue(valueInput);
  const result = value !== null ? findClosestHardnessRow(scale, value) : null;

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Sertlik Ölçeği</span>
          <select value={scale} onChange={(event) => setScale(event.target.value as Scale)}>
            {(Object.keys(scaleLabels) as Scale[]).map((key) => (
              <option key={key} value={key}>
                {scaleLabels[key]}
              </option>
            ))}
          </select>
        </label>
        <label className="category-general-converter-field">
          <span>Değer</span>
          <input
            type="text"
            inputMode="decimal"
            value={valueInput}
            onChange={(event) => setValueInput(event.target.value)}
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>Geçerli bir değer girerek en yakın eşdeğer sertlik değerlerini gör.</strong>
        ) : (
          <strong>
            En yakın eşdeğer: {result.hb} HB
            {" · "}
            {result.hrc !== null ? `${result.hrc} HRC` : "— HRC"}
            {" · "}
            {result.hrb !== null ? `${result.hrb} HRB` : "— HRB"}
            {" · "}
            {result.hv} HV
          </strong>
        )}
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>Sertlik Dönüşüm Tablosu (ASTM E140, çelikler için)</caption>
          <thead>
            <tr>
              <th scope="col">Brinell (HB)</th>
              <th scope="col">Rockwell C (HRC)</th>
              <th scope="col">Rockwell B (HRB)</th>
              <th scope="col">Vickers (HV)</th>
            </tr>
          </thead>
          <tbody>
            {hardnessTable.map((row) => (
              <tr key={row.id} className={row.id === result?.id ? "is-active" : undefined}>
                <td>{row.hb}</td>
                <td>{row.hrc ?? "—"}</td>
                <td>{row.hrb ?? "—"}</td>
                <td>{row.hv}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="calculator-usage-hint">
        <strong>Not:</strong> Bu dönüşümler ASTM E140 standardına dayanır ve
        yalnızca ısıl işlem görmüş/görmemiş çelikler için geçerlidir;
        paslanmaz çelik, alüminyum, bakır alaşımları ve dökme demir için
        kullanılmamalıdır. Değerler ±%5 civarında yaklaşık olup gerçek
        ölçüm yerine geçmez.
      </p>
    </div>
  );
}
