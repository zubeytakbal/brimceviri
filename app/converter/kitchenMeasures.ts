// Mutfak olcu birimleri (bardak / yemek kasigi / cay kasigi / ml / gram)
// arasi malzemeye ozel donusum tablosu. Fiziksel formulle degil, yaygin
// kabul goren mutfak referanslarindan (Sana, Nefis Yemek Tarifleri,
// Carrefoursa mutfak rehberi gibi kaynaklardan derlenmis, yuvarlatilmis)
// yogunluk degerleriyle calisir -- cunku malzemenin elenmis/sikistirilmis
// olmasi gibi faktorler kucuk farklar yaratir, kaynaklar arasi degerler
// de birebir aynı degildir. Degerler pratik kullanım icin yaklasiktir.
//
// Standart hacimler: 1 su bardagi = 200 ml, 1 yemek kasigi = 15 ml,
// 1 cay kasigi = 5 ml. unitRegistry.ts'teki genel "hacim" kategorisine
// kasitli olarak dokunulmuyor (public convert() sayfalarini etkilememesi
// icin); bu birimler yalnizca bu ozellik icinde tanimli.

export type KitchenIngredientKey =
  | "un"
  | "tam-bugday-unu"
  | "pirinc-unu"
  | "misir-unu"
  | "irmik"
  | "galeta-unu"
  | "toz-seker"
  | "pudra-sekeri"
  | "esmer-seker"
  | "tuz"
  | "pirinc"
  | "bulgur"
  | "nohut"
  | "kirmizi-mercimek"
  | "yesil-mercimek"
  | "kuru-fasulye"
  | "sut"
  | "yogurt"
  | "krema"
  | "tereyagi"
  | "margarin"
  | "zeytinyagi"
  | "sivi-yag"
  | "bal"
  | "pekmez"
  | "kakao"
  | "yulaf-ezmesi"
  | "nisasta"
  | "kabartma-tozu"
  | "karbonat"
  | "susam"
  | "ceviz-ici"
  | "findik-ici"
  | "badem"
  | "antep-fistigi"
  | "kuru-uzum"
  | "hindistan-cevizi"
  | "mayonez"
  | "ketcap"
  | "sirke"
  | "limon-suyu"
  | "tarcin"
  | "kirmizi-biber"
  | "karabiber"
  | "kimyon";

export type KitchenIngredientRow = {
  key: KitchenIngredientKey;
  label: string;
  // 1 su bardagi (200 ml) bu malzemeden kac gram gelir -- diger tum
  // birimler (yemek kasigi, cay kasigi, gram<->ml) buradan turetilir.
  gramsPerBardak: number;
};

