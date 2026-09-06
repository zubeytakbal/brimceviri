export type CurrencyCode = "TRY" | "USD" | "EUR" | "GBP";

export const currencyLabels: Record<CurrencyCode, string> = {
  TRY: "Türk Lirası (₺)",
  USD: "Amerikan Doları ($)",
  EUR: "Euro (€)",
  GBP: "İngiliz Sterlini (£)",
};

export type ExchangeRatesSnapshot = {
  // 1 TRY = rates[code] adet ilgili para birimi
  rates: Record<Exclude<CurrencyCode, "TRY">, number>;
  dateIso: string;
  source: string;
};

// Frankfurter (ECB referans kurlarina dayanan, ucretsiz, key
// gerektirmeyen bir API) uzerinden canli doviz kuru cekilir. Next.js
// ISR ile saatlik yenilenir -- sayfa statik kalir, arka planda gercek
// veriyle guncellenir. API'nin kendisi hafta ici gunde bir (ECB
// referans saatinde) guncellenir.
export async function getExchangeRates(): Promise<ExchangeRatesSnapshot | null> {
  try {
    const response = await fetch(
      "https://api.frankfurter.dev/v1/latest?base=TRY&symbols=USD,EUR,GBP",
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) return null;

    const data = (await response.json()) as {
      date?: string;
      rates?: Record<string, number>;
    };

    if (
      !data.rates ||
      typeof data.rates.USD !== "number" ||
      typeof data.rates.EUR !== "number" ||
      typeof data.rates.GBP !== "number" ||
      !data.date
    ) {
      return null;
    }

    return {
      rates: {
        USD: data.rates.USD,
        EUR: data.rates.EUR,
        GBP: data.rates.GBP,
      },
      dateIso: data.date,
      source: "Frankfurter (ECB referans kurları)",
    };
  } catch {
    return null;
  }
}

export function convertCurrency(
  amount: number,
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode,
  rates: ExchangeRatesSnapshot["rates"]
): number | null {
  if (!Number.isFinite(amount)) return null;

  const tryAmount = fromCurrency === "TRY" ? amount : amount / rates[fromCurrency];
  const result = toCurrency === "TRY" ? tryAmount : tryAmount * rates[toCurrency];

  return Number.isFinite(result) ? result : null;
}
