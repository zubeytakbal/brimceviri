export type BoltGrade = "8.8" | "10.9" | "12.9";

export type BoltTorqueRow = {
  size: string;
  diameterMm: number;
  torqueByGrade: Record<BoltGrade, number>;
};

// DIN 13 normuna dayanan, iki bagimsiz Turkce kaynaktan (surkon.com.tr,
// netratek.com) capraz dogrulanmis kaba baslangic tork degerleri (Nm).
// Bu degerler genel referanstir -- gercek uygulamada montaj yontemi
// (kuru/yagli), yuzey kaplamasi ve tasarimcinin ozel sartnamesi esas
// alinmalidir.
export const boltTorqueTable: BoltTorqueRow[] = [
  { size: "M4", diameterMm: 4, torqueByGrade: { "8.8": 2.54, "10.9": 3.57, "12.9": 4.29 } },
  { size: "M5", diameterMm: 5, torqueByGrade: { "8.8": 6.09, "10.9": 8.56, "12.9": 10.3 } },
  { size: "M6", diameterMm: 6, torqueByGrade: { "8.8": 10.5, "10.9": 14.7, "12.9": 17.7 } },
  { size: "M8", diameterMm: 8, torqueByGrade: { "8.8": 25.3, "10.9": 35.5, "12.9": 42.7 } },
  { size: "M10", diameterMm: 10, torqueByGrade: { "8.8": 50.8, "10.9": 71.5, "12.9": 85.8 } },
  { size: "M12", diameterMm: 12, torqueByGrade: { "8.8": 86.9, "10.9": 122, "12.9": 147 } },
  { size: "M14", diameterMm: 14, torqueByGrade: { "8.8": 139, "10.9": 195, "12.9": 234 } },
  { size: "M16", diameterMm: 16, torqueByGrade: { "8.8": 213, "10.9": 299, "12.9": 359 } },
  { size: "M20", diameterMm: 20, torqueByGrade: { "8.8": 412, "10.9": 578, "12.9": 696 } },
];

const DEFAULT_K_FACTOR = 0.2;

// K-faktoru (nut factor) yontemi: T = K x D x F. Standart, kuru/hafif
// yagli baglantilar icin K ~= 0.2 yaygin kullanilan bir varsayimdir;
// gercek K yuzey kaplamasina ve yaglamaya gore ~0.12-0.20+ araliginda
// degisebilir.
export function calculateClampForce(
  torqueNm: number,
  diameterMm: number,
  kFactor: number = DEFAULT_K_FACTOR
): number | null {
  if (!Number.isFinite(torqueNm) || torqueNm <= 0) {
    return null;
  }

  if (!Number.isFinite(diameterMm) || diameterMm <= 0) {
    return null;
  }

  if (!Number.isFinite(kFactor) || kFactor <= 0) {
    return null;
  }

  const diameterM = diameterMm / 1000;

  return torqueNm / (kFactor * diameterM);
}
