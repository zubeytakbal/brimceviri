export type MaterialDensityRow = {
  id: string;
  label: string;
  densityKgM3: number;
};

// ~20 C civarinda, yaygin kabul goren muhendislik yogunluk degerleri
// (kg/m3). CRC Handbook tarzi kaynaklara dayanan genel referans
// degerleridir; alasim/tur farklarina gore kucuk sapmalar olabilir.
export const materialDensityTable: MaterialDensityRow[] = [
  { id: "steel", label: "Çelik (Karbon)", densityKgM3: 7850 },
  { id: "stainless-steel", label: "Paslanmaz Çelik", densityKgM3: 8000 },
  { id: "aluminum", label: "Alüminyum", densityKgM3: 2700 },
  { id: "copper", label: "Bakır", densityKgM3: 8960 },
  { id: "brass", label: "Pirinç (Bronz)", densityKgM3: 8500 },
  { id: "zinc", label: "Çinko", densityKgM3: 7140 },
  { id: "lead", label: "Kurşun", densityKgM3: 11340 },
  { id: "titanium", label: "Titanyum", densityKgM3: 4500 },
  { id: "glass", label: "Cam", densityKgM3: 2500 },
  { id: "concrete", label: "Beton", densityKgM3: 2400 },
  { id: "oak", label: "Ahşap (Meşe)", densityKgM3: 750 },
  { id: "pine", label: "Ahşap (Çam)", densityKgM3: 500 },
  { id: "pvc", label: "PVC", densityKgM3: 1400 },
  { id: "water", label: "Su", densityKgM3: 1000 },
];

export function calculateMassFromVolumeCm3(
  densityKgM3: number,
  volumeCm3: number
): number | null {
  if (
    !Number.isFinite(densityKgM3) ||
    densityKgM3 <= 0 ||
    !Number.isFinite(volumeCm3) ||
    volumeCm3 <= 0
  ) {
    return null;
  }

  return (densityKgM3 * volumeCm3) / 1_000_000;
}

export function calculateVolumeCm3FromMass(
  densityKgM3: number,
  massKg: number
): number | null {
  if (
    !Number.isFinite(densityKgM3) ||
    densityKgM3 <= 0 ||
    !Number.isFinite(massKg) ||
    massKg <= 0
  ) {
    return null;
  }

  return (massKg * 1_000_000) / densityKgM3;
}
