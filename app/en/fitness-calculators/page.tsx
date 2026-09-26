import type { Metadata } from "next";
import Link from "next/link";
import StaticPageLayout from "../../components/StaticPageLayout";
import { SITE_NAME, buildSiteUrl } from "../../siteConfig";

const pagePath = "/en/fitness-calculators";
const tools = [
  { href: "/en/calorie-calculator", title: "Calorie Calculator (TDEE)", description: "Estimate daily calories, BMR and targets to lose, maintain or gain weight." },
  { href: "/en/body-fat-calculator", title: "Body Fat Calculator", description: "Estimate body fat percentage from tape measurements with the US Navy method." },
  { href: "/en/ideal-weight-calculator", title: "Ideal Weight Calculator", description: "Compare four ideal body weight formulas and the healthy BMI weight range." },
  { href: "/en/bmi-calculator", title: "BMI Calculator", description: "Calculate body mass index and see the weight category." },
  { href: "/en/one-rep-max-calculator", title: "One Rep Max Calculator", description: "Estimate a one-repetition maximum and percentage-based training loads." },
  { href: "/en/running-pace-calculator", title: "Running Pace Calculator", description: "Calculate pace, time or distance from two known running measurements." },
];
export const metadata: Metadata = { title: `Fitness Calculators`, description: "Practical training estimates for one-rep max and running pace with explicit limits.", alternates: { canonical: pagePath, languages: { en: pagePath } }, openGraph: { title: "Fitness Calculators", description: "Practical training estimates with explicit limits.", url: buildSiteUrl(pagePath), siteName: SITE_NAME, locale: "en_US", type: "website" } };
export default function FitnessCalculatorsPage() { const pageUrl = buildSiteUrl(pagePath); const collectionSchema = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Fitness Calculators", url: pageUrl, inLanguage: "en-US", mainEntity: { "@type": "ItemList", numberOfItems: tools.length, itemListElement: tools.map((tool, index) => ({ "@type": "ListItem", position: index + 1, name: tool.title, url: buildSiteUrl(tool.href) })) } }; return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c") }} /><StaticPageLayout locale="en" breadcrumbAriaLabel="Breadcrumb" breadcrumbs={[{ href: "/en", label: "Home" }, { label: "Fitness Calculators" }]} title="Fitness Calculators" description="Use training estimates as planning references, while keeping technique, recovery and personal safety in the decision." sections={[{ heading: "Available tools", content: <ul className="related-conversion-list">{tools.map((tool) => <li key={tool.href}><Link href={tool.href}>{tool.title}</Link><span> - {tool.description}</span></li>)}</ul> }, { heading: "Use estimates carefully", content: <p>These tools calculate from the inputs supplied; they do not assess exercise technique, injury risk, readiness or medical suitability. Adjust training with qualified guidance where appropriate.</p> }]} /></>; }
