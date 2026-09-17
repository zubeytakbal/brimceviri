import { unitRegistry } from "./unitRegistry";

function temperatureToCelsius(value: number, unit: string): number {
  if (unit === "F") return ((value - 32) * 5) / 9;
  if (unit === "K") return value - 273.15;
  if (unit === "R") return (value * 5) / 9 - 273.15;
  if (unit === "Re") return (value * 5) / 4;
  return value;
}

function temperatureFromCelsius(celsius: number, unit: string): number {
  if (unit === "F") return (celsius * 9) / 5 + 32;
  if (unit === "K") return celsius + 273.15;
  if (unit === "R") return (celsius + 273.15) * (9 / 5);
  if (unit === "Re") return (celsius * 4) / 5;
  return celsius;
}

const factorTables = new Map<string, Record<string, number>>();

const electricityQuantityBySymbol: Record<string, "voltage" | "current"> = {
  mV: "voltage",
  V: "voltage",
  kV: "voltage",
  mA: "current",
  A: "current",
  kA: "current",
};

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
    // Her birim once santigrat'a, oradan hedef birime cevrilir -- Rankine ve
    // Reaumur eklendiginde bu fonksiyon guncellenmemisti, PairConverter'in
    // canli hesaplamasi bu iki birim icin sessizce yanlis (degismemis)
    // deger donduruyordu; statik sayfa metni (conversionPages.ts) dogruydu.
    return temperatureFromCelsius(temperatureToCelsius(value, from), to);
  }

  // The legacy Electricity category intentionally groups voltage and current
  // for navigation, not because they are interchangeable. Returning NaN is
  // safer than silently presenting a value such as 1 V = 1 A.
  if (category === "elektrik") {
    const fromQuantity = electricityQuantityBySymbol[from];
    const toQuantity = electricityQuantityBySymbol[to];

    if (
      fromQuantity !== undefined &&
      toQuantity !== undefined &&
      fromQuantity !== toQuantity
    ) {
      return NaN;
    }
  }

  const t = factorTables.get(category);

  if (!t) {
    return value;
  }

  return (value * t[from]) / t[to];
}
