// Malzeme Ozellikleri hub'i -- 105 maddelik yogunluk veritabanini
// (materialsDatabase.ts), zaten var olan 4 ayri hesaplayicinin
// (Isi Iletimi, Reynolds Sayisi, Elastisite Modulu, Isil Genlesme)
// malzeme tablolariyla birlestirip, her malzeme icin bilinen TUM
// ozellikleri tek bir profilde toplar. Capraz referans elle
// eslestirilir (ID'ler dosyalar arasinda farkli oldugu icin), boylece
// sessiz/yanlis eslesme riski olmaz.

import { conductivityPresets } from "./heatConduction";
import { elasticModulusTable } from "./elasticModulus";
import { fluidPresets } from "./reynoldsNumber";
import { thermalExpansionTable } from "./thermalExpansion";
import { materialsDatabase, type MaterialDensityEntry } from "./materialsDatabase";

export interface MaterialProfile extends MaterialDensityEntry {
  thermalConductivityWmK: number | null;
  elasticModulusGPa: number | null;
  thermalExpansionPerMillionK: number | null;
  viscosityMPaS: number | null;
}

// canonical id (materialsDatabase.ts) -> kaynak dosyadaki id
const conductivityIdMap: Record<string, string> = {
  bakir: "copper",
  aluminyum: "aluminum",
  celik: "steel",
  cam: "glass",
  beton: "concrete",
  hava: "air",
  cinko: "zinc",
  nikel: "nickel",
  kalay: "tin",
  altin: "gold",
  gumus: "silver",
  platin: "platinum",
  demir: "iron",
  "dokme-demir": "cast-iron",
  krom: "chromium",
  magnezyum: "magnesium",
  pvc: "pvc",
  pet: "pet",
  polikarbonat: "polycarbonate",
  teflon: "ptfe",
  hdpe: "hdpe",
  naylon: "nylon",
  akrilik: "acrylic",
  abs: "abs",
  hidrojen: "hydrogen",
  helyum: "helium",
  azot: "nitrogen",
  oksijen: "oxygen",
  karbondioksit: "carbonDioxide",
  argon: "argon",
  metan: "methane",
  "cam-agaci": "pine",
  "mese-agaci": "oak",
  tungsten: "tungsten",
  molibden: "molybdenum",
  niyobyum: "niobium",
  paladyum: "palladium",
  vanadyum: "vanadium",
  bizmut: "bismuth",
  kadmiyum: "cadmium",
  balsa: "balsa",
  kavak: "poplar",
  granit: "granite",
  bazalt: "basalt",
  mermer: "marble",
  alci: "gypsum",
  kum: "sand",
  cakil: "gravel",
  tugla: "brick",
  kumtasi: "sandstone",
  kirectasi: "limestone",
  asfalt: "asphalt",
  sedir: "cedar",
  bronz: "bronze",
  buz: "ice",
  propan: "propane",
  butan: "butane",
  klor: "chlorine",
  neon: "neon",
  polipropilen: "polypropylene",
};

const elasticModulusIdMap: Record<string, string> = {
  celik: "steel",
  "paslanmaz-celik": "stainless-steel",
  titanyum: "titanium",
  bakir: "copper",
  "pirinc-alasim": "brass",
  aluminyum: "aluminum",
  cam: "glass",
  beton: "concrete",
  cinko: "zinc",
  nikel: "nickel",
  kalay: "tin",
  altin: "gold",
  gumus: "silver",
  platin: "platinum",
  demir: "iron",
  "dokme-demir": "cast-iron",
  krom: "chromium",
  magnezyum: "magnesium",
  tungsten: "tungsten",
  molibden: "molybdenum",
  niyobyum: "niobium",
  paladyum: "palladium",
  vanadyum: "vanadium",
  antimon: "antimony",
  bizmut: "bismuth",
  kadmiyum: "cadmium",
  bronz: "bronze",
};

