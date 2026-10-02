import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { Tilgungsrechner } from "../../components/de/KreditRechner";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { baufiRate, restschuldNachJahren, tilgungsplan } from "../../converter/germanKredit";
import { fmtDe } from "../../converter/germanMath";
import { rechnerRelated } from "../../i18n/germanRechnerLinks";
import { seoTitle } from "../../seoTitle";
import { buildSiteUrl } from "../../siteConfig";

const path = "/de/tilgungsrechner";
const title = "Tilgungsrechner: Baufinanzierung mit Restschuld berechnen";
const description =
  "Baufinanzierung berechnen: Monatsrate aus Sollzins und anfänglicher Tilgung, Restschuld nach der Zinsbindung, Tilgungsplan und Wirkung von Sondertilgungen.";

export const metadata: Metadata = {
  title: seoTitle(title, "Tilgungsrechner: Restschuld berechnen", "Tilgungsrechner"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
};

const eur = (n: number) => `${fmtDe(n, 2, 2)} €`;
const eur0 = (n: number) => `${fmtDe(Math.round(n), 0)} €`;

// Metindeki örnekler hesap motorundan gelir.
const szenario = (tilgung: number, sonder = 0) => {
  const rate = baufiRate(300000, 3.5, tilgung);
  const plan = tilgungsplan({ betrag: 300000, monatszins: 0.035 / 12, rate, sondertilgungProJahr: sonder })!;
  return { tilgung, rate, plan, rest10: restschuldNachJahren(plan, 10), jahre: plan.laufzeitMonate! / 12 };
};
const basis = szenario(2);
const mitSonder = szenario(2, 5000);
const tabelle = [1, 1.5, 2, 2.5, 3, 4].map((t) => szenario(t));

const faqItems: FaqItem[] = [
  {
    question: "Wie berechnet man die Rate einer Baufinanzierung?",
    answer: `Darlehen × (Sollzins + anfängliche Tilgung) ÷ 12. Für 300.000 € bei 3,5 % Sollzins und 2 % Tilgung sind das 300.000 × 5,5 % ÷ 12 = ${eur(basis.rate)} im Monat.`,
  },
  {
    question: "Was ist die Restschuld nach der Zinsbindung?",
    answer: `Der Betrag, der am Ende der Zinsbindung noch offen ist und neu finanziert werden muss (Anschlussfinanzierung). Im Beispiel mit 2 % Tilgung sind nach 10 Jahren noch ${eur0(basis.rest10)} offen.`,
  },
  {
    question: "Wie hoch sollte die anfängliche Tilgung sein?",
    answer: `Häufig werden mindestens 2 % empfohlen. Mit 1 % Tilgung dauert die Rückzahlung im Beispiel ${fmtDe(Math.ceil(tabelle[0].jahre), 0)} Jahre, mit 3 % nur ${fmtDe(Math.ceil(tabelle[4].jahre), 0)} Jahre – bei gleichbleibendem Zins.`,
  },
  {
    question: "Lohnt sich eine Sondertilgung?",
    answer: `Ja, jede Sondertilgung senkt sofort die Restschuld und damit alle folgenden Zinsen. 5.000 € Sondertilgung pro Jahr verkürzen die Laufzeit im Beispiel von ${fmtDe(Math.ceil(basis.jahre), 0)} auf ${fmtDe(Math.ceil(mitSonder.jahre), 0)} Jahre und sparen ${eur0(basis.plan.gesamtZinsen - mitSonder.plan.gesamtZinsen)} Zinsen. Wie viel Sondertilgung erlaubt ist, steht im Darlehensvertrag.`,
  },
];

export default function TilgungsrechnerPage() {
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: "/de/rechner", label: "Rechner" },
          { href: path, label: "Tilgungsrechner" },
        ]}
        crumbLabel="Brotkrumen"
        title="Tilgungsrechner"
        intro="Berechnen Sie Ihre Baufinanzierung: Darlehensbetrag, Sollzins, anfängliche Tilgung und Zinsbindung eingeben. Sie sehen Monatsrate, Restschuld am Ende der Zinsbindung, die Gesamtlaufzeit und den Tilgungsplan Jahr für Jahr."
        tool={<Tilgungsrechner />}
        related={{ title: "Das könnte Sie auch interessieren", links: rechnerRelated(path) }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "rate", label: "Monatsrate aus Zins und Tilgung" },
          { id: "restschuld", label: "Restschuld und Zinsbindung" },
          { id: "tabelle", label: "Tabelle: Tilgungssatz und Laufzeit" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="rate">Monatsrate aus Sollzins und Tilgung</h2>
        <p>
          Bei einer Baufinanzierung wird die Rate meist über den Tilgungssatz festgelegt: Die jährliche Rate beträgt Sollzins plus anfängliche
          Tilgung, bezogen auf den Darlehensbetrag. Für 300.000 € bei 3,5 % Sollzins und 2 % Tilgung sind das {eur(basis.rate)} im Monat. Die Rate
          bleibt während der Zinsbindung gleich; weil die Restschuld sinkt, steigt der Tilgungsanteil jeden Monat.
        </p>

        <h2 id="restschuld">Restschuld und Zinsbindung</h2>
        <p>
          Am Ende der Zinsbindung ist das Darlehen meist nicht vollständig getilgt. Im Beispiel bleiben nach 10 Jahren {eur0(basis.rest10)} offen,
          die zu dann gültigen Zinsen weiterfinanziert werden müssen. Bliebe der Zins gleich, wäre das Darlehen nach {fmtDe(Math.ceil(basis.jahre), 0)} Jahren
          getilgt. Mit 5.000 € Sondertilgung pro Jahr wären es rund {fmtDe(Math.ceil(mitSonder.jahre), 0)} Jahre. Für Ratenkredite ohne Immobilie
          nutzen Sie den <Link href="/de/kreditrechner">Kreditrechner</Link>, die Nebenkosten beim Kauf zeigt der{" "}
          <Link href="/de/grunderwerbsteuer-rechner">Grunderwerbsteuer-Rechner</Link>.
        </p>

        <h2 id="tabelle">Tabelle: Tilgungssatz und Laufzeit</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Anfängliche Tilgung</th>
                <th scope="col">Monatsrate</th>
                <th scope="col">Restschuld nach 10 Jahren</th>
                <th scope="col">Schuldenfrei nach</th>
                <th scope="col">Zinsen gesamt</th>
              </tr>
            </thead>
            <tbody>
              {tabelle.map((row) => (
                <tr key={row.tilgung}>
                  <td>{fmtDe(row.tilgung, 1)} %</td>
                  <td>{eur(row.rate)}</td>
                  <td>{eur0(row.rest10)}</td>
                  <td>{fmtDe(Math.ceil(row.jahre), 0)} Jahren</td>
                  <td>{eur0(row.plan.gesamtZinsen)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>300.000 € Darlehen, 3,5 % Sollzins, monatliche Raten, gleichbleibender Zins bis zum Ende.</p>
      </TimeToolPage>
    </div>
  );
}
