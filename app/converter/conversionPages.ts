import { KILOGRAM_FORCE_PER_SQUARE_CENTIMETRE_UNIT } from "./engineeringUnits";

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

type UnitDefinition = {
  slug: string;
  unit: string;
  name: string;
};

type PairDefinition = {
  category: string;
  first: UnitDefinition;
  second: UnitDefinition;
  secondPerFirst: number;
  firstExamples: number[];
  secondExamples: number[];
  englishSlugs?: {
    forward: string;
    reverse: string;
  };
};

const metre: UnitDefinition = {
  slug: "metre",
  unit: "m",
  name: "Metre",
};

const kilometre: UnitDefinition = {
  slug: "kilometre",
  unit: "km",
  name: "Kilometre",
};

const santimetre: UnitDefinition = {
  slug: "santimetre",
  unit: "cm",
  name: "Santimetre",
};

const milimetre: UnitDefinition = {
  slug: "milimetre",
  unit: "mm",
  name: "Milimetre",
};

const mil: UnitDefinition = {
  slug: "mil",
  unit: "mi",
  name: "Mil",
};

const fit: UnitDefinition = {
  slug: "fit",
  unit: "ft",
  name: "Fit",
};

const inc: UnitDefinition = {
  slug: "inc",
  unit: "in",
  name: "İnç",
};

const yarda: UnitDefinition = {
  slug: "yarda",
  unit: "yd",
  name: "Yarda",
};

const kilogram: UnitDefinition = {
  slug: "kilogram",
  unit: "kg",
  name: "Kilogram",
};

const gram: UnitDefinition = {
  slug: "gram",
  unit: "g",
  name: "Gram",
};

const miligram: UnitDefinition = {
  slug: "miligram",
  unit: "mg",
  name: "Miligram",
};

const pound: UnitDefinition = {
  slug: "pound",
  unit: "lb",
  name: "Pound",
};

const ton: UnitDefinition = {
  slug: "ton",
  unit: "ton",
  name: "Ton",
};

const ons: UnitDefinition = {
  slug: "ons",
  unit: "oz",
  name: "Ons",
};

const pascal: UnitDefinition = {
  slug: "pascal",
  unit: "Pa",
  name: "Pascal",
};

const kilopascal: UnitDefinition = {
  slug: "kilopascal",
  unit: "kPa",
  name: "Kilopascal",
};

const barUnit: UnitDefinition = {
  slug: "bar",
  unit: "bar",
  name: "Bar",
};

const psiUnit: UnitDefinition = {
  slug: "psi",
  unit: "psi",
  name: "PSI",
};

const atmosphereUnit: UnitDefinition = {
  slug: "atmosfer",
  unit: "atm",
  name: "Atmosfer",
};

const millimetreOfMercuryUnit: UnitDefinition = {
  slug: "milimetre-civa",
  unit: "mmHg",
  name: "Milimetre Cıva",
};

const kilogramForcePerSquareCentimetreUnit: UnitDefinition = {
  slug: "kilogram-kuvvet-santimetrekare",
  unit: KILOGRAM_FORCE_PER_SQUARE_CENTIMETRE_UNIT,
  name: "Kilogram-kuvvet/santimetrekare",
};

function formatValue(value: number) {
  return Number(value.toPrecision(12)).toLocaleString("tr-TR", {
    maximumFractionDigits: 12,
  });
}

function createOperation(
  fromName: string,
  toName: string,
  factor: number
) {
  if (factor >= 1) {
    return `${toName} = ${fromName} × ${formatValue(factor)}`;
  }

  return `${toName} = ${fromName} ÷ ${formatValue(1 / factor)}`;
}

function createExplanation(
  from: UnitDefinition,
  to: UnitDefinition,
  factor: number
) {
  const operation =
    factor >= 1
      ? `${formatValue(factor)} ile çarpılır`
      : `${formatValue(1 / factor)} değerine bölünür`;

  return (
    `${from.name} ile ${to.name} arasındaki dönüşümde ` +
    `${from.name.toLocaleLowerCase("tr-TR")} değeri ${operation}. ` +
    `1 ${from.unit}, ${formatValue(factor)} ${to.unit} değerine eşittir.`
  );
}

