"use client";

import { useMemo, useState } from "react";
import { calculateBsa } from "../converter/bsaCalculator";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 2) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

export default function BsaCalculator() {
  const [heightCm, setHeightCm] = useState("170");
  const [weightKg, setWeightKg] = useState("70");

  const result = useMemo(
    () =>
      calculateBsa({
        heightCm: parseNumericValue(heightCm),
        weightKg: parseNumericValue(weightKg),
      }),
    [heightCm, weightKg]
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Boy (cm)</span>
          <input
            inputMode="decimal"
            type="text"
            value={heightCm}
            onChange={(event) => setHeightCm(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Kilo (kg)</span>
          <input
            inputMode="decimal"
            type="text"
            value={weightKg}
            onChange={(event) => setWeightKg(event.target.value)}
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>Geçerli boy ve kilo girerek sonucu görebilirsin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Vücut Yüzey Alanı (BSA)</span>
              <strong>{formatNumber(result)} m²</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
