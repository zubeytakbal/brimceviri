import { buildHomeLanguageAlternates } from "../i18n/routing";
import type { Metadata } from "next";
import NederlandsHomeDirectory from "../components/NederlandsHomeDirectory";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Vind de eenheidsomrekening die je nodig hebt",
  description: "Reken gratis lengte, massa, temperatuur en andere eenheden om. Inclusief eenhedengidsen en praktische omrekenaars.",
  alternates: { canonical: "/nl", ...buildHomeLanguageAlternates() },
  openGraph: { title: "Vind de eenheidsomrekening die je nodig hebt", description: "Nauwkeurige omrekeningen en eenhedengidsen in het Nederlands.", url: buildSiteUrl("/nl"), siteName: "BirimCeviri.app", locale: "nl_NL", type: "website" },
};

export default function NederlandsHomePage() { return <NederlandsHomeDirectory />; }
