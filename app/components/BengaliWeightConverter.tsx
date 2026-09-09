"use client";

import { useMemo, useState } from "react";
import {
  bengaliWeightUnitToGramFactor,
  convertBengaliWeight,
  type BengaliWeightUnit,
} from "../converter/bengaliTraditionalWeights";

const unitLabels: Record<BengaliWeightUnit, string> = {
  mon: "মণ (Mon)",
  ser: "সের (Ser)",
  chhatak: "ছটাক (Chhatak)",
  tola: "তোলা (Tola)",
  kg: "কিলোগ্রাম (kg)",
  gram: "গ্রাম (gram)",
};

function parseNumericValue(rawValue: string): number {
  const normalized = rawValue.trim().replace(/,/g, ".");
  if (!normalized) return Number.NaN;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("bn-BD", { maximumFractionDigits: 4 });
}

type BengaliWeightConverterProps = {
  fromUnit: BengaliWeightUnit;
  toUnit: BengaliWeightUnit;
};

export default function BengaliWeightConverter({
  fromUnit,
  toUnit,
}: BengaliWeightConverterProps) {
  const [fromValue, setFromValue] = useState("1");

  const toValue = useMemo(
    () => convertBengaliWeight(parseNumericValue(fromValue), fromUnit, toUnit),
    [fromValue, fromUnit, toUnit]
  );

  const reverseFactor = useMemo(
    () => convertBengaliWeight(1, toUnit, fromUnit),
    [toUnit, fromUnit]
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>{unitLabels[fromUnit]}</span>
          <input
            inputMode="decimal"
            type="text"
            value={fromValue}
            onChange={(event) => setFromValue(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{unitLabels[toUnit]}</span>
          <input inputMode="decimal" type="text" readOnly value={formatNumber(toValue ?? Number.NaN)} />
        </label>
      </div>

      <p className="calculator-usage-hint">
        <strong>সূত্র:</strong> ১ {unitLabels[fromUnit]} ={" "}
        {formatNumber(
          bengaliWeightUnitToGramFactor[fromUnit] / bengaliWeightUnitToGramFactor[toUnit]
        )}{" "}
        {unitLabels[toUnit]}
        {reverseFactor !== null && (
          <>
            {" "}(১ {unitLabels[toUnit]} = {formatNumber(reverseFactor)} {unitLabels[fromUnit]})
          </>
        )}
      </p>
    </div>
  );
}
