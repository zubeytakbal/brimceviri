import type { Metadata } from "next";
import Link from "next/link";
import ShoeSizeConverter from "../../components/ShoeSizeConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Skostorrelseomregner: EU, US, UK",
  description:
    "Regn om europeiske (EU), amerikanske (US) og britiske (UK) skostorrelser; sammenlign ogsa storrelser for Nike, Adidas, Puma, New Balance og Converse.",
  alternates: {
    canonical: "/no/shoe-size-converter",
    languages: {
      tr: "/ayakkabi-numarasi-cevirme",
      en: "/en/shoe-size-converter",
      de: "/de/schuhgroessen-umrechner",
      bn: "/bn/shoe-size-converter",
      fr: "/fr/shoe-size-converter",
      es: "/es/shoe-size-converter",
      "es-419": "/es-419/shoe-size-converter",
      pt: "/pt/shoe-size-converter",
      it: "/it/shoe-size-converter",
      nl: "/nl/shoe-size-converter",
      sv: "/sv/shoe-size-converter",
      no: "/no/shoe-size-converter",
      "x-default": "/ayakkabi-numarasi-cevirme",
    },
  },
  openGraph: {
    title: "Skostorrelseomregner: EU, US, UK",
    description: "Regn om europeiske, amerikanske og britiske skostorrelser.",
    url: buildSiteUrl("/no/shoe-size-converter"),
    siteName: "BirimCeviri.app",
    locale: "nb_NO",
    type: "website",
  },
};

export default function NorwegianShoeSizePage() {
  return (
    <main className="all-conversions-page" lang="no">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sidenavigering">
          <Link href="/no">Hjem</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Skostorrelseomregner</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Skostorrelseomregner: EU, US, UK</h1>

          <p>
            Skriv inn storrelsen du kjenner til for a se de tilsvarende
            amerikanske (US) og britiske (UK) storrelsene direkte. Egne
            tabeller for herre, dame, spedbarn og storre barn, med
            sammenligning av merkene Nike, Adidas, Puma, New Balance og
            Converse.
          </p>
        </header>

        <ShoeSizeConverter locale="no" />

        <section className="category-article-content">
          <h2>Hvorfor er skostorrelser forskjellige mellom merker og systemer?</h2>
          <p>
            I Norge brukes den europeiske storrelsesskalaen (EU), samme
            skala som brukes i de fleste europeiske land, men importerte sko
            har ofte ogsa den amerikanske (US) storrelsen oppgitt pa
            etiketten. I tillegg bruker hvert merke sine egne
            produksjonslester, sa samme fotlengde kan tilsvare ulike
            storrelser, eller forskyves et halvt nummer, avhengig av merke.
          </p>
          <p>
            Det mest palitelige resultatet far man vanligvis ved a male
            fotens lengde i centimeter og deretter velge alternativet
            "Fotlengde" i verktoyet. Dette reduserer feilene som skyldes
            forskjeller i storrelsesbetegnelser mellom merker og land.
          </p>
          <p>
            For barn starter den amerikanske (US) storrelsesskalaen pa nytt
            etter 13,5; derfor holdes tabellene for spedbarn/smabarn og
            storre barn atskilt, for a holde sammenligningen tydelig.
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Relaterte verktoy</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/no/kitchen-measurement-converter">Kjokkenmal</Link>
            </li>
            <li>
              <Link href="/no/recipe-converter">Oppskriftomregner</Link>
            </li>
            <li>
              <Link href="/no/historical-units">Historiske maleenheter</Link>
            </li>
            <li>
              <Link href="/no/categories/lengde">Omregning av lengdeenheter</Link>
            </li>
          </ul>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Andre sprak</h2>
          <Link
            className="text-link"
            href="/ayakkabi-numarasi-cevirme"
            hrefLang="tr"
          >
            Oppna den turkiska versionen
          </Link>
        </section>
      </div>
    </main>
  );
}
