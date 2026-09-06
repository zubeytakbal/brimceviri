"use client";

import { useMemo, useState } from "react";
import {
  calculateBodyFat,
  type BodyFatCategory,
  type BodyFatInput,
  type Gender,
} from "../converter/bodyFatCalculator";

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

const categoryLabels: Record<BodyFatCategory, string> = {
  essential: "Temel Yağ",
  athletes: "Sporcu",
  fitness: "Fit",
  average: "Ortalama",
  obese: "Yüksek",
};

export default function BodyFatCalculator() {
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
          <span>Cinsiyet</span>
          <select
            value={gender}
            onChange={(event) => setGender(event.target.value as Gender)}
          >
            <option value="male">Erkek</option>
            <option value="female">Kadın</option>
          </select>
        </label>

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
          <span>Boyun Çevresi (cm)</span>
          <input
            inputMode="decimal"
            type="text"
            value={neckCm}
            onChange={(event) => setNeckCm(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Bel Çevresi (cm)</span>
          <input
            inputMode="decimal"
            type="text"
            value={waistCm}
            onChange={(event) => setWaistCm(event.target.value)}
          />
        </label>

        {gender === "female" && (
          <label className="category-general-converter-field">
            <span>Kalça Çevresi (cm)</span>
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
            Geçerli ölçüler girerek sonucu görebilirsin (bel çevresi,
            boyun çevresinden büyük olmalı).
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Vücut Yağ Oranı</span>
              <strong>
                %{formatNumber(result.bodyFatPercent)}
              </strong>
            </div>
            <div>
              <span>Kategori</span>
              <strong>{categoryLabels[result.category]}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
