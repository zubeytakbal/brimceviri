import { DE_TAGE, deBesondererTagPfad } from "../../converter/calendar/deKalender";
import Link from "@/app/components/SiteLink";
import {
  countdownEvents,
  countdownPath,
  daysUntil,
  hasStarted,
  upcomingOccurrences,
  type CountdownEvent,
} from "../../converter/time/countdownEvents";
import type { FaqItem } from "../../converter/faqSchema";
import TimeToolPage from "../time/TimeToolPage";
import CountdownDisplay from "./CountdownDisplay";
import { countdownCopy, customCountdownCopy } from "./countdownCopy";
import CustomCountdown from "./CustomCountdown";
import { eventSummary, formatEventDate } from "./CountdownEventPage";

// Deutsche Countdown-Seiten: Übersicht und einzelne Anlässe (Weihnachten, Ostern, Oktoberfest …).

function weeksAndDaysDe(days: number) {
  const weeks = Math.floor(days / 7);
  const rest = days % 7;
  const d = (n: number) => `${n} ${n === 1 ? "Tag" : "Tage"}`;
  return weeks ? `${weeks} ${weeks === 1 ? "Woche" : "Wochen"}${rest ? ` und ${d(rest)}` : ""}` : d(rest);
}

const germanEvents = () => countdownEvents.filter((e) => e.lang === "de");

function upcomingGerman(now: Date) {
  return germanEvents()
    .map((event) => ({ event, ...eventSummary(event, now) }))
    .filter((item) => item.next)
    .sort((a, b) => (a.days ?? 0) - (b.days ?? 0));
}

const dayLabel = (days: number | null, started: boolean) =>
  days === 0 ? (started ? "Heute" : "weniger als 1 Tag") : `${days} ${days === 1 ? "Tag" : "Tage"}`;

const baseLinks = [
  { href: "/de/feiertage", label: "Feiertage und Brückentage" },
  { href: "/de/tagerechner", label: "Tagerechner" },
  { href: "/de/kalenderwoche", label: "Aktuelle Kalenderwoche" },
  { href: "/de/timer", label: "Timer" },
  { href: "/de/online-uhr", label: "Online-Uhr" },
];

