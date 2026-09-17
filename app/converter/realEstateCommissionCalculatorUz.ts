// Ko'chmas mulk komissiyasini hisoblash -- O'zbekistonda rieltor
// komissiyasi foizi qonun bilan qat'iy belgilanmagan (Turkiyadagi kabi
// aniq yuridik tavan topilmadi), shuning uchun bu vosita foizni
// foydalanuvchi kiritishiga asoslangan umumiy foiz + QQS hisobini
// qiladi -- sotish va ijaraga berish uchun bir xil formula bilan.

export type TransactionType = "sotish" | "ijaraga-berish";

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

export function calculateUzRealEstateCommission(
  input: RealEstateCommissionInput
): RealEstateCommissionResult | null {
  const { amount, commissionPercent, vatPercent } = input;

  if (
    !Number.isFinite(amount) ||
    amount <= 0 ||
    !Number.isFinite(commissionPercent) ||
    commissionPercent < 0 ||
    !Number.isFinite(vatPercent) ||
    vatPercent < 0
  ) {
    return null;
  }

  const commissionExcludingVat = amount * (commissionPercent / 100);
  const vatAmount = commissionExcludingVat * (vatPercent / 100);

  return {
    commissionExcludingVat,
    vatAmount,
    commissionIncludingVat: commissionExcludingVat + vatAmount,
  };
}
