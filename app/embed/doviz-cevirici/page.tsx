import type { Metadata } from "next";
import Link from "next/link";
import CurrencyConverterCalculator from "../../components/CurrencyConverterCalculator";
import { getExchangeRates } from "../../converter/exchangeRates";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Döviz Çevirici",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CurrencyConverterEmbedPage() {
  const rates = await getExchangeRates();

  return (
    <main className="embed-widget-page">
      <div className="embed-widget-shell">
        <CurrencyConverterCalculator rates={rates} />

        <Link
          className="embed-widget-attribution"
          href={buildSiteUrl("/doviz-cevirici")}
          target="_blank"
          rel="noopener"
        >
          Bu araç birimceviri.app tarafından sağlanıyor →
        </Link>
      </div>
    </main>
  );
}
