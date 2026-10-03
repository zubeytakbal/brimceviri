import type { Metadata } from "next";
import GoldPurityCalculator from "../../components/GoldPurityCalculator";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { alloy, GOLD_GRADES, pureGold } from "../../converter/goldPurity";
import { GOLD_CALCULATOR_PATHS, goldCalculatorAlternates } from "../../i18n/goldCalculatorPaths";
import { buildSiteUrl } from "../../siteConfig";

const path = GOLD_CALCULATOR_PATHS.de;
const title = "Goldrechner: 333, 585 und 750 Gold – Feingoldgehalt berechnen";
const description =
  "Wie viel Feingold steckt in 333er, 585er oder 750er Gold? Feingehalt, Karat, Umrechnung 585 in 750, Hoch- und Herunterlegieren und Materialwert zum selbst eingegebenen Goldpreis.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: goldCalculatorAlternates() },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
};

const f = (n: number, d = 2) => n.toLocaleString("de-DE", { maximumFractionDigits: d });
const up = alloy(10, 0.585, 0.75);
const add = up && up.direction === "up" ? up.addPureGold : 0;

const faqItems: FaqItem[] = [
  {
    question: "Wie viel Feingold ist in 585er Gold?",
    answer: `585er Gold enthält 585 von 1.000 Teilen Feingold, also 58,5 %. In 10 g 585er Gold stecken ${f(pureGold(10, 0.585), 2)} g Feingold; das entspricht 14 Karat.`,
  },
  {
    question: "Was bedeuten 333, 585 und 750 bei Gold?",
    answer: `Die Zahl ist der Feingehalt in Promille: ${GOLD_GRADES.filter((g) => [333, 585, 750, 916, 999].includes(g.hallmark))
      .map((g) => `${g.hallmark}er Gold = ${g.karat} Karat`)
      .join(", ")}.`,
  },
  {
    question: "Wie rechnet man 585er Gold in 750er Gold um?",
    answer: `Bei gleichem Feingold entspricht 1 g 585er Gold ${f(0.585 / 0.75, 3)} g 750er Gold. Soll aus 10 g 585er Gold 750er Gold werden, müssen ${f(add, 2)} g Feingold zulegiert werden.`,
  },
  {
    question: "Wie berechne ich den Wert von Altgold?",
    answer:
      "Gewicht × Feingehalt × Feingoldpreis pro Gramm ergibt den Materialwert. Geben Sie den aktuellen Preis selbst ein; Ankäufer ziehen davon Kosten und Marge ab.",
  },
];

export default function GoldrechnerPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/de", label: "Startseite" },
        { href: "/de/kategorien/goldkarat", label: "Goldkarat" },
        { href: path, label: "Goldrechner" },
      ]}
      crumbLabel="Navigationspfad"
      title="Goldrechner: Feingoldgehalt berechnen"
      intro="Gewicht und Feingehalt eingeben: Der Rechner zeigt das enthaltene Feingold, das gleiche Feingold in einem anderen Feingehalt, wie viel Feingold oder Legierung zum Umlegieren nötig ist, und den Materialwert zu Ihrem Goldpreis."
      tool={<GoldPurityCalculator lang="de" defaultBasis="hallmark" defaultKarat={14} defaultTarget={18} />}
      related={{
        title: "Weitere Gold-Umrechnungen",
        links: [
          { href: "/de/14-karat-gold-18-karat-gold", label: "14 Karat in 18 Karat Gold" },
          { href: "/de/kategorien/goldkarat", label: "Alle Goldkarat-Umrechnungen" },
          { href: "/de/gramm-unze", label: "Gramm in Unze" },
        ],
      }}
      tocTitle="Inhalt"
      tocItems={[
        { id: "tabelle", label: "Feingehalt-Tabelle" },
        { id: "faq", label: "Häufige Fragen" },
      ]}
      faqTitle="Häufige Fragen"
      faqItems={faqItems}
    >
      <h2 id="tabelle">Feingehalt-Tabelle</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Stempel</th>
              <th scope="col">Karat</th>
              <th scope="col">Feingold</th>
              <th scope="col">Feingold in 10 g</th>
            </tr>
          </thead>
          <tbody>
            {GOLD_GRADES.map((g) => (
              <tr key={g.karat}>
                <td>{g.hallmark}er Gold</td>
                <td>{g.karat} K</td>
                <td>{f(g.hallmark / 10, 1)} %</td>
                <td>{f(pureGold(10, g.hallmark / 1000), 2)} g</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        In Deutschland wird Gold nach dem gestempelten Feingehalt gehandelt, deshalb rechnet der Rechner standardmäßig mit 585 = 58,5 %. Die
        rein rechnerische Karatangabe (14 ÷ 24 = 58,33 %) lässt sich im Feld „Berechnungsgrundlage“ wählen. Ein Goldpreis ist nicht hinterlegt:
        Für den Materialwert geben Sie den aktuellen Feingoldpreis selbst ein.
      </p>
    </TimeToolPage>
  );
}
