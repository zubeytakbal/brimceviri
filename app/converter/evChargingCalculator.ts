// Elektrikli arac sarj suresi ve menzil hesaplama -- iki bagimsiz hesap:
// (1) batarya kapasitesi + mevcut/hedef sarj yuzdesi + sarj gucunden
// tahmini sarj suresi, (2) batarya kapasitesi + tuketimden tahmini
// menzil. Sarj verimliligi icin varsayilan %90 (gercek AC/DC sarjda
// kayip olur) kullanilir.

export type EvChargingTimeInput = {
  batteryCapacityKwh: number;
  currentPercent: number;
  targetPercent: number;
  chargerPowerKw: number;
  efficiencyPercent: number;
};

export type EvChargingTimeResult = {
  energyNeededKwh: number;
  chargingHours: number;
};

export function calculateEvChargingTime(
  input: EvChargingTimeInput
): EvChargingTimeResult | null {
  const {
    batteryCapacityKwh,
    currentPercent,
    targetPercent,
    chargerPowerKw,
    efficiencyPercent,
  } = input;

  const baseValid =
    Number.isFinite(batteryCapacityKwh) &&
    batteryCapacityKwh > 0 &&
    Number.isFinite(currentPercent) &&
    currentPercent >= 0 &&
    currentPercent <= 100 &&
    Number.isFinite(targetPercent) &&
    targetPercent > currentPercent &&
    targetPercent <= 100 &&
    Number.isFinite(chargerPowerKw) &&
    chargerPowerKw > 0 &&
    Number.isFinite(efficiencyPercent) &&
    efficiencyPercent > 0 &&
    efficiencyPercent <= 100;

  if (!baseValid) {
    return null;
  }

  const energyNeededKwh =
    (batteryCapacityKwh * (targetPercent - currentPercent)) / 100;
  const chargingHours =
    energyNeededKwh / (chargerPowerKw * (efficiencyPercent / 100));

  return { energyNeededKwh, chargingHours };
}

export type EvRangeInput = {
  batteryCapacityKwh: number;
  consumptionKwhPer100Km: number;
};

export type EvRangeResult = {
  rangeKm: number;
};

export function calculateEvRange(input: EvRangeInput): EvRangeResult | null {
  const { batteryCapacityKwh, consumptionKwhPer100Km } = input;

  if (
    !Number.isFinite(batteryCapacityKwh) ||
    batteryCapacityKwh <= 0 ||
    !Number.isFinite(consumptionKwhPer100Km) ||
    consumptionKwhPer100Km <= 0
  ) {
    return null;
  }

  return {
    rangeKm: (batteryCapacityKwh / consumptionKwhPer100Km) * 100,
  };
}
