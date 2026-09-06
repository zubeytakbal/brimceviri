export function calculateRectangularPoolVolume(
  lengthM: number,
  widthM: number,
  avgDepthM: number
): number | null {
  if (
    !Number.isFinite(lengthM) ||
    lengthM <= 0 ||
    !Number.isFinite(widthM) ||
    widthM <= 0 ||
    !Number.isFinite(avgDepthM) ||
    avgDepthM <= 0
  ) {
    return null;
  }

  return lengthM * widthM * avgDepthM;
}

export function calculateRoundPoolVolume(
  diameterM: number,
  avgDepthM: number
): number | null {
  if (
    !Number.isFinite(diameterM) ||
    diameterM <= 0 ||
    !Number.isFinite(avgDepthM) ||
    avgDepthM <= 0
  ) {
    return null;
  }

  return Math.PI * (diameterM / 2) ** 2 * avgDepthM;
}

export type ChlorineDoseInput = {
  volumeM3: number;
  currentChlorinePpm: number;
  targetChlorinePpm: number;
  productActivePercent: number;
};

// ppm = mg/L. Hedef ile mevcut klor farkinin hacimle carpimi, eklenmesi
// gereken saf klor kutlesini (mg) verir; urunun aktif klor yuzdesine
// bolunerek toplam urun miktari bulunur.
export function calculateChlorineDose(input: ChlorineDoseInput): number | null {
  const { volumeM3, currentChlorinePpm, targetChlorinePpm, productActivePercent } = input;

  if (!Number.isFinite(volumeM3) || volumeM3 <= 0) {
    return null;
  }

  if (!Number.isFinite(currentChlorinePpm) || currentChlorinePpm < 0) {
    return null;
  }

  if (!Number.isFinite(targetChlorinePpm) || targetChlorinePpm <= currentChlorinePpm) {
    return null;
  }

  if (
    !Number.isFinite(productActivePercent) ||
    productActivePercent <= 0 ||
    productActivePercent > 100
  ) {
    return null;
  }

  const volumeLiters = volumeM3 * 1000;
  const pureChlorineNeededGrams =
    ((targetChlorinePpm - currentChlorinePpm) * volumeLiters) / 1000;

  return pureChlorineNeededGrams / (productActivePercent / 100);
}
