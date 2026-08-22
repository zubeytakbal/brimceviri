export type ShoeSizeRow = {
  cm: number;
  eu: number;
  us: number;
  uk: number;
};

// Marka bazli ayakkabi numarasi tablolari. Her markanin kendi resmi
// olcu tablosundan alinmistir (bkz. kaynaklar asagida) -- markalar
// arasinda ayni ayak uzunlugu icin numaralandirma gercekten farkli
// oldugu icin (ozellikle Adidas'in kesirli EU numaralari), tek bir
// "genel" tablo yerine marka bazli tablolar kullaniliyor.
//
// Kaynaklar: size.ly/size-chart (nike, adidas, puma, new-balance,
// converse) -- markalarin kendi resmi olcu kilavuzlarindan derlenmis
// referans veri.

export type ShoeBrandKey =
  | "genel"
  | "nike"
  | "adidas"
  | "puma"
  | "new-balance"
  | "converse";

type ShoeBrandData = {
  label: string;
  men: ShoeSizeRow[];
  women: ShoeSizeRow[];
};

const nikeMen: ShoeSizeRow[] = [
  { us: 3.5, uk: 3, eu: 35.5, cm: 21.6 },
  { us: 4, uk: 3.5, eu: 36, cm: 22 },
  { us: 4.5, uk: 4, eu: 36.5, cm: 22.4 },
  { us: 5, uk: 4.5, eu: 37.5, cm: 22.9 },
  { us: 5.5, uk: 5, eu: 38, cm: 23.3 },
  { us: 6, uk: 5.5, eu: 38.5, cm: 23.7 },
  { us: 6.5, uk: 6, eu: 39, cm: 24.1 },
  { us: 7, uk: 6, eu: 40, cm: 24.5 },
  { us: 7.5, uk: 6.5, eu: 40.5, cm: 25 },
  { us: 8, uk: 7, eu: 41, cm: 25.4 },
  { us: 8.5, uk: 7.5, eu: 42, cm: 25.8 },
  { us: 9, uk: 8, eu: 42.5, cm: 26.2 },
  { us: 9.5, uk: 8.5, eu: 43, cm: 26.7 },
  { us: 10, uk: 9, eu: 44, cm: 27.1 },
  { us: 10.5, uk: 9.5, eu: 44.5, cm: 27.5 },
  { us: 11, uk: 10, eu: 45, cm: 27.9 },
  { us: 11.5, uk: 10.5, eu: 45.5, cm: 28.3 },
  { us: 12, uk: 11, eu: 46, cm: 28.8 },
  { us: 12.5, uk: 11.5, eu: 47, cm: 29.2 },
  { us: 13, uk: 12, eu: 47.5, cm: 29.6 },
  { us: 13.5, uk: 12.5, eu: 48, cm: 30 },
  { us: 14, uk: 13, eu: 48.5, cm: 30.5 },
];

const nikeWomen: ShoeSizeRow[] = [
  { us: 3.5, uk: 1.5, eu: 33.5, cm: 20.8 },
  { us: 4, uk: 1.5, eu: 34.5, cm: 21.2 },
  { us: 4.5, uk: 2, eu: 35, cm: 21.6 },
  { us: 5, uk: 2.5, eu: 35.5, cm: 22 },
  { us: 5.5, uk: 3, eu: 36, cm: 22.4 },
  { us: 6, uk: 3.5, eu: 36.5, cm: 22.9 },
  { us: 6.5, uk: 4, eu: 37.5, cm: 23.3 },
  { us: 7, uk: 4.5, eu: 38, cm: 23.7 },
  { us: 7.5, uk: 5, eu: 38.5, cm: 24.1 },
  { us: 8, uk: 5.5, eu: 39, cm: 24.5 },
  { us: 8.5, uk: 6, eu: 40, cm: 25 },
  { us: 9, uk: 6.5, eu: 40.5, cm: 25.4 },
  { us: 9.5, uk: 7, eu: 41, cm: 25.8 },
  { us: 10, uk: 7.5, eu: 42, cm: 26.2 },
  { us: 10.5, uk: 8, eu: 42.5, cm: 26.7 },
  { us: 11, uk: 8.5, eu: 43, cm: 27.1 },
  { us: 11.5, uk: 9, eu: 44, cm: 27.5 },
  { us: 12, uk: 9.5, eu: 44.5, cm: 27.9 },
  { us: 12.5, uk: 10, eu: 45, cm: 28.3 },
];

