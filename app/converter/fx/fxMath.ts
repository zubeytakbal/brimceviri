import type { FxHistoryPoint } from "./fxData";

// Tum kurlar USD bazinda tutulur: 1 USD = rates[code].
// 1 "from" = crossRate(from, to) "to".
export function crossRate(rates: Record<string, number>, from: string, to: string): number | null {
  const fromPerUsd = rates[from];
  const toPerUsd = rates[to];
  if (!fromPerUsd || !toPerUsd) return null;
  const value = toPerUsd / fromPerUsd;
  return Number.isFinite(value) && value > 0 ? value : null;
}

export type FxSeriesPoint = { date: string; value: number };

export function pairSeries(points: FxHistoryPoint[], from: string, to: string): FxSeriesPoint[] {
  return points.flatMap((point) => {
    const value = crossRate(point.rates, from, to);
    return value === null ? [] : [{ date: point.date, value }];
  });
}

export type FxSeriesStats = {
  first: FxSeriesPoint;
  last: FxSeriesPoint;
  high: FxSeriesPoint;
  low: FxSeriesPoint;
  average: number;
  changePercent: number;
};

// En az iki nokta yoksa istatistik uretilmez.
export function seriesStats(series: FxSeriesPoint[]): FxSeriesStats | null {
  if (series.length < 2) return null;
  let high = series[0];
  let low = series[0];
  let sum = 0;
  for (const point of series) {
    if (point.value > high.value) high = point;
    if (point.value < low.value) low = point;
    sum += point.value;
  }
  const first = series[0];
  const last = series[series.length - 1];
  return {
    first,
    last,
    high,
    low,
    average: sum / series.length,
    changePercent: ((last.value - first.value) / first.value) * 100,
  };
}

// Tarayicilarin bir kismi (ozellikle Chrome) bazi dillerin sayi verisini
// tasimiyor: "uz-UZ" icin "12,067.11" uretiyor, sunucu (Node, tam ICU) ise
// "12 067,11". Hem yanlis gorunmesin hem sunucu/istemci ayni metni uretsin
// diye bu dillerde ayiraclar elle uygulanir.
const SEPARATOR_OVERRIDES: Record<string, { group: string; decimal: string }> = {
  "uz-UZ": { group: "\u00a0", decimal: "," },
};

export function formatNumber(value: number, locale: string, options: Intl.NumberFormatOptions = {}): string {
  const override = SEPARATOR_OVERRIDES[locale];
  if (!override) return new Intl.NumberFormat(locale, options).format(value);
  return new Intl.NumberFormat("en-US", options)
    .formatToParts(value)
    .map((part) => (part.type === "group" ? override.group : part.type === "decimal" ? override.decimal : part.value))
    .join("");
}

// Kur gosterimi: buyuk degerlerde 2, 1-100 arasinda 4 ondalik, 1'in
// altinda 4 anlamli basamak (0,02391 gibi). Boylece JPY/TRY de, KWD/TRY de
// okunur kalir.
export function rateFractionDigits(value: number): Intl.NumberFormatOptions {
  const abs = Math.abs(value);
  if (abs >= 100) return { minimumFractionDigits: 2, maximumFractionDigits: 2 };
  if (abs >= 1) return { minimumFractionDigits: 4, maximumFractionDigits: 4 };
  return { minimumSignificantDigits: 4, maximumSignificantDigits: 4 };
}

export function formatRate(value: number, locale: string): string {
  return formatNumber(value, locale, rateFractionDigits(value));
}

// Para tutari: 2 ondalik; 1'in altindaki tutarlarda 4 anlamli basamak
// (1 TRY = 0,02387 USD gibi degerler 0,02'ye yuvarlanip anlamini yitirmesin).
export function formatMoney(value: number, locale: string): string {
  const abs = Math.abs(value);
  if (abs > 0 && abs < 1) {
    return formatNumber(value, locale, { maximumSignificantDigits: 4 });
  }
  return formatNumber(value, locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Yuzde isareti olmadan sayi; "%" konumu dile gore degistigi icin (TR: %1,2 / EN: 1.2%) cagiran ekler.
export function formatPercent(value: number, locale: string, signed = false): string {
  return formatNumber(value, locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: signed ? "exceptZero" : "auto",
  });
}

export const FX_TABLE_AMOUNTS = [1, 5, 10, 20, 50, 100, 250, 500, 1000, 2500, 5000, 10000] as const;

// Banka / doviz burosu marji: kullanicinin gordugu kur ile ara kur arasindaki
// fark. "buy" = kullanici yabanci parayi (from) satin aliyor, "sell" =
// kullanici yabanci parayi bozduruyor. amountFrom, islem yapilan yabanci
// para miktaridir; maliyet "to" para biriminde doner.
export type MarkupDirection = "buy" | "sell";

export type MarkupResult = {
  markupPercent: number; // kullanicinin aleyhine olan fark, % (negatifse kullanicinin lehine)
  costInTo: number; // kullanicinin aleyhine olan fark, "to" biriminde
  midTotalInTo: number; // ara kurla islem tutari
  bankTotalInTo: number; // banka kuruyla islem tutari
};

export function bankMarkup(midRate: number, bankRate: number, amountFrom: number, direction: MarkupDirection): MarkupResult | null {
  if (![midRate, bankRate, amountFrom].every((value) => Number.isFinite(value) && value > 0)) return null;
  const midTotalInTo = amountFrom * midRate;
  const bankTotalInTo = amountFrom * bankRate;
  const costInTo = direction === "buy" ? bankTotalInTo - midTotalInTo : midTotalInTo - bankTotalInTo;
  const markupPercent = (costInTo / midTotalInTo) * 100;
  return { markupPercent, costInTo, midTotalInTo, bankTotalInTo };
}

// Tablo miktarlari: sonuc cok kucuk kaliyorsa (1 so'm = 0,00008 USD gibi)
// miktarlar 10'un katlariyla buyutulur ki tablo anlamli kalsin.
export function tableAmountsFor(rate: number): number[] {
  let factor = 1;
  while (rate * factor < 0.01 && factor < 1e9) factor *= 10;
  return FX_TABLE_AMOUNTS.map((amount) => amount * factor);
}
