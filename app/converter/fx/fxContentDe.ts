import type { FaqItem } from "../faqSchema";
import type { FxCurrencyInfo, FxLocaleContent, FxPair } from "./fxLocale";
import { formatMoney, formatNumber, formatPercent, formatRate } from "./fxMath";
import type { FxPairPageData } from "./fxPageData";

// Deutsche Währungsseiten: /de/waehrungsrechner/[paar]. Die Paare folgen den
// häufigsten Suchanfragen im deutschsprachigen Raum: Euro gegen Dollar, Pfund,
// Franken und Lira in beide Richtungen, dazu beliebte Reiseländer (Polen,
// Ungarn, Tschechien, Skandinavien, Thailand, Emirate, Ägypten) und Asien.

const NUMBER_LOCALE = "de-DE";
const TIME_ZONE = "Europe/Berlin";

export const fxCurrenciesDe: Record<string, FxCurrencyInfo> = {
  EUR: { code: "EUR", short: "Euro", long: "Euro", lower: "Euro" },
  USD: { code: "USD", short: "Dollar", long: "US-Dollar", lower: "Dollar" },
  GBP: { code: "GBP", short: "Pfund", long: "Britisches Pfund", lower: "Pfund" },
  CHF: { code: "CHF", short: "Franken", long: "Schweizer Franken", lower: "Franken" },
  TRY: { code: "TRY", short: "Lira", long: "Türkische Lira", lower: "Lira" },
  PLN: { code: "PLN", short: "Zloty", long: "Polnischer Złoty", lower: "Zloty" },
  HUF: { code: "HUF", short: "Forint", long: "Ungarischer Forint", lower: "Forint" },
  CZK: { code: "CZK", short: "Tschechische Krone", long: "Tschechische Krone", lower: "Tschechische Kronen" },
  SEK: { code: "SEK", short: "Schwedische Krone", long: "Schwedische Krone", lower: "Schwedische Kronen" },
  NOK: { code: "NOK", short: "Norwegische Krone", long: "Norwegische Krone", lower: "Norwegische Kronen" },
  DKK: { code: "DKK", short: "Dänische Krone", long: "Dänische Krone", lower: "Dänische Kronen" },
  JPY: { code: "JPY", short: "Yen", long: "Japanischer Yen", lower: "Yen" },
  CNY: { code: "CNY", short: "Yuan", long: "Chinesischer Yuan (Renminbi)", lower: "Yuan" },
  THB: { code: "THB", short: "Baht", long: "Thailändischer Baht", lower: "Baht" },
  AED: { code: "AED", short: "Dirham", long: "VAE-Dirham", lower: "Dirham" },
  EGP: { code: "EGP", short: "Ägyptisches Pfund", long: "Ägyptisches Pfund", lower: "Ägyptische Pfund" },
  CAD: { code: "CAD", short: "Kanadischer Dollar", long: "Kanadischer Dollar", lower: "Kanadische Dollar" },
  AUD: { code: "AUD", short: "Australischer Dollar", long: "Australischer Dollar", lower: "Australische Dollar" },
  INR: { code: "INR", short: "Rupie", long: "Indische Rupie", lower: "Rupien" },
};

export const fxPairsDe: FxPair[] = [
  { slug: "euro-dollar", from: "EUR", to: "USD" },
  { slug: "dollar-euro", from: "USD", to: "EUR" },
  { slug: "euro-pfund", from: "EUR", to: "GBP" },
  { slug: "pfund-euro", from: "GBP", to: "EUR" },
  { slug: "euro-franken", from: "EUR", to: "CHF" },
  { slug: "franken-euro", from: "CHF", to: "EUR" },
  { slug: "euro-lira", from: "EUR", to: "TRY" },
  { slug: "lira-euro", from: "TRY", to: "EUR" },
  { slug: "euro-zloty", from: "EUR", to: "PLN" },
  { slug: "euro-forint", from: "EUR", to: "HUF" },
  { slug: "euro-tschechische-krone", from: "EUR", to: "CZK" },
  { slug: "euro-schwedische-krone", from: "EUR", to: "SEK" },
  { slug: "euro-norwegische-krone", from: "EUR", to: "NOK" },
  { slug: "euro-daenische-krone", from: "EUR", to: "DKK" },
  { slug: "euro-yen", from: "EUR", to: "JPY" },
  { slug: "euro-yuan", from: "EUR", to: "CNY" },
  { slug: "euro-baht", from: "EUR", to: "THB" },
  { slug: "euro-dirham", from: "EUR", to: "AED" },
  { slug: "euro-aegyptisches-pfund", from: "EUR", to: "EGP" },
  { slug: "euro-kanadischer-dollar", from: "EUR", to: "CAD" },
  { slug: "euro-australischer-dollar", from: "EUR", to: "AUD" },
  { slug: "euro-rupie", from: "EUR", to: "INR" },
];

