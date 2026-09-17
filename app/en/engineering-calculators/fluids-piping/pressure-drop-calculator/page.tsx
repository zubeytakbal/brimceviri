import type { Metadata } from "next";
import Link from "next/link";
import EnglishPressureDropCalculator from "../../../../components/EnglishPressureDropCalculator";
import { buildFaqSchema, type FaqItem } from "../../../../converter/faqSchema";
import { buildSiteUrl } from "../../../../siteConfig";

const pagePath = "/en/engineering-calculators/fluids-piping/pressure-drop-calculator";
const faqItems: FaqItem[] = [
  { question: "What equation does this pressure-drop calculator use?", answer: "It uses Darcy–Weisbach: h_f = f(L/D)(v²/2g), plus a user-entered minor-loss term K(v²/2g). Pressure drop is then ΔP = ρgh. Results break out the straight-pipe and fitting-related portions." },
  { question: "How do I add fittings to the pressure-drop calculation?", answer: "Use the fittings worksheet to add a description, quantity and K value for each fitting. The calculator totals those K values and combines them with any additional combined K value you enter." },
  { question: "Why do density and viscosity matter?", answer: "They set the Reynolds number and translate head loss into pressure. Their values can change substantially with fluid type and temperature." },
  { question: "Can I use this for gas piping?", answer: "No. The calculator assumes steady single-phase internal flow without compressibility effects. Use a method intended for the gas, pressure range and governing standard." },
];

export const metadata: Metadata = {
  title: "Pressure Drop Calculator (Darcy–Weisbach)",
  description: "Estimate pipe friction and minor-loss pressure drop with Darcy–Weisbach from pipe geometry, flow rate, fluid properties, roughness and K losses.",
  alternates: { canonical: pagePath, languages: { en: pagePath } },
  openGraph: { title: "Pressure Drop Calculator (Darcy–Weisbach)", description: "Estimate internal pipe pressure drop with an explicit friction-factor approximation.", url: buildSiteUrl(pagePath), siteName: "BirimCeviri.app", locale: "en_US", type: "article" },
};

function serializeJsonLd(data: object) { return JSON.stringify(data).replace(/</g, "\\u003c"); }

export default function EnglishPressureDropPage() {
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: buildSiteUrl("/en") }, { "@type": "ListItem", position: 2, name: "Fluids & Piping", item: buildSiteUrl("/en/engineering-calculators/fluids-piping") }, { "@type": "ListItem", position: 3, name: "Pressure Drop Calculator", item: buildSiteUrl(pagePath) }] };
  return <main className="all-conversions-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} /><div className="all-conversions-shell"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span aria-hidden="true">›</span><Link href="/en/engineering-calculators/fluids-piping">Fluids &amp; Piping</Link><span aria-hidden="true">›</span><span>Pressure Drop Calculator</span></nav><header className="all-conversions-header"><h1>Pressure Drop Calculator</h1><p>Estimate friction and fitting-related pressure drop for a pipe run using Darcy–Weisbach. Enter the actual fluid properties and internal pipe geometry for your operating condition.</p></header><EnglishPressureDropCalculator /><article className="category-article-content"><h2>Method and variables</h2><p><strong>Major loss:</strong> h<sub>f</sub> = f(L/D)(v²/2g). <strong>Minor loss:</strong> h<sub>m</sub> = K(v²/2g). <strong>Pressure drop:</strong> ΔP = ρg(h<sub>f</sub> + h<sub>m</sub>).</p><p>The tool uses f = 64/Re in laminar flow and the explicit Swamee–Jain approximation for non-laminar flow. It displays the Reynolds number so the result can be judged in context.</p><h2>Worked example</h2><p>For water near 20 °C flowing at 2 L/s through 100 m of 50 mm commercial-steel pipe, enter the fluid density, viscosity and roughness with K = 0 for straight-pipe loss. Add each valve, bend and other fitting in the worksheet with its project-specific quantity and K value, or enter one combined K value when that is all you have.</p><h2>Important limits</h2><p>Results in the transitional range are inherently uncertain. Roughness presets are editable references, not material certification. The calculation does not include elevation change, pump curves, non-circular geometry, transient effects, gas compressibility, two-phase flow, slurry, corrosion allowance or a design standard.</p><h2>References</h2><ul><li><a href="https://nehrpsearch.nist.gov/static/files/NSF/PB2009105545.pdf" target="_blank" rel="noreferrer">NIST report: Darcy–Weisbach equation and friction-factor formulations</a></li><li><a href="https://www.nist.gov/pml/special-publication-811" target="_blank" rel="noreferrer">NIST Guide for the Use of the International System of Units</a></li></ul><h2>Related tools</h2><p><Link href="/en/engineering-calculators/fluids-piping/pipe-flow-calculator">Pipe Flow Rate &amp; Velocity Calculator</Link> · <Link href="/en/calculators/reynolds-number">Reynolds Number Calculator</Link> · <Link href="/en/engineering-calculators/fluids-piping">Fluids &amp; Piping Calculators</Link></p></article></div></main>;
}
