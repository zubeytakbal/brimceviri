// Parke/laminat hesaplama -- kaplanacak alandan gerekli paket sayisini
// tahmin eder. Kesim firesi icin varsayilan %10 fire payi eklenir.

export type LaminateCalculatorInput = {
  area: number;
  packageAreaM2: number;
  wastePercent: number;
};

export type LaminateCalculatorResult = {
  requiredAreaWithWaste: number;
  requiredPackageCount: number;
};

export function calculateLaminateNeeds(
  input: LaminateCalculatorInput
): LaminateCalculatorResult | null {
  const { area, packageAreaM2, wastePercent } = input;

  const dimensionsValid = [area, packageAreaM2].every(
    (value) => Number.isFinite(value) && value > 0
  );
  const wasteValid = Number.isFinite(wastePercent) && wastePercent >= 0;

  if (!dimensionsValid || !wasteValid) {
    return null;
  }

  const requiredAreaWithWaste = area * (1 + wastePercent / 100);
  const requiredPackageCount = Math.ceil(requiredAreaWithWaste / packageAreaM2);

  return { requiredAreaWithWaste, requiredPackageCount };
}
