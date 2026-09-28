import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import CoordinateConverter from "../../components/geo/CoordinateConverter";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { geoRelatedEn } from "../../converter/geo/geoTools";
import { buildLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

const path = "/en/coordinate-converter";
const title = "Coordinate Converter: DMS to Decimal Degrees and UTM";
const description =
  "Convert GPS coordinates between decimal degrees, degrees minutes seconds (DMS), degrees decimal minutes and UTM. Paste any format, use your location and copy the result.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, ...buildLanguageAlternates({ tr: "/koordinat-donusturucu", en: path }, "tr") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

const PRECISION: Array<[number, string, string]> = [
  [1, "11.1 km", "A large city or district"],
  [2, "1.1 km", "A village or neighborhood"],
  [3, "111 m", "A large field or campus"],
  [4, "11.1 m", "A building or parcel of land"],
  [5, "1.1 m", "A tree or a parked car; typical phone GPS"],
  [6, "11 cm", "Survey-grade receivers"],
];

const faqItems: FaqItem[] = [
  {
    question: "How do you convert DMS to decimal degrees?",
    answer:
      "Decimal degrees = degrees + minutes ÷ 60 + seconds ÷ 3,600. For 40°41′21″ N: 40 + 41/60 + 21/3,600 = 40.689167°. Latitudes south of the equator and longitudes west of Greenwich are written with a minus sign.",
  },
  {
    question: "How do you convert decimal degrees to degrees, minutes and seconds?",
    answer:
      "Keep the whole number as degrees, multiply the decimal part by 60 to get minutes, then multiply the remaining decimal by 60 for seconds. For −74.0445: 74°, 0.0445 × 60 = 2.67′ → 2′, 0.67 × 60 = 40.2″, so 74°02′40.2″ W.",
  },
  {
    question: "How do I get coordinates from Google Maps?",
    answer:
      "On a computer, right-click the spot on the map; the first line of the menu shows the latitude and longitude in decimal degrees and copies them when clicked. On a phone, press and hold to drop a pin and the coordinates appear in the search box.",
  },
  {
    question: "What is a UTM coordinate?",
    answer:
      "Universal Transverse Mercator divides the world into 60 zones, each 6° of longitude wide, and gives positions in meters: an easting (distance from a false origin 500,000 m west of the zone's central meridian) and a northing (distance from the equator, plus 10,000,000 m in the southern hemisphere).",
  },
  {
    question: "Which UTM zone am I in?",
    answer:
      "Zone number = floor((longitude + 180) ÷ 6) + 1. The contiguous United States spans zones 10 (West Coast) to 19 (Maine); New York City is in zone 18, Chicago in 16, Denver in 13 and Los Angeles in 11. Norway and Svalbard have a few special wider zones.",
  },
  {
    question: "Are WGS84 and NAD83 coordinates the same?",
    answer:
      "Almost. GPS uses WGS84, while most U.S. maps use NAD83. In North America the two differ by about 1 to 2 meters, which matters for surveying but not for navigation or hiking.",
  },
];

export default function EnglishCoordinateConverterPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/en", label: "Home" },
        { href: "/en/geography-calculators", label: "Geography" },
        { href: path, label: "Coordinate Converter" },
      ]}
      crumbLabel="Breadcrumb"
      title="Coordinate Converter"
      intro="Paste coordinates in any common format: decimal degrees, degrees minutes seconds or degrees decimal minutes. You can also enter a UTM position. The converter shows every other format at once, with copy buttons and links to open the point on a map."
      tool={<CoordinateConverter lang="en" />}
      related={{ title: "You may also like", links: geoRelatedEn(path) }}
      tocTitle="On this page"
      tocItems={[
        { id: "formats", label: "Coordinate formats" },
        { id: "dms", label: "DMS and decimal degrees" },
        { id: "precision", label: "How many decimal places?" },
        { id: "utm", label: "UTM coordinates" },
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqTitle="Frequently Asked Questions"
      faqItems={faqItems}
    >
      <h2 id="formats">Coordinate formats</h2>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th scope="col">Format</th>
              <th scope="col">Example (Statue of Liberty)</th>
              <th scope="col">Used by</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Decimal degrees (DD)</td>
              <td>40.68925, −74.04450</td>
              <td>Google Maps, web maps, spreadsheets</td>
            </tr>
            <tr>
              <td>Degrees minutes seconds (DMS)</td>
              <td>40°41′21.3″ N 74°02′40.2″ W</td>
              <td>Paper maps, deeds, aviation charts</td>
            </tr>
            <tr>
              <td>Degrees decimal minutes (DDM)</td>
              <td>40°41.3550′ N 74°02.6700′ W</td>
              <td>Marine GPS, geocaching</td>
            </tr>
            <tr>
              <td>UTM</td>
              <td>18T 580735.8 E 4504700.7 N</td>
              <td>Topographic maps, search and rescue, GIS</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The converter accepts commas or spaces between latitude and longitude, the hemisphere letters N, S, E and W, and the symbols °, ′ and ″ or
        plain apostrophes and quotes.
      </p>

      <h2 id="dms">DMS and decimal degrees</h2>
      <p>
        A degree is divided into 60 minutes and a minute into 60 seconds, just like an hour. To go from DMS to decimal degrees, divide minutes by 60 and
        seconds by 3,600 and add them to the degrees. To go the other way, multiply the fractional part by 60 twice. The sign carries the hemisphere:
        north and east are positive, south and west are negative. So <code>33°52′08″ S 151°12′30″ E</code> (Sydney) becomes{" "}
        <code>−33.868889, 151.208333</code>.
      </p>

      <h2 id="precision">How many decimal places?</h2>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th scope="col">Decimal places</th>
              <th scope="col">Precision at the equator</th>
              <th scope="col">Enough to identify</th>
            </tr>
          </thead>
          <tbody>
            {PRECISION.map(([d, m, what]) => (
              <tr key={d}>
                <td>{d}</td>
                <td>{m}</td>
                <td>{what}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        One degree of latitude is about 111 km everywhere. A degree of longitude shrinks towards the poles by the cosine of the latitude: about 85 km at
        40° N and 56 km at 60° N.
      </p>

      <h2 id="utm">UTM coordinates</h2>
      <p>
        UTM splits the Earth between 80° S and 84° N into 60 zones of 6° longitude, each with its own transverse Mercator projection. Inside a zone,
        positions are given in meters, which makes measuring distances on a map easy: two points 1,000 m apart in easting are one kilometer apart. The
        letter after the zone number (C to X, skipping I and O) is the latitude band. It is not needed for the math, but it tells you the hemisphere at a
        glance: N and above are north of the equator. The converter uses the WGS84 ellipsoid and the Krüger series, which are accurate to well under a
        millimeter inside a zone.
      </p>
      <p>
        To measure the straight-line distance between two coordinates, use the <Link href="/en/map-scale-calculator">map scale calculator</Link> for
        paper maps, or see the <Link href="/en/world-map">world map</Link> for countries and capitals.
      </p>
    </TimeToolPage>
  );
}
