import type { Metadata } from "next";
import { saatSayfasiKalkti } from "../../components/saat/kaldirilanSaatSayfalari";
import { notFound } from "next/navigation";
import { OzelGunDetay, OzelGunSayfasi, ozelGunMeta } from "../../components/takvim/TakvimSayfalari";
import { takvimMetadata } from "../../components/takvim/takvimMeta";
import { OZEL_GUN_ICERIK } from "../../converter/calendar/ozelGunIcerik";
import { ETKINLIKLER, findEtkinlik } from "../../converter/calendar/trTakvim";

// Her özel günün kendi sayfası. Arama alan 9 günün özgün içerikli ayrıntı sayfası (OzelGunDetay), diğerleri
// birleştirmeden (Ekim 2026) önceki günlük sayfa düzeninde (OzelGunSayfasi; 21 Ekim 2026'da geri getirildi).
export const dynamicParams = false;
// "Kaç gün kaldı" için günde birkaç kez yenilenir.
export const revalidate = 21600;

export function generateStaticParams() {
  return ETKINLIKLER.filter((e) => !saatSayfasiKalkti(`/ozel-gunler/${e.id}`)).map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const icerik = OZEL_GUN_ICERIK[id];
  if (icerik) return takvimMetadata(`/ozel-gunler/${id}`, icerik);
  const e = findEtkinlik(id);
  return e ? takvimMetadata(`/ozel-gunler/${id}`, ozelGunMeta(e)) : {};
}

export default async function OzelGunRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const e = findEtkinlik(id);
  if (!e) notFound();
  const icerik = OZEL_GUN_ICERIK[id];
  return icerik ? <OzelGunDetay e={e} icerik={icerik} /> : <OzelGunSayfasi e={e} />;
}
