// Pozlama esdegeri (equivalent exposure) hesaplari, standart fotografcilik
// bagintisina dayanir: parlaklik ISO x t / N^2 ile orantilidir (N = diyafram
// f-sayisi, t = enstantane suresi saniye). Ayni parlakligi korumak icin:
// ISO1 x t1 / N1^2 = ISO2 x t2 / N2^2

export function parseShutterSpeed(input: string): number | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const fractionMatch = trimmed.match(/^(\d+(\.\d+)?)\s*\/\s*(\d+(\.\d+)?)$/);
  if (fractionMatch) {
    const numerator = Number(fractionMatch[1]);
    const denominator = Number(fractionMatch[3]);
    if (denominator === 0) return null;
    const value = numerator / denominator;
    return value > 0 ? value : null;
  }

  const numeric = Number(trimmed.replace(",", "."));
  return Number.isFinite(numeric) && numeric > 0 ? numeric : null;
}

export function formatShutterSpeed(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "—";

  if (seconds >= 1) {
    return `${seconds.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} sn`;
  }

  const denominator = Math.round(1 / seconds);
  return `1/${denominator} sn`;
}

function isPositive(value: number): boolean {
  return Number.isFinite(value) && value > 0;
}

export function calculateMissingShutter(
  iso1: number,
  aperture1: number,
  shutter1: number,
  iso2: number,
  aperture2: number
): number | null {
  if (![iso1, aperture1, shutter1, iso2, aperture2].every(isPositive)) {
    return null;
  }

  return shutter1 * (iso1 / iso2) * (aperture2 / aperture1) ** 2;
}

export function calculateMissingAperture(
  iso1: number,
  aperture1: number,
  shutter1: number,
  iso2: number,
  shutter2: number
): number | null {
  if (![iso1, aperture1, shutter1, iso2, shutter2].every(isPositive)) {
    return null;
  }

  return aperture1 * Math.sqrt((iso2 * shutter2) / (iso1 * shutter1));
}

export function calculateMissingIso(
  iso1: number,
  aperture1: number,
  shutter1: number,
  aperture2: number,
  shutter2: number
): number | null {
  if (![iso1, aperture1, shutter1, aperture2, shutter2].every(isPositive)) {
    return null;
  }

  return iso1 * ((aperture2 ** 2 * shutter1) / (aperture1 ** 2 * shutter2));
}
