import { primeFactorize, type PrimeFactor } from "./ebobEkokCalculator";

export interface SimplifiedCubeRadical {
  outsideCoefficient: number;
  insideRadicand: number;
  factors: PrimeFactor[];
}

export interface CubeRootResult {
  input: number;
  decimalValue: number;
  isPerfectCube: boolean;
  simplified: SimplifiedCubeRadical | null;
}

export function calculateCubeRoot(input: number): CubeRootResult | null {
  if (!Number.isFinite(input)) {
    return null;
  }

  const decimalValue = Math.cbrt(input);

  if (!Number.isInteger(input) || input === 0) {
    return {
      input,
      decimalValue,
      isPerfectCube: input === 0 || Number.isInteger(decimalValue),
      simplified: null,
    };
  }

  const isNegative = input < 0;
  const factors = primeFactorize(Math.abs(input));

  let outsideCoefficient = 1;
  let insideRadicand = 1;

  for (const factor of factors) {
    const groupCount = Math.floor(factor.exponent / 3);
    const remainder = factor.exponent % 3;

    outsideCoefficient *= factor.prime ** groupCount;
    if (remainder > 0) {
      insideRadicand *= factor.prime ** remainder;
    }
  }

  if (isNegative) {
    outsideCoefficient = -outsideCoefficient;
  }

  return {
    input,
    decimalValue,
    isPerfectCube: insideRadicand === 1,
    simplified: { outsideCoefficient, insideRadicand, factors },
  };
}
