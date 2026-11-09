import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GrupSayfasi, { grupMetadata } from "../../components/yeni/GrupSayfasi";
import { HESAPLAYICI_GRUPLARI } from "../../components/yeni/gruplar";
import { hesapOgeleri } from "../../components/yeni/grupOgeleri";

type PageProps = { params: Promise<{ grup: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return HESAPLAYICI_GRUPLARI.map((g) => ({ grup: g.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { grup: slug } = await params;
  const grup = HESAPLAYICI_GRUPLARI.find((g) => g.slug === slug);
  return grup ? grupMetadata("hesap", grup) : { title: "Sayfa bulunamadı" };
}

export default async function HesapGrubuSayfasi({ params }: PageProps) {
  const { grup: slug } = await params;
  const grup = HESAPLAYICI_GRUPLARI.find((g) => g.slug === slug);
  if (!grup) notFound();
  return <GrupSayfasi tur="hesap" grup={grup} ogeler={hesapOgeleri(grup)} digerGruplar={HESAPLAYICI_GRUPLARI} />;
}
