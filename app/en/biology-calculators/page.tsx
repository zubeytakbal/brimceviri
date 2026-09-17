import type { Metadata } from "next";
import Link from "next/link";
import StaticPageLayout from "../../components/StaticPageLayout";
import { getEnglishScienceToolsBySubject } from "../../i18n/englishScienceToolCatalog";
import { SITE_NAME, buildSiteUrl } from "../../siteConfig";

const pagePath = "/en/biology-calculators";
const tools = getEnglishScienceToolsBySubject("biology");

export const metadata: Metadata = { title: `Biology Calculators | ${SITE_NAME}`, description: "Focused biology learning tools with clear inputs, methods and limitations.", alternates: { canonical: pagePath, languages: { en: pagePath } }, openGraph: { title: "Biology Calculators", description: "Focused biology learning tools with clear inputs, methods and limitations.", url: buildSiteUrl(pagePath), siteName: SITE_NAME, locale: "en_US", type: "website" } };

export default function BiologyCalculatorsPage() {
  const pageUrl = buildSiteUrl(pagePath);
  const collectionSchema = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Biology Calculators", description: "Focused biology learning tools with clear inputs, methods and limitations.", url: pageUrl, inLanguage: "en-US", mainEntity: { "@type": "ItemList", numberOfItems: tools.length, itemListElement: tools.map((tool, index) => ({ "@type": "ListItem", position: index + 1, name: tool.title, url: buildSiteUrl(tool.href) })) } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c") }} /><StaticPageLayout locale="en" breadcrumbAriaLabel="Breadcrumb" breadcrumbs={[{ href: "/en", label: "Home" }, { href: "/en/applied-stem", label: "Engineering & STEM Tools" }, { label: "Biology Calculators" }]} title="Biology Calculators" description="Focused learning tools that state their input format, method and limits." sections={[{ heading: "Available tools", content: <ul className="related-conversion-list">{tools.map((tool) => <li key={tool.id}><Link href={tool.href}>{tool.title}</Link><span> — {tool.description}</span></li>)}</ul> }, { heading: "Learning, not clinical interpretation", content: <p>These tools are designed for STEM learning and data checks. They do not interpret clinical, genetic or diagnostic information.</p> }]} /></>;
}
