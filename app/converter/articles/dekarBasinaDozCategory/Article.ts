import type { CategoryArticle } from "../../categoryArticles";

// 1 dekar = 1000 m², 1 hektar = 10 000 m², 1 acre = 4046,8564224 m²; ABD galonu 3,785411784 L, ABD sıvı onsu 29,5735295625 mL.
export const dekarBasinaDozCategoryArticle: CategoryArticle = {
  slug: "dekar-basina-doz",
  introduction: [
    "Tarım ilacı ve sıvı gübre etiketlerinde doz Türkiye'de genellikle dekar başına mililitre ya da litreyle (mL/da, L/da), yabancı etiketlerde hektar başına litreyle (L/ha) ya da acre başına galon ve onsla verilir. Birim karıştırılırsa doz 10 kat ya da 1000 kat yanlış hesaplanabilir.",
    "1 hektar 10 dekar olduğundan 1 L/ha = 100 mL/da'dır. Etikette 200 mL/da yazan bir ürün hektara 2 litre uygulanır.",
  ],
  facts: [
    { label: "1 L/ha", value: "100 mL/da = 0,1 mL/m²" },
    { label: "1 L/da", value: "10 L/ha = 1 mL/m²" },
    { label: "1 gal/acre (ABD)", value: "9,354 L/ha = 935 mL/da" },
    { label: "1 fl oz/acre (ABD)", value: "73,1 mL/ha = 7,3 mL/da" },
  ],
  sections: [
    {
      title: "mL/da dozu küçük alana nasıl uygulanır?",
      paragraphs: [
        "Dozu metrekareye indirmek için mL/da değerini 1000'e bölün: 150 mL/da = 0,15 mL/m². 50 m²'lik bir bahçe için 0,15 × 50 = 7,5 mL ürün gerekir. Ürünün ne kadar suyla karıştırılacağı ayrıca etikette yazar; ilaç dozu ile ilaçlı su miktarı farklı şeylerdir.",
        "Bu çevirici yalnızca birimleri çevirir. Hangi ürünün hangi dozda kullanılacağı ürün etiketine ve ruhsatına göredir.",
      ],
    },
    {
      title: "Hektar ve acre dozları",
      paragraphs: [
        "Avrupa etiketlerindeki L/ha değerini 100 ile çarparak mL/da bulursunuz: 0,75 L/ha = 75 mL/da. ABD etiketlerinde sıvılar galon/acre ya da fl oz/acre ile verilir; 1 gal/acre 9,354 L/ha, 1 fl oz/acre 73,1 mL/ha'dır.",
      ],
    },
  ],
  unitTable: [
    { name: "Mililitre/dekar", symbol: "mL/da", referenceValue: "0,01 L/ha", system: "Türkiye", commonUse: "İlaç etiketleri" },
    { name: "Litre/dekar", symbol: "L/da", referenceValue: "10 L/ha", system: "Türkiye", commonUse: "Sıvı gübre, ilaçlı su miktarı" },
    { name: "Litre/hektar", symbol: "L/ha", referenceValue: "1 L/ha", system: "Uluslararası", commonUse: "Avrupa etiketleri" },
    { name: "Mililitre/metrekare", symbol: "mL/m²", referenceValue: "10 L/ha", system: "Pratik", commonUse: "Bahçe ve sera" },
    { name: "Galon (ABD)/acre", symbol: "gal/acre", referenceValue: "9,354 L/ha", system: "ABD", commonUse: "ABD etiketleri" },
    { name: "Sıvı ons (ABD)/acre", symbol: "fl oz/acre", referenceValue: "73,1 mL/ha", system: "ABD", commonUse: "ABD etiketleri" },
  ],
};
