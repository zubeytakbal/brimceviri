import { convert } from "./convert";
import {
  conversionPages,
  type ConversionPage,
} from "./conversionPages";
import { KILOGRAM_FORCE_PER_SQUARE_CENTIMETRE_UNIT } from "./engineeringUnits";

export type LocalizedConversionPage = ConversionPage & {
  locale: "en";
  sourceSlug: string;
  categoryName: string;
};

type EnglishUnit = {
  name: string;
  slug: string;
};

const englishUnits: Record<string, EnglishUnit> = {
  "uzunluk:m": {
    name: "Meter",
    slug: "meters",
  },
  "uzunluk:km": {
    name: "Kilometer",
    slug: "kilometers",
  },
  "uzunluk:cm": {
    name: "Centimeter",
    slug: "centimeters",
  },
  "uzunluk:mm": {
    name: "Millimeter",
    slug: "millimeters",
  },
  "uzunluk:mi": {
    name: "Mile",
    slug: "miles",
  },
  "uzunluk:ft": {
    name: "Foot",
    slug: "feet",
  },
  "uzunluk:in": {
    name: "Inch",
    slug: "inches",
  },
  "uzunluk:yd": {
    name: "Yard",
    slug: "yards",
  },
  "kutle:kg": {
    name: "Kilogram",
    slug: "kilograms",
  },
  "kutle:g": {
    name: "Gram",
    slug: "grams",
  },
  "kutle:mg": {
    name: "Milligram",
    slug: "milligrams",
  },
  "kutle:lb": {
    name: "Pound",
    slug: "pounds",
  },
  "kutle:ton": {
    name: "Tonne",
    slug: "tonnes",
  },
  "kutle:oz": {
    name: "Ounce",
    slug: "ounces",
  },
  "basinc:Pa": {
    name: "Pascal",
    slug: "pascals",
  },
  "basinc:kPa": {
    name: "Kilopascal",
    slug: "kilopascals",
  },
  "basinc:bar": {
    name: "Bar",
    slug: "bars",
  },
  "basinc:psi": {
    name: "PSI",
    slug: "psi",
  },
  "basinc:atm": {
    name: "Atmosphere",
    slug: "atmospheres",
  },
  "basinc:mmHg": {
    name: "Millimeter of Mercury",
    slug: "millimeters-of-mercury",
  },
  [`basinc:${KILOGRAM_FORCE_PER_SQUARE_CENTIMETRE_UNIT}`]: {
    name: "Kilogram-Force per Square Centimeter",
    slug: "kilogram-force-per-square-centimeter",
  },
};

const englishCategoryNames: Record<string, string> = {
  uzunluk: "Length",
  kutle: "Mass",
  basinc: "Pressure",
};

function findEnglishUnit(category: string, unit: string) {
  return englishUnits[`${category}:${unit}`];
}

function formatEnglishValue(value: number) {
  return Number(value.toPrecision(12)).toLocaleString("en-US", {
    maximumFractionDigits: 12,
  });
}

function createEnglishFormula(
  fromName: string,
  toName: string,
  factor: number
) {
  if (factor >= 1) {
    return `${toName} = ${fromName} × ${formatEnglishValue(factor)}`;
  }

  return (
    `${toName} = ${fromName} ÷ ` +
    `${formatEnglishValue(1 / factor)}`
  );
}

function createEnglishExplanation(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string,
  factor: number
) {
  const operation =
    factor >= 1
      ? `multiply the ${fromName.toLowerCase()} value by ${formatEnglishValue(
          factor
        )}`
      : `divide the ${fromName.toLowerCase()} value by ${formatEnglishValue(
          1 / factor
        )}`;

  return (
    `To convert ${fromName.toLowerCase()} to ` +
    `${toName.toLowerCase()}, ${operation}. ` +
    `One ${fromUnit} is equal to ${formatEnglishValue(factor)} ${toUnit}.`
  );
}

function localizeConversionPage(
  page: ConversionPage
): LocalizedConversionPage | null {
  const from = findEnglishUnit(page.category, page.fromUnit);
  const to = findEnglishUnit(page.category, page.toUnit);

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
    locale: "en",
    sourceSlug: page.slug,
    slug:
      page.englishSlug ?? `${from.slug}-to-${to.slug}`,
    fromName: from.name,
    toName: to.name,
    categoryName:
      englishCategoryNames[page.category] ?? page.category,
    formula: createEnglishFormula(
      from.name,
      to.name,
      factor
    ),
    explanation: createEnglishExplanation(
      from.name,
      to.name,
      page.fromUnit,
      page.toUnit,
      factor
    ),
    reverseSlug:
      page.englishReverseSlug ?? `${to.slug}-to-${from.slug}`,
  };
}

export const englishConversionPages: LocalizedConversionPage[] =
  conversionPages
    .map(localizeConversionPage)
    .filter(
      (
        page
      ): page is LocalizedConversionPage => page !== null
    );

export function findEnglishConversionPage(slug: string) {
  return englishConversionPages.find((page) => page.slug === slug);
}

export function findEnglishPageByTurkishSlug(sourceSlug: string) {
  return englishConversionPages.find(
    (page) => page.sourceSlug === sourceSlug
  );
}
