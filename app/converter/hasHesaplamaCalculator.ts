// Has hesaplama -- altin/gumus alasimlarinin gram agirligi ve milyem
// (binde) saflik degerinden saf (has) metal icerigini, birden fazla
// bilesen varsa (alasim karistirma) agirlikli ortalama sonuc ayarini
// hesaplar.

export type MetalType = "altin" | "gumus";

export type AlloyComponent = {
  weightGrams: number;
  milyem: number;
};

export type AlloyMixResult = {
  totalWeightGrams: number;
  totalPureGrams: number;
  resultMilyem: number;
  resultPercent: number;
};

export function calculateAlloyMix(
  components: AlloyComponent[]
): AlloyMixResult | null {
  const validComponents = components.filter(
    (component) =>
      Number.isFinite(component.weightGrams) &&
      component.weightGrams > 0 &&
      Number.isFinite(component.milyem) &&
      component.milyem >= 0 &&
      component.milyem <= 1000
  );

  if (validComponents.length === 0) {
    return null;
  }

  const totalWeightGrams = validComponents.reduce(
    (sum, component) => sum + component.weightGrams,
    0
  );

  const totalPureGrams = validComponents.reduce(
    (sum, component) =>
      sum + component.weightGrams * (component.milyem / 1000),
    0
  );

  const resultMilyem = (totalPureGrams / totalWeightGrams) * 1000;

  return {
    totalWeightGrams,
    totalPureGrams,
    resultMilyem,
    resultPercent: resultMilyem / 10,
  };
}

export type RequiredGrossInput = {
  pureGramsNeeded: number;
  milyem: number;
};

export function calculateRequiredGrossWeight(
  input: RequiredGrossInput
): number | null {
  const { pureGramsNeeded, milyem } = input;

  if (
    !Number.isFinite(pureGramsNeeded) ||
    pureGramsNeeded <= 0 ||
    !Number.isFinite(milyem) ||
    milyem <= 0 ||
    milyem > 1000
  ) {
    return null;
  }

  return pureGramsNeeded / (milyem / 1000);
}

export type StandardGrade = {
  milyem: number;
  label: string;
};

export const goldStandardGrades: StandardGrade[] = [
  { milyem: 999, label: "24 Ayar (999)" },
  { milyem: 916, label: "22 Ayar (916)" },
  { milyem: 750, label: "18 Ayar (750)" },
  { milyem: 585, label: "14 Ayar (585)" },
  { milyem: 375, label: "9 Ayar (375)" },
  { milyem: 333, label: "8 Ayar (333)" },
];

export const silverStandardGrades: StandardGrade[] = [
  { milyem: 999, label: "999 Ayar (Saf Gümüş)" },
  { milyem: 925, label: "925 Ayar (Sterlin)" },
  { milyem: 900, label: "900 Ayar" },
  { milyem: 800, label: "800 Ayar" },
];

export function getStandardGrades(metal: MetalType): StandardGrade[] {
  return metal === "altin" ? goldStandardGrades : silverStandardGrades;
}

export function findNearestStandardGrade(
  milyem: number,
  metal: MetalType,
  toleranceMilyem = 10
): StandardGrade | null {
  if (!Number.isFinite(milyem)) {
    return null;
  }

  let nearest: StandardGrade | null = null;
  let smallestDiff = Infinity;

  for (const grade of getStandardGrades(metal)) {
    const diff = Math.abs(grade.milyem - milyem);

    if (diff < smallestDiff) {
      smallestDiff = diff;
      nearest = grade;
    }
  }

  return nearest && smallestDiff <= toleranceMilyem ? nearest : null;
}
