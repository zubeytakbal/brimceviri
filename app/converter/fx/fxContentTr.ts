import type { FxChartLabels } from "../../components/fx/FxChart";
import type { FxMarkupLabels } from "../../components/fx/FxMarkupCalculator";
import type { FxMultiConverterLabels } from "../../components/fx/FxMultiConverter";
import type { FxPairConverterLabels } from "../../components/fx/FxPairConverter";
import type { FxRelativeTimeLabels } from "../../components/fx/FxRelativeTime";
import type { FaqItem } from "../faqSchema";
import { formatMoney, formatPercent, formatRate } from "./fxMath";
import type { FxPairPageData } from "./fxPageData";
import type { FxLocaleContent } from "./fxLocale";
import { buildFxTitleTr, fxCurrenciesTr, fxPairsTr, type FxPairTr } from "./fxPairsTr";

export const TR_NUMBER_LOCALE = "tr-TR";
const TR_TIME_ZONE = "Europe/Istanbul";

export const trRelativeTimeLabels: FxRelativeTimeLabels = {
  pastTemplate: "{t} önce",
  futureTemplate: "{t} sonra",
  justNow: "az önce",
  due: "kaynak yeni kuru yayınlamış olmalı; sayfa kısa süre içinde güncellenecek",
  stale: "(veri beklenenden eski)",
  minute: ["dakika", "dakika"],
  hour: ["saat", "saat"],
  day: ["gün", "gün"],
};

export const trPairConverterLabels: FxPairConverterLabels = {
  amount: "Miktar",
  swap: "Yönü değiştir",
  resultTemplate: "{amount} {from} = {result} {to}",
  rateTemplate: "Kullanılan kur: 1 {from} = {rate} {to}",
  invalid: "Geçerli bir miktar gir (ör. 250 veya 1.250,50).",
};

export const trChartLabels: FxChartLabels = {
  range30: "30 gün",
  range1y: "1 yıl",
  ariaTemplate: "{pair} kurunun {range} grafiği",
  high: "En yüksek",
  low: "En düşük",
};

export const trMarkupLabels: FxMarkupLabels = {
  directionLabel: "İşlem",
  buy: "{from} alıyorum",
  sell: "{from} bozduruyorum",
  amount: "Miktar ({from})",
  bankRate: "Bankanın kuru (1 {from}, {to})",
  midRate: "Referans ara kur",
  prompt: "Bankanın ya da döviz bürosunun sana verdiği kuru gir; kur farkının sana maliyetini görelim.",
  cost: "Kur farkı maliyeti",
  markup: "Ara kura göre fark",
  midTotal: "Ara kurla tutar",
  bankTotal: "Banka kuruyla tutar",
  favorable:
    "Girdiğin kur ara kurdan senin lehine görünüyor. Kur gün içinde değişmiş olabilir; kurun doğru girildiğini ve işlem yönünü kontrol et.",
  bands: [
    "Fark çok düşük: ara kura oldukça yakın bir kur.",
    "Makul bir fark: birçok banka ve döviz bürosu bu aralıkta marj uygular.",
    "Yüksek bir fark: başka bir banka veya döviz bürosunu karşılaştırmaya değer.",
    "Çok yüksek bir fark: bu işlemde kur farkı ciddi bir gizli maliyet oluşturuyor.",
  ],
  note:
    "Ara kur günlük referans kurdur; piyasa gün içinde hareket ettiği için küçük farkların bir kısmı kur değişiminden de kaynaklanabilir. Bankanın ayrıca aldığı işlem ücreti veya komisyon bu hesaba dahil değildir; varsa bu farkın üstüne eklenir.",
  percentTemplate: "%{v}",
};

export const trMultiConverterLabels: FxMultiConverterLabels = {
  amount: "Miktar",
  from: "Hangi para biriminden",
  to: "Hangi para birimine",
  swap: "Yönü değiştir",
  resultTemplate: "{amount} {from} = {result} {to}",
  rateTemplate: "Kullanılan kur: 1 {from} = {rate} {to}",
  invalid: "Geçerli bir miktar gir (ör. 250 veya 1.250,50).",
};

