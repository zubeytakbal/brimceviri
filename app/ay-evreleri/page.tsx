import type { Metadata } from "next";
import MoonPhasesPage from "../components/moon/MoonPhasesPage";
import { buildLanguageAlternates } from "../i18n/routing";
import { buildSiteUrl } from "../siteConfig";

export const revalidate = 21600;

const title = "Ay Evreleri: Bugün ve Dün Ay Nasıl?";
const description =
  "Bugün, dün ya da salı günü ay nasıldı? Son 7 ve sonraki 7 günün ayı, istediğiniz tarihteki evre (ör. büyüyen hilal, %23 aydınlık), 8 evrenin anlamı, dolunay saatleri ve ay takvimi.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ay-evreleri", ...buildLanguageAlternates({ tr: "/ay-evreleri", en: "/en/moon-phases" }, "tr") },
  openGraph: { title, description, url: buildSiteUrl("/ay-evreleri"), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

export default function MoonPhasesRoute() {
  return <MoonPhasesPage lang="tr" />;
}
