import type { Metadata } from "next";
import Link from "next/link";
import KitchenMeasuresConverter from "../../components/KitchenMeasuresConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Mutfak Ölçüleri Çevirici",
  robots: {
    index: false,
    follow: false,
  },
};

export default function KitchenMeasuresEmbedPage() {
  return (
    <main className="embed-widget-page">
      <div className="embed-widget-shell">
        <KitchenMeasuresConverter locale="tr" />

        <Link
          className="embed-widget-attribution"
          href={buildSiteUrl("/mutfak-olculeri-cevirici")}
          target="_blank"
          rel="noopener"
        >
          Bu araç birimceviri.app tarafından sağlanıyor →
        </Link>
      </div>
    </main>
  );
}
