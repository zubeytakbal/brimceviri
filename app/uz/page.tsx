import { buildHomeLanguageAlternates } from "../i18n/routing";
import type { Metadata } from "next";
import HomeDirectory from "../components/HomeDirectory";
import { buildSiteUrl } from "../siteConfig";

const uzbekHomeUrl = buildSiteUrl("/uz");

export const metadata: Metadata = {
  title: "O'lchov birliklarini onlayn aylantirish",
  description:
    "Uzunlik, massa, hajm va harorat birliklarini bepul va onlayn aylantiring — natijani darhol ko'ring.",
  alternates: {
    canonical: uzbekHomeUrl,
    ...buildHomeLanguageAlternates(),
  },
  openGraph: {
    title: "O'lchov birliklarini onlayn aylantirish | BirimCeviri.app",
    description:
      "Uzunlik, massa, hajm va harorat birliklarini bepul va onlayn aylantiring.",
    url: uzbekHomeUrl,
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

export default function UzbekHomePage() {
  return <HomeDirectory locale="uz" />;
}
