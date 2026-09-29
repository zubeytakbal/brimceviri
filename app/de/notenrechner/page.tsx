import type { Metadata } from "next";
import TimeToolPage from "../../components/time/TimeToolPage";
import { Notenrechner } from "../../components/de/GermanMathTools";
import type { FaqItem } from "../../converter/faqSchema";
import { IHK_SCHLUESSEL, NOTEN_NAMEN, punkteZuNote } from "../../converter/germanMath";
import { rechnerRelated } from "../../i18n/germanRechnerLinks";
import { seoTitle } from "../../seoTitle";
import { buildSiteUrl } from "../../siteConfig";

const path = "/de/notenrechner";
const title = "Notenrechner: Durchschnitt, IHK-Schlüssel und Abi-Schnitt";
const description =
  "Notendurchschnitt mit Gewichtung berechnen, Punkte nach IHK-Notenschlüssel in Noten umrechnen, Oberstufenpunkte 0–15 und Abiturnote nach der KMK-Formel.";

export const metadata: Metadata = {
  title: seoTitle(title, "Notenrechner: Durchschnitt und IHK", "Notenrechner"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "Wie berechne ich meinen Notendurchschnitt?",
    answer: "Alle Noten addieren und durch ihre Anzahl teilen. Zählen Klassenarbeiten doppelt, multiplizieren Sie diese Noten mit 2 und teilen durch die Summe der Gewichte: (2 + 3 + 2 × 1,5) ÷ 4 = 2,0.",
  },
  {
    question: "Ab wie vielen Punkten ist eine IHK-Prüfung bestanden?",
    answer: "Ab 50 von 100 Punkten, das ist die Note 4 (ausreichend). Die Prüfungsordnungen können zusätzliche Bedingungen für einzelne Prüfungsbereiche enthalten.",
  },
  {
    question: "Wie viele Punkte brauche ich für ein Abi von 1,0?",
    answer: "Mindestens 823 von 900 Punkten. Für den Durchschnitt 2,0 sind es 643 Punkte, für 3,0 sind es 463 Punkte; mit 300 Punkten ist das Abitur mit 4,0 bestanden.",
  },
  {
    question: "Wird die Abiturnote gerundet?",
    answer: "Nein, sie wird nach der KMK-Formel auf eine Nachkommastelle abgeschnitten. 822 Punkte ergeben rechnerisch 1,1 – ein Punkt mehr (823) reicht für 1,0.",
  },
  {
    question: "Welche Note sind 10 Punkte in der Oberstufe?",
    answer: "10 Punkte entsprechen einer 2− (gut). 13 bis 15 Punkte sind eine 1, 10 bis 12 eine 2, 7 bis 9 eine 3, 4 bis 6 eine 4, 1 bis 3 eine 5 und 0 Punkte eine 6.",
  },
];

export default function NotenrechnerPage() {
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: path, label: "Notenrechner" },
        ]}
        crumbLabel="Brotkrumen"
        title="Notenrechner"
        intro="Vier Rechner rund um deutsche Noten: gewichteter Notendurchschnitt, Punkte in Noten nach dem IHK-Schlüssel, Oberstufenpunkte von 0 bis 15 und der Abi-Schnitt aus der Gesamtpunktzahl."
        tool={<Notenrechner />}
        related={{ title: "Das könnte Sie auch interessieren", links: rechnerRelated(path) }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "schulnoten", label: "Schulnoten 1 bis 6" },
          { id: "ihk", label: "IHK-Notenschlüssel" },
          { id: "oberstufe", label: "Punkte in der Oberstufe" },
          { id: "abitur", label: "Abiturnote berechnen" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="schulnoten">Schulnoten 1 bis 6</h2>
        <p>
          In Deutschland reichen die Noten von 1 ({NOTEN_NAMEN[0]}) bis 6 ({NOTEN_NAMEN[5]}). Beim Durchschnitt zählt jede Note mit ihrem Gewicht:
          Schreibt die Schule vor, dass Klassenarbeiten doppelt zählen, geben Sie dort die Gewichtung 2 ein. Wie Zwischenwerte wie 2,5 auf dem
          Zeugnis gerundet werden, regelt die jeweilige Schule oder das Land.
        </p>

        <h2 id="ihk">IHK-Notenschlüssel</h2>
        <p>Für Zwischen- und Abschlussprüfungen der Industrie- und Handelskammern gilt bundesweit dieser Schlüssel (100-Punkte-Skala):</p>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Punkte</th>
                <th scope="col">Note</th>
              </tr>
            </thead>
            <tbody>
              {IHK_SCHLUESSEL.map((s, i) => (
                <tr key={s.note}>
                  <td>
                    {i === 0 ? 100 : IHK_SCHLUESSEL[i - 1].min - 1} – {s.min}
                  </td>
                  <td>
                    {s.note} ({NOTEN_NAMEN[s.note - 1]})
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>Hat eine Prüfung eine andere Höchstpunktzahl, rechnet der Notenrechner die Punkte zuerst auf 100 um.</p>

        <h2 id="oberstufe">Punkte in der Oberstufe</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Punkte</th>
                <th scope="col">Note</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 16 }, (_, i) => 15 - i).map((p) => (
                <tr key={p}>
                  <td>{p}</td>
                  <td>{punkteZuNote(p)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="abitur">Abiturnote berechnen</h2>
        <p>
          Die Gesamtpunktzahl E (300 bis 900) wird nach der Vereinbarung der Kultusministerkonferenz umgerechnet: N = 17/3 − E/180. Das Ergebnis wird
          auf eine Nachkommastelle abgeschnitten, nicht gerundet. So ergeben 900 bis 823 Punkte die Note 1,0, 822 bis 805 Punkte 1,1 und 300 Punkte
          4,0.
        </p>
        <p>
          <small>Quellen: IHK-Notenschlüssel der Industrie- und Handelskammern; KMK-Vereinbarung zur Gestaltung der gymnasialen Oberstufe. Angaben ohne Gewähr.</small>
        </p>
      </TimeToolPage>
    </div>
  );
}
