import type { Metadata } from "next";
import Link from "next/link";
import RecipeScalerConverter from "../../components/RecipeScalerConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Recipe Converter: Scale a Recipe, Convert Cups to Grams",
  description:
    "Paste your recipe, pick a multiplier, and every ingredient amount scales instantly. Known ingredients also get an automatic gram conversion.",
  alternates: {
    canonical: "/en/recipe-converter",
    languages: {
      tr: "/tarif-cevirici",
      en: "/en/recipe-converter",
      "x-default": "/tarif-cevirici",
    },
  },
  openGraph: {
    title: "Recipe Converter: Scale a Recipe, Convert Cups to Grams",
    description:
      "Paste your recipe, double it or halve it, and get automatic gram equivalents for recognized ingredients.",
    url: buildSiteUrl("/en/recipe-converter"),
    siteName: "BirimCeviri.app",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Recipe Converter: Scale a Recipe, Convert Cups to Grams",
    description:
      "Paste your recipe, double it or halve it, and get automatic gram equivalents for recognized ingredients.",
  },
};

export default function EnglishRecipeScalerPage() {
  return (
    <main className="all-conversions-page" lang="en">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/en">Home</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Recipe Converter</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Recipe Converter</h1>

          <p>
            Paste your recipe below, one ingredient per line (e.g.
            &quot;2 cups flour&quot;). Pick a multiplier and every amount
            scales instantly; ingredients written in cups, tablespoons
            or teaspoons that appear in the{" "}
            <Link href="/en/kitchen-measurement-converter">
              kitchen measurement table
            </Link>{" "}
            also get an automatic gram equivalent.
          </p>
        </header>

        <RecipeScalerConverter locale="en" />

        <section className="category-article-content">
          <h2>How do you double a recipe?</h2>
          <p>
            Multiply the quantity on every line by your scaling factor:
            to turn a recipe for 2 into a recipe for 4, multiply every
            amount by 2. This tool does that automatically — paste your
            recipe, pick a multiplier (0.5x, 1.5x, 2x, 3x, or a custom
            number), and see the result instantly.
          </p>
          <p>
            Almost any line starting with a number (whole numbers,
            decimals, fractions like &quot;1/2&quot;) is recognized and
            scaled correctly, regardless of the ingredient name.
          </p>

          <h2>Why do some lines not show a gram equivalent?</h2>
          <p>
            A gram equivalent is only calculated when both the unit
            (cup, tablespoon, teaspoon, gram, ml, liter) and the
            ingredient name are recognized. Lines like &quot;2
            eggs&quot; or ingredients not in the table still scale
            correctly, they just won&apos;t show an extra gram value.
            See the full ingredient list on the{" "}
            <Link href="/en/kitchen-measurement-converter">
              kitchen measurement converter page
            </Link>
            .
          </p>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Other languages</h2>
          <Link className="text-link" href="/tarif-cevirici" hrefLang="tr">
            View the Turkish version
          </Link>
        </section>
      </div>
    </main>
  );
}
