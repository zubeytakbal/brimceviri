import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { geoGroupLabelsEn, geoToolsEn, type GeoTool } from "../../converter/geo/geoTools";
import { buildLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

const path = "/en/geography-calculators";
const title = "Geography Calculators: Map Scale, Coordinates, Solar Time";
const description =
  "Free geography tools: map scale calculator, GPS coordinate converter (DMS, decimal, UTM), solar time calculator, an interactive world map and facts for 196 countries.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, ...buildLanguageAlternates({ tr: "/cografya-hesaplamalari", en: path }, "tr") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "Who are these tools for?",
    answer:
      "Students working on map skills and latitude-longitude problems, hikers reading topographic maps, and anyone who needs to convert GPS coordinates or look up a country's capital, time zone or size.",
  },
  {
    question: "Can I use the results for surveying or legal documents?",
    answer:
      "The tools are for information and checking. For surveying, property boundaries or engineering work, rely on official survey data and a licensed surveyor.",
  },
];

const groups = (Object.keys(geoGroupLabelsEn) as GeoTool["group"][]).filter((g) => geoToolsEn.some((t) => t.group === g));

export default function EnglishGeographyHubPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/en", label: "Home" },
        { href: path, label: "Geography Calculators" },
      ]}
      crumbLabel="Breadcrumb"
      title="Geography Calculators"
      intro="Tools for maps, coordinates, time and the countries of the world. Each one explains its formula and includes worked examples."
      tool={
        <div className="geo-hub">
          {groups.map((g) => (
            <section className="science-hub-group" key={g}>
              <h2>{geoGroupLabelsEn[g]}</h2>
              <ul className="science-hub-tools">
                {geoToolsEn
                  .filter((t) => t.group === g)
                  .map((t) => (
                    <li key={t.href}>
                      <Link href={t.href} prefetch={false}>
                        <strong>{t.title}</strong>
                        <span>{t.description}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      }
      tocTitle="On this page"
      tocItems={[
        { id: "basics", label: "Key geography formulas" },
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqTitle="Frequently Asked Questions"
      faqItems={faqItems}
    >
      <h2 id="basics">Key geography formulas</h2>
      <ul>
        <li>
          <strong>Map scale:</strong> ground distance = map distance × scale denominator; for areas, multiply by the denominator squared.{" "}
          <Link href="/en/map-scale-calculator">Map scale calculator</Link>
        </li>
        <li>
          <strong>Coordinates:</strong> 1° = 60 minutes = 3,600 seconds, so decimal degrees = degrees + minutes/60 + seconds/3,600.{" "}
          <Link href="/en/coordinate-converter">Coordinate converter</Link>
        </li>
        <li>
          <strong>Solar time:</strong> the Sun moves 15° of longitude an hour, or 1° every 4 minutes; places to the east see solar noon earlier.{" "}
          <Link href="/en/solar-time-calculator">Solar time calculator</Link>
        </li>
        <li>
          <strong>Distance:</strong> 1° of latitude is about 111 km (69 mi) everywhere; 1° of longitude is 111 km at the equator and shrinks with the
          cosine of the latitude. <Link href="/en/world-map">World map</Link>
        </li>
      </ul>
    </TimeToolPage>
  );
}
