import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HolidayYearPage, holidayYearMeta } from "../../../components/dates/HolidayPages";
import { HOLIDAY_YEARS } from "../../../converter/time/holidays";
import { buildSiteUrl } from "../../../siteConfig";

export const dynamicParams = false;
// "Siradaki tatil" kutusu icin gunluk yenilenir.
export const revalidate = 21600;

export function generateStaticParams() {
  return HOLIDAY_YEARS.map((year) => ({ year: String(year) }));
}

export async function generateMetadata({ params }: { params: Promise<{ year: string }> }): Promise<Metadata> {
  const year = Number((await params).year);
  const { title, description } = holidayYearMeta("en", year);
  const path = `/en/federal-holidays/${year}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
  };
}

export default async function HolidayYearRoute({ params }: { params: Promise<{ year: string }> }) {
  const year = Number((await params).year);
  if (!(HOLIDAY_YEARS as readonly number[]).includes(year)) notFound();
  return <HolidayYearPage lang="en" year={year} />;
}
