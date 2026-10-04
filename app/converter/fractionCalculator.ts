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
      (value) => Number.isSafeInteger(value)
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

  // Keep intermediate products exact; Number multiplication can round before
  // subtraction and silently turn a nonzero numerator into zero.
  const an = BigInt(a.numerator), ad = BigInt(a.denominator);
  const bn = BigInt(b.numerator), bd = BigInt(b.denominator);
  let numerator: bigint;
  let denominator: bigint;
  switch (operation) {
    case "toplama": numerator = an * bd + bn * ad; denominator = ad * bd; break;
    case "cikarma": numerator = an * bd - bn * ad; denominator = ad * bd; break;
    case "carpma": numerator = an * bn; denominator = ad * bd; break;
    case "bolme": numerator = an * bd; denominator = ad * bn; break;
    default: return null;
  }
  const rawLimit = BigInt(Number.MAX_SAFE_INTEGER);
  if (numerator > rawLimit || numerator < -rawLimit ||
      denominator > rawLimit || denominator < -rawLimit) return null;
  let rawNumerator = Number(numerator);
  let rawDenominator = Number(denominator);

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
    !Number.isSafeInteger(fraction.numerator) ||
    !Number.isSafeInteger(fraction.denominator) ||
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
