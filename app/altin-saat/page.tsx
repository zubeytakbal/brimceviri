import type { Metadata } from "next";
import GoldenHourPage from "../components/sun/GoldenHourPage";
import { buildLanguageAlternates } from "../i18n/routing";
import { buildSiteUrl } from "../siteConfig";

export const revalidate = 21600;

const title = "Altın Saat ve Mavi Saat Hesaplama (Fotoğraf)";
const description =
  "Fotoğraf için altın saat ve mavi saat ne zaman? Şehir ya da konumuna göre sabah-akşam saatleri, gün doğumu-batımı ve gün şeridi. İstanbul, Ankara, İzmir ve 97 şehir.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/altin-saat", ...buildLanguageAlternates({ tr: "/altin-saat", en: "/en/golden-hour" }, "tr") },
  openGraph: { title, description, url: buildSiteUrl("/altin-saat"), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

export default function GoldenHourRoute() {
  return <GoldenHourPage lang="tr" />;
}
