"use client";

import { useMemo, useState } from "react";
import {
  type ShoeBrandKey,
  type ShoeSizeGroupKey,
  type ShoeSizeRow,
  findShoeSizeRow,
  getShoeSizeRows,
} from "../converter/shoeSizeTable";

type SystemKey = "eu" | "us" | "uk" | "cm";
type Locale = "tr" | "en";

const systemLabels: Record<Locale, Record<SystemKey, string>> = {
  tr: {
    eu: "TR / Avrupa (EU)",
    us: "ABD (US)",
    uk: "\u0130ngiltere (UK)",
    cm: "Ayak Uzunlu\u011fu (cm)",
  },
  en: {
    eu: "EU",
    us: "US",
    uk: "UK",
    cm: "Foot Length (cm)",
  },
};

const brandLabels: Record<Locale, Record<ShoeBrandKey, string>> = {
  tr: {
    genel: "Genel (Standart)",
    nike: "Nike",
    adidas: "Adidas",
    puma: "Puma",
    "new-balance": "New Balance",
    converse: "Converse",
  },
  en: {
    genel: "General (Standard)",
    nike: "Nike",
    adidas: "Adidas",
    puma: "Puma",
    "new-balance": "New Balance",
    converse: "Converse",
  },
};

const groupLabels: Record<Locale, Record<ShoeSizeGroupKey, string>> = {
  tr: {
    erkek: "Erkek",
    kadin: "Kad\u0131n",
    bebek: "Bebek / K\u00fc\u00e7\u00fck \u00c7ocuk",
    "buyuk-cocuk": "B\u00fcy\u00fck \u00c7ocuk",
  },
  en: {
    erkek: "Men",
    kadin: "Women",
    bebek: "Toddler / Little Kid",
    "buyuk-cocuk": "Big Kid",
  },
};

const copy = {
  tr: {
    group: "Grup",
    brand: "Marka",
    knownSystem: "Bildi\u011fin Sistem",
    value: "De\u011fer",
    matchingSizes: "E\u015fle\u015fen Numaralar",
    invalidValue:
      "Ge\u00e7erli bir say\u0131 girerek sonucu g\u00f6rebilirsiniz.",
    euResult: "TR / EU",
    usResult: "ABD (US)",
    ukResult: "\u0130ngiltere (UK)",
    footLength: "Ayak Uzunlu\u011fu",
    chartSuffix: "ayakkab\u0131 numaras\u0131 tablosu",
  },
  en: {
    group: "Group",
    brand: "Brand",
    knownSystem: "Known System",
    value: "Value",
    matchingSizes: "Matching Sizes",
    invalidValue:
      "Enter a valid number to see the closest match.",
    euResult: "EU",
    usResult: "US",
    ukResult: "UK",
    footLength: "Foot Length",
    chartSuffix: "shoe size chart",
  },
} as const;

const brandOrder: ShoeBrandKey[] = [
  "genel",
  "nike",
  "adidas",
  "puma",
  "new-balance",
  "converse",
];

const groupOrder: ShoeSizeGroupKey[] = [
  "erkek",
  "kadin",
  "bebek",
  "buyuk-cocuk",
];

function formatEu(value: number, locale: Locale) {
  const whole = Math.floor(value);
  const frac = value - whole;

  if (Math.abs(frac - 1 / 3) < 0.02) {
    return `${whole} 1/3`;
  }

  if (Math.abs(frac - 2 / 3) < 0.02) {
    return `${whole} 2/3`;
  }

  if (frac < 0.02) {
    return `${whole}`;
  }

  return value.toLocaleString(locale === "en" ? "en-US" : "tr-TR", {
    maximumFractionDigits: 1,
  });
}

function formatValue(value: number, locale: Locale) {
  return value.toLocaleString(locale === "en" ? "en-US" : "tr-TR", {
    maximumFractionDigits: 1,
  });
}

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return null;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

