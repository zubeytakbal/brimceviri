import type { Metadata } from "next";
import Stopwatch from "../../components/time/Stopwatch";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { timeToolsRelatedDe } from "../../i18n/germanTimeTools";
import { timeToolAlternates } from "../../i18n/timeToolPaths";
import { buildSiteUrl } from "../../siteConfig";

const path = "/de/stoppuhr";
const title = "Stoppuhr online mit Rundenzeiten";
const description =
  "Kostenlose Online-Stoppuhr mit Hundertstelsekunden und Rundenzeiten: schnellste und langsamste Runde, Export als CSV, Vollbild. Läuft im Browser, ohne Anmeldung.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, ...timeToolAlternates("stopwatch") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "Wie genau misst die Stoppuhr?",
    answer: "Sie zeigt Hundertstelsekunden und rechnet mit der Systemuhr des Geräts. Für Training, Unterricht und Alltag reicht das völlig; bei offiziellen Wettkämpfen gilt die elektronische Zeitmessung.",
  },
  {
    question: "Was ist der Unterschied zwischen Runden- und Gesamtzeit?",
    answer: "Die Rundenzeit misst eine einzelne Runde seit dem letzten Drücken auf „Runde“, die Gesamtzeit läuft seit dem Start durch. Beide stehen in der Liste; die schnellste und die langsamste Runde sind markiert.",
  },
  {
    question: "Läuft die Stoppuhr weiter, wenn ich den Tab wechsle?",
    answer: "Ja. Die Zeit wird an der echten Uhrzeit gemessen und nicht angehalten, wenn der Tab im Hintergrund ist.",
  },
  {
    question: "Kann ich die Rundenzeiten speichern?",
    answer: "Ja. „Runden herunterladen (CSV)“ speichert eine Tabelle, die sich in Excel, Numbers oder LibreOffice öffnen lässt.",
  },
];

export default function StoppuhrPage() {
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: path, label: "Stoppuhr" },
        ]}
        crumbLabel="Brotkrumen"
        title="Online-Stoppuhr"
        intro="„Start“ drücken, mit „Runde“ Zwischenzeiten festhalten und mit „Stopp“ anhalten. Die Liste zeigt jede Rundenzeit, die Gesamtzeit sowie die schnellste und langsamste Runde."
        tool={<Stopwatch locale="de" />}
        related={{ title: "Das könnte Sie auch interessieren", links: timeToolsRelatedDe(path) }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "anleitung", label: "So funktioniert die Stoppuhr" },
          { id: "einsatz", label: "Typische Einsätze" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="anleitung">So funktioniert die Stoppuhr</h2>
        <ol>
          <li>„Start“ drücken – die Zeit läuft in Minuten, Sekunden und Hundertstel.</li>
          <li>„Runde“ drücken, um eine Zwischenzeit zu speichern, ohne die Uhr anzuhalten.</li>
          <li>„Stopp“ hält an, erneutes „Start“ läuft weiter; „Zurücksetzen“ beginnt von vorn.</li>
          <li>Die Rundenliste lässt sich als CSV-Datei herunterladen.</li>
        </ol>

        <h2 id="einsatz">Typische Einsätze</h2>
        <ul>
          <li>Laufen und Schwimmen: Rundenzeiten auf der 400-Meter-Bahn oder pro Bahn im Becken.</li>
          <li>Sportunterricht: Zeiten beim Sprint, Pendellauf oder Zirkeltraining.</li>
          <li>Präsentationen und Referate: Redezeit im Blick behalten.</li>
          <li>Küche und Labor: Wie lange dauert ein Arbeitsschritt wirklich?</li>
        </ul>
      </TimeToolPage>
    </div>
  );
}
