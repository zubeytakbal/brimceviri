import { kilometreArticle } from "./articles/kilometreArticle";
import { pascalArticle } from "./articles/pascalArticle";
import { atmosferArticle } from "./articles/atmosferArticle";
import { psiArticle } from "./articles/psiArticle";
import { kilogramKuvvetSantimetrekareArticle } from "./articles/kilogramKuvvetSantimetrekareArticle";
import { barArticle } from "./articles/barArticle";
import { milimetreCivaArticle } from "./articles/milimetreCivaArticle";
import { kilopascalArticle } from "./articles/kilopascalArticle";
import { kilogramMetrekupArticle } from "./articles/kilogramMetrekupArticle";
import { beygirgucuArticle } from "./articles/beygirgucuArticle";
import { newtonArticle } from "./articles/newtonArticle";
import { newtonMetreArticle } from "./articles/newtonMetreArticle";
import { kilogramMetreSaniyeArticle } from "./articles/kilogramMetreSaniyeArticle";
import { pascalSaniyeArticle } from "./articles/pascalSaniyeArticle";
import { galonArticle } from "./articles/galonArticle";
import { akreArticle } from "./articles/akreArticle";
import { santimetrekupArticle } from "./articles/santimetrekupArticle";
import { gigabaytArticle } from "./articles/gigabaytArticle";
export type UnitArticleSection = {
  title: string;
  paragraphs: string[];
};

export type UnitTimelineItem = {
  year: string;
  title: string;
  description: string;
};

export type UnitQuestion = {
  question: string;
  answer: string;
};

export type UnitArticle = {
  slug: string;
  introduction: string[];
  keyFacts: {
    label: string;
    value: string;
  }[];
  sections: UnitArticleSection[];
  timeline: UnitTimelineItem[];
  questions: UnitQuestion[];
};

