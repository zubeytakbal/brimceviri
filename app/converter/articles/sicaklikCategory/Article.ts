import type { CategoryArticle } from "../../categoryArticles";

export const sicaklikCategoryArticle: CategoryArticle = {
  slug: "sicaklik",

  introduction: [
    "Sıcaklık, bir maddenin parçacıklarının ortalama kinetik enerjisiyle ilişkili, o maddenin ne kadar 'sıcak' veya 'soğuk' olduğunu ifade eden temel bir fiziksel büyüklüktür. Uluslararası Birimler Sistemi'nde sıcaklığın temel birimi Kelvin'dir.",

    "Günlük hayatta Santigrat (Celsius) ve Fahrenheit en yaygın kullanılan ölçeklerdir; bilimsel çalışmalarda Kelvin, bazı mühendislik hesaplarında ise Rankine ve tarihi metinlerde Réaumur kullanılabilir. Sıcaklık, diğer birçok fiziksel büyüklükten farklı olarak birimler arası dönüşümde yalnızca çarpma değil, toplama/çıkarma da gerektirir.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "Sıcaklık (termodinamik sıcaklık)",
    },
    {
      label: "Boyut sembolü",
      value: "[Θ]",
    },
    {
      label: "SI temel birimi",
      value: "Kelvin",
    },
    {
      label: "SI birim sembolü",
      value: "K",
    },
    {
      label: "Mutlak sıfır",
      value: "0 K = -273,15 °C = -459,67 °F",
    },
  ],

  sections: [
    {
      title: "Sıcaklık nedir?",
      paragraphs: [
        "Sıcaklık, bir maddeyi oluşturan atom ve moleküllerin ortalama kinetik (hareket) enerjisiyle doğrudan ilişkili bir büyüklüktür. Parçacıklar ne kadar hızlı hareket ederse, madde o kadar 'sıcak' kabul edilir.",
        "Sıcaklık, Uluslararası Birimler Sistemi'nin yedi temel büyüklüğünden biridir ve termodinamik sıcaklık olarak Θ (theta) sembolüyle gösterilir. Diğer birçok büyüklüğün aksine (uzunluk, kütle gibi) doğrudan toplanabilir bir büyüklük değildir -- iki cismi birleştirmek sıcaklıklarını toplamaz, aradaki bir dengeye götürür.",
      ],
    },
    {
      title: "Sıcaklığın SI birimi: Kelvin",
      paragraphs: [
        "Kelvin, sıcaklığın SI temel birimidir ve K sembolüyle gösterilir (derece işareti kullanılmaz, sadece 'K' yazılır). Kelvin ölçeği, mutlak sıfırı (teorik olarak mümkün olan en düşük sıcaklık) başlangıç noktası (0 K) kabul eder.",
        "2019'daki SI revizyonuyla Kelvin, artık suyun üçlü noktasına değil, Boltzmann sabitinin (k) tam olarak sabitlenmiş sayısal değerine dayanarak tanımlanır. Bu, sıcaklık biriminin fiziksel bir referans maddeye değil evrensel bir sabite bağlı olmasını sağlar.",
      ],
    },
    {
      title: "Neden sıcaklık dönüşümü sadece çarpma değildir?",
      paragraphs: [
        "Uzunluk veya kütle gibi büyüklüklerde birim dönüşümü yalnızca bir çarpım faktörüyle yapılır (örneğin metre-santimetre). Sıcaklıkta ise Celsius, Fahrenheit ve Kelvin ölçekleri farklı 'sıfır noktalarına' sahip olduğu için dönüşüm hem çarpma hem toplama/çıkarma gerektirir.",
        "Örneğin Celsius'tan Fahrenheit'a geçerken önce değer 9/5 ile çarpılır, sonra 32 eklenir: °F = (°C × 9/5) + 32. Bu yüzden sıcaklık, matematiksel olarak 'afin' (doğrusal ama orijinden geçmeyen) bir dönüşüm ilişkisine sahip tek yaygın fiziksel büyüklüktür.",
      ],
    },
    {
      title: "Santigrat (Celsius) ölçeği",
      paragraphs: [
        "Santigrat ölçeği, 1742'de İsveçli astronom Anders Celsius tarafından geliştirilmiştir ve suyun donma noktasını 0°C, kaynama noktasını (1 atmosfer basınçta) 100°C olarak tanımlar. Bu, ölçeğin günlük hayatta anlaşılmasını kolaylaştıran pratik bir referans sistemidir.",
        "Santigrat, dünya genelinde bilimsel çalışmalarda ve çoğu ülkede günlük hava durumu raporlamasında en yaygın kullanılan sıcaklık ölçeğidir; ABD gibi az sayıda ülke günlük kullanımda hâlâ Fahrenheit'i tercih eder.",
      ],
    },
    {
      title: "Fahrenheit ölçeği",
      paragraphs: [
        "Fahrenheit ölçeği, 1724'te Alman fizikçi Daniel Gabriel Fahrenheit tarafından geliştirilmiştir. Bu ölçekte suyun donma noktası 32°F, kaynama noktası ise 212°F'dir -- donma ile kaynama arasında tam 180 derecelik bir aralık bulunur.",
        "Fahrenheit, günümüzde başta ABD olmak üzere az sayıda ülkede günlük sıcaklık ölçümünde kullanılmaya devam eder; bilimsel çalışmalarda dünya genelinde yerini büyük ölçüde Santigrat ve Kelvin'e bırakmıştır.",
      ],
    },
    {
      title: "Rankine ve Réaumur: daha az bilinen ölçekler",
      paragraphs: [
        "Rankine, Fahrenheit derecesi büyüklüğünde birimler kullanan ama mutlak sıfırı 0°R kabul eden bir mutlak sıcaklık ölçeğidir; suyun donma noktası 491,67°R'dir. Özellikle ABD'deki bazı termodinamik mühendislik hesaplarında Kelvin yerine tercih edilir.",
        "Réaumur ölçeği ise 18. yüzyılda Fransız bilim insanı René Réaumur tarafından geliştirilmiştir; suyun donma noktasını 0°Ré, kaynama noktasını 80°Ré kabul eder. Günümüzde neredeyse hiç kullanılmasa da, bazı Avrupa ülkelerinde (özellikle Rusya'da bazı geleneksel tariflerde) tarihi bir referans olarak karşılaşılabilir.",
      ],
    },
    {
      title: "Mutlak sıfır ne anlama gelir?",
      paragraphs: [
        "Mutlak sıfır (0 Kelvin, -273,15°C, -459,67°F), parçacıkların klasik anlamda mümkün olan en düşük kinetik enerjiye sahip olduğu teorik sıcaklıktır. Kuantum mekaniği gereği parçacıklar mutlak sıfırda bile tamamen hareketsiz kalmaz (sıfır nokta enerjisi), ama klasik anlamda daha düşük bir sıcaklık tanımlanamaz.",
        "Laboratuvar koşullarında mutlak sıfıra son derece yakın sıcaklıklara (mikrokelvin, hatta nanokelvin düzeyinde) ulaşılabilmiştir, ancak termodinamiğin üçüncü yasası gereği mutlak sıfıra sonlu sayıda adımda tam olarak ulaşmak mümkün değildir.",
      ],
    },
    {
      title: "Sıcaklık nasıl ölçülür?",
      paragraphs: [
        "Sıcaklık ölçümünde civalı/alkollü termometreler, dijital termometreler, termokupllar, direnç termometreleri (RTD) ve kızılötesi (temassız) termometreler gibi farklı teknolojiler kullanılır. Her biri farklı sıcaklık aralığı ve hassasiyet düzeyi için uygundur.",
        "Termokupllar, endüstriyel ortamlarda çok geniş bir sıcaklık aralığında (bazen -200°C'den +2000°C'ye kadar) çalışabildiği için yaygın kullanılır; iki farklı metalin birleşim noktasında oluşan gerilim farkından sıcaklığı hesaplar.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Kelvin",
      symbol: "K",
      referenceValue: "Temel birim",
      system: "SI",
      commonUse: "Bilimsel ve termodinamik hesaplamalar",
    },
    {
      name: "Santigrat (Celsius)",
      symbol: "°C",
      referenceValue: "K = °C + 273,15",
      system: "Metrik (günlük kullanım)",
      commonUse: "Hava durumu, günlük yaşam, bilim",
    },
    {
      name: "Fahrenheit",
      symbol: "°F",
      referenceValue: "°F = (°C × 9/5) + 32",
      system: "ABD",
      commonUse: "ABD'de günlük hava durumu",
    },
    {
      name: "Rankine",
      symbol: "°R",
      referenceValue: "°R = (°C + 273,15) × 9/5",
      system: "ABD (mühendislik)",
      commonUse: "Termodinamik mühendislik hesapları",
    },
    {
      name: "Réaumur",
      symbol: "°Ré",
      referenceValue: "°Ré = °C × 4/5",
      system: "Tarihi (Avrupa)",
      commonUse: "Tarihi metinler, geleneksel tarifler",
    },
  ],
};
