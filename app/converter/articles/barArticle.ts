import type { UnitArticle } from "../unitArticles";

export const barArticle: UnitArticle = {
  slug: "bar",

  introduction: [
    "Bar, tam olarak 100 000 pascala eşit, SI dışı bir basınç birimidir ve bar sembolüyle gösterilir. Yuvarlak, kolay hesaplanabilir değeri sayesinde endüstride ve günlük mühendislik pratiğinde pascal kadar sık, bazı alanlarda ondan daha sık kullanılır.",

    "Bar, meteorolojiden hidrolik sistemlere, kompresörlerden lastik basıncı etiketlerine kadar geniş bir kullanım alanına sahiptir. SI'nın resmî birimi olmasa da SI ile birlikte kullanımı yaygın kabul görür.",
  ],

  keyFacts: [
    {
      label: "Sembolü",
      value: "bar",
    },
    {
      label: "1 bar",
      value: "100 000 Pa (tanımlı, kesin değer)",
    },
    {
      label: "1 bar",
      value: "≈ 0,986923 atm",
    },
    {
      label: "1 bar",
      value: "≈ 14,5038 psi",
    },
    {
      label: "Birim sistemi",
      value: "SI dışı, SI ile birlikte kullanımına izin verilen birim",
    },
  ],

  sections: [
    {
      title: "Bar nedir?",
      paragraphs: [
        "Bar, tam olarak 100 000 pascala eşit bir basınç birimidir. Bu yuvarlak sayısal değer, bar'ı pascal ile kolay hesaplanabilir bir ilişkide tutar: pascal cinsinden bir değeri bara çevirmek için yalnızca 100 000'e bölmek yeterlidir.",

        "Bar'ın alt katı olan milibar (mbar), tam olarak 100 Pa'a eşittir ve sayısal olarak hektopascal (hPa) ile birebir aynı değeri verir. Bu nedenle milibar ve hektopascal meteorolojide birbirinin yerine kullanılabilir.",

        "Bar, standart atmosfere (101 325 Pa) çok yakın ama ondan farklı bir değerdir. Bu yakınlık, bar'ın günlük basınç değerlerini atmosfer koşullarına yakın, sezgisel bir ölçekte ifade etmesini sağlar.",
      ],
    },
    {
      title: "Barın kökeni: William Napier Shaw ve meteorolojik basınç",
      paragraphs: [
        "Bar terimi, eski Yunanca 'baros' (ağırlık) kelimesinden türetilmiştir. Birim, 1903 yılında İngiliz meteorolog William Napier Shaw tarafından meteorolojik basınç ölçümlerinde kullanılmak üzere önerildi.",

        "Napier Shaw, aynı zamanda bar'ın binde biri olan milibar birimini de tanıttı. Milibar, 20. yüzyıl boyunca hava durumu raporlarında ve basınç haritalarında standart birim olarak yaygınlaştı.",

        "Günümüzde meteorolojide milibar yerine sayısal olarak birebir aynı olan hektopascal (hPa) tercih edilse de bar ve milibar, kökenlerini oluşturan bu meteorolojik gelenekten miras kalan isimlerdir.",
      ],
    },
    {
      title: "Endüstriyel ve hidrolik sistemlerde bar kullanımı",
      paragraphs: [
        "Avrupa başta olmak üzere pek çok ülkede kompresörler, hidrolik sistemler, pnömatik ekipmanlar ve proses hatları bar cinsinden derecelendirilir. Endüstriyel basınçlı hava sistemleri tipik olarak 6-10 bar aralığında çalışır.",

        "Otomotiv sektöründe lastik basıncı Avrupa'da yaygın olarak bar cinsinden etiketlenir; bir binek otomobil lastiği tipik olarak 2-2,5 bar ile şişirilir. Bu, aynı büyüklüğün ABD ve İngiltere geleneğinde PSI ile ifade edilmesinden farklıdır.",

        "Yüksek basınçlı su jeti kesme sistemleri, hidrolik presler ve bazı endüstriyel temizlik ekipmanları birkaç yüz bardan birkaç bin bara kadar çıkan basınçlarla çalışabilir; bu tür ekipmanların teknik veri sayfaları neredeyse her zaman bar cinsinden derecelendirme kullanır.",
      ],
    },
    {
      title: "Bar neden yuvarlak bir SI katı olduğu hâlde resmî SI birimi değildir?",
      paragraphs: [
        "Bar, tam olarak 10⁵ pascala eşit olduğu için sayısal olarak SI'nın ondalık yapısıyla uyumludur. Buna rağmen SI sistemi, basınç için resmî ön ekli birimi hektopascal, kilopascal veya megapascal olarak tanımlar; bar'ı doğrudan kabul etmez.",

        "Bunun nedeni tarihsel ve kurumsaldır: bar, SI sisteminin resmîleşmesinden önce meteorolojik ve endüstriyel pratikte kendi başına yerleşmiş bağımsız bir birimdi. BIPM (Uluslararası Ağırlıklar ve Ölçüler Bürosu), bar'ı 'SI ile birlikte kullanımına izin verilen SI dışı birimler' kategorisinde sınıflandırarak bu kullanımın sürmesine izin verir.",

        "Pratikte bu ayrım günlük kullanımı etkilemez; bar ile pascal arasında dönüşüm her zaman kesin ve basittir. Ancak resmî bilimsel yayınlarda ve SI uyumlu raporlamada genellikle pascal ve katları tercih edilir.",
      ],
    },
  ],

  timeline: [
    {
      year: "1903",
      title: "Bar ve milibar biriminin önerilmesi",
      description:
        "İngiliz meteorolog William Napier Shaw, meteorolojik basınç ölçümleri için bar ve onun binde biri olan milibar birimlerini önerdi.",
    },
  ],

  questions: [
    {
      question: "1 bar kaç Pascal'dır?",
      answer:
        "1 bar tam olarak 100 000 Pa'a eşittir. Bu, ölçüme dayalı değil, tanım gereği kesin bir değerdir.",
    },
    {
      question: "1 bar kaç atmosfer eder?",
      answer:
        "1 bar yaklaşık 0,986923 standart atmosfere eşittir. Bar, standart atmosfere çok yakın ama ondan farklı bir değerdir.",
    },
    {
      question: "1 bar kaç PSI eder?",
      answer:
        "1 bar yaklaşık 14,5038 psi'ye eşittir. Barı psi'ye çevirmek için değer yaklaşık 14,5038 ile çarpılır.",
    },
    {
      question:
        "Bar ile milibar arasındaki ilişki nedir, neden hava durumu raporlarında hPa kullanılır?",
      answer:
        "1 milibar (mbar) tam olarak 1/1000 bar'a, yani 100 Pa'a eşittir. Bu değer sayısal olarak hektopascal (hPa) ile birebir aynıdır; bu nedenle meteorolojide artık çoğunlukla SI uyumlu hPa gösterimi tercih edilir.",
    },
  ],
};
