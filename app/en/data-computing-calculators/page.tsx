import type { Metadata } from "next";
import Link from "next/link";
import StaticPageLayout from "../../components/StaticPageLayout";
import { SITE_NAME, buildSiteUrl } from "../../siteConfig";

const pagePath = "/en/data-computing-calculators";
const tools = [
  { href: "/en/number-base-calculator", title: "Number Base Calculator", description: "Convert binary, octal, decimal and hexadecimal whole numbers." },
  { href: "/en/pixel-dpi-calculator", title: "Pixel, DPI & Print Size Calculator", description: "Find the missing pixel count, physical size or density measurement." },
  { href: "/en/video-bitrate-calculator", title: "Video Bitrate Calculator", description: "Estimate video file size or bitrate from a stated duration." },
  { href: "/en/data-storage", title: "Data Storage Conversions", description: "Convert bits, bytes and decimal or binary storage units." },
];

export const metadata: Metadata = { title: `Data & Computing Calculators | ${SITE_NAME}`, description: "Focused computing tools for number bases, image dimensions, video bitrate and data-storage conversions.", alternates: { canonical: pagePath, languages: { en: pagePath } }, openGraph: { title: "Data & Computing Calculators", description: "Focused computing tools and data conversions.", url: buildSiteUrl(pagePath), siteName: SITE_NAME, locale: "en_US", type: "website" } };

export default function DataComputingCalculatorsPage() {
  const pageUrl = buildSiteUrl(pagePath);
  const collectionSchema = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Data & Computing Calculators", url: pageUrl, inLanguage: "en-US", mainEntity: { "@type": "ItemList", numberOfItems: tools.length, itemListElement: tools.map((tool, index) => ({ "@type": "ListItem", position: index + 1, name: tool.title, url: buildSiteUrl(tool.href) })) } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c") }} /><StaticPageLayout locale="en" breadcrumbAriaLabel="Breadcrumb" breadcrumbs={[{ href: "/en", label: "Home" }, { label: "Data & Computing Calculators" }]} title="Data & Computing Calculators" description="Use explicit units and assumptions for practical number, image, video and data-storage calculations." sections={[{ heading: "Available tools", content: <ul className="related-conversion-list">{tools.map((tool) => <li key={tool.href}><Link href={tool.href}>{tool.title}</Link><span> - {tool.description}</span></li>)}</ul> }, { heading: "Bits, bytes and binary prefixes", content: <p>File sizes and transfer rates are easy to confuse: a byte contains eight bits, while storage labels may use decimal GB or binary GiB. Check the stated unit before comparing a file, device or network figure.</p> }]} /></>;
}
