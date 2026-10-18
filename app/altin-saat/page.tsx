import type { Metadata } from "next";
import GoldenHourPage, { goldenTodayPlaces } from "../components/sun/GoldenHourPage";
import { goldenToday } from "../components/sun/GoldenToday";
import { trDayText, trToday } from "../components/sun/SunToday";
import { trClock } from "../converter/time/sunYear";
import { buildLanguageAlternates } from "../i18n/routing";
import { buildSiteUrl } from "../siteConfig";

export const revalidate = 21600;

// Sayfa her gece yeniden derlenir: açıklama o günün İstanbul saatlerini verir.
const today = trToday();
const ist = goldenToday(goldenTodayPlaces[0], today);
const span = (pair: [Date, Date] | null) => (pair ? `${trClock(pair[0])}–${trClock(pair[1])}` : "—");
const title = "Altın Saat ve Mavi Saat Hesaplama (Fotoğraf)";
const description = `${trDayText(today)}: İstanbul'da akşam altın saat ${span(ist.eveningGolden)}, mavi saat ${span(ist.eveningBlue)}. 81 ilde bugünkü altın saat ve mavi saat, sabah ve akşam.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/altin-saat", ...buildLanguageAlternates({ tr: "/altin-saat", en: "/en/golden-hour" }, "tr") },
  openGraph: { title, description, url: buildSiteUrl("/altin-saat"), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

export default function GoldenHourRoute() {
  return <GoldenHourPage lang="tr" />;
}
