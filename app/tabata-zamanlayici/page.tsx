import type { Metadata } from "next";
import { IntervalPage } from "../components/time/FocusPages";
import { timeToolAlternates, timeToolPaths } from "../i18n/timeToolPaths";
import { buildSiteUrl } from "../siteConfig";

const title = "Tabata Zamanlayıcı ve HIIT Aralık Sayacı";
const description = "Tabata 20/10, HIIT 30/30 ve 40/20, EMOM, boks raundu ya da kendi programın: sesli komut, son 3 saniye bip, tam ekran ve renkli fazlar.";
const path = timeToolPaths.interval.tr!;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, ...timeToolAlternates("interval") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

export default function IntervalRoute() {
  return <IntervalPage lang="tr" />;
}
