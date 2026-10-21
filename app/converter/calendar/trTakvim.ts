// Türkiye takvimi: resmî tatiller, dini günler, milli ve özel günler, mevsimler.
// Tarihler kurallardan hesaplanır; dini günler Diyanet takvimiyle doğrulanan Umm al-Qura hesabıyla
// (bayramlar holidays.ts, kandiller: kandil gecesi Hicri günden bir önceki günün akşamıdır).
import {
  gregorianToHijri,
  gregorianToRumi,
  HIJRI_MONTHS_TR,
  RUMI_MONTHS,
  type YMD,
} from "../time/calendars";
import {
  addDaysYmd,
  dayOfYear,
  diffDays,
  isoWeek,
  nthWeekdayYmd,
  weekdayOf,
  ymdKey,
} from "../time/dateMath";
import { turkeyHolidays } from "../time/holidays";
import { moonState, phaseName, type PhaseName } from "../time/moon";
import { mevsimAni, type Mevsim } from "./astro";
import { easterSunday, orthodoxEasterSunday } from "../time/countdownEvents";

export type Kategori =
  | "resmi"
  | "bayram"
  | "dini"
  | "milli"
  | "ozel"
  | "halk"
  | "hristiyan"
  | "mevsim";
export type Gorsel =
  | "bayrak"
  | "ramazan"
  | "kurban"
  | "kandil"
  | "cocuk"
  | "anma"
  | "kalp"
  | "cicek"
  | "kitap"
  | "saglik"
  | "nevruz"
  | "defne"
  | "ilkbahar"
  | "yaz"
  | "sonbahar"
  | "kis"
  | "yilbasi"
  | "isci"
  | "cemre"
  | "hidirellez"
  | "polis"
  | "orman"
  | "firtina"
  | "okul"
  // Deutschland
  | "deutschland"
  | "ostern"
  | "weihnachten"
  | "advent"
  | "karneval"
  | "kirche"
  | "laterne"
  | "kuerbis"
  | "ernte"
  | "uhr"
  | "silvester"
  | "kinder"
  | "kerze"
  | "stern"
  // Saudi-Arabien
  | "diriyah"
  | "watani"
  | "arafat"
  | "fanous"
  | "eid"
  | "hilal"
  | "maas"
  | "madrasa";

type Kural =
  | { tip: "sabit"; ay: number; gun: number }
  | { tip: "coklu"; tarihler: Array<{ ay: number; gun: number; not: string }> }
  | { tip: "haftanin-gunu"; ay: number; haftaGunu: number; kacinci: number }
  | { tip: "hicri"; ay: number; gun: number; kaydir?: number }
  | { tip: "regaib" }
  | { tip: "resmi"; tatilId: string }
  | { tip: "astro"; olay: Mevsim }
  /** Paskalya'ya göre (Batı: Gregoryen hesap, Ortodoks: Jülyen hesap) gün farkı. */
  | { tip: "paskalya"; ortodoks?: boolean; kaydir?: number }
  /** Advent'in ilk pazarı: 25 Aralık'tan önceki dördüncü pazar (27 Kasım – 3 Aralık). */
  | { tip: "advent" };

export type Etkinlik = {
  id: string;
  ad: string;
  kategori: Kategori;
  gorsel: Gorsel;
  kural: Kural;
  /** Resmî tatil durumu */
  tatil: "tam" | "yarim-ve-tam" | "yok";
  kisa: string;
  hakkinda: string;
  /** Mevcut geri sayım sayfası (/geri-sayim/...) */
  geriSayim?: string;
  araclar?: Array<{ href: string; label: string }>;
  /** İlk kutlandığı / resmîleştiği yıl; öncesindeki yıllarda gösterilmez (doğum günü aracı geçmiş yıllara bakar). */
  baslangic?: number;
};

export const KATEGORI_ADI: Record<Kategori, string> = {
  resmi: "Resmî tatil",
  bayram: "Dini bayram",
  dini: "Dini gün",
  milli: "Milli ve anma günü",
  ozel: "Özel gün",
  halk: "Halk takvimi",
  hristiyan: "Hristiyan bayramı",
  mevsim: "Mevsim ve astronomi",
};

const PASKALYA = { href: "/paskalya-ne-zaman", label: "Paskalya ne zaman? (Batı ve Ortodoks)" };

const IZIN = {
  href: "/resmi-tatiller",
  label: "Resmî tatiller ve köprü günleri",
};

