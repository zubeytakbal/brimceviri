import type { Metadata } from "next";
import Link from "next/link";
import RecipeScalerConverter from "../../components/RecipeScalerConverter";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Convertitore di ricette",
  description:
    "Incolla la tua ricetta, scegli un moltiplicatore per aumentare o diminuire le dosi e ottieni all'istante le nuove quantità — alcuni ingredienti vengono anche convertiti automaticamente in grammi.",
  alternates: {
    canonical: "/it/convertitore-ricette",
    languages: {
      tr: "/tarif-cevirici",
      en: "/en/recipe-converter",
      de: "/de/rezept-umrechner",
      bn: "/bn/recipe-converter",
      fr: "/fr/convertisseur-de-recettes",
      es: "/es/conversor-de-recetas",
      "es-419": "/es-419/conversor-de-recetas",
      pt: "/pt/conversor-de-receitas",
      it: "/it/convertitore-ricette",
      "x-default": "/tarif-cevirici",
    },
  },
  openGraph: {
    title: "Convertitore di ricette",
    description: "Incolla la tua ricetta e ottieni all'istante le nuove quantità.",
    url: buildSiteUrl("/it/convertitore-ricette"),
    siteName: "BirimCeviri.app",
    locale: "it_IT",
    type: "website",
  },
};

export default function ItalianRecipeConverterPage() {
  return (
    <main className="all-conversions-page" lang="it">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Percorso di navigazione">
          <Link href="/it">Home</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Convertitore di ricette</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Convertitore di ricette</h1>

          <p>
            Incolla la tua ricetta riga per riga, ad esempio: «2 tazze di
            farina». Dopo aver scelto il moltiplicatore, il sito calcola
            all'istante le nuove quantità. Se l'ingrediente viene
            riconosciuto ed è espresso in un'unità come tazza o cucchiaio,
            viene mostrato anche un valore approssimativo in grammi.
          </p>
        </header>

        <RecipeScalerConverter locale="it" />

        <section className="category-article-content">
          <h2>Come aumentare o diminuire una ricetta?</h2>
          <p>
            Il principio è semplice: moltiplicare ogni quantità per lo
            stesso fattore. Se la ricetta è per 2 persone e ne vuoi 4, il
            moltiplicatore è 2. Questo strumento lo fa automaticamente per
            ogni riga che inizia con una quantità leggibile (numero intero,
            frazione o decimale).
          </p>
          <p>
            Puoi anche indicare il numero di porzioni originali e il numero
            di porzioni desiderate: il moltiplicatore verrà calcolato
            automaticamente, senza doverlo calcolare a mano.
          </p>

          <h2>Perché alcune righe non mostrano i grammi?</h2>
          <p>
            La conversione in grammi appare solo quando lo strumento
            riconosce contemporaneamente l'unità e il nome
            dell'ingrediente. Una riga come «2 uova» verrà adattata
            correttamente, ma non mostrerà grammi aggiuntivi perché l'uovo
            non è nella lista di conversione per volume.
          </p>
          <p>
            Per vedere l'elenco degli ingredienti supportati, apri il{" "}
            <Link href="/it/convertitore-misure-cucina">
              convertitore di misure da cucina
            </Link>
            .
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Strumenti correlati</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/it/convertitore-misure-cucina">Convertitore di misure da cucina</Link>
            </li>
            <li>
              <Link href="/it/convertitore-taglie-scarpe">Convertitore di numeri di scarpe</Link>
            </li>
            <li>
              <Link href="/it/unita-storiche">Unità di misura storiche</Link>
            </li>
          </ul>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Altre lingue</h2>
          <Link className="text-link" href="/tarif-cevirici" hrefLang="tr">
            Apri la versione turca
          </Link>
        </section>
      </div>
    </main>
  );
}
