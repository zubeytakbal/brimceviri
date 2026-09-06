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

export function calculateSolarPayback(input: SolarPaybackInput): SolarPaybackResult | null {
  const { systemSizeKwp, regionYieldKwhPerKwp, electricityPriceTlPerKwh, systemCostTl } = input;

  if (
    !Number.isFinite(systemSizeKwp) ||
    !Number.isFinite(regionYieldKwhPerKwp) ||
    !Number.isFinite(electricityPriceTlPerKwh) ||
    !Number.isFinite(systemCostTl) ||
    systemSizeKwp <= 0 ||
    regionYieldKwhPerKwp <= 0 ||
    electricityPriceTlPerKwh <= 0 ||
    systemCostTl < 0
  ) {
    return null;
  }

  const annualProductionKwh = systemSizeKwp * regionYieldKwhPerKwp;
  const annualSavingsTl = annualProductionKwh * electricityPriceTlPerKwh;
  const breakEvenYears =
    systemCostTl > 0 && annualSavingsTl > 0 ? systemCostTl / annualSavingsTl : null;

  return {
    annualProductionKwh,
    annualSavingsTl,
    breakEvenYears,
  };
}
