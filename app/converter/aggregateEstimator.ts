export type AggregateEstimateInput = {
  lengthM: number;
  widthM: number;
  depthM: number;
  wastePercent: number;
  bulkDensityKgM3: number;
};

export type AggregateEstimate = {
  volumeM3: number;
  volumeWithWasteM3: number;
  weightKg: number;
};

export function calculateAggregateEstimate(
  input: AggregateEstimateInput
): AggregateEstimate | null {
  const {
    lengthM,
    widthM,
    depthM,
    wastePercent,
    bulkDensityKgM3,
  } = input;

  if (
    !(lengthM > 0) ||
    !(widthM > 0) ||
    !(depthM > 0) ||
    !(bulkDensityKgM3 > 0) ||
    !Number.isFinite(wastePercent) ||
    wastePercent < 0
  ) {
    return null;
  }

  const volumeM3 = lengthM * widthM * depthM;
  const volumeWithWasteM3 = volumeM3 * (1 + wastePercent / 100);

  return {
    volumeM3,
    volumeWithWasteM3,
    weightKg: volumeWithWasteM3 * bulkDensityKgM3,
  };
}
