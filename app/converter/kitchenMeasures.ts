// Mutfak olcu birimleri (bardak / yemek kasigi / cay kasigi / ml / gram)
// arasi malzemeye ozel donusum tablosu. Degerler, uluslararasi mutfak
// referanslarinda (King Arthur Baking Ingredient Weight Chart ve benzer
// cups-to-grams kaynaklari, 240 ml'lik standart olcek bardagi baz alinarak)
// yayinlanan gram/bardak degerlerinin 200/240 orani ile 200 ml'lik Turk su
// bardagina olceklenmesiyle elde edilmistir; bu, bu dosyayi kullanan tum
// dillerdeki (tr/en/de/ar/uz/bn/fr/es) mutfak araclarinin ayni gercekci
// yogunluk tabanini paylasmasini saglar. Tereyagi, zeytinyagi, bal, sut
// gibi kalemlerde onceki yerel degerler zaten bu referanslarla neredeyse
// birebir ortustugu icin degismedi; un, seker, kakao, pirinc, baklagiller,
// kuruyemis gibi kalemlerde onceki degerler uluslararasi referanslara gore
// %15-40 yuksekti ve asagida duzeltildi. Yerel/Turk'e ozgu kalemlerde
// (pekmez, kirmizi biber, kimyon vb.) uluslararasi referans olmadigi icin
// onceki pratik degerler korundu. Degerler yine de pratik kullanım icin
// yaklasiktir; kaynaklar arasi kucuk farklar olabilir.
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
  { key: "un", label: "Un (Buğday Unu)", gramsPerBardak: 100 },
  { key: "tam-bugday-unu", label: "Tam Buğday Unu", gramsPerBardak: 108 },
  { key: "pirinc-unu", label: "Pirinç Unu", gramsPerBardak: 118 },
  { key: "misir-unu", label: "Mısır Unu", gramsPerBardak: 123 },
  { key: "irmik", label: "İrmik", gramsPerBardak: 136 },
  { key: "galeta-unu", label: "Galeta Unu", gramsPerBardak: 90 },
  { key: "toz-seker", label: "Toz Şeker", gramsPerBardak: 167 },
  { key: "pudra-sekeri", label: "Pudra Şekeri", gramsPerBardak: 94 },
  { key: "esmer-seker", label: "Esmer Şeker", gramsPerBardak: 178 },
  { key: "tuz", label: "Tuz (Sofra Tuzu)", gramsPerBardak: 240 },
  { key: "pirinc", label: "Pirinç", gramsPerBardak: 154 },
  { key: "bulgur", label: "Bulgur (İnce)", gramsPerBardak: 138 },
  { key: "nohut", label: "Nohut (Kuru)", gramsPerBardak: 163 },
  { key: "kirmizi-mercimek", label: "Kırmızı Mercimek", gramsPerBardak: 163 },
  { key: "yesil-mercimek", label: "Yeşil Mercimek", gramsPerBardak: 154 },
  { key: "kuru-fasulye", label: "Kuru Fasulye", gramsPerBardak: 163 },
  { key: "sut", label: "Süt", gramsPerBardak: 205 },
  { key: "yogurt", label: "Yoğurt", gramsPerBardak: 210 },
  { key: "krema", label: "Krema", gramsPerBardak: 205 },
  { key: "tereyagi", label: "Tereyağı", gramsPerBardak: 190 },
  { key: "margarin", label: "Margarin", gramsPerBardak: 190 },
  { key: "zeytinyagi", label: "Zeytinyağı", gramsPerBardak: 184 },
  { key: "sivi-yag", label: "Sıvı Yağ (Bitkisel)", gramsPerBardak: 182 },
  { key: "bal", label: "Bal", gramsPerBardak: 285 },
  { key: "pekmez", label: "Pekmez", gramsPerBardak: 280 },
  { key: "kakao", label: "Kakao (Toz)", gramsPerBardak: 72 },
  { key: "yulaf-ezmesi", label: "Yulaf Ezmesi", gramsPerBardak: 75 },
  { key: "nisasta", label: "Nişasta (Mısır)", gramsPerBardak: 107 },
  { key: "kabartma-tozu", label: "Kabartma Tozu", gramsPerBardak: 160 },
  { key: "karbonat", label: "Karbonat", gramsPerBardak: 183 },
  { key: "susam", label: "Susam", gramsPerBardak: 120 },
  { key: "ceviz-ici", label: "Ceviz İçi (Kırık)", gramsPerBardak: 100 },
  { key: "findik-ici", label: "Fındık İçi", gramsPerBardak: 105 },
  { key: "badem", label: "Badem", gramsPerBardak: 119 },
  { key: "antep-fistigi", label: "Antep Fıstığı", gramsPerBardak: 110 },
  { key: "kuru-uzum", label: "Kuru Üzüm", gramsPerBardak: 138 },
  { key: "hindistan-cevizi", label: "Hindistan Cevizi (Rende)", gramsPerBardak: 75 },
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

/**
 * A cup is not a universal unit.  The Turkish kitchen tool deliberately
 * keeps its established 200 ml glass, while the English tool can state the
 * recipe standard it is using instead of silently applying that value.
 */
export type KitchenCupStandard =
  | "turkish"
  | "us"
  | "usLegal"
  | "metric"
  | "imperial";

export const mlPerKitchenCupStandard: Record<KitchenCupStandard, number> = {
  turkish: 200,
  us: 236.5882365,
  usLegal: 240,
  metric: 250,
  imperial: 284.130625,
};

export const mlPerVolumeUnit: Record<KitchenVolumeUnit, number> = {
  // Kept at 200 ml for the long-standing Turkish default. New callers that
  // need a regional cup should use getMlPerKitchenVolumeUnit instead.
  bardak: mlPerKitchenCupStandard.turkish,
  yemekKasigi: 15,
  cayKasigi: 5,
  ml: 1,
  litre: 1000,
};

export function getMlPerKitchenVolumeUnit(
  unit: KitchenVolumeUnit,
  cupStandard: KitchenCupStandard = "turkish"
) {
  return unit === "bardak"
    ? mlPerKitchenCupStandard[cupStandard]
    : mlPerVolumeUnit[unit];
}

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
  value: number,
  cupStandard: KitchenCupStandard = "turkish"
): KitchenConversionResult {
  const row = findKitchenIngredientRow(ingredientKey);
  const gramsPerMl = row.gramsPerBardak / mlPerVolumeUnit.bardak;

  const mlEquivalent =
    unit === "gram"
      ? value / gramsPerMl
      : value * getMlPerKitchenVolumeUnit(unit, cupStandard);

  return {
    bardak:
      mlEquivalent /
      getMlPerKitchenVolumeUnit("bardak", cupStandard),
    yemekKasigi: mlEquivalent / mlPerVolumeUnit.yemekKasigi,
    cayKasigi: mlEquivalent / mlPerVolumeUnit.cayKasigi,
    ml: mlEquivalent,
    litre: mlEquivalent / mlPerVolumeUnit.litre,
    gram: mlEquivalent * gramsPerMl,
  };
}
