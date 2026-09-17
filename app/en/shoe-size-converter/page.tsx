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
            EU, US and UK labels use different numerical scales, and US
            sizing also differs between men&apos;s and women&apos;s ranges.
            Brands apply their own lasts, width assumptions and fit
            decisions, so the same foot length can appear as one label in
            one brand and a half size higher or lower in another.
          </p>
          <p>
            The tables provide a practical closest match rather than a
            fit guarantee. For a new brand, use the product&apos;s official
            size guide as the final reference, particularly where the
            listing also specifies a narrow, regular or wide fit.
          </p>

          <h2>How to measure your foot length</h2>
          <p>
            Stand with your heel against a wall on a sheet of paper,
            keeping your weight on the foot. Mark the furthest toe,
            then measure from the wall edge to that mark in centimeters.
            Measure both feet and use the longer measurement when the
            two differ.
          </p>
          <p>
            Foot length in centimeters is the most useful common
            reference when moving between sizing systems. Leave some
            space for socks and normal toe movement; the right allowance
            varies by shoe type and by the fit guidance from the brand.
          </p>

          <h2>Using EU, US and UK shoe size charts</h2>
          <p>
            Start by selecting the correct group, then choose the brand
            only when you know it. Enter an EU, US or UK label, or use
            your measured foot length. The displayed row gives the
            closest equivalent across the four systems and the table
            below lets you check neighbouring sizes.
          </p>
          <p>
            Children&apos;s numbering has its own ranges: US sizes reset
            after 13.5 before youth sizes start again at 1. That is why
            toddler/little-kid and big-kid charts are kept separate from
            adult charts here.
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