const adidasMen: ShoeSizeRow[] = [
  { us: 4, uk: 3.5, eu: 36, cm: 22.1 },
  { us: 4.5, uk: 4, eu: 36.667, cm: 22.5 },
  { us: 5, uk: 4.5, eu: 37.333, cm: 22.9 },
  { us: 5.5, uk: 5, eu: 38, cm: 23.3 },
  { us: 6, uk: 5.5, eu: 38.667, cm: 23.8 },
  { us: 6.5, uk: 6, eu: 39.333, cm: 24.2 },
  { us: 7, uk: 6.5, eu: 40, cm: 24.6 },
  { us: 7.5, uk: 7, eu: 40.667, cm: 25 },
  { us: 8, uk: 7.5, eu: 41.333, cm: 25.5 },
  { us: 8.5, uk: 8, eu: 42, cm: 25.9 },
  { us: 9, uk: 8.5, eu: 42.667, cm: 26.3 },
  { us: 9.5, uk: 9, eu: 43.333, cm: 26.7 },
  { us: 10, uk: 9.5, eu: 44, cm: 27.1 },
  { us: 10.5, uk: 10, eu: 44.667, cm: 27.6 },
  { us: 11, uk: 10.5, eu: 45.333, cm: 28 },
  { us: 11.5, uk: 11, eu: 46, cm: 28.4 },
  { us: 12, uk: 11.5, eu: 46.667, cm: 28.8 },
  { us: 12.5, uk: 12, eu: 47.333, cm: 29.3 },
  { us: 13, uk: 12.5, eu: 48, cm: 29.7 },
];

const adidasWomen: ShoeSizeRow[] = [
  { us: 5, uk: 3.5, eu: 36, cm: 22.1 },
  { us: 5.5, uk: 4, eu: 36.667, cm: 22.5 },
  { us: 6, uk: 4.5, eu: 37.333, cm: 22.9 },
  { us: 6.5, uk: 5, eu: 38, cm: 23.3 },
  { us: 7, uk: 5.5, eu: 38.667, cm: 23.8 },
  { us: 7.5, uk: 6, eu: 39.333, cm: 24.2 },
  { us: 8, uk: 6.5, eu: 40, cm: 24.6 },
  { us: 8.5, uk: 7, eu: 40.667, cm: 25 },
  { us: 9, uk: 7.5, eu: 41.333, cm: 25.5 },
  { us: 9.5, uk: 8, eu: 42, cm: 25.9 },
  { us: 10, uk: 8.5, eu: 42.667, cm: 26.3 },
  { us: 10.5, uk: 9, eu: 43.333, cm: 26.7 },
  { us: 11, uk: 9.5, eu: 44, cm: 27.1 },
  { us: 11.5, uk: 10, eu: 44.667, cm: 27.6 },
  { us: 12, uk: 10.5, eu: 45.333, cm: 28 },
];

const pumaMen: ShoeSizeRow[] = [
  { us: 6, uk: 5, eu: 38, cm: 24 },
  { us: 6.5, uk: 5.5, eu: 38.5, cm: 24.5 },
  { us: 7, uk: 6, eu: 39, cm: 25 },
  { us: 7.5, uk: 6.5, eu: 40, cm: 25.5 },
  { us: 8, uk: 7, eu: 40.5, cm: 26 },
  { us: 8.5, uk: 7.5, eu: 41, cm: 26.5 },
  { us: 9, uk: 8, eu: 42, cm: 27 },
  { us: 9.5, uk: 8.5, eu: 42.5, cm: 27.5 },
  { us: 10, uk: 9, eu: 43, cm: 28 },
  { us: 10.5, uk: 9.5, eu: 44, cm: 28.5 },
  { us: 11, uk: 10, eu: 44.5, cm: 29 },
  { us: 11.5, uk: 10.5, eu: 45, cm: 29.5 },
  { us: 12, uk: 11, eu: 46, cm: 30 },
  { us: 12.5, uk: 11.5, eu: 46.5, cm: 30.5 },
  { us: 13, uk: 12, eu: 47, cm: 31 },
];

