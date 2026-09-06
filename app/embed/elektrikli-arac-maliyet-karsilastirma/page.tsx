import type { Metadata } from "next";
import Link from "next/link";
import EvVsIceComparisonCalculator from "../../components/EvVsIceComparisonCalculator";
import { getNationalGasolinePrice } from "../../converter/liveFuelPrice";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Elektrikli Araç mı Benzinli Araç mı?",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function EvVsIceEmbedPage() {
  const liveGasolinePrice = await getNationalGasolinePrice();

  return (
    <main className="embed-widget-page">
      <div className="embed-widget-shell">
        <EvVsIceComparisonCalculator liveGasolinePrice={liveGasolinePrice} />

        <Link
          className="embed-widget-attribution"
          href={buildSiteUrl("/elektrikli-arac-maliyet-karsilastirma")}
          target="_blank"
          rel="noopener"
        >
          Bu araç birimceviri.app tarafından sağlanıyor →
        </Link>
      </div>
    </main>
  );
}
