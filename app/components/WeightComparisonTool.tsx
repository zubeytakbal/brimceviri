"use client";

import { useMemo, useState } from "react";
import type { Locale } from "../i18n/config";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import {
  calculateWeightComparisons,
  weightComparisonUnitToKg,
  type WeightComparisonUnit,
} from "../converter/weightComparison";

const unitOptionLabels: Record<
  Locale,
  Record<WeightComparisonUnit, string>
> = {
  tr: {
    g: "Gram (g)",
    kg: "Kilogram (kg)",
    ton: "Ton",
  },
  en: {
    g: "Gram (g)",
    kg: "Kilogram (kg)",
    ton: "Ton",
  },
  de: {
    g: "Gramm (g)",
    kg: "Kilogramm (kg)",
    ton: "Tonne",
  },
};

const unitShortLabels: Record<Locale, Record<WeightComparisonUnit, string>> = {
  tr: { g: "g", kg: "kg", ton: "ton" },
  en: { g: "g", kg: "kg", ton: "ton" },
  de: { g: "g", kg: "kg", ton: "t" },
};

const referenceLabels: Record<Locale, Record<string, string>> = {
  tr: {
    kedi: "Ev kedisi (ortalama)",
    insan: "Yetişkin insan (ortalama)",
    motosiklet: "Motosiklet (ortalama)",
    at: "Binicilik ati (ortalama)",
    otomobil: "Binek otomobil (ortalama)",
    fil: "Afrika fili (yetişkin, ortalama)",
    "mavi-balina": "Mavi balina (yetişkin, ortalama)",
  },
  en: {
    kedi: "Average house cat",
    insan: "Average adult human",
    motosiklet: "Average motorcycle",
    at: "Average riding horse",
    otomobil: "Average passenger car",
    fil: "Average adult African elephant",
    "mavi-balina": "Average adult blue whale",
  },
  de: {
    kedi: "Durchschnittliche Hauskatze",
    insan: "Durchschnittlicher Erwachsener",
    motosiklet: "Durchschnittliches Motorrad",
    at: "Durchschnittliches Reitpferd",
    otomobil: "Durchschnittlicher Pkw",
    fil: "Durchschnittlicher afrikanischer Elefant",
    "mavi-balina": "Durchschnittlicher Blauwal",
  },
};

const copyByLocale: Record<
  Locale,
  {
    labels: {
      value: string;
      unit: string;
    };
    placeholder: string;
    emptyState: string;
    intro: string;
    closestMatch: string;
  }
> = {
  tr: {
    labels: {
      value: "Değer",
      unit: "Birim",
    },
    placeholder: "Orn. 25",
    emptyState: "Geçerli bir değer girerek karşılaştırmaları görebilirsin.",
    intro: "için karşılaştırmalar:",
    closestMatch: "En yakın karşılaştırma",
  },
  en: {
    labels: {
      value: "Value",
      unit: "Unit",
    },
    placeholder: "E.g. 25",
    emptyState: "Enter a valid value to see the comparisons.",
    intro: "Comparisons for",
    closestMatch: "Closest comparison",
  },
  de: {
    labels: {
      value: "Wert",
      unit: "Einheit",
    },
    placeholder: "Z. B. 25",
    emptyState: "Geben Sie einen gültigen Wert ein, um die Vergleiche zu sehen.",
    intro: "Vergleiche für",
    closestMatch: "Nächster Vergleich",
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

function formatMultiplier(ratio: number, locale: Locale) {
  if (ratio >= 10) {
    return `${formatLocalizedNumber(Math.round(ratio), locale)}x`;
  }

  return `${formatLocalizedNumber(ratio, locale, { maximumFractionDigits: 2 })}x`;
}

function getReferenceLabel(id: string, locale: Locale, fallback: string) {
  return referenceLabels[locale][id] ?? fallback;
}

// Bu dillerde "icin karsilastirmalar" ifadesi degerden sonra gelir.
const introAfterValueLocales = new Set<Locale>(["tr"]);

export default function WeightComparisonTool({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const copy = copyByLocale[locale];
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
          <span>{copy.labels.value}</span>
          <input
            inputMode="decimal"
            type="text"
            placeholder={copy.placeholder}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.unit}</span>
          <select
            value={unit}
            onChange={(event) =>
              setUnit(event.target.value as WeightComparisonUnit)
            }
          >
            <option value="g">{unitOptionLabels[locale].g}</option>
            <option value="kg">{unitOptionLabels[locale].kg}</option>
            <option value="ton">{unitOptionLabels[locale].ton}</option>
          </select>
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result">
        {!comparisons ? (
          <strong>{copy.emptyState}</strong>
        ) : (
          <>
            <p className="length-comparison-intro">
              {introAfterValueLocales.has(locale)
                ? `${value} ${unitShortLabels[locale][unit]} ${copy.intro}`
                : `${copy.intro} ${value} ${unitShortLabels[locale][unit]}:`}
            </p>

            <div className="length-comparison-top">
              <span>{copy.closestMatch}</span>
              <strong>
                {formatMultiplier(comparisons[0].ratio, locale)}{" "}
                {getReferenceLabel(comparisons[0].id, locale, comparisons[0].label)}
              </strong>
            </div>

            <ul className="length-comparison-list">
              {comparisons.map((row) => (
                <li className="length-comparison-row" key={row.id}>
                  <div className="length-comparison-row-head">
                    <span>
                      {formatMultiplier(row.ratio, locale)}{" "}
                      {getReferenceLabel(row.id, locale, row.label)}
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
