import type { SteelSeriesId } from "./steelSections";

export const SERIES_LABELS: Record<SteelSeriesId, string> = {
  IPE: "IPE",
  HEA: "HEA",
  HEB: "HEB",
  HEM: "HEM",
  UPN: "NPU (UPN)",
  IPN: "NPI (IPN)",
};

/** Profil adı; UPN/IPN Türkiye'deki yaygın adlarıyla (NPU/NPI) yazılır. */
export function sectionName(series: SteelSeriesId, size: number) {
  if (series === "UPN") return `NPU ${size}`;
  if (series === "IPN") return `NPI ${size}`;
  return `${series} ${size}`;
}
