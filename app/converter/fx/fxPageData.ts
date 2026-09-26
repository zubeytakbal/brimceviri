import { getFxHistory, getFxLatest, toIsoDate, type FxHistory, type FxLatest } from "./fxData";
import { crossRate, pairSeries, seriesStats, type FxSeriesPoint, type FxSeriesStats } from "./fxMath";

export type FxPairPageData = {
  latest: FxLatest;
  rate: number;
  inverse: number;
  daily: FxSeriesPoint[];
  yearly: FxSeriesPoint[];
  stats30: FxSeriesStats | null;
  stats1y: FxSeriesStats | null;
  history: Pick<FxHistory, "providerName" | "providerUrl">;
};

// Bir cift sayfasinin ihtiyac duydugu tum veri. Guncel kur yoksa null
// doner (sayfa bu durumda kur iceren bolumleri gizler); gecmis veri yoksa
// grafik ve istatistikler bos kalir ama guncel kur yine gosterilir.
export async function getFxPairPageData(from: string, to: string): Promise<FxPairPageData | null> {
  const latest = await getFxLatest();
  if (!latest) return null;
  const rate = crossRate(latest.rates, from, to);
  if (rate === null) return null;

  const history = await getFxHistory([from, to], toIsoDate(latest.lastUpdateUnix * 1000));
  const daily = pairSeries(history.daily, from, to);
  const yearly = pairSeries(history.yearly, from, to);

  return {
    latest,
    rate,
    inverse: 1 / rate,
    daily,
    yearly,
    stats30: seriesStats(daily),
    // Yillik seri en az ~10 aylik veriyi kapsamiyorsa "1 yillik" diye sunulmaz.
    stats1y: yearly.length >= 20 ? seriesStats(yearly) : null,
    history: { providerName: history.providerName, providerUrl: history.providerUrl },
  };
}

export type FxBoardRow = {
  code: string;
  rate: number; // 1 code = rate quote
  change30: number | null; // %
};

// Hub sayfasindaki kur tablosu: her para biriminin "quote" karsisindaki kuru
// ve 30 gunluk degisimi.
export async function getFxBoard(codes: readonly string[], quote: string) {
  const latest = await getFxLatest();
  if (!latest) return null;
  const history = await getFxHistory([...codes, quote], toIsoDate(latest.lastUpdateUnix * 1000));
  const rows: FxBoardRow[] = codes.flatMap((code) => {
    const rate = crossRate(latest.rates, code, quote);
    if (rate === null) return [];
    const stats = seriesStats(pairSeries(history.daily, code, quote));
    return [{ code, rate, change30: stats ? stats.changePercent : null }];
  });
  return { latest, rows };
}
