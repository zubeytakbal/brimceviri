import type { Metadata } from "next";
import Link from "next/link";
import RecipeScalerConverter from "../../components/RecipeScalerConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Oppskriftomregner",
  description:
    "Lim inn oppskriften din, velg en multiplikator for a oke eller redusere den, og fa de nye mengdene direkte — enkelte ingredienser regnes ogsa automatisk om til gram.",
  alternates: {
    canonical: "/no/recipe-converter",
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
      no: "/no/recipe-converter",
      "x-default": "/tarif-cevirici",
    },
  },
  openGraph: {
    title: "Oppskriftomregner",
    description: "Lim inn oppskriften din og fa de nye mengdene direkte.",
    url: buildSiteUrl("/no/recipe-converter"),
    siteName: "BirimCeviri.app",
    locale: "nb_NO",
    type: "website",
  },
};

export default function NorwegianRecipeConverterPage() {
  return (
    <main className="all-conversions-page" lang="no">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sidenavigering">
          <Link href="/no">Hjem</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Oppskriftomregner</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Oppskriftomregner</h1>

          <p>
            Lim inn oppskriften din linje for linje, for eksempel: "2
            kopper mel". Etter at du har valgt multiplikatoren, beregner
            siden de nye mengdene direkte. Hvis ingrediensen gjenkjennes og
            er oppgitt i en enhet som kopp eller skje, vises ogsa en
            omtrentlig verdi i gram.
          </p>
        </header>

        <RecipeScalerConverter locale="no" />

        <section className="category-article-content">
          <h2>Hvordan oker eller reduserer man en oppskrift?</h2>
          <p>
            Prinsippet er enkelt: multipliser hver mengde med samme
            faktor. Hvis oppskriften er for 2 personer og du vil ha 4, er
            multiplikatoren 2. Dette verktoyet gjor dette automatisk for
            hver linje som starter med en lesbar mengde (heltall, brok
            eller desimaltall).
          </p>
          <p>
            Du kan ogsa oppgi antall opprinnelige porsjoner og antall
            onskede porsjoner: multiplikatoren beregnes da automatisk,
            uten at du trenger a regne for hand.
          </p>

          <h2>Hvorfor viser ikke alle linjer gram?</h2>
          <p>
            Omregningen til gram vises bare nar verktoyet gjenkjenner bade
            enheten og ingrediensens navn. En linje som "2 egg" skaleres
            korrekt, men viser ikke ekstra gram fordi egg ikke finnes i
            volumomregningslisten.
          </p>
          <p>
            For a se listen over stottede ingredienser, apne{" "}
            <Link href="/no/kitchen-measurement-converter">
              kjokkenmalomregneren
            </Link>
            .
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Relaterte verktoy</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/no/kitchen-measurement-converter">Kjokkenmal</Link>
            </li>
            <li>
              <Link href="/no/shoe-size-converter">Skostorrelseomregner</Link>
            </li>
            <li>
              <Link href="/no/historical-units">Historiske maleenheter</Link>
            </li>
          </ul>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Andre sprak</h2>
          <Link className="text-link" href="/tarif-cevirici" hrefLang="tr">
            Oppna den turkiska versionen
          </Link>
        </section>
      </div>
    </main>
  );
}
