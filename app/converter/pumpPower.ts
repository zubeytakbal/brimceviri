export type PumpPowerInput = { flowM3S: number; totalDynamicHeadM: number; densityKgM3: number; pumpEfficiency: number; motorEfficiency: number; };
export function calculatePumpPower(input: PumpPowerInput) {
  const { flowM3S, totalDynamicHeadM, densityKgM3, pumpEfficiency, motorEfficiency } = input;
  if (![flowM3S, totalDynamicHeadM, densityKgM3].every((value) => Number.isFinite(value) && value > 0) || ![pumpEfficiency, motorEfficiency].every((value) => Number.isFinite(value) && value > 0 && value <= 1)) return null;
  const hydraulicPowerW = densityKgM3 * 9.80665 * flowM3S * totalDynamicHeadM;
  const shaftPowerW = hydraulicPowerW / pumpEfficiency;
  return { hydraulicPowerW, shaftPowerW, electricalInputPowerW: shaftPowerW / motorEfficiency };
}
