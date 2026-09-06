// Emlak komisyonu hesaplama -- Tasinmaz Ticareti Hakkinda Yonetmelik'te
// belirlenen ust sinir (tavan) oranlarina gore: satista taraf basina en
// fazla %2 + KDV, kiralamada taraf basina en fazla 1 aylik kira bedeli +
// KDV. Bunlar yasal tavan degerlerdir; gercek komisyon taraflar arasinda
// bu tavanin altinda serbestce belirlenebilir.

export type TransactionType = "satis" | "kiralama";

export type RealEstateCommissionInput = {
  transactionType: TransactionType;
  amount: number;
  commissionPercent: number;
  vatPercent: number;
};

export type RealEstateCommissionResult = {
  commissionExcludingVat: number;
  vatAmount: number;
  commissionIncludingVat: number;
};

export function calculateRealEstateCommission(
  input: RealEstateCommissionInput
): RealEstateCommissionResult | null {
  const { transactionType, amount, commissionPercent, vatPercent } = input;

  if (
    !Number.isFinite(amount) ||
    amount <= 0 ||
    !Number.isFinite(vatPercent) ||
    vatPercent < 0
  ) {
    return null;
  }

  let commissionExcludingVat: number;

  if (transactionType === "kiralama") {
    commissionExcludingVat = amount;
  } else {
    if (!Number.isFinite(commissionPercent) || commissionPercent < 0) {
      return null;
    }

    commissionExcludingVat = amount * (commissionPercent / 100);
  }

  const vatAmount = commissionExcludingVat * (vatPercent / 100);

  return {
    commissionExcludingVat,
    vatAmount,
    commissionIncludingVat: commissionExcludingVat + vatAmount,
  };
}
