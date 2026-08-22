import { basincCategoryArticle } from "./articles/basincCategory/Article";
import { kutleCategoryArticle } from "./articles/kutleCategory/Article";

export type CategoryFact = {
  label: string;
  value: string;
};

export type CategoryArticleSection = {
  title: string;
  paragraphs: string[];
};

export type CategoryUnitRow = {
  name: string;
  symbol: string;
  referenceValue: string;
  system: string;
  commonUse: string;
};

export type CategoryArticle = {
  slug: string;
  introduction: string[];
  facts: CategoryFact[];
  sections: CategoryArticleSection[];
  unitTable: CategoryUnitRow[];
};

const uzunlukCategoryArticle: CategoryArticle = {
  slug: "uzunluk",

  introduction: [
    "Uzunluk, iki nokta arasındaki mesafeyi veya bir nesnenin belirli bir doğrultudaki boyutunu ifade eden fiziksel büyüklüktür. Bilimsel ölçümlerde uzunluğun Uluslararası Birimler Sistemi içindeki temel birimi metredir.",
    "Günlük yaşamda ve bilimsel çalışmalarda ölçülen mesafenin büyüklüğüne göre nanometre, mikrometre, milimetre, santimetre, metre ve kilometre gibi farklı uzunluk birimleri kullanılır.",
    "Metrik sistem dışındaki inç, fit, yarda ve mil gibi birimler ise özellikle Amerika Birleşik Devletleri ve Birleşik Krallık ile ilişkili alanlarda kullanılmaya devam etmektedir.",
  ],

  facts: [
    {
      label: "SI temel birimi",
      value: "Metre",
    },
    {
      label: "SI birim sembolü",
      value: "m",
    },
    {
      label: "Fiziksel büyüklük",
      value: "Uzunluk",
    },
    {
      label: "Boyut sembolü",
      value: "L",
    },
    {
      label: "Güncel metre tanımı",
      value: "Işığın boşlukta 1/299.792.458 saniyede aldığı yol",
    },
  ],

  sections: [
    {
      title: "Uzunluk nedir?",
      paragraphs: [
        "Uzunluk; bir cismin boyunu, genişliğini, yüksekliğini, kalınlığını veya iki nokta arasındaki mesafeyi tanımlamak için kullanılan temel fiziksel büyüklüklerden biridir. Ölçülen doğrultuya göre aynı nesne için birden fazla uzunluk değeri bulunabilir.",
        "Fizikte uzunluk genellikle L boyut sembolüyle gösterilir. Alan, hacim, hız, ivme, basınç ve yoğunluk gibi çok sayıda türetilmiş büyüklüğün tanımlanmasında uzunluk boyutu kullanılır.",
      ],
    },
    {
      title: "Uzunluğun SI birimi",
      paragraphs: [
        "Uluslararası Birimler Sistemi'nde uzunluğun temel birimi metredir ve m sembolüyle gösterilir. Metre, diğer uzunluk birimlerinin tanımlanmasında kullanılan temel referanstır.",
        "Kilometre, santimetre, milimetre, mikrometre ve nanometre gibi metrik birimler metreye ondalık katlar ve alt katlar aracılığıyla bağlıdır. Bu yapı, metrik birimler arasındaki dönüşümlerin on sayısının kuvvetleri kullanılarak yapılmasını sağlar.",
      ],
    },
    {
      title: "Metrenin bilimsel tanımı",
      paragraphs: [
        "Metre geçmişte Dünya'nın boyutlarına ve fiziksel ölçü çubuklarına bağlı olarak tanımlanmıştır. Ölçüm teknolojisinin gelişmesiyle daha kararlı ve dünyanın her yerinde yeniden üretilebilen bir tanıma ihtiyaç duyulmuştur.",
        "Günümüzde bir metre, ışığın boşlukta 1/299.792.458 saniyelik zaman aralığında aldığı yolun uzunluğu olarak tanımlanır. Bu tanım, ışığın boşluktaki hızının tam olarak 299.792.458 metre/saniye kabul edilmesine dayanır.",
      ],
    },
    {
      title: "Metrik uzunluk birimleri",
      paragraphs: [
        "Metrik sistemde birimler, metreye 10 sayısının pozitif veya negatif kuvvetleriyle bağlanır. Bir kilometre 1000 metreye, bir santimetre 0,01 metreye ve bir ve bir milimetre 0,001 metreye eşittir.",
        "Çok küçük uzunluklarda mikrometre, nanometre ve pikometre kullanılır. Hücreler çoğunlukla mikrometre, ışığın dalga boyları nanometre ve atomik ölçekteki bazı mesafeler pikometre düzeyinde ifade edilebilir.",
      ],
    },
    {
      title: "Metrik sistem dışındaki uzunluk birimleri",
      paragraphs: [
        "İnç, fit, yarda ve kara mili metrik sistemin dışında kalan yaygın uzunluk birimleridir. Bu birimler özellikle ABD ölçü sisteminde ve bazı İngiliz ölçü geleneğine bağlı uygulamalarda kullanılır.",
        "Bir inç tam olarak 2,54 santimetreye, bir fit 12 inçe ve bir yarda 3 fite eşittir. Bir kara mili ise tam olarak 1609,344 metre olarak tanımlanmıştır.",
      ],
    },
    {
      title: "Denizcilik ve havacılıkta uzunluk",
      paragraphs: [
        "Denizcilik ve havacılıkta uzaklıklar çoğunlukla deniz miliyle ifade edilir. Bir deniz mili tam olarak 1852 metreye eşittir.",
        "Deniz mili Dünya'nın coğrafi koordinatlarıyla ilişkili tarihsel bir ölçüm yaklaşımından geliştirilmiştir. Knot adı verilen hız birimi de saatte bir deniz mili anlamına gelir.",
      ],
    },
    {
      title: "Uzunluk nasıl ölçülür?",
      paragraphs: [
        "Günlük ölçümlerde cetvel, şerit metre, kumpas ve mikrometre gibi araçlar kullanılır. Kullanılacak ölçüm aracının hassasiyeti, ölçülecek nesnenin büyüklüğüne ve gereken doğruluk seviyesine göre seçilir.",
        "Mühendislik ve bilimsel araştırmalarda lazerli mesafe ölçerler, koordinat ölçüm makineleri, interferometreler ve çeşitli optik ölçüm sistemleri kullanılabilir.",
      ],
    },
    {
      title: "Ölçüm doğruluğu ve belirsizlik",
      paragraphs: [
        "Hiçbir fiziksel ölçüm mutlak olarak kusursuz değildir. Ölçüm sonucunda kullanılan cihazın çözünürlüğü, kalibrasyonu, çevresel koşullar ve uygulanan yöntem nedeniyle belirli bir belirsizlik bulunur.",
        "Bu nedenle bilimsel sonuçlarda yalnızca ölçülen değer değil, ölçüm belirsizliği ve kullanılan birim de belirtilmelidir. Özellikle hassas mühendislik çalışmalarında sıcaklık değişimi bile bir malzemenin uzunluğunu etkileyebilir.",
      ],
    },
    {
      title: "Uzunluk birimleri nasıl dönüştürülür?",
      paragraphs: [
        "Aynı ölçü sistemi içindeki dönüşümlerde birimler arasındaki oran kullanılır. Örneğin metreyi kilometreye çevirmek için değer 1000'e bölünür; kilometreyi metreye çevirmek için değer 1000 ile çarpılır.",
        "Metrik sistem ile İngiliz veya ABD birimleri arasındaki dönüşümlerde tanımlanmış kesin dönüşüm katsayıları kullanılmalıdır. Örneğin inçten santimetreye dönüşümde değer 2,54 ile çarpılır.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Nanometre",
      symbol: "nm",
      referenceValue: "0,000000001 m",
      system: "SI/metrik",
      commonUse: "Işığın dalga boyu ve nanoteknoloji",
    },
    {
      name: "Mikrometre",
      symbol: "µm",
      referenceValue: "0,000001 m",
      system: "SI/metrik",
      commonUse: "Hücreler, parçacıklar ve hassas üretim",
    },
    {
      name: "Milimetre",
      symbol: "mm",
      referenceValue: "0,001 m",
      system: "SI/metrik",
      commonUse: "Teknik çizim ve küçük ölçüler",
    },
    {
      name: "Santimetre",
      symbol: "cm",
      referenceValue: "0,01 m",
      system: "SI/metrik",
      commonUse: "Günlük nesnelerin ölçülmesi",
    },
    {
      name: "Desimetre",
      symbol: "dm",
      referenceValue: "0,1 m",
      system: "SI/metrik",
      commonUse: "Eğitim ve bazı hacim ilişkileri",
    },
    {
      name: "Metre",
      symbol: "m",
      referenceValue: "1 m",
      system: "SI",
      commonUse: "Temel uzunluk ölçümleri",
    },
    {
      name: "Kilometre",
      symbol: "km",
      referenceValue: "1000 m",
      system: "SI/metrik",
      commonUse: "Yol ve coğrafi mesafeler",
    },
    {
      name: "İnç",
      symbol: "in",
      referenceValue: "0,0254 m",
      system: "İngiliz/ABD",
      commonUse: "Ekranlar, borular ve teknik ölçüler",
    },
    {
      name: "Fit",
      symbol: "ft",
      referenceValue: "0,3048 m",
      system: "İngiliz/ABD",
      commonUse: "Yükseklik, inşaat ve havacılık",
    },
    {
      name: "Yarda",
      symbol: "yd",
      referenceValue: "0,9144 m",
      system: "İngiliz/ABD",
      commonUse: "Spor alanları ve mesafe ölçümleri",
    },
    {
      name: "Mil",
      symbol: "mi",
      referenceValue: "1609,344 m",
      system: "İngiliz/ABD",
      commonUse: "Kara yolu mesafeleri",
    },
    {
      name: "Deniz mili",
      symbol: "nmi",
      referenceValue: "1852 m",
      system: "Denizcilik",
      commonUse: "Denizcilik ve havacılık",
    },
  ],
};

const altinAyarCategoryArticle: CategoryArticle = {
  slug: "altin-ayar",

  introduction: [
    "Altın, takı ve mücevheratta neredeyse hiçbir zaman saf hâlde kullanılmaz -- çok yumuşak ve kolay çizilen bir metal olduğu için gümüş, bakır gibi metallerle karıştırılıp bir alaşım hâline getirilir. Ayar (İngilizcede karat/karat), bu alaşımın içindeki saf altın oranını gösteren ölçüdür.",
    "Ölçek 24 üzerinden çalışır: 24 ayar tamamen saf altın demektir (%100), 22 ayar alaşımın 22/24'ünün (yaklaşık %91,6) saf altın olduğu anlamına gelir. Buradaki dönüşüm, farklı ayarlardaki altınlar arasında saf altın içeriğine göre gram karşılığını hesaplar -- yani \"aynı fiziksel büyüklüğü farklı birimle ifade etme\" değil, \"aynı alaşımın farklı saflık oranındaki karşılığını bulma\" işlemidir.",
  ],

  facts: [
    {
      label: "Ölçüm sistemi",
      value: "Kuyumculuk saflık standardı (ayar / karat)",
    },
    {
      label: "Temel referans",
      value: "24 Ayar = %100 saf altın",
    },
    {
      label: "Türkiye'de en yaygın ayar",
      value: "22 Ayar (bilezik, geleneksel takı)",
    },
    {
      label: "Uluslararası günlük kullanım",
      value: "18 Ayar (yüzük, kolye)",
    },
    {
      label: "Hesaplama mantığı",
      value: "Gram × (kaynak ayar / 24) ÷ (hedef ayar / 24)",
    },
  ],

  sections: [
    {
      title: "Ayar (karat) tam olarak neyi ölçer?",
      paragraphs: [
        "Ayar, bir altın parçasının ağırlığının ne kadarının gerçekten altın olduğunu gösterir. 24 ayar saf altındır; 22, 18 ve 14 ayar ise altının sırasıyla gümüş/bakır ile karıştırılmış, dolayısıyla daha sert ve daha az saf hâlleridir.",
        "Bu yüzden 22 ayar bir bileziğin 24 ayara göre biraz daha 'hafif' saf altın içeriğine sahip olduğunu, ama daha dayanıklı olduğunu söyleyebiliriz -- kuyumcuların bilezik için 22 ayarı, yüzük/kolye için genelde 18 ayarı tercih etmesinin sebebi budur.",
      ],
    },
    {
      title: "Saf altın içeriği nasıl hesaplanır?",
      paragraphs: [
        "10 gramlık 22 ayar bir bileziğin içindeki saf altın miktarını bulmak için: 10 × (22 / 24) = 9,17 gram saf (24 ayar eşdeğeri) altın içerir. Geri kalan yaklaşık 0,83 gram, dayanıklılık için eklenen diğer metallerdir.",
        "Tersine, bir kuyumcu bu 9,17 gram saf altını eritip 18 ayar olarak yeniden şekillendirseydi: 9,17 ÷ (18 / 24) = 12,22 gram toplam alaşım elde ederdi -- çünkü 18 ayarda saf altın oranı daha düşük olduğu için aynı miktarda saf altın, daha büyük bir toplam ağırlığa yayılır.",
      ],
    },
    {
      title: "Hangi ayar ne için kullanılır?",
      paragraphs: [
        "24 ayar yumuşaklığı nedeniyle günlük takıda neredeyse hiç kullanılmaz; daha çok külçe altın ve yatırımlık ürünlerde tercih edilir. 22 ayar Türkiye ve Orta Doğu'da bilezik ve geleneksel takının standardıdır.",
        "18 ayar, dayanıklılığı yüksek olduğu için özellikle pırlantalı yüzük ve kolye gibi günlük kullanım takılarında dünya genelinde yaygındır. 14 ayar ise daha ekonomik ve daha da dayanıklı olduğu için özellikle ABD ve Avrupa pazarında sık görülür.",
      ],
    },
  ],

  unitTable: [
    {
      name: "24 Ayar Altın",
      symbol: "24K",
      referenceValue: "%100 saf altın",
      system: "Kuyumculuk standardı",
      commonUse: "Külçe, yatırımlık altın",
    },
    {
      name: "22 Ayar Altın",
      symbol: "22K",
      referenceValue: "%91,6 saf altın (22/24)",
      system: "Kuyumculuk standardı",
      commonUse: "Bilezik, geleneksel takı",
    },
    {
      name: "18 Ayar Altın",
      symbol: "18K",
      referenceValue: "%75 saf altın (18/24)",
      system: "Kuyumculuk standardı",
      commonUse: "Yüzük, kolye, günlük takı",
    },
    {
      name: "14 Ayar Altın",
      symbol: "14K",
      referenceValue: "%58,3 saf altın (14/24)",
      system: "Kuyumculuk standardı",
      commonUse: "Ekonomik takı, ABD/Avrupa pazarı",
    },
  ],
};

export const categoryArticles: CategoryArticle[] = [
  uzunlukCategoryArticle,
  kutleCategoryArticle,
  basincCategoryArticle,
  altinAyarCategoryArticle,
];

export function findCategoryArticle(slug: string) {
  return categoryArticles.find((article) => article.slug === slug);
}
