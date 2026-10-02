import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NordicCityTimePage, { nordicCityMetadata } from "../../../components/world/NordicCityTimePage";
import { citySlugNordic, findCityNordic } from "../../../converter/time/nordicWorld";
import { worldCities } from "../../../converter/time/worldCities";

// Saat farkı ve yaz saati yıl içinde değişir; site her gece yeniden derlenir.
export const revalidate = 21600;
export const dynamicParams = false;

type PageProps = { params: Promise<{ stad: string }> };

export function generateStaticParams() {
  return worldCities.map((city) => ({ stad: citySlugNordic("da", city) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const city = findCityNordic("da", (await params).stad);
  return city ? nordicCityMetadata("da", city) : {};
}

export default async function Route({ params }: PageProps) {
  const city = findCityNordic("da", (await params).stad);
  if (!city) notFound();
  return <NordicCityTimePage locale="da" city={city} />;
}
