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

export type Kategori =
  | "resmi"
  | "bayram"
  | "dini"
  | "milli"
  | "ozel"
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
  | "isci";

type Kural =
  | { tip: "sabit"; ay: number; gun: number }
  | { tip: "haftanin-gunu"; ay: number; haftaGunu: number; kacinci: number }
  | { tip: "hicri"; ay: number; gun: number; kaydir?: number }
  | { tip: "regaib" }
  | { tip: "resmi"; tatilId: string }
  | { tip: "astro"; olay: Mevsim };

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
};

export const KATEGORI_ADI: Record<Kategori, string> = {
  resmi: "Resmî tatil",
  bayram: "Dini bayram",
  dini: "Dini gün",
  milli: "Milli ve anma günü",
  ozel: "Özel gün",
  mevsim: "Mevsim ve astronomi",
};

const IZIN = {
  href: "/resmi-tatiller",
  label: "Resmî tatiller ve köprü günleri",
};

export const ETKINLIKLER: Etkinlik[] = [
  {
    id: "yilbasi",
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
    id: "ilkbahar",
    ad: "İlkbahar Ekinoksu",
    kategori: "mevsim",
    gorsel: "ilkbahar",
    kural: { tip: "astro", olay: "mart-ekinoksu" },
    tatil: "yok",
    kisa: "Gece ile gündüzün eşitlendiği, astronomik ilkbaharın başladığı an.",
    hakkinda:
      "Mart ekinoksunda Güneş gök ekvatorunu güneyden kuzeye geçer; Kuzey Yarımküre'de ilkbahar başlar ve gece ile gündüz yaklaşık eşit olur.",
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

/** Bir etkinliğin yıl içindeki tarih(ler)i. */
export function etkinlikTarihleri(e: Etkinlik, year: number): Tarihli[] {
  const k = e.kural;
  switch (k.tip) {
    case "sabit":
      return [{ etkinlik: e, tarih: { year, month: k.ay, day: k.gun } }];
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
export const takvimGunPath = (d: YMD) =>
  `/takvim/${d.year}/${AY_SLUG[d.month - 1]}/${d.day}`;
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
  };
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
