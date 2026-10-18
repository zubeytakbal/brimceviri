export type ScreedInput = {
  areaM2: number;
  thicknessMm: number;
  wastePercent: number;
};

export type ScreedResult = {
  netVolumeM3: number;
  volumeWithWasteM3: number;
  volumeWithWasteL: number;
};

export function calculateScreedVolume(input: ScreedInput): ScreedResult | null {
  const { areaM2, thicknessMm, wastePercent } = input;
  if (
    !Number.isFinite(areaM2) ||
    areaM2 <= 0 ||
    !Number.isFinite(thicknessMm) ||
    thicknessMm <= 0 ||
    !Number.isFinite(wastePercent) ||
    wastePercent < 0
  ) {
    return null;
  }

  const netVolumeM3 = areaM2 * (thicknessMm / 1000);
  const volumeWithWasteM3 = netVolumeM3 * (1 + wastePercent / 100);
  const volumeWithWasteL = volumeWithWasteM3 * 1000;
  if (![netVolumeM3, volumeWithWasteM3, volumeWithWasteL].every(Number.isFinite)) return null;

  return { netVolumeM3, volumeWithWasteM3, volumeWithWasteL };
}
