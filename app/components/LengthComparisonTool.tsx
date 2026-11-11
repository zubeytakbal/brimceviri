"use client";

import { useMemo, useState } from "react";
import type { Locale } from "../i18n/config";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import {
  calculateLengthComparisons,
  lengthComparisonUnitToMeters,
  type LengthComparisonUnit,
} from "../converter/lengthComparison";

const unitOptionLabels: Record<
  Locale,
  Record<LengthComparisonUnit, string>
> = {
  tr: {
    cm: "Santimetre (cm)",
    m: "Metre (m)",
    km: "Kilometre (km)",
  },
  en: {
    cm: "Centimeter (cm)",
    m: "Meter (m)",
    km: "Kilometer (km)",
  },
  de: {
    cm: "Zentimeter (cm)",
    m: "Meter (m)",
    km: "Kilometer (km)",
  },
};

const unitShortLabels: Record<Locale, Record<LengthComparisonUnit, string>> = {
  tr: { cm: "cm", m: "m", km: "km" },
  en: { cm: "cm", m: "m", km: "km" },
  de: { cm: "cm", m: "m", km: "km" },
};

const referenceLabels: Record<Locale, Record<string, string>> = {
  tr: {
    "insan-boyu": "Yetişkin insan boyu (ortalama)",
    zurafa: "Zürafa boyu (ortalama)",
    "sehir-otobusu": "Şehir otobüsü uzunluğu",
    "mavi-balina": "Mavi balina uzunluğu (ortalama)",
    "futbol-sahasi": "Futbol sahası uzunluğu",
    "eyfel-kulesi": "Eyfel Kulesi yüksekliği (anten dahil)",
    "bogaz-koprusu": "15 Temmuz Şehitler Köprüsü uzunluğu",
  },
  en: {
    "insan-boyu": "Average adult human height",
    zurafa: "Average giraffe height",
    "sehir-otobusu": "City bus length",
    "mavi-balina": "Average blue whale length",
    "futbol-sahasi": "Football field length",
    "eyfel-kulesi": "Eiffel Tower height (with antenna)",
    "bogaz-koprusu": "15 July Martyrs Bridge length",
  },
  de: {
    "insan-boyu": "Durchschnittliche Körpergröße eines Erwachsenen",
    zurafa: "Durchschnittliche Giraffenhöhe",
    "sehir-otobusu": "Länge eines Stadtbusses",
    "mavi-balina": "Durchschnittliche Länge eines Blauwals",
    "futbol-sahasi": "Länge eines Fußballfelds",
    "eyfel-kulesi": "Höhe des Eiffelturms (mit Antenne)",
    "bogaz-koprusu": "Länge der 15.-Juli-Märtyrer-Brücke",
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
    placeholder: "Orn. 3",
    emptyState: "Geçerli bir değer girerek karşılaştırmaları görebilirsin.",
    intro: "için karşılaştırmalar:",
    closestMatch: "En yakın karşılaştırma",
  },
  en: {
    labels: {
      value: "Value",
      unit: "Unit",
    },
    placeholder: "E.g. 3",
    emptyState: "Enter a valid value to see the comparisons.",
    intro: "Comparisons for",
    closestMatch: "Closest comparison",
  },
  de: {
    labels: {
      value: "Wert",
      unit: "Einheit",
    },
    placeholder: "Z. B. 3",
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

export default function LengthComparisonTool({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const copy = copyByLocale[locale];
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState<LengthComparisonUnit>("m");

  const valueInMeters =
    parseNumericValue(value) * lengthComparisonUnitToMeters[unit];

  const comparisons = useMemo(
    () => calculateLengthComparisons(valueInMeters),
    [valueInMeters]
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
              setUnit(event.target.value as LengthComparisonUnit)
            }
          >
            <option value="cm">{unitOptionLabels[locale].cm}</option>
            <option value="m">{unitOptionLabels[locale].m}</option>
            <option value="km">{unitOptionLabels[locale].km}</option>
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
