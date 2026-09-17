import type { Metadata } from "next";
import Link from "next/link";
import EnglishEvVsGasRunningCostCalculator from "../../../components/EnglishEvVsGasRunningCostCalculator";
import StaticPageLayout from "../../../components/StaticPageLayout";
import { englishDecisionSavingsHubPath } from "../../../i18n/englishDecisionSavingsTools";
import { SITE_NAME, buildSiteUrl } from "../../../siteConfig";

const pagePath = "/en/decision-savings-calculators/ev-vs-gas-running-cost";

export const metadata: Metadata = {
  title: `EV vs Gas Running Cost Calculator | ${SITE_NAME}`,
  description: "Compare annual EV electricity and gas costs using metric or US units, your local prices and an optional vehicle price premium.",
  alternates: { canonical: pagePath, languages: { en: pagePath } },
  openGraph: { title: "EV vs Gas Running Cost Calculator", description: "Compare annual EV electricity and gas costs using your own prices and consumption figures.", url: buildSiteUrl(pagePath), siteName: SITE_NAME, locale: "en_US", type: "website" },
};

export default function EvVsGasRunningCostPage() {
  return <StaticPageLayout locale="en" breadcrumbAriaLabel="Breadcrumb" breadcrumbs={[{ href: "/en", label: "Home" }, { href: englishDecisionSavingsHubPath, label: "Decision & Savings Calculators" }, { label: "EV vs Gas Running Cost" }]} title="EV vs Gas Running Cost Calculator" description="Estimate annual energy costs and a simple payback period with inputs you can adapt to your vehicle, tariff and location." sections={[{ heading: "Compare your annual running costs", content: <EnglishEvVsGasRunningCostCalculator /> }, { heading: "What this comparison includes", content: <p>It compares energy used over the distance you drive in a year. The optional purchase premium is divided by the annual operating saving to show a simple payback estimate.</p> }, { heading: "What to check before deciding", content: <p>For a fuller ownership comparison, also consider insurance, maintenance, financing, charging access, resale value, taxes and any public-charging fees. You can return to the <Link href={englishDecisionSavingsHubPath}>Decision &amp; Savings Calculators</Link> hub as more focused comparison tools are added.</p> }]} />;
}
