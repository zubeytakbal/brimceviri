// Geri sayim etkinlikleri. Tarih kurallari: sabit gun, "ayin N. X gunu", Paskalya
// (Gregoryen hesap) ve Diyanet'in ilan ettigi dini gunler (yalnizca dogrulanmis yillar).

import { mevsimAni, type Mevsim } from "../calendar/astro";
import { OKUL_YILLARI } from "../calendar/okulTakvimi";

export type DateParts = { year: number; month: number; day: number; estimated?: boolean };
export type CountdownLang = "tr" | "en" | "de";

type Rule =
  | { kind: "fixed"; month: number; day: number }
  | { kind: "nth-weekday"; month: number; weekday: number; nth: number; offsetDays?: number }
  | { kind: "easter"; offsetDays?: number }
  /** Ortodoks Paskalyası (Jülyen hesabı, Gregoryen tarihe çevrilmiş). */
  | { kind: "orthodox-easter"; offsetDays?: number }
  /** Yılda birden fazla sabit gün (ör. Aya Yorgi: 23 Nisan ve 24 Eylül). */
  | { kind: "fixed-many"; dates: Array<{ month: number; day: number }> }
  /** Sonntag vor einem Datum, n Wochen zurück (1. Advent: 4 Sonntage vor dem 25. Dezember). */
  | { kind: "sunday-before"; month: number; day: number; weeksBack: number }
  /** Hicri takvim gunu: Diyanet'in ilan ettigi yillar "verified"; digerleri Umm al-Qura ile tahmin.
   * offsetDays: kandil gibi Hicri gunden onceki aksam (-1). verifiedUntil: bu yila kadar Umm al-Qura hesabi
   * Diyanet takvimiyle karsilastirilmis (calendar/trTakvim.ts DINI_DOGRULANAN), tahmini sayilmaz. */
  | { kind: "hijri"; hijriMonth: number; hijriDay: number; verified: DateParts[]; offsetDays?: number; verifiedUntil?: number }
  /** Regaib Kandili: Recep ayinin ilk cumasini onceleyen persembe. */
  | { kind: "regaib"; verifiedUntil?: number }
  /** Resmi kaynaktan alinmis tarih listesi (or. MEB okul takvimi); listede olmayan yil icin tarih yoktur. */
  | { kind: "list"; dates: DateParts[] }
  /** Ekinoks ya da gündönümü anının Türkiye saatine göre günü (Meeus, bkz. calendar/astro.ts). */
  | { kind: "season"; season: Mevsim };

export type CountdownEvent = {
  id: string;
  lang: CountdownLang;
  slug: string;
  /** Diger dildeki karsiligi (hreflang). */
  pair?: string;
  name: string;
  /** Deutsch: Wendung nach „bis“, z. B. „zum 1. Advent“ (sonst der Name). */
  untilDe?: string;
  question: string;
  rule: Rule;
  /** TR etkinlikleri Turkiye saatiyle (UTC+3), EN ve DE etkinlikleri ziyaretcinin yerel saatiyle. */
  zone: "istanbul" | "local";
  holiday: string;
  about: string;
  source?: string;
};

/** Diyanet Isleri Baskanligi dini gunler takvimi (bayramin 1. gunu). Umm al-Qura hesabi
 * 2025-2028 icin bu tarihlerle birebir ortusur (bkz. tests/countdown.test.ts). */
const RAMAZAN_BAYRAMI: DateParts[] = [
  { year: 2027, month: 3, day: 9 },
  { year: 2028, month: 2, day: 26 },
];
const KURBAN_BAYRAMI: DateParts[] = [
  { year: 2027, month: 5, day: 16 },
  { year: 2028, month: 5, day: 5 },
];
const RAMAZAN_BASLANGICI: DateParts[] = [{ year: 2027, month: 2, day: 8 }];

const DIYANET = "Diyanet İşleri Başkanlığı dini günler takvimi";
/** Umm al-Qura hesabının Diyanet takvimiyle karşılaştırıldığı son yıl (calendar/trTakvim.ts DINI_DOGRULANAN ile aynı). */
const DINI_DOGRULANAN_YIL = 2027;
const OKUL_KAYNAK = OKUL_YILLARI[0]?.kaynak ?? "MEB eğitim-öğretim yılı çalışma takvimi";

