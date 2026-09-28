import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { austrianHolidays, fenstertage, LANDESPATRONE, weekdayHolidayCount } from "../../converter/time/austrianHolidays";
import { formatDe, formatDeShort, todayBerlin, weekdayDe, weekdayDeShort } from "../../converter/time/germanDates";
import { addDaysYmd, weekdayOf, ymdKey } from "../../converter/time/dateMath";
import { calendarRelated } from "../../i18n/germanCalendarTools";
import { seoTitle } from "../../seoTitle";
import { buildSiteUrl } from "../../siteConfig";

export const revalidate = 86400;

const path = "/de/feiertage-oesterreich";

export function generateMetadata(): Metadata {
  const year = todayBerlin().year;
  const title = `Feiertage Österreich ${year}: alle 13 Termine`;
  const description = `Alle 13 gesetzlichen Feiertage in Österreich ${year} und ${year + 1} mit Datum und Wochentag, dazu Fenstertage, Landespatrone der Bundesländer und der persönliche Feiertag.`;
  return {
    title: seoTitle(title, `Feiertage Österreich ${year}`),
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "de_AT", type: "website" },
  };
}

// Österreichische Monatsnamen: Jänner statt Januar.
const formatAt = (date: Parameters<typeof formatDe>[0]) => formatDe(date, { day: "numeric", month: "long" }).replace("Januar", "Jänner");

