import type { CategoryArticle } from "../../categoryArticles";

// 1 m² = 100 dm² = 10 000 cm²; 1 inç² = 6,4516 cm² (tam), 1 ft² = 0,09290304 m².
export const haliDugumCategoryArticle: CategoryArticle = {
  slug: "hali-dugum-sikligi",
  introduction: [
    "El dokuması halıda kalite göstergelerinden biri düğüm sıklığıdır: belirli bir alandaki düğüm sayısı. Türkiye'de bu değer çoğunlukla desimetrekare (10 × 10 cm) ya da metrekare başına, yurt dışında ise inçkare başına (KPSI, knots per square inch) verilir.",
    "Birimler arasında yalnızca alan farkı vardır: 1 m² = 100 dm² = 10.000 cm² ve 1 inçkare = 6,4516 cm². Örneğin dm²'de 64 düğüm (8 × 8) metrekarede 6.400, inçkarede yaklaşık 4,1 düğüm eder.",
  ],
  facts: [
    { label: "1 düğüm/dm²", value: "100 düğüm/m²" },
    { label: "1 KPSI", value: "1550 düğüm/m² = 15,5 düğüm/dm²" },
    { label: "100 düğüm/dm²", value: "10.000 düğüm/m² = 6,45 KPSI" },
    { label: "1 düğüm/cm²", value: "100 düğüm/dm² = 6,45 KPSI" },
  ],
  sections: [
    {
      title: "Düğüm sıklığı nasıl sayılır?",
      paragraphs: [
        "Halının arkasında yatay ve dikey yönde 10 cm'lik bir kenar ölçülür ve her yöndeki düğüm sayısı sayılır; iki sayının çarpımı desimetrekaredeki düğüm sayısıdır. Yatayda 10 cm'de 9, dikeyde 10 cm'de 10 düğüm varsa sıklık 90 düğüm/dm², yani 9.000 düğüm/m²'dir.",
        "İnç sisteminde aynı sayım 1 inçlik kenarla yapılır ve sonuç KPSI olarak yazılır. Satıcıların verdiği değerin hangi alana göre olduğunu bilmeden iki halıyı karşılaştırmak yanıltıcı olur; değerleri aynı birime çevirmek gerekir.",
      ],
    },
    {
      title: "Düğüm sıklığı tek başına kalite midir?",
      paragraphs: [
        "Sıklık arttıkça desen daha ince işlenebilir, ama halının değeri yalnızca düğüm sayısına bağlı değildir; ipliğin cinsi (yün, ipek), boyanın doğallığı, desenin işçiliği ve halının durumu da belirleyicidir. Düğüm sayısı, aynı türden halıları karşılaştırmak için kullanışlı bir ölçüdür.",
      ],
    },
  ],
  unitTable: [
    { name: "Düğüm/metrekare", symbol: "düğüm/m²", referenceValue: "1", system: "Metrik", commonUse: "Halı satış ilanları" },
    { name: "Düğüm/desimetrekare", symbol: "düğüm/dm²", referenceValue: "100 düğüm/m²", system: "Metrik", commonUse: "Türk halıcılığında sayım" },
    { name: "Düğüm/santimetrekare", symbol: "düğüm/cm²", referenceValue: "10.000 düğüm/m²", system: "Metrik", commonUse: "İpek halılar" },
    { name: "Düğüm/inçkare", symbol: "KPSI", referenceValue: "1550 düğüm/m²", system: "İnç", commonUse: "Yabancı açık artırma ve katalogları" },
    { name: "Düğüm/fitkare", symbol: "düğüm/ft²", referenceValue: "10,76 düğüm/m²", system: "İnç", commonUse: "ABD ilanları" },
  ],
};
