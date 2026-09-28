import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import CountdownTimer from "../../components/time/CountdownTimer";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { timerPathDe, timerPresetLinksDe, timerTitleDe, timeToolsRelatedDe } from "../../i18n/germanTimeTools";
import { timeToolAlternates } from "../../i18n/timeToolPaths";
import { timerPresets } from "../../i18n/timerPresets";
import { buildSiteUrl } from "../../siteConfig";

const path = "/de/timer";
const title = "Timer online: Countdown mit Alarm";
const description =
  "Kostenloser Online-Timer: Zeit wählen, Start drücken, am Ende ertönt ein Signal. Schnellauswahl von 10 Sekunden bis 24 Stunden, Vollbild, Pause und +1 Minute.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, ...timeToolAlternates("timer") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "Läuft der Timer weiter, wenn ich den Tab wechsle?",
    answer: "Ja. Die Zeit wird an der echten Uhrzeit gemessen, der Timer endet also pünktlich, auch im Hintergrund. Nur den Tab nicht schließen; auf dem Handy „Bildschirm anlassen“ aktivieren.",
  },
  {
    question: "Was passiert, wenn die Zeit um ist?",
    answer: "Der gewählte Ton spielt, der Ring ist voll und der Tab-Titel blinkt. Mit „Ton aus“ stoppen Sie das Signal oder starten dieselbe Zeit neu.",
  },
  {
    question: "Kann ich den Timer im Vollbild zeigen, etwa im Unterricht?",
    answer: "Ja. „Vollbild“ unter dem Timer drücken. Die große Anzeige ist auch von hinten im Klassenzimmer, bei Präsentationen oder Prüfungen gut lesbar.",
  },
  {
    question: "Wie lange kann der Timer laufen?",
    answer: "Bis zu 99 Stunden. Stunden, Minuten und Sekunden lassen sich frei eingeben.",
  },
];

export default function GermanTimerPage() {
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: path, label: "Timer" },
        ]}
        crumbLabel="Brotkrumen"
        title="Online-Timer"
        intro="Eine Schnellauswahl antippen oder eigene Zeit eingeben und „Start“ drücken. Ist die Zeit um, ertönt ein Signal. Pausieren, eine Minute hinzufügen oder Vollbild – alles direkt im Browser."
        tool={<CountdownTimer locale="de" presetLinks={timerPresetLinksDe()} />}
        related={{ title: "Das könnte Sie auch interessieren", links: timeToolsRelatedDe(path) }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "anleitung", label: "So funktioniert der Timer" },
          { id: "zeiten", label: "Timer nach Dauer" },
          { id: "anlaesse", label: "Beliebte Anlässe" },
          { id: "genauigkeit", label: "Wie genau ist der Timer?" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="anleitung">So funktioniert der Timer</h2>
        <ol>
          <li>Eine Schnellauswahl (1, 5, 10, 30 Minuten …) antippen oder Stunden, Minuten und Sekunden eingeben.</li>
          <li>„Start“ drücken. Ring und Tab-Titel zeigen die Restzeit, darunter steht die Endzeit.</li>
          <li>Bei Bedarf „Pause“, „+1 Min.“ oder „Zurücksetzen“.</li>
          <li>Ist die Zeit um, spielt der gewählte Ton – auf Wunsch Ihre eigene Musik.</li>
        </ol>

        <h2 id="zeiten">Timer nach Dauer</h2>
        <p>Jede Dauer hat eine eigene Seite mit fertig eingestelltem Countdown, die Sie als Lesezeichen speichern können:</p>
        <div className="time-tool-chips">
          {timerPresets.map((p) => (
            <Link key={p.seconds} href={timerPathDe(p)} prefetch={false}>
              {timerTitleDe(p)}
            </Link>
          ))}
        </div>

        <h2 id="anlaesse">Beliebte Anlässe</h2>
        <ul>
          <li>
            Küche: Frühstücksei (4 bis 10 Minuten, siehe <Link href="/de/eieruhr">Eieruhr</Link>), Nudeln (8 bis 12 Minuten), Tee (2 bis 5 Minuten).
          </li>
          <li>
            Lernen und Arbeiten: 25 Minuten konzentriert, 5 Minuten Pause; eine Schulstunde dauert 45 Minuten, eine Doppelstunde 90.
          </li>
          <li>Sport: Plank, Dehnen, Satzpausen und Tabata (20 Sekunden Belastung, 10 Sekunden Pause).</li>
          <li>Alltag: Stoßlüften, Zähneputzen (2 Minuten), Parkzeit im Blick behalten.</li>
        </ul>

        <h2 id="genauigkeit">Wie genau ist der Timer?</h2>
        <p>
          Der Timer liest bei jeder Aktualisierung die echte Uhrzeit. Selbst wenn der Browser Hintergrund-Tabs drosselt, läuft die Restzeit nicht
          davon, und das Signal kommt im richtigen Moment. Die Lautstärke hängt vom Gerät ab – prüfen Sie sie vorher mit „Ton testen“.
        </p>
      </TimeToolPage>
    </div>
  );
}
