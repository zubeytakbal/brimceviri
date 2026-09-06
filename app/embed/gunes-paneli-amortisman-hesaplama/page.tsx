import type { Metadata } from "next";
import Link from "next/link";
import SolarPanelPaybackCalculator from "../../components/SolarPanelPaybackCalculator";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Güneş Paneli Amortisman Hesaplama",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SolarPanelPaybackEmbedPage() {
  return (
    <main className="embed-widget-page">
      <div className="embed-widget-shell">
        <SolarPanelPaybackCalculator />

        <Link
          className="embed-widget-attribution"
          href={buildSiteUrl("/gunes-paneli-amortisman-hesaplama")}
          target="_blank"
          rel="noopener"
        >
          Bu araç birimceviri.app tarafından sağlanıyor →
        </Link>
      </div>
    </main>
  );
}
