// Hesap motorlari: Hindistan'a ozel Ingilizce araclar -- arazi birimleri
// (eyalete gore bigha/katha/biswa), altin mucevher fiyati (iscilik + GST) ve
// lakh / crore sayi birimleri.

// ---------------- Land ----------------
// Ulke genelinde sabit birimler (ft2 cinsinden, tanima gore kesin).
export const SQ_FT_PER_SQ_M = 10.7639104167097;

export type FixedLandUnit = "sqft" | "sqm" | "gaj" | "acre" | "hectare" | "guntha" | "cent" | "ground" | "marla" | "kanal";

export const FIXED_LAND_UNITS: Record<FixedLandUnit, { label: string; sqFt: number; note: string }> = {
  sqft: { label: "Square feet (sq ft)", sqFt: 1, note: "" },
  sqm: { label: "Square meters (m²)", sqFt: SQ_FT_PER_SQ_M, note: "" },
  gaj: { label: "Gaj / square yards", sqFt: 9, note: "1 gaj = 1 square yard = 9 sq ft" },
  acre: { label: "Acres", sqFt: 43560, note: "1 acre = 43,560 sq ft" },
  hectare: { label: "Hectares", sqFt: 10000 * SQ_FT_PER_SQ_M, note: "1 hectare = 10,000 m² = 2.471 acres" },
  guntha: { label: "Guntha", sqFt: 1089, note: "1 guntha = 121 sq yd = 1/40 acre (Maharashtra, Karnataka, Gujarat)" },
  cent: { label: "Cent / decimal", sqFt: 435.6, note: "1 cent = 1 decimal = 1/100 acre (Kerala, Tamil Nadu, Andhra, Odisha, Bengal)" },
  ground: { label: "Ground", sqFt: 2400, note: "1 ground = 2,400 sq ft (Tamil Nadu)" },
  marla: { label: "Marla", sqFt: 272.25, note: "1 marla = 272.25 sq ft (Punjab, Haryana revenue marla)" },
  kanal: { label: "Kanal", sqFt: 5445, note: "1 kanal = 20 marla = 5,445 sq ft" },
};

// Bigha ve alt birimleri eyalete (hatta ilceye) gore degisir. Degerler yaygin
// kullanilan referans degerlerdir; resmi islemlerde yerel kayit esas alinir.
export type BighaRegion = {
  id: string;
  label: string;
  bighaSqFt: number;
  subunit?: { name: string; perBigha: number };
  note?: string;
};

export const BIGHA_REGIONS: BighaRegion[] = [
  { id: "west-bengal", label: "West Bengal", bighaSqFt: 14400, subunit: { name: "katha", perBigha: 20 }, note: "1 katha = 720 sq ft" },
  { id: "assam", label: "Assam", bighaSqFt: 14400, subunit: { name: "katha", perBigha: 5 }, note: "1 katha = 2,880 sq ft" },
  { id: "bihar-jharkhand", label: "Bihar & Jharkhand", bighaSqFt: 27225, subunit: { name: "katha", perBigha: 20 }, note: "1 katha ≈ 1,361 sq ft" },
  { id: "uttar-pradesh", label: "Uttar Pradesh (east & central)", bighaSqFt: 27000, subunit: { name: "biswa", perBigha: 20 }, note: "Western UP districts often use a much smaller bigha (around 6,750 sq ft)" },
  { id: "rajasthan-pucca", label: "Rajasthan (pucca bigha)", bighaSqFt: 27225, subunit: { name: "biswa", perBigha: 20 } },
  { id: "rajasthan-kaccha", label: "Rajasthan (kaccha bigha)", bighaSqFt: 17424, subunit: { name: "biswa", perBigha: 20 } },
  { id: "gujarat", label: "Gujarat", bighaSqFt: 17424, subunit: { name: "guntha", perBigha: 16 }, note: "1 bigha = 16 guntha" },
  { id: "madhya-pradesh", label: "Madhya Pradesh", bighaSqFt: 12000 },
  { id: "punjab-haryana", label: "Punjab & Haryana", bighaSqFt: 9070, note: "Kanal and marla are the usual revenue units here" },
  { id: "himachal", label: "Himachal Pradesh", bighaSqFt: 8712 },
];

export type LandUnitChoice = { kind: "fixed"; unit: FixedLandUnit } | { kind: "bigha" } | { kind: "subunit" };

