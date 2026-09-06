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

export function calculateLedSavings(input: LedSavingsInput): LedSavingsResult | null {
  const {
    bulbCount,
    dailyUsageHours,
    oldWattage,
    newWattage,
    electricityPriceTlPerKwh,
    ledTotalCostTl,
  } = input;

  if (
    !Number.isFinite(bulbCount) ||
    !Number.isFinite(dailyUsageHours) ||
    !Number.isFinite(oldWattage) ||
    !Number.isFinite(newWattage) ||
    !Number.isFinite(electricityPriceTlPerKwh) ||
    !Number.isFinite(ledTotalCostTl) ||
    bulbCount <= 0 ||
    dailyUsageHours <= 0 ||
    dailyUsageHours > 24 ||
    oldWattage <= 0 ||
    newWattage <= 0 ||
    electricityPriceTlPerKwh <= 0 ||
    ledTotalCostTl < 0
  ) {
    return null;
  }

  const annualHours = dailyUsageHours * 365;
  const annualOldKwh = (bulbCount * oldWattage * annualHours) / 1000;
  const annualNewKwh = (bulbCount * newWattage * annualHours) / 1000;
  const annualSavingsKwh = annualOldKwh - annualNewKwh;
  const annualSavingsTl = annualSavingsKwh * electricityPriceTlPerKwh;

  const breakEvenYears =
    ledTotalCostTl > 0 && annualSavingsTl > 0 ? ledTotalCostTl / annualSavingsTl : null;

  return {
    annualOldKwh,
    annualNewKwh,
    annualSavingsKwh,
    annualSavingsTl,
    breakEvenYears,
  };
}