export const unitArticles: UnitArticle[] = [
  {
    slug: "metre",

    introduction: [
      "Metre, Uluslararası Birim Sistemi'nde uzunluğun temel birimidir ve m sembolüyle gösterilir. Günlük yaşamda bir odanın uzunluğunu belirtmekten mühendislik projelerine, bilimsel araştırmalardan harita çalışmalarına kadar çok geniş bir kullanım alanına sahiptir.",

      "Günümüzde metre fiziksel bir çubuğun uzunluğuna göre tanımlanmaz. Modern tanım, ışığın boşluktaki hızına ve saniyenin bilimsel tanımına dayanır. Bu sayede metre dünyanın farklı laboratuvarlarında son derece yüksek doğrulukla yeniden üretilebilir.",
    ],

    keyFacts: [
      {
        label: "Birim adı",
        value: "Metre",
      },
      {
        label: "Sembolü",
        value: "m",
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
        label: "1 metre",
        value: "100 santimetre",
      },
      {
        label: "1 kilometre",
        value: "1000 metre",
      },
    ],

    sections: [
      {
        title: "Metre nedir?",
        paragraphs: [
          "Metre, uzunluk ve mesafe ölçmek için kullanılan temel SI birimidir. Bir nesnenin boyu, iki nokta arasındaki uzaklık, bir yapının yüksekliği veya bir yüzeyin kenar uzunluğu metre cinsinden ifade edilebilir.",

          "Metre yalnızca günlük ölçümlerde kullanılan pratik bir birim değildir. Santimetre, milimetre ve kilometre gibi çok sayıda birim de metre temel alınarak oluşturulur. Bir santimetre metrenin yüzde biri, bir milimetre metrenin binde biri ve bir kilometre 1000 metredir.",

          "Uluslararası Birim Sistemi'nin ondalık yapısı sayesinde metre ile ilişkili birimler arasında dönüşüm yapmak kolaydır. Örneğin metreyi santimetreye çevirmek için değer 100 ile çarpılır; kilometreye çevirmek için 1000'e bölünür.",
        ],
      },
      {
        title: "Metre neden ortaya çıktı?",
        paragraphs: [
          "Geçmişte uzunluk ölçmek için ayak, arşın, kulaç ve benzeri yerel birimler kullanılıyordu. Bu birimlerin değerleri ülkeye, şehre ve hatta meslek grubuna göre değişebiliyordu. Aynı isimle kullanılan bir ölçünün farklı bölgelerde farklı uzunluklara karşılık gelmesi ticaret, bilim ve mühendislik açısından ciddi karışıklıklar oluşturuyordu.",

          "18. yüzyılın sonlarında ortak, evrensel ve doğaya dayalı bir ölçü sistemi oluşturma düşüncesi güç kazandı. Yeni uzunluk biriminin belirli bir hükümdara, ülkeye veya insan vücuduna bağlı olmaması amaçlandı. Bu yaklaşım daha sonra metrik sistemin temelini oluşturdu.",

          "Metrenin ilk tasarımında Dünya'nın boyutlarından yararlanıldı. Böylece herkes için geçerli olabilecek doğal bir referans oluşturulmak istendi. Ölçümlerin uygulanması zor olsa da bu düşünce, uzunluk standardının uluslararasılaşmasında önemli bir adımdı.",
        ],
      },
      {
        title: "Metrenin ilk tanımı",
        paragraphs: [
          "1791 yılında metre, ekvatordan Kuzey Kutbu'na uzanan meridyen mesafesinin on milyonda biri olarak tasarlandı. Bu tanımı gerçekleştirmek için Paris meridyeninin Dunkirk ile Barselona arasındaki bölümü ölçüldü.",

          "Pierre Méchain ve Jean-Baptiste Delambre tarafından yürütülen ölçüm çalışmaları yıllar sürdü. Dönemin teknik ve siyasi koşulları çalışmayı oldukça zorlaştırdı. Elde edilen sonuçlara dayanılarak 1799 yılında platin bir metre standardı hazırlandı. Bu fiziksel standart Metre des Archives olarak bilinir.",

          "Dünya'nın şekli tam bir küre olmadığı ve ilk ölçümlerde kaçınılmaz belirsizlikler bulunduğu için fiziksel standart ile teorik meridyen tanımı tamamen aynı değildi. Buna rağmen üretilen standart, metrik sistemin yaygınlaşmasında temel referans oldu.",
        ],
      },
      {
        title: "Fiziksel metre prototipleri",
        paragraphs: [
          "19. yüzyılda uluslararası ticaret ve bilimsel çalışmalar geliştikçe ülkeler arasında daha güvenilir ölçüm standartlarına ihtiyaç duyuldu. 1875 yılında imzalanan Metre Konvansiyonu, ölçüm standartlarının uluslararası iş birliğiyle yönetilmesi için önemli bir temel oluşturdu.",

          "1889 yılında metre, platin ve iridyum alaşımından üretilmiş uluslararası prototip üzerindeki iki çizgi arasındaki mesafe olarak kabul edildi. Prototip, belirli sıcaklık ve ölçüm koşullarında metrenin resmî referansıydı.",

          "Fiziksel bir nesneye dayanan tanım uzun süre başarılı biçimde kullanıldı. Ancak en dikkatli koruma koşullarında bile bir nesnenin kirlenmesi, aşınması veya çok küçük boyutsal değişikliklere uğraması mümkündür. Bilimsel ölçümlerde daha yüksek doğruluğa duyulan ihtiyaç, doğa sabitlerine dayalı yeni tanımların geliştirilmesine yol açtı.",
        ],
      },
      {
        title: "Işık dalga boyuna dayalı metre",
        paragraphs: [
          "1960 yılında fiziksel prototip yerine atomik bir ışık kaynağına dayanan tanım kabul edildi. Metre, kripton-86 atomunun belirli bir enerji geçişinde yaydığı ışığın dalga boyu kullanılarak tanımlandı.",

          "Bu değişiklik sayesinde metre tek bir metal çubuğa bağlı olmaktan çıktı. Uygun donanıma sahip laboratuvarlar aynı fiziksel olayı kullanarak uzunluk standardını yeniden oluşturabiliyordu.",

          "Lazer ve zaman ölçüm teknolojilerindeki gelişmeler, uzunluk biriminin daha da hassas bir doğa sabiti üzerinden tanımlanabilmesini mümkün hâle getirdi. Bunun sonucunda ışığın boşluktaki hızı modern metre tanımının temeli oldu.",
        ],
      },
      {
        title: "Metrenin günümüzdeki bilimsel tanımı",
        paragraphs: [
          "1983 yılında metre, ışığın boşlukta saniyenin 1/299.792.458'i süresince aldığı yolun uzunluğu olarak tanımlandı. Işığın boşluktaki hızı tam olarak saniyede 299.792.458 metre kabul edilir.",

          "Bu tanımda ışık hızı ölçülmeye çalışılan değişken bir değer değil, sabitlenmiş bir doğa sabitidir. Saniye çok hassas atom saatleriyle gerçekleştirildiği için metre de zaman ve ışık hızı üzerinden yüksek doğrulukla gerçekleştirilebilir.",

          "2019 yılında yürürlüğe giren yenilenmiş SI sistemi de ışık hızının sabitlenmiş sayısal değerine dayanan bu yaklaşımı sürdürür. Böylece metre fiziksel bir nesne yerine evrensel bir doğa sabitiyle bağlantılıdır.",
        ],
      },
      {
        title: "Metrenin sembolü nasıl yazılır?",
        paragraphs: [
          "Metrenin uluslararası sembolü küçük m harfidir. Birim sembolleri özel isim olmadığı için cümlenin içinde de küçük harfle yazılır. Sayısal değer ile birim sembolü arasında boşluk bırakılması önerilir: 5 m doğru kullanıma örnektir.",

          "Birim sembolüne çoğul eki getirilmez. Beş metre için 5 m yazılır; 5 ms veya 5 m'ler biçiminde bir kullanım yapılmaz. Sembolün ardından yalnızca cümlenin gerektirdiği noktalama işareti gelebilir.",

          "Metre sembolü olan m ile metrekare sembolü m² ve metreküp sembolü m³ birbirinden farklı büyüklükleri ifade eder. Metre uzunluğu, metrekare alanı ve metreküp hacmi ölçer.",
        ],
      },
      {
        title: "Metre nerelerde kullanılır?",
        paragraphs: [
          "Metre; inşaat, mimarlık, makine mühendisliği, haritacılık, spor, tekstil, üretim ve günlük yaşamda kullanılır. Bir odanın eni ve boyu, bir binanın yüksekliği, bir kumaşın uzunluğu veya bir koşu parkurunun ölçüsü metreyle ifade edilebilir.",

          "Çok kısa uzunluklarda santimetre, milimetre, mikrometre ve nanometre gibi alt birimler tercih edilir. Şehirler arası mesafelerde ise kilometre daha kullanışlıdır. Uygun birimin seçilmesi, sayının okunmasını ve karşılaştırılmasını kolaylaştırır.",

          "Bilimsel ve teknik çalışmalarda ölçüm sonuçlarının SI birimleriyle verilmesi, farklı ülkelerdeki araştırmacıların ve mühendislerin sonuçları aynı standart üzerinden değerlendirebilmesini sağlar.",
        ],
      },
      {
        title: "Metre ve diğer uzunluk birimleri",
        paragraphs: [
          "Bir metre 100 santimetreye, 1000 milimetreye ve 0,001 kilometreye eşittir. İngiliz ve Amerikan ölçü sistemlerinde kullanılan birimlerle karşılaştırıldığında bir metre yaklaşık 3,28084 fit ve 39,3701 inçtir.",

          "Mil, özellikle kara yolu mesafelerinde kullanılan daha büyük bir birimdir. Bir uluslararası mil tam olarak 1609,344 metredir. Bir uluslararası fit ise tam olarak 0,3048 metredir.",

          "Dönüşüm yapılırken yalnızca sayısal değerin değil, dönüşüm yönünün de dikkate alınması gerekir. Metreden daha küçük bir birime geçerken sayı genellikle büyür; kilometre gibi daha büyük bir birime geçerken küçülür.",
        ],
      },
      {
        title: "Metre hakkında yaygın karışıklıklar",
        paragraphs: [
          "Metre ile metrekare aynı şey değildir. Metre tek boyutlu uzunluğu, metrekare iki boyutlu alanı ifade eder. Örneğin bir odanın uzunluğu metreyle, taban alanı metrekareyle belirtilir.",

          "Metre ile deniz mili de birbirinden farklıdır. Deniz mili denizcilik ve havacılıkta kullanılan özel bir uzunluk birimidir ve tam olarak 1852 metreye eşittir.",

          "Günlük dilde ağırlık olarak ifade edilen birçok değer teknik olarak kütledir. Metre uzunluk birimi olduğu için kilogram veya gram gibi kütle birimleriyle doğrudan dönüştürülemez.",
        ],
      },
    ],

    timeline: [
      {
        year: "1791",
        title: "Doğaya dayalı metre önerisi",
        description:
          "Metrenin, ekvator ile Kuzey Kutbu arasındaki meridyen mesafesinin on milyonda biri olması önerildi.",
      },
      {
        year: "1799",
        title: "Metre des Archives",
        description:
          "Ölçümlere dayanılarak platin bir fiziksel metre standardı hazırlandı.",
      },
      {
        year: "1875",
        title: "Metre Konvansiyonu",
        description:
          "Ölçüm standartlarında uluslararası iş birliğinin kurumsal temeli oluşturuldu.",
      },
      {
        year: "1889",
        title: "Uluslararası metre prototipi",
        description:
          "Platin-iridyum prototip, metrenin uluslararası standardı olarak kabul edildi.",
      },
      {
        year: "1960",
        title: "Kripton-86 tanımı",
        description:
          "Metre, kripton-86 atomunun yaydığı ışığın dalga boyuna bağlandı.",
      },
      {
        year: "1983",
        title: "Işık hızına dayalı tanım",
        description:
          "Metre, ışığın boşlukta belirli bir sürede aldığı yol üzerinden yeniden tanımlandı.",
      },
      {
        year: "2019",
        title: "Yenilenmiş SI sistemi",
        description:
          "Metrenin ışık hızının sabit sayısal değerine dayanan tanımı yenilenmiş SI sistemi içinde sürdürüldü.",
      },
    ],

    questions: [
      {
        question: "1 metre kaç santimetredir?",
        answer:
          "1 metre 100 santimetreye eşittir. Metreyi santimetreye çevirmek için değer 100 ile çarpılır.",
      },
      {
        question: "1 metre kaç milimetredir?",
        answer:
          "1 metre 1000 milimetreye eşittir. Metreyi milimetreye çevirmek için değer 1000 ile çarpılır.",
      },
      {
        question: "1 metre kaç kilometredir?",
        answer:
          "1 metre 0,001 kilometreye eşittir. Metreyi kilometreye çevirmek için değer 1000'e bölünür.",
      },
      {
        question: "Metreyi kim buldu?",
        answer:
          "Metre tek bir kişi tarafından bir anda icat edilmedi. Fransız bilim insanları ve kurumları tarafından yürütülen ölçüm ve standartlaştırma çalışmaları sonucunda geliştirildi. Pierre Méchain ve Jean-Baptiste Delambre ilk meridyen ölçümlerinde önemli rol oynadı.",
      },
      {
        question: "Metrenin günümüzdeki tanımı nedir?",
        answer:
          "Metre, ışığın boşlukta saniyenin 1/299.792.458'i süresince aldığı yolun uzunluğudur.",
      },
      {
        question: "Metre neden m harfiyle gösterilir?",
        answer:
          "m sembolü, metre kelimesinin uluslararası kabul edilen birim sembolüdür. SI yazım kurallarına göre küçük harfle ve çoğul eki almadan kullanılır.",
      },
    ],
  },
];

