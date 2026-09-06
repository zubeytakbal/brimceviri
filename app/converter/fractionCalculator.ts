export type FractionOperation = "toplama" | "cikarma" | "carpma" | "bolme";

export interface Fraction {
  numerator: number;
  denominator: number;
}

export interface FractionResult {
  operation: FractionOperation;
  a: Fraction;
  b: Fraction;
  rawNumerator: number;
  rawDenominator: number;
  simplifiedNumerator: number;
  simplifiedDenominator: number;
  divisor: number;
  decimal: number;
  wholePart: number;
  remainderNumerator: number;
  isProper: boolean;
}

function greatestCommonDivisor(x: number, y: number): number {
  let a = Math.abs(x);
  let b = Math.abs(y);
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

export function calculateFraction(
  a: Fraction,
  b: Fraction,
  operation: FractionOperation
): FractionResult | null {
  if (
    ![a.numerator, a.denominator, b.numerator, b.denominator].every(
      (value) => Number.isInteger(value)
    )
  ) {
    return null;
  }

  if (a.denominator === 0 || b.denominator === 0) {
    return null;
  }

  if (operation === "bolme" && b.numerator === 0) {
    return null;
  }

  let rawNumerator: number;
  let rawDenominator: number;

  switch (operation) {
    case "toplama":
      rawNumerator = a.numerator * b.denominator + b.numerator * a.denominator;
      rawDenominator = a.denominator * b.denominator;
      break;
    case "cikarma":
      rawNumerator = a.numerator * b.denominator - b.numerator * a.denominator;
      rawDenominator = a.denominator * b.denominator;
      break;
    case "carpma":
      rawNumerator = a.numerator * b.numerator;
      rawDenominator = a.denominator * b.denominator;
      break;
    case "bolme":
      rawNumerator = a.numerator * b.denominator;
      rawDenominator = a.denominator * b.numerator;
      break;
  }

  if (rawDenominator < 0) {
    rawNumerator = -rawNumerator;
    rawDenominator = -rawDenominator;
  }

  const divisor = greatestCommonDivisor(rawNumerator, rawDenominator) || 1;
  const simplifiedNumerator = rawNumerator / divisor;
  const simplifiedDenominator = rawDenominator / divisor;
  const decimal = simplifiedNumerator / simplifiedDenominator;

  const wholePart = Math.trunc(simplifiedNumerator / simplifiedDenominator);
  const remainderNumerator = simplifiedNumerator - wholePart * simplifiedDenominator;
  const isProper = Math.abs(simplifiedNumerator) < Math.abs(simplifiedDenominator);

  return {
    operation,
    a,
    b,
    rawNumerator,
    rawDenominator,
    simplifiedNumerator,
    simplifiedDenominator,
    divisor,
    decimal,
    wholePart,
    remainderNumerator,
    isProper,
  };
}

export function simplifyFraction(fraction: Fraction): {
  numerator: number;
  denominator: number;
  divisor: number;
} | null {
  if (
    !Number.isInteger(fraction.numerator) ||
    !Number.isInteger(fraction.denominator) ||
    fraction.denominator === 0
  ) {
    return null;
  }

  let numerator = fraction.numerator;
  let denominator = fraction.denominator;

  if (denominator < 0) {
    numerator = -numerator;
    denominator = -denominator;
  }

  const divisor = greatestCommonDivisor(numerator, denominator) || 1;

  return {
    numerator: numerator / divisor,
    denominator: denominator / divisor,
    divisor,
  };
}
