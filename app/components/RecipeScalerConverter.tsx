"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  type KitchenIngredientKey,
  convertKitchenValue,
  kitchenIngredientRows,
} from "../converter/kitchenMeasures";
import { englishIngredientLabels, scaleRecipeText } from "../converter/recipeScaler";

type Locale = "tr" | "en";

const copy = {
  tr: {
    recipeLabel: "Tarifin",
    placeholder:
      "2 su bardağı un\n1 çay kaşığı tuz\n3 yemek kaşığı zeytinyağı\n2 adet yumurta\n180 derece fırında pişirin",
    factorLabel: "Çarpan",
    originalServingsLabel: "Kaç kişilikti",
    targetServingsLabel: "Kaç kişilik yapacaksın",
    resultHeading: "Ölçeklenmiş Tarif",
    emptyState: "Tarifini yukarıya yaz, sonuçları burada gör.",
    gramPrefix: "≈",
    gramSuffix: "g",
    ingredientLabel: "Malzeme",
    noMatchOption: "Eşleştirme yok",
    copyButton: "Kopyala",
    copiedButton: "Kopyalandı ✓",
    printButton: "Yazdır",
  },
  en: {
    recipeLabel: "Your Recipe",
    placeholder:
      "2 cups flour\n1 teaspoon salt\n3 tablespoons olive oil\n2 eggs\n350°F oven",
    factorLabel: "Multiplier",
    originalServingsLabel: "Original servings",
    targetServingsLabel: "Target servings",
    resultHeading: "Scaled Recipe",
    emptyState: "Type your recipe above to see the scaled result here.",
    gramPrefix: "≈",
    gramSuffix: "g",
    ingredientLabel: "Ingredient",
    noMatchOption: "No match",
    copyButton: "Copy",
    copiedButton: "Copied ✓",
    printButton: "Print",
  },
} as const;

const chipOptions = [
  { label: "½x", value: 0.5 },
  { label: "1.5x", value: 1.5 },
  { label: "2x", value: 2 },
  { label: "3x", value: 3 },
];

function parseFactor(rawValue: string): number | null {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return null;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) && numericValue > 0 ? numericValue : null;
}

function formatGram(value: number, locale: Locale) {
  return value.toLocaleString(locale === "en" ? "en-US" : "tr-TR", {
    maximumFractionDigits: value < 10 ? 1 : 0,
  });
}

function ingredientOptionLabel(key: KitchenIngredientKey, locale: Locale) {
  if (locale === "en") {
    return englishIngredientLabels[key];
  }

  return kitchenIngredientRows.find((row) => row.key === key)?.label ?? key;
}

