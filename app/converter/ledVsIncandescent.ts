export type BulbEquivalent = { id: string; incandescentW: number; ledW: number };

// Akkor-LED esdeger guc tablosu: LEDrhythm/Ledvance/Pelsan kaynakli
// yaygin kabul goren esdegerlikler (ayni lumen ciktisi icin). 60W
// akkor ~800 lumen -> ~8-9W LED, 100W akkor ~1600 lumen -> ~16-18W LED
// araliklarindan temsili orta deger secilmistir.
export const bulbEquivalents: BulbEquivalent[] = [
  { id: "40w", incandescentW: 40, ledW: 6 },
  { id: "60w", incandescentW: 60, ledW: 9 },
  { id: "75w", incandescentW: 75, ledW: 12 },
  { id: "100w", incandescentW: 100, ledW: 17 },
];

export type LedSavingsInput = {
  bulbCount: number;
  dailyUsageHours: number;
  oldWattage: number;
  newWattage: number;
  electricityPriceTlPerKwh: number;
  ledTotalCostTl: number;
};

export type LedSavingsResult = {
  annualOldKwh: number;
  annualNewKwh: number;
  annualSavingsKwh: number;
  annualSavingsTl: number;
  breakEvenYears: number | null;
};

export type LightingEnergySavingInput = {
  bulbCount: number;
  dailyUsageHours: number;
  oldWattage: number;
  newWattage: number;
  electricityPricePerKwh: number;
  replacementCost: number;
};

export type LightingEnergySavingResult = {
  annualOldKwh: number;
  annualNewKwh: number;
  annualSavingsKwh: number;
  annualCostSaving: number;
  breakEvenYears: number | null;
};

// Shared country-neutral calculation. Language-specific pages choose their
// own labels, display currency and user-entered local price.
export function calculateLightingEnergySavings(
  input: LightingEnergySavingInput,
): LightingEnergySavingResult | null {
  const {
    bulbCount,
    dailyUsageHours,
    oldWattage,
    newWattage,
    electricityPricePerKwh,
    replacementCost,
  } = input;

  if (
    !Number.isFinite(bulbCount) ||
    !Number.isFinite(dailyUsageHours) ||
    !Number.isFinite(oldWattage) ||
    !Number.isFinite(newWattage) ||
    !Number.isFinite(electricityPricePerKwh) ||
    !Number.isFinite(replacementCost) ||
    bulbCount <= 0 ||
    dailyUsageHours <= 0 ||
    dailyUsageHours > 24 ||
    oldWattage <= 0 ||
    newWattage <= 0 ||
    electricityPricePerKwh <= 0 ||
    replacementCost < 0
  ) {
    return null;
  }

  const annualHours = dailyUsageHours * 365;
  const annualOldKwh = (bulbCount * oldWattage * annualHours) / 1000;
  const annualNewKwh = (bulbCount * newWattage * annualHours) / 1000;
  const annualSavingsKwh = annualOldKwh - annualNewKwh;
  const annualCostSaving = annualSavingsKwh * electricityPricePerKwh;

  return {
    annualOldKwh,
    annualNewKwh,
    annualSavingsKwh,
    annualCostSaving,
    breakEvenYears:
      replacementCost > 0 && annualCostSaving > 0
        ? replacementCost / annualCostSaving
        : null,
  };
}

export function calculateLedSavings(input: LedSavingsInput): LedSavingsResult | null {
  const result = calculateLightingEnergySavings({
    bulbCount: input.bulbCount,
    dailyUsageHours: input.dailyUsageHours,
    oldWattage: input.oldWattage,
    newWattage: input.newWattage,
    electricityPricePerKwh: input.electricityPriceTlPerKwh,
    replacementCost: input.ledTotalCostTl,
  });

  if (!result) return null;

  return {
    annualOldKwh: result.annualOldKwh,
    annualNewKwh: result.annualNewKwh,
    annualSavingsKwh: result.annualSavingsKwh,
    annualSavingsTl: result.annualCostSaving,
    breakEvenYears: result.breakEvenYears,
  };
}
