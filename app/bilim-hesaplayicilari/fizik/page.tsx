import type { Metadata } from "next";
import Link from "next/link";
import { fizikTools as tools } from "../../converter/fizikTools";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Fizik Hesaplayıcıları",
  description:
    "Eğik atış, hareket ve kuvvet gibi fizik konularına yönelik hesaplayıcılar — TYT/AYT müfredatına uygun.",
  alternates: {
    canonical: "/bilim-hesaplayicilari/fizik",
  },
  openGraph: {
    title: "Fizik Hesaplayıcıları",
    description:
      "Eğik atış, hareket ve kuvvet gibi fizik konularına yönelik hesaplayıcılar.",
    url: buildSiteUrl("/bilim-hesaplayicilari/fizik"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default function FizikHubPage() {
  return (
    <main className="all-conversions-page">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/bilim-hesaplayicilari">Bilim Hesaplayıcıları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Fizik</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Fizik Hesaplayıcıları</h1>
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
