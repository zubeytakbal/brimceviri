// Superheat/subcooling hesabi kasitli olarak basinc-sicaklik (P-T) donusumu
// YAPMAZ -- teknisyen doyma sicakligini kendi sogutucu gaza ozel P-T
// kartindan/uygulamasindan okur, bu arac yalnizca cikarma islemini yapar.
// Boylece yanlis/eskimis P-T verisi saglama riski tasinmaz.

export function calculateSuperheat(
  measuredTempC: number,
  saturationTempC: number
): number | null {
  if (!Number.isFinite(measuredTempC) || !Number.isFinite(saturationTempC)) {
    return null;
  }

  return measuredTempC - saturationTempC;
}

export function calculateSubcooling(
  saturationTempC: number,
  measuredTempC: number
): number | null {
  if (!Number.isFinite(saturationTempC) || !Number.isFinite(measuredTempC)) {
    return null;
  }

  return saturationTempC - measuredTempC;
}
