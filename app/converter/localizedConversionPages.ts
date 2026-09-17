import { convert } from "./convert";
import {
  conversionPages,
  type ConversionPage,
} from "./conversionPages";
import { findUnit, unitRegistry } from "./unitRegistry";

export type LocalizedConversionPage = ConversionPage & {
  locale: "en";
  sourceSlug: string;
  categoryName: string;
  /** True when the page is intentionally published only in English. */
  isEnglishOnly?: boolean;
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
    return `To convert ${fromName.toLowerCase()} to ${toName.toLowerCase()}, multiply by 9/5 and add 32. One ${fromUnit} equals 33.8 ${toUnit}.`;
  }

  if (fromUnit === "F" && toUnit === "C") {
    return `To convert ${fromName.toLowerCase()} to ${toName.toLowerCase()}, subtract 32 and multiply the result by 5/9. A value of 32 ${fromUnit} equals 0 ${toUnit}.`;
  }

  if (fromUnit === "C" && toUnit === "K") {
    return `To convert ${fromName.toLowerCase()} to ${toName.toLowerCase()}, add 273.15. A value of 0 ${fromUnit} equals 273.15 ${toUnit}.`;
  }

  if (fromUnit === "K" && toUnit === "C") {
    return `To convert ${fromName.toLowerCase()} to ${toName.toLowerCase()}, subtract 273.15. A value of 273.15 ${fromUnit} equals 0 ${toUnit}.`;
  }

  if (fromUnit === "C" && toUnit === "R") {
    return `To convert ${fromName.toLowerCase()} to ${toName.toLowerCase()}, add 273.15 and multiply by 9/5. A value of 0 ${fromUnit} equals 491.67 ${toUnit}.`;
  }

  if (fromUnit === "R" && toUnit === "C") {
    return `To convert ${fromName.toLowerCase()} to ${toName.toLowerCase()}, multiply by 5/9 and subtract 273.15. A value of 491.67 ${fromUnit} equals 0 ${toUnit}.`;
  }

  if (fromUnit === "F" && toUnit === "R") {
    return `To convert ${fromName.toLowerCase()} to ${toName.toLowerCase()}, add 459.67. A value of 32 ${fromUnit} equals 491.67 ${toUnit}.`;
  }

  if (fromUnit === "R" && toUnit === "F") {
    return `To convert ${fromName.toLowerCase()} to ${toName.toLowerCase()}, subtract 459.67. A value of 491.67 ${fromUnit} equals 32 ${toUnit}.`;
  }

  if (fromUnit === "C" && toUnit === "Re") {
    return `To convert ${fromName.toLowerCase()} to ${toName.toLowerCase()}, multiply by 4/5. A value of 100 ${fromUnit} equals 80 ${toUnit}.`;
  }

  if (fromUnit === "Re" && toUnit === "C") {
    return `To convert ${fromName.toLowerCase()} to ${toName.toLowerCase()}, multiply by 5/4. A value of 80 ${fromUnit} equals 100 ${toUnit}.`;
  }

  return `Convert ${fromName.toLowerCase()} to ${toName.toLowerCase()} using the defined temperature relationship.`;
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

  return {
    ...page,
    locale: "en",
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
        : createEnglishExplanation(
            from.en.name,
            to.en.name,
            page.fromUnit,
            page.toUnit,
            factor
          ),
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

    return {
      locale: "en",
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
      explanation: createEnglishExplanation(
        from.en!.name,
        to.en!.name,
        from.symbol,
        to.symbol,
        factor
      ),
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
