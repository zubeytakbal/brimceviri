import { convert } from "./convert";
import { conversionPages, type ConversionPage } from "./conversionPages";
import { findUnit } from "./unitRegistry";
import { spanishUnitPages } from "./localizedSpanishUnitPages";

export type LocalizedSpanishConversionPage = ConversionPage & {
  locale: "es";
  sourceSlug: string;
  categoryName: string;
};

const spanishCategoryNames: Record<string, string> = {
  uzunluk: "Longitud",
  alan: "Superficie",
  hacim: "Volumen",
  kutle: "Masa",
  sicaklik: "Temperatura",
  zaman: "Tiempo",
  hiz: "Velocidad",
  basinc: "Presión",
  enerji: "Energía",
  debi: "Caudal",
  elektrik: "Electricidad",
  yogunluk: "Densidad",
  kuvvet: "Fuerza",
  tork: "Par",
  aci: "Ángulo",
  frekans: "Frecuencia",
  debi_hacimsel: "Caudal volumétrico",
  debi_kutlesel: "Caudal másico",
  manyetik_alan: "Campo magnético",
  manyetik_aki: "Flujo magnético",
  viskozite_kinematik: "Viscosidad cinemática",
  isil_iletkenlik: "Conductividad térmica",
  isi_akisi: "Flujo térmico",
  ozgul_isi: "Calor específico",
  ivme: "Aceleración",
  acisal_hiz: "Velocidad angular",
  guc: "Potencia",
  momentum: "Momento lineal",
  viskozite_dinamik: "Viscosidad",
  veri: "Almacenamiento de datos",
  elektrik_direnc: "Resistencia eléctrica",
  kapasitans: "Capacitancia",
  enduktans: "Inductancia",
  elektrik_yuk: "Carga eléctrica",
  altin_ayar: "Quilate de oro",
  gumus_ayar: "Ley de la plata",
  kan_sekeri: "Glucemia",
  vitamin_d: "Vitamina D",
};

function formatSpanishValue(value: number) {
  return Number(value.toPrecision(12)).toLocaleString("es-ES", {
    maximumFractionDigits: 12,
  });
}

function createSpanishFormula(fromName: string, toName: string, factor: number) {
  if (factor >= 1) {
    return `${toName} = ${fromName} × ${formatSpanishValue(factor)}`;
  }

  return `${toName} = ${fromName} ÷ ${formatSpanishValue(1 / factor)}`;
}

function createSpanishExplanation(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string,
  factor: number
) {
  if (factor >= 1) {
    return `Para convertir ${fromName} en ${toName}, se multiplica el valor de partida por ${formatSpanishValue(
      factor
    )}. 1 ${fromUnit} = ${formatSpanishValue(factor)} ${toUnit}.`;
  }

  return `Para convertir ${fromName} en ${toName}, se divide el valor de partida entre ${formatSpanishValue(
    1 / factor
  )}. 1 ${fromUnit} = ${formatSpanishValue(factor)} ${toUnit}.`;
}

function createSpanishTemperatureFormula(
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

function createSpanishTemperatureExplanation(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string
) {
  if (fromUnit === "C" && toUnit === "F") {
    return `Para convertir ${fromName} en ${toName}, se multiplica por 9/5 y se suma 32. 1 ${fromUnit} = 33,8 ${toUnit}.`;
  }

  if (fromUnit === "F" && toUnit === "C") {
    return `Para convertir ${fromName} en ${toName}, primero se resta 32 y el resultado se multiplica por 5/9. 32 ${fromUnit} equivale a 0 ${toUnit}.`;
  }

  if (fromUnit === "C" && toUnit === "K") {
    return `Para convertir ${fromName} en ${toName}, se suma 273,15. 0 ${fromUnit} equivale a 273,15 ${toUnit}.`;
  }

  if (fromUnit === "K" && toUnit === "C") {
    return `Para convertir ${fromName} en ${toName}, se resta 273,15. 273,15 ${fromUnit} equivale a 0 ${toUnit}.`;
  }

  return `Usa la relación de temperatura definida para convertir ${fromName} en ${toName}.`;
}

const spanishUnitBySourceSlug: Record<string, { name: string; slug: string }> =
  Object.fromEntries(
    spanishUnitPages.map((page) => [
      page.sourceSlug,
      { name: page.name, slug: page.slug },
    ])
  );

function localizeConversionPage(
  page: ConversionPage
): LocalizedSpanishConversionPage | null {
  const from = findUnit(page.category, page.fromUnit);
  const to = findUnit(page.category, page.toUnit);

  if (!from?.tr || !to?.tr) {
    return null;
  }

  const fromEs = spanishUnitBySourceSlug[from.tr.slug];
  const toEs = spanishUnitBySourceSlug[to.tr.slug];

  if (!fromEs || !toEs) {
    return null;
  }

  const factor = convert(page.category, 1, page.fromUnit, page.toUnit);

  return {
    ...page,
    locale: "es",
    sourceSlug: page.slug,
    slug: `${fromEs.slug}-${toEs.slug}`,
    fromName: fromEs.name,
    toName: toEs.name,
    categoryName: spanishCategoryNames[page.category] ?? page.category,
    formula:
      page.category === "sicaklik"
        ? createSpanishTemperatureFormula(
            fromEs.name,
            toEs.name,
            page.fromUnit,
            page.toUnit
          )
        : createSpanishFormula(fromEs.name, toEs.name, factor),
    explanation:
      page.category === "sicaklik"
        ? createSpanishTemperatureExplanation(
            fromEs.name,
            toEs.name,
            page.fromUnit,
            page.toUnit
          )
        : createSpanishExplanation(
            fromEs.name,
            toEs.name,
            page.fromUnit,
            page.toUnit,
            factor
          ),
    reverseSlug: `${toEs.slug}-${fromEs.slug}`,
  };
}

export const spanishConversionPages: LocalizedSpanishConversionPage[] =
  conversionPages
    .map(localizeConversionPage)
    .filter(
      (page): page is LocalizedSpanishConversionPage => page !== null
    );

export function findSpanishConversionPage(slug: string) {
  return spanishConversionPages.find((page) => page.slug === slug);
}

export function findSpanishConversionPageByTurkishSlug(sourceSlug: string) {
  return spanishConversionPages.find((page) => page.sourceSlug === sourceSlug);
}