export default function RecipeScalerConverter({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const localizedCopy = copy[locale];
  const [text, setText] = useState("");
  const [factorInput, setFactorInput] = useState("2");
  const [originalServingsInput, setOriginalServingsInput] = useState("");
  const [targetServingsInput, setTargetServingsInput] = useState("");
  const [overrides, setOverrides] = useState<
    Record<number, KitchenIngredientKey | "none">
  >({});
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  function applyServings(nextOriginal: string, nextTarget: string) {
    const original = parseFactor(nextOriginal);
    const target = parseFactor(nextTarget);

    if (original !== null && target !== null) {
      setFactorInput(String(target / original));
    }
  }

  const factor = parseFactor(factorInput);
  const lines = useMemo(() => {
    if (factor === null) {
      return [];
    }

    return scaleRecipeText(text, factor, locale);
  }, [text, factor, locale]);

  async function handleCopy() {
    const textToCopy = lines.map((line) => line.scaledLine).join("\n");

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopyState("copied");

      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }

      copyTimeoutRef.current = setTimeout(() => {
        setCopyState("idle");
      }, 1500);
    } catch {
      // Pano erişimi engellenmiş olabilir; sessizce yoksay.
    }
  }

  return (
    <div className="category-general-converter recipe-scaler-converter">
      <label className="category-general-converter-field recipe-scaler-textarea-field">
        <span>{localizedCopy.recipeLabel}</span>
        <textarea
          rows={7}
          placeholder={localizedCopy.placeholder}
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
        />
      </label>

      <div className="recipe-scaler-servings-row">
        <label className="category-general-converter-field recipe-scaler-servings-field">
          <span>{localizedCopy.originalServingsLabel}</span>
          <input
            inputMode="decimal"
            type="text"
            value={originalServingsInput}
            onChange={(event) => {
              setOriginalServingsInput(event.target.value);
              applyServings(event.target.value, targetServingsInput);
            }}
          />
        </label>

        <label className="category-general-converter-field recipe-scaler-servings-field">
          <span>{localizedCopy.targetServingsLabel}</span>
          <input
            inputMode="decimal"
            type="text"
            value={targetServingsInput}
            onChange={(event) => {
              setTargetServingsInput(event.target.value);
              applyServings(originalServingsInput, event.target.value);
            }}
          />
        </label>
      </div>

      <div className="recipe-scaler-factor-row">
        <label className="category-general-converter-field recipe-scaler-factor-field">
          <span>{localizedCopy.factorLabel}</span>
          <input
            inputMode="decimal"
            type="text"
            value={factorInput}
            onChange={(event) => {
              setFactorInput(event.target.value);
            }}
          />
        </label>

        <div className="recipe-scaler-chip-row">
          {chipOptions.map((chip) => (
            <button
              key={chip.value}
              type="button"
              className={`recipe-scaler-chip${
                factorInput === String(chip.value) ? " is-active" : ""
              }`}
              onClick={() => {
                setFactorInput(String(chip.value));
              }}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      <div aria-live="polite" className="category-general-converter-result">
        <div className="recipe-scaler-result-heading">
          <p>{localizedCopy.resultHeading}</p>

          {lines.length > 0 && (
            <div className="recipe-scaler-actions">
              <button type="button" onClick={handleCopy}>
                {copyState === "copied"
                  ? localizedCopy.copiedButton
                  : localizedCopy.copyButton}
              </button>
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
              >
                {localizedCopy.printButton}
              </button>
            </div>
          )}
        </div>

        {lines.length === 0 ? (
          <strong>{localizedCopy.emptyState}</strong>
        ) : (
          <ul className="recipe-scaler-lines">
            {lines.map((line, index) => {
              const selectedIngredient =
                overrides[index] ?? line.matchedIngredient ?? "none";
              const displayGram =
                line.detectedUnit && selectedIngredient !== "none"
                  ? convertKitchenValue(
                      selectedIngredient,
                      line.detectedUnit,
                      line.scaledQuantity ?? 0
                    ).gram
                  : null;

              return (
                <li key={`${index}-${line.raw}`}>
                  <span className="recipe-scaler-line-scaled">
                    {line.scaledLine}
                  </span>

                  {line.temperatureNote && (
                    <span className="recipe-scaler-line-gram">
                      {line.temperatureNote}
                    </span>
                  )}

                  {displayGram !== null && (
                    <span className="recipe-scaler-line-gram">
                      {localizedCopy.gramPrefix}{" "}
                      {formatGram(displayGram, locale)}{" "}
                      {localizedCopy.gramSuffix}
                    </span>
                  )}

                  {line.detectedUnit && (
                    <label className="recipe-scaler-line-ingredient">
                      <span>{localizedCopy.ingredientLabel}</span>
                      <select
                        value={selectedIngredient}
                        onChange={(event) => {
                          setOverrides((current) => ({
                            ...current,
                            [index]: event.target.value as
                              | KitchenIngredientKey
                              | "none",
                          }));
                        }}
                      >
                        <option value="none">
                          {localizedCopy.noMatchOption}
                        </option>
                        {kitchenIngredientRows.map((row) => (
                          <option key={row.key} value={row.key}>
                            {ingredientOptionLabel(row.key, locale)}
                          </option>
                        ))}
                      </select>
                    </label>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
