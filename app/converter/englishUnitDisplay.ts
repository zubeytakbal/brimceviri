// English display helpers for conversion pages: plural unit names
// ("Centimeters", "Feet", "Miles per Hour"), readable symbols ("°C") and
// rounded numbers for titles and descriptions. People search "cm to
// inches", not "1 centimeter to inch", so titles and FAQs use these.

// Names that do not take a plural "s" in normal English usage.
const UNINFLECTED = new Set([
  "gaj",
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
// Registry symbols that are Turkish words or Turkish abbreviations must not
// appear on English pages ("1 arşın = 0.68 m", "çk" for teaspoon).
const SYMBOL_OVERRIDES: Record<string, string> = {
  g0: "g",
  "arşın": "arshin",
  "çığ": "cig",
  "dönüm": "donum",
  "kırat (arazi)": "qirat",
  "çk": "tsp",
  yk: "tbsp",
  sb: "glass",
  "şinik": "shinik",
};

/** "a" or "an" for an English unit name ("an arshin", "a US gallon", "a unit"). */
export function englishIndefiniteArticle(name: string) {
  const lower = name.toLowerCase();
  if (/^(u[bcfhjkqrstn][aeiou]|uni|us\b|use|one|eu)/.test(lower)) return "a";
  if (/^(hour|honest|heir)/.test(lower)) return "an";
  return /^[aeiou]/.test(lower) ? "an" : "a";
}

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

// En fazla 4 anlamli basamakli, bilimsel gosterimsiz katsayi: 0.001, 5,
// 2.54, 1,000. Sifirlar anlamli basamak sayilmaz.
export function isRoundFactor(value: string) {
  if (!/^[0-9.,]+$/.test(value)) {
    return false;
  }
  const digits = value.replace(/[.,]/g, "").replace(/^0+/, "").replace(/0+$/, "");
  return digits.length > 0 && digits.length <= 4;
}

export function buildEnglishConversionTitle(page: {
  fromPlural: string;
  toPlural: string;
  fromSymbol: string;
  toSymbol: string;
  fromName: string;
  toName: string;
}, oneUnitResult?: string) {
  const names = `${page.fromPlural} to ${page.toPlural}`;
  const differsFromName = (symbol: string, name: string, plural: string) =>
    ![name, plural].some((value) => value.toLowerCase() === symbol.toLowerCase());
  const hasSymbols =
    isSearchableSymbol(page.fromSymbol) &&
    isSearchableSymbol(page.toSymbol) &&
    differsFromName(page.fromSymbol, page.fromName, page.fromPlural) &&
    differsFromName(page.toSymbol, page.toName, page.toPlural);
  const symbols = `${page.fromSymbol} to ${page.toSymbol}`;
  // Katsayi yuvarlaksa (1 mA = 0.001 A, 1 g = 5 ct) cevap basliga girer:
  // arama sonucunda sayfayi acmadan gorulen bu bilgi tiklama oranini
  // artirir. 0.393701 gibi uzun katsayilarda eski kalip kalir.
  const answer =
    hasSymbols && oneUnitResult && isRoundFactor(oneUnitResult)
      ? `1 ${page.fromSymbol} = ${oneUnitResult} ${page.toSymbol}`
      : null;
  const candidates = [
    ...(answer ? [`${names}: ${answer}`] : []),
    ...(hasSymbols ? [`${names} Converter (${symbols})`, `${names} (${symbols})`] : []),
    // Uzun adli muhendislik birimleri sembolle aranir ("n/mm2 to mpa").
    ...(answer ? [`${symbols}: ${answer}`] : []),
    `${names} Converter`,
    names,
    ...(hasSymbols ? [`${symbols} Converter`] : []),
  ];
  return candidates.find((candidate) => candidate.length <= ENGLISH_TITLE_BUDGET) ?? names;
}

/** Unit guide page title within the 47-character budget: "Kilometer (km): Definition & Conversions". */
export function buildEnglishUnitGuideTitle(name: string, symbol: string, answer?: string | null) {
  const showSymbol = symbol && symbol.toLowerCase() !== name.toLowerCase();
  const candidates = [
    // Cevap basliktaysa ("Megapascal (MPa): 1 MPa = 10 bar") arama sonucu
    // soruyu dogrudan yanitlar.
    ...(answer && showSymbol ? [`${name} (${symbol}): ${answer} — Unit Guide`, `${name} (${symbol}): ${answer}`] : []),
    ...(answer ? [`${name}: ${answer} — Unit Guide`, `${name}: ${answer}`] : []),
    ...(showSymbol ? [`${name} (${symbol}): Definition & Conversions`] : []),
    `${name}: Definition & Conversions`,
    ...(showSymbol ? [`${name} (${symbol}): Unit Guide`] : []),
    `${name}: Unit Guide`,
  ];
  return candidates.find((title) => title.length <= ENGLISH_TITLE_BUDGET) ?? name;
}

/** Unit guide meta description, kept under ~160 characters. */
export function buildEnglishUnitGuideDescription(name: string, symbol: string, categoryName: string, answer?: string | null) {
  const unit = englishUnitInSentence(name);
  if (answer) {
    const withAnswer = `${answer}. The symbol for ${unit} is ${symbol}. Definition, history and instant conversions to other ${categoryName.toLowerCase()} units.`;
    if (withAnswer.length <= 160) return withAnswer;
    const shortAnswer = `${answer}. ${name} (${symbol}): definition, history and instant conversions.`;
    if (shortAnswer.length <= 160) return shortAnswer;
  }
  const full = `The symbol for ${unit} is ${symbol}. Definition, history, SI equivalent and instant conversions to other ${categoryName.toLowerCase()} units.`;
  if (full.length <= 160) return full;
  const short = `${name} (${symbol}): definition, history, SI equivalent and instant conversions.`;
  return short.length <= 160 ? short : `${name}: definition, history and instant conversions.`;
}
