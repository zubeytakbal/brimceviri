"use client";

import { useMemo, useState } from "react";
import { calculateBsa } from "../../converter/bsaCalculator";

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

  return value.toLocaleString("uz-UZ", { maximumFractionDigits });
}

export default function BsaCalculatorUz() {
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
          <span>Bo&apos;y (sm)</span>
          <input
            inputMode="decimal"
            type="text"
            value={heightCm}
            onChange={(event) => setHeightCm(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Vazn (kg)</span>
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
          <strong>To&apos;g&apos;ri bo&apos;y va vazn kiritib natijani ko&apos;rishingiz mumkin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Tana Yuzasi Maydoni (BSA)</span>
              <strong>{formatNumber(result)} m²</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
