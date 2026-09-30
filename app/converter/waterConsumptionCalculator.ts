export type WaterConsumptionCalculatorInput = {
  consumptionM3: number;
  pricePerM3: number;
  fixedFee: number | null;
};

export type WaterConsumptionCalculatorResult = {
  totalCost: number;
  liters: number;
};

export function calculateWaterConsumption(
  input: WaterConsumptionCalculatorInput,
): WaterConsumptionCalculatorResult | null {
  const { consumptionM3, pricePerM3, fixedFee } = input;

  if (
    !Number.isFinite(consumptionM3) ||
    consumptionM3 <= 0 ||
    !Number.isFinite(pricePerM3) ||
    pricePerM3 < 0 ||
    (fixedFee !== null && (!Number.isFinite(fixedFee) || fixedFee < 0))
  ) {
    return null;
  }

  const safeFixedFee = fixedFee ?? 0;

  return {
    totalCost: consumptionM3 * pricePerM3 + safeFixedFee,
    liters: consumptionM3 * 1000,
  };
}
