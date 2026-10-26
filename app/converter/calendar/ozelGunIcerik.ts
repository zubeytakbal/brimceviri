// Kendi sayfası olan özel günler (/ozel-gunler/<id>). Ekim 2026'da kısa oldukları için özel günler sayfasında
// birleştirilmişlerdi; Search Console'da arama alan dokuzu, her birine özgü bilgiyle geri açıldı. Tarihler
// trTakvim.ts'den hesaplanır; buradaki metin her günün kendi geleneği, süresi ve sık sorulan sorularıdır.

export type OzelGunIcerik = {
  title: string;
  short: string;
  description: string;
  /** Sayfa başlığı (H1). */
  h1: string;
  intro: string;
  /** Bu günle birlikte anılan günler (trTakvim kimlikleri); sıradaki tarihleriyle tablo olur. */
  iliskili: { baslik: string; ids: string[] };
  bolumler: Array<{ id: string; baslik: string; paragraflar: string[] }>;
  sss: Array<{ question: string; answer: string }>;
};

export const OZEL_GUN_ICERIK: Record<string, OzelGunIcerik> = {
  "uc-aylar": {
    title: "Üç Aylar Ne Zaman Başlıyor? Recep, Şaban, Ramazan Takvimi",
    short: "Üç Aylar Ne Zaman Başlıyor?",
    description:
      "Üç aylar hangi gün başlıyor, ne zaman bitiyor? Recep, Şaban ve Ramazan aylarının tarihleri; Regaib, Miraç, Berat kandilleri ve Kadir Gecesi ile tam üç aylar takvimi.",
    h1: "Üç aylar ne zaman başlıyor?",
    intro:
      "Üç aylar, Hicri takvimin Recep, Şaban ve Ramazan aylarıdır. Recep'in ilk günü başlar, Ramazan Bayramı'yla biter; dört mübarek gece ve Ramazan orucu bu döneme düşer.",
    iliskili: {
      baslik: "Üç aylar takvimi",
      ids: ["uc-aylar", "regaib-kandili", "mirac-kandili", "berat-kandili", "ramazan-baslangici", "kadir-gecesi", "ramazan-bayrami"],
    },
    bolumler: [
      {
        id: "aylar",
        baslik: "Recep, Şaban ve Ramazan",
        paragraflar: [
          "Hicri aylar Ay'ın evrelerine göre 29 ya da 30 gün sürdüğü için üç aylar toplam 88–90 gündür. Recep, eski Araplarda savaşın yasak olduğu haram aylardan biridir; Şaban, Ramazan'a hazırlık ayı sayılır; Ramazan ise oruç ayıdır.",
          "Hicri yıl miladi yıldan yaklaşık 11 gün kısa olduğu için üç aylar her yıl 10–11 gün öne gelir. Bu yüzden yaklaşık 33 yılda bir yılın bütün mevsimlerini dolaşır; bir süre kışa, sonra sonbahara denk gelir.",
        ],
      },
      {
        id: "geceler",
        baslik: "Üç aylardaki mübarek geceler",
        paragraflar: [
          "Regaib Kandili Recep'in ilk cuma gecesi, Miraç Kandili 27 Recep gecesi, Berat Kandili 15 Şaban gecesidir. Ramazan'ın 27. gecesi Kadir Gecesi olarak ihya edilir. Kandil geceleri bir önceki günün akşamından başladığı için takvimde kandil, gündüzün değil o akşamın adıdır.",
          "Türkiye'de bu gecelerde camilerde mevlid ve dua programları yapılır, minarelerde mahya yakılır; kandil simidi ve kandil tebriği yaygın geleneklerdir.",
        ],
      },
    ],
    sss: [
      {
        question: "Üç aylar ne zaman biter?",
        answer: "Ramazan ayının son günüyle biter; ertesi gün Ramazan Bayramı'nın ilk günüdür. Tarihler yukarıdaki üç aylar takviminde.",
      },
      {
        question: "Üç aylar kaç gün sürer?",
        answer: "Üç Hicri ay olduğu için 88 ile 90 gün arasında sürer; her ay Ay'ın evresine göre 29 ya da 30 gündür.",
      },
      {
        question: "Üç ayların ilk gecesi hangi kandil?",
        answer: "Üç ayların ilk gecesi değil, Recep'in ilk cuma gecesi Regaib Kandili'dir. Recep'in 1'i cumaya denk gelmiyorsa Regaib birkaç gün sonra olur.",
      },
    ],
  },
  "mevlid-kandili": {
    title: "Mevlid Kandili Ne Zaman? Tarihi, Anlamı ve Mevlid Geleneği",
    short: "Mevlid Kandili Ne Zaman?",
    description:
      "Mevlid Kandili hangi gün, hangi akşam? 12 Rebiülevvel gecesinin yıllara göre tarihleri, Süleyman Çelebi'nin Mevlid'i, kandil gecesi gelenekleri ve sık sorulan sorular.",
    h1: "Mevlid Kandili ne zaman?",
    intro:
      "Mevlid Kandili, Hz. Muhammed'in doğumunun anıldığı gecedir: Hicri takvimde Rebiülevvel ayının 11'ini 12'sine bağlayan gece. Hicri takvim yüzünden her yıl yaklaşık 11 gün öne gelir.",
    iliskili: { baslik: "Mevlid Kandili'nden sonraki dini günler", ids: ["mevlid-kandili", "uc-aylar", "regaib-kandili", "mirac-kandili", "berat-kandili"] },
    bolumler: [
      {
        id: "mevlid",
        baslik: "Mevlid nedir?",
        paragraflar: [
          "Türkiye'de kandil gecesi okunan Mevlid, Süleyman Çelebi'nin 1409'da Bursa'da yazdığı Vesîletü'n-Necât adlı mesnevidir. Hz. Muhammed'in doğumunu anlatan bu eser, zamanla yalnız kandilde değil doğum, ölüm ve hayır törenlerinde de okunur hale gelmiştir.",
          "\"Mevlid\" Arapçada doğum zamanı ve yeri demektir. Halk arasında hem kandil gecesine hem de bu esere mevlid denir.",
        ],
      },
      {
        id: "gece",
        baslik: "Kandil gecesi neden bir gün önce?",
        paragraflar: [
          "Hicri takvimde gün akşam başlar. Doğum günü 12 Rebiülevvel olduğu için kandil, 11 Rebiülevvel'i 12'sine bağlayan akşam, yani miladi takvimde bir önceki günün akşamı kutlanır. Takvimde yazan tarih o akşamın tarihidir.",
        ],
      },
    ],
    sss: [
      {
        question: "Mevlid Kandili resmî tatil mi?",
        answer: "Hayır. Kandiller Türkiye'de resmî tatil değildir; iş ve okullar normal çalışır.",
      },
      {
        question: "Mevlid Kandili her yıl neden farklı günde?",
        answer: "Hicri yıl yaklaşık 354 gün olduğu için Rebiülevvel ayı miladi takvimde her yıl 10–11 gün öne gelir.",
      },
      {
        question: "Mevlid'i kim yazdı?",
        answer: "Türkiye'de okunan Mevlid, Süleyman Çelebi'nin 1409'da tamamladığı Vesîletü'n-Necât'tır.",
      },
    ],
  },
  "asure-gunu": {
    title: "Aşure Günü Ne Zaman? Muharrem'in 10'u, Anlamı ve Aşure Geleneği",
    short: "Aşure Günü Ne Zaman?",
    description:
      "Aşure Günü hangi tarihte? Muharrem ayının 10. gününün yıllara göre tarihleri, Kerbela ve halk inanışlarındaki yeri, aşure pişirip dağıtma geleneği ve sık sorulan sorular.",
    h1: "Aşure Günü ne zaman?",
    intro:
      "Aşure Günü, Hicri yılın ilk ayı Muharrem'in onuncu günüdür. Türkiye'de bu dönemde aşure pişirilip komşulara dağıtılır; Alevi toplumunda Muharrem orucunun ardından aşure lokması olarak paylaşılır.",
    iliskili: { baslik: "Muharrem ve sonraki dini günler", ids: ["hicri-yilbasi", "asure-gunu", "mevlid-kandili", "uc-aylar"] },
    bolumler: [
      {
        id: "anlam",
        baslik: "Aşure Günü'nün anlamı",
        paragraflar: [
          "\"Aşûrâ\" Arapça \"onuncu\" anlamına gelir. Muharrem'in 10'u, 680 yılında Kerbela'da Hz. Hüseyin ve yakınlarının şehit edildiği gündür; bu yüzden Alevi ve Şii gelenekte yas ve anma günüdür. Halk inanışında ise Nuh'un gemisinin tufandan sonra karaya oturduğu ve kalan erzakla ilk aşurenin pişirildiği gün olarak anlatılır.",
        ],
      },
      {
        id: "tatli",
        baslik: "Aşure tatlısı ve dağıtma geleneği",
        paragraflar: [
          "Aşure; buğday, nohut, kuru fasulye, kuru kayısı, incir, üzüm gibi çok sayıda malzemeyle pişirilen bir tatlıdır. Malzemelerin birbirine karışması bereket ve birlik sayılır; pişen aşure en az yedi komşuya ya da çevreye dağıtılır. Muharrem ayı boyunca, yalnız onuncu gün değil, ay içinde de pişirilir.",
        ],
      },
    ],
    sss: [
      {
        question: "Aşure Günü resmî tatil mi?",
        answer: "Hayır, Türkiye'de resmî tatil değildir.",
      },
      {
        question: "Muharrem ayı ne zaman başlar?",
        answer: "Muharrem, Hicri yılın ilk ayıdır; 1 Muharrem Hicri Yılbaşı'dır ve Aşure Günü ondan dokuz gün sonradır. Tarihleri yukarıdaki tabloda.",
      },
      {
        question: "Aşure kaç komşuya dağıtılır?",
        answer: "Gelenekte en az yedi komşuya dağıtılır; kesin bir sayı kuralı yoktur, amaç paylaşmaktır.",
      },
    ],
  },
  "dunya-kadinlar-gunu": {
    title: "Dünya Kadınlar Günü Ne Zaman? 8 Mart'ın Tarihçesi",
    short: "Dünya Kadınlar Günü Ne Zaman?",
    description:
      "8 Mart Dünya Kadınlar Günü hangi güne denk geliyor, tatil mi? Günün tarihçesi, Birleşmiş Milletler'in 1977 kararı ve Türkiye'de kadınların seçme-seçilme hakkını aldığı yıllar.",
    h1: "Dünya Kadınlar Günü ne zaman?",
    intro:
      "Dünya Kadınlar Günü her yıl 8 Mart'tadır; tarihi değişmez, yalnız haftanın günü değişir. Türkiye'de resmî tatil değildir, kadın hakları ve eşitlik için etkinlikler yapılır.",
    iliskili: { baslik: "Mart ayındaki diğer günler", ids: ["dunya-kadinlar-gunu", "kocakari-soguklari", "istiklal-marsi", "tip-bayrami", "canakkale-zaferi", "nevruz"] },
    bolumler: [
      {
        id: "tarihce",
        baslik: "8 Mart'ın tarihçesi",
        paragraflar: [
          "Kadınlar günü fikri 20. yüzyılın başında işçi kadınların çalışma koşulları ve oy hakkı mücadelesiyle doğdu; 1910'da Kopenhag'daki Uluslararası Sosyalist Kadınlar Konferansı her yıl bir kadınlar günü kutlanmasını kararlaştırdı. Birleşmiş Milletler 1975'i Dünya Kadınlar Yılı ilan etti ve 1977'de üye ülkeleri 8 Mart'ı kadın hakları günü olarak kutlamaya çağırdı.",
        ],
      },
      {
        id: "turkiye",
        baslik: "Türkiye'de kadın hakları",
        paragraflar: [
          "Türkiye'de kadınlar 1930'da belediye seçimlerinde, 1934'te milletvekili seçimlerinde seçme ve seçilme hakkı kazandı; 1935 seçimleriyle Meclis'e 18 kadın milletvekili girdi. Bu tarihler, birçok Avrupa ülkesinden önce gelir ve 8 Mart etkinliklerinde sık anılır.",
        ],
      },
    ],
    sss: [
      {
        question: "8 Mart resmî tatil mi?",
        answer: "Hayır, Türkiye'de resmî tatil değildir. Bazı kurumlar kadın çalışanlarına izin verse de bu yasal bir zorunluluk değildir.",
      },
      {
        question: "Dünya Kadınlar Günü neden 8 Mart?",
        answer: "Kutlamalar 1910'lardan itibaren Mart başında yapılıyordu; tarih 1917'den sonra 8 Mart'ta sabitlendi ve Birleşmiş Milletler 1977'de bu günü tanıdı.",
      },
      {
        question: "Türk kadını seçme hakkını ne zaman aldı?",
        answer: "1930'da yerel seçimlerde, 1934'te genel seçimlerde seçme ve seçilme hakkını aldı.",
      },
    ],
  },
  hidirellez: {
    title: "Hıdırellez Ne Zaman? 6 Mayıs Gelenekleri ve Hızır Günleri",
    short: "Hıdırellez Ne Zaman?",
    description:
      "Hıdırellez hangi gece kutlanır? 5 Mayıs'ı 6 Mayıs'a bağlayan gecenin gelenekleri, gül dibine dilek bağlama, ateşten atlama, Hızır günleri ve UNESCO listesindeki yeri.",
    h1: "Hıdırellez ne zaman?",
    intro:
      "Hıdırellez her yıl 5 Mayıs'ı 6 Mayıs'a bağlayan gece kutlanır. Baharın ve bereketin bayramıdır; halk takviminde yılın yaz yarısı olan Hızır günleri 6 Mayıs'ta başlar.",
    iliskili: { baslik: "Halk takviminde sıradaki günler", ids: ["hidirellez", "kasim-gunleri", "erbain", "hamsin", "cemre", "kocakari-soguklari"] },
    bolumler: [
      {
        id: "gelenek",
        baslik: "Hıdırellez gelenekleri",
        paragraflar: [
          "İnanışa göre Hızır ile İlyas peygamberler bu gece yeryüzünde buluşur ve dokundukları yere bereket gelir. Dilekler kâğıda yazılır ya da çizilir, gül ağacının dibine gömülür veya dallarına bağlanır; ertesi sabah güneş doğmadan alınıp akan suya bırakılır. Ateş yakılıp üzerinden atlanır, kırlarda yemek yenir.",
          "Kız ve gençler arasında yaygın olan \"niyet çekme\" (mani söyleyerek küpten yüzük, eşya çekme) da Hıdırellez'e özgüdür.",
        ],
      },
      {
        id: "takvim",
        baslik: "Hızır günleri ve Kasım günleri",
        paragraflar: [
          "Halk takviminde yıl ikiye ayrılır: 6 Mayıs'tan 7 Kasım'a kadar 186 gün Hızır günleri (yaz yarısı), 8 Kasım'dan 5 Mayıs'a kadar 179 gün Kasım günleridir (kış yarısı). Çobanlık sözleşmeleri, ekim ve hasat bu iki tarihe göre yapılırdı.",
        ],
      },
      {
        id: "unesco",
        baslik: "UNESCO listesinde",
        paragraflar: [
          "Hıdırellez, \"Bahar Bayramı Hıdrellez\" adıyla 2017'de Türkiye ve Kuzey Makedonya'nın ortak başvurusuyla UNESCO İnsanlığın Somut Olmayan Kültürel Mirası Temsili Listesi'ne alındı.",
        ],
      },
    ],
    sss: [
      {
        question: "Hıdırellez 5 Mayıs mı, 6 Mayıs mı?",
        answer: "İkisi de: kutlamalar 5 Mayıs akşamı başlar, 6 Mayıs sabahı dilekler suya bırakılır. Takvimde Hıdırellez günü 6 Mayıs olarak yazılır.",
      },
      {
        question: "Hıdırellez'de dilek nasıl dilenir?",
        answer: "Gelenekte dilek kâğıda yazılır ya da çizilir, gül ağacının dibine bırakılır veya dalına bağlanır; sabah güneş doğmadan alınıp akan suya atılır.",
      },
      {
        question: "Hıdırellez resmî tatil mi?",
        answer: "Hayır, resmî tatil değildir; Edirne'deki Kakava şenlikleri gibi yerel etkinliklerle kutlanır.",
      },
    ],
  },
  "kasim-gunleri": {
    title: "Kasım Günleri Ne Zaman Başlar? Halk Takviminde Kış Yarısı",
    short: "Kasım Günleri Ne Zaman Başlar?",
    description:
      "Kasım günleri 8 Kasım'da başlar ve 179 gün sürer. Halk takviminde Hızır ve Kasım günleri, Kasım'ın 50'si gibi sayımlar, çoban ve çiftçi takvimindeki yeri.",
    h1: "Kasım günleri ne zaman başlar?",
    intro:
      "Halk takviminde yılın kış yarısı olan Kasım günleri her yıl 8 Kasım'da başlar ve 5 Mayıs'a, yani Hıdırellez'e kadar sürer. Adı Kasım ayından değil, \"bölen, ayıran\" anlamındaki Arapça kâsım sözcüğünden gelir.",
    iliskili: { baslik: "Kasım günleri boyunca halk takvimi", ids: ["kasim-gunleri", "erbain", "hamsin", "cemre", "kocakari-soguklari", "hidirellez"] },
    bolumler: [
      {
        id: "yil",
        baslik: "Yılın iki yarısı",
        paragraflar: [
          "Anadolu halk takviminde yıl, Hızır (yaz) ve Kasım (kış) günleri olarak ikiye bölünür. Kasım günleri 8 Kasım'dan 5 Mayıs'a kadar 179 gün, Hızır günleri 6 Mayıs'tan 7 Kasım'a kadar 186 gün sürer. Bu iki tarih, Rumi takvimdeki 26 Ekim (Kasım) ve 23 Nisan (Hızır) günlerinin bugünkü karşılığıdır.",
        ],
      },
      {
        id: "sayim",
        baslik: "Günleri Kasım'dan saymak",
        paragraflar: [
          "Köylerde kış boyunca günler Kasım'ın başından sayılır ve \"Kasım'ın 50'si\" gibi deyimler hâlâ kullanılır. Çobanların yıllık anlaşmaları, tarla kiraları ve borçlar eskiden Kasım ya da Hızır günlerinde başlar ve biterdi; kışlık erzak, odun ve hayvan yemi de Kasım gelmeden hazırlanırdı.",
        ],
      },
    ],
    sss: [
      {
        question: "Kasım günleri kaç gün sürer?",
        answer: "179 gün: 8 Kasım'dan 5 Mayıs'a kadar. Ardından 186 gün süren Hızır günleri başlar.",
      },
      {
        question: "Kasım günleri neden 8 Kasım'da başlar?",
        answer: "Halk takvimi eski (Rumi/Jülyen) takvime dayanır. Rumi 26 Ekim, bugünkü takvimde 8 Kasım'a denk gelir.",
      },
      {
        question: "Hızır günleri ne zaman başlar?",
        answer: "6 Mayıs'ta, Hıdırellez günü başlar ve 7 Kasım'a kadar sürer.",
      },
    ],
  },
  cemre: {
    title: "Cemre Ne Zaman Düşer? Havaya, Suya, Toprağa Cemre Tarihleri",
    short: "Cemre Ne Zaman Düşer?",
    description:
      "Cemre 20 Şubat'ta havaya, 27 Şubat'ta suya, 6 Mart'ta toprağa düşer. Yıllara göre cemre tarihleri, cemrenin anlamı, neden her yıl aynı güne denk geldiği ve halk takvimindeki yeri.",
    h1: "Cemre ne zaman düşer?",
    intro:
      "Halk takvimine göre baharın sıcaklığı üç aşamada gelir: cemre 20 Şubat'ta havaya, 27 Şubat'ta suya, 6 Mart'ta toprağa düşer. Tarihler her yıl aynıdır; bazı kaynaklar birer gün önceyi verir.",
    iliskili: { baslik: "Kış sonu ve bahar başında halk takvimi", ids: ["erbain", "hamsin", "cemre", "kocakari-soguklari", "nevruz", "hidirellez"] },
    bolumler: [
      {
        id: "anlam",
        baslik: "Cemre nedir?",
        paragraflar: [
          "Cemre Arapçada \"kor, ateş parçası\" demektir. Halk inanışında Hamsin'in (kışın son 50 günü) içinde yeryüzüne ısı düşer: önce havaya, bir hafta sonra suya, bir hafta sonra toprağa. Cemre toprağa düşünce toprak tavlanır, ağaçlar uyanır ve bahar işleri başlar.",
          "Cemre ölçülen bir sıcaklık değil, yüzyıllık gözleme dayanan bir gelenektir. Yine de 20 Şubat–6 Mart arasında Türkiye'de günlerin belirgin uzaması ve öğle sıcaklıklarının artması bu sezgiyle örtüşür.",
        ],
      },
      {
        id: "tarih",
        baslik: "Cemre neden her yıl aynı günde?",
        paragraflar: [
          "Hicri takvime bağlı dini günlerin aksine cemre güneş yılına bağlıdır; eski Rumi takvimde 7, 14 ve 21 Şubat olan cemre günleri bugünkü takvimde 20, 27 Şubat ve 6 Mart'a denk gelir. Artık yıllarda takvimler arasındaki küçük kayma yüzünden bazı takvimler bir gün önceyi yazar.",
        ],
      },
    ],
    sss: [
      {
        question: "Cemre toprağa ne zaman düşer?",
        answer: "6 Mart'ta (bazı takvimlerde 5 Mart). Havaya düşüşü 20 Şubat, suya düşüşü 27 Şubat'tır.",
      },
      {
        question: "Cemre düşünce havalar ısınır mı?",
        answer: "Genellikle ısınma başlar, ama 11-17 Mart arasındaki kocakarı soğukları gibi geri dönen soğuklar da halk takviminin parçasıdır.",
      },
      {
        question: "Cemre her yıl aynı tarihte mi?",
        answer: "Evet. Güneş yılına bağlı olduğu için miladi takvimde her yıl aynı günlere düşer.",
      },
    ],
  },
  "kocakari-soguklari": {
    title: "Kocakarı Soğukları Ne Zaman? 11-17 Mart ve Berdel Acuz",
    short: "Kocakarı Soğukları Ne Zaman?",
    description:
      "Kocakarı soğukları (Berdel Acuz) ne zaman başlar, kaç gün sürer? 11-17 Mart arasındaki son soğukların efsanesi, kocakarı fırtınası ve halk takvimindeki yeri.",
    h1: "Kocakarı soğukları ne zaman?",
    intro:
      "Kocakarı soğukları, cemreler düşüp havalar ısınmaya başladıktan sonra Mart ortasında gelen kısa ve sert soğuk dönemdir. Halk takviminde 11 Mart'ta başlar, yaklaşık bir hafta (17 Mart'a kadar) sürer.",
    iliskili: { baslik: "Mart'ta halk takvimi ve özel günler", ids: ["cemre", "kocakari-soguklari", "nevruz", "hidirellez"] },
    bolumler: [
      {
        id: "efsane",
        baslik: "Adı nereden geliyor?",
        paragraflar: [
          "Arapça adı Berdel Acuz (berdü'l-acûz), \"yaşlı kadının soğuğu\" demektir. Anlatıya göre baharın geldiğini sanıp keçilerini dağa çıkaran yaşlı bir kadın, ani bastıran kar ve ayazla sürüsünü kaybeder. Bu yüzden Mart'ın ortasında havanın ısınmasına güvenilmemesi gerektiği söylenir: \"Mart kapıdan baktırır, kazma kürek yaktırır.\"",
        ],
      },
      {
        id: "firtina",
        baslik: "Kocakarı fırtınası",
        paragraflar: [
          "Denizcilerin fırtına takviminde aynı döneme Kocakarı fırtınası düşer. Karadeniz ve Marmara'da Mart ortasında poyrazla gelen kar ve fırtına, bu adın yaşamasını sağlamıştır. Fırtına takvimi istatistiksel bir kesinlik değil, gözleme dayalı bir uyarıdır.",
        ],
      },
    ],
    sss: [
      {
        question: "Kocakarı soğukları kaç gün sürer?",
        answer: "Halk takvimine göre yaklaşık bir hafta, 11-17 Mart arası. Gerçek havada her yıl aynı günlere denk gelmez; Mart ortasında geri dönen soğuğa verilen addır.",
      },
      {
        question: "Berdel Acuz ne demek?",
        answer: "Arapça \"yaşlı kadının soğuğu\" demektir; Türkçede kocakarı soğuğu olarak geçer.",
      },
      {
        question: "Kocakarı soğukları cemreden önce mi sonra mı?",
        answer: "Sonra. Cemre 6 Mart'ta toprağa düşer; kocakarı soğukları 11 Mart'ta başlar.",
      },
    ],
  },
  erbain: {
    title: "Erbain Ne Zaman Başlar, Ne Zaman Biter? Kışın 40 Günü",
    short: "Erbain Ne Zaman Başlar?",
    description:
      "Erbain (zemheri) 22 Aralık'ta başlar, 30 Ocak'ta biter: kışın en soğuk 40 günü. Erbain ve Hamsin'in tarihleri, halk takvimindeki yeri ve bu dönemin gerçek sıcaklıklarla ilişkisi.",
    h1: "Erbain ne zaman başlar?",
    intro:
      "Erbain, halk takviminde kışın en sert 40 günüdür: Kış Gündönümü'nün ertesi günü, 22 Aralık'ta başlar ve 30 Ocak'ta biter. Ardından 50 günlük Hamsin gelir.",
    iliskili: { baslik: "Kış boyunca halk takvimi", ids: ["kis", "erbain", "hamsin", "cemre", "kocakari-soguklari"] },
    bolumler: [
      {
        id: "kirk",
        baslik: "Erbain ve Hamsin",
        paragraflar: [
          "Erbain Arapça \"kırk\", Hamsin \"elli\" demektir. Halk takviminde kış bu iki döneme ayrılır: 22 Aralık–30 Ocak arası 40 günlük Erbain (zemheri, karakış) ve 31 Ocak–21 Mart arası 50 günlük Hamsin. Cemreler Hamsin'in içinde düşer, Hamsin bitince bahar gelir.",
        ],
      },
      {
        id: "sicaklik",
        baslik: "Gerçekten en soğuk dönem mi?",
        paragraflar: [
          "Büyük ölçüde evet. Kış Gündönümü'nde güneş en alçaktadır ama toprak ve deniz biriktirdiği ısıyı yavaş kaybettiği için en soğuk günler gündönümünden birkaç hafta sonra, Ocak ayında yaşanır. Türkiye'nin iç ve doğu bölgelerinde yılın en düşük sıcaklıkları çoğunlukla Erbain'e denk gelir.",
        ],
      },
    ],
    sss: [
      {
        question: "Erbain ne zaman biter?",
        answer: "30 Ocak'ta biter; 31 Ocak'ta Hamsin başlar.",
      },
      {
        question: "Zemheri ne demek?",
        answer: "Zemheri, kışın en soğuk dönemi anlamında Erbain'in diğer adıdır; Arapça \"şiddetli soğuk\" anlamındaki zemherîr sözcüğünden gelir.",
      },
      {
        question: "Erbain kaç gün sürer?",
        answer: "Adı gibi 40 gün: 22 Aralık'tan 30 Ocak'a kadar.",
      },
    ],
  },
  yilbasi: {
    title: "Yılbaşı Hangi Gün? 1 Ocak Resmî Tatil ve Yılbaşının Tarihçesi",
    short: "Yılbaşı Hangi Gün?",
    description:
      "Yılbaşı (1 Ocak) bu yıl hangi güne denk geliyor, resmî tatil mi? Türkiye'nin miladi takvime geçtiği 1926 yılı, yılbaşı tatilinin yasal dayanağı ve sık sorulan sorular.",
    h1: "Yılbaşı hangi gün?",
    intro:
      "Yılbaşı her yıl 1 Ocak'tır ve Türkiye'de bir günlük resmî tatildir. Tarih değişmez; yalnızca haftanın hangi gününe denk geldiği her yıl bir gün (artık yıldan sonra iki gün) kayar.",
    iliskili: { baslik: "Kış ve yılbaşı dönemindeki günler", ids: ["yilbasi", "noel", "kis", "erbain", "23-nisan"] },
    bolumler: [
      {
        id: "takvim",
        baslik: "Türkiye miladi takvime ne zaman geçti?",
        paragraflar: [
          "Türkiye 26 Aralık 1925'te kabul edilen 698 sayılı kanunla miladi takvime geçti; kanun 1 Ocak 1926'da yürürlüğe girdi. O tarihe kadar resmî yazışmalarda Rumi ve Hicri takvim kullanılıyordu. Aynı gün kabul edilen 697 sayılı kanunla da günün başlangıcı gece yarısı olarak belirlendi.",
          "Böylece 1 Ocak, yılın ilk günü olarak resmî takvime girdi. Yılbaşı tatili bugün 2429 sayılı Ulusal Bayram ve Genel Tatiller Hakkında Kanun'a dayanır; 31 Aralık ise tatil değildir.",
        ],
      },
      {
        id: "gelenek",
        baslik: "Yılbaşı gelenekleri",
        paragraflar: [
          "Türkiye'de yılbaşı gecesi ailece ya da arkadaşlarla bir araya gelinir, gece yarısı geri sayımla yeni yıla girilir. Milli Piyango'nun yılbaşı çekilişi, çam ağacı süslemek ve hindi ya da fırın yemekleri yaygın geleneklerdir. Çam ağacı ve hediye geleneği Noel'den gelse de Türkiye'de dinî bir anlamı olmadan yeni yılın simgesi olarak benimsenmiştir.",
          "Dünyada yeni yıla ilk giren yerler Pasifik'teki Kiribati'nin Line Adaları (UTC+14), son girenler ise ABD'ye bağlı Baker ve Howland adalarıdır (UTC−12); aralarında 26 saat vardır.",
        ],
      },
    ],
    sss: [
      {
        question: "Yılbaşı resmî tatil mi?",
        answer: "Evet, 1 Ocak Türkiye'de bir günlük resmî tatildir. 31 Aralık tatil değildir, yarım gün de sayılmaz.",
      },
      {
        question: "Türkiye miladi takvime ne zaman geçti?",
        answer: "26 Aralık 1925 tarihli 698 sayılı kanunla; miladi takvim 1 Ocak 1926'da yürürlüğe girdi.",
      },
      {
        question: "Yılbaşına kaç gün kaldı?",
        answer: "Gün, saat ve saniye olarak geri sayım yılbaşı geri sayım sayfasında; tarihin hangi güne denk geldiği yukarıdaki tabloda.",
      },
    ],
  },
  "sevgililer-gunu": {
    title: "Sevgililer Günü Ne Zaman? 14 Şubat'ın Hikâyesi",
    short: "Sevgililer Günü Ne Zaman?",
    description:
      "Sevgililer Günü (14 Şubat) bu yıl hangi güne denk geliyor? Günün adını aldığı Aziz Valentin, 14 Şubat'ın sevgiyle nasıl ilişkilendirildiği ve Türkiye'de tatil olup olmadığı.",
    h1: "Sevgililer Günü ne zaman?",
    intro:
      "Sevgililer Günü her yıl 14 Şubat'tadır; tarih değişmez, yalnızca haftanın günü değişir. Türkiye'de resmî tatil değildir.",
    iliskili: { baslik: "Şubat ve Mart'taki diğer günler", ids: ["sevgililer-gunu", "cemre", "dunya-kadinlar-gunu", "tip-bayrami", "nevruz"] },
    bolumler: [
      {
        id: "tarihce",
        baslik: "Adını nereden alıyor?",
        paragraflar: [
          "Günün adı, 3. yüzyılda Roma'da yaşadığı ve 14 Şubat'ta öldürüldüğü anlatılan Aziz Valentin'den (Valentinus) gelir. Hakkındaki hikâyelerin çoğu efsanedir; Katolik Kilisesi 1969'da bu günü genel azizler takviminden çıkardı.",
          "14 Şubat'ın romantik sevgiyle ilişkilendirildiği bilinen en eski metin, İngiliz şair Geoffrey Chaucer'ın 14. yüzyılda yazdığı ve kuşların bu günde eş seçtiğini anlatan şiiridir. Kart gönderme geleneği 18. ve 19. yüzyılda İngiltere'de yaygınlaştı, basılı kartlar 19. yüzyılda çıktı.",
        ],
      },
      {
        id: "turkiye",
        baslik: "Türkiye'de Sevgililer Günü",
        paragraflar: [
          "Türkiye'de 14 Şubat çiçek, özellikle kırmızı gül ve hediye alışverişinin en yoğun olduğu günlerden biridir. Resmî bir anlamı yoktur, iş ve okul günü olarak geçer.",
        ],
      },
    ],
    sss: [
      {
        question: "Sevgililer Günü resmî tatil mi?",
        answer: "Hayır. Türkiye'de ve dünyanın büyük bölümünde resmî tatil değildir.",
      },
      {
        question: "Sevgililer Günü neden 14 Şubat?",
        answer: "Aziz Valentin'in anma günü 14 Şubat olduğu için. Günün romantik anlam kazanması 14. yüzyıldaki İngiliz edebiyatına dayanır.",
      },
    ],
  },
  "tip-bayrami": {
    title: "Tıp Bayramı Ne Zaman? 14 Mart'ın Tarihçesi",
    short: "Tıp Bayramı Ne Zaman?",
    description:
      "14 Mart Tıp Bayramı bu yıl hangi güne denk geliyor? 1827'de açılan Tıphane-i Âmire, işgal altındaki İstanbul'da 1919'da yapılan ilk kutlama ve bayramın tatil olup olmadığı.",
    h1: "Tıp Bayramı ne zaman?",
    intro:
      "Tıp Bayramı her yıl 14 Mart'ta kutlanır. Türkiye'de resmî tatil değildir; hastanelerde ve tıp fakültelerinde törenler yapılır, sağlık çalışanları anılır.",
    iliskili: { baslik: "Mart ayındaki diğer günler", ids: ["tip-bayrami", "dunya-kadinlar-gunu", "istiklal-marsi", "canakkale-zaferi", "nevruz", "hemsireler-gunu"] },
    bolumler: [
      {
        id: "tarihce",
        baslik: "Neden 14 Mart?",
        paragraflar: [
          "14 Mart 1827'de II. Mahmud döneminde İstanbul Şehzadebaşı'nda Tıphane-i Âmire ve Cerrahhane-i Âmire açıldı. Batılı anlamda hekim yetiştiren ilk okul olan bu kurum, bugünkü İstanbul Üniversitesi Tıp Fakültesi'nin başlangıcı kabul edilir.",
          "14 Mart ilk kez 1919'da, İstanbul işgal altındayken tıp öğrencilerinin düzenlediği bir törenle kutlandı. Tören, işgale karşı bir duruş olarak hatırlanır; o yıldan beri 14 Mart Tıp Bayramı olarak anılır.",
        ],
      },
      {
        id: "bugun",
        baslik: "Bugün nasıl kutlanıyor?",
        paragraflar: [
          "Tıp Bayramı'nda tıp fakültelerinde ve hastanelerde törenler, paneller ve hizmet ödülleri düzenlenir. Gün yalnızca hekimlerin değil, hemşire, ebe, teknisyen ve diğer bütün sağlık çalışanlarının günü olarak kutlanır. Hemşireler ayrıca 12-18 Mayıs'taki Hemşireler Haftası'nda anılır.",
        ],
      },
    ],
    sss: [
      {
        question: "Tıp Bayramı resmî tatil mi?",
        answer: "Hayır, resmî tatil değildir. Hastaneler ve okullar normal çalışır.",
      },
      {
        question: "Tıp Bayramı ilk ne zaman kutlandı?",
        answer: "İlk kez 14 Mart 1919'da, işgal altındaki İstanbul'da tıp öğrencilerinin düzenlediği törenle kutlandı.",
      },
      {
        question: "Tıphane-i Âmire ne zaman açıldı?",
        answer: "14 Mart 1827'de İstanbul'da açıldı; Tıp Bayramı'nın tarihi buradan gelir.",
      },
    ],
  },
  nevruz: {
    title: "Nevruz Ne Zaman? 21 Mart Nevruz Bayramı ve Anlamı",
    short: "Nevruz Ne Zaman?",
    description:
      "Nevruz bu yıl hangi güne denk geliyor? Baharın gelişini kutlayan 21 Mart Nevruz Bayramı'nın gece-gündüz eşitliğiyle ilişkisi, UNESCO listesi ve Türkiye'deki gelenekleri.",
    h1: "Nevruz ne zaman?",
    intro:
      "Nevruz her yıl 21 Mart'ta kutlanır ve baharın gelişini, yeni yılın başlangıcını simgeler. Türkiye'de resmî tatil değildir; ateş üstünden atlama ve bahar şenlikleriyle kutlanır.",
    iliskili: { baslik: "Bahar başındaki günler", ids: ["nevruz", "ilkbahar", "cemre", "canakkale-zaferi", "hidirellez"] },
    bolumler: [
      {
        id: "anlam",
        baslik: "Nevruz ne demek?",
        paragraflar: [
          "Nevruz Farsça \"yeni gün\" demektir. Kuzey yarımkürede gece ile gündüzün eşitlendiği ilkbahar ekinoksuna (20 ya da 21 Mart) denk gelir ve İran'dan Orta Asya'ya, Kafkasya'dan Balkanlar'a kadar geniş bir coğrafyada yeni yılın ve baharın başlangıcı olarak kutlanır.",
          "Türk kültüründe Nevruz, Ergenekon'dan çıkışın ve yeniden doğuşun günü olarak da anılır. Demir dövme, ateş üzerinden atlama, yumurta boyama ve bahar temizliği yaygın geleneklerdir.",
        ],
      },
      {
        id: "unesco",
        baslik: "UNESCO ve Birleşmiş Milletler",
        paragraflar: [
          "Nevruz, Türkiye'nin de aralarında bulunduğu ülkelerin ortak başvurusuyla 2009'da UNESCO İnsanlığın Somut Olmayan Kültürel Mirası Temsili Listesi'ne girdi; liste 2016'da yeni ülkelerin katılımıyla genişletildi. Birleşmiş Milletler Genel Kurulu 2010'da 21 Mart'ı Uluslararası Nevruz Günü ilan etti.",
        ],
      },
    ],
    sss: [
      {
        question: "Nevruz resmî tatil mi?",
        answer: "Türkiye'de resmî tatil değildir. İran, Azerbaycan, Kazakistan, Kırgızistan, Özbekistan ve Türkmenistan gibi ülkelerde ise tatildir.",
      },
      {
        question: "Nevruz neden 21 Mart?",
        answer: "Gece ile gündüzün eşitlendiği ilkbahar ekinoksuna denk geldiği için. Ekinoks bazı yıllar 20 Mart'a düşer; kutlama geleneksel olarak 21 Mart'ta yapılır.",
      },
    ],
  },
  "anneler-gunu": {
    title: "Anneler Günü Ne Zaman? Mayıs'ın İkinci Pazarı",
    short: "Anneler Günü Ne Zaman?",
    description:
      "Anneler Günü bu yıl hangi tarihte? Mayıs ayının ikinci pazarına denk gelen Anneler Günü'nün tarihçesi, Türkiye'de ilk kutlandığı yıl ve sonraki yılların tarihleri.",
    h1: "Anneler Günü ne zaman?",
    intro:
      "Türkiye'de Anneler Günü her yıl Mayıs ayının ikinci pazar günü kutlanır; bu yüzden tarihi her yıl değişir. Pazar gününe denk geldiği için ayrıca tatil sayılmaz.",
    iliskili: { baslik: "Mayıs ve Haziran'daki günler", ids: ["anneler-gunu", "hidirellez", "hemsireler-gunu", "19-mayis", "babalar-gunu"] },
    bolumler: [
      {
        id: "tarihce",
        baslik: "Anneler Günü nereden çıktı?",
        paragraflar: [
          "Bugünkü Anneler Günü, ABD'de Anna Jarvis'in annesi için 1908'de Batı Virginia'nın Grafton kasabasında düzenlediği anma törenine dayanır. Jarvis'in çabalarıyla ABD Başkanı Woodrow Wilson 1914'te Mayıs'ın ikinci pazarını resmî Anneler Günü ilan etti.",
          "Türkiye'de ilk kutlama 1955'te Hürriyet gazetesinin öncülüğünde yapıldı. Bugün Türkiye, ABD ve Almanya gibi pek çok ülkede Mayıs'ın ikinci pazarı kutlanır; İngiltere'de ise Paskalya'dan üç hafta önceki pazar (Mothering Sunday) Anneler Günü'dür.",
        ],
      },
      {
        id: "ulkeler",
        baslik: "Farklı ülkelerde Anneler Günü",
        paragraflar: [
          "Anneler Günü her ülkede aynı gün kutlanmaz. İngiltere ve İrlanda'da Paskalya'dan üç hafta önceki pazar (Mothering Sunday), Mısır ve Arap ülkelerinin çoğunda bahar başı olan 21 Mart, Fransa'da Mayıs'ın son pazarı kutlanır; Fransa'da bu gün Hristiyanların Pentekost bayramına denk gelirse Haziran'ın ilk pazarına kayar.",
          "Yurt dışında yaşayan bir anneye hediye ya da kart gönderecekseniz o ülkenin tarihine bakmak gerekir: örneğin İngiltere'deki Anneler Günü Mart'ta, Türkiye'deki ise Mayıs'tadır.",
        ],
      },
    ],
    sss: [
      {
        question: "İngiltere'de Anneler Günü ne zaman?",
        answer: "İngiltere ve İrlanda'da Anneler Günü (Mothering Sunday) Paskalya'dan üç hafta önceki pazardır; genellikle Mart'a, bazen Nisan başına düşer.",
      },
      {
        question: "Anneler Günü her yıl aynı tarihte mi?",
        answer: "Hayır. Mayıs'ın ikinci pazarı olduğu için tarihi 8 ile 14 Mayıs arasında değişir. Sonraki yılların tarihleri yukarıdaki tabloda.",
      },
      {
        question: "Türkiye'de Anneler Günü ilk ne zaman kutlandı?",
        answer: "İlk kez 1955'te kutlandı.",
      },
    ],
  },
  "babalar-gunu": {
    title: "Babalar Günü Ne Zaman? Haziran'ın Üçüncü Pazarı",
    short: "Babalar Günü Ne Zaman?",
    description:
      "Babalar Günü bu yıl hangi tarihte? Haziran ayının üçüncü pazarına denk gelen Babalar Günü'nün tarihçesi, ilk kutlandığı yer ve sonraki yılların tarihleri.",
    h1: "Babalar Günü ne zaman?",
    intro:
      "Türkiye'de Babalar Günü her yıl Haziran ayının üçüncü pazar günü kutlanır; tarihi her yıl değişir ve 15 ile 21 Haziran arasına düşer.",
    iliskili: { baslik: "Haziran ve yaz başındaki günler", ids: ["babalar-gunu", "anneler-gunu", "cevre-gunu", "yaz", "15-temmuz"] },
    bolumler: [
      {
        id: "tarihce",
        baslik: "Babalar Günü nereden çıktı?",
        paragraflar: [
          "Babalar Günü ilk kez 19 Haziran 1910'da ABD'nin Washington eyaletindeki Spokane şehrinde, Sonora Smart Dodd'un çocuklarını tek başına büyüten babasını onurlandırmak için başlattığı törenle kutlandı. Gün, ABD'de 1972'de Başkan Richard Nixon'ın imzaladığı yasayla Haziran'ın üçüncü pazarı olarak kalıcı hâle geldi.",
          "Türkiye de Haziran'ın üçüncü pazarını kutlar. İtalya, İspanya ve Portekiz gibi Katolik ülkelerde ise Babalar Günü, Aziz Yusuf'un günü olan 19 Mart'tır.",
        ],
      },
      {
        id: "ulkeler",
        baslik: "Farklı ülkelerde Babalar Günü",
        paragraflar: [
          "Haziran'ın üçüncü pazarı ABD, Kanada, İngiltere ve Türkiye gibi pek çok ülkenin tarihidir. Almanya'da Babalar Günü (Vatertag), Paskalya'dan 39 gün sonraki Göğe Yükseliş Perşembesi'ne denk gelir ve o gün zaten resmî tatildir. Avustralya ve Yeni Zelanda'da Eylül'ün ilk pazarı, İtalya, İspanya ve Portekiz'de 19 Mart kutlanır.",
          "Türkiye'de Babalar Günü resmî bir kararla belirlenmiş değildir; ABD'deki tarih benimsenmiştir. Pazar gününe denk geldiği için ayrıca tatil sayılmaz.",
        ],
      },
    ],
    sss: [
      {
        question: "Almanya'da Babalar Günü ne zaman?",
        answer: "Almanya'da Babalar Günü (Vatertag) Göğe Yükseliş Perşembesi'dir; Paskalya'dan 39 gün sonraya denk gelir ve resmî tatildir.",
      },
      {
        question: "Babalar Günü her yıl aynı tarihte mi?",
        answer: "Hayır. Haziran'ın üçüncü pazarı olduğu için 15 ile 21 Haziran arasında değişir. Sonraki yılların tarihleri yukarıdaki tabloda.",
      },
      {
        question: "Babalar Günü tatil mi?",
        answer: "Pazar gününe denk geldiği için ayrıca resmî tatil değildir.",
      },
    ],
  },
  "15-temmuz": {
    title: "15 Temmuz Demokrasi ve Milli Birlik Günü: Tarihçe ve Resmî Tatil",
    short: "15 Temmuz Demokrasi ve Milli Birlik Günü",
    description:
      "15 Temmuz Demokrasi ve Milli Birlik Günü hangi gün, resmî tatil mi? 2016 darbe girişimi, günün resmî tatil olması ve sonraki yıllarda haftanın hangi gününe denk geldiği.",
    h1: "15 Temmuz Demokrasi ve Milli Birlik Günü",
    intro:
      "15 Temmuz, 2016'daki darbe girişiminde hayatını kaybedenleri anmak için ilan edilen Demokrasi ve Milli Birlik Günü'dür. 2017'den beri tam gün resmî tatildir.",
    iliskili: { baslik: "Yaz aylarındaki resmî günler", ids: ["15-temmuz", "30-agustos", "19-mayis", "29-ekim"] },
    bolumler: [
      {
        id: "tarihce",
        baslik: "15 Temmuz 2016'da ne oldu?",
        paragraflar: [
          "15 Temmuz 2016 gecesi Türk Silahlı Kuvvetleri içindeki bir grup, hükümeti devirmek amacıyla darbe girişiminde bulundu. Ankara ve İstanbul başta olmak üzere birçok yerde halk sokaklara çıktı; girişim ertesi sabah bastırıldı. O gece 251 kişi hayatını kaybetti, iki binden fazla kişi yaralandı.",
          "Girişimin ardından İstanbul'daki Boğaziçi Köprüsü'nün adı 15 Temmuz Şehitler Köprüsü olarak değiştirildi. Her yıl 15 Temmuz'da ve öncesindeki günlerde, hayatını kaybedenler için anma programları düzenlenir.",
        ],
      },
      {
        id: "tatil",
        baslik: "Resmî tatil mi?",
        paragraflar: [
          "15 Temmuz Demokrasi ve Milli Birlik Günü, 2016'da yapılan yasal düzenlemeyle Ulusal Bayram ve Genel Tatiller Hakkında Kanun'a eklendi ve ilk kez 2017'de resmî tatil olarak uygulandı. Tam gün tatildir; arefesi yoktur. Hafta sonuna denk geldiği yıllarda başka bir güne kaydırılmaz.",
          "Kamuda çalışanlar için tatildir; özel sektörde resmî tatilde çalışan işçiye İş Kanunu'na göre o gün için ayrıca bir günlük ücret ödenir.",
        ],
      },
    ],
    sss: [
      {
        question: "15 Temmuz resmî tatil mi?",
        answer: "Evet. 2017'den beri tam gün resmî tatildir. Hafta sonuna denk gelirse başka güne kaydırılmaz.",
      },
      {
        question: "15 Temmuz'da kaç kişi hayatını kaybetti?",
        answer: "15 Temmuz 2016 gecesi darbe girişimi sırasında 251 kişi hayatını kaybetti, iki binden fazla kişi yaralandı.",
      },
    ],
  },
  "ataturku-anma": {
    title: "10 Kasım Atatürk'ü Anma Günü: Saat 09.05 ve Anma Haftası",
    short: "10 Kasım Atatürk'ü Anma Günü",
    description:
      "10 Kasım Atatürk'ü Anma Günü bu yıl hangi gün? Saat 09.05'teki saygı duruşu, Atatürk Haftası, 10 Kasım'ın tatil olup olmadığı ve Atatürk'ün Anıtkabir'e nakli.",
    h1: "10 Kasım Atatürk'ü Anma Günü",
    intro:
      "10 Kasım, Mustafa Kemal Atatürk'ün 1938'de hayatını kaybettiği gündür. Her yıl saat 09.05'te sirenler çalar ve bütün ülkede bir dakikalık saygı duruşunda bulunulur.",
    iliskili: { baslik: "Kasım ve Ekim'deki günler", ids: ["ataturku-anma", "29-ekim", "ogretmenler-gunu", "23-nisan", "19-mayis"] },
    bolumler: [
      {
        id: "saat",
        baslik: "Neden saat 09.05?",
        paragraflar: [
          "Atatürk 10 Kasım 1938 Perşembe günü saat 09.05'te İstanbul'daki Dolmabahçe Sarayı'nda, 57 yaşında hayatını kaybetti. Her yıl aynı saatte sirenler çalar, trafik durur ve herkes bulunduğu yerde bir dakikalık saygı duruşunda bulunur. Dolmabahçe Sarayı'ndaki saatler bugün de 09.05'i gösterir.",
          "Okullarda 10–16 Kasım arası Atatürk Haftası olarak anılır; bu hafta boyunca Atatürk'ün hayatı ve ilkeleriyle ilgili etkinlikler düzenlenir. Ankara'da devletin üst düzey temsilcileri anma törenine Anıtkabir'de katılır.",
        ],
      },
      {
        id: "anitkabir",
        baslik: "Anıtkabir'e nakil",
        paragraflar: [
          "Atatürk'ün naaşı 1938'de Ankara'daki Etnografya Müzesi'ne geçici olarak konuldu. Anıtkabir'in yapımı tamamlanınca 10 Kasım 1953'te, vefatının 15. yılında, büyük bir törenle Anıtkabir'e taşındı.",
        ],
      },
    ],
    sss: [
      {
        question: "10 Kasım resmî tatil mi?",
        answer: "Hayır. 10 Kasım bir anma günüdür; okullar ve iş yerleri açıktır. Saat 09.05'te bir dakikalık saygı duruşunda bulunulur.",
      },
      {
        question: "Atatürk kaç yaşında öldü?",
        answer: "1881'de doğan Atatürk, 10 Kasım 1938'de 57 yaşında hayatını kaybetti.",
      },
    ],
  },
};

export const OZEL_GUN_SAYFALARI = Object.keys(OZEL_GUN_ICERIK);
