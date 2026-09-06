export type WallMaterial = { id: string; label: string; conductivityWmK: number };

// Duvar malzemeleri: delikli tugla ve gazbeton degerleri TS 825
// kapsaminda yayinlanan tipik lambda araliklarindan (delikli tugla
// 0,33-0,45; gazbeton 0,085-0,30 W/mK) representatif deger olarak
// secilmistir. Beton ve ahsap, heatConduction.ts'teki degerlerle
// tutarlidir (fiziksel sabitler, iki dosyada ayni sayi tekrar eder).
export const wallMaterials: WallMaterial[] = [
  { id: "brick", label: "Tuğla (delikli)", conductivityWmK: 0.4 },
  { id: "aerated-concrete", label: "Gazbeton", conductivityWmK: 0.16 },
  { id: "concrete", label: "Beton", conductivityWmK: 1.4 },
  { id: "wood", label: "Ahşap", conductivityWmK: 0.13 },
];

export type InsulationMaterial = { id: string; label: string; conductivityWmK: number };

export const insulationMaterials: InsulationMaterial[] = [
  { id: "glassWool", label: "Cam Yünü", conductivityWmK: 0.035 },
  { id: "rockWool", label: "Taş Yünü", conductivityWmK: 0.04 },
  { id: "eps", label: "EPS (Genişletilmiş Polistiren)", conductivityWmK: 0.038 },
  { id: "xps", label: "XPS (Ekstrüde Polistiren)", conductivityWmK: 0.035 },
  { id: "pur", label: "Poliüretan Köpük (PUR)", conductivityWmK: 0.028 },
];

export type InsulationPaybackInput = {
  wallAreaM2: number;
  existingWallThicknessCm: number;
  existingWallConductivityWmK: number;
  insulationThicknessCm: number;
  insulationConductivityWmK: number;
  avgTempDifferenceC: number;
  heatingDaysPerYear: number;
  heatingEnergyPriceTlPerKwh: number;
  insulationCostTl: number;
};

export type InsulationPaybackResult = {
  annualHeatLossKwhBefore: number;
  annualHeatLossKwhAfter: number;
  annualSavingsKwh: number;
  annualSavingsTl: number;
  breakEvenYears: number | null;
};

export function calculateInsulationPayback(
  input: InsulationPaybackInput
): InsulationPaybackResult | null {
  const {
    wallAreaM2,
    existingWallThicknessCm,
    existingWallConductivityWmK,
    insulationThicknessCm,
    insulationConductivityWmK,
    avgTempDifferenceC,
    heatingDaysPerYear,
    heatingEnergyPriceTlPerKwh,
    insulationCostTl,
  } = input;

  const values = [
    wallAreaM2,
    existingWallThicknessCm,
    existingWallConductivityWmK,
    insulationThicknessCm,
    insulationConductivityWmK,
    avgTempDifferenceC,
    heatingDaysPerYear,
    heatingEnergyPriceTlPerKwh,
    insulationCostTl,
  ];

  if (values.some((value) => !Number.isFinite(value))) return null;
  if (
    wallAreaM2 <= 0 ||
    existingWallThicknessCm <= 0 ||
    existingWallConductivityWmK <= 0 ||
    insulationThicknessCm <= 0 ||
    insulationConductivityWmK <= 0 ||
    avgTempDifferenceC <= 0 ||
    heatingDaysPerYear <= 0 ||
    heatingEnergyPriceTlPerKwh <= 0 ||
    insulationCostTl < 0
  ) {
    return null;
  }

  const rExisting = existingWallThicknessCm / 100 / existingWallConductivityWmK;
  const rAdded = insulationThicknessCm / 100 / insulationConductivityWmK;
  const rTotal = rExisting + rAdded;

  const heatLossBeforeW = (wallAreaM2 * avgTempDifferenceC) / rExisting;
  const heatLossAfterW = (wallAreaM2 * avgTempDifferenceC) / rTotal;
  const heatingHours = heatingDaysPerYear * 24;

  const annualHeatLossKwhBefore = (heatLossBeforeW * heatingHours) / 1000;
  const annualHeatLossKwhAfter = (heatLossAfterW * heatingHours) / 1000;
  const annualSavingsKwh = annualHeatLossKwhBefore - annualHeatLossKwhAfter;
  const annualSavingsTl = annualSavingsKwh * heatingEnergyPriceTlPerKwh;

  const breakEvenYears =
    insulationCostTl > 0 && annualSavingsTl > 0 ? insulationCostTl / annualSavingsTl : null;

  return {
    annualHeatLossKwhBefore,
    annualHeatLossKwhAfter,
    annualSavingsKwh,
    annualSavingsTl,
    breakEvenYears,
  };
}
