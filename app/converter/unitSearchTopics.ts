export type UnitSearchTopic = {
  id: string;
  title: string;
  directAnswer: string;
  paragraphs: string[];
  items?: string[];
};

export type UnitSearchContent = {
  slug: string;
  topics: UnitSearchTopic[];
};

export const unitSearchContents: UnitSearchContent[] = [
  {
    slug: "metre",

    topics: [
      {
        id: "metrenin-cesitleri",
        title:
          "Metrenin çeşitleri nelerdir? Metrenin katları ve alt katları",
        directAnswer:
          "Metrenin teknik olarak farklı çeşitleri bulunmaz. Ancak metre, SI ön ekleri kullanılarak farklı büyüklüklerde ifade edilir. Bunlara metrenin katları ve alt katları denir.",
        paragraphs: [
          "Metreden küçük uzunlukları ifade etmek için desimetre, santimetre, milimetre, mikrometre ve nanometre gibi alt birimler kullanılır. Metreden büyük uzunluklarda ise dekametre, hektometre, kilometre ve megametre gibi katlardan yararlanılabilir.",

          "Günlük yaşamda bu birimlerin tamamı aynı sıklıkta kullanılmaz. Santimetre küçük nesneler ve vücut ölçüleri için, milimetre teknik ölçümler için, kilometre ise şehirler ve yollar arasındaki mesafeler için yaygındır.",

          "Birimin önündeki SI ön eki, metre değerinin hangi onluk kuvvetle çarpıldığını gösterir. Örneğin mili 10⁻³, santi 10⁻² ve kilo 10³ çarpanını ifade eder.",
        ],
        items: [
          "Nanometre (nm): Metrenin milyarda biri, 10⁻⁹ m",
          "Mikrometre (µm): Metrenin milyonda biri, 10⁻⁶ m",
          "Milimetre (mm): Metrenin binde biri, 10⁻³ m",
          "Santimetre (cm): Metrenin yüzde biri, 10⁻² m",
          "Desimetre (dm): Metrenin onda biri, 10⁻¹ m",
          "Metre (m): Temel uzunluk birimi, 10⁰ m",
          "Dekametre (dam): 10 metre, 10¹ m",
          "Hektometre (hm): 100 metre, 10² m",
          "Kilometre (km): 1000 metre, 10³ m",
          "Megametre (Mm): Bir milyon metre, 10⁶ m",
        ],
      },
      {
        id: "metre-birimleri-siralamasi",
        title: "Metre birimleri sıralaması nasıldır?",
        directAnswer:
          "Metre birimleri küçükten büyüğe nanometre, mikrometre, milimetre, santimetre, desimetre, metre, dekametre, hektometre, kilometre ve megametre biçiminde sıralanabilir.",
        paragraphs: [
          "Bu sıralama kullanılan SI ön eklerinin onluk kuvvetlerine dayanır. Bir basamaktan diğerine geçiş her zaman aynı katsayıyla gerçekleşmez; çünkü günlük eğitimde kullanılan desi, santi, mili ve kilo ön ekleri arasında atlanan kuvvetler bulunabilir.",

          "Birimleri dönüştürürken sembollerin büyük ve küçük harflerine dikkat edilmelidir. Milimetrenin sembolü mm, megametrenin sembolü ise Mm şeklindedir. Büyük M mega, küçük m ise metre veya mili ön ekinin bir parçası olabilir.",

          "Bilimsel gösterim, çok küçük ve çok büyük değerlerde sıfır sayma hatasını azaltır. Örneğin 0,000001 metre yerine 10⁻⁶ metre veya 1 mikrometre yazılabilir.",
        ],
      },
      {
        id: "metreden-kucuk-birimler",
        title: "Metreden küçük ölçü birimleri nelerdir?",
        directAnswer:
          "Metreden küçük yaygın SI uzunluk birimleri desimetre, santimetre, milimetre, mikrometre ve nanometredir.",
        paragraphs: [
          "Desimetre metrenin onda biri, santimetre yüzde biri ve milimetre binde biridir. Mikrometre metrenin milyonda birini, nanometre ise milyarda birini ifade eder.",

          "Hangi birimin seçileceği ölçülen nesnenin büyüklüğüne ve gereken hassasiyete bağlıdır. Bir insanın boyu metre veya santimetreyle, bir metal levhanın kalınlığı milimetreyle, bir hücrenin boyutu mikrometreyle ve görünür ışığın dalga boyu nanometreyle ifade edilebilir.",

          "Çok küçük uzunluklarda pikometre ve femtometre gibi daha küçük SI ön ekleri de kullanılabilir. Atomik ve nükleer ölçeklerde bu birimler daha anlamlı sonuçlar verir.",
        ],
        items: [
          "1 desimetre = 0,1 metre",
          "1 santimetre = 0,01 metre",
          "1 milimetre = 0,001 metre",
          "1 mikrometre = 0,000001 metre",
          "1 nanometre = 0,000000001 metre",
        ],
      },
      {
        id: "metreden-buyuk-birimler",
        title: "Metreden büyük ölçü birimleri nelerdir?",
        directAnswer:
          "Metreden büyük SI uzunluk birimleri arasında dekametre, hektometre, kilometre, megametre, gigametre ve daha büyük ön ekli metre birimleri bulunur.",
        paragraphs: [
          "Günlük kullanımda metreden büyük en yaygın birim kilometredir. Dekametre ve hektometre teknik olarak geçerli SI ön ekli birimler olmasına rağmen günlük yaşamda kilometre kadar yaygın değildir.",

          "Gezegenlerin boyutları veya uzaydaki büyük mesafeler için megametre ve gigametre kullanılabilir. Astronomide ayrıca astronomik birim, ışık yılı ve parsek gibi SI dışı özel uzunluk birimleri de tercih edilir.",

          "Büyük mesafelerde uygun birim seçmek sayının okunmasını kolaylaştırır. Örneğin 150 000 000 000 metre yerine yaklaşık 150 gigametre ifadesi daha kısa olabilir; astronomik bağlamda ise astronomik birim daha kullanışlıdır.",
        ],
        items: [
          "1 dekametre = 10 metre",
          "1 hektometre = 100 metre",
          "1 kilometre = 1000 metre",
          "1 megametre = 1 000 000 metre",
          "1 gigametre = 1 000 000 000 metre",
        ],
      },
      {
        id: "metre-nerelerde-kullanilir",
        title: "Metre hangi alanlarda kullanılır?",
        directAnswer:
          "Metre; günlük ölçümler, inşaat, mimarlık, mühendislik, üretim, haritacılık, spor ve bilimsel araştırmalarda kullanılan temel uzunluk birimidir.",
        paragraphs: [
          "İnşaat ve mimarlıkta oda ölçüleri, bina yüksekliği, kolon aralıkları ve malzeme uzunlukları metreyle ifade edilebilir. Üretimde daha küçük toleranslar için genellikle milimetre tercih edilir.",

          "Sporda koşu, yüzme, atlama ve atış mesafeleri metreyle belirtilebilir. Haritacılıkta kısa mesafeler metre, uzun coğrafi uzaklıklar ise çoğunlukla kilometre kullanılarak gösterilir.",

          "Fizikte metre; hız, ivme, alan, hacim ve birçok türetilmiş büyüklüğün birimlerinde yer alır. Metre bölü saniye hızın, metre bölü saniye kare ivmenin SI birimidir.",
        ],
      },
    ],
  },
];

export function findUnitSearchContent(slug: string) {
  return unitSearchContents.find((content) => content.slug === slug);
}