export const countdownEvents: CountdownEvent[] = [
  {
    id: "yilbasi",
    lang: "tr",
    slug: "yilbasi",
    pair: "new-year",
    name: "Yılbaşı",
    question: "Yılbaşına kaç gün kaldı?",
    rule: { kind: "fixed", month: 1, day: 1 },
    zone: "istanbul",
    holiday: "Evet. 1 Ocak resmî tatildir (2429 sayılı Kanun).",
    about:
      "Yılbaşı, Gregoryen takvimde yeni yılın ilk günüdür. Türkiye'de 1 Ocak 1926'dan bu yana miladi takvim kullanılır ve 1 Ocak tam gün resmî tatildir. Geri sayım 31 Aralık gecesi saat 00:00'a (Türkiye saati) göre yapılır.",
  },
  {
    id: "ramazan",
    lang: "tr",
    slug: "ramazan",
    name: "Ramazan",
    question: "Ramazan'a kaç gün kaldı?",
    rule: { kind: "hijri", hijriMonth: 9, hijriDay: 1, verified: RAMAZAN_BASLANGICI },
    zone: "istanbul",
    holiday: "Hayır. Ramazan ayı resmî tatil değildir; ayın sonundaki Ramazan Bayramı resmî tatildir.",
    about:
      "Ramazan, Hicri takvimin dokuzuncu ayıdır ve oruç ayı olarak bilinir. Hicri takvim Ay'a dayandığı için Ramazan her yıl miladi takvimde yaklaşık 11 gün öne kayar. İlk oruç, ayın ilk gününün sabahı tutulur; teravih namazı bir önceki akşam başlar.",
    source: DIYANET,
  },
  {
    id: "ramazan-bayrami",
    lang: "tr",
    slug: "ramazan-bayrami",
    name: "Ramazan Bayramı",
    question: "Ramazan Bayramı'na kaç gün kaldı?",
    rule: { kind: "hijri", hijriMonth: 10, hijriDay: 1, verified: RAMAZAN_BAYRAMI },
    zone: "istanbul",
    holiday: "Evet. Ramazan Bayramı 3 gün resmî tatildir; arefe günü öğleden sonra (13:00'ten itibaren) yarım gün tatildir.",
    about:
      "Ramazan Bayramı (Şeker Bayramı), Ramazan ayının bitişini izleyen Şevval ayının ilk üç günü kutlanır. Tarihi Hicri takvime göre belirlendiği için her yıl yaklaşık 11 gün öne gelir. Geri sayım bayramın ilk günü saat 00:00'a göredir; bayram namazı o sabah kılınır.",
    source: DIYANET,
  },
  {
    id: "kurban-bayrami",
    lang: "tr",
    slug: "kurban-bayrami",
    name: "Kurban Bayramı",
    question: "Kurban Bayramı'na kaç gün kaldı?",
    rule: { kind: "hijri", hijriMonth: 12, hijriDay: 10, verified: KURBAN_BAYRAMI },
    zone: "istanbul",
    holiday: "Evet. Kurban Bayramı 4 gün resmî tatildir; arefe günü öğleden sonra (13:00'ten itibaren) yarım gün tatildir.",
    about:
      "Kurban Bayramı, Hicri takvimin Zilhicce ayının 10. günü başlar ve dört gün sürer. Hac ibadetinin de doruk noktasına denk gelir. Hicri takvim nedeniyle her yıl miladi takvimde yaklaşık 11 gün öne kayar.",
    source: DIYANET,
  },
  {
    id: "regaib-kandili",
    lang: "tr",
    slug: "regaib-kandili",
    name: "Regaib Kandili",
    question: "Regaib Kandili'ne kaç gün kaldı?",
    rule: { kind: "regaib", verifiedUntil: DINI_DOGRULANAN_YIL },
    zone: "istanbul",
    holiday: "Hayır, Regaib Kandili resmî tatil değildir.",
    about:
      "Regaib Kandili, Recep ayının ilk cuma gününü önceleyen gecedir; bu yüzden her yıl perşembe akşamına denk gelir ve üç ayların ilk kandilidir. Kandil gecesi akşam namazıyla başlar; sayaç kandil gününün 00:00'ına göre sayar.",
    source: DIYANET,
  },
  {
    id: "mirac-kandili",
    lang: "tr",
    slug: "mirac-kandili",
    name: "Miraç Kandili",
    question: "Miraç Kandili'ne kaç gün kaldı?",
    rule: { kind: "hijri", hijriMonth: 7, hijriDay: 27, offsetDays: -1, verified: [], verifiedUntil: DINI_DOGRULANAN_YIL },
    zone: "istanbul",
    holiday: "Hayır, Miraç Kandili resmî tatil değildir.",
    about:
      "Miraç Kandili, Recep ayının 26. gününü 27. gününe bağlayan gecedir ve takvimde 26 Recep akşamı olarak gösterilir. Hicri takvime bağlı olduğu için her yıl yaklaşık 11 gün öne gelir; sayaç kandil gününün 00:00'ına göre sayar.",
    source: DIYANET,
  },
  {
    id: "berat-kandili",
    lang: "tr",
    slug: "berat-kandili",
    name: "Berat Kandili",
    question: "Berat Kandili'ne kaç gün kaldı?",
    rule: { kind: "hijri", hijriMonth: 8, hijriDay: 15, offsetDays: -1, verified: [], verifiedUntil: DINI_DOGRULANAN_YIL },
    zone: "istanbul",
    holiday: "Hayır, Berat Kandili resmî tatil değildir.",
    about:
      "Berat Kandili, Şaban ayının 14. gününü 15. gününe bağlayan gecedir ve Ramazan'dan yaklaşık iki hafta önceye denk gelir. Hicri takvime bağlı olduğu için her yıl yaklaşık 11 gün öne gelir; sayaç kandil gününün 00:00'ına göre sayar.",
    source: DIYANET,
  },
  {
    id: "kadir-gecesi",
    lang: "tr",
    slug: "kadir-gecesi",
    name: "Kadir Gecesi",
    question: "Kadir Gecesi'ne kaç gün kaldı?",
    rule: { kind: "hijri", hijriMonth: 9, hijriDay: 27, offsetDays: -1, verified: [], verifiedUntil: DINI_DOGRULANAN_YIL },
    zone: "istanbul",
    holiday: "Hayır, Kadir Gecesi resmî tatil değildir.",
    about:
      "Türkiye'de Kadir Gecesi, Ramazan ayının 26. gününü 27. gününe bağlayan gece olarak idrak edilir ve takvimde 26 Ramazan akşamı olarak gösterilir. Sayaç o günün 00:00'ına göre sayar; gece akşam namazıyla başlar.",
    source: DIYANET,
  },
  {
    id: "mevlid-kandili",
    lang: "tr",
    slug: "mevlid-kandili",
    name: "Mevlid Kandili",
    question: "Mevlid Kandili'ne kaç gün kaldı?",
    rule: { kind: "hijri", hijriMonth: 3, hijriDay: 12, offsetDays: -1, verified: [], verifiedUntil: DINI_DOGRULANAN_YIL },
    zone: "istanbul",
    holiday: "Hayır, Mevlid Kandili resmî tatil değildir.",
    about:
      "Mevlid Kandili, Hz. Muhammed'in doğumunun anıldığı, Rebiülevvel ayının 11. gününü 12. gününe bağlayan gecedir; bu gece mevlid okunur. Hicri takvime bağlı olduğu için her yıl yaklaşık 11 gün öne gelir; sayaç kandil gününün 00:00'ına göre sayar.",
    source: DIYANET,
  },
  {
    id: "okullarin-kapanmasi",
    lang: "tr",
    slug: "okullarin-kapanmasi",
    name: "Okulların kapanması",
    question: "Okulların kapanmasına kaç gün kaldı?",
    rule: { kind: "list", dates: OKUL_YILLARI.map((y) => y.kapanis) },
    zone: "istanbul",
    holiday: "Ders yılının son günüdür; karneler verilir ve ertesi gün yaz tatili başlar. Resmî tatil değildir.",
    about:
      "Okulların kapanış günü, MEB'in her yıl genelgeyle açıkladığı eğitim-öğretim yılı çalışma takviminde yer alır. Ders yılının son günü karneler verilir ve yaz tatili başlar. Sonraki yılın tarihi MEB açıklayınca eklenir.",
    source: OKUL_KAYNAK,
  },
  {
    id: "yariyil-tatili",
    lang: "tr",
    slug: "yariyil-tatili",
    name: "Yarıyıl tatili",
    question: "Yarıyıl tatiline kaç gün kaldı?",
    rule: { kind: "list", dates: OKUL_YILLARI.map((y) => y.yariyil[0]) },
    zone: "istanbul",
    holiday: "Yarıyıl (sömestr) tatili okullar için iki haftalık tatildir; resmî tatil değildir, çalışanlar için iş günüdür.",
    about:
      "Yarıyıl tatili, birinci dönemin bitip karnelerin verilmesinin ardından başlayan iki haftalık sömestr tatilidir. Tarihi MEB'in eğitim-öğretim yılı çalışma takviminde yer alır; sayaç tatilin ilk günü 00:00'a göre sayar.",
    source: OKUL_KAYNAK,
  },
  {
    id: "karne",
    lang: "tr",
    slug: "karne",
    name: "Karne günü",
    question: "Karneye kaç gün kaldı?",
    rule: { kind: "list", dates: OKUL_YILLARI.flatMap((y) => [y.karne1, y.kapanis]) },
    zone: "istanbul",
    holiday: "Karne günü dersin yapıldığı son gündür; resmî tatil değildir.",
    about:
      "Karneler yılda iki kez verilir: birinci dönemin son günü (yarıyıl tatilinden önce) ve ders yılının son günü (yaz tatilinden önce). Tarihler MEB'in eğitim-öğretim yılı çalışma takviminden alınmıştır.",
    source: OKUL_KAYNAK,
  },
  {
    id: "ara-tatil",
    lang: "tr",
    slug: "ara-tatil",
    name: "Ara tatil",
    question: "Ara tatile kaç gün kaldı?",
    rule: { kind: "list", dates: OKUL_YILLARI.flatMap((y) => [y.araTatil1[0], y.araTatil2[0]]) },
    zone: "istanbul",
    holiday: "Ara tatil okullar için bir haftalık tatildir; resmî tatil değildir.",
    about:
      "Ara tatil, her dönemin ortasında okulların bir hafta tatil olduğu dönemdir; birinci dönemde kasımda, ikinci dönemde martta yapılır. Tarihler MEB'in eğitim-öğretim yılı çalışma takviminden alınmıştır.",
    source: OKUL_KAYNAK,
  },
  {
    id: "sevgililer-gunu",
    lang: "tr",
    slug: "sevgililer-gunu",
    pair: "valentines-day",
    name: "Sevgililer Günü",
    question: "Sevgililer Günü'ne kaç gün kaldı?",
    rule: { kind: "fixed", month: 2, day: 14 },
    zone: "istanbul",
    holiday: "Hayır, Sevgililer Günü resmî tatil değildir.",
    about:
      "Sevgililer Günü her yıl 14 Şubat'ta kutlanır. Adını Aziz Valentin'den alan gün, dünyanın birçok ülkesinde sevgiye ayrılmış gün olarak bilinir.",
  },
  {
    id: "23-nisan",
    lang: "tr",
    slug: "23-nisan",
    name: "23 Nisan Ulusal Egemenlik ve Çocuk Bayramı",
    question: "23 Nisan'a kaç gün kaldı?",
    rule: { kind: "fixed", month: 4, day: 23 },
    zone: "istanbul",
    holiday: "Evet. 23 Nisan tam gün resmî tatildir.",
    about:
      "23 Nisan 1920'de Türkiye Büyük Millet Meclisi Ankara'da açıldı. Atatürk bu günü çocuklara armağan etti; 23 Nisan dünyada çocuklara adanmış ilk ulusal bayram olarak da bilinir.",
  },
  {
    id: "1-mayis",
    lang: "tr",
    slug: "1-mayis",
    name: "1 Mayıs Emek ve Dayanışma Günü",
    question: "1 Mayıs'a kaç gün kaldı?",
    rule: { kind: "fixed", month: 5, day: 1 },
    zone: "istanbul",
    holiday: "Evet. 1 Mayıs 2009'dan bu yana tam gün resmî tatildir.",
    about: "1 Mayıs, dünyada işçi bayramı olarak kutlanır. Türkiye'de Emek ve Dayanışma Günü adıyla 2009'dan beri resmî tatildir.",
  },
  {
    id: "anneler-gunu",
    lang: "tr",
    slug: "anneler-gunu",
    pair: "mothers-day",
    name: "Anneler Günü",
    question: "Anneler Günü'ne kaç gün kaldı?",
    rule: { kind: "nth-weekday", month: 5, weekday: 0, nth: 2 },
    zone: "istanbul",
    holiday: "Hayır, Anneler Günü resmî tatil değildir; zaten her yıl pazar gününe denk gelir.",
    about: "Türkiye'de Anneler Günü her yıl mayıs ayının ikinci pazarı kutlanır. Bu yüzden tarih yıldan yıla 8 ile 14 Mayıs arasında değişir.",
  },
  {
    id: "19-mayis",
    lang: "tr",
    slug: "19-mayis",
    name: "19 Mayıs Atatürk'ü Anma, Gençlik ve Spor Bayramı",
    question: "19 Mayıs'a kaç gün kaldı?",
    rule: { kind: "fixed", month: 5, day: 19 },
    zone: "istanbul",
    holiday: "Evet. 19 Mayıs tam gün resmî tatildir.",
    about: "19 Mayıs 1919'da Mustafa Kemal Samsun'a çıktı ve Kurtuluş Savaşı başladı. Gün, Atatürk tarafından gençliğe armağan edilmiştir.",
  },
  {
    id: "babalar-gunu",
    lang: "tr",
    slug: "babalar-gunu",
    pair: "fathers-day",
    name: "Babalar Günü",
    question: "Babalar Günü'ne kaç gün kaldı?",
    rule: { kind: "nth-weekday", month: 6, weekday: 0, nth: 3 },
    zone: "istanbul",
    holiday: "Hayır, Babalar Günü resmî tatil değildir; her yıl pazar gününe denk gelir.",
    about: "Türkiye'de Babalar Günü her yıl haziran ayının üçüncü pazarı kutlanır; tarih 15 ile 21 Haziran arasında değişir.",
  },
  {
    id: "15-temmuz",
    lang: "tr",
    slug: "15-temmuz",
    name: "15 Temmuz Demokrasi ve Millî Birlik Günü",
    question: "15 Temmuz'a kaç gün kaldı?",
    rule: { kind: "fixed", month: 7, day: 15 },
    zone: "istanbul",
    holiday: "Evet. 15 Temmuz 2017'den bu yana tam gün resmî tatildir.",
    about: "15 Temmuz, 2016'daki darbe girişimine karşı verilen mücadelenin anısına Demokrasi ve Millî Birlik Günü olarak anılır.",
  },
  {
    id: "30-agustos",
    lang: "tr",
    slug: "30-agustos",
    name: "30 Ağustos Zafer Bayramı",
    question: "30 Ağustos'a kaç gün kaldı?",
    rule: { kind: "fixed", month: 8, day: 30 },
    zone: "istanbul",
    holiday: "Evet. 30 Ağustos tam gün resmî tatildir.",
    about: "30 Ağustos 1922'de Başkomutanlık Meydan Muharebesi kazanıldı. Zafer Bayramı, Kurtuluş Savaşı'nın bu dönüm noktasını anar.",
  },
  {
    id: "29-ekim",
    lang: "tr",
    slug: "29-ekim",
    name: "29 Ekim Cumhuriyet Bayramı",
    question: "29 Ekim'e kaç gün kaldı?",
    rule: { kind: "fixed", month: 10, day: 29 },
    zone: "istanbul",
    holiday: "Evet. 29 Ekim tam gün, 28 Ekim ise öğleden sonra (13:00'ten itibaren) yarım gün resmî tatildir.",
    about: "29 Ekim 1923'te Türkiye Cumhuriyeti ilan edildi. Cumhuriyet Bayramı, Türkiye'nin en coşkulu kutlanan millî bayramıdır.",
  },
  {
    id: "ogretmenler-gunu",
    lang: "tr",
    slug: "ogretmenler-gunu",
    name: "Öğretmenler Günü",
    question: "Öğretmenler Günü'ne kaç gün kaldı?",
    rule: { kind: "fixed", month: 11, day: 24 },
    zone: "istanbul",
    holiday: "Hayır, Öğretmenler Günü resmî tatil değildir.",
    about: "24 Kasım, Atatürk'ün 1928'de Millet Mektepleri Başöğretmenliğini kabul ettiği gündür ve 1981'den beri Öğretmenler Günü olarak kutlanır.",
  },
  {
    id: "ilkbahar",
    lang: "tr",
    slug: "ilkbahar",
    name: "İlkbahar",
    question: "İlkbahara kaç gün kaldı?",
    rule: { kind: "season", season: "mart-ekinoksu" },
    zone: "istanbul",
    holiday: "Hayır, ilkbaharın başlangıcı resmî tatil değildir.",
    about:
      "Kuzey yarımkürede ilkbahar, gece ile gündüzün eşitlendiği mart ekinoksuyla başlar. Ekinoks anı Türkiye saatiyle 2025-2030 arasında her yıl 20 Mart'a denk gelir; halk arasında bilinen 21 Mart, eski takvim hesabından kalan bir gelenektir. Meteorolojide ilkbahar 1 Mart'ta başlamış sayılır.",
  },
  {
    id: "yaz",
    lang: "tr",
    slug: "yaz",
    name: "Yaz",
    question: "Yaza kaç gün kaldı?",
    rule: { kind: "season", season: "haziran-gundonumu" },
    zone: "istanbul",
    holiday: "Hayır, yazın başlangıcı resmî tatil değildir.",
    about:
      "Kuzey yarımkürede yaz, en uzun günün yaşandığı yaz gündönümüyle başlar. Gündönümü anı Türkiye saatiyle yıla göre 20 ya da 21 Haziran'a denk gelir (2028'de 20 Haziran). Meteorolojide ise yaz 1 Haziran'da başlamış sayılır.",
  },
  {
    id: "sonbahar",
    lang: "tr",
    slug: "sonbahar",
    name: "Sonbahar",
    question: "Sonbahara kaç gün kaldı?",
    rule: { kind: "season", season: "eylul-ekinoksu" },
    zone: "istanbul",
    holiday: "Hayır, sonbaharın başlangıcı resmî tatil değildir.",
    about:
      "Kuzey yarımkürede sonbahar, gece ile gündüzün yeniden eşitlendiği eylül ekinoksuyla başlar. Ekinoks anı Türkiye saatiyle yıla göre 22 ya da 23 Eylül'e denk gelir; bundan sonra geceler gündüzlerden uzundur. Meteorolojide sonbahar 1 Eylül'de başlamış sayılır.",
  },
  {
    id: "kis",
    lang: "tr",
    slug: "kis",
    name: "Kış",
    question: "Kışa kaç gün kaldı?",
    rule: { kind: "season", season: "aralik-gundonumu" },
    zone: "istanbul",
    holiday: "Hayır, kışın başlangıcı resmî tatil değildir.",
    about:
      "Kuzey yarımkürede kış, yılın en uzun gecesinin yaşandığı kış gündönümüyle başlar. Gündönümü anı Türkiye saatiyle yıla göre 21 ya da 22 Aralık'a denk gelir; bu günden sonra günler yeniden uzamaya başlar. Meteorolojide kış 1 Aralık'ta başlamış sayılır.",
  },
  // Hristiyan bayramları (Türkiye'deki Ermeni, Rum, Süryani, Katolik ve Protestan topluluklar).
  {
    id: "paskalya",
    lang: "tr",
    slug: "paskalya",
    pair: "easter",
    name: "Paskalya",
    question: "Paskalya'ya kaç gün kaldı?",
    rule: { kind: "easter" },
    zone: "istanbul",
    holiday: "Hayır. Paskalya Türkiye'de resmî tatil değildir; Hristiyan vatandaşlar için dini bayramdır.",
    about:
      "Paskalya, Hristiyanlıkta İsa'nın dirilişinin kutlandığı en büyük bayramdır. 21 Mart'tan sonraki ilk dolunayı izleyen pazar günü kutlanır, bu yüzden tarihi 22 Mart ile 25 Nisan arasında değişir. Bu sayaç Katolik, Protestan ve Ermeni kiliselerinin kullandığı Gregoryen (Batı) hesabına göredir; Rum Ortodoks ve Süryaniler çoğu yıl daha geç bir tarihte kutlar.",
  },
  {
    id: "ortodoks-paskalyasi",
    lang: "tr",
    slug: "ortodoks-paskalyasi",
    name: "Ortodoks Paskalyası",
    question: "Ortodoks Paskalyası'na kaç gün kaldı?",
    rule: { kind: "orthodox-easter" },
    zone: "istanbul",
    holiday: "Hayır. Ortodoks Paskalyası Türkiye'de resmî tatil değildir.",
    about:
      "Ortodoks kiliseleri Paskalya tarihini Jülyen takvimine göre hesaplar; bulunan tarih bugünkü takvimde 13 gün ileriye denk gelir. Bu yüzden Ortodoks Paskalyası Batı Paskalyası ile aynı gün ya da 1 ila 5 hafta sonra olur. Türkiye'de Fener Rum Patrikhanesi'ne bağlı Rum Ortodokslar ve Süryaniler Paskalya'yı bu tarihte kutlar.",
  },
  {
    id: "aya-yorgi",
    lang: "tr",
    slug: "aya-yorgi",
    name: "Aya Yorgi",
    question: "Aya Yorgi'ye kaç gün kaldı?",
    rule: { kind: "fixed-many", dates: [{ month: 4, day: 23 }, { month: 9, day: 24 }] },
    zone: "istanbul",
    holiday: "Hayır. Aya Yorgi günleri resmî tatil değildir; 23 Nisan ise Ulusal Egemenlik ve Çocuk Bayramı olduğu için tatildir.",
    about:
      "Büyükada'daki Aya Yorgi Kilisesi'ne her yıl 23 Nisan ve 24 Eylül'de binlerce kişi dilek için çıkar. 23 Nisan, Aziz Yorgi'nin (Aziz Georgios) yortusudur. Geleneğe göre ziyaretçiler yokuştaki ağaçlara ip bağlar ve ipi kopmadan kiliseye kadar götürmeye çalışır; ziyaretçilerin çoğu Hristiyan değildir. Bu günlerde adaya ulaşım çok yoğun olur.",
  },
  {
    id: "noel",
    lang: "tr",
    slug: "noel",
    pair: "christmas",
    name: "Noel",
    question: "Noel'e kaç gün kaldı?",
    rule: { kind: "fixed", month: 12, day: 25 },
    zone: "istanbul",
    holiday: "Hayır. Noel Türkiye'de resmî tatil değildir; Hristiyan vatandaşlar için dini bayramdır.",
    about:
      "Noel, İsa'nın doğumunun kutlandığı bayramdır. Katolikler, Protestanlar ve Fener Rum Patrikhanesi'ne bağlı Rum Ortodokslar 25 Aralık'ta kutlar. Türkiye Ermenileri Noel'i (Surp Dznunt) 6 Ocak'ta, Jülyen takvimini kullanan Rus, Sırp ve Gürcü Ortodoks kiliseleri ise 7 Ocak'ta kutlar.",
  },
  {
    id: "ermeni-noeli",
    lang: "tr",
    slug: "ermeni-noeli",
    name: "Ermeni Noeli (Surp Dznunt)",
    question: "Ermeni Noeli'ne kaç gün kaldı?",
    rule: { kind: "fixed", month: 1, day: 6 },
    zone: "istanbul",
    holiday: "Hayır. 6 Ocak Türkiye'de resmî tatil değildir.",
    about:
      "Türkiye Ermenileri Noel'i 6 Ocak'ta Surp Dznunt (Kutsal Doğuş) adıyla kutlar. Ermeni Kilisesi, İsa'nın doğumunu ve vaftizini erken kilise geleneğindeki gibi aynı gün anar; bu yüzden ayinden sonra su kutsama töreni yapılır. Arife olan 5 Ocak akşamı Cırakaluyts denir.",
  },
  {
    id: "new-year",
    lang: "en",
    slug: "new-year",
    pair: "yilbasi",
    name: "New Year",
    question: "How many days until New Year?",
    rule: { kind: "fixed", month: 1, day: 1 },
    zone: "local",
    holiday: "Yes. New Year's Day (January 1) is a federal holiday in the US and a public holiday in most countries.",
    about: "New Year's Day marks the first day of the Gregorian calendar year. The countdown runs to midnight on January 1 in your own time zone.",
  },
  {
    id: "valentines-day",
    lang: "en",
    slug: "valentines-day",
    pair: "sevgililer-gunu",
    name: "Valentine's Day",
    question: "How many days until Valentine's Day?",
    rule: { kind: "fixed", month: 2, day: 14 },
    zone: "local",
    holiday: "No. Valentine's Day is not a public holiday.",
    about: "Valentine's Day falls on February 14 every year and is named after Saint Valentine. It is celebrated as a day of love in many countries.",
  },
  {
    id: "easter",
    lang: "en",
    slug: "easter",
    pair: "paskalya",
    name: "Easter",
    question: "How many days until Easter?",
    rule: { kind: "easter" },
    zone: "local",
    holiday: "Easter Sunday is not a US federal holiday; Good Friday and Easter Monday are public holidays in many other countries.",
    about:
      "Western Easter falls on the first Sunday after the first ecclesiastical full moon on or after March 21, so it moves between March 22 and April 25. Dates here use the standard Gregorian (Western) computation.",
  },
  {
    id: "mothers-day",
    lang: "en",
    slug: "mothers-day",
    pair: "anneler-gunu",
    name: "Mother's Day",
    question: "How many days until Mother's Day?",
    rule: { kind: "nth-weekday", month: 5, weekday: 0, nth: 2 },
    zone: "local",
    holiday: "No, it is not a federal holiday — it always falls on a Sunday.",
    about: "In the US, Canada and many other countries Mother's Day is the second Sunday in May. (The UK celebrates Mothering Sunday in March.)",
  },
  {
    id: "fathers-day",
    lang: "en",
    slug: "fathers-day",
    pair: "babalar-gunu",
    name: "Father's Day",
    question: "How many days until Father's Day?",
    rule: { kind: "nth-weekday", month: 6, weekday: 0, nth: 3 },
    zone: "local",
    holiday: "No, it is not a federal holiday — it always falls on a Sunday.",
    about: "In the US, the UK and Canada Father's Day is the third Sunday in June, so it falls between June 15 and June 21.",
  },
  {
    id: "independence-day",
    lang: "en",
    slug: "independence-day",
    name: "Independence Day (July 4th)",
    question: "How many days until the 4th of July?",
    rule: { kind: "fixed", month: 7, day: 4 },
    zone: "local",
    holiday: "Yes. Independence Day is a US federal holiday; if it falls on a weekend, the nearest weekday is observed.",
    about: "The Declaration of Independence was adopted on July 4, 1776. The day is celebrated across the US with parades and fireworks.",
  },
  {
    id: "halloween",
    lang: "en",
    slug: "halloween",
    name: "Halloween",
    question: "How many days until Halloween?",
    rule: { kind: "fixed", month: 10, day: 31 },
    zone: "local",
    holiday: "No. Halloween is not a public holiday.",
    about: "Halloween is celebrated on October 31, the eve of All Saints' Day, with costumes, pumpkin carving and trick-or-treating.",
  },
  {
    id: "thanksgiving",
    lang: "en",
    slug: "thanksgiving",
    name: "Thanksgiving",
    question: "How many days until Thanksgiving?",
    rule: { kind: "nth-weekday", month: 11, weekday: 4, nth: 4 },
    zone: "local",
    holiday: "Yes. Thanksgiving is a US federal holiday on the fourth Thursday of November.",
    about: "US Thanksgiving is held on the fourth Thursday of November, so it falls between November 22 and 28. (Canadian Thanksgiving is the second Monday of October.)",
  },
  {
    id: "black-friday",
    lang: "en",
    slug: "black-friday",
    name: "Black Friday",
    question: "How many days until Black Friday?",
    rule: { kind: "nth-weekday", month: 11, weekday: 4, nth: 4, offsetDays: 1 },
    zone: "local",
    holiday: "No. Black Friday is not a federal holiday, although some employers give the day off.",
    about: "Black Friday is the day after US Thanksgiving and traditionally opens the holiday shopping season.",
  },
  {
    id: "christmas",
    lang: "en",
    slug: "christmas",
    pair: "noel",
    name: "Christmas",
    question: "How many days until Christmas?",
    rule: { kind: "fixed", month: 12, day: 25 },
    zone: "local",
    holiday: "Yes. Christmas Day (December 25) is a US federal holiday and a public holiday in most Western countries.",
    about: "Christmas is celebrated on December 25 in the Gregorian calendar. (Orthodox churches using the Julian calendar celebrate on January 7.)",
  },
  // Deutsche Anlässe (Deutschland, Österreich, Schweiz). Zeitzone: Ortszeit der Besucher.
  {
    id: "de-weihnachten",
    lang: "de",
    slug: "weihnachten",
    pair: "christmas",
    name: "Heiligabend",
    question: "Wie viele Tage bis Weihnachten?",
    rule: { kind: "fixed", month: 12, day: 24 },
    zone: "local",
    holiday: "Heiligabend (24. Dezember) ist kein gesetzlicher Feiertag, viele Geschäfte schließen aber mittags. Gesetzliche Feiertage sind der 1. und 2. Weihnachtstag (25. und 26. Dezember).",
    about: "In Deutschland, Österreich und der Schweiz wird Weihnachten am Abend des 24. Dezember gefeiert, mit Bescherung am Heiligabend. Der Countdown zählt deshalb bis zum 24. Dezember.",
  },
  {
    id: "de-silvester",
    lang: "de",
    slug: "silvester",
    name: "Silvester",
    question: "Wie viele Tage bis Silvester?",
    rule: { kind: "fixed", month: 12, day: 31 },
    zone: "local",
    holiday: "Silvester ist kein gesetzlicher Feiertag. Der folgende Neujahrstag ist bundesweit Feiertag.",
    about: "Silvester ist der letzte Tag des Jahres, benannt nach Papst Silvester I., dessen Gedenktag der 31. Dezember ist. Um Mitternacht wird das neue Jahr mit Feuerwerk begrüßt.",
  },
  {
    id: "de-neujahr",
    lang: "de",
    slug: "neujahr",
    pair: "new-year",
    name: "Neujahr",
    question: "Wie viele Tage bis Neujahr?",
    rule: { kind: "fixed", month: 1, day: 1 },
    zone: "local",
    holiday: "Ja. Neujahr (1. Januar) ist in ganz Deutschland, Österreich und der Schweiz gesetzlicher Feiertag.",
    about: "Neujahr ist der erste Tag des Jahres im gregorianischen Kalender. Der Countdown läuft bis Mitternacht in der Nacht von Silvester auf Neujahr.",
  },
  {
    id: "de-valentinstag",
    lang: "de",
    slug: "valentinstag",
    pair: "valentines-day",
    name: "Valentinstag",
    question: "Wie viele Tage bis Valentinstag?",
    rule: { kind: "fixed", month: 2, day: 14 },
    zone: "local",
    holiday: "Nein, der Valentinstag ist kein Feiertag.",
    about: "Der Valentinstag am 14. Februar geht auf den heiligen Valentin zurück. In Deutschland ist er vor allem seit der Nachkriegszeit als Tag der Liebenden mit Blumen und Karten verbreitet.",
  },
  {
    id: "de-rosenmontag",
    lang: "de",
    slug: "rosenmontag",
    name: "Rosenmontag",
    question: "Wie viele Tage bis Rosenmontag?",
    rule: { kind: "easter", offsetDays: -48 },
    zone: "local",
    holiday: "Rosenmontag ist kein gesetzlicher Feiertag. In Karnevalshochburgen wie Köln, Düsseldorf und Mainz haben aber viele Betriebe, Schulen und Behörden geschlossen.",
    about: "Rosenmontag liegt 48 Tage vor Ostersonntag und ist der Höhepunkt des rheinischen Karnevals mit den großen Umzügen. Die Straßenkarnevalstage beginnen am Donnerstag davor (Weiberfastnacht) und enden am Aschermittwoch.",
  },
  {
    id: "de-ostern",
    lang: "de",
    slug: "ostern",
    pair: "easter",
    name: "Ostern",
    question: "Wie viele Tage bis Ostern?",
    rule: { kind: "easter" },
    zone: "local",
    holiday: "Karfreitag und Ostermontag sind bundesweit gesetzliche Feiertage. Der Ostersonntag ist als Sonntag ohnehin arbeitsfrei; ausdrücklich gesetzlicher Feiertag ist er nur in Brandenburg.",
    about: "Ostern fällt auf den ersten Sonntag nach dem ersten Frühlingsvollmond und liegt deshalb zwischen dem 22. März und dem 25. April. Das Datum wird mit der gaußschen Osterformel berechnet.",
  },
  {
    id: "de-muttertag",
    lang: "de",
    slug: "muttertag",
    pair: "mothers-day",
    name: "Muttertag",
    question: "Wie viele Tage bis Muttertag?",
    rule: { kind: "nth-weekday", month: 5, weekday: 0, nth: 2 },
    zone: "local",
    holiday: "Nein. Der Muttertag fällt immer auf einen Sonntag und ist kein Feiertag.",
    about: "In Deutschland, Österreich und der Schweiz ist Muttertag am zweiten Sonntag im Mai, also zwischen dem 8. und 14. Mai.",
  },
  {
    id: "de-vatertag",
    lang: "de",
    slug: "vatertag",
    untilDe: "zum Vatertag",
    name: "Vatertag (Christi Himmelfahrt)",
    question: "Wie viele Tage bis Vatertag?",
    rule: { kind: "easter", offsetDays: 39 },
    zone: "local",
    holiday: "Ja. Der Vatertag fällt in Deutschland auf Christi Himmelfahrt, einen bundesweiten gesetzlichen Feiertag.",
    about: "Christi Himmelfahrt liegt 39 Tage nach Ostersonntag und ist immer ein Donnerstag; viele nehmen den Freitag danach als Brückentag. In Österreich ist Vatertag dagegen am zweiten Sonntag im Juni.",
  },
  {
    id: "de-pfingsten",
    lang: "de",
    slug: "pfingsten",
    name: "Pfingsten",
    question: "Wie viele Tage bis Pfingsten?",
    rule: { kind: "easter", offsetDays: 49 },
    zone: "local",
    holiday: "Pfingstmontag ist bundesweit gesetzlicher Feiertag. Pfingstsonntag ist nur in Brandenburg ausdrücklich gesetzlicher Feiertag.",
    about: "Pfingsten wird 49 Tage nach Ostersonntag gefeiert, also am siebten Sonntag nach Ostern, und liegt zwischen dem 10. Mai und dem 13. Juni.",
  },
  {
    id: "de-oktoberfest",
    lang: "de",
    slug: "oktoberfest",
    untilDe: "zum Oktoberfest",
    name: "Oktoberfest (Wiesn-Anstich)",
    question: "Wie viele Tage bis zum Oktoberfest?",
    rule: { kind: "nth-weekday", month: 10, weekday: 0, nth: 1, offsetDays: -15 },
    zone: "local",
    holiday: "Nein, das Oktoberfest ist kein Feiertag. Der Tag der Deutschen Einheit (3. Oktober) fällt aber in die Wiesn-Zeit.",
    about: "Die Wiesn in München beginnt an einem Samstag im September mit dem Anstich um 12 Uhr und endet am ersten Sonntag im Oktober – oder am 3. Oktober, wenn dieser später liegt. Sie dauert 16 bis 18 Tage.",
    source: "Landeshauptstadt München, oktoberfest.de",
  },
  {
    id: "de-tag-der-deutschen-einheit",
    lang: "de",
    slug: "tag-der-deutschen-einheit",
    untilDe: "zum Tag der Deutschen Einheit",
    name: "Tag der Deutschen Einheit",
    question: "Wie viele Tage bis zum Tag der Deutschen Einheit?",
    rule: { kind: "fixed", month: 10, day: 3 },
    zone: "local",
    holiday: "Ja. Der 3. Oktober ist der einzige durch Bundesrecht festgelegte gesetzliche Feiertag und gilt in ganz Deutschland.",
    about: "Am 3. Oktober 1990 trat die DDR der Bundesrepublik bei. Der Tag der Deutschen Einheit ist seitdem Nationalfeiertag.",
  },
  {
    id: "de-halloween",
    lang: "de",
    slug: "halloween",
    pair: "halloween",
    name: "Halloween",
    question: "Wie viele Tage bis Halloween?",
    rule: { kind: "fixed", month: 10, day: 31 },
    zone: "local",
    holiday: "Halloween ist kein Feiertag. Am selben Tag ist aber Reformationstag, gesetzlicher Feiertag in Brandenburg, Bremen, Hamburg, Mecklenburg-Vorpommern, Niedersachsen, Sachsen, Sachsen-Anhalt, Schleswig-Holstein und Thüringen.",
    about: "Halloween am 31. Oktober, dem Abend vor Allerheiligen, ist in Deutschland seit den 1990er-Jahren verbreitet – mit Kostümen, Kürbissen und „Süßes oder Saures“.",
  },
  {
    id: "de-martinstag",
    lang: "de",
    slug: "martinstag",
    untilDe: "Sankt Martin",
    name: "Martinstag (St. Martin)",
    question: "Wie viele Tage bis Sankt Martin?",
    rule: { kind: "fixed", month: 11, day: 11 },
    zone: "local",
    holiday: "Nein, der Martinstag ist kein gesetzlicher Feiertag. Im Burgenland ist der heilige Martin Landespatron.",
    about: "Am 11. November ziehen Kinder mit Laternen durch die Straßen, oft angeführt von einem Reiter als St. Martin. Um 11:11 Uhr beginnt am selben Tag im Rheinland die Karnevalssession.",
  },
  {
    id: "de-black-friday",
    lang: "de",
    slug: "black-friday",
    pair: "black-friday",
    name: "Black Friday",
    question: "Wie viele Tage bis Black Friday?",
    rule: { kind: "nth-weekday", month: 11, weekday: 4, nth: 4, offsetDays: 1 },
    zone: "local",
    holiday: "Nein, Black Friday ist kein Feiertag.",
    about: "Black Friday ist der Freitag nach dem US-amerikanischen Thanksgiving (vierter Donnerstag im November). Auch in Deutschland gibt es an diesem Tag und in der „Black Week“ viele Rabattaktionen.",
  },
  {
    id: "de-erster-advent",
    lang: "de",
    slug: "erster-advent",
    untilDe: "zum 1. Advent",
    name: "1. Advent",
    question: "Wie viele Tage bis zum 1. Advent?",
    rule: { kind: "sunday-before", month: 12, day: 25, weeksBack: 4 },
    zone: "local",
    holiday: "Nein. Die Adventssonntage sind Sonntage, aber keine eigenen Feiertage.",
    about: "Der 1. Advent ist der vierte Sonntag vor Weihnachten und liegt zwischen dem 27. November und dem 3. Dezember. Mit ihm beginnt das Kirchenjahr; am Adventskranz wird die erste Kerze angezündet.",
  },
  {
    id: "de-nikolaus",
    lang: "de",
    slug: "nikolaus",
    name: "Nikolaus",
    question: "Wie viele Tage bis Nikolaus?",
    rule: { kind: "fixed", month: 12, day: 6 },
    zone: "local",
    holiday: "Nein, der Nikolaustag ist kein Feiertag.",
    about: "Am 6. Dezember wird des heiligen Nikolaus von Myra gedacht. Kinder stellen am Vorabend Stiefel vor die Tür, die über Nacht mit Süßigkeiten gefüllt werden.",
  },
];

