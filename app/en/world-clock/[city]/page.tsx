import type { Metadata } from "next";
import { seoTitle } from "../../../seoTitle";
import { appManifestPath, findInstallableApp } from "../../../converter/time/installableApps";
import { notFound } from "next/navigation";
import CityTimePage, { cityPageDescription, cityPageTitle } from "../../../components/world/CityTimePage";
import { buildLanguageAlternates } from "../../../i18n/routing";
import { cityPathDe } from "../../../converter/time/germanWorld";
import { findCityByEnSlug, worldCities } from "../../../converter/time/worldCities";
import { buildSiteUrl } from "../../../siteConfig";

export const revalidate = 21600;
export const dynamicParams = false;

export function generateStaticParams() {
  return worldCities.map((city) => ({ city: city.en }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const city = findCityByEnSlug((await params).city);
  if (!city) return {};
  const path = `/en/world-clock/${city.en}`;
  const title = cityPageTitle(city, "en");
  const description = cityPageDescription(city, "en", new Date());
  return {
    title: seoTitle(title, `Current Time in ${city.nameEn}: Live Clock`, `Time in ${city.nameEn} Now`),
    description,
    manifest: appManifestPath("world-clock"),
    appleWebApp: { capable: true, title: findInstallableApp("world-clock")!.shortName },
    alternates: { canonical: path, ...buildLanguageAlternates({ tr: `/dunya-saatleri/${city.tr}`, en: path, de: cityPathDe(city) }, "tr") },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
  };
}

export default async function EnglishCityTimePage({ params }: { params: Promise<{ city: string }> }) {
  const city = findCityByEnSlug((await params).city);
  if (!city) notFound();
  return <CityTimePage city={city} lang="en" />;
}
