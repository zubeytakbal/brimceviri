import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FxPairPageView, { buildFxPairMetadata } from "../../../components/fx/FxPairPageView";
import { fxContentBn, fxPairsBn, getFxPairBn } from "../../../converter/fx/fxContentBn";
import { requireFxDataOutsideBuild } from "../../../converter/fx/fxData";
import { getFxPairPageData } from "../../../converter/fx/fxPageData";

// Kaynak gunde bir guncellenir; gunluk cron ayrica "fx" etiketini
// yeniler. Bu sure yalnizca bir guvenlik agidir.
export const revalidate = 43200;
export const dynamicParams = false;

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return fxPairsBn.map((pair) => ({ slug: pair.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pair = getFxPairBn(slug);
  if (!pair) return {};
  return buildFxPairMetadata(fxContentBn, pair, await getFxPairPageData(pair.from, pair.to));
}

export default async function FxPairPage({ params }: PageProps) {
  const { slug } = await params;
  const pair = getFxPairBn(slug);
  if (!pair) notFound();

  const data = await getFxPairPageData(pair.from, pair.to);
  requireFxDataOutsideBuild(data !== null);
  return <FxPairPageView content={fxContentBn} pair={pair} data={data} />;
}
