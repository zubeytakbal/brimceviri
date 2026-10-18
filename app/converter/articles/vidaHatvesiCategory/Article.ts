import type { CategoryArticle } from "../../categoryArticles";

// 1 inç = 25,4 mm. Metrik kaba diş hatveleri ISO 261 (M6 = 1, M8 = 1,25, M10 = 1,5, M12 = 1,75 mm).
export const vidaHatvesiCategoryArticle: CategoryArticle = {
  slug: "vida-hatvesi",
  introduction: [
    "Hatve (diş adımı), vidanın iki komşu diş tepesi arasındaki mesafedir. Metrik vidalarda milimetreyle yazılır: M10 × 1,5 vidanın hatvesi 1,5 mm'dir. İnç vidalarda (UNC, UNF, BSW, BSP) ise hatve yerine bir inçteki diş sayısı (TPI) verilir.",
    "İkisi birbirinin tersidir: hatve (mm) = 25,4 / TPI. 20 diş/inç bir vida 1,27 mm hatvelidir; 1,5 mm hatve ise inçte 16,93 dişe karşılık gelir. Bu yüzden metrik ve inç vidaların çoğu birbirine tam uymaz.",
  ],
  facts: [
    { label: "20 TPI", value: "1,27 mm (1/4\"-20 UNC)" },
    { label: "14 TPI", value: "1,814 mm (1/2\" BSP boru dişi)" },
    { label: "1,5 mm", value: "16,93 TPI (M10 kaba diş)" },
    { label: "1 mm", value: "25,4 TPI (M6 kaba diş)" },
  ],
  sections: [
    {
      title: "TPI milimetre hatveye nasıl çevrilir?",
      paragraphs: [
        "25,4'ü TPI değerine bölün: 13 TPI = 1,954 mm, 18 TPI = 1,411 mm. Ters yönde 25,4'ü hatveye bölün: 1,25 mm = 20,32 TPI. Değer tam sayıya yakın çıkmıyorsa vida büyük ihtimalle diğer sistemdendir.",
        "Diş tarağı (hatve mastarı) yoksa bir cetvelle 10 diş arasını ölçüp 10'a bölerek hatveyi bulabilirsiniz; 1 inçteki dişleri sayarak da TPI bulunur.",
      ],
    },
    {
      title: "Metrik kaba diş hatveleri",
      paragraphs: [
        "ISO 261'e göre metrik kaba dişlerde standart hatveler şöyledir: M3 0,5 mm, M4 0,7 mm, M5 0,8 mm, M6 1 mm, M8 1,25 mm, M10 1,5 mm, M12 1,75 mm, M16 2 mm, M20 2,5 mm. İnce dişli vidalarda hatve daha küçüktür ve ölçüyle birlikte yazılır (M10 × 1,25 gibi).",
      ],
    },
  ],
  unitTable: [
    { name: "Milimetre (hatve)", symbol: "mm", referenceValue: "1 mm", system: "Metrik (ISO)", commonUse: "Metrik vidalar, kılavuz" },
    { name: "Diş/inç", symbol: "TPI", referenceValue: "25,4 / değer mm", system: "İnç (UNC, UNF, BSW, BSP)", commonUse: "İnç vidalar, boru dişleri" },
    { name: "Diş/santimetre", symbol: "diş/cm", referenceValue: "10 / değer mm", system: "Metrik", commonUse: "Eski kaynaklar" },
    { name: "İnç (hatve)", symbol: "inç", referenceValue: "25,4 mm", system: "İnç", commonUse: "Kaba hatveler, kurşun vidalar" },
    { name: "Mikrometre", symbol: "µm", referenceValue: "0,001 mm", system: "Metrik", commonUse: "Hassas ölçüm vidaları" },
  ],
};
