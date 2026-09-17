import type { Metadata } from "next";
import Link from "next/link";
import { getEnglishCategoryPathByCategory } from "../../converter/localizedCategoryPages";
import { englishUnitPages } from "../../converter/localizedUnitPages";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "Unit Guide: Definitions, Symbols and History",
  description:
    "Explore measurement units, their symbols, definitions, historical context and related conversion tools.",
  alternates: {
    canonical: "/en/units",
    languages: {
      tr: "/birimler",
      en: "/en/units",
      "x-default": "/birimler",
    },
  },
  openGraph: {
    title: "Unit Guide | BirimCeviri.app",
    description:
      "Explore measurement units, their symbols, definitions, history and conversion relationships.",
    url: buildSiteUrl("/en/units"),
    siteName: "BirimCeviri.app",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Unit Guide | BirimCeviri.app",
    description:
      "Explore measurement units, their symbols, definitions, history and conversion relationships.",
  },
};

const unitGroupDefinitions = [
  { title: "Length units", category: "uzunluk" },
  { title: "Mass units", category: "kutle" },
  { title: "Volume units", category: "hacim" },
  { title: "Area units", category: "alan" },
  { title: "Pressure units", category: "basinc" },
  { title: "Temperature units", category: "sicaklik" },
  { title: "Speed units", category: "hiz" },
  { title: "Energy units", category: "enerji" },
  { title: "Power units", category: "guc" },
  { title: "Data storage units", category: "veri" },
  { title: "Time units", category: "zaman" },
  { title: "Electrical units", category: "elektrik" },
  { title: "Density units", category: "yogunluk" },
  { title: "Force units", category: "kuvvet" },
  { title: "Torque units", category: "tork" },
  { title: "Momentum units", category: "momentum" },
  { title: "Angle units", category: "aci" },
  { title: "Frequency units", category: "frekans" },
  { title: "Flow-rate units", category: "debi" },
  { title: "Capacitance units", category: "kapasitans" },
  { title: "Inductance units", category: "enduktans" },
] as const;

export default function EnglishUnitsPage() {
  const unitGroups = unitGroupDefinitions
    .map((definition) => ({
      ...definition,
      units: englishUnitPages.filter(
        (unitPage) => unitPage.category === definition.category
      ),
    }))
    .filter((group) => group.units.length > 0);

  return (
    <main className="units-index-page" lang="en">
      <div className="units-index-shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/en">Home</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Unit Guide</span>
        </nav>

        <header className="units-index-header">
          <p>Units and measurement</p>
          <h1>Unit Guide</h1>
          <span>
            Explore definitions, symbols, history and related conversion tools
            for measurement units.
          </span>
        </header>

        {unitGroups.map((group) => (
          <UnitGroup
            key={group.category}
            title={group.title}
            categoryHref={getEnglishCategoryPathByCategory(group.category)}
            units={group.units}
          />
        ))}
      </div>
    </main>
  );
}

function UnitGroup({
  title,
  categoryHref,
  units,
}: {
  title: string;
  categoryHref: string;
  units: typeof englishUnitPages;
}) {
  return (
    <section className="units-index-section">
      <div className="units-index-heading">
        <h2>{title}</h2>
        <Link href={categoryHref}>View conversions</Link>
      </div>

      <ul className="units-index-list">
        {units.map((unitPage) => (
          <li key={unitPage.slug}>
            <Link href={`/en/units/${unitPage.slug}`}>
              <strong>{unitPage.symbol}</strong>
              <span>
                {unitPage.name}
                <small>{unitPage.shortDescription}</small>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
