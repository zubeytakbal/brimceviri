import type { Metadata } from "next";
import EnglishLedSavingsCalculator from "../../../components/EnglishLedSavingsCalculator";
import StaticPageLayout from "../../../components/StaticPageLayout";
import { englishDecisionSavingsHubPath } from "../../../i18n/englishDecisionSavingsTools";
import { SITE_NAME, buildSiteUrl } from "../../../siteConfig";

const pagePath = "/en/decision-savings-calculators/led-savings-calculator";

export const metadata: Metadata = {
  title: `LED Savings Calculator`,
  description: "Estimate electricity use, annual cost savings and simple payback when replacing older light bulbs with LEDs.",
  alternates: { canonical: pagePath, languages: { en: pagePath } },
  openGraph: { title: "LED Savings Calculator", description: "Estimate electricity use, annual cost savings and simple payback when replacing older light bulbs with LEDs.", url: buildSiteUrl(pagePath), siteName: SITE_NAME, locale: "en_US", type: "website" },
};

export default function LedSavingsPage() {
  return <StaticPageLayout locale="en" breadcrumbAriaLabel="Breadcrumb" breadcrumbs={[{ href: "/en", label: "Home" }, { href: englishDecisionSavingsHubPath, label: "Decision & Savings Calculators" }, { label: "LED Savings Calculator" }]} title="LED Savings Calculator" description="Compare the electricity use of older bulbs and LEDs using your bulb count, daily use and local electricity price." sections={[{ heading: "Estimate your LED savings", content: <EnglishLedSavingsCalculator /> }, { heading: "How the estimate works", content: <p>The calculator multiplies each bulb&apos;s wattage by the hours it is used over a year, converts watt-hours to kWh and applies the electricity price you enter. Payback is the LED purchase cost divided by the annual cost saving.</p> }, { heading: "Use your own figures", content: <p>LED wattage and brightness vary between products, and tariffs vary between homes. Replace the example values with the bulb packaging and a current bill price for a more useful result.</p> }]} />;
}
