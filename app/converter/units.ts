import { unitRegistry } from "./unitRegistry";

const categoriesExcludedFromUnitsExport = new Set(["debi", "elektrik"]);

export const units: Record<string, string[]> = {};

for (const entry of unitRegistry) {
  if (categoriesExcludedFromUnitsExport.has(entry.category)) {
    continue;
  }

  if (!units[entry.category]) {
    units[entry.category] = [];
  }

  units[entry.category].push(entry.symbol);
}
