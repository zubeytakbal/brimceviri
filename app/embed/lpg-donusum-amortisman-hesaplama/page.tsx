import type { Metadata } from "next";
import Link from "next/link";
import LpgConversionPaybackCalculator from "../../components/LpgConversionPaybackCalculator";
import { getNationalGasolinePrice, getNationalLpgPrice } from "../../converter/liveFuelPrice";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "LPG Dönüşüm Amortisman Hesaplama",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LpgConversionPaybackEmbedPage() {
  const [liveGasolinePrice, liveLpgPrice] = await Promise.all([
    getNationalGasolinePrice(),
    getNationalLpgPrice(),
  ]);

  return (
    <main className="embed-widget-page">
      <div className="embed-widget-shell">
        <LpgConversionPaybackCalculator
          liveGasolinePrice={liveGasolinePrice}
          liveLpgPrice={liveLpgPrice}
        />

        <Link
          className="embed-widget-attribution"
          href={buildSiteUrl("/lpg-donusum-amortisman-hesaplama")}
          target="_blank"
          rel="noopener"
        >
          Bu araç birimceviri.app tarafından sağlanıyor →
        </Link>
      </div>
    </main>
  );
}
