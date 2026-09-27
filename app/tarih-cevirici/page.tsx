import type { Metadata } from "next";
import DateConverterPage from "../components/dates/DateConverterPage";
import { buildLanguageAlternates } from "../i18n/routing";
import { buildSiteUrl } from "../siteConfig";

// "Bugunun Hicri tarihi" gunluk degisir.
export const revalidate = 21600;

const title = "Hicri Rumi Miladi Tarih Çevirici (Gün Gün)";
const description =
  "Rumi ve Hicri tarihleri gün gün Miladiye çevir (veya tersi). Tapu, nüfus ve arşiv belgeleri için 1917 geçişi ve Jülyen takvim kuralları dahil; bugünün Hicri tarihi.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tarih-cevirici", ...buildLanguageAlternates({ tr: "/tarih-cevirici", en: "/en/hijri-date-converter" }, "tr") },
  openGraph: { title, description, url: buildSiteUrl("/tarih-cevirici"), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

export default function DateConverterRoute() {
  return <DateConverterPage lang="tr" />;
}
