// Cihaz elektrik tuketimi hesaplama -- guc (watt), gunluk kullanim
// suresi ve kullanim gun sayisindan gunluk/aylik/yillik tuketimi (kWh)
// hesaplar. Birim fiyat girilirse (kisiye/faturaya ozel oldugu icin
// varsayilan bir "guncel" fiyat iddia edilmez) maliyet de hesaplanir.

export type ElectricityConsumptionInput = {
  powerWatt: number;
  hoursPerDay: number;
  daysPerMonth: number;
  kwhPrice: number | null;
};

export type ElectricityConsumptionResult = {
  dailyKwh: number;
  monthlyKwh: number;
  yearlyKwh: number;
  dailyCost: number | null;
  monthlyCost: number | null;
  yearlyCost: number | null;
};

const DAYS_PER_YEAR = 365;

export function calculateElectricityConsumption(
  input: ElectricityConsumptionInput
): ElectricityConsumptionResult | null {
  const { powerWatt, hoursPerDay, daysPerMonth, kwhPrice } = input;

  const baseValid =
    Number.isFinite(powerWatt) &&
    powerWatt > 0 &&
    Number.isFinite(hoursPerDay) &&
    hoursPerDay > 0 &&
    hoursPerDay <= 24 &&
    Number.isFinite(daysPerMonth) &&
    daysPerMonth > 0 &&
    daysPerMonth <= 31;

  if (!baseValid) {
    return null;
  }

  const dailyKwh = (powerWatt * hoursPerDay) / 1000;
  const monthlyKwh = dailyKwh * daysPerMonth;
  const yearlyKwh = dailyKwh * DAYS_PER_YEAR;

  const priceValid =
    kwhPrice !== null && Number.isFinite(kwhPrice) && kwhPrice > 0;

  return {
    dailyKwh,
    monthlyKwh,
    yearlyKwh,
    dailyCost: priceValid ? dailyKwh * kwhPrice : null,
    monthlyCost: priceValid ? monthlyKwh * kwhPrice : null,
    yearlyCost: priceValid ? yearlyKwh * kwhPrice : null,
  };
}
