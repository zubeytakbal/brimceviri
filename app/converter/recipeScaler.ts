// Tarif metnini satir satir olcekleyen (2x, yariya indirme vb.) ve
// mumkun oldugunda hacim biriminden grama ceviren arac. Serbest metin
// parsing riskli oldugu icin iki bagimsiz katmana ayriliyor:
//
// 1) Olcekleme -- her zaman guvenilir. Satir basindaki sayiyi bulup
//    carpanla carpar, satirin geri kalanini (birim + malzeme adi)
//    oldugu gibi birakir. Malzemenin tabloda olup olmamasindan
//    bagimsiz calisir.
// 2) Birim -> gram cevirisi -- best-effort bonus katman. Sadece
//    taninan bir hacim birimi VE kitchenMeasures.ts'teki bir malzemeyle
//    eslesme varsa gram karsiligi eklenir; eslesme yoksa satir sessizce
//    sadece olceklenmis haliyle gosterilir (hata yok).

import {
  type KitchenIngredientKey,
  type KitchenUnit,
  convertKitchenValue,
  kitchenIngredientRows,
} from "./kitchenMeasures";

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
};

function normalizeTr(value: string): string {
  return value
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .normalize("NFD")
    .replace(new RegExp("[\\u0300-\\u036f]", "g"), "")
    .replace(/[^a-z0-9/,.]+/g, " ")
    .trim();
}

function parseQuantityToken(token: string): number | null {
  if (/^\d+\/\d+$/.test(token)) {
    const [a, b] = token.split("/").map(Number);
    return b !== 0 ? a / b : null;
  }

  if (/^\d+[.,]\d+$/.test(token)) {
    return Number(token.replace(",", "."));
  }

  if (/^\d+$/.test(token)) {
    return Number(token);
  }

  const wordValue = wordQuantities[normalizeTr(token)];
  return wordValue ?? null;
}

export function parseRecipeLine(line: string): {
  quantity: number | null;
  restOfLine: string;
} {
  const trimmed = line.trim();

  if (!trimmed) {
    return { quantity: null, restOfLine: "" };
  }

  const match = trimmed.match(/^(\d+[.,]\d+|\d+\/\d+|\d+|[a-zçğıöşüA-ZÇĞİÖŞÜ]+)\s+(.+)$/);

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
  // Ingilizce (EN sayfasi icin)
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
};

function extractUnit(normalizedRestOfLine: string): {
  unit: KitchenUnit | null;
  remainder: string;
} {
  const tokens = normalizedRestOfLine.split(" ").filter(Boolean);
  const twoToken = tokens.slice(0, 2).join(" ");

  if (twoTokenUnits[twoToken]) {
    return { unit: twoTokenUnits[twoToken], remainder: tokens.slice(2).join(" ") };
  }

  const oneToken = tokens[0];

  if (oneToken && oneTokenUnits[oneToken]) {
    return { unit: oneTokenUnits[oneToken], remainder: tokens.slice(1).join(" ") };
  }

  return { unit: null, remainder: tokens.join(" ") };
}

// Ingilizce malzeme adlari -- EN sayfasindaki tarifleri de eslestirebilmek
// icin. KitchenMeasuresConverter.tsx'teki EN etiketleriyle ayni degerler.
export const englishIngredientLabels: Record<KitchenIngredientKey, string> = {
  un: "Flour",
  "tam-bugday-unu": "Whole Wheat Flour",
  "pirinc-unu": "Rice Flour",
  "misir-unu": "Corn Flour",
  irmik: "Semolina",
  "galeta-unu": "Breadcrumbs",
  "toz-seker": "Sugar",
  "pudra-sekeri": "Powdered Sugar",
  "esmer-seker": "Brown Sugar",
  tuz: "Salt",
  pirinc: "Rice",
  bulgur: "Bulgur",
  nohut: "Chickpeas",
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
  "ceviz-ici": "Walnuts",
  "findik-ici": "Hazelnuts",
  badem: "Almonds",
  "antep-fistigi": "Pistachios",
  "kuru-uzum": "Raisins",
  "hindistan-cevizi": "Desiccated Coconut",
  mayonez: "Mayonnaise",
  ketcap: "Ketchup",
  sirke: "Vinegar",
  "limon-suyu": "Lemon Juice",
  tarcin: "Cinnamon",
  "kirmizi-biber": "Red Pepper",
  karabiber: "Black Pepper",
  kimyon: "Cumin",
};

