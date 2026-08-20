import type { UnitArticle } from "../unitArticles";

export const santimetrekupArticle: UnitArticle = {
  slug: "santimetrekup",

  introduction: [
    "Santimetreküp (cm³), metreküpün milyonda birine eşit küçük bir hacim birimidir ve sayısal olarak mililitre (mL) ile birebir aynıdır. Laboratuvar ölçümlerinden motor silindir hacmine kadar geniş bir kullanım alanına sahiptir.",

    "Türkiye'de motosiklet ve otomobil motorlarının hacmi genellikle 'cc' (santimetreküpün İngilizce kısaltması) cinsinden ifade edilir; bu nedenle santimetreküp-litre dönüşümü araç alıcıları için sık aranan bir bilgidir.",
  ],

  keyFacts: [
    {
      label: "Sembolü",
      value: "cm³ (cc)",
    },
    {
      label: "1 cm³",
      value: "1 mL",
    },
    {
      label: "1 cm³",
      value: "0,001 litre",
    },
    {
      label: "Birim sistemi",
      value: "Uluslararası Birim Sistemi (SI, alt birim)",
    },
    {
      label: "1 litre",
      value: "1000 cm³",
    },
  ],

  sections: [
    {
      title: "Santimetreküp nedir?",
      paragraphs: [
        "Santimetreküp, bir kenarı bir santimetre olan küpün hacmine eşittir ve metreküpün (m³) milyonda birine karşılık gelir. Metrik sistemin ondalık yapısı sayesinde diğer hacim birimleriyle dönüşümü son derece basittir.",

        "Santimetreküp, tanım gereği mililitre (mL) ile sayısal olarak birebir eşittir; bu nedenle günlük kullanımda iki birim genellikle birbirinin yerine geçer, özellikle sıvı ve gaz hacimlerinin ölçülmesinde.",

        "Kısaltması olan 'cc' (cubic centimeter), özellikle otomotiv sektöründe motor hacmini ifade etmek için uluslararası düzeyde en yaygın kullanılan gösterimlerden biridir.",
      ],
    },
    {
      title: "Motor hacminde santimetreküp",
      paragraphs: [
        "Bir içten yanmalı motorun silindir hacmi, pistonun aşağı ve yukarı hareketi sırasında süpürdüğü toplam hacmi ifade eder ve genellikle santimetreküp (cc) cinsinden belirtilir. Örneğin 125 cc'lik bir motosiklet motoru, 125 santimetreküp hacme sahiptir.",

        "Motor hacmi arttıkça genellikle motorun üretebileceği güç de artar, ancak yakıt tüketimi de buna paralel yükselebilir. Bu nedenle araç alırken cc değeri, motorun performans ve ekonomi dengesi hakkında önemli bir ipucu verir.",

        "Türkiye'de motosiklet ehliyet sınıfları da motor hacmine göre belirlenir (örneğin 125 cc sınırı), bu da santimetreküp biriminin günlük hayatta pratik bir önem taşımasını sağlar.",
      ],
    },
    {
      title: "Santimetreküp ve diğer hacim birimleri",
      paragraphs: [
        "1 santimetreküp tam olarak 1 mililitreye ve 0,001 litreye eşittir. Bu nedenle 1000 cm³'lük bir motor hacmi, 1 litrelik bir motor hacmiyle aynı anlama gelir — otomotiv sektöründe 'litre' ve 'cc' bu yüzden birbirine kolayca çevrilir.",

        "İngiliz ölçü sisteminde karşılığı inçküptür (in³); 1 inçküp yaklaşık 16,387 santimetreküpe eşittir. ABD kaynaklı klasik otomobillerin motor hacimleri genellikle inçküp (cubic inch) cinsinden ifade edilir.",

        "Laboratuvar ortamında santimetreküp, sıvı numunelerin, kimyasalların ve küçük katı cisimlerin hacminin ölçülmesinde mililitreyle birlikte en sık kullanılan birimdir.",
      ],
    },
  ],

  timeline: [
    {
      year: "1795",
      title: "Metrik sistemin kabulü",
      description:
        "Metrik sistemin kabulüyle birlikte santimetre ve türetilmiş santimetreküp birimi, hacim ölçümü için standart bir referans hâline geldi.",
    },
    {
      year: "20. yüzyıl başı",
      title: "Otomotiv endüstrisinde cc kullanımı",
      description:
        "İçten yanmalı motorların yaygınlaşmasıyla birlikte motor hacminin santimetreküp (cc) cinsinden ifade edilmesi uluslararası standart hâline geldi.",
    },
  ],

  questions: [
    {
      question: "1 santimetreküp kaç mililitredir?",
      answer:
        "1 santimetreküp (cm³) tam olarak 1 mililitreye (mL) eşittir. İki birim sayısal olarak birebir aynıdır.",
    },
    {
      question: "1 santimetreküp kaç litredir?",
      answer:
        "1 santimetreküp 0,001 litreye eşittir. Santimetreküpü litreye çevirmek için değer 1000'e bölünür.",
    },
    {
      question: "125 cc kaç litredir?",
      answer:
        "125 cc (santimetreküp) 0,125 litreye eşittir. Motor hacmi litre cinsinden ifade edilmek istendiğinde cc değeri 1000'e bölünür.",
    },
    {
      question: "cc ile cm³ aynı şey midir?",
      answer:
        "Evet, cc (cubic centimeter) santimetreküpün İngilizce kısaltmasıdır ve cm³ ile tamamen aynı birimi ifade eder.",
    },
  ],
};
