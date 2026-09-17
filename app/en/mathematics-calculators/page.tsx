import type { Metadata } from "next";
import Link from "next/link";
import StaticPageLayout from "../../components/StaticPageLayout";
import { getEnglishScienceToolsBySubject } from "../../i18n/englishScienceToolCatalog";
import { SITE_NAME, buildSiteUrl } from "../../siteConfig";

const pagePath = "/en/mathematics-calculators";
const tools = getEnglishScienceToolsBySubject("mathematics");

export const metadata: Metadata = { title: `Mathematics Calculators | ${SITE_NAME}`, description: "Focused mathematics calculators for percentages, arithmetic means and real quadratic roots with methods and limits.", alternates: { canonical: pagePath, languages: { en: pagePath } }, openGraph: { title: "Mathematics Calculators", description: "Focused mathematics calculators with methods, worked examples and limits.", url: buildSiteUrl(pagePath), siteName: SITE_NAME, locale: "en_US", type: "website" } };

export default function MathematicsCalculatorsPage() {
  const pageUrl = buildSiteUrl(pagePath);
  const collectionSchema = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Mathematics Calculators", description: "Focused mathematics calculators for percentages, arithmetic means and real quadratic roots with methods and limits.", url: pageUrl, inLanguage: "en-US", mainEntity: { "@type": "ItemList", numberOfItems: tools.length, itemListElement: tools.map((tool, index) => ({ "@type": "ListItem", position: index + 1, name: tool.title, url: buildSiteUrl(tool.href) })) } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c") }} /><StaticPageLayout locale="en" breadcrumbAriaLabel="Breadcrumb" breadcrumbs={[{ href: "/en", label: "Home" }, { href: "/en/applied-stem", label: "Engineering & STEM Tools" }, { label: "Mathematics Calculators" }]} title="Mathematics Calculators" description="Open a focused calculator and review its formula, variables, worked example and important limits." sections={[{ heading: "Available tools", content: <ul className="related-conversion-list">{tools.map((tool) => <li key={tool.id}><Link href={tool.href}>{tool.title}</Link><span> — {tool.description}</span></li>)}</ul> }, { heading: "A focused mathematics collection", content: <p>These pages solve defined tasks rather than acting as a general-purpose symbolic solver. That keeps units, assumptions and the intended method visible.</p> }]} /></>;
}
