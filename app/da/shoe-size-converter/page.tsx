import type { Metadata } from "next";
import Link from "next/link";
import ShoeSizeConverter from "../../components/ShoeSizeConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Skostørrelseomregner: EU, US, UK",
  description:
    "Omregn europæiske (EU), amerikanske (US) og britiske (UK) skostørrelser; sammenlign også størrelser for Nike, Adidas, Puma, New Balance og Converse.",
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
    title: "Skostørrelseomregner: EU, US, UK",
    description: "Omregn europæiske, amerikanske og britiske skostørrelser.",
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
          <span>Skostørrelseomregner</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Skostørrelseomregner: EU, US, UK</h1>

          <p>
            Indtast den størrelse, du kender, for at se de tilsvarende
            amerikanske (US) og britiske (UK) størrelser direkte. Separate
            tabeller for herre, dame, spædbarn og større børn, med
            sammenligning af mærkerne Nike, Adidas, Puma, New Balance og
            Converse.
          </p>
        </header>

        <ShoeSizeConverter locale="da" />

        <section className="category-article-content">
          <h2>Hvorfor er skostørrelser forskellige mellem mærker og systemer?</h2>
          <p>
            I Danmark bruges den europæiske størrelsesskala (EU), samme
            skala som bruges i de fleste europæiske lande, men importerede
            sko har ofte også den amerikanske (US) størrelse angivet på
            etiketten. Desuden bruger hvert mærke sine egne
            produktionslæster, så samme fodlængde kan svare til
            forskellige størrelser, eller forskydes et halvt nummer,
            afhængigt af mærke.
          </p>
          <p>
            Det mest pålidelige resultat får man sædvanligvis ved at måle
            fodens længde i centimeter og derefter vælge muligheden
            "Fodlængde" i værktøjet. Dette reducerer fejlene, der skyldes
            forskelle i størrelsesbetegnelser mellem mærker og lande.
          </p>
          <p>
            For børn starter den amerikanske (US) størrelsesskala forfra
            efter 13,5; derfor holdes tabellerne for spædbarn/småbarn og
            større børn adskilt, for at holde sammenligningen tydelig.
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Relaterede værktøjer</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/da/kitchen-measurement-converter">Køkkenmål</Link>
            </li>
            <li>
              <Link href="/da/recipe-converter">Opskriftomregner</Link>
            </li>
            <li>
              <Link href="/da/historical-units">Historiske måleenheder</Link>
            </li>
            <li>
              <Link href="/da/categories/laengde">Omregning af længdeenheder</Link>
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
            Åbn den tyrkiske version
          </Link>
        </section>
      </div>
    </main>
  );
}
