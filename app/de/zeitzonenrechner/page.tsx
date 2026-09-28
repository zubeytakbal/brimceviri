import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import TimeToolPage from "../../components/time/TimeToolPage";
import TimeZoneConverter, { type ConverterCopy } from "../../components/world/TimeZoneConverter";
import type { FaqItem } from "../../converter/faqSchema";
import { nthWeekdayYmd } from "../../converter/time/dateMath";
import { formatDeLong, todayBerlin } from "../../converter/time/germanDates";
import { cityNameDe, germanZoneOptions } from "../../converter/time/germanWorld";
import { differenceMinutes } from "../../converter/time/timezones";
import { worldCities } from "../../converter/time/worldCities";
import { calendarRelated } from "../../i18n/germanCalendarTools";
import { timeToolAlternates } from "../../i18n/timeToolPaths";
import { seoTitle } from "../../seoTitle";
import { buildSiteUrl } from "../../siteConfig";

export const revalidate = 86400;

const path = "/de/zeitzonenrechner";

export const metadata: Metadata = {
  title: seoTitle("Zeitzonenrechner: Zeitverschiebung weltweit berechnen"),
  description:
    "Uhrzeit zwischen Zeitzonen umrechnen: Deutschland (MEZ/MESZ) in New York, Tokio, Dubai und 90 weitere Städte, mit Sommerzeit, Meeting-Planer und Tabelle der Zeitverschiebung.",
  alternates: { canonical: path, ...timeToolAlternates("timeZoneConverter") },
  openGraph: {
    title: "Zeitzonenrechner: Zeitverschiebung weltweit berechnen",
    description: "Uhrzeiten zwischen Zeitzonen umrechnen, mit Sommerzeit und Meeting-Planer.",
    url: buildSiteUrl(path),
    siteName: "BirimCeviri.app",
    locale: "de_DE",
    type: "website",
  },
};

const COPY: ConverterCopy = {
  from: "Ausgangszeitzone",
  to: "Zielzeitzone",
  date: "Datum",
  time: "Uhrzeit",
  now: "Jetzt",
  swap: "Tauschen",
  add: "Zeitzone hinzufügen",
  remove: "Entfernen",
  share: "Link zum Teilen kopieren",
  copied: "Kopiert ✓",
  planner: "Meeting-Planer",
  plannerHint: "Die Spalten sind die 24 Stunden der Ausgangszeitzone. Grün: Arbeitszeit (9–18 Uhr), dunkel: Nacht. Tippen Sie auf eine Stunde, um sie auszuwählen.",
  abbrGroup: "Zeitzonen",
  cityGroup: "Städte",
  work: "Arbeitszeit",
  night: "Nacht",
  nextDay: "Folgetag",
  prevDay: "Vortag",
};

const TABLE_CITIES = ["london", "new-york", "los-angeles", "istanbul", "moscow", "dubai", "new-delhi", "beijing", "tokyo", "sydney", "sao-paulo", "mexico-city"];

function hours(minutes: number) {
  if (minutes === 0) return "±0";
  const sign = minutes > 0 ? "+" : "−";
  const a = Math.abs(minutes);
  return `${sign}${Math.floor(a / 60)}${a % 60 ? `:${String(a % 60).padStart(2, "0")}` : ""} Std.`;
}

