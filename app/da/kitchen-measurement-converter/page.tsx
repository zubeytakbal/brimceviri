import type { Metadata } from "next";
import Link from "next/link";
import KitchenMeasuresConverter from "../../components/KitchenMeasuresConverter";
import { kitchenIngredientLabels } from "../../converter/kitchenIngredientLabels";
import { kitchenIngredientRows } from "../../converter/kitchenMeasures";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Køkkenmålomregner (kopper til gram)",
  description:
    "Omregn kopper, spiseskeer, gram og milliliter for over 40 ingredienser: mel, sukker, ris, honning, smør og meget mere.",
  alternates: {
    canonical: "/da/kitchen-measurement-converter",
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
      da: "/da/kitchen-measurement-converter",
      "x-default": "/mutfak-olculeri-cevirici",
    },
  },
  openGraph: {
    title: "Køkkenmålomregner (kopper til gram)",
    description: "Omregn kopper, spiseskeer, gram og milliliter for over 40 ingredienser.",
    url: buildSiteUrl("/da/kitchen-measurement-converter"),
    siteName: "BirimCeviri.app",
    locale: "da_DK",
    type: "website",
  },
};

export default function DanishKitchenMeasurementsPage() {
  return (
    <main className="all-conversions-page" lang="da">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sidenavigation">
          <Link href="/da">Hjem</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Køkkenmålomregner</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Køkkenmålomregner</h1>

          <p>
            Vælg ingrediensen og enheden, du kender, for at se den
            tilsvarende værdi i kopper, spiseskeer, teskeer, gram,
            milliliter og liter direkte. Hver ingrediens har forskellig
            tæthed, så beregningen bruger specifikke værdier for mel,
            sukker, ris, honning, smør og mange andre.
          </p>
        </header>

        <KitchenMeasuresConverter locale="da" />

        <section className="category-article-content">
          <h2>Hvor mange gram er en kop mel eller en spiseske sukker?</h2>
          <p>
            Der findes ingen enkelt regel, der gælder for alle
            ingredienser, fordi koppen måler et rumfang, mens grammet måler
            en masse. En kop mel er lettere end en kop sukker, og honning
            er tungere end begge -- derfor varierer omregningen afhængigt
            af ingrediensens tæthed.
          </p>
          <p>
            Værdierne angivet her er praktiske gennemsnit tilpasset
            hverdagsagtig madlavning. Den endelige vægt kan variere lidt
            afhængigt af, hvor pakket ingrediensen er, eller
            produktvarianten, men resultatet er alligevel pålideligt nok
            til husholdningsbrug.
          </p>

          <h2>Liste over almindelige ingredienser (1 kop = 250 ml)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Omtrentligt antal gram per kop, spiseske og teske</caption>
              <thead>
                <tr>
                  <th scope="col">Ingrediens</th>
                  <th scope="col">1 kop</th>
                  <th scope="col">1 spiseske</th>
                  <th scope="col">1 teske</th>
                </tr>
              </thead>
              <tbody>
                {kitchenIngredientRows.map((row) => (
                  <tr key={row.key}>
                    <td>{kitchenIngredientLabels.da[row.key]}</td>
                    <td>{Math.round((row.gramsPerBardak * 250) / 200)} g</td>
                    <td>{Math.round((row.gramsPerBardak * 250 * 15) / (200 * 200))} g</td>
                    <td>{Math.round((row.gramsPerBardak * 250 * 5) / (200 * 200))} g</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Ofte stillede spørgsmål</h2>
          <p>
            <strong>Hvor mange milliliter er en spiseske?</strong>
            <br />
            En spiseske svarer til 15 milliliter, altså 3 teskeer. Koppen,
            der bruges her, svarer til 250 milliliter (den metriske
            standardkop, der bruges i danske opskrifter).
          </p>
          <p>
            <strong>Hvorfor varierer vægten af en kop afhængigt af ingrediens?</strong>
            <br />
            Fordi rumfanget forbliver konstant, men tætheden varierer. En
            let ingrediens som mel vejer mindre end en tæt ingrediens som
            honning ved samme rumfang.
          </p>
          <p>
            For at skalere en hel ret, prøv{" "}
            <Link href="/da/recipe-converter">opskriftomregneren</Link>.
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Relaterede værktøjer</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/da/recipe-converter">Opskriftomregner</Link>
            </li>
            <li>
              <Link href="/da/shoe-size-converter">Skostørrelseomregner</Link>
            </li>
            <li>
              <Link href="/da/historical-units">Historiske måleenheder</Link>
            </li>
            <li>
              <Link href="/da/categories/masse">Omregning af masseenheder</Link>
            </li>
          </ul>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Andre sprog</h2>
          <Link
            className="text-link"
            href="/mutfak-olculeri-cevirici"
            hrefLang="tr"
          >
            Åbn den tyrkiske version
          </Link>
        </section>
      </div>
    </main>
  );
}
