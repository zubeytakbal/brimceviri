import type { CategoryArticle } from "../../categoryArticles";

// 1 mm su yüksekliği × 1 m² = 1 L (10⁻³ m³); suyun yoğunluğu ≈ 1 kg/L olduğundan 1 L ≈ 1 kg. 1 dekar = 1000 m², 1 hektar = 10 000 m².
export const yagisCategoryArticle: CategoryArticle = {
  slug: "yagis-miktari",
  introduction: [
    "Yağış, düz ve su geçirmez bir yüzeyde biriken suyun yüksekliğiyle ölçülür ve milimetreyle yazılır. Meteoroloji raporlarında aynı değer kg/m² olarak da verilir: 1 mm yağış, her metrekareye 1 litre, yani yaklaşık 1 kilogram su düşmesi demektir.",
    "Bu eşitlik sayesinde yağış doğrudan su miktarına çevrilebilir. 1 dekarlık (1000 m²) bir tarlaya düşen 1 mm yağış 1 m³, yani yaklaşık 1 ton sudur; 30 mm yağış aynı tarlaya 30 ton su bırakır.",
  ],
  facts: [
    { label: "1 mm yağış", value: "1 kg/m² = 1 L/m²" },
    { label: "1 mm, 1 dekarda", value: "1 m³ ≈ 1 ton su" },
    { label: "1 mm, 1 hektarda", value: "10 m³ su" },
    { label: "1 inç", value: "25,4 mm" },
    { label: "1 cm", value: "10 mm = 10 kg/m²" },
  ],
  sections: [
    {
      title: "kg/m² ile mm aynı şey mi?",
      paragraphs: [
        "Evet, sayısal olarak aynıdır. 1 metrekareye düşen 1 litre su, 1 m² × 1 mm = 0,001 m³ hacim kaplar; bu da 1 mm yüksekliğe karşılık gelir. Suyun yoğunluğu litre başına yaklaşık 1 kg olduğu için aynı miktar 1 kg/m² olarak da yazılır. \"Bugün 42 kg/m² yağış düştü\" ile \"42 mm yağış düştü\" aynı bilgidir.",
        "Kar yağışında durum farklıdır: kar kalınlığı santimetreyle ölçülür ama içerdiği su, karın yoğunluğuna göre değişir. Yağış istatistiklerinde kar eritilip su yüksekliği olarak (mm) kaydedilir.",
      ],
    },
    {
      title: "Yağışın tarla ve çatıya düşen su miktarı",
      paragraphs: [
        "Su miktarı = yağış (mm) × alan (m²) litre. 120 m²'lik bir çatıya düşen 15 mm yağış 1800 litredir; yağmur suyu toplama deposu boyutlandırılırken bu hesap kullanılır. Tarlada ise dekar başına ton su ile düşünmek kolaydır: 1 mm = 1 ton/dekar.",
        "İngilizce kaynaklarda yağış çoğunlukla inçle verilir; 1 inç 25,4 mm'dir. ABD hava raporlarındaki 2 inçlik yağış yaklaşık 51 mm eder.",
      ],
    },
  ],
  unitTable: [
    { name: "Milimetre", symbol: "mm", referenceValue: "1 mm", system: "SI", commonUse: "Yağış ölçümü, iklim verileri" },
    { name: "Kilogram/metrekare", symbol: "kg/m²", referenceValue: "1 mm", system: "Meteoroloji", commonUse: "Günlük yağış raporları" },
    { name: "Litre/metrekare", symbol: "L/m²", referenceValue: "1 mm", system: "Pratik", commonUse: "Sulama, yağmur suyu hasadı" },
    { name: "İnç", symbol: "inç", referenceValue: "25,4 mm", system: "ABD", commonUse: "İngilizce hava raporları" },
    { name: "Metreküp/dekar", symbol: "m³/da", referenceValue: "1 mm", system: "Tarım", commonUse: "Tarlaya düşen su (ton/dekar)" },
    { name: "Metreküp/hektar", symbol: "m³/ha", referenceValue: "0,1 mm", system: "Tarım", commonUse: "Sulama suyu planlaması" },
  ],
};
