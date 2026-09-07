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
  { id: "zinc", label: "Çinko", coefficientPerMillionK: 30 },
  { id: "nickel", label: "Nikel", coefficientPerMillionK: 13.4 },
  { id: "tin", label: "Kalay", coefficientPerMillionK: 22 },
  { id: "gold", label: "Altın", coefficientPerMillionK: 14.2 },
  { id: "silver", label: "Gümüş", coefficientPerMillionK: 19.5 },
  { id: "platinum", label: "Platin", coefficientPerMillionK: 8.8 },
  { id: "cast-iron", label: "Dökme Demir", coefficientPerMillionK: 10.5 },
  { id: "chromium", label: "Krom", coefficientPerMillionK: 6.2 },
  { id: "magnesium", label: "Magnezyum", coefficientPerMillionK: 26 },
  { id: "tungsten", label: "Tungsten", coefficientPerMillionK: 4.5 },
  { id: "molybdenum", label: "Molibden", coefficientPerMillionK: 4.8 },
  { id: "niobium", label: "Niyobyum", coefficientPerMillionK: 7.3 },
  { id: "palladium", label: "Paladyum", coefficientPerMillionK: 11.8 },
  { id: "vanadium", label: "Vanadyum", coefficientPerMillionK: 8.4 },
  { id: "cadmium", label: "Kadmiyum", coefficientPerMillionK: 30.8 },
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
