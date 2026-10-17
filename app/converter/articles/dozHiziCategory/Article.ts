import type { CategoryArticle } from "../../categoryArticles";

// Zaman çevrimi: 1 gün = 24 saat, 1 yıl = 365 gün = 8.760 saat. 1 rem = 0,01 Sv (NIST SP 811).
// Doğal arka plan dünya ortalaması ≈ 2,4 mSv/yıl (UNSCEAR 2008).
export const dozHiziCategoryArticle: CategoryArticle = {
  slug: "doz-hizi",
  introduction: [
    "Doz hızı, birim zamanda alınan radyasyon dozudur. Dozimetre ve Geiger sayaçlarının ekranında çoğunlukla mikrosievert/saat (µSv/h) görünür; yıllık sınırlar ve ortalamalar ise milisievert/yıl (mSv/yıl) ile verilir.",
    "Bu iki birim arasındaki geçiş saat sayısına dayanır: bir yıl 8.760 saat olduğu için 1 µSv/h sürekli maruz kalımda 8,76 mSv/yıl eder. Bu sayfadaki dönüşümlerde yıl 365 gün olarak alınır.",
  ],
  facts: [
    { label: "1 µSv/saat", value: "24 µSv/gün = 8,76 mSv/yıl" },
    { label: "1 mSv/yıl", value: "≈ 0,114 µSv/saat" },
    { label: "1 mrem/saat", value: "10 µSv/saat" },
    { label: "Doğal arka plan ortalaması", value: "≈ 2,4 mSv/yıl ≈ 0,27 µSv/saat" },
    { label: "Yıl kabulü", value: "365 gün = 8.760 saat" },
  ],
  sections: [
    {
      title: "Dozimetredeki µSv/saat değeri yılda ne eder?",
      paragraphs: [
        "Ekrandaki değeri 8,76 ile çarpmak yıllık dozu mSv olarak verir: 0,15 µSv/h × 8,76 = 1,31 mSv/yıl. Bu hesap, o ortamda yılın her saatini geçirmeyi varsayar; gerçek maruz kalım, ortamda geçirilen süreye göre daha düşüktür.",
        "UNSCEAR'ın verdiği doğal arka plan dünya ortalaması yaklaşık 2,4 mSv/yıl'dır; bu da saatte yaklaşık 0,27 µSv'ye karşılık gelir. Ölçülen değer bölgeye, yüksekliğe ve yapı malzemelerine göre değişir.",
      ],
    },
    {
      title: "rem/saat ve mrem/saat",
      paragraphs: [
        "ABD menşeli cihazlar ve eski kaynaklar mrem/h ya da µR/h gösterebilir. 1 mrem/h = 10 µSv/h, 1 rem/h = 10 mSv/h'dir. µR/h ise ışınlama (havada iyonlaşma) birimidir; X ve gama ışınları için yaklaşık olarak 100 µR/h ≈ 1 µSv/h alınır, ancak bu bir yaklaşımdır ve tam dönüşüm değildir.",
      ],
    },
  ],
  unitTable: [
    { name: "Mikrosievert/saat", symbol: "µSv/h", referenceValue: "1 µSv/h", system: "SI", commonUse: "Dozimetre ekranı" },
    { name: "Nanosievert/saat", symbol: "nSv/h", referenceValue: "0,001 µSv/h", system: "SI", commonUse: "Çevre izleme istasyonları" },
    { name: "Milisievert/yıl", symbol: "mSv/yıl", referenceValue: "≈ 0,114 µSv/h", system: "SI", commonUse: "Yıllık doz ve sınırlar" },
    { name: "Mikrosievert/gün", symbol: "µSv/gün", referenceValue: "1/24 µSv/h", system: "SI", commonUse: "Günlük doz kaydı" },
    { name: "Milirem/saat", symbol: "mrem/h", referenceValue: "10 µSv/h", system: "Eski birim (ABD)", commonUse: "ABD cihazları" },
    { name: "Rem/saat", symbol: "rem/h", referenceValue: "10 mSv/h", system: "Eski birim (ABD)", commonUse: "Yüksek doz alanları" },
  ],
};
