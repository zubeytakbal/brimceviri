import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import MapScaleCalculator from "../../components/geo/MapScaleCalculator";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { geoRelatedEn } from "../../converter/geo/geoTools";
import { buildLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

const path = "/en/map-scale-calculator";
const title = "Map Scale Calculator: Map Distance to Real Distance";
const description =
  "Convert map distance to real distance for any scale (1:24,000, 1:50,000, 1 inch = 1 mile), find the scale from two lengths, convert map area to acres or km² and draw a scale bar.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, ...buildLanguageAlternates({ tr: "/harita-olcegi-hesaplama", en: path }, "tr") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

const COMMON: Array<[string, string, string, string]> = [
  ["1:24,000", "USGS 7.5-minute topographic map", "1 in = 2,000 ft", "1 cm = 240 m"],
  ["1:25,000", "Ordnance Survey Explorer, most European hiking maps", "1 in ≈ 2,083 ft", "1 cm = 250 m"],
  ["1:50,000", "OS Landranger, Canadian and many national topo series", "1 in ≈ 0.79 mi", "1 cm = 500 m"],
  ["1:62,500", "Older USGS 15-minute maps", "1 in ≈ 0.99 mi", "1 cm = 625 m"],
  ["1:63,360", "“One inch to the mile”", "1 in = 1 mi", "1 cm = 633.6 m"],
  ["1:100,000", "USGS 30 × 60-minute maps", "1 in ≈ 1.58 mi", "1 cm = 1 km"],
  ["1:250,000", "Regional and aeronautical planning maps", "1 in ≈ 3.95 mi", "1 cm = 2.5 km"],
  ["1:1,000,000", "International Map of the World, wall maps", "1 in ≈ 15.8 mi", "1 cm = 10 km"],
];

const faqItems: FaqItem[] = [
  {
    question: "How do you calculate real distance from a map scale?",
    answer:
      "Multiply the distance measured on the map by the scale denominator, then convert the units. On a 1:50,000 map, 4 cm is 4 × 50,000 = 200,000 cm = 2 km. The same rule works in inches: 3 in on a 1:24,000 map is 72,000 in = 6,000 ft.",
  },
  {
    question: "What does 1:24,000 mean on a map?",
    answer:
      "One unit on the map equals 24,000 of the same unit on the ground. One inch on a 1:24,000 USGS topographic map is 24,000 inches, which is exactly 2,000 feet; one centimeter is 240 meters.",
  },
  {
    question: "How many miles is 1 inch on a map?",
    answer:
      "It depends on the scale: divide the denominator by 63,360 (the number of inches in a mile). At 1:63,360 one inch is 1 mile, at 1:250,000 it is about 3.95 miles and at 1:1,000,000 about 15.8 miles.",
  },
  {
    question: "Is 1:24,000 a larger scale than 1:100,000?",
    answer:
      "Yes. A smaller denominator means a larger scale: 1:24,000 shows a smaller area in more detail, while 1:100,000 covers more ground with less detail. “Large scale” refers to the size of the fraction, not the size of the area shown.",
  },
  {
    question: "How do you convert map area to real area?",
    answer:
      "Square the scale denominator. Real area = map area × denominator². On a 1:100,000 map, 2 cm² is 2 × 10¹⁰ cm² = 2 km². On a 1:24,000 map, 1 square inch is 2,000 ft × 2,000 ft = 4,000,000 sq ft, about 91.8 acres.",
  },
];

export default function EnglishMapScalePage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/en", label: "Home" },
        { href: "/en/geography-calculators", label: "Geography" },
        { href: path, label: "Map Scale Calculator" },
      ]}
      crumbLabel="Breadcrumb"
      title="Map Scale Calculator"
      intro="Turn a distance measured on a map into a real distance, or the other way round. You can also find the scale from two lengths, convert map area to acres or km², or switch between two scales. Every result shows its working."
      tool={<MapScaleCalculator lang="en" />}
      related={{ title: "You may also like", links: geoRelatedEn(path) }}
      tocTitle="On this page"
      tocItems={[
        { id: "what", label: "What is a map scale?" },
        { id: "common", label: "Common map scales" },
        { id: "formulas", label: "Map scale formulas" },
        { id: "examples", label: "Worked examples" },
        { id: "large-small", label: "Large scale vs small scale" },
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqTitle="Frequently Asked Questions"
      faqItems={faqItems}
    >
      <h2 id="what">What is a map scale?</h2>
      <p>
        A map scale is the ratio between a distance on the map and the same distance on the ground. It is written in three ways: as a{" "}
        <strong>representative fraction</strong> (1:24,000), as a <strong>verbal scale</strong> (“1 inch equals 2,000 feet”) or as a{" "}
        <strong>scale bar</strong>. The fraction has no units, so 1:24,000 means 1 cm to 24,000 cm just as much as 1 inch to 24,000 inches. That is why
        the calculator converts both lengths to the same unit before dividing or multiplying.
      </p>

      <h2 id="common">Common map scales</h2>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th scope="col">Scale</th>
              <th scope="col">Typical use</th>
              <th scope="col">Imperial</th>
              <th scope="col">Metric</th>
            </tr>
          </thead>
          <tbody>
            {COMMON.map(([s, use, imp, met]) => (
              <tr key={s}>
                <td>{s}</td>
                <td>{use}</td>
                <td>{imp}</td>
                <td>{met}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="formulas">Map scale formulas</h2>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th scope="col">To find</th>
              <th scope="col">Formula</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ground distance</td>
              <td>map distance × scale denominator</td>
            </tr>
            <tr>
              <td>Map distance</td>
              <td>ground distance ÷ scale denominator</td>
            </tr>
            <tr>
              <td>Scale denominator</td>
              <td>ground distance ÷ map distance (same units)</td>
            </tr>
            <tr>
              <td>Real area</td>
              <td>map area × denominator²</td>
            </tr>
            <tr>
              <td>Length after a scale change</td>
              <td>map₁ × denominator₁ = map₂ × denominator₂</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Useful constants: 1 mile = 63,360 inches = 5,280 feet; 1 km = 100,000 cm; 1 acre = 43,560 sq ft; 1 sq mi = 640 acres. For other conversions see the{" "}
        <Link href="/en/acres-to-hectares">acres to hectares</Link> converter.
      </p>

      <h2 id="examples">Worked examples</h2>
      <ol>
        <li>
          <strong>A trail measures 3.5 in on a 1:24,000 topo map. How long is it?</strong> 3.5 × 24,000 = 84,000 in = 7,000 ft ≈ 1.33 mi.
        </li>
        <li>
          <strong>How long will a 12 km road look on a 1:250,000 map?</strong> 12 km = 1,200,000 cm; 1,200,000 ÷ 250,000 = 4.8 cm.
        </li>
        <li>
          <strong>Two towns 18 miles apart are 4.5 in apart on a map. What is the scale?</strong> 18 mi = 1,140,480 in; 1,140,480 ÷ 4.5 ≈ 253,440 →
          about 1:250,000.
        </li>
        <li>
          <strong>A field covers 0.5 sq in on a 1:24,000 map. How many acres is it?</strong> 1 sq in = 4,000,000 sq ft ≈ 91.8 acres, so 0.5 sq in ≈
          45.9 acres.
        </li>
        <li>
          <strong>A lake is 6 cm long on a 1:50,000 map. How long is it on a 1:25,000 map?</strong> 6 × 50,000 = map₂ × 25,000 → 12 cm. The scale doubled,
          so lengths double and areas grow four times.
        </li>
      </ol>

      <h2 id="large-small">Large scale vs small scale</h2>
      <p>
        The smaller the denominator, the larger the scale. Large-scale maps such as 1:10,000 or 1:24,000 show a small area in great detail, which is
        what you want for hiking, surveying and city plans. Small-scale maps such as 1:1,000,000 show whole countries or continents with little
        detail. When you enlarge or shrink a printed map, the representative fraction stops being accurate but a scale bar stays correct, because it
        is resized along with the map.
      </p>
      <p>
        To check a distance you measured on a map against GPS coordinates, convert the points with the{" "}
        <Link href="/en/coordinate-converter">coordinate converter</Link>.
      </p>
    </TimeToolPage>
  );
}
