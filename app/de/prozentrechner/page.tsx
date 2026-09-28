import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import TimeToolPage from "../../components/time/TimeToolPage";
import { Prozentrechner } from "../../components/de/GermanMathTools";
import type { FaqItem } from "../../converter/faqSchema";
import { rechnerRelated } from "../../i18n/germanRechnerLinks";
import { seoTitle } from "../../seoTitle";
import { buildSiteUrl } from "../../siteConfig";

const path = "/de/prozentrechner";
const title = "Prozentrechner: Prozent berechnen mit Rechenweg";
const description =
  "Prozentwert, Prozentsatz und Grundwert berechnen, prozentuale Veränderung, Rabatt und Aufschlag – sechs Prozentrechner auf einer Seite, jeweils mit Formel und Rechenweg.";

export const metadata: Metadata = {
  title: seoTitle(title, "Prozentrechner"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
};

const faqItems: FaqItem[] = [
  { question: "Wie berechne ich Prozent von einer Zahl?", answer: "Zahl mal Prozentsatz geteilt durch 100. 15 % von 80 sind 80 × 15 ÷ 100 = 12." },
  { question: "Wie rechne ich aus, wie viel Prozent eine Zahl von einer anderen ist?", answer: "Teil durch Ganzes mal 100. 12 von 80 sind 12 ÷ 80 × 100 = 15 %." },
  {
    question: "Wie rechne ich einen Rabatt aus?",
    answer: "Preis mal (1 − Rabatt ÷ 100). 20 % Rabatt auf 49,90 €: 49,90 × 0,8 = 39,92 €. Sie sparen 9,98 €.",
  },
  {
    question: "Warum ergeben +10 % und danach −10 % nicht den Ausgangswert?",
    answer: "Weil sich der zweite Prozentsatz auf den neuen, größeren Wert bezieht: 100 × 1,1 = 110, dann 110 × 0,9 = 99. Es bleibt ein Minus von 1 %.",
  },
  {
    question: "Was ist der Unterschied zwischen Prozent und Prozentpunkten?",
    answer: "Steigt ein Zinssatz von 4 % auf 5 %, ist das ein Plus von 1 Prozentpunkt, aber ein Anstieg um 25 % (1 ÷ 4 × 100).",
  },
];

export default function ProzentrechnerPage() {
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: path, label: "Prozentrechner" },
        ]}
        crumbLabel="Brotkrumen"
        title="Prozentrechner"
        intro="Sechs Rechner für die häufigsten Prozentaufgaben: Prozentwert, Prozentsatz, Grundwert, Veränderung, Aufschlag oder Rabatt und der Wert vor einer Änderung. Kommas und Punkte werden beide erkannt."
        tool={<Prozentrechner />}
        related={{ title: "Das könnte Sie auch interessieren", links: rechnerRelated(path) }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "formeln", label: "Die drei Grundformeln" },
          { id: "veraenderung", label: "Prozentuale Veränderung" },
          { id: "rabatt", label: "Rabatt, Aufschlag und Rückrechnung" },
          { id: "tabelle", label: "Schnelltabelle" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="formeln">Die drei Grundformeln der Prozentrechnung</h2>
        <p>
          In der Prozentrechnung gibt es drei Größen: den <strong>Grundwert G</strong> (das Ganze, 100 %), den <strong>Prozentsatz p</strong> und den{" "}
          <strong>Prozentwert W</strong> (den Anteil). Sind zwei bekannt, folgt die dritte:
        </p>
        <ul>
          <li>Prozentwert: W = G × p ÷ 100 – 15 % von 80 sind 12.</li>
          <li>Prozentsatz: p = W ÷ G × 100 – 12 von 80 sind 15 %.</li>
          <li>Grundwert: G = W ÷ p × 100 – wenn 12 genau 15 % sind, ist das Ganze 80.</li>
        </ul>

        <h2 id="veraenderung">Prozentuale Veränderung</h2>
        <p>
          Die Veränderung bezieht sich immer auf den alten Wert: (neu − alt) ÷ alt × 100. Steigt die Miete von 1.200 € auf 1.500 €, sind das +25 %.
          Sinkt sie von 1.500 € auf 1.200 €, sind es −20 % – derselbe Betrag, aber eine andere Basis.
        </p>

        <h2 id="rabatt">Rabatt, Aufschlag und Rückrechnung</h2>
        <p>
          Für einen Aufschlag multiplizieren Sie mit (1 + p ÷ 100), für einen Rabatt mit (1 − p ÷ 100). Wer vom Endpreis zurückrechnen will, teilt
          durch denselben Faktor: 39,92 € nach 20 % Rabatt ergeben 39,92 ÷ 0,8 = 49,90 € Originalpreis. Einfach 20 % auf 39,92 € aufzuschlagen, ergäbe
          fälschlich 47,90 €. Nach demselben Prinzip rechnet der <Link href="/de/mehrwertsteuer-rechner">Mehrwertsteuer-Rechner</Link> brutto in netto
          um.
        </p>

        <h2 id="tabelle">Schnelltabelle</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Prozent</th>
                <th scope="col">Bruch</th>
                <th scope="col">Faktor</th>
                <th scope="col">von 250</th>
              </tr>
            </thead>
            <tbody>
              {[
                [1, "1/100"],
                [5, "1/20"],
                [10, "1/10"],
                [12.5, "1/8"],
                [20, "1/5"],
                [25, "1/4"],
                [100 / 3, "1/3"],
                [50, "1/2"],
                [75, "3/4"],
              ].map(([p, frac]) => (
                <tr key={String(frac)}>
                  <td>{(p as number).toLocaleString("de-DE", { maximumFractionDigits: 2 })} %</td>
                  <td>{frac}</td>
                  <td>{((p as number) / 100).toLocaleString("de-DE", { maximumFractionDigits: 4 })}</td>
                  <td>{((250 * (p as number)) / 100).toLocaleString("de-DE", { maximumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TimeToolPage>
    </div>
  );
}
