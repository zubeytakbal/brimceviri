export type ZoningInput = {
  parcelAreaM2: number;
  kaks: number;
  taks: number | null;
};

export type ZoningResult = {
  totalConstructionAreaM2: number;
  maxFootprintM2: number | null;
  estimatedFloors: number | null;
};

// KAKS (Kat Alani Katsayisi / Emsal): Toplam Insaat Alani = Arsa Alani x KAKS.
// TAKS (Taban Alani Katsayisi): Maksimum Taban Alani = Arsa Alani x TAKS.
// Ikisi birlikte verildiginde, toplam alanin taban alanina bolunmesi
// yaklasik kat sayisini verir.
export function calculateZoningArea(input: ZoningInput): ZoningResult | null {
  const { parcelAreaM2, kaks, taks } = input;

  if (!Number.isFinite(parcelAreaM2) || parcelAreaM2 <= 0) {
    return null;
  }

  if (!Number.isFinite(kaks) || kaks <= 0) {
    return null;
  }

  const totalConstructionAreaM2 = parcelAreaM2 * kaks;

  if (taks === null || !Number.isFinite(taks) || taks <= 0) {
    return { totalConstructionAreaM2, maxFootprintM2: null, estimatedFloors: null };
  }

  const maxFootprintM2 = parcelAreaM2 * taks;

  return {
    totalConstructionAreaM2,
    maxFootprintM2,
    estimatedFloors: totalConstructionAreaM2 / maxFootprintM2,
  };
}
