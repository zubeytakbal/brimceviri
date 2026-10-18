import type { CategoryArticle } from "../../categoryArticles";

// ABD proof = 2 × ABV (27 CFR 5.65). İngiliz proof (1980'e kadar resmî): 100° proof = %57,14 ABV, proof = ABV × 7/4.
export const alkolDerecesiCategoryArticle: CategoryArticle = {
  slug: "alkol-derecesi",
  introduction: [
    "Türkiye'de içkilerin alkol oranı derece ya da hacimce yüzde (% vol) ile yazılır; ikisi aynıdır: 45° rakı, hacminin %45'i alkol olan içki demektir. Bu ölçü Fransız kimyacı Gay-Lussac'ın adıyla °GL olarak da geçer.",
    "ABD etiketlerinde ise proof kullanılır ve hesap basittir: proof, yüzdenin iki katıdır. %40'lık bir viski 80 proof, 45° rakı 90 proof eder. İngiltere'nin 1980'e kadar kullandığı eski proof sisteminde 100 proof %57,14'e karşılık gelir.",
  ],
  facts: [
    { label: "1° (derece)", value: "%1 vol = 2 ABD proof" },
    { label: "45° rakı", value: "90 ABD proof = 78,75 İngiliz proof" },
    { label: "100 ABD proof", value: "%50 vol" },
    { label: "100 İngiliz proof", value: "%57,14 vol" },
  ],
  sections: [
    {
      title: "Proof nasıl çevrilir?",
      paragraphs: [
        "ABD proof değerini 2'ye bölün: 86 proof = %43 vol. Ters yönde yüzdeyi 2 ile çarpın: %37,5 = 75 proof. İngiliz proof için yüzdeyi 1,75 ile çarpın: %40 = 70 İngiliz proof.",
        "\"Overproof\" ifadesi eski İngiliz sisteminden gelir: 100 İngiliz proof'un, yani %57,14'ün üstündeki içkileri anlatır. Günümüzde İngiltere ve Avrupa'da etiketlerde yalnızca % vol yazılır.",
      ],
    },
    {
      title: "Hacimce ve ağırlıkça yüzde farkı",
      paragraphs: [
        "Etiketlerdeki değer her zaman hacimce yüzdedir (20 °C'de). Alkol sudan hafif olduğu için ağırlıkça yüzde daha küçük çıkar; örneğin %40 vol bir içki ağırlıkça yaklaşık %33 alkol içerir. Bu dönüşüm yoğunluğa bağlı olduğundan sabit bir katsayıyla yapılmaz ve bu çeviricide yer almaz.",
      ],
    },
  ],
  unitTable: [
    { name: "Hacimce yüzde", symbol: "% vol", referenceValue: "1", system: "Uluslararası", commonUse: "Tüm etiketler" },
    { name: "Derece (Gay-Lussac)", symbol: "°", referenceValue: "%1 vol", system: "Türkiye, Avrupa", commonUse: "Rakı, şarap, kolonya" },
    { name: "ABD proof", symbol: "US proof", referenceValue: "%0,5 vol", system: "ABD", commonUse: "Viski, burbon etiketleri" },
    { name: "İngiliz proof", symbol: "UK proof", referenceValue: "%0,5714 vol", system: "İngiltere (1980 öncesi)", commonUse: "Eski kaynaklar, rom" },
  ],
};
