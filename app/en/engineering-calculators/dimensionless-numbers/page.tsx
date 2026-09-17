import type { Metadata } from "next";
import Link from "next/link";
import StaticPageLayout from "../../../components/StaticPageLayout";
import { buildSiteUrl } from "../../../siteConfig";

const pagePath = "/en/engineering-calculators/dimensionless-numbers";
const liveTools = [
  { href: "/en/calculators/reynolds-number", title: "Reynolds Number Calculator", description: "Compare inertia and viscosity, with an internal-flow regime interpretation." },
  { href: "/en/engineering-calculators/dimensionless-numbers/prandtl-number-calculator", title: "Prandtl Number Calculator", description: "Compare momentum and thermal diffusion from consistent fluid properties." },
  { href: "/en/engineering-calculators/dimensionless-numbers/biot-number-calculator", title: "Biot Number Calculator", description: "Screen internal versus surface thermal resistance before a lumped-capacitance analysis." },
  { href: "/en/engineering-calculators/dimensionless-numbers/fourier-number-calculator", title: "Fourier Number Calculator", description: "Calculate dimensionless time for a transient-conduction problem." },
  { href: "/en/engineering-calculators/dimensionless-numbers/nusselt-number-calculator", title: "Nusselt Number Calculator", description: "Solve Nu or h, with a scope-checked turbulent-pipe correlation mode." },
  { href: "/en/engineering-calculators/dimensionless-numbers/mach-number-calculator", title: "Mach Number Calculator", description: "Calculate speed relative to the local speed of sound from a known value or ideal-gas properties." },
  { href: "/en/engineering-calculators/dimensionless-numbers/froude-number-calculator", title: "Froude Number Calculator", description: "Screen shallow-water and open-channel flow from mean velocity and hydraulic depth." },
  { href: "/en/engineering-calculators/dimensionless-numbers/grashof-number-calculator", title: "Grashof Number Calculator", description: "Compare buoyancy and viscous effects in a natural-convection screening problem." },
  { href: "/en/engineering-calculators/dimensionless-numbers/rayleigh-number-calculator", title: "Rayleigh Number Calculator", description: "Combine buoyancy, viscous and thermal-diffusion effects for natural-convection screening." },
];

export const metadata: Metadata = { title: "Dimensionless Numbers Calculators", description: "Engineering calculators for Reynolds, Prandtl and other dimensionless groups in fluid mechanics and heat transfer.", alternates: { canonical: pagePath, languages: { en: pagePath } }, openGraph: { title: "Dimensionless Numbers Calculators", description: "A focused engineering hub for dimensionless fluid and heat-transfer groups.", url: buildSiteUrl(pagePath), siteName: "BirimCeviri.app", locale: "en_US", type: "website" } };
function serializeJsonLd(data: object) { return JSON.stringify(data).replace(/</g, "\\u003c"); }

export default function DimensionlessNumbersHubPage() {
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Dimensionless Numbers Calculators", url: buildSiteUrl(pagePath), inLanguage: "en-US", mainEntity: { "@type": "ItemList", numberOfItems: liveTools.length, itemListElement: liveTools.map((tool, index) => ({ "@type": "ListItem", position: index + 1, name: tool.title, url: buildSiteUrl(tool.href) })) } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} /><StaticPageLayout locale="en" breadcrumbAriaLabel="Breadcrumb" breadcrumbs={[{ href: "/en", label: "Home" }, { href: "/en/engineering-calculators", label: "Engineering Calculators" }, { label: "Dimensionless Numbers" }]} title="Dimensionless Numbers Calculators" description="A growing engineering cluster for the ratios that reveal which physical effect dominates a fluid-flow or heat-transfer problem." sections={[{ heading: "Live calculators", content: <ul className="category-calculator-list">{liveTools.map((tool) => <li key={tool.href}><Link className="category-calculator-card" href={tool.href}><strong>{tool.title}</strong><span>{tool.description}</span></Link></li>)}</ul> }, { heading: "How to use this cluster", content: <ol className="engineering-hub-steps"><li>Start with the number that matches the physics you need to screen: flow regime, thermal diffusion, internal thermal resistance, buoyancy or compressibility.</li><li>Use values evaluated at a consistent reference temperature and state.</li><li>Only apply a heat-transfer or flow correlation after checking its geometry, regime and valid range.</li></ol> }]} /></>;
}
