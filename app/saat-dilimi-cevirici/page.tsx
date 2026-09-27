import type { Metadata } from "next";
import { TimeZoneConverterHub } from "../components/world/TimeZoneConverterPages";
import { timeToolAlternates } from "../i18n/timeToolPaths";
import { buildSiteUrl } from "../siteConfig";

export const revalidate = 21600;

const title = "Saat Dilimi Çevirici ve Toplantı Planlayıcı";
const description =
  "Bir saati aynı anda birçok şehre çevir: İstanbul, New York, Londra, Tokyo… Yaz saati otomatik; toplantı planlayıcı ortak mesai saatini gösterir.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/saat-dilimi-cevirici", ...timeToolAlternates("timeZoneConverter") },
  openGraph: { title, description, url: buildSiteUrl("/saat-dilimi-cevirici"), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

export default function TimeZoneConverterPage() {
  return <TimeZoneConverterHub lang="tr" />;
}
