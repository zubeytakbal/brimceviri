import type { CategoryArticle } from "../../categoryArticles";

// 1 Bq = 1 bozunma/s; 1 Ci = 3,7·10¹⁰ Bq (tanım); 1 Rd = 10⁶ Bq (NIST SP 811 Ek B).
export const radyoaktiviteCategoryArticle: CategoryArticle = {
  slug: "radyoaktivite",
  introduction: [
    "Radyoaktivite (aktivite), bir radyoaktif kaynakta saniyede kaç atomun bozunduğunu gösterir. SI birimi becquerel'dir (Bq): 1 Bq, saniyede bir bozunma demektir.",
    "Eski birim curie (Ci), başlangıçta 1 gram radyumun aktivitesine göre tanımlanmıştı ve bugün tam olarak 3,7 × 10¹⁰ Bq'dir. Bu yüzden 1 mCi = 37 MBq ve 1 µCi = 37 kBq olur.",
  ],
  facts: [
    { label: "SI birimi", value: "Becquerel (Bq = 1/s)" },
    { label: "1 Ci", value: "37 GBq (tam tanım)" },
    { label: "1 mCi", value: "37 MBq" },
    { label: "1 pCi", value: "0,037 Bq" },
    { label: "1 Rd (rutherford)", value: "1 MBq" },
  ],
  sections: [
    {
      title: "Becquerel ile curie nasıl çevrilir?",
      paragraphs: [
        "Curie'den becquerel'e geçmek için 3,7 × 10¹⁰ ile çarpılır; mCi'den MBq'ye geçerken bu 37 ile çarpmaya iner: 20 mCi = 740 MBq. Ters yönde MBq değeri 37'ye bölünür: 370 MBq = 10 mCi.",
        "Nükleer tıpta hastaya verilen ilaçların aktivitesi Türkiye ve Avrupa'da MBq, ABD'de çoğunlukla mCi ile yazılır; aynı değeri iki raporda karşılaştırırken bu çarpan kullanılır.",
      ],
    },
    {
      title: "Bq ile Bq/m³ ve Bq/kg farkı",
      paragraphs: [
        "Bq bir kaynağın toplam aktivitesidir. Radon ölçümlerinde görülen Bq/m³ havanın metreküpündeki aktiviteyi, gıda analizlerindeki Bq/kg ise kilogram başına aktiviteyi gösterir; bunlar konsantrasyondur ve doğrudan Bq'ye çevrilmez, hacim ya da kütleyle çarpmak gerekir.",
        "Sayım cihazları bazen bozunma/dakika (dpm) gösterir: 60 dpm = 1 Bq. Cihazın gösterdiği sayım/dakika (cpm) ise dedektör verimine bağlıdır ve verim bilinmeden Bq'ye çevrilemez.",
      ],
    },
  ],
  unitTable: [
    { name: "Becquerel", symbol: "Bq", referenceValue: "1 bozunma/s", system: "SI", commonUse: "Tüm ölçümler" },
    { name: "Megabecquerel", symbol: "MBq", referenceValue: "10⁶ Bq", system: "SI", commonUse: "Nükleer tıp" },
    { name: "Gigabecquerel", symbol: "GBq", referenceValue: "10⁹ Bq", system: "SI", commonUse: "Endüstriyel kaynaklar" },
    { name: "Curie", symbol: "Ci", referenceValue: "3,7 × 10¹⁰ Bq", system: "Eski birim", commonUse: "ABD, eski kaynaklar" },
    { name: "Milicurie", symbol: "mCi", referenceValue: "37 MBq", system: "Eski birim", commonUse: "ABD nükleer tıp" },
    { name: "Pikocurie", symbol: "pCi", referenceValue: "0,037 Bq", system: "Eski birim", commonUse: "ABD radon ölçümü (pCi/L)" },
    { name: "Bozunma/dakika", symbol: "dpm", referenceValue: "1/60 Bq", system: "Sayım birimi", commonUse: "Laboratuvar sayımları" },
  ],
};
