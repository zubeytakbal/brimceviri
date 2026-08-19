import { unitRegistry, type UnitRegistryEntry } from "./unitRegistry";

export type ConversionPage = {
  slug: string;
  category: string;
  fromUnit: string;
  toUnit: string;
  fromName: string;
  toName: string;
  formula: string;
  explanation: string;
  exampleValues: number[];
  reverseSlug: string;
  englishSlug?: string;
  englishReverseSlug?: string;
};

type ConversionPairDefinition = {
  category: string;
  firstId: string;
  secondId: string;
  firstExamples: number[];
  secondExamples: number[];
  englishOverride?: { forward: string; reverse: string };
  // Historical hand-authored factor/name that diverges from what the
  // registry's SI factor or canonical tr name would otherwise produce.
  // Kept only where the live site's existing text depends on it; see the
  // usage sites below for why each one exists.
  factorOverride?: number;
  nameOverrides?: Record<string, string>;
};

function getRegistryUnit(id: string): UnitRegistryEntry {
  const entry = unitRegistry.find((unit) => unit.id === id);

  if (!entry) {
    throw new Error(`unitRegistry: unknown unit id "${id}"`);
  }

  return entry;
}

function formatValue(value: number) {
  return Number(value.toPrecision(12)).toLocaleString("tr-TR", {
    maximumFractionDigits: 12,
  });
}

function createOperation(fromName: string, toName: string, factor: number) {
  if (factor >= 1) {
    return `${toName} = ${fromName} × ${formatValue(factor)}`;
  }

  return `${toName} = ${fromName} ÷ ${formatValue(1 / factor)}`;
}

function createExplanation(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string,
  factor: number
) {
  const operation =
    factor >= 1
      ? `${formatValue(factor)} ile çarpılır`
      : `${formatValue(1 / factor)} değerine bölünür`;

  return (
    `${fromName} ile ${toName} arasındaki dönüşümde ` +
    `${fromName.toLocaleLowerCase("tr-TR")} değeri ${operation}. ` +
    `1 ${fromUnit}, ${formatValue(factor)} ${toUnit} değerine eşittir.`
  );
}

function createConversionPair(
  definition: ConversionPairDefinition
): ConversionPage[] {
  const { category, firstExamples, secondExamples, englishOverride } =
    definition;
  const first = getRegistryUnit(definition.firstId);
  const second = getRegistryUnit(definition.secondId);

  if (
    first.siFactor === undefined ||
    second.siFactor === undefined ||
    !first.tr ||
    !second.tr
  ) {
    throw new Error(
      `conversionPages: ${definition.firstId}/${definition.secondId} missing siFactor or tr name`
    );
  }

  const firstName = definition.nameOverrides?.[definition.firstId] ?? first.tr.name;
  const secondName = definition.nameOverrides?.[definition.secondId] ?? second.tr.name;

  const secondPerFirst =
    definition.factorOverride ?? first.siFactor / second.siFactor;
  const firstPerSecond = 1 / secondPerFirst;

  const forwardSlug = `${first.tr.slug}-${second.tr.slug}`;
  const reverseSlug = `${second.tr.slug}-${first.tr.slug}`;

  const forwardEnglishSlug =
    englishOverride?.forward ??
    (first.en && second.en
      ? `${first.enConversionSlug ?? first.en.slug}-to-${second.enConversionSlug ?? second.en.slug}`
      : undefined);
  const reverseEnglishSlug =
    englishOverride?.reverse ??
    (first.en && second.en
      ? `${second.enConversionSlug ?? second.en.slug}-to-${first.enConversionSlug ?? first.en.slug}`
      : undefined);

  const forwardPage: ConversionPage = {
    slug: forwardSlug,
    category,
    fromUnit: first.symbol,
    toUnit: second.symbol,
    fromName: firstName,
    toName: secondName,
    formula: createOperation(firstName, secondName, secondPerFirst),
    explanation: createExplanation(
      firstName,
      secondName,
      first.symbol,
      second.symbol,
      secondPerFirst
    ),
    exampleValues: firstExamples,
    reverseSlug,
    englishSlug: forwardEnglishSlug,
    englishReverseSlug: reverseEnglishSlug,
  };

  const reversePage: ConversionPage = {
    slug: reverseSlug,
    category,
    fromUnit: second.symbol,
    toUnit: first.symbol,
    fromName: secondName,
    toName: firstName,
    formula: createOperation(secondName, firstName, firstPerSecond),
    explanation: createExplanation(
      secondName,
      firstName,
      second.symbol,
      first.symbol,
      firstPerSecond
    ),
    exampleValues: secondExamples,
    reverseSlug: forwardSlug,
    englishSlug: reverseEnglishSlug,
    englishReverseSlug: forwardEnglishSlug,
  };

  return [forwardPage, reversePage];
}

