import { convert } from "./convert";
import {
  conversionPages,
  type ConversionPage,
} from "./conversionPages";
import { findUnit, unitRegistry } from "./unitRegistry";

export type LocalizedUzbekConversionPage = ConversionPage & {
  locale: "uz";
  sourceSlug: string;
  categoryName: string;
};

// Faqat "uz" alani doldurulmus birimlerin ait oldugu kategoriler burada
// var -- yeni kategori/birim eklendikce bu liste de genisletilecek.
const uzbekCategoryNames: Record<string, string> = {
  uzunluk: "Uzunlik",
  alan: "Yuza",
  hacim: "Hajm",
  kutle: "Massa",
  sicaklik: "Harorat",
  zaman: "Vaqt",
  hiz: "Tezlik",
  basinc: "Bosim",
  enerji: "Energiya",
  veri: "Ma'lumot Hajmi",
  elektrik: "Elektr",
  altin_ayar: "Oltin Karati",
  debi: "Sarf",
  yogunluk: "Zichlik",
  kuvvet: "Kuch",
  tork: "Tork",
  aci: "Burchak",
  frekans: "Chastota",
  debi_hacimsel: "Hajmiy Sarf",
  debi_kutlesel: "Massaviy Sarf",
  manyetik_alan: "Magnit Maydoni",
  manyetik_aki: "Magnit Oqimi",
  viskozite_kinematik: "Kinematik Qovushqoqlik",
  isil_iletkenlik: "Issiqlik O'tkazuvchanligi",
  isi_akisi: "Issiqlik Oqimi Zichligi",
  ozgul_isi: "Solishtirma Issiqlik Sig'imi",
  ivme: "Tezlanish",
  acisal_hiz: "Burchak Tezligi",
  guc: "Quvvat",
  momentum: "Impuls",
  viskozite_dinamik: "Dinamik Qovushqoqlik",
  elektrik_direnc: "Qarshilik",
  kapasitans: "Sig'im",
  enduktans: "Induktivlik",
  elektrik_yuk: "Elektr Zaryadi",
  kan_sekeri: "Qon Shakari",
  vitamin_d: "Vitamin D",
};

// Bazi birim slug'lari (mevcut localizedUzbekUnitPages.ts icinde) zaten
// "-ga" ile bitiyor (orn. "kilogram-kuch-kvadrat-santimetrga"). Byle
// durumda ekstra "-ga" eklemek "gaga" gibi hatali bir slug uretir.
function appendDativeSuffix(slug: string) {
  if (/(ga|qa|ka)$/.test(slug)) {
    return slug;
  }
  return `${slug}ga`;
}

function formatUzbekValue(value: number) {
  return Number(value.toPrecision(12)).toLocaleString("en-US", {
    maximumFractionDigits: 12,
  });
}

function createUzbekFormula(fromName: string, toName: string, factor: number) {
  if (factor >= 1) {
    return `${toName} = ${fromName} × ${formatUzbekValue(factor)}`;
  }

  return `${toName} = ${fromName} ÷ ${formatUzbekValue(1 / factor)}`;
}

function createUzbekExplanation(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string,
  factor: number,
) {
  const operation =
    factor >= 1
      ? `uni ${formatUzbekValue(factor)}ga ko'paytiring`
      : `uni ${formatUzbekValue(1 / factor)}ga bo'ling`;

  return (
    `${fromName} qiymatini ${toName}ga aylantirish uchun, ${operation}. ` +
    `1 ${fromUnit} ${formatUzbekValue(factor)} ${toUnit}ga teng.`
  );
}

function createUzbekTemperatureFormula(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string,
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
  if (fromUnit === "F" && toUnit === "K") {
    return `${toName} = (${fromName} − 32) × 5/9 + 273.15`;
  }
  if (fromUnit === "K" && toUnit === "F") {
    return `${toName} = (${fromName} − 273.15) × 9/5 + 32`;
  }

  return `${toName} = ${fromName}`;
}

function createUzbekTemperatureExplanation(
  fromName: string,
  toName: string,
  fromUnit: string,
  toUnit: string,
) {
  if (fromUnit === "C" && toUnit === "F") {
    return `${fromName}ni ${toName}ga aylantirish uchun, 9/5ga ko'paytirib, 32 qo'shing. 0°C 32°F ga teng.`;
  }
  if (fromUnit === "F" && toUnit === "C") {
    return `${fromName}ni ${toName}ga aylantirish uchun, 32ni ayirib, natijani 5/9ga ko'paytiring. 32°F 0°C ga teng.`;
  }
  if (fromUnit === "C" && toUnit === "K") {
    return `${fromName}ni ${toName}ga aylantirish uchun, 273.15 qo'shing. 0°C 273.15K ga teng.`;
  }
  if (fromUnit === "K" && toUnit === "C") {
    return `${fromName}ni ${toName}ga aylantirish uchun, 273.15ni ayiring. 273.15K 0°C ga teng.`;
  }
  if (fromUnit === "F" && toUnit === "K") {
    return `${fromName}ni ${toName}ga aylantirish uchun, 32ni ayirib, 5/9ga ko'paytiring, so'ng 273.15 qo'shing.`;
  }
  if (fromUnit === "K" && toUnit === "F") {
    return `${fromName}ni ${toName}ga aylantirish uchun, 273.15ni ayirib, 9/5ga ko'paytiring, so'ng 32 qo'shing.`;
  }

  return `${fromName}ni ${toName}ga aylantiring.`;
}

