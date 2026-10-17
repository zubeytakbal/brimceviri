import type { CategoryArticle } from "../../categoryArticles";

// % IACS: International Annealed Copper Standard (1913), tavlanmış bakır 20 °C'de 1/58 Ω·mm²/m = %100.
// Ultrasaf su 25 °C'de 18,18 MΩ·cm (ASTM D1193 Tip I: ≥ 18 MΩ·cm). Toprak tuzluluğu sınıfları: USDA Handbook 60 (ECe, dS/m).
export const elektrikIletkenligiCategoryArticle: CategoryArticle = {
  slug: "elektrik-iletkenligi",
  introduction: [
    "Elektrik iletkenliği bir maddenin akımı ne kadar kolay ilettiğini gösterir; SI birimi siemens/metre (S/m) dir. Su analizlerinde, akvaryum ve hidroponik ölçümlerinde µS/cm ve mS/cm, toprak tuzluluğunda dS/m, metallerde ise MS/m ya da bakıra göre yüzde (% IACS) kullanılır.",
    "Özdirenç iletkenliğin tersidir: iletkenlik arttıkça özdirenç azalır. Bu yüzden Ω·cm ya da MΩ·cm cinsinden verilen bir özdirenç değeri bölme işlemiyle iletkenliğe çevrilir; çevirici bu ters orantıyı kendisi uygular.",
  ],
  facts: [
    { label: "1 mS/cm", value: "1000 µS/cm = 1 dS/m = 0,1 S/m" },
    { label: "1 µS/cm", value: "1 µmho/cm = 0,1 mS/m" },
    { label: "18,2 MΩ·cm (ultrasaf su)", value: "0,055 µS/cm" },
    { label: "%100 IACS (bakır)", value: "58 MS/m = 0,017241 Ω·mm²/m" },
    { label: "1 Ω·m özdirenç", value: "1 S/m = 10 000 µS/cm" },
  ],
  sections: [
    {
      title: "µS/cm, mS/cm ve dS/m arasında nasıl çevrilir?",
      paragraphs: [
        "Üç birim arasında yalnızca binlik katlar vardır: 1 mS/cm = 1000 µS/cm ve 1 dS/m = 1 mS/cm. Örneğin 450 µS/cm iletkenlikteki bir musluk suyu 0,45 mS/cm, 2,5 mS/cm ölçülen bir besin çözeltisi 2500 µS/cm eder. Eski cihazlarda görülen mho, siemens ile aynı birimdir (1 µmho/cm = 1 µS/cm).",
        "Hidroponik ve sulama kılavuzlarında EC değeri çoğunlukla mS/cm ya da dS/m ile verilir; ikisi sayısal olarak aynıdır. Toprak tuzluluğu sınıflandırmasında (USDA) 2 dS/m'nin altı tuzsuz, 4 dS/m ve üstü tuzlu kabul edilir.",
      ],
    },
    {
      title: "İletkenlikten TDS (ppm) hesaplanır mı?",
      paragraphs: [
        "TDS cihazları aslında iletkenliği ölçer ve sonucu bir katsayıyla çarparak ppm gösterir. Katsayı suyun içindeki tuzlara göre 0,5 ile 0,7 arasında seçilir ve cihazdan cihaza değişir, bu yüzden µS/cm ile ppm arasında birim dönüşümü gibi sabit bir oran yoktur. Hangi katsayının kullanıldığı cihazın kılavuzunda yazar.",
      ],
    },
    {
      title: "Metallerde % IACS ne demek?",
      paragraphs: [
        "1913'te kabul edilen uluslararası tavlanmış bakır standardında (IACS), 20 °C'deki tavlanmış bakırın iletkenliği %100 kabul edilir ve 58 MS/m'ye karşılık gelir. Alüminyum yaklaşık %61, saf gümüş yaklaşık %108 IACS'dir. Kablo hesaplarında kullanılan özdirenç Ω·mm²/m birimiyle yazılır: bakır için 1/58 = 0,01724 Ω·mm²/m.",
      ],
    },
  ],
  unitTable: [
    { name: "Siemens/metre", symbol: "S/m", referenceValue: "1 S/m", system: "SI", commonUse: "Bilimsel tablolar, deniz suyu (≈ 5 S/m)" },
    { name: "Mikrosiemens/santimetre", symbol: "µS/cm", referenceValue: "10⁻⁴ S/m", system: "Pratik", commonUse: "İçme suyu, akvaryum, saf su" },
    { name: "Milisiemens/santimetre", symbol: "mS/cm", referenceValue: "0,1 S/m", system: "Pratik", commonUse: "Hidroponik, besin çözeltisi" },
    { name: "Desisiemens/metre", symbol: "dS/m", referenceValue: "0,1 S/m", system: "SI", commonUse: "Toprak ve sulama suyu tuzluluğu" },
    { name: "% IACS", symbol: "% IACS", referenceValue: "580 000 S/m", system: "Bakır standardı", commonUse: "Metal ve alaşım iletkenliği" },
    { name: "Megaohm·santimetre", symbol: "MΩ·cm", referenceValue: "10⁻⁴ / değer S/m", system: "Özdirenç", commonUse: "Ultrasaf ve laboratuvar suyu" },
    { name: "Ohm·mm²/metre", symbol: "Ω·mm²/m", referenceValue: "10⁶ / değer S/m", system: "Özdirenç", commonUse: "Kablo ve iletken hesapları" },
  ],
};
