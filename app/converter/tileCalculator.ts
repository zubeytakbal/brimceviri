// Fayans hesaplama -- kaplanacak alandan gerekli fayans adedini tahmin
// eder. Kesim firesi ve desen kaybi icin varsayilan %10 fire payi
// eklenir; kullanici bu orani degistirebilir.

export type TileCalculatorInput = {
  area: number;
  tileWidthCm: number;
  tileHeightCm: number;
  wastePercent: number;
};

export type TileCalculatorResult = {
  tileAreaM2: number;
  requiredAreaWithWaste: number;
  requiredTileCount: number;
};

export function calculateTileNeeds(
  input: TileCalculatorInput
): TileCalculatorResult | null {
  const { area, tileWidthCm, tileHeightCm, wastePercent } = input;

  const dimensionsValid = [area, tileWidthCm, tileHeightCm].every(
    (value) => Number.isFinite(value) && value > 0
  );
  const wasteValid = Number.isFinite(wastePercent) && wastePercent >= 0;

  if (!dimensionsValid || !wasteValid) {
    return null;
  }

  const tileAreaM2 = (tileWidthCm / 100) * (tileHeightCm / 100);
  const requiredAreaWithWaste = area * (1 + wastePercent / 100);
  const requiredTileCount = Math.ceil(requiredAreaWithWaste / tileAreaM2);

  return { tileAreaM2, requiredAreaWithWaste, requiredTileCount };
}
