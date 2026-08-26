"use client";

import { useMemo, useState } from "react";
import {
  calculateWeightComparisons,
  weightComparisonUnitToKg,
  type WeightComparisonUnit,
} from "../converter/weightComparison";

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

const unitLabels: Record<WeightComparisonUnit, string> = {
  g: "g",
  kg: "kg",
  ton: "ton",
};

export default function WeightComparisonTool() {
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState<WeightComparisonUnit>("kg");

  const valueInKg = parseNumericValue(value) * weightComparisonUnitToKg[unit];

  const comparisons = useMemo(
    () => calculateWeightComparisons(valueInKg),
    [valueInKg]
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Değer</span>
          <input
            inputMode="decimal"
            type="text"
            placeholder="Örn. 25"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Birim</span>
          <select
            value={unit}
            onChange={(event) =>
              setUnit(event.target.value as WeightComparisonUnit)
            }
          >
            <option value="g">Gram (g)</option>
            <option value="kg">Kilogram (kg)</option>
            <option value="ton">Ton</option>
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
