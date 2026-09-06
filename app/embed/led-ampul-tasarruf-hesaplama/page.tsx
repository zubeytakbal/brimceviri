import type { Metadata } from "next";
import Link from "next/link";
import LedSavingsCalculator from "../../components/LedSavingsCalculator";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "LED Ampul Tasarruf Hesaplama",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LedSavingsEmbedPage() {
  return (
    <main className="embed-widget-page">
      <div className="embed-widget-shell">
        <LedSavingsCalculator />

        <Link
          className="embed-widget-attribution"
          href={buildSiteUrl("/led-ampul-tasarruf-hesaplama")}
          target="_blank"
          rel="noopener"
        >
          Bu araç birimceviri.app tarafından sağlanıyor →
        </Link>
      </div>
    </main>
  );
}
