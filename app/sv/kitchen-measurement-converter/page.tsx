import type { Metadata } from "next";
import Link from "next/link";
import KitchenMeasuresConverter from "../../components/KitchenMeasuresConverter";
import { kitchenIngredientLabels } from "../../converter/kitchenIngredientLabels";
import { kitchenIngredientRows } from "../../converter/kitchenMeasures";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Kokmåttskonverterare (koppar till gram)",
  description:
    "Omvandla koppar, matskedar, gram och milliliter för över 40 ingredienser: mjöl, socker, ris, honung, smör och mycket mer.",
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
    title: "Kokmåttskonverterare (koppar till gram)",
    description: "Omvandla koppar, matskedar, gram och milliliter för över 40 ingredienser.",
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
          <span>Kokmåttskonverterare</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Kokmåttskonverterare</h1>

          <p>
            Välj ingrediensen och enheten du känner till för att direkt se
            motsvarigheten i koppar, matskedar, teskedar, gram, milliliter
            och liter. Varje ingrediens har en annan densitet, så
            beräkningen använder specifika värden för mjöl, socker, ris,
            honung, smör och många andra.
          </p>
        </header>

        <KitchenMeasuresConverter locale="sv" />

        <section className="category-article-content">
          <h2>Hur många gram är en kopp mjöl eller en matsked socker?</h2>
          <p>
            Det finns ingen enda regel som gäller för alla ingredienser,
            eftersom koppen mäter en volym medan grammet mäter en massa. En
            kopp mjöl är lättare än en kopp socker, och honung är tyngre än
            båda -- därför varierar omvandlingen beroende på ingrediensens
            densitet.
          </p>
          <p>
            Värdena som anges här är praktiska genomsnitt anpassade för
            vardagligt matlagningsbruk. Den slutliga vikten kan variera
            något beroende på hur packad ingrediensen är eller produktens
            sort, men resultatet är ändå tillräckligt tillförlitligt för
            hushållsbruk.
          </p>

          <h2>Lista över vanliga ingredienser (1 kopp = 250 ml)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Ungefärligt antal gram per kopp, matsked och tesked</caption>
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

          <h2>Vanliga frågor</h2>
          <p>
            <strong>Hur många milliliter är en matsked?</strong>
            <br />
            En matsked motsvarar 15 milliliter, det vill säga 3 teskedar.
            Koppen som används här motsvarar 250 milliliter (den metriska
            standardkoppen som används i svenska recept).
          </p>
          <p>
            <strong>Varför varierar vikten på en kopp beroende på ingrediens?</strong>
            <br />
            Eftersom volymen förblir konstant, men densiteten varierar. En
            lätt ingrediens som mjöl väger mindre än en tät ingrediens som
            honung vid samma volym.
          </p>
          <p>
            För att skala en hel maträtt, prova{" "}
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
              <Link href="/sv/historical-units">Historiska mätenheter</Link>
            </li>
            <li>
              <Link href="/sv/categories/massa">Omvandling av massaenheter</Link>
            </li>
          </ul>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Andra språk</h2>
          <Link
            className="text-link"
            href="/mutfak-olculeri-cevirici"
            hrefLang="tr"
          >
            Öppna den turkiska versionen
          </Link>
        </section>
      </div>
    </main>
  );
}
