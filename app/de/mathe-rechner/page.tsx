import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { germanMathPages } from "../../i18n/germanMathPages";
import { buildSiteUrl } from "../../siteConfig";

const path = "/de/mathe-rechner";
const title = "Mathe-Rechner mit Rechenweg";
const description =
  "Kostenlose Mathe-Rechner mit Rechenweg: Bruchrechner, ggT und kgV, Primfaktorzerlegung, Wurzeln, pq-Formel, Mittelwert, n über k, römische Zahlen, Prozent und Dreisatz.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
};

const more = [
  { href: "/de/prozentrechner", title: "Prozentrechner", description: "Prozentwert, Prozentsatz, Grundwert, Veränderung und Rabatt." },
  { href: "/de/dreisatz-rechner", title: "Dreisatz-Rechner", description: "Proportional und antiproportional in drei Schritten." },
  { href: "/de/notenrechner", title: "Notenrechner", description: "Notendurchschnitt, IHK-Schlüssel, Oberstufenpunkte, Abi-Schnitt." },
];

const faqItems: FaqItem[] = [
  { question: "Zeigen die Rechner den Rechenweg?", answer: "Ja. Die Rechner zeigen die Schritte so, wie sie im Unterricht verlangt werden – etwa Hauptnenner und Kürzen beim Bruchrechnen oder den euklidischen Algorithmus beim ggT." },
  { question: "Kann ich Dezimalzahlen mit Komma eingeben?", answer: "Ja, das deutsche Dezimalkomma wird überall erkannt, ebenso der Punkt." },
  { question: "Sind die Rechner kostenlos?", answer: "Ja, alle Rechner laufen im Browser, ohne Anmeldung und ohne Werbung im Rechenbereich." },
];

export default function MatheRechnerPage() {
  const tools = [...germanMathPages.map((p) => ({ href: p.path, title: p.title, description: p.description })), ...more];
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: path, label: "Mathe-Rechner" },
        ]}
        crumbLabel="Brotkrumen"
        title="Mathe-Rechner"
        intro="Rechner für die Aufgaben aus Schule und Alltag – jeweils mit Rechenweg zum Nachvollziehen und zur Kontrolle der Hausaufgaben."
        tool={
          <div className="time-tool-chips">
            {tools.map((t) => (
              <Link key={t.href} href={t.href} prefetch={false}>
                {t.title}
              </Link>
            ))}
          </div>
        }
        related={{ title: "Das könnte Sie auch interessieren", links: [{ href: "/de/kategorien", label: "Einheiten umrechnen" }, { href: "/de/periodensystem", label: "Periodensystem" }] }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "rechner", label: "Alle Rechner" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="rechner">Alle Rechner</h2>
        <ul>
          {tools.map((t) => (
            <li key={t.href}>
              <Link href={t.href}>{t.title}</Link>: {t.description}
            </li>
          ))}
        </ul>
      </TimeToolPage>
    </div>
  );
}