function addDays(parts: DateParts, days: number): DateParts {
  const date = new Date(Date.UTC(parts.year, parts.month - 1, parts.day + days));
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
}

/** Gregoryen (Bati) Paskalya pazari — Anonim Gregoryen algoritmasi. */
export function easterSunday(year: number): DateParts {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return { year, month, day };
}

/** Ortodoks Paskalya pazarı: Meeus'un Jülyen hesabı, Gregoryen takvime çevrilmiş (1900–2099'da +13 gün). */
export function orthodoxEasterSunday(year: number): DateParts {
  const a = year % 4;
  const b = year % 7;
  const c = year % 19;
  const d = (19 * c + 15) % 30;
  const e = (2 * a + 4 * b - d + 34) % 7;
  const month = Math.floor((d + e + 114) / 31);
  const day = ((d + e + 114) % 31) + 1;
  return addDays({ year, month, day }, Math.floor(year / 100) - Math.floor(year / 400) - 2);
}

export function nthWeekday(year: number, month: number, weekday: number, nth: number): DateParts {
  const first = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const day = 1 + ((weekday - first + 7) % 7) + (nth - 1) * 7;
  return { year, month, day };
}

export function occurrenceInYear(event: CountdownEvent, year: number): DateParts | null {
  const rule = event.rule;
  switch (rule.kind) {
    case "fixed":
      return { year, month: rule.month, day: rule.day };
    case "nth-weekday":
      return addDays(nthWeekday(year, rule.month, rule.weekday, rule.nth), rule.offsetDays ?? 0);
    case "easter":
      return addDays(easterSunday(year), rule.offsetDays ?? 0);
    case "orthodox-easter":
      return addDays(orthodoxEasterSunday(year), rule.offsetDays ?? 0);
    case "fixed-many":
      return { year, month: rule.dates[0].month, day: rule.dates[0].day };
    case "sunday-before": {
      const anchor = new Date(Date.UTC(year, rule.month - 1, rule.day));
      const back = anchor.getUTCDay() || 7;
      return addDays({ year, month: rule.month, day: rule.day }, -back - (rule.weeksBack - 1) * 7);
    }
    case "hijri": {
      const v = rule.verified.find((d) => d.year === year);
      if (v) return v;
      const off = rule.offsetDays ?? 0;
      // Kaydırma tarihi önceki/sonraki yıla taşıyabilir: komşu yılların Hicri günü de denenir.
      for (const y of [year, year + 1, year - 1]) {
        const e = hijriEstimate(y, rule.hijriMonth, rule.hijriDay);
        if (!e) continue;
        const d = addDays(e, off);
        if (d.year === year) return { ...d, estimated: year > (rule.verifiedUntil ?? -Infinity) };
      }
      return null;
    }
    case "regaib":
      return regaibGunu(year, rule.verifiedUntil);
    case "list":
      return rule.dates.find((d) => d.year === year) ?? null;
    case "season": {
      const t = new Date(mevsimAni(year, rule.season).getTime() + 3 * 3600000);
      return { year, month: t.getUTCMonth() + 1, day: t.getUTCDate() };
    }
  }
}

