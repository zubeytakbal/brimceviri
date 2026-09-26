import type { Metadata } from "next";
import Link from "next/link";
import ShoeSizeConverter from "../../components/ShoeSizeConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Convertisseur de pointures : FR, US, UK",
  description:
    "Convertissez les pointures françaises/européennes (FR/EU), américaines (US) et britanniques (UK) ; comparez aussi les tailles Nike, Adidas, Puma, New Balance et Converse.",
  alternates: {
    canonical: "/fr/convertisseur-de-pointures",
    languages: {
      tr: "/ayakkabi-numarasi-cevirme",
      en: "/en/shoe-size-converter",
      de: "/de/schuhgroessen-umrechner",
      bn: "/bn/shoe-size-converter",
      fr: "/fr/convertisseur-de-pointures",
      "x-default": "/ayakkabi-numarasi-cevirme",
    },
  },
  openGraph: {
    title: "Convertisseur de pointures : FR, US, UK",
    description: "Convertissez les pointures françaises/européennes, américaines et britanniques.",
    url: buildSiteUrl("/fr/convertisseur-de-pointures"),
    siteName: "BirimCeviri.app",
    locale: "fr_FR",
    type: "website",
  },
};

export default function FrenchShoeSizePage() {
  return (
    <main className="all-conversions-page" lang="fr">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Fil d'Ariane">
          <Link href="/fr">Accueil</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Convertisseur de pointures</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Convertisseur de pointures : FR, US, UK</h1>

          <p>
            Saisissez la pointure que vous connaissez pour voir
            instantanément les équivalences françaises/européennes (FR/EU),
            américaines (US) et britanniques (UK). Tableaux séparés pour
            homme, femme, bébé et grand enfant, avec comparaison des marques
            Nike, Adidas, Puma, New Balance et Converse.
          </p>
        </header>

        <ShoeSizeConverter locale="fr" />

        <section className="category-article-content">
          <h2>Pourquoi les pointures varient-elles selon la marque ?</h2>
          <p>
            Le système européen est relativement stable, mais les systèmes
            US et UK reposent sur des échelles différentes. De plus, chaque
            marque utilise ses propres moules de fabrication et son propre
            design de confort, ce qui fait qu’une même longueur de pied peut
            correspondre à une pointure différente, ou décalée d’une
            demi-pointure, selon la marque.
          </p>
          <p>
            Le résultat le plus fiable s’obtient généralement en mesurant la
            longueur du pied en centimètres, puis en choisissant l’option
            « Longueur du pied » dans l’outil. Cela réduit les erreurs liées
            aux différences de dénomination des tailles selon les marchés.
          </p>
          <p>
            Chez les enfants, la numérotation US recommence à zéro après
            13,5 ; les tableaux pour bébé/petit enfant et grand enfant sont
            donc séparés pour garder la comparaison claire.
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Outils liés</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/fr/convertisseur-mesures-cuisine">Convertisseur de mesures de cuisine</Link>
            </li>
            <li>
              <Link href="/fr/convertisseur-de-recettes">Convertisseur de recettes</Link>
            </li>
            <li>
              <Link href="/fr/unites-historiques">Unités de mesure historiques</Link>
            </li>
            <li>
              <Link href="/fr/categories/longueur">Conversion des unités de longueur</Link>
            </li>
          </ul>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Autres langues</h2>
          <Link
            className="text-link"
            href="/ayakkabi-numarasi-cevirme"
            hrefLang="tr"
          >
            Ouvrir la version turque
          </Link>
        </section>
      </div>
    </main>
  );
}
