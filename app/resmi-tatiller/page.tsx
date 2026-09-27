import type { Metadata } from "next";
import { HolidayHubPage, holidayHubMeta } from "../components/dates/HolidayPages";
import { buildSiteUrl } from "../siteConfig";

// "Yaklasan tatiller" ve kalan gunler her gun degisir.
export const revalidate = 21600;

export function generateMetadata(): Metadata {
  const { title, description } = holidayHubMeta("tr");
  return {
    title,
    description,
    alternates: { canonical: "/resmi-tatiller" },
    openGraph: { title, description, url: buildSiteUrl("/resmi-tatiller"), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
  };
}

export default function HolidaysHubRoute() {
  return <HolidayHubPage lang="tr" />;
}
