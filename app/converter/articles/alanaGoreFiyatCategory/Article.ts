import type { CategoryArticle } from "../../categoryArticles";

// Dönüm burada bugünkü dönümdür (1 dönüm = 1 dekar = 1000 m²). 1 hektar = 10 000 m², 1 ft² = 0,09290304 m², 1 acre = 4046,8564224 m².
export const alanaGoreFiyatCategoryArticle: CategoryArticle = {
  slug: "alana-gore-fiyat",
  introduction: [
    "Arsa ve tarla ilanlarında fiyat bazen metrekare, bazen dönüm başına verilir; iki ilanı karşılaştırmak için aynı birime çevirmek gerekir. Bugün kullanılan dönüm 1000 m²'dir (dekarla aynı), bu yüzden dönüm fiyatını 1000'e bölünce metrekare fiyatı çıkar.",
    "Örneğin dönümü 750.000 TL olan bir tarlanın metrekaresi 750 TL'dir; metrekaresi 1.200 TL olan bir arsanın dönüm karşılığı 1.200.000 TL eder. Çevirici para biriminden bağımsızdır; aynı hesap dolar ya da avro için de geçerlidir.",
  ],
  facts: [
    { label: "1 TL/m²", value: "1.000 TL/dönüm = 10.000 TL/hektar" },
    { label: "1.000.000 TL/dönüm", value: "1.000 TL/m²" },
    { label: "1 TL/ft²", value: "10,76 TL/m²" },
    { label: "1 TL/acre", value: "0,000247 TL/m²" },
  ],
  sections: [
    {
      title: "Dönüm fiyatı metrekareye nasıl çevrilir?",
      paragraphs: [
        "Dönüm fiyatını 1000'e bölün: 2.500.000 TL/dönüm = 2.500 TL/m². Toplam fiyatı bulmak için metrekare fiyatını tapudaki alanla çarpın; 3.750 m²'lik bir tarla 2.500 TL/m²'den 9.375.000 TL eder.",
        "Eski tapularda geçen eski (atik) dönüm yaklaşık 918,67 m²'dir. Fiyat eski dönüme göre söylenmişse önce alanı metrekareye çevirmek gerekir; tapudaki alan her zaman metrekare cinsindendir.",
      ],
    },
    {
      title: "Hektar, fitkare ve acre fiyatları",
      paragraphs: [
        "Büyük araziler ve yurt dışı ilanları hektar ya da acre başına fiyatla verilir: 1 hektar 10 dönüm, 1 acre yaklaşık 4,05 dönümdür. ABD ve İngiltere'de konut fiyatları fitkare başına verilir; 1 m² = 10,76 ft² olduğundan fitkare fiyatını 10,76 ile çarpınca metrekare fiyatı bulunur.",
      ],
    },
  ],
  unitTable: [
    { name: "TL/metrekare", symbol: "₺/m²", referenceValue: "1 ₺/m²", system: "Türkiye", commonUse: "Arsa ve konut ilanları" },
    { name: "TL/dönüm (dekar)", symbol: "₺/dönüm", referenceValue: "0,001 ₺/m²", system: "Türkiye", commonUse: "Tarla ve bahçe ilanları" },
    { name: "TL/hektar", symbol: "₺/ha", referenceValue: "0,0001 ₺/m²", system: "Uluslararası", commonUse: "Büyük araziler" },
    { name: "TL/fitkare", symbol: "₺/ft²", referenceValue: "10,76 ₺/m²", system: "ABD, İngiltere", commonUse: "Yabancı konut ilanları" },
    { name: "TL/acre", symbol: "₺/acre", referenceValue: "0,000247 ₺/m²", system: "ABD, İngiltere", commonUse: "Yabancı arazi ilanları" },
  ],
};
