import type { UnitArticle } from "../unitArticles";

export const kilometreArticle: UnitArticle = {
  slug: "kilometre",

  introduction: [
    "Kilometre, 1000 metreye eşit olan bir SI uzunluk birimidir ve km sembolüyle gösterilir. Günlük yaşamda özellikle kara yolu, şehirler arası uzaklık, coğrafi mesafe ve ulaşım verilerinin ifade edilmesinde kullanılır.",

    "Kilometre bağımsız bir temel birim değildir. Metreye kilo ön eki eklenerek oluşturulan ondalık bir metre katıdır. Kilo ön eki 10³, yani 1000 çarpanını ifade ettiği için bir kilometre tam olarak 1000 metredir.",
  ],

  keyFacts: [
    {
      label: "Birim adı",
      value: "Kilometre",
    },
    {
      label: "Sembolü",
      value: "km",
    },
    {
      label: "Ölçtüğü büyüklük",
      value: "Uzunluk",
    },
    {
      label: "Birim sistemi",
      value: "Uluslararası Birim Sistemi (SI)",
    },
    {
      label: "SI ön eki",
      value: "kilo (10³)",
    },
    {
      label: "Metre karşılığı",
      value: "1 km = 1000 m",
    },
    {
      label: "Mil karşılığı",
      value: "1 km ≈ 0,621371 mi",
    },
    {
      label: "Deniz mili karşılığı",
      value: "1 km ≈ 0,539957 nmi",
    },
  ],

  sections: [
    {
      title: "Kilometre nedir?",
      paragraphs: [
        "Kilometre, uzun mesafeleri metreye göre daha okunabilir sayılarla ifade etmek için kullanılan bir uzunluk birimidir. Bir yolun uzunluğu 250 000 metre yerine 250 kilometre şeklinde yazıldığında değeri okumak ve karşılaştırmak daha kolaydır.",

        "Kilometrenin sembolü km şeklindedir. Küçük k harfi kilo ön ekini, küçük m harfi ise metreyi temsil eder. Sembolün büyük harfle KM veya Km biçiminde yazılması SI kurallarına uygun değildir.",

        "Kilometre çoğunlukla yatay ve coğrafi uzaklıklarda kullanılır. Bir binanın yüksekliği veya küçük bir nesnenin boyutu için metre, santimetre veya milimetre daha uygun olabilir.",
      ],
    },
    {
      title: "Kilo ön eki ne anlama gelir?",
      paragraphs: [
        "Kilo, Uluslararası Birim Sistemi'nde 10³ çarpanını ifade eden bir ön ektir. Bir birimin önüne kilo getirildiğinde o birimin 1000 katı belirtilir. Bu nedenle bir kilometre 1000 metre, bir kilogram 1000 gram ve bir kilowatt 1000 watttır.",

        "Kilo ön ekinin sembolü küçük k harfidir. Kilometre km, kilogram kg ve kilowatt kW biçiminde yazılır. Büyük K harfi sıcaklık birimi kelvinin sembolüdür; bu nedenle büyük ve küçük harf ayrımı bilimsel yazımda önemlidir.",

        "Bilgisayar ve veri depolama alanında kilo sözcüğü geçmişte bazen 1024 anlamında kullanılmıştır. Ancak SI sisteminde kilo her zaman tam olarak 1000 anlamına gelir. İkili çarpanlar için kibi gibi ayrı ön ekler tanımlanmıştır.",
      ],
    },
    {
      title: "Kilometre neden 1000 metredir?",
      paragraphs: [
        "Metrik sistem ondalık bir yapı üzerine kuruludur. Kilo ön eki tanım gereği 1000 çarpanına eşittir. Kilometre ile metre arasındaki ilişki bir ölçüm sonucu veya yaklaşık kabul değil, kesin bir tanımdır.",

        "Kilometreden metreye dönüşüm yaparken değer 1000 ile çarpılır. Metreden kilometreye dönüşümde ise değer 1000'e bölünür. Örneğin 5 kilometre 5000 metreye, 750 metre ise 0,75 kilometreye eşittir.",

        "Bu ondalık yapı, geleneksel ölçü sistemlerindeki karmaşık oranlara göre dönüşümü kolaylaştırır. Örneğin uluslararası bir mil 1760 yarda ve bir yarda 3 fittir; kilometrede ise temel ilişki doğrudan 1000 metre şeklindedir.",
      ],
    },
    {
      title: "Kilometrenin ortaya çıkışı ve tarihçesi",
      paragraphs: [
        "Kilometre, 18. yüzyılın sonunda geliştirilen metrik sistemin ondalık birim yapısının parçası olarak ortaya çıktı. Metrik sistemin amacı farklı şehir ve ülkelerde kullanılan değişken yerel ölçüler yerine ortak, düzenli ve doğaya dayalı bir sistem oluşturmaktı.",

        "Metre sistemin temel uzunluk birimi olarak kabul edildi. Daha büyük mesafeleri göstermek için birimlere ondalık ön ekler eklendi. Kilo ön eki metrenin 1000 katını ifade ederek kilometre birimini oluşturdu.",

        "Metrik sistemin farklı ülkelerde kabul edilmesiyle kilometre kara yolu, demir yolu, haritacılık ve coğrafi mesafelerde yaygınlaştı. Günümüzde dünya ülkelerinin büyük bölümünde yol mesafeleri kilometreyle gösterilir.",

        "Bazı ülkelerde mil kullanımı devam etmektedir. Bu nedenle uluslararası seyahat, otomotiv ve harita uygulamalarında kilometre ile mil arasında dönüşüm yapılması sık karşılaşılan bir ihtiyaçtır.",
      ],
    },
    {
      title: "Kilometre nerelerde kullanılır?",
      paragraphs: [
        "Kilometrenin en yaygın kullanım alanı kara yolu mesafeleridir. Trafik işaretlerinde bir şehre, kavşağa veya hizmet alanına kalan uzaklık kilometreyle belirtilebilir. Araçların toplam kullanım mesafesi de genellikle kilometre cinsinden kaydedilir.",

        "Haritalarda şehirler, bölgeler ve coğrafi noktalar arasındaki mesafeler kilometreyle ifade edilir. Nehir uzunluğu, ülke genişliği, kıyı uzunluğu ve yol ağı gibi coğrafi verilerde kilometre uygun bir ölçektir.",

        "Spor etkinliklerinde koşu, bisiklet, yürüyüş ve motor sporları parkurları kilometreyle belirtilebilir. Beş kilometre ve on kilometre koşuları bunun yaygın örnekleridir.",

        "Bilimsel çalışmalarda atmosfer yüksekliği, jeolojik yapılar veya bölgesel ölçekli ölçümler kilometreyle ifade edilebilir. Astronomik uzaklıklarda ise kilometre kullanılabilse de astronomik birim ve ışık yılı gibi daha büyük birimler daha kullanışlı olabilir.",
      ],
    },
    {
      title: "Kilometre taşı nedir?",
      paragraphs: [
        "Kilometre taşı, bir yol üzerindeki konumu veya belirli bir başlangıç noktasına olan uzaklığı gösteren işaret sistemidir. Geleneksel olarak taş veya beton işaretler kullanılmış olsa da modern yollarda metal levhalar ve elektronik konum sistemleri de aynı işlevi görebilir.",

        "Yol kilometreleri bakım, acil müdahale, adresleme ve konum bildirme açısından önemlidir. Bir olayın belirli bir yolun kaçıncı kilometresinde gerçekleştiğinin söylenmesi, ekiplerin konumu daha hızlı bulmasına yardımcı olabilir.",

        "Kilometre başlangıcı her zaman şehir merkezi olmak zorunda değildir. Yolun resmî başlangıç noktası, kavşak, sınır veya ulaşım idaresinin belirlediği başka bir referans kullanılabilir.",
      ],
    },
    {
      title: "Araçlarda kilometre nasıl ölçülür?",
      paragraphs: [
        "Araçların katettiği toplam mesafeyi gösteren cihaza odometre denir. Geleneksel sistemlerde tekerlek veya aktarma organlarının dönüş sayısı mekanik olarak sayılır ve bilinen çevre uzunluğu üzerinden mesafe hesaplanır.",

        "Elektronik araçlarda tekerlek hız sensörleri, şanzıman verileri ve araç kontrol sistemleri mesafe hesabında kullanılabilir. Lastik çapı, lastik basıncı, aşınma ve kayma gibi etkenler gerçek yol ile hesaplanan mesafe arasında küçük farklar oluşturabilir.",

        "Navigasyon cihazları ve telefon uygulamaları GNSS konum verilerini kullanarak ardışık konumlar arasındaki mesafeyi hesaplayabilir. Uydu geometrisi, sinyal kesintisi, örnekleme sıklığı ve rota hesaplama yöntemi sonucu etkileyebilir.",

        "Araçlarda toplam mesafeyi gösteren odometrenin yanında, belirli bir yolculuk için sıfırlanabilen seyahat sayacı da bulunabilir. İki gösterge de çoğunlukla kilometre veya mil cinsinden çalışır.",
      ],
    },
    {
      title: "Haritalarda kilometre mesafesi nasıl hesaplanır?",
      paragraphs: [
        "Haritadaki iki nokta arasındaki mesafe farklı biçimlerde hesaplanabilir. Düz çizgi mesafesi, noktalar arasındaki en kısa geometrik uzaklığı gösterir. Kara yolu mesafesi ise kullanılabilir yol güzergâhını izlediği için genellikle daha uzundur.",

        "Dünya'nın yüzeyi düz olmadığı için uzun coğrafi mesafelerde küresel veya elipsoidal modellerden yararlanılır. Basit düzlem geometrisi kısa mesafelerde yeterli olabilirken kıtalar arası mesafelerde Dünya'nın eğriliği dikkate alınmalıdır.",

        "Navigasyon sistemleri yalnızca geometrik mesafeyi değil; yol ağı, dönüş kısıtlamaları, tek yönler, köprüler ve ulaşım türü gibi bilgileri de kullanır. Bu nedenle aynı iki nokta için yürüyüş, otomobil ve hava yolu mesafeleri farklı olabilir.",
      ],
    },
    {
      title: "Kilometre, mil ve deniz mili farkı",
      paragraphs: [
        "Kilometre metrik sistemde kullanılan ve tam olarak 1000 metreye eşit olan bir uzunluk birimidir. Uluslararası mil tam olarak 1609,344 metre, uluslararası deniz mili ise tam olarak 1852 metredir.",

        "Mil bazı ülkelerde kara yolu mesafelerinde kullanılır. Deniz mili ise denizcilik ve havacılıkta tercih edilir. Deniz milinin kullanımı Dünya üzerindeki açısal konum ve navigasyon uygulamalarıyla tarihsel olarak bağlantılıdır.",

        "Bir kilometre yaklaşık 0,621371 uluslararası mile ve yaklaşık 0,539957 deniz miline eşittir. Bir uluslararası mil ise yaklaşık 1,609344 kilometredir.",
      ],
    },
    {
      title: "km, km² ve km/h arasındaki fark",
      paragraphs: [
        "km uzunluk birimidir ve kilometreyi ifade eder. km² alan birimidir; bir kenarı bir kilometre olan karenin alanına karşılık gelir. Bir kilometrekare bir milyon metrekaredir.",

        "km/h hız birimidir ve bir saatte kat edilen kilometre sayısını belirtir. Örneğin 90 km/h hız, araç aynı hızla devam ederse bir saatte 90 kilometre yol alacağı anlamına gelir.",

        "Bu üç gösterim farklı fiziksel büyüklükleri ölçtüğü için birbirine doğrudan dönüştürülemez. Kilometre uzunluk, kilometrekare alan ve kilometre bölü saat hız büyüklüğüdür.",
      ],
    },
    {
      title: "Kilometre yazım kuralları",
      paragraphs: [
        "Kilometrenin birim sembolü km şeklindedir. Sembolün iki harfi de küçük yazılır. Sayısal değer ile sembol arasında boşluk bırakılır: 25 km doğru yazıma örnektir.",

        "Birim sembolü çoğul eki almaz. Bir kilometre için 1 km, elli kilometre için 50 km yazılır. km. biçiminde nokta eklemek yalnızca cümlenin noktalama işareti gerektirdiği durumda uygundur.",

        "Kilometre kare için km², kilometre küp için km³ ve kilometre bölü saat için km/h kullanılır. Bu semboller kilometreden farklı türetilmiş büyüklükleri ifade eder.",
      ],
    },
  ],

  timeline: [
    {
      year: "18. yüzyıl sonu",
      title: "Metrik sistemin geliştirilmesi",
      description:
        "Ortak ve ondalık bir ölçü sistemi oluşturulması çalışmaları sonucunda metre ve onun katları geliştirildi.",
    },
    {
      year: "19. yüzyıl",
      title: "Metrik sistemin yayılması",
      description:
        "Kilometre kara yolu, demir yolu, coğrafya ve haritacılıkta giderek daha yaygın kullanılmaya başladı.",
    },
    {
      year: "1875",
      title: "Metre Konvansiyonu",
      description:
        "Metrik ölçüm standartlarında uluslararası iş birliğinin kurumsal temeli güçlendirildi.",
    },
    {
      year: "1959",
      title: "Uluslararası milin standartlaştırılması",
      description:
        "Uluslararası mil tam olarak 1609,344 metre olarak tanımlandığı için kilometre-mil ilişkisi kesinleşti.",
    },
    {
      year: "Günümüz",
      title: "Küresel kullanım",
      description:
        "Kilometre, dünya genelinde kara yolu ve coğrafi mesafelerin temel birimlerinden biri olarak kullanılmaktadır.",
    },
  ],

  questions: [
    {
      question: "1 kilometre kaç metredir?",
      answer:
        "1 kilometre tam olarak 1000 metreye eşittir. Kilometreyi metreye çevirmek için değer 1000 ile çarpılır.",
    },
    {
      question: "1 kilometre kaç santimetredir?",
      answer:
        "1 kilometre 100 000 santimetreye eşittir. Çünkü 1 kilometre 1000 metre ve 1 metre 100 santimetredir.",
    },
    {
      question: "1 kilometre kaç mildir?",
      answer:
        "1 kilometre yaklaşık 0,621371 uluslararası mile eşittir.",
    },
    {
      question: "1 mil kaç kilometredir?",
      answer:
        "1 uluslararası mil tam olarak 1,609344 kilometreye eşittir.",
    },
    {
      question: "Kilometre neden 1000 metredir?",
      answer:
        "Kilo ön eki SI sisteminde tanım gereği 10³, yani 1000 çarpanını ifade eder. Bu nedenle 1 kilometre tam olarak 1000 metredir.",
    },
    {
      question: "Kilometrenin kısaltması nedir?",
      answer:
        "Kilometrenin uluslararası birim sembolü km şeklindedir. Her iki harf de küçük yazılır.",
    },
    {
      question: "Kilometre temel birim midir?",
      answer:
        "Hayır. SI sisteminde uzunluğun temel birimi metredir. Kilometre, metrenin kilo ön ekiyle oluşturulan 1000 katıdır.",
    },
    {
      question: "Kilometre ile kilometrekare aynı mı?",
      answer:
        "Hayır. Kilometre uzunluğu, kilometrekare ise alanı ölçer. Bir kilometrekare 1 000 000 metrekaredir.",
    },
  ],
};