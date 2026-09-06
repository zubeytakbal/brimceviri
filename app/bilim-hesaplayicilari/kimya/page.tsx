import type { Metadata } from "next";
import Link from "next/link";
import { kimyaTools as tools } from "../../converter/kimyaTools";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Kimya Hesaplayıcıları",
  description:
    "Mol, molarite, pH, stokiyometri ve daha fazlası — 9-12. sınıf ve AYT kimya müfredatına uygun hesaplayıcılar.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/kimya",
  },
  openGraph: {
    title: "Kimya Hesaplayıcıları",
    description:
      "Mol, molarite, pH, stokiyometri ve daha fazlası — 9-12. sınıf ve AYT kimya müfredatına uygun hesaplayıcılar.",
    url: buildSiteUrl("/bilim-hesaplayicilari/kimya"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default function KimyaHubPage() {
  return (
    <main className="all-conversions-page">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/bilim-hesaplayicilari">Bilim Hesaplayıcıları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Kimya</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Kimya Hesaplayıcıları</h1>
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
