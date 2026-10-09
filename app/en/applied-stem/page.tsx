import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
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
  title: `Engineering & STEM Tools`,
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

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c") }} /><StaticPageLayout locale="en" breadcrumbAriaLabel="Breadcrumb" breadcrumbs={[{ href: "/en", label: "Home" }, { label: "Engineering & STEM Tools" }]} title="Engineering & STEM Tools" description={`${englishAppliedStemCalculatorCount} focused tools for technical calculation and STEM learning.`} sections={[{ heading: "Choose a technical area", content: <ul className="related-conversion-list">{toolsBySection.map((section) => <li key={section.id}><Link href={section.href}>{section.title}</Link><span> — {section.description} {section.count} available tools.</span></li>)}</ul> }, { heading: "How these tools are designed", content: <p>Each tool should state its unit system, formula inputs and important limits. They are focused calculators for a defined task, not replacements for laboratory procedures, engineering design review or specialist software.</p> }, { heading: "Example: from a lab question to an engineering check", content: <div className="category-article-content"><p>The areas above often meet in one task. To prepare 500 mL of a 0.2 M sodium chloride solution, the <Link href="/en/chemistry-calculators/molarity">molarity calculator</Link> gives 0.2 mol/L × 0.5 L × 58.44 g/mol ≈ 5.84 g of NaCl. If the solution is pumped through a 20 m hose, the pressure-loss and flow tools in the engineering section estimate the pump head needed, and the <Link href="/en/categories/pressure">pressure converter</Link> turns the result into bar or psi for the pump datasheet.</p><p>Each step uses SI units internally. When a tool asks for a value in a different unit, it says so next to the input; converting before you type avoids the most common source of wrong answers, which is a factor-of-1,000 slip between grams and kilograms or millilitres and litres.</p></div> }, { heading: "Checking a result", content: <ul className="related-conversion-list"><li><strong>Order of magnitude:</strong> estimate the answer roughly first; a result 1,000 times larger or smaller usually means a unit slip.</li><li><strong>Units on both sides:</strong> write the units through the calculation and confirm they cancel to the unit you expect.</li><li><strong>Worked example:</strong> every calculator page has one; reproduce it before entering your own numbers.</li><li><strong>Limits:</strong> read the &quot;Important limits&quot; section; most formulas assume ideal conditions such as dilute solutions, steady flow or constant temperature.</li></ul> }]} /></>;
}
