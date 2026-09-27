import type { Metadata } from "next";
import { HolidayHubPage, holidayHubMeta } from "../../components/dates/HolidayPages";
import { buildSiteUrl } from "../../siteConfig";

// "Yaklasan tatiller" ve kalan gunler her gun degisir.
export const revalidate = 21600;

export function generateMetadata(): Metadata {
  const { title, description } = holidayHubMeta("en");
  return {
    title,
    description,
    alternates: { canonical: "/en/federal-holidays" },
    openGraph: { title, description, url: buildSiteUrl("/en/federal-holidays"), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
  };
}

export default function FederalHolidaysHubRoute() {
  return <HolidayHubPage lang="en" />;
}
