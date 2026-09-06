// EPDK dogalgaz faturalandirma tebligine gore standart deger: 1 Sm3
// dogalgaz = 10,64 kWh enerji icerigi. Bu resmi/sabit bir donusum
// katsayisidir (fiyat degil), bu yuzden guvenle sabitlenebilir.
export const GAS_KWH_PER_M3 = 10.64;

export type BoilerEfficiencyOption = { id: string; label: string; efficiencyPercent: number };

// Yogusmali/yogusmasiz kombi verimleri, sektorde yaygin kabul goren
// tipik degerlerdir (yogusmali ~90-95%, yogusmasiz/konvansiyonel
// ~70-85%). Alt isil deger (LHV) bazinda ifade edilir.
export const boilerEfficiencyOptions: BoilerEfficiencyOption[] = [
  { id: "condensing", label: "Yoğuşmalı Kombi (~%92)", efficiencyPercent: 92 },
  { id: "conventional", label: "Yoğuşmasız (Konvansiyonel) Kombi (~%80)", efficiencyPercent: 80 },
];

export type HeatingCostInput = {
  gasPriceTlPerM3: number;
  boilerEfficiencyPercent: number;
  electricityPriceTlPerKwh: number;
  acScop: number;
  annualHeatNeedKwh: number;
};

export type HeatingCostResult = {
  gasCostPerKwhHeat: number;
  acCostPerKwhHeat: number;
  cheaperOption: "gas" | "ac";
  percentCheaper: number;
  annualGasCostTl: number | null;
  annualAcCostTl: number | null;
  annualDifferenceTl: number | null;
};

export function calculateHeatingCostComparison(
  input: HeatingCostInput
): HeatingCostResult | null {
  const {
    gasPriceTlPerM3,
    boilerEfficiencyPercent,
    electricityPriceTlPerKwh,
    acScop,
    annualHeatNeedKwh,
  } = input;

  if (
    !Number.isFinite(gasPriceTlPerM3) ||
    !Number.isFinite(boilerEfficiencyPercent) ||
    !Number.isFinite(electricityPriceTlPerKwh) ||
    !Number.isFinite(acScop) ||
    !Number.isFinite(annualHeatNeedKwh) ||
    gasPriceTlPerM3 <= 0 ||
    boilerEfficiencyPercent <= 0 ||
    boilerEfficiencyPercent > 100 ||
    electricityPriceTlPerKwh <= 0 ||
    acScop <= 0 ||
    annualHeatNeedKwh < 0
  ) {
    return null;
  }

  const gasCostPerKwhHeat =
    gasPriceTlPerM3 / GAS_KWH_PER_M3 / (boilerEfficiencyPercent / 100);
  const acCostPerKwhHeat = electricityPriceTlPerKwh / acScop;

  const cheaperOption: "gas" | "ac" = gasCostPerKwhHeat < acCostPerKwhHeat ? "gas" : "ac";
  const higher = Math.max(gasCostPerKwhHeat, acCostPerKwhHeat);
  const lower = Math.min(gasCostPerKwhHeat, acCostPerKwhHeat);
  const percentCheaper = ((higher - lower) / higher) * 100;

  const hasAnnualNeed = annualHeatNeedKwh > 0;
  const annualGasCostTl = hasAnnualNeed ? gasCostPerKwhHeat * annualHeatNeedKwh : null;
  const annualAcCostTl = hasAnnualNeed ? acCostPerKwhHeat * annualHeatNeedKwh : null;
  const annualDifferenceTl =
    annualGasCostTl !== null && annualAcCostTl !== null
      ? Math.abs(annualGasCostTl - annualAcCostTl)
      : null;

  return {
    gasCostPerKwhHeat,
    acCostPerKwhHeat,
    cheaperOption,
    percentCheaper,
    annualGasCostTl,
    annualAcCostTl,
    annualDifferenceTl,
  };
}
