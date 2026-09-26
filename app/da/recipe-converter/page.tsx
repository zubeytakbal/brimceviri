import type { Metadata } from "next";
import Link from "next/link";
import RecipeScalerConverter from "../../components/RecipeScalerConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Opskriftomregner",
  description:
    "Indsæt din opskrift, vælg en multiplikator for at øge eller reducere den, og få de nye mængder direkte — visse ingredienser omregnes også automatisk til gram.",
  alternates: {
    canonical: "/da/recipe-converter",
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
      da: "/da/recipe-converter",
      "x-default": "/tarif-cevirici",
    },
  },
  openGraph: {
    title: "Opskriftomregner",
    description: "Indsæt din opskrift og få de nye mængder direkte.",
    url: buildSiteUrl("/da/recipe-converter"),
    siteName: "BirimCeviri.app",
    locale: "da_DK",
    type: "website",
  },
};

export default function DanishRecipeConverterPage() {
  return (
    <main className="all-conversions-page" lang="da">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sidenavigation">
          <Link href="/da">Hjem</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Opskriftomregner</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Opskriftomregner</h1>

          <p>
            Indsæt din opskrift linje for linje, for eksempel: "2 kopper
            mel". Efter at du har valgt multiplikatoren, beregner siden de
            nye mængder direkte. Hvis ingrediensen genkendes og er
            angivet i en enhed som kop eller ske, vises også en omtrentlig
            værdi i gram.
          </p>
        </header>

        <RecipeScalerConverter locale="da" />

        <section className="category-article-content">
          <h2>Hvordan øger eller reducerer man en opskrift?</h2>
          <p>
            Princippet er enkelt: multiplicer hver mængde med samme
            faktor. Hvis opskriften er til 2 personer, og du vil have 4,
            er multiplikatoren 2. Dette værktøj gør dette automatisk for
            hver linje, der starter med en læsbar mængde (heltal, brøk
            eller decimaltal).
          </p>
          <p>
            Du kan også angive antallet af oprindelige portioner og
            antallet af ønskede portioner: multiplikatoren beregnes da
            automatisk, uden at du skal regne i hånden.
          </p>

          <h2>Hvorfor viser ikke alle linjer gram?</h2>
          <p>
            Omregningen til gram vises kun, når værktøjet genkender både
            enheden og ingrediensens navn. En linje som "2 æg" skaleres
            korrekt, men viser ikke ekstra gram, fordi æg ikke findes i
            rumfangsomregningslisten.
          </p>
          <p>
            For at se listen over understøttede ingredienser, åbn{" "}
            <Link href="/da/kitchen-measurement-converter">
              køkkenmålomregneren
            </Link>
            .
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Relaterede værktøjer</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/da/kitchen-measurement-converter">Køkkenmål</Link>
            </li>
            <li>
              <Link href="/da/shoe-size-converter">Skostørrelseomregner</Link>
            </li>
            <li>
              <Link href="/da/historical-units">Historiske måleenheder</Link>
            </li>
          </ul>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Andre sprog</h2>
          <Link className="text-link" href="/tarif-cevirici" hrefLang="tr">
            Åbn den tyrkiske version
          </Link>
        </section>
      </div>
    </main>
  );
}
