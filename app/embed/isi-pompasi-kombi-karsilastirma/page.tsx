import type { Metadata } from "next";
import Link from "next/link";
import HeatPumpVsBoilerCalculator from "../../components/HeatPumpVsBoilerCalculator";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Isı Pompası mı Kombi mi?",
  robots: {
    index: false,
    follow: false,
  },
};

export default function HeatPumpVsBoilerEmbedPage() {
  return (
    <main className="embed-widget-page">
      <div className="embed-widget-shell">
        <HeatPumpVsBoilerCalculator />

        <Link
          className="embed-widget-attribution"
          href={buildSiteUrl("/isi-pompasi-kombi-karsilastirma")}
          target="_blank"
          rel="noopener"
        >
          Bu araç birimceviri.app tarafından sağlanıyor →
        </Link>
      </div>
    </main>
  );
}
