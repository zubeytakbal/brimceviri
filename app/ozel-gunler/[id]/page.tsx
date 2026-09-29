import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  OzelGunSayfasi,
  ozelGunMeta,
} from "../../components/takvim/TakvimSayfalari";
import { takvimMetadata } from "../../components/takvim/takvimMeta";
import {
  ETKINLIKLER,
  findEtkinlik,
  ozelGunPath,
} from "../../converter/calendar/trTakvim";

export const dynamicParams = false;
// "Kac gun kaldi" icin gunde birkac kez yenilenir.
export const revalidate = 21600;

export function generateStaticParams() {
  return ETKINLIKLER.map((e) => ({ id: e.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const e = findEtkinlik((await params).id);
  return e ? takvimMetadata(ozelGunPath(e.id), ozelGunMeta(e)) : {};
}

export default async function OzelGunRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const e = findEtkinlik((await params).id);
  if (!e) notFound();
  return <OzelGunSayfasi e={e} />;
}
