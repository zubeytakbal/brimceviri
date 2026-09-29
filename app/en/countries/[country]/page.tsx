import type { Metadata } from "next";
import { seoTitle } from "../../../seoTitle";
import { notFound } from "next/navigation";
import Link from "@/app/components/SiteLink";
import WorldMap from "../../../components/geo/WorldMap";
import TimeToolPage from "../../../components/time/TimeToolPage";
import type { FaqItem } from "../../../converter/faqSchema";
import { areaRank, cropViewBox, neighborsOf, powerFor } from "../../../converter/geo/worldGeo";
import { worldCountries, type WorldCountry } from "../../../converter/geo/worldCountries";
import {
  capitalDistanceKm,
  countryPathEn,
  currencyNameEn,
  enOf,
  findCountryEn,
  GBR,
  USA,
  utcOffsetOf,
  utcOffsetText,
} from "../../../converter/geo/worldGeoEn";
import { worldCities } from "../../../converter/time/worldCities";
import { countryPathDe } from "../../../converter/geo/worldGeoDe";
import { buildLanguageAlternates } from "../../../i18n/routing";
import { buildSiteUrl } from "../../../siteConfig";

export const dynamicParams = false;
// UTC ofseti yaz saatine gore degistigi icin gunluk yenilenir.
export const revalidate = 86400;

export function generateStaticParams() {
  return worldCountries.map((c) => ({ country: enOf(c).id }));
}

const num = (n: number, digits = 0) => n.toLocaleString("en-US", { maximumFractionDigits: digits });
const sqmi = (km2: number) => num(km2 * 0.386102);

/** "the" alan ulke adlari (the United States, the Netherlands...). */
function withThe(name: string) {
  return /^(United|Netherlands|Philippines|Bahamas|Gambia|Maldives|Marshall|Solomon|Central African|Dominican Republic|Czech|Comoros|Seychelles|Republic of the|DR )/.test(name) ? `the ${name}` : name;
}

/** Cumle sonu noktasi ("D.C." gibi kisaltmalarda cift nokta olmasin). */
function sentenceEnd(text: string) {
  return text.endsWith(".") ? text : `${text}.`;
}

function clockAt(minutes: number) {
  const norm = ((minutes % 1440) + 1440) % 1440;
  const h = Math.floor(norm / 60);
  const m = norm % 60;
  const text = `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, "0")} ${h < 12 ? "a.m." : "p.m."}`;
  return minutes >= 1440 ? `${text} (next day)` : minutes < 0 ? `${text} (previous day)` : text;
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const c = findCountryEn((await params).country);
  if (!c) return {};
  const e = enOf(c);
  const title = `${c.nameEn}: Capital, Map, Time Zone and Currency`;
  const description = `The capital of ${withThe(c.nameEn)} is ${e.capital}. Area ${num(c.area)} km² (${sqmi(c.area)} sq mi), ${utcOffsetText(utcOffsetOf(c, new Date()))}, currency, languages, calling code, neighbors and a location map.`;
  const path = countryPathEn(c);
  return {
    title: seoTitle(title, `${c.nameEn}: Capital, Time Zone and Map`, `${c.nameEn}: Capital and Map`),
    description,
    alternates: { canonical: path, ...buildLanguageAlternates({ tr: `/ulkeler/${c.id}`, en: path, de: countryPathDe(c) ?? undefined }, "tr") },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
  };
}

function sizeCompare(c: WorldCountry, ref: WorldCountry, refName: string) {
  const r = c.area / ref.area;
  if (r >= 1.05) return `about ${num(r, 1)} times the size of ${refName}`;
  if (r > 0.95) return `about the same size as ${refName}`;
  return `about ${num(r * 100, r < 0.01 ? 2 : 1)}% of the size of ${refName}`;
}

