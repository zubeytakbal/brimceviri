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