export const ETKINLIKLER: Etkinlik[] = [
  {
    id: "yilbasi",
    baslangic: 1926,
    ad: "Yılbaşı",
    kategori: "resmi",
    gorsel: "yilbasi",
    kural: { tip: "sabit", ay: 1, gun: 1 },
    tatil: "tam",
    kisa: "Miladi takvimde yeni yılın ilk günü; tam gün resmî tatil.",
    hakkinda:
      "Türkiye'de miladi takvim ve 1 Ocak yılbaşı 1926'dan beri kullanılır; 1 Ocak 2429 sayılı Kanun'a göre tam gün resmî tatildir. Yılbaşı gecesi 31 Aralık'ı 1 Ocak'a bağlayan gecedir.",
    geriSayim: "yilbasi",
    araclar: [IZIN],
  },
  {
    id: "23-nisan",
    baslangic: 1921,
    ad: "Ulusal Egemenlik ve Çocuk Bayramı",
    kategori: "resmi",
    gorsel: "cocuk",
    kural: { tip: "sabit", ay: 4, gun: 23 },
    tatil: "tam",
    kisa: "TBMM'nin açılışının yıl dönümü; Atatürk'ün çocuklara armağan ettiği bayram.",
    hakkinda:
      "Türkiye Büyük Millet Meclisi 23 Nisan 1920'de Ankara'da açıldı. 1929'dan itibaren çocuk bayramı olarak da kutlanan gün, 1981'den beri \"Ulusal Egemenlik ve Çocuk Bayramı\" adını taşır ve dünyanın dört bir yanından çocukların katıldığı etkinliklerle kutlanır.",
    geriSayim: "23-nisan",
    araclar: [IZIN],
  },
  {
    id: "1-mayis",
    baslangic: 1890,
    ad: "Emek ve Dayanışma Günü",
    kategori: "resmi",
    gorsel: "isci",
    kural: { tip: "sabit", ay: 5, gun: 1 },
    tatil: "tam",
    kisa: "Dünya işçi bayramı; Türkiye'de 2009'dan beri resmî tatil.",
    hakkinda:
      "1 Mayıs, işçilerin haklarının ve dayanışmasının anıldığı uluslararası gündür. Türkiye'de 2009'da \"Emek ve Dayanışma Günü\" adıyla yeniden resmî tatil ilan edilmiştir.",
    geriSayim: "1-mayis",
    araclar: [
      IZIN,
      {
        href: "/brutten-nete-maas-hesaplama",
        label: "Brütten nete maaş hesaplama",
      },
    ],
  },
  {
    id: "19-mayis",
    baslangic: 1938,
    ad: "Atatürk'ü Anma, Gençlik ve Spor Bayramı",
    kategori: "resmi",
    gorsel: "bayrak",
    kural: { tip: "sabit", ay: 5, gun: 19 },
    tatil: "tam",
    kisa: "Mustafa Kemal'in Samsun'a çıkışı ve Kurtuluş Savaşı'nın başlangıcı.",
    hakkinda:
      "Mustafa Kemal 19 Mayıs 1919'da Samsun'a çıkarak Millî Mücadele'yi başlattı. Atatürk bu günü gençliğe armağan etmiş, gün 1938'den itibaren Gençlik ve Spor Bayramı olarak kutlanmıştır.",
    geriSayim: "19-mayis",
    araclar: [IZIN],
  },
  {
    id: "15-temmuz",
    baslangic: 2017,
    ad: "Demokrasi ve Millî Birlik Günü",
    kategori: "resmi",
    gorsel: "bayrak",
    kural: { tip: "sabit", ay: 7, gun: 15 },
    tatil: "tam",
    kisa: "15 Temmuz 2016 darbe girişimine karşı direnişin anma günü.",
    hakkinda:
      "15 Temmuz 2016 gecesi yapılan darbe girişimi sırasında hayatını kaybedenler bu gün anılır. 2017'den beri resmî tatildir.",
    geriSayim: "15-temmuz",
    araclar: [IZIN],
  },
  {
    id: "30-agustos",
    baslangic: 1923,
    ad: "Zafer Bayramı",
    kategori: "resmi",
    gorsel: "bayrak",
    kural: { tip: "sabit", ay: 8, gun: 30 },
    tatil: "tam",
    kisa: "Büyük Taarruz'un zaferle sonuçlandığı Başkomutanlık Meydan Muharebesi.",
    hakkinda:
      "26 Ağustos 1922'de başlayan Büyük Taarruz, 30 Ağustos 1922'de Dumlupınar'daki Başkomutanlık Meydan Muharebesi ile zaferle sonuçlandı. Gün, Türk Silahlı Kuvvetleri Günü olarak da kutlanır.",
    geriSayim: "30-agustos",
    araclar: [IZIN],
  },
  {
    id: "29-ekim",
    baslangic: 1923,
    ad: "Cumhuriyet Bayramı",
    kategori: "resmi",
    gorsel: "bayrak",
    kural: { tip: "sabit", ay: 10, gun: 29 },
    tatil: "yarim-ve-tam",
    kisa: "Cumhuriyet'in ilanı; 28 Ekim öğleden sonra yarım gün, 29 Ekim tam gün tatil.",
    hakkinda:
      "Türkiye Cumhuriyeti 29 Ekim 1923'te ilan edildi ve Mustafa Kemal Atatürk ilk cumhurbaşkanı seçildi. 28 Ekim öğleden sonrası arefe olarak yarım gün, 29 Ekim tam gün resmî tatildir.",
    geriSayim: "29-ekim",
    araclar: [IZIN],
  },
  {
    id: "ramazan-bayrami",
    ad: "Ramazan Bayramı",
    kategori: "bayram",
    gorsel: "ramazan",
    kural: { tip: "resmi", tatilId: "ramazan-bayrami" },
    tatil: "yarim-ve-tam",
    kisa: "Ramazan orucunun ardından Şevval ayının ilk üç günü; arefe yarım gün tatil.",
    hakkinda:
      "Ramazan Bayramı Hicri takvimde 1 Şevval'de başlar ve üç gün sürer; arefe günü öğleden sonra yarım gün tatildir. Hicri yıl güneş yılından yaklaşık 11 gün kısa olduğu için bayram her yıl yaklaşık 11 gün öne gelir. Tarihler Diyanet İşleri Başkanlığı'nın takvimine göredir.",
    geriSayim: "ramazan-bayrami",
    araclar: [
      IZIN,
      { href: "/altin-hesaplama", label: "Altın hesaplama (bayram hediyesi)" },
    ],
  },
  {
    id: "kurban-bayrami",
    ad: "Kurban Bayramı",
    kategori: "bayram",
    gorsel: "kurban",
    kural: { tip: "resmi", tatilId: "kurban-bayrami" },
    tatil: "yarim-ve-tam",
    kisa: "Zilhicce ayının 10'unda başlayan dört günlük bayram; arefe yarım gün tatil.",
    hakkinda:
      "Kurban Bayramı Hicri takvimde 10 Zilhicce'de başlar ve dört gün sürer; arefe günü öğleden sonra yarım gün tatildir. Hacıların Arafat'ta vakfe yaptığı gün arefedir. Bayram her yıl yaklaşık 11 gün öne gelir; tarihler Diyanet İşleri Başkanlığı'nın takvimine göredir.",
    geriSayim: "kurban-bayrami",
    araclar: [IZIN],
  },
  {
    id: "uc-aylar",
    ad: "Üç Ayların Başlangıcı",
    kategori: "dini",
    gorsel: "kandil",
    kural: { tip: "hicri", ay: 7, gun: 1 },
    tatil: "yok",
    kisa: "Recep, Şaban ve Ramazan aylarından oluşan mübarek üç ayların ilk günü (1 Recep).",
    hakkinda:
      "Üç aylar, Hicri takvimde Recep ayının 1'inde başlar ve Ramazan'ın sonuna kadar sürer. Regaib, Miraç ve Berat kandilleri ile Kadir Gecesi bu dönemdedir.",
  },
  {
    id: "regaib-kandili",
    ad: "Regaib Kandili",
    kategori: "dini",
    gorsel: "kandil",
    kural: { tip: "regaib" },
    tatil: "yok",
    kisa: "Recep ayının ilk cumasını önceleyen gece; perşembe akşamı.",
    hakkinda:
      "Regaib Kandili, Recep ayının ilk cuma gününü önceleyen gecedir; bu yüzden perşembe akşamına denk gelir. Kandil geceleri akşam namazıyla başlar.",
    geriSayim: "regaib-kandili",
  },
  {
    id: "mirac-kandili",
    ad: "Miraç Kandili",
    kategori: "dini",
    gorsel: "kandil",
    kural: { tip: "hicri", ay: 7, gun: 27, kaydir: -1 },
    tatil: "yok",
    kisa: "Hz. Muhammed'in miraca yükselişinin anıldığı, 27 Recep'e bağlanan gece.",
    hakkinda:
      "Miraç Kandili, Recep ayının 26. gününü 27. gününe bağlayan gecedir. Takvimde 26 Recep akşamı olarak gösterilir.",
    geriSayim: "mirac-kandili",
  },
  {
    id: "berat-kandili",
    ad: "Berat Kandili",
    kategori: "dini",
    gorsel: "kandil",
    kural: { tip: "hicri", ay: 8, gun: 15, kaydir: -1 },
    tatil: "yok",
    kisa: "Şaban ayının 15. gecesi; 14 Şaban akşamı.",
    hakkinda:
      "Berat Kandili, Şaban ayının 14. gününü 15. gününe bağlayan gecedir ve Ramazan'dan yaklaşık iki hafta önceye denk gelir.",
    geriSayim: "berat-kandili",
  },
  {
    id: "ramazan-baslangici",
    ad: "Ramazan Başlangıcı",
    kategori: "dini",
    gorsel: "ramazan",
    kural: { tip: "hicri", ay: 9, gun: 1 },
    tatil: "yok",
    kisa: "Ramazan ayının ve orucun ilk günü (1 Ramazan).",
    hakkinda:
      "Ramazan, Hicri takvimin dokuzuncu ayıdır. İlk sahur, 1 Ramazan'dan önceki gece yapılır; ay 29 veya 30 gün sürer ve Ramazan Bayramı ile sona erer.",
    geriSayim: "ramazan",
  },
  {
    id: "kadir-gecesi",
    ad: "Kadir Gecesi",
    kategori: "dini",
    gorsel: "kandil",
    kural: { tip: "hicri", ay: 9, gun: 27, kaydir: -1 },
    tatil: "yok",
    kisa: "Kur'an'ın indirilmeye başlandığı kabul edilen gece; 26 Ramazan akşamı.",
    hakkinda:
      "Türkiye'de Kadir Gecesi, Ramazan ayının 26. gününü 27. gününe bağlayan gece olarak idrak edilir ve 26 Ramazan akşamı olarak gösterilir.",
    geriSayim: "kadir-gecesi",
  },
  {
    id: "hicri-yilbasi",
    ad: "Hicri Yılbaşı",
    kategori: "dini",
    gorsel: "kandil",
    kural: { tip: "hicri", ay: 1, gun: 1 },
    tatil: "yok",
    kisa: "Hicri takvimde yeni yılın ilk günü (1 Muharrem).",
    hakkinda:
      "Hicri takvim, Hz. Muhammed'in Mekke'den Medine'ye hicretini başlangıç alır. Yeni yıl 1 Muharrem'de başlar; ay yılı olduğu için her yıl yaklaşık 11 gün önce gelir.",
    araclar: [
      { href: "/tarih-cevirici", label: "Hicri – miladi tarih çevirici" },
    ],
  },
  {
    id: "asure-gunu",
    ad: "Aşure Günü",
    kategori: "dini",
    gorsel: "kandil",
    kural: { tip: "hicri", ay: 1, gun: 10 },
    tatil: "yok",
    kisa: "Muharrem ayının 10. günü; aşure pişirilip komşulara dağıtılır.",
    hakkinda:
      "Aşure Günü, Muharrem ayının onuncu günüdür. Türkiye'de bu dönemde aşure tatlısı pişirip komşulara dağıtmak yaygın bir gelenektir.",
  },
  {
    id: "mevlid-kandili",
    ad: "Mevlid Kandili",
    kategori: "dini",
    gorsel: "kandil",
    kural: { tip: "hicri", ay: 3, gun: 12, kaydir: -1 },
    tatil: "yok",
    kisa: "Hz. Muhammed'in doğumunun anıldığı gece; 11 Rebiülevvel akşamı.",
    hakkinda:
      "Mevlid Kandili, Rebiülevvel ayının 11. gününü 12. gününe bağlayan gecedir. Bu gece mevlid okunur.",
    geriSayim: "mevlid-kandili",
  },
  {
    id: "sevgililer-gunu",
    ad: "Sevgililer Günü",
    kategori: "ozel",
    gorsel: "kalp",
    kural: { tip: "sabit", ay: 2, gun: 14 },
    tatil: "yok",
    kisa: "14 Şubat; sevgililerin birbirine hediye verdiği gün.",
    hakkinda:
      "Sevgililer Günü (Valentine's Day) her yıl 14 Şubat'ta kutlanır; adını Aziz Valentin'den alır. Resmî tatil değildir.",
    geriSayim: "sevgililer-gunu",
  },
  {
    id: "dunya-kadinlar-gunu",
    baslangic: 1977,
    ad: "Dünya Kadınlar Günü",
    kategori: "ozel",
    gorsel: "cicek",
    kural: { tip: "sabit", ay: 3, gun: 8 },
    tatil: "yok",
    kisa: "8 Mart; kadın haklarının ve eşitliğin gündeme taşındığı uluslararası gün.",
    hakkinda:
      "8 Mart, Birleşmiş Milletler'in 1977'de tanıdığı Dünya Kadınlar Günü'dür. Türkiye'de resmî tatil değildir.",
  },
  {
    id: "istiklal-marsi",
    baslangic: 1921,
    ad: "İstiklal Marşı'nın Kabulü ve Mehmet Akif Ersoy'u Anma Günü",
    kategori: "milli",
    gorsel: "bayrak",
    kural: { tip: "sabit", ay: 3, gun: 12 },
    tatil: "yok",
    kisa: "İstiklal Marşı'nın 12 Mart 1921'de TBMM'de kabulü.",
    hakkinda:
      "Mehmet Akif Ersoy'un yazdığı İstiklal Marşı, 12 Mart 1921'de Türkiye Büyük Millet Meclisi'nde millî marş olarak kabul edildi.",
  },
  {
    id: "tip-bayrami",
    baslangic: 1919,
    ad: "Tıp Bayramı",
    kategori: "ozel",
    gorsel: "saglik",
    kural: { tip: "sabit", ay: 3, gun: 14 },
    tatil: "yok",
    kisa: "14 Mart; sağlık çalışanlarının günü.",
    hakkinda:
      "Tıp Bayramı, ilk modern tıp okulu olan Tıphane-i Amire'nin 14 Mart 1827'de açılışının yıl dönümüdür.",
  },
  {
    id: "canakkale-zaferi",
    baslangic: 1915,
    ad: "Şehitleri Anma Günü ve Çanakkale Deniz Zaferi",
    kategori: "milli",
    gorsel: "defne",
    kural: { tip: "sabit", ay: 3, gun: 18 },
    tatil: "yok",
    kisa: "18 Mart 1915'te Çanakkale Boğazı'nda kazanılan deniz zaferi ve şehitlerin anılması.",
    hakkinda:
      "Müttefik donanması 18 Mart 1915'te Çanakkale Boğazı'nı geçmeye çalıştı ve ağır kayıplarla geri çekildi. Gün, tüm şehitlerin anıldığı Şehitleri Anma Günü'dür.",
  },
  {
    id: "nevruz",
    ad: "Nevruz",
    kategori: "ozel",
    gorsel: "nevruz",
    kural: { tip: "sabit", ay: 3, gun: 21 },
    tatil: "yok",
    kisa: "Baharın gelişini kutlayan eski bir Türk ve Orta Asya bayramı.",
    hakkinda:
      "Nevruz, ilkbahar ekinoksu dolayında 21 Mart'ta kutlanır; ateş üzerinden atlamak geleneklerinden biridir. Türkiye'de resmî tatil değildir, Orta Asya'da birçok ülkede tatildir.",
  },
  {
    id: "anneler-gunu",
    ad: "Anneler Günü",
    kategori: "ozel",
    gorsel: "cicek",
    kural: { tip: "haftanin-gunu", ay: 5, haftaGunu: 0, kacinci: 2 },
    tatil: "yok",
    kisa: "Mayıs ayının ikinci pazarı.",
    hakkinda:
      "Türkiye'de Anneler Günü her yıl Mayıs ayının ikinci pazar günü kutlanır; bu yüzden tarihi her yıl değişir.",
    geriSayim: "anneler-gunu",
  },
  {
    id: "babalar-gunu",
    ad: "Babalar Günü",
    kategori: "ozel",
    gorsel: "kalp",
    kural: { tip: "haftanin-gunu", ay: 6, haftaGunu: 0, kacinci: 3 },
    tatil: "yok",
    kisa: "Haziran ayının üçüncü pazarı.",
    hakkinda:
      "Türkiye'de Babalar Günü her yıl Haziran ayının üçüncü pazar günü kutlanır.",
    geriSayim: "babalar-gunu",
  },
  {
    id: "ataturku-anma",
    baslangic: 1939,
    ad: "Atatürk'ü Anma Günü",
    kategori: "milli",
    gorsel: "anma",
    kural: { tip: "sabit", ay: 11, gun: 10 },
    tatil: "yok",
    kisa: "Atatürk'ün vefatının yıl dönümü; saat 09.05'te saygı duruşu.",
    hakkinda:
      "Mustafa Kemal Atatürk 10 Kasım 1938'de saat 09.05'te İstanbul'daki Dolmabahçe Sarayı'nda hayatını kaybetti. Her yıl bu saatte sirenler çalar ve iki dakikalık saygı duruşunda bulunulur.",
  },
  {
    id: "ogretmenler-gunu",
    baslangic: 1981,
    ad: "Öğretmenler Günü",
    kategori: "ozel",
    gorsel: "kitap",
    kural: { tip: "sabit", ay: 11, gun: 24 },
    tatil: "yok",
    kisa: "Atatürk'ün Başöğretmenliği kabul ettiği gün; 1981'den beri kutlanır.",
    hakkinda:
      "Atatürk, 24 Kasım 1928'de Millet Mektepleri Başöğretmenliği'ni kabul etti. Gün 1981'den beri Öğretmenler Günü olarak kutlanır.",
    geriSayim: "ogretmenler-gunu",
  },
  {
    id: "polis-haftasi",
    baslangic: 1845,
    ad: "Türk Polis Teşkilatının Kuruluş Yıl Dönümü",
    kategori: "ozel",
    gorsel: "polis",
    kural: { tip: "sabit", ay: 4, gun: 10 },
    tatil: "yok",
    kisa: "10 Nisan; Türk Polis Teşkilatının kuruluşu, Polis Haftası'nın başlangıcı.",
    hakkinda:
      "Türk Polis Teşkilatı 10 Nisan 1845'te kuruldu. Her yıl 10 Nisan ve onu izleyen hafta Polis Haftası olarak kutlanır. Resmî tatil değildir.",
  },
  {
    id: "hemsireler-gunu",
    baslangic: 1974,
    ad: "Hemşireler Günü",
    kategori: "ozel",
    gorsel: "saglik",
    kural: { tip: "sabit", ay: 5, gun: 12 },
    tatil: "yok",
    kisa: "12 Mayıs; Florence Nightingale'in doğum günü, Uluslararası Hemşireler Günü.",
    hakkinda:
      "Uluslararası Hemşireler Günü, modern hemşireliğin öncüsü Florence Nightingale'in doğum günü olan 12 Mayıs'ta kutlanır. Türkiye'de 12-18 Mayıs Hemşirelik Haftası'dır.",
  },
  {
    id: "cevre-gunu",
    baslangic: 1974,
    ad: "Dünya Çevre Günü",
    kategori: "ozel",
    gorsel: "orman",
    kural: { tip: "sabit", ay: 6, gun: 5 },
    tatil: "yok",
    kisa: "5 Haziran; Birleşmiş Milletler'in çevre farkındalığı günü.",
    hakkinda:
      "Dünya Çevre Günü, Birleşmiş Milletler'in 1972 Stockholm Konferansı'nın açılış günü olan 5 Haziran'da kutlanır. Türkiye'de Haziran'ın ilk haftası Çevre Haftası'dır.",
  },
  {
    id: "gaziler-gunu",
    baslangic: 1921,
    ad: "Gaziler Günü",
    kategori: "milli",
    gorsel: "bayrak",
    kural: { tip: "sabit", ay: 9, gun: 19 },
    tatil: "yok",
    kisa: "19 Eylül; Sakarya Meydan Muharebesi sonrası Mustafa Kemal'e gazilik unvanı verilmesi.",
    hakkinda:
      "Sakarya Meydan Muharebesi'nin kazanılmasının ardından TBMM, 19 Eylül 1921'de Mustafa Kemal'e Mareşal rütbesi ve Gazi unvanı verdi. Gün, tüm gazilerin anıldığı Gaziler Günü'dür.",
  },
  {
    id: "cemre",
    ad: "Cemre Düşmesi",
    kategori: "halk",
    gorsel: "cemre",
    kural: {
      tip: "coklu",
      tarihler: [
        { ay: 2, gun: 20, not: "havaya" },
        { ay: 2, gun: 27, not: "suya" },
        { ay: 3, gun: 6, not: "toprağa" },
      ],
    },
    tatil: "yok",
    kisa: "Halk takvimine göre cemre 20 Şubat'ta havaya, 27 Şubat'ta suya, 6 Mart'ta toprağa düşer.",
    hakkinda:
      "Cemre, halk inanışında baharın gelişini müjdeleyen ısının sırasıyla havaya, suya ve toprağa düşmesidir. Birer hafta arayla düşen cemreler, eski (Rumi) takvime dayandığı için her yıl aynı miladi tarihlere denk gelir; bazı kaynaklar bir gün önceyi (19 Şubat, 26 Şubat, 5 Mart) verir. Bilimsel bir ölçüm değil, uzun gözlemlere dayanan bir gelenektir.",
    araclar: [
      { href: "/firtina-takvimi", label: "Fırtına takvimi ve halk takvimi" },
    ],
  },
  {
    id: "hamsin",
    ad: "Hamsin'in Başlangıcı",
    kategori: "halk",
    gorsel: "kis",
    kural: { tip: "sabit", ay: 1, gun: 31 },
    tatil: "yok",
    kisa: "Erbain'in ardından gelen, 31 Ocak'tan 21 Mart'a kadar süren 50 günlük kış dönemi.",
    hakkinda:
      "Hamsin (Arapça \"elli\"), halk takviminde kışın ikinci dönemidir: Erbain'in bitişiyle 31 Ocak'ta başlar ve 21 Mart'a kadar 50 gün sürer. Soğuklar Erbain kadar sert değildir; cemreler ve Kocakarı soğukları bu dönemdedir.",
    araclar: [
      { href: "/firtina-takvimi", label: "Fırtına takvimi ve halk takvimi" },
    ],
  },
  {
    id: "kocakari-soguklari",
    ad: "Kocakarı Soğukları",
    kategori: "halk",
    gorsel: "kis",
    kural: { tip: "sabit", ay: 3, gun: 11 },
    tatil: "yok",
    kisa: "Baharın gelişinden sonra 11-17 Mart arasında görülen, halk arasında Berdül Acuz denen son soğuklar.",
    hakkinda:
      "Kocakarı soğukları (Berdül Acuz), halk takvimine göre Mart ayında havalar ısınmaya başladıktan sonra yaşanan kısa ve sert soğuk dönemdir; genellikle 11-17 Mart arasına denk gelir ve denizcilerin fırtına takviminde Kocakarı fırtınası olarak da geçer.",
    araclar: [{ href: "/firtina-takvimi", label: "Fırtına takvimi" }],
  },
  {
    id: "hidirellez",
    ad: "Hıdırellez",
    kategori: "halk",
    gorsel: "hidirellez",
    kural: { tip: "sabit", ay: 5, gun: 6 },
    tatil: "yok",
    kisa: "5 Mayıs'ı 6 Mayıs'a bağlayan gece kutlanan bahar bayramı; Hızır günlerinin başlangıcı.",
    hakkinda:
      "Hıdırellez, Hızır ile İlyas'ın buluştuğuna inanılan ve baharın, bereketin kutlandığı eski bir bayramdır. 5 Mayıs'ı 6 Mayıs'a bağlayan gece ateş üzerinden atlanır, dilekler gül ağacına bağlanır. Halk takviminde yıl, 6 Mayıs'ta başlayan Hızır günleri ve 8 Kasım'da başlayan Kasım günleri olarak ikiye ayrılır. Hıdırellez, UNESCO İnsanlığın Somut Olmayan Kültürel Mirası listesindedir.",
    araclar: [
      {
        href: "/firtina-takvimi",
        label: "Halk takvimi: Hızır ve Kasım günleri",
      },
    ],
  },
  {
    id: "kasim-gunleri",
    ad: "Kasım Günlerinin Başlangıcı",
    kategori: "halk",
    gorsel: "sonbahar",
    kural: { tip: "sabit", ay: 11, gun: 8 },
    tatil: "yok",
    kisa: "Halk takviminde yılın kış yarısı: 8 Kasım'dan 5 Mayıs'a kadar süren Kasım günleri.",
    hakkinda:
      "Halk takviminde yıl ikiye ayrılır: 6 Mayıs'ta (Hıdırellez) başlayan yaz yarısı Hızır günleri, 8 Kasım'da başlayan kış yarısı Kasım günleridir. Çiftçiler ekim ve hasat zamanlarını, çobanların anlaşmaları ise bu iki tarihe göre belirlerdi; \"Kasım'ın 50'si\" gibi günler hâlâ kullanılır.",
    araclar: [
      {
        href: "/firtina-takvimi",
        label: "Halk takvimi: Hızır ve Kasım günleri",
      },
    ],
  },
  {
    id: "erbain",
    ad: "Erbain'in Başlangıcı",
    kategori: "halk",
    gorsel: "kis",
    kural: { tip: "sabit", ay: 12, gun: 22 },
    tatil: "yok",
    kisa: "Kışın en sert 40 günü: 22 Aralık'tan 30 Ocak'a kadar süren Erbain (zemheri).",
    hakkinda:
      "Erbain (Arapça \"kırk\"), halk takviminde kışın en soğuk ve karlı 40 günlük dönemidir; Kış Gündönümü'nün ertesi günü 22 Aralık'ta başlar, 30 Ocak'ta biter. Zemheri veya karakış olarak da anılır. Ardından 50 günlük Hamsin gelir.",
    araclar: [
      { href: "/firtina-takvimi", label: "Fırtına takvimi ve halk takvimi" },
    ],
  },
  // Hristiyan bayramları: Türkiye'deki Ermeni, Rum Ortodoks, Süryani, Katolik ve Protestan toplulukların günleri.
  {
    id: "paskalya",
    ad: "Paskalya",
    kategori: "hristiyan",
    gorsel: "ostern",
    kural: { tip: "paskalya" },
    tatil: "yok",
    kisa: "İsa'nın dirilişinin kutlandığı bayram; Katolik, Protestan ve Ermeni kiliseleri (Batı hesabı).",
    hakkinda:
      "Paskalya, 21 Mart'tan sonraki ilk dolunayı izleyen pazar günüdür ve 22 Mart ile 25 Nisan arasında değişir. Türkiye'de Ermeni Patrikhanesi, Katolik ve Protestan kiliseleri bu Gregoryen (Batı) tarihi kullanır; Ermeniler bayrama Surp Zadik der.",
    geriSayim: "paskalya",
    araclar: [PASKALYA],
  },
  {
    id: "ortodoks-paskalyasi",
    ad: "Ortodoks Paskalyası",
    kategori: "hristiyan",
    gorsel: "ostern",
    kural: { tip: "paskalya", ortodoks: true },
    tatil: "yok",
    kisa: "Rum Ortodoks ve Süryanilerin Paskalyası; Jülyen hesabıyla bulunur.",
    hakkinda:
      "Ortodoks kiliseleri Paskalya'yı Jülyen takvimine göre hesaplar; bu yüzden Batı Paskalyası ile aynı gün ya da 1-5 hafta sonra kutlanır. Türkiye'de Fener Rum Patrikhanesi'ne bağlı Rum Ortodokslar ve Mardin, Midyat gibi yerlerdeki Süryaniler bu tarihi kullanır.",
    geriSayim: "ortodoks-paskalyasi",
    araclar: [PASKALYA],
  },
  {
    id: "kul-carsambasi",
    ad: "Kül Çarşambası",
    kategori: "hristiyan",
    gorsel: "kerze",
    kural: { tip: "paskalya", kaydir: -46 },
    tatil: "yok",
    kisa: "Katolik ve Protestanlarda Büyük Perhizin (40 günlük oruç) ilk günü.",
    hakkinda:
      "Kül Çarşambası, Batı Paskalyası'ndan 46 gün öncedir ve Büyük Perhizin başladığı gündür. Ayinde rahip katılanların alnına külle haç işareti yapar. Perhizdeki pazar günleri oruçtan sayılmadığı için 46 gün, 40 günlük oruca karşılık gelir.",
    araclar: [PASKALYA],
  },
  {
    id: "temiz-pazartesi",
    ad: "Büyük Perhiz Başlangıcı (Ortodoks)",
    kategori: "hristiyan",
    gorsel: "kerze",
    kural: { tip: "paskalya", ortodoks: true, kaydir: -48 },
    tatil: "yok",
    kisa: "Ortodoks kiliselerinde Büyük Perhizin ilk günü (Temiz Pazartesi).",
    hakkinda:
      "Ortodoks Büyük Perhizi, Ortodoks Paskalyası'ndan 48 gün önceki pazartesi başlar; bu güne Temiz Pazartesi (Kathara Deftera) denir. Perhiz Paskalya'ya kadar sürer ve son haftası Kutsal Hafta'dır.",
    araclar: [PASKALYA],
  },
  {
    id: "goge-yukselis",
    ad: "Göğe Yükseliş",
    kategori: "hristiyan",
    gorsel: "kirche",
    kural: { tip: "paskalya", kaydir: 39 },
    tatil: "yok",
    kisa: "İsa'nın göğe yükselişi; Batı Paskalyası'ndan 39 gün sonraki perşembe.",
    hakkinda:
      "Göğe Yükseliş, Paskalya'dan 40. gün (Paskalya günü birinci gün sayılır) kutlanır ve her zaman perşembeye denk gelir. Bu tarih Batı kiliselerine göredir; Ortodoks kiliseleri aynı bayramı Ortodoks Paskalyası'ndan 39 gün sonra kutlar.",
    araclar: [PASKALYA],
  },
  {
    id: "pentekost",
    ad: "Pentekost",
    kategori: "hristiyan",
    gorsel: "kirche",
    kural: { tip: "paskalya", kaydir: 49 },
    tatil: "yok",
    kisa: "Kutsal Ruh'un inişinin anıldığı bayram; Batı Paskalyası'ndan 7 hafta sonraki pazar.",
    hakkinda:
      "Pentekost (Hamsin, Yunanca \"ellinci\"), Paskalya'dan sonraki ellinci gündür ve Kutsal Ruh'un havarilere inişini anar. Bu tarih Batı kiliselerine göredir; Ortodoks kiliseleri Pentekost'u Ortodoks Paskalyası'ndan 49 gün sonra kutlar.",
    araclar: [PASKALYA],
  },
  {
    id: "advent",
    ad: "Advent'in Başlangıcı",
    kategori: "hristiyan",
    gorsel: "advent",
    kural: { tip: "advent" },
    tatil: "yok",
    kisa: "Noel'e hazırlık dönemi; 25 Aralık'tan önceki dördüncü pazar.",
    hakkinda:
      "Advent, Katolik ve Protestan kiliselerinde Noel'e hazırlık dönemidir ve Noel'den önceki dördüncü pazar günü başlar; bu gün 27 Kasım ile 3 Aralık arasına denk gelir. Kilise yılı da Advent'in ilk pazarıyla başlar. Her pazar Advent çelengindeki bir mum yakılır.",
  },
  {
    id: "aya-yorgi",
    ad: "Aya Yorgi",
    kategori: "hristiyan",
    gorsel: "kirche",
    kural: {
      tip: "coklu",
      tarihler: [
        { ay: 4, gun: 23, not: "Aziz Yorgi yortusu" },
        { ay: 9, gun: 24, not: "sonbahar ziyareti" },
      ],
    },
    tatil: "yok",
    kisa: "Büyükada'daki Aya Yorgi Kilisesi'ne dilek ziyareti günleri.",
    hakkinda:
      "Büyükada'nın Yüce Tepe'sindeki Aya Yorgi Kilisesi her yıl 23 Nisan ve 24 Eylül'de binlerce ziyaretçi ağırlar. 23 Nisan Aziz Yorgi'nin yortusudur. Geleneğe göre yokuşta ağaçlara bağlanan ip kopmadan kiliseye kadar götürülürse dilek kabul olur; ziyaretçilerin çoğu Hristiyan değildir.",
    geriSayim: "aya-yorgi",
  },
  {
    id: "meryem-ana",
    ad: "Meryem Ana'nın Göğe Alınışı",
    kategori: "hristiyan",
    gorsel: "kirche",
    kural: { tip: "sabit", ay: 8, gun: 15 },
    tatil: "yok",
    kisa: "Katolik ve Ortodoks kiliselerinde Meryem Ana bayramı; Ermeniler en yakın pazar günü kutlar.",
    hakkinda:
      "15 Ağustos, Katolik kilisesinde Meryem'in Göğe Alınışı, Ortodoks kilisesinde Meryem'in Uyuyuşu olarak kutlanır. Türkiye'de Efes'teki Meryem Ana Evi ve Trabzon'daki Sümela Manastırı'nda bu güne bağlı ayinler yapılabilir. Ermeni Kilisesi bayramı (Surp Asdvadzadzin, halk arasında Üzüm Bayramı) 15 Ağustos'a en yakın pazar günü kutlar ve o gün üzüm kutsanır.",
  },
  {
    id: "noel",
    ad: "Noel",
    kategori: "hristiyan",
    gorsel: "weihnachten",
    kural: { tip: "sabit", ay: 12, gun: 25 },
    tatil: "yok",
    kisa: "İsa'nın doğumu; Katolik, Protestan ve Rum Ortodokslar 25 Aralık'ta kutlar.",
    hakkinda:
      "Noel, İsa'nın doğumunun kutlandığı bayramdır. Katolikler, Protestanlar ve Fener Rum Patrikhanesi'ne bağlı Rum Ortodokslar 25 Aralık'ta kutlar. Ermeniler 6 Ocak'ta, Jülyen takvimini kullanan Rus, Sırp ve Gürcü kiliseleri 7 Ocak'ta kutlar.",
    geriSayim: "noel",
  },
  {
    id: "ermeni-noeli",
    ad: "Ermeni Noeli (Surp Dznunt)",
    kategori: "hristiyan",
    gorsel: "weihnachten",
    kural: { tip: "sabit", ay: 1, gun: 6 },
    tatil: "yok",
    kisa: "Türkiye Ermenilerinin Noeli; doğum ve vaftiz aynı gün anılır.",
    hakkinda:
      "Türkiye Ermenileri Noel'i 6 Ocak'ta Surp Dznunt adıyla kutlar. Ermeni Kilisesi, erken kilise geleneğindeki gibi İsa'nın doğumunu ve vaftizini aynı gün anar; ayinden sonra su kutsama töreni yapılır. Bu gün Rum Ortodokslar için Epifani (Theofania) bayramıdır.",
    geriSayim: "ermeni-noeli",
  },
  {
    id: "julyen-noeli",
    ad: "Ortodoks Noeli (Jülyen takvimi)",
    kategori: "hristiyan",
    gorsel: "weihnachten",
    kural: { tip: "sabit", ay: 1, gun: 7 },
    tatil: "yok",
    kisa: "Jülyen takvimini kullanan Rus, Sırp ve Gürcü Ortodoks kiliselerinin Noeli.",
    hakkinda:
      "Jülyen takviminde 25 Aralık, bugünkü takvimde 7 Ocak'a denk gelir (aradaki fark 2100'e kadar 13 gündür). Rus, Sırp, Gürcü Ortodoks kiliseleri ve Kudüs Patrikhanesi Noel'i bu tarihte kutlar; Türkiye'de özellikle Rusça konuşan Ortodoks topluluklar için önemlidir.",
  },
  {
    id: "ilkbahar",
    ad: "İlkbahar Ekinoksu",
    kategori: "mevsim",
    gorsel: "ilkbahar",
    kural: { tip: "astro", olay: "mart-ekinoksu" },
    tatil: "yok",
    kisa: "Gece ile gündüzün eşitlendiği, astronomik ilkbaharın başladığı an.",
    hakkinda:
      "Mart ekinoksunda Güneş gök ekvatorunu güneyden kuzeye geçer; Kuzey Yarımküre'de ilkbahar başlar ve gece ile gündüz yaklaşık eşit olur.",
    geriSayim: "ilkbahar",
  },
  {
    id: "yaz",
    ad: "Yaz Gündönümü",
    kategori: "mevsim",
    gorsel: "yaz",
    kural: { tip: "astro", olay: "haziran-gundonumu" },
    tatil: "yok",
    kisa: "Yılın en uzun gündüzü; astronomik yazın başlangıcı.",
    hakkinda:
      "Haziran gündönümünde Güneş öğle vakti yılın en yüksek noktasına çıkar; Kuzey Yarımküre'de en uzun gündüz yaşanır ve astronomik yaz başlar.",
    geriSayim: "yaz",
  },
  {
    id: "sonbahar",
    ad: "Sonbahar Ekinoksu",
    kategori: "mevsim",
    gorsel: "sonbahar",
    kural: { tip: "astro", olay: "eylul-ekinoksu" },
    tatil: "yok",
    kisa: "Gece ile gündüzün yeniden eşitlendiği, astronomik sonbaharın başladığı an.",
    hakkinda:
      "Eylül ekinoksunda Güneş gök ekvatorunu kuzeyden güneye geçer; Kuzey Yarımküre'de sonbahar başlar ve bundan sonra geceler gündüzlerden uzundur.",
    geriSayim: "sonbahar",
  },
  {
    id: "kis",
    ad: "Kış Gündönümü",
    kategori: "mevsim",
    gorsel: "kis",
    kural: { tip: "astro", olay: "aralik-gundonumu" },
    tatil: "yok",
    kisa: "Yılın en uzun gecesi; astronomik kışın başlangıcı.",
    hakkinda:
      "Aralık gündönümünde Güneş öğle vakti yılın en alçak noktasındadır; Kuzey Yarımküre'de en uzun gece yaşanır ve astronomik kış başlar.",
    geriSayim: "kis",
  },
];

