import type { Metadata } from "next";
import { worldCityPaths } from "@/app/converter/time/nordicWorld";
import { seoTitle } from "../../seoTitle";
import { appManifestPath, findInstallableApp } from "../../converter/time/installableApps";
import { notFound } from "next/navigation";
import CityTimePage, { cityPageDescription, cityPageTitlesTr } from "../../components/world/CityTimePage";
import UlkeSaatPage, { ulkePageDescription, ulkePageTitles } from "../../components/world/UlkeSaatPage";
import { buildLanguageAlternates } from "../../i18n/routing";
import { ulkeSaatleri, ulkeSaatleriBul } from "../../converter/time/ulkeSaatDilimleri";
import { findCityByTrSlug, trSaatSehirleri, yalnizTurkceMi } from "../../converter/time/worldCities";
import { buildSiteUrl } from "../../siteConfig";

// Saat farki, yaz saati ve gun dogumu verileri gunluk degisir: 6 saatte bir tazelenir.
export const revalidate = 21600;
export const dynamicParams = false;

// Ayni adres yolunda sehir sayfalari ve birden cok saat dilimli ulke sayfalari (/dunya-saatleri/amerika).
export function generateStaticParams() {
  return [...trSaatSehirleri.map((city) => ({ sehir: city.tr })), ...ulkeSaatleri.map((u) => ({ sehir: u.slug }))];
}

export async function generateMetadata({ params }: { params: Promise<{ sehir: string }> }): Promise<Metadata> {
  const slug = (await params).sehir;
  const path = `/dunya-saatleri/${slug}`;
  const ortak = {
    manifest: appManifestPath("dunya-saatleri"),
    appleWebApp: { capable: true, title: findInstallableApp("dunya-saatleri")!.shortName },
  };
  const ulke = ulkeSaatleriBul(slug);
  if (ulke) {
    const titles = ulkePageTitles(ulke);
    const description = ulkePageDescription(ulke, new Date());
    return {
      title: seoTitle(...titles),
      description,
      ...ortak,
      alternates: { canonical: path },
      openGraph: { title: titles[0], description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
    };
  }
  const city = findCityByTrSlug(slug);
  if (!city) return {};
  const titles = cityPageTitlesTr(city);
  const title = titles[0];
  const description = cityPageDescription(city, "tr", new Date());
  return {
    title: seoTitle(...titles),
    description,
    ...ortak,
    // Yalnızca Türkçe olan başkentlerin başka dil karşılığı yok.
    alternates: yalnizTurkceMi(city) ? { canonical: path } : { canonical: path, ...buildLanguageAlternates(worldCityPaths(city), "tr") },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
  };
}

export default async function TurkishCityTimePage({ params }: { params: Promise<{ sehir: string }> }) {
  const slug = (await params).sehir;
  const ulke = ulkeSaatleriBul(slug);
  if (ulke) return <UlkeSaatPage ulke={ulke} />;
  const city = findCityByTrSlug(slug);
  if (!city) notFound();
  return <CityTimePage city={city} lang="tr" variant="saat" />;
}