const pairDefinitions: ConversionPairDefinition[] = [
  {
    category: "uzunluk",
    firstId: "metre",
    secondId: "kilometre",
    firstExamples: [1, 5, 10, 50, 100, 500, 1000],
    secondExamples: [1, 2, 5, 10, 25, 50, 100],
  },
  {
    category: "uzunluk",
    firstId: "metre",
    secondId: "santimetre",
    firstExamples: [0.1, 0.5, 1, 2, 5, 10, 100],
    secondExamples: [1, 10, 50, 100, 250, 500, 1000],
  },
  {
    category: "uzunluk",
    firstId: "metre",
    secondId: "milimetre",
    firstExamples: [0.01, 0.1, 0.5, 1, 2, 5, 10],
    secondExamples: [1, 10, 100, 500, 1000, 5000, 10000],
  },
  {
    category: "uzunluk",
    firstId: "kilometre",
    secondId: "mil",
    firstExamples: [1, 5, 10, 25, 50, 100, 500],
    secondExamples: [1, 5, 10, 25, 50, 100, 500],
  },
  {
    category: "uzunluk",
    firstId: "metre",
    secondId: "fit",
    firstExamples: [1, 2, 5, 10, 25, 50, 100],
    secondExamples: [1, 5, 10, 25, 50, 100, 500],
  },
  {
    category: "uzunluk",
    firstId: "santimetre",
    secondId: "milimetre",
    firstExamples: [0.1, 0.5, 1, 2, 5, 10, 100],
    secondExamples: [1, 5, 10, 20, 50, 100, 1000],
  },
  {
    category: "uzunluk",
    firstId: "santimetre",
    secondId: "inc",
    firstExamples: [1, 2.54, 10, 25, 50, 100, 250],
    secondExamples: [1, 2, 4, 10, 12, 24, 36],
  },
  {
    category: "uzunluk",
    firstId: "metre",
    secondId: "yarda",
    firstExamples: [1, 2, 5, 10, 25, 50, 100],
    secondExamples: [1, 5, 10, 25, 50, 100, 250],
  },
  {
    category: "uzunluk",
    firstId: "fit",
    secondId: "inc",
    firstExamples: [1, 2, 3, 5, 10, 25, 50],
    secondExamples: [1, 6, 12, 24, 36, 48, 120],
  },
  {
    category: "uzunluk",
    firstId: "mil",
    secondId: "fit",
    firstExamples: [0.25, 0.5, 1, 2, 5, 10, 26.2],
    secondExamples: [1, 10, 100, 5280, 10000, 25000, 52800],
  },
  {
    category: "kutle",
    firstId: "kilogram",
    secondId: "gram",
    firstExamples: [0.1, 0.5, 1, 2, 5, 10, 25],
    secondExamples: [1, 10, 100, 500, 1000, 5000, 10000],
  },
  {
    category: "kutle",
    firstId: "gram",
    secondId: "miligram",
    firstExamples: [0.001, 0.01, 0.1, 0.5, 1, 5, 10],
    secondExamples: [1, 10, 100, 500, 1000, 5000, 10000],
  },
  {
    category: "kutle",
    firstId: "kilogram",
    secondId: "pound",
    firstExamples: [1, 2, 5, 10, 25, 50, 100],
    secondExamples: [1, 5, 10, 25, 50, 100, 500],
  },
  {
    category: "kutle",
    firstId: "ton",
    secondId: "kilogram",
    firstExamples: [0.1, 0.5, 1, 2, 5, 10, 25],
    secondExamples: [1, 10, 100, 500, 1000, 5000, 10000],
  },
  {
    category: "kutle",
    firstId: "gram",
    secondId: "ons",
    firstExamples: [1, 5, 10, 25, 50, 100, 500],
    secondExamples: [1, 2, 4, 8, 16, 32, 64],
  },
  {
    category: "kutle",
    firstId: "pound",
    secondId: "ons",
    firstExamples: [0.5, 1, 2, 5, 10, 25, 50],
    secondExamples: [1, 2, 4, 8, 16, 32, 64],
  },
  {
    category: "basinc",
    firstId: "psi",
    secondId: "bar",
    firstExamples: [1, 5, 10, 15, 30, 50, 100],
    secondExamples: [0.1, 0.5, 1, 2, 5, 10, 20],
  },
  {
    category: "basinc",
    firstId: "kilopascal",
    secondId: "bar",
    firstExamples: [1, 10, 50, 100, 250, 500, 1000],
    secondExamples: [0.1, 0.5, 1, 2, 5, 10, 20],
  },
  {
    category: "basinc",
    firstId: "pascal",
    secondId: "bar",
    firstExamples: [1, 100, 1000, 10000, 50000, 100000],
    secondExamples: [0.1, 0.5, 1, 2, 5, 10, 20],
  },
  {
    category: "basinc",
    firstId: "atmosfer",
    secondId: "bar",
    firstExamples: [0.5, 1, 2, 5, 10, 20, 50],
    secondExamples: [0.1, 0.5, 1, 2, 5, 10, 20],
    englishOverride: { forward: "atmospheres-to-bar", reverse: "bar-to-atmospheres" },
  },
  {
    category: "basinc",
    firstId: "milimetre-civa",
    secondId: "pascal",
    firstExamples: [1, 5, 10, 25, 50, 100, 760],
    secondExamples: [1, 10, 100, 1000, 5000, 10000, 101325],
  },
  {
    category: "basinc",
    firstId: "kilogram-kuvvet-santimetrekare",
    secondId: "bar",
    firstExamples: [0.1, 0.5, 1, 2, 5, 10, 20],
    secondExamples: [0.1, 0.5, 1, 2, 5, 10, 20],
    nameOverrides: {"kilogram-kuvvet-santimetrekare":"Kilogram-kuvvet/santimetrekare"},
    englishOverride: { forward: "kilogram-force-per-square-centimeter-to-bar", reverse: "bar-to-kilogram-force-per-square-centimeter" },
  },
  {
    category: "alan",
    firstId: "metrekare",
    secondId: "fitkare",
    firstExamples: [1, 5, 10, 25, 50, 100, 250],
    secondExamples: [1, 10, 50, 100, 250, 500, 1000],
    factorOverride: 10.7639104167,
  },
  {
    category: "alan",
    firstId: "hektar",
    secondId: "metrekare",
    firstExamples: [0.1, 0.5, 1, 2, 5, 10, 25],
    secondExamples: [10, 100, 500, 1000, 5000, 10000, 50000],
  },
  {
    category: "hacim",
    firstId: "litre",
    secondId: "metrekup",
    firstExamples: [1, 10, 50, 100, 250, 500, 1000],
    secondExamples: [0.001, 0.01, 0.1, 0.5, 1, 2, 5],
  },
  {
    category: "hacim",
    firstId: "litre",
    secondId: "mililitre",
    firstExamples: [0.1, 0.5, 1, 2, 5, 10, 25],
    secondExamples: [1, 10, 100, 500, 1000, 5000, 10000],
  },
  {
    category: "zaman",
    firstId: "saniye",
    secondId: "saat",
    firstExamples: [1, 30, 60, 300, 1800, 3600, 7200],
    secondExamples: [0.25, 0.5, 1, 2, 4, 8, 12],
  },
  {
    category: "zaman",
    firstId: "dakika",
    secondId: "saat",
    firstExamples: [1, 5, 10, 15, 30, 60, 120],
    secondExamples: [0.25, 0.5, 1, 2, 4, 8, 12],
  },
  {
    category: "hiz",
    firstId: "kilometre-saat",
    secondId: "metre-saniye",
    firstExamples: [1, 5, 10, 30, 50, 90, 120],
    secondExamples: [1, 2, 5, 10, 15, 20, 30],
  },
  {
    category: "hiz",
    firstId: "mil-saat",
    secondId: "kilometre-saat",
    firstExamples: [1, 5, 10, 30, 55, 60, 75],
    secondExamples: [10, 30, 50, 80, 100, 120, 130],
  },
  {
    category: "enerji",
    firstId: "joule",
    secondId: "kilovatsaat",
    firstExamples: [1, 1000, 10000, 100000, 1000000, 3600000],
    secondExamples: [0.001, 0.01, 0.1, 0.5, 1, 2, 5],
  },
  {
    category: "enerji",
    firstId: "kilowatt",
    secondId: "watt",
    firstExamples: [0.1, 0.5, 1, 2, 5, 10, 50],
    secondExamples: [1, 10, 100, 500, 1000, 5000, 10000],
  },
  {
    category: "debi",
    firstId: "metrekup-saat",
    secondId: "litre-dakika",
    firstExamples: [0.5, 1, 2, 5, 10, 20, 50],
    secondExamples: [1, 5, 10, 20, 50, 100, 250],
  },
  {
    category: "elektrik",
    firstId: "volt",
    secondId: "kilovolt",
    firstExamples: [1, 12, 24, 230, 400, 1000, 10000],
    secondExamples: [0.1, 0.5, 1, 5, 10, 20, 50],
  },
  {
    category: "elektrik",
    firstId: "amper",
    secondId: "miliamper",
    firstExamples: [0.1, 0.5, 1, 2, 5, 10, 20],
    secondExamples: [1, 5, 10, 20, 100, 500, 1000],
  },
  {
    category: "yogunluk",
    firstId: "kg-m3",
    secondId: "g-cm3",
    firstExamples: [1, 1000, 2700, 7850, 11340, 19300],
    secondExamples: [0.001, 1, 2.7, 7.85, 11.34, 19.3],
  },
  {
    category: "enerji",
    firstId: "kilowatt",
    secondId: "beygirgucu-metric",
    firstExamples: [55, 66, 74, 85, 110, 140, 184],
    secondExamples: [75, 90, 105, 116, 150, 190, 245],
  },
  {
    category: "kuvvet",
    firstId: "newton",
    secondId: "kilogram-kuvvet",
    firstExamples: [1, 10, 50, 100, 500, 1000, 10000],
    secondExamples: [1, 5, 10, 50, 100, 500, 1000],
  },
  {
    category: "tork",
    firstId: "newton-metre",
    secondId: "lb-ft",
    firstExamples: [10, 50, 100, 200, 300, 400, 500],
    secondExamples: [10, 50, 100, 150, 200, 250, 300],
  },
];

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
    return `${toName} = ${fromName} + 273,15`;
  }

  if (fromUnit === "K" && toUnit === "C") {
    return `${toName} = ${fromName} − 273,15`;
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
    return `${fromName} değeri ${toName} birimine çevrilirken önce 9/5 ile çarpılır, ardından 32 eklenir. 1 C, 33,8 F eder.`;
  }

  if (fromUnit === "F" && toUnit === "C") {
    return `${fromName} değeri ${toName} birimine çevrilirken önce 32 çıkarılır, sonra sonuç 5/9 ile çarpılır. 32 F, 0 C eder.`;
  }

  if (fromUnit === "C" && toUnit === "K") {
    return `${fromName} değeri ${toName} birimine çevrilirken 273,15 eklenir. 0 C, 273,15 K değerine karşılık gelir.`;
  }

  if (fromUnit === "K" && toUnit === "C") {
    return `${fromName} değeri ${toName} birimine çevrilirken 273,15 çıkarılır. 273,15 K, 0 C eder.`;
  }

  return `${fromName} değerini ${toName} birimine çevirin.`;
}