export const findEtkinlik = (id: string) =>
  ETKINLIKLER.find((e) => e.id === id) ?? null;

const ISTANBUL_MS = 3 * 3600000;
const istanbulGunu = (d: Date): YMD => {
  const t = new Date(d.getTime() + ISTANBUL_MS);
  return {
    year: t.getUTCFullYear(),
    month: t.getUTCMonth() + 1,
    day: t.getUTCDate(),
  };
};

function hicriGunleri(year: number, ay: number, gun: number): YMD[] {
  const out: YMD[] = [];
  for (
    let d = { year, month: 1, day: 1 };
    d.year === year;
    d = addDaysYmd(d, 1)
  ) {
    const h = gregorianToHijri(d);
    if (h.month === ay && h.day === gun) out.push(d);
  }
  return out;
}

// Diyanet'in yayımladığı ve Umm al-Qura hesabından farklı olan tarihler (Diyanet takvimi esas alınır).
// 2026 ve 2027 tüm dini günler Diyanet ile karşılaştırıldı; sonraki yıllar Diyanet yayımlayana kadar tahminidir.
export const DINI_DOGRULANAN = 2027;
const DIYANET_DUZELTME: Record<string, Record<number, string[]>> = {
  "ramazan-baslangici": { 2026: ["2026-02-19"] },
  "kadir-gecesi": { 2026: ["2026-03-16"] },
};