function localizeUzbekConversionPage(
  page: ConversionPage,
): LocalizedUzbekConversionPage | null {
  const from = findUnit(page.category, page.fromUnit);
  const to = findUnit(page.category, page.toUnit);

  if (!from?.uz || !to?.uz) {
    return null;
  }

  const fromSlug = from.uz.slug;
  const toSlug = to.uz.slug;

  const factor = convert(page.category, 1, page.fromUnit, page.toUnit);

  return {
    ...page,
    locale: "uz",
    sourceSlug: page.slug,
    slug: `${fromSlug}-dan-${appendDativeSuffix(toSlug)}`,
    fromName: from.uz.name,
    toName: to.uz.name,
    categoryName: uzbekCategoryNames[page.category] ?? page.category,
    formula:
      page.category === "sicaklik"
        ? createUzbekTemperatureFormula(
            from.uz.name,
            to.uz.name,
            page.fromUnit,
            page.toUnit,
          )
        : createUzbekFormula(from.uz.name, to.uz.name, factor),
    explanation:
      page.category === "sicaklik"
        ? createUzbekTemperatureExplanation(
            from.uz.name,
            to.uz.name,
            page.fromUnit,
            page.toUnit,
          )
        : createUzbekExplanation(
            from.uz.name,
            to.uz.name,
            page.fromUnit,
            page.toUnit,
            factor,
          ),
    reverseSlug: `${toSlug}-dan-${appendDativeSuffix(fromSlug)}`,
  };
}

// O'zbekistonga xos tarixiy birliklar (gaz, chaqirim, tosh, farsah, qadam)
// unitRegistry.ts'da faqat "uz" maydoni bilan yozilgan -- TR tomonida hech
// qachon sahifa hosil bo'lmasin deb, TR conversionPages generatoridan
// (u ".tr" nomi shart qiladi) o'tkazilmagan. Shuning uchun bu 5 juftlik
// bu yerda qo'lda yoziladi, xuddi yuqoridagi funksiyalar bilan bir xil
// convert()/formula/explanation mantig'idan foydalanib.
type ManualUzbekPairDefinition = {
  category: string;
  fromId: string;
  fromSlug: string;
  fromName: string;
  toId: string;
  toSlug: string;
  toName: string;
  exampleValues: number[];
  reverseExampleValues: number[];
};

const manualUzbekPairDefinitions: ManualUzbekPairDefinition[] = [
  {
    category: "uzunluk",
    fromId: "gaz",
    fromSlug: "gaz",
    fromName: "Gaz",
    toId: "metre",
    toSlug: "metr",
    toName: "Metr",
    exampleValues: [1, 5, 10, 25, 50, 100],
    reverseExampleValues: [1, 5, 10, 25, 50, 100],
  },
  {
    category: "uzunluk",
    fromId: "chaqirim",
    fromSlug: "chaqirim",
    fromName: "Chaqirim",
    toId: "kilometre",
    toSlug: "kilometr",
    toName: "Kilometr",
    exampleValues: [1, 2, 5, 10, 25, 50],
    reverseExampleValues: [1, 2, 5, 10, 25, 50],
  },
  {
    category: "uzunluk",
    fromId: "tosh",
    fromSlug: "tosh",
    fromName: "Tosh",
    toId: "kilometre",
    toSlug: "kilometr",
    toName: "Kilometr",
    exampleValues: [1, 2, 5, 10, 20],
    reverseExampleValues: [7, 14, 35, 70, 140],
  },
  {
    category: "uzunluk",
    fromId: "farsah-uz",
    fromSlug: "farsah",
    fromName: "Farsah",
    toId: "kilometre",
    toSlug: "kilometr",
    toName: "Kilometr",
    exampleValues: [1, 2, 5, 10, 20],
    reverseExampleValues: [6, 12, 30, 60, 120],
  },
  {
    category: "uzunluk",
    fromId: "qadam",
    fromSlug: "qadam",
    fromName: "Qadam",
    toId: "metre",
    toSlug: "metr",
    toName: "Metr",
    exampleValues: [1, 10, 100, 500, 1000],
    reverseExampleValues: [1, 5, 10, 50, 100],
  },
  {
    category: "kutle",
    fromId: "miskal-uz",
    fromSlug: "miskal",
    fromName: "Miskal",
    toId: "gram",
    toSlug: "gramm",
    toName: "Gramm",
    exampleValues: [1, 5, 10, 50, 100],
    reverseExampleValues: [1, 10, 50, 100, 500],
  },
  {
    category: "kutle",
    fromId: "pud",
    fromSlug: "pud",
    fromName: "Pud",
    toId: "kilogram",
    toSlug: "kilogramm",
    toName: "Kilogramm",
    exampleValues: [1, 2, 5, 10, 20],
    reverseExampleValues: [16, 32, 82, 164, 328],
  },
  {
    category: "kutle",
    fromId: "qadoq",
    fromSlug: "qadoq",
    fromName: "Qadoq",
    toId: "gram",
    toSlug: "gramm",
    toName: "Gramm",
    exampleValues: [1, 5, 10, 50, 100],
    reverseExampleValues: [1, 5, 10, 50, 100],
  },
  {
    category: "kutle",
    fromId: "dirhem-uz",
    fromSlug: "dirham",
    fromName: "Dirham",
    toId: "gram",
    toSlug: "gramm",
    toName: "Gramm",
    exampleValues: [1, 5, 10, 50, 100],
    reverseExampleValues: [1, 5, 10, 50, 100],
  },
  {
    category: "kutle",
    fromId: "batman-uz",
    fromSlug: "botmon",
    fromName: "Botmon",
    toId: "kilogram",
    toSlug: "kilogramm",
    toName: "Kilogramm",
    exampleValues: [1, 2, 5, 10, 20],
    reverseExampleValues: [131, 262, 655, 1310, 2621],
  },
];

