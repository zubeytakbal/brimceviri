import { GAS_KWH_PER_M3 } from "./heatingCostComparison";

// Isi pompasi COP (Performans Katsayisi) degerleri, havadan-havaya
// veya havadan-suya sistemlerde tipik olarak 3.0-5.0 araligindadir
// (klimalarin SCOP degerine benzer ama genelde daha yuksek, cunku
// dedike sistemler daha verimli calisir). Varsayilan olarak bu
// araligin ortasina yakin, sik atifta bulunulan bir deger secildi.
export const heatPumpDefaults = {
  heatPumpCop: 3.8,
};

export type HeatPumpVsBoilerInput = {
  gasPriceTlPerM3: number;
  boilerEfficiencyPercent: number;
  electricityPriceTlPerKwh: number;
  heatPumpCop: number;
  annualHeatNeedKwh: number;
  initialCostDifferenceTl: number;
};

export type HeatPumpVsBoilerResult = {
  gasCostPerKwhHeat: number;
  heatPumpCostPerKwhHeat: number;
  cheaperOption: "gas" | "heatPump";
  annualGasCostTl: number;
  annualHeatPumpCostTl: number;
  annualSavingsTl: number;
  breakEvenYears: number | null;
};

export type HeatingSystemComparisonInput = {
  fuelCostPerKwhFuel: number;
  boilerEfficiencyPercent: number;
  electricityPricePerKwh: number;
  heatPumpCop: number;
  annualHeatNeedKwh: number;
  initialCostDifference: number;
};

export type HeatingSystemComparisonResult = {
  fuelCostPerKwhHeat: number;
  heatPumpCostPerKwhHeat: number;
  cheaperOption: "fuel" | "heatPump";
  annualFuelCost: number;
  annualHeatPumpCost: number;
  annualSaving: number;
  breakEvenYears: number | null;
};

export function calculateHeatingSystemComparison(
  input: HeatingSystemComparisonInput,
): HeatingSystemComparisonResult | null {
  if (
    Object.values(input).some((value) => !Number.isFinite(value)) ||
    input.fuelCostPerKwhFuel <= 0 || input.boilerEfficiencyPercent <= 0 ||
    input.boilerEfficiencyPercent > 100 || input.electricityPricePerKwh <= 0 ||
    input.heatPumpCop <= 0 || input.annualHeatNeedKwh <= 0 ||
    input.initialCostDifference < 0
  ) return null;
  const fuelCostPerKwhHeat = input.fuelCostPerKwhFuel / (input.boilerEfficiencyPercent / 100);
  const heatPumpCostPerKwhHeat = input.electricityPricePerKwh / input.heatPumpCop;
  const annualFuelCost = fuelCostPerKwhHeat * input.annualHeatNeedKwh;
  const annualHeatPumpCost = heatPumpCostPerKwhHeat * input.annualHeatNeedKwh;
  const annualSaving = annualFuelCost - annualHeatPumpCost;
  return { fuelCostPerKwhHeat, heatPumpCostPerKwhHeat, cheaperOption: fuelCostPerKwhHeat < heatPumpCostPerKwhHeat ? "fuel" : "heatPump", annualFuelCost, annualHeatPumpCost, annualSaving, breakEvenYears: input.initialCostDifference > 0 && annualSaving > 0 ? input.initialCostDifference / annualSaving : null };
}

export function calculateHeatPumpVsBoilerPayback(
  input: HeatPumpVsBoilerInput,
): HeatPumpVsBoilerResult | null {
  const result = calculateHeatingSystemComparison({
    fuelCostPerKwhFuel: input.gasPriceTlPerM3 / GAS_KWH_PER_M3,
    boilerEfficiencyPercent: input.boilerEfficiencyPercent,
    electricityPricePerKwh: input.electricityPriceTlPerKwh,
    heatPumpCop: input.heatPumpCop,
    annualHeatNeedKwh: input.annualHeatNeedKwh,
    initialCostDifference: input.initialCostDifferenceTl,
  });
  if (!result) return null;

  return {
    gasCostPerKwhHeat: result.fuelCostPerKwhHeat,
    heatPumpCostPerKwhHeat: result.heatPumpCostPerKwhHeat,
    cheaperOption: result.cheaperOption === "fuel" ? "gas" : "heatPump",
    annualGasCostTl: result.annualFuelCost,
    annualHeatPumpCostTl: result.annualHeatPumpCost,
    annualSavingsTl: result.annualSaving,
    breakEvenYears: result.breakEvenYears,
  };
}
