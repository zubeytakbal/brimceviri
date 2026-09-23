import type { Metadata } from "next";
import Link from "next/link";
import RecipeScalerConverter from "../../components/RecipeScalerConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Receptomvandlare",
  description:
    "Klistra in ditt recept, valj en multiplikator for att oka eller minska det, och fa direkt de nya mangderna — vissa ingredienser omvandlas ocksa automatiskt till gram.",
  alternates: {
    canonical: "/sv/recipe-converter",
    languages: {
      tr: "/tarif-cevirici",
      en: "/en/recipe-converter",
      de: "/de/rezept-umrechner",
      bn: "/bn/recipe-converter",
      fr: "/fr/recipe-converter",
      es: "/es/recipe-converter",
      "es-419": "/es-419/recipe-converter",
      pt: "/pt/recipe-converter",
      it: "/it/recipe-converter",
      nl: "/nl/recipe-converter",
      sv: "/sv/recipe-converter",
      "x-default": "/tarif-cevirici",
    },
  },
  openGraph: {
    title: "Receptomvandlare",
    description: "Klistra in ditt recept och fa direkt de nya mangderna.",
    url: buildSiteUrl("/sv/recipe-converter"),
    siteName: "BirimCeviri.app",
    locale: "sv_SE",
    type: "website",
  },
};

export default function SwedishRecipeConverterPage() {
  return (
    <main className="all-conversions-page" lang="sv">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sidnavigering">
          <Link href="/sv">Hem</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Receptomvandlare</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Receptomvandlare</h1>

          <p>
            Klistra in ditt recept rad for rad, till exempel: "2 koppar
            mjol". Efter att du valt multiplikatorn beraknar sidan direkt de
            nya mangderna. Om ingrediensen kanns igen och anges i en enhet
            som kopp eller sked visas aven ett ungefarligt varde i gram.
          </p>
        </header>

        <RecipeScalerConverter locale="sv" />

        <section className="category-article-content">
          <h2>Hur okar eller minskar man ett recept?</h2>
          <p>
            Principen ar enkel: multiplicera varje mangd med samma faktor.
            Om receptet ar for 2 personer och du vill ha 4, ar
            multiplikatorn 2. Detta verktyg gor detta automatiskt for varje
            rad som borjar med en lasbar mangd (heltal, brak eller decimal).
          </p>
          <p>
            Du kan ocksa ange antalet ursprungliga portioner och antalet
            onskade portioner: multiplikatorn beraknas da automatiskt, utan
            att du behover rakna for hand.
          </p>

          <h2>Varfor visar inte alla rader gram?</h2>
          <p>
            Omvandlingen till gram visas bara nar verktyget kanner igen
            bade enheten och ingrediensens namn. En rad som "2 agg" skalas
            korrekt, men visar inte extra gram eftersom agg inte finns i
            volymomvandlingslistan.
          </p>
          <p>
            For att se listan over ingredienser som stods, oppna{" "}
            <Link href="/sv/kitchen-measurement-converter">
              kokmattskonverteraren
            </Link>
            .
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Relaterade verktyg</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/sv/kitchen-measurement-converter">Kokmatt</Link>
            </li>
            <li>
              <Link href="/sv/shoe-size-converter">Skostorlekskonverterare</Link>
            </li>
            <li>
              <Link href="/sv/historical-units">Historiska matenheter</Link>
            </li>
          </ul>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Andra sprak</h2>
          <Link className="text-link" href="/tarif-cevirici" hrefLang="tr">
            Oppna den turkiska versionen
          </Link>
        </section>
      </div>
    </main>
  );
}
