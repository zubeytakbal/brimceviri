"use client";

import { useState } from "react";
import { convert } from "../../converter/convert";

const targetUnits = [
  { symbol: "g/cm³", label: "g/cm³" },
  { symbol: "kg/L", label: "kg/L" },
  { symbol: "g/mL", label: "g/mL" },
  { symbol: "lb/ft³", label: "lb/ft³" },
  { symbol: "lb/in³", label: "lb/in³" },
];

type MaterialDensityConverterUzProps = {
  densityKgM3: number;
  materialName: string;
};

export default function MaterialDensityConverterUz({
  densityKgM3,
  materialName,
}: MaterialDensityConverterUzProps) {
  const [targetSymbol, setTargetSymbol] = useState(targetUnits[0].symbol);
  const convertedValue = convert("yogunluk", densityKgM3, "kg/m³", targetSymbol);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>{materialName} Zichligini Aylantirish</span>
          <select
            value={targetSymbol}
            onChange={(event) => setTargetSymbol(event.target.value)}
          >
            {targetUnits.map((unit) => (
              <option key={unit.symbol} value={unit.symbol}>
                {unit.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <tbody>
              <tr className="is-active">
                <td>
                  <strong>{densityKgM3.toLocaleString("uz-UZ")} kg/m³</strong>
                </td>
                <td>
                  <strong>
                    {convertedValue.toLocaleString("uz-UZ", {
                      maximumFractionDigits: 4,
                    })}{" "}
                    {targetSymbol}
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
