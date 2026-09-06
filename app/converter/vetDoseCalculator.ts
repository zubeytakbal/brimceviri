// Veteriner doz-hacim hesaplama -- bu arac SADECE aritmetik cevrim yapar:
// hekim tarafindan zaten belirlenmis mg/kg doz degerini, hayvan agirligi ve
// ilac konsantrasyonuyla birlikte mL hacme cevirir. Hangi mg/kg dozunun
// uygun oldugunu ONERMEZ/BELIRLEMEZ -- bu deger her zaman kullanici
// tarafindan bir veteriner hekimden veya resmi prospektusten girilir.
// Ayni guvenlik siniri IvDripRateCalculator icin de gecerlidir.

export type VetDoseInput = {
  weightKg: number;
  dosePerKg: number;
  concentrationMgPerMl: number;
};

export type VetDoseResult = {
  totalDoseMg: number;
  volumeMl: number;
};

export function calculateVetDose(input: VetDoseInput): VetDoseResult | null {
  const { weightKg, dosePerKg, concentrationMgPerMl } = input;

  if (
    !Number.isFinite(weightKg) ||
    weightKg <= 0 ||
    !Number.isFinite(dosePerKg) ||
    dosePerKg <= 0 ||
    !Number.isFinite(concentrationMgPerMl) ||
    concentrationMgPerMl <= 0
  ) {
    return null;
  }

  const totalDoseMg = weightKg * dosePerKg;

  return {
    totalDoseMg,
    volumeMl: totalDoseMg / concentrationMgPerMl,
  };
}
