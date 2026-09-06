export type ThermalExpansionRow = {
  id: string;
  label: string;
  coefficientPerMillionK: number;
};

// ~20 C civarinda, yaygin kabul goren dogrusal isil genlesme katsayilari
// (x10^-6 /K). Genel muhendislik referans degerleridir.
export const thermalExpansionTable: ThermalExpansionRow[] = [
  { id: "aluminum", label: "Alüminyum", coefficientPerMillionK: 22 },
  { id: "brass", label: "Pirinç", coefficientPerMillionK: 19 },
  { id: "lead", label: "Kurşun", coefficientPerMillionK: 29 },
  { id: "stainless-steel", label: "Paslanmaz Çelik", coefficientPerMillionK: 17.3 },
  { id: "copper", label: "Bakır", coefficientPerMillionK: 17 },
  { id: "iron", label: "Demir", coefficientPerMillionK: 12 },
  { id: "carbon-steel", label: "Karbon Çeliği", coefficientPerMillionK: 10.8 },
  { id: "concrete", label: "Beton", coefficientPerMillionK: 12 },
  { id: "glass", label: "Cam", coefficientPerMillionK: 8.5 },
];

export function calculateThermalExpansion(
  originalLengthM: number,
  coefficientPerMillionK: number,
  deltaTempC: number
): number | null {
  if (!Number.isFinite(originalLengthM) || originalLengthM <= 0) {
    return null;
  }

  if (!Number.isFinite(coefficientPerMillionK) || coefficientPerMillionK <= 0) {
    return null;
  }

  if (!Number.isFinite(deltaTempC)) {
    return null;
  }

  return originalLengthM * (coefficientPerMillionK / 1_000_000) * deltaTempC;
}
