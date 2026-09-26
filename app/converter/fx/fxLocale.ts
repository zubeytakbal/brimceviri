import type { FxChartLabels } from "../../components/fx/FxChart";
import type { FxMarkupLabels } from "../../components/fx/FxMarkupCalculator";
import type { FxMultiConverterLabels } from "../../components/fx/FxMultiConverter";
import type { FxPairConverterLabels } from "../../components/fx/FxPairConverter";
import type { FxRelativeTimeLabels } from "../../components/fx/FxRelativeTime";
import type { FaqItem } from "../faqSchema";
import type { MarkupDirection } from "./fxMath";
import type { FxPairPageData } from "./fxPageData";

// Bir dilin doviz sayfalari icin gereken her sey. Tasarim (FxPairPageView,
// FxHubView) tum dillerde ortaktir; yalnizca bu nesne dile gore degisir.

export type FxCurrencyInfo = {
  code: string;
  short: string; // basliklarda: "Dolar", "ডলার", "Dollar"
  long: string; // metin icinde: "Amerikan doları"
  lower: string; // soru cumlelerinde: "1 dolar kaç TL?"
};

export type FxPair = { slug: string; from: string; to: string };

export type FxLink = { href: string; label: string };

export type FxLocaleContent = {
  numberLocale: string;
  htmlLang?: string; // <main lang>; TR icin gerekmez (kok dil)
  ogLocale: string;
  basePath: string; // hub adresi
  homeHref: string;
  quote: string; // yerel para birimi: TRY / BDT / UZS
  currencies: Record<string, FxCurrencyInfo>;
  pairs: FxPair[];
  defaultMarkupDirection: MarkupDirection;

  labels: {
    relative: FxRelativeTimeLabels;
    converter: FxPairConverterLabels;
    chart: FxChartLabels;
    markup: FxMarkupLabels;
    multi: FxMultiConverterLabels;
  };

  formatDateTime: (unix: number) => string; // saat dilimi ekiyle: "26 Eylül 2026 03:02 (TSİ)"
  formatDate: (iso: string) => string;

  common: {
    home: string;
    hub: string;
    breadcrumbAria: string;
    unavailable: string;
    faqTitle: string;
    sourcesTitle: string;
    sourceLatest: string; // "– güncel referans kur ve yayın zamanı ..."
    sourceHistory: string;
    disclaimer: string;
  };

  pair: {
    pairName: (pair: FxPair) => string;
    h1: (pairName: string) => string;
    heroDescription: (pair: FxPair) => string;
    title: (pair: FxPair) => string;
    description: (pair: FxPair, data: FxPairPageData | null) => string;
    currentRate: string;
    inverseRate: string;
    published: string;
    nextUpdate: string;
    rateType: string;
    rateTypeValue: (providerName: string) => string;
    noData: string;
    chartTitle: (pair: FxPair) => string;
    analysisTitle: (pairName: string) => string;
    tableTitle: (pairName: string) => string;
    markupTitle: string;
    markupIntro: string;
    midRateTitle: string;
    midRateP1: (pair: FxPair) => { before: string; formula: string; after: string };
    midRateP2: { before: string; link: string; after: string };
    relatedTitle: string;
    allRatesLink: string;
    analysis: (pair: FxPair, data: FxPairPageData) => string[];
    faq: (pair: FxPair, data: FxPairPageData | null) => FaqItem[];
    // yerel mevzuat/resmi kur notu (ornegin Markaziy bank kursi); istege bagli
    officialRateNote?: { title: string; paragraphs: string[]; link?: FxLink };
  };

  hub: {
    title: string;
    description: string;
    ogDescription: string;
    h1: string;
    intro: string;
    boardTitle: string;
    colCurrency: string;
    colOneUnit: string;
    colChange: string;
    boardNote: string;
    pairsTitle: string;
    faq: FaqItem[];
    relatedTitle: string;
    relatedLinks: FxLink[];
    quoteLabel: string; // tabloda "41,90 TL" -> "TL"
    percent: (value: number) => string; // mutlak deger, isaretsiz
    embed?: { path: string; title: string };
  };
};

// Ana sayfa aramasi icin doviz sayfalari (hub + her cift). searchText ham
// metindir; her ana sayfa kendi normalizasyonunu uygular.
export function buildFxSearchEntries(content: FxLocaleContent, hubKeywords: string) {
  return [
    {
      id: "fx-hub",
      href: content.basePath,
      label: content.common.hub,
      description: content.hub.boardTitle,
      searchText: `${content.common.hub} ${hubKeywords}`,
    },
    ...content.pairs.map((pair) => {
      const from = content.currencies[pair.from];
      const to = content.currencies[pair.to];
      return {
        id: `fx-${pair.slug}`,
        href: `${content.basePath}/${pair.slug}`,
        label: content.pair.pairName(pair),
        description: content.pair.title(pair),
        searchText: [from.short, from.long, from.code, to.short, to.long, to.code, pair.slug.replace(/-/g, " "), hubKeywords].join(" "),
      };
    }),
  ];
}
