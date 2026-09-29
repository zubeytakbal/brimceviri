import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { worldCountries } from "../../converter/geo/worldCountries";
import { WORLD_REGIONS_EN } from "../../converter/geo/worldCountriesEn";
import { countryPathEn, enOf, utcOffsetOf, utcOffsetText } from "../../converter/geo/worldGeoEn";
import { buildLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

// Yaz saati gecisleri icin gunluk yenilenir.
export const revalidate = 86400;

const path = "/en/countries";
const title = "Countries and Capitals of the World (List by Continent)";
const description = `All ${worldCountries.length} countries of the world with their capitals, area, UTC offset and calling code, grouped by continent. Click any country for its map and facts.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, ...buildLanguageAlternates({ tr: "/ulkeler", en: path, de: "/de/laender" }, "tr") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const faqItems: FaqItem[] = [
  {
    question: "How many countries are there in the world?",
    answer:
      "The United Nations has 193 member states and 2 observer states (the Holy See/Vatican City and Palestine), for 195 in total. This list also includes Kosovo and Northern Cyprus, which have limited recognition.",
  },
  {
    question: "Which continent has the most countries?",
    answer:
      "Africa, with 54 UN member states. Europe and Asia follow with more than 40 each, depending on how transcontinental countries such as Russia, Türkiye and Kazakhstan are counted.",
  },
  {
    question: "Which countries have a capital that is not their largest city?",
    answer:
      "Many do: the United States (Washington, D.C. vs New York), Canada (Ottawa vs Toronto), Australia (Canberra vs Sydney), Brazil (Brasília vs São Paulo), Türkiye (Ankara vs Istanbul), Nigeria (Abuja vs Lagos) and Pakistan (Islamabad vs Karachi).",
  },
  {
    question: "Which countries have more than one capital?",
    answer:
      "South Africa has three: Pretoria (executive), Cape Town (legislative) and Bloemfontein (judicial). Bolivia's constitutional capital is Sucre while the government sits in La Paz, and the Netherlands' capital is Amsterdam while the government is in The Hague.",
  },
];

export default function EnglishCountriesPage() {
  const now = new Date();
  const regionOf = (c: (typeof worldCountries)[number]) => WORLD_REGIONS_EN[c.region];
  return (
    <TimeToolPage
      crumbs={[
        { href: "/en", label: "Home" },
        { href: "/en/geography-calculators", label: "Geography" },
        { href: path, label: "Countries" },
      ]}
      crumbLabel="Breadcrumb"
      title="Countries and Capitals of the World"
      intro={`The capital, area, current UTC offset and calling code of all ${worldCountries.length} countries, grouped by continent. Click a country name for its map, neighbors, currency and languages, or explore the interactive world map.`}
      tool={
        <div className="country-region-nav">
          {REGIONS.map((r) => (
            <a key={r} href={`#${r.toLowerCase()}`} className="time-tool-button is-secondary">
              {r} ({worldCountries.filter((c) => regionOf(c) === r).length})
            </a>
          ))}
          <Link href="/en/world-map" className="time-tool-button">
            🗺️ World map
          </Link>
        </div>
      }
      related={{
        title: "You may also like",
        links: [
          { href: "/en/world-map", label: "World Map" },
          { href: "/en/world-clock", label: "World Clock" },
          { href: "/en/time-zone-converter", label: "Time Zone Converter" },
          { href: "/en/coordinate-converter", label: "Coordinate Converter" },
          { href: "/en/geography-calculators", label: "Geography Calculators" },
        ],
      }}
      tocTitle="On this page"
      tocItems={[...REGIONS.map((r) => ({ id: r.toLowerCase(), label: `Countries in ${r}` })), { id: "faq", label: "Frequently asked questions" }]}
      faqTitle="Frequently Asked Questions"
      faqItems={faqItems}
    >
      {REGIONS.map((r) => {
        const list = worldCountries.filter((c) => regionOf(c) === r).sort((a, b) => a.nameEn.localeCompare(b.nameEn, "en"));
        return (
          <div key={r}>
            <h2 id={r.toLowerCase()}>
              Countries in {r} and their capitals ({list.length})
            </h2>
            <div className="holiday-table-wrap">
              <table className="holiday-table">
                <thead>
                  <tr>
                    <th scope="col">Country</th>
                    <th scope="col">Capital</th>
                    <th scope="col">Area</th>
                    <th scope="col">UTC offset</th>
                    <th scope="col">Code</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((c) => (
                    <tr key={c.iso3}>
                      <td>
                        <Link href={countryPathEn(c)} prefetch={false}>
                          {c.flag} {c.nameEn}
                        </Link>
                      </td>
                      <td>{enOf(c).capital}</td>
                      <td>{c.area.toLocaleString("en-US")} km²</td>
                      <td>{utcOffsetText(utcOffsetOf(c, now))}</td>
                      <td>{c.phone || "—"}</td>
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
          UTC offsets are for each capital today and change during the year in countries that observe daylight saving time. Sources: mledoze/countries
          (ODbL), GeoNames.
        </small>
      </p>
    </TimeToolPage>
  );
}
