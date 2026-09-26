import type { Metadata } from "next";
import Link from "next/link";
import ShoeSizeConverter from "../../components/ShoeSizeConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Skostørrelseomregner: EU, US, UK",
  description:
    "Regn om europeiske (EU), amerikanske (US) og britiske (UK) skostørrelser; sammenlign også størrelser for Nike, Adidas, Puma, New Balance og Converse.",
  alternates: {
    canonical: "/no/skostorrelser",
    languages: {
      tr: "/ayakkabi-numarasi-cevirme",
      en: "/en/shoe-size-converter",
      de: "/de/schuhgroessen-umrechner",
      bn: "/bn/shoe-size-converter",
      fr: "/fr/convertisseur-de-pointures",
      es: "/es/conversor-tallas-de-calzado",
      "es-419": "/es-419/conversor-tallas-de-calzado",
      pt: "/pt/conversor-de-calcados",
      it: "/it/convertitore-taglie-scarpe",
      nl: "/nl/schoenmaten-omrekenen",
      sv: "/sv/skostorlekar",
      no: "/no/skostorrelser",
      "x-default": "/ayakkabi-numarasi-cevirme",
    },
  },
  openGraph: {
    title: "Skostørrelseomregner: EU, US, UK",
    description: "Regn om europeiske, amerikanske og britiske skostørrelser.",
    url: buildSiteUrl("/no/skostorrelser"),
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
          <span>Skostørrelseomregner</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Skostørrelseomregner: EU, US, UK</h1>

          <p>
            Skriv inn størrelsen du kjenner til for å se de tilsvarende
            amerikanske (US) og britiske (UK) størrelsene direkte. Egne
            tabeller for herre, dame, spedbarn og større barn, med
            sammenligning av merkene Nike, Adidas, Puma, New Balance og
            Converse.
          </p>
        </header>

        <ShoeSizeConverter locale="no" />

        <section className="category-article-content">
          <h2>Hvorfor er skostørrelser forskjellige mellom merker og systemer?</h2>
          <p>
            I Norge brukes den europeiske størrelsesskalaen (EU), samme
            skala som brukes i de fleste europeiske land, men importerte sko
            har ofte også den amerikanske (US) størrelsen oppgitt på
            etiketten. I tillegg bruker hvert merke sine egne
            produksjonslester, så samme fotlengde kan tilsvare ulike
            størrelser, eller forskyves et halvt nummer, avhengig av merke.
          </p>
          <p>
            Det mest pålitelige resultatet får man vanligvis ved å måle
            fotens lengde i centimeter og deretter velge alternativet
            "Fotlengde" i verktøyet. Dette reduserer feilene som skyldes
            forskjeller i størrelsesbetegnelser mellom merker og land.
          </p>
          <p>
            For barn starter den amerikanske (US) størrelsesskalaen på nytt
            etter 13,5; derfor holdes tabellene for spedbarn/småbarn og
            større barn atskilt, for å holde sammenligningen tydelig.
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Relaterte verktøy</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/no/kjokkenmal-omregner">Kjøkkenmål</Link>
            </li>
            <li>
              <Link href="/no/oppskriftomregner">Oppskriftomregner</Link>
            </li>
            <li>
              <Link href="/no/historiske-enheter">Historiske måleenheter</Link>
            </li>
            <li>
              <Link href="/no/kategorier/lengde">Omregning av lengdeenheter</Link>
            </li>
          </ul>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Andre språk</h2>
          <Link
            className="text-link"
            href="/ayakkabi-numarasi-cevirme"
            hrefLang="tr"
          >
            Oppnå den turkiska versionen
          </Link>
        </section>
      </div>
    </main>
  );
}
