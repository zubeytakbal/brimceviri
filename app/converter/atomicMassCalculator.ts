// Ortalama atom kutlesi hesaplama -- bir elementin izotoplarinin kutle
// ve bolluk yuzdelerinden agirlikli ortalama alarak periyodik tabloda
// gorulen ortalama atom kutlesini hesaplar.

export type Isotope = {
  mass: number;
  abundancePercent: number;
};

export function calculateAverageAtomicMass(
  isotopes: Isotope[]
): number | null {
  if (isotopes.length === 0) {
    return null;
  }

  let weightedSum = 0;
  let totalAbundance = 0;

  for (const isotope of isotopes) {
    if (!Number.isFinite(isotope.mass) || isotope.mass <= 0) {
      return null;
    }

    if (
      !Number.isFinite(isotope.abundancePercent) ||
      isotope.abundancePercent < 0
    ) {
      return null;
    }

    weightedSum += isotope.mass * isotope.abundancePercent;
    totalAbundance += isotope.abundancePercent;
  }

  if (totalAbundance <= 0) {
    return null;
  }

  return weightedSum / totalAbundance;
}
