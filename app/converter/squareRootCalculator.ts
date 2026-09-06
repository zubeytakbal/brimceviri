import { primeFactorize, type PrimeFactor } from "./ebobEkokCalculator";

export interface SimplifiedRadical {
  outsideCoefficient: number;
  insideRadicand: number;
  factors: PrimeFactor[];
}

export interface SquareRootResult {
  input: number;
  decimalValue: number;
  isPerfectSquare: boolean;
  simplified: SimplifiedRadical | null;
}

export function calculateSquareRoot(input: number): SquareRootResult | null {
  if (!Number.isFinite(input) || input < 0) {
    return null;
  }

  const decimalValue = Math.sqrt(input);

  if (!Number.isInteger(input) || input === 0) {
    return {
      input,
      decimalValue,
      isPerfectSquare: input === 0 || Number.isInteger(decimalValue),
      simplified: null,
    };
  }

  const factors = primeFactorize(input);

  let outsideCoefficient = 1;
  let insideRadicand = 1;

  for (const factor of factors) {
    const pairCount = Math.floor(factor.exponent / 2);
    const remainder = factor.exponent % 2;

    outsideCoefficient *= factor.prime ** pairCount;
    if (remainder === 1) {
      insideRadicand *= factor.prime;
    }
  }

  return {
    input,
    decimalValue,
    isPerfectSquare: insideRadicand === 1,
    simplified: { outsideCoefficient, insideRadicand, factors },
  };
}
