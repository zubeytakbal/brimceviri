import { buildHomeLanguageAlternates } from "../i18n/routing";
import type { Metadata } from "next";
import NederlandsHomeDirectory from "../components/NederlandsHomeDirectory";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Eenheden Omrekenen Online: Lengte, Gewicht en Temperatuur",
  description: "Eenheden omrekenen, online en gratis: lengte, gewicht, temperatuur, druk en andere eenheden, met formules en duidelijke tabellen.",
  alternates: { canonical: "/nl", ...buildHomeLanguageAlternates() },
  openGraph: { title: "Eenheden Omrekenen Online: Lengte, Gewicht en Temperatuur", description: "Nauwkeurige omrekeningen en eenhedengidsen in het Nederlands.", url: buildSiteUrl("/nl"), siteName: "BirimCeviri.app", locale: "nl_NL", type: "website" },
};

export default function NederlandsHomePage() { return <NederlandsHomeDirectory />; }
