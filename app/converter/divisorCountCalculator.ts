import { primeFactorize, type PrimeFactor } from "./ebobEkokCalculator";

export interface DivisorCountResult {
  n: number;
  factors: PrimeFactor[];
  divisorCount: number;
  sumOfDivisors: number;
  divisors: number[] | null;
}

const LISTING_LIMIT = 100000;

export function calculateDivisorCount(n: number): DivisorCountResult | null {
  if (!Number.isInteger(n) || n < 1) {
    return null;
  }

  const factors = primeFactorize(n);

  const divisorCount = factors.reduce(
    (product, factor) => product * (factor.exponent + 1),
    1
  );

  const sumOfDivisors = factors.reduce(
    (product, factor) =>
      product * ((factor.prime ** (factor.exponent + 1) - 1) / (factor.prime - 1)),
    1
  );

  let divisors: number[] | null = null;
  if (n <= LISTING_LIMIT) {
    divisors = [];
    for (let i = 1; i <= n; i += 1) {
      if (n % i === 0) {
        divisors.push(i);
      }
    }
  }

  return { n, factors, divisorCount, sumOfDivisors, divisors };
}
