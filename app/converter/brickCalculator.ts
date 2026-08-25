// Tugla hesaplama -- duvar alanindan gerekli tugla adedini tahmin eder.
// Tuglanin yuz olculerine (en x yukseklik) derz kalinligi eklenerek
// duvar uzerinde kapladigi gercek alan bulunur; kesim/kirilma icin
// varsayilan %5 fire payi eklenir.

export type BrickCalculatorInput = {
  wallArea: number;
  brickWidthCm: number;
  brickHeightCm: number;
  jointMm: number;
  wastePercent: number;
};

export type BrickCalculatorResult = {
  brickUnitAreaM2: number;
  requiredAreaWithWaste: number;
  requiredBrickCount: number;
};

export function calculateBrickNeeds(
  input: BrickCalculatorInput
): BrickCalculatorResult | null {
  const { wallArea, brickWidthCm, brickHeightCm, jointMm, wastePercent } = input;

  const dimensionsValid = [wallArea, brickWidthCm, brickHeightCm].every(
    (value) => Number.isFinite(value) && value > 0
  );
  const jointValid = Number.isFinite(jointMm) && jointMm >= 0;
  const wasteValid = Number.isFinite(wastePercent) && wastePercent >= 0;

  if (!dimensionsValid || !jointValid || !wasteValid) {
    return null;
  }

  const widthWithJointM = brickWidthCm / 100 + jointMm / 1000;
  const heightWithJointM = brickHeightCm / 100 + jointMm / 1000;
  const brickUnitAreaM2 = widthWithJointM * heightWithJointM;
  const requiredAreaWithWaste = wallArea * (1 + wastePercent / 100);
  const requiredBrickCount = Math.ceil(requiredAreaWithWaste / brickUnitAreaM2);

  return { brickUnitAreaM2, requiredAreaWithWaste, requiredBrickCount };
}
