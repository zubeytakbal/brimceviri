import type { Metadata } from "next";
import Link from "next/link";
import RecipeScalerConverter from "../../components/RecipeScalerConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Convertisseur de recettes",
  description:
    "Collez votre recette, choisissez un multiplicateur pour l'agrandir ou la réduire, et obtenez instantanément les nouvelles quantités — certains ingrédients sont aussi convertis automatiquement en grammes.",
  alternates: {
    canonical: "/fr/convertisseur-de-recettes",
    languages: {
      tr: "/tarif-cevirici",
      en: "/en/recipe-converter",
      de: "/de/rezept-umrechner",
      bn: "/bn/recipe-converter",
      fr: "/fr/convertisseur-de-recettes",
      "x-default": "/tarif-cevirici",
    },
  },
  openGraph: {
    title: "Convertisseur de recettes",
    description: "Collez votre recette et obtenez instantanément les nouvelles quantités.",
    url: buildSiteUrl("/fr/convertisseur-de-recettes"),
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
            « 2 tasses de farine ». Une fois le multiplicateur choisi, le
            site calcule instantanément les nouvelles quantités. Si
            l’ingrédient est reconnu et exprimé dans une unité comme la
            tasse ou la cuillère, une valeur approximative en grammes
            s’affiche aussi.
          </p>
        </header>

        <RecipeScalerConverter locale="fr" />

        <section className="category-article-content">
          <h2>Comment agrandir ou réduire une recette ?</h2>
          <p>
            Le principe est simple : multiplier chaque quantité par le
            même facteur. Si la recette est prévue pour 2 personnes et que
            vous en voulez 4, le multiplicateur est 2. Cet outil le fait
            automatiquement pour chaque ligne commençant par une quantité
            lisible (nombre entier, fraction ou décimal).
          </p>
          <p>
            Vous pouvez aussi indiquer le nombre de portions d’origine et
            le nombre de portions souhaité : le multiplicateur sera alors
            calculé automatiquement, sans calcul manuel.
          </p>

          <h2>Pourquoi certaines lignes n’affichent-elles pas de grammes ?</h2>
          <p>
            La conversion en grammes n’apparaît que lorsque l’outil
            reconnaît à la fois l’unité et le nom de l’ingrédient. Une ligne
            comme « 2 œufs » sera correctement mise à l’échelle, mais
            n’affichera pas de grammes supplémentaires car l’œuf ne figure
            pas dans la liste de conversion par volume.
          </p>
          <p>
            Pour voir la liste des ingredients pris en charge, ouvrez le{" "}
            <Link href="/fr/convertisseur-mesures-cuisine">
              convertisseur de mesures de cuisine
            </Link>
            .
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Outils liés</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/fr/convertisseur-mesures-cuisine">Convertisseur de mesures de cuisine</Link>
            </li>
            <li>
              <Link href="/fr/convertisseur-de-pointures">Convertisseur de pointures de chaussures</Link>
            </li>
            <li>
              <Link href="/fr/unites-historiques">Unités de mesure historiques</Link>
            </li>
          </ul>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Autres langues</h2>
          <Link className="text-link" href="/tarif-cevirici" hrefLang="tr">
            Ouvrir la version turque
          </Link>
        </section>
      </div>
    </main>
  );
}
