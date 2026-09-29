import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import SolarTimeCalculator from "../../components/geo/SolarTimeCalculator";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { geoRelatedEn } from "../../converter/geo/geoTools";
import { equationOfTimeMinutes } from "../../converter/time/solar";
import { worldCities } from "../../converter/time/worldCities";
import { buildLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

const path = "/en/solar-time-calculator";
const title = "Solar Time Calculator: Local Mean Time and Solar Noon";
const description =
  "Convert clock time to true solar time and local mean time for any longitude. Shows the equation of time, solar noon and how far your clock is from the Sun.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, ...buildLanguageAlternates({ tr: "/yerel-saat-hesaplama", en: path }, "tr") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const YEAR = 2026;

function mmss(minutes: number) {
  const s = Math.round(Math.abs(minutes) * 60);
  return `${minutes < 0 ? "−" : "+"}${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function standardOffset(timeZone: string) {
  // Ocak ortasi: kuzey yarim kurede standart saat
  const part = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "longOffset" }).formatToParts(new Date(Date.UTC(YEAR, 0, 15, 12))).find((p) => p.type === "timeZoneName")?.value;
  const m = /GMT([+-])(\d{2}):(\d{2})/.exec(part ?? "");
  if (!m) return 0;
  const v = Number(m[2]) * 60 + Number(m[3]);
  return m[1] === "-" ? -v : v;
}

const EXAMPLE_CITIES = ["new-york", "chicago", "los-angeles", "london", "madrid", "paris", "beijing", "mumbai", "tokyo"];

const faqItems: FaqItem[] = [
  {
    question: "What is solar time?",
    answer:
      "Solar time is time measured by the Sun's position. Apparent (true) solar time is what a sundial shows: it is exactly 12:00 when the Sun crosses your meridian. Local mean time smooths out the seasonal wobble so that every day is exactly 24 hours long.",
  },
  {
    question: "How do you calculate local mean time from longitude?",
    answer:
      "Take the time in UTC and add 4 minutes for every degree of longitude east (subtract for west). At 87.63° W (Chicago), local mean time is UTC − 350.5 minutes, so 18:00 UTC is 12:09:28 local mean time.",
  },
  {
    question: "What is the equation of time?",
    answer:
      "It is the difference between apparent and mean solar time, caused by the tilt of Earth's axis and its elliptical orbit. It ranges from about −14 minutes in mid-February to about +16 minutes in early November and is close to zero around April 15, June 13, September 1 and December 25.",
  },
  {
    question: "Why is solar noon not at 12:00?",
    answer:
      "Three things shift it: your distance from the time zone's reference meridian (4 minutes per degree), the equation of time (up to ±16 minutes) and daylight saving time (one hour). In Madrid, far west of the Central European meridian and on summer time, solar noon falls around 14:20 in July.",
  },
  {
    question: "Is my clock ahead of the Sun?",
    answer:
      "If you live west of your time zone's reference meridian, yes: the Sun rises, peaks and sets later by the clock. Most of the western part of each U.S. time zone, all of Spain and western China are well behind their clocks.",
  },
];

export default function EnglishSolarTimePage() {
  const eotRows = MONTHS.map((name, i) => ({ name, first: equationOfTimeMinutes(YEAR, i + 1, 1), mid: equationOfTimeMinutes(YEAR, i + 1, 15) }));
  const cityRows = EXAMPLE_CITIES.map((id) => worldCities.find((c) => c.en === id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .map((c) => {
      const offset = standardOffset(c.timeZone);
      const meridian = offset / 4;
      const shift = c.lon * 4 - offset;
      return { c, meridian, shift };
    });

  return (
    <TimeToolPage
      crumbs={[
        { href: "/en", label: "Home" },
        { href: "/en/geography-calculators", label: "Geography" },
        { href: path, label: "Solar Time Calculator" },
      ]}
      crumbLabel="Breadcrumb"
      title="Solar Time Calculator"
      intro="Find the true solar time and local mean time for any place and moment. Pick a city or enter a longitude, set the date and clock time, and see how far your clock is from the Sun, including when solar noon happens."
      tool={<SolarTimeCalculator />}
      related={{ title: "You may also like", links: geoRelatedEn(path) }}
      tocTitle="On this page"
      tocItems={[
        { id: "three-times", label: "Clock time, mean time and solar time" },
        { id: "formula", label: "The formula" },
        { id: "equation", label: "Equation of time by month" },
        { id: "cities", label: "How far clocks are from the Sun" },
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqTitle="Frequently Asked Questions"
      faqItems={faqItems}
    >
      <h2 id="three-times">Clock time, mean time and solar time</h2>
      <p>
        Before railroads, every town set its clocks by the Sun, so noon in Boston came about 12 minutes before noon in New York. Time zones replaced
        those local times in 1883 in the United States and 1884 worldwide, fixing each zone to a reference meridian every 15° (one hour). The result is
        convenient, but only places right on the reference meridian keep their clocks close to the Sun. The calculator shows three times:
      </p>
      <ul>
        <li>
          <strong>Clock (civil) time</strong>: the time of your time zone, including daylight saving time.
        </li>
        <li>
          <strong>Local mean time (LMT)</strong>: UTC shifted by 4 minutes per degree of longitude. Every LMT day is exactly 24 hours.
        </li>
        <li>
          <strong>Apparent solar time</strong>: LMT plus the equation of time. At 12:00 apparent time the Sun is due south (north in the southern
          hemisphere) and highest in the sky.
        </li>
      </ul>

      <h2 id="formula">The formula</h2>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <tbody>
            <tr>
              <td>UTC</td>
              <td>clock time − UTC offset (including DST)</td>
            </tr>
            <tr>
              <td>Local mean time</td>
              <td>UTC + 4 min × longitude (east +, west −)</td>
            </tr>
            <tr>
              <td>Apparent solar time</td>
              <td>local mean time + equation of time</td>
            </tr>
            <tr>
              <td>Solar noon (clock time)</td>
              <td>12:00 − 4 min × longitude − equation of time + UTC offset</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The equation of time uses the NOAA approximation, accurate to about half a minute; solar noon is typically within a minute of an ephemeris.
        For sunrise, sunset and golden hour, use the <Link href="/en/golden-hour">golden hour calculator</Link>.
      </p>

      <h2 id="equation">Equation of time by month</h2>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th scope="col">Month</th>
              <th scope="col">1st (min:s)</th>
              <th scope="col">15th (min:s)</th>
            </tr>
          </thead>
          <tbody>
            {eotRows.map((r) => (
              <tr key={r.name}>
                <td>{r.name}</td>
                <td>{mmss(r.first)}</td>
                <td>{mmss(r.mid)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        A positive value means the sundial is ahead of mean time. Values repeat almost exactly every year ({YEAR} shown).
      </p>

      <h2 id="cities">How far clocks are from the Sun</h2>
      <p>Standard time, without the equation of time. During daylight saving time the Sun falls a further hour behind the clock.</p>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th scope="col">City</th>
              <th scope="col">Longitude</th>
              <th scope="col">Zone meridian</th>
              <th scope="col">Mean solar time vs. clock</th>
            </tr>
          </thead>
          <tbody>
            {cityRows.map(({ c, meridian, shift }) => (
              <tr key={c.en}>
                <td>{c.nameEn}</td>
                <td>
                  {Math.abs(c.lon).toFixed(2)}° {c.lon >= 0 ? "E" : "W"}
                </td>
                <td>
                  {Math.abs(meridian)}° {meridian >= 0 ? "E" : "W"}
                </td>
                <td>
                  {Math.round(Math.abs(shift))} min {shift >= 0 ? "ahead" : "behind"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Madrid shows how far a clock can drift: Spain has used Central European Time since 1940, even though it lies mostly west of Greenwich. China uses a
        single UTC+8 zone, which keeps Beijing close to the Sun but leaves Kashgar in the far west almost three hours behind. To compare the official
        time between places instead, use the <Link href="/en/time-zone-converter">time zone converter</Link> or the{" "}
        <Link href="/en/world-clock">world clock</Link>.
      </p>
    </TimeToolPage>
  );
}