export function getFxPairDe(slug: string): FxPair | undefined {
  return fxPairsDe.find((pair) => pair.slug === slug);
}

const DE_TITLE_BUDGET = 42;

export function buildFxTitleDe(pair: FxPair): string {
  const from = fxCurrenciesDe[pair.from];
  const to = fxCurrenciesDe[pair.to];
  const candidates = [
    `${from.short} in ${to.lower}: Kurs und Umrechner`,
    `${from.short} in ${to.lower} umrechnen`,
    `${from.code} in ${to.code}: Kurs heute`,
  ];
  return candidates.find((title) => title.length <= DE_TITLE_BUDGET) ?? candidates[candidates.length - 1];
}

const rate = (value: number) => formatRate(value, NUMBER_LOCALE);
const money = (value: number) => formatMoney(value, NUMBER_LOCALE);
const count = (value: number) => formatNumber(value, NUMBER_LOCALE);
const percent = (value: number) => `${formatPercent(Math.abs(value), NUMBER_LOCALE)} %`;

export function formatDeDateTime(unix: number): string {
  const date = new Date(unix * 1000);
  const day = new Intl.DateTimeFormat(NUMBER_LOCALE, { day: "numeric", month: "long", year: "numeric", timeZone: TIME_ZONE }).format(date);
  const time = new Intl.DateTimeFormat(NUMBER_LOCALE, { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: TIME_ZONE }).format(date);
  return `${day}, ${time} Uhr`;
}

