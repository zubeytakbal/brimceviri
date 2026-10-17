import type { CategoryArticle } from "../../categoryArticles";

// Tempo hızın tersidir: km/saat = 60 / (dk/km). 1 mil = 1,609344 km.
export const tempoCategoryArticle: CategoryArticle = {
  slug: "tempo",
  introduction: [
    "Koşucular hızı km/saat yerine tempo ile söyler: bir kilometreyi kaç dakikada koştuğu. 5:30 tempo, kilometreyi 5 dakika 30 saniyede koşmak demektir ve 10,9 km/saate karşılık gelir.",
    "Tempo hızın tersidir; tempo küçüldükçe hız artar. Bu yüzden dönüşüm çarpmayla değil bölmeyle yapılır: km/saat = 60 / tempo (dakika). Çeviricide tempo ondalık dakika olarak yazılır: 5:30 = 5,5 dk/km, 4:45 = 4,75 dk/km.",
  ],
  facts: [
    { label: "6:00 dk/km", value: "10 km/saat" },
    { label: "5:00 dk/km", value: "12 km/saat" },
    { label: "4:00 dk/km", value: "15 km/saat" },
    { label: "8:00 dk/mil", value: "4:58 dk/km = 12,07 km/saat" },
    { label: "Formül", value: "km/saat = 60 / (dk/km)" },
  ],
  sections: [
    {
      title: "Dakika:saniye temposu ondalığa nasıl çevrilir?",
      paragraphs: [
        "Saniyeyi 60'a bölüp dakikaya ekleyin: 5:15 = 5 + 15/60 = 5,25 dk/km; 4:40 = 4,667 dk/km. Ters yönde ondalık kısmı 60 ile çarpın: 5,8 dk/km = 5 dakika 48 saniye.",
        "Bir yarışın hedef süresinden tempo bulmak için süreyi mesafeye bölün: 10 km'yi 50 dakikada koşmak 5:00 tempo, yarı maratonu (21,0975 km) 2 saatte koşmak 5:41 tempo demektir.",
      ],
    },
    {
      title: "Mil temposu ve yüzme, kürek temposu",
      paragraphs: [
        "ABD'deki yarışlar ve saatler tempoyu dakika/mil olarak verebilir; dk/mil değerini 1,609344'e bölmek dk/km'yi verir: 9:00 dk/mil = 5:36 dk/km.",
        "Yüzmede tempo 100 metre için saniye, kürek ve kürek makinelerinde 500 metre için dakika olarak verilir. 1:40/100 m yüzme temposu 3,6 km/saat, 2:00/500 m kürek temposu 15 km/saat eder.",
      ],
    },
  ],
  unitTable: [
    { name: "Dakika/kilometre", symbol: "dk/km", referenceValue: "60 / (km/saat)", system: "Metrik tempo", commonUse: "Koşu saatleri, uygulamalar" },
    { name: "Dakika/mil", symbol: "dk/mil", referenceValue: "96,56 / (km/saat)", system: "ABD tempo", commonUse: "ABD yarışları" },
    { name: "Kilometre/saat", symbol: "km/saat", referenceValue: "1 km/saat", system: "Hız", commonUse: "Koşu bandı" },
    { name: "Saniye/100 metre", symbol: "sn/100 m", referenceValue: "360 / (km/saat)", system: "Yüzme temposu", commonUse: "Havuz antrenmanı" },
    { name: "Dakika/500 metre", symbol: "dk/500 m", referenceValue: "30 / (km/saat)", system: "Kürek temposu", commonUse: "Kürek makinesi" },
  ],
};
