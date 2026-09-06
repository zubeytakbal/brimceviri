export type FertilizerInput = {
  targetNutrientKgPerDa: number;
  nutrientContentPercent: number;
  areaDa: number;
};

export type FertilizerResult = {
  productKgPerDa: number;
  totalProductKg: number;
};

export function calculateFertilizerNeed(
  input: FertilizerInput
): FertilizerResult | null {
  const { targetNutrientKgPerDa, nutrientContentPercent, areaDa } = input;

  if (
    !Number.isFinite(targetNutrientKgPerDa) ||
    targetNutrientKgPerDa <= 0 ||
    !Number.isFinite(nutrientContentPercent) ||
    nutrientContentPercent <= 0 ||
    nutrientContentPercent > 100 ||
    !Number.isFinite(areaDa) ||
    areaDa <= 0
  ) {
    return null;
  }

  const productKgPerDa = targetNutrientKgPerDa / (nutrientContentPercent / 100);

  return {
    productKgPerDa,
    totalProductKg: productKgPerDa * areaDa,
  };
}
