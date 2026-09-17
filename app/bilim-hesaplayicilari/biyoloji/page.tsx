import type { Metadata } from "next";
import Link from "next/link";
import { biyolojiTools as tools } from "../../converter/biyolojiTools";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Biyoloji Hesaplayıcıları",
  description:
    "Amino asitler, kodon tablosu, DNA/RNA çevirici ve peptit molar kütle hesaplama — lise ve üniversite biyoloji/biyokimya konularına yönelik araçlar.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/biyoloji",
  },
  openGraph: {
    title: "Biyoloji Hesaplayıcıları",
    description:
      "Amino asitler, kodon tablosu, DNA/RNA çevirici ve peptit molar kütle hesaplama.",
    url: buildSiteUrl("/bilim-hesaplayicilari/biyoloji"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default function BiyolojiHubPage() {
  return (
    <main className="all-conversions-page">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/bilim-hesaplayicilari">Bilim Hesaplayıcıları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Biyoloji</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Biyoloji Hesaplayıcıları</h1>
        </header>

        <section className="category-article-content">
          <ul className="tool-list">
            {tools.map((tool) => (
              <li className="tool-list-item" key={tool.id}>
                <Link className="tool-list-link" href={tool.href}>
                  <span className="tool-list-title">{tool.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
