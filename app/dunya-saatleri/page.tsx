import type { Metadata } from "next";
import WorldClockHub from "../components/world/WorldClockHub";
import { timeToolAlternates } from "../i18n/timeToolPaths";
import { buildSiteUrl } from "../siteConfig";

export const revalidate = 21600;

const title = "Dünya Saatleri: Şehirlerin Canlı Saati ve Farkı";
const description =
  "97 şehrin canlı saati tek ekranda: New York, Londra, Dubai, Tokyo… Türkiye ile saat farkı, yaz saati tarihleri, UTC farkları; şehir ara, favorilere ekle.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/dunya-saatleri", ...timeToolAlternates("worldClock") },
  openGraph: { title, description, url: buildSiteUrl("/dunya-saatleri"), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

export default function WorldClockPage() {
  return <WorldClockHub lang="tr" />;
}
