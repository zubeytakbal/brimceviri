import type { Metadata } from "next";
import Link from "next/link";
import ShoeSizeConverter from "../../components/ShoeSizeConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Skostorlekskonverterare: EU, US, UK",
  description:
    "Omvandla europeiska (EU), amerikanska (US) och brittiska (UK) skostorlekar; jämför även storlekar för Nike, Adidas, Puma, New Balance och Converse.",
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
            Ange den storlek du känner till för att direkt se motsvarande
            amerikanska (US) och brittiska (UK) storlekar. Separata tabeller
            för herr, dam, spädbarn och större barn, med jämförelse av
            marken Nike, Adidas, Puma, New Balance och Converse.
          </p>
        </header>

        <ShoeSizeConverter locale="sv" />

        <section className="category-article-content">
          <h2>Varför skiljer sig skostorlekar mellan marken och system?</h2>
          <p>
            I Sverige används den europeiska storleksskalan (EU), samma
            skala som används i de flesta europeiska länder, men importerade
            skor har ofta även den amerikanska (US) storleken angiven på
            etiketten. Dessutom använder varje märke sina egna tillverknings-
            laster, så samma fotlängd kan motsvara olika storlekar, eller
            förskjutas ett halvt nummer, beroende på märke.
          </p>
          <p>
            Det mest tillförlitliga resultatet fas vanligtvis genom att mäta
            fotens längd i centimeter och därtill välja alternativet
            "Fotlängd" i verktyget. Detta minskar felen som orsakas av
            skillnader i storleksbeteckningar mellan marken och länder.
          </p>
          <p>
            För barn börjar den amerikanska (US) storleksskalan om efter
            13,5; därför hålls tabellerna för spädbarn/småbarn och större
            barn separata, för att hålla jämförelsen tydlig.
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Relaterade verktyg</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/sv/kitchen-measurement-converter">Kokmått</Link>
            </li>
            <li>
              <Link href="/sv/recipe-converter">Receptomvandlare</Link>
            </li>
            <li>
              <Link href="/sv/historical-units">Historiska mätenheter</Link>
            </li>
            <li>
              <Link href="/sv/categories/langd">Omvandling av längdenheter</Link>
            </li>
          </ul>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Andra språk</h2>
          <Link
            className="text-link"
            href="/ayakkabi-numarasi-cevirme"
            hrefLang="tr"
          >
            Öppna den turkiska versionen
          </Link>
        </section>
      </div>
    </main>
  );
}
