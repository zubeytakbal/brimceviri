// LPG donusum amortisman hesaplama -- kullanicinin kendi aracina ozel
// verileriyle, LPG donusum sisteminin kac yilda/km'de kendini
// cikardigini hesaplar. Litmus test: hicbir sabit rakam yok, hepsi
// kullanicinin kendi araci/kullanimina bagli (yillik km, tuketim,
// donusum maliyeti); fiyatlar canli API'den veya kullanicidan gelir.

// Kaynak: LPG donusumu sonrasi yakit tuketimi (litre bazinda) genel
// kabul goren piyasa deneyimine gore benzine kiyasla %20-25 daha
// yuksek cikiyor; varsayilan olarak bu aralıgin ortasi (%22) kullanildi,
// kullanicinin kendi aracina gore duzenlemesi onerilir.
export const lpgConversionDefaults = {
  lpgConsumptionIncreasePercent: 22,
  // 4 silindirli, sirali enjeksiyonlu standart donusum sistemi icin
  // 2026 piyasa araligi (17.500-23.500 TL) ortalamasi.
  conversionCostTl: 20000,
  // Periyodik LPG sistemi bakim/ayar gideri, 2026 piyasa araligi
  // (yilda 2.000-4.000 TL) ortalamasi.
  annualMaintenanceCostTl: 3000,
};

export interface LpgConversionPaybackInput {
  annualKm: number;
  gasolineConsumptionPer100Km: number;
  lpgConsumptionIncreasePercent: number;
  gasolinePriceTl: number;
  lpgPriceTl: number;
  conversionCostTl: number;
  annualMaintenanceCostTl: number;
}

export interface LpgConversionPaybackResult {
  lpgConsumptionPer100Km: number;
  annualGasolineCostTl: number;
  annualLpgFuelCostTl: number;
  annualLpgTotalCostTl: number;
  annualNetSavingsTl: number;
  breakEvenYears: number | null;
  breakEvenKm: number | null;
}

export function calculateLpgConversionPayback(
  input: LpgConversionPaybackInput,
): LpgConversionPaybackResult | null {
  const {
    annualKm,
    gasolineConsumptionPer100Km,
    lpgConsumptionIncreasePercent,
    gasolinePriceTl,
    lpgPriceTl,
    conversionCostTl,
    annualMaintenanceCostTl,
  } = input;

  if (
    !Number.isFinite(annualKm) ||
    annualKm <= 0 ||
    !Number.isFinite(gasolineConsumptionPer100Km) ||
    gasolineConsumptionPer100Km <= 0 ||
    !Number.isFinite(lpgConsumptionIncreasePercent) ||
    lpgConsumptionIncreasePercent < 0 ||
    !Number.isFinite(gasolinePriceTl) ||
    gasolinePriceTl <= 0 ||
    !Number.isFinite(lpgPriceTl) ||
    lpgPriceTl <= 0 ||
    !Number.isFinite(conversionCostTl) ||
    conversionCostTl <= 0 ||
    !Number.isFinite(annualMaintenanceCostTl) ||
    annualMaintenanceCostTl < 0
  ) {
    return null;
  }

  const lpgConsumptionPer100Km =
    gasolineConsumptionPer100Km * (1 + lpgConsumptionIncreasePercent / 100);

  const annualGasolineCostTl =
    (annualKm / 100) * gasolineConsumptionPer100Km * gasolinePriceTl;
  const annualLpgFuelCostTl =
    (annualKm / 100) * lpgConsumptionPer100Km * lpgPriceTl;
  const annualLpgTotalCostTl = annualLpgFuelCostTl + annualMaintenanceCostTl;

  const annualNetSavingsTl = annualGasolineCostTl - annualLpgTotalCostTl;

  const breakEvenYears =
    annualNetSavingsTl > 0 ? conversionCostTl / annualNetSavingsTl : null;
  const breakEvenKm = breakEvenYears !== null ? breakEvenYears * annualKm : null;

  return {
    lpgConsumptionPer100Km,
    annualGasolineCostTl,
    annualLpgFuelCostTl,
    annualLpgTotalCostTl,
    annualNetSavingsTl,
    breakEvenYears,
    breakEvenKm,
  };
}
