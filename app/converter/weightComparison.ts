// Agirlik karsilastirma -- girilen bir agirlik degerini, tanidik
// referans nesnelerle (kedi, insan, at, otomobil, fil, mavi balina)
// kiyaslar. Degerler yaygin kabul goren kaynaklardan derlenmis,
// yuvarlatilmis ortalama degerlerdir.

export type WeightComparisonUnit = "g" | "kg" | "ton";

export const weightComparisonUnitToKg: Record<WeightComparisonUnit, number> = {
  g: 0.001,
  kg: 1,
  ton: 1000,
};

export type WeightReferenceObject = {
  id: string;
  label: string;
  kg: number;
};

// Kaynaklar: ev kedisi ortalama agirligi (yaygin veteriner kaynaklari,
// 3.5-4.5 kg -> 4 kg), yetiskin insan ortalama agirligi (kuresel genel
// istatistik ortalamasi, ~70 kg), motosiklet (orta siniflarin tipik
// agirligi, ~200 kg), binicilik ati (yaygin cins ortalamasi, ~500 kg),
// binek otomobil (kuresel ortalama, ~1500 kg), Afrika fili yetiskin
// ortalamasi (National Geographic/WWF, ~6000 kg), mavi balina yetiskin
// ortalamasi (NOAA Fisheries, ~150000 kg).
export const weightReferenceObjects: WeightReferenceObject[] = [
  { id: "kedi", label: "Ev kedisi (ortalama)", kg: 4 },
  { id: "insan", label: "Yetişkin insan (ortalama)", kg: 70 },
  { id: "motosiklet", label: "Motosiklet (ortalama)", kg: 200 },
  { id: "at", label: "Binicilik atı (ortalama)", kg: 500 },
  { id: "otomobil", label: "Binek otomobil (ortalama)", kg: 1500 },
  { id: "fil", label: "Afrika fili (yetişkin, ortalama)", kg: 6000 },
  { id: "mavi-balina", label: "Mavi balina (yetişkin, ortalama)", kg: 150000 },
];

export type WeightComparisonRow = WeightReferenceObject & {
  ratio: number;
};

export function calculateWeightComparisons(
  valueInKg: number
): WeightComparisonRow[] | null {
  if (!Number.isFinite(valueInKg) || valueInKg <= 0) {
    return null;
  }

  return weightReferenceObjects
    .map((reference) => ({
      ...reference,
      ratio: valueInKg / reference.kg,
    }))
    .sort(
      (a, b) => Math.abs(Math.log(a.ratio)) - Math.abs(Math.log(b.ratio))
    );
}
