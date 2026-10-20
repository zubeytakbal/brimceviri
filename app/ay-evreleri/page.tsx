import type { Metadata } from "next";
import MoonPhasesPage from "../components/moon/MoonPhasesPage";
import { buildLanguageAlternates } from "../i18n/routing";
import { buildSiteUrl } from "../siteConfig";

export const revalidate = 21600;

const title = "Ay Evreleri: Bugün, Dün ve Son 7 Gün Ay Nasıl? 8 Evre";
const description =
  "Ayın 8 evresi şemasıyla; bugün, dün ve geçen salı ay nasıldı, son 7 günün evreleri, aylık ay takvimi, dolunay ve yeni ay saatleri, ayın doğuş-batış saatleri.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ay-evreleri", ...buildLanguageAlternates({ tr: "/ay-evreleri", en: "/en/moon-phases" }, "tr") },
  openGraph: { title, description, url: buildSiteUrl("/ay-evreleri"), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

export default function MoonPhasesRoute() {
  return <MoonPhasesPage lang="tr" />;
}
