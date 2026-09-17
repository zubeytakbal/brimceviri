export type DarcyWeisbachInput = {
  lengthM: number;
  diameterM: number;
  flowM3s: number;
  densityKgM3: number;
  dynamicViscosityPaS: number;
  roughnessM: number;
  minorLossCoefficient: number;
};

export type DarcyWeisbachResult = {
  areaM2: number;
  velocityMs: number;
  reynoldsNumber: number;
  relativeRoughness: number;
  frictionFactor: number;
  majorHeadLossM: number;
  minorHeadLossM: number;
  totalHeadLossM: number;
  majorPressureDropPa: number;
  minorPressureDropPa: number;
  pressureDropPa: number;
  pressureDropBar: number;
  pressureDropPsi: number;
  regime: "laminar" | "transitional" | "turbulent";
  frictionFactorMethod: string;
};

const GRAVITY = 9.80665;

export function calculateDarcyWeisbachPressureDrop(
  input: DarcyWeisbachInput
): DarcyWeisbachResult | null {
  const { lengthM, diameterM, flowM3s, densityKgM3, dynamicViscosityPaS, roughnessM, minorLossCoefficient } = input;
  if (![lengthM, diameterM, flowM3s, densityKgM3, dynamicViscosityPaS].every((value) => Number.isFinite(value) && value > 0) || !Number.isFinite(roughnessM) || roughnessM < 0 || !Number.isFinite(minorLossCoefficient) || minorLossCoefficient < 0) return null;

  const areaM2 = (Math.PI * diameterM * diameterM) / 4;
  const velocityMs = flowM3s / areaM2;
  const reynoldsNumber = (densityKgM3 * velocityMs * diameterM) / dynamicViscosityPaS;
  const relativeRoughness = roughnessM / diameterM;
  const isLaminar = reynoldsNumber < 2300;
  const frictionFactor = isLaminar
    ? 64 / reynoldsNumber
    : 0.25 / Math.pow(Math.log10(relativeRoughness / 3.7 + 5.74 / Math.pow(reynoldsNumber, 0.9)), 2);
  const velocityHeadM = (velocityMs * velocityMs) / (2 * GRAVITY);
  const majorHeadLossM = frictionFactor * (lengthM / diameterM) * velocityHeadM;
  const minorHeadLossM = minorLossCoefficient * velocityHeadM;
  const totalHeadLossM = majorHeadLossM + minorHeadLossM;
  const majorPressureDropPa = densityKgM3 * GRAVITY * majorHeadLossM;
  const minorPressureDropPa = densityKgM3 * GRAVITY * minorHeadLossM;
  const pressureDropPa = densityKgM3 * GRAVITY * totalHeadLossM;
  const regime = isLaminar ? "laminar" : reynoldsNumber < 4000 ? "transitional" : "turbulent";

  return {
    areaM2,
    velocityMs,
    reynoldsNumber,
    relativeRoughness,
    frictionFactor,
    majorHeadLossM,
    minorHeadLossM,
    totalHeadLossM,
    majorPressureDropPa,
    minorPressureDropPa,
    pressureDropPa,
    pressureDropBar: pressureDropPa / 100000,
    pressureDropPsi: pressureDropPa / 6894.757293,
    regime,
    frictionFactorMethod: isLaminar ? "Laminar: f = 64 / Re" : "Swamee–Jain explicit approximation",
  };
}