function createTemperaturePage(
  fromId: string,
  toId: string,
  exampleValues: number[],
  reverseSlug: string
): ConversionPage {
  const from = getRegistryUnit(fromId);
  const to = getRegistryUnit(toId);

  if (!from.tr || !to.tr) {
    throw new Error(`conversionPages: temperature unit ${fromId}/${toId} missing tr name`);
  }

  return {
    slug: `${from.tr.slug}-${to.tr.slug}`,
    category: "sicaklik",
    fromUnit: from.symbol,
    toUnit: to.symbol,
    fromName: from.tr.name,
    toName: to.tr.name,
    formula: createTemperatureFormula(
      from.tr.name,
      to.tr.name,
      from.symbol,
      to.symbol
    ),
    explanation: createTemperatureExplanation(
      from.tr.name,
      to.tr.name,
      from.symbol,
      to.symbol
    ),
    exampleValues,
    reverseSlug,
    englishSlug: from.en && to.en ? `${from.en.slug}-to-${to.en.slug}` : undefined,
    englishReverseSlug: from.en && to.en ? `${to.en.slug}-to-${from.en.slug}` : undefined,
  };
}

const customConversionPages: ConversionPage[] = [
  createTemperaturePage(
    "santigrat",
    "fahrenhayt",
    [-40, 0, 20, 37, 100],
    "fahrenhayt-santigrat"
  ),
  createTemperaturePage(
    "fahrenhayt",
    "santigrat",
    [-40, 32, 68, 98.6, 212],
    "santigrat-fahrenhayt"
  ),
  createTemperaturePage(
    "santigrat",
    "kelvin",
    [-40, 0, 20, 100, 200],
    "kelvin-santigrat"
  ),
  createTemperaturePage(
    "kelvin",
    "santigrat",
    [233.15, 273.15, 293.15, 310.15, 373.15],
    "santigrat-kelvin"
  ),
];

export const conversionPages: ConversionPage[] = [
  ...pairDefinitions.flatMap(createConversionPair),
  ...customConversionPages,
];