const thermalExpansionIdMap: Record<string, string> = {
  aluminyum: "aluminum",
  "pirinc-alasim": "brass",
  kursun: "lead",
  "paslanmaz-celik": "stainless-steel",
  bakir: "copper",
  demir: "iron",
  celik: "carbon-steel",
  beton: "concrete",
  cam: "glass",
  cinko: "zinc",
  nikel: "nickel",
  kalay: "tin",
  altin: "gold",
  gumus: "silver",
  platin: "platinum",
  "dokme-demir": "cast-iron",
  krom: "chromium",
  magnezyum: "magnesium",
  tungsten: "tungsten",
  molibden: "molybdenum",
  niyobyum: "niobium",
  paladyum: "palladium",
  vanadyum: "vanadium",
  kadmiyum: "cadmium",
};

const viscosityIdMap: Record<string, string> = {
  su: "water",
  hava: "air",
  "deniz-suyu": "seawater",
  etanol: "ethanol",
  zeytinyagi: "olive-oil",
  gliserin: "glycerin",
  civa: "mercury",
  benzin: "gasoline",
  sut: "milk",
  aseton: "acetone",
  gazyagi: "kerosene",
  benzen: "benzene",
  kan: "blood",
  sarap: "wine",
  bira: "beer",
  "portakal-suyu": "orange-juice",
  bal: "honey",
  pekmez: "molasses",
};

function findConductivity(canonicalId: string): number | null {
  const sourceId = conductivityIdMap[canonicalId];
  if (!sourceId) return null;
  const preset = conductivityPresets.tr.find((item) => item.id === sourceId);
  const value = preset ? Number(preset.value) : NaN;
  return Number.isFinite(value) ? value : null;
}

function findElasticModulus(canonicalId: string): number | null {
  const sourceId = elasticModulusIdMap[canonicalId];
  if (!sourceId) return null;
  const row = elasticModulusTable.find((item) => item.id === sourceId);
  return row ? row.modulusGPa : null;
}

function findThermalExpansion(canonicalId: string): number | null {
  const sourceId = thermalExpansionIdMap[canonicalId];
  if (!sourceId) return null;
  const row = thermalExpansionTable.find((item) => item.id === sourceId);
  return row ? row.coefficientPerMillionK : null;
}

function findViscosity(canonicalId: string): number | null {
  const sourceId = viscosityIdMap[canonicalId];
  if (!sourceId) return null;
  const preset = fluidPresets.tr.find((item) => item.id === sourceId);
  const value = preset ? Number(preset.viscosityValue) : NaN;
  return Number.isFinite(value) ? value : null;
}

export function getAllMaterialProfiles(): MaterialProfile[] {
  return materialsDatabase.map((material) => ({
    ...material,
    thermalConductivityWmK: findConductivity(material.id),
    elasticModulusGPa: findElasticModulus(material.id),
    thermalExpansionPerMillionK: findThermalExpansion(material.id),
    viscosityMPaS: findViscosity(material.id),
  }));
}

export interface SimilarMaterial {
  id: string;
  nameTr: string;
  densityKgM3: number;
}

// Yogunlugu en yakin olan diger malzemeleri bulur -- log-oran farkina
// gore siralama, boylece hem "500 vs 550" hem "50000 vs 55000" gibi
// oransal olarak yakin ciftler dogru sekilde "benzer" sayilir (duz
// fark degil). Ayni mantik lengthComparison.ts'de de kullanilir.
export function findSimilarDensityMaterials(
  id: string,
  count = 5,
): SimilarMaterial[] {
  const target = materialsDatabase.find((material) => material.id === id);
  if (!target) return [];

  return materialsDatabase
    .filter((material) => material.id !== id)
    .map((material) => ({
      id: material.id,
      nameTr: material.nameTr,
      densityKgM3: material.densityKgM3,
      logDistance: Math.abs(
        Math.log(material.densityKgM3 / target.densityKgM3),
      ),
    }))
    .sort((a, b) => a.logDistance - b.logDistance)
    .slice(0, count)
    .map(({ id: materialId, nameTr, densityKgM3 }) => ({
      id: materialId,
      nameTr,
      densityKgM3,
    }));
}

export function findMaterialProfileById(id: string): MaterialProfile | undefined {
  const material = materialsDatabase.find((item) => item.id === id);
  if (!material) return undefined;

  return {
    ...material,
    thermalConductivityWmK: findConductivity(material.id),
    elasticModulusGPa: findElasticModulus(material.id),
    thermalExpansionPerMillionK: findThermalExpansion(material.id),
    viscosityMPaS: findViscosity(material.id),
  };
}
