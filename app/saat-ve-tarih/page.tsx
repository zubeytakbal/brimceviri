import type { Metadata } from "next";
import TrTimeHubPage, { TR_TIME_HUB_PATH } from "../components/timehub/TrTimeHubPage";
import { timeHubAlternates } from "../components/timehub/timeHubPaths";
import { buildSiteUrl } from "../siteConfig";

// "Bugün" ve "yaklaşan günler" her gün değişir; site her gece yeniden derlenir.
export const revalidate = 21600;

const title = "Saat Kaç? Türkiye Saati, Bugünün Tarihi ve Takvim";
const description =
  "Türkiye'de saat şu an kaç? Canlı saat, bugünün hicri ve rumi tarihi, kaçıncı hafta, ay evresi, güneşin doğuş-batış saati, sıradaki resmî tatil ve tüm saat-takvim araçları.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: TR_TIME_HUB_PATH, ...timeHubAlternates() },
  openGraph: { title, description, url: buildSiteUrl(TR_TIME_HUB_PATH), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

export default function SaatVeTarihRoute() {
  return <TrTimeHubPage />;
}
