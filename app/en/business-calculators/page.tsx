import type { Metadata } from "next";
import Link from "next/link";
import StaticPageLayout from "../../components/StaticPageLayout";
import { englishBusinessTools } from "../../i18n/englishBusinessToolCatalog";
import { SITE_NAME, buildSiteUrl } from "../../siteConfig";

const pagePath = "/en/business-calculators";

export const metadata: Metadata = { title: `Business Calculators | ${SITE_NAME}`, description: "Focused break-even, gross-margin and ROAS calculators with clear financial scope.", alternates: { canonical: pagePath, languages: { en: pagePath } }, openGraph: { title: "Business Calculators", description: "Focused business metrics with clear inputs and limits.", url: buildSiteUrl(pagePath), siteName: SITE_NAME, locale: "en_US", type: "website" } };

export default function BusinessCalculatorsPage() {
  const pageUrl = buildSiteUrl(pagePath);
  const collectionSchema = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Business Calculators", url: pageUrl, inLanguage: "en-US", mainEntity: { "@type": "ItemList", numberOfItems: englishBusinessTools.length, itemListElement: englishBusinessTools.map((tool, index) => ({ "@type": "ListItem", position: index + 1, name: tool.title, url: buildSiteUrl(tool.href) })) } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c") }} /><StaticPageLayout locale="en" breadcrumbAriaLabel="Breadcrumb" breadcrumbs={[{ href: "/en", label: "Home" }, { label: "Business Calculators" }]} title="Business Calculators" description="Calculate core commercial metrics with your own costs, prices and campaign figures." sections={[{ heading: "Available tools", content: <ul className="related-conversion-list">{englishBusinessTools.map((tool) => <li key={tool.id}><Link href={tool.href}>{tool.title}</Link><span> - {tool.description}</span></li>)}</ul> }, { heading: "Use the right business metric", content: <p>Break-even focuses on covering costs, gross margin focuses on direct profitability and ROAS focuses on advertising revenue. None of these figures alone is a complete financial forecast.</p> }]} /></>;
}
