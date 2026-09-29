import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  TakvimYilSayfasi,
  yilMeta,
} from "../../components/takvim/TakvimSayfalari";
import { takvimMetadata } from "../../components/takvim/takvimMeta";
import {
  TAKVIM_YILLARI,
  takvimYilPath,
} from "../../converter/calendar/trTakvim";

export const dynamicParams = false;

export function generateStaticParams() {
  return TAKVIM_YILLARI.map((y) => ({ yil: String(y) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ yil: string }>;
}): Promise<Metadata> {
  const y = Number((await params).yil);
  return takvimMetadata(takvimYilPath(y), yilMeta(y));
}

export default async function TakvimYilRoute({
  params,
}: {
  params: Promise<{ yil: string }>;
}) {
  const y = Number((await params).yil);
  if (!TAKVIM_YILLARI.includes(y)) notFound();
  return <TakvimYilSayfasi year={y} />;
}
