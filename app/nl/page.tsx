import type { Metadata } from "next";
import { buildFullLanguageAlternates } from "../i18n/routing";
import NederlandsHomeDirectory from "../components/NederlandsHomeDirectory";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Eenheden omrekenen – eenhedenconverter",
  description: "Reken gratis lengte, massa, temperatuur en andere eenheden om. Inclusief eenhedengidsen en praktische omrekenaars.",
  alternates: { canonical: "/nl", ...buildFullLanguageAlternates("/nl") },
  openGraph: { title: "Eenheden omrekenen – eenhedenconverter", description: "Nauwkeurige omrekeningen en eenhedengidsen in het Nederlands.", url: buildSiteUrl("/nl"), siteName: "BirimCeviri.app", locale: "nl_NL", type: "website" },
};

export default function NederlandsHomePage() { return <NederlandsHomeDirectory />; }
