import type { Metadata } from "next";
import { saatSayfasiKalkti } from "../../components/saat/kaldirilanSaatSayfalari";
import { seoTitle } from "../../seoTitle";
import { notFound } from "next/navigation";
import CountdownEventPage, { eventSummary } from "../../components/countdown/CountdownEventPage";
import { countdownAlternatePaths, countdownEvents, countdownPath, findCountdownEvent } from "../../converter/time/countdownEvents";
import { buildLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

// Kalan gun her gun degisir; tarih gecince bir sonraki yila otomatik gecilir.
export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return countdownEvents
    .filter((event) => event.lang === "tr" && !saatSayfasiKalkti(`/geri-sayim/${event.slug}`))
    .map((event) => ({ etkinlik: event.slug }));
}

const NE_ZAMAN_ARANAN = new Set(["mirac-kandili", "mevlid-kandili", "ilkbahar"]);

export async function generateMetadata({ params }: { params: Promise<{ etkinlik: string }> }): Promise<Metadata> {
  const event = findCountdownEvent("tr", (await params).etkinlik);
  if (!event) return {};
  const path = countdownPath(event);
  const { next } = eventSummary(event, new Date());
  const year = next ? next.year : "";
  // Başlık ve açıklama kalan gün sayısını vermez: cevap arama sonucunda görünürse kimse sayfaya gelmiyordu
  // (yılbaşı: 17 bin gösterimde %0,1 tıklama). Sayfada ne olduğunu anlatır.
  // Özel gün sayfası buraya yönlenen günlerde aramalar "ne zaman" diye geliyor (Miraç Kandili 3 ayda 1.881 gösterim).
  const neZaman = NE_ZAMAN_ARANAN.has(event.id);
  const title =
    event.id === "yilbasi"
      ? `${event.question} ${year} Yeni Yıl Sayacı (Canlı, Tam Ekran)`
      : neZaman
        ? `${event.name} ${year} Ne Zaman? Kaç Gün Kaldı, Canlı Geri Sayım`
        : `${event.question} ${year} Canlı Geri Sayım (Tam Ekran)`;
  const description =
    event.id === "yilbasi"
      ? `${year} yılına kalan süre saniye saniye: tam ekran yeni yıl sayacı, gece yarısı havai fişek kutlaması, dünyada yeni yıla hangi ülkenin ne zaman girdiği ve ${year} yılbaşı tatili.`
      : `${event.name} için gün, saat, dakika ve saniye olarak canlı geri sayım: tam ekran sayaç, yıllara göre ${event.name} tarihleri ve resmî tatil bilgisi.`;
  const paths = countdownAlternatePaths(event);
  return {
    // Site her gün yeniden derlendiği için kalan gün başlıkta da güncel kalır; arama sonucunda sayı doğrudan görünür.
    title: seoTitle(
      title,
      ...(event.id === "yilbasi" ? [`${event.question} ${year} Yeni Yıl Sayacı (Tam Ekran)`, `${event.question} ${year} Yeni Yıl Sayacı`] : []),
      ...(neZaman ? [`${event.name} ${year} Ne Zaman? Kaç Gün Kaldı`, `${event.name} ${year} Ne Zaman?`] : []),
      `${event.question} ${year} Canlı Geri Sayım`,
      `${event.question} (${year})`,
      event.question,
    ),
    description,
    alternates: { canonical: path, ...buildLanguageAlternates(paths, "tr") },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: event.lang === "tr" ? "tr_TR" : "en_US", type: "website" },
  };
}

export default async function CountdownEventRoute({ params }: { params: Promise<{ etkinlik: string }> }) {
  const event = findCountdownEvent("tr", (await params).etkinlik);
  if (!event) notFound();
  return <CountdownEventPage event={event} />;
}