const pumaWomen: ShoeSizeRow[] = [
  { us: 5.5, uk: 3, eu: 35.5, cm: 22 },
  { us: 6, uk: 3.5, eu: 36, cm: 22.5 },
  { us: 6.5, uk: 4, eu: 37, cm: 23 },
  { us: 7, uk: 4.5, eu: 37.5, cm: 23.5 },
  { us: 7.5, uk: 5, eu: 38, cm: 24 },
  { us: 8, uk: 5.5, eu: 38.5, cm: 24.5 },
  { us: 8.5, uk: 6, eu: 39, cm: 25 },
  { us: 9, uk: 6.5, eu: 40, cm: 25.5 },
  { us: 9.5, uk: 7, eu: 40.5, cm: 26 },
  { us: 10, uk: 7.5, eu: 41, cm: 26.5 },
  { us: 10.5, uk: 8, eu: 42, cm: 27 },
  { us: 11, uk: 8.5, eu: 42.5, cm: 27.5 },
];

const newBalanceMen: ShoeSizeRow[] = [
  { us: 7, uk: 6.5, eu: 40, cm: 25 },
  { us: 7.5, uk: 7, eu: 40.5, cm: 25.5 },
  { us: 8, uk: 7.5, eu: 41.5, cm: 26 },
  { us: 8.5, uk: 8, eu: 42, cm: 26.5 },
  { us: 9, uk: 8.5, eu: 42.5, cm: 27 },
  { us: 9.5, uk: 9, eu: 43, cm: 27.5 },
  { us: 10, uk: 9.5, eu: 44, cm: 28 },
  { us: 10.5, uk: 10, eu: 44.5, cm: 28.5 },
  { us: 11, uk: 10.5, eu: 45, cm: 29 },
  { us: 11.5, uk: 11, eu: 45.5, cm: 29.5 },
  { us: 12, uk: 11.5, eu: 46.5, cm: 30 },
  { us: 12.5, uk: 12, eu: 47, cm: 30.5 },
  { us: 13, uk: 12.5, eu: 47.5, cm: 31 },
];

const newBalanceWomen: ShoeSizeRow[] = [
  { us: 4, uk: 2, eu: 34, cm: 21 },
  { us: 4.5, uk: 2.5, eu: 34.5, cm: 21.5 },
  { us: 5, uk: 3, eu: 35, cm: 22 },
  { us: 5.5, uk: 3.5, eu: 36, cm: 22.5 },
  { us: 6, uk: 4, eu: 36.5, cm: 23 },
  { us: 6.5, uk: 4.5, eu: 37, cm: 23.5 },
  { us: 7, uk: 5, eu: 37.5, cm: 24 },
  { us: 7.5, uk: 5.5, eu: 38, cm: 24.5 },
  { us: 8, uk: 6, eu: 39, cm: 25 },
  { us: 8.5, uk: 6.5, eu: 40, cm: 25.5 },
  { us: 9, uk: 7, eu: 40.5, cm: 26 },
  { us: 9.5, uk: 7.5, eu: 41, cm: 26.5 },
  { us: 10, uk: 8, eu: 41.5, cm: 27 },
  { us: 10.5, uk: 8.5, eu: 42.5, cm: 27.5 },
  { us: 11, uk: 9, eu: 43, cm: 28 },
  { us: 11.5, uk: 9.5, eu: 43.5, cm: 28.5 },
  { us: 12, uk: 10, eu: 44, cm: 29 },
];

const converseMen: ShoeSizeRow[] = [
  { us: 3, uk: 2.5, eu: 35, cm: 21 },
  { us: 3.5, uk: 3, eu: 35.5, cm: 21.6 },
  { us: 4, uk: 3.5, eu: 36, cm: 22 },
  { us: 4.5, uk: 4, eu: 37, cm: 22.5 },
  { us: 5, uk: 4.5, eu: 37.5, cm: 22.9 },
  { us: 5.5, uk: 5, eu: 38, cm: 23.4 },
  { us: 6, uk: 5.5, eu: 38.5, cm: 23.9 },
  { us: 6.5, uk: 5.5, eu: 39, cm: 24.5 },
  { us: 7, uk: 6, eu: 40, cm: 24.9 },
  { us: 7.5, uk: 6.5, eu: 40.5, cm: 25.4 },
  { us: 8, uk: 7, eu: 41, cm: 26 },
  { us: 8.5, uk: 7.5, eu: 42, cm: 26.3 },
  { us: 9, uk: 8, eu: 42.5, cm: 27 },
  { us: 9.5, uk: 8.5, eu: 43, cm: 27.5 },
  { us: 10, uk: 9, eu: 44, cm: 27.9 },
  { us: 10.5, uk: 9.5, eu: 44.5, cm: 28.5 },
  { us: 11, uk: 10, eu: 45, cm: 28.9 },
  { us: 11.5, uk: 10.5, eu: 46, cm: 29.4 },
  { us: 12, uk: 11, eu: 46.5, cm: 30 },
  { us: 12.5, uk: 11.5, eu: 47, cm: 30.5 },
  { us: 13, uk: 12, eu: 47.5, cm: 31 },
];

