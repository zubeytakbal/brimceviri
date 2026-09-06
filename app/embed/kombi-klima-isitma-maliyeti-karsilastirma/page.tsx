import type { Metadata } from "next";
import Link from "next/link";
import HeatingCostComparisonCalculator from "../../components/HeatingCostComparisonCalculator";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Kombi mi Klima mı?",
  robots: {
    index: false,
    follow: false,
  },
};

export default function HeatingCostComparisonEmbedPage() {
  return (
    <main className="embed-widget-page">
      <div className="embed-widget-shell">
        <HeatingCostComparisonCalculator />

        <Link
          className="embed-widget-attribution"
          href={buildSiteUrl("/kombi-klima-isitma-maliyeti-karsilastirma")}
          target="_blank"
          rel="noopener"
        >
          Bu araç birimceviri.app tarafından sağlanıyor →
        </Link>
      </div>
    </main>
  );
}
