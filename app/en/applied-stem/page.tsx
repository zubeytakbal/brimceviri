import type { Metadata } from "next";
import Link from "next/link";
import StaticPageLayout from "../../components/StaticPageLayout";
import { englishAppliedStemCalculatorCount, getEnglishToolsByDomain } from "../../i18n/englishToolRegistry";
import { SITE_NAME, buildSiteUrl } from "../../siteConfig";

const pagePath = "/en/applied-stem";
const sections = [
  { id: "engineering", href: "/en/engineering-calculators", title: "Engineering", description: "Electrical, fluids and piping, heat-transfer, mechanics and materials tools." },
  { id: "chemistry", href: "/en/chemistry-calculators", title: "Chemistry", description: "Solutions, reactions, equilibrium and electrochemistry." },
  { id: "science", href: "/en/science-calculators", title: "Science learning", description: "Focused mathematics, physics and biology tools with stated units and limits." },
] as const;

export const metadata: Metadata = {
  title: `Engineering & STEM Tools | ${SITE_NAME}`,
  description: "Focused engineering, chemistry, mathematics, physics and biology calculators with clear units and assumptions.",
  alternates: { canonical: pagePath, languages: { en: pagePath } },
  openGraph: { title: "Engineering & STEM Tools", description: "Focused engineering, chemistry and science calculators with clear units and assumptions.", url: buildSiteUrl(pagePath), siteName: SITE_NAME, locale: "en_US", type: "website" },
};

export default function AppliedStemPage() {
  const toolsBySection = sections.map((section) => ({ ...section, count: getEnglishToolsByDomain(section.id === "science" ? "science" : section.id).length }));
  const pageUrl = buildSiteUrl(pagePath);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Engineering & STEM Tools",
    description: `${englishAppliedStemCalculatorCount} focused tools for technical calculation and STEM learning.`,
    url: pageUrl,
    inLanguage: "en-US",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: toolsBySection.length,
      itemListElement: toolsBySection.map((section, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: section.title,
        url: buildSiteUrl(section.href),
      })),
    },
  };

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c") }} /><StaticPageLayout locale="en" breadcrumbAriaLabel="Breadcrumb" breadcrumbs={[{ href: "/en", label: "Home" }, { label: "Engineering & STEM Tools" }]} title="Engineering & STEM Tools" description={`${englishAppliedStemCalculatorCount} focused tools for technical calculation and STEM learning.`} sections={[{ heading: "Choose a technical area", content: <ul className="related-conversion-list">{toolsBySection.map((section) => <li key={section.id}><Link href={section.href}>{section.title}</Link><span> — {section.description} {section.count} available tools.</span></li>)}</ul> }, { heading: "How these tools are designed", content: <p>Each tool should state its unit system, formula inputs and important limits. They are focused calculators for a defined task, not replacements for laboratory procedures, engineering design review or specialist software.</p> }]} /></>;
}
