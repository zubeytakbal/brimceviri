"use client";

import { useMemo, useState } from "react";
import { calculateAdMetrics } from "../converter/adMetricsCalculator";
import type { EnglishBusinessToolId } from "../i18n/englishBusinessToolCatalog";

function number(value: string) {
  const parsed = Number(value.trim().replace(/,/g, "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function format(value: number, digits = 2) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="category-general-converter-field"><span>{label}</span><input inputMode="decimal" type="text" value={value} onChange={(event) => onChange(event.target.value)} /></label>;
}

export default function EnglishBusinessMetricCalculator({ metric }: { metric: EnglishBusinessToolId }) {
  const [values, setValues] = useState({ fixedCosts: "5000", price: "50", variableCost: "20", sellingPrice: "100", directCost: "60", adSpend: "1000", attributedRevenue: "4000", impressions: "50000", clicks: "750", conversions: "30" });
  const set = (key: keyof typeof values) => (value: string) => setValues((current) => ({ ...current, [key]: value }));
  const result = useMemo(() => {
    if (metric === "ad-performance") {
      const adSpend = number(values.adSpend); const impressions = number(values.impressions); const clicks = number(values.clicks); const conversions = number(values.conversions); const attributedRevenue = number(values.attributedRevenue);
      const adMetrics = Number.isFinite(adSpend) && Number.isFinite(impressions) && Number.isFinite(clicks) ? calculateAdMetrics({ costTl: adSpend, impressions, clicks }) : null;
      if (!adMetrics || !Number.isFinite(conversions) || !Number.isFinite(attributedRevenue) || conversions < 0 || conversions > clicks || attributedRevenue < 0) return null;
      return { title: "Ad performance", rows: [["CPM", format(adMetrics.cpm)], ["CTR", `${format(adMetrics.ctr)}%`], ["CPC", adMetrics.cpc === null ? "No clicks" : format(adMetrics.cpc)], ["Conversion rate", clicks === 0 ? "No clicks" : `${format((conversions / clicks) * 100)}%`], ["CPA", conversions === 0 ? "No conversions" : format(adSpend / conversions)], ["ROAS", `${format(attributedRevenue / adSpend)}:1`]] };
    }
    if (metric === "break-even") {
      const fixedCosts = number(values.fixedCosts); const price = number(values.price); const variableCost = number(values.variableCost);
      if (![fixedCosts, price, variableCost].every(Number.isFinite) || fixedCosts < 0 || price <= variableCost) return null;
      const contribution = price - variableCost;
      const units = fixedCosts / contribution;
      return { title: "Break-even", rows: [["Contribution per unit", format(contribution)], ["Break-even units", format(units)], ["Minimum whole units", String(Math.ceil(units))], ["Break-even sales revenue", format(units * price)]] };
    }
    if (metric === "profit-margin") {
      const sellingPrice = number(values.sellingPrice); const directCost = number(values.directCost);
      if (![sellingPrice, directCost].every(Number.isFinite) || sellingPrice <= 0 || directCost < 0) return null;
      const grossProfit = sellingPrice - directCost;
      return { title: "Gross margin and markup", rows: [["Gross profit", format(grossProfit)], ["Gross margin", `${format((grossProfit / sellingPrice) * 100)}%`], ["Markup on cost", directCost === 0 ? "Not defined when cost is zero" : `${format((grossProfit / directCost) * 100)}%`]] };
    }
    const adSpend = number(values.adSpend); const attributedRevenue = number(values.attributedRevenue);
    if (![adSpend, attributedRevenue].every(Number.isFinite) || adSpend <= 0 || attributedRevenue < 0) return null;
    const roas = attributedRevenue / adSpend;
    return { title: "Return on ad spend", rows: [["ROAS ratio", `${format(roas)}:1`], ["ROAS percentage", `${format(roas * 100)}%`], ["Revenue after ad spend", format(attributedRevenue - adSpend)]] };
  }, [metric, values]);

  const fields = metric === "ad-performance" ? <><Field label="Ad spend" value={values.adSpend} onChange={set("adSpend")} /><Field label="Impressions" value={values.impressions} onChange={set("impressions")} /><Field label="Clicks" value={values.clicks} onChange={set("clicks")} /><Field label="Conversions" value={values.conversions} onChange={set("conversions")} /><Field label="Attributed revenue" value={values.attributedRevenue} onChange={set("attributedRevenue")} /></>
    : metric === "break-even" ? <><Field label="Fixed costs" value={values.fixedCosts} onChange={set("fixedCosts")} /><Field label="Selling price per unit" value={values.price} onChange={set("price")} /><Field label="Variable cost per unit" value={values.variableCost} onChange={set("variableCost")} /></>
    : metric === "profit-margin" ? <><Field label="Selling price" value={values.sellingPrice} onChange={set("sellingPrice")} /><Field label="Direct cost" value={values.directCost} onChange={set("directCost")} /></>
      : <><Field label="Attributed revenue" value={values.attributedRevenue} onChange={set("attributedRevenue")} /><Field label="Ad spend" value={values.adSpend} onChange={set("adSpend")} /></>;
  const error = metric === "ad-performance" ? "Enter valid campaign data. Clicks cannot exceed impressions, and conversions cannot exceed clicks." : metric === "break-even" ? "Enter valid costs and a selling price higher than the variable cost." : metric === "profit-margin" ? "Enter a selling price above zero and a non-negative direct cost." : "Enter a positive ad spend and non-negative attributed revenue.";

  return <div className="category-general-converter"><div className="engineering-calculator-card"><p className="calculator-usage-hint">Enter all monetary amounts in the same currency. The calculator returns ratios and amounts in that same basis.</p><div className="paint-calculator-grid">{fields}</div></div><div aria-live="polite" className="category-general-converter-result paint-calculator-result">{!result ? <strong>{error}</strong> : <div className="paint-calculator-result-grid">{result.rows.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>}</div></div>;
}
