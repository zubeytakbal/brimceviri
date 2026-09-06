// Denge sabiti (Kc) hesaplama -- Kc = [urunler]^katsayi / [reaktanlar]^katsayi.
// Kutle etkisi yasasina dayanir.

export type KcSpecies = {
  concentration: number;
  coefficient: number;
};

export type KcCalculationResult = {
  kc: number;
};

function multiplyTerms(species: KcSpecies[]): number | null {
  let product = 1;

  for (const item of species) {
    if (!Number.isFinite(item.concentration) || item.concentration <= 0) {
      return null;
    }

    if (!Number.isFinite(item.coefficient) || item.coefficient <= 0) {
      return null;
    }

    product *= Math.pow(item.concentration, item.coefficient);
  }

  return product;
}

export function calculateKc(
  reactants: KcSpecies[],
  products: KcSpecies[]
): KcCalculationResult | null {
  if (reactants.length === 0 || products.length === 0) {
    return null;
  }

  const numerator = multiplyTerms(products);
  const denominator = multiplyTerms(reactants);

  if (numerator === null || denominator === null || denominator === 0) {
    return null;
  }

  return { kc: numerator / denominator };
}
