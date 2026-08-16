import { convert } from "./convert";
import {
  conversionPages,
  type ConversionPage,
} from "./conversionPages";
import { KILOGRAM_FORCE_PER_SQUARE_CENTIMETRE_UNIT } from "./engineeringUnits";

export type LocalizedGermanConversionPage = ConversionPage & {
  locale: "de";
  sourceSlug: string;
  categoryName: string;
};

type GermanUnit = {
  name: string;
  slug: string;
};

const germanUnits: Record<string, GermanUnit> = {
  "uzunluk:m": { name: "Meter", slug: "meter" },
  "uzunluk:km": { name: "Kilometer", slug: "kilometer" },
  "uzunluk:cm": { name: "Zentimeter", slug: "zentimeter" },
  "uzunluk:mm": { name: "Millimeter", slug: "millimeter" },
  "uzunluk:mi": { name: "Meile", slug: "meile" },
  "uzunluk:ft": { name: "Fu\u00DF", slug: "fuss" },
  "uzunluk:in": { name: "Zoll", slug: "zoll" },
  "uzunluk:yd": { name: "Yard", slug: "yard" },
  "kutle:kg": { name: "Kilogramm", slug: "kilogramm" },
  "kutle:g": { name: "Gramm", slug: "gramm" },
  "kutle:mg": { name: "Milligramm", slug: "milligramm" },
  "kutle:lb": { name: "Pfund", slug: "pfund" },
  "kutle:ton": { name: "Tonne", slug: "tonne" },
  "kutle:oz": { name: "Unze", slug: "unze" },
  "basinc:Pa": { name: "Pascal", slug: "pascal" },
  "basinc:kPa": { name: "Kilopascal", slug: "kilopascal" },
  "basinc:bar": { name: "Bar", slug: "bar" },
  "basinc:psi": { name: "PSI", slug: "psi" },
  "basinc:atm": { name: "Atmosph\u00E4re", slug: "atmosphaere" },
  "basinc:mmHg": {
    name: "Millimeter Quecksilbers\u00E4ule",
    slug: "millimeter-quecksilbersaeule",
  },
  [`basinc:${KILOGRAM_FORCE_PER_SQUARE_CENTIMETRE_UNIT}`]: {
    name: "Kilogramm-Kraft pro Quadratzentimeter",
    slug: "kilogramm-kraft-pro-quadratzentimeter",
  },
};

const germanCategoryNames: Record<string, string> = {
  uzunluk: "L\u00E4nge",
  kutle: "Masse",
  basinc: "Druck",
};

const supportedCategories = new Set([
  "uzunluk",
  "kutle",
  "basinc",
]);

const allowedSourceSlugs = new Set([
  "metre-kilometre",
  "kilometre-metre",
  "metre-santimetre",
  "santimetre-metre",
  "metre-milimetre",
  "milimetre-metre",
  "kilometre-mil",
  "mil-kilometre",
  "kilogram-gram",
  "gram-kilogram",
  "kilogram-pound",
  "pound-kilogram",
  "psi-bar",
  "bar-psi",
  "kilopascal-bar",
  "bar-kilopascal",
]);

function findGermanUnit(category: string, unit: string) {
  return germanUnits[`${category}:${unit}`];
}

function formatGermanValue(value: number) {
  return Number(value.toPrecision(12)).toLocaleString("de-DE", {
    maximumFractionDigits: 12,
  });
}

function createGermanFormula(
  fromName: string,
  toName: string,
  factor: number
) {
  if (factor >= 1) {
    return `${toName} = ${fromName} \u00D7 ${formatGermanValue(factor)}`;
  }

  return `${toName} = ${fromName} \u00F7 ${formatGermanValue(1 / factor)}`;
}

function createGermanExplanation(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string,
  factor: number
) {
  const operation =
    factor >= 1
      ? `mit ${formatGermanValue(factor)} multipliziert`
      : `durch ${formatGermanValue(1 / factor)} dividiert`;

  return (
    `Bei der Umrechnung von ${fromName} in ${toName} wird der Ausgangswert ${operation}. ` +
    `1 ${fromUnit} entspricht ${formatGermanValue(factor)} ${toUnit}.`
  );
}

function localizeConversionPage(
  page: ConversionPage
): LocalizedGermanConversionPage | null {
  if (!supportedCategories.has(page.category)) {
    return null;
  }

  if (!allowedSourceSlugs.has(page.slug)) {
    return null;
  }

  const from = findGermanUnit(page.category, page.fromUnit);
  const to = findGermanUnit(page.category, page.toUnit);

  if (!from || !to) {
    return null;
  }

  const factor = convert(
    page.category,
    1,
    page.fromUnit,
    page.toUnit
  );

  return {
    ...page,
    locale: "de",
    sourceSlug: page.slug,
    slug: `${from.slug}-${to.slug}`,
    fromName: from.name,
    toName: to.name,
    categoryName:
      germanCategoryNames[page.category] ?? page.category,
    formula: createGermanFormula(from.name, to.name, factor),
    explanation: createGermanExplanation(
      from.name,
      to.name,
      page.fromUnit,
      page.toUnit,
      factor
    ),
    reverseSlug: `${to.slug}-${from.slug}`,
  };
}

export const germanConversionPages: LocalizedGermanConversionPage[] =
  conversionPages
    .map(localizeConversionPage)
    .filter(
      (
        page
      ): page is LocalizedGermanConversionPage => page !== null
    );

export function findGermanConversionPage(slug: string) {
  return germanConversionPages.find((page) => page.slug === slug);
}

export function findGermanPageByTurkishSlug(sourceSlug: string) {
  return germanConversionPages.find(
    (page) => page.sourceSlug === sourceSlug
  );
}
