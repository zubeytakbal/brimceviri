"use client";

import { useMemo, useState } from "react";
import {
  calculateIdealWeight,
  type Gender,
} from "../converter/idealWeightCalculator";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 1) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

export default function IdealWeightCalculator() {
  const [heightCm, setHeightCm] = useState("170");
  const [gender, setGender] = useState<Gender>("male");

  const result = useMemo(
    () =>
      calculateIdealWeight({
        heightCm: parseNumericValue(heightCm),
        gender,
      }),
    [heightCm, gender]
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
          <span>Cinsiyet</span>
          <select
            value={gender}
            onChange={(event) => setGender(event.target.value as Gender)}
          >
            <option value="male">Erkek</option>
            <option value="female">Kadın</option>
          </select>
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>
            152,4 cm&apos;den (60 inç) büyük geçerli bir boy girerek
            sonucu görebilirsin.
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>İdeal Kilo (Devine formülü)</span>
              <strong>{formatNumber(result)} kg</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
