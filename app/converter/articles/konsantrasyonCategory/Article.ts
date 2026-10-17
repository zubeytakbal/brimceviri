import type { CategoryArticle } from "../../categoryArticles";

// Oranlar tanım gereği kesindir (1 ppm = 10⁻⁶). Atmosfer ve deniz suyu değerleri: NOAA (2024 küresel ortalama CO₂),
// UNESCO/IOC TEOS-10 (standart deniz suyu tuzluluğu ≈ 35 g/kg).
export const konsantrasyonCategoryArticle: CategoryArticle = {
  slug: "konsantrasyon",

  introduction: [
    "Konsantrasyon (derişim), bir karışımın içindeki maddenin ne kadarlık pay tuttuğunu gösterir. Bu sayfadaki birimler kütle oranıdır: yüzde (%) yüzde bir, binde (‰) binde bir, ppm milyonda bir, ppb milyarda bir, ppt trilyonda bir pay demektir.",
    "Oranlar boyutsuz olduğu için aralarındaki dönüşüm kesindir: %1 = 10.000 ppm, 1 ppm = 1.000 ppb. Kütle oranı mg/kg ve µg/kg olarak da yazılır; 1 mg/kg tam olarak 1 ppm, 1 µg/kg tam olarak 1 ppb'dir.",
  ],

  facts: [
    { label: "Taban", value: "Boyutsuz oran (1 = %100)" },
    { label: "1 ppm", value: "10⁻⁶ = 0,0001 % = 1 mg/kg" },
    { label: "1 ppb", value: "10⁻⁹ = 0,001 ppm = 1 µg/kg" },
    { label: "Deniz suyu tuzluluğu", value: "≈ 35 g/kg = 35 ‰ = 35.000 ppm" },
    { label: "Atmosferdeki CO₂ (2024)", value: "≈ 422 ppm (hacimce)" },
  ],

  sections: [
    {
      title: "ppm ile mg/L aynı şey mi?",
      paragraphs: [
        "Tam olarak değil. ppm bir oran, mg/L ise litre başına kütledir. Seyreltik sulu çözeltilerde 1 litre su yaklaşık 1 kilogram geldiği için 1 mg/L yaklaşık 1 ppm olur; su analizi raporlarında bu yüzden ikisi çoğu zaman aynı anlamda kullanılır.",
        "Yoğunluğu sudan çok farklı olan sıvılarda (örneğin deniz suyu, şurup ya da yağ) bu yaklaşım kayar: mg/L'yi ppm'e çevirmek için değeri sıvının yoğunluğuna (kg/L) bölmek gerekir.",
      ],
    },
    {
      title: "Gazlarda ppm: hacimce oran",
      paragraphs: [
        "Hava kalitesi ve atmosfer ölçümlerinde ppm genellikle hacimce orandır (ppmv): bir milyon hacimlik havanın içindeki gaz hacmi. NOAA'nın küresel ölçümlerine göre 2024 yılında atmosferdeki karbondioksit ortalaması yaklaşık 422 ppm'dir; yani havanın %0,0422'si.",
        "Hacimce ppm ile kütlece ppm aynı sayı değildir; ikisi arasında geçiş için gazın molar kütlesi gerekir. Bu sayfadaki dönüşümler aynı türden oranlar (kütle ile kütle ya da hacim ile hacim) arasında geçerlidir.",
      ],
    },
    {
      title: "Yüzde, binde ve ppm nasıl çevrilir?",
      paragraphs: [
        "Yüzdeden ppm'e geçmek için 10.000 ile çarpılır: %0,5 = 5.000 ppm. ppm'den ppb'ye geçmek için 1.000 ile çarpılır: 0,02 ppm = 20 ppb. Binde (‰) değerini yüzdeye çevirmek için 10'a bölmek yeterlidir: 35 ‰ = %3,5.",
        "Tuzluluk, alkol ve alaşım oranları için yüzde ve binde; içme suyu, toprak ve gıda analizlerinde ppm ve ppb; çevre kirliliği ölçümlerinde ise çok küçük değerler için ppt kullanılır.",
      ],
    },
  ],

  unitTable: [
    { name: "Yüzde", symbol: "%", referenceValue: "10.000 ppm", system: "Boyutsuz oran", commonUse: "Alaşım, alkol, çözelti oranı" },
    { name: "Binde (promil)", symbol: "‰", referenceValue: "1.000 ppm", system: "Boyutsuz oran", commonUse: "Deniz suyu tuzluluğu" },
    { name: "ppm (milyonda bir)", symbol: "ppm", referenceValue: "10⁻⁶", system: "Boyutsuz oran", commonUse: "Su ve toprak analizi, gaz ölçümü" },
    { name: "ppb (milyarda bir)", symbol: "ppb", referenceValue: "0,001 ppm", system: "Boyutsuz oran", commonUse: "İz element ve kirletici ölçümü" },
    { name: "ppt (trilyonda bir)", symbol: "ppt", referenceValue: "0,001 ppb", system: "Boyutsuz oran", commonUse: "Çevre analizinde çok düşük değerler" },
    { name: "Miligram/kilogram", symbol: "mg/kg", referenceValue: "1 ppm", system: "Kütle oranı", commonUse: "Gıda ve toprak analizi" },
  ],
};
