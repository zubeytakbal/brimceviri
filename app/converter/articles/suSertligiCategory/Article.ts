import type { CategoryArticle } from "../../categoryArticles";

// Molar kütleler: CaCO₃ 100,0869 g/mol, CaO 56,0774 g/mol. Sertlik aralıkları: Almanya Deterjan ve
// Temizlik Maddeleri Yasası (WRMG, 2007): yumuşak < 1,5 mmol/L, orta 1,5–2,5 mmol/L, sert > 2,5 mmol/L.
export const suSertligiCategoryArticle: CategoryArticle = {
  slug: "su-sertligi",
  introduction: [
    "Su sertliği, suda çözünmüş kalsiyum ve magnezyum miktarıdır. Aynı değer ülkeye göre farklı birimlerle yazılır: Türkiye ve Fransa'da Fransız sertliği (°fH), Almanya'da Alman sertliği (°dH), İngiltere'de Clark derecesi (°e), ABD'de grain/galon (gpg) kullanılır.",
    "Hepsi aynı büyüklüğü ölçer, bu yüzden aralarındaki dönüşüm sabit katsayılarla yapılır: 1 °fH, litrede 10 mg kalsiyum karbonata (CaCO₃) karşılık gelir; 1 °dH ise litrede 10 mg kalsiyum oksite (CaO) eşdeğerdir ve 1,785 °fH eder.",
  ],
  facts: [
    { label: "1 °fH", value: "10 mg/L CaCO₃ = 0,1 mmol/L" },
    { label: "1 °dH", value: "1,785 °fH = 17,85 mg/L CaCO₃" },
    { label: "1 °e (Clark)", value: "1,425 °fH = 14,25 mg/L CaCO₃" },
    { label: "1 mmol/L", value: "10,01 °fH = 5,61 °dH" },
    { label: "1 gpg (ABD)", value: "17,12 mg/L CaCO₃" },
  ],
  sections: [
    {
      title: "Fransız sertliği Alman sertliğine nasıl çevrilir?",
      paragraphs: [
        "°fH değerini °dH'ye çevirmek için 1,785'e bölün: 25 °fH = 14,0 °dH. Ters yönde °dH değerini 1,785 ile çarpın: 10 °dH = 17,85 °fH. Bu katsayı iki tanımın farkından gelir: biri CaCO₃, diğeri CaO üzerinden hesaplanır ve molar kütleleri oranı 100,09 / 56,08'dir.",
        "Su arıtma cihazlarının ayarları ve test şeritleri hangi birimi kullanıyorsa ölçümü o birime çevirmek gerekir; Avrupa menşeli cihazlarda çoğunlukla °dH, Türkiye'deki belediye su analizlerinde ise °fH görülür.",
      ],
    },
    {
      title: "Sertlik derecesi ne anlama gelir?",
      paragraphs: [
        "Almanya'nın deterjan mevzuatı suyu üç sınıfa ayırır: 1,5 mmol/L (8,4 °dH, yaklaşık 15 °fH) altı yumuşak, 1,5–2,5 mmol/L arası orta, 2,5 mmol/L (14 °dH, yaklaşık 25 °fH) üstü sert. Deterjan ve kireç önleyici dozları bu sınıflara göre verilir.",
        "Sertlik sağlık açısından bir kirlilik göstergesi değildir; daha çok kireçlenme, sabun tüketimi ve cihaz ömrüyle ilgilidir.",
      ],
    },
  ],
  unitTable: [
    { name: "Fransız sertliği", symbol: "°fH", referenceValue: "10 mg/L CaCO₃", system: "Fransa, Türkiye", commonUse: "Belediye su analizleri" },
    { name: "Alman sertliği", symbol: "°dH", referenceValue: "17,85 mg/L CaCO₃", system: "Almanya, Orta Avrupa", commonUse: "Arıtma cihazı ayarları" },
    { name: "İngiliz sertliği (Clark)", symbol: "°e", referenceValue: "14,25 mg/L CaCO₃", system: "Birleşik Krallık", commonUse: "İngiliz kaynakları" },
    { name: "Grain/galon (ABD)", symbol: "gpg", referenceValue: "17,12 mg/L CaCO₃", system: "ABD", commonUse: "ABD yumuşatıcıları" },
    { name: "mmol/L", symbol: "mmol/L", referenceValue: "100,09 mg/L CaCO₃", system: "SI", commonUse: "Laboratuvar raporları" },
    { name: "mg/L CaCO₃ (ppm)", symbol: "mg/L", referenceValue: "1 mg/L", system: "Kütle derişimi", commonUse: "Su analizleri" },
  ],
};