export default async function EnglishCountryPage({ params }: { params: Promise<{ country: string }> }) {
  const c = findCountryEn((await params).country);
  if (!c) notFound();
  const e = enOf(c);
  const name = c.nameEn;
  const the = withThe(name);
  const The = the.charAt(0).toUpperCase() + the.slice(1);
  const now = new Date();
  const offset = utcOffsetOf(c, now);
  const neighbors = neighborsOf(c);
  const rank = areaRank(c);
  const power = powerFor(c);
  const city = worldCities.find((w) => w.timeZone === c.tz && w.countryEn === c.nameEn) ?? worldCities.find((w) => w.timeZone === c.tz);
  const fills: Record<string, string> = { [c.iso3]: "var(--tr-map-selected)" };
  for (const n of neighbors) fills[n.iso3] = "#9fcfcf";
  const viewBox = cropViewBox([c, ...neighbors.filter((n) => n.area < c.area * 6 || neighbors.length <= 2)]);
  const localTime = new Intl.DateTimeFormat("en-US", { timeZone: c.tz, hour: "numeric", minute: "2-digit" });
  const path = countryPathEn(c);
  const compareRefs = [USA, GBR].filter((r) => r.iso3 !== c.iso3);
  const refName = (r: WorldCountry) => (r.iso3 === "USA" ? "the United States" : "the United Kingdom");
  const clocks = [
    { label: "New York", tz: "America/New_York" },
    { label: "Los Angeles", tz: "America/Los_Angeles" },
    { label: "London", tz: "Europe/London" },
    { label: "UTC", tz: "UTC" },
  ].map((x) => {
    const o = utcOffsetOf({ ...c, tz: x.tz }, now);
    return { ...x, time: clockAt(12 * 60 + o - offset) };
  });
  const distances = compareRefs.map((r) => ({ r, km: capitalDistanceKm(c, r) }));
  const langs = e.languages.length ? e.languages.join(", ") : "—";

  const faqItems: FaqItem[] = [
    {
      question: `What is the capital of ${the}?`,
      answer: `The capital of ${the} is ${sentenceEnd(e.capital)}${e.note ? ` ${e.note}` : ""}`,
    },
    {
      question: `How big is ${the}?`,
      answer: `${The} covers about ${num(c.area)} km² (${sqmi(c.area)} sq mi), ranking ${rank} of ${worldCountries.length} countries by area. ${compareRefs.map((r) => `It is ${sizeCompare(c, r, refName(r))}.`).join(" ")}`,
    },
    {
      question: `What time zone is ${the} in?`,
      answer: `${e.capital} uses ${utcOffsetText(offset)} (${c.tz.replace(/_/g, " ")}) today. When it is noon in ${e.capital.split(" (")[0]}, it is ${clocks[0].time} in New York and ${clocks[2].time} in London. Countries that observe daylight saving time change their offset during the year; this page is updated daily.`,
    },
    {
      question: `What currency does ${the} use?`,
      answer: `${The} uses the ${c.currencies.map((code) => `${currencyNameEn(code)} (${code})`).join(" and the ")}.`,
    },
    ...(c.phone
      ? [
          {
            question: `What is the country code for ${the}?`,
            answer: `The international calling code is ${c.phone}. From the United States dial 011 ${c.phone.replace("+", "")} followed by the number; from most other countries dial 00 ${c.phone.replace("+", "")}.`,
          },
        ]
      : []),
    {
      question: `What language is spoken in ${the}?`,
      answer: `Official or national language${e.languages.length > 1 ? "s" : ""}: ${langs}.`,
    },
  ];

  return (
    <TimeToolPage
      crumbs={[
        { href: "/en", label: "Home" },
        { href: "/en/countries", label: "Countries" },
        { href: path, label: name },
      ]}
      crumbLabel="Breadcrumb"
      title={`${c.flag} ${name}`}
      intro={`${e.region}${e.subregion ? ` · ${e.subregion}` : ""}. Capital, size, time zone, currency, languages, calling code and neighboring countries, with a location map.`}
      tool={
        <div className="province-distance-tool">
          <div className="holiday-stats">
            <div>
              <strong>{e.capital}</strong>
              <span>capital</span>
            </div>
            <div>
              <strong>{num(c.area)} km²</strong>
              <span>
                {sqmi(c.area)} sq mi · #{rank} by area
              </span>
            </div>
            <div>
              <strong>{utcOffsetText(offset)}</strong>
              <span>time in {e.capital.split(" (")[0].split(",")[0]} today</span>
            </div>
            {c.phone && (
              <div>
                <strong>{c.phone}</strong>
                <span>calling code</span>
              </div>
            )}
          </div>
          <div className="tr-map-frame world-map-frame">
            <WorldMap
              lang="en"
              ariaLabel={`Location of ${the}`}
              viewBox={viewBox}
              fills={fills}
              capitalDots={[c.iso3]}
              labels={[c.iso3, ...neighbors.map((n) => n.iso3)]}
              hrefFor={(x) => (x.iso3 === c.iso3 ? null : countryPathEn(x))}
            />
          </div>
          <p className="tr-map-legend">
            <span className="tr-map-legend-swatch" style={{ background: "var(--tr-map-selected)" }} /> {name}
            {neighbors.length > 0 && (
              <>
                <span className="tr-map-legend-swatch" style={{ background: "#9fcfcf" }} /> Neighboring countries
              </>
            )}
            · Click another country to open its page.
          </p>
        </div>
      }
      related={{
        title: "You may also like",
        links: [
          { href: "/en/world-map", label: "World Map" },
          { href: "/en/countries", label: "Countries and Capitals" },
          ...(city ? [{ href: `/en/world-clock/${city.en}`, label: `Time in ${city.nameEn}` }] : [{ href: "/en/world-clock", label: "World Clock" }]),
          { href: "/en/time-zone-converter", label: "Time Zone Converter" },
          { href: "/en/coordinate-converter", label: "Coordinate Converter" },
          { href: "/en/solar-time-calculator", label: "Solar Time Calculator" },
        ],
      }}
      tocTitle="On this page"
      tocItems={[
        { id: "facts", label: `${name} facts` },
        { id: "time", label: "Time difference" },
        { id: "size", label: "Size and distance" },
        ...(neighbors.length ? [{ id: "neighbors", label: "Neighboring countries" }] : []),
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqTitle="Frequently Asked Questions"
      faqItems={faqItems}
    >
      <h2 id="facts">{name} facts</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <tbody>
            <tr>
              <th scope="row">Capital</th>
              <td>
                {e.capital}
                {e.note ? <small> — {e.note}</small> : null}
              </td>
            </tr>
            <tr>
              <th scope="row">Continent / region</th>
              <td>
                {e.region}
                {e.subregion ? `, ${e.subregion}` : ""}
                {c.landlocked ? " (landlocked)" : ""}
              </td>
            </tr>
            <tr>
              <th scope="row">Area</th>
              <td>
                {num(c.area)} km² · {sqmi(c.area)} sq mi · {num(c.area * 247.105)} acres
              </td>
            </tr>
            <tr>
              <th scope="row">Language{e.languages.length > 1 ? "s" : ""}</th>
              <td>{langs}</td>
            </tr>
            {e.demonym && (
              <tr>
                <th scope="row">Demonym</th>
                <td>{e.demonym}</td>
              </tr>
            )}
            <tr>
              <th scope="row">Currency</th>
              <td>{c.currencies.map((code) => `${currencyNameEn(code)} (${code})`).join(", ")}</td>
            </tr>
            <tr>
              <th scope="row">Time zone</th>
              <td>
                {c.tz.replace(/_/g, " ")} · {utcOffsetText(offset)} · {localTime.format(now)} at the time this page was updated
              </td>
            </tr>
            {c.phone && (
              <tr>
                <th scope="row">Calling code</th>
                <td>{c.phone}</td>
              </tr>
            )}
            {c.tld && (
              <tr>
                <th scope="row">Internet domain</th>
                <td>{c.tld}</td>
              </tr>
            )}
            {power && (
              <tr>
                <th scope="row">Electricity</th>
                <td>
                  {power.voltageLabel}, {power.frequencyLabel} · plug types {power.plugTypes.join(", ")}
                </td>
              </tr>
            )}
            <tr>
              <th scope="row">Capital coordinates</th>
              <td>
                <Link href={`/en/coordinate-converter?q=${c.capLat},${c.capLon}`}>
                  {c.capLat}, {c.capLon}
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="time">Time difference</h2>
      <p>
        {e.capital.split(" (")[0]} is on {utcOffsetText(offset)} today. When it is 12:00 noon there, the time elsewhere is:
      </p>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Place</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            {clocks.map((x) => (
              <tr key={x.label}>
                <td>{x.label}</td>
                <td>{x.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        To convert other times, use the <Link href="/en/time-zone-converter">time zone converter</Link>. For how far local clocks are from the Sun, see the{" "}
        <Link href="/en/solar-time-calculator">solar time calculator</Link>.
      </p>

      <h2 id="size">Size and distance</h2>
      <ul>
        {compareRefs.map((r) => (
          <li key={r.iso3}>
            {The} is {sizeCompare(c, r, refName(r))} ({num(r.area)} km²).
          </li>
        ))}
        {distances.map(({ r, km }) => (
          <li key={`d-${r.iso3}`}>
            {e.capital.split(" (")[0]} to {r.iso3 === "USA" ? "Washington, D.C." : "London"}: about {num(km)} km ({num(km * 0.621371)} mi) as the crow flies.
          </li>
        ))}
      </ul>

      {neighbors.length > 0 && (
        <>
          <h2 id="neighbors">Neighboring countries</h2>
          <p>
            {The} shares land borders with {neighbors.length} {neighbors.length === 1 ? "country" : "countries"}:{" "}
            {neighbors.map((n, i) => (
              <span key={n.iso3}>
                {i > 0 ? ", " : ""}
                <Link href={countryPathEn(n)} prefetch={false}>
                  {n.nameEn}
                </Link>
              </span>
            ))}
            .
          </p>
        </>
      )}
      <p>
        <small>
          Sources: country data from mledoze/countries (ODbL), capital coordinates from GeoNames (CC BY 4.0), borders from Natural Earth. Area figures may
          include inland water and differ slightly between sources.
        </small>
      </p>
    </TimeToolPage>
  );
}
