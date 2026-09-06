export function calculateFileSizeFromBitrate(
  bitrateMbps: number,
  durationSeconds: number
): number | null {
  if (
    !Number.isFinite(bitrateMbps) ||
    bitrateMbps <= 0 ||
    !Number.isFinite(durationSeconds) ||
    durationSeconds <= 0
  ) {
    return null;
  }

  return (bitrateMbps * durationSeconds) / 8;
}

export function calculateBitrateFromFileSize(
  fileSizeMb: number,
  durationSeconds: number
): number | null {
  if (
    !Number.isFinite(fileSizeMb) ||
    fileSizeMb <= 0 ||
    !Number.isFinite(durationSeconds) ||
    durationSeconds <= 0
  ) {
    return null;
  }

  return (fileSizeMb * 8) / durationSeconds;
}
