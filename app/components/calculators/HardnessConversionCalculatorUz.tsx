"use client";

import { useState } from "react";
import { findClosestHardnessRow, hardnessTable } from "../../converter/hardnessConversion";

type Scale = "hb" | "hrc" | "hrb" | "hv";

const scaleLabels: Record<Scale, string> = {
  hb: "Brinell (HB)",
  hrc: "Rokvell C (HRC)",
  hrb: "Rokvell B (HRB)",
  hv: "Vikkers (HV)",
};

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

export default function HardnessConversionCalculatorUz() {
  const [scale, setScale] = useState<Scale>("hrc");
  const [valueInput, setValueInput] = useState("50");

  const value = parseNumericValue(valueInput);
  const result = value !== null ? findClosestHardnessRow(scale, value) : null;

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Qattiqlik Shkalasi</span>
          <select value={scale} onChange={(event) => setScale(event.target.value as Scale)}>
            {(Object.keys(scaleLabels) as Scale[]).map((key) => (
              <option key={key} value={key}>
                {scaleLabels[key]}
              </option>
            ))}
          </select>
        </label>
        <label className="category-general-converter-field">
          <span>Qiymat</span>
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
          <strong>To&apos;g&apos;ri qiymat kiritib eng yaqin ekvivalent qattiqlik qiymatlarini ko&apos;ring.</strong>
        ) : (
          <strong>
            Eng yaqin ekvivalent: {result.hb} HB
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
          <caption>Qattiqlik Aylantirish Jadvali (ASTM E140, po&apos;latlar uchun)</caption>
          <thead>
            <tr>
              <th scope="col">Brinell (HB)</th>
              <th scope="col">Rokvell C (HRC)</th>
              <th scope="col">Rokvell B (HRB)</th>
              <th scope="col">Vikkers (HV)</th>
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
        <strong>Eslatma:</strong> Bu aylantirishlar ASTM E140 standartiga
        asoslangan va faqat issiqlik ishlovi ko&apos;rgan/ko&apos;rmagan po&apos;latlar
        uchun amal qiladi; zanglamaydigan po&apos;lat, alyuminiy, mis
        qotishmalari va cho&apos;yan uchun ishlatilmasligi kerak. Qiymatlar
        taxminan ±5% aniqlikda bo&apos;lib, haqiqiy o&apos;lchov o&apos;rnini bosmaydi.
      </p>
    </div>
  );
}
