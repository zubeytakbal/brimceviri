import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import StaticPageLayout from "../../components/StaticPageLayout";
import { ENGLISH_HUB_GUIDES } from "../../i18n/englishHubGuides";
import { englishAutomotiveTools } from "../../i18n/englishAutomotiveTools";
import { SITE_NAME, buildSiteUrl } from "../../siteConfig";

const pagePath = "/en/automotive-calculators";
const tools = englishAutomotiveTools;

export const metadata: Metadata = { title: `Automotive Calculators`, description: "Practical tire, fuel-consumption, EV-charging and running-cost calculators with clear limits.", alternates: { canonical: pagePath, languages: { en: pagePath } }, openGraph: { title: "Automotive Calculators", description: "Practical transport calculations with clear limits.", url: buildSiteUrl(pagePath), siteName: SITE_NAME, locale: "en_US", type: "website" } };

export default function AutomotiveCalculatorsPage() {
  const pageUrl = buildSiteUrl(pagePath);
  const collectionSchema = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Automotive Calculators", url: pageUrl, inLanguage: "en-US", mainEntity: { "@type": "ItemList", numberOfItems: tools.length, itemListElement: tools.map((tool, index) => ({ "@type": "ListItem", position: index + 1, name: tool.title, url: buildSiteUrl(tool.href) })) } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c") }} /><StaticPageLayout locale="en" breadcrumbAriaLabel="Breadcrumb" breadcrumbs={[{ href: "/en", label: "Home" }, { label: "Automotive Calculators" }]} title="Automotive Calculators" description="Use transparent calculations for tire comparisons, fuel use, EV charging and operating-cost planning." sections={[{ heading: "Available tools", content: <ul className="related-conversion-list">{tools.map((tool) => <li key={tool.href}><Link href={tool.href}>{tool.title}</Link><span> - {tool.description}</span></li>)}</ul> }, { heading: "Safety and real-world fit", content: <p>Calculations can compare numerical dimensions and stated costs, but cannot approve a tire or vehicle modification. Always follow the vehicle manufacturer&apos;s specification and use qualified advice when safety, fitment or legality is involved.</p> }, ...(ENGLISH_HUB_GUIDES["/en/automotive-calculators"] ?? [])]} /></>;
}
