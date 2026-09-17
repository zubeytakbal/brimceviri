export type SolarRegion = { id: string; label: string; yieldKwhPerKwp: number };

// Bolgesel verim katsayilari (kWh/kWp/yil), Turkiye gunes enerjisi
// potansiyeli haritalarindan (Akdeniz/Guneydogu en yuksek, Karadeniz
// en dusuk) temsili orta degerler olarak secilmistir.
export const solarRegions: SolarRegion[] = [
  { id: "mediterranean", label: "Akdeniz / Güneydoğu Anadolu", yieldKwhPerKwp: 1700 },
  { id: "aegean-central", label: "Ege / İç Anadolu", yieldKwhPerKwp: 1550 },
  { id: "marmara", label: "Marmara", yieldKwhPerKwp: 1400 },
  { id: "blacksea", label: "Karadeniz", yieldKwhPerKwp: 1250 },
];

export type SolarPaybackInput = {
  systemSizeKwp: number;
  regionYieldKwhPerKwp: number;
  electricityPriceTlPerKwh: number;
  systemCostTl: number;
};

export type SolarPaybackResult = {
  annualProductionKwh: number;
  annualSavingsTl: number;
  breakEvenYears: number | null;
};

export type SolarPaybackEstimateInput = {
  systemSizeKwp: number;
  annualYieldKwhPerKwp: number;
  selfConsumptionPercent: number;
  importedElectricityPricePerKwh: number;
  exportElectricityPricePerKwh: number;
  systemCost: number;
};

export type SolarPaybackEstimateResult = {
  annualProductionKwh: number;
  selfConsumedKwh: number;
  exportedKwh: number;
  annualValue: number;
  breakEvenYears: number | null;
};

export function calculateSolarPaybackEstimate(input: SolarPaybackEstimateInput): SolarPaybackEstimateResult | null {
  if (Object.values(input).some((value) => !Number.isFinite(value)) || input.systemSizeKwp <= 0 || input.annualYieldKwhPerKwp <= 0 || input.selfConsumptionPercent < 0 || input.selfConsumptionPercent > 100 || input.importedElectricityPricePerKwh < 0 || input.exportElectricityPricePerKwh < 0 || input.systemCost < 0) return null;
  const annualProductionKwh = input.systemSizeKwp * input.annualYieldKwhPerKwp;
  const selfConsumedKwh = annualProductionKwh * input.selfConsumptionPercent / 100;
  const exportedKwh = annualProductionKwh - selfConsumedKwh;
  const annualValue = selfConsumedKwh * input.importedElectricityPricePerKwh + exportedKwh * input.exportElectricityPricePerKwh;
  return { annualProductionKwh, selfConsumedKwh, exportedKwh, annualValue, breakEvenYears: input.systemCost > 0 && annualValue > 0 ? input.systemCost / annualValue : null };
}

export function calculateSolarPayback(input: SolarPaybackInput): SolarPaybackResult | null {
  const result = calculateSolarPaybackEstimate({ systemSizeKwp: input.systemSizeKwp, annualYieldKwhPerKwp: input.regionYieldKwhPerKwp, selfConsumptionPercent: 100, importedElectricityPricePerKwh: input.electricityPriceTlPerKwh, exportElectricityPricePerKwh: 0, systemCost: input.systemCostTl });
  if (!result) return null;

  return {
    annualProductionKwh: result.annualProductionKwh,
    annualSavingsTl: result.annualValue,
    breakEvenYears: result.breakEvenYears,
  };
}
