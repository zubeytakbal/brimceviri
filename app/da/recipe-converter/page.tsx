import type { Metadata } from "next";
import Link from "next/link";
import RecipeScalerConverter from "../../components/RecipeScalerConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Opskriftomregner",
  description:
    "Indsaet din opskrift, vaelg en multiplikator for at oege eller reducere den, og fa de nye maengder direkte — visse ingredienser omregnes ogsa automatisk til gram.",
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
    description: "Indsaet din opskrift og fa de nye maengder direkte.",
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
            Indsaet din opskrift linje for linje, for eksempel: "2 kopper
            mel". Efter at du har valgt multiplikatoren, beregner siden de
            nye maengder direkte. Hvis ingrediensen genkendes og er
            angivet i en enhed som kop eller ske, vises ogsa en omtrentlig
            vaerdi i gram.
          </p>
        </header>

        <RecipeScalerConverter locale="da" />

        <section className="category-article-content">
          <h2>Hvordan oeger eller reducerer man en opskrift?</h2>
          <p>
            Princippet er enkelt: multiplicer hver maengde med samme
            faktor. Hvis opskriften er til 2 personer, og du vil have 4,
            er multiplikatoren 2. Dette vaerktoj gor dette automatisk for
            hver linje, der starter med en laesbar maengde (heltal, brok
            eller decimaltal).
          </p>
          <p>
            Du kan ogsa angive antallet af oprindelige portioner og
            antallet af onskede portioner: multiplikatoren beregnes da
            automatisk, uden at du skal regne i handen.
          </p>

          <h2>Hvorfor viser ikke alle linjer gram?</h2>
          <p>
            Omregningen til gram vises kun, nar vaerktojet genkender bade
            enheden og ingrediensens navn. En linje som "2 aeg" skaleres
            korrekt, men viser ikke ekstra gram, fordi aeg ikke findes i
            rumfangsomregningslisten.
          </p>
          <p>
            For at se listen over understottede ingredienser, abn{" "}
            <Link href="/da/kitchen-measurement-converter">
              kokkenmalomregneren
            </Link>
            .
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Relaterede vaerktojer</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/da/kitchen-measurement-converter">Kokkenmal</Link>
            </li>
            <li>
              <Link href="/da/shoe-size-converter">Skostorrelseomregner</Link>
            </li>
            <li>
              <Link href="/da/historical-units">Historiske maleenheder</Link>
            </li>
          </ul>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Andre sprog</h2>
          <Link className="text-link" href="/tarif-cevirici" hrefLang="tr">
            Abn den tyrkiske version
          </Link>
        </section>
      </div>
    </main>
  );
}
