import type { Metadata } from "next";
import Link from "next/link";
import RemoteWorkVsOfficeCostCalculator from "../../components/RemoteWorkVsOfficeCostCalculator";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Uzaktan Çalışma mı Ofis mi?",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RemoteWorkVsOfficeCostEmbedPage() {
  return (
    <main className="embed-widget-page">
      <div className="embed-widget-shell">
        <RemoteWorkVsOfficeCostCalculator />

        <Link
          className="embed-widget-attribution"
          href={buildSiteUrl("/uzaktan-calisma-ofis-maliyeti-karsilastirma")}
          target="_blank"
          rel="noopener"
        >
          Bu araç birimceviri.app tarafından sağlanıyor →
        </Link>
      </div>
    </main>
  );
}
