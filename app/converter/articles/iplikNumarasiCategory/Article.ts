import type { CategoryArticle } from "../../categoryArticles";

// tex = g/1000 m; denye = g/9000 m (ISO 1144, ISO 2947). Nm = m/g. Ne = 840 yardalık çile sayısı / libre:
// tex = 590,5412 / Ne. Yün (worsted, 560 yarda) 885,812 / Nek; keten (lea, 300 yarda) 1653,515 / Nl.
export const iplikNumarasiCategoryArticle: CategoryArticle = {
  slug: "iplik-numarasi",
  introduction: [
    "İplik numarası, ipliğin inceliğini ya da kalınlığını gösterir. İki sistem vardır: ağırlık sistemlerinde (tex, dtex, denye) sayı büyüdükçe iplik kalınlaşır; uzunluk sistemlerinde (Nm, Ne) sayı büyüdükçe iplik incelir.",
    "Uluslararası standart tex'tir: 1.000 metre ipliğin gram cinsinden ağırlığı. Filament ve sentetik iplikte denye (9.000 metrenin gramı) ve dtex, pamuk ipliğinde İngiliz numarası Ne, yün ve karışımlarda metrik numara Nm yaygındır.",
  ],
  facts: [
    { label: "1 tex", value: "10 dtex = 9 denye" },
    { label: "Ne 30", value: "19,68 tex = Nm 50,8" },
    { label: "Nm 50", value: "20 tex = Ne 29,5" },
    { label: "tex ↔ Nm", value: "tex = 1.000 / Nm" },
    { label: "tex ↔ Ne", value: "tex = 590,54 / Ne" },
  ],
  sections: [
    {
      title: "Ne ile Nm arasındaki fark",
      paragraphs: [
        "Ne (İngiliz pamuk numarası), bir libre (453,6 g) ipliğin kaç adet 840 yardalık çile verdiğidir; Nm (metrik numara) ise 1 gramın kaç metre olduğudur. İkisi de uzunluk sistemi olduğu için aralarında sabit bir çarpan vardır: Nm = Ne × 1,693. Ne 30 pamuk ipliği yaklaşık Nm 50,8'dir.",
        "Ağırlık sistemine geçişte ilişki terstir: tex = 1.000 / Nm. Bu yüzden Nm 50 iplik 20 tex, Nm 100 iplik 10 tex olur.",
      ],
    },
    {
      title: "Denye ve dtex nasıl çevrilir?",
      paragraphs: [
        "Denye, 9.000 metrenin gramıdır; dtex ise 10.000 metrenin gramı. Denyeden dtex'e geçmek için 10/9 ile çarpılır: 150 denye = 166,7 dtex. Çorap ve külotlu çorapta görülen 20 den, 70 den gibi değerler bu sistemdendir.",
        "Yün (worsted) ve keten numaraları da Ne gibi uzunluk sistemidir ama farklı çile uzunlukları kullanır: yünde 560 yarda, ketende 300 yarda. Bu yüzden aynı sayı her lifte farklı bir kalınlığı anlatır.",
      ],
    },
  ],
  unitTable: [
    { name: "Tex", symbol: "tex", referenceValue: "1 g / 1.000 m", system: "Uluslararası (ISO)", commonUse: "Standart iplik ölçüsü" },
    { name: "Desiteks", symbol: "dtex", referenceValue: "0,1 tex", system: "Uluslararası", commonUse: "Sentetik filament" },
    { name: "Denye", symbol: "den", referenceValue: "1 g / 9.000 m", system: "Geleneksel", commonUse: "Çorap, ipek, naylon" },
    { name: "Metrik numara", symbol: "Nm", referenceValue: "1.000 / tex", system: "Metrik (uzunluk)", commonUse: "Yün, akrilik, karışımlar" },
    { name: "İngiliz pamuk numarası", symbol: "Ne", referenceValue: "590,54 / tex", system: "İngiliz (uzunluk)", commonUse: "Pamuk ipliği" },
    { name: "Yün numarası (worsted)", symbol: "Nek", referenceValue: "885,81 / tex", system: "İngiliz (uzunluk)", commonUse: "Kamgarn yün" },
  ],
};
