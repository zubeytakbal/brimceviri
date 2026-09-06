// Yogunluk irtifasi (density altitude) hesaplama -- pilotlarin ucus
// performansi planlamasinda (kalkis/inis mesafesi, tirmanma orani)
// kullandigi standart FAA kural-of-thumb formulu. Sicak ve/veya yuksek
// irtifali havaalanlarinda hava yogunlugu azalir, bu da motor/kanat
// performansini dusurur -- yogunluk irtifasi bu etkiyi tek bir "esdeger
// irtifa" degeriyle ozetler.

export type DensityAltitudeInput = {
  pressureAltitudeFt: number;
  outsideAirTempC: number;
};

export type DensityAltitudeResult = {
  isaTempC: number;
  densityAltitudeFt: number;
};

export function calculateDensityAltitude(
  input: DensityAltitudeInput
): DensityAltitudeResult | null {
  const { pressureAltitudeFt, outsideAirTempC } = input;

  if (
    !Number.isFinite(pressureAltitudeFt) ||
    !Number.isFinite(outsideAirTempC)
  ) {
    return null;
  }

  const isaTempC = 15 - 2 * (pressureAltitudeFt / 1000);
  const densityAltitudeFt =
    pressureAltitudeFt + 120 * (outsideAirTempC - isaTempC);

  return { isaTempC, densityAltitudeFt };
}
