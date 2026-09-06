// Seyir suresi hesaplama -- klasik navigasyon formulu: Sure = Mesafe / Hiz.
// Deniz mili ve knot birbiriyle dogrudan uyumludur (1 knot = 1 deniz
// mili/saat), bu yuzden pilot ve gemi kaptanlarinin en sik kullandigi
// hesap budur. Metrik ve mil bazli birimler de desteklenir.

export type DistanceUnit = "nm" | "km" | "mi";
export type SpeedUnit = "knot" | "km-h" | "mph";

const distanceToMetres: Record<DistanceUnit, number> = {
  nm: 1852,
  km: 1000,
  mi: 1609.344,
};

const speedToMetresPerSecond: Record<SpeedUnit, number> = {
  knot: 1852 / 3600,
  "km-h": 1000 / 3600,
  mph: 1609.344 / 3600,
};

export type TransitTimeInput = {
  distanceValue: number;
  distanceUnit: DistanceUnit;
  speedValue: number;
  speedUnit: SpeedUnit;
};

export type TransitTimeResult = {
  totalHours: number;
  hours: number;
  minutes: number;
};

export function calculateTransitTime(
  input: TransitTimeInput
): TransitTimeResult | null {
  const { distanceValue, distanceUnit, speedValue, speedUnit } = input;

  if (
    !Number.isFinite(distanceValue) ||
    distanceValue <= 0 ||
    !Number.isFinite(speedValue) ||
    speedValue <= 0
  ) {
    return null;
  }

  const distanceMetres = distanceValue * distanceToMetres[distanceUnit];
  const speedMetresPerSecond = speedValue * speedToMetresPerSecond[speedUnit];
  const totalSeconds = distanceMetres / speedMetresPerSecond;
  const totalHours = totalSeconds / 3600;

  const hours = Math.floor(totalHours);
  const minutes = Math.round((totalHours - hours) * 60);

  return { totalHours, hours, minutes };
}
