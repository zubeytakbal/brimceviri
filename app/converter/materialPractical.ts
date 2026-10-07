// Malzeme sayfaları için kategoriye göre pratik ağırlık örnekleri, suya/havaya göre davranış ve
// yoğunluk sıralaması. Hepsi malzemenin yoğunluğundan hesaplanır; her malzemenin kendi
// kullanımına uygun ölçüler seçilir (metalde sac ve çubuk, sıvıda bidon, gıdada su bardağı).
import { materialsDatabase, type MaterialCategory, type MaterialDensityEntry } from "./materialsDatabase";

export type PracticalLocale = "tr" | "de" | "uz";

type Shape = { label: Record<PracticalLocale, string>; volumeM3: number };

const rod = (diameterMm: number, lengthM = 1) => Math.PI * (diameterMm / 2000) ** 2 * lengthM;
const sheet = (thicknessMm: number, areaM2 = 1) => (thicknessMm / 1000) * areaM2;
const L = (litres: number) => litres / 1000;

const SHAPES: Record<MaterialCategory, Shape[]> = {
  metal: [
    { label: { tr: "1 cm³ küp", de: "1-cm³-Würfel", uz: "1 sm³ kub" }, volumeM3: 1e-6 },
    { label: { tr: "1 m² × 1 mm sac", de: "1 m² Blech, 1 mm", uz: "1 m² × 1 mm list" }, volumeM3: sheet(1) },
    { label: { tr: "1 m² × 5 mm sac", de: "1 m² Blech, 5 mm", uz: "1 m² × 5 mm list" }, volumeM3: sheet(5) },
    { label: { tr: "1 m çubuk, Ø10 mm", de: "1 m Rundstab, Ø10 mm", uz: "1 m sterjen, Ø10 mm" }, volumeM3: rod(10) },
    { label: { tr: "1 m çubuk, Ø20 mm", de: "1 m Rundstab, Ø20 mm", uz: "1 m sterjen, Ø20 mm" }, volumeM3: rod(20) },
  ],
  sivi: [
    { label: { tr: "1 litre", de: "1 Liter", uz: "1 litr" }, volumeM3: L(1) },
    { label: { tr: "5 litrelik bidon", de: "5-Liter-Kanister", uz: "5 litrlik idish" }, volumeM3: L(5) },
    { label: { tr: "20 litrelik bidon", de: "20-Liter-Kanister", uz: "20 litrlik idish" }, volumeM3: L(20) },
    { label: { tr: "200 litrelik varil", de: "200-Liter-Fass", uz: "200 litrlik bochka" }, volumeM3: L(200) },
    { label: { tr: "1 m³ (IBC tank)", de: "1 m³ (IBC-Container)", uz: "1 m³ (IBC idish)" }, volumeM3: 1 },
  ],
  gaz: [
    { label: { tr: "1 litre", de: "1 Liter", uz: "1 litr" }, volumeM3: L(1) },
    { label: { tr: "1 m³", de: "1 m³", uz: "1 m³" }, volumeM3: 1 },
    { label: { tr: "4 × 5 × 2,5 m oda (50 m³)", de: "Raum 4 × 5 × 2,5 m (50 m³)", uz: "4 × 5 × 2,5 m xona (50 m³)" }, volumeM3: 50 },
  ],
  plastik: [
    { label: { tr: "1 m² × 1 mm levha", de: "1 m² Platte, 1 mm", uz: "1 m² × 1 mm plastina" }, volumeM3: sheet(1) },
    { label: { tr: "1 m² × 3 mm levha", de: "1 m² Platte, 3 mm", uz: "1 m² × 3 mm plastina" }, volumeM3: sheet(3) },
    { label: { tr: "1 m² × 10 mm levha", de: "1 m² Platte, 10 mm", uz: "1 m² × 10 mm plastina" }, volumeM3: sheet(10) },
    { label: { tr: "1 m çubuk, Ø20 mm", de: "1 m Rundstab, Ø20 mm", uz: "1 m sterjen, Ø20 mm" }, volumeM3: rod(20) },
  ],
  "yapi-malzemesi": [
    { label: { tr: "1 m² × 2 cm plaka", de: "1 m² Platte, 2 cm", uz: "1 m² × 2 sm plita" }, volumeM3: sheet(20) },
    { label: { tr: "1 m² × 5 cm tabaka", de: "1 m² Schicht, 5 cm", uz: "1 m² × 5 sm qatlam" }, volumeM3: sheet(50) },
    { label: { tr: "1 m² × 10 cm tabaka", de: "1 m² Schicht, 10 cm", uz: "1 m² × 10 sm qatlam" }, volumeM3: sheet(100) },
    { label: { tr: "1 m³", de: "1 m³", uz: "1 m³" }, volumeM3: 1 },
  ],
  ahsap: [
    { label: { tr: "1 m² × 18 mm levha", de: "1 m² Platte, 18 mm", uz: "1 m² × 18 mm taxta" }, volumeM3: sheet(18) },
    { label: { tr: "2 m kalas, 10 × 5 cm", de: "2 m Kantholz, 10 × 5 cm", uz: "2 m brus, 10 × 5 sm" }, volumeM3: 2 * 0.1 * 0.05 },
    { label: { tr: "1 m³", de: "1 m³", uz: "1 m³" }, volumeM3: 1 },
  ],
  gida: [
    { label: { tr: "1 yemek kaşığı (15 mL)", de: "1 Esslöffel (15 ml)", uz: "1 osh qoshiq (15 ml)" }, volumeM3: L(0.015) },
    { label: { tr: "1 su bardağı (200 mL)", de: "1 Glas (200 ml)", uz: "1 stakan (200 ml)" }, volumeM3: L(0.2) },
    { label: { tr: "1 litre", de: "1 Liter", uz: "1 litr" }, volumeM3: L(1) },
  ],
};

