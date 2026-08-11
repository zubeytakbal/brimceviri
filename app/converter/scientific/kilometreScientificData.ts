

import type {
  UnitScientificData,
} from "../unitScientificData";

export const kilometreScientificData: UnitScientificData = {
  slug: "kilometre",

  properties: [
    {
      label: "Fiziksel büyüklük",
      value: "Uzunluk",
    },
    {
      label: "Boyut sembolü",
      value: "[L]",
    },
    {
      label: "SI durumu",
      value: "Metrenin ondalık katı",
    },
    {
      label: "Birim sembolü",
      value: "km",
    },
    {
      label: "SI ön eki",
      value: "kilo",
    },
    {
      label: "Ön ek çarpanı",
      value: "10³",
      note: "Kilo ön eki tam olarak 1000 çarpanını belirtir.",
    },
    {
      label: "Metre karşılığı",
      value: "1 km = 1000 m",
      note: "Tanım gereği kesin değerdir.",
    },
    {
      label: "Uluslararası mil karşılığı",
      value: "1 km ≈ 0,621371192237 mi",
    },
    {
      label: "Deniz mili karşılığı",
      value: "1 km ≈ 0,539956803456 nmi",
    },
  ],

  equations: [
    {
      title: "Kilometreden metreye dönüşüm",
      equation: "Lₘ = 1000 × Lₖₘ",
      explanation:
        "Kilometre cinsinden verilen bir uzunluğu metreye çevirmek için değer 1000 ile çarpılır. Örneğin 5 km, 5000 m değerine eşittir.",
    },
    {
      title: "Metreden kilometreye dönüşüm",
      equation: "Lₖₘ = Lₘ / 1000",
      explanation:
        "Metre cinsinden verilen bir uzunluğu kilometreye çevirmek için değer 1000'e bölünür. Örneğin 750 m, 0,75 km değerine eşittir.",
    },
    {
      title: "Tekerlek dönüşünden mesafe hesabı",
      equation: "s = N × π × D",
      explanation:
        "Basitleştirilmiş bir tekerlekli araç modelinde kat edilen mesafe s; tekerleğin dönüş sayısı N ile tekerlek çapı D ve π sayısının çarpımı kullanılarak hesaplanabilir. Gerçek araçlarda lastik deformasyonu, kayma ve kalibrasyon düzeltmeleri sonucu etkileyebilir.",
    },
    {
      title: "Hız, mesafe ve zaman ilişkisi",
      equation: "v = d / t",
      explanation:
        "Ortalama hız, kat edilen mesafenin geçen zamana bölünmesiyle hesaplanır. Mesafe kilometre, zaman saat cinsinden kullanıldığında sonuç kilometre bölü saat, yani km/h olur.",
    },
    {
      title: "Büyük daire mesafesi",
      equation:
        "d = 2R × asin(√(sin²(Δφ/2) + cos φ₁ × cos φ₂ × sin²(Δλ/2)))",
      explanation:
        "Küresel Dünya yaklaşımında iki coğrafi koordinat arasındaki yüzey mesafesi Haversine bağıntısıyla yaklaşık olarak hesaplanabilir. Burada R Dünya'nın yarıçapını, φ enlemi ve λ boylamı ifade eder. Daha yüksek doğrulukta elipsoidal Dünya modelleri kullanılır.",
    },
  ],

  scientificSections: [
    {
      title: "Kilometrenin SI sistemindeki konumu",
      paragraphs: [
        "Kilometre, SI sisteminde ayrı bir temel birim değildir. Uzunluğun temel birimi metreye kilo ön ekinin eklenmesiyle oluşturulan ondalık bir kattır. Kilo ön eki 10³ çarpanına karşılık gelir.",

        "Kilometre ile metre arasındaki 1 km = 1000 m ilişkisi kesindir. Bu ilişki deneysel olarak ölçülen ve belirsizlik taşıyan bir değer değil, SI ön ekinin tanımından kaynaklanan matematiksel eşitliktir.",

        "Kilometre sembolü km biçimindedir. Küçük k kilo ön ekini, küçük m metreyi gösterir. Kelvin biriminin sembolü büyük K olduğu için Km veya KM biçimleri kilometre sembolü olarak kullanılmamalıdır.",
      ],
    },
    {
      title: "Coğrafi mesafe ve yol mesafesi farkı",
      paragraphs: [
        "İki nokta arasındaki mesafe, kullanılan tanıma göre farklı sonuçlar verebilir. Düz çizgi mesafesi noktalar arasındaki doğrudan uzaklığı, yol mesafesi ise kullanılabilir güzergâhın toplam uzunluğunu gösterir.",

        "Uzun coğrafi mesafelerde Dünya'nın eğriliği dikkate alınmalıdır. Basit düzlem geometrisi küçük bölgelerde yeterli olabilirken ülkeler veya kıtalar arasındaki mesafelerde küresel ya da elipsoidal modeller kullanılır.",

        "Navigasyon sistemleri yalnızca geometrik mesafeyi hesaplamaz. Yol ağı, tek yönler, dönüş kısıtlamaları, köprüler, tüneller ve ulaşım türü gibi verileri de değerlendirir. Bu nedenle aynı iki nokta için otomobil, yürüyüş ve hava yolu mesafeleri farklı olabilir.",
      ],
    },
    {
      title: "Odometre ve kilometre ölçümü",
      paragraphs: [
        "Odometre, bir aracın katettiği toplam mesafeyi gösteren ölçüm sistemidir. Temel yaklaşım, tekerleğin veya aktarma organlarının dönüş sayısını bilinen bir çevre uzunluğuyla ilişkilendirmektir.",

        "Tekerleğin teorik çevresi πD ilişkisiyle hesaplanabilir. Ancak gerçek lastik yük altında şekil değiştirir. Lastik basıncı, aşınma, sıcaklık, araç yükü ve yol yüzeyindeki kayma etkin yuvarlanma çevresini değiştirebilir.",

        "Elektronik araçlarda tekerlek hız sensörleri ve araç kontrol birimleri mesafe hesabında kullanılır. GNSS tabanlı sistemler ise ardışık konum ölçümlerinden mesafe çıkarabilir. Uydu sinyal kalitesi ve örnekleme sıklığı GNSS sonucunu etkileyebilir.",

        "Odometrede gösterilen kilometre değeri son derece kullanışlıdır ancak ideal matematiksel yol uzunluğunun kusursuz ölçümü olarak değerlendirilmemelidir. Gerçek sistemlerde kalibrasyon ve ölçüm toleransları bulunur.",
      ],
    },
    {
      title: "Harita ölçeği ve kilometre ilişkisi",
      paragraphs: [
        "Harita ölçeği, harita üzerindeki bir uzunluğun gerçek dünyadaki karşılığını gösterir. Örneğin 1:100 000 ölçekli bir haritada 1 santimetre, gerçek dünyada 100 000 santimetreye, yani 1 kilometreye karşılık gelir.",

        "Ölçek paydasının büyümesi, haritada daha geniş bir alanın daha az ayrıntıyla gösterilmesi anlamına gelir. Küçük ölçekli haritalar ülkeler ve kıtalar gibi geniş bölgeler için, büyük ölçekli haritalar ise şehir planları ve parseller için kullanılabilir.",

        "Harita üzerindeki mesafenin gerçek yol mesafesine dönüşmesi için yalnızca ölçek yeterli olmayabilir. Yolun kıvrımları, eğim, projeksiyon ve kullanılan güzergâh da hesaba katılmalıdır.",
      ],
    },
  ],

  prefixes: [],

  exactConversions: [],

  measurementMethods: [],
};