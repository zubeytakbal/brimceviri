export type SeedRateInput = {
  targetPlantsPerM2: number;
  thousandGrainWeightG: number;
  germinationPercent: number;
  purityPercent: number;
  areaDa: number;
};

export type SeedRateResult = {
  seedKgPerDa: number;
  totalSeedKg: number;
};

// Standart tarim uygulamasi formulu: bin dane agirligi (TDW), hedef bitki
// yogunlugu, cimlenme ve saflik oranlarindan dekara gereken tohumluk
// miktarini (kg/da) hesaplar.
export function calculateSeedRate(input: SeedRateInput): SeedRateResult | null {
  const { targetPlantsPerM2, thousandGrainWeightG, germinationPercent, purityPercent, areaDa } =
    input;

  if (
    !Number.isFinite(targetPlantsPerM2) ||
    targetPlantsPerM2 <= 0 ||
    !Number.isFinite(thousandGrainWeightG) ||
    thousandGrainWeightG <= 0 ||
    !Number.isFinite(germinationPercent) ||
    germinationPercent <= 0 ||
    germinationPercent > 100 ||
    !Number.isFinite(purityPercent) ||
    purityPercent <= 0 ||
    purityPercent > 100 ||
    !Number.isFinite(areaDa) ||
    areaDa <= 0
  ) {
    return null;
  }

  const germinationFraction = germinationPercent / 100;
  const purityFraction = purityPercent / 100;

  const seedKgPerDa =
    (targetPlantsPerM2 * thousandGrainWeightG) /
    (germinationFraction * purityFraction * 1000);

  return {
    seedKgPerDa,
    totalSeedKg: seedKgPerDa * areaDa,
  };
}
