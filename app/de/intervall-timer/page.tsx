import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import IntervalTimer from "../../components/time/IntervalTimer";
import TimeToolPage from "../../components/time/TimeToolPage";
import { intervalPresets } from "../../components/time/focusCopy";
import type { FaqItem } from "../../converter/faqSchema";
import { timeToolsRelatedDe } from "../../i18n/germanTimeTools";
import { timeToolAlternates } from "../../i18n/timeToolPaths";
import { buildSiteUrl } from "../../siteConfig";

const path = "/de/intervall-timer";
const title = "Intervall-Timer: Tabata, HIIT und EMOM";
const description =
  "Kostenloser Intervall-Timer fürs Training: Tabata 20/10, HIIT, EMOM, Boxrunden oder eigenes Programm – mit Sprachansage auf Deutsch, Pieptönen und Vollbild.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, ...timeToolAlternates("interval") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
};

const fmt = (s: number) => (s >= 60 ? `${Math.floor(s / 60)} Min.${s % 60 ? ` ${s % 60} s` : ""}` : `${s} s`);

const faqItems: FaqItem[] = [
  {
    question: "Was ist Tabata?",
    answer: "Ein Intervallprotokoll nach dem japanischen Sportwissenschaftler Izumi Tabata: 8 Runden mit 20 Sekunden maximaler Belastung und 10 Sekunden Pause, zusammen 4 Minuten.",
  },
  {
    question: "Was bedeutet EMOM?",
    answer: "„Every Minute on the Minute“: Zu Beginn jeder Minute eine feste Zahl an Wiederholungen, die restliche Zeit der Minute ist Pause.",
  },
  {
    question: "Kann der Timer die Phasen ansagen?",
    answer: "Ja. Mit „Sprachansage“ sagt der Browser „Los“, „Pause“ und „Fertig“ auf Deutsch an; zusätzlich piept es in den letzten drei Sekunden jeder Phase.",
  },
  {
    question: "Läuft der Timer weiter, wenn das Handy gesperrt wird?",
    answer: "Nur solange der Browser aktiv ist. „Bildschirm anlassen“ verhindert, dass das Handy während des Trainings in den Ruhezustand geht.",
  },
];

export default function IntervallTimerPage() {
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: path, label: "Intervall-Timer" },
        ]}
        crumbLabel="Brotkrumen"
        title="Intervall-Timer"
        intro="Ein fertiges Programm wählen – Tabata, HIIT, EMOM oder Boxrunden – oder eigene Belastungs- und Pausenzeiten eingeben. Sprachansage und Pieptöne führen durch das Training."
        tool={<IntervalTimer lang="de" />}
        related={{ title: "Das könnte Sie auch interessieren", links: [{ href: "/de/pomodoro-timer", label: "Pomodoro-Timer" }, ...timeToolsRelatedDe(path)] }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "programme", label: "Die Programme im Überblick" },
          { id: "tipps", label: "Tipps fürs Intervalltraining" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="programme">Die Programme im Überblick</h2>
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <thead>
              <tr>
                <th>Programm</th>
                <th>Belastung</th>
                <th>Pause</th>
                <th>Runden</th>
                <th>Dauer</th>
              </tr>
            </thead>
            <tbody>
              {intervalPresets.map((p) => (
                <tr key={p.id}>
                  <td>{p.de}</td>
                  <td>{fmt(p.work)}</td>
                  <td>{p.rest ? fmt(p.rest) : "–"}</td>
                  <td>{p.rounds}</td>
                  <td>{fmt(p.prepare + p.rounds * p.work + (p.rounds - 1) * p.rest)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          <small>Dauer inklusive 10 Sekunden Vorbereitung, ohne Pause nach der letzten Runde.</small>
        </p>

        <h2 id="tipps">Tipps fürs Intervalltraining</h2>
        <ul>
          <li>Vorher 5 bis 10 Minuten aufwärmen, danach locker auslaufen und dehnen.</li>
          <li>Bei Tabata wirklich an die Grenze gehen – die kurzen Pausen sind Teil der Methode.</li>
          <li>Anfänger starten mit längeren Pausen, etwa 30/30, und steigern sich zu 40/20.</li>
          <li>
            Für feste Satzpausen beim Krafttraining eignet sich der <Link href="/de/timer/90-sekunden">90-Sekunden-Timer</Link>, für Zeiten
            und Runden die <Link href="/de/stoppuhr">Stoppuhr</Link>.
          </li>
        </ul>
      </TimeToolPage>
    </div>
  );
}
