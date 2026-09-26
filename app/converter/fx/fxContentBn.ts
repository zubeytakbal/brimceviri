import type { FaqItem } from "../faqSchema";
import type { FxCurrencyInfo, FxLocaleContent, FxPair } from "./fxLocale";
import { formatMoney, formatNumber, formatPercent, formatRate } from "./fxMath";
import type { FxPairPageData } from "./fxPageData";

// Bengalce (Banglades) doviz sayfalari: /bn/currency-converter/[pair].
// Ciftler Banglades'in en buyuk dovizi olan yurt disi isci gelirlerine
// (remittance) gore secildi: Korfez ulkeleri, Malezya, Singapur, Ingiltere,
// AB, ABD; ayrica sinir ticareti ve seyahat icin Hindistan rupisi.

const NUMBER_LOCALE = "bn-BD";
const TIME_ZONE = "Asia/Dhaka";

export const fxCurrenciesBn: Record<string, FxCurrencyInfo> = {
  BDT: { code: "BDT", short: "টাকা", long: "বাংলাদেশি টাকা", lower: "টাকা" },
  USD: { code: "USD", short: "ডলার", long: "মার্কিন ডলার", lower: "ডলার" },
  SAR: { code: "SAR", short: "সৌদি রিয়াল", long: "সৌদি রিয়াল", lower: "সৌদি রিয়াল" },
  AED: { code: "AED", short: "দিরহাম", long: "সংযুক্ত আরব আমিরাত দিরহাম", lower: "দিরহাম" },
  MYR: { code: "MYR", short: "রিংগিত", long: "মালয়েশিয়ান রিংগিত", lower: "রিংগিত" },
  QAR: { code: "QAR", short: "কাতারি রিয়াল", long: "কাতারি রিয়াল", lower: "কাতারি রিয়াল" },
  KWD: { code: "KWD", short: "কুয়েতি দিনার", long: "কুয়েতি দিনার", lower: "কুয়েতি দিনার" },
  OMR: { code: "OMR", short: "ওমানি রিয়াল", long: "ওমানি রিয়াল", lower: "ওমানি রিয়াল" },
  BHD: { code: "BHD", short: "বাহরাইনি দিনার", long: "বাহরাইনি দিনার", lower: "বাহরাইনি দিনার" },
  SGD: { code: "SGD", short: "সিঙ্গাপুর ডলার", long: "সিঙ্গাপুর ডলার", lower: "সিঙ্গাপুর ডলার" },
  GBP: { code: "GBP", short: "পাউন্ড", long: "ব্রিটিশ পাউন্ড", lower: "পাউন্ড" },
  EUR: { code: "EUR", short: "ইউরো", long: "ইউরো", lower: "ইউরো" },
  INR: { code: "INR", short: "রুপি", long: "ভারতীয় রুপি", lower: "রুপি" },
  CAD: { code: "CAD", short: "কানাডিয়ান ডলার", long: "কানাডিয়ান ডলার", lower: "কানাডিয়ান ডলার" },
  AUD: { code: "AUD", short: "অস্ট্রেলিয়ান ডলার", long: "অস্ট্রেলিয়ান ডলার", lower: "অস্ট্রেলিয়ান ডলার" },
};

export const fxPairsBn: FxPair[] = [
  { slug: "usd-to-bdt", from: "USD", to: "BDT" },
  { slug: "sar-to-bdt", from: "SAR", to: "BDT" },
  { slug: "aed-to-bdt", from: "AED", to: "BDT" },
  { slug: "myr-to-bdt", from: "MYR", to: "BDT" },
  { slug: "qar-to-bdt", from: "QAR", to: "BDT" },
  { slug: "kwd-to-bdt", from: "KWD", to: "BDT" },
  { slug: "omr-to-bdt", from: "OMR", to: "BDT" },
  { slug: "gbp-to-bdt", from: "GBP", to: "BDT" },
  { slug: "eur-to-bdt", from: "EUR", to: "BDT" },
  { slug: "sgd-to-bdt", from: "SGD", to: "BDT" },
  { slug: "bhd-to-bdt", from: "BHD", to: "BDT" },
  { slug: "inr-to-bdt", from: "INR", to: "BDT" },
  { slug: "cad-to-bdt", from: "CAD", to: "BDT" },
  { slug: "aud-to-bdt", from: "AUD", to: "BDT" },
];

