import { seoTitle } from "../../seoTitle";
import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import LiveClock from "../../components/time/LiveClock";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { formatDeLong, todayBerlin } from "../../converter/time/germanDates";
import { timeToolsRelatedDe } from "../../i18n/germanTimeTools";
import { timeToolAlternates } from "../../i18n/timeToolPaths";
import { buildSiteUrl } from "../../siteConfig";

export const revalidate = 86400;

const path = "/de/online-uhr";
const title = "Online-Uhr: Wie spät ist es? Uhrzeit im Vollbild";
const description =
  "Aktuelle Uhrzeit sekundengenau mit 34 Designs: Bahnhofsuhr, Kuckucksuhr, Pendeluhr, Taschenuhr, Wortuhr auf Deutsch, Klappzahlen. Mit Ticken, Stundenschlag und Vollbild.";

export const metadata: Metadata = {
  title: seoTitle(title, "Online-Uhr: Wie spät ist es?"),
  description,
  alternates: { canonical: path, ...timeToolAlternates("clock") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
};

/** Letzter Sonntag im Monat (Zeitumstellung in der EU). */
function lastSunday(year: number, month: number) {
  const last = new Date(Date.UTC(year, month, 0));
  return { year, month, day: last.getUTCDate() - last.getUTCDay() };
}

export default function OnlineUhrPage() {
  const today = todayBerlin();
  const key = (d: { year: number; month: number; day: number }) => d.year * 10000 + d.month * 100 + d.day;
  const changes = [today.year, today.year + 1].flatMap((y) => [
    { date: lastSunday(y, 3), text: "Beginn der Sommerzeit (MESZ): um 2 Uhr werden die Uhren auf 3 Uhr vorgestellt" },
    { date: lastSunday(y, 10), text: "Ende der Sommerzeit: um 3 Uhr werden die Uhren auf 2 Uhr zurückgestellt (MEZ)" },
  ]);
  const next = changes.filter((c) => key(c.date) >= key(today)).slice(0, 2);

  const faqItems: FaqItem[] = [
    {
      question: "Wie genau ist diese Uhr?",
      answer: "Sie zeigt die Systemzeit Ihres Geräts. Computer und Handys gleichen ihre Uhr automatisch über das Internet ab und liegen meist weit unter einer Sekunde daneben. Geht Ihre Uhr falsch, aktivieren Sie in den Einstellungen „Uhrzeit automatisch einstellen“.",
    },
    {
      question: "Woher kommt die offizielle Uhrzeit in Deutschland?",
      answer: "Die Physikalisch-Technische Bundesanstalt (PTB) in Braunschweig stellt mit Atomuhren die gesetzliche Zeit dar. Funkuhren empfangen sie über den Langwellensender DCF77 in Mainflingen bei Frankfurt am Main.",
    },
    {
      question: "Wann ist die nächste Zeitumstellung?",
      answer: next.length
        ? `${formatDeLong(next[0].date)}: ${next[0].text}.`
        : "Die Zeitumstellung ist jeweils am letzten Sonntag im März und im Oktober.",
    },
    {
      question: "Wie lese ich die Wortuhr?",
      answer: "Sie zeigt die Zeit in Worten, auf fünf Minuten gerundet: „Es ist Viertel nach drei“, „halb vier“ oder „fünf vor halb vier“ – so, wie man in Deutschland die Uhrzeit sagt.",
    },
    {
      question: "Warum starten die Töne nicht von selbst?",
      answer: "Browser spielen Töne nur nach einer Aktion ab. „Ticken“ oder „Stundenschlag“ antippen, um die Töne zu starten; „Schlag anhören“ spielt den Stundenschlag sofort.",
    },
  ];

  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: path, label: "Online-Uhr" },
        ]}
        crumbLabel="Brotkrumen"
        title="Online-Uhr"
        intro="Die aktuelle Uhrzeit sekundengenau. Wählen Sie eines von 34 Designs – von der Bahnhofsuhr über die Kuckucksuhr bis zur Wortuhr auf Deutsch –, schalten Sie Ticken und Stundenschlag ein und wechseln Sie mit einem Klick ins Vollbild."
        tool={<LiveClock locale="de" />}
        related={{ title: "Das könnte Sie auch interessieren", links: timeToolsRelatedDe(path) }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "designs", label: "Uhren-Designs" },
          { id: "toene", label: "Ticken und Stundenschlag" },
          { id: "zeit-in-deutschland", label: "Die Uhrzeit in Deutschland" },
          { id: "tischuhr", label: "Als Tisch- oder Wanduhr nutzen" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="designs">Uhren-Designs</h2>
        <ul>
          <li>
            <strong>Analog:</strong> Klassisch mit gleitendem Sekundenzeiger, die Bahnhofsuhr mit Balkenziffern und roter Kelle, römische Ziffern,
            Gold und Nacht für dunkle Räume.
          </li>
          <li>
            <strong>Digital:</strong> Digital, Schlicht, Abendrot, Klappzahlen wie an alten Anzeigetafeln, Neon, rote LED, grünes Terminal und eine
            Binäruhr.
          </li>
          <li>
            <strong>Alte Uhren:</strong> Pendeluhr, deren Pendel die Sekunden schlägt, Kuckucksuhr wie aus dem Schwarzwald, Taschenuhr,
            Glockenwecker und Nixie-Röhren.
          </li>
          <li>
            <strong>Armbanduhren:</strong> Taucheruhr mit drehbarer Lünette, Chronograph mit Tachymeter, klassische Armbanduhr, Fliegeruhr,
            Retro-Digital und Smartwatch.
          </li>
          <li>
            <strong>Besondere Uhren:</strong> Wortuhr („Es ist fünf vor halb vier“), Sanduhr, Mondphasenuhr, Turmuhr, Schiffsuhr und Tageslauf.
          </li>
        </ul>

        <h2 id="toene">Ticken und Stundenschlag</h2>
        <p>
          Jede Uhr hat ihr eigenes Geräusch, das live im Browser erzeugt wird. Die Pendeluhr schlägt jede Sekunde mit tiefem Holzklang und spielt
          zur vollen Stunde den Westminster-Schlag, der Kuckuck ruft zur vollen Stunde, und der Glockenwecker klingelt. Mechanische Uhren ticken
          mehrmals pro Sekunde, Quarzzeiger springen einmal pro Sekunde.
        </p>

        <h2 id="zeit-in-deutschland">Die Uhrzeit in Deutschland</h2>
        <p>
          In Deutschland, Österreich und der Schweiz gilt die Mitteleuropäische Zeit (MEZ, UTC+1), im Sommer die Mitteleuropäische Sommerzeit
          (MESZ, UTC+2). Die gesetzliche Zeit stellt die Physikalisch-Technische Bundesanstalt (PTB) in Braunschweig mit Atomuhren dar; Funkuhren
          empfangen sie über den Sender DCF77.
        </p>
        {next.length > 0 && (
          <ul>
            {next.map((c) => (
              <li key={key(c.date)}>
                <strong>{formatDeLong(c.date)}:</strong> {c.text}.
              </li>
            ))}
          </ul>
        )}
        <p>
          Die Uhrzeit in anderen Ländern zeigt die <Link href="/de/weltuhr">Weltuhr</Link>, Zeitunterschiede berechnet der{" "}
          <Link href="/de/zeitzonenrechner">Zeitzonenrechner</Link>.
        </p>

        <h2 id="tischuhr">Als Tisch- oder Wanduhr nutzen</h2>
        <p>
          Im Vollbild füllt die Uhr den ganzen Bildschirm – als Tischuhr auf dem zweiten Monitor, auf dem Fernseher oder Tablet. Digital und LED
          sind im Klassenzimmer oder Prüfungsraum gut lesbar, „Nacht“ schont am Bett die Augen. Zum Wecken nutzen Sie den{" "}
          <Link href="/de/wecker">Wecker</Link>, zum Herunterzählen den <Link href="/de/timer">Timer</Link>.
        </p>
      </TimeToolPage>
    </div>
  );
}
