export type IrrigationInput = {
  waterNeedMm: number;
  areaM2: number;
  systemFlowRateLPerHour: number;
};

export type IrrigationResult = {
  totalWaterLiters: number;
  durationMinutes: number;
};

// 1 mm su derinligi, 1 m2 alan uzerinde 1 litreye esittir (1mm = 0.001m,
// 0.001m x 1m2 = 0.001 m3 = 1 litre).
export function calculateIrrigationDuration(
  input: IrrigationInput
): IrrigationResult | null {
  const { waterNeedMm, areaM2, systemFlowRateLPerHour } = input;

  if (
    !Number.isFinite(waterNeedMm) ||
    waterNeedMm <= 0 ||
    !Number.isFinite(areaM2) ||
    areaM2 <= 0 ||
    !Number.isFinite(systemFlowRateLPerHour) ||
    systemFlowRateLPerHour <= 0
  ) {
    return null;
  }

  const totalWaterLiters = waterNeedMm * areaM2;
  const durationMinutes = (totalWaterLiters / systemFlowRateLPerHour) * 60;

  return { totalWaterLiters, durationMinutes };
}
