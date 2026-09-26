import { convert } from "./convert";
import { buildLocalOnlyConversionPages, italianMassPairs } from "./localOnlyConversionPages";
import { conversionPages, type ConversionPage } from "./conversionPages";
import { findUnit } from "./unitRegistry";
import { italianUnitPages } from "./localizedItalianUnitPages";

export type LocalizedItalianConversionPage = ConversionPage & {
  locale: "it";
  sourceSlug: string;
  categoryName: string;
};

const italianCategoryNames: Record<string, string> = {
  uzunluk: "Lunghezza",
  alan: "Area",
  hacim: "Volume",
  kutle: "Massa",
  sicaklik: "Temperatura",
  zaman: "Tempo",
  hiz: "Velocità",
  basinc: "Pressione",
  enerji: "Energia",
  debi: "Portata",
  elektrik: "Elettricità",
  yogunluk: "Densita",
  kuvvet: "Forza",
  tork: "Coppia",
  aci: "Angolo",
  frekans: "Frequenza",
  debi_hacimsel: "Portata volumetrica",
  debi_kutlesel: "Portata massica",
  manyetik_alan: "Campo magnetico",
  manyetik_aki: "Flusso magnetico",
  viskozite_kinematik: "Viscosìta cinematica",
  isil_iletkenlik: "Conducibilita termica",
  isi_akisi: "Flusso termico",
  ozgul_isi: "Calore specifico",
  ivme: "Accelerazione",
  acisal_hiz: "Velocità angolare",
  guc: "Potenza",
  momentum: "Quantità di moto",
  viskozite_dinamik: "Viscosìta",
  veri: "Archiviazione dati",
  elektrik_direnc: "Resistenza elettrica",
  kapasitans: "Capacita",
  enduktans: "Induttanza",
  elektrik_yuk: "Carica elettrica",
  altin_ayar: "Caratura oro",
  gumus_ayar: "Titolo argento",
  kan_sekeri: "Glicemia",
  vitamin_d: "Vitamina D",
};

function formatItalianValue(value: number) {
  return Number(value.toPrecision(12)).toLocaleString("it-IT", {
    maximumFractionDigits: 12,
  });
}

function createItalianFormula(fromName: string, toName: string, factor: number) {
  if (factor >= 1) {
    return `${toName} = ${fromName} × ${formatItalianValue(factor)}`;
  }

  return `${toName} = ${fromName} ÷ ${formatItalianValue(1 / factor)}`;
}

function createItalianExplanation(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string,
  factor: number
) {
  if (factor >= 1) {
    return `Per convertire ${fromName} in ${toName}, moltiplica il valore di partenza per ${formatItalianValue(
      factor
    )}. 1 ${fromUnit} = ${formatItalianValue(factor)} ${toUnit}.`;
  }

  return `Per convertire ${fromName} in ${toName}, dividi il valore di partenza per ${formatItalianValue(
    1 / factor
  )}. 1 ${fromUnit} = ${formatItalianValue(factor)} ${toUnit}.`;
}

function createItalianTemperatureFormula(
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

function createItalianTemperatureExplanation(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string
) {
  if (fromUnit === "C" && toUnit === "F") {
    return `Per convertire ${fromName} in ${toName}, moltiplica per 9/5 e somma 32. 1 ${fromUnit} = 33,8 ${toUnit}.`;
  }

  if (fromUnit === "F" && toUnit === "C") {
    return `Per convertire ${fromName} in ${toName}, sottrai prima 32 e moltiplica il risultato per 5/9. 32 ${fromUnit} equivale a 0 ${toUnit}.`;
  }

  if (fromUnit === "C" && toUnit === "K") {
    return `Per convertire ${fromName} in ${toName}, somma 273,15. 0 ${fromUnit} equivale a 273,15 ${toUnit}.`;
  }

  if (fromUnit === "K" && toUnit === "C") {
    return `Per convertire ${fromName} in ${toName}, sottrai 273,15. 273,15 ${fromUnit} equivale a 0 ${toUnit}.`;
  }

  return `Usa la relazione di temperatura definita per convertire ${fromName} in ${toName}.`;
}

const italianUnitBySourceSlug: Record<string, { name: string; slug: string }> =
  Object.fromEntries(
    italianUnitPages.map((page) => [
      page.sourceSlug,
      { name: page.name, slug: page.slug },
    ])
  );

function localizeConversionPage(
  page: ConversionPage
): LocalizedItalianConversionPage | null {
  const from = findUnit(page.category, page.fromUnit);
  const to = findUnit(page.category, page.toUnit);

  if (!from?.tr || !to?.tr) {
    return null;
  }

  const fromIt = italianUnitBySourceSlug[from.tr.slug];
  const toIt = italianUnitBySourceSlug[to.tr.slug];

  if (!fromIt || !toIt) {
    return null;
  }

  const factor = convert(page.category, 1, page.fromUnit, page.toUnit);

  return {
    ...page,
    locale: "it",
    sourceSlug: page.slug,
    slug: `${fromIt.slug}-${toIt.slug}`,
    fromName: fromIt.name,
    toName: toIt.name,
    categoryName: italianCategoryNames[page.category] ?? page.category,
    formula:
      page.category === "sicaklik"
        ? createItalianTemperatureFormula(
            fromIt.name,
            toIt.name,
            page.fromUnit,
            page.toUnit
          )
        : createItalianFormula(fromIt.name, toIt.name, factor),
    explanation:
      page.category === "sicaklik"
        ? createItalianTemperatureExplanation(
            fromIt.name,
            toIt.name,
            page.fromUnit,
            page.toUnit
          )
        : createItalianExplanation(
            fromIt.name,
            toIt.name,
            page.fromUnit,
            page.toUnit,
            factor
          ),
    reverseSlug: `${toIt.slug}-${fromIt.slug}`,
  };
}

export const italianConversionPages: LocalizedItalianConversionPage[] = [
  ...conversionPages
    .map(localizeConversionPage)
    .filter((page): page is LocalizedItalianConversionPage => page !== null),
  ...buildLocalOnlyConversionPages("it", italianMassPairs, italianUnitPages, createItalianFormula, createItalianExplanation),
];

export function findItalianConversionPage(slug: string) {
  return italianConversionPages.find((page) => page.slug === slug);
}

export function findItalianConversionPageByTurkishSlug(sourceSlug: string) {
  return italianConversionPages.find((page) => page.sourceSlug === sourceSlug);
}
