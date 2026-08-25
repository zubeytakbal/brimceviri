"use client";

import { useMemo, useState } from "react";
import {
  calculateLengthComparisons,
  lengthComparisonUnitToMeters,
  type LengthComparisonUnit,
} from "../converter/lengthComparison";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatMultiplier(ratio: number) {
  if (ratio >= 10) {
    return `${Math.round(ratio).toLocaleString("tr-TR")}×`;
  }

  return `${ratio.toLocaleString("tr-TR", { maximumFractionDigits: 2 })}×`;
}

const unitLabels: Record<LengthComparisonUnit, string> = {
  cm: "cm",
  m: "m",
  km: "km",
};

export default function LengthComparisonTool() {
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState<LengthComparisonUnit>("m");

  const valueInMeters =
    parseNumericValue(value) * lengthComparisonUnitToMeters[unit];

  const comparisons = useMemo(
    () => calculateLengthComparisons(valueInMeters),
    [valueInMeters]
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Değer</span>
          <input
            inputMode="decimal"
            type="text"
            placeholder="Örn. 3"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Birim</span>
          <select
            value={unit}
            onChange={(event) =>
              setUnit(event.target.value as LengthComparisonUnit)
            }
          >
            <option value="cm">Santimetre (cm)</option>
            <option value="m">Metre (m)</option>
            <option value="km">Kilometre (km)</option>
          </select>
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result">
        {!comparisons ? (
          <strong>Geçerli bir değer girerek karşılaştırmaları görebilirsin.</strong>
        ) : (
          <>
            <p className="length-comparison-intro">
              {value} {unitLabels[unit]} için karşılaştırmalar:
            </p>

            <div className="length-comparison-top">
              <span>En yakın karşılaştırma</span>
              <strong>
                {formatMultiplier(comparisons[0].ratio)} {comparisons[0].label}
              </strong>
            </div>

            <ul className="length-comparison-list">
              {comparisons.map((row) => (
                <li className="length-comparison-row" key={row.id}>
                  <div className="length-comparison-row-head">
                    <span>
                      {formatMultiplier(row.ratio)} {row.label}
                    </span>
                  </div>
                  <div className="length-comparison-bar-track">
                    <div
                      className="length-comparison-bar-fill"
                      style={{ width: `${Math.min(row.ratio, 1) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
