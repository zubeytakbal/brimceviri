import type { Metadata } from "next";
import {
  TakvimHubSayfasi,
  trBugun,
} from "../components/takvim/TakvimSayfalari";
import { takvimMetadata } from "../components/takvim/takvimMeta";

// "Bugun" kutusu ve yaklasan gunler icin gunde birkac kez yenilenir.
export const revalidate = 21600;

export function generateMetadata(): Metadata {
  const y = trBugun().year;
  return takvimMetadata("/takvim", {
    title: `Türkiye Takvimi ${y}: Bugün, Resmî Tatiller ve Özel Günler`,
    short: `Türkiye Takvimi ${y}`,
    description: `${y} Türkiye takvimi: bugünün tarihi, Hicri ve Rumi karşılığı, resmî tatiller, bayramlar, kandiller ve özel günler. Telefona eklenebilir takvim.`,
  });
}

export default function TakvimRoute() {
  return <TakvimHubSayfasi />;
}