const converseWomen: ShoeSizeRow[] = [
  { us: 4.5, uk: 2.5, eu: 35, cm: 21.1 },
  { us: 5, uk: 3, eu: 35.5, cm: 21.6 },
  { us: 5.5, uk: 3.5, eu: 36, cm: 22 },
  { us: 6, uk: 4, eu: 37, cm: 22.5 },
  { us: 6.5, uk: 4.5, eu: 37.5, cm: 22.9 },
  { us: 7, uk: 5, eu: 38, cm: 23.4 },
  { us: 7.5, uk: 5.5, eu: 38.5, cm: 24 },
  { us: 8, uk: 5.5, eu: 39, cm: 24.6 },
  { us: 8.5, uk: 6, eu: 40, cm: 24.9 },
  { us: 9, uk: 6.5, eu: 40.5, cm: 25.4 },
  { us: 9.5, uk: 7, eu: 41, cm: 26.1 },
  { us: 10, uk: 7.5, eu: 42, cm: 26.3 },
  { us: 10.5, uk: 8, eu: 42.5, cm: 27.1 },
  { us: 11, uk: 8.5, eu: 43, cm: 27.5 },
  { us: 11.5, uk: 9, eu: 44, cm: 27.9 },
];

// "Genel" -- markadan bagimsiz, cogu ayakkabi donusum kaynagi
// tarafindan kullanilan standart tablo. Belirli bir marka secilmedigi
// zaman varsayilan olarak kullanilir.
const genelMen: ShoeSizeRow[] = [
  { us: 6.5, uk: 6, eu: 39, cm: 24.1 },
  { us: 7, uk: 6.5, eu: 40, cm: 24.8 },
  { us: 7.5, uk: 7, eu: 40.5, cm: 25.4 },
  { us: 8, uk: 7.5, eu: 41, cm: 25.7 },
  { us: 8.5, uk: 8, eu: 42, cm: 26.4 },
  { us: 9, uk: 8.5, eu: 42.5, cm: 27 },
  { us: 9.5, uk: 9, eu: 43, cm: 27.3 },
  { us: 10, uk: 9.5, eu: 44, cm: 27.9 },
  { us: 10.5, uk: 10, eu: 44.5, cm: 28.3 },
  { us: 11, uk: 10.5, eu: 45, cm: 28.6 },
  { us: 11.5, uk: 11, eu: 46, cm: 29.4 },
  { us: 12, uk: 11.5, eu: 46.5, cm: 29.7 },
  { us: 12.5, uk: 12, eu: 47, cm: 30.2 },
  { us: 13, uk: 12.5, eu: 48, cm: 30.8 },
];

const genelWomen: ShoeSizeRow[] = [
  { us: 5, uk: 2.5, eu: 35, cm: 22 },
  { us: 5.5, uk: 3, eu: 35.5, cm: 22.4 },
  { us: 6, uk: 3.5, eu: 36, cm: 22.9 },
  { us: 6.5, uk: 4, eu: 37, cm: 23.3 },
  { us: 7, uk: 4.5, eu: 37.5, cm: 23.8 },
  { us: 7.5, uk: 5, eu: 38, cm: 24.1 },
  { us: 8, uk: 5.5, eu: 38.5, cm: 24.6 },
  { us: 8.5, uk: 6, eu: 39, cm: 25 },
  { us: 9, uk: 6.5, eu: 40, cm: 25.4 },
  { us: 9.5, uk: 7, eu: 40.5, cm: 25.9 },
  { us: 10, uk: 7.5, eu: 41, cm: 26.3 },
  { us: 10.5, uk: 8, eu: 42, cm: 26.7 },
  { us: 11, uk: 8.5, eu: 42.5, cm: 27.1 },
];

