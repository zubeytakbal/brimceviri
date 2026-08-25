"use client";

import { useMemo, useState } from "react";
import {
  activityMultipliers,
  calculateBmi,
  type ActivityLevel,
  type BmiCalculatorInput,
  type BmiCategory,
  type Gender,
} from "../converter/bmiCalculator";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

const categoryLabels: Record<BmiCategory, string> = {
  underweight: "Zayıf",
  normal: "Normal",
  overweight: "Fazla Kilolu",
  obese: "Obez",
};

const activityLabels: Record<ActivityLevel, string> = {
  sedentary: "Hareketsiz (masa başı, egzersiz yok)",
  light: "Az hareketli (haftada 1-3 gün egzersiz)",
  moderate: "Orta hareketli (haftada 3-5 gün egzersiz)",
  active: "Hareketli (haftada 6-7 gün egzersiz)",
  "very-active": "Çok hareketli (günde 2 kez egzersiz / fiziksel iş)",
};

function formatNumber(value: number, digits = 1) {
  return value.toLocaleString("tr-TR", { maximumFractionDigits: digits });
}

export default function BmiCalculator() {
  const [heightCm, setHeightCm] = useState("170");
  const [weightKg, setWeightKg] = useState("70");
  const [age, setAge] = useState("30");
  const [gender, setGender] = useState<Gender>("male");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");

  const input: BmiCalculatorInput = useMemo(
    () => ({
      heightCm: parseNumericValue(heightCm),
      weightKg: parseNumericValue(weightKg),
      age: parseNumericValue(age),
      gender,
      activityLevel,
    }),
    [heightCm, weightKg, age, gender, activityLevel]
  );

  const result = useMemo(() => calculateBmi(input), [input]);

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
          <span>Aktivite Seviyesi</span>
          <select
            value={activityLevel}
            onChange={(event) =>
              setActivityLevel(event.target.value as ActivityLevel)
            }
          >
            {(Object.keys(activityLabels) as ActivityLevel[]).map((level) => (
              <option key={level} value={level}>
                {activityLabels[level]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>Geçerli değerler girerek sonucu görebilirsin.</strong>
        ) : (
          <>
            <p className="paint-calculator-liters">
              BMI: <strong>{formatNumber(result.bmi, 1)}</strong> —{" "}
              {categoryLabels[result.category]}
            </p>

            <div className="paint-calculator-result-grid">
              <div>
                <span>Bazal Metabolizma Hızı</span>
                <strong>{formatNumber(result.basalMetabolicRate, 0)} kcal</strong>
              </div>
              <div>
                <span>Günlük Kalori İhtiyacı</span>
                <strong>{formatNumber(result.dailyCalorieNeed, 0)} kcal</strong>
              </div>
              <div>
                <span>Aktivite Katsayısı</span>
                <strong>{formatNumber(activityMultipliers[activityLevel], 2)}</strong>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
