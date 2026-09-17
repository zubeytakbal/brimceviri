import type { CategoryArticle } from "../../categoryArticles";

export const isiAkisiCategoryArticle: CategoryArticle = {
  slug: "isi-akisi",

  introduction: [
    "Isı akısı, birim yüzey alanından birim zamanda geçen ısı enerjisi miktarını ifade eden fiziksel büyüklüktür. Güneş enerjisi hesaplarından bina yalıtımına, elektronik soğutmadan endüstriyel fırın tasarımına kadar birçok alanda kullanılır.",

    "Uluslararası Birimler Sistemi'nde ısı akısının türetilmiş birimi watt/metrekaredir (W/m²); büyük değerler için kilowatt/metrekare (kW/m²), bilimsel literatürde ise bazen kalori/santimetrekare-saniye kullanılır.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "Isı akısı",
    },
    {
      label: "Boyut sembolü",
      value: "[MT⁻³]",
    },
    {
      label: "SI türetilmiş birimi",
      value: "Watt/Metrekare",
    },
    {
      label: "SI birim sembolü",
      value: "W/m²",
    },
    {
      label: "Güneş ışınım şiddeti (açık havada)",
      value: "≈1000 W/m² (deniz seviyesinde, öğle vakti)",
    },
  ],

  sections: [
    {
      title: "Isı akısı nedir?",
      paragraphs: [
        "Isı akısı, birim yüzey alanından birim zamanda geçen ısı enerjisi miktarını ifade eder ve genellikle q sembolüyle gösterilir. Bir yüzeyin ne kadar hızlı ısındığını veya ısı kaybettiğini ölçmek için kullanılır.",
        "Isı akısı, ısıl iletkenlik ile sıcaklık gradyanının çarpımından elde edilir (Fourier Yasası: q = -k × dT/dx); bu ilişki, ısı akısının hem malzemenin özelliklerine hem de sıcaklık farkının büyüklüğüne bağlı olduğunu gösterir.",
      ],
    },
    {
      title: "Isı akısının SI birimi",
      paragraphs: [
        "Watt/metrekare (W/m²), ısı akısının SI türetilmiş birimidir ve 1 metrekarelik bir yüzeyden saniyede kaç watt'lık ısı enerjisi geçtiğini ifade eder.",
        "Bu birim, güneş panellerinin verimliliğinden bina duvarlarının ısı kaybına kadar birçok enerji hesabının temelini oluşturur -- aynı toplam ısı kaybı, daha küçük bir yüzeyden geçtiğinde daha yüksek bir ısı akısı değeriyle ifade edilir.",
      ],
    },
    {
      title: "Güneş ışınımı ve ısı akısı",
      paragraphs: [
        "Dünya atmosferinin dışında güneş ışınım şiddeti (güneş sabiti) yaklaşık 1361 W/m²'dir; atmosferden geçerken bir miktar kaybolarak deniz seviyesinde açık bir günde öğle vakti yaklaşık 1000 W/m²'ye düşer.",
        "Bu değer, güneş panellerinin (fotovoltaik) ve güneş enerjili su ısıtıcılarının performans hesaplamalarında standart bir referans olarak kullanılır -- panel verimliliği genellikle bu 1000 W/m²'lik standart test koşuluna (STC) göre belirtilir.",
      ],
    },
    {
      title: "Bina yalıtımında ısı akısı",
      paragraphs: [
        "Bir binanın duvarından, çatısından veya penceresinden kaçan ısı miktarı, ısı akısı cinsinden ifade edilebilir; bu değer, iç-dış sıcaklık farkı ile yapı elemanının ısıl direncine (yalıtım kalitesine) bağlıdır.",
        "İyi yalıtılmış bir duvarın ısı akısı, yalıtımsız bir duvara göre çok daha düşüktür -- bu fark, doğrudan enerji faturalarına ve ısıtma/soğutma sisteminin gereken kapasitesine yansır.",
      ],
    },
    {
      title: "Elektronik soğutmada ısı akısı",
      paragraphs: [
        "Modern işlemciler ve güç elektroniği bileşenleri, küçük yüzey alanlarında yüksek miktarda ısı üretir; bu, çok yüksek ısı akısı değerlerine (bazen 100 W/cm²'yi aşan) yol açabilir.",
        "Bu yüksek ısı akısını güvenli sıcaklıklarda tutmak için ısı emiciler (heat sink), termal macunlar ve bazı yüksek performanslı sistemlerde sıvı soğutma çözümleri kullanılır -- yetersiz soğutma, bileşenin aşırı ısınıp arızalanmasına yol açabilir.",
      ],
    },
    {
      title: "Isı akısı nasıl ölçülür?",
      paragraphs: [
        "Isı akısı, 'ısı akısı sensörü' (heat flux sensor) adı verilen ve genellikle bir yüzeyin üzerine yerleştirilen ince plaka tipi cihazlarla doğrudan ölçülebilir; bu sensörler, plakanın iki yüzü arasındaki küçük sıcaklık farkından ısı akısını hesaplar.",
        "Bina yalıtım denetimlerinde ısı akısı ölçümü, gerçek sahadaki yalıtım performansının teorik hesaplamalarla ne kadar uyumlu olduğunu doğrulamak için kullanılır.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Watt/Metrekare",
      symbol: "W/m²",
      referenceValue: "1 W/m²",
      system: "SI",
      commonUse: "Güneş enerjisi ve yalıtım hesapları",
    },
    {
      name: "Kilowatt/Metrekare",
      symbol: "kW/m²",
      referenceValue: "1000 W/m²",
      system: "SI/metrik",
      commonUse: "Yüksek yoğunluklu ısı transferi",
    },
    {
      name: "Kalori/Santimetrekare-Saniye",
      symbol: "cal/cm²·s",
      referenceValue: "41.840 W/m²",
      system: "CGS (bilimsel)",
      commonUse: "Bilimsel literatür ve termodinamik",
    },
  ],
};
