import type { Metadata } from "next";
import Link from "next/link";
import StaticPageLayout from "../../../components/StaticPageLayout";
import { buildSiteUrl } from "../../../siteConfig";

const pagePath = "/en/engineering-calculators/fluids-piping";
const tools = [
  { href: "/en/engineering-calculators/fluids-piping/pipe-flow-calculator", title: "Pipe Flow Rate & Velocity Calculator", description: "Solve flow rate, mean velocity or internal diameter from Q = A × v." },
  { href: "/en/engineering-calculators/fluids-piping/pressure-drop-calculator", title: "Pressure Drop Calculator", description: "Estimate major and minor pressure losses with Darcy–Weisbach and explicit fluid-property inputs." },
  { href: "/en/engineering-calculators/fluids-piping/pump-power-calculator", title: "Pump Power Calculator", description: "Estimate hydraulic, shaft and electrical power from a stated flow, head and efficiency." },
  { href: "/en/calculators/reynolds-number", title: "Reynolds Number Calculator", description: "Screen internal-flow regime from density, viscosity, velocity and diameter." },
  { href: "/en/calculators/hydrostatic-pressure", title: "Hydrostatic Pressure Calculator", description: "Calculate static pressure difference from depth, density and gravity." },
  { href: "/en/calculators/pressure-force-area", title: "Pressure, Force and Area Calculator", description: "Check the basic relationship between pressure, force and area." },
];

export const metadata: Metadata = {
  title: "Fluids & Piping Calculators",
  description: "Engineering tools for pipe flow rate, velocity, diameter, pressure and internal-flow screening.",
  alternates: { canonical: pagePath, languages: { en: pagePath } },
  openGraph: { title: "Fluids & Piping Calculators", description: "A focused engineering hub for pipe-flow and fluid-system calculations.", url: buildSiteUrl(pagePath), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

function serializeJsonLd(data: object) { return JSON.stringify(data).replace(/</g, "\\u003c"); }

export default function FluidsPipingHubPage() {
  const pageUrl = buildSiteUrl(pagePath);
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Fluids & Piping Calculators", description: "Engineering tools for pipe-flow and fluid-system calculations.", url: pageUrl, inLanguage: "en-US", mainEntity: { "@type": "ItemList", numberOfItems: tools.length, itemListElement: tools.map((tool, index) => ({ "@type": "ListItem", position: index + 1, name: tool.title, url: buildSiteUrl(tool.href) })) } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} /><StaticPageLayout locale="en" breadcrumbAriaLabel="Breadcrumb" breadcrumbs={[{ href: "/en", label: "Home" }, { href: "/en/engineering-calculators", label: "Engineering Calculators" }, { label: "Fluids & Piping" }]} title="Fluids & Piping Calculators" description="A focused engineering cluster for working from flow demand to pipe velocity, diameter and pressure-related checks." sections={[{ heading: "Start with the flow relationship", content: <><p>Use the Pipe Flow Rate & Velocity Calculator to solve the missing part of Q = A × v. It is the first step before evaluating a pipe run, a pump duty point or a pressure-loss estimate.</p><ul className="category-calculator-list">{tools.slice(0, 1).map((tool) => <li key={tool.href}><Link className="category-calculator-card" href={tool.href}><strong>{tool.title}</strong><span>{tool.description}</span></Link></li>)}</ul></> }, { heading: "Pressure loss with stated assumptions", content: <><p>Use Darcy–Weisbach only after you can state the fluid condition, actual internal diameter, roughness and fitting losses. The live calculator exposes those values instead of hiding them behind a generic material label.</p><ul className="category-calculator-list">{tools.slice(1, 2).map((tool) => <li key={tool.href}><Link className="category-calculator-card" href={tool.href}><strong>{tool.title}</strong><span>{tool.description}</span></Link></li>)}</ul></> }, { heading: "Related live tools", content: <ul className="category-calculator-list">{tools.slice(2).map((tool) => <li key={tool.href}><Link className="category-calculator-card" href={tool.href}><strong>{tool.title}</strong><span>{tool.description}</span></Link></li>)}</ul> }, { heading: "The calculation path", content: <ol className="engineering-hub-steps"><li>Establish the required flow rate, internal diameter or mean velocity.</li><li>Use the Reynolds number to understand the likely flow regime.</li><li>Evaluate friction and fitting losses using the real fluid, pipe material, length and operating condition.</li></ol> }]} /></>;
}