const ymdParse = (k: string): YMD => {
  const [y, m, g] = k.split("-").map(Number);
  return { year: y, month: m, day: g };
};

export type Tarihli = {
  etkinlik: Etkinlik;
  tarih: YMD;
  bitis?: YMD;
  saat?: Date;
  not?: string;
  tahmini?: boolean;
};

/** Tarihli etkinliğin görünen adı: "Cemre Düşmesi (suya)". */
export const tarihliAd = (t: Tarihli) =>
  t.not ? `${t.etkinlik.ad} (${t.not})` : t.etkinlik.ad;

/** Bir etkinliğin yıl içindeki tarih(ler)i. */
export function etkinlikTarihleri(e: Etkinlik, year: number): Tarihli[] {
  if (e.baslangic && year < e.baslangic) return [];
  const k = e.kural;
  switch (k.tip) {
    case "sabit":
      return [{ etkinlik: e, tarih: { year, month: k.ay, day: k.gun } }];
    case "coklu":
      return k.tarihler.map((t) => ({
        etkinlik: e,
        tarih: { year, month: t.ay, day: t.gun },
        not: t.not,
      }));
    case "haftanin-gunu":
      return [
        {
          etkinlik: e,
          tarih: nthWeekdayYmd(year, k.ay, k.haftaGunu, k.kacinci),
        },
      ];
    case "hicri": {
      const duz = DIYANET_DUZELTME[e.id]?.[year];
      if (duz) return duz.map((k) => ({ etkinlik: e, tarih: ymdParse(k) }));
      return [
        ...hicriGunleri(year, k.ay, k.gun),
        ...hicriGunleri(year + 1, k.ay, k.gun),
      ]
        .map((d) => addDaysYmd(d, k.kaydir ?? 0))
        .filter((d) => d.year === year)
        .map((tarih) => ({
          etkinlik: e,
          tarih,
          tahmini: year > DINI_DOGRULANAN,
        }));
    }
    case "regaib": {
      const out: Tarihli[] = [];
      for (
        let d = { year, month: 1, day: 1 };
        d.year === year;
        d = addDaysYmd(d, 1)
      ) {
        // İlk cuma: Recep ayında ve Recep'in ilk 7 günü içinde
        const h = gregorianToHijri(d);
        if (h.month === 7 && h.day <= 7 && weekdayOf(d) === 5)
          out.push({
            etkinlik: e,
            tarih: addDaysYmd(d, -1),
            tahmini: year > DINI_DOGRULANAN,
          });
      }
      // Recep'in ilk cuması yılın ilk günlerindeyse perşembe önceki yıla düşebilir
      return out.filter((x) => x.tarih.year === year);
    }
    case "resmi": {
      const gunler = turkeyHolidays(year).filter(
        (h) => h.id === k.tatilId && h.kind === "full",
      );
      if (!gunler.length) return [];
      return [
        {
          etkinlik: e,
          tarih: gunler[0].date,
          bitis: gunler[gunler.length - 1].date,
          tahmini: gunler[0].estimated,
        },
      ];
    }
    case "paskalya": {
      const p = k.ortodoks ? orthodoxEasterSunday(year) : easterSunday(year);
      return [{ etkinlik: e, tarih: addDaysYmd({ year: p.year, month: p.month, day: p.day }, k.kaydir ?? 0) }];
    }
    case "advent": {
      const noel = { year, month: 12, day: 25 };
      return [{ etkinlik: e, tarih: addDaysYmd(noel, -(weekdayOf(noel) || 7) - 21) }];
    }
    case "astro": {
      const an = mevsimAni(year, k.olay);
      return [{ etkinlik: e, tarih: istanbulGunu(an), saat: an }];
    }
  }
}

