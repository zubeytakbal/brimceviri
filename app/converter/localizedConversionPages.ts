import { convert } from "./convert";
import {
  conversionPages,
  type ConversionPage,
} from "./conversionPages";
import {
  englishDisplaySymbol,
  englishTitleCase,
  englishUnitInSentence,
  formatEnglishShort,
  pluralizeEnglishUnitName,
} from "./englishUnitDisplay";
import { findUnit, unitRegistry } from "./unitRegistry";

export type LocalizedConversionPage = ConversionPage & {
  locale: "en";
  sourceSlug: string;
  categoryName: string;
  /** True when the page is intentionally published only in English. */
  isEnglishOnly?: boolean;
  /** Plural display names ("Centimeters", "Feet") used in titles and headings. */
  fromPlural: string;
  toPlural: string;
  /** Readable symbols ("°C" instead of the registry id "C"). */
  fromSymbol: string;
  toSymbol: string;
};

const englishCategoryNames: Record<string, string> = {
  alan: "Area",
  hacim: "Volume",
  uzunluk: "Length",
  kutle: "Mass",
  sicaklik: "Temperature",
  zaman: "Time",
  hiz: "Speed",
  basinc: "Pressure",
  enerji: "Energy and Power",
  debi: "Flow Rate",
  elektrik: "Electricity",
  yogunluk: "Density",
  kuvvet: "Force",
  tork: "Torque",
  momentum: "Momentum",
  viskozite_dinamik: "Viscosity",
  veri: "Data Storage",
  elektrik_direnc: "Resistance",
  kapasitans: "Capacitance",
  enduktans: "Inductance",
  elektrik_yuk: "Electric Charge",
  altin_ayar: "Gold Karat",
  gumus_ayar: "Silver Purity",
  kan_sekeri: "Blood Glucose",
  vitamin_d: "Vitamin D",
};

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
  fromPlural: string,
  toPlural: string,
  fromSymbol: string,
  toSymbol: string,
  factor: number
) {
  const from = englishUnitInSentence(fromPlural);
  const to = englishUnitInSentence(toPlural);
  const operation =
    factor >= 1
      ? `multiply the number of ${from} by ${formatEnglishValue(factor)}`
      : `divide the number of ${from} by ${formatEnglishValue(1 / factor)}`;

  return (
    `To convert ${from} to ${to}, ${operation}. ` +
    `1 ${fromSymbol} = ${formatEnglishShort(factor)} ${toSymbol}.`
  );
}

function createTemperatureFormula(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string
) {
  if (fromUnit === "C" && toUnit === "F") {
    return `${toName} = (${fromName} × 9/5) + 32`;
  }

  if (fromUnit === "F" && toUnit === "C") {
    return `${toName} = (${fromName} − 32) × 5/9`;
  }

  if (fromUnit === "C" && toUnit === "K") {
    return `${toName} = ${fromName} + 273.15`;
  }

  if (fromUnit === "K" && toUnit === "C") {
    return `${toName} = ${fromName} − 273.15`;
  }

  if (fromUnit === "C" && toUnit === "R") {
    return `${toName} = (${fromName} + 273.15) × 9/5`;
  }

  if (fromUnit === "R" && toUnit === "C") {
    return `${toName} = ${fromName} × 5/9 − 273.15`;
  }

  if (fromUnit === "F" && toUnit === "R") {
    return `${toName} = ${fromName} + 459.67`;
  }

  if (fromUnit === "R" && toUnit === "F") {
    return `${toName} = ${fromName} − 459.67`;
  }

  if (fromUnit === "C" && toUnit === "Re") {
    return `${toName} = ${fromName} × 4/5`;
  }

  if (fromUnit === "Re" && toUnit === "C") {
    return `${toName} = ${fromName} × 5/4`;
  }

  return `${toName} = ${fromName}`;
}

