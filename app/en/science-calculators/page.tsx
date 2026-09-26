import type { Metadata } from "next";
import Link from "next/link";
import StaticPageLayout from "../../components/StaticPageLayout";
import { SITE_NAME, buildSiteUrl } from "../../siteConfig";

const pagePath = "/en/science-calculators";
const subjects = [
  { href: "/en/chemistry-calculators", title: "Chemistry", description: "12 calculators for solutions, reactions, equilibrium and electrochemistry." },
  { href: "/en/mathematics-calculators", title: "Mathematics", description: "Focused tools for percentages, arithmetic means and quadratic roots." },
  { href: "/en/physics-calculators", title: "Physics", description: "Focused SI calculators for speed, force and kinetic energy." },
  { href: "/en/biology-calculators", title: "Biology", description: "A focused DNA sequence helper with input guidance and limits." },
];

export const metadata: Metadata = { title: `Science Calculators`, description: "Free science calculators for chemistry, mathematics, physics and biology.", alternates: { canonical: pagePath, languages: { en: pagePath } }, openGraph: { title: `Science Calculators | ${SITE_NAME}`, description: "Free science calculators for chemistry, mathematics, physics and biology.", url: buildSiteUrl(pagePath), siteName: SITE_NAME, locale: "en_US", type: "website" } };

export default function ScienceCalculatorsPage() {
  const url = buildSiteUrl(pagePath);
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Science Calculators", url, inLanguage: "en-US", mainEntity: { "@type": "ItemList", numberOfItems: subjects.length, itemListElement: subjects.map((subject, index) => ({ "@type": "ListItem", position: index + 1, name: subject.title, url: buildSiteUrl(subject.href) })) } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /><StaticPageLayout locale="en" breadcrumbAriaLabel="Breadcrumb" breadcrumbs={[{ href: "/en", label: "Home" }, { label: "Science Calculators" }]} title="Science Calculators" description="Choose a science subject, then open a focused calculator or the full chemistry collection." sections={[{ heading: "Subjects", content: <ul className="related-conversion-list">{subjects.map((subject) => <li key={subject.href}><Link href={subject.href}>{subject.title}</Link><span> — {subject.description}</span></li>)}</ul> }, { heading: "Using science calculators", content: <p>Use consistent units, keep the stated assumptions in mind, and verify results against course materials or professional references when a calculation informs a laboratory, health or safety decision.</p> }]} /></>;
}
