import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import AnnualOutdatedNotice from "../../components/de/AnnualOutdatedNotice";
import KaufnebenkostenRechner from "../../components/de/KaufnebenkostenRechner";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import {
  FREIGRENZE,
  GREST_STAND,
  GRUNDERWERBSTEUER,
} from "../../converter/germanKaufnebenkosten";
import { GERMAN_STATES } from "../../converter/time/germanHolidays";
import { rechnerRelated } from "../../i18n/germanRechnerLinks";
import { seoTitle } from "../../seoTitle";
import { buildSiteUrl } from "../../siteConfig";

export const revalidate = 86400;

const path = "/de/grunderwerbsteuer-rechner";
const title = `Grunderwerbsteuer-Rechner ${GREST_STAND}: Kaufnebenkosten berechnen`;
const description = `Grunderwerbsteuer ${GREST_STAND} für alle 16 Bundesländer (3,5 bis 6,5 %) und die gesamten Kaufnebenkosten mit Notar, Grundbuch und Makler berechnen – mit Inventar-Abzug und Steuerbefreiungen.`;

export const metadata: Metadata = {
  title: seoTitle(title, `Grunderwerbsteuer-Rechner ${GREST_STAND}`),
  description,
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    url: buildSiteUrl(path),
    siteName: "BirimCeviri.app",
    locale: "de_DE",
    type: "website",
  },
};

const eur = (n: number) => `${Math.floor(n).toLocaleString("de-DE")} €`;
const pct = (n: number) =>
  `${n.toLocaleString("de-DE", { minimumFractionDigits: 1 })} %`;
const staaten = [...GERMAN_STATES].sort(
  (a, b) =>
    GRUNDERWERBSTEUER[a.code] - GRUNDERWERBSTEUER[b.code] ||
    a.name.localeCompare(b.name, "de"),
);

const faqItems: FaqItem[] = [
  {
    question: `Wie hoch ist die Grunderwerbsteuer ${GREST_STAND}?`,
    answer: `Zwischen 3,5 % in Bayern und 6,5 % in Brandenburg, Nordrhein-Westfalen, dem Saarland und Schleswig-Holstein. Bei einem Kaufpreis von 400.000 € sind das 14.000 € in Bayern und 26.000 € in Nordrhein-Westfalen. Zuletzt hat Bremen den Satz zum 1. Juli 2025 auf 5,5 % erhöht.`,
  },
  {
    question: "Wie hoch sind die Kaufnebenkosten insgesamt?",
    answer:
      "Je nach Bundesland und Makler etwa 5,5 bis 12 % des Kaufpreises: Grunderwerbsteuer 3,5 bis 6,5 %, Notar etwa 1,5 %, Grundbuch etwa 0,5 % und – falls ein Makler beteiligt ist – meist 3,57 % Käuferanteil. Banken erwarten in der Regel, dass die Nebenkosten aus Eigenkapital bezahlt werden.",
  },
  {
    question: "Kann man Grunderwerbsteuer sparen?",
    answer:
      "Ja, legal über mitverkauftes Inventar: Einbauküche, Markisen oder Möbel gehören nicht zur Bemessungsgrundlage, wenn sie im Kaufvertrag mit einem realistischen Wert gesondert aufgeführt sind. Steuerfrei sind außerdem Käufe bis 2.500 € sowie Käufe vom Ehe- oder eingetragenen Lebenspartner und von Eltern, Kindern oder Enkeln.",
  },
  {
    question: "Wann muss die Grunderwerbsteuer bezahlt werden?",
    answer:
      "Der Notar meldet den Kauf dem Finanzamt, das einen Steuerbescheid schickt. Die Steuer ist einen Monat nach Bekanntgabe fällig. Erst danach stellt das Finanzamt die Unbedenklichkeitsbescheinigung aus, ohne die Sie nicht als Eigentümer ins Grundbuch eingetragen werden.",
  },
  {
    question: "Wer zahlt den Makler?",
    answer:
      "Beim Kauf einer Wohnung oder eines Einfamilienhauses durch Privatpersonen darf der Käufer seit dem 23. Dezember 2020 höchstens die Hälfte der Provision tragen (§ 656c BGB). Üblich sind 3,57 % inklusive Mehrwertsteuer für Käufer und Verkäufer; regional kommen auch niedrigere Sätze vor.",
  },
];

