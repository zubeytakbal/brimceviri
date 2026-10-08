import type { Metadata } from "next";
import MoonPhasesPage from "../components/moon/MoonPhasesPage";
import { buildLanguageAlternates } from "../i18n/routing";
import { buildSiteUrl } from "../siteConfig";

export const revalidate = 21600;

const title = "Ay Evreleri: Bugün, Dün ve Bu Hafta Ay Nasıl? Dolunay Takvimi";
const description =
  "Bugün, dün ya da salı günü ay nasıldı? Son 7 gün ve önümüzdeki 7 günün ay görünümü, istediğiniz tarihteki ay evresi, 8 evrenin anlamı, dolunay ve yeni ay saatleri (Türkiye saati).";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ay-evreleri", ...buildLanguageAlternates({ tr: "/ay-evreleri", en: "/en/moon-phases" }, "tr") },
  openGraph: { title, description, url: buildSiteUrl("/ay-evreleri"), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

export default function MoonPhasesRoute() {
  return <MoonPhasesPage lang="tr" />;
}
