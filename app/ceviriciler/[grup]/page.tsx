import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GrupSayfasi, { grupMetadata } from "../../components/yeni/GrupSayfasi";
import { BIRIM_GRUPLARI } from "../../components/yeni/gruplar";
import { birimOgeleri } from "../../components/yeni/grupOgeleri";

type PageProps = { params: Promise<{ grup: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return BIRIM_GRUPLARI.map((g) => ({ grup: g.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { grup: slug } = await params;
  const grup = BIRIM_GRUPLARI.find((g) => g.slug === slug);
  return grup ? grupMetadata("birim", grup) : { title: "Sayfa bulunamadı" };
}

export default async function BirimGrubuSayfasi({ params }: PageProps) {
  const { grup: slug } = await params;
  const grup = BIRIM_GRUPLARI.find((g) => g.slug === slug);
  if (!grup) notFound();
  return <GrupSayfasi tur="birim" grup={grup} ogeler={birimOgeleri(grup)} digerGruplar={BIRIM_GRUPLARI} />;
}
