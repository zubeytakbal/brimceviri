import type { Metadata } from "next";
import Link from "next/link";
import ShoeSizeConverter from "../../components/ShoeSizeConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Skostorrelseomregner: EU, US, UK",
  description:
    "Omregn europaeiske (EU), amerikanske (US) og britiske (UK) skostorrelser; sammenlign ogsa storrelser for Nike, Adidas, Puma, New Balance og Converse.",
  alternates: {
    canonical: "/da/shoe-size-converter",
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
      da: "/da/shoe-size-converter",
      "x-default": "/ayakkabi-numarasi-cevirme",
    },
  },
  openGraph: {
    title: "Skostorrelseomregner: EU, US, UK",
    description: "Omregn europaeiske, amerikanske og britiske skostorrelser.",
    url: buildSiteUrl("/da/shoe-size-converter"),
    siteName: "BirimCeviri.app",
    locale: "da_DK",
    type: "website",
  },
};

export default function DanishShoeSizePage() {
  return (
    <main className="all-conversions-page" lang="da">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sidenavigation">
          <Link href="/da">Hjem</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Skostorrelseomregner</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Skostorrelseomregner: EU, US, UK</h1>

          <p>
            Indtast den storrelse, du kender, for at se de tilsvarende
            amerikanske (US) og britiske (UK) storrelser direkte. Separate
            tabeller for herre, dame, spaedbarn og storre born, med
            sammenligning af maerkerne Nike, Adidas, Puma, New Balance og
            Converse.
          </p>
        </header>

        <ShoeSizeConverter locale="da" />

        <section className="category-article-content">
          <h2>Hvorfor er skostorrelser forskellige mellem maerker og systemer?</h2>
          <p>
            I Danmark bruges den europaeiske storrelsesskala (EU), samme
            skala som bruges i de fleste europaeiske lande, men importerede
            sko har ofte ogsa den amerikanske (US) storrelse angivet pa
            etiketten. Desuden bruger hvert maerke sine egne
            produktionslaester, sa samme fodlaengde kan svare til
            forskellige storrelser, eller forskydes et halvt nummer,
            afhaengigt af maerke.
          </p>
          <p>
            Det mest palidelige resultat far man saedvanligvis ved at male
            fodens laengde i centimeter og derefter vaelge muligheden
            "Fodlaengde" i vaerktojet. Dette reducerer fejlene, der skyldes
            forskelle i storrelsesbetegnelser mellem maerker og lande.
          </p>
          <p>
            For born starter den amerikanske (US) storrelsesskala forfra
            efter 13,5; derfor holdes tabellerne for spaedbarn/smabarn og
            storre born adskilt, for at holde sammenligningen tydelig.
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Relaterede vaerktojer</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/da/kitchen-measurement-converter">Kokkenmal</Link>
            </li>
            <li>
              <Link href="/da/recipe-converter">Opskriftomregner</Link>
            </li>
            <li>
              <Link href="/da/historical-units">Historiske maleenheder</Link>
            </li>
            <li>
              <Link href="/da/categories/laengde">Omregning af laengdeenheder</Link>
            </li>
          </ul>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Andre sprog</h2>
          <Link
            className="text-link"
            href="/ayakkabi-numarasi-cevirme"
            hrefLang="tr"
          >
            Abn den tyrkiske version
          </Link>
        </section>
      </div>
    </main>
  );
}