function createTemperatureExplanation(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string
) {
  if (fromUnit === "C" && toUnit === "F") {
    return `To convert ${englishUnitInSentence(fromName)} to ${englishUnitInSentence(toName)}, multiply by 9/5 and add 32. One ${englishDisplaySymbol("sicaklik", fromUnit)} equals 33.8 ${englishDisplaySymbol("sicaklik", toUnit)}.`;
  }

  if (fromUnit === "F" && toUnit === "C") {
    return `To convert ${englishUnitInSentence(fromName)} to ${englishUnitInSentence(toName)}, subtract 32 and multiply the result by 5/9. A value of 32 ${englishDisplaySymbol("sicaklik", fromUnit)} equals 0 ${englishDisplaySymbol("sicaklik", toUnit)}.`;
  }

  if (fromUnit === "C" && toUnit === "K") {
    return `To convert ${englishUnitInSentence(fromName)} to ${englishUnitInSentence(toName)}, add 273.15. A value of 0 ${englishDisplaySymbol("sicaklik", fromUnit)} equals 273.15 ${englishDisplaySymbol("sicaklik", toUnit)}.`;
  }

  if (fromUnit === "K" && toUnit === "C") {
    return `To convert ${englishUnitInSentence(fromName)} to ${englishUnitInSentence(toName)}, subtract 273.15. A value of 273.15 ${englishDisplaySymbol("sicaklik", fromUnit)} equals 0 ${englishDisplaySymbol("sicaklik", toUnit)}.`;
  }

  if (fromUnit === "C" && toUnit === "R") {
    return `To convert ${englishUnitInSentence(fromName)} to ${englishUnitInSentence(toName)}, add 273.15 and multiply by 9/5. A value of 0 ${englishDisplaySymbol("sicaklik", fromUnit)} equals 491.67 ${englishDisplaySymbol("sicaklik", toUnit)}.`;
  }

  if (fromUnit === "R" && toUnit === "C") {
    return `To convert ${englishUnitInSentence(fromName)} to ${englishUnitInSentence(toName)}, multiply by 5/9 and subtract 273.15. A value of 491.67 ${englishDisplaySymbol("sicaklik", fromUnit)} equals 0 ${englishDisplaySymbol("sicaklik", toUnit)}.`;
  }

  if (fromUnit === "F" && toUnit === "R") {
    return `To convert ${englishUnitInSentence(fromName)} to ${englishUnitInSentence(toName)}, add 459.67. A value of 32 ${englishDisplaySymbol("sicaklik", fromUnit)} equals 491.67 ${englishDisplaySymbol("sicaklik", toUnit)}.`;
  }

  if (fromUnit === "R" && toUnit === "F") {
    return `To convert ${englishUnitInSentence(fromName)} to ${englishUnitInSentence(toName)}, subtract 459.67. A value of 491.67 ${englishDisplaySymbol("sicaklik", fromUnit)} equals 32 ${englishDisplaySymbol("sicaklik", toUnit)}.`;
  }

  if (fromUnit === "C" && toUnit === "Re") {
    return `To convert ${englishUnitInSentence(fromName)} to ${englishUnitInSentence(toName)}, multiply by 4/5. A value of 100 ${englishDisplaySymbol("sicaklik", fromUnit)} equals 80 ${englishDisplaySymbol("sicaklik", toUnit)}.`;
  }

  if (fromUnit === "Re" && toUnit === "C") {
    return `To convert ${englishUnitInSentence(fromName)} to ${englishUnitInSentence(toName)}, multiply by 5/4. A value of 80 ${englishDisplaySymbol("sicaklik", fromUnit)} equals 100 ${englishDisplaySymbol("sicaklik", toUnit)}.`;
  }

  return `Convert ${englishUnitInSentence(fromName)} to ${englishUnitInSentence(toName)} using the defined temperature relationship.`;
}

