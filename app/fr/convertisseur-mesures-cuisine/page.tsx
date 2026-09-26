import type { Metadata } from "next";
import Link from "next/link";
import KitchenMeasuresConverter from "../../components/KitchenMeasuresConverter";
import { kitchenIngredientLabels } from "../../converter/kitchenIngredientLabels";
import { kitchenIngredientRows } from "../../converter/kitchenMeasures";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Convertisseur Tasses en Grammes (mesures de cuisine)",
  description:
    "Convertissez tasses, cuillères, grammes et millilitres pour plus de 40 ingrédients : farine, sucre, riz, miel, beurre et bien plus.",
  alternates: {
    canonical: "/fr/convertisseur-mesures-cuisine",
    languages: {
      tr: "/mutfak-olculeri-cevirici",
      en: "/en/kitchen-measurement-converter",
      de: "/de/kuechenmass-umrechner",
      bn: "/bn/kitchen-measurement-converter",
      fr: "/fr/convertisseur-mesures-cuisine",
      "x-default": "/mutfak-olculeri-cevirici",
    },
  },
  openGraph: {
    title: "Convertisseur Tasses en Grammes (mesures de cuisine)",
    description: "Convertissez tasses, cuillères, grammes et millilitres pour plus de 40 ingrédients.",
    url: buildSiteUrl("/fr/convertisseur-mesures-cuisine"),
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
            Choisissez l’ingrédient et l’unité que vous connaissez pour voir
            immédiatement l’équivalence en tasses, cuillères à soupe,
            cuillères à café, grammes, millilitres et litres. Chaque
            ingrédient a une densité différente, le calcul utilise donc des
            valeurs spécifiques pour la farine, le sucre, le riz, le miel,
            le beurre et bien d’autres.
          </p>
        </header>

        <KitchenMeasuresConverter locale="fr" />

        <section className="category-article-content">
          <h2>Combien de grammes dans une tasse de farine ou une cuillère de sucre ?</h2>
          <p>
            Il n’existe pas de règle unique valable pour tous les
            ingrédients, car la tasse mesure un volume tandis que le gramme
            mesure une masse. Une tasse de farine est plus légère qu’une
            tasse de sucre, et le miel est plus lourd que les deux — la
            conversion varie donc selon la densité de l’ingrédient.
          </p>
          <p>
            Les valeurs indiquées ici sont des moyennes pratiques adaptées à
            la cuisine quotidienne. Le poids final peut varier légèrement
            selon le tassement ou la variété du produit, mais le résultat
            reste suffisamment fiable pour un usage domestique.
          </p>

          <h2>Liste des ingrédients courants (1 tasse = 250 ml)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Grammes approximatifs par tasse, cuillère à soupe et cuillère à café</caption>
              <thead>
                <tr>
                  <th scope="col">Ingrédient</th>
                  <th scope="col">1 tasse</th>
                  <th scope="col">1 cuillère à soupe</th>
                  <th scope="col">1 cuillère à café</th>
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

          <h2>Questions fréquentes</h2>
          <p>
            <strong>Combien de millilitres dans une cuillère à soupe ?</strong>
            <br />
            Une cuillère à soupe équivaut à 15 millilitres, soit 3
            cuillères à café. La tasse utilisée ici correspond à 250
            millilitres (tasse métrique).
          </p>
          <p>
            <strong>Pourquoi le poids d’une tasse varie-t-il selon l’ingrédient ?</strong>
            <br />
            Parce que le volume reste constant mais la densité varie. Un
            ingrédient léger comme la farine pèse moins qu’un ingrédient
            dense comme le miel pour le même volume.
          </p>
          <p>
            Pour adapter une recette entière, essayez le{" "}
            <Link href="/fr/convertisseur-de-recettes">convertisseur de recettes</Link>.
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Outils liés</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/fr/convertisseur-de-recettes">Convertisseur de recettes</Link>
            </li>
            <li>
              <Link href="/fr/convertisseur-de-pointures">Convertisseur de pointures de chaussures</Link>
            </li>
            <li>
              <Link href="/fr/unites-historiques">Unités de mesure historiques</Link>
            </li>
            <li>
              <Link href="/fr/categories/masse">Conversion des unités de masse</Link>
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
            Ouvrir la version turque
          </Link>
        </section>
      </div>
    </main>
  );
}
