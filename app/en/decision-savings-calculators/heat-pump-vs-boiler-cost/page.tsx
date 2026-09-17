import type { Metadata } from "next";
import EnglishHeatPumpVsBoilerCalculator from "../../../components/EnglishHeatPumpVsBoilerCalculator";
import StaticPageLayout from "../../../components/StaticPageLayout";
import { englishDecisionSavingsHubPath } from "../../../i18n/englishDecisionSavingsTools";
import { SITE_NAME, buildSiteUrl } from "../../../siteConfig";

const pagePath = "/en/decision-savings-calculators/heat-pump-vs-boiler-cost";
export const metadata: Metadata = { title: `Heat Pump vs Boiler Cost Calculator | ${SITE_NAME}`, description: "Compare annual boiler and heat-pump heating cost with your local gas and electricity prices, efficiency and seasonal COP.", alternates: { canonical: pagePath, languages: { en: pagePath } }, openGraph: { title: "Heat Pump vs Boiler Cost Calculator", description: "Compare annual boiler and heat-pump heating cost with your own tariffs and system data.", url: buildSiteUrl(pagePath), siteName: SITE_NAME, locale: "en_US", type: "website" } };

export default function HeatPumpVsBoilerPage() {
  return <StaticPageLayout locale="en" breadcrumbAriaLabel="Breadcrumb" breadcrumbs={[{ href: "/en", label: "Home" }, { href: englishDecisionSavingsHubPath, label: "Decision & Savings Calculators" }, { label: "Heat Pump vs Boiler Cost" }]} title="Heat Pump vs Boiler Cost Calculator" description="Compare useful heat cost, annual running cost and simple payback with inputs tailored to your tariff and system." sections={[{ heading: "Compare annual heating costs", content: <EnglishHeatPumpVsBoilerCalculator /> }, { heading: "How it works", content: <p>Fuel price is converted to a fuel-energy cost, adjusted for boiler efficiency, then compared with electricity price divided by the heat pump&apos;s seasonal COP.</p> }, { heading: "A comparison, not a system design", content: <p>Equipment capacity, local climate, emitter temperature, hot-water demand and installer design can substantially affect the actual seasonal result.</p> }]} />;
}
