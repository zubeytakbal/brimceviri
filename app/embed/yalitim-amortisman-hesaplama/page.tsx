import type { Metadata } from "next";
import Link from "next/link";
import InsulationPaybackCalculator from "../../components/InsulationPaybackCalculator";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Yalıtım Amortisman Hesaplama",
  robots: {
    index: false,
    follow: false,
  },
};

export default function InsulationPaybackEmbedPage() {
  return (
    <main className="embed-widget-page">
      <div className="embed-widget-shell">
        <InsulationPaybackCalculator />

        <Link
          className="embed-widget-attribution"
          href={buildSiteUrl("/yalitim-amortisman-hesaplama")}
          target="_blank"
          rel="noopener"
        >
          Bu araç birimceviri.app tarafından sağlanıyor →
        </Link>
      </div>
    </main>
  );
}
