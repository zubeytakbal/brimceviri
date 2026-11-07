// Saat bölümünün üst menüsündeki arama listesi. Yalnızca saat bölümü sayfalarında yüklenir
// (sitenin genel üst menüsü bu dosyayı dinamik olarak, sadece o sayfalarda alır).
import { SAAT_MENUSU } from "./saatBolumu";

export type AramaOgesi = { href: string; ad: string; ulke: string };

/** Aramada bölümün araçları. */
export const SAAT_ARAMA: AramaOgesi[] = SAAT_MENUSU.map((m) => ({
  href: m.href,
  ad: m.label.charAt(0).toLocaleUpperCase("tr") + m.label.slice(1),
  ulke: "Araç",
})).sort((a, b) => a.ad.localeCompare(b.ad, "tr"));
