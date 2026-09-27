import type { Metadata } from "next";
import MoonPhasesPage from "../components/moon/MoonPhasesPage";
import { buildLanguageAlternates } from "../i18n/routing";
import { buildSiteUrl } from "../siteConfig";

export const revalidate = 21600;

const title = "Ay Evreleri ve Dolunay Takvimi: Bugün Ay Nasıl?";
const description =
  "Bugün ay hangi evrede, dolunay ne zaman? Canlı ay görünümü, aydınlanma yüzdesi, bu ayın ay takvimi ve önümüzdeki dolunay ile yeni ay saatleri (Türkiye saati).";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ay-evreleri", ...buildLanguageAlternates({ tr: "/ay-evreleri", en: "/en/moon-phases" }, "tr") },
  openGraph: { title, description, url: buildSiteUrl("/ay-evreleri"), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

export default function MoonPhasesRoute() {
  return <MoonPhasesPage lang="tr" />;
}
