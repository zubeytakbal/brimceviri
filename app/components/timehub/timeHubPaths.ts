// Saat ve Tarih bölüm ana sayfalarının dillere göre adresleri (hreflang).
import { buildLanguageAlternates } from "../../i18n/routing";

export const TIME_HUB_PATHS = {
  tr: "/saat-ve-tarih",
  de: "/de/uhrzeit-und-datum",
  sv: "/sv/tid-och-datum",
  no: "/no/tid-og-dato",
  da: "/da/tid-og-dato",
} as const;

export function timeHubAlternates() {
  return buildLanguageAlternates(TIME_HUB_PATHS, "tr");
}