const ingredientMatchEntries: Array<{
  key: KitchenIngredientKey;
  normalized: string;
}> = kitchenIngredientRows.flatMap((row) => {
  const entries = [
    { key: row.key, normalized: normalizeTr(row.label.split(" (")[0]) },
  ];

  const englishLabel = englishIngredientLabels[row.key];

  if (englishLabel) {
    entries.push({ key: row.key, normalized: normalizeTr(englishLabel) });
  }

  return entries;
});

// Eslesme turleri (dusuk sayi = daha guvenilir):
// 0 = tam eslesme ("zeytinyagi" === "zeytinyagi")
// 1 = kullanicinin yazdigi metin adayin tam adindan daha detayli
//     ("kirmizi mercimek" metninde "mercimek" adayi gecer) -- en UZUN
//     aday tercih edilir (yazilana en cok karsilik gelen).
// 2 = kullanicinin yazdigi metin adayin tam adindan daha az detayli
//     (sadece "seker" yazilmis, aday "esmer seker" veya "toz seker"
//     olabilir) -- en KISA aday tercih edilir (en az varsayimla en
//     "duz"/varsayilan malzeme, ör. "toz seker").
function classifyMatch(remainder: string, candidate: string): 0 | 1 | 2 | null {
  if (remainder === candidate) return 0;

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

function findMatchingIngredient(remainder: string): KitchenIngredientKey | null {
  if (!remainder) {
    return null;
  }

  const candidates = ingredientMatchEntries
    .map((entry) => ({ entry, kind: classifyMatch(remainder, entry.normalized) }))
    .filter(
      (item): item is { entry: (typeof ingredientMatchEntries)[number]; kind: 0 | 1 | 2 } =>
        item.kind !== null
    );

  if (candidates.length === 0) {
    return null;
  }

  candidates.sort((a, b) => {
    if (a.kind !== b.kind) {
      return a.kind - b.kind;
    }

    return a.kind === 1
      ? b.entry.normalized.length - a.entry.normalized.length
      : a.entry.normalized.length - b.entry.normalized.length;
  });

  return candidates[0].entry.key;
}

// Firin sicakligi bir malzeme miktari degildir -- tarifi 2 katina
// cikarmak sicakligi degistirmez. Bu yuzden sicaklik satirlari
// miktar-olcekleme mantigina hic girmeden, olculmeden gosterilir;
// sadece °C/°F karsiligi eklenir. Turkce tariflerde "derece" varsayilan
// olarak Celsius kabul edilir.
const temperaturePattern = /(\d+)\s*°?\s*(c\b|f\b|derece)/;

function detectTemperature(line: string, locale: "tr" | "en"): string | null {
  const match = normalizeTr(line).match(temperaturePattern);

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
    return `≈ ${formatQuantity(celsius, locale)}°C`;
  }

  const fahrenheit = Math.round((value * 9) / 5 + 32);
  return `≈ ${formatQuantity(fahrenheit, locale)}°F`;
}

function formatQuantity(value: number, locale: "tr" | "en"): string {
  const rounded = Math.round(value * 100) / 100;

  return rounded.toLocaleString(locale === "en" ? "en-US" : "tr-TR", {
    maximumFractionDigits: 2,
  });
}

export function scaleRecipeText(
  text: string,
  factor: number,
  locale: "tr" | "en" = "tr"
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
      const scaledLine = `${formatQuantity(scaledQuantity, locale)} ${restOfLine}`;

      const { unit, remainder } = extractUnit(normalizeTr(restOfLine));
      const matchedIngredient = unit ? findMatchingIngredient(remainder) : null;
      const gramEquivalent =
        unit && matchedIngredient
          ? convertKitchenValue(matchedIngredient, unit, scaledQuantity).gram
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
