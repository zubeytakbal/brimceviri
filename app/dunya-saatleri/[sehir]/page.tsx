import type { Metadata } from "next";
import { seoTitle } from "../../seoTitle";
import { appManifestPath, findInstallableApp } from "../../converter/time/installableApps";
import { notFound } from "next/navigation";
import CityTimePage, { cityPageDescription, cityPageTitle } from "../../components/world/CityTimePage";
import { buildLanguageAlternates } from "../../i18n/routing";
import { cityPathDe } from "../../converter/time/germanWorld";
import { findCityByTrSlug, worldCities } from "../../converter/time/worldCities";
import { buildSiteUrl } from "../../siteConfig";

// Saat farki, yaz saati ve gun dogumu verileri gunluk degisir: 6 saatte bir tazelenir.
export const revalidate = 21600;
export const dynamicParams = false;

export function generateStaticParams() {
  return worldCities.map((city) => ({ sehir: city.tr }));
}

export async function generateMetadata({ params }: { params: Promise<{ sehir: string }> }): Promise<Metadata> {
  const city = findCityByTrSlug((await params).sehir);
  if (!city) return {};
  const path = `/dunya-saatleri/${city.tr}`;
  const title = cityPageTitle(city, "tr");
  const description = cityPageDescription(city, "tr", new Date());
  return {
    title: seoTitle(title, `${city.nameTr} Saat Kaç? Canlı Saat`),
    description,
    manifest: appManifestPath("dunya-saatleri"),
    appleWebApp: { capable: true, title: findInstallableApp("dunya-saatleri")!.shortName },
    alternates: { canonical: path, ...buildLanguageAlternates({ tr: path, en: `/en/world-clock/${city.en}`, de: cityPathDe(city) }, "tr") },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
  };
}

export default async function TurkishCityTimePage({ params }: { params: Promise<{ sehir: string }> }) {
  const city = findCityByTrSlug((await params).sehir);
  if (!city) notFound();
  return <CityTimePage city={city} lang="tr" />;
}
