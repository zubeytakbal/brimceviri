import { unitRegistry } from "./unitRegistry";

const factorTables = new Map<string, Record<string, number>>();

for (const entry of unitRegistry) {
  if (entry.siFactor === undefined) {
    continue;
  }

  let table = factorTables.get(entry.category);

  if (!table) {
    table = {};
    factorTables.set(entry.category, table);
  }

  table[entry.symbol] = entry.siFactor;
}

export function convert(
  category: string,
  value: number,
  from: string,
  to: string
): number {
  if (!Number.isFinite(value)) {
    return NaN;
  }

  if (category === "sicaklik") {
    if (from === "C" && to === "F") return (value * 9) / 5 + 32;
    if (from === "F" && to === "C") return ((value - 32) * 5) / 9;
    if (from === "C" && to === "K") return value + 273.15;
    if (from === "K" && to === "C") return value - 273.15;
    if (from === "F" && to === "K") return ((value - 32) * 5) / 9 + 273.15;
    if (from === "K" && to === "F") return ((value - 273.15) * 9) / 5 + 32;
    return value;
  }

  const t = factorTables.get(category);

  if (!t) {
    return value;
  }

  return (value * t[from]) / t[to];
}
