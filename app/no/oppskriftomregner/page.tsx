import type { Metadata } from "next";
import Link from "next/link";
import RecipeScalerConverter from "../../components/RecipeScalerConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Oppskriftomregner",
  description:
    "Lim inn oppskriften din, velg en multiplikator for å øke eller redusere den, og få de nye mengdene direkte — enkelte ingredienser regnes også automatisk om til gram.",
  alternates: {
    canonical: "/no/oppskriftomregner",
    languages: {
      tr: "/tarif-cevirici",
      en: "/en/recipe-converter",
      de: "/de/rezept-umrechner",
      bn: "/bn/recipe-converter",
      fr: "/fr/convertisseur-de-recettes",
      es: "/es/conversor-de-recetas",
      "es-419": "/es-419/conversor-de-recetas",
      pt: "/pt/conversor-de-receitas",
      it: "/it/convertitore-ricette",
      nl: "/nl/recepten-omrekenen",
      sv: "/sv/receptomvandlare",
      no: "/no/oppskriftomregner",
      "x-default": "/tarif-cevirici",
    },
  },
  openGraph: {
    title: "Oppskriftomregner",
    description: "Lim inn oppskriften din og få de nye mengdene direkte.",
    url: buildSiteUrl("/no/oppskriftomregner"),
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
            er oppgitt i en enhet som kopp eller skje, vises også en
            omtrentlig verdi i gram.
          </p>
        </header>

        <RecipeScalerConverter locale="no" />

        <section className="category-article-content">
          <h2>Hvordan øker eller reduserer man en oppskrift?</h2>
          <p>
            Prinsippet er enkelt: multipliser hver mengde med samme
            faktor. Hvis oppskriften er for 2 personer og du vil ha 4, er
            multiplikatoren 2. Dette verktøyet gjør dette automatisk for
            hver linje som starter med en lesbar mengde (heltall, brøk
            eller desimaltall).
          </p>
          <p>
            Du kan også oppgi antall opprinnelige porsjoner og antall
            ønskede porsjoner: multiplikatoren beregnes da automatisk,
            uten at du trenger å regne for hånd.
          </p>

          <h2>Hvorfor viser ikke alle linjer gram?</h2>
          <p>
            Omregningen til gram vises bare når verktøyet gjenkjenner både
            enheten og ingrediensens navn. En linje som "2 egg" skaleres
            korrekt, men viser ikke ekstra gram fordi egg ikke finnes i
            volumomregningslisten.
          </p>
          <p>
            For å se listen over støttede ingredienser, åpne{" "}
            <Link href="/no/kjokkenmal-omregner">
              kjøkkenmålomregneren
            </Link>
            .
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Relaterte verktøy</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/no/kjokkenmal-omregner">Kjøkkenmål</Link>
            </li>
            <li>
              <Link href="/no/skostorrelser">Skostørrelseomregner</Link>
            </li>
            <li>
              <Link href="/no/historiske-enheter">Historiske måleenheter</Link>
            </li>
          </ul>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Andre språk</h2>
          <Link className="text-link" href="/tarif-cevirici" hrefLang="tr">
            Oppnå den turkiska versionen
          </Link>
        </section>
      </div>
    </main>
  );
}
