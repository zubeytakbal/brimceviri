import type { Metadata } from "next";
import Link from "next/link";
import EnglishSensibleHeatRateCalculator from "../../../../components/EnglishSensibleHeatRateCalculator";
import { buildFaqSchema, type FaqItem } from "../../../../converter/faqSchema";
import { buildSiteUrl } from "../../../../siteConfig";

const pagePath = "/en/engineering-calculators/heat-transfer/sensible-heat-rate-calculator";
const faqItems: FaqItem[] = [
  { question: "What equation does the sensible heat rate calculator use?", answer: "For a fluid with no phase change, it uses Q̇ = ṁ × cp × ΔT: mass flow rate times specific heat capacity times temperature change." },
  { question: "When should I use enthalpy instead of cp times temperature change?", answer: "Use enthalpy data for phase change, steam, refrigerants, boiling, condensation or a process with substantial property variation. The simple sensible-heat relation is not a phase-change model." },
  { question: "What does the duration result represent?", answer: "It multiplies the calculated heat-transfer rate by the operating duration you enter. It assumes the flow, specific heat and temperature change remain constant throughout that period." },
];

export const metadata: Metadata = {
  title: "Sensible Heat Rate Calculator (ṁcpΔT)",
  description: "Calculate sensible heat-transfer rate, heat-capacity rate and stated-period energy from mass flow, specific heat and temperature change.",
  alternates: { canonical: pagePath, languages: { en: pagePath } },
  openGraph: { title: "Sensible Heat Rate Calculator", description: "Calculate Q̇ = ṁcpΔT, heat-capacity rate and stated-period energy for a fluid with no phase change.", url: buildSiteUrl(pagePath), siteName: "BirimCeviri.app", locale: "en_US", type: "article" },
};

function serializeJsonLd(data: object) { return JSON.stringify(data).replace(/</g, "\\u003c"); }

export default function SensibleHeatRateCalculatorPage() {
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: buildSiteUrl("/en") }, { "@type": "ListItem", position: 2, name: "Heat Transfer", item: buildSiteUrl("/en/engineering-calculators/heat-transfer") }, { "@type": "ListItem", position: 3, name: "Sensible Heat Rate Calculator", item: buildSiteUrl(pagePath) }] };

  return <main className="all-conversions-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} /><div className="all-conversions-shell"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span aria-hidden="true">›</span><Link href="/en/engineering-calculators">Engineering Calculators</Link><span aria-hidden="true">›</span><Link href="/en/engineering-calculators/heat-transfer">Heat Transfer</Link><span aria-hidden="true">›</span><span>Sensible Heat Rate Calculator</span></nav><header className="all-conversions-header"><h1>Sensible Heat Rate Calculator</h1><p>Calculate steady fluid heating or cooling rate, heat-capacity rate and stated-period energy from mass flow, specific heat and temperature change.</p></header><EnglishSensibleHeatRateCalculator /><article className="category-article-content"><h2>Method and variables</h2><p><strong>Sensible heat rate:</strong> Q̇ = ṁ × c<sub>p</sub> × ΔT. <strong>Heat-capacity rate:</strong> ṁc<sub>p</sub>.</p><ul><li><strong>ṁ</strong> — mass flow rate</li><li><strong>c<sub>p</sub></strong> — specific heat capacity at the representative operating condition</li><li><strong>ΔT</strong> — temperature rise or drop through the stated process</li></ul><h2>Worked example</h2><p>Water flowing at 1 kg/s with c<sub>p</sub> = 4.186 kJ/(kg·K) and a 20 K temperature rise requires 1 × 4.186 × 20 = 83.72 kW. At that same constant duty for one hour, the corresponding energy is 83.72 kWh.</p><h2>Using the duration result</h2><p>The duration field converts the calculated heat rate to energy only. It is a constant-condition scenario; it does not model ramp-up, storage, pipe loss, changing flow, plant cycling or billing tariffs.</p><h2>Important limits</h2><p>Use enthalpy rather than this relation for boiling, condensation, steam, refrigerants or another phase-change process. Check fluid properties at the expected operating condition if temperature or pressure varies substantially. This calculator does not account for heat loss to surroundings or pressure-drop effects.</p><h2>Related tools</h2><p><Link href="/en/engineering-calculators/heat-transfer/lmtd-heat-exchanger-calculator">LMTD Heat Exchanger Calculator</Link> · <Link href="/en/calculators/heat-energy">Heat Energy Calculator</Link> · <Link href="/en/engineering-calculators/heat-transfer">Heat Transfer Calculators</Link></p></article></div></main>;
}
