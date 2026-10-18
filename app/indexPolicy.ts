// Dizine açık sayfa politikası (AdSense "düşük değerli içerik" temizliği, Ekim 2026).
// Kapalı sayfalar silinmez: derlemeden sonra <meta name="robots"> "noindex, follow" olur (scripts/postbuild.ts),
// sitemap.xml'den çıkar (app/sitemap.ts) ve hreflang bağlantılarından düşer.
// Yalnızca yabancı dil sayfaları kapanır; Türkçe sayfaların hepsi açık kalır. Geçicidir: AdSense onayından sonra
// bir dili ya da sayfayı açmak için ilgili listeden çıkarmak yeterli.
// Kural Search Console verisine dayanır: son 3 ayda en az 2 tıklama alan sayfa (indexPolicyClicked.ts) her zaman açık kalır.
import { CLOSED_LOCALES } from "./i18n/closedLocales";
import { CLICKED_PATHS } from "./indexPolicyClicked";

export { CLOSED_LOCALES };

/** Bu dillerde dil ana sayfası, yasal sayfalar ve tıklama alan sayfalar açık; kalanı kapalı. */
const PARTIAL_LOCALES = ["en", "de", "ar", "es", "uz", "bn"];
const PARTIAL_KEEP = new Set([
  "/en/about", "/en/contact", "/en/privacy", "/en/terms",
  "/de/uber-uns", "/de/kontakt", "/de/datenschutz", "/de/nutzungsbedingungen",
  "/ar/about", "/ar/contact", "/ar/privacy", "/ar/terms",
  "/uz/aloqa", "/uz/maxfiylik-siyosati", "/uz/foydalanish-shartlari",
]);

const CLICKED = new Set(CLICKED_PATHS);

/** Adres dizine kapalı mı? (yol, alan adı olmadan: "/en/meter-to-centimeter") */
export function isClosedPath(path: string): boolean {
  const p = path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
  const first = p.split("/")[1] ?? "";
  if (CLICKED.has(p)) return false; // kullanılan sayfa hangi dilde olursa olsun açık
  if ((CLOSED_LOCALES as readonly string[]).includes(first)) return true;
  if (PARTIAL_LOCALES.includes(first)) return p !== `/${first}` && !PARTIAL_KEEP.has(p);
  return false; // Türkçe sayfaların hepsi açık.
}