/** Yılın tüm etkinlikleri tarih sırasıyla (bayramlar ilk gününe göre). */
export function yilEtkinlikleri(year: number): Tarihli[] {
  return ETKINLIKLER.flatMap((e) => etkinlikTarihleri(e, year)).sort((a, b) =>
    ymdKey(a.tarih).localeCompare(ymdKey(b.tarih)),
  );
}

const cache = new Map<number, Map<string, Tarihli[]>>();

/** Gün → o güne düşen etkinlikler (bayramların tüm günleri dahil). */
export function gunHaritasi(year: number) {
  let m = cache.get(year);
  if (m) return m;
  m = new Map();
  for (const t of yilEtkinlikleri(year)) {
    const son = t.bitis ?? t.tarih;
    for (let d = t.tarih; diffDays(d, son) >= 0; d = addDaysYmd(d, 1)) {
      const key = ymdKey(d);
      m.set(key, [...(m.get(key) ?? []), t]);
    }
  }
  cache.set(year, m);
  return m;
}

export const AY_ADLARI = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];
export const AY_SLUG = [
  "ocak",
  "subat",
  "mart",
  "nisan",
  "mayis",
  "haziran",
  "temmuz",
  "agustos",
  "eylul",
  "ekim",
  "kasim",
  "aralik",
];
export const GUN_ADLARI = [
  "Pazar",
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
];