/** Converts a land area to square feet; bigha and its subunit use the chosen region. */
export function landToSqFt(value: number, choice: LandUnitChoice, region: BighaRegion): number | null {
  if (!Number.isFinite(value) || value < 0) return null;
  if (choice.kind === "fixed") return value * FIXED_LAND_UNITS[choice.unit].sqFt;
  if (choice.kind === "bigha") return value * region.bighaSqFt;
  if (!region.subunit) return null;
  return value * (region.bighaSqFt / region.subunit.perBigha);
}

export function landFromSqFt(sqFt: number, region: BighaRegion) {
  const fixed = Object.fromEntries(Object.entries(FIXED_LAND_UNITS).map(([key, unit]) => [key, sqFt / unit.sqFt])) as Record<FixedLandUnit, number>;
  return {
    fixed,
    bigha: sqFt / region.bighaSqFt,
    subunit: region.subunit ? { name: region.subunit.name, value: sqFt / (region.bighaSqFt / region.subunit.perBigha) } : null,
  };
}

// ---------------- Gold ----------------
export const GRAMS_PER_TOLA = 11.6638;

// BIS hallmark inceligi (binde): 24K = 999, 22K = 916, 18K = 750, 14K = 585.
export const GOLD_FINENESS = { "24": 999, "22": 916, "18": 750, "14": 585 } as const;
export type GoldKarat = keyof typeof GOLD_FINENESS;

/** 22K/18K/14K rate estimated from the 24K (999) rate by fineness. */
export function rateFromFineness(rate24PerGram: number, karat: GoldKarat) {
  return (rate24PerGram * GOLD_FINENESS[karat]) / GOLD_FINENESS["24"];
}

export type GoldJewelleryInput = {
  ratePerGram: number; // rate for the karat being bought
  weightGrams: number;
  makingMode: "percent" | "perGram";
  makingValue: number;
  gstPercent: number;
};

// Fiyat = altin degeri + iscilik; GST (%3) bu toplam uzerinden alinir.
export function goldJewelleryPrice(input: GoldJewelleryInput) {
  const { ratePerGram, weightGrams, makingMode, makingValue, gstPercent } = input;
  if (![ratePerGram, weightGrams].every((value) => Number.isFinite(value) && value > 0)) return null;
  if (![makingValue, gstPercent].every((value) => Number.isFinite(value) && value >= 0)) return null;
  const goldValue = ratePerGram * weightGrams;
  const making = makingMode === "percent" ? (goldValue * makingValue) / 100 : makingValue * weightGrams;
  const beforeTax = goldValue + making;
  const gst = (beforeTax * gstPercent) / 100;
  const total = beforeTax + gst;
  return { goldValue, making, gst, total, effectivePerGram: total / weightGrams };
}

// ---------------- Lakh / crore ----------------
export const NUMBER_UNITS = {
  one: { label: "Number", value: 1 },
  thousand: { label: "Thousand", value: 1e3 },
  lakh: { label: "Lakh", value: 1e5 },
  million: { label: "Million", value: 1e6 },
  crore: { label: "Crore", value: 1e7 },
  billion: { label: "Billion", value: 1e9 },
  arab: { label: "Arab (100 crore)", value: 1e9 },
  kharab: { label: "Kharab (100 arab)", value: 1e11 },
  trillion: { label: "Trillion", value: 1e12 },
} as const;
export type NumberUnit = keyof typeof NUMBER_UNITS;

/** 12345678.9 -> "1,23,45,678.9" (Indian digit grouping). */
export function formatIndianGrouping(value: number, maximumFractionDigits = 2) {
  if (!Number.isFinite(value)) return "";
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits }).format(value);
}

export function formatInternationalGrouping(value: number, maximumFractionDigits = 2) {
  if (!Number.isFinite(value)) return "";
  return new Intl.NumberFormat("en-US", { maximumFractionDigits }).format(value);
}

export function convertNumberUnits(value: number, from: NumberUnit) {
  if (!Number.isFinite(value)) return null;
  const raw = value * NUMBER_UNITS[from].value;
  const inUnits = Object.fromEntries(Object.entries(NUMBER_UNITS).map(([key, unit]) => [key, raw / unit.value])) as Record<NumberUnit, number>;
  return { raw, inUnits };
}

// ---------------- Traditional Indian weights ----------------
// 1 tola = 180 grains = 11.6638038 g (British India standard); 1 tola =
// 12 masha = 96 ratti (sunari/goldsmith ratti = 121.5 mg). Gemstone trade
// uses the "pakki" ratti = 1.5 sunari ratti = 182.25 mg ≈ 0.91 carat.
// 1 seer = 80 tola; 1 maund = 40 seer; 1 chhatak = 1/16 seer.
export const TOLA_GRAMS = 11.6638038;