/** Yıl içindeki bütün tarihler (çoğu etkinlikte tek tarih). */
export function occurrencesInYear(event: CountdownEvent, year: number): DateParts[] {
  if (event.rule.kind === "fixed-many") return event.rule.dates.map((d) => ({ year, month: d.month, day: d.day }));
  if (event.rule.kind === "list") return event.rule.dates.filter((d) => d.year === year);
  const one = occurrenceInYear(event, year);
  return one ? [one] : [];
}

let hijriFormatter: Intl.DateTimeFormat | null = null;

/** Regaib Kandili: Recep'in ilk cumasından (Umm al-Qura) bir gün önce; yıl içinde düşen ilk tarih. */
function regaibGunu(year: number, verifiedUntil?: number): DateParts | null {
  hijriFormatter ??= new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", { month: "numeric", day: "numeric", timeZone: "UTC" });
  for (let t = Date.UTC(year, 0, 2); new Date(t - 86400000).getUTCFullYear() <= year; t += 86400000) {
    const d = new Date(t);
    if (d.getUTCDay() !== 5) continue;
    const parts = hijriFormatter.formatToParts(d);
    const month = Number(parts.find((p) => p.type === "month")?.value);
    const day = Number(parts.find((p) => p.type === "day")?.value);
    if (month !== 7 || day > 7) continue;
    const once = new Date(t - 86400000);
    if (once.getUTCFullYear() !== year) continue;
    return { year, month: once.getUTCMonth() + 1, day: once.getUTCDate(), estimated: year > (verifiedUntil ?? -Infinity) };
  }
  return null;
}

