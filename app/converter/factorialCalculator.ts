export interface FactorialResult {
  n: number;
  value: bigint;
  digitCount: number;
  trailingZeroCount: number;
}

const MAX_N = 5000;

export function calculateFactorial(n: number): FactorialResult | null {
  if (!Number.isInteger(n) || n < 0 || n > MAX_N) {
    return null;
  }

  let value = BigInt(1);
  for (let i = 2; i <= n; i += 1) {
    value *= BigInt(i);
  }

  const digitCount = value.toString().length;

  let trailingZeroCount = 0;
  let power = 5;
  while (power <= n) {
    trailingZeroCount += Math.floor(n / power);
    power *= 5;
  }

  return { n, value, digitCount, trailingZeroCount };
}