export function formatTrDateTime(unix: number): string {
  return new Intl.DateTimeFormat(TR_NUMBER_LOCALE, {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TR_TIME_ZONE,
  }).format(new Date(unix * 1000));
}

export function formatTrDate(iso: string): string {
  return new Intl.DateTimeFormat(TR_NUMBER_LOCALE, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`)
  );
}

export function trPercent(value: number): string {
  return `%${formatPercent(Math.abs(value), TR_NUMBER_LOCALE)}`;
}

export function trMoney(value: number): string {
  return formatMoney(value, TR_NUMBER_LOCALE);
}

export function trRate(value: number): string {
  return formatRate(value, TR_NUMBER_LOCALE);
}

export function capitalizeTr(value: string): string {
  return value.charAt(0).toLocaleUpperCase("tr-TR") + value.slice(1);
}

function describeChange(changePercent: number) {
  if (Math.abs(changePercent) < 0.05) return { verb: "yatay seyretti", noun: "neredeyse değişmedi", direction: "flat" as const };
  return changePercent > 0
    ? { verb: `${trPercent(changePercent)} yükseldi`, noun: `${trPercent(changePercent)} yükseliş`, direction: "up" as const }
    : { verb: `${trPercent(changePercent)} düştü`, noun: `${trPercent(changePercent)} düşüş`, direction: "down" as const };
}

// Veriye dayali, her gun yeniden uretilen aciklama paragraflari.
export function buildTrPairAnalysis(pair: FxPairTr, data: FxPairPageData): string[] {
  const from = fxCurrenciesTr[pair.from];
  const to = fxCurrenciesTr[pair.to];
  const paragraphs: string[] = [];

  paragraphs.push(
    `${formatTrDateTime(data.latest.lastUpdateUnix)} (TSİ) tarihinde yayınlanan referans kura göre 1 ${from.long} (${from.code}) = ${trRate(data.rate)} ${to.long} (${to.code}). Ters yönde 1 ${to.code} = ${trRate(data.inverse)} ${from.code}.`
  );

  if (data.stats30) {
    const s = data.stats30;
    const change = describeChange(s.changePercent);
    const meaning =
      change.direction === "flat"
        ? ""
        : change.direction === "up"
          ? ` Yani aynı miktar ${from.long} için bir ay öncesine göre daha fazla ${to.long} gerekiyor.`
          : ` Yani aynı miktar ${from.long} için bir ay öncesine göre daha az ${to.long} gerekiyor.`;
    paragraphs.push(
      `Son 30 günde ${from.code}/${to.code} kuru ${change.verb}: ${formatTrDate(s.first.date)} tarihinde ${trRate(s.first.value)}, ${formatTrDate(s.last.date)} tarihinde ${trRate(s.last.value)}. Bu dönemde en yüksek değer ${trRate(s.high.value)} (${formatTrDate(s.high.date)}), en düşük değer ${trRate(s.low.value)} (${formatTrDate(s.low.date)}) oldu; 30 günlük ortalama ${trRate(s.average)}.${meaning}`
    );
  }

  if (data.stats1y) {
    const s = data.stats1y;
    const change = describeChange(s.changePercent);
    paragraphs.push(
      `Bir yıllık görünüm: bir yıl önce, ${formatTrDate(s.first.date)} tarihinde 1 ${from.code} = ${trRate(s.first.value)} ${to.code} idi; ${formatTrDate(s.last.date)} itibarıyla ${trRate(s.last.value)} ${to.code}. Bu, bir yılda ${change.noun} demek.`
    );
  }

  return paragraphs;
}

export function buildTrPairFaq(pair: FxPairTr, data: FxPairPageData | null): FaqItem[] {
  const from = fxCurrenciesTr[pair.from];
  const to = fxCurrenciesTr[pair.to];
  const items: FaqItem[] = [];

  if (data) {
    const published = formatTrDateTime(data.latest.lastUpdateUnix);
    items.push(
      {
        question: `1 ${from.lower} kaç ${to.lower}?`,
        answer: `${published} (TSİ) tarihli referans kura göre 1 ${from.long} = ${trRate(data.rate)} ${to.long}. Banka ve döviz bürolarının satış kuru, alış-satış farkı (marj) nedeniyle genellikle bundan biraz yüksek, alış kuru ise biraz düşüktür.`,
      },
      {
        question: `100 ${from.lower} kaç ${to.lower}?`,
        answer: `Aynı kurla 100 ${from.code} = ${trMoney(100 * data.rate)} ${to.code}, 1.000 ${from.code} = ${trMoney(1000 * data.rate)} ${to.code} eder.`,
      },
      {
        question: `1 ${to.lower} kaç ${from.lower}?`,
        answer: `Ters yönde 1 ${to.long} = ${trRate(data.inverse)} ${from.long}. 1.000 ${to.code} ise ${trMoney(1000 * data.inverse)} ${from.code} eder.`,
      },
      {
        question: "Bu kur ne zaman güncellendi?",
        answer: data.latest.nextUpdateUnix
          ? `Kaynak (${data.latest.providerName}) bu kuru ${published} (TSİ) tarihinde yayınladı. Kurlar günde bir kez güncellenir; bir sonraki güncelleme ${formatTrDateTime(data.latest.nextUpdateUnix)} (TSİ) civarında bekleniyor. Sayfadaki sayaç, verinin ne kadar süre önce yayınlandığını canlı olarak gösterir.`
          : `Kaynak (${data.latest.providerName}) bu kuru ${published} (TSİ) tarihinde yayınladı. Kurlar günde bir kez güncellenir.`,
      }
    );
  } else {
    items.push({
      question: "Bu kur ne sıklıkla güncelleniyor?",
      answer: "Referans kurlar günde bir kez güncellenir. Sayfada kaynağın kuru yayınladığı saat ve bir sonraki güncellemeye kalan süre gösterilir.",
    });
  }

  items.push({
    question: `Bankadaki ${from.lower} kuru neden farklı?`,
    answer: `Burada gösterilen, alış ve satış kurlarının ortası olan ara kurdur (referans kur). Bankalar ve döviz büroları ${from.long} satarken bu kurun üzerine, alırken altına bir marj ekler; bu fark çoğu zaman ayrıca yazılmayan bir maliyettir. Sayfadaki banka kuru farkı hesaplayıcısıyla bu farkın sana kaç ${to.code} tuttuğunu görebilirsin.`,
  });

  if (data?.stats30) {
    items.push({
      question: `${capitalizeTr(from.lower)} kuru son 30 günde ne kadar değişti?`,
      answer: `Son 30 günde ${from.code}/${to.code} kuru ${describeChange(data.stats30.changePercent).verb}. Dönemin en yüksek değeri ${trRate(data.stats30.high.value)}, en düşük değeri ${trRate(data.stats30.low.value)} oldu.`,
    });
  }

  items.push({
    question: "Bu sayfadaki kurla işlem yapabilir miyim?",
    answer:
      "Hayır. Bu sayfadaki kur bilgi amaçlı günlük referans kurdur; bir alım-satım teklifi değildir. Gerçek işlem kurunu işlemi yaptığın banka, döviz bürosu veya ödeme hizmeti belirler.",
  });

  return items;
}

export const fxContentTr: FxLocaleContent = {
  numberLocale: TR_NUMBER_LOCALE,
  ogLocale: "tr_TR",
  basePath: "/doviz-cevirici",
  homeHref: "/",
  quote: "TRY",
  currencies: fxCurrenciesTr,
  pairs: fxPairsTr,
  defaultMarkupDirection: "buy",
  labels: {
    relative: trRelativeTimeLabels,
    converter: trPairConverterLabels,
    chart: trChartLabels,
    markup: trMarkupLabels,
    multi: trMultiConverterLabels,
  },
  formatDateTime: (unix) => `${formatTrDateTime(unix)} (TSİ)`,
  formatDate: formatTrDate,
  common: {
    home: "Ana Sayfa",
    hub: "Döviz Çevirici",
    breadcrumbAria: "Sayfa yolu",
    unavailable: "Güncel kur şu anda alınamadı. Lütfen biraz sonra tekrar dene.",
    faqTitle: "Sık Sorulan Sorular",
    sourcesTitle: "Kaynaklar",
    sourceLatest: "– güncel referans kur ve yayın zamanı (günde bir kez güncellenir).",
    sourceHistory:
      "– grafik ve istatistiklerdeki geçmiş günlük kurlar. Kaynaklar farklı olduğu için grafiğin son noktası güncel kurdan çok az farklı olabilir.",
    disclaimer: "Bu sayfadaki kurlar bilgi amaçlıdır ve bir alım-satım teklifi değildir; gerçek işlem kurunu işlemi yaptığın kurum belirler.",
  },
  pair: {
    pairName: (pair) => `${fxCurrenciesTr[pair.from].short} – ${fxCurrenciesTr[pair.to].short}`,
    h1: (pairName) => `${pairName} Çevirici`,
    heroDescription: (pair) =>
      `${fxCurrenciesTr[pair.from].long} ile ${fxCurrenciesTr[pair.to].long} arasında günlük referans kurla çevir. Kurun ne zaman yayınlandığını canlı sayaçla gör.`,
    title: (pair) => buildFxTitleTr(pair),
    description: (pair, data) => {
      const from = fxCurrenciesTr[pair.from];
      const to = fxCurrenciesTr[pair.to];
      return data
        ? `1 ${from.code} = ${trRate(data.rate)} ${to.code} (${formatTrDateTime(data.latest.lastUpdateUnix)} TSİ referans kuru). ${from.short} ${to.short} çevirici, 30 gün ve 1 yıllık grafik, banka kuru farkı hesaplama.`
        : `${from.short} ${to.short} çevirici: günlük referans kur, 30 gün ve 1 yıllık grafik, çevirme tablosu ve banka kuru farkı hesaplama.`;
    },
    currentRate: "Güncel kur",
    inverseRate: "Ters kur",
    published: "Kaynakta yayınlandı",
    nextUpdate: "Sonraki güncelleme",
    rateType: "Kur türü",
    rateTypeValue: (provider) => `Günlük referans ara kur (${provider})`,
    noData: "Kur verisi şu anda yok.",
    chartTitle: (pair) => `${pair.from}/${pair.to} kur grafiği`,
    analysisTitle: (pairName) => `${pairName} kuru nasıl değişti?`,
    tableTitle: (pairName) => `${pairName} çevirme tablosu`,
    markupTitle: "Banka kuru farkı hesaplayıcı",
    markupIntro:
      "Bankanın ya da döviz bürosunun verdiği kuru gir; ara kura göre ne kadar fark ödediğini, yani kur farkının sana gerçek maliyetini hemen gör.",
    midRateTitle: "Ara kur nedir, nasıl hesaplanır?",
    midRateP1: (pair) => {
      const from = fxCurrenciesTr[pair.from].short;
      const to = fxCurrenciesTr[pair.to].short;
      return {
        before: "Ara kur (referans kur), piyasadaki alış ve satış kurlarının ortasıdır. Bu sayfadaki çevirici bu kuru kullanır: ",
        formula: `${to} tutarı = ${from} miktarı × kur`,
        after: `. Ters yönde ise ${from} miktarı = ${to} tutarı ÷ kur olur.`,
      };
    },
    midRateP2: {
      before:
        "Bankalar, döviz büroları ve kart işlemleri çoğu zaman bu kurun üzerine (döviz satarken) veya altına (döviz alırken) bir marj ekler. Bu marj ayrı bir ücret olarak yazılmadığı için fark edilmesi zordur; yukarıdaki ",
      link: "banka kuru farkı hesaplayıcısı",
      after: " bu gizli maliyeti ortaya çıkarır.",
    },
    relatedTitle: "Diğer döviz çevirileri",
    allRatesLink: "Tüm döviz kurları ve çevirici",
    analysis: buildTrPairAnalysis,
    faq: buildTrPairFaq,
  },
  hub: {
    title: "Döviz Çevirici ve Güncel Döviz Kurları",
    description:
      "Dolar, euro, sterlin, riyal, dirhem, manat ve daha fazlası için günlük referans kurla döviz çevirici. Yayın saati, canlı sayaç, 30 günlük değişim ve banka kuru farkı hesaplama.",
    ogDescription: "Günlük referans kurla TL ve 14 döviz arasında çeviri; yayın saati ve 30 günlük değişim.",
    h1: "Döviz Çevirici",
    intro:
      "Günlük referans kurla TL ve 14 döviz arasında çeviri yap. Kurun kaynakta ne zaman yayınlandığını, kaç saat önce güncellendiğini ve sonraki güncellemeye ne kadar kaldığını canlı olarak gör.",
    boardTitle: "Güncel döviz kurları (TL)",
    colCurrency: "Para birimi",
    colOneUnit: "1 birim",
    colChange: "30 günlük değişim",
    boardNote:
      "30 günlük değişim, dövizin TL karşısındaki değişimidir: ▲ dövizin TL karşısında değer kazandığını (aynı miktar döviz için daha fazla TL gerektiğini), ▼ değer kaybettiğini gösterir.",
    pairsTitle: "Döviz çevirileri",
    faq: [
      {
        question: "Bu döviz kurları ne sıklıkla güncelleniyor?",
        answer:
          "Kurlar günde bir kez güncellenen referans kurlardır. Sayfanın üstünde kaynağın kuru hangi tarih ve saatte yayınladığını, verinin kaç dakika/saat önce yayınlandığını ve bir sonraki güncellemeye ne kadar kaldığını canlı olarak görebilirsin. Anlık (saniyelik) piyasa kuru değildir.",
      },
      {
        question: "Buradaki kur ile bankadaki kur neden farklı?",
        answer:
          "Burada gösterilen, alış ve satış kurlarının ortası olan ara kurdur (referans kur). Bankalar ve döviz büroları alım-satımda bu kura bir marj (spread) ekler. Her döviz çifti sayfasındaki banka kuru farkı hesaplayıcısıyla bu farkın sana maliyetini görebilirsin.",
      },
      {
        question: "Hangi para birimleri destekleniyor?",
        answer:
          "Türk lirası, Amerikan doları, euro, İngiliz sterlini, İsviçre frangı, Suudi Arabistan riyali, BAE dirhemi, Rus rublesi, Azerbaycan manatı, Kuveyt dinarı, Japon yeni, Çin yuanı, Kanada doları, Avustralya doları ve Gürcü larisi arasında çeviri yapabilirsin.",
      },
      {
        question: "Kurlar nereden alınıyor?",
        answer:
          "Güncel referans kurlar ve yayın zamanı ExchangeRate-API'den, grafiklerdeki geçmiş günlük kurlar fawazahmed0/exchange-api'den alınır. Kurlar bilgi amaçlıdır; gerçek işlem kurunu işlemi yaptığın kurum belirler.",
      },
    ],
    relatedTitle: "İlgili araçlar",
    relatedLinks: [
      { href: "/kdv-hesaplama", label: "KDV hesaplama" },
      { href: "/kuyumcu-araclari", label: "Kuyumcu araçları" },
      { href: "/seyahat-priz-voltaj-hesaplama", label: "Seyahat priz ve voltaj rehberi" },
      { href: "/diger-donusumler", label: "Diğer dönüşümler" },
      { href: "/", label: "Tüm birim çeviricileri" },
    ],
    quoteLabel: "TL",
    percent: (value) => trPercent(value),
    embed: { path: "/embed/doviz-cevirici", title: "Döviz Çevirici" },
  },
};
