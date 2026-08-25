import type { Metadata } from "next";
import Link from "next/link";
import ShoeSizeConverter from "../../components/ShoeSizeConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Shoe Size Converter: EU, US and UK Size Chart",
  description:
    "Convert shoe sizes between EU, US and UK systems. Compare general sizing plus Nike, Adidas, Puma, New Balance and Converse size charts.",
  alternates: {
    canonical: "/en/shoe-size-converter",
    languages: {
      tr: "/ayakkabi-numarasi-cevirme",
      en: "/en/shoe-size-converter",
      "x-default": "/ayakkabi-numarasi-cevirme",
    },
  },
  openGraph: {
    title: "Shoe Size Converter: EU, US and UK Size Chart",
    description:
      "Convert shoe sizes between EU, US and UK systems and review brand-based size tables.",
    url: buildSiteUrl("/en/shoe-size-converter"),
    siteName: "BirimCeviri.app",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Shoe Size Converter: EU, US and UK Size Chart",
    description:
      "Convert shoe sizes between EU, US and UK systems and review brand-based size tables.",
  },
};

export default function EnglishShoeSizePage() {
  return (
    <main className="all-conversions-page" lang="en">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/en">Home</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Shoe Size Converter</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Shoe Size Converter</h1>

          <p>
            Enter the size you already know and instantly compare the
            matching EU, US and UK values. Separate tables are available
            for men, women, toddlers and big kids, with brand-specific
            sizing for Nike, Adidas, Puma, New Balance and Converse.
          </p>
        </header>

        <ShoeSizeConverter locale="en" />

        <section className="category-article-content">
          <h2>Why do shoe sizes vary by brand?</h2>
          <p>
            EU sizing is consistent across most markets, but US and UK
            systems use different scales. Brands also apply their own
            last shapes and fit decisions, so the same foot length can
            appear as one label in one brand and a half size higher or
            lower in another.
          </p>
          <p>
            The tables here are compiled from brand sizing references.
            For the closest match, measure your foot length in
            centimeters and use the foot-length option in the converter.
          </p>
          <p>
            In children&apos;s sizing, US numbering resets after 13.5 and
            starts again at 1 for youth sizes. That is why toddler and
            big-kid tables are shown separately.
          </p>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Other languages</h2>
          <Link
            className="text-link"
            href="/ayakkabi-numarasi-cevirme"
            hrefLang="tr"
          >
            View the Turkish version
          </Link>
        </section>
      </div>
    </main>
  );
}