export const kitchenIngredientRows: KitchenIngredientRow[] = [
  { key: "un", label: "Un (Buğday Unu)", gramsPerBardak: 130 },
  { key: "tam-bugday-unu", label: "Tam Buğday Unu", gramsPerBardak: 140 },
  { key: "pirinc-unu", label: "Pirinç Unu", gramsPerBardak: 150 },
  { key: "misir-unu", label: "Mısır Unu", gramsPerBardak: 150 },
  { key: "irmik", label: "İrmik", gramsPerBardak: 150 },
  { key: "galeta-unu", label: "Galeta Unu", gramsPerBardak: 110 },
  { key: "toz-seker", label: "Toz Şeker", gramsPerBardak: 200 },
  { key: "pudra-sekeri", label: "Pudra Şekeri", gramsPerBardak: 120 },
  { key: "esmer-seker", label: "Esmer Şeker", gramsPerBardak: 180 },
  { key: "tuz", label: "Tuz (Sofra Tuzu)", gramsPerBardak: 240 },
  { key: "pirinc", label: "Pirinç", gramsPerBardak: 190 },
  { key: "bulgur", label: "Bulgur (İnce)", gramsPerBardak: 170 },
  { key: "nohut", label: "Nohut (Kuru)", gramsPerBardak: 200 },
  { key: "kirmizi-mercimek", label: "Kırmızı Mercimek", gramsPerBardak: 200 },
  { key: "yesil-mercimek", label: "Yeşil Mercimek", gramsPerBardak: 190 },
  { key: "kuru-fasulye", label: "Kuru Fasulye", gramsPerBardak: 200 },
  { key: "sut", label: "Süt", gramsPerBardak: 205 },
  { key: "yogurt", label: "Yoğurt", gramsPerBardak: 210 },
  { key: "krema", label: "Krema", gramsPerBardak: 205 },
  { key: "tereyagi", label: "Tereyağı", gramsPerBardak: 190 },
  { key: "margarin", label: "Margarin", gramsPerBardak: 190 },
  { key: "zeytinyagi", label: "Zeytinyağı", gramsPerBardak: 184 },
  { key: "sivi-yag", label: "Sıvı Yağ (Bitkisel)", gramsPerBardak: 182 },
  { key: "bal", label: "Bal", gramsPerBardak: 285 },
  { key: "pekmez", label: "Pekmez", gramsPerBardak: 280 },
  { key: "kakao", label: "Kakao (Toz)", gramsPerBardak: 100 },
  { key: "yulaf-ezmesi", label: "Yulaf Ezmesi", gramsPerBardak: 90 },
  { key: "nisasta", label: "Nişasta (Mısır)", gramsPerBardak: 120 },
  { key: "kabartma-tozu", label: "Kabartma Tozu", gramsPerBardak: 160 },
  { key: "karbonat", label: "Karbonat", gramsPerBardak: 190 },
  { key: "susam", label: "Susam", gramsPerBardak: 160 },
  { key: "ceviz-ici", label: "Ceviz İçi (Kırık)", gramsPerBardak: 110 },
  { key: "findik-ici", label: "Fındık İçi", gramsPerBardak: 140 },
  { key: "badem", label: "Badem", gramsPerBardak: 150 },
  { key: "antep-fistigi", label: "Antep Fıstığı", gramsPerBardak: 140 },
  { key: "kuru-uzum", label: "Kuru Üzüm", gramsPerBardak: 150 },
  { key: "hindistan-cevizi", label: "Hindistan Cevizi (Rende)", gramsPerBardak: 90 },
  { key: "mayonez", label: "Mayonez", gramsPerBardak: 220 },
  { key: "ketcap", label: "Ketçap", gramsPerBardak: 240 },
  { key: "sirke", label: "Sirke", gramsPerBardak: 205 },
  { key: "limon-suyu", label: "Limon Suyu", gramsPerBardak: 200 },
  { key: "tarcin", label: "Tarçın (Toz)", gramsPerBardak: 100 },
  { key: "kirmizi-biber", label: "Kırmızı Biber (Toz)", gramsPerBardak: 100 },
  { key: "karabiber", label: "Karabiber (Toz)", gramsPerBardak: 100 },
  { key: "kimyon", label: "Kimyon (Toz)", gramsPerBardak: 90 },
];

export function findKitchenIngredientRow(key: KitchenIngredientKey) {
  return (
    kitchenIngredientRows.find((row) => row.key === key) ??
    kitchenIngredientRows[0]
  );
}

export type KitchenVolumeUnit = "bardak" | "yemekKasigi" | "cayKasigi" | "ml" | "litre";
export type KitchenUnit = KitchenVolumeUnit | "gram";

export const mlPerVolumeUnit: Record<KitchenVolumeUnit, number> = {
  bardak: 200,
  yemekKasigi: 15,
  cayKasigi: 5,
  ml: 1,
  litre: 1000,
};

export type KitchenConversionResult = {
  bardak: number;
  yemekKasigi: number;
  cayKasigi: number;
  ml: number;
  litre: number;
  gram: number;
};

export function convertKitchenValue(
  ingredientKey: KitchenIngredientKey,
  unit: KitchenUnit,
  value: number
): KitchenConversionResult {
  const row = findKitchenIngredientRow(ingredientKey);
  const gramsPerMl = row.gramsPerBardak / mlPerVolumeUnit.bardak;

  const mlEquivalent = unit === "gram" ? value / gramsPerMl : value * mlPerVolumeUnit[unit];

  return {
    bardak: mlEquivalent / mlPerVolumeUnit.bardak,
    yemekKasigi: mlEquivalent / mlPerVolumeUnit.yemekKasigi,
    cayKasigi: mlEquivalent / mlPerVolumeUnit.cayKasigi,
    ml: mlEquivalent,
    litre: mlEquivalent / mlPerVolumeUnit.litre,
    gram: mlEquivalent * gramsPerMl,
  };
}
