import type { CategoryArticle } from "../../categoryArticles";

// 1 dekar = 1000 m², 1 hektar = 10 dekar = 10 000 m², 1 acre = 4046,8564224 m², 1 lb = 0,45359237 kg.
export const dekarBasinaVerimCategoryArticle: CategoryArticle = {
  slug: "dekar-basina-verim",
  introduction: [
    "Türkiye'de verim, tohum ve gübre miktarları çoğunlukla dekar başına kilogramla (kg/da) konuşulur; uluslararası kaynaklar ve bilimsel yayınlar ise hektar başına (kg/ha ya da t/ha) kullanır. ABD kaynaklarında aynı değer acre başına pound (lb/acre) olarak geçer.",
    "1 hektar 10 dekar olduğu için çeviri basittir: kg/da değerini 10 ile çarpınca kg/ha, 100'e bölünce t/ha bulunur. Örneğin 450 kg/da buğday verimi 4500 kg/ha ya da 4,5 t/ha demektir.",
  ],
  facts: [
    { label: "1 kg/da", value: "10 kg/ha = 1 g/m²" },
    { label: "1 t/ha", value: "100 kg/da" },
    { label: "1 lb/acre", value: "1,121 kg/ha = 0,112 kg/da" },
    { label: "100 kg/ha", value: "10 kg/da = 89,2 lb/acre" },
  ],
  sections: [
    {
      title: "kg/da ile t/ha nasıl çevrilir?",
      paragraphs: [
        "kg/da değerini 100'e bölün: 600 kg/da = 6 t/ha. Ters yönde t/ha değerini 100 ile çarpın: 3,2 t/ha = 320 kg/da. Gübre önerilerinde de aynı kural geçerlidir; 15 kg/da saf azot önerisi 150 kg/ha N demektir.",
        "Küçük alanlarda metrekare başına gram daha anlaşılırdır: 1 kg/da = 1 g/m². Bahçede 1 m²'ye 30 g gübre atmak, dekara 30 kg atmakla aynı orandır.",
      ],
    },
    {
      title: "Acre ve pound ile verilen değerler",
      paragraphs: [
        "1 acre 4046,86 m², yani yaklaşık 4 dekardır. 1 lb/acre = 1,121 kg/ha olduğundan ABD kaynaklarındaki 100 lb/acre gübre önerisi yaklaşık 11,2 kg/da eder. Tahıl verimleri ABD'de bushel/acre ile de verilir; bushel ürüne göre farklı kiloya karşılık geldiği için bu birim burada çevrilmez.",
      ],
    },
  ],
  unitTable: [
    { name: "Kilogram/dekar", symbol: "kg/da", referenceValue: "10 kg/ha", system: "Türkiye", commonUse: "Verim, tohum ve gübre miktarı" },
    { name: "Kilogram/hektar", symbol: "kg/ha", referenceValue: "1 kg/ha", system: "Uluslararası", commonUse: "Bilimsel yayınlar, FAO verileri" },
    { name: "Ton/hektar", symbol: "t/ha", referenceValue: "1000 kg/ha", system: "Uluslararası", commonUse: "Tahıl ve yem bitkisi verimi" },
    { name: "Gram/metrekare", symbol: "g/m²", referenceValue: "10 kg/ha", system: "Pratik", commonUse: "Bahçe ve sera" },
    { name: "Pound/acre", symbol: "lb/acre", referenceValue: "1,121 kg/ha", system: "ABD", commonUse: "ABD gübre ve tohum önerileri" },
  ],
};
