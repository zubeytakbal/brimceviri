import type { Metadata } from "next";
import Link from "next/link";
import RecipeScalerConverter from "../../components/RecipeScalerConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Tarif Çevirici",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RecipeScalerEmbedPage() {
  return (
    <main className="embed-widget-page">
      <div className="embed-widget-shell">
        <RecipeScalerConverter locale="tr" />

        <Link
          className="embed-widget-attribution"
          href={buildSiteUrl("/tarif-cevirici")}
          target="_blank"
          rel="noopener"
        >
          Bu araç birimceviri.app tarafından sağlanıyor →
        </Link>
      </div>
    </main>
  );
}
