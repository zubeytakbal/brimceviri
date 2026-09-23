import type { Metadata } from "next";
import Link from "next/link";
import ShoeSizeConverter from "../../components/ShoeSizeConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Skostorlekskonverterare: EU, US, UK",
  description:
    "Omvandla europeiska (EU), amerikanska (US) och brittiska (UK) skostorlekar; jamfor aven storlekar for Nike, Adidas, Puma, New Balance och Converse.",
  alternates: {
    canonical: "/sv/shoe-size-converter",
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
      "x-default": "/ayakkabi-numarasi-cevirme",
    },
  },
  openGraph: {
    title: "Skostorlekskonverterare: EU, US, UK",
    description: "Omvandla europeiska, amerikanska och brittiska skostorlekar.",
    url: buildSiteUrl("/sv/shoe-size-converter"),
    siteName: "BirimCeviri.app",
    locale: "sv_SE",
    type: "website",
  },
};

export default function SwedishShoeSizePage() {
  return (
    <main className="all-conversions-page" lang="sv">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sidnavigering">
          <Link href="/sv">Hem</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Skostorlekskonverterare</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Skostorlekskonverterare: EU, US, UK</h1>

          <p>
            Ange den storlek du kanner till for att direkt se motsvarande
            amerikanska (US) och brittiska (UK) storlekar. Separata tabeller
            for herr, dam, spadbarn och storre barn, med jamforelse av
            marken Nike, Adidas, Puma, New Balance och Converse.
          </p>
        </header>

        <ShoeSizeConverter locale="sv" />

        <section className="category-article-content">
          <h2>Varfor skiljer sig skostorlekar mellan marken och system?</h2>
          <p>
            I Sverige anvands den europeiska storleksskalan (EU), samma
            skala som anvands i de flesta europeiska lander, men importerade
            skor har ofta aven den amerikanska (US) storleken angiven pa
            etiketten. Dessutom anvander varje marke sina egna tillverknings-
            laster, sa samma fotlangd kan motsvara olika storlekar, eller
            forskjutas ett halvt nummer, beroende pa marke.
          </p>
          <p>
            Det mest tillforlitliga resultatet fas vanligtvis genom att mata
            fotens langd i centimeter och dartill valja alternativet
            "Fotlangd" i verktyget. Detta minskar felen som orsakas av
            skillnader i storleksbeteckningar mellan marken och lander.
          </p>
          <p>
            For barn borjar den amerikanska (US) storleksskalan om efter
            13,5; darfor halls tabellerna for spadbarn/smabarn och storre
            barn separata, for att halla jamforelsen tydlig.
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Relaterade verktyg</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/sv/kitchen-measurement-converter">Kokmatt</Link>
            </li>
            <li>
              <Link href="/sv/recipe-converter">Receptomvandlare</Link>
            </li>
            <li>
              <Link href="/sv/historical-units">Historiska matenheter</Link>
            </li>
            <li>
              <Link href="/sv/categories/langd">Omvandling av langdenheter</Link>
            </li>
          </ul>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Andra sprak</h2>
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
