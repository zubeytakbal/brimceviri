import { unitRegistry } from "./unitRegistry";

const categoriesExcludedFromUnitsExport = new Set(["debi", "elektrik"]);
const symbolsExcludedFromUnitsExport = new Set(["enerji:W", "enerji:kW"]);

export const units: Record<string, string[]> = {};

for (const entry of unitRegistry) {
  if (categoriesExcludedFromUnitsExport.has(entry.category)) {
    continue;
  }

  if (symbolsExcludedFromUnitsExport.has(`${entry.category}:${entry.symbol}`)) {
    continue;
  }

  if (!units[entry.category]) {
    units[entry.category] = [];
  }

  units[entry.category].push(entry.symbol);
}
