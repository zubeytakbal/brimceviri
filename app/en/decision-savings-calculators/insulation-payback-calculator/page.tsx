import type { Metadata } from "next";
import EnglishInsulationPaybackCalculator from "../../../components/EnglishInsulationPaybackCalculator";
import StaticPageLayout from "../../../components/StaticPageLayout";
import { englishDecisionSavingsHubPath } from "../../../i18n/englishDecisionSavingsTools";
import { SITE_NAME, buildSiteUrl } from "../../../siteConfig";

const pagePath = "/en/decision-savings-calculators/insulation-payback-calculator";
export const metadata: Metadata = { title: `Insulation Payback Calculator`, description: "Estimate wall heat-loss reduction, annual energy savings and simple insulation payback with your own assumptions.", alternates: { canonical: pagePath, languages: { en: pagePath } }, openGraph: { title: "Insulation Payback Calculator", description: "Estimate wall heat-loss reduction and a simple insulation payback.", url: buildSiteUrl(pagePath), siteName: SITE_NAME, locale: "en_US", type: "website" } };

export default function InsulationPaybackPage() {
  return <StaticPageLayout locale="en" breadcrumbAriaLabel="Breadcrumb" breadcrumbs={[{ href: "/en", label: "Home" }, { href: englishDecisionSavingsHubPath, label: "Decision & Savings Calculators" }, { label: "Insulation Payback Calculator" }]} title="Insulation Payback Calculator" description="Use basic wall properties, local heating costs and a project quote to make an early insulation estimate." sections={[{ heading: "Estimate wall-insulation payback", content: <EnglishInsulationPaybackCalculator /> }, { heading: "What this estimate includes", content: <p>The calculation models conductive heat loss through one wall area before and after insulation. It converts the estimated kWh reduction into a cost saving using the energy price you enter.</p> }, { heading: "Use this for early planning", content: <p>A whole-building assessment should include the roof, floor, windows, ventilation and local building requirements. Ask a qualified professional to specify a retrofit.</p> }]} />;
}
