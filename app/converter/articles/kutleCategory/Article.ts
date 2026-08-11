import type { CategoryArticle } from "../../categoryArticles";

export const kutleCategoryArticle: CategoryArticle = {
  slug: "kutle",

  introduction: [
    "Kütle, bir cismin madde miktarı ve eylemsizlik özelliğiyle ilişkili temel fiziksel büyüklüktür. Uluslararası Birim Sistemi'nde kütlenin temel birimi kilogramdır ve kg sembolüyle gösterilir.",

    "Kütle ile ağırlık günlük dilde çoğu zaman aynı anlamda kullanılsa da fiziksel olarak farklı büyüklüklerdir. Kütle kilogramla, ağırlık ise bir kuvvet olduğu için newtonla ölçülür.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "Kütle",
    },
    {
      label: "Boyut sembolü",
      value: "[M]",
    },
    {
      label: "SI temel birimi",
      value: "Kilogram",
    },
    {
      label: "SI birim sembolü",
      value: "kg",
    },
    {
      label: "Ölçüm bilimi alanı",
      value: "Kütle metrolojisi",
    },
  ],

  sections: [
    {
      title: "Kütle nedir?",
      paragraphs: [
        "Kütle, bir cismin hareket durumundaki değişime karşı gösterdiği dirençle, yani eylemsizlikle ilişkili fiziksel büyüklüktür. Klasik mekanikte bir cisme uygulanan net kuvvet ile oluşan ivme arasındaki ilişki F = m·a eşitliğiyle ifade edilir.",

        "Aynı kuvvet uygulandığında kütlesi daha büyük olan bir cisim daha küçük ivme kazanır. Bu nedenle kütle yalnızca cismin içerdiği maddeyi gündelik anlamda ifade etmekle kalmaz; hareket denklemlerinde temel bir rol oynar.",

        "Kütle skaler bir büyüklüktür. Yönü bulunmaz ve SI sistemindeki temel boyut sembolü M harfiyle gösterilir.",
      ],
    },
    {
      title: "Kütle ve ağırlık arasındaki fark",
      paragraphs: [
        "Kütle ve ağırlık aynı fiziksel büyüklük değildir. Kütle cismin bir özelliğidir ve kilogramla ifade edilir. Ağırlık ise cismin bir kütle çekim alanında maruz kaldığı kuvvettir ve newtonla ölçülür.",

        "Basitleştirilmiş ağırlık ilişkisi W = m·g şeklindedir. Burada W ağırlık kuvvetini, m kütleyi ve g yerel kütle çekim ivmesini ifade eder.",

        "Bir cismin kütlesi Dünya'da ve Ay'da yaklaşık olarak aynı kalır; ancak yerel kütle çekim ivmesi farklı olduğu için ağırlığı değişir. Bu nedenle bilimsel kullanımda kilogram ağırlık değil, kütle birimidir.",

        "Günlük dilde tartı sonucu kilogram olarak ifade edildiği için ağırlık ve kütle sözcükleri sıkça birbirinin yerine kullanılır. Ölçüm cihazı gerçekte bir kuvvet etkisini algılayabilir ancak sonucu kütle birimiyle gösterecek şekilde kalibre edilir.",
      ],
    },
    {
      title: "Kütlenin SI temel birimi neden kilogramdır?",
      paragraphs: [
        "Uluslararası Birim Sistemi'nde kütlenin temel birimi kilogramdır. Kilogram, SI temel birimleri içinde adında bir ön ek bulunan tek temel birimdir.",

        "Gram sözcüğü tarihsel olarak metrik sistemin ilk kütle tanımlarında önemli rol oynamıştır. Ancak pratik standartların oluşturulması sırasında kilogram temel referans hâline gelmiştir.",

        "Günümüzde kilogram fiziksel bir metal silindirin kütlesiyle tanımlanmaz. Planck sabitinin sabitlenmiş sayısal değeri kullanılarak tanımlanır. Bu tanımın Kibble terazisi ve elektriksel ölçümlerle ilişkisi kilogram bilgi sayfasında ayrıntılı olarak incelenir.",
      ],
    },
    {
      title: "Metrik kütle birimleri",
      paragraphs: [
        "Metrik kütle birimleri kilogram, gram ve bunlara eklenen SI ön ekleri üzerinden oluşturulur. Bir gram 0,001 kilogram, bir miligram 0,001 gram ve bir mikrogram 0,001 miligramdır.",

        "Büyük kütlelerde ton kullanılır. Bir metrik ton tam olarak 1000 kilograma eşittir. SI ile birlikte kullanılması kabul edilen tonun sembolü küçük t harfidir.",

        "Uygun birim ölçülen kütlenin büyüklüğüne göre seçilir. İnsan ve ürün kütleleri kilogramla, gıda içerikleri gramla, ilaç etken maddeleri miligram veya mikrogramla ve taşıt yükleri tonla ifade edilebilir.",
      ],
    },
    {
      title: "Pound, ons ve kilogram ilişkisi",
      paragraphs: [
        "Pound ve ons İngiliz ve Amerikan geleneksel ölçü sistemlerinde kullanılan kütle birimleridir. Uluslararası avoirdupois pound tam olarak 0,45359237 kilograma eşittir.",

        "Bir avoirdupois pound 16 onsa ayrılır. Buna göre bir ons tam olarak 0,028349523125 kilograma veya 28,349523125 grama eşittir.",

        "Kütle dönüşümünde kullanılan pound ile kuvvet birimi pound-force birbirinden farklıdır. Pound kütleyi, pound-force ise kuvveti ifade eder. Teknik hesaplamalarda lb ve lbf sembollerinin karıştırılmaması gerekir.",
      ],
    },
    {
      title: "Kütle nasıl ölçülür?",
      paragraphs: [
        "Kütle ölçümünde eşit kollu terazi, elektronik terazi, analitik terazi, yük hücresi ve farklı kapasitelere sahip endüstriyel tartım sistemleri kullanılabilir.",

        "Karşılaştırmalı teraziler, bilinmeyen kütleyi izlenebilir standart kütlelerle karşılaştırır. Elektronik terazilerde yük hücreleri uygulanan kuvveti elektriksel bir sinyale dönüştürebilir.",

        "Yüksek doğruluklu ölçümlerde hava kaldırma kuvveti, yerel kütle çekim ivmesi, sıcaklık, nem, titreşim, elektrostatik etkiler ve standart kütlenin yoğunluğu gibi etkenler dikkate alınabilir.",

        "Kütle standartlarının ulusal ve uluslararası ölçüm sistemlerine bağlanmasına metrolojik izlenebilirlik denir. Kalibrasyon zinciri, farklı laboratuvar ve işletmelerde yapılan ölçümlerin karşılaştırılabilmesini sağlar.",
      ],
    },
    {
      title: "Yoğunluk, hacim ve kütle ilişkisi",
      paragraphs: [
        "Kütle, yoğunluk ve hacim arasında m = ρ·V ilişkisi bulunur. Burada m kütleyi, ρ yoğunluğu ve V hacmi ifade eder.",

        "Aynı hacimdeki iki maddenin kütleleri yoğunluklarına bağlı olarak farklı olabilir. Örneğin aynı hacimdeki çelik ve su eşit kütleye sahip değildir.",

        "SI sisteminde yoğunluğun temel türetilmiş birimi kilogram bölü metreküptür. Laboratuvar uygulamalarında gram bölü santimetreküp veya gram bölü mililitre gibi birimler de yaygın olarak kullanılır.",
      ],
    },
    {
      title: "Kütle ölçümünde belirsizlik",
      paragraphs: [
        "Her gerçek ölçüm belirli bir belirsizlik taşır. Bir terazinin ekranda çok sayıda basamak göstermesi, bütün basamakların aynı doğrulukla bilindiği anlamına gelmez.",

        "Cihaz çözünürlüğü, tekrarlanabilirlik, doğrusal olmama, kalibrasyon standardı, çevresel koşullar ve kullanıcı yöntemi kütle ölçümünün belirsizliğine katkıda bulunabilir.",

        "Bilimsel ve endüstriyel çalışmalarda ölçüm sonucu uygun birim, anlamlı basamak ve belirsizlik bilgisiyle birlikte değerlendirilmelidir.",
      ],
    },
    {
      title: "Uygun kütle birimi nasıl seçilir?",
      paragraphs: [
        "Ölçülen nesnenin büyüklüğüne uygun birim seçmek sonucu daha okunabilir hâle getirir. Bir insanın kütlesi kilogram, bir tabletin etken maddesi miligram ve bir kamyon yükü ton cinsinden ifade edilebilir.",

        "Çok küçük kütlelerde mikrogram, nanogram ve pikogram gibi SI ön ekli birimler kullanılabilir. Atom ve molekül ölçeğinde birleşik atomik kütle birimi gibi özel birimler daha kullanışlı olabilir.",

        "Birim dönüşümü yapılırken yalnızca sayısal değer değil, kullanılan birimin kütle mi yoksa kuvvet mi ifade ettiği de kontrol edilmelidir.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Nanogram",
      symbol: "ng",
      referenceValue: "10⁻¹² kg",
      system: "SI",
      commonUse: "Çok düşük madde miktarları",
    },
    {
      name: "Mikrogram",
      symbol: "µg",
      referenceValue: "10⁻⁹ kg",
      system: "SI",
      commonUse: "İlaç ve laboratuvar ölçümleri",
    },
    {
      name: "Miligram",
      symbol: "mg",
      referenceValue: "10⁻⁶ kg",
      system: "SI",
      commonUse: "İlaç dozları ve kimyasal maddeler",
    },
    {
      name: "Gram",
      symbol: "g",
      referenceValue: "0,001 kg",
      system: "SI",
      commonUse: "Gıda ve küçük nesneler",
    },
    {
      name: "Kilogram",
      symbol: "kg",
      referenceValue: "1 kg",
      system: "SI",
      commonUse: "Temel kütle ölçümleri",
    },
    {
      name: "Ton",
      symbol: "t",
      referenceValue: "1000 kg",
      system: "Metrik",
      commonUse: "Taşıt, yük ve sanayi",
    },
    {
      name: "Ons",
      symbol: "oz",
      referenceValue: "0,028349523125 kg",
      system: "İngiliz/ABD",
      commonUse: "Gıda ve küçük kütleler",
    },
    {
      name: "Pound",
      symbol: "lb",
      referenceValue: "0,45359237 kg",
      system: "İngiliz/ABD",
      commonUse: "Vücut ve ürün kütlesi",
    },
  ],
};
