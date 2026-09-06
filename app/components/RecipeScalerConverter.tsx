"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  kitchenIngredientLabels,
  type KitchenLocale,
} from "../converter/kitchenIngredientLabels";
import {
  type KitchenIngredientKey,
  convertKitchenValue,
  kitchenIngredientRows,
} from "../converter/kitchenMeasures";
import { scaleRecipeText } from "../converter/recipeScaler";

const copy = {
  tr: {
    recipeLabel: "Tarifin",
    placeholder:
      "2 su bardagi un\n1 cay kasigi tuz\n3 yemek kasigi zeytinyagi\n2 adet yumurta\n180 derece firinda pisirin",
    factorLabel: "Carpan",
    originalServingsLabel: "Kac kisilikti",
    targetServingsLabel: "Kac kisilik yapacaksin",
    resultHeading: "Olceklenmis Tarif",
    emptyState: "Tarifini yukariya yaz, sonuclari burada gor.",
    gramPrefix: "~",
    gramSuffix: "g",
    ingredientLabel: "Malzeme",
    noMatchOption: "Eslestirme yok",
    copyButton: "Kopyala",
    copiedButton: "Kopyalandi",
    printButton: "Yazdir",
  },
  en: {
    recipeLabel: "Your Recipe",
    placeholder:
      "2 cups flour\n1 teaspoon salt\n3 tablespoons olive oil\n2 eggs\n350 F oven",
    factorLabel: "Multiplier",
    originalServingsLabel: "Original servings",
    targetServingsLabel: "Target servings",
    resultHeading: "Scaled Recipe",
    emptyState: "Type your recipe above to see the scaled result here.",
    gramPrefix: "~",
    gramSuffix: "g",
    ingredientLabel: "Ingredient",
    noMatchOption: "No match",
    copyButton: "Copy",
    copiedButton: "Copied",
    printButton: "Print",
  },
  de: {
    recipeLabel: "Dein Rezept",
    placeholder:
      "2 Tassen Mehl\n1 Teeloeffel Salz\n3 Essloeffel Olivenoel\n2 Eier\n180 Grad Ofen",
    factorLabel: "Faktor",
    originalServingsLabel: "Urspruengliche Portionen",
    targetServingsLabel: "Zielportionen",
    resultHeading: "Skaliertes Rezept",
    emptyState: "Gib oben dein Rezept ein, dann erscheint hier das Ergebnis.",
    gramPrefix: "~",
    gramSuffix: "g",
    ingredientLabel: "Zutat",
    noMatchOption: "Kein Treffer",
    copyButton: "Kopieren",
    copiedButton: "Kopiert",
    printButton: "Drucken",
  },
  ar: {
    recipeLabel: "وصفتك",
    placeholder:
      "2 كوب دقيق\n1 ملعقة صغيرة ملح\n3 ملاعق كبيرة زيت زيتون\n2 بيض\n180 درجة في الفرن",
    factorLabel: "المعامل",
    originalServingsLabel: "عدد الحصص الأصلي",
    targetServingsLabel: "عدد الحصص المطلوب",
    resultHeading: "الوصفة بعد التعديل",
    emptyState: "اكتب وصفتك في الأعلى لتظهر النتيجة هنا.",
    gramPrefix: "~",
    gramSuffix: "غ",
    ingredientLabel: "المكون",
    noMatchOption: "بدون مطابقة",
    copyButton: "نسخ",
    copiedButton: "تم النسخ",
    printButton: "طباعة",
  },
} as const;

const chipOptions = [
  { label: "0.5x", value: 0.5 },
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

  return Number.isFinite(numericValue) && numericValue > 0
    ? numericValue
    : null;
}

function formatGram(value: number, locale: KitchenLocale) {
  const localeName =
    locale === "tr"
      ? "tr-TR"
      : locale === "de"
        ? "de-DE"
        : locale === "ar"
          ? "ar"
        : "en-US";

  return value.toLocaleString(localeName, {
    maximumFractionDigits: value < 10 ? 1 : 0,
  });
}

function ingredientOptionLabel(
  key: KitchenIngredientKey,
  locale: KitchenLocale
) {
  return kitchenIngredientLabels[locale][key];
}

export default function RecipeScalerConverter({
  locale = "tr",
}: {
  locale?: KitchenLocale;
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
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

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
      // Clipboard access may be blocked; ignore quietly.
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