/** Verilen miladi yilda Hicri ay/gunun denk geldigi tarih (Umm al-Qura), "tahmini" isaretli. */
export function hijriEstimate(year: number, hijriMonth: number, hijriDay: number): DateParts | null {
  hijriFormatter ??= new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", { month: "numeric", day: "numeric", timeZone: "UTC" });
  for (let offset = 0; offset < 366; offset += 1) {
    const date = new Date(Date.UTC(year, 0, 1 + offset));
    if (date.getUTCFullYear() !== year) break;
    const parts = hijriFormatter.formatToParts(date);
    const month = Number(parts.find((p) => p.type === "month")?.value);
    const day = Number(parts.find((p) => p.type === "day")?.value);
    if (month === hijriMonth && day === hijriDay) return { year, month: date.getUTCMonth() + 1, day: date.getUTCDate(), estimated: true };
  }
  return null;
}

/** Etkinlik gunu baslangicinin UTC zaman damgasi (istanbul: UTC+3; local: sunucuda UTC varsayilir). */
export function startMs(parts: DateParts, zone: CountdownEvent["zone"]) {
  return Date.UTC(parts.year, parts.month - 1, parts.day) - (zone === "istanbul" ? 3 * 3600000 : 0);
}

/** Simdiden sonraki (ya da bugunku) ilk tarih ve sonrakiler. Gun bittiyse bir sonraki yila gecer. */
export function upcomingOccurrences(event: CountdownEvent, now: Date, count: number): DateParts[] {
  const result: DateParts[] = [];
  const startYear = now.getUTCFullYear() - 1;
  for (let year = startYear; year < startYear + 12 && result.length < count; year += 1) {
    for (const parts of occurrencesInYear(event, year)) {
      // Etkinlik gunu tamamen gecmediyse dahil (gun boyu "bugun" gosterilir).
      if (startMs(parts, event.zone) + 86400000 > now.getTime() && result.length < count) result.push(parts);
    }
  }
  return result;
}

