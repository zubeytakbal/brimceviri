// Mesken elektrik tarifesi EPDK karariyla degisir ama takvimi asgari
// ucret gibi net/tek bir tarihe bagli degil (kaynaklar celisiyor: kimi
// "3 ayda bir" diyor, somut ornekler yillik gibi duruyor) -- bu yuzden
// "siradaki guncelleme" tahmini VERMIYORUZ, sadece gecmise donuk "son
// guncelleme" bilgisini gosteriyoruz. Deger: 240 kWh/ay ustu dilim,
// KDV dahil (EV sarji yapan bir hane genelde bu dilime girer).
export const manualElectricityPriceDefault = {
  priceTl: 4.86,
  lastUpdatedLabel: "Eylül 2026",
};

export type EvVsIceInput = {
  annualKm: number;
  iceConsumptionPer100Km: number;
  gasolinePriceTl: number;
  evConsumptionPer100Km: number;
  electricityPriceTl: number;
  priceDifferenceTl: number;
};

export type EvVsIceResult = {
  annualGasolineCostTl: number;
  annualElectricityCostTl: number;
  annualSavingsTl: number;
  breakEvenYears: number | null;
  breakEvenKm: number | null;
};

// Currency and country neutral core used by language-specific interfaces.
// Consumers provide their own price and consumption units; the calculation
// deliberately has no tariff, fuel-price or currency assumption.
export type VehicleRunningCostInput = {
  annualDistance: number;
  fuelUnitsPer100Distance: number;
  fuelPricePerUnit: number;
  evEnergyUnitsPer100Distance: number;
  electricityPricePerUnit: number;
  purchasePremium: number;
};

export type VehicleRunningCostResult = {
  annualFuelCost: number;
  annualElectricityCost: number;
  annualOperatingSavings: number;
  breakEvenYears: number | null;
  breakEvenDistance: number | null;
};

export function calculateVehicleRunningCostComparison(
  input: VehicleRunningCostInput,
): VehicleRunningCostResult | null {
  const {
    annualDistance,
    fuelUnitsPer100Distance,
    fuelPricePerUnit,
    evEnergyUnitsPer100Distance,
    electricityPricePerUnit,
    purchasePremium,
  } = input;

  if (
    !Number.isFinite(annualDistance) ||
    !Number.isFinite(fuelUnitsPer100Distance) ||
    !Number.isFinite(fuelPricePerUnit) ||
    !Number.isFinite(evEnergyUnitsPer100Distance) ||
    !Number.isFinite(electricityPricePerUnit) ||
    !Number.isFinite(purchasePremium) ||
    annualDistance <= 0 ||
    fuelUnitsPer100Distance <= 0 ||
    fuelPricePerUnit <= 0 ||
    evEnergyUnitsPer100Distance <= 0 ||
    electricityPricePerUnit <= 0 ||
    purchasePremium < 0
  ) {
    return null;
  }

  const annualFuelCost =
    annualDistance * (fuelUnitsPer100Distance / 100) * fuelPricePerUnit;
  const annualElectricityCost =
    annualDistance *
    (evEnergyUnitsPer100Distance / 100) *
    electricityPricePerUnit;
  const annualOperatingSavings = annualFuelCost - annualElectricityCost;
  const breakEvenYears =
    purchasePremium > 0 && annualOperatingSavings > 0
      ? purchasePremium / annualOperatingSavings
      : null;

  return {
    annualFuelCost,
    annualElectricityCost,
    annualOperatingSavings,
    breakEvenYears,
    breakEvenDistance:
      breakEvenYears === null ? null : breakEvenYears * annualDistance,
  };
}

export function calculateEvVsIceComparison(input: EvVsIceInput): EvVsIceResult | null {
  const result = calculateVehicleRunningCostComparison({
    annualDistance: input.annualKm,
    fuelUnitsPer100Distance: input.iceConsumptionPer100Km,
    fuelPricePerUnit: input.gasolinePriceTl,
    evEnergyUnitsPer100Distance: input.evConsumptionPer100Km,
    electricityPricePerUnit: input.electricityPriceTl,
    purchasePremium: input.priceDifferenceTl,
  });

  if (!result) return null;

  return {
    annualGasolineCostTl: result.annualFuelCost,
    annualElectricityCostTl: result.annualElectricityCost,
    annualSavingsTl: result.annualOperatingSavings,
    breakEvenYears: result.breakEvenYears,
    breakEvenKm: result.breakEvenDistance,
  };
}