function createConversionPair(
  definition: PairDefinition
): ConversionPage[] {
  const {
    category,
    first,
    second,
    secondPerFirst,
    firstExamples,
    secondExamples,
    englishSlugs,
  } = definition;
  const forwardSlug = `${first.slug}-${second.slug}`;
  const reverseSlug = `${second.slug}-${first.slug}`;
  const firstPerSecond = 1 / secondPerFirst;

  const forwardPage: ConversionPage = {
    slug: forwardSlug,
    category,
    fromUnit: first.unit,
    toUnit: second.unit,
    fromName: first.name,
    toName: second.name,
    formula: createOperation(
      first.name,
      second.name,
      secondPerFirst
    ),
    explanation: createExplanation(
      first,
      second,
      secondPerFirst
    ),
    exampleValues: firstExamples,
    reverseSlug,
    englishSlug: englishSlugs?.forward,
    englishReverseSlug: englishSlugs?.reverse,
  };

  const reversePage: ConversionPage = {
    slug: reverseSlug,
    category,
    fromUnit: second.unit,
    toUnit: first.unit,
    fromName: second.name,
    toName: first.name,
    formula: createOperation(
      second.name,
      first.name,
      firstPerSecond
    ),
    explanation: createExplanation(
      second,
      first,
      firstPerSecond
    ),
    exampleValues: secondExamples,
    reverseSlug: forwardSlug,
    englishSlug: englishSlugs?.reverse,
    englishReverseSlug: englishSlugs?.forward,
  };

  return [forwardPage, reversePage];
}

