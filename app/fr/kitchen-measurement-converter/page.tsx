import type { Metadata } from "next";
import Link from "next/link";
import KitchenMeasuresConverter from "../../components/KitchenMeasuresConverter";
import { kitchenIngredientLabels } from "../../converter/kitchenIngredientLabels";
import { kitchenIngredientRows } from "../../converter/kitchenMeasures";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Convertisseur Tasses en Grammes (mesures de cuisine)",
  description:
    "Convertissez tasses, cuilleres, grammes et millilitres pour plus de 40 ingredients : farine, sucre, riz, miel, beurre et bien plus.",
  alternates: {
    canonical: "/fr/kitchen-measurement-converter",
    languages: {
      tr: "/mutfak-olculeri-cevirici",
      en: "/en/kitchen-measurement-converter",
      de: "/de/kuechenmass-umrechner",
      bn: "/bn/kitchen-measurement-converter",
      fr: "/fr/kitchen-measurement-converter",
      "x-default": "/mutfak-olculeri-cevirici",
    },
  },
  openGraph: {
    title: "Convertisseur Tasses en Grammes (mesures de cuisine)",
    description: "Convertissez tasses, cuilleres, grammes et millilitres pour plus de 40 ingredients.",
    url: buildSiteUrl("/fr/kitchen-measurement-converter"),
    siteName: "BirimCeviri.app",
    locale: "fr_FR",
    type: "website",
  },
};

export default function FrenchKitchenMeasurementsPage() {
  return (
    <main className="all-conversions-page" lang="fr">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Fil d'Ariane">
          <Link href="/fr">Accueil</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Convertisseur de mesures de cuisine</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Convertisseur de mesures de cuisine</h1>

          <p>
            Choisissez l'ingredient et l'unite que vous connaissez pour voir
            immediatement l'equivalence en tasses, cuilleres a soupe,
            cuilleres a cafe, grammes, millilitres et litres. Chaque
            ingredient a une densite differente, le calcul utilise donc des
            valeurs specifiques pour la farine, le sucre, le riz, le miel,
            le beurre et bien d'autres.
          </p>
        </header>

        <KitchenMeasuresConverter locale="fr" />

        <section className="category-article-content">
          <h2>Combien de grammes dans une tasse de farine ou une cuillere de sucre ?</h2>
          <p>
            Il n'existe pas de regle unique valable pour tous les
            ingredients, car la tasse mesure un volume tandis que le gramme
            mesure une masse. Une tasse de farine est plus legere qu'une
            tasse de sucre, et le miel est plus lourd que les deux -- la
            conversion varie donc selon la densite de l'ingredient.
          </p>
          <p>
            Les valeurs indiquees ici sont des moyennes pratiques adaptees a
            la cuisine quotidienne. Le poids final peut varier legerement
            selon le tassement ou la variete du produit, mais le resultat
            reste suffisamment fiable pour un usage domestique.
          </p>

          <h2>Liste des ingredients courants (1 tasse = 250 ml)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Grammes approximatifs par tasse, cuillere a soupe et cuillere a cafe</caption>
              <thead>
                <tr>
                  <th scope="col">Ingredient</th>
                  <th scope="col">1 tasse</th>
                  <th scope="col">1 cuillere a soupe</th>
                  <th scope="col">1 cuillere a cafe</th>
                </tr>
              </thead>
              <tbody>
                {kitchenIngredientRows.map((row) => (
                  <tr key={row.key}>
                    <td>{kitchenIngredientLabels.fr[row.key]}</td>
                    <td>{Math.round((row.gramsPerBardak * 250) / 200)} g</td>
                    <td>{Math.round((row.gramsPerBardak * 250 * 15) / (200 * 200))} g</td>
                    <td>{Math.round((row.gramsPerBardak * 250 * 5) / (200 * 200))} g</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Questions frequentes</h2>
          <p>
            <strong>Combien de millilitres dans une cuillere a soupe ?</strong>
            <br />
            Une cuillere a soupe equivaut a 15 millilitres, soit 3
            cuilleres a cafe. La tasse utilisee ici correspond a 250
            millilitres (tasse metrique).
          </p>
          <p>
            <strong>Pourquoi le poids d'une tasse varie-t-il selon l'ingredient ?</strong>
            <br />
            Parce que le volume reste constant mais la densite varie. Un
            ingredient leger comme la farine pese moins qu'un ingredient
            dense comme le miel pour le meme volume.
          </p>
          <p>
            Pour adapter une recette entiere, essayez le{" "}
            <Link href="/fr/recipe-converter">convertisseur de recettes</Link>.
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Outils lies</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/fr/recipe-converter">Convertisseur de recettes</Link>
            </li>
            <li>
              <Link href="/fr/shoe-size-converter">Convertisseur de pointures de chaussures</Link>
            </li>
            <li>
              <Link href="/fr/historical-units">Unites de mesure historiques</Link>
            </li>
            <li>
              <Link href="/fr/categories/masse">Conversion des unites de masse</Link>
            </li>
          </ul>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Autres langues</h2>
          <Link
            className="text-link"
            href="/mutfak-olculeri-cevirici"
            hrefLang="tr"
          >
            Türkçe versiyonu aç
          </Link>
        </section>
      </div>
    </main>
  );
}
