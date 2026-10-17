import type { CategoryArticle } from "../../categoryArticles";

// 1 lx = 1 lm/m², 1 fc = 1 lm/ft² (1 ft² = 0,09290304 m²), 1 ph = 1 lm/cm² = 10⁴ lx (NIST SP 811 Ek B).
// Ofis aydınlık düzeyi: EN 12464-1:2021 (yazma, okuma, veri işleme için 500 lx).
export const aydinlatmaSiddetiCategoryArticle: CategoryArticle = {
  slug: "aydinlatma-siddeti",

  introduction: [
    "Aydınlatma şiddeti (aydınlık), bir yüzeyin metrekaresine düşen ışık akısıdır. SI birimi lükstür: 1 lüks (lx), metrekareye 1 lümen ışık düşmesi demektir. ABD'de ve bazı fotoğraf ve sahne ekipmanlarında foot-candle (fc) kullanılır.",
    "1 foot-candle, fitkareye düşen 1 lümendir. 1 fitkare 0,09290304 m² olduğu için 1 fc = 10,7639 lx'tür. Eski CGS birimi phot ise santimetrekareye 1 lümendir ve 10.000 lükse eşittir.",
  ],

  facts: [
    { label: "SI birimi", value: "Lüks (lx = lm/m²)" },
    { label: "1 foot-candle", value: "10,7639 lx" },
    { label: "1 phot", value: "10.000 lx" },
    { label: "Ofis çalışma alanı (EN 12464-1)", value: "500 lx" },
    { label: "Lümen ile farkı", value: "Lümen toplam ışık; lüks birim alana düşen ışık" },
  ],

  sections: [
    {
      title: "Lümen, lüks ve watt arasındaki fark",
      paragraphs: [
        "Lümen (lm) bir lambanın verdiği toplam ışık miktarıdır; lüks ise bu ışığın bir yüzeye ne kadar yoğun düştüğüdür. 1.000 lümenlik bir ışık 1 m²'ye dağılırsa yüzey 1.000 lx, 10 m²'ye dağılırsa 100 lx olur.",
        "Watt ise lambanın çektiği elektrik gücüdür; ışık miktarı değildir. Aynı ışık için LED, akkor ampule göre çok daha az watt harcar. Bu yüzden lüks ile watt arasında sabit bir dönüşüm yoktur.",
      ],
    },
    {
      title: "Ne kadar aydınlık gerekir?",
      paragraphs: [
        "Avrupa standardı EN 12464-1, iç mekân çalışma alanları için asgari aydınlık düzeyleri verir; yazma, okuma ve bilgisayarla çalışma için bu değer 500 lx'tür. Koridor ve depo gibi alanlar için daha düşük değerler öngörülür.",
        "Dış mekânda doğal ışık çok daha güçlüdür: açık bir günde güneş altında aydınlık on binlerce lükse çıkar, dolunay gecesinde ise 1 lüksün altında kalır. Bu geniş aralık nedeniyle ölçüm cihazları (lüksmetre) çoğu zaman kilolüks kademesi de sunar.",
      ],
    },
    {
      title: "Foot-candle'dan lükse çevirme",
      paragraphs: [
        "Foot-candle değerini lükse çevirmek için 10,7639 ile çarpın: 50 fc = 538,2 lx. Lüksten foot-candle'a geçmek için 10,7639'a bölün: 500 lx ≈ 46,45 fc.",
        "Pratikte kabaca 1 fc ≈ 10 lx alınır; ancak aydınlatma projesi ve ölçüm raporlarında tam katsayı kullanılmalıdır.",
      ],
    },
  ],

  unitTable: [
    { name: "Lüks", symbol: "lx", referenceValue: "1 lm/m²", system: "SI", commonUse: "Aydınlatma projesi, lüksmetre" },
    { name: "Kilolüks", symbol: "klx", referenceValue: "1.000 lx", system: "SI", commonUse: "Gün ışığı ölçümü" },
    { name: "Foot-candle", symbol: "fc", referenceValue: "10,7639 lx", system: "ABD geleneksel", commonUse: "ABD aydınlatma ve fotoğraf" },
    { name: "Phot", symbol: "ph", referenceValue: "10.000 lx", system: "CGS", commonUse: "Eski bilimsel kaynaklar" },
  ],
};
