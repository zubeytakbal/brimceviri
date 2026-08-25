"use client";

import { useMemo, useState } from "react";
import {
  type KitchenIngredientKey,
  type KitchenUnit,
  convertKitchenValue,
  kitchenIngredientRows,
} from "../converter/kitchenMeasures";

type Locale = "tr" | "en";

const ingredientLabels: Record<Locale, Record<KitchenIngredientKey, string>> = {
  tr: {
    un: "Un (Buğday Unu)",
    "tam-bugday-unu": "Tam Buğday Unu",
    "pirinc-unu": "Pirinç Unu",
    "misir-unu": "Mısır Unu",
    irmik: "İrmik",
    "galeta-unu": "Galeta Unu",
    "toz-seker": "Toz Şeker",
    "pudra-sekeri": "Pudra Şekeri",
    "esmer-seker": "Esmer Şeker",
    tuz: "Tuz (Sofra Tuzu)",
    pirinc: "Pirinç",
    bulgur: "Bulgur (İnce)",
    nohut: "Nohut (Kuru)",
    "kirmizi-mercimek": "Kırmızı Mercimek",
    "yesil-mercimek": "Yeşil Mercimek",
    "kuru-fasulye": "Kuru Fasulye",
    sut: "Süt",
    yogurt: "Yoğurt",
    krema: "Krema",
    tereyagi: "Tereyağı",
    margarin: "Margarin",
    zeytinyagi: "Zeytinyağı",
    "sivi-yag": "Sıvı Yağ (Bitkisel)",
    bal: "Bal",
    pekmez: "Pekmez",
    kakao: "Kakao (Toz)",
    "yulaf-ezmesi": "Yulaf Ezmesi",
    nisasta: "Nişasta (Mısır)",
    "kabartma-tozu": "Kabartma Tozu",
    karbonat: "Karbonat",
    susam: "Susam",
    "ceviz-ici": "Ceviz İçi (Kırık)",
    "findik-ici": "Fındık İçi",
    badem: "Badem",
    "antep-fistigi": "Antep Fıstığı",
    "kuru-uzum": "Kuru Üzüm",
    "hindistan-cevizi": "Hindistan Cevizi (Rende)",
    mayonez: "Mayonez",
    ketcap: "Ketçap",
    sirke: "Sirke",
    "limon-suyu": "Limon Suyu",
    tarcin: "Tarçın (Toz)",
    "kirmizi-biber": "Kırmızı Biber (Toz)",
    karabiber: "Karabiber (Toz)",
    kimyon: "Kimyon (Toz)",
  },
  en: {
    un: "Flour (Wheat)",
    "tam-bugday-unu": "Whole Wheat Flour",
    "pirinc-unu": "Rice Flour",
    "misir-unu": "Corn Flour",
    irmik: "Semolina",
    "galeta-unu": "Breadcrumbs",
    "toz-seker": "Granulated Sugar",
    "pudra-sekeri": "Powdered Sugar",
    "esmer-seker": "Brown Sugar",
    tuz: "Salt (Table Salt)",
    pirinc: "Rice",
    bulgur: "Bulgur (Fine)",
    nohut: "Chickpeas (Dry)",
    "kirmizi-mercimek": "Red Lentils",
    "yesil-mercimek": "Green Lentils",
    "kuru-fasulye": "Dry Beans",
    sut: "Milk",
    yogurt: "Yogurt",
    krema: "Heavy Cream",
    tereyagi: "Butter",
    margarin: "Margarine",
    zeytinyagi: "Olive Oil",
    "sivi-yag": "Vegetable Oil",
    bal: "Honey",
    pekmez: "Grape Molasses",
    kakao: "Cocoa Powder",
    "yulaf-ezmesi": "Rolled Oats",
    nisasta: "Cornstarch",
    "kabartma-tozu": "Baking Powder",
    karbonat: "Baking Soda",
    susam: "Sesame Seeds",
    "ceviz-ici": "Walnuts (Chopped)",
    "findik-ici": "Hazelnuts",
    badem: "Almonds",
    "antep-fistigi": "Pistachios",
    "kuru-uzum": "Raisins",
    "hindistan-cevizi": "Desiccated Coconut",
    mayonez: "Mayonnaise",
    ketcap: "Ketchup",
    sirke: "Vinegar",
    "limon-suyu": "Lemon Juice",
    tarcin: "Ground Cinnamon",
    "kirmizi-biber": "Ground Red Pepper",
    karabiber: "Ground Black Pepper",
    kimyon: "Ground Cumin",
  },
};

const unitLabels: Record<Locale, Record<KitchenUnit, string>> = {
  tr: {
    bardak: "Su Bardağı",
    yemekKasigi: "Yemek Kaşığı",
    cayKasigi: "Çay Kaşığı",
    ml: "Mililitre (ml)",
    litre: "Litre",
    gram: "Gram",
  },
  en: {
    bardak: "Cup",
    yemekKasigi: "Tablespoon",
    cayKasigi: "Teaspoon",
    ml: "Milliliter (ml)",
    litre: "Liter",
    gram: "Gram",
  },
};

const copy = {
  tr: {
    ingredient: "Malzeme",
    knownUnit: "Bildiğin Birim",
    value: "Değer",
    resultHeading: "Karşılıklar",
    invalidValue: "Geçerli bir sayı girerek sonucu görebilirsin.",
  },
  en: {
    ingredient: "Ingredient",
    knownUnit: "Known Unit",
    value: "Value",
    resultHeading: "Equivalents",
    invalidValue: "Enter a valid number to see the conversion.",
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

function formatValue(value: number, locale: Locale) {
  return value.toLocaleString(locale === "en" ? "en-US" : "tr-TR", {
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
  locale?: Locale;
}) {
  const [ingredient, setIngredient] = useState<KitchenIngredientKey>("un");
  const [unit, setUnit] = useState<KitchenUnit>("bardak");
  const [inputValue, setInputValue] = useState("1");

  const localizedCopy = copy[locale];
  const localizedIngredientLabels = ingredientLabels[locale];
  const localizedUnitLabels = unitLabels[locale];

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
