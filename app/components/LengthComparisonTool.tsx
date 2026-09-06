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
  ar: {
    cm: "سنتيمتر (سم)",
    m: "متر (م)",
    km: "كيلومتر (كم)",
  },
uz: {
    cm: "Centimeter (cm)",
    m: "Meter (m)",
    km: "Kilometer (km)",
  },
bn: {
    cm: "Centimeter (cm)",
    m: "Meter (m)",
    km: "Kilometer (km)",
  },
};

const unitShortLabels: Record<Locale, Record<LengthComparisonUnit, string>> = {
  tr: { cm: "cm", m: "m", km: "km" },
  en: { cm: "cm", m: "m", km: "km" },
  de: { cm: "cm", m: "m", km: "km" },
  ar: { cm: "سم", m: "م", km: "كم" },
uz: { cm: "cm", m: "m", km: "km" },
bn: { cm: "cm", m: "m", km: "km" },
};

const referenceLabels: Record<Locale, Record<string, string>> = {
  tr: {
    "insan-boyu": "Yetiskin insan boyu (ortalama)",
    zurafa: "Zurafa boyu (ortalama)",
    "sehir-otobusu": "Sehir otobusu uzunlugu",
    "mavi-balina": "Mavi balina uzunlugu (ortalama)",
    "futbol-sahasi": "Futbol sahasi uzunlugu",
    "eyfel-kulesi": "Eyfel Kulesi yuksekligi (anten dahil)",
    "bogaz-koprusu": "15 Temmuz Sehitler Koprusu uzunlugu",
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
    "insan-boyu": "Durchschnittliche Koerpergroesse eines Erwachsenen",
    zurafa: "Durchschnittliche Giraffenhoehe",
    "sehir-otobusu": "Laenge eines Stadtbusses",
    "mavi-balina": "Durchschnittliche Laenge eines Blauwals",
    "futbol-sahasi": "Laenge eines Fussballfelds",
    "eyfel-kulesi": "Hoehe des Eiffelturms (mit Antenne)",
    "bogaz-koprusu": "Laenge der 15.-Juli-Maertyrer-Bruecke",
  },
  ar: {
    "insan-boyu": "متوسط طول الإنسان البالغ",
    zurafa: "متوسط طول الزرافة",
    "sehir-otobusu": "طول حافلة مدينة",
    "mavi-balina": "متوسط طول الحوت الأزرق",
    "futbol-sahasi": "طول ملعب كرة قدم",
    "eyfel-kulesi": "ارتفاع برج إيفل مع الهوائي",
    "bogaz-koprusu": "طول جسر شهداء 15 يوليو",
  },
uz: {
    "insan-boyu": "Average adult human height",
    zurafa: "Average giraffe height",
    "sehir-otobusu": "City bus length",
    "mavi-balina": "Average blue whale length",
    "futbol-sahasi": "Football field length",
    "eyfel-kulesi": "Eiffel Tower height (with antenna)",
    "bogaz-koprusu": "15 July Martyrs Bridge length",
  },
bn: {
    "insan-boyu": "Average adult human height",
    zurafa: "Average giraffe height",
    "sehir-otobusu": "City bus length",
    "mavi-balina": "Average blue whale length",
    "futbol-sahasi": "Football field length",
    "eyfel-kulesi": "Eiffel Tower height (with antenna)",
    "bogaz-koprusu": "15 July Martyrs Bridge length",
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
      value: "Deger",
      unit: "Birim",
    },
    placeholder: "Orn. 3",
    emptyState: "Gecerli bir deger girerek karsilastirmalari gorebilirsin.",
    intro: "icin karsilastirmalar:",
    closestMatch: "En yakin karsilastirma",
  },
  en: {
    labels: {
      value: "Value",
      unit: "Unit",
    },
    placeholder: "E.g. 3",
    emptyState: "Enter a valid value to see the comparisons.",
    intro: "comparisons for",
    closestMatch: "Closest comparison",
  },
  de: {
    labels: {
      value: "Wert",
      unit: "Einheit",
    },
    placeholder: "Z. B. 3",
    emptyState: "Geben Sie einen gueltigen Wert ein, um die Vergleiche zu sehen.",
    intro: "Vergleiche fuer",
    closestMatch: "Naechster Vergleich",
  },
  ar: {
    labels: {
      value: "القيمة",
      unit: "الوحدة",
    },
    placeholder: "مثال: 3",
    emptyState: "أدخل قيمة صحيحة لعرض المقارنات.",
    intro: "مقارنات للقيمة",
    closestMatch: "أقرب مقارنة",
  },
uz: {
    labels: {
      value: "Value",
      unit: "Unit",
    },
    placeholder: "E.g. 3",
    emptyState: "Enter a valid value to see the comparisons.",
    intro: "comparisons for",
    closestMatch: "Closest comparison",
  },
bn: {
    labels: {
      value: "Value",
      unit: "Unit",
    },
    placeholder: "E.g. 3",
    emptyState: "Enter a valid value to see the comparisons.",
    intro: "comparisons for",
    closestMatch: "Closest comparison",
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
              {locale === "en"
                ? `${copy.intro} ${value} ${unitShortLabels[locale][unit]}:`
                : locale === "ar"
                  ? `${copy.intro} ${value} ${unitShortLabels[locale][unit]}`
                : `${value} ${unitShortLabels[locale][unit]} ${copy.intro}`}
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
