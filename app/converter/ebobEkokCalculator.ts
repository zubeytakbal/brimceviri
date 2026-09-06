export interface PrimeFactor {
  prime: number;
  exponent: number;
}

export interface EbobEkokResult {
  numbers: number[];
  factorizations: PrimeFactor[][];
  ebob: number;
  ekok: number;
}

export function primeFactorize(value: number): PrimeFactor[] {
  const factors: PrimeFactor[] = [];
  let remaining = value;
  let divisor = 2;

  while (divisor * divisor <= remaining) {
    let exponent = 0;
    while (remaining % divisor === 0) {
      remaining /= divisor;
      exponent += 1;
    }
    if (exponent > 0) {
      factors.push({ prime: divisor, exponent });
    }
    divisor += 1;
  }

  if (remaining > 1) {
    factors.push({ prime: remaining, exponent: 1 });
  }

  return factors;
}

export function calculateEbobEkok(numbers: number[]): EbobEkokResult | null {
  if (numbers.length < 2) {
    return null;
  }

  if (numbers.some((value) => !Number.isInteger(value) || value < 1)) {
    return null;
  }

  const factorizations = numbers.map(primeFactorize);

  const allPrimes = new Set<number>();
  factorizations.forEach((factors) =>
    factors.forEach((factor) => allPrimes.add(factor.prime))
  );

  let ebob = 1;
  let ekok = 1;

  for (const prime of allPrimes) {
    const exponents = factorizations.map(
      (factors) => factors.find((factor) => factor.prime === prime)?.exponent ?? 0
    );
    const minExponent = Math.min(...exponents);
    const maxExponent = Math.max(...exponents);

    if (minExponent > 0) {
      ebob *= prime ** minExponent;
    }
    ekok *= prime ** maxExponent;
  }

  return { numbers, factorizations, ebob, ekok };
}

export function formatFactorization(factors: PrimeFactor[]): string {
  if (factors.length === 0) {
    return "1";
  }

  return factors
    .map((factor) =>
      factor.exponent === 1 ? `${factor.prime}` : `${factor.prime}^${factor.exponent}`
    )
    .join(" × ");
}
