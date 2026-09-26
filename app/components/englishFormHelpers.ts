// Ingilizce hesaplayici bilesenleri icin ortak kucuk yardimcilar.

/** Parses "1,234.5" or "12,5" style input; returns null when empty or invalid. */
export function parseInput(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const normalized = /^\d{1,3}(,\d{3})+(\.\d+)?$/.test(trimmed) ? trimmed.replace(/,/g, "") : trimmed.replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

export function formatNumber(value: number, maximumFractionDigits = 1) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits }).format(value);
}

export const KG_PER_LB = 0.45359237;
export const CM_PER_INCH_UI = 2.54;

export type UnitSystem = "us" | "metric";
