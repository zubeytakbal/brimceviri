// Egik atis (ve ozel durumu olan yatay atis) hareketi hesaplayicisi.
// Baslangic yuksekligi (h0) sifirdan farkli girilirse ve aci sifir
// olarak birakilirsa, aynen "yatay atis" formullerine indirgenir --
// tek bir hesaplayici iki klasik konuyu da (egik atis + yatay atis)
// dogal olarak kapsar.

const GRAVITY = 9.81; // m/s^2, standart yerçekimi ivmesi

export type ProjectileMotionInput = {
  initialVelocityMs: number;
  launchAngleDegrees: number;
  initialHeightM: number;
};

export type ProjectileMotionResult = {
  flightTimeS: number;
  rangeM: number;
  maxHeightM: number;
  horizontalVelocityMs: number;
  verticalVelocityMs: number;
};

export function calculateProjectileMotion(
  input: ProjectileMotionInput,
): ProjectileMotionResult | null {
  const { initialVelocityMs, launchAngleDegrees, initialHeightM } = input;

  if (
    !Number.isFinite(initialVelocityMs) ||
    initialVelocityMs <= 0 ||
    !Number.isFinite(launchAngleDegrees) ||
    launchAngleDegrees < 0 ||
    launchAngleDegrees > 90 ||
    !Number.isFinite(initialHeightM) ||
    initialHeightM < 0
  ) {
    return null;
  }

  const angleRad = (launchAngleDegrees * Math.PI) / 180;
  const vx0 = initialVelocityMs * Math.cos(angleRad);
  const vy0 = initialVelocityMs * Math.sin(angleRad);

  // y(t) = h0 + vy0*t - 0.5*g*t^2 = 0 -> t = [vy0 + sqrt(vy0^2 + 2*g*h0)] / g
  const flightTimeS =
    (vy0 + Math.sqrt(vy0 * vy0 + 2 * GRAVITY * initialHeightM)) / GRAVITY;

  const rangeM = vx0 * flightTimeS;
  const maxHeightM = initialHeightM + (vy0 * vy0) / (2 * GRAVITY);

  return {
    flightTimeS,
    rangeM,
    maxHeightM,
    horizontalVelocityMs: vx0,
    verticalVelocityMs: vy0,
  };
}
