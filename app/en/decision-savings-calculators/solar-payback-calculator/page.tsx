import type { Metadata } from "next";
import EnglishSolarPaybackCalculator from "../../../components/EnglishSolarPaybackCalculator";
import StaticPageLayout from "../../../components/StaticPageLayout";
import { englishDecisionSavingsHubPath } from "../../../i18n/englishDecisionSavingsTools";
import { SITE_NAME, buildSiteUrl } from "../../../siteConfig";

const pagePath = "/en/decision-savings-calculators/solar-payback-calculator";
export const metadata: Metadata = { title: `Solar Payback Calculator`, description: "Estimate solar production, self-consumption, export value and simple payback with local production and tariff assumptions.", alternates: { canonical: pagePath, languages: { en: pagePath } }, openGraph: { title: "Solar Payback Calculator", description: "Estimate solar production, self-consumption value, export value and simple payback.", url: buildSiteUrl(pagePath), siteName: SITE_NAME, locale: "en_US", type: "website" } };

export default function SolarPaybackPage() {
  return <StaticPageLayout locale="en" breadcrumbAriaLabel="Breadcrumb" breadcrumbs={[{ href: "/en", label: "Home" }, { href: englishDecisionSavingsHubPath, label: "Decision & Savings Calculators" }, { label: "Solar Payback Calculator" }]} title="Solar Payback Calculator" description="Estimate the annual value and simple payback of a solar PV system using location-specific production and tariff inputs." sections={[{ heading: "Estimate solar value and payback", content: <EnglishSolarPaybackCalculator /> }, { heading: "Why self-consumption matters", content: <p>Electricity used in the home often avoids a different price from electricity exported to the grid. Entering both rates makes the estimate more useful than treating all production as identical.</p> }, { heading: "What this does not model", content: <p>This is a simple cash-payback estimate. It does not forecast tariff changes, performance degradation, financing, incentives, maintenance or battery economics.</p> }]} />;
}
