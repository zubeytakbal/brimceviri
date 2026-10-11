// Saat ve Tarih bölüm ana sayfalarının dillere göre adresleri (hreflang).
import { buildLanguageAlternates } from "../../i18n/routing";

export const TIME_HUB_PATHS = { tr: "/saat-ve-tarih", de: "/de/uhrzeit-und-datum" } as const;

export function timeHubAlternates() {
  return buildLanguageAlternates(TIME_HUB_PATHS, "tr");
}
