import { convert } from "./convert";
import { conversionPages, type ConversionPage } from "./conversionPages";
import { findUnit } from "./unitRegistry";
import { norwegianUnitPages } from "./localizedNorwegianUnitPages";

export type LocalizedNorwegianConversionPage = ConversionPage & {
  locale: "no";
  sourceSlug: string;
  categoryName: string;
};

const norwegianCategoryNames: Record<string, string> = {
  uzunluk: "Lengde",
  alan: "Areal",
  hacim: "Volum",
  kutle: "Masse",
  sicaklik: "Temperatur",
  zaman: "Tid",
  hiz: "Hastighet",
  basinc: "Trykk",
  enerji: "Energi",
  debi: "Strømning",
  elektrik: "Elektrisitet",
  yogunluk: "Tetthet",
  kuvvet: "Kraft",
  tork: "Dreiemoment",
  aci: "Vinkel",
  frekans: "Frekvens",
  debi_hacimsel: "Volumstrøm",
  debi_kutlesel: "Massestrøm",
  manyetik_alan: "Magnetfelt",
  manyetik_aki: "Magnetisk fluks",
  viskozite_kinematik: "Kinematisk viskositet",
  isil_iletkenlik: "Varmeledningsevne",
  isi_akisi: "Varmestrøm",
  ozgul_isi: "Spesifikk varme",
  ivme: "Akselerasjon",
  acisal_hiz: "Vinkelhastighet",
  guc: "Effekt",
  momentum: "Bevegelsesmengde",
  viskozite_dinamik: "Viskositet",
  veri: "Datalagring",
  elektrik_direnc: "Resistans",
  kapasitans: "Kapasitans",
  enduktans: "Induktans",
  elektrik_yuk: "Elektrisk ladning",
  altin_ayar: "Gullkarat",
  gumus_ayar: "Sølvinnhold",
  kan_sekeri: "Blodsukker",
  vitamin_d: "D-vitamin",
};

function formatNorwegianValue(value: number) {
  return Number(value.toPrecision(12)).toLocaleString("nb-NO", {
    maximumFractionDigits: 12,
  });
}

function createNorwegianFormula(fromName: string, toName: string, factor: number) {
  if (factor >= 1) {
    return `${toName} = ${fromName} × ${formatNorwegianValue(factor)}`;
  }

  return `${toName} = ${fromName} ÷ ${formatNorwegianValue(1 / factor)}`;
}

function createNorwegianExplanation(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string,
  factor: number
) {
  if (factor >= 1) {
    return `For å regne om ${fromName} til ${toName}, multipliser utgangsverdien med ${formatNorwegianValue(
      factor
    )}. 1 ${fromUnit} = ${formatNorwegianValue(factor)} ${toUnit}.`;
  }

  return `For å regne om ${fromName} til ${toName}, del utgangsverdien på ${formatNorwegianValue(
    1 / factor
  )}. 1 ${fromUnit} = ${formatNorwegianValue(factor)} ${toUnit}.`;
}

function createNorwegianTemperatureFormula(
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

  if (fromUnit === "C" && toUnit === "R") {
    return `${toName} = (${fromName} + 273,15) × 9/5`;
  }

  if (fromUnit === "R" && toUnit === "C") {
    return `${toName} = ${fromName} × 5/9 − 273,15`;
  }

  if (fromUnit === "F" && toUnit === "R") {
    return `${toName} = ${fromName} + 459,67`;
  }

  if (fromUnit === "R" && toUnit === "F") {
    return `${toName} = ${fromName} − 459,67`;
  }

  if (fromUnit === "C" && toUnit === "Re") {
    return `${toName} = ${fromName} × 4/5`;
  }

  if (fromUnit === "Re" && toUnit === "C") {
    return `${toName} = ${fromName} × 5/4`;
  }

  return `${toName} = ${fromName}`;
}

function createNorwegianTemperatureExplanation(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string
) {
  if (fromUnit === "C" && toUnit === "F") {
    return `For å regne om ${fromName} til ${toName}, multipliser med 9/5 og legg til 32. 1 ${fromUnit} tilsvarer 33,8 ${toUnit}.`;
  }

  if (fromUnit === "F" && toUnit === "C") {
    return `For å regne om ${fromName} til ${toName}, trekk først fra 32 og multipliser resultatet med 5/9. 32 ${fromUnit} tilsvarer 0 ${toUnit}.`;
  }

  if (fromUnit === "C" && toUnit === "K") {
    return `For å regne om ${fromName} til ${toName}, legg til 273,15. 0 ${fromUnit} tilsvarer 273,15 ${toUnit}.`;
  }

  if (fromUnit === "K" && toUnit === "C") {
    return `For å regne om ${fromName} til ${toName}, trekk fra 273,15. 273,15 ${fromUnit} tilsvarer 0 ${toUnit}.`;
  }

  return `Bruk den definerte temperatursammenhengen for å regne om ${fromName} til ${toName}.`;
}