export default function ZeitzonenrechnerPage() {
  const today = todayBerlin();
  const year = today.year;
  const winter = new Date(Date.UTC(year, 0, 15, 12));
  const summer = new Date(Date.UTC(year, 6, 15, 12));
  const rows = TABLE_CITIES.map((id) => worldCities.find((c) => c.en === id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .map((c) => ({ c, w: differenceMinutes("Europe/Berlin", c.timeZone, winter), s: differenceMinutes("Europe/Berlin", c.timeZone, summer) }));
  const march = nthWeekdayYmd(year, 3, 0, -1);
  const october = nthWeekdayYmd(year, 10, 0, -1);

  const faqItems: FaqItem[] = [
    { question: "Wie viele Stunden Zeitverschiebung hat Deutschland zu New York?", answer: "Meist 6 Stunden: In New York ist es 6 Stunden früher. Weil die USA die Uhren im März zwei bis drei Wochen früher umstellen und im November eine Woche später zurückstellen, sind es in diesen Wochen nur 5 Stunden." },
    { question: "Was bedeuten MEZ und MESZ?", answer: "MEZ ist die Mitteleuropäische Zeit (UTC+1), die im Winter gilt. MESZ ist die Mitteleuropäische Sommerzeit (UTC+2) vom letzten Sonntag im März bis zum letzten Sonntag im Oktober." },
    { question: `Wann ist die Zeitumstellung ${year}?`, answer: `Am ${formatDeLong(march)} werden die Uhren um 2 Uhr auf 3 Uhr vorgestellt, am ${formatDeLong(october)} um 3 Uhr auf 2 Uhr zurückgestellt.` },
    { question: "Wird die Zeitumstellung abgeschafft?", answer: "Das Europäische Parlament hat 2019 für ein Ende der Zeitumstellung gestimmt, die Mitgliedstaaten haben sich bisher aber nicht auf eine gemeinsame Zeit geeinigt. Bis dahin wird weiter zweimal im Jahr umgestellt." },
    { question: "Wie funktioniert der Meeting-Planer?", answer: "Er zeigt die 24 Stunden der Ausgangszeitzone und daneben die Uhrzeit in allen gewählten Zielorten. Grün markierte Felder liegen überall in der Arbeitszeit." },
  ];

  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: path, label: "Zeitzonenrechner" },
        ]}
        crumbLabel="Brotkrumen"
        title="Zeitzonenrechner"
        intro="Rechnen Sie eine Uhrzeit in andere Zeitzonen um – mit automatischer Sommerzeit. Fügen Sie mehrere Orte hinzu und finden Sie im Meeting-Planer eine Uhrzeit, die für alle passt."
        tool={<TimeZoneConverter options={germanZoneOptions()} lang="de" copy={COPY} initialFrom="berlin" initialTo={["new-york", "tokyo"]} basePath={path} />}
        related={{ title: "Das könnte Sie auch interessieren", links: calendarRelated(path) }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "tabelle", label: "Zeitverschiebung ab Deutschland" },
          { id: "sommerzeit", label: `Zeitumstellung ${year}` },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="tabelle">Zeitverschiebung ab Deutschland</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Stadt</th>
                <th scope="col">Winter (MEZ)</th>
                <th scope="col">Sommer (MESZ)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ c, w, s }) => (
                <tr key={c.en}>
                  <td>
                    <Link href={`${path}?f=berlin&t=${c.en}`} prefetch={false}>
                      {cityNameDe(c)}
                    </Link>
                  </td>
                  <td>{hours(w)}</td>
                  <td>{hours(s)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          <small>Positive Werte: Dort ist es später als in Deutschland. Stand Mitte Januar und Mitte Juli {year}.</small>
        </p>

        <h2 id="sommerzeit">Zeitumstellung {year}</h2>
        <p>
          Deutschland, Österreich und die Schweiz nutzen im Winter die Mitteleuropäische Zeit (MEZ, UTC+1) und im Sommer die Mitteleuropäische Sommerzeit
          (MESZ, UTC+2). {year} beginnt die Sommerzeit am {formatDeLong(march)}: Um 2 Uhr werden die Uhren auf 3 Uhr vorgestellt. Sie endet am{" "}
          {formatDeLong(october)}, wenn die Uhren um 3 Uhr auf 2 Uhr zurückgestellt werden.
        </p>
        <p>
          Viele Länder stellen die Uhr gar nicht oder an anderen Tagen um. Die USA wechseln am zweiten Sonntag im März und am ersten Sonntag im November;
          dazwischen verändert sich die Zeitverschiebung nach New York oder Los Angeles für einige Wochen um eine Stunde. Die Türkei, Russland, China und
          Japan kennen keine Sommerzeit, sodass sich der Abstand zu ihnen zweimal im Jahr ändert. Die Uhrzeit in 97 Städten auf einen Blick zeigt die{" "}
          <Link href="/de/weltuhr">Weltuhr</Link>.
        </p>
      </TimeToolPage>
    </div>
  );
}
