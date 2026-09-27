import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pairTitle, TimeZonePairPage } from "../../../components/world/TimeZoneConverterPages";
import { findPair, zonePairs } from "../../../converter/time/timeZonePairs";
import { buildSiteUrl } from "../../../siteConfig";

export const revalidate = 21600;
export const dynamicParams = false;

export function generateStaticParams() {
  return zonePairs.map((pair) => ({ pair: pair.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ pair: string }> }): Promise<Metadata> {
  const pair = findPair((await params).pair);
  if (!pair) return {};
  const path = `/en/time-zone-converter/${pair.slug}`;
  const title = pairTitle(pair);
  const description = `Convert ${pair.fromCode} to ${pair.toCode} instantly: live converter with daylight saving, a 24-hour ${pair.fromCode} to ${pair.toCode} table and the best meeting hours.`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
  };
}

export default async function TimeZonePairRoute({ params }: { params: Promise<{ pair: string }> }) {
  const pair = findPair((await params).pair);
  if (!pair) notFound();
  return <TimeZonePairPage pair={pair} />;
}
