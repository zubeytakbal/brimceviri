import type { Metadata } from "next";
import HicriTakvimSayfasi from "../components/takvim/HicriTakvimSayfasi";
import { takvimMetadata } from "../components/takvim/takvimMeta";
import { trBugun } from "../components/takvim/TakvimSayfalari";
import { gregorianToHijri } from "../converter/time/calendars";

// Bugünün Hicri tarihi için günde birkaç kez yenilenir.
export const revalidate = 21600;

export function generateMetadata(): Metadata {
  const y = gregorianToHijri(trBugun()).year;
  return takvimMetadata("/hicri-takvim", {
    title: `Hicri Takvim ${y}: Bugün Hicri Kaçı, Hicri Aylar ve Dini Günler`,
    short: `Hicri Takvim ${y}`,
    description: `Hicri takvim ${y}-${y + 1}: bugünün Hicri tarihi, Muharrem'den Zilhicce'ye Hicri ayların miladi başlangıç günleri, kandiller, Ramazan ve bayramlar.`,
  });
}

export default function HicriTakvimRoute() {
  return <HicriTakvimSayfasi />;
}
