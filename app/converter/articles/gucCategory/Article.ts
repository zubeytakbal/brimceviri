import type { CategoryArticle } from "../../categoryArticles";

export const gucCategoryArticle: CategoryArticle = {
  slug: "guc",

  introduction: [
    "Güç, birim zamanda yapılan iş veya aktarılan enerji miktarını ifade eden türetilmiş fiziksel büyüklüktür. Motor performansından elektrik faturalarına, iklimlendirme kapasitesinden jeneratör seçimine kadar birçok alanda temel bir kavramdır.",

    "Uluslararası Birimler Sistemi'nde gücün türetilmiş birimi watttır (W); otomotiv sektöründe beygirgücü (hem metrik hem de ABD/İngiliz versiyonlarıyla), soğutma sektöründe ise soğutma tonu gibi özel birimler kullanılır.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "Güç",
    },
    {
      label: "Boyut sembolü",
      value: "[ML²T⁻³]",
    },
    {
      label: "SI türetilmiş birimi",
      value: "Watt",
    },
    {
      label: "SI birim sembolü",
      value: "W",
    },
    {
      label: "Temel formül",
      value: "P = İş / Zaman = Enerji / Zaman",
    },
  ],

  sections: [
    {
      title: "Güç nedir?",
      paragraphs: [
        "Güç, birim zamanda yapılan iş veya aktarılan enerji miktarını ifade eder ve P sembolüyle gösterilir: P = W / t (iş bölü zaman). Aynı miktarda iş, daha kısa sürede yapıldığında daha yüksek bir güç gerektirir.",
        "Güç türetilmiş bir büyüklüktür; enerji biriminin (Joule) zamana (saniye) bölünmesinden elde edilir ve SI boyutu ML²T⁻³ olarak gösterilir.",
      ],
    },
    {
      title: "Gücün SI birimi: Watt",
      paragraphs: [
        "Watt, gücün SI türetilmiş birimidir ve W sembolüyle gösterilir; buhar makinesi geliştirmeleriyle tanınan İskoç mühendis James Watt'ın onuruna adlandırılmıştır. Bir watt, saniyede 1 Joule'lük enerji aktarımına veya iş yapılmasına eşittir.",
        "Elektrik cihazlarının güç tüketimi (bir ampul, bir bilgisayar), motorların çıkış gücü ve elektrik santrallerinin üretim kapasitesi gibi çok farklı ölçeklerdeki güç değerleri watt ve onun katları (kilowatt, megawatt, gigawatt) cinsinden ifade edilir.",
      ],
    },
    {
      title: "Beygirgücü: iki farklı standart",
      paragraphs: [
        "Beygirgücü (horsepower), tarihsel olarak James Watt'ın buhar makinelerinin gücünü atların çekiş gücüyle karşılaştırmak için önerdiği bir birimdir; günümüzde otomotiv sektöründe hâlâ yaygın kullanılır ancak birbirinden farklı iki standardı vardır.",
        "Metrik beygirgücü (PS/hp, 735,49875 W) Avrupa ve Asya kaynaklı araç kataloglarında, mekanik/emperyal beygirgücü (HP, 745,7 W) ise ABD ve İngiltere kaynaklı kataloglarda kullanılır. Aradaki yaklaşık %1,4'lük fark küçük görünse de, yüksek güçlü motorlarda belirgin bir sayısal farka yol açabilir.",
      ],
    },
    {
      title: "Soğutma tonu: iklimlendirme sektörünün birimi",
      paragraphs: [
        "Soğutma tonu (ton of refrigeration, TR), bir günde 1 kısa ton (2000 pound) buzun erimesi için gereken soğutma hızına dayanan tarihi bir birimdir ve 1 TR tam olarak 3516,853 watt'a (yaklaşık 12.000 BTU/saat) eşittir.",
        "Bu birim, özellikle büyük ticari klima sistemlerinin ve chiller'ların (su soğutmalı soğutma üniteleri) kapasitesini ifade etmek için ABD kökenli ama dünya genelinde HVAC sektöründe hâlâ yaygın kullanılır.",
      ],
    },
    {
      title: "Güç ve enerji karıştırılmamalı",
      paragraphs: [
        "Güç ve enerji sıklıkla karıştırılan iki kavramdır: güç, enerjinin ne hızda aktarıldığını (watt), enerji ise toplam ne kadar iş yapıldığını (Joule veya kilovat-saat) ifade eder. Bir kilovat-saat (kWh), 1 kilowatt'lık bir gücün 1 saat boyunca kullanılmasıyla tüketilen toplam enerjidir.",
        "Bu ayrım, elektrik faturalarını anlamak için kritiktir: fatura, cihazların anlık gücüne (watt) değil, belirli bir sürede tükettikleri toplam enerjiye (kWh) göre hesaplanır.",
      ],
    },
    {
      title: "Güç nasıl ölçülür?",
      paragraphs: [
        "Elektriksel güç, bir wattmetre ile doğrudan ölçülebilir; bu cihaz gerilim ve akımı eş zamanlı ölçüp çarparak anlık gücü hesaplar. Mekanik güç ise genellikle dinamometre adı verilen test cihazlarıyla, tork ve devir sayısı ölçülerek hesaplanır.",
        "Motor test bankolarında bir motorun güç eğrisi, farklı devirlerdeki tork değerleri ölçülüp P = τ × ω formülüyle hesaplanarak elde edilir; bu eğri, motorun hangi devir aralığında en verimli çalıştığını gösterir.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Watt",
      symbol: "W",
      referenceValue: "1 W",
      system: "SI",
      commonUse: "Elektrikli cihazlar ve genel güç ölçümü",
    },
    {
      name: "Kilowatt",
      symbol: "kW",
      referenceValue: "1000 W",
      system: "SI/metrik",
      commonUse: "Motor gücü ve ev elektrik sistemleri",
    },
    {
      name: "Megawatt",
      symbol: "MW",
      referenceValue: "1.000.000 W",
      system: "SI/metrik",
      commonUse: "Elektrik santralleri ve büyük tesisler",
    },
    {
      name: "Beygirgücü (Metrik)",
      symbol: "hp",
      referenceValue: "735,49875 W",
      system: "Avrupa/Asya otomotiv",
      commonUse: "Motor gücü (PS)",
    },
    {
      name: "Beygirgücü (Mekanik)",
      symbol: "HP",
      referenceValue: "745,7 W",
      system: "ABD/İngiltere otomotiv",
      commonUse: "Motor gücü (imperyal HP)",
    },
    {
      name: "BTU/Saat",
      symbol: "BTU/h",
      referenceValue: "≈0,293071 W",
      system: "İngiliz/ABD",
      commonUse: "Klima ve ısıtma kapasitesi",
    },
    {
      name: "Soğutma Tonu",
      symbol: "TR",
      referenceValue: "3516,853 W",
      system: "HVAC (ABD kökenli)",
      commonUse: "Büyük ticari klima/chiller kapasitesi",
    },
  ],
};
