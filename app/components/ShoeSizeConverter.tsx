"use client";

import { useMemo, useState } from "react";
import {
  ShoeBrandKey,
  ShoeSizeGroupKey,
  ShoeSizeRow,
  findShoeSizeRow,
  getShoeSizeRows,
  shoeBrands,
  shoeSizeGroupLabels,
} from "../converter/shoeSizeTable";

type SystemKey = "eu" | "us" | "uk" | "cm";

const systemLabels: Record<SystemKey, string> = {
  eu: "TR / Avrupa (EU)",
  us: "ABD (US)",
  uk: "İngiltere (UK)",
  cm: "Ayak Uzunluğu (cm)",
};

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

function formatEu(value: number) {
  const whole = Math.floor(value);
  const frac = value - whole;

  if (Math.abs(frac - 1 / 3) < 0.02) {
    return `${whole} ⅓`;
  }

  if (Math.abs(frac - 2 / 3) < 0.02) {
    return `${whole} ⅔`;
  }

  if (frac < 0.02) {
    return `${whole}`;
  }

  return value.toLocaleString("tr-TR", { maximumFractionDigits: 1 });
}

function formatValue(value: number) {
  return value.toLocaleString("tr-TR", { maximumFractionDigits: 1 });
}

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return null;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

export default function ShoeSizeConverter() {
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
      : findShoeSizeRow(group, system, parsedValue, hasBrands ? brand : "genel");

  return (
    <div className="category-general-converter shoe-size-converter">
      <div className="shoe-size-converter-grid">
        <label className="category-general-converter-field">
          <span>Grup</span>
          <select
            value={group}
            onChange={(event) => {
              setGroup(event.target.value as ShoeSizeGroupKey);
            }}
          >
            {groupOrder.map((groupKey) => (
              <option key={groupKey} value={groupKey}>
                {shoeSizeGroupLabels[groupKey]}
              </option>
            ))}
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>Marka</span>
          <select
            value={hasBrands ? brand : "genel"}
            disabled={!hasBrands}
            onChange={(event) => {
              setBrand(event.target.value as ShoeBrandKey);
            }}
          >
            {brandOrder.map((brandKey) => (
              <option key={brandKey} value={brandKey}>
                {shoeBrands[brandKey].label}
              </option>
            ))}
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>Bildiğin Sistem</span>
          <select
            value={system}
            onChange={(event) => {
              setSystem(event.target.value as SystemKey);
            }}
          >
            {(Object.keys(systemLabels) as SystemKey[]).map((systemKey) => (
              <option key={systemKey} value={systemKey}>
                {systemLabels[systemKey]}
              </option>
            ))}
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>Değer</span>
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
        <p>Eşleşen Numaralar</p>

        {parsedValue === null || Number.isNaN(parsedValue) || !matchedRow ? (
          <strong>Geçerli bir sayı girerek sonucu görebilirsiniz.</strong>
        ) : (
          <div className="shoe-size-converter-result-grid">
            <div>
              <span>TR / EU</span>
              <strong>{formatEu(matchedRow.eu)}</strong>
            </div>
            <div>
              <span>ABD (US)</span>
              <strong>{formatValue(matchedRow.us)}</strong>
            </div>
            <div>
              <span>İngiltere (UK)</span>
              <strong>{formatValue(matchedRow.uk)}</strong>
            </div>
            <div>
              <span>Ayak Uzunluğu</span>
              <strong>{formatValue(matchedRow.cm)} cm</strong>
            </div>
          </div>
        )}
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>
            {shoeSizeGroupLabels[group]}
            {hasBrands ? ` – ${shoeBrands[brand].label}` : ""} ayakkabı
            numarası tablosu
          </caption>
          <thead>
            <tr>
              <th scope="col">TR / EU</th>
              <th scope="col">ABD (US)</th>
              <th scope="col">İngiltere (UK)</th>
              <th scope="col">Ayak Uzunluğu (cm)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.eu}-${row.us}`}>
                <td>{formatEu(row.eu)}</td>
                <td>{formatValue(row.us)}</td>
                <td>{formatValue(row.uk)}</td>
                <td>{formatValue(row.cm)} cm</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
