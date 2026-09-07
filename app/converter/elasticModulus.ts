export type ElasticModulusRow = {
  id: string;
  label: string;
  modulusGPa: number;
  isVariable?: boolean;
};

// Yaygin kabul goren elastisite modulu (Young modulu) degerleri (GPa).
// Metaller icin oldukca dar bir aralikta, iyi bilinen sabitlerdir.
// Beton ise karisim oranina, agrega turune ve kurma suresine gore
// onemli olcude degisebilir -- bu yuzden isVariable ile isaretlenmistir.
export const elasticModulusTable: ElasticModulusRow[] = [
  { id: "steel", label: "Çelik (Yapı Çeliği)", modulusGPa: 200 },
  { id: "stainless-steel", label: "Paslanmaz Çelik", modulusGPa: 193 },
  { id: "titanium", label: "Titanyum", modulusGPa: 114 },
  { id: "copper", label: "Bakır", modulusGPa: 117 },
  { id: "brass", label: "Pirinç (Bronz)", modulusGPa: 105 },
  { id: "aluminum", label: "Alüminyum", modulusGPa: 69 },
  { id: "glass", label: "Cam", modulusGPa: 70 },
  { id: "concrete", label: "Beton", modulusGPa: 30, isVariable: true },
  { id: "zinc", label: "Çinko", modulusGPa: 108 },
  { id: "nickel", label: "Nikel", modulusGPa: 200 },
  { id: "tin", label: "Kalay", modulusGPa: 50 },
  { id: "gold", label: "Altın", modulusGPa: 79 },
  { id: "silver", label: "Gümüş", modulusGPa: 83 },
  { id: "platinum", label: "Platin", modulusGPa: 168 },
  { id: "iron", label: "Demir", modulusGPa: 200 },
  { id: "cast-iron", label: "Dökme Demir", modulusGPa: 170, isVariable: true },
  { id: "chromium", label: "Krom", modulusGPa: 279 },
  { id: "magnesium", label: "Magnezyum", modulusGPa: 45 },
  { id: "tungsten", label: "Tungsten", modulusGPa: 411 },
  { id: "molybdenum", label: "Molibden", modulusGPa: 329 },
  { id: "niobium", label: "Niyobyum", modulusGPa: 105 },
  { id: "palladium", label: "Paladyum", modulusGPa: 121 },
  { id: "vanadium", label: "Vanadyum", modulusGPa: 128 },
  { id: "antimony", label: "Antimon", modulusGPa: 78 },
  { id: "bismuth", label: "Bizmut", modulusGPa: 32 },
  { id: "cadmium", label: "Kadmiyum", modulusGPa: 55 },
  { id: "bronze", label: "Bronz", modulusGPa: 103, isVariable: true },
];

export type ElongationResult = {
  stressMPa: number;
  elongationMm: number;
};

// Hooke Yasasi: sigma = F/A, epsilon = sigma/E, DeltaL = epsilon x L0.
// F Newton, A mm^2, L0 mm, E GPa (= 1000 MPa) birimlerinde alinir.
export function calculateElongation(
  forceN: number,
  areaMm2: number,
  lengthMm: number,
  modulusGPa: number
): ElongationResult | null {
  if (!Number.isFinite(forceN) || forceN <= 0) {
    return null;
  }

  if (!Number.isFinite(areaMm2) || areaMm2 <= 0) {
    return null;
  }

  if (!Number.isFinite(lengthMm) || lengthMm <= 0) {
    return null;
  }

  if (!Number.isFinite(modulusGPa) || modulusGPa <= 0) {
    return null;
  }

  const modulusMPa = modulusGPa * 1000;
  const stressMPa = forceN / areaMm2;
  const strain = stressMPa / modulusMPa;
  const elongationMm = strain * lengthMm;

  return { stressMPa, elongationMm };
}
