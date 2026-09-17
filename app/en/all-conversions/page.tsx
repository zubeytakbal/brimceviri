import type { Metadata } from "next";
import Link from "next/link";
import EnglishAllConversionsConverter from "../../components/EnglishAllConversionsConverter";
import { homeCategoryOrder } from "../../converter/homeCategoryOrder";
import { englishCategoryPages } from "../../converter/localizedCategoryPages";
import { featuredEnglishConversions } from "../../converter/englishEditorialConversions";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "All Unit Converters",
  description:
    "Browse all available unit converters by measurement category. Convert Metric/SI, US customary, British Imperial and historical units with live tools.",
  alternates: {
    canonical: "/en/all-conversions",
    languages: {
      tr: "/tum-birimler",
      en: "/en/all-conversions",
      "x-default": "/tum-birimler",
    },
  },
  openGraph: {
    title: "All Unit Converters | BirimCeviri.app",
    description:
      "Browse free online unit converters for metric, US customary, British Imperial and historical measurement systems.",
    url: buildSiteUrl("/en/all-conversions"),
    siteName: "BirimCeviri.app",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "All Unit Converters | BirimCeviri.app",
    description:
      "Browse free online unit converters for metric, US customary, British Imperial and historical measurement systems.",
  },
};

export default function EnglishAllConversionsPage() {
  const categoryPages = [...englishCategoryPages].sort((left, right) => {
    const leftOrder = homeCategoryOrder.indexOf(
      left.category as (typeof homeCategoryOrder)[number]
    );
    const rightOrder = homeCategoryOrder.indexOf(
      right.category as (typeof homeCategoryOrder)[number]
    );

    if (leftOrder !== -1 || rightOrder !== -1) {
      return (leftOrder === -1 ? Infinity : leftOrder) -
        (rightOrder === -1 ? Infinity : rightOrder);
    }

    return left.title.localeCompare(right.title, "en");
  });

  return (
    <main className="all-conversions-page" lang="en">
      <div className="all-conversions-shell">
        <nav
          className="breadcrumbs"
          aria-label="Breadcrumb"
        >
          <Link href="/en">Home</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>All Converters</span>
        </nav>

        <header className="all-conversions-header">
          <h1>All Unit Converters</h1>
          <p>
            Browse all available conversion calculators and select
            the measurement units you want to convert.
          </p>
        </header>

        <div className="unit-page-content">
          <EnglishAllConversionsConverter />

          <section className="conversion-section">
            <h2>How to use the converters</h2>
            <p>
              Select a conversion below, enter a numerical value
              and view the converted result instantly. Each page
              also provides the conversion formula and a table of
              example values.
            </p>
          </section>

          <section className="conversion-section related-conversions">
            <h2>Explore all conversion categories</h2>
            <p>
              Open a category for its complete unit list, dedicated
              conversion pages and unit guides. The most common categories
              appear first.
            </p>
            <ul className="related-conversion-list">
              {categoryPages.map((page) => (
                <li key={page.category}>
                  <Link href={`/en/categories/${page.slug}`}>
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="conversion-section related-conversions">
            <h2>Popular US and Imperial conversions</h2>
            <p>
              These conversions make the measurement system explicit, which is
              especially useful for gallons, pints, quarts and fluid ounces.
            </p>
            <ul className="related-conversion-list">
              {featuredEnglishConversions.map((conversion) => (
                <li key={conversion.href}>
                  <Link href={conversion.href}>{conversion.title}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="conversion-section">
            <h2>Measurement systems, not country-page duplicates</h2>
            <p>
              The same category can contain Metric/SI, US customary,
              British Imperial and historical units where they are relevant.
              For example, US and Imperial volume units remain separate
              because their values differ.
            </p>
          </section>

          <section className="conversion-section related-conversions">
            <h2>Useful libraries</h2>
            <ul className="related-conversion-list">
              <li>
                <Link href="/en/units">Browse all unit guides</Link>
              </li>
              <li>
                <Link href="/en/historical-units">
                  Explore historical measurement systems
                </Link>
              </li>
            </ul>
          </section>

          <section className="conversion-section language-alternatives">
            <h2>Other languages</h2>
            <Link
              className="text-link"
              href="/tum-birimler"
              hrefLang="tr"
            >
              View the Turkish conversion list
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
