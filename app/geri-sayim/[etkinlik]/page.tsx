import type { Metadata } from "next";
import { seoTitle } from "../../seoTitle";
import { notFound } from "next/navigation";
import CountdownEventPage, { eventSummary, formatEventDate } from "../../components/countdown/CountdownEventPage";
import { countdownEvents, countdownPath, findCountdownEvent, pairedEvent } from "../../converter/time/countdownEvents";
import { buildLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

// Kalan gun her gun degisir; tarih gecince bir sonraki yila otomatik gecilir.
export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return countdownEvents.filter((event) => event.lang === "tr").map((event) => ({ etkinlik: event.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ etkinlik: string }> }): Promise<Metadata> {
  const event = findCountdownEvent("tr", (await params).etkinlik);
  if (!event) return {};
  const path = countdownPath(event);
  const { next, days } = eventSummary(event, new Date());
  const year = next ? next.year : "";
  const title = event.lang === "tr" ? `${event.question} (${event.name} ${year})` : `${event.question} (${year})`;
  const description =
    event.lang === "tr"
      ? `${event.name} ${next ? formatEventDate(next, "tr") : ""}${next?.estimated ? " (tahmini)" : ""}: ${days ?? ""} gün kaldı. Canlı geri sayım, yıllara göre tarihler ve resmî tatil bilgisi.`
      : `${event.name} ${next ? formatEventDate(next, "en") : ""}: ${days ?? ""} days to go. Live countdown, dates by year and holiday facts.`;
  const pair = pairedEvent(event);
  const paths = pair ? { [event.lang]: path, [pair.lang]: countdownPath(pair) } : { [event.lang]: path };
  return {
    title: seoTitle(title, `${event.question} (${year})`, event.question),
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
