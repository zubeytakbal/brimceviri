import { countdownEvents, upcomingOccurrences } from "../../converter/time/countdownEvents";
import type { FaqItem } from "../../converter/faqSchema";
import TimeToolPage from "../time/TimeToolPage";
import { customCountdownCopy } from "./countdownCopy";
import CustomCountdown from "./CustomCountdown";
import { eventSummary, formatEventDate } from "./CountdownEventPage";
import EventCountdownPicker from "./EventCountdownPicker";

// Deutsche Countdown-Übersicht: alle Anlässe (Weihnachten, Ostern, Oktoberfest …) auf einer Seite.

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
  // Alte Einzelseiten leiten mit ?anlass= hierher.
  const pickerEvents = events.map(({ event }) => ({
    slug: event.slug,
    name: event.name,
    zone: event.zone,
    targets: upcomingOccurrences(event, now, 6).map(({ year, month, day }) => ({ year, month, day })),
  }));
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
        <EventCountdownPicker events={pickerEvents} lang="de" param="anlass" />
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
                    <a href={`#${event.slug}`}>{event.name}</a>
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
        {events.map(({ event, days, started }) => (
          <section key={event.id} id={event.slug}>
            <h2>{event.question}</h2>
            <p>
              <strong>
                {upcomingOccurrences(event, now, 6)
                  .map((d) => `${d.year}: ${formatEventDate(d, "de")}`)
                  .join(" · ")}
              </strong>
            </p>
            <p>
              {event.about} {event.holiday}
            </p>
            <p>
              <a href={`?anlass=${event.slug}#sayac`} rel="nofollow">
                Live-Countdown bis {event.name} ({dayLabel(days, started)})
              </a>
            </p>
          </section>
        ))}
      </TimeToolPage>
    </div>
  );
}

