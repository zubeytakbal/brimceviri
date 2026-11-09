import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GrupSayfasi, { grupMetadata } from "../../components/yeni/GrupSayfasi";
import { DONUSUM_ALT_GRUPLARI, TUM_GRUPLAR } from "../../components/yeni/gruplar";

type PageProps = { params: Promise<{ grup: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return TUM_GRUPLAR.map((g) => ({ grup: g.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { grup: slug } = await params;
  const grup = TUM_GRUPLAR.find((g) => g.slug === slug);
  return grup ? grupMetadata("hesap", grup) : { title: "Sayfa bulunamadı" };
}

export default async function HesapGrubuSayfasi({ params }: PageProps) {
  const { grup: slug } = await params;
  const grup = TUM_GRUPLAR.find((g) => g.slug === slug);
  if (!grup) notFound();
  return <GrupSayfasi tur="hesap" grup={grup} digerGruplar={TUM_GRUPLAR} altGruplar={grup.slug === "donusum" ? DONUSUM_ALT_GRUPLARI : undefined} />;
}
