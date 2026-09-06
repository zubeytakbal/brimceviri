"use client";

import { useMemo, useState } from "react";
import {
  calculateCreatinineClearance,
  type Gender,
} from "../converter/creatinineClearanceCalculator";

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

export default function CreatinineClearanceCalculator() {
  const [age, setAge] = useState("55");
  const [weightKg, setWeightKg] = useState("70");
  const [serumCreatinine, setSerumCreatinine] = useState("1.0");
  const [gender, setGender] = useState<Gender>("male");

  const result = useMemo(
    () =>
      calculateCreatinineClearance({
        age: parseNumericValue(age),
        weightKg: parseNumericValue(weightKg),
        serumCreatinineMgDl: parseNumericValue(serumCreatinine),
        gender,
      }),
    [age, weightKg, serumCreatinine, gender]
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Yaş</span>
          <input
            inputMode="numeric"
            type="text"
            value={age}
            onChange={(event) => setAge(event.target.value)}
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
        <label className="category-general-converter-field">
          <span>Serum Kreatinin (mg/dL)</span>
          <input
            inputMode="decimal"
            type="text"
            value={serumCreatinine}
            onChange={(event) => setSerumCreatinine(event.target.value)}
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
          <strong>Geçerli değerler girerek sonucu görebilirsin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Tahmini Kreatinin Klirensi (Cockcroft-Gault)</span>
              <strong>{formatNumber(result)} mL/dk</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
