"use client";

import { useMemo, useState } from "react";
import {
  kitchenIngredientLabels,
  kitchenUnitLabels,
  type KitchenLocale,
} from "../converter/kitchenIngredientLabels";
import {
  type KitchenIngredientKey,
  type KitchenUnit,
  convertKitchenValue,
  kitchenIngredientRows,
} from "../converter/kitchenMeasures";

const copy = {
  tr: {
    ingredient: "Malzeme",
    knownUnit: "Bildigin Birim",
    value: "Deger",
    resultHeading: "Karsiliklar",
    invalidValue: "Gecerli bir sayi girerek sonucu gorebilirsin.",
  },
  en: {
    ingredient: "Ingredient",
    knownUnit: "Known Unit",
    value: "Value",
    resultHeading: "Equivalents",
    invalidValue: "Enter a valid number to see the conversion.",
  },
  de: {
    ingredient: "Zutat",
    knownUnit: "Bekannte Einheit",
    value: "Wert",
    resultHeading: "Entsprechungen",
    invalidValue: "Geben Sie eine gueltige Zahl ein, um die Umrechnung zu sehen.",
  },
  ar: {
    ingredient: "المكون",
    knownUnit: "الوحدة المعروفة",
    value: "القيمة",
    resultHeading: "القيم المكافئة",
    invalidValue: "أدخل رقما صحيحا لعرض نتيجة التحويل.",
  },
} as const;

const unitOrder: KitchenUnit[] = [
  "bardak",
  "yemekKasigi",
  "cayKasigi",
  "gram",
  "ml",
  "litre",
];

function formatValue(value: number, locale: KitchenLocale) {
  const localeName =
    locale === "tr"
      ? "tr-TR"
      : locale === "de"
        ? "de-DE"
        : locale === "ar"
          ? "ar"
          : "en-US";

  return value.toLocaleString(localeName, {
    maximumFractionDigits: value < 10 ? 2 : 1,
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

export default function KitchenMeasuresConverter({
  locale = "tr",
}: {
  locale?: KitchenLocale;
}) {
  const [ingredient, setIngredient] = useState<KitchenIngredientKey>("un");
  const [unit, setUnit] = useState<KitchenUnit>("bardak");
  const [inputValue, setInputValue] = useState("1");

  const localizedCopy = copy[locale];
  const localizedIngredientLabels = kitchenIngredientLabels[locale];
  const localizedUnitLabels = kitchenUnitLabels[locale];

  const parsedValue = parseNumericValue(inputValue);
  const result = useMemo(() => {
    if (parsedValue === null || Number.isNaN(parsedValue)) {
      return null;
    }

    return convertKitchenValue(ingredient, unit, parsedValue);
  }, [ingredient, unit, parsedValue]);

  return (
    <div className="category-general-converter kitchen-measures-converter">
      <div className="kitchen-measures-converter-grid">
        <label className="category-general-converter-field">
          <span>{localizedCopy.ingredient}</span>
          <select
            value={ingredient}
            onChange={(event) => {
              setIngredient(event.target.value as KitchenIngredientKey);
            }}
          >
            {kitchenIngredientRows.map((row) => (
              <option key={row.key} value={row.key}>
                {localizedIngredientLabels[row.key]}
              </option>
            ))}
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>{localizedCopy.knownUnit}</span>
          <select
            value={unit}
            onChange={(event) => {
              setUnit(event.target.value as KitchenUnit);
            }}
          >
            {unitOrder.map((unitKey) => (
              <option key={unitKey} value={unitKey}>
                {localizedUnitLabels[unitKey]}
              </option>
            ))}
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

      <div aria-live="polite" className="category-general-converter-result">
        <p>{localizedCopy.resultHeading}</p>

        {!result ? (
          <strong>{localizedCopy.invalidValue}</strong>
        ) : (
          <div className="kitchen-measures-converter-result-grid">
            {unitOrder
              .filter((unitKey) => unitKey !== unit)
              .map((unitKey) => (
                <div key={unitKey}>
                  <span>{localizedUnitLabels[unitKey]}</span>
                  <strong>{formatValue(result[unitKey], locale)}</strong>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
