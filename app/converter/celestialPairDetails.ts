// Gökcismi karşılaştırma sayfalarına çifte özgü metin. Tablo ve oranlar celestialBodiesDatabase'den hesaplanır;
// burada yalnızca o iki cismi birlikte anlatan, gözlem ve uzay görevleriyle bilinen bilgiler durur.
// Bir çiftin metni yoksa sayfa yalnızca hesaplanan bölümlerle çıkar.

export type CiftAyrinti = { baslik: string; paragraflar: string[] };

export const CIFT_AYRINTI: Record<string, CiftAyrinti> = {
  "dunya-jupiter-karsilastirma": {
    baslik: "Jüpiter'i Dünya'dan ayıran özellikler",
    paragraflar: [
      "Jüpiter o kadar büyüktür ki kütlesi Güneş Sistemi'ndeki diğer tüm gezegenlerin toplam kütlesinin yaklaşık 2,5 katıdır. Katı bir yüzeyi yoktur; gördüğümüz renkli bantlar hidrojen ve helyumdan oluşan atmosferin üst katmanlarındaki bulut kuşaklarıdır.",
      "Gezegenin simgesi olan Büyük Kırmızı Leke, 1830'lardan beri kesintisiz gözlenen dev bir fırtınadır ve bugün bile Dünya'nın çapından geniştir; ancak son yüzyılda belirgin biçimde küçüldüğü ölçülmüştür. Jüpiter aynı zamanda en hızlı dönen gezegendir: bir günü 10 saatten kısadır.",
      "NASA'nın Juno sondası 2016'dan beri Jüpiter'in yörüngesinde dolanarak gezegenin iç yapısını ve kutup bölgelerini inceliyor.",
    ],
  },
  "dunya-mars-karsilastirma": {
    baslik: "Mars'ı Dünya'dan ayıran özellikler",
    paragraflar: [
      "Mars'ın kırmızı rengi yüzeyini kaplayan demir oksitli (pas) tozdan gelir. Atmosferi büyük ölçüde karbondioksittir ve yüzeydeki basınç Dünya'dakinin yüzde birinden azdır; bu yüzden sıvı su yüzeyde uzun süre kalamaz.",
      "Güneş Sistemi'nin bilinen en yüksek yanardağı Olympus Mons Mars'tadır: zemininden yaklaşık 22 km yükselir, Everest'in iki buçuk katı kadardır. Mars'ta bir gün (sol) Dünya gününden biraz uzundur: 24 saat 39 dakika.",
      "Dünya ile Mars yaklaşık 26 ayda bir birbirine en yakın konuma gelir; uzay ajansları fırlatmaları bu pencerelere göre planlar. NASA'nın Perseverance gezgini 2021'den beri Jezero kraterinde eski yaşam izleri arıyor.",
    ],
  },
  "dunya-neptun-karsilastirma": {
    baslik: "Neptün'ü Dünya'dan ayıran özellikler",
    paragraflar: [
      "Neptün, gökyüzünde görülmeden önce hesapla yeri tahmin edilen ilk gezegendir: Uranüs'ün yörüngesindeki sapmalardan yola çıkan Urbain Le Verrier'in hesabıyla 1846'da Johann Galle tarafından gözlendi. Keşfinden bu yana Güneş etrafındaki ilk tam turunu ancak 2011'de tamamladı.",
      "Neptün, Güneş Sistemi'nde ölçülen en hızlı rüzgârlara sahiptir; atmosferindeki rüzgârlar saatte 2.000 km'yi aşar. Mavi rengi atmosferindeki metanın kırmızı ışığı soğurmasından gelir.",
      "Neptün'ü yakından gören tek uzay aracı 1989'da yanından geçen Voyager 2'dir. En büyük uydusu Triton, gezegenin dönüşünün tersi yönde dolanır.",
    ],
  },
  "dunya-uranus-karsilastirma": {
    baslik: "Uranüs'ü Dünya'dan ayıran özellikler",
    paragraflar: [
      "Uranüs'ün dönme ekseni yaklaşık 98 derece eğiktir; gezegen Güneş etrafında adeta yan yatmış olarak döner. Bu yüzden kutuplarından her biri yaklaşık 42 yıl sürekli gündüz, ardından 42 yıl sürekli gece yaşar. Dünya'nın ekseni ise 23,4 derece eğiktir ve mevsimlerimizi bu eğiklik belirler.",
      "Uranüs, teleskopla keşfedilen ilk gezegendir: William Herschel onu 1781'de buldu. Daha önce bilinen gezegenlerin hepsi çıplak gözle görülebiliyordu.",
      "Uranüs'ü yakından inceleyen tek araç, 1986'da yanından geçen Voyager 2'dir.",
    ],
  },
  "dunya-pluton-karsilastirma": {
    baslik: "Plüton'u Dünya'dan ayıran özellikler",
    paragraflar: [
      "Plüton 1930'da Clyde Tombaugh tarafından keşfedildi ve 76 yıl dokuzuncu gezegen sayıldı. 2006'da Uluslararası Astronomi Birliği gezegen tanımını netleştirdiğinde, yörüngesini çevresindeki diğer cisimlerden temizlemediği için cüce gezegen sınıfına alındı.",
      "NASA'nın New Horizons sondası 2015'te Plüton'un yanından geçerek ilk ayrıntılı fotoğrafları çekti; yüzeydeki kalp biçimli buz ovası Tombaugh Regio bu sayede tanındı. Plüton'un en büyük uydusu Charon, çapı Plüton'un yarısını geçtiği için ikisi zaman zaman çift sistem olarak anılır.",
    ],
  },
  "ganymede-ay-karsilastirma": {
    baslik: "Ganymede'yi Ay'dan ayıran özellikler",
    paragraflar: [
      "Ganymede, Güneş Sistemi'nin en büyük uydusudur; çapı Merkür gezegeninden bile büyüktür, ama büyük ölçüde buz ve kayadan oluştuğu için kütlesi Merkür'ün yarısından azdır. Galileo Galilei onu 1610'da Jüpiter'in diğer üç büyük uydusuyla birlikte keşfetti.",
      "Ganymede kendi manyetik alanı olduğu bilinen tek uydudur. Hubble Uzay Teleskobu'nun gözlemleri, buzlu kabuğun altında tuzlu bir su okyanusu bulunduğuna işaret eder.",
      "Avrupa Uzay Ajansı'nın 2023'te fırlatılan JUICE sondası 2031'de Jüpiter'e varacak ve görevinin sonunda Ganymede'nin yörüngesine girerek başka bir gezegenin uydusunun etrafında dolanan ilk araç olacak. Ay ise insanların ayak bastığı tek gök cismidir (Apollo 11, 1969).",
    ],
  },
  "jupiter-saturn-karsilastirma": {
    baslik: "Jüpiter ile Satürn: iki gaz devi",
    paragraflar: [
      "İki gezegen de çoğunlukla hidrojen ve helyumdan oluşur, ama Satürn çok daha seyrektir: ortalama yoğunluğu sudan düşüktür. Satürn'ün halkaları çoğunlukla buz parçalarından oluşur; yüz binlerce kilometre genişliğe yayılmalarına karşın kalınlıkları çoğu yerde birkaç on metre ile bir kilometre arasındadır. Jüpiter'in de halkaları vardır ama çok sönüktür.",
      "Jüpiter ile Satürn yaklaşık 20 yılda bir gökyüzünde yan yana görünür; buna büyük kavuşum denir. 21 Aralık 2020'deki kavuşumda iki gezegen arasındaki açı 0,1 dereceye inerek 1623'ten beri en yakın görünümlerine ulaştı. Bir sonraki büyük kavuşum 2040'ta olacak.",
      "Satürn'ü en uzun inceleyen araç, 2004–2017 arasında gezegenin yörüngesinde kalan Cassini sondasıdır; Jüpiter'i ise 2016'dan beri Juno inceliyor.",
    ],
  },
  "mars-ay-karsilastirma": {
    baslik: "Mars ile Ay'ı ayıran özellikler",
    paragraflar: [
      "Ay'ın atmosferi yok denecek kadar incedir; Mars'ın ise çoğu karbondioksit olan ince bir atmosferi vardır. Bu yüzden Mars'ta rüzgâr, toz fırtınaları ve gökyüzünde bulutlar görülür, Ay'da görülmez.",
      "Mars'ın Ay gibi büyük bir uydusu yoktur: iki küçük ve düzensiz biçimli uydusu Phobos ile Deimos'u Asaph Hall 1877'de keşfetti. Phobos Mars'a yavaş yavaş yaklaşmaktadır ve on milyonlarca yıl içinde parçalanması ya da gezegene düşmesi beklenir.",
      "Ay'a 1969–1972 arasında altı Apollo görevinde on iki astronot indi; Mars'a ise şimdiye kadar yalnızca robot araçlar gönderildi.",
    ],
  },
  "pluton-ay-karsilastirma": {
    baslik: "Plüton neden Ay'dan küçük?",
    paragraflar: [
      "Plüton uzun yıllar gezegen sayıldığı için çoğu kişi onun Ay'dan büyük olduğunu düşünür; oysa çapı Ay'ın üçte ikisi kadardır. Güneş Sistemi'nde Plüton'dan büyük yedi uydu vardır: Ganymede, Titan, Callisto, Io, Ay, Europa ve Neptün'ün uydusu Triton.",
      "İkisi arasındaki en büyük fark konumlarıdır: Ay Dünya'nın hemen yanında dolanırken Plüton, Neptün'ün ötesindeki buzlu cisimlerin bulunduğu Kuiper kuşağındadır. Güneş'ten gelen ışık Plüton'a ortalama beş buçuk saatte ulaşır.",
    ],
  },
  "pluton-ceres-karsilastirma": {
    baslik: "İki cüce gezegen: Plüton ve Ceres",
    paragraflar: [
      "Ceres, Mars ile Jüpiter arasındaki asteroit kuşağının en büyük cismi ve kuşaktaki tek cüce gezegendir. Giuseppe Piazzi onu 1 Ocak 1801'de keşfetti; Ceres yaklaşık yarım yüzyıl gezegen olarak listelendi, sonra benzer cisimler bulundukça asteroit sayıldı. 2006'da Plüton'la birlikte cüce gezegen sınıfına alındı.",
      "Plüton ise Neptün'ün ötesindeki Kuiper kuşağındadır ve Ceres'in yaklaşık iki buçuk katı çapındadır. NASA'nın Dawn sondası 2015–2018 arasında Ceres'in yörüngesinde kalarak Occator kraterindeki parlak lekelerin tuz birikintisi olduğunu gösterdi; Plüton'u ise 2015'te yanından geçen New Horizons fotoğrafladı.",
    ],
  },
  "uranus-neptun-karsilastirma": {
    baslik: "Uranüs ile Neptün: iki buz devi",
    paragraflar: [
      "Uranüs ve Neptün boyut olarak neredeyse ikizdir: Uranüs biraz daha geniştir, Neptün ise daha yoğun olduğu için daha ağırdır. İkisine de buz devi denir, çünkü Jüpiter ve Satürn'ün aksine iç kısımları büyük ölçüde su, amonyak ve metan buzlarından oluşur.",
      "Neptün Güneş'ten daha uzak olmasına rağmen içinden daha fazla ısı yayar; Uranüs'ün içinden yaydığı ısı ise dev gezegenler arasında en azdır. Neptün'ün koyu mavi, Uranüs'ün soluk yeşil göründüğü eski fotoğraflar işlenmiş görüntülerdi; 2024'te yayımlanan bir çalışma iki gezegenin gerçek renklerinin birbirine çok yakın, yeşilimsi mavi olduğunu gösterdi.",
      "İki gezegeni de yakından gören tek araç Voyager 2'dir: Uranüs'ün yanından 1986'da, Neptün'ün yanından 1989'da geçti.",
    ],
  },
};