/** Takvim sayfası olan yıllar (Diyanet'in yayımladığı yıllar + bir sonraki). */
export const TAKVIM_YILLARI = [2026, 2027, 2028];

export const takvimYilPath = (y: number) => `/takvim/${y}`;
export const takvimAyPath = (y: number, m: number) =>
  `/takvim/${y}/${AY_SLUG[m - 1]}`;
/** Özel günü olan her günün kendi sayfası var (birleştirmeden sonra 21 Ekim 2026'da geri getirildi). */
export const takvimGunPath = (d: YMD) =>
  `/takvim/${d.year}/${AY_SLUG[d.month - 1]}/${d.day}`;
/** Her özel günün kendi sayfası var; arama alan 9 günün özgün içeriği ozelGunIcerik.ts'de. */
export const ozelGunPath = (id: string) => `/ozel-gunler/${id}`;

export const AY_EVRE_ADI: Record<PhaseName, string> = {
  new: "Yeni ay",
  "waxing-crescent": "Büyüyen hilal",
  first: "İlk dördün",
  "waxing-gibbous": "Büyüyen şişkin ay",
  full: "Dolunay",
  "waning-gibbous": "Küçülen şişkin ay",
  last: "Son dördün",
  "waning-crescent": "Küçülen hilal",
};