export function getFxPairBn(slug: string): FxPair | undefined {
  return fxPairsBn.find((pair) => pair.slug === slug);
}

// Kok baslik sablonu 18 karakter ekler. Bengalce'de sesli harf isaretleri
// ayri kod noktasi oldugu icin uzunluk JS karakteriyle degil, ekranda
// gorunen harf (grapheme) sayisiyla olculur.
const BN_TITLE_BUDGET = 36; // Bengalce harfler Latin harflerden genis; Google ~600 px keser.
const graphemes = new Intl.Segmenter(NUMBER_LOCALE, { granularity: "grapheme" });
const visibleLength = (value: string) => [...graphemes.segment(value)].length;

export function buildFxTitleBn(pair: FxPair): string {
  const from = fxCurrenciesBn[pair.from].short;
  const to = fxCurrenciesBn[pair.to].short;
  const candidates = [`আজকের ${from} রেট: ১ ${from} কত ${to}?`, `${from} রেট: ১ ${from} কত ${to}?`, `${from} থেকে ${to} রেট`];
  return candidates.find((title) => visibleLength(title) <= BN_TITLE_BUDGET) ?? candidates[candidates.length - 1];
}

const rate = (value: number) => formatRate(value, NUMBER_LOCALE);
const money = (value: number) => formatMoney(value, NUMBER_LOCALE);
const count = (value: number) => formatNumber(value, NUMBER_LOCALE);
const percent = (value: number) => `${formatPercent(Math.abs(value), NUMBER_LOCALE)}%`;

export function formatBnDateTime(unix: number): string {
  const date = new Date(unix * 1000);
  const day = new Intl.DateTimeFormat(NUMBER_LOCALE, { day: "numeric", month: "long", year: "numeric", timeZone: TIME_ZONE }).format(date);
  const time = new Intl.DateTimeFormat(NUMBER_LOCALE, { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: TIME_ZONE }).format(date);
  return `${day}, ${time}`;
}

