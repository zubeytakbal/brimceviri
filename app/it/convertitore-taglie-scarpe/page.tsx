import type { Metadata } from "next";
import Link from "next/link";
import ShoeSizeConverter from "../../components/ShoeSizeConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Convertitore di numeri di scarpe: IT/EU, US, UK",
  description:
    "Converti le numerazioni di scarpe italiana/europea (EU), americana (US) e britannica (UK); confronta anche le taglie di Nike, Adidas, Puma, New Balance e Converse.",
  alternates: {
    canonical: "/it/convertitore-taglie-scarpe",
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
      "x-default": "/ayakkabi-numarasi-cevirme",
    },
  },
  openGraph: {
    title: "Convertitore di numeri di scarpe: IT/EU, US, UK",
    description: "Converti le numerazioni di scarpe italiana/europea, americana e britannica.",
    url: buildSiteUrl("/it/convertitore-taglie-scarpe"),
    siteName: "BirimCeviri.app",
    locale: "it_IT",
    type: "website",
  },
};

export default function ItalianShoeSizePage() {
  return (
    <main className="all-conversions-page" lang="it">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Percorso di navigazione">
          <Link href="/it">Home</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Convertitore di numeri di scarpe</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Convertitore di numeri di scarpe: IT/EU, US, UK</h1>

          <p>
            Inserisci il numero che conosci per vedere all'istante gli
            equivalenti americano (US) e britannico (UK). Tabelle separate
            per uomo, donna, neonati e bambini più grandi, con il confronto
            tra i marchi Nike, Adidas, Puma, New Balance e Converse.
          </p>
        </header>

        <ShoeSizeConverter locale="it" />

        <section className="category-article-content">
          <h2>Perché la numerazione delle scarpe varia tra marchi e sistemi?</h2>
          <p>
            In Italia si usa la numerazione europea (EU), la stessa
            utilizzata nella maggior parte del continente, ma le scarpe
            importate riportano spesso anche la numerazione americana (US)
            in etichetta. Inoltre ogni marchio usa le proprie forme di
            fabbricazione, quindi la stessa lunghezza del piede può
            corrispondere a numeri diversi, o spostati di mezzo numero, a
            seconda del marchio.
          </p>
          <p>
            Il risultato più affidabile si ottiene di solito misurando la
            lunghezza del piede in centimetri e scegliendo poi l'opzione
            «Lunghezza del piede» nello strumento. Questo riduce gli errori
            causati dalle differenze di nomenclatura tra marchi e paesi.
          </p>
          <p>
            Per i bambini, la numerazione americana (US) ricomincia dopo il
            13,5; per questo le tabelle per neonati/bambini piccoli e
            bambini più grandi sono separate, per mantenere chiaro il
            confronto.
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Strumenti correlati</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/it/convertitore-misure-cucina">Convertitore di misure da cucina</Link>
            </li>
            <li>
              <Link href="/it/convertitore-ricette">Convertitore di ricette</Link>
            </li>
            <li>
              <Link href="/it/unita-storiche">Unità di misura storiche</Link>
            </li>
            <li>
              <Link href="/it/categorie/lunghezza">Conversione di unità di lunghezza</Link>
            </li>
          </ul>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Altre lingue</h2>
          <Link
            className="text-link"
            href="/ayakkabi-numarasi-cevirme"
            hrefLang="tr"
          >
            Apri la versione turca
          </Link>
        </section>
      </div>
    </main>
  );
}
