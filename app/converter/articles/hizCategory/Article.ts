import type { CategoryArticle } from "../../categoryArticles";

export const hizCategoryArticle: CategoryArticle = {
  slug: "hiz",

  introduction: [
    "Hız, bir cismin birim zamanda aldığı yolu ifade eden türetilmiş bir fiziksel büyüklüktür. Uzunluğun zamana bölünmesiyle elde edildiği için hızın boyutu L/T (uzunluk bölü zaman) şeklindedir.",

    "Günlük hayatta kilometre/saat (km/h) ve mil/saat (mph) en yaygın kullanılan hız birimleridir; bilimsel çalışmalarda metre/saniye (m/s), denizcilik ve havacılıkta ise knot tercih edilir. Işık hızı ise evrende ulaşılabilecek mutlak bir üst sınır olarak hız birimleri arasında özel bir yere sahiptir.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "Hız (sürat)",
    },
    {
      label: "Boyut sembolü",
      value: "[L/T]",
    },
    {
      label: "SI türetilmiş birimi",
      value: "Metre/Saniye",
    },
    {
      label: "SI birim sembolü",
      value: "m/s",
    },
    {
      label: "Evrensel hız sınırı",
      value: "Işık hızı ≈ 299.792.458 m/s",
    },
  ],

  sections: [
    {
      title: "Hız nedir?",
      paragraphs: [
        "Hız, bir cismin birim zamanda kat ettiği yolu ifade eder ve Hız = Mesafe / Zaman formülüyle hesaplanır. Fizikte teknik olarak 'sürat' (skaler, yönsüz) ile 'hız' (vektörel, yönlü) ayrımı yapılsa da günlük dilde ikisi genellikle birbirinin yerine kullanılır.",
        "Hız türetilmiş bir büyüklüktür; uzunluk biriminin zaman birimine bölünmesinden elde edilir. Bu yüzden SI boyutu L/T (veya L¹T⁻¹) olarak gösterilir.",
      ],
    },
    {
      title: "Hızın SI birimi: metre/saniye",
      paragraphs: [
        "Uluslararası Birimler Sistemi'nde hızın türetilmiş birimi metre/saniyedir (m/s) ve bir cismin her saniyede bir metre yol aldığını ifade eder. Bilimsel hesaplamalarda ve fizik formüllerinde standart olarak bu birim kullanılır.",
        "Günlük hayatta ise metre/saniye yerine kilometre/saat (km/h) tercih edilir, çünkü araç hızları ve yol mesafeleri bu ölçekte daha sezgisel sayılarla ifade edilir. 1 m/s tam olarak 3,6 km/h'ye eşittir.",
      ],
    },
    {
      title: "Kilometre/saat ve mil/saat",
      paragraphs: [
        "Kilometre/saat (km/h), metrik sistemi kullanan ülkelerde (Türkiye dahil) yol trafiğinde standart hız birimidir. Mil/saat (mph) ise ABD ve İngiltere gibi İngiliz ölçü sistemini kullanan ülkelerde tercih edilir.",
        "1 mph yaklaşık 1,60934 km/h'ye eşittir. Bu fark, yurt dışından ithal edilen araçların hız göstergelerinin veya yabancı ülkelerde araç kiralarken hız limitlerinin yanlış yorumlanmasına yol açabilecek pratik bir karışıklık kaynağıdır.",
      ],
    },
    {
      title: "Knot: denizcilik ve havacılıkta hız",
      paragraphs: [
        "Knot (deniz mili/saat), denizcilik ve havacılıkta kullanılan standart hız birimidir; 1 knot tam olarak 1 deniz miline (1852 metre) saatte alınan yol anlamına gelir.",
        "Knot biriminin adı, tarihsel olarak gemilerin hızını ölçmek için suya atılan ve düğümlerle (knot) işaretlenmiş bir ipin belirli bir sürede kaç düğümün geçtiğinin sayılmasından gelir. Bu yöntem, modern hız ölçüm cihazlarından önce yüzyıllarca kullanılmıştır.",
      ],
    },
    {
      title: "Işık hızı: evrenin hız sınırı",
      paragraphs: [
        "Işık hızı, boşlukta tam olarak 299.792.458 m/s olarak tanımlanmıştır ve Einstein'ın özel görelilik kuramına göre evrende bilgi veya kütleli bir cismin ulaşabileceği mutlak üst sınırdır.",
        "Işık hızının tam sayı olarak tanımlanmış olması (2019 SI revizyonundan önce de sabit kabul edilmesi), metrenin güncel tanımının da bu sabite dayanmasını sağlar -- metre, ışığın 1/299.792.458 saniyede aldığı yol olarak tanımlanır.",
      ],
    },
    {
      title: "Mach sayısı: ses hızına göre oran",
      paragraphs: [
        "Havacılıkta yüksek hızlar genellikle Mach sayısıyla ifade edilir; bu, bir cismin hızının o ortamdaki ses hızına oranıdır (Mach 1 = ses hızı). Ses hızı sabit bir değer değildir, havanın sıcaklığı ve yoğunluğuna göre değişir (deniz seviyesinde yaklaşık 343 m/s / 1235 km/h).",
        "Bu yüzden aynı Mach sayısı, farklı irtifa ve sıcaklıklarda farklı gerçek hızlara (km/h veya m/s) karşılık gelebilir -- bir uçağın Mach 0,85 hızı, yükseklikle birlikte gerçek hız değeri açısından değişkenlik gösterir.",
      ],
    },
    {
      title: "Ortalama hız ve anlık hız farkı",
      paragraphs: [
        "Ortalama hız, toplam kat edilen mesafenin toplam geçen zamana bölünmesiyle bulunur ve bir yolculuğun bütünü için tek bir değer verir. Anlık hız ise bir cismin belirli bir andaki hızıdır ve sürekli değişebilir (hızlanma, yavaşlama, duruş gibi).",
        "Bir araç hız göstergesi anlık hızı gösterirken, bir yolculuğun ortalama hızı genellikle toplam mesafe ile toplam süre kullanılarak sonradan hesaplanır -- bu iki değer, yolculuk sırasında hız sabit kalmadığı sürece birbirinden farklıdır.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Santimetre/Saniye",
      symbol: "cm/s",
      referenceValue: "0,01 m/s",
      system: "SI/metrik",
      commonUse: "Laboratuvar ve yavaş hareket ölçümü",
    },
    {
      name: "Metre/Dakika",
      symbol: "m/min",
      referenceValue: "≈0,0167 m/s",
      system: "SI/metrik",
      commonUse: "Endüstriyel bant hızı",
    },
    {
      name: "Metre/Saniye",
      symbol: "m/s",
      referenceValue: "1 m/s",
      system: "SI",
      commonUse: "Bilimsel ve fiziksel hesaplamalar",
    },
    {
      name: "Kilometre/Saat",
      symbol: "km/h",
      referenceValue: "≈0,278 m/s",
      system: "Metrik",
      commonUse: "Araç hızı ve trafik limitleri",
    },
    {
      name: "Mil/Saat",
      symbol: "mph",
      referenceValue: "≈0,447 m/s",
      system: "İngiliz/ABD",
      commonUse: "ABD ve İngiltere'de araç hızı",
    },
    {
      name: "Knot",
      symbol: "knot",
      referenceValue: "≈0,514 m/s",
      system: "Denizcilik/Havacılık",
      commonUse: "Gemi ve uçak hızı",
    },
    {
      name: "Kilometre/Dakika",
      symbol: "km/min",
      referenceValue: "≈16,67 m/s",
      system: "Metrik",
      commonUse: "Kısa mesafe hız hesapları",
    },
    {
      name: "Kilometre/Saniye",
      symbol: "km/s",
      referenceValue: "1000 m/s",
      system: "Metrik",
      commonUse: "Uzay aracı ve gök cismi hızları",
    },
    {
      name: "Işık Hızı",
      symbol: "c",
      referenceValue: "299.792.458 m/s",
      system: "Evrensel sabit",
      commonUse: "Fizik ve astronomi hesapları",
    },
  ],
};
