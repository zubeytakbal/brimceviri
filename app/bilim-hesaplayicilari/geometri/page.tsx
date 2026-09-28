import type { Metadata } from "next";
import ScienceHubPage from "../../components/science/ScienceHubPage";
import { findScienceHub } from "../../converter/scienceHubs";
import { buildSiteUrl } from "../../siteConfig";

const hub = findScienceHub("geometri");

export const metadata: Metadata = {
  title: hub.metaTitle,
  description: hub.metaDescription,
  alternates: { canonical: hub.path },
  openGraph: {
    title: hub.metaTitle,
    description: hub.metaDescription,
    url: buildSiteUrl(hub.path),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default function ScienceHubRoute() {
  return <ScienceHubPage hub={hub} />;
}
