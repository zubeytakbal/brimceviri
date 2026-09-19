export type UsdRatesSnapshot = {
  rates: Record<string, number>;
  updatedAtIso: string;
  source: string;
};

// exchangerate-api.com'un ucretsiz, key gerektirmeyen ucu -- ABD dolari
// bazinda, Korfez ve Arap ulkeleri dahil genis bir para birimi listesi
// sunuyor (Frankfurter/ECB bu ulkeleri kapsamiyor). Diger canli veri
// modullerinde oldugu gibi (liveFuelPrice.ts, liveMetalPrice.ts)
// graceful fallback: hata durumunda null doner. Next.js ISR ile
// saatlik yenilenir.
export async function getUsdExchangeRates(): Promise<UsdRatesSnapshot | null> {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    const data = (await response.json()) as {
      result?: string;
      rates?: Record<string, number>;
      time_last_update_utc?: string;
    };

    if (data.result !== "success" || !data.rates) {
      return null;
    }

    return {
      rates: data.rates,
      updatedAtIso: data.time_last_update_utc ?? new Date().toISOString(),
      source: "exchangerate-api.com",
    };
  } catch {
    return null;
  }
}
