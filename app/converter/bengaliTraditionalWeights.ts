// Bangladesh/Batı Bengal'de tarim pazarlarinda hala kullanilan geleneksel
// agirlik birimleri (Mon/Maund, Ser/Seer, Chhatak, Tola). Zincir birbirine
// tam bolunur sekilde bagli (1 Mon = 40 Ser = 640 Chhatak = 3200 Tola),
// bu yuzden tek bir gram-bazli sabit tablo yeterli -- ayri "resmi" ve
// "gecerli" deger ayrimi gerekmiyor, tarihi Osmanli birimlerinin aksine.
export type BengaliWeightUnit = "mon" | "ser" | "chhatak" | "tola" | "kg" | "gram";

export const bengaliWeightUnitToGramFactor: Record<BengaliWeightUnit, number> = {
  gram: 1,
  tola: 11.6638,
  chhatak: 5 * 11.6638, // 58.319
  ser: 16 * 5 * 11.6638, // 933.104
  mon: 40 * 16 * 5 * 11.6638, // 37324.16
  kg: 1000,
};

export function convertBengaliWeight(
  value: number,
  fromUnit: BengaliWeightUnit,
  toUnit: BengaliWeightUnit
): number | null {
  if (!Number.isFinite(value) || value < 0) {
    return null;
  }

  const grams = value * bengaliWeightUnitToGramFactor[fromUnit];
  return grams / bengaliWeightUnitToGramFactor[toUnit];
}
