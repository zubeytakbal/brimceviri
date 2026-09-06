// Buhar basinci hesaplama -- Clausius-Clapeyron denklemi:
// ln(P2/P1) = -(dHvap/R) x (1/T2 - 1/T1). Sicakliklar Kelvin cinsinden
// olmalidir. R = 8.314 J/(mol*K).

export const GAS_CONSTANT = 8.314;

export type VaporPressureTarget = "p2" | "t2" | "dHvap";

export type VaporPressureInput = {
  target: VaporPressureTarget;
  p1: number;
  t1Kelvin: number;
  p2: number;
  t2Kelvin: number;
  dHvapJoulePerMol: number;
};

export type VaporPressureResult = {
  p1: number;
  t1Kelvin: number;
  p2: number;
  t2Kelvin: number;
  dHvapJoulePerMol: number;
};

export function calculateVaporPressure(
  input: VaporPressureInput
): VaporPressureResult | null {
  const { target, p1, t1Kelvin, p2, t2Kelvin, dHvapJoulePerMol } = input;

  if (!Number.isFinite(p1) || p1 <= 0) {
    return null;
  }

  if (!Number.isFinite(t1Kelvin) || t1Kelvin <= 0) {
    return null;
  }

  if (target === "p2") {
    if (!Number.isFinite(t2Kelvin) || t2Kelvin <= 0) {
      return null;
    }

    if (!Number.isFinite(dHvapJoulePerMol) || dHvapJoulePerMol <= 0) {
      return null;
    }

    const computedP2 =
      p1 *
      Math.exp(
        (-dHvapJoulePerMol / GAS_CONSTANT) * (1 / t2Kelvin - 1 / t1Kelvin)
      );

    return { p1, t1Kelvin, p2: computedP2, t2Kelvin, dHvapJoulePerMol };
  }

  if (target === "t2") {
    if (!Number.isFinite(p2) || p2 <= 0) {
      return null;
    }

    if (!Number.isFinite(dHvapJoulePerMol) || dHvapJoulePerMol <= 0) {
      return null;
    }

    const inverseT2 =
      1 / t1Kelvin - (GAS_CONSTANT * Math.log(p2 / p1)) / dHvapJoulePerMol;

    if (inverseT2 <= 0) {
      return null;
    }

    const computedT2 = 1 / inverseT2;

    return { p1, t1Kelvin, p2, t2Kelvin: computedT2, dHvapJoulePerMol };
  }

  if (!Number.isFinite(p2) || p2 <= 0) {
    return null;
  }

  if (!Number.isFinite(t2Kelvin) || t2Kelvin <= 0) {
    return null;
  }

  const diff = 1 / t2Kelvin - 1 / t1Kelvin;

  if (diff === 0) {
    return null;
  }

  const computedDHvap = (-GAS_CONSTANT * Math.log(p2 / p1)) / diff;

  return { p1, t1Kelvin, p2, t2Kelvin, dHvapJoulePerMol: computedDHvap };
}
