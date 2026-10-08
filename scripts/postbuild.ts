// next build (output: "export") sonrasinda calisir:
// 1. Next.js'in sayfa gecis verisi dosyalarini (<sayfa>.txt, __next.*.txt)
//    siler. Site ici linkler duz <a> oldugu icin kullanilmazlar; silinmezse
//    site ~115.000 dosyaya cikar ve Cloudflare Pages'in 20.000 dosya
//    sinirini asar.
// 2. app/siteRedirects.ts listesini Cloudflare Pages'in okudugu
//    out/_redirects dosyasina yazar.
// 3. Kok layout <html lang="tr"> ile statik uretildigi icin her dil
//    klasorundeki HTML'de lang/dir'i dogru dile cevirir (ham HTML'i okuyan
//    tarayicilar, ekran okuyucular ve dizin/arama araclari icin).
// 4. Sablon sayfa denetimi (scripts/templateGuard.ts): kopya kardes sayfa
//    grubu varsa build'i durdurur.
// 5. Ince sayfa denetimi (scripts/thinGuard.ts): dizine acik yeni bir sayfanin
//    metni cok kisaysa build'i durdurur.
import { existsSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { LOCALE_DEFINITIONS } from "../app/i18n/config";
import { siteRedirects } from "../app/siteRedirects";
import { checkTemplates } from "./templateGuard";
import { checkThinPages, MIN_KARAKTER } from "./thinGuard";

const OUT = "out";

function removeRscPayloads(dir: string): number {
  let removed = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (path !== join(OUT, "_next")) removed += removeRscPayloads(path);
      continue;
    }
    if (!entry.name.endsWith(".txt")) continue;
    const isSegmentPayload = entry.name.startsWith("__next.");
    const isPagePayload = existsSync(path.slice(0, -".txt".length) + ".html");
    if (isSegmentPayload || isPagePayload) {
      unlinkSync(path);
      removed++;
    }
  }
  return removed;
}

function writeRedirects(): number {
  const lines: string[] = [];
  for (const { source, destination, permanent } of siteRedirects()) {
    const status = permanent ? 301 : 302;
    if (source.endsWith("/:path*")) {
      // Next.js ":path*" sifir veya daha fazla parcayla eslesir; Cloudflare'de
      // bunu bolum adresinin kendisi ve "/*" splat'i olarak iki satira boleriz.
      const from = source.slice(0, -"/:path*".length);
      const to = destination.replace(/\/:path\*$/, "");
      lines.push(`${from} ${to} ${status}`);
      lines.push(`${from}/* ${to}/:splat ${status}`);
    } else {
      lines.push(`${source} ${destination} ${status}`);
    }
  }
  writeFileSync(join(OUT, "_redirects"), lines.join("\n") + "\n");
  return lines.length;
}

const HTML_TAG = '<html lang="tr" dir="ltr"';

function fixHtmlLang(): number {
  let fixed = 0;
  const patch = (file: string, lang: string, dir: string) => {
    const html = readFileSync(file, "utf8");
    if (!html.includes(HTML_TAG)) return;
    writeFileSync(file, html.replace(HTML_TAG, `<html lang="${lang}" dir="${dir}"`));
    fixed++;
  };
  const walk = (dir: string, lang: string, d: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) walk(path, lang, d);
      else if (entry.name.endsWith(".html")) patch(path, lang, d);
    }
  };
  for (const def of Object.values(LOCALE_DEFINITIONS)) {
    const prefix = def.pathPrefix.replace(/^\//, "");
    if (!prefix || (def.htmlLang === "tr" && def.dir === "ltr")) continue;
    const dir = join(OUT, prefix);
    if (existsSync(dir)) walk(dir, def.htmlLang, def.dir);
    if (existsSync(`${dir}.html`)) patch(`${dir}.html`, def.htmlLang, def.dir);
  }
  return fixed;
}

console.log(`${removeRscPayloads(OUT)} sayfa gecis verisi (.txt) silindi`);
console.log(`${fixHtmlLang()} sayfada <html lang> dile gore duzeltildi`);
console.log(`out/_redirects: ${writeRedirects()} yonlendirme yazildi`);

// 4. Şablon sayfa denetimi: kopya kardeş sayfa grubu varsa build durur.
const guard = checkTemplates(OUT);
for (const g of guard.fixed) console.warn(`Şablon denetimi: ${g} artık eşiğin altında, templateGuard PENDING listesinden silin.`);
if (guard.failed.length) {
  for (const f of guard.failed) console.error(`Şablon sayfa grubu: ${f.group} (${f.n} sayfa, ortalama örtüşme %${Math.round(f.avg * 100)})`);
  console.error("Bu sayfalar birbirinin kopyası. Ya özgün içerik ekleyin ya da ana sayfada birleştirin.");
  process.exit(1);
}
console.log(`Şablon denetimi geçti (${guard.pending} grup düzeltme bekliyor)`);

// 5. İnce sayfa denetimi: dizine açık yeni bir sayfanın metni çok kısaysa build durur.
const thin = checkThinPages(OUT);
for (const u of thin.fixed) console.warn(`İnce sayfa denetimi: ${u} artık yeterli, thinGuard PENDING listesinden silin.`);
if (thin.failed.length) {
  for (const f of thin.failed) console.error(`İnce sayfa: ${f.url} (${f.chars} karakter, en az ${MIN_KARAKTER})`);
  console.error("Bu sayfaların metni çok kısa. Özgün açıklama, örnek ve tablo ekleyin ya da ana sayfada birleştirin.");
  process.exit(1);
}
console.log(`İnce sayfa denetimi geçti (${thin.pending} sayfa düzeltme bekliyor)`);
