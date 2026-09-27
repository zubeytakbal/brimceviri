import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HolidayYearPage, holidayYearMeta } from "../../components/dates/HolidayPages";
import { HOLIDAY_YEARS } from "../../converter/time/holidays";
import { buildSiteUrl } from "../../siteConfig";

export const dynamicParams = false;
// "Siradaki tatil" kutusu icin gunluk yenilenir.
export const revalidate = 21600;

export function generateStaticParams() {
  return HOLIDAY_YEARS.map((year) => ({ yil: String(year) }));
}

export async function generateMetadata({ params }: { params: Promise<{ yil: string }> }): Promise<Metadata> {
  const year = Number((await params).yil);
  const { title, description } = holidayYearMeta("tr", year);
  const path = `/resmi-tatiller/${year}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
  };
}

export default async function HolidayYearRoute({ params }: { params: Promise<{ yil: string }> }) {
  const year = Number((await params).yil);
  if (!(HOLIDAY_YEARS as readonly number[]).includes(year)) notFound();
  return <HolidayYearPage lang="tr" year={year} />;
}
