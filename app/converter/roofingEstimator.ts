export type RoofingEstimateInput = {
  buildingLengthM: number;
  buildingWidthM: number;
  eaveOverhangM: number;
  pitchRisePerTwelve: number;
  wastePercent: number;
  bundleCoverageM2: number;
};

export type RoofingEstimate = {
  planAreaM2: number;
  roofAreaM2: number;
  roofAreaWithWasteM2: number;
  roofingSquares: number;
  bundleCount: number;
};

const SQUARE_METERS_PER_ROOFING_SQUARE = 9.290304;

export function calculateRoofingEstimate(
  input: RoofingEstimateInput
): RoofingEstimate | null {
  const {
    buildingLengthM,
    buildingWidthM,
    eaveOverhangM,
    pitchRisePerTwelve,
    wastePercent,
    bundleCoverageM2,
  } = input;

  if (
    !(buildingLengthM > 0) ||
    !(buildingWidthM > 0) ||
    eaveOverhangM < 0 ||
    pitchRisePerTwelve < 0 ||
    wastePercent < 0 ||
    !(bundleCoverageM2 > 0) ||
    !Number.isFinite(eaveOverhangM) ||
    !Number.isFinite(pitchRisePerTwelve) ||
    !Number.isFinite(wastePercent)
  ) {
    return null;
  }

  const planLengthM = buildingLengthM + 2 * eaveOverhangM;
  const planWidthM = buildingWidthM + 2 * eaveOverhangM;
  const planAreaM2 = planLengthM * planWidthM;
  const slopeFactor = Math.sqrt(1 + (pitchRisePerTwelve / 12) ** 2);
  const roofAreaM2 = planAreaM2 * slopeFactor;
  const roofAreaWithWasteM2 = roofAreaM2 * (1 + wastePercent / 100);

  return {
    planAreaM2,
    roofAreaM2,
    roofAreaWithWasteM2,
    roofingSquares: roofAreaWithWasteM2 / SQUARE_METERS_PER_ROOFING_SQUARE,
    bundleCount: Math.ceil(roofAreaWithWasteM2 / bundleCoverageM2),
  };
}
