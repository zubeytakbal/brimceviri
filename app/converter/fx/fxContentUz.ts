import type { FaqItem } from "../faqSchema";
import type { FxCurrencyInfo, FxLocaleContent, FxPair } from "./fxLocale";
import { formatMoney, formatNumber, formatPercent, formatRate, tableAmountsFor } from "./fxMath";
import type { FxPairPageData } from "./fxPageData";

// O'zbekcha doviz sayfalari: /uz/valyuta-aylantirgich/[juft]. Ciftler
// O'zbekistan'daki en yaygin kur sorgularina gore secildi: dollar ve yevro,
// isci gelirlerinin geldigi Rusya, Kazakistan ve Guney Kore, ticaret ve
// seyahat icin Turkiye, Cin, BAE ve komsu Kirgizistan / Tacikistan.

const NUMBER_LOCALE = "uz-UZ";
const TIME_ZONE = "Asia/Tashkent";

export const fxCurrenciesUz: Record<string, FxCurrencyInfo> = {
  UZS: { code: "UZS", short: "So'm", long: "O'zbekiston so'mi", lower: "so'm" },
  USD: { code: "USD", short: "Dollar", long: "AQSH dollari", lower: "dollar" },
  EUR: { code: "EUR", short: "Yevro", long: "yevro", lower: "yevro" },
  RUB: { code: "RUB", short: "Rubl", long: "Rossiya rubli", lower: "rubl" },
  KZT: { code: "KZT", short: "Tenge", long: "Qozog'iston tengesi", lower: "tenge" },
  KRW: { code: "KRW", short: "Von", long: "Janubiy Koreya voni", lower: "von" },
  TRY: { code: "TRY", short: "Turk lirasi", long: "Turk lirasi", lower: "turk lirasi" },
  GBP: { code: "GBP", short: "Funt sterling", long: "Britaniya funt sterlingi", lower: "funt sterling" },
  CNY: { code: "CNY", short: "Yuan", long: "Xitoy yuani", lower: "yuan" },
  AED: { code: "AED", short: "Dirham", long: "BAA dirhami", lower: "dirham" },
  KGS: { code: "KGS", short: "Qirg'iz somi", long: "Qirg'iziston somi", lower: "qirg'iz somi" },
  TJS: { code: "TJS", short: "Somoni", long: "Tojikiston somonisi", lower: "somoni" },
  JPY: { code: "JPY", short: "Iyena", long: "Yaponiya iyenasi", lower: "iyena" },
};

export const fxPairsUz: FxPair[] = [
  { slug: "dollar-som", from: "USD", to: "UZS" },
  { slug: "yevro-som", from: "EUR", to: "UZS" },
  { slug: "rubl-som", from: "RUB", to: "UZS" },
  { slug: "tenge-som", from: "KZT", to: "UZS" },
  { slug: "von-som", from: "KRW", to: "UZS" },
  { slug: "turk-lirasi-som", from: "TRY", to: "UZS" },
  { slug: "funt-som", from: "GBP", to: "UZS" },
  { slug: "yuan-som", from: "CNY", to: "UZS" },
  { slug: "dirham-som", from: "AED", to: "UZS" },
  { slug: "qirgiz-somi-som", from: "KGS", to: "UZS" },
  { slug: "somoni-som", from: "TJS", to: "UZS" },
  { slug: "iyena-som", from: "JPY", to: "UZS" },
];

export function getFxPairUz(slug: string): FxPair | undefined {
  return fxPairsUz.find((pair) => pair.slug === slug);
}

const UZ_TITLE_BUDGET = 42;

export function buildFxTitleUz(pair: FxPair): string {
  const from = fxCurrenciesUz[pair.from];
  const to = fxCurrenciesUz[pair.to];
  const candidates = [
    `${from.short} kursi: 1 ${from.lower} necha ${to.lower}?`,
    `1 ${from.lower} necha ${to.lower}? Bugungi kurs`,
    `${from.short} kursi bugun`,
  ];
  return candidates.find((title) => title.length <= UZ_TITLE_BUDGET) ?? candidates[candidates.length - 1];
}

const rate = (value: number) => formatRate(value, NUMBER_LOCALE);
const money = (value: number) => formatMoney(value, NUMBER_LOCALE);
const count = (value: number) => formatNumber(value, NUMBER_LOCALE);
const percent = (value: number) => `${formatPercent(Math.abs(value), NUMBER_LOCALE)}%`;

