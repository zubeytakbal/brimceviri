import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eventSummary, formatEventDate } from "../../../components/countdown/CountdownEventPage";
import { GermanCountdownEventPage } from "../../../components/countdown/GermanCountdownPages";
import { countdownAlternatePaths, countdownEvents, countdownPath, findCountdownEvent } from "../../../converter/time/countdownEvents";
import { buildLanguageAlternates } from "../../../i18n/routing";
import { seoTitle } from "../../../seoTitle";
import { buildSiteUrl } from "../../../siteConfig";

export const revalidate = 3600;
export const dynamicParams = false;

type PageProps = { params: Promise<{ anlass: string }> };

export function generateStaticParams() {
  return countdownEvents.filter((e) => e.lang === "de").map((e) => ({ anlass: e.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const event = findCountdownEvent("de", (await params).anlass);
  if (!event) return {};
  const path = countdownPath(event);
  const { next, days } = eventSummary(event, new Date());
  const title = `${event.question} (${next ? next.year : ""})`;
  const description = `${event.name} ${next ? `am ${formatEventDate(next, "de")}` : ""}: noch ${days ?? ""} Tage. Live-Countdown, Termine der nächsten Jahre und ob es ein Feiertag ist.`;
  return {
    title: seoTitle(title, event.question),
    description,
    alternates: { canonical: path, ...buildLanguageAlternates(countdownAlternatePaths(event), "tr") },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
  };
}

export default async function GermanCountdownRoute({ params }: PageProps) {
  const event = findCountdownEvent("de", (await params).anlass);
  if (!event) notFound();
  return <GermanCountdownEventPage event={event} />;
}
