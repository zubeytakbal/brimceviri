// Uzunluk karsilastirma -- girilen bir uzunluk degerini, tanidik
// referans nesnelerle (zurafa, otobus, futbol sahasi vb.) kiyaslar.
// Degerler cift kaynaktan dogrulanmis, yaygin kabul goren ortalama/
// standart olculerdir; kesin bilimsel degerler degil, karsilastirma
// amacli yuvarlanmis rakamlardir.

export type LengthComparisonUnit = "cm" | "m" | "km";

export const lengthComparisonUnitToMeters: Record<LengthComparisonUnit, number> = {
  cm: 0.01,
  m: 1,
  km: 1000,
};

export type LengthReferenceObject = {
  id: string;
  label: string;
  meters: number;
};

// Kaynaklar: zurafa (San Diego Zoo/National Geographic, yetiskin
// ortalama 4.3-5.7m -> 5.5m), sehir otobusu (standart tek katli otobus
// uzunlugu, ~12m), futbol sahasi (FIFA standart saha uzunlugu, 105m),
// mavi balina (NOAA Fisheries, yetiskin ortalama 24-30m -> 25m), Eyfel
// Kulesi (resmi anten dahil yukseklik, 330m), 15 Temmuz Sehitler
// Koprusu (Karayollari Genel Mudurlugu, toplam uzunluk 1560m).
export const lengthReferenceObjects: LengthReferenceObject[] = [
  { id: "insan-boyu", label: "Yetişkin insan boyu (ortalama)", meters: 1.7 },
  { id: "zurafa", label: "Zürafa boyu (ortalama)", meters: 5.5 },
  { id: "sehir-otobusu", label: "Şehir otobüsü uzunluğu", meters: 12 },
  { id: "mavi-balina", label: "Mavi balina uzunluğu (ortalama)", meters: 25 },
  { id: "futbol-sahasi", label: "Futbol sahası uzunluğu", meters: 105 },
  { id: "eyfel-kulesi", label: "Eyfel Kulesi yüksekliği (anten dahil)", meters: 330 },
  {
    id: "bogaz-koprusu",
    label: "15 Temmuz Şehitler Köprüsü uzunluğu",
    meters: 1560,
  },
];

export type LengthComparisonRow = LengthReferenceObject & {
  ratio: number;
};

export function calculateLengthComparisons(
  valueInMeters: number
): LengthComparisonRow[] | null {
  if (!Number.isFinite(valueInMeters) || valueInMeters <= 0) {
    return null;
  }

  return lengthReferenceObjects
    .map((reference) => ({
      ...reference,
      ratio: valueInMeters / reference.meters,
    }))
    .sort(
      (a, b) => Math.abs(Math.log(a.ratio)) - Math.abs(Math.log(b.ratio))
    );
}
