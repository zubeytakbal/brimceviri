// Kereste metrekup (hacim) hesaplama -- kereste parcalarinin
// uzunluk x genislik x kalinlik x adet degerlerinden toplam hacmi
// bulur. Fire orani, kesim/islem kaybini karsilamak icin isteğe
// bagli eklenir. Tamamen genel geometri hesabidir.

export type KerestePieceInput = {
  lengthM: number;
  widthCm: number;
  thicknessCm: number;
  quantity: number;
};

export type KeresteResult = {
  totalVolumeM3: number;
  wasteVolumeM3: number;
  totalVolumeWithWasteM3: number;
};

export function calculateKerestehacmi(
  pieces: KerestePieceInput[],
  wastePercent: number
): KeresteResult | null {
  const validPieces = pieces.filter(
    (item) =>
      Number.isFinite(item.lengthM) &&
      item.lengthM > 0 &&
      Number.isFinite(item.widthCm) &&
      item.widthCm > 0 &&
      Number.isFinite(item.thicknessCm) &&
      item.thicknessCm > 0 &&
      Number.isFinite(item.quantity) &&
      item.quantity > 0
  );

  if (validPieces.length === 0) {
    return null;
  }

  const normalizedWastePercent =
    Number.isFinite(wastePercent) && wastePercent > 0 ? wastePercent : 0;

  let totalVolumeM3 = 0;

  for (const item of validPieces) {
    const pieceVolumeM3 =
      item.lengthM * (item.widthCm / 100) * (item.thicknessCm / 100);
    totalVolumeM3 += pieceVolumeM3 * item.quantity;
  }

  const wasteVolumeM3 = totalVolumeM3 * (normalizedWastePercent / 100);

  return {
    totalVolumeM3,
    wasteVolumeM3,
    totalVolumeWithWasteM3: totalVolumeM3 + wasteVolumeM3,
  };
}
