import type { UnitArticle } from "../unitArticles";

export const newtonMetreArticle: UnitArticle = {
  slug: "newton-metre",

  introduction: [
    "Newton-metre (N·m), torkun (döndürme momentinin) Uluslararası Birim Sistemi'ndeki türetilmiş birimidir. 1 metre uzunluğundaki bir kolun ucuna, kola dik olarak uygulanan 1 newtonluk kuvvetin oluşturduğu döndürme etkisini ifade eder.",

    "Newton-metre, motor gücünden tork anahtarlarına, cıvata sıkma değerlerinden mekanik tasarım hesaplarına kadar döndürme kuvvetinin ifade edildiği her alanda kullanılan standart birimdir.",
  ],

  keyFacts: [
    {
      label: "Sembolü",
      value: "N·m",
    },
    {
      label: "Ölçtüğü büyüklük",
      value: "Tork (döndürme momenti)",
    },
    {
      label: "Birim sistemi",
      value: "Uluslararası Birim Sistemi (SI, türetilmiş birim)",
    },
    {
      label: "1 newton-metre",
      value: "1 N × 1 m",
    },
    {
      label: "1 newton-metre",
      value: "≈ 0,737562 lb-ft",
    },
  ],

  sections: [
    {
      title: "Newton-metre nedir?",
      paragraphs: [
        "Tork, bir cismi bir eksen etrafında döndürmeye çalışan kuvvetin etkisini ölçer. Newton-metre, uygulanan kuvvet (newton) ile bu kuvvetin döndürme eksenine olan dik uzaklığının (metre) çarpımı olarak tanımlanır: τ = F × r.",

        "Newton-metre, boyutsal olarak enerji birimi joule ile aynıdır (ikisi de kg·m²/s²), ancak kavramsal olarak farklıdır: joule bir işi veya enerjiyi, newton-metre ise bir döndürme etkisini ifade eder. Bu nedenle tork için joule değil, özellikle newton-metre kullanılır.",

        "Bir tork anahtarı ile bir cıvatayı belirli bir N·m değerine sıkmak, o cıvatanın üreticinin belirlediği doğru gerilimle sabitlenmesini sağlar; bu hem güvenlik hem de mekanik performans açısından kritiktir.",
      ],
    },
    {
      title: "Newton-metre nerelerde kullanılır?",
      paragraphs: [
        "Otomotiv sektöründe motor torku, aracın düşük devirlerde ne kadar 'çekiş gücü' sunduğunu gösterir ve genellikle N·m cinsinden araç teknik veri sayfalarında listelenir. Yüksek tork, özellikle kalkışta ve yokuş tırmanışında hissedilir.",

        "Mekanik montajda tork anahtarları, cıvata ve somunların üretici tarafından belirlenen N·m değerine sıkılmasını sağlar. Yetersiz sıkma gevşemeye, aşırı sıkma ise malzeme hasarına yol açabilir.",

        "Makine mühendisliğinde şaft tasarımı, dişli sistemleri ve motor seçimi doğrudan tork hesaplarına dayanır; bir motorun gücü (watt) devir hızı ve tork değerinin çarpımıyla ilişkilidir (P = τ × ω).",
      ],
    },
    {
      title: "Newton-metre ve diğer tork birimleri",
      paragraphs: [
        "1 newton-metre yaklaşık 0,737562 pound-fit'e (lb-ft) eşittir; lb-ft özellikle Amerika Birleşik Devletleri kaynaklı araç ve mühendislik dokümanlarında yaygın kullanılan bir birimdir. Ters yönde, 1 lb-ft tam olarak 1,355818 N·m'ye eşittir.",

        "Büyük değerler için kilonewton-metre (kN·m) tercih edilir; örneğin büyük endüstriyel motorların veya rüzgâr türbinlerinin torku genellikle kN·m cinsinden ifade edilir.",

        "Kilogram-kuvvet-metre (kgf·m) de bazı eski teknik dokümanlarda karşılaşılan bir birimdir; 1 kgf·m yaklaşık 9,80665 N·m'ye eşittir ve kilogram-kuvvetin metre koluyla çarpımından türetilir.",
      ],
    },
    {
      title: "Tork ile enerji arasındaki fark",
      paragraphs: [
        "Newton-metre hem tork hem de enerji (joule) için boyutsal olarak aynı birleşimi (kg·m²/s²) kullanır, ancak bu iki büyüklük fiziksel olarak farklıdır. Enerji skaler bir büyüklüktür; tork ise yönü olan bir vektörel büyüklüktür.",

        "Bu karışıklığı önlemek için uluslararası kurallar, enerji için joule (J) sembolünün, tork için ise newton-metre (N·m) yazımının kullanılmasını önerir — ikisi asla birbirinin yerine geçmez.",

        "Pratikte bu ayrım önemlidir: bir motorun 300 N·m tork üretmesi, o motorun 300 joule enerji harcadığı anlamına gelmez; tork, dönme eksenindeki anlık kuvvet etkisini, enerji ise toplam yapılan işi ifade eder.",
      ],
    },
  ],

  timeline: [
    {
      year: "1687",
      title: "Tork kavramının kökeni",
      description:
        "Isaac Newton'ın hareket yasaları, kuvvet ve moment kavramlarının matematiksel temelini oluşturarak tork hesaplarının fiziksel dayanağını hazırladı.",
    },
    {
      year: "1948",
      title: "Newton biriminin SI'ye girişi",
      description:
        "Newton biriminin SI'de resmî kabulüyle birlikte, kuvvet ve uzunluğun çarpımı olan newton-metre de tork için standart türetilmiş birim hâline geldi.",
    },
  ],

  questions: [
    {
      question: "1 newton-metre kaç pound-fit eder?",
      answer:
        "1 newton-metre yaklaşık 0,737562 pound-fit'e (lb-ft) eşittir. Newton-metreyi pound-fit'e çevirmek için değer yaklaşık 1,355818'e bölünür.",
    },
    {
      question: "1 pound-fit kaç newton-metre eder?",
      answer:
        "1 pound-fit tam olarak 1,355818 newton-metreye eşittir. Bu değer, pound-force ve fit (foot) birimlerinin kesin SI karşılıklarının çarpımından türetilir.",
    },
    {
      question: "Newton-metre ile joule aynı birim midir?",
      answer:
        "Boyutsal olarak aynı birleşimi (kg·m²/s²) taşısalar da farklı büyüklükleri ifade ederler: joule enerjiyi, newton-metre torku gösterir. Bu nedenle sembolleri asla birbirinin yerine kullanılmaz.",
    },
    {
      question: "Motor torku neden önemlidir?",
      answer:
        "Motor torku, aracın düşük devirlerdeki çekiş gücünü belirler. Yüksek tork, özellikle kalkışta, yokuş tırmanışında ve yük taşımada daha güçlü bir performans sağlar.",
    },
  ],
};
