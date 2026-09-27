// Hindistan saha muhendisligi: donati celigi agirligi ve nominal karisimli
// beton icin cimento / kum / micir miktari (IS 456 nominal karisimlar).

export const STEEL_DENSITY_KG_M3 = 7850;
export const STANDARD_BAR_LENGTH_M = 12;
export const BAR_DIAMETERS_MM = [6, 8, 10, 12, 16, 20, 25, 28, 32, 36, 40] as const;

// Tam deger: pi/4 x d^2 x yogunluk. Sahada kullanilan D^2/162 bunun
// yuvarlanmis hali (7850 kg/m3 ile D^2 / 162.2).
export function barWeightPerMeter(diameterMm: number) {
  if (!Number.isFinite(diameterMm) || diameterMm <= 0) return null;
  return (Math.PI / 4) * (diameterMm / 1000) ** 2 * STEEL_DENSITY_KG_M3;
}

export function barWeightRuleOfThumb(diameterMm: number) {
  return (diameterMm * diameterMm) / 162;
}

export function steelWeight(input: { diameterMm: number; bars: number; lengthM: number }) {
  const perMeter = barWeightPerMeter(input.diameterMm);
  if (
    perMeter === null ||
    !Number.isFinite(input.bars) ||
    !Number.isFinite(input.lengthM) ||
    input.bars <= 0 ||
    input.lengthM <= 0
  ) {
    return null;
  }
  const totalLengthM = input.bars * input.lengthM;
  const totalKg = perMeter * totalLengthM;
  return {
    perMeter,
    perBar: perMeter * input.lengthM,
    totalLengthM,
    totalKg,
    tonnes: totalKg / 1000,
    // 12 m standart cubuk ile 1 tonda kac cubuk
    barsPerTonne: 1000 / (perMeter * STANDARD_BAR_LENGTH_M),
  };
}

export type ConcreteGrade = "M5" | "M7.5" | "M10" | "M15" | "M20" | "M25";

// cimento : kum : micir (IS 456 Tablo 9 nominal karisimlari, M25 icin
// sahada yaygin 1:1:2).
export const NOMINAL_MIXES: Record<ConcreteGrade, [number, number, number]> = {
  M5: [1, 5, 10],
  "M7.5": [1, 4, 8],
  M10: [1, 3, 6],
  M15: [1, 2, 4],
  M20: [1, 1.5, 3],
  M25: [1, 1, 2],
};

export const DRY_VOLUME_FACTOR = 1.54;
export const CEMENT_BULK_DENSITY = 1440; // kg/m3
export const CEMENT_BAG_KG = 50;
export const CUBIC_FEET_PER_M3 = 35.3146667;

export function concreteMaterials(input: {
  wetVolumeM3: number;
  grade: ConcreteGrade;
  waterCementRatio: number;
}) {
  if (!Number.isFinite(input.wetVolumeM3) || input.wetVolumeM3 <= 0) return null;
  const [cement, sand, aggregate] = NOMINAL_MIXES[input.grade];
  const parts = cement + sand + aggregate;
  const dryVolume = input.wetVolumeM3 * DRY_VOLUME_FACTOR;
  const cementM3 = (dryVolume * cement) / parts;
  const cementKg = cementM3 * CEMENT_BULK_DENSITY;
  const sandM3 = (dryVolume * sand) / parts;
  const aggregateM3 = (dryVolume * aggregate) / parts;
  const waterLitres = Number.isFinite(input.waterCementRatio) && input.waterCementRatio > 0
    ? cementKg * input.waterCementRatio
    : null;
  return {
    dryVolume,
    cementKg,
    cementBags: cementKg / CEMENT_BAG_KG,
    sandM3,
    sandCft: sandM3 * CUBIC_FEET_PER_M3,
    aggregateM3,
    aggregateCft: aggregateM3 * CUBIC_FEET_PER_M3,
    waterLitres,
  };
}
