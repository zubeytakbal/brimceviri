import type { Metadata } from "next";
import Link from "next/link";
import { uzbekCategoryPages } from "../converter/localizedUzbekCategoryPages";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Birlik O'zgartirgich — O'zbekcha",
  description:
    "Uzunlik, massa, harorat va boshqa fizik birliklarni bepul va tez o'zgartiring. 12+ kategoriya, aniq formulalar bilan.",
  alternates: {
    canonical: "/uz",
    languages: {
      tr: "/",
      en: "/en",
      de: "/de",
      ar: "/ar",
      uz: "/uz",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Birlik O'zgartirgich — O'zbekcha",
    description:
      "Uzunlik, massa, harorat va boshqa fizik birliklarni bepul va tez o'zgartiring.",
    url: buildSiteUrl("/uz"),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

export default function UzbekHomePage() {
  return (
    <main className="all-conversions-page" lang="uz">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sahifa yo'li">
          <span>Bosh sahifa</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Birlik O'zgartirgich</h1>
          <p>
            Kerakli kategoriyani tanlang: uzunlik, massa, harorat, bosim,
            energiya va boshqa fizik birliklarni bepul o'zgartiring.
          </p>
        </header>

        <section className="category-article-content">
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Kategoriya</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {uzbekCategoryPages.map((category) => (
                  <tr key={category.slug}>
                    <td>{category.title}</td>
                    <td>
                      <Link
                        className="text-link"
                        href={`/uz/turkumlar/${category.slug}`}
                      >
                        Ochish
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <section className="conversion-section language-alternatives">
            <h2>Boshqa tillar</h2>
            <Link className="text-link" href="/" hrefLang="tr">
              Turkcha versiyani ochish
            </Link>
            <Link className="text-link" href="/en" hrefLang="en">
              View the English version
            </Link>
          </section>
        </section>
      </div>
    </main>
  );
}
