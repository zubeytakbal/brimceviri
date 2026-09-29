import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  DeBesondererTagSeite,
  deBesondererTagMeta,
} from "../../../components/takvim/DeKalenderSeiten";
import { deKalenderMetadata } from "../../../components/takvim/takvimMeta";
import {
  DE_TAGE,
  deBesondererTagPfad,
  findDeTag,
} from "../../../converter/calendar/deKalender";

export const dynamicParams = false;
// „Noch X Tage“ ändert sich täglich.
export const revalidate = 21600;

export function generateStaticParams() {
  return DE_TAGE.map((t) => ({ id: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const t = findDeTag((await params).id);
  return t
    ? deKalenderMetadata(deBesondererTagPfad(t.id), deBesondererTagMeta(t))
    : {};
}

export default async function Route({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const t = findDeTag((await params).id);
  if (!t) notFound();
  return <DeBesondererTagSeite t={t} />;
}
