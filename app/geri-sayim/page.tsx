import type { Metadata } from "next";
import CountdownHub from "../components/countdown/CountdownHub";
import { timeToolAlternates } from "../i18n/timeToolPaths";
import { buildSiteUrl } from "../siteConfig";

// Kalan gun sayilari her gun degisir.
export const revalidate = 3600;

const title = "Geri Sayım: Yılbaşına, Bayrama Kaç Gün Kaldı?";
const description =
  "Yılbaşı, Ramazan ve Kurban Bayramı, 23 Nisan, 29 Ekim ve özel günlere kaç gün kaldı? Canlı geri sayım; kendi geri sayımını oluştur ve paylaş.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/geri-sayim", ...timeToolAlternates("countdown") },
  openGraph: { title, description, url: buildSiteUrl("/geri-sayim"), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

export default function CountdownPage() {
  return <CountdownHub lang="tr" />;
}
