import type { Metadata } from "next";
import Link from "next/link";
import { matematikTools as tools } from "../../converter/matematikTools";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Matematik Hesaplayıcıları",
  description:
    "EBOB-EKOK, olasılık, kombinasyon, karekök, geometri ve daha fazlası — ortaokul, lise ve AYT matematik müfredatına uygun hesaplayıcılar.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/matematik",
  },
  openGraph: {
    title: "Matematik Hesaplayıcıları",
    description:
      "EBOB-EKOK, olasılık, kombinasyon, karekök, geometri ve daha fazlası — ortaokul, lise ve AYT matematik müfredatına uygun hesaplayıcılar.",
    url: buildSiteUrl("/bilim-hesaplayicilari/matematik"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default function MatematikHubPage() {
  return (
    <main className="all-conversions-page">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/bilim-hesaplayicilari">Bilim Hesaplayıcıları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Matematik</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Matematik Hesaplayıcıları</h1>
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
