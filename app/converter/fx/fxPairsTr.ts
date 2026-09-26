// Turkce doviz cifti sayfalari (/doviz-cevirici/[cift]). Ciftler Turkiye'de
// en cok aranan kur sorgularina gore secildi: ana dovizler, Korfez ve
// komsu ulke paralari (hac/umre, calisma, turizm, ticaret) ve EUR/USD
// paritesi. Her cift tek sayfadir; ters yon (TL -> doviz) ayni sayfada
// cevirici ve tabloyla verilir, ayri ve birbirinin kopyasi sayfa uretilmez.

export type FxCurrencyTr = {
  code: string;
  short: string; // basliklarda: "Dolar"
  long: string; // metin icinde: "Amerikan doları"
  lower: string; // soru cumlelerinde: "1 dolar kaç TL?"
  symbol: string;
  country: string;
};

export const fxCurrenciesTr: Record<string, FxCurrencyTr> = {
  TRY: { code: "TRY", short: "TL", long: "Türk lirası", lower: "TL", symbol: "₺", country: "Türkiye" },
  USD: { code: "USD", short: "Dolar", long: "Amerikan doları", lower: "dolar", symbol: "$", country: "ABD" },
  EUR: { code: "EUR", short: "Euro", long: "Euro", lower: "euro", symbol: "€", country: "Euro Bölgesi" },
  GBP: { code: "GBP", short: "Sterlin", long: "İngiliz sterlini", lower: "sterlin", symbol: "£", country: "Birleşik Krallık" },
  CHF: { code: "CHF", short: "İsviçre Frangı", long: "İsviçre frangı", lower: "İsviçre frangı", symbol: "CHF", country: "İsviçre" },
  SAR: { code: "SAR", short: "Riyal", long: "Suudi Arabistan riyali", lower: "riyal", symbol: "SAR", country: "Suudi Arabistan" },
  AED: { code: "AED", short: "Dirhem", long: "BAE dirhemi", lower: "dirhem", symbol: "AED", country: "Birleşik Arap Emirlikleri" },
  RUB: { code: "RUB", short: "Ruble", long: "Rus rublesi", lower: "ruble", symbol: "₽", country: "Rusya" },
  AZN: { code: "AZN", short: "Manat", long: "Azerbaycan manatı", lower: "manat", symbol: "₼", country: "Azerbaycan" },
  JPY: { code: "JPY", short: "Yen", long: "Japon yeni", lower: "yen", symbol: "¥", country: "Japonya" },
  CNY: { code: "CNY", short: "Yuan", long: "Çin yuanı", lower: "yuan", symbol: "CN¥", country: "Çin" },
  KWD: { code: "KWD", short: "Kuveyt Dinarı", long: "Kuveyt dinarı", lower: "Kuveyt dinarı", symbol: "KWD", country: "Kuveyt" },
  CAD: { code: "CAD", short: "Kanada Doları", long: "Kanada doları", lower: "Kanada doları", symbol: "C$", country: "Kanada" },
  AUD: { code: "AUD", short: "Avustralya Doları", long: "Avustralya doları", lower: "Avustralya doları", symbol: "A$", country: "Avustralya" },
  GEL: { code: "GEL", short: "Lari", long: "Gürcü larisi", lower: "lari", symbol: "₾", country: "Gürcistan" },
};

export type FxPairTr = { slug: string; from: string; to: string };

export const fxPairsTr: FxPairTr[] = [
  { slug: "dolar-tl", from: "USD", to: "TRY" },
  { slug: "euro-tl", from: "EUR", to: "TRY" },
  { slug: "sterlin-tl", from: "GBP", to: "TRY" },
  { slug: "euro-dolar", from: "EUR", to: "USD" },
  { slug: "isvicre-frangi-tl", from: "CHF", to: "TRY" },
  { slug: "riyal-tl", from: "SAR", to: "TRY" },
  { slug: "dirhem-tl", from: "AED", to: "TRY" },
  { slug: "ruble-tl", from: "RUB", to: "TRY" },
  { slug: "manat-tl", from: "AZN", to: "TRY" },
  { slug: "kuveyt-dinari-tl", from: "KWD", to: "TRY" },
  { slug: "yen-tl", from: "JPY", to: "TRY" },
  { slug: "yuan-tl", from: "CNY", to: "TRY" },
  { slug: "kanada-dolari-tl", from: "CAD", to: "TRY" },
  { slug: "avustralya-dolari-tl", from: "AUD", to: "TRY" },
  { slug: "lari-tl", from: "GEL", to: "TRY" },
];

export function getFxPairTr(slug: string): FxPairTr | undefined {
  return fxPairsTr.find((pair) => pair.slug === slug);
}

// Kok baslik sablonu " | BirimCeviri.app" (18 karakter) ekler; toplam 60
// karakteri gecmemek icin burada en fazla 42 karakter kullanilir.
export const TR_FX_TITLE_BUDGET = 42;

export function buildFxTitleTr(pair: FxPairTr): string {
  const from = fxCurrenciesTr[pair.from].short;
  const to = fxCurrenciesTr[pair.to].short;
  const candidates = [
    `${from} ${to}: 1 ${from} Kaç ${to}? Güncel Kur`,
    `1 ${from} Kaç ${to}? Güncel Kur`,
    `${from} ${to} Kuru`,
  ];
  return candidates.find((title) => title.length <= TR_FX_TITLE_BUDGET) ?? candidates[candidates.length - 1];
}

// Ayni sayfada gosterilecek ilgili ciftler: once ayni "to" para birimine
// sahip en populer ciftler, sonra digerleri.
export function relatedFxPairsTr(pair: FxPairTr, limit = 8): FxPairTr[] {
  const others = fxPairsTr.filter((candidate) => candidate.slug !== pair.slug);
  const sameTarget = others.filter((candidate) => candidate.to === pair.to);
  const rest = others.filter((candidate) => candidate.to !== pair.to);
  return [...sameTarget, ...rest].slice(0, limit);
}
