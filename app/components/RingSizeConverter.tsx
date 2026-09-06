"use client";

import { useMemo, useState } from "react";
import {
  type RingSizeRow,
  type RingSizeSystem,
  findRingSizeRowByNumber,
  findRingSizeRowByUk,
  ringSizeRows,
} from "../converter/ringSizeTable";

type Locale = "tr" | "en" | "de" | "ar";

const systemLabels: Record<Locale, Record<RingSizeSystem, string>> = {
  tr: {
    diameterMm: "TR (Ic Cap mm)",
    circumferenceMm: "Avrupa (Cevre mm)",
    us: "ABD (US)",
    uk: "Ingiltere (UK)",
  },
  en: {
    diameterMm: "Diameter (mm)",
    circumferenceMm: "Europe (Circumference mm)",
    us: "US",
    uk: "UK",
  },
  de: {
    diameterMm: "Innendurchmesser (mm)",
    circumferenceMm: "EU Umfang (mm)",
    us: "US",
    uk: "UK",
  },
  ar: {
    diameterMm: "القطر الداخلي (مم)",
    circumferenceMm: "المحيط الأوروبي (مم)",
    us: "US",
    uk: "UK",
  },
};

const copy = {
  tr: {
    knownSystem: "Bildigin Sistem",
    value: "Deger",
    matchingSizes: "Eslesen Bedenler",
    invalidValue: "Gecerli bir deger secerek sonucu gorebilirsin.",
    diameterResult: "TR (mm)",
    circumferenceResult: "Avrupa (mm)",
    usResult: "ABD (US)",
    ukResult: "Ingiltere (UK)",
    chartCaption: "Yuzuk beden tablosu",
  },
  en: {
    knownSystem: "Known System",
    value: "Value",
    matchingSizes: "Matching Sizes",
    invalidValue: "Choose a valid value to see the closest match.",
    diameterResult: "Diameter (mm)",
    circumferenceResult: "Europe (mm)",
    usResult: "US",
    ukResult: "UK",
    chartCaption: "Ring size chart",
  },
  de: {
    knownSystem: "Bekanntes System",
    value: "Wert",
    matchingSizes: "Passende Groessen",
    invalidValue: "Waehlen Sie einen gueltigen Wert fuer den naechsten Treffer.",
    diameterResult: "Durchmesser (mm)",
    circumferenceResult: "Umfang (mm)",
    usResult: "US",
    ukResult: "UK",
    chartCaption: "Ringgroessentabelle",
  },
  ar: {
    knownSystem: "النظام المعروف",
    value: "القيمة",
    matchingSizes: "المقاسات المطابقة",
    invalidValue: "اختر قيمة صحيحة لعرض أقرب مقاس.",
    diameterResult: "القطر (مم)",
    circumferenceResult: "المحيط (مم)",
    usResult: "US",
    ukResult: "UK",
    chartCaption: "جدول مقاسات الخواتم",
  },
} as const;

const systemOrder: RingSizeSystem[] = [
  "diameterMm",
  "circumferenceMm",
  "us",
  "uk",
];

function getNumberLocale(locale: Locale) {
  if (locale === "tr") {
    return "tr-TR";
  }

  if (locale === "de") {
    return "de-DE";
  }

  if (locale === "ar") {
    return "ar";
  }

  return "en-US";
}

function formatMm(value: number, locale: Locale) {
  return value.toLocaleString(getNumberLocale(locale), {
    maximumFractionDigits: 1,
  });
}

function formatUs(value: number, locale: Locale) {
  return value.toLocaleString(getNumberLocale(locale), {
    maximumFractionDigits: 1,
  });
}

export default function RingSizeConverter({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const [system, setSystem] = useState<RingSizeSystem>("diameterMm");
  const [numericValue, setNumericValue] = useState("17");
  const [ukValue, setUkValue] = useState("N");

  const localizedCopy = copy[locale];
  const localizedSystemLabels = systemLabels[locale];

  const matchedRow: RingSizeRow | null = useMemo(() => {
    if (system === "uk") {
      return findRingSizeRowByUk(ukValue);
    }

    const normalized = numericValue.trim().replace(/,/g, ".");

    if (!normalized) {
      return null;
    }

    const parsed = Number(normalized);

    if (!Number.isFinite(parsed)) {
      return null;
    }

    return findRingSizeRowByNumber(system, parsed);
  }, [system, numericValue, ukValue]);

  return (
    <div className="category-general-converter ring-size-converter">
      <div className="shoe-size-converter-grid">
        <label className="category-general-converter-field">
          <span>{localizedCopy.knownSystem}</span>
          <select
            value={system}
            onChange={(event) => {
              setSystem(event.target.value as RingSizeSystem);
            }}
          >
            {systemOrder.map((systemKey) => (
              <option key={systemKey} value={systemKey}>
                {localizedSystemLabels[systemKey]}
              </option>
            ))}
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>{localizedCopy.value}</span>
          {system === "uk" ? (
            <select
              value={ukValue}
              onChange={(event) => {
                setUkValue(event.target.value);
              }}
            >
              {ringSizeRows.map((row) => (
                <option key={row.uk} value={row.uk}>
                  {row.uk}
                </option>
              ))}
            </select>
          ) : (
            <input
              inputMode="decimal"
              type="text"
              value={numericValue}
              onChange={(event) => {
                setNumericValue(event.target.value);
              }}
            />
          )}
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result">
        <p>{localizedCopy.matchingSizes}</p>

        {!matchedRow ? (
          <strong>{localizedCopy.invalidValue}</strong>
        ) : (
          <div className="shoe-size-converter-result-grid">
            <div>
              <span>{localizedCopy.diameterResult}</span>
              <strong>{formatMm(matchedRow.diameterMm, locale)} mm</strong>
            </div>
            <div>
              <span>{localizedCopy.circumferenceResult}</span>
              <strong>{formatMm(matchedRow.circumferenceMm, locale)} mm</strong>
            </div>
            <div>
              <span>{localizedCopy.usResult}</span>
              <strong>{formatUs(matchedRow.us, locale)}</strong>
            </div>
            <div>
              <span>{localizedCopy.ukResult}</span>
              <strong>{matchedRow.uk}</strong>
            </div>
          </div>
        )}
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>{localizedCopy.chartCaption}</caption>
          <thead>
            <tr>
              <th scope="col">{localizedCopy.diameterResult}</th>
              <th scope="col">{localizedCopy.circumferenceResult}</th>
              <th scope="col">{localizedCopy.usResult}</th>
              <th scope="col">{localizedCopy.ukResult}</th>
            </tr>
          </thead>
          <tbody>
            {ringSizeRows.map((row) => (
              <tr key={row.uk}>
                <td>{formatMm(row.diameterMm, locale)} mm</td>
                <td>{formatMm(row.circumferenceMm, locale)} mm</td>
                <td>{formatUs(row.us, locale)}</td>
                <td>{row.uk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
