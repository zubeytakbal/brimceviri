import type { Metadata } from "next";
import Link from "next/link";
import RecipeScalerConverter from "../../components/RecipeScalerConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Convertisseur de recettes",
  description:
    "Collez votre recette, choisissez un multiplicateur pour l'agrandir ou la reduire, et obtenez instantanement les nouvelles quantites -- certains ingredients sont aussi convertis automatiquement en grammes.",
  alternates: {
    canonical: "/fr/recipe-converter",
    languages: {
      tr: "/tarif-cevirici",
      en: "/en/recipe-converter",
      de: "/de/rezept-umrechner",
      bn: "/bn/recipe-converter",
      fr: "/fr/recipe-converter",
      "x-default": "/tarif-cevirici",
    },
  },
  openGraph: {
    title: "Convertisseur de recettes",
    description: "Collez votre recette et obtenez instantanement les nouvelles quantites.",
    url: buildSiteUrl("/fr/recipe-converter"),
    siteName: "BirimCeviri.app",
    locale: "fr_FR",
    type: "website",
  },
};

export default function FrenchRecipeConverterPage() {
  return (
    <main className="all-conversions-page" lang="fr">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Fil d'Ariane">
          <Link href="/fr">Accueil</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Convertisseur de recettes</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Convertisseur de recettes</h1>

          <p>
            Collez votre recette ligne par ligne, par exemple :
            "2 tasses de farine". Une fois le multiplicateur choisi, le
            site calcule instantanement les nouvelles quantites. Si
            l'ingredient est reconnu et exprime dans une unite comme la
            tasse ou la cuillere, une valeur approximative en grammes
            s'affiche aussi.
          </p>
        </header>

        <RecipeScalerConverter locale="fr" />

        <section className="category-article-content">
          <h2>Comment agrandir ou reduire une recette ?</h2>
          <p>
            Le principe est simple : multiplier chaque quantite par le
            meme facteur. Si la recette est prevue pour 2 personnes et que
            vous en voulez 4, le multiplicateur est 2. Cet outil le fait
            automatiquement pour chaque ligne commencant par une quantite
            lisible (nombre entier, fraction ou decimal).
          </p>
          <p>
            Vous pouvez aussi indiquer le nombre de portions d'origine et
            le nombre de portions souhaite : le multiplicateur sera alors
            calcule automatiquement, sans calcul manuel.
          </p>

          <h2>Pourquoi certaines lignes n'affichent-elles pas de grammes ?</h2>
          <p>
            La conversion en grammes n'apparait que lorsque l'outil
            reconnait a la fois l'unite et le nom de l'ingredient. Une ligne
            comme "2 oeufs" sera correctement mise a l'echelle, mais
            n'affichera pas de grammes supplementaires car l'oeuf ne figure
            pas dans la liste de conversion par volume.
          </p>
          <p>
            Pour voir la liste des ingredients pris en charge, ouvrez le{" "}
            <Link href="/fr/kitchen-measurement-converter">
              convertisseur de mesures de cuisine
            </Link>
            .
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Outils lies</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/fr/kitchen-measurement-converter">Convertisseur de mesures de cuisine</Link>
            </li>
            <li>
              <Link href="/fr/shoe-size-converter">Convertisseur de pointures de chaussures</Link>
            </li>
            <li>
              <Link href="/fr/historical-units">Unites de mesure historiques</Link>
            </li>
          </ul>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Autres langues</h2>
          <Link className="text-link" href="/tarif-cevirici" hrefLang="tr">
            Türkçe versiyonu aç
          </Link>
        </section>
      </div>
    </main>
  );
}
