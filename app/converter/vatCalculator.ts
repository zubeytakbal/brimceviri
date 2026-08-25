// KDV hesaplama -- KDV haric bir tutardan KDV dahil tutari, veya KDV
// dahil bir tutardan KDV haric tutari (matrah) ve KDV miktarini bulur.

export type VatDirection = "exclusive-to-inclusive" | "inclusive-to-exclusive";

export type VatCalculatorInput = {
  amount: number;
  ratePercent: number;
  direction: VatDirection;
};

export type VatCalculatorResult = {
  baseAmount: number;
  vatAmount: number;
  totalAmount: number;
};

export function calculateVat(
  input: VatCalculatorInput
): VatCalculatorResult | null {
  const { amount, ratePercent, direction } = input;

  if (
    !Number.isFinite(amount) ||
    amount < 0 ||
    !Number.isFinite(ratePercent) ||
    ratePercent < 0
  ) {
    return null;
  }

  if (direction === "exclusive-to-inclusive") {
    const vatAmount = amount * (ratePercent / 100);

    return {
      baseAmount: amount,
      vatAmount,
      totalAmount: amount + vatAmount,
    };
  }

  const baseAmount = amount / (1 + ratePercent / 100);

  return {
    baseAmount,
    vatAmount: amount - baseAmount,
    totalAmount: amount,
  };
}
