export type MembraneRollInput = {
  areaM2: number;
  rollWidthM: number;
  rollLengthM: number;
  sideLapCm: number;
  endLapCm: number;
  wastePercent: number;
};

export type MembraneRollResult = {
  effectiveCoveragePerRollM2: number;
  areaWithWasteM2: number;
  rollCount: number;
};

export function calculateMembraneRolls(input: MembraneRollInput): MembraneRollResult | null {
  const { areaM2, rollWidthM, rollLengthM, sideLapCm, endLapCm, wastePercent } = input;
  if (
    !Number.isFinite(areaM2) ||
    areaM2 <= 0 ||
    !Number.isFinite(rollWidthM) ||
    rollWidthM <= 0 ||
    !Number.isFinite(rollLengthM) ||
    rollLengthM <= 0 ||
    !Number.isFinite(sideLapCm) ||
    sideLapCm < 0 ||
    sideLapCm / 100 >= rollWidthM ||
    !Number.isFinite(endLapCm) ||
    endLapCm < 0 ||
    endLapCm / 100 >= rollLengthM ||
    !Number.isFinite(wastePercent) ||
    wastePercent < 0
  ) {
    return null;
  }

  const effectiveCoveragePerRollM2 =
    (rollWidthM - sideLapCm / 100) * (rollLengthM - endLapCm / 100);
  const areaWithWasteM2 = areaM2 * (1 + wastePercent / 100);
  if (!Number.isFinite(effectiveCoveragePerRollM2) || !Number.isFinite(areaWithWasteM2)) return null;

  const rollCount = Math.ceil(areaWithWasteM2 / effectiveCoveragePerRollM2);
  if (!Number.isSafeInteger(rollCount)) return null;

  return { effectiveCoveragePerRollM2, areaWithWasteM2, rollCount };
}
