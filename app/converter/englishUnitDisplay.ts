// English display helpers for conversion pages: plural unit names
// ("Centimeters", "Feet", "Miles per Hour"), readable symbols ("°C") and
// rounded numbers for titles and descriptions. People search "cm to
// inches", not "1 centimeter to inch", so titles and FAQs use these.

// Names that do not take a plural "s" in normal English usage.
const UNINFLECTED = new Set([
  "celsius",
  "fahrenheit",
  "kelvin",
  "rankine",
  "réaumur",
  "hertz",
  "kilohertz",
  "megahertz",
  "gigahertz",
  "horsepower",
  "stone",
  "siemens",
  "lux",
  "percent",
  "torr",
  "gold",
  "silver",
  "light",
  "gravity",
]);

// Whole names that stay as they are.
const FIXED_NAMES = new Set(["speed of light"]);

const IRREGULAR: Record<string, string> = {
  foot: "feet",
  inch: "inches",
  century: "centuries",
};

function pluralizeWord(word: string): string {
  const lower = word.toLowerCase();
  if (UNINFLECTED.has(lower)) return word;
  if (IRREGULAR[lower]) return matchCase(word, IRREGULAR[lower]);
  if (/[^aeiou]y$/i.test(word)) return word.slice(0, -1) + "ies";
  if (/(s|x|z|ch|sh)$/i.test(word)) return word + "es";
  return word + "s";
}

function matchCase(original: string, replacement: string) {
  return original[0] === original[0].toUpperCase()
    ? replacement[0].toUpperCase() + replacement.slice(1)
    : replacement;
}

/**
 * Pluralizes the head noun of an English unit name:
 * "Kilometer per Hour" -> "Kilometers per Hour",
 * "Millimeter of Mercury" -> "Millimeters of Mercury",
 * "Kilogram-Force" -> "Kilograms-Force", "US Fluid Ounce" -> "US Fluid Ounces".
 */
export function pluralizeEnglishUnitName(name: string): string {
  if (FIXED_NAMES.has(name.toLowerCase())) return name;
  const splitAt = name.search(/\s(per|of)\s/i);
  const head = splitAt === -1 ? name : name.slice(0, splitAt);
  const tail = splitAt === -1 ? "" : name.slice(splitAt);

  // "Kilogram-Force", "Pound-Force": the unit noun is the first part.
  const forceMatch = head.match(/^(.*?)(\w+)(-Force)$/i);
  if (forceMatch) {
    return forceMatch[1] + pluralizeWord(forceMatch[2]) + forceMatch[3] + tail;
  }

  // Names in parentheses keep the qualifier: "Horsepower (Mechanical)".
  const parenMatch = head.match(/^(.*?)(\s\(.*\))$/);
  if (parenMatch) {
    return pluralizeEnglishUnitName(parenMatch[1]) + parenMatch[2] + tail;
  }

  const lastSpace = Math.max(head.lastIndexOf(" "), head.lastIndexOf("-"));
  const lastWord = head.slice(lastSpace + 1);
  const lastLower = lastWord.toLowerCase();
  if (IRREGULAR[head.toLowerCase()]) return matchCase(head, IRREGULAR[head.toLowerCase()]) + tail;
  // Symbols or codes such as "24K Gold" or "999 Silver" stay as they are.
  if (/\d/.test(head) || /^[A-Z0-9]+$/.test(lastWord) && lastWord.length <= 4) return name;
  if (UNINFLECTED.has(lastLower)) return name;
  // Already plural: "Milligrams per Deciliter", "Cubic Feet per Minute".
  if (lastLower === "feet" || (/s$/.test(lastLower) && !/(ss|us)$/.test(lastLower))) return name;
  return head.slice(0, lastSpace + 1) + pluralizeWord(lastWord) + tail;
}

const TEMPERATURE_SYMBOLS: Record<string, string> = {
  C: "°C",
  F: "°F",
  K: "K",
  R: "°R",
  Re: "°Ré",
};

