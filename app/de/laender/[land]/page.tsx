import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/app/components/SiteLink";
import WorldMap from "../../../components/geo/WorldMap";
import TimeToolPage from "../../../components/time/TimeToolPage";
import type { FaqItem } from "../../../converter/faqSchema";
import {
  areaRank,
  cropViewBox,
  neighborsOf,
  powerFor,
} from "../../../converter/geo/worldGeo";
import { type WorldCountry } from "../../../converter/geo/worldCountries";
import { WORLD_REGIONS_DE } from "../../../converter/geo/worldCountriesDe";
import {
  aehnlichesBundesland,
  countriesDe,
  countryPathDe,
  currencyNameDe,
  deOf,
  EU_MEMBERS,
  EUROZONE,
  findCountryDe,
  fxPathDe,
  GERMANY,
  groessenvergleich,
  hauptstadtKm,
  SCHENGEN,
  steckdosenHinweis,
  utcText,
  zeitverschiebung,
  zeitverschiebungKurz,
  zeitverschiebungText,
} from "../../../converter/geo/worldGeoDe";
import { countryPathEn } from "../../../converter/geo/worldGeoEn";
import { offsetMinutes } from "../../../converter/geo/worldGeo";
import { cityNameDe, cityPathDe } from "../../../converter/time/germanWorld";
import { worldCities } from "../../../converter/time/worldCities";
import { buildLanguageAlternates } from "../../../i18n/routing";
import { seoTitle } from "../../../seoTitle";
import { buildSiteUrl } from "../../../siteConfig";

export const dynamicParams = false;
// Zeitverschiebung und UTC-Versatz ändern sich mit der Sommerzeit.
export const revalidate = 86400;

type PageProps = { params: Promise<{ land: string }> };

export function generateStaticParams() {
  return countriesDe.map((c) => ({ land: deOf(c).id }));
}

const num = (n: number, digits = 0) =>
  n.toLocaleString("de-DE", { maximumFractionDigits: digits });
const uhr = (minutes: number) => {
  const norm = ((minutes % 1440) + 1440) % 1440;
  const text = `${String(Math.floor(norm / 60)).padStart(2, "0")}:${String(norm % 60).padStart(2, "0")} Uhr`;
  return minutes >= 1440
    ? `${text} (am nächsten Tag)`
    : minutes < 0
      ? `${text} (am Vortag)`
      : text;
};
const capShort = (capital: string) => capital.split(",")[0];

function alternates(c: WorldCountry) {
  return buildLanguageAlternates(
    { tr: `/ulkeler/${c.id}`, en: countryPathEn(c), de: countryPathDe(c)! },
    "tr",
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const c = findCountryDe((await params).land);
  if (!c) return {};
  const d = deOf(c);
  const path = countryPathDe(c)!;
  const diff = zeitverschiebung(c, new Date());
  const title = `${d.name}: Hauptstadt, Karte, Zeitverschiebung und Währung`;
  const description =
    c.iso3 === "DEU"
      ? `Deutschland in Zahlen: Hauptstadt Berlin, Fläche ${num(c.area)} km², Nachbarländer, Vorwahl, Zeitzone und Lage auf der Karte.`
      : `Hauptstadt von ${d.name} ist ${d.capital}. ${num(c.area)} km², ${zeitverschiebungText(diff)}, ${num(hauptstadtKm(GERMANY, c))} km Luftlinie ab Berlin, Währung, Sprachen, Vorwahl und Steckdosen.`;
  return {
    title: seoTitle(
      title,
      `${d.name}: Hauptstadt, Karte und Zeitverschiebung`,
      `${d.name}: Hauptstadt und Karte`,
    ),
    description,
    alternates: { canonical: path, ...alternates(c) },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(path),
      siteName: "BirimCeviri.app",
      locale: "de_DE",
      type: "website",
    },
  };
}