export default function ShoeSizeConverter({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const [group, setGroup] = useState<ShoeSizeGroupKey>("erkek");
  const [brand, setBrand] = useState<ShoeBrandKey>("genel");
  const [system, setSystem] = useState<SystemKey>("eu");
  const [inputValue, setInputValue] = useState("42");

  const hasBrands = group === "erkek" || group === "kadin";
  const rows = useMemo(
    () => getShoeSizeRows(group, hasBrands ? brand : "genel"),
    [group, brand, hasBrands]
  );

  const parsedValue = parseNumericValue(inputValue);
  const matchedRow: ShoeSizeRow | null =
    parsedValue === null || Number.isNaN(parsedValue)
      ? null
      : findShoeSizeRow(
          group,
          system,
          parsedValue,
          hasBrands ? brand : "genel"
        );

  const localizedCopy = copy[locale];
  const localizedSystemLabels = systemLabels[locale];
  const localizedBrandLabels = brandLabels[locale];
  const localizedGroupLabels = groupLabels[locale];

  return (
    <div className="category-general-converter shoe-size-converter">
      <div className="shoe-size-converter-grid">
        <label className="category-general-converter-field">
          <span>{localizedCopy.group}</span>
          <select
            value={group}
            onChange={(event) => {
              setGroup(event.target.value as ShoeSizeGroupKey);
            }}
          >
            {groupOrder.map((groupKey) => (
              <option key={groupKey} value={groupKey}>
                {localizedGroupLabels[groupKey]}
              </option>
            ))}
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>{localizedCopy.brand}</span>
          <select
            value={hasBrands ? brand : "genel"}
            disabled={!hasBrands}
            onChange={(event) => {
              setBrand(event.target.value as ShoeBrandKey);
            }}
          >
            {brandOrder.map((brandKey) => (
              <option key={brandKey} value={brandKey}>
                {localizedBrandLabels[brandKey]}
              </option>
            ))}
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>{localizedCopy.knownSystem}</span>
          <select
            value={system}
            onChange={(event) => {
              setSystem(event.target.value as SystemKey);
            }}
          >
            {(Object.keys(localizedSystemLabels) as SystemKey[]).map(
              (systemKey) => (
                <option key={systemKey} value={systemKey}>
                  {localizedSystemLabels[systemKey]}
                </option>
              )
            )}
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>{localizedCopy.value}</span>
          <input
            inputMode="decimal"
            type="text"
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result"
      >
        <p>{localizedCopy.matchingSizes}</p>

        {parsedValue === null || Number.isNaN(parsedValue) || !matchedRow ? (
          <strong>{localizedCopy.invalidValue}</strong>
        ) : (
          <div className="shoe-size-converter-result-grid">
            <div>
              <span>{localizedCopy.euResult}</span>
              <strong>{formatEu(matchedRow.eu, locale)}</strong>
            </div>
            <div>
              <span>{localizedCopy.usResult}</span>
              <strong>{formatValue(matchedRow.us, locale)}</strong>
            </div>
            <div>
              <span>{localizedCopy.ukResult}</span>
              <strong>{formatValue(matchedRow.uk, locale)}</strong>
            </div>
            <div>
              <span>{localizedCopy.footLength}</span>
              <strong>
                {formatValue(matchedRow.cm, locale)} cm
              </strong>
            </div>
          </div>
        )}
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>
            {localizedGroupLabels[group]}
            {hasBrands ? ` - ${localizedBrandLabels[brand]}` : ""}
            {" "}
            {localizedCopy.chartSuffix}
          </caption>
          <thead>
            <tr>
              <th scope="col">{localizedCopy.euResult}</th>
              <th scope="col">{localizedCopy.usResult}</th>
              <th scope="col">{localizedCopy.ukResult}</th>
              <th scope="col">{localizedCopy.footLength}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.eu}-${row.us}`}>
                <td>{formatEu(row.eu, locale)}</td>
                <td>{formatValue(row.us, locale)}</td>
                <td>{formatValue(row.uk, locale)}</td>
                <td>{formatValue(row.cm, locale)} cm</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
