import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import {
  countryByIso3,
  type WorldCountry,
} from "../../converter/geo/worldCountries";
import { WORLD_REGIONS_DE } from "../../converter/geo/worldCountriesDe";
import {
  countriesDe,
  countryPathDe,
  deOf,
  EU_MEMBERS,
  GERMANY,
  zeitverschiebung,
  zeitverschiebungKurz,
} from "../../converter/geo/worldGeoDe";
import { buildLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

// Zeitverschiebungen ändern sich mit der Sommerzeit.
export const revalidate = 86400;

const path = "/de/laender";
const title = "Länder und Hauptstädte der Welt: Liste nach Kontinent";
const description = `Alle ${countriesDe.length} Länder der Welt mit Hauptstadt, Fläche, Zeitverschiebung zu Deutschland und Vorwahl, sortiert nach Kontinent. Mit Nachbarländern Deutschlands und EU-Staaten.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: path,
    ...buildLanguageAlternates(
      { tr: "/ulkeler", en: "/en/countries", de: path },
      "tr",
    ),
  },
  openGraph: {
    title,
    description,
    url: buildSiteUrl(path),
    siteName: "BirimCeviri.app",
    locale: "de_DE",
    type: "website",
  },
};

const REGIONS = ["Europa", "Asien", "Afrika", "Amerika", "Ozeanien"];
const anchor = (r: string) => r.toLowerCase();
const byName = (a: WorldCountry, b: WorldCountry) =>
  deOf(a).name.localeCompare(deOf(b).name, "de");

// Deutsch ist Amtssprache im ganzen Land (DEU, AUT, CHE, LIE, LUX) oder in einem Landesteil (BEL: Deutschsprachige Gemeinschaft).
const DEUTSCHSPRACHIG = ["DEU", "AUT", "CHE", "LIE", "LUX", "BEL"];

const faqItems: FaqItem[] = [
  {
    question: "Wie viele Länder gibt es auf der Welt?",
    answer:
      "Die Vereinten Nationen haben 193 Mitgliedstaaten, dazu kommen die Beobachterstaaten Vatikanstadt und Palästina, zusammen 195. Deutschland erkennt außerdem das Kosovo als Staat an. Diese Liste enthält die 193 UN-Mitglieder sowie Vatikanstadt und Palästina.",
  },
  {
    question: "Wie viele Nachbarländer hat Deutschland?",
    answer:
      "Neun: Dänemark, Polen, Tschechien, Österreich, die Schweiz, Frankreich, Luxemburg, Belgien und die Niederlande. Damit hat Deutschland mehr Nachbarländer als jedes andere Land in Europa außer Russland.",
  },
  {
    question: "In welchen Ländern ist Deutsch Amtssprache?",
    answer:
      "In Deutschland, Österreich und Liechtenstein als einzige Amtssprache, in der Schweiz und Luxemburg neben anderen Sprachen, in Belgien in der Deutschsprachigen Gemeinschaft. Regional gilt Deutsch außerdem in Südtirol (Italien).",
  },
  {
    question:
      "Welche Länder haben eine Hauptstadt, die nicht die größte Stadt ist?",
    answer:
      "Zum Beispiel die USA (Washington, D.C. statt New York), Kanada (Ottawa statt Toronto), Australien (Canberra statt Sydney), Brasilien (Brasília statt São Paulo), die Türkei (Ankara statt Istanbul) und die Schweiz, deren Bundesstadt Bern kleiner ist als Zürich, Genf und Basel.",
  },
];

export default function LaenderPage() {
  const now = new Date();
  const regionOf = (c: WorldCountry) => WORLD_REGIONS_DE[c.region];
  const nachbarn = GERMANY.borders.map((b) => countryByIso3(b)!).sort(byName);
  const eu = EU_MEMBERS.map((b) => countryByIso3(b)!).sort(byName);
  const dach = DEUTSCHSPRACHIG.map((b) => countryByIso3(b)!);
  const chips = (list: WorldCountry[]) => (
    <div className="time-tool-chips">
      {list.map((c) => (
        <Link key={c.iso3} href={countryPathDe(c)!} prefetch={false}>
          {c.flag} {deOf(c).name}
        </Link>
      ))}
    </div>
  );
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: path, label: "Länder" },
        ]}
        crumbLabel="Brotkrumen"
        title="Länder und Hauptstädte der Welt"
        intro={`Hauptstadt, Fläche, heutige Zeitverschiebung zu Deutschland und Vorwahl aller ${countriesDe.length} Länder, sortiert nach Kontinent. Jede Länderseite zeigt Karte, Nachbarländer, Währung, Sprachen, Entfernung ab Berlin und ob deutsche Stecker passen.`}
        tool={
          <div className="country-region-nav">
            {REGIONS.map((r) => (
              <a
                key={r}
                href={`#${anchor(r)}`}
                className="time-tool-button is-secondary"
              >
                {r} ({countriesDe.filter((c) => regionOf(c) === r).length})
              </a>
            ))}
          </div>
        }
        related={{
          title: "Das könnte Sie auch interessieren",
          links: [
            { href: "/de/weltuhr", label: "Weltuhr" },
            { href: "/de/zeitzonenrechner", label: "Zeitzonenrechner" },
            { href: "/de/waehrungsrechner", label: "Währungsrechner" },
            {
              href: "/de/entfernung",
              label: "Entfernung zwischen deutschen Städten",
            },
            { href: "/de/feiertage", label: "Feiertage in Deutschland" },
          ],
        }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "nachbarn", label: "Nachbarländer Deutschlands" },
          { id: "eu", label: "Die 27 EU-Staaten" },
          { id: "deutschsprachig", label: "Deutschsprachige Länder" },
          ...REGIONS.map((r) => ({ id: anchor(r), label: `Länder in ${r}` })),
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="nachbarn">Nachbarländer Deutschlands</h2>
        <p>
          Deutschland grenzt an neun Staaten, so viele wie kaum ein anderes Land
          in Europa.
        </p>
        {chips(nachbarn)}

        <h2 id="eu">Die 27 EU-Staaten</h2>
        <p>
          21 davon zahlen mit dem Euro; zuletzt kam Bulgarien am 1. Januar 2026
          hinzu. Nicht zum Euroraum gehören Dänemark, Polen, Rumänien, Schweden,
          Tschechien und Ungarn.
        </p>
        {chips(eu)}

        <h2 id="deutschsprachig">Deutschsprachige Länder</h2>
        {chips(dach)}

        {REGIONS.map((r) => {
          const list = countriesDe
            .filter((c) => regionOf(c) === r)
            .sort(byName);
          return (
            <div key={r}>
              <h2 id={anchor(r)}>
                Länder in {r} und ihre Hauptstädte ({list.length})
              </h2>
              <div className="holiday-table-wrap">
                <table className="holiday-table">
                  <thead>
                    <tr>
                      <th scope="col">Land</th>
                      <th scope="col">Hauptstadt</th>
                      <th scope="col">Fläche</th>
                      <th scope="col">Zeit zu DE</th>
                      <th scope="col">Vorwahl</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((c) => (
                      <tr key={c.iso3}>
                        <td>
                          <Link href={countryPathDe(c)!} prefetch={false}>
                            {c.flag} {deOf(c).name}
                          </Link>
                        </td>
                        <td>{deOf(c).capital}</td>
                        <td>{c.area.toLocaleString("de-DE")} km²</td>
                        <td>
                          {zeitverschiebungKurz(zeitverschiebung(c, now))}
                        </td>
                        <td>{c.phone || "–"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
        <p>
          <small>
            Die Zeitverschiebung gilt für die Hauptstadt am heutigen Tag und
            ändert sich in Ländern mit anderer oder ohne Sommerzeit im
            Jahresverlauf. Quellen: mledoze/countries (ODbL), GeoNames.
          </small>
        </p>
      </TimeToolPage>
    </div>
  );
}