export default async function LandPage({ params }: PageProps) {
  const c = findCountryDe((await params).land);
  if (!c) notFound();
  const d = deOf(c);
  const isDe = c.iso3 === "DEU";
  const now = new Date();
  const offset = offsetMinutes(c.tz, now);
  const diff = zeitverschiebung(c, now);
  const neighbors = neighborsOf(c).filter((n) => countryPathDe(n));
  const rank = areaRank(c);
  const power = powerFor(c);
  const km = hauptstadtKm(GERMANY, c);
  const bundesland = aehnlichesBundesland(c.area);
  const isEu = EU_MEMBERS.includes(c.iso3);
  const isEuro = EUROZONE.includes(c.iso3);
  const isSchengen = SCHENGEN.includes(c.iso3);
  const nachbarDeutschlands = GERMANY.borders.includes(c.iso3);
  const cities = worldCities.filter((w) => w.countryEn === c.nameEn);
  const fills: Record<string, string> = { [c.iso3]: "var(--tr-map-selected)" };
  for (const n of neighbors) fills[n.iso3] = "#9fcfcf";
  const viewBox = cropViewBox([
    c,
    ...neighbors.filter((n) => n.area < c.area * 6 || neighbors.length <= 2),
  ]);
  const path = countryPathDe(c)!;
  const cap = capShort(d.capital);
  const langs = d.languages.length ? d.languages.join(", ") : "–";
  const currencies = c.currencies.map((code) => ({
    code,
    name: currencyNameDe(code),
    fx: fxPathDe(code),
  }));
  const dial = c.phone.replace("+", "");
  const vergleich = ["Europe/Berlin", "America/New_York", "Asia/Tokyo"]
    .filter((tz) => tz === "Europe/Berlin" || tz !== c.tz)
    .map((tz) => ({
      tz,
      label:
        tz === "Europe/Berlin"
          ? "Deutschland"
          : tz === "America/New_York"
            ? "New York"
            : "Tokio",
      time: uhr(12 * 60 + offsetMinutes(tz, now) - offset),
    }));
  const region = WORLD_REGIONS_DE[c.region] ?? c.region;
  const mitgliedschaft = [
    isEu && "EU",
    isEuro && "Eurozone",
    isSchengen && "Schengen-Raum",
  ].filter(Boolean) as string[];

  const faqItems: FaqItem[] = [
    {
      question: `Was ist die Hauptstadt von ${d.name}?`,
      answer: `Die Hauptstadt von ${d.name} ist ${d.capital}.${d.note ? ` ${d.note}` : ""}`,
    },
    {
      question: `Wie groß ist ${d.name}?`,
      answer: isDe
        ? `Deutschland ist ${num(c.area)} km² groß und liegt damit auf Platz ${rank} von ${countriesDe.length} Ländern. Größtes Bundesland ist Bayern (70.542 km²), kleinstes Bremen (420 km²).`
        : `${d.name} hat eine Fläche von ${num(c.area)} km² (Platz ${rank} von ${countriesDe.length}) und ist damit ${groessenvergleich(c)} (${num(GERMANY.area)} km²).${bundesland ? ` Das entspricht ungefähr der Fläche von ${bundesland.name} (${num(bundesland.area)} km²).` : ""}`,
    },
    ...(isDe
      ? []
      : [
          {
            question: `Wie groß ist die Zeitverschiebung zwischen Deutschland und ${d.name}?`,
            answer: `In ${cap} ist es heute ${zeitverschiebungText(diff)} (${utcText(offset)}). Wenn es in Deutschland 12:00 Uhr ist, ist es in ${cap} ${uhr(12 * 60 + diff)}. Weil nicht alle Länder zur gleichen Zeit auf Sommerzeit umstellen, kann sich der Unterschied im Lauf des Jahres ändern.`,
          },
          {
            question: `Wie weit ist ${d.name} von Deutschland entfernt?`,
            answer: `Die Luftlinie von Berlin nach ${cap} beträgt etwa ${num(km)} km. Die Flug- oder Fahrstrecke ist in der Regel länger.`,
          },
        ]),
    {
      question: `Welche Währung hat ${d.name}?`,
      answer: `In ${d.name} wird mit ${currencies.map((x) => `${x.name} (${x.code})`).join(" und ")} bezahlt.${isEuro && !isDe ? " Das Land gehört zur Eurozone, Geld muss also nicht umgetauscht werden." : ""}`,
    },
    ...(c.phone && !isDe
      ? [
          {
            question: `Welche Vorwahl hat ${d.name}?`,
            answer: `Die Ländervorwahl ist ${c.phone}. Von Deutschland aus wählen Sie 00 ${dial} und dann die Rufnummer ${["ITA", "SMR", "VAT"].includes(c.iso3) ? "mit der führenden Null" : "in der Regel ohne führende Null"}.`,
          },
        ]
      : []),
    ...(power && !isDe
      ? [
          {
            question: `Brauche ich in ${d.name} einen Reiseadapter?`,
            answer: `Steckdosen Typ ${power.plugTypes.join(", ")}, ${power.voltageLabel}, ${power.frequencyLabel}. ${steckdosenHinweis(power.plugTypes, power.voltageRange)}`,
          },
        ]
      : []),
    {
      question: `Welche Sprache spricht man in ${d.name}?`,
      answer: `Amts- oder Nationalsprache${d.languages.length > 1 ? "n" : ""}: ${langs}.`,
    },
  ];

  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: "/de/laender", label: "Länder" },
          { href: path, label: d.name },
        ]}
        crumbLabel="Brotkrumen"
        title={`${c.flag} ${d.name}`}
        intro={
          isDe
            ? "Deutschland auf einen Blick: Hauptstadt, Fläche, Nachbarländer, Zeitzone, Vorwahl und Lage auf der Karte."
            : `${region}. Hauptstadt, Fläche im Vergleich zu Deutschland, Zeitverschiebung, Entfernung ab Berlin, Währung, Sprachen, Vorwahl und Steckdosen.`
        }
        tool={
          <div className="province-distance-tool">
            <div className="holiday-stats">
              <div>
                <strong>{d.capital}</strong>
                <span>Hauptstadt</span>
              </div>
              <div>
                <strong>{num(c.area)} km²</strong>
                <span>
                  {isDe ? `Platz ${rank} nach Fläche` : groessenvergleich(c)}
                </span>
              </div>
              {isDe ? (
                <div>
                  <strong>{utcText(offset)}</strong>
                  <span>Zeitzone heute</span>
                </div>
              ) : (
                <>
                  <div>
                    <strong>{zeitverschiebungKurz(diff)}</strong>
                    <span>Zeitverschiebung zu Deutschland</span>
                  </div>
                  <div>
                    <strong>{num(km)} km</strong>
                    <span>Luftlinie Berlin – {cap}</span>
                  </div>
                </>
              )}
            </div>
            <div className="tr-map-frame world-map-frame">
              <WorldMap
                lang="de"
                ariaLabel={`Lage von ${d.name}`}
                viewBox={viewBox}
                fills={fills}
                capitalDots={[c.iso3]}
                labels={[c.iso3, ...neighbors.map((n) => n.iso3)]}
                hrefFor={(x) => (x.iso3 === c.iso3 ? null : countryPathDe(x))}
              />
            </div>
            <p className="tr-map-legend">
              <span
                className="tr-map-legend-swatch"
                style={{ background: "var(--tr-map-selected)" }}
              />{" "}
              {d.name}
              {neighbors.length > 0 && (
                <>
                  <span
                    className="tr-map-legend-swatch"
                    style={{ background: "#9fcfcf" }}
                  />{" "}
                  Nachbarländer
                </>
              )}
              · Ein anderes Land anklicken, um seine Seite zu öffnen.
            </p>
          </div>
        }
        related={{
          title: "Das könnte Sie auch interessieren",
          links: [
            { href: "/de/laender", label: "Alle Länder und Hauptstädte" },
            ...cities
              .slice(0, 3)
              .map((w) => ({
                href: cityPathDe(w),
                label: `Uhrzeit ${cityNameDe(w)}`,
              })),
            ...currencies
              .filter((x) => x.fx)
              .map((x) => ({
                href: x.fx!,
                label: `Euro in ${x.name} umrechnen`,
              })),
            ...(c.iso3 === "AUT"
              ? [
                  {
                    href: "/de/feiertage-oesterreich",
                    label: "Feiertage in Österreich",
                  },
                ]
              : []),
            ...(isDe
              ? [
                  {
                    href: "/de/entfernung",
                    label: "Entfernung zwischen deutschen Städten",
                  },
                  { href: "/de/feiertage", label: "Feiertage nach Bundesland" },
                ]
              : []),
            { href: "/de/zeitzonenrechner", label: "Zeitzonenrechner" },
            { href: "/de/weltuhr", label: "Weltuhr" },
          ],
        }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "steckbrief", label: `Steckbrief ${d.name}` },
          ...(isDe ? [] : [{ id: "zeit", label: "Zeitverschiebung" }]),
          { id: "groesse", label: isDe ? "Größe" : "Größe und Entfernung" },
          ...(power && !isDe
            ? [{ id: "steckdosen", label: "Steckdosen und Spannung" }]
            : []),
          ...(neighbors.length
            ? [{ id: "nachbarn", label: "Nachbarländer" }]
            : []),
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="steckbrief">Steckbrief {d.name}</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <tbody>
              <tr>
                <th scope="row">Hauptstadt</th>
                <td>
                  {d.capital}
                  {d.note ? <small> – {d.note}</small> : null}
                </td>
              </tr>
              <tr>
                <th scope="row">Kontinent</th>
                <td>
                  {region}
                  {c.landlocked ? " (Binnenstaat ohne Meerzugang)" : ""}
                </td>
              </tr>
              <tr>
                <th scope="row">Fläche</th>
                <td>
                  {num(c.area)} km² · Platz {rank} von {countriesDe.length}
                </td>
              </tr>
              <tr>
                <th scope="row">
                  Amtssprache{d.languages.length > 1 ? "n" : ""}
                </th>
                <td>{langs}</td>
              </tr>
              <tr>
                <th scope="row">Währung</th>
                <td>
                  {currencies.map((x, i) => (
                    <span key={x.code}>
                      {i > 0 && ", "}
                      {x.fx ? <Link href={x.fx}>{x.name}</Link> : x.name} (
                      {x.code})
                    </span>
                  ))}
                </td>
              </tr>
              {mitgliedschaft.length > 0 && (
                <tr>
                  <th scope="row">Mitglied in</th>
                  <td>{mitgliedschaft.join(", ")}</td>
                </tr>
              )}
              <tr>
                <th scope="row">Zeitzone</th>
                <td>
                  {c.tz.replace(/_/g, " ")} · {utcText(offset)}
                  {isDe
                    ? " (MEZ/MESZ)"
                    : ` · ${zeitverschiebungKurz(diff)} zu Deutschland`}
                </td>
              </tr>
              {c.phone && (
                <tr>
                  <th scope="row">Vorwahl</th>
                  <td>
                    {c.phone}
                    {!isDe && ` (aus Deutschland: 00 ${dial})`}
                  </td>
                </tr>
              )}
              {c.tld && (
                <tr>
                  <th scope="row">Internet-Domain</th>
                  <td>{c.tld}</td>
                </tr>
              )}
              <tr>
                <th scope="row">Koordinaten der Hauptstadt</th>
                <td>
                  {Math.abs(c.capLat).toLocaleString("de-DE")}°{" "}
                  {c.capLat < 0 ? "S" : "N"},{" "}
                  {Math.abs(c.capLon).toLocaleString("de-DE")}°{" "}
                  {c.capLon < 0 ? "W" : "O"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {!isDe && (
          <>
            <h2 id="zeit">Zeitverschiebung zu Deutschland</h2>
            <p>
              In {cap} gilt heute {utcText(offset)}, das ist{" "}
              {zeitverschiebungText(diff)}. Wenn es in {cap} 12:00 Uhr mittags
              ist, zeigen die Uhren:
            </p>
            <div className="holiday-table-wrap">
              <table className="holiday-table">
                <thead>
                  <tr>
                    <th scope="col">Ort</th>
                    <th scope="col">Uhrzeit</th>
                  </tr>
                </thead>
                <tbody>
                  {vergleich.map((x) => (
                    <tr key={x.tz}>
                      <td>{x.label}</td>
                      <td>{x.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {cities.length > 0 && (
              <p>
                Aktuelle Uhrzeit:{" "}
                {cities.map((w, i) => (
                  <span key={w.en}>
                    {i > 0 && ", "}
                    <Link href={cityPathDe(w)} prefetch={false}>
                      {cityNameDe(w)}
                    </Link>
                  </span>
                ))}
                . Andere Uhrzeiten rechnet der{" "}
                <Link href="/de/zeitzonenrechner">Zeitzonenrechner</Link> um.
              </p>
            )}
          </>
        )}

        <h2 id="groesse">{isDe ? "Größe" : "Größe und Entfernung"}</h2>
        {isDe ? (
          <p>
            Deutschland ist mit {num(c.area)} km² das {rank}.-größte Land der
            Welt und nach Frankreich, Spanien und Schweden das viertgrößte der
            EU. Die Entfernungen zwischen den Großstädten berechnet der{" "}
            <Link href="/de/entfernung">Entfernungsrechner</Link>.
          </p>
        ) : (
          <ul>
            <li>
              {d.name} ist {groessenvergleich(c)} ({num(GERMANY.area)} km²).
            </li>
            {bundesland && (
              <li>
                Die Fläche entspricht ungefähr der von {bundesland.name} (
                {num(bundesland.area)} km²).
              </li>
            )}
            <li>
              Berlin – {cap}: etwa {num(km)} km Luftlinie ({num(km * 0.621371)}{" "}
              Meilen).
            </li>
            {nachbarDeutschlands && (
              <li>{d.name} ist eines der neun Nachbarländer Deutschlands.</li>
            )}
          </ul>
        )}

        {power && !isDe && (
          <>
            <h2 id="steckdosen">Steckdosen und Spannung</h2>
            <p>
              In {d.name} gibt es Steckdosen vom Typ{" "}
              {power.plugTypes.join(", ")} mit {power.voltageLabel} und{" "}
              {power.frequencyLabel}.{" "}
              {steckdosenHinweis(power.plugTypes, power.voltageRange)}
            </p>
          </>
        )}

        {neighbors.length > 0 && (
          <>
            <h2 id="nachbarn">Nachbarländer</h2>
            <p>
              {d.name} grenzt an {neighbors.length}{" "}
              {neighbors.length === 1 ? "Land" : "Länder"}:{" "}
              {neighbors.map((n, i) => (
                <span key={n.iso3}>
                  {i > 0 ? ", " : ""}
                  <Link href={countryPathDe(n)!} prefetch={false}>
                    {deOf(n).name}
                  </Link>
                </span>
              ))}
              .
            </p>
          </>
        )}
        <p>
          <small>
            Quellen: Länderdaten mledoze/countries (ODbL), Koordinaten der
            Hauptstädte GeoNames (CC BY 4.0), Grenzen Natural Earth,
            Bundeslandflächen Statistisches Bundesamt. Flächenangaben können
            Binnengewässer enthalten und je nach Quelle leicht abweichen.
          </small>
        </p>
      </TimeToolPage>
    </div>
  );
}
