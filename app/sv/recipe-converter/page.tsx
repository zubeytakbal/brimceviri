import type { Metadata } from "next";
import Link from "next/link";
import RecipeScalerConverter from "../../components/RecipeScalerConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Receptomvandlare",
  description:
    "Klistra in ditt recept, välj en multiplikator för att öka eller minska det, och få direkt de nya mängderna — vissa ingredienser omvandlas också automatiskt till gram.",
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
    description: "Klistra in ditt recept och få direkt de nya mängderna.",
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
            Klistra in ditt recept rad för rad, till exempel: "2 koppar
            mjöl". Efter att du valt multiplikatorn beräknar sidan direkt de
            nya mängderna. Om ingrediensen känns igen och anges i en enhet
            som kopp eller sked visas även ett ungefärligt värde i gram.
          </p>
        </header>

        <RecipeScalerConverter locale="sv" />

        <section className="category-article-content">
          <h2>Hur ökar eller minskar man ett recept?</h2>
          <p>
            Principen är enkel: multiplicera varje mängd med samma faktor.
            Om receptet är för 2 personer och du vill ha 4, är
            multiplikatorn 2. Detta verktyg gör detta automatiskt för varje
            rad som börjar med en läsbar mängd (heltal, bråk eller decimal).
          </p>
          <p>
            Du kan också ange antalet ursprungliga portioner och antalet
            önskade portioner: multiplikatorn beräknas då automatiskt, utan
            att du behöver räkna för hand.
          </p>

          <h2>Varför visar inte alla rader gram?</h2>
          <p>
            Omvandlingen till gram visas bara när verktyget känner igen
            både enheten och ingrediensens namn. En rad som "2 ägg" skalas
            korrekt, men visar inte extra gram eftersom ägg inte finns i
            volymomvandlingslistan.
          </p>
          <p>
            För att se listan över ingredienser som stöds, öppna{" "}
            <Link href="/sv/kitchen-measurement-converter">
              kokmåttskonverteraren
            </Link>
            .
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Relaterade verktyg</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/sv/kitchen-measurement-converter">Kokmått</Link>
            </li>
            <li>
              <Link href="/sv/shoe-size-converter">Skostorlekskonverterare</Link>
            </li>
            <li>
              <Link href="/sv/historical-units">Historiska mätenheter</Link>
            </li>
          </ul>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Andra språk</h2>
          <Link className="text-link" href="/tarif-cevirici" hrefLang="tr">
            Öppna den turkiska versionen
          </Link>
        </section>
      </div>
    </main>
  );
}
