import type { Metadata } from "next";
import Link from "next/link";
import ShoeSizeConverter from "../../components/ShoeSizeConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Convertisseur de pointures de chaussures",
  description:
    "Convertissez les pointures europeennes (EU), americaines (US) et britanniques (UK) ; comparez aussi les tailles Nike, Adidas, Puma, New Balance et Converse.",
  alternates: {
    canonical: "/fr/shoe-size-converter",
    languages: {
      tr: "/ayakkabi-numarasi-cevirme",
      en: "/en/shoe-size-converter",
      de: "/de/schuhgroessen-umrechner",
      bn: "/bn/shoe-size-converter",
      fr: "/fr/shoe-size-converter",
      "x-default": "/ayakkabi-numarasi-cevirme",
    },
  },
  openGraph: {
    title: "Convertisseur de pointures de chaussures",
    description: "Convertissez les pointures europeennes, americaines et britanniques.",
    url: buildSiteUrl("/fr/shoe-size-converter"),
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
          <span>Convertisseur de pointures de chaussures</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Convertisseur de pointures de chaussures</h1>

          <p>
            Saisissez la pointure que vous connaissez pour voir
            instantanement les equivalences europeennes (EU), americaines
            (US) et britanniques (UK). Tableaux separes pour homme, femme,
            bebe et grand enfant, avec comparaison des marques Nike, Adidas,
            Puma, New Balance et Converse.
          </p>
        </header>

        <ShoeSizeConverter locale="fr" />

        <section className="category-article-content">
          <h2>Pourquoi les pointures varient-elles selon la marque ?</h2>
          <p>
            Le systeme europeen est relativement stable, mais les systemes
            US et UK reposent sur des echelles differentes. De plus, chaque
            marque utilise ses propres moules de fabrication et son propre
            design de confort, ce qui fait qu'une meme longueur de pied peut
            correspondre a une pointure differente, ou decalee d'une
            demi-pointure, selon la marque.
          </p>
          <p>
            Le resultat le plus fiable s'obtient generalement en mesurant la
            longueur du pied en centimetres, puis en choisissant l'option
            "Longueur du pied" dans l'outil. Cela reduit les erreurs liees
            aux differences de denomination des tailles selon les marches.
          </p>
          <p>
            Chez les enfants, la numerotation US recommence a zero apres
            13,5 ; les tableaux pour bebe/petit enfant et grand enfant sont
            donc separes pour garder la comparaison claire.
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Outils lies</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/fr/kitchen-measurement-converter">Convertisseur de mesures de cuisine</Link>
            </li>
            <li>
              <Link href="/fr/recipe-converter">Convertisseur de recettes</Link>
            </li>
            <li>
              <Link href="/fr/historical-units">Unites de mesure historiques</Link>
            </li>
            <li>
              <Link href="/fr/categories/longueur">Conversion des unites de longueur</Link>
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
            Türkçe versiyonu aç
          </Link>
        </section>
      </div>
    </main>
  );
}