const norwegianUnitBySourceSlug: Record<string, { name: string; slug: string }> =
  Object.fromEntries(
    norwegianUnitPages.map((page) => [
      page.sourceSlug,
      { name: page.name, slug: page.slug },
    ])
  );

function localizeConversionPage(
  page: ConversionPage
): LocalizedNorwegianConversionPage | null {
  const from = findUnit(page.category, page.fromUnit);
  const to = findUnit(page.category, page.toUnit);

  if (!from?.tr || !to?.tr) {
    return null;
  }

  const fromNo = norwegianUnitBySourceSlug[from.tr.slug];
  const toNo = norwegianUnitBySourceSlug[to.tr.slug];

  if (!fromNo || !toNo) {
    return null;
  }

  const factor = convert(page.category, 1, page.fromUnit, page.toUnit);

  return {
    ...page,
    locale: "no",
    sourceSlug: page.slug,
    slug: `${fromNo.slug}-${toNo.slug}`,
    fromName: fromNo.name,
    toName: toNo.name,
    categoryName: norwegianCategoryNames[page.category] ?? page.category,
    formula:
      page.category === "sicaklik"
        ? createNorwegianTemperatureFormula(
            fromNo.name,
            toNo.name,
            page.fromUnit,
            page.toUnit
          )
        : createNorwegianFormula(fromNo.name, toNo.name, factor),
    explanation:
      page.category === "sicaklik"
        ? createNorwegianTemperatureExplanation(
            fromNo.name,
            toNo.name,
            page.fromUnit,
            page.toUnit
          )
        : createNorwegianExplanation(
            fromNo.name,
            toNo.name,
            page.fromUnit,
            page.toUnit,
            factor
          ),
    reverseSlug: `${toNo.slug}-${fromNo.slug}`,
  };
}

// Skandinavisk mil (10 km) yalnizca sv/no sitelerinde var; TR tarafinda
// karsiligi olmadigi icin ortak conversionPages listesinden gelmez. Bu
// ciftler burada ayni formul/aciklama mantigiyla uretilir.
const nordicMilePairs: Array<{ first: string; second: string; firstExamples: number[]; secondExamples: number[] }> = [
  { first: "mil", second: "km", firstExamples: [0.5, 1, 2, 5, 10, 25, 50], secondExamples: [1, 5, 10, 25, 50, 100, 500] },
  { first: "mil", second: "mi", firstExamples: [0.5, 1, 2, 5, 10, 25, 50], secondExamples: [1, 5, 10, 25, 50, 100, 500] },
];

function buildNordicMilePage(
  fromUnit: string,
  toUnit: string,
  exampleValues: number[]
): LocalizedNorwegianConversionPage | null {
  const from = norwegianUnitPages.find((page) => page.category === "uzunluk" && page.unit === fromUnit);
  const to = norwegianUnitPages.find((page) => page.category === "uzunluk" && page.unit === toUnit);

  if (!from || !to) {
    return null;
  }

  const factor = convert("uzunluk", 1, fromUnit, toUnit);

  return {
    locale: "no",
    sourceSlug: `${from.sourceSlug}-${to.sourceSlug}`,
    slug: `${from.slug}-${to.slug}`,
    category: "uzunluk",
    categoryName: from.categoryName,
    fromUnit,
    toUnit,
    fromName: from.name,
    toName: to.name,
    formula: createNorwegianFormula(from.name, to.name, factor),
    explanation: createNorwegianExplanation(from.name, to.name, fromUnit, toUnit, factor),
    exampleValues,
    reverseSlug: `${to.slug}-${from.slug}`,
  };
}

const nordicMilePages = nordicMilePairs.flatMap((pair) => [
  buildNordicMilePage(pair.first, pair.second, pair.firstExamples),
  buildNordicMilePage(pair.second, pair.first, pair.secondExamples),
]);

export const norwegianConversionPages: LocalizedNorwegianConversionPage[] = [
  ...conversionPages.map(localizeConversionPage),
  ...nordicMilePages,
].filter((page): page is LocalizedNorwegianConversionPage => page !== null);

export function findNorwegianConversionPage(slug: string) {
  return norwegianConversionPages.find((page) => page.slug === slug);
}

export function findNorwegianConversionPageByTurkishSlug(sourceSlug: string) {
  return norwegianConversionPages.find((page) => page.sourceSlug === sourceSlug);
}
