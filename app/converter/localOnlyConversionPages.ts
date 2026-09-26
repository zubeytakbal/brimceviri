import { convert } from "./convert";

// Yalnizca belirli dillerde anlami olan birimler (Iskandinav mili, Hollanda
// onsu gibi) TR tarafinda sayfasi olmadigi icin ortak conversionPages
// listesinden gelmez. Bu yardimci, o dilin birim sayfalarini ve formul/
// aciklama fonksiyonlarini kullanarak her iki yondeki donusum sayfalarini
// uretir. sourceSlug birim sayfalarinin sourceSlug'larindan kurulur; ayni
// birimi tasiyan diller (sv/no gibi) boylece hreflang ile birbirine baglanir.

type UnitPageLike = {
  category: string;
  unit: string;
  slug: string;
  sourceSlug: string;
  name: string;
  categoryName: string;
};

export type LocalOnlyPair = {
  category: string;
  first: string;
  second: string;
  firstExamples: number[];
  secondExamples: number[];
};

export function buildLocalOnlyConversionPages<L extends string>(
  locale: L,
  pairs: LocalOnlyPair[],
  unitPages: UnitPageLike[],
  createFormula: (fromName: string, toName: string, factor: number) => string,
  createExplanation: (
    fromName: string,
    toName: string,
    fromUnit: string,
    toUnit: string,
    factor: number
  ) => string
) {
  const build = (category: string, fromUnit: string, toUnit: string, exampleValues: number[]) => {
    const from = unitPages.find((page) => page.category === category && page.unit === fromUnit);
    const to = unitPages.find((page) => page.category === category && page.unit === toUnit);

    if (!from || !to) {
      throw new Error(`localOnlyConversionPages(${locale}): ${fromUnit}/${toUnit} için birim sayfası yok`);
    }

    const factor = convert(category, 1, fromUnit, toUnit);

    return {
      locale,
      sourceSlug: `${from.sourceSlug}-${to.sourceSlug}`,
      slug: `${from.slug}-${to.slug}`,
      category,
      categoryName: from.categoryName,
      fromUnit,
      toUnit,
      fromName: from.name,
      toName: to.name,
      formula: createFormula(from.name, to.name, factor),
      explanation: createExplanation(from.name, to.name, fromUnit, toUnit, factor),
      exampleValues,
      reverseSlug: `${to.slug}-${from.slug}`,
    };
  };

  return pairs.flatMap((pair) => [
    build(pair.category, pair.first, pair.second, pair.firstExamples),
    build(pair.category, pair.second, pair.first, pair.secondExamples),
  ]);
}

export const nordicMilePairs: LocalOnlyPair[] = [
  { category: "uzunluk", first: "mil", second: "km", firstExamples: [0.5, 1, 2, 5, 10, 25, 50], secondExamples: [1, 5, 10, 25, 50, 100, 500] },
  { category: "uzunluk", first: "mil", second: "mi", firstExamples: [0.5, 1, 2, 5, 10, 25, 50], secondExamples: [1, 5, 10, 25, 50, 100, 500] },
];

export const dutchMassPairs: LocalOnlyPair[] = [
  { category: "kutle", first: "hg", second: "g", firstExamples: [0.5, 1, 1.5, 2, 2.5, 3, 5], secondExamples: [50, 100, 150, 200, 250, 500, 1000] },
  { category: "kutle", first: "hg", second: "kg", firstExamples: [1, 2, 3, 5, 10, 15, 20], secondExamples: [0.1, 0.25, 0.5, 1, 1.5, 2, 5] },
  { category: "kutle", first: "pond", second: "kg", firstExamples: [0.5, 1, 1.5, 2, 3, 4, 5], secondExamples: [0.5, 1, 1.5, 2, 2.5, 5, 10] },
  { category: "kutle", first: "pond", second: "g", firstExamples: [0.5, 1, 1.5, 2, 3, 4, 5], secondExamples: [100, 250, 500, 750, 1000, 1500, 2000] },
];

export const italianMassPairs: LocalOnlyPair[] = [
  { category: "kutle", first: "hg", second: "g", firstExamples: [0.5, 1, 1.5, 2, 2.5, 3, 5], secondExamples: [50, 100, 150, 200, 250, 500, 1000] },
  { category: "kutle", first: "hg", second: "kg", firstExamples: [1, 2, 3, 5, 10, 15, 20], secondExamples: [0.1, 0.25, 0.5, 1, 1.5, 2, 5] },
];

export const brazilianMassPairs: LocalOnlyPair[] = [
  { category: "kutle", first: "@", second: "kg", firstExamples: [1, 2, 5, 10, 16, 18, 20], secondExamples: [15, 30, 100, 240, 300, 450, 600] },
];