export default function GrunderwerbsteuerPage() {
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: path, label: "Grunderwerbsteuer-Rechner" },
        ]}
        crumbLabel="Brotkrumen"
        title={`Grunderwerbsteuer-Rechner ${GREST_STAND}`}
        intro="Berechnen Sie die Grunderwerbsteuer für Ihr Bundesland und alle Kaufnebenkosten beim Haus- oder Wohnungskauf: Notar, Grundbuch und Makler, mit Abzug für mitverkauftes Inventar."
        tool={
          <>
            <AnnualOutdatedNotice id="de-grunderwerbsteuer" />
            <KaufnebenkostenRechner />
          </>
        }
        related={{
          title: "Das könnte Sie auch interessieren",
          links: [
            { href: "/de/flaechenrechner", label: "Flächenrechner" },
            ...rechnerRelated(path),
          ],
        }}
        tocTitle="Inhalt"
        tocItems={[
          {
            id: "saetze",
            label: `Grunderwerbsteuer ${GREST_STAND} nach Bundesland`,
          },
          { id: "nebenkosten", label: "Die Kaufnebenkosten im Überblick" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="saetze">Grunderwerbsteuer {GREST_STAND} nach Bundesland</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Bundesland</th>
                <th scope="col">Steuersatz</th>
                <th scope="col">bei 300.000 €</th>
                <th scope="col">bei 500.000 €</th>
              </tr>
            </thead>
            <tbody>
              {staaten.map((s) => (
                <tr key={s.code} id={`grunderwerbsteuer-${s.slug}`}>
                  <td>{s.name}</td>
                  <td>{pct(GRUNDERWERBSTEUER[s.code])}</td>
                  <td>{eur((300000 * GRUNDERWERBSTEUER[s.code]) / 100)}</td>
                  <td>{eur((500000 * GRUNDERWERBSTEUER[s.code]) / 100)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Die Länder legen den Satz seit 2006 selbst fest; vorher galten
          bundesweit 3,5 %. Letzte Änderungen: Hamburg und Sachsen auf 5,5 %
          (2023), Thüringen auf 5,0 % gesenkt (2024), Bremen auf 5,5 % (1. Juli
          2025).
        </p>

        <h2 id="nebenkosten">Die Kaufnebenkosten im Überblick</h2>
        <ul>
          <li>
            <strong>Grunderwerbsteuer:</strong> auf den Kaufpreis ohne
            mitverkauftes Inventar, auf volle Euro abgerundet; steuerfrei bis{" "}
            {FREIGRENZE.toLocaleString("de-DE")} € und bei Käufen innerhalb der
            Familie in gerader Linie.
          </li>
          <li>
            <strong>Notar:</strong> Gebühren nach dem Gerichts- und
            Notarkostengesetz für Beurkundung und Vollzug, zusammen meist 1 bis
            1,5 % – mit Grundschuld für die Finanzierung etwas mehr.
          </li>
          <li>
            <strong>Grundbuch:</strong> Eintragung von Auflassungsvormerkung,
            Eigentum und Grundschuld, etwa 0,5 %.
          </li>
          <li>
            <strong>Makler:</strong> bei Wohnungen und Einfamilienhäusern
            höchstens die Hälfte der Gesamtprovision, meist 3,57 %.
          </li>
        </ul>
        <p>
          Wie viel Netto-Einkommen für die Finanzierung bleibt, zeigt der{" "}
          <Link href="/de/brutto-netto-rechner">Brutto-Netto-Rechner</Link>;
          Wohnfläche und Grundstück rechnet der{" "}
          <Link href="/de/flaechenrechner">Flächenrechner</Link>.
        </p>
        <p>
          <small>
            Rechtsgrundlage: Grunderwerbsteuergesetz (§§ 3, 8, 11 GrEStG) und
            die Steuersatzgesetze der Länder, Stand {GREST_STAND}; Notar- und
            Grundbuchkosten sind Richtwerte. Keine Steuer- oder Rechtsberatung.
          </small>
        </p>
      </TimeToolPage>
    </div>
  );
}
