import type { Metadata } from "next";
import NederlandsHomeDirectory from "../components/NederlandsHomeDirectory";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Eenheden omrekenen — Nederlands",
  description: "Reken gratis lengte, massa, temperatuur en andere eenheden om. Inclusief eenhedengidsen en praktische omrekenaars.",
  alternates: { canonical: "/nl" },
  openGraph: { title: "Eenheden omrekenen — Nederlands", description: "Nauwkeurige omrekeningen en eenhedengidsen in het Nederlands.", url: buildSiteUrl("/nl"), siteName: "BirimCeviri.app", locale: "nl_NL", type: "website" },
};

export default function NederlandsHomePage() { return <NederlandsHomeDirectory />; }
