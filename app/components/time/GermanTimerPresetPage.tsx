import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";
import { timerLabelDe, timerPathDe, timerPresetLinksDe, timerTitleDe, timerUsesDe } from "../../i18n/germanTimeTools";
import { timerPresets, type TimerPreset } from "../../i18n/timerPresets";
import CountdownTimer from "./CountdownTimer";
import TimeToolPage from "./TimeToolPage";

// Deutsche Timer-Seite für eine feste Dauer: Anlässe, Umrechnung, Endzeiten.

const n = (value: number, digits = 3) => value.toLocaleString("de-DE", { maximumFractionDigits: digits });

export default function GermanTimerPresetPage({ preset }: { preset: TimerPreset }) {
  const s = preset.seconds;
  const label = timerLabelDe(preset);
  const title = timerTitleDe(preset);
  const path = timerPathDe(preset);
  const index = timerPresets.indexOf(preset);
  const neighbors = timerPresets.filter((_, i) => i !== index && Math.abs(i - index) <= 4);
  const uses = timerUsesDe[s] ?? [];

  const conversions = [
    ["Sekunden", n(s)],
    ["Minuten", n(s / 60)],
    ["Stunden", n(s / 3600, 4)],
    ["Millisekunden", n(s * 1000)],
  ];

  const endTimes = [
    [7, 0],
    [12, 30],
    [18, 0],
    [22, 45],
  ].map(([h, m]) => {
    const endSec = (h * 60 + m) * 60 + s;
    const day = Math.floor(endSec / 86400);
    const norm = endSec % 86400;
    const clock = (sec: number) => {
      const hh = Math.floor(sec / 3600);
      const mm = Math.floor((sec % 3600) / 60);
      const ss = sec % 60;
      return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}${ss ? `:${String(ss).padStart(2, "0")}` : ""} Uhr`;
    };
    const note = day === 0 ? "" : day === 1 ? " (am nächsten Tag)" : ` (+${day} Tage)`;
    return { start: clock((h * 60 + m) * 60), end: `${clock(norm)}${note}` };
  });

  const facts = [
    ["Gehen (5 km/h)", `${n((5 * s) / 3600, 2)} km`],
    ["Joggen (10 km/h)", `${n((10 * s) / 3600, 2)} km`],
    ["Radfahren (18 km/h)", `${n((18 * s) / 3600, 2)} km`],
    ["Herzschläge (70 pro Minute)", `etwa ${n(Math.round((70 * s) / 60), 0)}`],
    ["Anteil an einem Tag", `${n((s / 86400) * 100, 2)} %`],
  ];

  const faqItems: FaqItem[] = [
    { question: `Wie viele Sekunden sind ${label}?`, answer: `${label} = ${n(s)} Sekunden = ${n(s / 60)} Minuten = ${n(s / 3600, 4)} Stunden.` },
    {
      question: `Läuft der ${title} im Hintergrund weiter?`,
      answer: "Ja. Die Zeit wird an der echten Uhrzeit gemessen, der Timer endet also pünktlich, auch wenn Sie den Tab wechseln. Nur den Tab nicht schließen; auf dem Handy „Bildschirm anlassen“ aktivieren.",
    },
    {
      question: "Kann ich meine eigene Musik als Signalton verwenden?",
      answer: "Ja. Wählen Sie beim Ton „Eigener Ton“ und eine Audiodatei von Ihrem Gerät. Sie bleibt nur in diesem Browser und wird nicht hochgeladen.",
    },
  ];

  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: "/de/timer", label: "Timer" },
          { href: path, label: title },
        ]}
        crumbLabel="Brotkrumen"
        title={title}
        intro={`Der Countdown über ${label} (${n(s)} Sekunden) ist eingestellt. „Start“ drücken – ist die Zeit um, ertönt ein Signal, und die Endzeit steht auf dem Bildschirm.`}
        tool={<CountdownTimer locale="de" initialSeconds={s} presetLinks={timerPresetLinksDe()} />}
        related={{
          title: "Andere Zeiten",
          links: [
            ...neighbors.map((p) => ({ href: timerPathDe(p), label: timerTitleDe(p) })),
            { href: "/de/timer", label: "Alle Timer" },
            { href: "/de/eieruhr", label: "Eieruhr" },
            { href: "/de/stoppuhr", label: "Stoppuhr" },
            { href: "/de/wecker", label: "Wecker" },
          ],
        }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "anlaesse", label: `Wofür reichen ${label}?` },
          { id: "umrechnung", label: `${label} umgerechnet` },
          { id: "ende", label: "Wann ist die Zeit um?" },
          { id: "in-dieser-zeit", label: "Was passiert in dieser Zeit?" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="anlaesse">Wofür reichen {label}?</h2>
        <ul>
          {uses.map((use) => (
            <li key={use}>{use}</li>
          ))}
        </ul>

        <h2 id="umrechnung">{label} umgerechnet</h2>
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <tbody>
              {conversions.map(([unit, value]) => (
                <tr key={unit}>
                  <th scope="row">{unit}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="ende">Wann ist die Zeit um?</h2>
        <p>Nach dem Start zeigt der Timer die Endzeit an. Beispiele, wann {label} ablaufen:</p>
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <thead>
              <tr>
                <th scope="col">Start</th>
                <th scope="col">Ende</th>
              </tr>
            </thead>
            <tbody>
              {endTimes.map((row) => (
                <tr key={row.start}>
                  <td>{row.start}</td>
                  <td>{row.end}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="in-dieser-zeit">Was passiert in dieser Zeit?</h2>
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <tbody>
              {facts.map(([what, value]) => (
                <tr key={what}>
                  <th scope="row">{what}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          <small>Berechnet mit typischen Durchschnittswerten; im Einzelfall abweichend.</small>
        </p>
        <p>
          Für eine andere Dauer nutzen Sie den <Link href="/de/timer">Online-Timer</Link>; Zeiteinheiten rechnet die{" "}
          <Link href="/de/kategorien/zeit">Zeitumrechnung</Link> um.
        </p>
      </TimeToolPage>
    </div>
  );
}
