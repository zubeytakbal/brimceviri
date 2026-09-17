import type { Metadata } from "next";
import Link from "next/link";
import EnglishLmtdHeatExchangerCalculator from "../../../../components/EnglishLmtdHeatExchangerCalculator";
import { buildSiteUrl } from "../../../../siteConfig";

const pagePath = "/en/engineering-calculators/heat-transfer/lmtd-heat-exchanger-calculator";

export const metadata: Metadata = {
  title: "LMTD Heat Exchanger Calculator",
  description: "Calculate log mean temperature difference and estimated heat-transfer rate for a parallel-flow or counterflow heat exchanger.",
  alternates: { canonical: pagePath, languages: { en: pagePath } },
  openGraph: { title: "LMTD Heat Exchanger Calculator", description: "Calculate LMTD and Q = U A ΔTlm for a stated heat-exchanger temperature profile.", url: buildSiteUrl(pagePath), siteName: "BirimCeviri.app", locale: "en_US", type: "article" },
};

export default function LmtdHeatExchangerCalculatorPage() {
  return <main className="all-conversions-page"><div className="all-conversions-shell"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span aria-hidden="true">›</span><Link href="/en/engineering-calculators">Engineering Calculators</Link><span aria-hidden="true">›</span><Link href="/en/engineering-calculators/heat-transfer">Heat Transfer</Link><span aria-hidden="true">›</span><span>LMTD Heat Exchanger Calculator</span></nav><header className="all-conversions-header"><h1>LMTD Heat Exchanger Calculator</h1><p>Calculate the log mean temperature difference and a first-pass heat-transfer rate for two specified streams.</p></header><EnglishLmtdHeatExchangerCalculator /><article className="category-article-content"><h2>Method</h2><p>For counterflow or parallel flow, ΔT<sub>lm</sub> = (ΔT<sub>1</sub> − ΔT<sub>2</sub>) / ln(ΔT<sub>1</sub> / ΔT<sub>2</sub>). With the overall coefficient and area, Q = U A ΔT<sub>lm</sub>.</p><h2>Worked example</h2><p>For counterflow water cooling from 120 °C to 80 °C against a stream heated from 20 °C to 60 °C, both terminal differences are 60 K. The LMTD is therefore 60 K; at U = 200 W/(m²·K) and A = 10 m², the estimated rate is 120 kW.</p><h2>Important limits</h2><p>This tool does not determine U, calculate an exchanger area, apply an LMTD correction factor, perform a heat balance from flow rates, or cover phase change and complex arrangements. Use the correct exchanger standard and thermal-design method for final work.</p><h2>Related tools</h2><p><Link href="/en/calculators/heat-conduction">Heat Conduction Calculator</Link> · <Link href="/en/engineering-calculators/heat-transfer/thermal-resistance-calculator">Thermal Resistance &amp; U-value Calculator</Link> · <Link href="/en/engineering-calculators/heat-transfer">Heat Transfer Calculators</Link></p></article></div></main>;
}
