import { convert } from "./convert";
import { conversionPages, type ConversionPage } from "./conversionPages";
import { findUnit } from "./unitRegistry";
import { danishUnitPages } from "./localizedDanishUnitPages";

export type LocalizedDanishConversionPage = ConversionPage & {
  locale: "da";
  sourceSlug: string;
  categoryName: string;
};

const danishCategoryNames: Record<string, string> = {
  uzunluk: "Laengde",
  alan: "Areal",
  hacim: "Rumfang",
  kutle: "Masse",
  sicaklik: "Temperatur",
  zaman: "Tid",
  hiz: "Hastighed",
  basinc: "Tryk",
  enerji: "Energi",
  debi: "Stromning",
  elektrik: "Elektricitet",
  yogunluk: "Densitet",
  kuvvet: "Kraft",
  tork: "Moment",
  aci: "Vinkel",
  frekans: "Frekvens",
  debi_hacimsel: "Volumenstrom",
  debi_kutlesel: "Massestrom",
  manyetik_alan: "Magnetfelt",
  manyetik_aki: "Magnetisk fluks",
  viskozite_kinematik: "Kinematisk viskositet",
  isil_iletkenlik: "Varmeledningsevne",
  isi_akisi: "Varmestrom",
  ozgul_isi: "Specifik varme",
  ivme: "Acceleration",
  acisal_hiz: "Vinkelhastighed",
  guc: "Effekt",
  momentum: "Bevaegelsesmaengde",
  viskozite_dinamik: "Viskositet",
  veri: "Datalagring",
  elektrik_direnc: "Modstand",
  kapasitans: "Kapacitans",
  enduktans: "Induktans",
  elektrik_yuk: "Elektrisk ladning",
  altin_ayar: "Guldkarat",
  gumus_ayar: "Solvindhold",
  kan_sekeri: "Blodsukker",
  vitamin_d: "D-vitamin",
};

function formatDanishValue(value: number) {
  return Number(value.toPrecision(12)).toLocaleString("da-DK", {
    maximumFractionDigits: 12,
  });
}

function createDanishFormula(fromName: string, toName: string, factor: number) {
  if (factor >= 1) {
    return `${toName} = ${fromName} × ${formatDanishValue(factor)}`;
  }

  return `${toName} = ${fromName} ÷ ${formatDanishValue(1 / factor)}`;
}

function createDanishExplanation(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string,
  factor: number
) {
  if (factor >= 1) {
    return `For at omregne ${fromName} til ${toName} skal du gange udgangsvaerdien med ${formatDanishValue(
      factor
    )}. 1 ${fromUnit} = ${formatDanishValue(factor)} ${toUnit}.`;
  }

  return `For at omregne ${fromName} til ${toName} skal du dividere udgangsvaerdien med ${formatDanishValue(
    1 / factor
  )}. 1 ${fromUnit} = ${formatDanishValue(factor)} ${toUnit}.`;
}

function createDanishTemperatureFormula(
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

function createDanishTemperatureExplanation(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string
) {
  if (fromUnit === "C" && toUnit === "F") {
    return `For at omregne ${fromName} til ${toName} skal du gange med 9/5 og laegge 32 til. 1 ${fromUnit} svarer til 33,8 ${toUnit}.`;
  }

  if (fromUnit === "F" && toUnit === "C") {
    return `For at omregne ${fromName} til ${toName} skal du forst traekke 32 fra og gange resultatet med 5/9. 32 ${fromUnit} svarer til 0 ${toUnit}.`;
  }

  if (fromUnit === "C" && toUnit === "K") {
    return `For at omregne ${fromName} til ${toName} skal du laegge 273,15 til. 0 ${fromUnit} svarer til 273,15 ${toUnit}.`;
  }

  if (fromUnit === "K" && toUnit === "C") {
    return `For at omregne ${fromName} til ${toName} skal du traekke 273,15 fra. 273,15 ${fromUnit} svarer til 0 ${toUnit}.`;
  }

  return `Brug den definerede temperatursammenhaeng til at omregne ${fromName} til ${toName}.`;
}

const danishUnitBySourceSlug: Record<string, { name: string; slug: string }> =
  Object.fromEntries(
    danishUnitPages.map((page) => [
      page.sourceSlug,
      { name: page.name, slug: page.slug },
    ])
  );

function localizeConversionPage(
  page: ConversionPage
): LocalizedDanishConversionPage | null {
  const from = findUnit(page.category, page.fromUnit);
  const to = findUnit(page.category, page.toUnit);

  if (!from?.tr || !to?.tr) {
    return null;
  }

  const fromDa = danishUnitBySourceSlug[from.tr.slug];
  const toDa = danishUnitBySourceSlug[to.tr.slug];

  if (!fromDa || !toDa) {
    return null;
  }

  const factor = convert(page.category, 1, page.fromUnit, page.toUnit);

  return {
    ...page,
    locale: "da",
    sourceSlug: page.slug,
    slug: `${fromDa.slug}-${toDa.slug}`,
    fromName: fromDa.name,
    toName: toDa.name,
    categoryName: danishCategoryNames[page.category] ?? page.category,
    formula:
      page.category === "sicaklik"
        ? createDanishTemperatureFormula(
            fromDa.name,
            toDa.name,
            page.fromUnit,
            page.toUnit
          )
        : createDanishFormula(fromDa.name, toDa.name, factor),
    explanation:
      page.category === "sicaklik"
        ? createDanishTemperatureExplanation(
            fromDa.name,
            toDa.name,
            page.fromUnit,
            page.toUnit
          )
        : createDanishExplanation(
            fromDa.name,
            toDa.name,
            page.fromUnit,
            page.toUnit,
            factor
          ),
    reverseSlug: `${toDa.slug}-${fromDa.slug}`,
  };
}

export const danishConversionPages: LocalizedDanishConversionPage[] =
  conversionPages
    .map(localizeConversionPage)
    .filter(
      (page): page is LocalizedDanishConversionPage => page !== null
    );

export function findDanishConversionPage(slug: string) {
  return danishConversionPages.find((page) => page.slug === slug);
}

export function findDanishConversionPageByTurkishSlug(sourceSlug: string) {
  return danishConversionPages.find((page) => page.sourceSlug === sourceSlug);
}
