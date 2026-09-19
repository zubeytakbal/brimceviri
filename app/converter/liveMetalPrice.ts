export type LiveMetalPrice = {
  pricePerGramUsd: number;
  updatedAtIso: string;
  source: string;
};

const TROY_OUNCE_IN_GRAMS = 31.1034768;

type GoldApiResponse = {
  price?: number;
  updatedAt?: string;
};

// gold-api.com -- ucretsiz, key gerektirmeyen, canli ons (troy ounce)
// bazinda ABD dolari spot fiyati sunan bir servis. Garantili degil, bu
// yuzden liveFuelPrice.ts'deki gibi her zaman graceful fallback: hata
// veya beklenmedik sekil durumunda null doner, arayuz kullaniciya
// manuel fiyat girisi yaptirir. Next.js ISR ile saatlik yenilenir.
async function fetchSpotPricePerGram(symbol: "XAU" | "XAG"): Promise<LiveMetalPrice | null> {
  try {
    const response = await fetch(`https://api.gold-api.com/price/${symbol}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    const data: GoldApiResponse = await response.json();

    if (typeof data.price !== "number" || !Number.isFinite(data.price) || data.price <= 0) {
      return null;
    }

    return {
      pricePerGramUsd: data.price / TROY_OUNCE_IN_GRAMS,
      updatedAtIso: data.updatedAt ?? new Date().toISOString(),
      source: "gold-api.com",
    };
  } catch {
    return null;
  }
}

export async function getGoldPricePerGram(): Promise<LiveMetalPrice | null> {
  return fetchSpotPricePerGram("XAU");
}

export async function getSilverPricePerGram(): Promise<LiveMetalPrice | null> {
  return fetchSpotPricePerGram("XAG");
}