export function formatBnDate(iso: string): string {
  return new Intl.DateTimeFormat(NUMBER_LOCALE, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
}

const ZONE = "(বাংলাদেশ সময়)";

function describeChange(changePercent: number) {
  if (Math.abs(changePercent) < 0.05) return { verb: "প্রায় অপরিবর্তিত ছিল", noun: "প্রায় কোনো পরিবর্তন হয়নি", direction: "flat" as const };
  return changePercent > 0
    ? { verb: `${percent(changePercent)} বেড়েছে`, noun: `${percent(changePercent)} বৃদ্ধি`, direction: "up" as const }
    : { verb: `${percent(changePercent)} কমেছে`, noun: `${percent(changePercent)} হ্রাস`, direction: "down" as const };
}

function buildAnalysis(pair: FxPair, data: FxPairPageData): string[] {
  const from = fxCurrenciesBn[pair.from];
  const to = fxCurrenciesBn[pair.to];
  const paragraphs = [
    `${formatBnDateTime(data.latest.lastUpdateUnix)} ${ZONE} প্রকাশিত রেফারেন্স রেট অনুযায়ী ১ ${from.long} (${from.code}) = ${rate(data.rate)} ${to.long} (${to.code})। বিপরীত দিকে ১ ${to.code} = ${rate(data.inverse)} ${from.code}।`,
  ];

  if (data.stats30) {
    const s = data.stats30;
    const change = describeChange(s.changePercent);
    const meaning =
      change.direction === "flat"
        ? ""
        : change.direction === "up"
          ? ` অর্থাৎ এক মাস আগের তুলনায় এখন ১ ${from.code}-এর বিপরীতে বেশি ${to.long} পাওয়া যায়।`
          : ` অর্থাৎ এক মাস আগের তুলনায় এখন ১ ${from.code}-এর বিপরীতে কম ${to.long} পাওয়া যায়।`;
    paragraphs.push(
      `গত ৩০ দিনে ${from.code}/${to.code} রেট ${change.verb}: ${formatBnDate(s.first.date)} তারিখে ছিল ${rate(s.first.value)}, ${formatBnDate(s.last.date)} তারিখে ${rate(s.last.value)}। এই সময়ে সর্বোচ্চ রেট ${rate(s.high.value)} (${formatBnDate(s.high.date)}), সর্বনিম্ন ${rate(s.low.value)} (${formatBnDate(s.low.date)}); ৩০ দিনের গড় ${rate(s.average)}।${meaning}`
    );
  }

  if (data.stats1y) {
    const s = data.stats1y;
    paragraphs.push(
      `এক বছরের চিত্র: এক বছর আগে, ${formatBnDate(s.first.date)} তারিখে ১ ${from.code} = ${rate(s.first.value)} ${to.code} ছিল; ${formatBnDate(s.last.date)} অনুযায়ী তা ${rate(s.last.value)} ${to.code}। অর্থাৎ এক বছরে ${describeChange(s.changePercent).noun}।`
    );
  }

  return paragraphs;
}

function buildFaq(pair: FxPair, data: FxPairPageData | null): FaqItem[] {
  const from = fxCurrenciesBn[pair.from];
  const to = fxCurrenciesBn[pair.to];
  const items: FaqItem[] = [];

  if (data) {
    const published = `${formatBnDateTime(data.latest.lastUpdateUnix)} ${ZONE}`;
    items.push(
      {
        question: `১ ${from.lower} কত ${to.lower}?`,
        answer: `${published} তারিখের রেফারেন্স রেট অনুযায়ী ১ ${from.long} = ${rate(data.rate)} ${to.long}। ব্যাংক, এক্সচেঞ্জ হাউস ও মানি ট্রান্সফার সেবাগুলো মার্জিন রাখে, তাই ${from.lower} বিক্রি বা দেশে পাঠানোর সময় সাধারণত এর চেয়ে কিছুটা কম এবং কেনার সময় কিছুটা বেশি রেট পাওয়া যায়।`,
      },
      {
        question: `১০০ ${from.lower} কত ${to.lower}?`,
        answer: `একই রেটে ১০০ ${from.code} = ${money(100 * data.rate)} ${to.code} এবং ${count(1000)} ${from.code} = ${money(1000 * data.rate)} ${to.code}।`,
      },
      {
        question: `${count(1000)} ${to.lower} কত ${from.lower}?`,
        answer: `বিপরীত দিকে ১ ${to.long} = ${rate(data.inverse)} ${from.long}, অর্থাৎ ${count(1000)} ${to.code} = ${money(1000 * data.inverse)} ${from.code}।`,
      },
      {
        question: "এই রেট কখন হালনাগাদ হয়েছে?",
        answer: data.latest.nextUpdateUnix
          ? `উৎস (${data.latest.providerName}) এই রেটটি ${published} প্রকাশ করেছে। রেট দিনে একবার হালনাগাদ হয়; পরবর্তী হালনাগাদ ${formatBnDateTime(data.latest.nextUpdateUnix)} ${ZONE} নাগাদ প্রত্যাশিত। পাতার লাইভ কাউন্টার দেখায় তথ্যটি কত সময় আগে প্রকাশিত হয়েছে।`
          : `উৎস (${data.latest.providerName}) এই রেটটি ${published} প্রকাশ করেছে। রেট দিনে একবার হালনাগাদ হয়।`,
      }
    );
  } else {
    items.push({
      question: "এই রেট কত ঘন ঘন হালনাগাদ হয়?",
      answer: "রেফারেন্স রেট দিনে একবার হালনাগাদ হয়। পাতায় উৎস কখন রেট প্রকাশ করেছে এবং পরবর্তী হালনাগাদ পর্যন্ত কত সময় বাকি তা দেখানো হয়।",
    });
  }

  items.push(
    {
      question: `ব্যাংক বা এক্সচেঞ্জ হাউসের ${from.lower} রেট আলাদা কেন?`,
      answer: `এখানে দেখানো রেটটি কেনা ও বেচার রেটের মাঝামাঝি মধ্যবর্তী রেট (রেফারেন্স রেট)। ব্যাংক ও এক্সচেঞ্জ হাউস ${from.long} বিক্রির সময় এর ওপরে এবং কেনার সময় এর নিচে একটি মার্জিন রাখে; এই পার্থক্য প্রায়ই আলাদা ফি হিসেবে লেখা থাকে না। পাতার রেট পার্থক্য ক্যালকুলেটরে দেখতে পাবেন এই পার্থক্যে আপনার কত ${to.lower} খরচ হচ্ছে।`,
    },
    {
      question: "এটি কি বাংলাদেশ ব্যাংকের রেট?",
      answer:
        "না। এখানে দেখানো রেট আন্তর্জাতিক বাজারের দৈনিক মধ্যবর্তী রেফারেন্স রেট। বাংলাদেশ ব্যাংক ও বাণিজ্যিক ব্যাংকগুলোর ঘোষিত রেট এর থেকে আলাদা হতে পারে। রেমিট্যান্সে প্রণোদনা (যদি থাকে) সহ আপনার হাতে কত টাকা আসবে, তা চূড়ান্তভাবে আপনার ব্যাংক বা রেমিট্যান্স সেবাই নির্ধারণ করে।",
    }
  );

  if (data?.stats30) {
    items.push({
      question: `গত ৩০ দিনে ${from.lower} রেট কতটা বদলেছে?`,
      answer: `গত ৩০ দিনে ${from.code}/${to.code} রেট ${describeChange(data.stats30.changePercent).verb}। এই সময়ে সর্বোচ্চ রেট ছিল ${rate(data.stats30.high.value)} এবং সর্বনিম্ন ${rate(data.stats30.low.value)}।`,
    });
  }

  items.push({
    question: "এই পাতার রেটে কি লেনদেন করা যায়?",
    answer:
      "না। এই পাতার রেট শুধু তথ্যের জন্য দেওয়া দৈনিক রেফারেন্স রেট; এটি কেনা-বেচার কোনো প্রস্তাব নয়। প্রকৃত লেনদেনের রেট নির্ধারণ করে আপনার ব্যাংক, এক্সচেঞ্জ হাউস বা মানি ট্রান্সফার সেবা।",
  });

  return items;
}

export const fxContentBn: FxLocaleContent = {
  numberLocale: NUMBER_LOCALE,
  htmlLang: "bn",
  ogLocale: "bn_BD",
  basePath: "/bn/currency-converter",
  homeHref: "/bn",
  quote: "BDT",
  currencies: fxCurrenciesBn,
  pairs: fxPairsBn,
  // Bangladesli kullanicilarin cogu yurt disinda kazandigi dovizi bozdurup
  // eve gonderir (remittance); bu yuzden varsayilan yon "bozdurma".
  defaultMarkupDirection: "sell",
  labels: {
    relative: {
      pastTemplate: "{t} আগে",
      futureTemplate: "{t} পরে",
      justNow: "এইমাত্র",
      due: "উৎস নতুন রেট প্রকাশ করেছে; পাতাটি শিগগিরই হালনাগাদ হবে",
      stale: "(তথ্যটি প্রত্যাশার চেয়ে পুরোনো)",
      minute: ["মিনিট", "মিনিট"],
      hour: ["ঘণ্টা", "ঘণ্টা"],
      day: ["দিন", "দিন"],
    },
    converter: {
      amount: "পরিমাণ",
      swap: "দিক পরিবর্তন করুন",
      resultTemplate: "{amount} {from} = {result} {to}",
      rateTemplate: "ব্যবহৃত রেট: ১ {from} = {rate} {to}",
      invalid: "সঠিক পরিমাণ লিখুন (যেমন ২৫০ বা ১২৫০.৫০)।",
    },
    chart: {
      range30: "৩০ দিন",
      range1y: "১ বছর",
      ariaTemplate: "{pair} রেট চার্ট ({range})",
      high: "সর্বোচ্চ",
      low: "সর্বনিম্ন",
    },
    markup: {
      directionLabel: "লেনদেন",
      buy: "{from} কিনছি",
      sell: "{from} বিক্রি করছি / পাঠাচ্ছি",
      amount: "পরিমাণ ({from})",
      bankRate: "ব্যাংক বা এক্সচেঞ্জ হাউসের রেট (১ {from}, {to})",
      midRate: "রেফারেন্স মধ্যবর্তী রেট",
      prompt: "ব্যাংক, এক্সচেঞ্জ হাউস বা মানি ট্রান্সফার অ্যাপ আপনাকে যে রেট দিচ্ছে তা লিখুন; রেটের পার্থক্যে আপনার কত খরচ হচ্ছে দেখুন।",
      cost: "রেট পার্থক্যের খরচ",
      markup: "মধ্যবর্তী রেট থেকে পার্থক্য",
      midTotal: "মধ্যবর্তী রেটে মোট",
      bankTotal: "প্রদত্ত রেটে মোট",
      favorable:
        "আপনার দেওয়া রেট মধ্যবর্তী রেটের চেয়ে আপনার পক্ষে দেখাচ্ছে। দিনের মধ্যে রেট বদলে থাকতে পারে; রেট ও লেনদেনের দিক ঠিকভাবে দেওয়া হয়েছে কি না যাচাই করুন।",
      bands: [
        "পার্থক্য খুবই কম: মধ্যবর্তী রেটের বেশ কাছাকাছি।",
        "যুক্তিসঙ্গত পার্থক্য: অনেক ব্যাংক ও এক্সচেঞ্জ হাউস এই সীমার মধ্যে মার্জিন রাখে।",
        "পার্থক্য বেশি: অন্য ব্যাংক বা রেমিট্যান্স সেবার সঙ্গে তুলনা করে দেখা ভালো।",
        "পার্থক্য অনেক বেশি: এই লেনদেনে রেটের পার্থক্য বড় একটি লুকানো খরচ।",
      ],
      note: "মধ্যবর্তী রেট হলো দৈনিক রেফারেন্স রেট; দিনের মধ্যে বাজার ওঠানামা করে, তাই ছোট পার্থক্যের একটি অংশ রেট পরিবর্তনের কারণেও হতে পারে। আলাদা ট্রান্সফার ফি বা কমিশন থাকলে তা এই হিসাবে ধরা নেই।",
      percentTemplate: "{v}%",
    },
    multi: {
      amount: "পরিমাণ",
      from: "যে মুদ্রা থেকে",
      to: "যে মুদ্রায়",
      swap: "দিক পরিবর্তন করুন",
      resultTemplate: "{amount} {from} = {result} {to}",
      rateTemplate: "ব্যবহৃত রেট: ১ {from} = {rate} {to}",
      invalid: "সঠিক পরিমাণ লিখুন (যেমন ২৫০ বা ১২৫০.৫০)।",
    },
  },
  formatDateTime: (unix) => `${formatBnDateTime(unix)} ${ZONE}`,
  formatDate: formatBnDate,
  common: {
    home: "হোম",
    hub: "মুদ্রা রূপান্তর",
    breadcrumbAria: "ব্রেডক্রাম্ব",
    unavailable: "এই মুহূর্তে হালনাগাদ রেট পাওয়া যাচ্ছে না। কিছুক্ষণ পরে আবার চেষ্টা করুন।",
    faqTitle: "সাধারণ জিজ্ঞাসা",
    sourcesTitle: "উৎস",
    sourceLatest: "– হালনাগাদ রেফারেন্স রেট ও প্রকাশের সময় (দিনে একবার হালনাগাদ হয়)।",
    sourceHistory: "– চার্ট ও পরিসংখ্যানের পুরোনো দৈনিক রেট। উৎস আলাদা বলে চার্টের শেষ বিন্দু বর্তমান রেট থেকে সামান্য আলাদা হতে পারে।",
    disclaimer: "এই পাতার রেট শুধু তথ্যের জন্য, কেনা-বেচার প্রস্তাব নয়; প্রকৃত লেনদেনের রেট নির্ধারণ করে লেনদেনকারী প্রতিষ্ঠান।",
  },
  pair: {
    pairName: (pair) => `${fxCurrenciesBn[pair.from].short} – ${fxCurrenciesBn[pair.to].short}`,
    h1: (pairName) => `${pairName} কনভার্টার`,
    heroDescription: (pair) =>
      `দৈনিক রেফারেন্স রেটে ${fxCurrenciesBn[pair.from].long} ও ${fxCurrenciesBn[pair.to].long} রূপান্তর করুন। রেট কখন প্রকাশিত হয়েছে তা লাইভ কাউন্টারে দেখুন।`,
    title: buildFxTitleBn,
    description: (pair, data) => {
      const from = fxCurrenciesBn[pair.from];
      const to = fxCurrenciesBn[pair.to];
      return data
        ? `১ ${from.code} = ${rate(data.rate)} ${to.code} (${formatBnDateTime(data.latest.lastUpdateUnix)} ${ZONE} রেফারেন্স রেট)। ${from.short} থেকে ${to.short} কনভার্টার, ৩০ দিন ও ১ বছরের চার্ট, ব্যাংক রেটের পার্থক্য হিসাব।`
        : `${from.short} থেকে ${to.short} কনভার্টার: দৈনিক রেফারেন্স রেট, ৩০ দিন ও ১ বছরের চার্ট, রূপান্তর টেবিল ও ব্যাংক রেটের পার্থক্য হিসাব।`;
    },
    currentRate: "বর্তমান রেট",
    inverseRate: "বিপরীত রেট",
    published: "উৎসে প্রকাশিত",
    nextUpdate: "পরবর্তী হালনাগাদ",
    rateType: "রেটের ধরন",
    rateTypeValue: (provider) => `দৈনিক রেফারেন্স মধ্যবর্তী রেট (${provider})`,
    noData: "এই মুহূর্তে রেটের তথ্য নেই।",
    chartTitle: (pair) => `${pair.from}/${pair.to} রেট চার্ট`,
    analysisTitle: (pairName) => `${pairName} রেট কীভাবে বদলেছে?`,
    tableTitle: (pairName) => `${pairName} রূপান্তর টেবিল`,
    markupTitle: "ব্যাংক রেটের পার্থক্য ক্যালকুলেটর",
    markupIntro:
      "ব্যাংক, এক্সচেঞ্জ হাউস বা রেমিট্যান্স সেবা যে রেট দিচ্ছে তা লিখুন; মধ্যবর্তী রেটের তুলনায় কতটা পার্থক্য, অর্থাৎ রেটের পার্থক্যে আপনার প্রকৃত খরচ কত, সঙ্গে সঙ্গে দেখুন।",
    midRateTitle: "মধ্যবর্তী রেট কী, কীভাবে হিসাব হয়?",
    midRateP1: (pair) => {
      const from = fxCurrenciesBn[pair.from].short;
      const to = fxCurrenciesBn[pair.to].short;
      return {
        before: "মধ্যবর্তী রেট (রেফারেন্স রেট) হলো বাজারের কেনা ও বেচার রেটের মাঝামাঝি। এই পাতার কনভার্টার এই রেট ব্যবহার করে: ",
        formula: `পরিমাণ (${to}) = পরিমাণ (${from}) × রেট`,
        after: `। বিপরীত দিকে পরিমাণ (${from}) = পরিমাণ (${to}) ÷ রেট।`,
      };
    },
    midRateP2: {
      before:
        "ব্যাংক, এক্সচেঞ্জ হাউস ও মানি ট্রান্সফার সেবা প্রায়ই এই রেটের সঙ্গে একটি মার্জিন যোগ করে। এটি আলাদা ফি হিসেবে লেখা থাকে না বলে সহজে চোখে পড়ে না; ওপরের ",
      link: "ব্যাংক রেটের পার্থক্য ক্যালকুলেটর",
      after: " এই লুকানো খরচ দেখিয়ে দেয়।",
    },
    relatedTitle: "অন্যান্য মুদ্রা রূপান্তর",
    allRatesLink: "সব মুদ্রার রেট ও কনভার্টার",
    analysis: buildAnalysis,
    faq: buildFaq,
    officialRateNote: {
      title: "বাংলাদেশ ব্যাংকের রেট ও রেমিট্যান্স",
      paragraphs: [
        "এই পাতার রেট আন্তর্জাতিক বাজারের দৈনিক মধ্যবর্তী রেফারেন্স রেট; এটি বাংলাদেশ ব্যাংকের ঘোষিত রেট নয়। দেশে বৈধ পথে পাঠানো রেমিট্যান্সের ক্ষেত্রে ব্যাংকের রেট এবং সরকারি প্রণোদনা (যদি থাকে) মিলিয়ে প্রাপকের হাতে আসা পরিমাণ এখানে দেখানো হিসাবের থেকে আলাদা হতে পারে।",
        "টাকা পাঠানোর আগে একাধিক ব্যাংক বা রেমিট্যান্স সেবার রেট ও ফি তুলনা করুন এবং ওপরের ক্যালকুলেটরে তাদের রেট লিখে পার্থক্যটি দেখুন।",
      ],
      link: { href: "https://www.bb.org.bd", label: "বাংলাদেশ ব্যাংকের ওয়েবসাইট" },
    },
  },
  hub: {
    title: "মুদ্রা রূপান্তর: আজকের টাকার রেট",
    description:
      "ডলার, সৌদি রিয়াল, দিরহাম, রিংগিত, দিনার, পাউন্ড ও ইউরো থেকে টাকার দৈনিক রেফারেন্স রেট। প্রকাশের সময়, লাইভ কাউন্টার, ৩০ দিনের পরিবর্তন ও ব্যাংক রেটের পার্থক্য হিসাব।",
    ogDescription: "দৈনিক রেফারেন্স রেটে টাকা ও ১৪টি বিদেশি মুদ্রার রূপান্তর; প্রকাশের সময় ও ৩০ দিনের পরিবর্তন।",
    h1: "মুদ্রা রূপান্তর",
    intro:
      "দৈনিক রেফারেন্স রেটে টাকা ও ১৪টি বিদেশি মুদ্রার মধ্যে রূপান্তর করুন। রেট উৎসে কখন প্রকাশিত হয়েছে, কত ঘণ্টা আগে হালনাগাদ হয়েছে এবং পরবর্তী হালনাগাদে কত সময় বাকি তা লাইভ দেখুন।",
    boardTitle: "আজকের মুদ্রার রেট (টাকায়)",
    colCurrency: "মুদ্রা",
    colOneUnit: "১ একক",
    colChange: "৩০ দিনের পরিবর্তন",
    boardNote:
      "৩০ দিনের পরিবর্তন হলো টাকার বিপরীতে বিদেশি মুদ্রার পরিবর্তন: ▲ মানে একই পরিমাণ বিদেশি মুদ্রায় এখন বেশি টাকা পাওয়া যায়, ▼ মানে কম টাকা পাওয়া যায়।",
    pairsTitle: "মুদ্রা রূপান্তর",
    faq: [
      {
        question: "এই রেট কত ঘন ঘন হালনাগাদ হয়?",
        answer:
          "রেটগুলো দিনে একবার হালনাগাদ হওয়া রেফারেন্স রেট। পাতার ওপরে উৎস কোন তারিখ ও সময়ে রেট প্রকাশ করেছে, তথ্যটি কত মিনিট বা ঘণ্টা আগের এবং পরবর্তী হালনাগাদে কত সময় বাকি তা লাইভ দেখানো হয়। এটি মুহূর্তে মুহূর্তে বদলানো বাজার রেট নয়।",
      },
      {
        question: "এখানকার রেট আর ব্যাংকের রেট আলাদা কেন?",
        answer:
          "এখানে দেখানো রেট হলো কেনা ও বেচার রেটের মাঝামাঝি মধ্যবর্তী রেট। ব্যাংক ও এক্সচেঞ্জ হাউস লেনদেনে এর সঙ্গে একটি মার্জিন যোগ করে। প্রতিটি মুদ্রার পাতায় থাকা ব্যাংক রেটের পার্থক্য ক্যালকুলেটরে এই পার্থক্যের খরচ দেখতে পারবেন।",
      },
      {
        question: "এটি কি বাংলাদেশ ব্যাংকের রেট?",
        answer:
          "না। এটি আন্তর্জাতিক বাজারের দৈনিক রেফারেন্স রেট। বাংলাদেশ ব্যাংক ও বাণিজ্যিক ব্যাংকগুলোর ঘোষিত রেট আলাদা হতে পারে; লেনদেনের চূড়ান্ত রেট আপনার ব্যাংক বা রেমিট্যান্স সেবা নির্ধারণ করে।",
      },
      {
        question: "কোন কোন মুদ্রা আছে?",
        answer:
          "বাংলাদেশি টাকা, মার্কিন ডলার, সৌদি রিয়াল, সংযুক্ত আরব আমিরাত দিরহাম, মালয়েশিয়ান রিংগিত, কাতারি রিয়াল, কুয়েতি দিনার, ওমানি রিয়াল, বাহরাইনি দিনার, সিঙ্গাপুর ডলার, ব্রিটিশ পাউন্ড, ইউরো, ভারতীয় রুপি, কানাডিয়ান ডলার ও অস্ট্রেলিয়ান ডলারের মধ্যে রূপান্তর করা যায়।",
      },
    ],
    relatedTitle: "সংশ্লিষ্ট টুল",
    relatedLinks: [
      { href: "/bn/traditional-weight", label: "ঐতিহ্যবাহী ওজন একক রূপান্তর" },
      { href: "/bn/categories", label: "সব ক্যাটাগরি" },
      { href: "/bn", label: "সব একক রূপান্তর" },
    ],
    quoteLabel: "টাকা",
    percent: (value) => percent(value),
  },
};
