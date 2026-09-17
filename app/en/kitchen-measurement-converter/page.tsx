import type { Metadata } from "next";
import Link from "next/link";
import KitchenMeasuresConverter from "../../components/KitchenMeasuresConverter";
import {
  kitchenIngredientRows,
  mlPerKitchenCupStandard,
} from "../../converter/kitchenMeasures";
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

const defaultEnglishCupMl = mlPerKitchenCupStandard.us;

function gramsInDefaultEnglishCup(gramsPerTurkishCup: number) {
  return Math.round((gramsPerTurkishCup * defaultEnglishCupMl) / 200);
}

export const metadata: Metadata = {
  title: "Kitchen Measurement Converter: Cups, Spoons & Grams",
  description:
    "Convert cups, tablespoons, teaspoons, grams and milliliters by ingredient. Choose US, metric or imperial cup standards and compare common recipe measures.",
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
      "Convert recipe measures with US, metric and imperial cup standards.",
    url: buildSiteUrl("/en/kitchen-measurement-converter"),
    siteName: "BirimCeviri.app",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Kitchen Measurement Converter: Cups, Spoons & Grams",
    description:
      "Convert recipe measures with US, metric and imperial cup standards.",
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
            equivalents. Choose the cup standard named by the recipe: US,
            US legal, metric or imperial.
          </p>
        </header>

        <KitchenMeasuresConverter locale="en" />

        <section className="category-article-content">
          <h2>Which cup does a recipe mean?</h2>
          <p>
            A cup is not one fixed international volume. This tool starts
            with the US customary cup used by most American recipes
            (236.588 ml). Use the selector when a recipe specifies a US
            legal cup (240 ml), a metric cup (250 ml), or an imperial cup
            (284.131 ml). The selected standard changes every cup result
            and its gram equivalent.
          </p>
          <p>
            Grams also depend on the ingredient. Flour, sugar and honey
            can occupy the same volume but have very different weights.
            Sifting, packing and brand can shift an ingredient by a few
            grams, so a kitchen scale remains the most reliable choice for
            precise baking.
          </p>

          <h2>Ingredient Measurement Table (1 US Cup = 236.588 ml)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>
                Approximate gram equivalents per US customary cup,
                tablespoon and teaspoon
              </caption>
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
                    <td>{gramsInDefaultEnglishCup(row.gramsPerBardak)} g</td>
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
            ml). A US customary cup is 236.588 ml, or roughly 15.8
            tablespoons.
          </p>
          <p>
            <strong>Is a cup 240 ml or 250 ml?</strong>
            <br />
            Both can be correct in context. US nutrition labels commonly
            use a 240 ml legal cup, while metric recipes commonly use a
            250 ml cup. Most American recipes use the 236.588 ml US
            customary cup. Select the standard that matches the recipe
            before scaling it.
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
            Cup volumes use their named measurement standards. Ingredient
            values are rounded practical averages; they are guides rather
            than laboratory measurements.
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