export function findCountdownEvent(lang: CountdownLang, slug: string) {
  return countdownEvents.find((event) => event.lang === lang && event.slug === slug) ?? null;
}

export function countdownPath(event: CountdownEvent) {
  return event.lang === "tr" ? `/geri-sayim/${event.slug}` : event.lang === "de" ? `/de/countdown/${event.slug}` : `/en/countdown/${event.slug}`;
}

/** Alle Sprachfassungen eines Anlasses (über die pair-Verweise verbunden) als Pfade für hreflang. */
export function countdownAlternatePaths(event: CountdownEvent): Partial<Record<CountdownLang, string>> {
  const group = new Set<CountdownEvent>([event]);
  let grew = true;
  while (grew) {
    grew = false;
    for (const other of countdownEvents) {
      if (group.has(other)) continue;
      const linked = [...group].some(
        (member) => member.lang !== other.lang && ((member.pair && member.pair === other.slug) || (other.pair && other.pair === member.slug)),
      );
      if (linked && ![...group].some((member) => member.lang === other.lang)) {
        group.add(other);
        grew = true;
      }
    }
  }
  return Object.fromEntries([...group].map((member) => [member.lang, countdownPath(member)]));
}

export function pairedEvent(event: CountdownEvent) {
  if (!event.pair) return null;
  return countdownEvents.find((other) => other.lang !== event.lang && other.slug === event.pair) ?? null;
}

/** Tam gun sayisi (canli sayactaki "gun" ile ayni). 0 ise ya bugun ya da 1 gunden az kaldi. */
export function daysUntil(parts: DateParts, zone: CountdownEvent["zone"], now: Date) {
  return Math.max(0, Math.floor((startMs(parts, zone) - now.getTime()) / 86400000));
}

export function hasStarted(parts: DateParts, zone: CountdownEvent["zone"], now: Date) {
  return startMs(parts, zone) <= now.getTime();
}
