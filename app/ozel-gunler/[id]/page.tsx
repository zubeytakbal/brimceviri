import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OzelGunDetay } from "../../components/takvim/TakvimSayfalari";
import { takvimMetadata } from "../../components/takvim/takvimMeta";
import { OZEL_GUN_ICERIK, OZEL_GUN_SAYFALARI } from "../../converter/calendar/ozelGunIcerik";
import { findEtkinlik } from "../../converter/calendar/trTakvim";

// Arama alan özel günlerin kendi sayfası; diğer günler /ozel-gunler sayfasındaki bölümlerinde.
export const dynamicParams = false;
// "Kaç gün kaldı" için günde birkaç kez yenilenir.
export const revalidate = 21600;

export function generateStaticParams() {
  return OZEL_GUN_SAYFALARI.map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const icerik = OZEL_GUN_ICERIK[id];
  return icerik ? takvimMetadata(`/ozel-gunler/${id}`, icerik) : {};
}

export default async function OzelGunRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const e = findEtkinlik(id);
  const icerik = OZEL_GUN_ICERIK[id];
  if (!e || !icerik) notFound();
  return <OzelGunDetay e={e} icerik={icerik} />;
}
