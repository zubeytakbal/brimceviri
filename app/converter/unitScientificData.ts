import {
  kilometreScientificData,
} from "./scientific/kilometreScientificData";
import {
  pascalScientificData,
} from "./scientific/pascalScientificData";
import {
  atmosferScientificData,
} from "./scientific/atmosferScientificData";

export type ScientificProperty = {
  label: string;
  value: string;
  note?: string;
};

export type ScientificEquation = {
  title: string;
  equation: string;
  explanation: string;
};

export type PrefixValue = {
  name: string;
  symbol: string;
  power: string;
  metreValue: string;
  commonUse: string;
};

export type ExactConversion = {
  unit: string;
  symbol: string;
  metreValue: string;
  status: "Kesin" | "Yaklaşık";
  note: string;
};

export type MeasurementMethod = {
  title: string;
  description: string;
  typicalUse: string;
};

export type ScientificArticleSection = {
  title: string;
  paragraphs: string[];
};

export type UnitScientificData = {
  slug: string;
  properties: ScientificProperty[];
  equations: ScientificEquation[];
  scientificSections: ScientificArticleSection[];
  prefixes: PrefixValue[];
  exactConversions: ExactConversion[];
  measurementMethods: MeasurementMethod[];
};

export const unitScientificData: UnitScientificData[] = [
  {
    slug: "metre",

    properties: [
      {
        label: "Fiziksel büyüklük",
        value: "Uzunluk",
      },
      {
        label: "Boyut sembolü",
        value: "[L]",
        note: "Uzunluğun fiziksel boyut gösterimi",
      },
      {
        label: "SI durumu",
        value: "Temel birim",
      },
      {
        label: "Birim adı",
        value: "metre",
      },
      {
        label: "Birim sembolü",
        value: "m",
      },
      {
        label: "Tanımı belirleyen sabit",
        value: "Işığın boşluktaki hızı, c",
      },
      {
        label: "Işık hızının sabit değeri",
        value: "299 792 458 m·s⁻¹",
        note: "SI sisteminde kesin olarak sabitlenmiştir",
      },
      {
        label: "Bağlı olduğu zaman birimi",
        value: "saniye (s)",
      },
      {
        label: "Ölçüm bilimi alanı",
        value: "Boyutsal metroloji",
      },
    ],

    equations: [
      {
        title: "Işığın boşluktaki hızı",
        equation: "c = 299 792 458 m·s⁻¹",
        explanation:
          "Işığın boşluktaki hızının sayısal değeri SI sisteminde kesin olarak sabitlenmiştir. Bu nedenle c değeri ölçüm sonucu değişebilecek yaklaşık bir sayı değil, metre tanımının temelini oluşturan tanımsal sabittir.",
      },
      {
        title: "Metrenin güncel tanımı",
        equation:
          "1 m = ışığın boşlukta 1 / 299 792 458 saniyede aldığı yol",
        explanation:
          "Metre, ışığın boşlukta saniyenin 1/299 792 458'i kadar sürede aldığı yolun uzunluğudur.",
      },
      {
        title: "Sezyum-133 frekansı",
        equation: "ΔνCs = 9 192 631 770 Hz",
        explanation:
          "Saniye, sezyum-133 atomunun temel durumundaki hiperince geçiş frekansının sabit sayısal değeri üzerinden tanımlanır. Metre saniyeye bağlı olduğu için atomik zaman ölçümü uzunluk standardının gerçekleştirilmesinde temel rol oynar.",
      },
      {
        title: "Dalga boyu, frekans ve ışık hızı",
        equation: "λ = c / f",
        explanation:
          "Boşluktaki bir elektromanyetik dalganın dalga boyu, ışık hızının frekansa bölünmesiyle hesaplanır. Frekansı bilinen kararlı lazerler, hassas uzunluk ölçümlerinde bu ilişkiden yararlanır.",
      },
      {
        title: "İnterferometrik uzunluk ilişkisi",
        equation: "L = N·λ / 2",
        explanation:
          "Basitleştirilmiş bir interferometre düzeninde uzunluk değişimi, sayılan girişim saçaklarının sayısı N ve kullanılan ışığın dalga boyu λ ile ilişkilendirilebilir. Gerçek ölçümlerde kırılma indisi, sıcaklık ve cihaz geometrisi gibi düzeltmeler de dikkate alınır.",
      },
    ],

    scientificSections: [
      {
        title: "Metre neden bir SI temel birimidir?",
        paragraphs: [
          "Uluslararası Birim Sistemi yedi temel birim üzerine kuruludur. Metre bu sistemde uzunluk büyüklüğünün temel birimidir. Alanın birimi metrekare, hacmin birimi metreküp ve hızın birimi metre bölü saniye gibi birçok türetilmiş birim metre kullanılarak oluşturulur.",

          "Metrenin temel birim olması, başka hiçbir fiziksel büyüklükle ilişkili olmadığı anlamına gelmez. Güncel SI tanımında metre, saniye ve ışığın boşluktaki sabit hızıyla bağlantılıdır. Temel birim ifadesi, SI büyüklük sistemindeki rolünü belirtir.",
        ],
      },
      {
        title: "Modern metre tanımının fiziksel anlamı",
        paragraphs: [
          "Modern SI sisteminde doğa sabitlerinin sayısal değerleri kesin olarak belirlenmiştir. Işığın boşluktaki hızı tam olarak saniyede 299 792 458 metre kabul edilir. Böylece metre, sabit bir metal çubuğun uzunluğuna değil, evrensel bir fiziksel sabite bağlanır.",

          "Bu yaklaşımın önemli avantajı, uzunluk standardının tek bir fiziksel nesneye bağımlı olmamasıdır. Uygun atomik zaman, lazer frekansı ve interferometri sistemlerine sahip metroloji laboratuvarları metreyi bağımsız olarak gerçekleştirebilir.",

          "Tanımın kendisi kesindir; ancak gerçek bir uzunluğun ölçülmesi her zaman belirli bir ölçüm belirsizliği taşır. Cihaz çözünürlüğü, sıcaklık, basınç, nem, malzemenin genleşmesi, hizalama ve optik ortam gibi etkenler ölçüm sonucunu etkileyebilir.",
        ],
      },
      {
        title: "Metre laboratuvarda nasıl gerçekleştirilir?",
        paragraphs: [
          "Bir birimin tanımlanması ile laboratuvarda gerçekleştirilmesi aynı işlem değildir. Tanım, birimin ne olduğunu belirtir. Gerçekleştirme ise bu tanımı kullanarak izlenebilir bir ölçüm standardı üretme sürecidir.",

          "Hassas uzunluk ölçümlerinde frekansı kararlı ve izlenebilir lazerlerden yararlanılır. Lazer ışığının frekansı bilindiğinde boşluktaki dalga boyu c/f ilişkisiyle belirlenebilir. İnterferometreler, iki ışık demeti arasındaki faz farkını kullanarak çok küçük yer değiştirmeleri ölçebilir.",

          "Hava içinde yapılan ölçümlerde ışığın hızı boşluktakinden farklıdır. Bu nedenle havanın kırılma indisi; sıcaklık, basınç, nem ve karbondioksit oranı gibi çevresel değerler kullanılarak hesaplanır. Yüksek doğruluk gereken durumlarda ölçüm vakum altında gerçekleştirilebilir.",

          "Endüstride kullanılan mastarlar, ölçüm blokları ve hassas cetveller ulusal metroloji enstitülerine uzanan bir kalibrasyon zinciriyle izlenebilir hâle getirilir. Bu zincire metrolojik izlenebilirlik adı verilir.",
        ],
      },
      {
        title: "Ölçüm belirsizliği neden önemlidir?",
        paragraphs: [
          "Bir ölçüm sonucu yalnızca sayısal değerden oluşmaz. Sonucun hangi aralıkta güvenilir olduğunu belirten ölçüm belirsizliği de değerlendirilmelidir. Örneğin 1,000000 m olarak verilen iki ölçüm, kullanılan cihazlara ve çevresel koşullara bağlı olarak farklı belirsizliklere sahip olabilir.",

          "Metrenin SI tanımı kesin olsa da cetvel, lazer sistemi, kumpas veya koordinat ölçüm makinesiyle yapılan gerçek ölçüm kesin değildir. Cihazın kalibrasyonu, çözünürlüğü, tekrarlanabilirliği ve ortam koşulları belirsizlik bütçesine katkıda bulunur.",

          "Bilimsel ve endüstriyel ölçümlerde sonuçların karşılaştırılabilmesi için ölçüm yönteminin, çevresel koşulların ve belirsizliğin raporlanması önemlidir.",
        ],
      },
      {
        title: "Sıcaklığın uzunluk ölçümüne etkisi",
        paragraphs: [
          "Katı maddelerin boyutları sıcaklık değiştiğinde değişir. Bu olaya termal genleşme denir. Hassas bir metal parçanın uzunluğu farklı sıcaklıklarda ölçüldüğünde aynı sonuç elde edilmeyebilir.",

          "Boyutsal metrolojide birçok endüstriyel uzunluk değeri 20 °C referans sıcaklığına göre belirtilir. Ölçüm farklı bir sıcaklıkta yapılıyorsa malzemenin doğrusal genleşme katsayısı kullanılarak düzeltme gerekebilir.",

          "Basitleştirilmiş doğrusal genleşme ilişkisi ΔL = α·L₀·ΔT biçimindedir. Burada α doğrusal genleşme katsayısını, L₀ başlangıç uzunluğunu ve ΔT sıcaklık değişimini ifade eder.",
        ],
      },
      {
        title: "Kesin ve yaklaşık dönüşüm arasındaki fark",
        paragraphs: [
          "Bazı birimler metreye tanım gereği tam bir değerle bağlıdır. Örneğin uluslararası inç tam olarak 0,0254 metre ve uluslararası fit tam olarak 0,3048 metredir. Bu değerler yaklaşık ölçüm sonuçları değil, kesin tanımlardır.",

          "Yaklaşık dönüşümlerde ise sonuç belirli sayıda anlamlı basamakla verilir. Yuvarlama yapılan hesaplamalarda çok büyük değerler veya art arda yapılan dönüşümler küçük sayısal farklar oluşturabilir.",

          "BirimCeviri.app hesaplama sonuçlarında gereksiz sıfırları kaldırırken yeterli sayıda anlamlı basamağı korumayı amaçlar. Mühendislik çalışmalarında kullanılacak basamak sayısı, başlangıç verisinin doğruluğuna göre seçilmelidir.",
        ],
      },
      {
        title: "Metre, alan ve hacim ilişkisi",
        paragraphs: [
          "Metre uzunluk birimidir. Metrekare alan, metreküp ise hacim birimidir. Bu büyüklükler birbirine bağlı olsa da aynı dönüşüm katsayılarıyla çevrilemez.",

          "Bir metre 100 santimetre olduğu hâlde bir metrekare 10 000 santimetrekaredir. Çünkü alan dönüşümünde doğrusal katsayının karesi alınır: 1 m² = (100 cm)² = 10 000 cm².",

          "Benzer şekilde bir metreküp 1 000 000 santimetreküptür. Hacim dönüşümünde doğrusal katsayının küpü kullanılır: 1 m³ = (100 cm)³ = 1 000 000 cm³.",
        ],
      },
    ],

    prefixes: [
      {
        name: "nanometre",
        symbol: "nm",
        power: "10⁻⁹ m",
        metreValue: "0,000000001 m",
        commonUse: "Işık dalga boyları, nanoteknoloji",
      },
      {
        name: "mikrometre",
        symbol: "µm",
        power: "10⁻⁶ m",
        metreValue: "0,000001 m",
        commonUse: "Mikroskobik yapılar, üretim toleransları",
      },
      {
        name: "milimetre",
        symbol: "mm",
        power: "10⁻³ m",
        metreValue: "0,001 m",
        commonUse: "Teknik çizim ve hassas üretim",
      },
      {
        name: "santimetre",
        symbol: "cm",
        power: "10⁻² m",
        metreValue: "0,01 m",
        commonUse: "Günlük küçük uzunluklar",
      },
      {
        name: "desimetre",
        symbol: "dm",
        power: "10⁻¹ m",
        metreValue: "0,1 m",
        commonUse: "Eğitim ve bazı hacim ilişkileri",
      },
      {
        name: "metre",
        symbol: "m",
        power: "10⁰ m",
        metreValue: "1 m",
        commonUse: "Temel uzunluk birimi",
      },
      {
        name: "dekametre",
        symbol: "dam",
        power: "10¹ m",
        metreValue: "10 m",
        commonUse: "Sınırlı özel kullanımlar",
      },
      {
        name: "hektometre",
        symbol: "hm",
        power: "10² m",
        metreValue: "100 m",
        commonUse: "Sınırlı özel kullanımlar",
      },
      {
        name: "kilometre",
        symbol: "km",
        power: "10³ m",
        metreValue: "1000 m",
        commonUse: "Kara yolu ve coğrafi mesafeler",
      },
      {
        name: "megametre",
        symbol: "Mm",
        power: "10⁶ m",
        metreValue: "1 000 000 m",
        commonUse: "Gezegensel ölçekte mesafeler",
      },
    ],

    exactConversions: [
      {
        unit: "Santimetre",
        symbol: "cm",
        metreValue: "0,01 m",
        status: "Kesin",
        note: "SI ön eki santi, 10⁻² çarpanını belirtir.",
      },
      {
        unit: "Milimetre",
        symbol: "mm",
        metreValue: "0,001 m",
        status: "Kesin",
        note: "SI ön eki mili, 10⁻³ çarpanını belirtir.",
      },
      {
        unit: "Kilometre",
        symbol: "km",
        metreValue: "1000 m",
        status: "Kesin",
        note: "SI ön eki kilo, 10³ çarpanını belirtir.",
      },
      {
        unit: "Uluslararası inç",
        symbol: "in",
        metreValue: "0,0254 m",
        status: "Kesin",
        note: "Uluslararası anlaşmayla tam değer olarak tanımlıdır.",
      },
      {
        unit: "Uluslararası fit",
        symbol: "ft",
        metreValue: "0,3048 m",
        status: "Kesin",
        note: "12 uluslararası inçe eşittir.",
      },
      {
        unit: "Uluslararası yarda",
        symbol: "yd",
        metreValue: "0,9144 m",
        status: "Kesin",
        note: "3 uluslararası fite eşittir.",
      },
      {
        unit: "Uluslararası mil",
        symbol: "mi",
        metreValue: "1609,344 m",
        status: "Kesin",
        note: "1760 uluslararası yardaya eşittir.",
      },
      {
        unit: "Deniz mili",
        symbol: "nmi",
        metreValue: "1852 m",
        status: "Kesin",
        note: "Uluslararası deniz mili tanımıdır.",
      },
      {
        unit: "Ångström",
        symbol: "Å",
        metreValue: "10⁻¹⁰ m",
        status: "Kesin",
        note: "SI dışı olmakla birlikte atomik ölçeklerde kullanılır.",
      },
      {
        unit: "Astronomik birim",
        symbol: "au",
        metreValue: "149 597 870 700 m",
        status: "Kesin",
        note: "Astronomide kullanılan tanımlanmış uzunluk birimidir.",
      },
    ],

    measurementMethods: [
      {
        title: "Cetvel ve şerit metre",
        description:
          "İşaretlenmiş bir ölçek üzerinden doğrudan uzunluk okuması yapılır.",
        typicalUse:
          "Günlük ölçümler, inşaat ve düşük hassasiyetli uygulamalar",
      },
      {
        title: "Kumpas",
        description:
          "Dış çap, iç çap, kalınlık ve derinlik gibi boyutları ölçmek için sürgülü veya dijital ölçek kullanır.",
        typicalUse:
          "Atölye, üretim ve kalite kontrol",
      },
      {
        title: "Mikrometre",
        description:
          "Hassas bir vida mekanizmasıyla küçük boyutları yüksek çözünürlükle ölçer.",
        typicalUse:
          "Makine parçaları, kaplama ve hassas üretim",
      },
      {
        title: "Koordinat ölçüm makinesi",
        description:
          "Bir prob veya optik sistem kullanarak parçanın üç boyutlu geometrisini ölçer.",
        typicalUse:
          "Endüstriyel metroloji ve kalite güvence",
      },
      {
        title: "Lazer mesafe ölçer",
        description:
          "Işığın uçuş süresi veya faz değişimi üzerinden mesafe hesaplar.",
        typicalUse:
          "İnşaat, haritacılık ve uzun mesafe ölçümleri",
      },
      {
        title: "Optik interferometre",
        description:
          "Işık dalgalarının girişimini kullanarak çok küçük uzunluk ve yer değiştirme farklarını belirler.",
        typicalUse:
          "Ulusal standart laboratuvarları ve hassas bilimsel ölçümler",
      },
    ],
  },
];

export function findUnitScientificData(slug: string) {
  if (slug === "kilometre") {
    return kilometreScientificData;
  }

  if (slug === "pascal") {
    return pascalScientificData;
  }

  if (slug === "atmosfer") {
    return atmosferScientificData;
  }

  return unitScientificData.find((data) => data.slug === slug);

}