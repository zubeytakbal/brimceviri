// Lastik ebati hesaplama -- "205/55 R16" gibi bir lastik kodundan dis
// cap, cevre ve km basina devir sayisini hesaplar. Iki farkli ebat
// girilirse, tekerlek cevresindeki fark uzerinden hiz gostergesi
// sapmasini (gostergenin gercek hizdan ne kadar farkli okudugunu)
// hesaplar -- gosterge, orijinal lastigin cevresine gore kalibre
// edildigi icin farkli bir cevreye sahip lastikte gercek hiz/mesafe
// gostergeden sapar.

export type TireSizeInput = {
  widthMm: number;
  aspectRatioPercent: number;
  rimDiameterInch: number;
};

export type TireSizeResult = {
  sidewallHeightMm: number;
  outerDiameterMm: number;
  outerDiameterInch: number;
  circumferenceMm: number;
  revolutionsPerKm: number;
};

export function calculateTireSize(
  input: TireSizeInput
): TireSizeResult | null {
  const { widthMm, aspectRatioPercent, rimDiameterInch } = input;

  const valid = [widthMm, aspectRatioPercent, rimDiameterInch].every(
    (value) => Number.isFinite(value) && value > 0
  );

  if (!valid) {
    return null;
  }

  const sidewallHeightMm = widthMm * (aspectRatioPercent / 100);
  const outerDiameterMm = rimDiameterInch * 25.4 + 2 * sidewallHeightMm;
  const outerDiameterInch = outerDiameterMm / 25.4;
  const circumferenceMm = Math.PI * outerDiameterMm;
  const revolutionsPerKm = 1_000_000 / circumferenceMm;

  return {
    sidewallHeightMm,
    outerDiameterMm,
    outerDiameterInch,
    circumferenceMm,
    revolutionsPerKm,
  };
}

export type SpeedometerComparisonResult = {
  original: TireSizeResult;
  replacement: TireSizeResult;
  deviationPercent: number;
  actualSpeedAt100: number;
};

export function calculateSpeedometerDeviation(
  original: TireSizeInput,
  replacement: TireSizeInput
): SpeedometerComparisonResult | null {
  const originalResult = calculateTireSize(original);
  const replacementResult = calculateTireSize(replacement);

  if (!originalResult || !replacementResult) {
    return null;
  }

  const deviationPercent =
    ((replacementResult.circumferenceMm - originalResult.circumferenceMm) /
      originalResult.circumferenceMm) *
    100;

  return {
    original: originalResult,
    replacement: replacementResult,
    deviationPercent,
    actualSpeedAt100: 100 * (1 + deviationPercent / 100),
  };
}