/** Bir günün takvim bilgileri. */
export function gunBilgisi(d: YMD) {
  const hicri = gregorianToHijri(d);
  const rumi = gregorianToRumi(d);
  const ay = moonState(new Date(Date.UTC(d.year, d.month - 1, d.day, 9)));
  const doy = dayOfYear(d);
  const yilGunu = diffDays(
    { year: d.year, month: 1, day: 1 },
    { year: d.year + 1, month: 1, day: 1 },
  );
  return {
    gunAdi: GUN_ADLARI[weekdayOf(d)],
    hicri,
    hicriMetin: `${hicri.day} ${HIJRI_MONTHS_TR[hicri.month - 1]} ${hicri.year}`,
    rumiMetin: rumi
      ? `${rumi.day} ${RUMI_MONTHS[rumi.month - 1]} ${rumi.year}`
      : null,
    ayEvresi: AY_EVRE_ADI[phaseName(ay.age)],
    ayAydinlik: ay.illumination,
    hafta: isoWeek(d).week,
    yilinGunu: doy,
    kalanGun: yilGunu - doy,
    etkinlikler: gunHaritasi(d.year).get(ymdKey(d)) ?? [],
    halk: halkDonemi(d),
  };
}

/**
 * Halk takvimine göre dönem: yıl Kasım (8 Kasım–5 Mayıs) ve Hızır (6 Mayıs–7 Kasım) günlerine ayrılır;
 * kışın en sert 40 günü Erbain (22 Aralık–30 Ocak), ardından 50 gün Hamsin (31 Ocak–21 Mart) gelir.
 */
