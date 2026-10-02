import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import Zinseszinsrechner from "../../components/de/Zinseszinsrechner";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { fmtDe } from "../../converter/germanMath";
import { verdopplungszeit, zinseszins } from "../../converter/germanZinseszins";
import { rechnerRelated } from "../../i18n/germanRechnerLinks";
import { seoTitle } from "../../seoTitle";
import { buildSiteUrl } from "../../siteConfig";

const path = "/de/zinseszinsrechner";
const title = "Zinseszinsrechner: Sparplan mit Zinseszins berechnen";
const description =
  "Zinseszins berechnen mit Startkapital und monatlicher Sparrate: Endkapital, Zinsen und Jahrestabelle, jährliche oder monatliche Verzinsung, mit Formel und Sparziel.";

export const metadata: Metadata = {
  title: seoTitle(title, "Zinseszinsrechner mit Sparrate", "Zinseszinsrechner"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
};

const eur = (n: number) => `${fmtDe(n, 2, 2)} €`;

// Metindeki örnekler hesap motorundan gelir; elle yazılmış rakam yok.
const beispielEinmal = zinseszins({ startkapital: 10000, sparrate: 0, zinssatz: 5, jahre: 10, intervall: "jaehrlich" })!;
const beispielEinfach = 10000 + 10000 * 0.05 * 10;
const beispielSparplan = zinseszins({ startkapital: 0, sparrate: 100, zinssatz: 5, jahre: 30, intervall: "monatlich" })!;
const zinsTabelle = [1, 2, 3, 4, 5, 6, 7, 8].map((p) => ({
  p,
  zehn: zinseszins({ startkapital: 10000, sparrate: 0, zinssatz: p, jahre: 10, intervall: "jaehrlich" })!.endkapital,
  zwanzig: zinseszins({ startkapital: 10000, sparrate: 0, zinssatz: p, jahre: 20, intervall: "jaehrlich" })!.endkapital,
  sparplan: zinseszins({ startkapital: 0, sparrate: 100, zinssatz: p, jahre: 20, intervall: "monatlich" })!.endkapital,
  verdopplung: verdopplungszeit(p, "jaehrlich"),
}));
const monatlich10 = zinseszins({ startkapital: 10000, sparrate: 0, zinssatz: 5, jahre: 10, intervall: "monatlich" })!;

const faqItems: FaqItem[] = [
  {
    question: "Wie berechnet man den Zinseszins?",
    answer: `Endkapital = Startkapital × (1 + Zinssatz ÷ 100) hoch Anzahl der Jahre. 10.000 € zu 5 % über 10 Jahre: 10.000 × 1,05¹⁰ = ${eur(beispielEinmal.endkapital)}.`,
  },
  {
    question: "Was ist der Unterschied zwischen Zins und Zinseszins?",
    answer: `Beim einfachen Zins gibt es Zinsen nur auf das Startkapital, beim Zinseszins auch auf die bereits gutgeschriebenen Zinsen. 10.000 € zu 5 % bringen in 10 Jahren mit einfachem Zins ${eur(beispielEinfach)}, mit Zinseszins ${eur(beispielEinmal.endkapital)}.`,
  },
  {
    question: "Wie lange dauert es, bis sich mein Geld verdoppelt?",
    answer: `Faustregel: 72 geteilt durch den Zinssatz. Bei 6 % sind das 12 Jahre, genau ${fmtDe(verdopplungszeit(6, "jaehrlich"), 1)} Jahre. Bei 3 % dauert es etwa ${fmtDe(verdopplungszeit(3, "jaehrlich"), 0)} Jahre.`,
  },
  {
    question: "Wie viel bringen 100 € im Monat über 30 Jahre?",
    answer: `Bei 5 % Zinsen und monatlicher Verzinsung werden aus 36.000 € Einzahlungen rund ${eur(beispielSparplan.endkapital)} – vor Steuern und Inflation.`,
  },
  {
    question: "Rechnet der Zinseszinsrechner Steuern und Inflation ein?",
    answer: "Nein, das Ergebnis ist vor Steuern und ohne Inflation. Kapitalerträge können steuerpflichtig sein; die Kaufkraft des Endkapitals ist wegen der Inflation geringer als der Nennbetrag.",
  },
];

export default function ZinseszinsrechnerPage() {
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: "/de/rechner", label: "Rechner" },
          { href: path, label: "Zinseszinsrechner" },
        ]}
        crumbLabel="Brotkrumen"
        title="Zinseszinsrechner"
        intro="Berechnen Sie, wie Ihr Geld mit Zinseszins wächst: Startkapital, monatliche Sparrate, Zinssatz und Laufzeit eingeben. Sie sehen Endkapital, Zinsen, die Entwicklung Jahr für Jahr und welche Sparrate Sie für Ihr Ziel brauchen."
        tool={<Zinseszinsrechner />}
        related={{ title: "Das könnte Sie auch interessieren", links: rechnerRelated(path) }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "formel", label: "Zinseszins-Formel" },
          { id: "sparplan", label: "Zinseszins mit Sparrate" },
          { id: "unterjaehrig", label: "Jährliche oder monatliche Verzinsung" },
          { id: "tabelle", label: "Tabelle: 10.000 € bei 1 bis 8 %" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="formel">Die Zinseszins-Formel</h2>
        <p>
          Beim Zinseszins werden die Zinsen am Ende jeder Periode dem Kapital zugeschlagen und im nächsten Jahr mitverzinst. Das Endkapital
          K<sub>n</sub> nach n Jahren bei einem Zinssatz von p % ist:
        </p>
        <p>
          <strong>
            K<sub>n</sub> = K<sub>0</sub> × (1 + p ÷ 100)<sup>n</sup>
          </strong>
        </p>
        <p>
          Beispiel: 10.000 € zu 5 % über 10 Jahre ergeben {eur(beispielEinmal.endkapital)}. Mit einfachem Zins, also ohne Zinsen auf Zinsen,
          wären es nur {eur(beispielEinfach)}. Die Differenz von {eur(beispielEinmal.endkapital - beispielEinfach)} ist der Zinseszinseffekt – und
          er wächst mit jedem Jahr.
        </p>

        <h2 id="sparplan">Zinseszins mit monatlicher Sparrate</h2>
        <p>
          Wer regelmäßig spart, zum Beispiel mit einem Sparplan, zahlt jeden Monat einen festen Betrag ein. Der Rechner geht davon aus, dass die
          Rate am Monatsende eingezahlt wird. Mit 100 € im Monat zu 5 % kommen in 30 Jahren aus 36.000 € Einzahlungen{" "}
          {eur(beispielSparplan.endkapital)} zusammen; mehr als die Hälfte davon sind Zinsen. Für den Weg in die andere Richtung – welche Rate
          brauche ich für ein Ziel? – nutzen Sie das Feld „Zielbetrag“ unter dem Ergebnis.
        </p>

        <h2 id="unterjaehrig">Jährliche oder monatliche Verzinsung</h2>
        <p>
          Bei jährlicher Verzinsung schreibt die Bank die Zinsen einmal im Jahr gut; Raten, die im Laufe des Jahres eingehen, werden bis
          Jahresende anteilig mit einfachem Zins verzinst. Bei monatlicher Verzinsung wird jeden Monat ein Zwölftel des Zinssatzes gutgeschrieben
          und sofort mitverzinst. Das bringt etwas mehr: 10.000 € zu 5 % über 10 Jahre ergeben monatlich verzinst {eur(monatlich10.endkapital)}{" "}
          statt {eur(beispielEinmal.endkapital)}. Wie oft Zinsen gutgeschrieben werden, steht in den Bedingungen Ihres Kontos.
        </p>
        <p>
          Prozentrechnung ohne Zeitfaktor finden Sie im <Link href="/de/prozentrechner">Prozentrechner</Link>, Ihr Nettogehalt im{" "}
          <Link href="/de/brutto-netto-rechner">Brutto-Netto-Rechner</Link>.
        </p>

        <h2 id="tabelle">Tabelle: 10.000 € bei 1 bis 8 % Zinsen</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Zinssatz</th>
                <th scope="col">nach 10 Jahren</th>
                <th scope="col">nach 20 Jahren</th>
                <th scope="col">100 €/Monat, 20 Jahre</th>
                <th scope="col">Verdopplung</th>
              </tr>
            </thead>
            <tbody>
              {zinsTabelle.map((row) => (
                <tr key={row.p}>
                  <td>{row.p} %</td>
                  <td>{eur(row.zehn)}</td>
                  <td>{eur(row.zwanzig)}</td>
                  <td>{eur(row.sparplan)}</td>
                  <td>{fmtDe(row.verdopplung, 1)} Jahre</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>Startkapital und Sparplan bei jährlicher bzw. monatlicher Verzinsung, vor Steuern.</p>
      </TimeToolPage>
    </div>
  );
}
