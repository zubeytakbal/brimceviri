// Duvar kagidi hesaplama -- oda olculerinden (dort duvarin genislikleri
// ve tavan yuksekligi) toplam duvar alanini, rulo olculerinden rulo
// basina alani bulup kac rulo gerektigini hesaplar. Desen eslestirme
// firesi icin varsayilan %15 fire payi eklenir (duz desenlerden daha
// yuksek, cunku motif eslestirme kaybi da var).

export type WallpaperCalculatorInput = {
  wallWidthsM: number[];
  wallHeightM: number;
  rollWidthCm: number;
  rollLengthM: number;
  wastePercent: number;
};

export type WallpaperCalculatorResult = {
  totalWallAreaM2: number;
  rollAreaM2: number;
  requiredAreaWithWaste: number;
  requiredRollCount: number;
};

export function calculateWallpaperNeeds(
  input: WallpaperCalculatorInput
): WallpaperCalculatorResult | null {
  const { wallWidthsM, wallHeightM, rollWidthCm, rollLengthM, wastePercent } =
    input;

  const widthsValid =
    wallWidthsM.length > 0 &&
    wallWidthsM.every((value) => Number.isFinite(value) && value > 0);
  const otherValid = [wallHeightM, rollWidthCm, rollLengthM].every(
    (value) => Number.isFinite(value) && value > 0
  );
  const wasteValid = Number.isFinite(wastePercent) && wastePercent >= 0;

  if (!widthsValid || !otherValid || !wasteValid) {
    return null;
  }

  const totalWidthM = wallWidthsM.reduce((sum, width) => sum + width, 0);
  const totalWallAreaM2 = totalWidthM * wallHeightM;
  const rollAreaM2 = (rollWidthCm / 100) * rollLengthM;
  const requiredAreaWithWaste = totalWallAreaM2 * (1 + wastePercent / 100);
  const requiredRollCount = Math.ceil(requiredAreaWithWaste / rollAreaM2);

  return {
    totalWallAreaM2,
    rollAreaM2,
    requiredAreaWithWaste,
    requiredRollCount,
  };
}
