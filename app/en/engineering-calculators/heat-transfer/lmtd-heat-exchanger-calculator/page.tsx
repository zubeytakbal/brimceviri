import type { Metadata } from "next";
import Link from "next/link";
import EnglishLmtdHeatExchangerCalculator from "../../../../components/EnglishLmtdHeatExchangerCalculator";
import { buildFaqSchema, type FaqItem } from "../../../../converter/faqSchema";
import { buildSiteUrl } from "../../../../siteConfig";

const pagePath = "/en/engineering-calculators/heat-transfer/lmtd-heat-exchanger-calculator";
const faqItems: FaqItem[] = [
  { question: "What equation does the LMTD calculator use?", answer: "It calculates LMTD = (ΔT1 − ΔT2) / ln(ΔT1 / ΔT2), then heat-transfer rate Q̇ = U × A × F × LMTD. F is the LMTD correction factor." },
  { question: "When should the LMTD correction factor be 1?", answer: "Use F = 1 for true parallel-flow or counterflow exchangers. Crossflow and multi-pass exchangers may need a validated correction factor from the applicable thermal-design method." },
  { question: "Does the energy result predict plant consumption?", answer: "No. It multiplies the calculated heat-transfer rate by the duration you enter, assuming all inputs remain constant. It does not model pump power, changing loads, control behavior or utility tariffs." },
];

export const metadata: Metadata = {
  title: "LMTD Heat Exchanger Calculator",
  description: "Calculate log mean temperature difference, corrected heat-transfer rate and stated-period energy for parallel-flow or counterflow heat exchangers.",
  alternates: { canonical: pagePath, languages: { en: pagePath } },
  openGraph: { title: "LMTD Heat Exchanger Calculator", description: "Calculate LMTD and Q̇ = U × A × F × LMTD from a stated heat-exchanger temperature profile.", url: buildSiteUrl(pagePath), siteName: "BirimCeviri.app", locale: "en_US", type: "article" },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function LmtdHeatExchangerCalculatorPage() {
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: buildSiteUrl("/en") }, { "@type": "ListItem", position: 2, name: "Heat Transfer", item: buildSiteUrl("/en/engineering-calculators/heat-transfer") }, { "@type": "ListItem", position: 3, name: "LMTD Heat Exchanger Calculator", item: buildSiteUrl(pagePath) }] };

  return <main className="all-conversions-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} /><div className="all-conversions-shell"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span aria-hidden="true">›</span><Link href="/en/engineering-calculators">Engineering Calculators</Link><span aria-hidden="true">›</span><Link href="/en/engineering-calculators/heat-transfer">Heat Transfer</Link><span aria-hidden="true">›</span><span>LMTD Heat Exchanger Calculator</span></nav><header className="all-conversions-header"><h1>LMTD Heat Exchanger Calculator</h1><p>Calculate the log mean temperature difference, corrected heat-transfer rate and constant-condition energy for two specified streams.</p></header><EnglishLmtdHeatExchangerCalculator /><article className="category-article-content"><h2>Method</h2><p>For parallel or counterflow, ΔT<sub>lm</sub> = (ΔT<sub>1</sub> − ΔT<sub>2</sub>) / ln(ΔT<sub>1</sub> / ΔT<sub>2</sub>). The calculator then uses Q̇ = U × A × F × ΔT<sub>lm</sub>, where F is the correction factor. For true parallel or counterflow, F is 1.</p><h2>Worked example</h2><p>For counterflow water cooling from 120 °C to 80 °C against a stream heated from 20 °C to 60 °C, both terminal differences are 60 K. The LMTD is therefore 60 K. At U = 200 W/(m²·K), A = 10 m² and F = 1, the estimated rate is 120 kW, or 120 kWh over one constant hour.</p><h2>Important limits</h2><p>This tool does not determine U, calculate exchanger area, perform a heat balance from flow rates or choose a correction factor. Do not use this direct model for phase change, crossflow or multi-pass arrangements without the appropriate correction factor and thermal-design method.</p><h2>Frequently asked questions</h2>{faqItems.map((item) => <section key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></section>)}<h2>Related tools</h2><p><Link href="/en/engineering-calculators/heat-transfer/sensible-heat-rate-calculator">Sensible Heat Rate Calculator</Link> · <Link href="/en/engineering-calculators/heat-transfer/thermal-resistance-calculator">Thermal Resistance &amp; U-value Calculator</Link> · <Link href="/en/engineering-calculators/heat-transfer">Heat Transfer Calculators</Link></p></article></div></main>;
}
