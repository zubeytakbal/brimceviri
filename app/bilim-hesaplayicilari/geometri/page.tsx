import type { Metadata } from "next";
import Link from "next/link";
import { geometriTools as tools } from "../../converter/geometriTools";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Geometri Hesaplayıcıları",
  description:
    "Pisagor teoremi, alan, çevre, hacim ve daha fazlası — ortaokul, lise ve AYT matematik müfredatına uygun geometri hesaplayıcıları.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/geometri",
  },
  openGraph: {
    title: "Geometri Hesaplayıcıları",
    description:
      "Pisagor teoremi, alan, çevre, hacim ve daha fazlası — ortaokul, lise ve AYT matematik müfredatına uygun geometri hesaplayıcıları.",
    url: buildSiteUrl("/bilim-hesaplayicilari/geometri"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default function GeometriHubPage() {
  return (
    <main className="all-conversions-page">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/bilim-hesaplayicilari">Bilim Hesaplayıcıları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Geometri</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Geometri Hesaplayıcıları</h1>
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
