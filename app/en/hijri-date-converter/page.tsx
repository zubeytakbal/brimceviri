import type { Metadata } from "next";
import DateConverterPage from "../../components/dates/DateConverterPage";
import { buildLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

export const revalidate = 21600;

const title = "Hijri Date Converter: Islamic to Gregorian";
const description =
  "Convert Hijri (Islamic) dates to Gregorian and back, day by day, with today's Hijri date, this year's Islamic month start dates and the Ottoman Rumi calendar.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/en/hijri-date-converter",
    ...buildLanguageAlternates({ tr: "/tarih-cevirici", en: "/en/hijri-date-converter" }, "tr"),
  },
  openGraph: { title, description, url: buildSiteUrl("/en/hijri-date-converter"), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

export default function EnglishHijriConverterRoute() {
  return <DateConverterPage lang="en" />;
}
