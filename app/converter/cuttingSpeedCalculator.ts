export function calculateRpmFromCuttingSpeed(
  cuttingSpeedMPerMin: number,
  diameterMm: number
): number | null {
  if (
    !Number.isFinite(cuttingSpeedMPerMin) ||
    cuttingSpeedMPerMin <= 0 ||
    !Number.isFinite(diameterMm) ||
    diameterMm <= 0
  ) {
    return null;
  }

  return (cuttingSpeedMPerMin * 1000) / (Math.PI * diameterMm);
}

export function calculateCuttingSpeedFromRpm(
  rpm: number,
  diameterMm: number
): number | null {
  if (!Number.isFinite(rpm) || rpm <= 0 || !Number.isFinite(diameterMm) || diameterMm <= 0) {
    return null;
  }

  return (rpm * Math.PI * diameterMm) / 1000;
}

export function calculateDiameterFromRpmAndSpeed(
  rpm: number,
  cuttingSpeedMPerMin: number
): number | null {
  if (
    !Number.isFinite(rpm) ||
    rpm <= 0 ||
    !Number.isFinite(cuttingSpeedMPerMin) ||
    cuttingSpeedMPerMin <= 0
  ) {
    return null;
  }

  return (cuttingSpeedMPerMin * 1000) / (Math.PI * rpm);
}
