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
};

export const OZEL_GUN_SAYFALARI = Object.keys(OZEL_GUN_ICERIK);
