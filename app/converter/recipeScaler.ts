import {
  type KitchenIngredientKey,
  type KitchenUnit,
  convertKitchenValue,
  kitchenIngredientRows,
} from "./kitchenMeasures";
import { kitchenIngredientLabels } from "./kitchenIngredientLabels";

export type RecipeLocale = "tr" | "en" | "de" | "ar";

export type ParsedRecipeLine = {
  raw: string;
  quantity: number | null;
  scaledQuantity: number | null;
  scaledLine: string;
  gramEquivalent: number | null;
  detectedUnit: KitchenUnit | null;
  matchedIngredient: KitchenIngredientKey | null;
  temperatureNote: string | null;
};

const wordQuantities: Record<string, number> = {
  yarim: 0.5,
  ceyrek: 0.25,
  half: 0.5,
  quarter: 0.25,
  halb: 0.5,
  viertel: 0.25,
  نصف: 0.5,
  ربع: 0.25,
};

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/ä/g, "a")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}/,.]+/gu, " ")
    .trim();
}

function parseQuantityToken(token: string): number | null {
  if (/^\d+\/\d+$/.test(token)) {
    const [numerator, denominator] = token.split("/").map(Number);
    return denominator !== 0 ? numerator / denominator : null;
  }

  if (/^\d+[.,]\d+$/.test(token)) {
    return Number(token.replace(",", "."));
  }

  if (/^\d+$/.test(token)) {
    return Number(token);
  }

  return wordQuantities[normalizeText(token)] ?? null;
}

export function parseRecipeLine(line: string): {
  quantity: number | null;
  restOfLine: string;
} {
  const trimmed = line.trim();

  if (!trimmed) {
    return { quantity: null, restOfLine: "" };
  }

  const match = trimmed.match(
    /^(\d+[.,]\d+|\d+\/\d+|\d+|[\p{L}]+)\s+(.+)$/u
  );

  if (!match) {
    return { quantity: null, restOfLine: trimmed };
  }

  const [, quantityToken, rest] = match;
  const quantity = parseQuantityToken(quantityToken);

  if (quantity === null) {
    return { quantity: null, restOfLine: trimmed };
  }

  return { quantity, restOfLine: rest.trim() };
}

const twoTokenUnits: Record<string, KitchenUnit> = {
  "su bardagi": "bardak",
  "yemek kasigi": "yemekKasigi",
  "cay kasigi": "cayKasigi",
  "ess loffel": "yemekKasigi",
  "tee loffel": "cayKasigi",
  "ملعقة كبيرة": "yemekKasigi",
  "ملعقة صغيرة": "cayKasigi",
};

const oneTokenUnits: Record<string, KitchenUnit> = {
  bardak: "bardak",
  yk: "yemekKasigi",
  ck: "cayKasigi",
  gram: "gram",
  gr: "gram",
  g: "gram",
  ml: "ml",
  mililitre: "ml",
  litre: "litre",
  lt: "litre",
  cup: "bardak",
  cups: "bardak",
  tablespoon: "yemekKasigi",
  tablespoons: "yemekKasigi",
  tbsp: "yemekKasigi",
  teaspoon: "cayKasigi",
  teaspoons: "cayKasigi",
  tsp: "cayKasigi",
  grams: "gram",
  milliliter: "ml",
  milliliters: "ml",
  liter: "litre",
  liters: "litre",
  tasse: "bardak",
  tassen: "bardak",
  essloffel: "yemekKasigi",
  el: "yemekKasigi",
  teeloffel: "cayKasigi",
  tl: "cayKasigi",
  gramm: "gram",
  milliliteren: "ml",
  كوب: "bardak",
  اكواب: "bardak",
  كوبين: "bardak",
  غرام: "gram",
  غ: "gram",
  مل: "ml",
  ملليلتر: "ml",
  لتر: "litre",
};

function extractUnit(normalizedRestOfLine: string): {
  unit: KitchenUnit | null;
  remainder: string;
} {
  const tokens = normalizedRestOfLine.split(" ").filter(Boolean);
  const twoToken = tokens.slice(0, 2).join(" ");

  if (twoTokenUnits[twoToken]) {
    return {
      unit: twoTokenUnits[twoToken],
      remainder: tokens.slice(2).join(" "),
    };
  }

  const oneToken = tokens[0];

  if (oneToken && oneTokenUnits[oneToken]) {
    return {
      unit: oneTokenUnits[oneToken],
      remainder: tokens.slice(1).join(" "),
    };
  }

  return { unit: null, remainder: tokens.join(" ") };
}

export const englishIngredientLabels = kitchenIngredientLabels.en;
export const germanIngredientLabels = kitchenIngredientLabels.de;