export const shoeBrands: Record<ShoeBrandKey, ShoeBrandData> = {
  genel: { label: "Genel (Standart)", men: genelMen, women: genelWomen },
  nike: { label: "Nike", men: nikeMen, women: nikeWomen },
  adidas: { label: "Adidas", men: adidasMen, women: adidasWomen },
  puma: { label: "Puma", men: pumaMen, women: pumaWomen },
  "new-balance": {
    label: "New Balance",
    men: newBalanceMen,
    women: newBalanceWomen,
  },
  converse: { label: "Converse", men: converseMen, women: converseWomen },
};

// Bebek / kucuk cocuk (ABD "toddler" numaralandirmasi 0-13.5 arasi).
// Markadan bagimsiz genel tablo -- cocuk ayakkabisinda marka farki
// yetiskine gore cok daha kucuk oldugu icin tek tablo yeterli.
export const toddlerShoeSizes: ShoeSizeRow[] = [
  { cm: 8.3, eu: 16, us: 0, uk: 0 },
  { cm: 9.5, eu: 17, us: 1, uk: 0.5 },
  { cm: 10.2, eu: 18, us: 2, uk: 1.5 },
  { cm: 11.1, eu: 19, us: 3, uk: 2.5 },
  { cm: 11.9, eu: 20, us: 4, uk: 3.5 },
  { cm: 12.7, eu: 21, us: 5, uk: 4 },
  { cm: 13.3, eu: 22, us: 6, uk: 5 },
  { cm: 14, eu: 23, us: 7, uk: 6 },
  { cm: 14.8, eu: 24, us: 8, uk: 7 },
  { cm: 15.6, eu: 25, us: 9, uk: 8 },
  { cm: 16.3, eu: 26, us: 10, uk: 9 },
  { cm: 17.1, eu: 27, us: 11, uk: 10 },
  { cm: 17.8, eu: 28, us: 12, uk: 11 },
  { cm: 18.4, eu: 29, us: 13, uk: 12 },
  { cm: 19.1, eu: 30, us: 13.5, uk: 12.5 },
];

// Buyuk cocuk / genclik (ABD "youth" numaralandirmasi 13.5'ten sonra
// 1'den yeniden baslar; yaklasik EU 35-36'da yetiskin numaralarina
// baglanir)
export const youthShoeSizes: ShoeSizeRow[] = [
  { cm: 19.7, eu: 31, us: 1, uk: 13 },
  { cm: 20.3, eu: 32, us: 1.5, uk: 13.5 },
  { cm: 20.8, eu: 33, us: 2, uk: 1 },
  { cm: 21.6, eu: 34, us: 2.5, uk: 1.5 },
  { cm: 22, eu: 35, us: 3, uk: 2 },
  { cm: 22.9, eu: 36, us: 4, uk: 3 },
  { cm: 23.8, eu: 37, us: 5, uk: 4 },
  { cm: 24.6, eu: 38, us: 5.5, uk: 4.5 },
  { cm: 25, eu: 39, us: 6, uk: 5 },
  { cm: 25.7, eu: 40, us: 6.5, uk: 5.5 },
];

export type ShoeSizeGroupKey =
  | "erkek"
  | "kadin"
  | "bebek"
  | "buyuk-cocuk";

export function getShoeSizeRows(
  group: ShoeSizeGroupKey,
  brand: ShoeBrandKey = "genel"
): ShoeSizeRow[] {
  if (group === "erkek") return shoeBrands[brand].men;
  if (group === "kadin") return shoeBrands[brand].women;
  if (group === "bebek") return toddlerShoeSizes;
  return youthShoeSizes;
}

export const shoeSizeGroupLabels: Record<ShoeSizeGroupKey, string> = {
  erkek: "Erkek",
  kadin: "Kadın",
  bebek: "Bebek / Küçük Çocuk",
  "buyuk-cocuk": "Büyük Çocuk",
};

function closestRow(
  rows: ShoeSizeRow[],
  value: number,
  key: keyof ShoeSizeRow
) {
  return rows.reduce((closest, row) =>
    Math.abs(row[key] - value) < Math.abs(closest[key] - value)
      ? row
      : closest
  );
}

export function findShoeSizeRow(
  group: ShoeSizeGroupKey,
  key: keyof ShoeSizeRow,
  value: number,
  brand: ShoeBrandKey = "genel"
): ShoeSizeRow {
  const rows = getShoeSizeRows(group, brand);

  return closestRow(rows, value, key);
}