function localizeConversionPage(
  page: ConversionPage
): LocalizedConversionPage | null {
  const from = findUnit(page.category, page.fromUnit);
  const to = findUnit(page.category, page.toUnit);

  if (!from?.en || !to?.en) {
    return null;
  }

  const fromSlug = from.enConversionSlug ?? from.en.slug;
  const toSlug = to.enConversionSlug ?? to.en.slug;

  const factor = convert(
    page.category,
    1,
    page.fromUnit,
    page.toUnit
  );
  const fromPlural = englishTitleCase(pluralizeEnglishUnitName(from.en.name));
  const toPlural = englishTitleCase(pluralizeEnglishUnitName(to.en.name));
  const fromSymbol = englishDisplaySymbol(page.category, page.fromUnit, from.displaySymbol);
  const toSymbol = englishDisplaySymbol(page.category, page.toUnit, to.displaySymbol);

  return {
    ...page,
    locale: "en",
    fromPlural,
    toPlural,
    fromSymbol,
    toSymbol,
    sourceSlug: page.slug,
    slug: page.englishSlug ?? `${fromSlug}-to-${toSlug}`,
    fromName: from.en.name,
    toName: to.en.name,
    categoryName:
      englishCategoryNames[page.category] ?? page.category,
    formula:
      page.category === "sicaklik"
        ? createTemperatureFormula(
            from.en.name,
            to.en.name,
            page.fromUnit,
            page.toUnit
          )
        : createEnglishFormula(from.en.name, to.en.name, factor),
    explanation:
      page.category === "sicaklik"
        ? createTemperatureExplanation(
            from.en.name,
            to.en.name,
            page.fromUnit,
            page.toUnit
          )
        : createEnglishExplanation(fromPlural, toPlural, fromSymbol, toSymbol, factor),
    reverseSlug:
      page.englishReverseSlug ?? `${toSlug}-to-${fromSlug}`,
  };
}

type EnglishOnlyPairDefinition = {
  category: string;
  firstId: string;
  secondId: string;
  firstExamples: number[];
  secondExamples: number[];
  forwardSlug: string;
  reverseSlug: string;
};

function createEnglishOnlyPair(
  definition: EnglishOnlyPairDefinition
): LocalizedConversionPage[] {
  const first = unitRegistry.find((unit) => unit.id === definition.firstId);
  const second = unitRegistry.find((unit) => unit.id === definition.secondId);

  if (!first?.en || !second?.en) {
    throw new Error(
      `englishConversionPages: missing English unit data for ${definition.firstId}/${definition.secondId}`
    );
  }

  const categoryName =
    englishCategoryNames[definition.category] ?? definition.category;

  const createPage = (
    from: typeof first,
    to: typeof second,
    slug: string,
    reverseSlug: string,
    exampleValues: number[]
  ): LocalizedConversionPage => {
    const factor = convert(definition.category, 1, from.symbol, to.symbol);
    const fromPlural = englishTitleCase(pluralizeEnglishUnitName(from.en!.name));
    const toPlural = englishTitleCase(pluralizeEnglishUnitName(to.en!.name));
    const fromSymbol = englishDisplaySymbol(definition.category, from.symbol, from.displaySymbol);
    const toSymbol = englishDisplaySymbol(definition.category, to.symbol, to.displaySymbol);

    return {
      locale: "en",
      fromPlural,
      toPlural,
      fromSymbol,
      toSymbol,
      // English-only pages deliberately have no Turkish source route.
      sourceSlug: `en-only:${slug}`,
      isEnglishOnly: true,
      slug,
      category: definition.category,
      categoryName,
      fromUnit: from.symbol,
      toUnit: to.symbol,
      fromName: from.en!.name,
      toName: to.en!.name,
      formula: createEnglishFormula(from.en!.name, to.en!.name, factor),
      explanation: createEnglishExplanation(fromPlural, toPlural, fromSymbol, toSymbol, factor),
      exampleValues,
      reverseSlug,
    };
  };

  return [
    createPage(
      first,
      second,
      definition.forwardSlug,
      definition.reverseSlug,
      definition.firstExamples
    ),
    createPage(
      second,
      first,
      definition.reverseSlug,
      definition.forwardSlug,
      definition.secondExamples
    ),
  ];
}

/**
 * High-intent comparisons without a Turkish equivalent route. They stay
 * English-only instead of creating duplicate country pages in every locale.
 */