export function formatDeDate(iso: string): string {
  return new Intl.DateTimeFormat(NUMBER_LOCALE, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
}

const ZONE = "(deutsche Zeit)";

function describeChange(changePercent: number) {
  if (Math.abs(changePercent) < 0.05) return { verb: "kaum verändert", noun: "kaum eine Veränderung", direction: "flat" as const };
  return changePercent > 0
    ? { verb: `um ${percent(changePercent)} gestiegen`, noun: `ein Plus von ${percent(changePercent)}`, direction: "up" as const }
    : { verb: `um ${percent(changePercent)} gefallen`, noun: `ein Minus von ${percent(changePercent)}`, direction: "down" as const };
}

function buildAnalysis(pair: FxPair, data: FxPairPageData): string[] {
  const from = fxCurrenciesDe[pair.from];
  const to = fxCurrenciesDe[pair.to];
  const paragraphs = [
    `Nach dem am ${formatDeDateTime(data.latest.lastUpdateUnix)} ${ZONE} veröffentlichten Referenzkurs gilt: 1 ${from.long} (${from.code}) = ${rate(data.rate)} ${to.long} (${to.code}). Umgekehrt entspricht 1 ${to.code} = ${rate(data.inverse)} ${from.code}.`,
  ];

  if (data.stats30) {
    const s = data.stats30;
    const change = describeChange(s.changePercent);
    const meaning =
      change.direction === "flat"
        ? ""
        : change.direction === "up"
          ? ` Für 1 ${from.code} bekommen Sie also mehr ${to.lower} als vor einem Monat.`
          : ` Für 1 ${from.code} bekommen Sie also weniger ${to.lower} als vor einem Monat.`;
    paragraphs.push(
      `In den letzten 30 Tagen ist der Kurs ${from.code}/${to.code} ${change.verb}: von ${rate(s.first.value)} am ${formatDeDate(s.first.date)} auf ${rate(s.last.value)} am ${formatDeDate(s.last.date)}. Der Höchststand lag bei ${rate(s.high.value)} (${formatDeDate(s.high.date)}), der Tiefststand bei ${rate(s.low.value)} (${formatDeDate(s.low.date)}); der 30-Tage-Durchschnitt beträgt ${rate(s.average)}.${meaning}`
    );
  }

  if (data.stats1y) {
    const s = data.stats1y;
    paragraphs.push(
      `Im Jahresvergleich: Vor einem Jahr, am ${formatDeDate(s.first.date)}, entsprach 1 ${from.code} noch ${rate(s.first.value)} ${to.code}; am ${formatDeDate(s.last.date)} waren es ${rate(s.last.value)} ${to.code}. Das ist über zwölf Monate ${describeChange(s.changePercent).noun}.`
    );
  }

  return paragraphs;
}

function buildFaq(pair: FxPair, data: FxPairPageData | null): FaqItem[] {
  const from = fxCurrenciesDe[pair.from];
  const to = fxCurrenciesDe[pair.to];
  const items: FaqItem[] = [];

  if (data) {
    const published = `${formatDeDateTime(data.latest.lastUpdateUnix)} ${ZONE}`;
    items.push(
      {
        question: `Wie viel sind 1 ${from.short} in ${to.lower}?`,
        answer: `Nach dem Referenzkurs vom ${published} sind 1 ${from.long} = ${rate(data.rate)} ${to.long}. Banken und Wechselstuben rechnen mit einem Aufschlag; beim Kauf von Fremdwährung ist ihr Kurs meist etwas schlechter.`,
      },
      {
        question: `Wie viel sind 100 ${from.short} in ${to.lower}?`,
        answer: `Zu diesem Kurs sind 100 ${from.code} = ${money(100 * data.rate)} ${to.code} und ${count(1000)} ${from.code} = ${money(1000 * data.rate)} ${to.code}.`,
      },
      {
        question: `Wie viel sind 100 ${to.lower} in ${from.short}?`,
        answer: `Umgekehrt gilt 1 ${to.code} = ${rate(data.inverse)} ${from.code}, also 100 ${to.code} = ${money(100 * data.inverse)} ${from.code}.`,
      },
      {
        question: "Wann wurde der Kurs zuletzt aktualisiert?",
        answer: data.latest.nextUpdateUnix
          ? `Die Quelle (${data.latest.providerName}) hat diesen Kurs am ${published} veröffentlicht. Die Kurse werden einmal täglich aktualisiert; die nächste Aktualisierung wird gegen ${formatDeDateTime(data.latest.nextUpdateUnix)} erwartet.`
          : `Die Quelle (${data.latest.providerName}) hat diesen Kurs am ${published} veröffentlicht. Die Kurse werden einmal täglich aktualisiert.`,
      }
    );
  } else {
    items.push({
      question: "Wie oft werden die Kurse aktualisiert?",
      answer: "Die Referenzkurse werden einmal täglich aktualisiert. Die Seite zeigt, wann die Quelle den Kurs veröffentlicht hat und wann die nächste Aktualisierung erwartet wird.",
    });
  }

  items.push(
    {
      question: "Warum ist der Kurs bei meiner Bank anders?",
      answer: `Hier sehen Sie den Mittelkurs zwischen An- und Verkauf. Banken, Wechselstuben und Kartenanbieter schlagen beim Verkauf von ${to.long} eine Marge auf oder geben beim Ankauf einen niedrigeren Kurs; dieser Aufschlag steht oft nicht als Gebühr auf der Rechnung. Der Kursaufschlag-Rechner auf dieser Seite zeigt, was Sie das kostet.`,
    },
    {
      question: "Ist das der EZB-Referenzkurs?",
      answer:
        "Nein. Die Europäische Zentralbank veröffentlicht werktags gegen 16 Uhr eigene Euro-Referenzkurse für rund 30 Währungen. Hier wird ein täglicher Referenz-Mittelkurs eines internationalen Datenanbieters gezeigt; er liegt meist sehr nah am EZB-Kurs, kann aber leicht abweichen.",
    },
    {
      question: "Wo wechsle ich Geld am günstigsten?",
      answer:
        "Am Flughafen und im Hotel sind die Kurse meist am schlechtesten. Günstiger ist oft das Abheben am Geldautomaten im Reiseland in Landeswährung oder die Zahlung mit einer Karte ohne Auslandseinsatzentgelt. Lehnen Sie am Automaten oder Kartenterminal die Umrechnung in Euro (dynamische Währungsumrechnung) ab und wählen Sie die Landeswährung.",
    }
  );

  if (data?.stats30) {
    items.push({
      question: `Wie hat sich der Kurs ${from.code}/${to.code} in den letzten 30 Tagen entwickelt?`,
      answer: `In den letzten 30 Tagen ist der Kurs ${describeChange(data.stats30.changePercent).verb}. Der Höchststand lag bei ${rate(data.stats30.high.value)}, der Tiefststand bei ${rate(data.stats30.low.value)}.`,
    });
  }

  return items;
}

export const fxContentDe: FxLocaleContent = {
  numberLocale: NUMBER_LOCALE,
  htmlLang: "de",
  ogLocale: "de_DE",
  basePath: "/de/waehrungsrechner",
  homeHref: "/de",
  quote: "EUR",
  currencies: fxCurrenciesDe,
  pairs: fxPairsDe,
  defaultMarkupDirection: "sell",
  labels: {
    relative: {
      pastTemplate: "vor {t}",
      futureTemplate: "in {t}",
      justNow: "gerade eben",
      due: "die Quelle sollte den neuen Kurs bereits veröffentlicht haben; die Seite wird in Kürze aktualisiert",
      stale: "(Daten älter als erwartet)",
      minute: ["Minute", "Minuten"],
      hour: ["Stunde", "Stunden"],
      day: ["Tag", "Tagen"],
    },
    converter: {
      amount: "Betrag",
      swap: "Richtung tauschen",
      resultTemplate: "{amount} {from} = {result} {to}",
      rateTemplate: "Verwendeter Kurs: 1 {from} = {rate} {to}",
      invalid: "Bitte einen gültigen Betrag eingeben (z. B. 250 oder 1.250,50).",
    },
    chart: {
      range30: "30 Tage",
      range1y: "1 Jahr",
      ariaTemplate: "Kursverlauf {pair} ({range})",
      high: "Hoch",
      low: "Tief",
    },
    markup: {
      directionLabel: "Vorgang",
      buy: "Ich kaufe {from}",
      sell: "Ich verkaufe {from}",
      amount: "Betrag ({from})",
      bankRate: "Kurs der Bank (1 {from} in {to})",
      midRate: "Referenz-Mittelkurs",
      prompt: "Geben Sie den Kurs ein, den Ihnen Bank oder Wechselstube anbietet, und sehen Sie, was der Kursaufschlag kostet.",
      cost: "Kosten des Kursaufschlags",
      markup: "Abweichung vom Mittelkurs",
      midTotal: "Betrag zum Mittelkurs",
      bankTotal: "Betrag zum Bankkurs",
      favorable:
        "Der eingegebene Kurs ist günstiger als der Mittelkurs. Der Kurs kann sich im Tagesverlauf geändert haben; prüfen Sie Kurs und Richtung des Vorgangs.",
      bands: [
        "Sehr kleiner Aufschlag: nah am Mittelkurs.",
        "Üblicher Aufschlag: viele Banken und Wechselstuben liegen in diesem Bereich.",
        "Hoher Aufschlag: vergleichen Sie den Kurs anderer Anbieter.",
        "Sehr hoher Aufschlag: Der Wechselkurs wird hier zu erheblichen versteckten Kosten.",
      ],
      note: "Der Mittelkurs ist ein täglicher Referenzkurs; der Markt bewegt sich im Tagesverlauf, daher kann ein kleiner Teil der Abweichung auch aus Kursschwankungen stammen. Separate Gebühren oder Überweisungskosten sind nicht enthalten.",
      percentTemplate: "{v} %",
    },
    multi: {
      amount: "Betrag",
      from: "Von Währung",
      to: "In Währung",
      swap: "Richtung tauschen",
      resultTemplate: "{amount} {from} = {result} {to}",
      rateTemplate: "Verwendeter Kurs: 1 {from} = {rate} {to}",
      invalid: "Bitte einen gültigen Betrag eingeben (z. B. 250 oder 1.250,50).",
    },
  },
  formatDateTime: (unix) => `${formatDeDateTime(unix)} ${ZONE}`,
  formatDate: formatDeDate,
  common: {
    home: "Startseite",
    hub: "Währungsrechner",
    breadcrumbAria: "Brotkrumen",
    unavailable: "Der aktuelle Kurs konnte gerade nicht geladen werden. Bitte versuchen Sie es in Kürze erneut.",
    faqTitle: "Häufige Fragen",
    sourcesTitle: "Quellen",
    sourceLatest: "– aktueller Referenzkurs und Veröffentlichungszeit (einmal täglich aktualisiert).",
    sourceHistory:
      "– historische Tageskurse für Diagramm und Statistik. Weil die Quellen unterschiedlich sind, kann der letzte Punkt im Diagramm leicht vom aktuellen Kurs abweichen.",
    disclaimer:
      "Die Kurse auf dieser Seite dienen der Information und sind kein Angebot zum Kauf oder Verkauf; den tatsächlichen Kurs legt der Anbieter fest, der den Umtausch durchführt.",
  },
  pair: {
    pairName: (pair) => `${fxCurrenciesDe[pair.from].short} – ${fxCurrenciesDe[pair.to].short}`,
    h1: (pairName) => `${pairName} Umrechner`,
    heroDescription: (pair) =>
      `${fxCurrenciesDe[pair.from].long} in ${fxCurrenciesDe[pair.to].long} umrechnen, zum täglichen Referenzkurs. Wann der Kurs veröffentlicht wurde, sehen Sie live.`,
    title: buildFxTitleDe,
    description: (pair, data) => {
      const from = fxCurrenciesDe[pair.from];
      const to = fxCurrenciesDe[pair.to];
      return data
        ? `1 ${from.code} = ${rate(data.rate)} ${to.code} (Referenzkurs vom ${formatDeDateTime(data.latest.lastUpdateUnix)}). ${from.short} in ${to.lower} umrechnen, Kursverlauf über 30 Tage und 1 Jahr, Umrechnungstabelle und Bankaufschlag-Rechner.`
        : `${from.short} in ${to.lower} umrechnen: täglicher Referenzkurs, Kursverlauf über 30 Tage und 1 Jahr, Umrechnungstabelle und Bankaufschlag-Rechner.`;
    },
    currentRate: "Aktueller Kurs",
    inverseRate: "Umgekehrter Kurs",
    published: "Von der Quelle veröffentlicht",
    nextUpdate: "Nächste Aktualisierung",
    rateType: "Kursart",
    rateTypeValue: (provider) => `Täglicher Referenz-Mittelkurs (${provider})`,
    noData: "Derzeit sind keine Kursdaten verfügbar.",
    chartTitle: (pair) => `Kursverlauf ${pair.from}/${pair.to}`,
    analysisTitle: (pairName) => `Wie hat sich der Kurs ${pairName} entwickelt?`,
    tableTitle: (pairName) => `Umrechnungstabelle ${pairName}`,
    markupTitle: "Bankaufschlag-Rechner",
    markupIntro:
      "Geben Sie den Kurs Ihrer Bank oder Wechselstube ein und sehen Sie sofort, wie weit er vom Mittelkurs abweicht und was Sie der Aufschlag tatsächlich kostet.",
    midRateTitle: "Was ist der Mittelkurs?",
    midRateP1: (pair) => {
      const from = fxCurrenciesDe[pair.from].short;
      const to = fxCurrenciesDe[pair.to].short;
      return {
        before: "Der Mittelkurs (Referenzkurs) liegt genau zwischen Ankaufs- und Verkaufskurs am Markt. Der Umrechner auf dieser Seite nutzt ihn: ",
        formula: `Betrag in ${to} = Betrag in ${from} × Kurs`,
        after: `. Umgekehrt gilt: Betrag in ${from} = Betrag in ${to} ÷ Kurs.`,
      };
    },
    midRateP2: {
      before:
        "Banken, Wechselstuben und Kartenzahlungen im Ausland rechnen meist mit einem Aufschlag auf diesen Kurs. Weil er selten als Gebühr ausgewiesen wird, fällt er kaum auf; der ",
      link: "Bankaufschlag-Rechner",
      after: " oben macht diese versteckten Kosten sichtbar.",
    },
    relatedTitle: "Weitere Währungsumrechnungen",
    allRatesLink: "Alle Wechselkurse und der Währungsrechner",
    analysis: buildAnalysis,
    faq: buildFaq,
    officialRateNote: {
      title: "EZB-Referenzkurs und Bankkurse",
      paragraphs: [
        "Der Kurs auf dieser Seite ist ein täglicher Referenz-Mittelkurs eines internationalen Datenanbieters. Die Europäische Zentralbank veröffentlicht werktags gegen 16 Uhr eigene Euro-Referenzkurse; sie dienen etwa Behörden und Buchhaltung als Bezugsgröße und liegen meist sehr nah an den hier gezeigten Werten.",
        "Vor einem Umtausch lohnt sich der Vergleich: Geben Sie den Kurs Ihrer Bank oder Wechselstube in den Rechner oben ein und prüfen Sie, wie groß der Aufschlag ist. Beim Bezahlen im Ausland sollten Sie die Umrechnung in Euro am Terminal ablehnen und in Landeswährung zahlen.",
      ],
      link: { href: "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.de.html", label: "Euro-Referenzkurse der EZB" },
    },
  },
  hub: {
    title: "Währungsrechner: Euro umrechnen mit Tageskurs",
    description:
      "Euro in Dollar, Pfund, Franken, Lira, Zloty und 13 weitere Währungen umrechnen: täglicher Referenzkurs mit Veröffentlichungszeit, 30-Tage-Veränderung, Kursverlauf und Bankaufschlag-Rechner.",
    ogDescription: "Euro in 18 Währungen umrechnen: täglicher Referenzkurs, Veröffentlichungszeit und 30-Tage-Veränderung.",
    h1: "Währungsrechner",
    intro:
      "Rechnen Sie Euro in 18 Währungen um und zurück, zum täglichen Referenzkurs. Sie sehen live, wann die Quelle den Kurs veröffentlicht hat und wann die nächste Aktualisierung kommt.",
    boardTitle: "Wechselkurse heute (in Euro)",
    colCurrency: "Währung",
    colOneUnit: "1 Einheit",
    colChange: "30 Tage",
    boardNote:
      "Die 30-Tage-Veränderung zeigt die Entwicklung gegenüber dem Euro: ▲ bedeutet, dass die Währung teurer geworden ist (Sie zahlen mehr Euro dafür), ▼ dass sie billiger geworden ist.",
    pairsTitle: "Währungsumrechnungen",
    faq: [
      {
        question: "Wie oft werden die Kurse aktualisiert?",
        answer:
          "Es handelt sich um tägliche Referenzkurse. Oben auf jeder Seite steht, wann die Quelle den Kurs veröffentlicht hat, wie alt er ist und wann die nächste Aktualisierung erwartet wird. Es ist kein sekundengenauer Börsenkurs.",
      },
      {
        question: "Warum weicht der Kurs von dem meiner Bank ab?",
        answer:
          "Gezeigt wird der Mittelkurs zwischen An- und Verkauf. Banken und Wechselstuben rechnen mit einem Aufschlag. Der Bankaufschlag-Rechner auf jeder Währungsseite zeigt, was Sie das kostet.",
      },
      {
        question: "Ist das der EZB-Referenzkurs?",
        answer:
          "Nein, aber er liegt meist sehr nah daran. Die EZB veröffentlicht werktags gegen 16 Uhr eigene Referenzkurse; hier wird ein täglicher Referenzkurs eines internationalen Datenanbieters verwendet, der auch am Wochenende verfügbar ist.",
      },
      {
        question: "Welche Währungen werden unterstützt?",
        answer:
          "Euro, US-Dollar, Britisches Pfund, Schweizer Franken, Türkische Lira, Polnischer Złoty, Ungarischer Forint, Tschechische, Schwedische, Norwegische und Dänische Krone, Japanischer Yen, Chinesischer Yuan, Thailändischer Baht, VAE-Dirham, Ägyptisches Pfund, Kanadischer und Australischer Dollar sowie Indische Rupie.",
      },
    ],
    relatedTitle: "Das könnte Sie auch interessieren",
    relatedLinks: [
      { href: "/de/weltuhr", label: "Weltuhr" },
      { href: "/de/zeitzonenrechner", label: "Zeitzonenrechner" },
      { href: "/de/mehrwertsteuer-rechner", label: "Mehrwertsteuer-Rechner" },
      { href: "/de", label: "Startseite" },
    ],
    quoteLabel: "€",
    percent: (value) => percent(value),
  },
};
