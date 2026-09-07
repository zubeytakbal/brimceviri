export type LiveFuelPrice = {
  priceTl: number;
  dateIso: string;
  source: string;
};

type UcuzYakitBulResponse = {
  prices?: Array<{ fuelType?: string; price?: number; date?: string }>;
};

// Ucuncu taraf, resmi olmayan bir servis (ucuzyakitbul.com.tr) --
// "modellenmis ulusal referans fiyati" sunuyor, garantili degil. Bu
// yuzden her zaman graceful fallback: herhangi bir hata/beklenmedik
// sekil durumunda null doner, sayfa kullaniciya manuel giris yaptirir,
// asla eski/yanlis bir rakami sessizce gostermez. Next.js ISR ile
// saatlik yenilenir (fetch her istek yerine cache'den okunur), boylece
// sayfa statik kalir.
async function fetchNationalFuelPrice(fuelType: string): Promise<LiveFuelPrice | null> {
  try {
    const response = await fetch("https://ucuzyakitbul.com.tr/api/prices/national", {
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    const data: UcuzYakitBulResponse = await response.json();
    const entry = data.prices?.find((item) => item.fuelType === fuelType);

    if (
      !entry ||
      typeof entry.price !== "number" ||
      !Number.isFinite(entry.price) ||
      entry.price <= 0 ||
      typeof entry.date !== "string"
    ) {
      return null;
    }

    return {
      priceTl: entry.price,
      dateIso: entry.date,
      source: "ucuzyakitbul.com.tr",
    };
  } catch {
    return null;
  }
}

export async function getNationalGasolinePrice(): Promise<LiveFuelPrice | null> {
  return fetchNationalFuelPrice("Benzin");
}

export async function getNationalLpgPrice(): Promise<LiveFuelPrice | null> {
  return fetchNationalFuelPrice("LPG");
}
