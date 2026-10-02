import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { Ratenkreditrechner } from "../../components/de/KreditRechner";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { monatsrate, monatszinsAusEffektiv } from "../../converter/germanKredit";
import { fmtDe } from "../../converter/germanMath";
import { rechnerRelated } from "../../i18n/germanRechnerLinks";
import { seoTitle } from "../../seoTitle";
import { buildSiteUrl } from "../../siteConfig";

const path = "/de/kreditrechner";
const title = "Kreditrechner: Monatliche Rate und Zinsen berechnen";
const description =
  "Ratenkredit berechnen: Monatsrate, Zinskosten und Tilgungsplan aus Kreditbetrag, Laufzeit und effektivem Jahreszins – plus welcher Kredit zu Ihrer Wunschrate passt.";

export const metadata: Metadata = {
  title: seoTitle(title, "Kreditrechner: Rate und Zinsen berechnen", "Kreditrechner"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
};

const eur = (n: number) => `${fmtDe(n, 2, 2)} €`;

// Metindeki örnekler hesap motorundan gelir.
const rate = (betrag: number, effektiv: number, monate: number) => monatsrate(betrag, monatszinsAusEffektiv(effektiv), monate);
const beispielRate = rate(10000, 6.5, 48);
const beispielZinsen = beispielRate * 48 - 10000;
const tabelle = [5000, 10000, 15000, 20000, 30000].map((betrag) => ({
  betrag,
  m36: rate(betrag, 6.5, 36),
  m60: rate(betrag, 6.5, 60),
  m84: rate(betrag, 6.5, 84),
}));
const laengerZinsen = rate(10000, 6.5, 84) * 84 - 10000;

const faqItems: FaqItem[] = [
  {
    question: "Wie berechnet man die monatliche Kreditrate?",
    answer: `Mit der Annuitätenformel: Rate = Kredit × i × (1 + i)ⁿ ÷ ((1 + i)ⁿ − 1), mit i als Monatszins und n als Anzahl der Raten. 10.000 € zu 6,5 % effektiv über 48 Monate ergeben ${eur(beispielRate)} im Monat.`,
  },
  {
    question: "Was ist der Unterschied zwischen Sollzins und effektivem Jahreszins?",
    answer: "Der Sollzins ist der vertraglich vereinbarte Zins. Der effektive Jahreszins berücksichtigt zusätzlich die monatliche Verrechnung und Kosten des Kredits und ist deshalb höher oder gleich. Für Vergleiche zwischen Banken ist der effektive Jahreszins maßgeblich.",
  },
  {
    question: "Was kostet ein Kredit über 10.000 €?",
    answer: `Bei 6,5 % effektivem Jahreszins und 48 Monaten zahlen Sie ${eur(beispielZinsen)} Zinsen. Über 84 Monate sinkt die Rate, die Zinskosten steigen aber auf ${eur(laengerZinsen)}.`,
  },
  {
    question: "Sind Gebühren und Restschuldversicherung enthalten?",
    answer: "Nein. Der Rechner rechnet mit dem eingegebenen Zinssatz ohne Bearbeitungsgebühren oder Versicherungen. Nehmen Sie für einen realistischen Vergleich den effektiven Jahreszins aus dem Angebot der Bank.",
  },
];

export default function KreditrechnerPage() {
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: "/de/rechner", label: "Rechner" },
          { href: path, label: "Kreditrechner" },
        ]}
        crumbLabel="Brotkrumen"
        title="Kreditrechner"
        intro="Berechnen Sie die monatliche Rate eines Ratenkredits: Kreditbetrag, Laufzeit und effektiven Jahreszins eingeben. Sie sehen Rate, Zinskosten und den Tilgungsplan – und welcher Kreditbetrag zu Ihrer Wunschrate passt."
        tool={<Ratenkreditrechner />}
        related={{ title: "Das könnte Sie auch interessieren", links: rechnerRelated(path) }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "formel", label: "So wird die Rate berechnet" },
          { id: "laufzeit", label: "Kurze oder lange Laufzeit?" },
          { id: "tabelle", label: "Ratentabelle bei 6,5 %" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="formel">So wird die Kreditrate berechnet</h2>
        <p>
          Ein Ratenkredit wird in gleich hohen Monatsraten zurückgezahlt (Annuitätendarlehen). Jede Rate besteht aus Zinsen auf die aktuelle
          Restschuld und einem Tilgungsanteil. Am Anfang ist der Zinsanteil hoch, mit jeder Rate sinkt die Restschuld – und damit wächst der
          Tilgungsanteil. Beispiel: 10.000 € zu 6,5 % effektiv über 48 Monate kosten {eur(beispielRate)} im Monat und insgesamt{" "}
          {eur(beispielZinsen)} Zinsen.
        </p>

        <h2 id="laufzeit">Kurze oder lange Laufzeit?</h2>
        <p>
          Eine längere Laufzeit senkt die Monatsrate, erhöht aber die Zinskosten: Dieselben 10.000 € über 84 statt 48 Monate kosten{" "}
          {eur(laengerZinsen)} statt {eur(beispielZinsen)} Zinsen. Wählen Sie die kürzeste Laufzeit, deren Rate sicher in Ihr Monatsbudget passt.
          Für eine Immobilienfinanzierung mit Zinsbindung und Restschuld nutzen Sie den <Link href="/de/tilgungsrechner">Tilgungsrechner</Link>,
          für Sparpläne den <Link href="/de/zinseszinsrechner">Zinseszinsrechner</Link>.
        </p>

        <h2 id="tabelle">Ratentabelle bei 6,5 % effektivem Jahreszins</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Kreditbetrag</th>
                <th scope="col">36 Monate</th>
                <th scope="col">60 Monate</th>
                <th scope="col">84 Monate</th>
              </tr>
            </thead>
            <tbody>
              {tabelle.map((row) => (
                <tr key={row.betrag}>
                  <td>{eur(row.betrag)}</td>
                  <td>{eur(row.m36)}</td>
                  <td>{eur(row.m60)}</td>
                  <td>{eur(row.m84)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>Monatsraten ohne Gebühren und Versicherungen.</p>
      </TimeToolPage>
    </div>
  );
}