const englishOnlyPairDefinitions: readonly EnglishOnlyPairDefinition[] = [
  {
    category: "hacim",
    firstId: "ingiliz-galonu",
    secondId: "litre",
    firstExamples: [1, 2, 5, 10, 20, 50, 100],
    secondExamples: [1, 5, 10, 20, 50, 100, 500],
    forwardSlug: "imperial-gallons-to-liters",
    reverseSlug: "liters-to-imperial-gallons",
  },
  {
    category: "hacim",
    firstId: "pint",
    secondId: "mililitre",
    firstExamples: [1, 2, 4, 8, 16, 32],
    secondExamples: [100, 250, 500, 1000, 2000, 5000, 10000],
    forwardSlug: "us-pints-to-milliliters",
    reverseSlug: "milliliters-to-us-pints",
  },
  {
    category: "hacim",
    firstId: "ingiliz-pint",
    secondId: "mililitre",
    firstExamples: [1, 2, 4, 8, 16, 32],
    secondExamples: [100, 250, 500, 1000, 2000, 5000, 10000],
    forwardSlug: "imperial-pints-to-milliliters",
    reverseSlug: "milliliters-to-imperial-pints",
  },
  {
    category: "hacim",
    firstId: "quart",
    secondId: "litre",
    firstExamples: [1, 2, 4, 8, 16, 32],
    secondExamples: [1, 2, 5, 10, 20, 50, 100],
    forwardSlug: "us-quarts-to-liters",
    reverseSlug: "liters-to-us-quarts",
  },
  {
    category: "hacim",
    firstId: "ingiliz-quart",
    secondId: "litre",
    firstExamples: [1, 2, 4, 8, 16, 32],
    secondExamples: [1, 2, 5, 10, 20, 50, 100],
    forwardSlug: "imperial-quarts-to-liters",
    reverseSlug: "liters-to-imperial-quarts",
  },
  {
    category: "hacim",
    firstId: "sivi-ons",
    secondId: "mililitre",
    firstExamples: [1, 2, 4, 8, 16, 32],
    secondExamples: [15, 30, 50, 100, 250, 500, 1000],
    forwardSlug: "us-fluid-ounces-to-milliliters",
    reverseSlug: "milliliters-to-us-fluid-ounces",
  },
  {
    category: "hacim",
    firstId: "ingiliz-sivi-ons",
    secondId: "mililitre",
    firstExamples: [1, 2, 4, 8, 16, 32],
    secondExamples: [15, 30, 50, 100, 250, 500, 1000],
    forwardSlug: "imperial-fluid-ounces-to-milliliters",
    reverseSlug: "milliliters-to-imperial-fluid-ounces",
  },
  {
    category: "hacim",
    firstId: "cay-kasigi",
    secondId: "mililitre",
    firstExamples: [1, 2, 3, 4, 6, 8, 12],
    secondExamples: [1, 2.5, 5, 10, 15, 30, 50],
    forwardSlug: "teaspoons-to-milliliters",
    reverseSlug: "milliliters-to-teaspoons",
  },
  {
    // "cm to feet" is one of the most searched height conversions.
    category: "uzunluk",
    firstId: "santimetre",
    secondId: "fit",
    firstExamples: [30, 100, 150, 160, 170, 180, 190, 200],
    secondExamples: [1, 2, 3, 4, 5, 5.5, 6, 6.5],
    forwardSlug: "centimeters-to-feet",
    reverseSlug: "feet-to-centimeters",
  },
  {
    // UK body weight is written in stone and pounds.
    category: "kutle",
    firstId: "pound",
    secondId: "stone",
    firstExamples: [14, 100, 140, 150, 168, 182, 196, 210],
    secondExamples: [1, 8, 9, 10, 11, 12, 13, 14],
    forwardSlug: "pounds-to-stone",
    reverseSlug: "stone-to-pounds",
  },
  {
    category: "uzunluk",
    firstId: "orgyia",
    secondId: "metre",
    firstExamples: [1, 2, 5, 10, 20, 50, 100],
    secondExamples: [1, 2, 5, 10, 20, 50, 100],
    forwardSlug: "byzantine-fathoms-to-meters",
    reverseSlug: "meters-to-byzantine-fathoms",
  },
];

export const englishConversionPages: LocalizedConversionPage[] =
  [
    ...conversionPages
      .map(localizeConversionPage)
      .filter(
        (
          page
        ): page is LocalizedConversionPage => page !== null
      ),
    ...englishOnlyPairDefinitions.flatMap(createEnglishOnlyPair),
  ];

export function findEnglishConversionPage(slug: string) {
  return englishConversionPages.find((page) => page.slug === slug);
}

export function findEnglishPageByTurkishSlug(sourceSlug: string) {
  return englishConversionPages.find(
    (page) => page.sourceSlug === sourceSlug
  );
}
