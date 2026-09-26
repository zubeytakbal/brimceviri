import type { Metadata } from "next";
import Link from "next/link";
import KitchenMeasuresConverter from "../../components/KitchenMeasuresConverter";
import { kitchenIngredientLabels } from "../../converter/kitchenIngredientLabels";
import { kitchenIngredientRows } from "../../converter/kitchenMeasures";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Kjøkkenmålomregner (kopper til gram)",
  description:
    "Regn om kopper, spiseskjeer, gram og milliliter for over 40 ingredienser: mel, sukker, ris, honning, smør og mye mer.",
  alternates: {
    canonical: "/no/kitchen-measurement-converter",
    languages: {
      tr: "/mutfak-olculeri-cevirici",
      en: "/en/kitchen-measurement-converter",
      de: "/de/kuechenmass-umrechner",
      bn: "/bn/kitchen-measurement-converter",
      fr: "/fr/kitchen-measurement-converter",
      es: "/es/kitchen-measurement-converter",
      "es-419": "/es-419/kitchen-measurement-converter",
      pt: "/pt/kitchen-measurement-converter",
      it: "/it/kitchen-measurement-converter",
      nl: "/nl/kitchen-measurement-converter",
      sv: "/sv/kitchen-measurement-converter",
      no: "/no/kitchen-measurement-converter",
      "x-default": "/mutfak-olculeri-cevirici",
    },
  },
  openGraph: {
    title: "Kjøkkenmålomregner (kopper til gram)",
    description: "Regn om kopper, spiseskjeer, gram og milliliter for over 40 ingredienser.",
    url: buildSiteUrl("/no/kitchen-measurement-converter"),
    siteName: "BirimCeviri.app",
    locale: "nb_NO",
    type: "website",
  },
};

export default function NorwegianKitchenMeasurementsPage() {
  return (
    <main className="all-conversions-page" lang="no">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sidenavigering">
          <Link href="/no">Hjem</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Kjøkkenmålomregner</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Kjøkkenmålomregner</h1>

          <p>
            Velg ingrediensen og enheten du kjenner til for å se
            tilsvarende verdi i kopper, spiseskjeer, teskjeer, gram,
            milliliter og liter direkte. Hver ingrediens har ulik tetthet,
            så beregningen bruker spesifikke verdier for mel, sukker, ris,
            honning, smør og mange andre.
          </p>
        </header>

        <KitchenMeasuresConverter locale="no" />

        <section className="category-article-content">
          <h2>Hvor mange gram er en kopp mel eller en spiseskje sukker?</h2>
          <p>
            Det finnes ingen enkeltregel som gjelder for alle ingredienser,
            fordi koppen måler et volum mens grammet måler en masse. En
            kopp mel er lettere enn en kopp sukker, og honning er tyngre
            enn begge -- derfor varierer omregningen avhengig av
            ingrediensens tetthet.
          </p>
          <p>
            Verdiene som er oppgitt her, er praktiske gjennomsnitt tilpasset
            hverdagslig matlaging. Den endelige vekten kan variere noe
            avhengig av hvor pakket ingrediensen er eller produktvarianten,
            men resultatet er likevel pålitelig nok for husholdningsbruk.
          </p>

          <h2>Liste over vanlige ingredienser (1 kopp = 250 ml)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Omtrentlig antall gram per kopp, spiseskje og teskje</caption>
              <thead>
                <tr>
                  <th scope="col">Ingrediens</th>
                  <th scope="col">1 kopp</th>
                  <th scope="col">1 spiseskje</th>
                  <th scope="col">1 teskje</th>
                </tr>
              </thead>
              <tbody>
                {kitchenIngredientRows.map((row) => (
                  <tr key={row.key}>
                    <td>{kitchenIngredientLabels.no[row.key]}</td>
                    <td>{Math.round((row.gramsPerBardak * 250) / 200)} g</td>
                    <td>{Math.round((row.gramsPerBardak * 250 * 15) / (200 * 200))} g</td>
                    <td>{Math.round((row.gramsPerBardak * 250 * 5) / (200 * 200))} g</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Vanlige spørsmål</h2>
          <p>
            <strong>Hvor mange milliliter er en spiseskje?</strong>
            <br />
            En spiseskje tilsvarer 15 milliliter, altså 3 teskjeer. Koppen
            som brukes her, tilsvarer 250 milliliter (den metriske
            standardkoppen som brukes i norske oppskrifter).
          </p>
          <p>
            <strong>Hvorfor varierer vekten til en kopp avhengig av ingrediens?</strong>
            <br />
            Fordi volumet forblir konstant, men tettheten varierer. En lett
            ingrediens som mel veier mindre enn en tett ingrediens som
            honning ved samme volum.
          </p>
          <p>
            For å skalere en hel rett, prøv{" "}
            <Link href="/no/recipe-converter">oppskriftomregneren</Link>.
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Relaterte verktøy</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/no/recipe-converter">Oppskriftomregner</Link>
            </li>
            <li>
              <Link href="/no/shoe-size-converter">Skostørrelseomregner</Link>
            </li>
            <li>
              <Link href="/no/historical-units">Historiske måleenheter</Link>
            </li>
            <li>
              <Link href="/no/categories/masse">Omregning av masseenheter</Link>
            </li>
          </ul>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Andre språk</h2>
          <Link
            className="text-link"
            href="/mutfak-olculeri-cevirici"
            hrefLang="tr"
          >
            Oppnå den turkiska versionen
          </Link>
        </section>
      </div>
    </main>
  );
}
