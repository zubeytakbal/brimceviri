import type { CategoryArticle } from "../../categoryArticles";

// 1 oz/yd² = 28,349523125 g / 0,83612736 m² = 33,9057 g/m² (NIST SP 811 tanımlarından). Momme: 4,3398 g/m² (ipek ticareti).
export const gramajCategoryArticle: CategoryArticle = {
  slug: "gramaj",
  introduction: [
    "Kumaş gramajı, kumaşın metrekaresinin ağırlığıdır ve kalınlığı, dayanıklılığı ve kullanım alanını belirler. Türkiye ve Avrupa'da gram/metrekare (g/m², GSM), ABD ve İngiltere'de ons/yardakare (oz/yd²) kullanılır.",
    "1 oz/yd² = 33,906 g/m²'dir. Denim gibi ABD menşeli ürünlerde gramaj çoğunlukla ons ile verilir: 12 oz denim yaklaşık 407 g/m², 14 oz denim yaklaşık 475 g/m² eder.",
  ],
  facts: [
    { label: "1 oz/yd²", value: "33,906 g/m²" },
    { label: "1 oz/ft²", value: "305,15 g/m²" },
    { label: "100 g/m²", value: "2,949 oz/yd²" },
    { label: "1 momme (ipek)", value: "4,34 g/m²" },
    { label: "1 kg/m²", value: "1.000 g/m²" },
  ],
  sections: [
    {
      title: "GSM ile oz/yd² nasıl çevrilir?",
      paragraphs: [
        "oz/yd² değerini g/m²'ye çevirmek için 33,906 ile çarpın: 8 oz/yd² = 271,2 g/m². g/m²'den oz/yd²'ye geçmek için 33,906'ya bölün: 180 g/m² = 5,31 oz/yd².",
        "İthalat ve ihracat tekliflerinde iki birimin karışması sık görülen bir hatadır; aynı sayı iki birimde çok farklı bir kumaşı anlatır. Teklifte birimin açıkça yazılması gerekir.",
      ],
    },
    {
      title: "Momme nedir?",
      paragraphs: [
        "Momme, ipek kumaşlarda kullanılan Japon kökenli bir ağırlık birimidir. Yaygın kabulle 1 momme = 4,3398 g/m²'dir; 19 momme ipek yaklaşık 82 g/m², 22 momme ipek yaklaşık 95 g/m² eder.",
      ],
    },
  ],
  unitTable: [
    { name: "Gram/metrekare (GSM)", symbol: "g/m²", referenceValue: "1 g/m²", system: "Metrik", commonUse: "Türkiye ve Avrupa tekstili" },
    { name: "Ons/yardakare", symbol: "oz/yd²", referenceValue: "33,906 g/m²", system: "ABD / İngiliz", commonUse: "Denim, ABD kumaşları" },
    { name: "Ons/fitkare", symbol: "oz/ft²", referenceValue: "305,15 g/m²", system: "ABD / İngiliz", commonUse: "Deri, ağır malzemeler" },
    { name: "Pound/yardakare", symbol: "lb/yd²", referenceValue: "542,49 g/m²", system: "ABD / İngiliz", commonUse: "Branda, halı" },
    { name: "Momme", symbol: "mm", referenceValue: "4,34 g/m²", system: "Japon ipek ticareti", commonUse: "İpek kumaş" },
  ],
};
