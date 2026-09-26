import type { Metadata } from "next";
import Link from "next/link";
import KitchenMeasuresConverter from "../../components/KitchenMeasuresConverter";
import { kitchenIngredientLabels } from "../../converter/kitchenIngredientLabels";
import { kitchenIngredientRows } from "../../converter/kitchenMeasures";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Convertitore di misure da cucina (tazze in grammi)",
  description:
    "Converti tazze, cucchiai, grammi e millilitri per oltre 40 ingredienti: farina, zucchero, riso, miele, burro e molto altro.",
  alternates: {
    canonical: "/it/convertitore-misure-cucina",
    languages: {
      tr: "/mutfak-olculeri-cevirici",
      en: "/en/kitchen-measurement-converter",
      de: "/de/kuechenmass-umrechner",
      bn: "/bn/kitchen-measurement-converter",
      fr: "/fr/convertisseur-mesures-cuisine",
      es: "/es/conversor-medidas-de-cocina",
      "es-419": "/es-419/conversor-medidas-de-cocina",
      pt: "/pt/conversor-de-medidas-de-cozinha",
      it: "/it/convertitore-misure-cucina",
      "x-default": "/mutfak-olculeri-cevirici",
    },
  },
  openGraph: {
    title: "Convertitore di misure da cucina (tazze in grammi)",
    description: "Converti tazze, cucchiai, grammi e millilitri per oltre 40 ingredienti.",
    url: buildSiteUrl("/it/convertitore-misure-cucina"),
    siteName: "BirimCeviri.app",
    locale: "it_IT",
    type: "website",
  },
};

export default function ItalianKitchenMeasurementsPage() {
  return (
    <main className="all-conversions-page" lang="it">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Percorso di navigazione">
          <Link href="/it">Home</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Convertitore di misure da cucina</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Convertitore di misure da cucina</h1>

          <p>
            Scegli l'ingrediente e l'unità che conosci per vedere all'istante
            l'equivalente in tazze, cucchiai, cucchiaini, grammi, millilitri
            e litri. Ogni ingrediente ha una densità diversa, quindi il
            calcolo usa valori specifici per farina, zucchero, riso, miele,
            burro e molti altri.
          </p>
        </header>

        <KitchenMeasuresConverter locale="it" />

        <section className="category-article-content">
          <h2>Quanti grammi ci sono in una tazza di farina o un cucchiaio di zucchero?</h2>
          <p>
            Non esiste una regola unica valida per tutti gli ingredienti,
            perché la tazza misura un volume mentre il grammo misura una
            massa. Una tazza di farina è più leggera di una tazza di
            zucchero, e il miele è più pesante di entrambi — per questo la
            conversione varia in base alla densità dell'ingrediente.
          </p>
          <p>
            I valori indicati qui sono medie pratiche adattate all'uso
            culinario quotidiano. Il peso finale può variare leggermente in
            base a quanto l'ingrediente è compattato o alla varietà del
            prodotto, ma il risultato resta comunque affidabile per l'uso
            domestico.
          </p>

          <h2>Elenco degli ingredienti comuni (1 tazza = 250 ml)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Grammi approssimativi per tazza, cucchiaio e cucchiaino</caption>
              <thead>
                <tr>
                  <th scope="col">Ingrediente</th>
                  <th scope="col">1 tazza</th>
                  <th scope="col">1 cucchiaio</th>
                  <th scope="col">1 cucchiaino</th>
                </tr>
              </thead>
              <tbody>
                {kitchenIngredientRows.map((row) => (
                  <tr key={row.key}>
                    <td>{kitchenIngredientLabels.it[row.key]}</td>
                    <td>{Math.round((row.gramsPerBardak * 250) / 200)} g</td>
                    <td>{Math.round((row.gramsPerBardak * 250 * 15) / (200 * 200))} g</td>
                    <td>{Math.round((row.gramsPerBardak * 250 * 5) / (200 * 200))} g</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Domande frequenti</h2>
          <p>
            <strong>Quanti millilitri ci sono in un cucchiaio?</strong>
            <br />
            Un cucchiaio equivale a 15 millilitri, cioè 3 cucchiaini. La
            tazza usata qui corrisponde a 250 millilitri (la misura metrica
            standard usata nelle ricette italiane).
          </p>
          <p>
            <strong>Perché il peso di una tazza varia in base all'ingrediente?</strong>
            <br />
            Perché il volume resta costante, ma la densità varia. Un
            ingrediente leggero come la farina pesa meno di uno denso come
            il miele a parità di volume.
          </p>
          <p>
            Per adattare una ricetta completa, prova il{" "}
            <Link href="/it/convertitore-ricette">convertitore di ricette</Link>.
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>Strumenti correlati</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/it/convertitore-ricette">Convertitore di ricette</Link>
            </li>
            <li>
              <Link href="/it/convertitore-taglie-scarpe">Convertitore di numeri di scarpe</Link>
            </li>
            <li>
              <Link href="/it/unita-storiche">Unità di misura storiche</Link>
            </li>
            <li>
              <Link href="/it/categorie/massa">Conversione di unità di massa</Link>
            </li>
          </ul>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>Altre lingue</h2>
          <Link
            className="text-link"
            href="/mutfak-olculeri-cevirici"
            hrefLang="tr"
          >
            Apri la versione turca
          </Link>
        </section>
      </div>
    </main>
  );
}