export function formatUzDateTime(unix: number): string {
  const date = new Date(unix * 1000);
  const day = new Intl.DateTimeFormat(NUMBER_LOCALE, { day: "numeric", month: "long", year: "numeric", timeZone: TIME_ZONE }).format(date);
  const time = new Intl.DateTimeFormat(NUMBER_LOCALE, { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: TIME_ZONE }).format(date);
  return `${day}, ${time}`;
}

export function formatUzDate(iso: string): string {
  return new Intl.DateTimeFormat(NUMBER_LOCALE, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
}

const ZONE = "(Toshkent vaqti)";

function capitalizeUz(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function describeChange(changePercent: number) {
  if (Math.abs(changePercent) < 0.05) return { verb: "deyarli o'zgarmadi", noun: "deyarli o'zgarish yo'q", direction: "flat" as const };
  return changePercent > 0
    ? { verb: `${percent(changePercent)} oshdi`, noun: `${percent(changePercent)} o'sish`, direction: "up" as const }
    : { verb: `${percent(changePercent)} pasaydi`, noun: `${percent(changePercent)} pasayish`, direction: "down" as const };
}

function buildAnalysis(pair: FxPair, data: FxPairPageData): string[] {
  const from = fxCurrenciesUz[pair.from];
  const to = fxCurrenciesUz[pair.to];
  const paragraphs = [
    `${formatUzDateTime(data.latest.lastUpdateUnix)} ${ZONE} e'lon qilingan ma'lumotnoma kursiga ko'ra 1 ${from.long} (${from.code}) = ${rate(data.rate)} ${to.long} (${to.code}). Teskari yo'nalishda 1 ${to.code} = ${rate(data.inverse)} ${from.code}.`,
  ];

  if (data.stats30) {
    const s = data.stats30;
    const change = describeChange(s.changePercent);
    const meaning =
      change.direction === "flat"
        ? ""
        : change.direction === "up"
          ? ` Ya'ni bir oy oldingiga nisbatan endi 1 ${from.code} uchun ko'proq ${to.lower} beriladi.`
          : ` Ya'ni bir oy oldingiga nisbatan endi 1 ${from.code} uchun kamroq ${to.lower} beriladi.`;
    paragraphs.push(
      `So'nggi 30 kunda ${from.code}/${to.code} kursi ${change.verb}: ${formatUzDate(s.first.date)} kuni ${rate(s.first.value)}, ${formatUzDate(s.last.date)} kuni ${rate(s.last.value)} bo'ldi. Bu davrda eng yuqori qiymat ${rate(s.high.value)} (${formatUzDate(s.high.date)}), eng past qiymat ${rate(s.low.value)} (${formatUzDate(s.low.date)}); 30 kunlik o'rtacha ${rate(s.average)}.${meaning}`
    );
  }

  if (data.stats1y) {
    const s = data.stats1y;
    paragraphs.push(
      `Bir yillik manzara: bir yil oldin, ${formatUzDate(s.first.date)} kuni 1 ${from.code} = ${rate(s.first.value)} ${to.code} edi; ${formatUzDate(s.last.date)} holatiga ko'ra ${rate(s.last.value)} ${to.code}. Bu bir yilda ${describeChange(s.changePercent).noun} demakdir.`
    );
  }

  return paragraphs;
}

function buildFaq(pair: FxPair, data: FxPairPageData | null): FaqItem[] {
  const from = fxCurrenciesUz[pair.from];
  const to = fxCurrenciesUz[pair.to];
  const items: FaqItem[] = [];

  if (data) {
    const published = `${formatUzDateTime(data.latest.lastUpdateUnix)} ${ZONE}`;
    // Teskari savolda miqdor so'mga mos tanlanadi: "1 000 000 so'm necha dollar?"
    const reverseAmount = 1000 * tableAmountsFor(data.inverse)[0];
    items.push(
      {
        question: `1 ${from.lower} necha ${to.lower}?`,
        answer: `${published} holatidagi ma'lumotnoma kursiga ko'ra 1 ${from.long} = ${rate(data.rate)} ${to.long}. Banklar va ayirboshlash shoxobchalari ustama qo'ygani uchun valyuta sotib olishda kurs odatda biroz yuqori, sotishda esa biroz past bo'ladi.`,
      },
      {
        question: `100 ${from.lower} necha ${to.lower}?`,
        answer: `Shu kurs bo'yicha 100 ${from.code} = ${money(100 * data.rate)} ${to.code}, ${count(1000)} ${from.code} esa ${money(1000 * data.rate)} ${to.code}.`,
      },
      {
        question: `${count(reverseAmount)} ${to.lower} necha ${from.lower}?`,
        answer: `Teskari yo'nalishda 1 ${to.code} = ${rate(data.inverse)} ${from.code}, ya'ni ${count(reverseAmount)} ${to.code} = ${money(reverseAmount * data.inverse)} ${from.code}.`,
      },
      {
        question: "Bu kurs qachon yangilandi?",
        answer: data.latest.nextUpdateUnix
          ? `Manba (${data.latest.providerName}) bu kursni ${published} e'lon qildi. Kurslar kuniga bir marta yangilanadi; keyingi yangilanish taxminan ${formatUzDateTime(data.latest.nextUpdateUnix)} ${ZONE} kutilmoqda. Sahifadagi hisoblagich ma'lumot qancha vaqt oldin e'lon qilinganini jonli ko'rsatadi.`
          : `Manba (${data.latest.providerName}) bu kursni ${published} e'lon qildi. Kurslar kuniga bir marta yangilanadi.`,
      }
    );
  } else {
    items.push({
      question: "Bu kurs qanchalik tez-tez yangilanadi?",
      answer: "Ma'lumotnoma kurslari kuniga bir marta yangilanadi. Sahifada manba kursni qachon e'lon qilgani va keyingi yangilanishgacha qancha vaqt qolgani ko'rsatiladi.",
    });
  }

  items.push(
    {
      question: `Nega bankdagi ${from.lower} kursi boshqacha?`,
      answer: `Bu yerda sotib olish va sotish kurslari o'rtasidagi o'rta kurs (ma'lumotnoma kursi) ko'rsatiladi. Banklar va ayirboshlash shoxobchalari ${from.long}ni sotishda bu kursga ustama qo'shadi, sotib olishda esa undan past kurs beradi; bu farq ko'pincha alohida to'lov sifatida yozilmaydi. Sahifadagi kurs farqi kalkulyatori bu farq sizga necha ${to.lower}ga tushayotganini ko'rsatadi.`,
    },
    {
      question: "Bu Markaziy bank kursimi?",
      answer:
        "Yo'q. Bu yerda xalqaro bozorning kunlik o'rta ma'lumotnoma kursi ko'rsatiladi. O'zbekiston Respublikasi Markaziy banki o'zining rasmiy kursini alohida e'lon qiladi, tijorat banklarining sotish va sotib olish kurslari esa undan farq qilishi mumkin. Rasmiy kurs uchun cbu.uz saytiga qarang.",
    }
  );

  if (data?.stats30) {
    items.push({
      question: `So'nggi 30 kunda ${from.lower} kursi qancha o'zgardi?`,
      answer: `So'nggi 30 kunda ${from.code}/${to.code} kursi ${describeChange(data.stats30.changePercent).verb}. Bu davrdagi eng yuqori qiymat ${rate(data.stats30.high.value)}, eng past qiymat ${rate(data.stats30.low.value)} bo'ldi.`,
    });
  }

  items.push({
    question: "Bu sahifadagi kurs bo'yicha valyuta almashtirsa bo'ladimi?",
    answer:
      "Yo'q. Bu sahifadagi kurs ma'lumot uchun berilgan kunlik ma'lumotnoma kursi bo'lib, oldi-sotdi taklifi emas. Haqiqiy ayirboshlash kursini amaliyotni bajaradigan bank, shoxobcha yoki pul o'tkazish xizmati belgilaydi.",
  });

  return items;
}

export const fxContentUz: FxLocaleContent = {
  numberLocale: NUMBER_LOCALE,
  htmlLang: "uz",
  ogLocale: "uz_UZ",
  basePath: "/uz/valyuta-aylantirgich",
  homeHref: "/uz",
  quote: "UZS",
  currencies: fxCurrenciesUz,
  pairs: fxPairsUz,
  defaultMarkupDirection: "buy",
  labels: {
    relative: {
      pastTemplate: "{t} oldin",
      futureTemplate: "{t}dan keyin",
      justNow: "hozirgina",
      due: "manba yangi kursni e'lon qilgan bo'lishi kerak; sahifa tez orada yangilanadi",
      stale: "(ma'lumot kutilganidan eskiroq)",
      minute: ["daqiqa", "daqiqa"],
      hour: ["soat", "soat"],
      day: ["kun", "kun"],
    },
    converter: {
      amount: "Miqdor",
      swap: "Yo'nalishni almashtirish",
      resultTemplate: "{amount} {from} = {result} {to}",
      rateTemplate: "Qo'llanilgan kurs: 1 {from} = {rate} {to}",
      invalid: "To'g'ri miqdor kiriting (masalan, 250 yoki 1 250,50).",
    },
    chart: {
      range30: "30 kun",
      range1y: "1 yil",
      ariaTemplate: "{pair} kurs grafigi ({range})",
      high: "Eng yuqori",
      low: "Eng past",
      manualDates: {
        monthsShort: ["yan", "fev", "mar", "apr", "may", "iyn", "iyl", "avg", "sen", "okt", "noy", "dek"],
        short: "{d}-{m}",
        withYear: "{d}-{m}, {y}",
      },
    },
    markup: {
      directionLabel: "Amaliyot",
      buy: "{from} sotib olaman",
      sell: "{from} sotaman",
      amount: "Miqdor ({from})",
      bankRate: "Bank kursi (1 {from}, {to})",
      midRate: "Ma'lumotnoma o'rta kurs",
      prompt: "Bank yoki ayirboshlash shoxobchasi sizga taklif qilayotgan kursni kiriting; kurs farqi sizga qanchaga tushayotganini ko'ring.",
      cost: "Kurs farqi xarajati",
      markup: "O'rta kursdan farq",
      midTotal: "O'rta kurs bo'yicha summa",
      bankTotal: "Bank kursi bo'yicha summa",
      favorable:
        "Kiritilgan kurs o'rta kursga nisbatan sizning foydangizga ko'rinmoqda. Kurs kun davomida o'zgargan bo'lishi mumkin; kurs va amaliyot yo'nalishi to'g'ri kiritilganini tekshiring.",
      bands: [
        "Farq juda kichik: o'rta kursga ancha yaqin.",
        "Me'yoriy farq: ko'plab banklar va shoxobchalar shu oraliqda ustama qo'yadi.",
        "Farq katta: boshqa bank yoki shoxobcha kursini solishtirib ko'ring.",
        "Farq juda katta: bu amaliyotda kurs farqi jiddiy yashirin xarajatga aylanmoqda.",
      ],
      note: "O'rta kurs kunlik ma'lumotnoma kursidir; bozor kun davomida o'zgaradi, shuning uchun kichik farqning bir qismi kurs o'zgarishidan ham kelib chiqishi mumkin. Alohida komissiya yoki o'tkazma to'lovi bu hisobga kirmaydi.",
      percentTemplate: "{v}%",
    },
    multi: {
      amount: "Miqdor",
      from: "Qaysi valyutadan",
      to: "Qaysi valyutaga",
      swap: "Yo'nalishni almashtirish",
      resultTemplate: "{amount} {from} = {result} {to}",
      rateTemplate: "Qo'llanilgan kurs: 1 {from} = {rate} {to}",
      invalid: "To'g'ri miqdor kiriting (masalan, 250 yoki 1 250,50).",
    },
  },
  formatDateTime: (unix) => `${formatUzDateTime(unix)} ${ZONE}`,
  formatDate: formatUzDate,
  common: {
    home: "Bosh sahifa",
    hub: "Valyuta Aylantirgich",
    breadcrumbAria: "Sahifa yo'li",
    unavailable: "Joriy kurs hozircha olinmadi. Birozdan so'ng qayta urinib ko'ring.",
    faqTitle: "Tez-tez So'raladigan Savollar",
    sourcesTitle: "Manbalar",
    sourceLatest: "– joriy ma'lumotnoma kursi va e'lon qilingan vaqt (kuniga bir marta yangilanadi).",
    sourceHistory: "– grafik va statistikadagi o'tgan kunlik kurslar. Manbalar turlicha bo'lgani uchun grafikning oxirgi nuqtasi joriy kursdan biroz farq qilishi mumkin.",
    disclaimer: "Bu sahifadagi kurslar ma'lumot uchun berilgan va oldi-sotdi taklifi emas; haqiqiy amaliyot kursini amaliyotni bajaradigan tashkilot belgilaydi.",
  },
  pair: {
    pairName: (pair) => `${fxCurrenciesUz[pair.from].short} – ${fxCurrenciesUz[pair.to].short}`,
    h1: (pairName) => `${pairName} aylantirgich`,
    heroDescription: (pair) =>
      `${capitalizeUz(fxCurrenciesUz[pair.from].long)} va ${fxCurrenciesUz[pair.to].long} o'rtasida kunlik ma'lumotnoma kursi bo'yicha aylantiring. Kurs qachon e'lon qilinganini jonli hisoblagichda ko'ring.`,
    title: buildFxTitleUz,
    description: (pair, data) => {
      const from = fxCurrenciesUz[pair.from];
      const to = fxCurrenciesUz[pair.to];
      return data
        ? `1 ${from.code} = ${rate(data.rate)} ${to.code} (${formatUzDateTime(data.latest.lastUpdateUnix)} ${ZONE} ma'lumotnoma kursi). ${from.short} – ${to.short} aylantirgich, 30 kunlik va 1 yillik grafik, bank kursi farqini hisoblash.`
        : `${from.short} – ${to.short} aylantirgich: kunlik ma'lumotnoma kursi, 30 kunlik va 1 yillik grafik, aylantirish jadvali va bank kursi farqini hisoblash.`;
    },
    currentRate: "Joriy kurs",
    inverseRate: "Teskari kurs",
    published: "Manbada e'lon qilingan",
    nextUpdate: "Keyingi yangilanish",
    rateType: "Kurs turi",
    rateTypeValue: (provider) => `Kunlik ma'lumotnoma o'rta kurs (${provider})`,
    noData: "Kurs ma'lumoti hozircha yo'q.",
    chartTitle: (pair) => `${pair.from}/${pair.to} kurs grafigi`,
    analysisTitle: (pairName) => `${pairName} kursi qanday o'zgardi?`,
    tableTitle: (pairName) => `${pairName} aylantirish jadvali`,
    markupTitle: "Bank kursi farqi kalkulyatori",
    markupIntro:
      "Bank yoki ayirboshlash shoxobchasi bergan kursni kiriting; o'rta kursga nisbatan qancha farq to'layotganingizni, ya'ni kurs farqining sizga haqiqiy narxini darhol ko'ring.",
    midRateTitle: "O'rta kurs nima va qanday hisoblanadi?",
    midRateP1: (pair) => {
      const from = fxCurrenciesUz[pair.from].short;
      const to = fxCurrenciesUz[pair.to].short;
      return {
        before: "O'rta kurs (ma'lumotnoma kursi) bozordagi sotib olish va sotish kurslarining o'rtasidir. Bu sahifadagi aylantirgich shu kursdan foydalanadi: ",
        formula: `${to} summasi = ${from} miqdori × kurs`,
        after: `. Teskari yo'nalishda ${from} miqdori = ${to} summasi ÷ kurs.`,
      };
    },
    midRateP2: {
      before:
        "Banklar, ayirboshlash shoxobchalari va karta to'lovlari ko'pincha bu kursga ustama qo'shadi (valyuta sotishda) yoki undan past kurs beradi (valyuta sotib olishda). Bu ustama alohida to'lov sifatida yozilmagani uchun uni sezish qiyin; yuqoridagi ",
      link: "bank kursi farqi kalkulyatori",
      after: " shu yashirin xarajatni ko'rsatib beradi.",
    },
    relatedTitle: "Boshqa valyuta aylantirishlari",
    allRatesLink: "Barcha valyuta kurslari va aylantirgich",
    analysis: buildAnalysis,
    faq: buildFaq,
    officialRateNote: {
      title: "Markaziy bank kursi va bank kurslari",
      paragraphs: [
        "Bu sahifadagi kurs xalqaro bozorning kunlik o'rta ma'lumotnoma kursidir; u O'zbekiston Respublikasi Markaziy bankining rasmiy kursi emas. Tijorat banklari valyutani sotish va sotib olish uchun o'z kurslarini belgilaydi, shuning uchun bankdagi kurs bu yerda ko'rsatilgan hisobdan farq qilishi mumkin.",
        "Valyuta almashtirish yoki pul o'tkazishdan oldin bir nechta bank yoki xizmatning kursi va komissiyasini solishtiring hamda ularning kursini yuqoridagi kalkulyatorga kiritib, farqni ko'ring.",
      ],
      link: { href: "https://cbu.uz", label: "O'zbekiston Respublikasi Markaziy banki (cbu.uz)" },
    },
  },
  hub: {
    title: "Valyuta Aylantirgich: Bugungi Kurslar",
    description:
      "Dollar, yevro, rubl, tenge, von va boshqa valyutalar uchun kunlik ma'lumotnoma kursi bilan so'mga aylantirgich. E'lon vaqti, jonli hisoblagich, 30 kunlik o'zgarish va bank kursi farqini hisoblash.",
    ogDescription: "Kunlik ma'lumotnoma kursi bilan so'm va 12 ta valyuta o'rtasida aylantirish; e'lon vaqti va 30 kunlik o'zgarish.",
    h1: "Valyuta Aylantirgich",
    intro:
      "Kunlik ma'lumotnoma kursi bilan so'm va 12 ta valyuta o'rtasida aylantiring. Kurs manbada qachon e'lon qilinganini, necha soat oldin yangilanganini va keyingi yangilanishgacha qancha vaqt qolganini jonli ko'ring.",
    boardTitle: "Bugungi valyuta kurslari (so'mda)",
    colCurrency: "Valyuta",
    colOneUnit: "1 birlik",
    colChange: "30 kunlik o'zgarish",
    boardNote:
      "30 kunlik o'zgarish valyutaning so'mga nisbatan o'zgarishidir: ▲ bir xil miqdordagi valyuta uchun endi ko'proq so'm berilishini, ▼ kamroq so'm berilishini bildiradi.",
    pairsTitle: "Valyuta aylantirishlari",
    faq: [
      {
        question: "Bu kurslar qanchalik tez-tez yangilanadi?",
        answer:
          "Kurslar kuniga bir marta yangilanadigan ma'lumotnoma kurslaridir. Sahifaning yuqorisida manba kursni qaysi sana va vaqtda e'lon qilgani, ma'lumot necha daqiqa yoki soat oldingi ekanligi va keyingi yangilanishgacha qancha vaqt qolgani jonli ko'rsatiladi. Bu har soniyada o'zgaradigan bozor kursi emas.",
      },
      {
        question: "Bu yerdagi kurs bank kursidan nima uchun farq qiladi?",
        answer:
          "Bu yerda sotib olish va sotish kurslari o'rtasidagi o'rta kurs ko'rsatiladi. Banklar va ayirboshlash shoxobchalari amaliyotlarda unga ustama qo'shadi. Har bir valyuta sahifasidagi bank kursi farqi kalkulyatori bu farqning sizga narxini ko'rsatadi.",
      },
      {
        question: "Bu Markaziy bank kursimi?",
        answer:
          "Yo'q. Bu xalqaro bozorning kunlik ma'lumotnoma kursi. O'zbekiston Respublikasi Markaziy bankining rasmiy kursi va tijorat banklarining kurslari undan farq qilishi mumkin; amaliyotning yakuniy kursini bank yoki xizmat belgilaydi.",
      },
      {
        question: "Qaysi valyutalar qo'llab-quvvatlanadi?",
        answer:
          "O'zbekiston so'mi, AQSH dollari, yevro, Rossiya rubli, Qozog'iston tengesi, Janubiy Koreya voni, Turk lirasi, Britaniya funt sterlingi, Xitoy yuani, BAA dirhami, Qirg'iziston somi, Tojikiston somonisi va Yaponiya iyenasi o'rtasida aylantirish mumkin.",
      },
    ],
    relatedTitle: "Tegishli vositalar",
    relatedLinks: [
      { href: "/uz/sof-oltin-hisoblash", label: "Sof oltin hisoblash" },
      { href: "/uz/sayohat-rozetka-voltaj-hisoblash", label: "Sayohat: rozetka va voltaj" },
      { href: "/uz/turkumlar", label: "Barcha turkumlar" },
      { href: "/uz", label: "Bosh sahifa" },
    ],
    quoteLabel: "so'm",
    percent: (value) => percent(value),
  },
};
