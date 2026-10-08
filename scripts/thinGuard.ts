// İnce sayfa denetimi: dizine açık bir sayfanın <main> metni MIN_KARAKTER'den kısaysa
// build durur. Form denetimleri (açılır liste, düğme), menüler, betikler ve SVG metin
// sayılmaz. PENDING yalnızca küçülür: zenginleştirilen sayfa listeden çıkarılır, yeni
// ince sayfa eklenemez. Karakter sayılır, kelime değil (Türkçe, Özbekçe gibi eklemeli
// dillerde kelime sayısı içeriği olduğundan az gösterir).
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

export const MIN_KARAKTER = 800;

/** Henüz zenginleştirilmemiş sayfalar (zayıf içerik planı, adım 1-5). */
export const PENDING = new Set<string>([
  "/nl/recepten-omrekenen",
  "/ar/length-comparison",
  "/ar/weight-comparison",
  "/ar/vat-calculator",
  "/nl/keukenmaten-omrekenen",
  "/ar/sleep-calculator",
  "/ar/other-conversions",
  "/ar/pregnancy-week-calculator",
  "/ar/bmi-calculator",
  "/no/kategorier",
  "/da/kategorier",
  "/bn/islamic-tools",
  "/ar/brick-calculator",
  "/ar/tile-calculator",
  "/nl/historische-eenheden",
  "/sv/kategorier",
  "/uz/aloqa",
  "/uz/uzunlik-solishtirish",
  "/ar/electricity-consumption-calculator",
  "/uz/qqs-hisoblash",
  "/pt/ferramentas-catolicas",
  "/uz/ogirlik-solishtirish",
  "/ar/age-calculator",
  "/es/herramientas-catolicas",
  "/uz/yosh-hisoblash",
  "/de/rezept-umrechner",
  "/ar/paint-calculator",
  "/ar/ac-btu-calculator",
  "/pt/categorias",
  "/uz/homiladorlik-haftasi-hisoblash",
  "/uz/bmi-hisoblash",
  "/ar/running-pace-calculator",
  "/uz/laminat-hisoblash",
  "/uz/uyqu-hisoblash",
  "/fr/categories",
  "/uz/fayans-hisoblash",
  "/bn/bmi-calculator",
  "/uz/video-bit-tezligi-hisoblash",
  "/it/categorie",
  "/nl/schoenmaten-omrekenen",
  "/uz/gisht-hisoblash",
  "/uz/elektr-tuketimi-hisoblash",
  "/uz/tabiiy-gaz-sarfi-hisoblash",
  "/uz/rang-kodi-aylantirgich",
  "/bn/paint-calculator",
  "/ar/contact",
  "/uz/kochish-qutisi-hisoblash",
]);

export function pageText(html: string) {
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? html;
  return main
    .replace(/<(script|style|svg|select|button|nav)\b[\s\S]*?<\/\1>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function walk(dir: string, out: string[]) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "_next") walk(path, out);
    } else if (entry.name.endsWith(".html")) out.push(path);
  }
}

export function checkThinPages(root: string) {
  const files: string[] = [];
  walk(root, files);
  const failed: Array<{ url: string; chars: number }> = [];
  const fixed: string[] = [];
  let pending = 0;
  for (const file of files) {
    const html = readFileSync(file, "utf8");
    if (/<meta name="robots" content="[^"]*noindex/.test(html) || html.includes('http-equiv="refresh"')) continue;
    const url = ("/" + relative(root, file).replace(/\\/g, "/").replace(/\.html$/, "")).replace(/\/index$/, "") || "/";
    const chars = pageText(html).length;
    const thin = chars < MIN_KARAKTER;
    if (PENDING.has(url)) {
      if (thin) pending++;
      else fixed.push(url);
    } else if (thin && !url.startsWith("/404") && !url.startsWith("/_")) {
      failed.push({ url, chars });
    }
  }
  return { failed, fixed, pending };
}
