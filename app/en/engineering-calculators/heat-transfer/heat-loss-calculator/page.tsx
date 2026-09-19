import type { Metadata } from "next";
import Link from "next/link";
import EnglishHeatLossCalculator from "../../../../components/EnglishHeatLossCalculator";
import { buildFaqSchema, type FaqItem } from "../../../../converter/faqSchema";
import { buildSiteUrl } from "../../../../siteConfig";

const pagePath = "/en/engineering-calculators/heat-transfer/heat-loss-calculator";
const faqItems: FaqItem[] = [
  { question: "What heat-loss equation does this calculator use?", answer: "For steady conduction through one stated surface, it uses Q̇ = U × A × ΔT. Multiplying the rate by a stated duration gives thermal energy loss." },
  { question: "What U-value should I enter?", answer: "Use the U-value of the complete building element, not an individual material conductivity. An assembly U-value may include layers, surface films and other construction effects." },
  { question: "How is heating energy cost estimated?", answer: "The surface heat loss is divided by the heating-system efficiency you enter, then multiplied by your energy price. Both values are a transparent scenario assumption rather than a billing forecast." },
];

export const metadata: Metadata = {
  title: "Heat Loss Calculator (U × A × ΔT)",
  description: "Estimate steady surface heat loss, heating energy input and energy cost from U-value, area, temperature difference, duration and stated efficiency.",
  alternates: { canonical: pagePath, languages: { en: pagePath } },
  openGraph: { title: "Heat Loss Calculator", description: "Estimate conductive heat loss, heating energy input and cost from stated assumptions.", url: buildSiteUrl(pagePath), siteName: "BirimCeviri.app", locale: "en_US", type: "article" },
};

function serializeJsonLd(data: object) { return JSON.stringify(data).replace(/</g, "\\u003c"); }

export default function HeatLossCalculatorPage() {
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: buildSiteUrl("/en") }, { "@type": "ListItem", position: 2, name: "Heat Transfer", item: buildSiteUrl("/en/engineering-calculators/heat-transfer") }, { "@type": "ListItem", position: 3, name: "Heat Loss Calculator", item: buildSiteUrl(pagePath) }] };
  return <main className="all-conversions-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} /><div className="all-conversions-shell"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span aria-hidden="true">›</span><Link href="/en/engineering-calculators">Engineering Calculators</Link><span aria-hidden="true">›</span><Link href="/en/engineering-calculators/heat-transfer">Heat Transfer</Link><span aria-hidden="true">›</span><span>Heat Loss Calculator</span></nav><header className="all-conversions-header"><h1>Heat Loss Calculator</h1><p>Estimate heat loss through one stated building element, then turn the result into a transparent heating-energy and cost scenario.</p></header><EnglishHeatLossCalculator /><article className="category-article-content"><h2>Method</h2><p>The steady heat-loss rate is Q̇ = U × A × ΔT. Multiply the rate by a stated duration to estimate the associated thermal energy. The optional input-energy estimate divides that thermal energy by your stated heating-system efficiency.</p><h2>Worked example</h2><p>A 100 m² wall with U = 0.30 W/(m²·K) and a 20 K temperature difference loses 0.30 × 100 × 20 = 600 W. Over 24 hours at those constant conditions, that is 14.4 kWh of heat. At 90% heating efficiency, the corresponding input energy is 16 kWh.</p><h2>Important limits</h2><p>This is a surface-conduction estimate, not a whole-building heating-load or energy-use calculation. Air infiltration, thermal bridges, solar gains, weather variation, occupancy, system cycling, plant efficiency and tariff structure can materially change actual energy demand and cost.</p><h2>Related tools</h2><p><Link href="/en/engineering-calculators/heat-transfer/thermal-resistance-calculator">Thermal Resistance &amp; U-value Calculator</Link> · <Link href="/en/calculators/heat-conduction">Heat Conduction Calculator</Link> · <Link href="/en/engineering-calculators/heat-transfer">Heat Transfer Calculators</Link></p></article></div></main>;
}
