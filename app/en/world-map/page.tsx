import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { scaleColor } from "../../components/geo/TurkeyMap";
import WorldMap from "../../components/geo/WorldMap";
import WorldMapExplorer, { type ExplorerCountry } from "../../components/geo/WorldMapExplorer";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { geoRelatedEn } from "../../converter/geo/geoTools";
import { WORLD_REGION_COLORS } from "../../converter/geo/worldGeo";
import { worldCountries } from "../../converter/geo/worldCountries";
import { WORLD_REGIONS_EN } from "../../converter/geo/worldCountriesEn";
import { countryPathEn, enOf, utcOffsetOf, utcOffsetText } from "../../converter/geo/worldGeoEn";
import { buildLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

// Yaz saati gecisleri icin gunluk yenilenir.
export const revalidate = 86400;

const path = "/en/world-map";
const title = "Interactive World Map with Countries and Capitals";
const description =
  "Clickable political world map of 196 countries. See each country's capital, area and UTC offset, and switch between continent, area and time zone layers.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, ...buildLanguageAlternates({ tr: "/dunya-haritasi", en: path }, "tr") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

function offsetColor(minutes: number) {
  // UTC'nin batisi mavi, dogusu turuncu
  const t = Math.max(-1, Math.min(1, minutes / 720));
  if (t === 0) return "#e4efe9";
  const a = Math.abs(t);
  const base = t < 0 ? [60, 120, 190] : [220, 110, 60];
  const mix = [236, 242, 240].map((v, i) => Math.round(v + (base[i] - v) * a));
  return `rgb(${mix.join(",")})`;
}

const faqItems: FaqItem[] = [
  {
    question: "How many countries are on this map?",
    answer:
      "196: the 193 UN member states, the two UN observer states (Vatican City and Palestine), and Kosovo. Northern Cyprus is also shown separately. Territories such as Greenland, Taiwan and Western Sahara are drawn in grey.",
  },
  {
    question: "What is the largest country in the world?",
    answer: "Russia, at about 17.1 million km² (6.6 million sq mi), followed by Canada, China, the United States and Brazil.",
  },
  {
    question: "Why do countries look a different size than on other maps?",
    answer:
      "Every flat map distorts the round Earth. This map uses the Natural Earth projection, which balances distortion of area and shape. The familiar Mercator projection keeps shapes but greatly enlarges areas near the poles, so Greenland looks as big as Africa even though Africa is about 14 times larger.",
  },
];

export default function EnglishWorldMapPage() {
  const now = new Date();
  const maxLogArea = Math.log10(Math.max(...worldCountries.map((c) => c.area)));
  const regionColorsEn = Object.fromEntries(Object.entries(WORLD_REGION_COLORS).map(([tr, color]) => [WORLD_REGIONS_EN[tr] ?? tr, color]));
  const layers = {
    kita: Object.fromEntries(worldCountries.map((c) => [c.iso3, WORLD_REGION_COLORS[c.region] ?? "#cfe3e8"])),
    alan: Object.fromEntries(worldCountries.map((c) => [c.iso3, scaleColor(Math.log10(Math.max(c.area, 1)), 2, maxLogArea)])),
    saat: Object.fromEntries(worldCountries.map((c) => [c.iso3, offsetColor(utcOffsetOf(c, now))])),
  };
  const explorer: Record<string, ExplorerCountry> = Object.fromEntries(
    worldCountries.map((c) => {
      const e = enOf(c);
      return [
        c.iso3,
        {
          iso3: c.iso3,
          id: e.id,
          nameTr: c.nameEn,
          flag: c.flag,
          capital: e.capital,
          area: c.area,
          region: e.subregion ? `${e.region} · ${e.subregion}` : e.region,
          timeDiff: utcOffsetText(utcOffsetOf(c, now)),
          distance: 0,
        },
      ];
    })
  );
  const biggest = [...worldCountries].sort((a, b) => b.area - a.area).slice(0, 10);

  return (
    <TimeToolPage
      crumbs={[
        { href: "/en", label: "Home" },
        { href: "/en/geography-calculators", label: "Geography" },
        { href: path, label: "World Map" },
      ]}
      crumbLabel="Breadcrumb"
      title="World Map"
      intro="Click a country to see its capital, area and current UTC offset. Switch between continent, area and time zone layers."
      tool={
        <WorldMapExplorer
          lang="en"
          countries={explorer}
          map={<WorldMap lang="en" ariaLabel="Political world map" layers={layers} selectable titleFor={(c) => `${c.nameEn} (${enOf(c).capital})`} />}
          legend={{
            kita: (
              <>
                {Object.entries(regionColorsEn).map(([r, color]) => (
                  <span key={r}>
                    <span className="tr-map-legend-swatch" style={{ background: color }} /> {r}
                  </span>
                ))}
              </>
            ),
            alan: (
              <>
                <span className="tr-map-legend-bar" /> Small → large area (logarithmic scale)
              </>
            ),
            saat: (
              <>
                <span className="tr-map-legend-swatch" style={{ background: "rgb(60,120,190)" }} /> behind UTC{" "}
                <span className="tr-map-legend-swatch" style={{ background: "#e4efe9" }} /> UTC{" "}
                <span className="tr-map-legend-swatch" style={{ background: "rgb(220,110,60)" }} /> ahead (capital&apos;s time today)
              </>
            ),
          }}
        />
      }
      related={{ title: "You may also like", links: geoRelatedEn(path) }}
      tocTitle="On this page"
      tocItems={[
        { id: "largest", label: "The 10 largest countries" },
        { id: "continents", label: "Countries by continent" },
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqTitle="Frequently Asked Questions"
      faqItems={faqItems}
    >
      <h2 id="largest">The 10 largest countries</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Country</th>
              <th scope="col">Area (km²)</th>
              <th scope="col">Area (sq mi)</th>
            </tr>
          </thead>
          <tbody>
            {biggest.map((c, i) => (
              <tr key={c.iso3}>
                <td>{i + 1}</td>
                <td>
                  <Link href={countryPathEn(c)} prefetch={false}>
                    {c.flag} {c.nameEn}
                  </Link>
                </td>
                <td>{c.area.toLocaleString("en-US")}</td>
                <td>{Math.round(c.area * 0.386102).toLocaleString("en-US")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="continents">Countries by continent</h2>
      <ul>
        {["Africa", "Americas", "Asia", "Europe", "Oceania"].map((r) => (
          <li key={r}>
            <Link href={`/en/countries#${r.toLowerCase()}`}>{r}</Link>: {worldCountries.filter((c) => WORLD_REGIONS_EN[c.region] === r).length} countries
          </li>
        ))}
      </ul>
      <p>
        The full list with capitals, UTC offsets and calling codes is on the <Link href="/en/countries">countries and capitals</Link> page. To convert areas
        between km², square miles and acres, see the <Link href="/en/acres-to-hectares">land area converter</Link>.
      </p>
      <p>
        <small>
          Sources: borders from Natural Earth (1:110m), country data from mledoze/countries (ODbL), capital coordinates from GeoNames. Northern Cyprus,
          recognized only by Türkiye, is shown separately.
        </small>
      </p>
    </TimeToolPage>
  );
}
