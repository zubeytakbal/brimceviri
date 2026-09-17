import type { Metadata } from "next";
import Link from "next/link";
import EnglishPumpPowerCalculator from "../../../../components/EnglishPumpPowerCalculator";
import { buildFaqSchema, type FaqItem } from "../../../../converter/faqSchema";
import { buildSiteUrl } from "../../../../siteConfig";

const pagePath = "/en/engineering-calculators/fluids-piping/pump-power-calculator";
const faqItems: FaqItem[] = [
  { question: "What pump power equation does this calculator use?", answer: "Hydraulic power is P = ρgQH. The calculator divides it by pump efficiency for shaft power and by motor efficiency for electrical input." },
  { question: "What should total dynamic head include?", answer: "Use the total head at the stated flow: applicable static lift, pressure requirements and friction or fitting losses. Establish it from the actual system rather than treating it as a pump selection result." },
  { question: "How is annual pump energy estimated?", answer: "Electrical input power is multiplied by the annual operating hours you enter. The cost result then multiplies that energy by your entered electricity price, in your own currency unit." },
];

export const metadata: Metadata = {
  title: "Pump Power Calculator (ρgQH)",
  description: "Estimate hydraulic, shaft and electrical pump power, annual energy use and electricity cost from flow, total dynamic head, density and efficiency.",
  alternates: { canonical: pagePath, languages: { en: pagePath } },
  openGraph: { title: "Pump Power Calculator", description: "Estimate pump power, annual energy and cost at a stated duty point.", url: buildSiteUrl(pagePath), siteName: "BirimCeviri.app", locale: "en_US", type: "article" },
};

function serializeJsonLd(data: object) { return JSON.stringify(data).replace(/</g, "\\u003c"); }

export default function Page() {
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: buildSiteUrl("/en") }, { "@type": "ListItem", position: 2, name: "Fluids & Piping", item: buildSiteUrl("/en/engineering-calculators/fluids-piping") }, { "@type": "ListItem", position: 3, name: "Pump Power Calculator", item: buildSiteUrl(pagePath) }] };
  return <main className="all-conversions-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} /><div className="all-conversions-shell"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span aria-hidden="true">›</span><Link href="/en/engineering-calculators/fluids-piping">Fluids &amp; Piping</Link><span aria-hidden="true">›</span><span>Pump Power Calculator</span></nav><header className="all-conversions-header"><h1>Pump Power Calculator</h1><p>Estimate hydraulic, shaft and electrical power at one stated pump duty point, then turn the electrical result into a transparent annual energy and cost estimate.</p></header><EnglishPumpPowerCalculator /><article className="category-article-content"><h2>Method</h2><p>Hydraulic power is P = ρgQH. The page divides by pump efficiency for shaft power, then by motor efficiency for electrical input. Annual energy is electrical input multiplied by the operating hours you enter.</p><h2>Worked example</h2><p>Water at 998 kg/m³, 50 m³/h and 30 m head needs about 4.08 kW hydraulic power; with 75% pump and 90% motor efficiency, electrical input is about 6.05 kW. At 4,000 annual operating hours, that is approximately 24.2 MWh/year before any variable-duty or tariff effects.</p><h2>Important limits</h2><p>Total dynamic head must represent the actual system at the selected flow. The annual estimate assumes a constant duty point and a single energy price. Select equipment from the manufacturer curve and separately verify NPSH, operating range, compatibility, drive losses, demand charges and margins.</p><h2>Reference</h2><p><a href="https://www.energy.gov/eere/iedo/articles/pumping-system-assessment-tool-user-manual" target="_blank" rel="noreferrer">U.S. Department of Energy: pumping-system assessment</a></p><h2>Related tools</h2><p><Link href="/en/engineering-calculators/fluids-piping/pressure-drop-calculator">Pressure Drop Calculator</Link> · <Link href="/en/engineering-calculators/fluids-piping/pipe-flow-calculator">Pipe Flow Rate &amp; Velocity Calculator</Link> · <Link href="/en/engineering-calculators/fluids-piping">Fluids &amp; Piping Calculators</Link></p></article></div></main>;
}
