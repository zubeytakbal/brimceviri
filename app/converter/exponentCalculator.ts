export interface ExponentResult {
  base: number;
  exponent: number;
  value: number;
}

export function calculateExponent(
  base: number,
  exponent: number
): ExponentResult | null {
  if (!Number.isFinite(base) || !Number.isFinite(exponent)) {
    return null;
  }

  const value = Math.pow(base, exponent);

  if (!Number.isFinite(value)) {
    return null;
  }

  return { base, exponent, value };
}
