import type { Metadata } from "next";
import Link from "next/link";
import RingSizeConverter from "../../components/RingSizeConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Ring Size Converter: mm, US and UK Size Chart",
  description:
    "Convert ring sizes between diameter (mm), European circumference (mm), US and UK systems. See the standard international jewelry size chart.",
  alternates: {
    canonical: "/en/ring-size-converter",
    languages: {
      tr: "/yuzuk-olcusu-cevirici",
      en: "/en/ring-size-converter",
      "x-default": "/yuzuk-olcusu-cevirici",
    },
  },
  openGraph: {
    title: "Ring Size Converter: mm, US and UK Size Chart",
    description:
      "Convert ring sizes between diameter (mm), circumference (mm), US and UK systems.",
    url: buildSiteUrl("/en/ring-size-converter"),
    siteName: "BirimCeviri.app",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Ring Size Converter: mm, US and UK Size Chart",
    description:
      "Convert ring sizes between diameter (mm), circumference (mm), US and UK systems.",
  },
};

export default function EnglishRingSizePage() {
  return (
    <main className="all-conversions-page" lang="en">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/en">Home</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Ring Size Converter</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Ring Size Converter</h1>

          <p>
            Enter the ring size you already know and instantly see the
            diameter (mm), European circumference (mm), US and UK
            equivalents. Unlike shoe sizes, ring sizing does not vary by
            brand — the jewelry industry uses one standard chart
            worldwide.
          </p>
        </header>

        <RingSizeConverter locale="en" />

        <section className="category-article-content">
          <h2>How is ring size determined?</h2>
          <p>
            Ring size is most reliably expressed as the inside diameter
            of the ring in millimeters. The European system uses inside
            circumference directly — diameter and circumference are
            related by simple geometry (circumference = diameter × π),
            so the conversion between them is always exact. US and UK
            systems use their own numbered and lettered scales; this
            chart is compiled from the standard international jewelry
            sizing reference.
          </p>
          <p>
            For the most accurate result, measure the inside diameter of
            a ring that already fits with a ruler and select the closest
            value under &quot;Diameter (mm)&quot;.
          </p>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Other languages</h2>
          <Link
            className="text-link"
            href="/yuzuk-olcusu-cevirici"
            hrefLang="tr"
          >
            View the Turkish version
          </Link>
        </section>
      </div>
    </main>
  );
}
