"use client";

import { useMemo, useState } from "react";
import {
  calculateBodyFat,
  type BodyFatCategory,
  type BodyFatInput,
  type Gender,
} from "../../converter/bodyFatCalculator";

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

const categoryLabelsUz: Record<BodyFatCategory, string> = {
  essential: "Asosiy Yog'",
  athletes: "Sportchi",
  fitness: "Fit",
  average: "O'rtacha",
  obese: "Yuqori",
};

export default function BodyFatCalculatorUz() {
  const [gender, setGender] = useState<Gender>("male");
  const [heightCm, setHeightCm] = useState("178");
  const [neckCm, setNeckCm] = useState("38");
  const [waistCm, setWaistCm] = useState("85");
  const [hipCm, setHipCm] = useState("95");

  const input: BodyFatInput = useMemo(
    () => ({
      gender,
      heightCm: parseNumericValue(heightCm),
      neckCm: parseNumericValue(neckCm),
      waistCm: parseNumericValue(waistCm),
      hipCm: parseNumericValue(hipCm),
    }),
    [gender, heightCm, neckCm, waistCm, hipCm]
  );

  const result = useMemo(() => calculateBodyFat(input), [input]);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
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
          <span>Bo&apos;yin Aylanasi (sm)</span>
          <input
            inputMode="decimal"
            type="text"
            value={neckCm}
            onChange={(event) => setNeckCm(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Bel Aylanasi (sm)</span>
          <input
            inputMode="decimal"
            type="text"
            value={waistCm}
            onChange={(event) => setWaistCm(event.target.value)}
          />
        </label>

        {gender === "female" && (
          <label className="category-general-converter-field">
            <span>Son Aylanasi (sm)</span>
            <input
              inputMode="decimal"
              type="text"
              value={hipCm}
              onChange={(event) => setHipCm(event.target.value)}
            />
          </label>
        )}
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>
            To&apos;g&apos;ri o&apos;lchamlarni kiriting (bel aylanasi
            bo&apos;yin aylanasidan katta bo&apos;lishi kerak).
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Tana Yog&apos;i Foizi</span>
              <strong>%{formatNumber(result.bodyFatPercent)}</strong>
            </div>
            <div>
              <span>Toifa</span>
              <strong>{categoryLabelsUz[result.category]}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