function HolidayTable({ year }: { year: number }) {
  return (
    <div className="holiday-table-wrap">
      <table className="holiday-table">
        <thead>
          <tr>
            <th scope="col">Datum</th>
            <th scope="col">Feiertag</th>
            <th scope="col">Wochentag</th>
          </tr>
        </thead>
        <tbody>
          {austrianHolidays(year).map((h) => (
            <tr key={h.id}>
              <td>{formatDeShort(h.date)}</td>
              <td>{h.name}</td>
              <td>{weekdayDe(h.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FenstertageList({ year }: { year: number }) {
  const list = fenstertage(year);
  if (list.length === 0) return <p>{year} fällt kein Feiertag auf einen Dienstag oder Donnerstag.</p>;
  return (
    <ul>
      {list.map((f) => (
        <li key={f.holiday}>
          <strong>
            {weekdayDeShort(f.bridge)} {formatDeShort(f.bridge)}
          </strong>{" "}
          – Fenstertag zu {f.holiday} ({weekdayDe(f.holidayDate)}, {formatAt(f.holidayDate)}): ein Urlaubstag ergibt vier freie Tage.
        </li>
      ))}
    </ul>
  );
}

function workdays(year: number) {
  let n = 0;
  for (let date = { year, month: 1, day: 1 }; date.year === year; date = addDaysYmd(date, 1)) {
    const w = weekdayOf(date);
    if (w >= 1 && w <= 5) n++;
  }
  return n;
}

export default function FeiertageOesterreichPage() {
  const todayYmd = todayBerlin();
  const year = todayYmd.year;
  const today = ymdKey(todayYmd);
  const upcoming = [...austrianHolidays(year), ...austrianHolidays(year + 1)].find((h) => ymdKey(h.date) >= today)!;
  const onWeekdays = weekdayHolidayCount(year);
  const onWeekdaysNext = weekdayHolidayCount(year + 1);

  const faqItems: FaqItem[] = [
    {
      question: `Wie viele Feiertage hat Österreich ${year}?`,
      answer: `Österreich hat 13 gesetzliche Feiertage, bundesweit einheitlich. ${year} fallen ${onWeekdays} davon auf einen Werktag (Montag bis Freitag), ${year + 1} sind es ${onWeekdaysNext}.`,
    },
    {
      question: "Ist der Karfreitag in Österreich ein Feiertag?",
      answer:
        "Nein, seit 2019 nicht mehr. Der frühere Feiertag für Angehörige der evangelischen, altkatholischen und methodistischen Kirche wurde gestrichen. Stattdessen gibt es den persönlichen Feiertag.",
    },
    {
      question: "Was ist der persönliche Feiertag?",
      answer:
        "Jede Arbeitnehmerin und jeder Arbeitnehmer kann einmal im Jahr einen Urlaubstag einseitig festlegen (§ 7a Arbeitsruhegesetz). Der Tag muss spätestens drei Monate vorher schriftlich bekannt gegeben werden und wird vom Urlaubsanspruch abgezogen – es ist also kein zusätzlicher freier Tag.",
    },
    {
      question: "Sind die Landesfeiertage (Landespatrone) gesetzliche Feiertage?",
      answer:
        "Nein. Tage wie Leopold (15. November) in Wien und Niederösterreich oder Josef (19. März) in Kärnten, Steiermark, Tirol und Vorarlberg stehen nicht im Arbeitsruhegesetz. Es besteht kein Anspruch auf Arbeitsruhe; oft sind aber Schulen und Landesdienststellen geschlossen, und manche Kollektivverträge sehen einen freien Tag vor.",
    },
    {
      question: "Haben Geschäfte am 8. Dezember offen?",
      answer:
        "Ja, viele. Mariä Empfängnis ist ein gesetzlicher Feiertag, der Handel darf aber seit 1995 von 10 bis 18 Uhr aufsperren. Beschäftigte können die Arbeit an diesem Tag ablehnen; wer arbeitet, erhält Feiertagsentgelt.",
    },
    {
      question: "Sind Heiliger Abend und Silvester Feiertage?",
      answer: "Nein. Der 24. und 31. Dezember sind in Österreich keine gesetzlichen Feiertage, auch wenn viele Betriebe früher schließen oder Kollektivverträge frei geben.",
    },
    {
      question: "Wird ein Feiertag am Wochenende nachgeholt?",
      answer: "Nein. Fällt ein Feiertag auf einen Samstag oder Sonntag, gibt es keinen Ersatztag.",
    },
  ];

  return (
    <div lang="de-AT">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: "/de/feiertage", label: "Feiertage" },
          { href: path, label: "Österreich" },
        ]}
        crumbLabel="Brotkrumen"
        title={`Feiertage Österreich ${year}`}
        intro={`Alle 13 gesetzlichen Feiertage ${year} und ${year + 1} mit Wochentag, die Fenstertage für lange Wochenenden und die Tage der Landespatrone je Bundesland.`}
        tool={
          <div className="holiday-stats">
            <div>
              <strong>13</strong>
              <span>gesetzliche Feiertage</span>
            </div>
            <div>
              <strong>{formatDe(upcoming.date, { day: "2-digit", month: "2-digit" }).replace(/\.?$/, ".")}</strong>
              <span>nächster: {upcoming.name}</span>
            </div>
            <div>
              <strong>{workdays(year) - onWeekdays}</strong>
              <span>Arbeitstage {year} (Mo–Fr)</span>
            </div>
            <div>
              <strong>{fenstertage(year).length}</strong>
              <span>Fenstertage {year}</span>
            </div>
          </div>
        }
        related={{
          title: "Das könnte Sie auch interessieren",
          links: [{ href: "/de/feiertage", label: "Feiertage in Deutschland" }, ...calendarRelated(path).filter((l) => l.href !== "/de/feiertage")],
        }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "jahr", label: `Feiertage ${year}` },
          { id: "fenstertage", label: "Fenstertage" },
          { id: "landespatrone", label: "Landespatrone" },
          { id: "naechstes", label: `Feiertage ${year + 1}` },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="jahr">Gesetzliche Feiertage in Österreich {year}</h2>
        <HolidayTable year={year} />
        <p>
          Die Feiertage sind in § 7 des Arbeitsruhegesetzes festgelegt und gelten in allen Bundesländern gleich. Ostermontag, Christi Himmelfahrt,
          Pfingstmontag und Fronleichnam richten sich nach dem Osterdatum und wandern jedes Jahr.
        </p>

        <h2 id="fenstertage">Fenstertage {year} und {year + 1}</h2>
        <p>
          Liegt ein Feiertag auf einem Dienstag oder Donnerstag, entsteht ein Fenstertag: Mit einem Urlaubstag ergeben sich vier freie Tage am Stück.
        </p>
        <h3>{year}</h3>
        <FenstertageList year={year} />
        <h3>{year + 1}</h3>
        <FenstertageList year={year + 1} />

        <h2 id="landespatrone">Landespatrone und Landesfeiertage</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Datum</th>
                <th scope="col">Tag</th>
                <th scope="col">Bundesland</th>
              </tr>
            </thead>
            <tbody>
              {LANDESPATRONE.map((p) => {
                const date = { year, month: p.month, day: p.day };
                return (
                  <tr key={p.id}>
                    <td>
                      {weekdayDeShort(date)} {formatDeShort(date)}
                    </td>
                    <td>{p.name}</td>
                    <td>{p.states.join(", ")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p>
          Diese Tage sind keine gesetzlichen Feiertage. Arbeitnehmerinnen und Arbeitnehmer haben keinen Anspruch auf frei, sofern der Kollektivvertrag
          nichts anderes vorsieht; Schulen und Landesdienststellen sind im jeweiligen Bundesland aber meist geschlossen.
        </p>

        <h2 id="naechstes">Gesetzliche Feiertage in Österreich {year + 1}</h2>
        <HolidayTable year={year + 1} />
        <p>
          Wie viele Arbeitstage zwischen zwei Daten liegen, berechnet der <Link href="/de/tagerechner">Tagerechner</Link>; die Feiertage in
          Deutschland nach Bundesland finden Sie unter <Link href="/de/feiertage">Feiertage Deutschland</Link>.
        </p>
        <p>
          <small>
            Quelle: Arbeitsruhegesetz (ARG) § 7 und § 7a, Rechtsinformationssystem des Bundes. Bewegliche Feiertage sind aus dem Osterdatum berechnet.
            Angaben ohne Gewähr.
          </small>
        </p>
      </TimeToolPage>
    </div>
  );
}