const ingredientMatchEntries: Array<{
  key: KitchenIngredientKey;
  normalized: string;
}> = kitchenIngredientRows.flatMap((row) => {
  const entries = [
    {
      key: row.key,
      normalized: normalizeText(row.label.split(" (")[0]),
    },
  ];

  entries.push({
    key: row.key,
    normalized: normalizeText(kitchenIngredientLabels.en[row.key]),
  });
  entries.push({
    key: row.key,
    normalized: normalizeText(kitchenIngredientLabels.de[row.key]),
  });
  entries.push({
    key: row.key,
    normalized: normalizeText(kitchenIngredientLabels.ar[row.key]),
  });

  return entries;
});

function classifyMatch(
  remainder: string,
  candidate: string
): 0 | 1 | 2 | null {
  if (remainder === candidate) {
    return 0;
  }

  if (
    remainder.startsWith(`${candidate} `) ||
    remainder.endsWith(` ${candidate}`)
  ) {
    return 1;
  }

  if (
    candidate.startsWith(`${remainder} `) ||
    candidate.endsWith(` ${remainder}`)
  ) {
    return 2;
  }

  return null;
}

function findMatchingIngredient(
  remainder: string
): KitchenIngredientKey | null {
  if (!remainder) {
    return null;
  }

  const candidates = ingredientMatchEntries
    .map((entry) => ({
      entry,
      kind: classifyMatch(remainder, entry.normalized),
    }))
    .filter(
      (
        item
      ): item is {
        entry: (typeof ingredientMatchEntries)[number];
        kind: 0 | 1 | 2;
      } => item.kind !== null
    );

  if (candidates.length === 0) {
    return null;
  }

  candidates.sort((left, right) => {
    if (left.kind !== right.kind) {
      return left.kind - right.kind;
    }

    return left.kind === 1
      ? right.entry.normalized.length -
          left.entry.normalized.length
      : left.entry.normalized.length -
          right.entry.normalized.length;
  });

  return candidates[0].entry.key;
}

const temperaturePattern = /(\d+)\s*°?\s*(c\b|f\b|derece|grad)/;

function formatQuantity(
  value: number,
  locale: RecipeLocale
): string {
  const rounded = Math.round(value * 100) / 100;
  const localeName =
    locale === "tr"
      ? "tr-TR"
      : locale === "de"
        ? "de-DE"
        : locale === "ar"
          ? "ar"
        : "en-US";

  return rounded.toLocaleString(localeName, {
    maximumFractionDigits: 2,
  });
}

function detectTemperature(
  line: string,
  locale: RecipeLocale
): string | null {
  const match = normalizeText(line).match(temperaturePattern);

  if (!match) {
    return null;
  }

  const value = Number(match[1]);
  const unit = match[2];

  if (!Number.isFinite(value)) {
    return null;
  }

  if (unit === "f") {
    const celsius = Math.round(((value - 32) * 5) / 9);
    return `~ ${formatQuantity(celsius, locale)} C`;
  }

  const fahrenheit = Math.round((value * 9) / 5 + 32);
  return `~ ${formatQuantity(fahrenheit, locale)} F`;
}

export function scaleRecipeText(
  text: string,
  factor: number,
  locale: RecipeLocale = "tr"
): ParsedRecipeLine[] {
  return text
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .map((line) => {
      const temperatureNote = detectTemperature(line, locale);

      if (temperatureNote) {
        return {
          raw: line,
          quantity: null,
          scaledQuantity: null,
          scaledLine: line.trim(),
          gramEquivalent: null,
          detectedUnit: null,
          matchedIngredient: null,
          temperatureNote,
        };
      }

      const { quantity, restOfLine } = parseRecipeLine(line);

      if (quantity === null || !Number.isFinite(factor)) {
        return {
          raw: line,
          quantity: null,
          scaledQuantity: null,
          scaledLine: line.trim(),
          gramEquivalent: null,
          detectedUnit: null,
          matchedIngredient: null,
          temperatureNote: null,
        };
      }

      const scaledQuantity = quantity * factor;
      const scaledLine = `${formatQuantity(
        scaledQuantity,
        locale
      )} ${restOfLine}`;

      const { unit, remainder } = extractUnit(
        normalizeText(restOfLine)
      );
      const matchedIngredient = unit
        ? findMatchingIngredient(remainder)
        : null;
      const gramEquivalent =
        unit && matchedIngredient
          ? convertKitchenValue(
              matchedIngredient,
              unit,
              scaledQuantity
            ).gram
          : null;

      return {
        raw: line,
        quantity,
        scaledQuantity,
        scaledLine,
        gramEquivalent,
        detectedUnit: unit,
        matchedIngredient,
        temperatureNote: null,
      };
    });
}
