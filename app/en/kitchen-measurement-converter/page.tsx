import type { Metadata } from "next";
import Link from "next/link";
import KitchenMeasuresConverter from "../../components/KitchenMeasuresConverter";
import { kitchenIngredientRows } from "../../converter/kitchenMeasures";
import { buildSiteUrl } from "../../siteConfig";

const ingredientLabelsEn: Record<string, string> = {
  un: "Flour (Wheat)",
  "tam-bugday-unu": "Whole Wheat Flour",
  "pirinc-unu": "Rice Flour",
  "misir-unu": "Corn Flour",
  irmik: "Semolina",
  "galeta-unu": "Breadcrumbs",
  "toz-seker": "Granulated Sugar",
  "pudra-sekeri": "Powdered Sugar",
  "esmer-seker": "Brown Sugar",
  tuz: "Salt (Table Salt)",
  pirinc: "Rice",
  bulgur: "Bulgur (Fine)",
  nohut: "Chickpeas (Dry)",
  "kirmizi-mercimek": "Red Lentils",
  "yesil-mercimek": "Green Lentils",
  "kuru-fasulye": "Dry Beans",
  sut: "Milk",
  yogurt: "Yogurt",
  krema: "Heavy Cream",
  tereyagi: "Butter",
  margarin: "Margarine",
  zeytinyagi: "Olive Oil",
  "sivi-yag": "Vegetable Oil",
  bal: "Honey",
  pekmez: "Grape Molasses",
  kakao: "Cocoa Powder",
  "yulaf-ezmesi": "Rolled Oats",
  nisasta: "Cornstarch",
  "kabartma-tozu": "Baking Powder",
  karbonat: "Baking Soda",
  susam: "Sesame Seeds",
  "ceviz-ici": "Walnuts (Chopped)",
  "findik-ici": "Hazelnuts",
  badem: "Almonds",
  "antep-fistigi": "Pistachios",
  "kuru-uzum": "Raisins",
  "hindistan-cevizi": "Desiccated Coconut",
  mayonez: "Mayonnaise",
  ketcap: "Ketchup",
  sirke: "Vinegar",
  "limon-suyu": "Lemon Juice",
  tarcin: "Ground Cinnamon",
  "kirmizi-biber": "Ground Red Pepper",
  karabiber: "Ground Black Pepper",
  kimyon: "Ground Cumin",
};

export const metadata: Metadata = {
  title: "Kitchen Measurement Converter: Cups, Spoons & Grams",
  description:
    "Convert cups, tablespoons, teaspoons, grams and milliliters by ingredient. Gram equivalents for flour, sugar, rice, honey and 15+ common ingredients.",
  alternates: {
    canonical: "/en/kitchen-measurement-converter",
    languages: {
      tr: "/mutfak-olculeri-cevirici",
      en: "/en/kitchen-measurement-converter",
      "x-default": "/mutfak-olculeri-cevirici",
    },
  },
  openGraph: {
    title: "Kitchen Measurement Converter: Cups, Spoons & Grams",
    description:
      "Convert cups, tablespoons, teaspoons, grams and milliliters by ingredient density.",
    url: buildSiteUrl("/en/kitchen-measurement-converter"),
    siteName: "BirimCeviri.app",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Kitchen Measurement Converter: Cups, Spoons & Grams",
    description:
      "Convert cups, tablespoons, teaspoons, grams and milliliters by ingredient density.",
  },
};

export default function EnglishKitchenMeasuresPage() {
  return (
    <main className="all-conversions-page" lang="en">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/en">Home</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Kitchen Measurement Converter</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Kitchen Measurement Converter</h1>

          <p>
            Pick an ingredient and the unit you already know to instantly
            see cup, tablespoon, teaspoon, gram, milliliter and liter
            equivalents. Flour, sugar, rice, honey, butter and more each
            use their own measured values.
          </p>
        </header>

        <KitchenMeasuresConverter locale="en" />

        <section className="category-article-content">
          <h2>How many grams are in a cup of flour or a tablespoon of sugar?</h2>
          <p>
            It depends on the ingredient: a 200 ml cup of flour weighs
            about 130 grams, the same cup of granulated sugar weighs 200
            grams, and honey weighs around 285 grams. That is because each
            ingredient has a different density (weight for the same
            volume) — flour is light and airy, honey is dense and heavy.
            That is why there is no single &quot;1 cup = X grams&quot;
            rule that works for every ingredient.
          </p>
          <p>
            The values below are compiled from common kitchen references
            and are rounded averages, accurate enough for everyday
            cooking. Sifting, packing and brand can shift results by a
            few grams, so for precise baking a kitchen scale is still the
            most reliable option.
          </p>

          <h2>Ingredient Measurement Table (1 Cup = 200 ml)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Gram equivalents per cup, tablespoon and teaspoon</caption>
              <thead>
                <tr>
                  <th scope="col">Ingredient</th>
                  <th scope="col">1 Cup</th>
                  <th scope="col">1 Tablespoon</th>
                  <th scope="col">1 Teaspoon</th>
                </tr>
              </thead>
              <tbody>
                {kitchenIngredientRows.map((row) => (
                  <tr key={row.key}>
                    <td>{ingredientLabelsEn[row.key] ?? row.label}</td>
                    <td>{Math.round(row.gramsPerBardak)} g</td>
                    <td>{Math.round((row.gramsPerBardak * 15) / 200)} g</td>
                    <td>{Math.round((row.gramsPerBardak * 5) / 200)} g</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Frequently Asked Questions</h2>
          <p>
            <strong>How many ml or teaspoons are in a tablespoon?</strong>
            <br />
            One tablespoon is 15 ml, equal to 3 teaspoons (1 teaspoon is 5
            ml). One cup is 200 ml, roughly 13.3 tablespoons.
          </p>
          <p>
            <strong>Why does the same cup weigh differently for different ingredients?</strong>
            <br />
            Cups and spoons measure volume (milliliters), while grams
            measure weight. The link between the two depends on the
            ingredient&apos;s density — airy ingredients like flour weigh
            far less than dense ones like honey for the same volume.
          </p>
          <p>
            Want to scale an entire recipe at once (double it, halve it)?
            Try the{" "}
            <Link href="/en/recipe-converter">recipe converter</Link> —
            paste your recipe, pick a multiplier, and see every line
            scaled instantly.
          </p>

          <h2>Sources</h2>
          <p>
            Table values are rounded averages compiled from common Turkish
            and international kitchen measurement references.
          </p>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Other languages</h2>
          <Link
            className="text-link"
            href="/mutfak-olculeri-cevirici"
            hrefLang="tr"
          >
            View the Turkish version
          </Link>
        </section>
      </div>
    </main>
  );
}
