import type { Metadata } from "next";
import Link from "next/link";
import EnglishConvectiveHeatTransferCalculator from "../../../../components/EnglishConvectiveHeatTransferCalculator";
import { buildFaqSchema, type FaqItem } from "../../../../converter/faqSchema";
import { buildSiteUrl } from "../../../../siteConfig";

const pagePath = "/en/engineering-calculators/heat-transfer/convective-heat-transfer-calculator";
const faqItems: FaqItem[] = [
  { question: "What equation does this convective heat-transfer calculator use?", answer: "It uses Q̇ = h × A × ΔT: convection coefficient times exposed area times the representative surface-to-fluid temperature difference." },
  { question: "How do I choose the convection coefficient h?", answer: "Use a value that represents the actual fluid, geometry, flow regime and temperature range. This calculator applies your stated coefficient; it does not select or validate a correlation for h." },
  { question: "What does the energy result represent?", answer: "It multiplies the calculated heat-transfer rate by the operating duration you enter. It assumes the coefficient, area and temperature difference stay constant for that period." },
];

export const metadata: Metadata = {
  title: "Convective Heat Transfer Calculator (h × A × ΔT)",
  description: "Calculate convective heat-transfer rate, heat flux and stated-period energy from a convection coefficient, surface area and temperature difference.",
  alternates: { canonical: pagePath, languages: { en: pagePath } },
  openGraph: { title: "Convective Heat Transfer Calculator", description: "Calculate Q̇ = hAΔT and stated-period energy from transparent convection assumptions.", url: buildSiteUrl(pagePath), siteName: "BirimCeviri.app", locale: "en_US", type: "article" },
};

function serializeJsonLd(data: object) { return JSON.stringify(data).replace(/</g, "\\u003c"); }

export default function ConvectiveHeatTransferCalculatorPage() {
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: buildSiteUrl("/en") }, { "@type": "ListItem", position: 2, name: "Heat Transfer", item: buildSiteUrl("/en/engineering-calculators/heat-transfer") }, { "@type": "ListItem", position: 3, name: "Convective Heat Transfer Calculator", item: buildSiteUrl(pagePath) }] };

  return <main className="all-conversions-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} /><div className="all-conversions-shell"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span aria-hidden="true">›</span><Link href="/en/engineering-calculators">Engineering Calculators</Link><span aria-hidden="true">›</span><Link href="/en/engineering-calculators/heat-transfer">Heat Transfer</Link><span aria-hidden="true">›</span><span>Convective Heat Transfer Calculator</span></nav><header className="all-conversions-header"><h1>Convective Heat Transfer Calculator</h1><p>Calculate a first-pass convection heat-transfer rate, heat flux and stated-period energy from an explicit h-value, area and temperature difference.</p></header><EnglishConvectiveHeatTransferCalculator /><article className="category-article-content"><h2>Method and variables</h2><p><strong>Heat-transfer rate:</strong> Q̇ = h × A × ΔT. <strong>Heat flux:</strong> q″ = h × ΔT.</p><ul><li><strong>h</strong> — convection coefficient for the actual fluid, geometry and flow condition</li><li><strong>A</strong> — heat-transfer surface area</li><li><strong>ΔT</strong> — representative local surface-to-fluid temperature difference</li></ul><h2>Worked example</h2><p>Air with h = 25 W/(m²·K) across a 1 m² surface that is 30 K warmer than the air transfers 25 × 1 × 30 = 750 W. If that condition remains constant for 8 hours, the associated energy is 6 kWh.</p><h2>Using the duration result</h2><p>The duration field converts the calculated rate to energy only. It is useful for a transparent constant-condition scenario, but it is not a weather, thermostat, duty-cycle or energy-cost model.</p><h2>Important limits</h2><p>The calculator does not estimate h, include radiation or conduction, or model boundary-layer development. For a heat exchanger with changing stream temperatures, use a suitable LMTD or effectiveness-NTU design method. Treat the stated duration result cautiously whenever temperature, flow or surface conditions vary.</p><h2>Related tools</h2><p><Link href="/en/engineering-calculators/dimensionless-numbers/nusselt-number-calculator">Nusselt Number Calculator</Link> · <Link href="/en/engineering-calculators/heat-transfer/lmtd-heat-exchanger-calculator">LMTD Heat Exchanger Calculator</Link> · <Link href="/en/engineering-calculators/heat-transfer">Heat Transfer Calculators</Link></p></article></div></main>;
}