// Registry ids that differ from the symbol people write.
const SYMBOL_OVERRIDES: Record<string, string> = { g0: "g" };

export function englishDisplaySymbol(category: string, unit: string, displaySymbol?: string) {
  if (category === "sicaklik" && TEMPERATURE_SYMBOLS[unit]) return TEMPERATURE_SYMBOLS[unit];
  if (SYMBOL_OVERRIDES[unit]) return SYMBOL_OVERRIDES[unit];
  return displaySymbol ?? unit;
}

/** Six significant digits, US formatting: 0.393700787402 -> "0.393701". */
export function formatEnglishShort(value: number) {
  if (value !== 0 && (Math.abs(value) >= 1e9 || Math.abs(value) < 1e-6)) {
    return value.toExponential(4);
  }
  return Number(value.toPrecision(6)).toLocaleString("en-US", { maximumFractionDigits: 10 });
}

// Words that stay capitalized inside a sentence.
const PROPER_WORDS = new Set([
  "Celsius", "Fahrenheit", "Kelvin", "Rankine", "Réaumur", "British", "Byzantine", "Turkish",
  "US", "UK",
]);

/** Sentence-case unit name: "US Fluid Ounces" -> "US fluid ounces", "Celsius" -> "Celsius". */
export function englishUnitInSentence(name: string) {
  return name
    .split(/(\s|-)/)
    .map((part) =>
      PROPER_WORDS.has(part) || /^[A-Z0-9]{2,}/.test(part) || /\d/.test(part) || /^\(/.test(part)
        ? part
        : part.toLowerCase()
    )
    .join("");
}

/** Title case for headings: "Nautical miles" -> "Nautical Miles"; "per" and "of" stay lowercase. */
export function englishTitleCase(name: string) {
  return name
    .split(" ")
    .map((word) => (/^(per|of|to)$/.test(word) ? word : word[0].toUpperCase() + word.slice(1)))
    .join(" ");
}

// Sablon " | BirimCeviri.app" (18 karakter) ekler; toplam 65'i gecmesin.
export const ENGLISH_TITLE_BUDGET = 47;

// Registry ids that are not real symbols (Turkish ids, bare numbers...).
function isSearchableSymbol(symbol: string) {
  return (
    /^[A-Za-zµΩ°²³·/ ]+$/.test(symbol) &&
    symbol !== "°" &&
    !["dirhem", "tur", "pus", "okka", "miskal", "batman", "kile", "litra", "ounkia", "orgyia", "endaze", "yk", "sb", "decimal", "cent", "dekar", "killa", "kanal", "marla", "guntha", "ground", "biswa", "katha", "bigha", "sehm"].includes(symbol)
  );
}

export function buildEnglishConversionTitle(page: {
  fromPlural: string;
  toPlural: string;
  fromSymbol: string;
  toSymbol: string;
  fromName: string;
  toName: string;
}) {
  const names = `${page.fromPlural} to ${page.toPlural}`;
  const differsFromName = (symbol: string, name: string, plural: string) =>
    ![name, plural].some((value) => value.toLowerCase() === symbol.toLowerCase());
  const hasSymbols =
    isSearchableSymbol(page.fromSymbol) &&
    isSearchableSymbol(page.toSymbol) &&
    differsFromName(page.fromSymbol, page.fromName, page.fromPlural) &&
    differsFromName(page.toSymbol, page.toName, page.toPlural);
  const symbols = `${page.fromSymbol} to ${page.toSymbol}`;
  const candidates = [
    ...(hasSymbols ? [`${names} Converter (${symbols})`, `${names} (${symbols})`] : []),
    `${names} Converter`,
    names,
    ...(hasSymbols ? [`${symbols} Converter`] : []),
  ];
  return candidates.find((candidate) => candidate.length <= ENGLISH_TITLE_BUDGET) ?? names;
}
