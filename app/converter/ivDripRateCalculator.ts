// IV damla hizi hesaplama -- verilen hacim, sure ve damla faktorunden
// dakikadaki damla sayisini (gtt/dk) hesaplar. ONEMLI: bu arac yalnizca
// birim cevirimi yapar -- hekim tarafindan recete edilen hizi/hacmi
// DEGISTIRMEZ, degistiremez. Sonuc her zaman recete edilen degerle ve
// kurum protokolu ile karsilastirilmalidir.

export type IvDripRateInput = {
  volumeMl: number;
  timeMinutes: number;
  dropFactorGttPerMl: number;
};

export type IvDripRateResult = {
  dropsPerMinute: number;
  mlPerHour: number;
};

export function calculateIvDripRate(
  input: IvDripRateInput
): IvDripRateResult | null {
  const { volumeMl, timeMinutes, dropFactorGttPerMl } = input;

  if (
    !Number.isFinite(volumeMl) ||
    volumeMl <= 0 ||
    !Number.isFinite(timeMinutes) ||
    timeMinutes <= 0 ||
    !Number.isFinite(dropFactorGttPerMl) ||
    dropFactorGttPerMl <= 0
  ) {
    return null;
  }

  return {
    dropsPerMinute: (volumeMl * dropFactorGttPerMl) / timeMinutes,
    mlPerHour: (volumeMl / timeMinutes) * 60,
  };
}
