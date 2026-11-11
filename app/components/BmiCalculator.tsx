"use client";

import { useMemo, useState } from "react";
import type { Locale } from "../i18n/config";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import {
  activityMultipliers,
  calculateBmi,
  type ActivityLevel,
  type BmiCalculatorInput,
  type BmiCategory,
  type Gender,
} from "../converter/bmiCalculator";

type BmiCopy = {
  labels: {
    height: string;
    weight: string;
    age: string;
    gender: string;
    activity: string;
  };
  genders: Record<Gender, string>;
  categories: Record<BmiCategory, string>;
  activities: Record<ActivityLevel, string>;
  emptyState: string;
  resultLabels: {
    bmi: string;
    bmr: string;
    calories: string;
    multiplier: string;
  };
};

const copyByLocale: Record<Exclude<Locale, "ru">, BmiCopy> = {
  tr: {
    labels: {
      height: "Boy (cm)",
      weight: "Kilo (kg)",
      age: "Yaş",
      gender: "Cinsiyet",
      activity: "Aktivite Seviyesi",
    },
    genders: {
      male: "Erkek",
      female: "Kadın",
    },
    categories: {
      underweight: "Zayıf",
      normal: "Normal",
      overweight: "Fazla Kilolu",
      obese: "Obez",
    },
    activities: {
      sedentary: "Hareketsiz (masa başı, egzersiz yok)",
      light: "Az hareketli (haftada 1-3 gün egzersiz)",
      moderate: "Orta hareketli (haftada 3-5 gün egzersiz)",
      active: "Hareketli (haftada 6-7 gün egzersiz)",
      "very-active": "Çok hareketli (günde 2 kez egzersiz / fiziksel iş)",
    },
    emptyState: "Geçerli değerler girerek sonucu görebilirsin.",
    resultLabels: {
      bmi: "BMI",
      bmr: "Bazal Metabolizma Hızı",
      calories: "Günlük Kalori İhtiyacı",
      multiplier: "Aktivite Katsayısı",
    },
  },
  en: {
    labels: {
      height: "Height (cm)",
      weight: "Weight (kg)",
      age: "Age",
      gender: "Gender",
      activity: "Activity Level",
    },
    genders: {
      male: "Male",
      female: "Female",
    },
    categories: {
      underweight: "Underweight",
      normal: "Normal",
      overweight: "Overweight",
      obese: "Obese",
    },
    activities: {
      sedentary: "Sedentary (desk job, no exercise)",
      light: "Lightly active (exercise 1-3 days/week)",
      moderate: "Moderately active (exercise 3-5 days/week)",
      active: "Active (exercise 6-7 days/week)",
      "very-active": "Very active (twice-daily training / physical work)",
    },
    emptyState: "Enter valid values to see the result.",
    resultLabels: {
      bmi: "BMI",
      bmr: "Basal Metabolic Rate",
      calories: "Daily Calorie Need",
      multiplier: "Activity Multiplier",
    },
  },
  // fr: bu hesaplayıcı için Fransızca rota yok; tip güvenliği icin
  // Ingilizce kopya yeniden kullanildi.
  de: {
    labels: {
      height: "Größe (cm)",
      weight: "Gewicht (kg)",
      age: "Alter",
      gender: "Geschlecht",
      activity: "Aktivitätsniveau",
    },
    genders: {
      male: "Männlich",
      female: "Weiblich",
    },
    categories: {
      underweight: "Untergewicht",
      normal: "Normalgewicht",
      overweight: "Übergewicht",
      obese: "Adipositas",
    },
    activities: {
      sedentary: "Sitzend (Büro, kaum Bewegung)",
      light: "Leicht aktiv (Training 1-3 Tage/Woche)",
      moderate: "Mittel aktiv (Training 3-5 Tage/Woche)",
      active: "Aktiv (Training 6-7 Tage/Woche)",
      "very-active": "Sehr aktiv (2 Trainings pro Tag / körperliche Arbeit)",
    },
    emptyState: "Geben Sie gültige Werte ein, um das Ergebnis zu sehen.",
    resultLabels: {
      bmi: "BMI",
      bmr: "Grundumsatz",
      calories: "Täglicher Kalorienbedarf",
      multiplier: "Aktivitätsfaktor",
    },
  },
};

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatNumber(value: number, locale: Locale, digits = 1) {
  return formatLocalizedNumber(value, locale, { maximumFractionDigits: digits });
}

export default function BmiCalculator({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const copy = copyByLocale[locale];
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
          <span>{copy.labels.height}</span>
          <input
            inputMode="decimal"
            type="text"
            value={heightCm}
            onChange={(event) => setHeightCm(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.weight}</span>
          <input
            inputMode="decimal"
            type="text"
            value={weightKg}
            onChange={(event) => setWeightKg(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.age}</span>
          <input
            inputMode="numeric"
            type="text"
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.gender}</span>
          <select
            value={gender}
            onChange={(event) => setGender(event.target.value as Gender)}
          >
            <option value="male">{copy.genders.male}</option>
            <option value="female">{copy.genders.female}</option>
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.activity}</span>
          <select
            value={activityLevel}
            onChange={(event) =>
              setActivityLevel(event.target.value as ActivityLevel)
            }
          >
            {(Object.keys(copy.activities) as ActivityLevel[]).map((level) => (
              <option key={level} value={level}>
                {copy.activities[level]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>{copy.emptyState}</strong>
        ) : (
          <>
            <p className="paint-calculator-liters">
              {copy.resultLabels.bmi}: <strong>{formatNumber(result.bmi, locale, 1)}</strong> -{" "}
              {copy.categories[result.category]}
            </p>

            <div className="paint-calculator-result-grid">
              <div>
                <span>{copy.resultLabels.bmr}</span>
                <strong>{formatNumber(result.basalMetabolicRate, locale, 0)} kcal</strong>
              </div>
              <div>
                <span>{copy.resultLabels.calories}</span>
                <strong>{formatNumber(result.dailyCalorieNeed, locale, 0)} kcal</strong>
              </div>
              <div>
                <span>{copy.resultLabels.multiplier}</span>
                <strong>{formatNumber(activityMultipliers[activityLevel], locale, 2)}</strong>
              </div>
            </div>
          </>
        )}
      </div>

      {locale === "en" && (
        <p className="calculator-usage-hint">
          <strong>Important:</strong> This tool uses adult BMI categories and is
          intended for adults age 20 and older. BMI is a screening measure, not
          a diagnosis or a direct measure of body fat; discuss a result that
          concerns you with a qualified health-care professional.
        </p>
      )}
    </div>
  );
}