function getRegistryUnitById(id: string) {
  return unitRegistry.find((unit) => unit.id === id);
}

function createManualUzbekConversionPages(
  definition: ManualUzbekPairDefinition,
): LocalizedUzbekConversionPage[] {
  const from = getRegistryUnitById(definition.fromId);
  const to = getRegistryUnitById(definition.toId);

  if (!from?.uz || !to?.uz) {
    return [];
  }

  const fromSymbol = from.symbol;
  const toSymbol = to.symbol;
  const factor = convert(definition.category, 1, fromSymbol, toSymbol);
  const reverseFactor = convert(definition.category, 1, toSymbol, fromSymbol);
  const forwardSlug = `${definition.fromSlug}-dan-${appendDativeSuffix(definition.toSlug)}`;
  const reverseSlug = `${definition.toSlug}-dan-${appendDativeSuffix(definition.fromSlug)}`;
  const categoryName =
    uzbekCategoryNames[definition.category] ?? definition.category;

  const forwardPage: LocalizedUzbekConversionPage = {
    locale: "uz",
    sourceSlug: "",
    slug: forwardSlug,
    category: definition.category,
    categoryName,
    fromUnit: fromSymbol,
    toUnit: toSymbol,
    fromName: definition.fromName,
    toName: definition.toName,
    formula: createUzbekFormula(definition.fromName, definition.toName, factor),
    explanation: createUzbekExplanation(
      definition.fromName,
      definition.toName,
      fromSymbol,
      toSymbol,
      factor,
    ),
    exampleValues: definition.exampleValues,
    reverseSlug,
  };

  const reversePage: LocalizedUzbekConversionPage = {
    locale: "uz",
    sourceSlug: "",
    slug: reverseSlug,
    category: definition.category,
    categoryName,
    fromUnit: toSymbol,
    toUnit: fromSymbol,
    fromName: definition.toName,
    toName: definition.fromName,
    formula: createUzbekFormula(definition.toName, definition.fromName, reverseFactor),
    explanation: createUzbekExplanation(
      definition.toName,
      definition.fromName,
      toSymbol,
      fromSymbol,
      reverseFactor,
    ),
    exampleValues: definition.reverseExampleValues,
    reverseSlug: forwardSlug,
  };

  return [forwardPage, reversePage];
}

const manualUzbekOnlyConversionPages: LocalizedUzbekConversionPage[] =
  manualUzbekPairDefinitions.flatMap(createManualUzbekConversionPages);

export const uzbekConversionPages: LocalizedUzbekConversionPage[] = [
  ...conversionPages
    .map(localizeUzbekConversionPage)
    .filter(
      (page): page is LocalizedUzbekConversionPage => page !== null,
    ),
  ...manualUzbekOnlyConversionPages,
];

export function findUzbekConversionPage(slug: string) {
  return uzbekConversionPages.find((page) => page.slug === slug);
}

export function findUzbekPageByTurkishSlug(sourceSlug: string) {
  return uzbekConversionPages.find((page) => page.sourceSlug === sourceSlug);
}
