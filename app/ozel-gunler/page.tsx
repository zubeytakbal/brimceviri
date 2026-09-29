import type { Metadata } from "next";
import { OzelGunlerHub } from "../components/takvim/TakvimSayfalari";
import { takvimMetadata } from "../components/takvim/takvimMeta";

// Kalan gun sayilari icin gunde birkac kez yenilenir.
export const revalidate = 21600;

export const metadata: Metadata = takvimMetadata("/ozel-gunler", {
  title: "Özel Günler ve Tarihleri: Bayramlar, Kandiller, Resmî Tatiller",
  short: "Özel Günler ve Tarihleri",
  description:
    "Türkiye'deki özel günler ne zaman? Bayramlar, kandiller, resmî tatiller, Anneler Günü ve milli günlerin tarihleri ve kaç gün kaldığı.",
});

export default function OzelGunlerRoute() {
  return <OzelGunlerHub />;
}