export function GermanCountdownHub() {
  const now = new Date();
  const events = upcomingGerman(now);
  const faqItems: FaqItem[] = [
    {
      question: "Bis zu welcher Uhrzeit zählen die Countdowns?",
      answer: "Bis Mitternacht zu Beginn des jeweiligen Tages, in Ihrer eigenen Zeitzone. Der Weihnachts-Countdown zählt bis zum 24. Dezember, weil in Deutschland am Heiligabend beschert wird.",
    },
    {
      question: "Was passiert, wenn der Tag vorbei ist?",
      answer: "Die Seiten aktualisieren sich täglich und springen nach dem Anlass automatisch auf das nächste Jahr. Auch ein offener Countdown wechselt von selbst zum nächsten Termin.",
    },
    {
      question: "Wie werden bewegliche Termine wie Ostern berechnet?",
      answer: "Ostern mit der gaußschen Osterformel; Rosenmontag (48 Tage vorher), Christi Himmelfahrt (39 Tage danach) und Pfingsten (49 Tage danach) folgen daraus. Der 1. Advent ist der vierte Sonntag vor dem 25. Dezember, das Oktoberfest beginnt 15 Tage vor dem ersten Sonntag im Oktober.",
    },
    {
      question: "Kann ich einen eigenen Countdown teilen?",
      answer: "Ja. Unter Ihrem Countdown „Link zum Teilen kopieren“ drücken; wer den Link öffnet, sieht denselben Countdown.",
    },
  ];
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: "/de/countdown", label: "Countdown" },
        ]}
        crumbLabel="Brotkrumen"
        title="Countdown: Wie viele Tage noch?"
        intro="Wie lange noch bis Weihnachten, Ostern, Silvester oder zum Oktoberfest? Alle Anlässe in einer Liste – oder erstellen Sie einen eigenen Countdown für Geburtstag, Prüfung oder Urlaub und teilen Sie ihn."
        tool={<CustomCountdown lang="de" copy={customCountdownCopy.de} basePath="/de/countdown" />}
        related={{ title: "Das könnte Sie auch interessieren", links: baseLinks }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "anlaesse", label: "Die nächsten Anlässe" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="anlaesse">Die nächsten Anlässe</h2>
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <thead>
              <tr>
                <th>Anlass</th>
                <th>Datum</th>
                <th>Noch</th>
              </tr>
            </thead>
            <tbody>
              {events.map(({ event, next, days, started }) => (
                <tr key={event.id}>
                  <td>
                    <Link href={countdownPath(event)} prefetch={false}>
                      {event.name}
                    </Link>
                  </td>
                  <td>{formatEventDate(next!, "de")}</td>
                  <td>
                    <strong>{dayLabel(days, started)}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TimeToolPage>
    </div>
  );
}

export function GermanCountdownEventPage({ event }: { event: CountdownEvent }) {
  const now = new Date();
  const occurrences = upcomingOccurrences(event, now, 6);
  const next = occurrences[0];
  const days = next ? daysUntil(next, event.zone, now) : null;
  const started = next ? hasStarted(next, event.zone, now) : false;
  const dateText = next ? formatEventDate(next, "de") : "";
  const selfDays = eventSummary(event, now).days ?? 0;
  // Zeitlich nahe Anlässe zuerst: die Liste unterscheidet sich je Seite.
  const others = upcomingGerman(now)
    .filter((o) => o.event.id !== event.id)
    .sort((a, b) => Math.abs((a.days ?? 0) - selfDays) - Math.abs((b.days ?? 0) - selfDays));

  const until = event.untilDe ?? event.name;
  const daysSentence =
    days === null
      ? ""
      : days === 0 && !started
        ? `Bis ${until} ist es weniger als ein Tag.`
        : days === 0
          ? `Heute ist ${event.name}!`
          : `Bis ${until} sind es noch ${days} Tage (${weeksAndDaysDe(days)}).`;

  const faqItems: FaqItem[] = [
    { question: `Wann ist ${event.name}?`, answer: next ? `${event.name} ist das nächste Mal am ${dateText}.` : "Der Termin steht noch nicht fest." },
    { question: event.question, answer: `${daysSentence} Der Countdown zählt sekundengenau bis Mitternacht zu Beginn des Tages in Ihrer Zeitzone.` },
    { question: `Ist ${event.name} ein Feiertag?`, answer: event.holiday },
  ];

  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: "/de/countdown", label: "Countdown" },
          { href: countdownPath(event), label: event.name },
        ]}
        crumbLabel="Brotkrumen"
        title={event.question}
        intro={next ? `${event.name}: ${dateText}. ${daysSentence}` : ""}
        tool={
          <CountdownDisplay
            targets={occurrences.map(({ year, month, day }) => ({ year, month, day }))}
            zone={event.zone}
            lang="de"
            title={event.name}
            copy={countdownCopy.de}
          />
        }
        related={{
          title: "Das könnte Sie auch interessieren",
          links: [
            ...DE_TAGE.filter((t) => t.countdown === event.slug)
              .slice(0, 1)
              .map((t) => ({ href: deBesondererTagPfad(t.id), label: `${t.name}: Datum und Bedeutung` })),
            ...others.slice(0, 4).map((o) => ({ href: countdownPath(o.event), label: `${o.event.name} (${dayLabel(o.days, o.started)})` })),
            { href: "/de/countdown", label: "Alle Countdowns" },
            { href: "/de/kalender", label: "Kalender mit Feiertagen" },
            ...baseLinks.slice(0, 3),
          ],
        }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "ueberblick", label: "Datum und Restzeit" },
          { id: "jahre", label: `${event.name}: Termine der nächsten Jahre` },
          { id: "hintergrund", label: `Über ${event.name}` },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="ueberblick">Datum und Restzeit</h2>
        {next && (
          <div className="conversion-table-wrap">
            <table className="conversion-table city-facts-table">
              <tbody>
                <tr>
                  <th scope="row">Datum</th>
                  <td>{dateText}</td>
                </tr>
                <tr>
                  <th scope="row">Noch</th>
                  <td>{days === 0 ? dayLabel(days, started) : `${days} Tage · ${weeksAndDaysDe(days ?? 0)}`}</td>
                </tr>
                <tr>
                  <th scope="row">Feiertag?</th>
                  <td>{event.holiday}</td>
                </tr>
                {event.source && (
                  <tr>
                    <th scope="row">Quelle</th>
                    <td>{event.source}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <h2 id="jahre">{event.name}: Termine der nächsten Jahre</h2>
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <thead>
              <tr>
                <th>Jahr</th>
                <th>Datum</th>
              </tr>
            </thead>
            <tbody>
              {occurrences.map((parts) => (
                <tr key={parts.year}>
                  <td>{parts.year}</td>
                  <td>{formatEventDate(parts, "de")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="hintergrund">Über {event.name}</h2>
        <p>{event.about}</p>
        <p>
          Wie lange es noch bis zu anderen Anlässen ist, zeigt die <Link href="/de/countdown">Countdown-Übersicht</Link>; dort können Sie auch
          einen eigenen Countdown erstellen. Alle gesetzlichen Feiertage nach Bundesland finden Sie unter <Link href="/de/feiertage">Feiertage</Link>.
        </p>
      </TimeToolPage>
    </div>
  );
}
