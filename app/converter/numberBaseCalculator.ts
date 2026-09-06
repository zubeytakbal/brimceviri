// Sayi tabani hesaplayici -- ikili/sekizli/onlu/onaltilik arasi donusum
// ve temel ikili aritmetik. unitRegistry/convert() kullanmiyor, cunku
// bunlar fiziksel birim degil, sayi gosterim sistemleri.

export type NumberBase = 2 | 8 | 10 | 16;

export type BaseConversionResult = {
  binary: string;
  octal: string;
  decimal: string;
  hexadecimal: string;
};

const BASE_PATTERNS: Record<NumberBase, RegExp> = {
  2: /^[01]+$/,
  8: /^[0-7]+$/,
  10: /^[0-9]+$/,
  16: /^[0-9a-fA-F]+$/,
};

export function isValidForBase(value: string, base: NumberBase) {
  if (!value) {
    return false;
  }

  return BASE_PATTERNS[base].test(value);
}

export function convertFromBase(
  value: string,
  base: NumberBase
): BaseConversionResult | null {
  const trimmed = value.trim();

  if (!isValidForBase(trimmed, base)) {
    return null;
  }

  let decimalValue: bigint;

  try {
    decimalValue = BigInt(
      base === 10 ? trimmed : `0${base === 2 ? "b" : base === 8 ? "o" : "x"}${trimmed}`
    );
  } catch {
    return null;
  }

  return {
    binary: decimalValue.toString(2),
    octal: decimalValue.toString(8),
    decimal: decimalValue.toString(10),
    hexadecimal: decimalValue.toString(16).toUpperCase(),
  };
}

export type BinaryArithmeticOperation = "add" | "subtract" | "multiply";

export type BinaryArithmeticResult = {
  operation: BinaryArithmeticOperation;
  firstDecimal: bigint;
  secondDecimal: bigint;
  resultDecimal: bigint;
  resultBinary: string;
};

export function calculateBinaryArithmetic(
  firstBinary: string,
  secondBinary: string,
  operation: BinaryArithmeticOperation
): BinaryArithmeticResult | null {
  if (!isValidForBase(firstBinary.trim(), 2) || !isValidForBase(secondBinary.trim(), 2)) {
    return null;
  }

  const first = BigInt(`0b${firstBinary.trim()}`);
  const second = BigInt(`0b${secondBinary.trim()}`);

  let result: bigint;

  if (operation === "add") {
    result = first + second;
  } else if (operation === "subtract") {
    result = first - second;
  } else {
    result = first * second;
  }

  if (result < BigInt(0)) {
    return null;
  }

  return {
    operation,
    firstDecimal: first,
    secondDecimal: second,
    resultDecimal: result,
    resultBinary: result.toString(2),
  };
}
