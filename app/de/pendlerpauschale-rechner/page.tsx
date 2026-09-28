import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import TimeToolPage from "../../components/time/TimeToolPage";
import { PendlerpauschaleRechner } from "../../components/de/GermanWorkTools";
import type { FaqItem } from "../../converter/faqSchema";
import { pauschaleProTag } from "../../converter/germanWork";
import { rechnerRelated } from "../../i18n/germanRechnerLinks";
import { seoTitle } from "../../seoTitle";
import { buildSiteUrl } from "../../siteConfig";

const path = "/de/pendlerpauschale-rechner";
const title = "Pendlerpauschale-Rechner 2026: 38 Cent ab dem 1. km";
const description =
  "Pendlerpauschale 2026 und 2025 berechnen: Entfernungspauschale, Homeoffice-Pauschale, Vergleich mit dem Arbeitnehmer-Pauschbetrag von 1.230 € und geschätzte Steuerersparnis.";

export const metadata: Metadata = {
  title: seoTitle(title, "Pendlerpauschale-Rechner 2026"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "Wie hoch ist die Pendlerpauschale 2026?",
    answer: "0,38 € für jeden vollen Kilometer der einfachen Entfernung, ab dem ersten Kilometer. Bis 2025 galten 0,30 € für die ersten 20 km und 0,38 € ab dem 21. Kilometer.",
  },
  {
    question: "Wird die Hin- und Rückfahrt gezählt?",
    answer: "Nein, nur die einfache Entfernung zwischen Wohnung und erster Tätigkeitsstätte, pro Arbeitstag einmal – unabhängig davon, wie oft Sie fahren.",
  },
  {
    question: "Ab wie vielen Kilometern lohnt sich die Pendlerpauschale?",
    answer: "Der Arbeitnehmer-Pauschbetrag von 1.230 € wird ohnehin abgezogen. Bei 220 Arbeitstagen übersteigt die Pendlerpauschale 2026 ihn ab 15 km (15 × 0,38 € × 220 = 1.254 €). Mit Homeoffice-Tagen und anderen Werbungskosten früher.",
  },
  {
    question: "Gilt die Pauschale auch für Bus, Bahn und Fahrrad?",
    answer: "Ja, sie gilt unabhängig vom Verkehrsmittel. Ohne eigenes Auto oder Dienstwagen ist sie aber auf 4.500 € im Jahr begrenzt; höhere Ticketkosten können stattdessen angesetzt werden.",
  },
  {
    question: "Kann ich am selben Tag Pendler- und Homeoffice-Pauschale ansetzen?",
    answer: "In der Regel nicht. Für einen Tag gibt es entweder die Entfernungspauschale oder die Homeoffice-Pauschale von 6 €. Eine Ausnahme gilt, wenn Ihnen kein anderer Arbeitsplatz zur Verfügung steht.",
  },
];

const beispiele = [5, 10, 15, 20, 30, 40, 50];

export default function PendlerPage() {
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: path, label: "Pendlerpauschale-Rechner" },
        ]}
        crumbLabel="Brotkrumen"
        title="Pendlerpauschale-Rechner 2026"
        intro="Berechnen Sie Ihre Entfernungspauschale für die Steuererklärung 2026 oder 2025, zusammen mit der Homeoffice-Pauschale. Der Rechner zeigt, ob Sie über den Arbeitnehmer-Pauschbetrag kommen und wie viel Steuern Sie ungefähr sparen."
        tool={<PendlerpauschaleRechner />}
        related={{
          title: "Das könnte Sie auch interessieren",
          links: [{ href: "/de/arbeitstage-rechner", label: "Arbeitstage-Rechner" }, { href: "/de/kraftstoffverbrauchsrechner", label: "Kraftstoffverbrauch berechnen" }, ...rechnerRelated(path)],
        }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "berechnung", label: "So wird gerechnet" },
          { id: "tabelle", label: "Tabelle 2025 und 2026" },
          { id: "pauschbetrag", label: "Arbeitnehmer-Pauschbetrag" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="berechnung">So wird die Pendlerpauschale berechnet</h2>
        <p>
          Entfernungspauschale = volle Kilometer der einfachen Strecke × Arbeitstage × 0,38 €. Beispiel 2026: 25 km an 220 Tagen ergeben 25 × 220 ×
          0,38 € = 2.090 €. Für 2025 waren es 20 × 0,30 € + 5 × 0,38 € = 7,90 € pro Tag, also 1.738 € – durch die Reform 352 € mehr Werbungskosten.
        </p>
        <p>
          Maßgeblich ist die kürzeste Straßenverbindung; eine längere Strecke zählt nur, wenn sie offensichtlich verkehrsgünstiger ist und regelmäßig
          genutzt wird. Wie viele Arbeitstage Sie im Jahr haben, zeigt der <Link href="/de/arbeitstage-rechner">Arbeitstage-Rechner</Link>.
        </p>

        <h2 id="tabelle">Pendlerpauschale pro Arbeitstag: 2025 und 2026</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Entfernung</th>
                <th scope="col">2025 pro Tag</th>
                <th scope="col">2026 pro Tag</th>
                <th scope="col">2026 bei 220 Tagen</th>
              </tr>
            </thead>
            <tbody>
              {beispiele.map((km) => (
                <tr key={km}>
                  <td>{km} km</td>
                  <td>{pauschaleProTag(km, 2025).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</td>
                  <td>{pauschaleProTag(km, 2026).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</td>
                  <td>{(pauschaleProTag(km, 2026) * 220).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="pauschbetrag">Arbeitnehmer-Pauschbetrag und Steuerersparnis</h2>
        <p>
          Das Finanzamt zieht bei Arbeitnehmern automatisch 1.230 € Werbungskosten ab. Pendlerpauschale, Homeoffice-Pauschale (6 € pro Tag, höchstens
          1.260 €) und weitere Werbungskosten wirken sich also erst aus, wenn sie zusammen darüber liegen. Nur der übersteigende Betrag senkt das zu
          versteuernde Einkommen; die Ersparnis hängt vom persönlichen Grenzsteuersatz ab (zwischen 14 % und 45 %).
        </p>
        <p>
          <small>
            Rechtsgrundlage: § 9 Abs. 1 Nr. 4 und Abs. 5 EStG, § 4 Abs. 5 Nr. 6c EStG, Steueränderungsgesetz 2025. Vereinfachte Schätzung ohne
            Solidaritätszuschlag, Kirchensteuer und Mobilitätsprämie; keine Steuerberatung.
          </small>
        </p>
      </TimeToolPage>
    </div>
  );
}
