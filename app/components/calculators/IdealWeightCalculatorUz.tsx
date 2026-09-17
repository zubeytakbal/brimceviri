"use client";

import { useMemo, useState } from "react";
import {
  calculateIdealWeight,
  type Gender,
} from "../../converter/idealWeightCalculator";

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

  return value.toLocaleString("uz-UZ", { maximumFractionDigits });
}

export default function IdealWeightCalculatorUz() {
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
          <span>Bo&apos;y (sm)</span>
          <input
            inputMode="decimal"
            type="text"
            value={heightCm}
            onChange={(event) => setHeightCm(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Jinsi</span>
          <select
            value={gender}
            onChange={(event) => setGender(event.target.value as Gender)}
          >
            <option value="male">Erkak</option>
            <option value="female">Ayol</option>
          </select>
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>
            152,4 sm&apos;dan (60 dyuym) katta bo&apos;lgan haqiqiy
            bo&apos;y kiriting.
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Ideal Vazn (Devine formulasi)</span>
              <strong>{formatNumber(result)} kg</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
