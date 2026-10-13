// Metal ağırlık hesapları: inşaat demiri, sac/levha, boru ve kutu profil.
// Bütün değerler geometri × yoğunluk formülünden üretilir; elle yazılmış
// ağırlık tablosu yoktur. Yoğunluklar sitenin malzeme tablosundan gelir.
import { materialDensityTable } from "../materialDensity";

/** Yapı çeliği ve inşaat demiri için kullanılan yoğunluk (kg/m³). */
export const STEEL_DENSITY = 7850;

/** Türkiye'de inşaat demirinin satıldığı standart boy (m). */
export const REBAR_BAR_LENGTH_M = 12;

/** Tablolarda gösterilen yaygın inşaat demiri çapları (mm). Araç her çapı hesaplar. */
export const REBAR_DIAMETERS_MM = [6, 8, 10, 12, 14, 16, 18, 20, 22, 25, 28, 32, 36, 40];

export type MetalId = "steel" | "stainless-steel" | "aluminum" | "copper" | "brass" | "zinc" | "lead" | "titanium";

const METAL_LABELS: Record<MetalId, string> = {
  steel: "Çelik (karbon / siyah)",
  "stainless-steel": "Paslanmaz çelik",
  aluminum: "Alüminyum",
  copper: "Bakır",
  brass: "Pirinç",
  zinc: "Çinko",
  lead: "Kurşun",
  titanium: "Titanyum",
};

export type Metal = { id: MetalId; label: string; density: number };

/** Metal listesi; yoğunluklar tek kaynaktan (materialDensityTable) okunur. */
export const METALS: Metal[] = (Object.keys(METAL_LABELS) as MetalId[]).map((id) => {
  const row = materialDensityTable.find((r) => r.id === id);
  if (!row) throw new Error(`metalWeight: ${id} yoğunluk tablosunda yok`);
  return { id, label: METAL_LABELS[id], density: row.densityKgM3 };
});

export function metalById(id: string): Metal {
  return METALS.find((m) => m.id === id) ?? METALS[0];
}

const MM2_TO_M2 = 1e-6;

/** Dolu yuvarlak kesit alanı (mm²). */
export function circleAreaMm2(diameterMm: number) {
  return (Math.PI / 4) * diameterMm * diameterMm;
}

/** Kesit alanı (mm²) ve yoğunluktan metre ağırlığı (kg/m). */
export function kgPerMeter(areaMm2: number, density = STEEL_DENSITY) {
  return areaMm2 * MM2_TO_M2 * density;
}

/** İnşaat demiri teorik metre ağırlığı (kg/m): π/4 × d² × 7850. */
export function rebarKgPerMeter(diameterMm: number) {
  return kgPerMeter(circleAreaMm2(diameterMm));
}

/** Sahada kullanılan pratik yaklaşım: d² / 162. */
export function rebarKgPerMeterRuleOfThumb(diameterMm: number) {
  return (diameterMm * diameterMm) / 162;
}

/** Verilen ağırlıktaki (kg) demirin toplam boyu (m). */
export function rebarMetersForMass(diameterMm: number, massKg: number) {
  return massKg / rebarKgPerMeter(diameterMm);
}

/** Sac / levha ağırlığı (kg). Ölçüler mm. */
export function plateMassKg(lengthMm: number, widthMm: number, thicknessMm: number, density = STEEL_DENSITY) {
  return lengthMm * widthMm * thicknessMm * 1e-9 * density;
}

/** Sacın metrekare ağırlığı (kg/m²) = kalınlık(mm) × yoğunluk / 1000. */
export function plateKgPerM2(thicknessMm: number, density = STEEL_DENSITY) {
  return (thicknessMm * density) / 1000;
}

/** Boru (yuvarlak, içi boş) kesit alanı (mm²): π × (D − t) × t. */
export function pipeAreaMm2(outerDiameterMm: number, wallMm: number) {
  return Math.PI * (outerDiameterMm - wallMm) * wallMm;
}

export function pipeKgPerMeter(outerDiameterMm: number, wallMm: number, density = STEEL_DENSITY) {
  return kgPerMeter(pipeAreaMm2(outerDiameterMm, wallMm), density);
}

/** Borunun içindeki suyun metre ağırlığı (kg/m), su yoğunluğu 1000 kg/m³. */
export function pipeWaterKgPerMeter(outerDiameterMm: number, wallMm: number) {
  return kgPerMeter(circleAreaMm2(outerDiameterMm - 2 * wallMm), 1000);
}

/** Et kalınlığı dış çapın yarısından küçük olmalı. */
export function isValidPipe(outerDiameterMm: number, wallMm: number) {
  return outerDiameterMm > 0 && wallMm > 0 && wallMm * 2 < outerDiameterMm;
}

/**
 * EN 10219-2 soğuk şekillendirilmiş kutu profillerde dış köşe yarıçapı aralıkları:
 * t ≤ 6 mm: 1,6t–2,4t; 6 < t ≤ 10 mm: 2,0t–3,0t; t > 10 mm: 2,4t–3,6t.
 * Hesapta her aralığın orta değeri kullanılır.
 */
export function boxOuterCornerRadius(wallMm: number) {
  if (wallMm <= 6) return 2 * wallMm;
  if (wallMm <= 10) return 2.5 * wallMm;
  return 3 * wallMm;
}

/** Keskin köşeli (teorik üst sınır) kutu profil kesit alanı (mm²). */
export function boxAreaSharpMm2(heightMm: number, widthMm: number, wallMm: number) {
  return heightMm * widthMm - (heightMm - 2 * wallMm) * (widthMm - 2 * wallMm);
}

/**
 * Yuvarlatılmış köşeli kutu profil kesit alanı (mm²). Dış yarıçap r_o, iç yarıçap r_i = r_o − t
 * (eş merkezli yaylar). Her köşeden (4 − π)/4 × (r_o² − r_i²) eksilir.
 */
export function boxAreaRoundedMm2(heightMm: number, widthMm: number, wallMm: number, outerRadiusMm = boxOuterCornerRadius(wallMm)) {
  const innerRadius = Math.max(outerRadiusMm - wallMm, 0);
  return boxAreaSharpMm2(heightMm, widthMm, wallMm) - (4 - Math.PI) * (outerRadiusMm ** 2 - innerRadius ** 2);
}

export function isValidBox(heightMm: number, widthMm: number, wallMm: number) {
  return heightMm > 0 && widthMm > 0 && wallMm > 0 && wallMm * 2 < Math.min(heightMm, widthMm);
}

/** Türkçe sayı biçimi (virgüllü ondalık). */
export function formatTr(value: number, maximumFractionDigits = 2, minimumFractionDigits = 0) {
  return value.toLocaleString("tr-TR", { maximumFractionDigits, minimumFractionDigits });
}

/** Kullanıcı girişini sayıya çevirir: "1.250,5" ve "1250.5" ikisi de kabul edilir. */
export function parseTr(value: string): number | null {
  const trimmed = value.replace(/\s/g, "");
  if (!trimmed) return null;
  // Virgül varsa Türkçe biçim; "1.000" gibi yalnız binlik ayraçlı yazımlar da binlik sayılır.
  const normalized = trimmed.includes(",") || /^\d{1,3}(\.\d{3})+$/.test(trimmed) ? trimmed.replace(/\./g, "").replace(",", ".") : trimmed;
  const n = Number(normalized);
  return Number.isFinite(n) && n > 0 ? n : null;
}