export function findUnitArticle(slug: string) {
  if (slug === "kilometre") {
    return kilometreArticle;
  }

  if (slug === "pascal") {
    return pascalArticle;
  }

  if (slug === "atmosfer") {
    return atmosferArticle;
  }

  if (slug === "psi") {
    return psiArticle;
  }

  if (slug === "kilogram-kuvvet-santimetrekare") {
    return kilogramKuvvetSantimetrekareArticle;
  }

  if (slug === "bar") {
    return barArticle;
  }

  if (slug === "milimetre-civa") {
    return milimetreCivaArticle;
  }

  if (slug === "kilopascal") {
    return kilopascalArticle;
  }

  if (slug === "kilogram-metrekup") {
    return kilogramMetrekupArticle;
  }

  if (slug === "beygirgucu") {
    return beygirgucuArticle;
  }

  if (slug === "newton") {
    return newtonArticle;
  }

  if (slug === "newton-metre") {
    return newtonMetreArticle;
  }

  if (slug === "kilogram-metre-saniye") {
    return kilogramMetreSaniyeArticle;
  }

  if (slug === "pascal-saniye") {
    return pascalSaniyeArticle;
  }

  if (slug === "galon") {
    return galonArticle;
  }

  if (slug === "akre") {
    return akreArticle;
  }

  if (slug === "santimetrekup") {
    return santimetrekupArticle;
  }

  if (slug === "gigabayt") {
    return gigabaytArticle;
  }

  return unitArticles.find((article) => article.slug === slug);
}