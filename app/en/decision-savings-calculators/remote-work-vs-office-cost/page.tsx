import type { Metadata } from "next";
import EnglishRemoteWorkVsOfficeCalculator from "../../../components/EnglishRemoteWorkVsOfficeCalculator";
import StaticPageLayout from "../../../components/StaticPageLayout";
import { englishDecisionSavingsHubPath } from "../../../i18n/englishDecisionSavingsTools";
import { SITE_NAME, buildSiteUrl } from "../../../siteConfig";

const pagePath = "/en/decision-savings-calculators/remote-work-vs-office-cost";

export const metadata: Metadata = {
  title: `Remote Work vs Office Cost Calculator`,
  description: "Estimate the annual financial difference between remote work and office work using commute, lunch and at-home costs.",
  alternates: { canonical: pagePath, languages: { en: pagePath } },
  openGraph: { title: "Remote Work vs Office Cost Calculator", description: "Estimate the annual financial difference between remote work and office work using your own costs.", url: buildSiteUrl(pagePath), siteName: SITE_NAME, locale: "en_US", type: "website" },
};

export default function RemoteWorkVsOfficeCostPage() {
  return <StaticPageLayout locale="en" breadcrumbAriaLabel="Breadcrumb" breadcrumbs={[{ href: "/en", label: "Home" }, { href: englishDecisionSavingsHubPath, label: "Decision & Savings Calculators" }, { label: "Remote Work vs Office Cost" }]} title="Remote Work vs Office Cost Calculator" description="Estimate the annual cash-cost difference of working remotely for part of the week." sections={[{ heading: "Compare your work arrangements", content: <EnglishRemoteWorkVsOfficeCalculator /> }, { heading: "How the estimate works", content: <p>The calculator estimates the number of remote work days from your annual schedule, adds avoided commute and lunch costs, then subtracts any extra at-home cost.</p> }, { heading: "Keep the comparison personal", content: <p>Work arrangements have effects beyond expenses. Use this result alongside practical factors such as commuting time, work environment, family needs and career goals.</p> }]} />;
}
