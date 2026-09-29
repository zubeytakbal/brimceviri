import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import TimeToolPage from "../../components/time/TimeToolPage";
import WorldClockBoard, { type BoardCity } from "../../components/world/WorldClockBoard";
import type { FaqItem } from "../../converter/faqSchema";
import { cityNameDe, cityPathDe, countryNameDe, regionNamesDe } from "../../converter/time/germanWorld";
import { worldCities } from "../../converter/time/worldCities";
import { calendarRelated } from "../../i18n/germanCalendarTools";
import { timeToolAlternates } from "../../i18n/timeToolPaths";
import { seoTitle } from "../../seoTitle";
import { buildSiteUrl } from "../../siteConfig";

const path = "/de/weltuhr";

export const metadata: Metadata = {
  title: seoTitle("Weltuhr: Aktuelle Uhrzeit in 97 Städten weltweit"),
  description:
    "Wie spät ist es in New York, Tokio oder Sydney? Die Weltuhr zeigt die aktuelle Uhrzeit in 97 Städten live, mit Zeitverschiebung zu Ihrer Uhrzeit, Suche, Regionen und Favoriten.",
  alternates: { canonical: path, ...timeToolAlternates("worldClock") },
  openGraph: {
    title: "Weltuhr: Aktuelle Uhrzeit in 97 Städten weltweit",
    description: "Aktuelle Uhrzeit in 97 Städten live, mit Zeitverschiebung und Favoriten.",
    url: buildSiteUrl(path),
    siteName: "BirimCeviri.app",
    locale: "de_DE",
    type: "website",
  },
};

const REGIONS = ["europe", "turkey", "middle-east", "asia", "africa", "oceania", "americas"];

export default function WeltuhrPage() {
  const cities: BoardCity[] = worldCities
    .map((c) => ({
      slug: c.en,
      href: cityPathDe(c),
      name: cityNameDe(c),
      country: countryNameDe(c),
      timeZone: c.timeZone,
      region: c.region,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "de"));
  const regions = REGIONS.map((id) => ({ id, name: regionNamesDe[id] }));

  const faqItems: FaqItem[] = [
    { question: "Wie viele Zeitzonen gibt es?", answer: "Von UTC−12 bis UTC+14 gibt es 24 volle Stundenzonen, dazu Zonen mit halben oder Dreiviertelstunden wie Indien (UTC+5:30) oder Nepal (UTC+5:45). Insgesamt werden weltweit rund 38 verschiedene Uhrzeiten verwendet." },
    { question: "Was ist UTC?", answer: "Die koordinierte Weltzeit (UTC) ist der weltweite Bezugspunkt für alle Zeitzonen. Deutschland liegt im Winter bei UTC+1 (MEZ) und im Sommer bei UTC+2 (MESZ)." },
    { question: "Wie spät ist es in New York, wenn es in Deutschland 12 Uhr ist?", answer: "Meist 6 Uhr morgens. In den Wochen, in denen die USA schon oder noch Sommerzeit haben, Europa aber nicht, ist es 7 Uhr." },
    { question: "Warum hat China nur eine Zeitzone?", answer: "China nutzt seit 1949 landesweit die Pekinger Zeit (UTC+8), obwohl sich das Land über fünf geografische Zeitzonen erstreckt. Im Westen geht die Sonne deshalb erst sehr spät auf." },
  ];

  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: path, label: "Weltuhr" },
        ]}
        crumbLabel="Brotkrumen"
        title="Weltuhr"
        intro={`Die aktuelle Uhrzeit in ${worldCities.length} Städten live auf einen Blick. Suchen Sie eine Stadt, filtern Sie nach Region und markieren Sie Favoriten; jede Karte zeigt die Zeitverschiebung zu Ihrer Uhrzeit.`}
        tool={
          <WorldClockBoard
            cities={cities}
            regions={regions}
            lang="de"
            copy={{
              search: "Stadt oder Land suchen…",
              all: "Alle",
              favorites: "Favoriten",
              addFavorite: "Zu Favoriten hinzufügen",
              removeFavorite: "Aus Favoriten entfernen",
              yourTime: "Ihre Uhrzeit",
              noResults: "Keine passende Stadt gefunden. Mit dem ☆ auf einer Karte fügen Sie Favoriten hinzu.",
              today: "Heute",
              tomorrow: "Morgen",
              yesterday: "Gestern",
            }}
          />
        }
        related={{ title: "Das könnte Sie auch interessieren", links: calendarRelated(path) }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "zeitzonen", label: "Zeitzonen und Weltzeit" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="zeitzonen">Zeitzonen und Weltzeit</h2>
        <p>
          Die Erde dreht sich in 24 Stunden einmal um sich selbst, also um 15 Längengrade pro Stunde. Daraus ergeben sich Zeitzonen, die meist eine volle
          Stunde auseinanderliegen und in UTC angegeben werden. Die Grenzen folgen allerdings Staaten und Regionen: Spanien liegt geografisch in der
          Zone von London, nutzt aber wie Deutschland die Mitteleuropäische Zeit.
        </p>
        <p>
          Um eine bestimmte Uhrzeit umzurechnen oder ein Meeting über mehrere Zeitzonen zu planen, nutzen Sie den{" "}
          <Link href="/de/zeitzonenrechner">Zeitzonenrechner</Link>. Die Kalenderwoche und Feiertage in Deutschland finden Sie unter{" "}
          <Link href="/de/kalenderwoche">Kalenderwoche</Link> und <Link href="/de/feiertage">Feiertage</Link>.
        </p>
      </TimeToolPage>
    </div>
  );
}
