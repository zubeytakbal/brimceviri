import type { MaterialDensityRow } from "./materialDensity";

// Deutsche Beschriftungen für die kuratierte ~19-Zeilen-Tabelle aus
// materialDensity.ts (nicht die vollen 105 Materialien aus
// materialsDatabase.ts). IDs und Dichtewerte sind identisch, nur die
// Labels werden lokalisiert.
export const materialDensityTableDe: MaterialDensityRow[] = [
  { id: "steel", label: "Stahl (Kohlenstoffstahl)", densityKgM3: 7850 },
  { id: "stainless-steel", label: "Edelstahl", densityKgM3: 8000 },
  { id: "aluminum", label: "Aluminium", densityKgM3: 2700 },
  { id: "copper", label: "Kupfer", densityKgM3: 8960 },
  { id: "brass", label: "Messing", densityKgM3: 8500 },
  { id: "zinc", label: "Zink", densityKgM3: 7140 },
  { id: "lead", label: "Blei", densityKgM3: 11340 },
  { id: "titanium", label: "Titan", densityKgM3: 4500 },
  { id: "glass", label: "Glas", densityKgM3: 2500 },
  { id: "concrete", label: "Beton", densityKgM3: 2400 },
  { id: "oak", label: "Holz (Eiche)", densityKgM3: 750 },
  { id: "pine", label: "Holz (Kiefer)", densityKgM3: 500 },
  { id: "pvc", label: "PVC", densityKgM3: 1400 },
  { id: "water", label: "Wasser", densityKgM3: 1000 },
  { id: "gasoline", label: "Benzin", densityKgM3: 740 },
  { id: "diesel", label: "Diesel", densityKgM3: 850 },
  { id: "acetone", label: "Aceton", densityKgM3: 790 },
  { id: "milk", label: "Milch", densityKgM3: 1030 },
  { id: "honey", label: "Honig", densityKgM3: 1420 },
];
