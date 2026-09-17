import type { Metadata } from "next";
import Link from "next/link";
import StaticPageLayout from "../../components/StaticPageLayout";
import { getEnglishScienceToolsBySubject } from "../../i18n/englishScienceToolCatalog";
import { SITE_NAME, buildSiteUrl } from "../../siteConfig";

const pagePath = "/en/physics-calculators";
const tools = getEnglishScienceToolsBySubject("physics");

export const metadata: Metadata = {
  title: `Physics Calculators | ${SITE_NAME}`,
  description: "Focused SI physics calculators for speed, force and kinetic energy, with formulas, units and stated limits.",
  alternates: { canonical: pagePath, languages: { en: pagePath } },
  openGraph: { title: "Physics Calculators", description: "Focused SI physics calculators with formulas, units and stated limits.", url: buildSiteUrl(pagePath), siteName: SITE_NAME, locale: "en_US", type: "website" },
};

export default function PhysicsCalculatorsPage() {
  const pageUrl = buildSiteUrl(pagePath);
  const collectionSchema = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Physics Calculators", description: "Focused SI physics calculators for speed, force and kinetic energy, with formulas, units and stated limits.", url: pageUrl, inLanguage: "en-US", mainEntity: { "@type": "ItemList", numberOfItems: tools.length, itemListElement: tools.map((tool, index) => ({ "@type": "ListItem", position: index + 1, name: tool.title, url: buildSiteUrl(tool.href) })) } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c") }} /><StaticPageLayout locale="en" breadcrumbAriaLabel="Breadcrumb" breadcrumbs={[{ href: "/en", label: "Home" }, { href: "/en/applied-stem", label: "Engineering & STEM Tools" }, { label: "Physics Calculators" }]} title="Physics Calculators" description="Open a focused SI calculator and see the formula, inputs, worked example and limits before using the result." sections={[{ heading: "Available tools", content: <ul className="related-conversion-list">{tools.map((tool) => <li key={tool.id}><Link href={tool.href}>{tool.title}</Link><span> — {tool.description}</span></li>)}</ul> }, { heading: "Using these tools", content: <p>Use consistent SI inputs and treat each result as a calculation check. More complex systems may require vector analysis, uncertainty analysis or professional review.</p> }]} /></>;
}
