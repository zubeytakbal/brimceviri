import type { Metadata } from "next";
import { worldCityPaths } from "@/app/converter/time/nordicWorld";
import { seoTitle } from "../../seoTitle";
import { appManifestPath, findInstallableApp } from "../../converter/time/installableApps";
import { notFound } from "next/navigation";
import CityTimePage, { cityPageDescription, cityPageTitlesTr } from "../../components/world/CityTimePage";
import { buildLanguageAlternates } from "../../i18n/routing";
import { findCityByTrSlug, trSaatSehirleri, yalnizTurkceMi } from "../../converter/time/worldCities";
import { buildSiteUrl } from "../../siteConfig";

// Saat farki, yaz saati ve gun dogumu verileri gunluk degisir: 6 saatte bir tazelenir.
export const revalidate = 21600;
export const dynamicParams = false;

export function generateStaticParams() {
  return trSaatSehirleri.map((city) => ({ sehir: city.tr }));
}

export async function generateMetadata({ params }: { params: Promise<{ sehir: string }> }): Promise<Metadata> {
  const city = findCityByTrSlug((await params).sehir);
  if (!city) return {};
  const path = `/dunya-saatleri/${city.tr}`;
  const titles = cityPageTitlesTr(city);
  const title = titles[0];
  const description = cityPageDescription(city, "tr", new Date());
  return {
    title: seoTitle(...titles),
    description,
    manifest: appManifestPath("dunya-saatleri"),
    appleWebApp: { capable: true, title: findInstallableApp("dunya-saatleri")!.shortName },
    // Yalnızca Türkçe olan başkentlerin başka dil karşılığı yok.
    alternates: yalnizTurkceMi(city) ? { canonical: path } : { canonical: path, ...buildLanguageAlternates(worldCityPaths(city), "tr") },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
  };
}

export default async function TurkishCityTimePage({ params }: { params: Promise<{ sehir: string }> }) {
  const city = findCityByTrSlug((await params).sehir);
  if (!city) notFound();
  return <CityTimePage city={city} lang="tr" variant="saat" />;
}