const pairDefinitions: PairDefinition[] = [
  {
    category: "uzunluk",
    first: metre,
    second: kilometre,
    secondPerFirst: 0.001,
    firstExamples: [1, 5, 10, 50, 100, 500, 1000],
    secondExamples: [1, 2, 5, 10, 25, 50, 100],
  },
  {
    category: "uzunluk",
    first: metre,
    second: santimetre,
    secondPerFirst: 100,
    firstExamples: [0.1, 0.5, 1, 2, 5, 10, 100],
    secondExamples: [1, 10, 50, 100, 250, 500, 1000],
  },
  {
    category: "uzunluk",
    first: metre,
    second: milimetre,
    secondPerFirst: 1000,
    firstExamples: [0.01, 0.1, 0.5, 1, 2, 5, 10],
    secondExamples: [1, 10, 100, 500, 1000, 5000, 10000],
  },
  {
    category: "uzunluk",
    first: kilometre,
    second: mil,
    secondPerFirst: 0.621371192237,
    firstExamples: [1, 5, 10, 25, 50, 100, 500],
    secondExamples: [1, 5, 10, 25, 50, 100, 500],
  },
  {
    category: "uzunluk",
    first: metre,
    second: fit,
    secondPerFirst: 3.28083989501,
    firstExamples: [1, 2, 5, 10, 25, 50, 100],
    secondExamples: [1, 5, 10, 25, 50, 100, 500],
  },
  {
    category: "uzunluk",
    first: santimetre,
    second: milimetre,
    secondPerFirst: 10,
    firstExamples: [0.1, 0.5, 1, 2, 5, 10, 100],
    secondExamples: [1, 5, 10, 20, 50, 100, 1000],
  },
  {
    category: "uzunluk",
    first: santimetre,
    second: inc,
    secondPerFirst: 0.3937007874015748,
    firstExamples: [1, 2.54, 10, 25, 50, 100, 250],
    secondExamples: [1, 2, 4, 10, 12, 24, 36],
    englishSlugs: {
      forward: "centimeters-to-inches",
      reverse: "inches-to-centimeters",
    },
  },
  {
    category: "uzunluk",
    first: metre,
    second: yarda,
    secondPerFirst: 1.0936132983377078,
    firstExamples: [1, 2, 5, 10, 25, 50, 100],
    secondExamples: [1, 5, 10, 25, 50, 100, 250],
    englishSlugs: {
      forward: "meters-to-yards",
      reverse: "yards-to-meters",
    },
  },
  {
    category: "uzunluk",
    first: fit,
    second: inc,
    secondPerFirst: 12,
    firstExamples: [1, 2, 3, 5, 10, 25, 50],
    secondExamples: [1, 6, 12, 24, 36, 48, 120],
    englishSlugs: {
      forward: "feet-to-inches",
      reverse: "inches-to-feet",
    },
  },
  {
    category: "uzunluk",
    first: mil,
    second: fit,
    secondPerFirst: 5280,
    firstExamples: [0.25, 0.5, 1, 2, 5, 10, 26.2],
    secondExamples: [1, 10, 100, 5280, 10000, 25000, 52800],
    englishSlugs: {
      forward: "miles-to-feet",
      reverse: "feet-to-miles",
    },
  },
  {
    category: "kutle",
    first: kilogram,
    second: gram,
    secondPerFirst: 1000,
    firstExamples: [0.1, 0.5, 1, 2, 5, 10, 25],
    secondExamples: [1, 10, 100, 500, 1000, 5000, 10000],
  },
  {
    category: "kutle",
    first: gram,
    second: miligram,
    secondPerFirst: 1000,
    firstExamples: [0.001, 0.01, 0.1, 0.5, 1, 5, 10],
    secondExamples: [1, 10, 100, 500, 1000, 5000, 10000],
  },
  {
    category: "kutle",
    first: kilogram,
    second: pound,
    secondPerFirst: 2.20462262185,
    firstExamples: [1, 2, 5, 10, 25, 50, 100],
    secondExamples: [1, 5, 10, 25, 50, 100, 500],
  },
  {
    category: "kutle",
    first: ton,
    second: kilogram,
    secondPerFirst: 1000,
    firstExamples: [0.1, 0.5, 1, 2, 5, 10, 25],
    secondExamples: [1, 10, 100, 500, 1000, 5000, 10000],
    englishSlugs: {
      forward: "tonnes-to-kilograms",
      reverse: "kilograms-to-tonnes",
    },
  },
  {
    category: "kutle",
    first: gram,
    second: ons,
    secondPerFirst: 0.0352739619495804,
    firstExamples: [1, 5, 10, 25, 50, 100, 500],
    secondExamples: [1, 2, 4, 8, 16, 32, 64],
    englishSlugs: {
      forward: "grams-to-ounces",
      reverse: "ounces-to-grams",
    },
  },
  {
    category: "kutle",
    first: pound,
    second: ons,
    secondPerFirst: 16,
    firstExamples: [0.5, 1, 2, 5, 10, 25, 50],
    secondExamples: [1, 2, 4, 8, 16, 32, 64],
    englishSlugs: {
      forward: "pounds-to-ounces",
      reverse: "ounces-to-pounds",
    },
  },
  {
    category: "basinc",
    first: psiUnit,
    second: barUnit,
    secondPerFirst: 0.06894757293168,
    firstExamples: [1, 5, 10, 15, 30, 50, 100],
    secondExamples: [0.1, 0.5, 1, 2, 5, 10, 20],
  },
  {
    category: "basinc",
    first: kilopascal,
    second: barUnit,
    secondPerFirst: 0.01,
    firstExamples: [1, 10, 50, 100, 250, 500, 1000],
    secondExamples: [0.1, 0.5, 1, 2, 5, 10, 20],
  },
  {
    category: "basinc",
    first: pascal,
    second: barUnit,
    secondPerFirst: 0.00001,
    firstExamples: [1, 100, 1000, 10000, 50000, 100000],
    secondExamples: [0.1, 0.5, 1, 2, 5, 10, 20],
  },
  {
    category: "basinc",
    first: atmosphereUnit,
    second: barUnit,
    secondPerFirst: 1.01325,
    firstExamples: [0.5, 1, 2, 5, 10, 20, 50],
    secondExamples: [0.1, 0.5, 1, 2, 5, 10, 20],
    englishSlugs: {
      forward: "atmospheres-to-bar",
      reverse: "bar-to-atmospheres",
    },
  },
  {
    category: "basinc",
    first: millimetreOfMercuryUnit,
    second: pascal,
    secondPerFirst: 133.322387415,
    firstExamples: [1, 5, 10, 25, 50, 100, 760],
    secondExamples: [1, 10, 100, 1000, 5000, 10000, 101325],
    englishSlugs: {
      forward: "millimeters-of-mercury-to-pascals",
      reverse: "pascals-to-millimeters-of-mercury",
    },
  },
  {
    category: "basinc",
    first: kilogramForcePerSquareCentimetreUnit,
    second: barUnit,
    secondPerFirst: 0.980665,
    firstExamples: [0.1, 0.5, 1, 2, 5, 10, 20],
    secondExamples: [0.1, 0.5, 1, 2, 5, 10, 20],
    englishSlugs: {
      forward: "kilogram-force-per-square-centimeter-to-bar",
      reverse: "bar-to-kilogram-force-per-square-centimeter",
    },
  },
];

export const conversionPages: ConversionPage[] =
  pairDefinitions.flatMap(createConversionPair);