export type IndianWeightUnit =
  | "gram"
  | "kilogram"
  | "tola"
  | "masha"
  | "rattiSunari"
  | "rattiPakki"
  | "carat"
  | "chhatak"
  | "seer"
  | "maund"
  | "quintal"
  | "pound";

export const INDIAN_WEIGHT_UNITS: Record<IndianWeightUnit, { label: string; grams: number }> = {
  gram: { label: "Grams (g)", grams: 1 },
  kilogram: { label: "Kilograms (kg)", grams: 1000 },
  tola: { label: "Tola", grams: TOLA_GRAMS },
  masha: { label: "Masha", grams: TOLA_GRAMS / 12 },
  rattiSunari: { label: "Ratti (goldsmith / sunari)", grams: TOLA_GRAMS / 96 },
  rattiPakki: { label: "Ratti (gemstone / pakki)", grams: (TOLA_GRAMS / 96) * 1.5 },
  carat: { label: "Carats (ct)", grams: 0.2 },
  chhatak: { label: "Chhatak", grams: (TOLA_GRAMS * 80) / 16 },
  seer: { label: "Seer (ser)", grams: TOLA_GRAMS * 80 },
  maund: { label: "Maund (man)", grams: TOLA_GRAMS * 80 * 40 },
  quintal: { label: "Quintal", grams: 100000 },
  pound: { label: "Pounds (lb)", grams: 453.59237 },
};

export function convertIndianWeight(value: number, from: IndianWeightUnit) {
  if (!Number.isFinite(value) || value < 0) return null;
  const grams = value * INDIAN_WEIGHT_UNITS[from].grams;
  return Object.fromEntries(
    Object.entries(INDIAN_WEIGHT_UNITS).map(([key, unit]) => [key, grams / unit.grams])
  ) as Record<IndianWeightUnit, number>;
}

// ---------------- GST (India) ----------------
// Eylul 2025 (GST 2.0) sonrasi ana dilimler: %0, %5, %18 ve %40 (luks/zararli
// urunler). Altin ve gumus icin %3 ozel oran devam ediyor.
export const GST_RATES = [0, 3, 5, 18, 40] as const;

export type GstInput = { amount: number; ratePercent: number; mode: "add" | "remove"; supply: "intra" | "inter" };

export function gstCalculation(input: GstInput) {
  const { amount, ratePercent, mode, supply } = input;
  if (!Number.isFinite(amount) || amount < 0 || !Number.isFinite(ratePercent) || ratePercent < 0) return null;
  const net = mode === "add" ? amount : amount / (1 + ratePercent / 100);
  const gst = net * (ratePercent / 100);
  const total = net + gst;
  // Eyalet ici satista vergi CGST + SGST olarak ikiye bolunur; eyaletler
  // arasi satista tamami IGST'dir.
  return supply === "intra" ? { net, gst, total, cgst: gst / 2, sgst: gst / 2, igst: 0 } : { net, gst, total, cgst: 0, sgst: 0, igst: gst };
}

// ---------------- Loan EMI ----------------
export type EmiInput = { principal: number; annualRatePercent: number; months: number };

export function loanEmi(input: EmiInput) {
  const { principal, annualRatePercent, months } = input;
  if (!(principal > 0) || !(months >= 1) || !Number.isFinite(annualRatePercent) || annualRatePercent < 0) return null;
  const n = Math.round(months);
  const i = annualRatePercent / 12 / 100;
  const emi = i === 0 ? principal / n : (principal * i * (1 + i) ** n) / ((1 + i) ** n - 1);
  const totalPayment = emi * n;
  // Yillik ozet: her yil odenen anapara, faiz ve yil sonu kalan borc.
  const years: Array<{ year: number; principal: number; interest: number; balance: number }> = [];
  let balance = principal;
  for (let month = 1; month <= n; month += 1) {
    const interest = balance * i;
    const principalPart = emi - interest;
    balance = Math.max(0, balance - principalPart);
    const yearIndex = Math.ceil(month / 12) - 1;
    if (!years[yearIndex]) years[yearIndex] = { year: yearIndex + 1, principal: 0, interest: 0, balance: 0 };
    years[yearIndex].principal += principalPart;
    years[yearIndex].interest += interest;
    years[yearIndex].balance = balance;
  }
  return { emi, totalPayment, totalInterest: totalPayment - principal, years };
}
