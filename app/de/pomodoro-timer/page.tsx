import { seoTitle } from "../../seoTitle";
import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import PomodoroTimer from "../../components/time/PomodoroTimer";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { timeToolsRelatedDe } from "../../i18n/germanTimeTools";
import { timeToolAlternates } from "../../i18n/timeToolPaths";
import { buildSiteUrl } from "../../siteConfig";

const path = "/de/pomodoro-timer";
const title = "Pomodoro-Timer: 25 Minuten Fokus, 5 Minuten Pause";
const description =
  "Kostenloser Pomodoro-Timer zum Lernen und Arbeiten: 25 Minuten Fokus, 5 Minuten Pause, nach 4 Runden eine lange Pause. Mit Aufgabe, Benachrichtigung und Tagesstatistik.";

export const metadata: Metadata = {
  title: seoTitle(title, "Pomodoro-Timer: 25 Minuten Fokus"),
  description,
  alternates: { canonical: path, ...timeToolAlternates("pomodoro") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "Was ist die Pomodoro-Technik?",
    answer: "Eine Zeitmanagement-Methode, die Francesco Cirillo Ende der 1980er-Jahre entwickelt hat: 25 Minuten an einer Aufgabe arbeiten, dann 5 Minuten Pause. Nach vier Runden folgt eine längere Pause von 15 bis 30 Minuten. Der Name stammt von Cirillos Küchenwecker in Tomatenform (italienisch „pomodoro“).",
  },
  {
    question: "Warum gerade 25 Minuten?",
    answer: "25 Minuten sind lang genug, um in eine Aufgabe hineinzukommen, und kurz genug, um konzentriert zu bleiben. Alle Zeiten lassen sich in den Einstellungen ändern; für längere Arbeitsphasen ist 50/10 beliebt.",
  },
  {
    question: "Eignet sich Pomodoro zum Lernen für Prüfungen?",
    answer: "Ja. Gerade beim Lernen für Klausuren und das Abitur hilft der feste Rhythmus, Pausen wirklich einzuhalten. Planen Sie für jede Runde ein klares Ziel, etwa ein Kapitel oder zehn Aufgaben.",
  },
  {
    question: "Werden meine Pomodoros gespeichert?",
    answer: "Ja, die Runden und die Fokuszeit von heute bleiben in diesem Browser gespeichert und werden am nächsten Tag zurückgesetzt. Es werden keine Daten an einen Server gesendet.",
  },
];

export default function PomodoroPage() {
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: path, label: "Pomodoro-Timer" },
        ]}
        crumbLabel="Brotkrumen"
        title="Pomodoro-Timer"
        intro="Aufgabe eintragen, „Start“ drücken und 25 Minuten konzentriert arbeiten. Danach folgt automatisch eine kurze Pause, nach vier Runden eine lange. Die Zeiten lassen sich anpassen."
        tool={<PomodoroTimer lang="de" />}
        related={{ title: "Das könnte Sie auch interessieren", links: [{ href: "/de/intervall-timer", label: "Intervall-Timer" }, ...timeToolsRelatedDe(path)] }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "ablauf", label: "So funktioniert Pomodoro" },
          { id: "tipps", label: "Tipps für Schule, Studium und Büro" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="ablauf">So funktioniert Pomodoro</h2>
        <ol>
          <li>Eine Aufgabe festlegen und eintragen.</li>
          <li>25 Minuten konzentriert daran arbeiten – ohne Handy, ohne E-Mails.</li>
          <li>5 Minuten Pause: aufstehen, lüften, etwas trinken.</li>
          <li>Nach vier Runden eine lange Pause von 15 bis 30 Minuten.</li>
        </ol>
        <p>
          Vier Pomodoros mit Pausen dauern etwa zwei Stunden – ungefähr so lange wie zwei Doppelstunden ohne Hofpause. Wer eine feste Zeit
          ohne Rundenwechsel braucht, nutzt den <Link href="/de/timer?s=1500">25-Minuten-Timer</Link>.
        </p>

        <h2 id="tipps">Tipps für Schule, Studium und Büro</h2>
        <ul>
          <li>Große Aufgaben in Pomodoro-große Stücke teilen, etwa „Kapitel 3 zusammenfassen“ statt „für die Klausur lernen“.</li>
          <li>Unterbrechungen notieren statt sofort zu erledigen und in der Pause abarbeiten.</li>
          <li>In der Pause weg vom Bildschirm: Bewegung und frische Luft helfen der Konzentration mehr als Scrollen.</li>
          <li>Abends die erledigten Pomodoros ansehen: So lässt sich der Aufwand für ähnliche Aufgaben künftig besser schätzen.</li>
        </ul>
      </TimeToolPage>
    </div>
  );
}
