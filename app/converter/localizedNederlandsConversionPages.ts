import { convert } from "./convert";
import { conversionPages, type ConversionPage } from "./conversionPages";
import { findUnit } from "./unitRegistry";
import { nederlandsUnitPages } from "./localizedNederlandsUnitPages";

export type LocalizedNederlandsConversionPage = ConversionPage & {
  locale: "nl";
  sourceSlug: string;
  categoryName: string;
};

const nederlandsCategoryNames: Record<string, string> = {
  uzunluk: "Lengte",
  alan: "Oppervlakte",
  hacim: "Volume",
  kutle: "Massa",
  sicaklik: "Temperatuur",
  zaman: "Tijd",
  hiz: "Snelheid",
  basinc: "Druk",
  enerji: "Energie",
  debi: "Debiet",
  elektrik: "Elektriciteit",
  yogunluk: "Dichtheid",
  kuvvet: "Kracht",
  tork: "Koppel",
  aci: "Hoek",
  frekans: "Frequentie",
  debi_hacimsel: "Volumestroom",
  debi_kutlesel: "Massastroom",
  manyetik_alan: "Magnetisch veld",
  manyetik_aki: "Magnetische flux",
  viskozite_kinematik: "Kinematische viscositeit",
  isil_iletkenlik: "Thermische geleidbaarheid",
  isi_akisi: "Warmtestroom",
  ozgul_isi: "Soortelijke warmte",
  ivme: "Versnelling",
  acisal_hiz: "Hoeksnelheid",
  guc: "Vermogen",
  momentum: "Impuls",
  viskozite_dinamik: "Dynamische viscositeit",
  veri: "Dataopslag",
  elektrik_direnc: "Elektrische weerstand",
  kapasitans: "Capaciteit",
  enduktans: "Inductantie",
  elektrik_yuk: "Elektrische lading",
  altin_ayar: "Goudkaraat",
  gumus_ayar: "Zilvergehalte",
  kan_sekeri: "Bloedglucose",
  vitamin_d: "Vitamine D",
};

function formatNederlandsValue(value: number) {
  return Number(value.toPrecision(12)).toLocaleString("nl-NL", {
    maximumFractionDigits: 12,
  });
}

function createNederlandsFormula(fromName: string, toName: string, factor: number) {
  if (factor >= 1) {
    return `${toName} = ${fromName} × ${formatNederlandsValue(factor)}`;
  }

  return `${toName} = ${fromName} ÷ ${formatNederlandsValue(1 / factor)}`;
}

function createNederlandsExplanation(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string,
  factor: number
) {
  if (factor >= 1) {
    return `Vermenigvuldig de waarde in ${fromName} met ${formatNederlandsValue(
      factor
    )} om deze om te rekenen naar ${toName}. 1 ${fromUnit} = ${formatNederlandsValue(
      factor
    )} ${toUnit}.`;
  }

  return `Deel de waarde in ${fromName} door ${formatNederlandsValue(
    1 / factor
  )} om deze om te rekenen naar ${toName}. 1 ${fromUnit} = ${formatNederlandsValue(
    factor
  )} ${toUnit}.`;
}

function createNederlandsTemperatureFormula(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string
) {
  if (fromUnit === "C" && toUnit === "F") return `${toName} = (${fromName} × 9/5) + 32`;
  if (fromUnit === "F" && toUnit === "C") return `${toName} = (${fromName} − 32) × 5/9`;
  if (fromUnit === "C" && toUnit === "K") return `${toName} = ${fromName} + 273,15`;
  if (fromUnit === "K" && toUnit === "C") return `${toName} = ${fromName} − 273,15`;
  if (fromUnit === "C" && toUnit === "R") return `${toName} = (${fromName} + 273,15) × 9/5`;
  if (fromUnit === "R" && toUnit === "C") return `${toName} = ${fromName} × 5/9 − 273,15`;
  if (fromUnit === "F" && toUnit === "R") return `${toName} = ${fromName} + 459,67`;
  if (fromUnit === "R" && toUnit === "F") return `${toName} = ${fromName} − 459,67`;
  if (fromUnit === "C" && toUnit === "Re") return `${toName} = ${fromName} × 4/5`;
  if (fromUnit === "Re" && toUnit === "C") return `${toName} = ${fromName} × 5/4`;

  return `${toName} = ${fromName}`;
}

function createNederlandsTemperatureExplanation(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string
) {
  if (fromUnit === "C" && toUnit === "F") {
    return `Vermenigvuldig ${fromName} met 9/5 en tel er 32 bij op om naar ${toName} om te rekenen. 1 ${fromUnit} = 33,8 ${toUnit}.`;
  }
  if (fromUnit === "F" && toUnit === "C") {
    return `Trek eerst 32 af van ${fromName} en vermenigvuldig de uitkomst met 5/9 om naar ${toName} om te rekenen. 32 ${fromUnit} is 0 ${toUnit}.`;
  }
  if (fromUnit === "C" && toUnit === "K") {
    return `Tel 273,15 op bij ${fromName} om naar ${toName} om te rekenen. 0 ${fromUnit} is 273,15 ${toUnit}.`;
  }
  if (fromUnit === "K" && toUnit === "C") {
    return `Trek 273,15 af van ${fromName} om naar ${toName} om te rekenen. 273,15 ${fromUnit} is 0 ${toUnit}.`;
  }

  return `Gebruik de vastgelegde temperatuurrelatie om ${fromName} om te rekenen naar ${toName}.`;
}

const nederlandsUnitBySourceSlug: Record<string, { name: string; slug: string }> =
  Object.fromEntries(
    nederlandsUnitPages.map((page) => [
      page.sourceSlug,
      { name: page.name, slug: page.slug },
    ])
  );

function localizeConversionPage(
  page: ConversionPage
): LocalizedNederlandsConversionPage | null {
  const from = findUnit(page.category, page.fromUnit);
  const to = findUnit(page.category, page.toUnit);

  if (!from?.tr || !to?.tr) return null;

  const fromNl = nederlandsUnitBySourceSlug[from.tr.slug];
  const toNl = nederlandsUnitBySourceSlug[to.tr.slug];

  if (!fromNl || !toNl) return null;

  const factor = convert(page.category, 1, page.fromUnit, page.toUnit);

  return {
    ...page,
    locale: "nl",
    sourceSlug: page.slug,
    slug: `${fromNl.slug}-${toNl.slug}`,
    fromName: fromNl.name,
    toName: toNl.name,
    categoryName: nederlandsCategoryNames[page.category] ?? page.category,
    formula:
      page.category === "sicaklik"
        ? createNederlandsTemperatureFormula(fromNl.name, toNl.name, page.fromUnit, page.toUnit)
        : createNederlandsFormula(fromNl.name, toNl.name, factor),
    explanation:
      page.category === "sicaklik"
        ? createNederlandsTemperatureExplanation(fromNl.name, toNl.name, page.fromUnit, page.toUnit)
        : createNederlandsExplanation(fromNl.name, toNl.name, page.fromUnit, page.toUnit, factor),
    reverseSlug: `${toNl.slug}-${fromNl.slug}`,
  };
}

export const nederlandsConversionPages: LocalizedNederlandsConversionPage[] = conversionPages
  .map(localizeConversionPage)
  .filter((page): page is LocalizedNederlandsConversionPage => page !== null);

export function findNederlandsConversionPage(slug: string) {
  return nederlandsConversionPages.find((page) => page.slug === slug);
}

export function findNederlandsConversionPageByTurkishSlug(sourceSlug: string) {
  return nederlandsConversionPages.find((page) => page.sourceSlug === sourceSlug);
}
