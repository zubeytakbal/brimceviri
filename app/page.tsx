import { buildHomeLanguageAlternates } from "./i18n/routing";
import type { Metadata } from "next";
import "./components/yeni/yeni.css";
import AnaSayfa from "./components/yeni/AnaSayfa";
import { buildSiteUrl } from "./siteConfig";

const homeUrl = buildSiteUrl("/");
const aciklama =
  "Metre, kilogram, litre, dönüm, bar ve santigrat gibi birimlerde çevirme (1 inç = 2,54 cm, 1 dönüm = 1.000 m²); KDV, beton, yaş ve maaş gibi günlük hesaplayıcılar.";

export const metadata: Metadata = {
  title: "Birim Çevirici: Birim Çevirme ve Hesaplama",
  description: aciklama,
  alternates: {
    canonical: homeUrl,
    ...buildHomeLanguageAlternates(),
  },
  openGraph: {
    title: "Birim Çevirici: Birim Çevirme ve Hesaplama | BirimCeviri.app",
    description: aciklama,
    url: homeUrl,
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default function Page() {
  return <AnaSayfa />;
}
