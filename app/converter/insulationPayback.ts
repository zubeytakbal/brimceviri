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

export type InsulationPaybackEstimateInput = {
  wallAreaM2: number;
  existingWallThicknessCm: number;
  existingWallConductivityWmK: number;
  insulationThicknessCm: number;
  insulationConductivityWmK: number;
  avgTempDifferenceC: number;
  heatingDaysPerYear: number;
  heatingEnergyPricePerKwh: number;
  insulationCost: number;
};

export type InsulationPaybackEstimateResult = {
  annualHeatLossKwhBefore: number;
  annualHeatLossKwhAfter: number;
  annualSavingsKwh: number;
  annualCostSaving: number;
  breakEvenYears: number | null;
};

export function calculateInsulationPaybackEstimate(
  input: InsulationPaybackEstimateInput,
): InsulationPaybackEstimateResult | null {
  const values = Object.values(input);
  if (values.some((value) => !Number.isFinite(value))) return null;
  if (
    input.wallAreaM2 <= 0 || input.existingWallThicknessCm <= 0 ||
    input.existingWallConductivityWmK <= 0 || input.insulationThicknessCm <= 0 ||
    input.insulationConductivityWmK <= 0 || input.avgTempDifferenceC <= 0 ||
    input.heatingDaysPerYear <= 0 || input.heatingEnergyPricePerKwh <= 0 ||
    input.insulationCost < 0
  ) return null;

  const rExisting = input.existingWallThicknessCm / 100 / input.existingWallConductivityWmK;
  const rAdded = input.insulationThicknessCm / 100 / input.insulationConductivityWmK;
  const heatingHours = input.heatingDaysPerYear * 24;
  const annualHeatLossKwhBefore = (input.wallAreaM2 * input.avgTempDifferenceC / rExisting * heatingHours) / 1000;
  const annualHeatLossKwhAfter = (input.wallAreaM2 * input.avgTempDifferenceC / (rExisting + rAdded) * heatingHours) / 1000;
  const annualSavingsKwh = annualHeatLossKwhBefore - annualHeatLossKwhAfter;
  const annualCostSaving = annualSavingsKwh * input.heatingEnergyPricePerKwh;

  return { annualHeatLossKwhBefore, annualHeatLossKwhAfter, annualSavingsKwh, annualCostSaving, breakEvenYears: input.insulationCost > 0 && annualCostSaving > 0 ? input.insulationCost / annualCostSaving : null };
}

export function calculateInsulationPayback(
  input: InsulationPaybackInput
): InsulationPaybackResult | null {
  const result = calculateInsulationPaybackEstimate({
    ...input,
    heatingEnergyPricePerKwh: input.heatingEnergyPriceTlPerKwh,
    insulationCost: input.insulationCostTl,
  });
  if (!result) return null;

  return {
    annualHeatLossKwhBefore: result.annualHeatLossKwhBefore,
    annualHeatLossKwhAfter: result.annualHeatLossKwhAfter,
    annualSavingsKwh: result.annualSavingsKwh,
    annualSavingsTl: result.annualCostSaving,
    breakEvenYears: result.breakEvenYears,
  };
}
