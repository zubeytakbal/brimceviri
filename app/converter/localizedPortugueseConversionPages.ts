import { convert } from "./convert";
import { conversionPages, type ConversionPage } from "./conversionPages";
import { findUnit } from "./unitRegistry";
import { portugueseUnitPages } from "./localizedPortugueseUnitPages";

export type LocalizedPortugueseConversionPage = ConversionPage & {
  locale: "pt";
  sourceSlug: string;
  categoryName: string;
};

const portugueseCategoryNames: Record<string, string> = {
  uzunluk: "Comprimento",
  alan: "Area",
  hacim: "Volume",
  kutle: "Massa",
  sicaklik: "Temperatura",
  zaman: "Tempo",
  hiz: "Velocidade",
  basinc: "Pressao",
  enerji: "Energia",
  debi: "Vazao",
  elektrik: "Eletricidade",
  yogunluk: "Densidade",
  kuvvet: "Forca",
  tork: "Torque",
  aci: "Angulo",
  frekans: "Frequencia",
  debi_hacimsel: "Vazao volumetrica",
  debi_kutlesel: "Vazao massica",
  manyetik_alan: "Campo magnetico",
  manyetik_aki: "Fluxo magnetico",
  viskozite_kinematik: "Viscosidade cinematica",
  isil_iletkenlik: "Condutividade termica",
  isi_akisi: "Fluxo termico",
  ozgul_isi: "Calor especifico",
  ivme: "Aceleracao",
  acisal_hiz: "Velocidade angular",
  guc: "Potencia",
  momentum: "Momento linear",
  viskozite_dinamik: "Viscosidade",
  veri: "Armazenamento de dados",
  elektrik_direnc: "Resistencia eletrica",
  kapasitans: "Capacitancia",
  enduktans: "Indutancia",
  elektrik_yuk: "Carga eletrica",
  altin_ayar: "Quilate de ouro",
  gumus_ayar: "Teor de prata",
  kan_sekeri: "Glicemia",
  vitamin_d: "Vitamina D",
};

function formatPortugueseValue(value: number) {
  return Number(value.toPrecision(12)).toLocaleString("pt-BR", {
    maximumFractionDigits: 12,
  });
}

function createPortugueseFormula(fromName: string, toName: string, factor: number) {
  if (factor >= 1) {
    return `${toName} = ${fromName} × ${formatPortugueseValue(factor)}`;
  }

  return `${toName} = ${fromName} ÷ ${formatPortugueseValue(1 / factor)}`;
}

function createPortugueseExplanation(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string,
  factor: number
) {
  if (factor >= 1) {
    return `Para converter ${fromName} em ${toName}, multiplique o valor inicial por ${formatPortugueseValue(
      factor
    )}. 1 ${fromUnit} = ${formatPortugueseValue(factor)} ${toUnit}.`;
  }

  return `Para converter ${fromName} em ${toName}, divida o valor inicial por ${formatPortugueseValue(
    1 / factor
  )}. 1 ${fromUnit} = ${formatPortugueseValue(factor)} ${toUnit}.`;
}

function createPortugueseTemperatureFormula(
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

function createPortugueseTemperatureExplanation(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string
) {
  if (fromUnit === "C" && toUnit === "F") {
    return `Para converter ${fromName} em ${toName}, multiplique por 9/5 e some 32. 1 ${fromUnit} = 33,8 ${toUnit}.`;
  }

  if (fromUnit === "F" && toUnit === "C") {
    return `Para converter ${fromName} em ${toName}, primeiro subtraia 32 e multiplique o resultado por 5/9. 32 ${fromUnit} equivale a 0 ${toUnit}.`;
  }

  if (fromUnit === "C" && toUnit === "K") {
    return `Para converter ${fromName} em ${toName}, some 273,15. 0 ${fromUnit} equivale a 273,15 ${toUnit}.`;
  }

  if (fromUnit === "K" && toUnit === "C") {
    return `Para converter ${fromName} em ${toName}, subtraia 273,15. 273,15 ${fromUnit} equivale a 0 ${toUnit}.`;
  }

  return `Use a relacao de temperatura definida para converter ${fromName} em ${toName}.`;
}

const portugueseUnitBySourceSlug: Record<string, { name: string; slug: string }> =
  Object.fromEntries(
    portugueseUnitPages.map((page) => [
      page.sourceSlug,
      { name: page.name, slug: page.slug },
    ])
  );

function localizeConversionPage(
  page: ConversionPage
): LocalizedPortugueseConversionPage | null {
  const from = findUnit(page.category, page.fromUnit);
  const to = findUnit(page.category, page.toUnit);

  if (!from?.tr || !to?.tr) {
    return null;
  }

  const fromPt = portugueseUnitBySourceSlug[from.tr.slug];
  const toPt = portugueseUnitBySourceSlug[to.tr.slug];

  if (!fromPt || !toPt) {
    return null;
  }

  const factor = convert(page.category, 1, page.fromUnit, page.toUnit);

  return {
    ...page,
    locale: "pt",
    sourceSlug: page.slug,
    slug: `${fromPt.slug}-${toPt.slug}`,
    fromName: fromPt.name,
    toName: toPt.name,
    categoryName: portugueseCategoryNames[page.category] ?? page.category,
    formula:
      page.category === "sicaklik"
        ? createPortugueseTemperatureFormula(
            fromPt.name,
            toPt.name,
            page.fromUnit,
            page.toUnit
          )
        : createPortugueseFormula(fromPt.name, toPt.name, factor),
    explanation:
      page.category === "sicaklik"
        ? createPortugueseTemperatureExplanation(
            fromPt.name,
            toPt.name,
            page.fromUnit,
            page.toUnit
          )
        : createPortugueseExplanation(
            fromPt.name,
            toPt.name,
            page.fromUnit,
            page.toUnit,
            factor
          ),
    reverseSlug: `${toPt.slug}-${fromPt.slug}`,
  };
}

export const portugueseConversionPages: LocalizedPortugueseConversionPage[] =
  conversionPages
    .map(localizeConversionPage)
    .filter(
      (page): page is LocalizedPortugueseConversionPage => page !== null
    );

export function findPortugueseConversionPage(slug: string) {
  return portugueseConversionPages.find((page) => page.slug === slug);
}

export function findPortugueseConversionPageByTurkishSlug(sourceSlug: string) {
  return portugueseConversionPages.find((page) => page.sourceSlug === sourceSlug);
}
