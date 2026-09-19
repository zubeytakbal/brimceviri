// حساب زكاة المال بالطريقة المعتمدة عند جمهور الفقهاء: 2.5% من صافي
// المال الزكوي (نقد + مدخرات + عروض تجارة + ديون مرجوة - ديون على
// المكلف) إذا بلغ النصاب واستمر حولاً كاملاً (سنة هجرية). هذه الأداة
// لا تغطي زكاة الزروع والثمار أو الأنعام أو الركاز، فلها أحكام مختلفة.

export type NisabStandard = "gold" | "silver";

// الحد الأدنى الشائع في أغلب حاسبات الزكاة: 85 جرام ذهب خالص أو 595
// جرام فضة خالصة (تقديرات تقريبية شائعة لعشرين مثقالاً ومئتي درهم؛
// بعض الهيئات تستخدم أرقاماً مقاربة مثل 87.48 جم / 612.36 جم).
export const GOLD_NISAB_GRAMS = 85;
export const SILVER_NISAB_GRAMS = 595;
export const ZAKAT_RATE = 0.025;

export type ZakatInput = {
  cash: number;
  bankSavings: number;
  businessInventoryValue: number;
  receivables: number;
  debtsOwed: number;
  goldGrams: number;
  goldKarat: number;
  silverGrams: number;
  silverPurityPercent: number;
  nisabStandard: NisabStandard;
  goldPricePerGramUsd: number | null;
  silverPricePerGramUsd: number | null;
};

export type ZakatResult = {
  pureGoldGrams: number;
  pureSilverGrams: number;
  goldValueUsd: number;
  silverValueUsd: number;
  totalZakatableWealthUsd: number;
  nisabValueUsd: number | null;
  isAboveNisab: boolean;
  zakatDueUsd: number;
};

function safeNumber(value: number) {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

export function computeZakat(input: ZakatInput): ZakatResult | null {
  const goldPrice = input.goldPricePerGramUsd;
  const silverPrice = input.silverPricePerGramUsd;

  const pureGoldGrams = safeNumber(input.goldGrams) * (safeNumber(input.goldKarat) / 24);
  const pureSilverGrams =
    safeNumber(input.silverGrams) * (safeNumber(input.silverPurityPercent) / 100);

  const goldValueUsd = goldPrice ? pureGoldGrams * goldPrice : 0;
  const silverValueUsd = silverPrice ? pureSilverGrams * silverPrice : 0;

  const totalZakatableWealthUsd = Math.max(
    0,
    safeNumber(input.cash) +
      safeNumber(input.bankSavings) +
      safeNumber(input.businessInventoryValue) +
      safeNumber(input.receivables) +
      goldValueUsd +
      silverValueUsd -
      safeNumber(input.debtsOwed)
  );

  let nisabValueUsd: number | null = null;
  if (input.nisabStandard === "gold" && goldPrice) {
    nisabValueUsd = GOLD_NISAB_GRAMS * goldPrice;
  } else if (input.nisabStandard === "silver" && silverPrice) {
    nisabValueUsd = SILVER_NISAB_GRAMS * silverPrice;
  }

  const isAboveNisab = nisabValueUsd !== null && totalZakatableWealthUsd >= nisabValueUsd;
  const zakatDueUsd = isAboveNisab ? totalZakatableWealthUsd * ZAKAT_RATE : 0;

  return {
    pureGoldGrams,
    pureSilverGrams,
    goldValueUsd,
    silverValueUsd,
    totalZakatableWealthUsd,
    nisabValueUsd,
    isAboveNisab,
    zakatDueUsd,
  };
}
