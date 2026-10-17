import type { CategoryArticle } from "../../categoryArticles";

// 1 mil = 1,609344 km; ABD galonu = 3,785411784 L; İngiliz galonu = 4,54609 L (NIST SP 811).
// L/100 km ile km/L ters orantılıdır: km/L = 100 / (L/100 km).
export const yakitVerimliligiCategoryArticle: CategoryArticle = {
  slug: "yakit-verimliligi",
  introduction: [
    "Yakıt tüketimi iki farklı mantıkla yazılır. Türkiye ve Avrupa'da L/100 km kullanılır: 100 kilometrede kaç litre yakıt harcandığı. ABD ve İngiltere'de ise mpg (mil/galon) kullanılır: bir galonla kaç mil gidildiği. Birinde sayı küçüldükçe araç tasarruflu olur, diğerinde sayı büyüdükçe.",
    "Bu yüzden iki birim ters orantılıdır ve aralarında basit bir çarpan yoktur: 5 L/100 km = 20 km/L, 10 L/100 km = 10 km/L olur. ABD ve İngiliz galonu farklı büyüklükte olduğu için aynı araç İngiliz mpg'siyle daha yüksek görünür.",
  ],
  facts: [
    { label: "5 L/100 km", value: "20 km/L = 47,0 mpg (ABD) = 56,5 mpg (İng.)" },
    { label: "30 mpg (ABD)", value: "7,84 L/100 km = 12,75 km/L" },
    { label: "Dönüşüm formülü", value: "L/100 km = 235,215 / mpg (ABD)" },
    { label: "İngiliz mpg formülü", value: "L/100 km = 282,481 / mpg (İng.)" },
    { label: "km/L ile ilişki", value: "km/L = 100 / (L/100 km)" },
  ],
  sections: [
    {
      title: "mpg neden L/100 km'ye doğrudan çarpılarak çevrilmez?",
      paragraphs: [
        "L/100 km tüketimi, mpg ise verimi ölçer; biri diğerinin tersidir. ABD mpg değerinden L/100 km'ye geçmek için 235,215 sayısı mpg'ye bölünür: 25 mpg = 9,41 L/100 km. İngiliz mpg'si için aynı işlem 282,481 ile yapılır: 50 mpg (İng.) = 5,65 L/100 km.",
        "Bu ters ilişki karşılaştırmayı da etkiler: 10'dan 20 mpg'ye çıkmak 100 km'de 11,8 litre tasarruf sağlarken, 30'dan 40 mpg'ye çıkmak yalnızca 1,96 litre kazandırır. Avrupa'nın L/100 km tercih etmesinin bir nedeni budur.",
      ],
    },
    {
      title: "Yurt dışından gelen araç verisi nasıl okunur?",
      paragraphs: [
        "ABD menşeli araç ilanlarında ve EPA değerlerinde mpg (ABD), İngiltere ilanlarında mpg (İngiliz) yazar. Önce hangi galonun kullanıldığına bakın; aynı sayı iki ülkede yaklaşık %20 farklı bir tüketimi anlatır.",
      ],
    },
  ],
  unitTable: [
    { name: "Litre/100 km", symbol: "L/100 km", referenceValue: "100 / (km/L)", system: "Türkiye, Avrupa", commonUse: "Araç katalogları" },
    { name: "Kilometre/litre", symbol: "km/L", referenceValue: "1 km/L", system: "Metrik", commonUse: "Japonya, Hindistan, Latin Amerika" },
    { name: "Mil/galon (ABD)", symbol: "mpg (ABD)", referenceValue: "0,4251 km/L", system: "ABD", commonUse: "EPA değerleri" },
    { name: "Mil/galon (İngiliz)", symbol: "mpg (İng.)", referenceValue: "0,3540 km/L", system: "Birleşik Krallık", commonUse: "İngiliz araç ilanları" },
    { name: "Galon (ABD)/100 mil", symbol: "gal/100 mi", referenceValue: "100 / mpg", system: "ABD", commonUse: "Yeni EPA etiketleri" },
  ],
};
