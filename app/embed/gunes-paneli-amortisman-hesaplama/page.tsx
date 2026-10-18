import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import SolarPanelPaybackCalculator from "../../components/SolarPanelPaybackCalculator";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Güneş Paneli Amortisman Hesaplama",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/gunes-paneli-amortisman-hesaplama",
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
