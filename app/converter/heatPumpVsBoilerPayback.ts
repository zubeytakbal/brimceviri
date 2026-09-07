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

export function calculateHeatPumpVsBoilerPayback(
  input: HeatPumpVsBoilerInput,
): HeatPumpVsBoilerResult | null {
  const {
    gasPriceTlPerM3,
    boilerEfficiencyPercent,
    electricityPriceTlPerKwh,
    heatPumpCop,
    annualHeatNeedKwh,
    initialCostDifferenceTl,
  } = input;

  if (
    !Number.isFinite(gasPriceTlPerM3) ||
    gasPriceTlPerM3 <= 0 ||
    !Number.isFinite(boilerEfficiencyPercent) ||
    boilerEfficiencyPercent <= 0 ||
    boilerEfficiencyPercent > 100 ||
    !Number.isFinite(electricityPriceTlPerKwh) ||
    electricityPriceTlPerKwh <= 0 ||
    !Number.isFinite(heatPumpCop) ||
    heatPumpCop <= 0 ||
    !Number.isFinite(annualHeatNeedKwh) ||
    annualHeatNeedKwh <= 0 ||
    !Number.isFinite(initialCostDifferenceTl) ||
    initialCostDifferenceTl <= 0
  ) {
    return null;
  }

  const gasCostPerKwhHeat =
    gasPriceTlPerM3 / GAS_KWH_PER_M3 / (boilerEfficiencyPercent / 100);
  const heatPumpCostPerKwhHeat = electricityPriceTlPerKwh / heatPumpCop;

  const cheaperOption: "gas" | "heatPump" =
    gasCostPerKwhHeat < heatPumpCostPerKwhHeat ? "gas" : "heatPump";

  const annualGasCostTl = gasCostPerKwhHeat * annualHeatNeedKwh;
  const annualHeatPumpCostTl = heatPumpCostPerKwhHeat * annualHeatNeedKwh;
  const annualSavingsTl = annualGasCostTl - annualHeatPumpCostTl;

  const breakEvenYears =
    annualSavingsTl > 0 ? initialCostDifferenceTl / annualSavingsTl : null;

  return {
    gasCostPerKwhHeat,
    heatPumpCostPerKwhHeat,
    cheaperOption,
    annualGasCostTl,
    annualHeatPumpCostTl,
    annualSavingsTl,
    breakEvenYears,
  };
}
