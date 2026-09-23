import type { Metadata } from "next";
import Link from "next/link";
import KitchenMeasuresConverter from "../../components/KitchenMeasuresConverter";
import { kitchenIngredientLabels } from "../../converter/kitchenIngredientLabels";
import { kitchenIngredientRows } from "../../converter/kitchenMeasures";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Kokmattskonverterare (koppar till gram)",
  description:
    "Omvandla koppar, matskedar, gram och milliliter for over 40 ingredienser: mjol, socker, ris, honung, smor och mycket mer.",
  alternates: {
    canonical: "/sv/kitchen-measurement-converter",
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
      "x-default": "/mutfak-olculeri-cevirici",
    },
  },
  openGraph: {
    title: "Kokmattskonverterare (koppar till gram)",
    description: "Omvandla koppar, matskedar, gram och milliliter for over 40 ingredienser.",
    url: buildSiteUrl("/sv/kitchen-measurement-converter"),
    siteName: "BirimCeviri.app",
    locale: "sv_SE",
    type: "website",
  },
};

export default function SwedishKitchenMeasurementsPage() {
  return (
    <main className="all-conversions-page" lang="sv">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sidnavigering">
          <Link href="/sv">Hem</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Kokmattskonverterare</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Kokmattskonverterare</h1>

          <p>
            Valj ingrediensen och enheten du kanner till for att direkt se
            motsvarigheten i koppar, matskedar, teskedar, gram, milliliter
            och liter. Varje ingrediens har en annan densitet, sa
            berakningen anvander specifika varden for mjol, socker, ris,
            honung, smor och manga andra.
          </p>
        </header>

        <KitchenMeasuresConverter locale="sv" />

        <section className="category-article-content">
          <h2>Hur manga gram ar en kopp mjol eller en matsked socker?</h2>
          <p>
            Det finns ingen enda regel som galler for alla ingredienser,
            eftersom koppen mater en volym medan grammet mater en massa. En
            kopp mjol ar lattare an en kopp socker, och honung ar tyngre an
            bada -- darfor varierar omvandlingen beroende pa ingrediensens
            densitet.
          </p>
          <p>
            Vardena som anges har ar praktiska genomsnitt anpassade for
            vardagligt matlagningsbruk. Den slutliga vikten kan variera
            nagot beroende pa hur packad ingrediensen ar eller produktens
            sort, men resultatet ar anda tillrackligt tillforlitligt for
            hushallsbruk.
          </p>

          <h2>Lista over vanliga ingredienser (1 kopp = 250 ml)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Ungefarligt antal gram per kopp, matsked och tesked</caption>
              <thead>
                <tr>
                  <th scope="col">Ingrediens</th>
                  <th scope="col">1 kopp</th>
                  <th scope="col">1 matsked</th>
                  <th scope="col">1 tesked</th>
                </tr>
              </thead>
              <tbody>
                {kitchenIngredientRows.map((row) => (
                  <tr key={row.key}>
                    <td>{kitchenIngredientLabels.sv[row.key]}</td>
                    <td>{Math.round((row.gramsPerBardak * 250) / 200)} g</td>
                    <td>{Math.round((row.gramsPerBardak * 250 * 15) / (200 * 200))} g</td>
                    <td>{Math.round((row.gramsPerBardak * 250 * 5) / (200 * 200))} g</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Vanliga fragor</h2>
          <p>
            <strong>Hur manga milliliter ar en matsked?</strong>
            <br />
            En matsked motsvarar 15 milliliter, det vill saga 3 teskedar.
            Koppen som anvands har motsvarar 250 milliliter (den metriska
            standardkoppen som anvands i svenska recept).
          </p>
          <p>
            <strong>Varfor varierar vikten pa en kopp beroende pa ingrediens?</strong>
            <br />
            Eftersom volymen forblir konstant, men densiteten varierar. En
            latt ingrediens som mjol vager mindre an en tat ingrediens som
            honung vid samma volym.
          </p>
          <p>
            For att skala en hel maträtt, prova{" "}
            <Link href="/sv/recipe-converter">receptomvandlaren</Link>.
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Relaterade verktyg</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/sv/recipe-converter">Receptomvandlare</Link>
            </li>
            <li>
              <Link href="/sv/shoe-size-converter">Skostorlekskonverterare</Link>
            </li>
            <li>
              <Link href="/sv/historical-units">Historiska matenheter</Link>
            </li>
            <li>
              <Link href="/sv/categories/massa">Omvandling av massaenheter</Link>
            </li>
          </ul>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Andra sprak</h2>
          <Link
            className="text-link"
            href="/mutfak-olculeri-cevirici"
            hrefLang="tr"
          >
            Oppna den turkiska versionen
          </Link>
        </section>
      </div>
    </main>
  );
}