export function halkDonemi(d: YMD) {
  const k = ymdKey(d).slice(5);
  const bas = (y: number, m: number, g: number) => ({
    year: y,
    month: m,
    day: g,
  });
  const hizirMi = k >= "05-06" && k <= "11-07";
  const buyukBas = hizirMi
    ? bas(d.year, 5, 6)
    : k >= "11-08"
      ? bas(d.year, 11, 8)
      : bas(d.year - 1, 11, 8);
  const buyuk = {
    ad: hizirMi ? "Hızır günleri" : "Kasım günleri",
    gun: diffDays(buyukBas, d) + 1,
  };
  let kucuk: { ad: string; gun: number; toplam: number } | null = null;
  if (k >= "12-22" || k <= "01-30") {
    kucuk = {
      ad: "Erbain",
      gun:
        diffDays(
          k >= "12-22" ? bas(d.year, 12, 22) : bas(d.year - 1, 12, 22),
          d,
        ) + 1,
      toplam: 40,
    };
  } else if (k >= "01-31" && k <= "03-21") {
    kucuk = {
      ad: "Hamsin",
      gun: diffDays(bas(d.year, 1, 31), d) + 1,
      toplam: diffDays(bas(d.year, 1, 31), bas(d.year, 3, 22)),
    };
  }
  return { buyuk, kucuk };
}

/** Sayfası olan günler: en az bir etkinliği olan günler. */
export function doluGunler(year: number): YMD[] {
  return [...gunHaritasi(year).keys()].sort().map(ymdParse);
}

export function sonrakiTarih(e: Etkinlik, from: YMD): Tarihli | null {
  for (let y = from.year; y <= from.year + 2; y += 1) {
    const t = etkinlikTarihleri(e, y).find(
      (x) => ymdKey(x.bitis ?? x.tarih) >= ymdKey(from),
    );
    if (t) return t;
  }
  return null;
}

/** "Kasım günleri 45. gün · Erbain 12/40" */
export function halkMetni(h: ReturnType<typeof halkDonemi>) {
  return `${h.buyuk.ad} ${h.buyuk.gun}. gün${h.kucuk ? ` · ${h.kucuk.ad} ${h.kucuk.gun}/${h.kucuk.toplam}` : ""}`;
}
