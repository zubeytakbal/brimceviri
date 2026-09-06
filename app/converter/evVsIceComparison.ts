// Mesken elektrik tarifesi EPDK karariyla degisir ama takvimi asgari
// ucret gibi net/tek bir tarihe bagli degil (kaynaklar celisiyor: kimi
// "3 ayda bir" diyor, somut ornekler yillik gibi duruyor) -- bu yuzden
// "siradaki guncelleme" tahmini VERMIYORUZ, sadece gecmise donuk "son
// guncelleme" bilgisini gosteriyoruz. Deger: 240 kWh/ay ustu dilim,
// KDV dahil (EV sarji yapan bir hane genelde bu dilime girer).
export const manualElectricityPriceDefault = {
  priceTl: 4.86,
  lastUpdatedLabel: "Eylül 2026",
};

export type EvVsIceInput = {
  annualKm: number;
  iceConsumptionPer100Km: number;
  gasolinePriceTl: number;
  evConsumptionPer100Km: number;
  electricityPriceTl: number;
  priceDifferenceTl: number;
};

export type EvVsIceResult = {
  annualGasolineCostTl: number;
  annualElectricityCostTl: number;
  annualSavingsTl: number;
  breakEvenYears: number | null;
  breakEvenKm: number | null;
};

export function calculateEvVsIceComparison(input: EvVsIceInput): EvVsIceResult | null {
  const {
    annualKm,
    iceConsumptionPer100Km,
    gasolinePriceTl,
    evConsumptionPer100Km,
    electricityPriceTl,
    priceDifferenceTl,
  } = input;

  if (
    !Number.isFinite(annualKm) ||
    !Number.isFinite(iceConsumptionPer100Km) ||
    !Number.isFinite(gasolinePriceTl) ||
    !Number.isFinite(evConsumptionPer100Km) ||
    !Number.isFinite(electricityPriceTl) ||
    !Number.isFinite(priceDifferenceTl) ||
    annualKm <= 0 ||
    iceConsumptionPer100Km <= 0 ||
    gasolinePriceTl <= 0 ||
    evConsumptionPer100Km <= 0 ||
    electricityPriceTl <= 0 ||
    priceDifferenceTl < 0
  ) {
    return null;
  }

  const annualGasolineCostTl = annualKm * (iceConsumptionPer100Km / 100) * gasolinePriceTl;
  const annualElectricityCostTl = annualKm * (evConsumptionPer100Km / 100) * electricityPriceTl;
  const annualSavingsTl = annualGasolineCostTl - annualElectricityCostTl;

  const breakEvenYears =
    priceDifferenceTl > 0 && annualSavingsTl > 0 ? priceDifferenceTl / annualSavingsTl : null;
  const breakEvenKm = breakEvenYears !== null ? breakEvenYears * annualKm : null;

  return {
    annualGasolineCostTl,
    annualElectricityCostTl,
    annualSavingsTl,
    breakEvenYears,
    breakEvenKm,
  };
}