export type PracticalRow = { label: string; massKg: number };

export function practicalRows(material: MaterialDensityEntry, locale: PracticalLocale): PracticalRow[] {
  return SHAPES[material.category].map((s) => ({ label: s.label[locale], massKg: s.volumeM3 * material.densityKgM3 }));
}

/** 1 kg (gazlarda 1 kg, katılarda da 1 kg) malzemenin kapladığı hacim, litre. */
export function litresPerKg(material: MaterialDensityEntry) {
  return 1000 / material.densityKgM3;
}

const WATER = 998;
const AIR = 1.225;

export type Buoyancy =
  | { kind: "gas"; lighterThanAir: boolean; ratio: number }
  | { kind: "condensed"; floats: boolean; ratio: number };

/** Gazlar havaya, diğerleri 20 °C suya göre. ratio: malzeme / referans. */
export function buoyancy(material: MaterialDensityEntry): Buoyancy {
  if (material.category === "gaz") {
    return { kind: "gas", lighterThanAir: material.densityKgM3 < AIR, ratio: material.densityKgM3 / AIR };
  }
  return { kind: "condensed", floats: material.densityKgM3 < WATER, ratio: material.densityKgM3 / WATER };
}

/** Tüm malzemeler ve kendi kategorisi içinde yoğunluk sırası (1 = en yoğun). */
export function densityRank(material: MaterialDensityEntry) {
  const sorted = [...materialsDatabase].sort((a, b) => b.densityKgM3 - a.densityKgM3);
  const inCategory = sorted.filter((m) => m.category === material.category);
  return {
    overall: sorted.findIndex((m) => m.id === material.id) + 1,
    total: sorted.length,
    inCategory: inCategory.findIndex((m) => m.id === material.id) + 1,
    categoryTotal: inCategory.length,
    denser: inCategory[inCategory.findIndex((m) => m.id === material.id) - 1] ?? null,
    lighter: inCategory[inCategory.findIndex((m) => m.id === material.id) + 1] ?? null,
  };
}

/** İki malzemeyi aynı ölçülerde tartmak için: ilk malzemenin kategorisindeki ölçüler. */
export function sharedShapes(first: MaterialDensityEntry, second: MaterialDensityEntry, locale: PracticalLocale) {
  const category = first.category === second.category ? first.category : first.category === "gaz" ? second.category : first.category;
  return SHAPES[category].map((s) => ({
    label: s.label[locale],
    firstKg: s.volumeM3 * first.densityKgM3,
    secondKg: s.volumeM3 * second.densityKgM3,
  }));
}
