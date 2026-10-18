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
// 6. Parametreli site ici baglantilara rel="nofollow" (nofollowQueryLinks).
// 7. Site haritasi denetimi (scripts/sitemapGuard.ts): dizine acik her sayfa sitemap.xml'de olmali.
// 9. Birleştirilen çift sayfalar (app/converter/mergedPairs.ts): kaldırılan yöne kalan site içi bağlantılar kalan
//    sayfaya çevrilir, ona verilen hreflang bağlantıları silinir (yönlendirmeye bağlantı ve hreflang verilmez).
// 8. Dizin politikasi (app/indexPolicy.ts): kapali sayfalar "noindex, follow" olur ve hicbir sayfanin
//    hreflang alternatiflerinde yer almaz. Sablon ve ince sayfa denetimlerinden once calisir.
import { existsSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { LOCALE_DEFINITIONS } from "../app/i18n/config";
import { isClosedPath } from "../app/indexPolicy";
import { CLICKED_PATHS } from "../app/indexPolicyClicked";
import { siteRedirects } from "../app/siteRedirects";
import { MERGED_PAIRS } from "../app/converter/mergedPairs";
import { checkTemplates } from "./templateGuard";
import { checkThinPages, MIN_KARAKTER } from "./thinGuard";
import { checkSitemap } from "./sitemapGuard";

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

// Cloudflare Pages en fazla 2000 sabit ve 100 dinamik (":ad" ya da "*" iceren) kural okur. Okuyucu ilk dinamik
// kuraldan sonra gelen her kurali dinamik sayar ve 100'u gecince dosyanin geri kalanini atlar; bu yuzden sabit
// kurallar her zaman once yazilir. (Ekim 2026'ya kadar karisik sira yuzunden 364. satirdan sonrasi calismiyordu.)
const MAX_STATIC_REDIRECTS = 2000;
const MAX_DYNAMIC_REDIRECTS = 100;
const isDynamic = (from: string) => /[:*]/.test(from);

function writeRedirects() {
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
  // Cloudflare, hedefin sorgu kismina (?a=:b) degisken yerlestirmez ("%3Ab" olarak birakir). Bu kurallar icin
  // Search Console'da tiklama alan eski adreslere sabit kural yazilir; kalan adresler sorgusuz ana sayfaya gider.
  const known = [...CLICKED_PATHS];
  const expanded: string[] = [];
  const fixed = lines.map((l) => {
    const [from, to, status] = l.split(" ");
    const q = to.indexOf("?");
    if (!isDynamic(from) || q < 0 || !/:[a-z]/i.test(to.slice(q))) return l;
    const names: string[] = [];
    const re = new RegExp("^" + from.replace(/:([a-z]+)/gi, (_m, n: string) => (names.push(n), "([^/]+)")) + "$", "i");
    for (const path of known) {
      const m = path.match(re);
      if (!m) continue;
      expanded.push(`${path} ${names.reduce((d, n, i) => d.replaceAll(`:${n}`, m[i + 1]), to)} ${status}`);
    }
    return `${from} ${to.slice(0, q)} ${status}`;
  });
  const staticLines = [...expanded, ...fixed.filter((l) => !isDynamic(l.split(" ")[0]))];
  const dynamicLines = fixed.filter((l) => isDynamic(l.split(" ")[0]));
  writeFileSync(join(OUT, "_redirects"), [...staticLines, ...dynamicLines].join("\n") + "\n");
  return { static: staticLines.length, dynamic: dynamicLines.length };
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

// Sorgu parametreli site içi bağlantılar (?a=..&b=.., ?land=.., ?v=..) ayrı sayfa değil, aynı
// sayfada bir seçimi açar; standart adres her zaman parametresiz sayfadır. Google'ın bunları
// binlerce ayrı adres olarak kuyruğa almaması için rel="nofollow" eklenir.
function nofollowQueryLinks(): number {
  let changed = 0;
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== "_next") walk(path);
        continue;
      }
      if (!entry.name.endsWith(".html")) continue;
      const html = readFileSync(path, "utf8");
      let count = 0;
      const next = html.replace(/<a\b([^>]*?)\shref="((?:\/(?!\/)|\?)[^"]*\?[^"]*)"([^>]*)>/g, (tag, before: string, href: string, after: string) => {
        if (/\brel="/.test(before + after)) return tag;
        count++;
        return `<a${before} href="${href}" rel="nofollow"${after}>`;
      });
      if (count) {
        writeFileSync(path, next);
        changed += count;
      }
    }
  };
  walk(OUT);
  return changed;
}

// Ozbekce AdSense'in destekledigi diller arasinda degil (app/uz/layout.tsx): kok layout'taki AdSense kodu bu sayfalardan silinir.
function stripAdsenseFromUzbek() {
  let n = 0;
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (entry.name.endsWith(".html")) {
        const html = readFileSync(path, "utf8");
        const next = html.replace(/<script id="adsense"[^>]*><\/script>/, "");
        if (next !== html) {
          writeFileSync(path, next);
          n++;
        }
      }
    }
  };
  if (existsSync(join(OUT, "uz"))) walk(join(OUT, "uz"));
  for (const f of [join(OUT, "uz.html")]) {
    if (!existsSync(f)) continue;
    const html = readFileSync(f, "utf8");
    const next = html.replace(/<script id="adsense"[^>]*><\/script>/, "");
    if (next !== html) {
      writeFileSync(f, next);
      n++;
    }
  }
  return n;
}

const SITE = "https://www.birimceviri.app";

function applyIndexPolicy() {
  let closed = 0;
  let alternates = 0;
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== "_next") walk(path);
        continue;
      }
      if (!entry.name.endsWith(".html")) continue;
      const rel = "/" + path.slice(OUT.length + 1).replace(/\\/g, "/").replace(/\.html$/, "");
      const url = rel === "/index" ? "/" : rel.endsWith("/index") ? rel.slice(0, -6) : rel;
      let html = readFileSync(path, "utf8");
      const before = html;
      html = html.replace(/<link rel="alternate" hrefLang="[^"]*" href="([^"]*)"\/>/g, (tag, href: string) => {
        if (!href.startsWith(SITE) || !isClosedPath(href.slice(SITE.length) || "/")) return tag;
        alternates++;
        return "";
      });
      if (isClosedPath(url) && !/<meta name="robots" content="[^"]*noindex/.test(html)) {
        html = /<meta name="robots" content="[^"]*"\/>/.test(html)
          ? html.replace(/<meta name="robots" content="[^"]*"\/>/, '<meta name="robots" content="noindex, follow"/>')
          : html.replace("</head>", '<meta name="robots" content="noindex, follow"/></head>');
        closed++;
      }
      if (html !== before) writeFileSync(path, html);
    }
  };
  walk(OUT);
  return { closed, alternates };
}

/**
 * hreflang tutarlılığı (site denetimi "hreflang çakışması"): noindex sayfalarda hreflang olmaz; dizine açık
 * sayfalarda yalnızca karşılıklı bağlantılar kalır (A→B varsa B→A da olmalı), kendine bağlantı eksikse eklenir,
 * tek başına kalan kendine bağlantı silinir. Dizin politikasından sonra çalışır.
 */
function fixHreflangReciprocity() {
  const altTag = /<link rel="alternate" hrefLang="([^"]*)" href="([^"]*)"\/>/g;
  const files: Array<{ path: string; url: string }> = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== "_next") walk(path);
      } else if (entry.name.endsWith(".html")) {
        const rel = "/" + path.slice(OUT.length + 1).replace(/\\/g, "/").replace(/\.html$/, "");
        files.push({ path, url: rel === "/index" ? "/" : rel.endsWith("/index") ? rel.slice(0, -6) : rel });
      }
    }
  };
  walk(OUT);
  const alts = new Map<string, Array<{ lang: string; url: string }>>();
  const noindex = new Set<string>();
  const selfCode = new Map<string, string>(); // dil öneki ("" = Türkçe) → hreflang kodu
  const prefix = (url: string) => (/^\/(en|de|ar|es|fr|it|pt|nl|sv|no|da|bn|uz)(\/|$)/.exec(url)?.[1] ?? "");
  for (const f of files) {
    const html = readFileSync(f.path, "utf8");
    if (/<meta name="robots" content="[^"]*noindex/.test(html)) noindex.add(f.url);
    const list = [...html.matchAll(altTag)].filter((m) => m[2].startsWith(SITE)).map((m) => ({ lang: m[1], url: m[2].slice(SITE.length) || "/" }));
    alts.set(f.url, list);
    for (const a of list) if (a.url === f.url && a.lang !== "x-default") selfCode.set(prefix(f.url), a.lang);
  }
  const lists = (from: string, to: string) => (alts.get(from) ?? []).some((a) => a.url === to);
  let removed = 0;
  let added = 0;
  const final = new Map<string, Set<string>>(); // sayfa → kalan "dil|adres" bağlantıları (site haritası için)
  for (const f of files) {
    const list = alts.get(f.url) ?? [];
    if (!list.length) continue;
    let keep = noindex.has(f.url) ? [] : list.filter((a) => a.url === f.url || (!noindex.has(a.url) && lists(a.url, f.url)));
    if (!keep.some((a) => a.url !== f.url)) keep = [];
    const addSelf = keep.length > 0 && !keep.some((a) => a.url === f.url && a.lang !== "x-default") && selfCode.has(prefix(f.url));
    final.set(f.url, new Set([...keep.map((a) => `${a.lang}|${a.url}`), ...(addSelf ? [`${selfCode.get(prefix(f.url))}|${f.url}`] : [])]));
    if (keep.length === list.length && !addSelf) continue;
    removed += list.length - keep.length;
    let html = readFileSync(f.path, "utf8");
    html = html.replace(altTag, (tag, lang: string, href: string) =>
      !href.startsWith(SITE) || keep.some((a) => a.lang === lang && a.url === (href.slice(SITE.length) || "/")) ? tag : "",
    );
    if (addSelf) {
      added++;
      const tag = `<link rel="alternate" hrefLang="${selfCode.get(prefix(f.url))}" href="${SITE}${f.url === "/" ? "" : f.url}"/>`;
      html = html.replace(/<link rel="alternate" hrefLang=/, `${tag}<link rel="alternate" hrefLang=`);
    }
    writeFileSync(f.path, html);
  }

  // Site haritasındaki xhtml:link bağlantıları sayfadakilerle birebir aynı yazılır.
  const smPath = join(OUT, "sitemap.xml");
  const linkRe = /\s*<xhtml:link rel="alternate" hreflang="[^"]*" href="[^"]*"\s*\/>/g;
  const before = (readFileSync(smPath, "utf8").match(linkRe) ?? []).length;
  let after = 0;
  const sitemap = readFileSync(smPath, "utf8").replace(/<url>([\s\S]*?)<\/url>/g, (block, inner: string) => {
    const loc = /<loc>([^<]*)<\/loc>/.exec(inner)?.[1].slice(SITE.length) || "/";
    const links = [...(final.get(loc) ?? [])].map((k) => {
      const [lang, url] = k.split("|");
      return `<xhtml:link rel="alternate" hreflang="${lang}" href="${SITE}${url === "/" ? "" : url}" />`;
    });
    after += links.length;
    return block.replace(linkRe, "").replace("</loc>", `</loc>${links.join("")}`);
  });
  writeFileSync(smPath, sitemap);
  return { removed, added, smRemoved: before - after };
}

function fixMergedPairLinks() {
  const SITE = "https://www.birimceviri.app";
  const slugs = Object.keys(MERGED_PAIRS).sort((a, b) => b.length - a.length).join("|");
  // href="/x", JSON içindeki "href":"/x" ve \"href\":\"/x\" biçimleri; arkasından tırnak, ?, # ya da ters bölü gelmeli.
  const linkRe = new RegExp(`((?:href=|\\\\?"href\\\\?":)\\\\?")/(${slugs})(?=["?#\\\\])`, "g");
  const altRe = new RegExp(`<link rel="alternate" hrefLang="[^"]*" href="${SITE}/(?:${slugs})"/>`, "g");
  let links = 0;
  let alternates = 0;
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (path !== join(OUT, "_next")) walk(path);
        continue;
      }
      if (!entry.name.endsWith(".html")) continue;
      const html = readFileSync(path, "utf8");
      const next = html
        .replace(altRe, () => (alternates++, ""))
        .replace(linkRe, (_m, prefix: string, slug: string) => (links++, `${prefix}/${MERGED_PAIRS[slug]}`));
      if (next !== html) writeFileSync(path, next);
    }
  };
  walk(OUT);
  return { links, alternates };
}

console.log(`${removeRscPayloads(OUT)} sayfa gecis verisi (.txt) silindi`);
const merged = fixMergedPairLinks();
console.log(`Birleştirilen çiftler: ${merged.links} bağlantı kalan sayfaya çevrildi, ${merged.alternates} hreflang silindi`);
const policy = applyIndexPolicy();
console.log(`Dizin politikası: ${policy.closed} sayfa noindex yapıldı, ${policy.alternates} hreflang bağlantısı kaldırıldı`);
const hreflang = fixHreflangReciprocity();
console.log(
  `hreflang: ${hreflang.removed} karşılıksız bağlantı silindi, ${hreflang.added} sayfaya kendi dil bağlantısı eklendi, site haritasında ${hreflang.smRemoved} bağlantı farkı`,
);
console.log(`${fixHtmlLang()} sayfada <html lang> dile gore duzeltildi`);
console.log(`${stripAdsenseFromUzbek()} Ozbekce sayfadan AdSense kodu cikarildi`);
const redirects = writeRedirects();
console.log(`out/_redirects: ${redirects.static} sabit + ${redirects.dynamic} dinamik yonlendirme yazildi`);
if (redirects.static > MAX_STATIC_REDIRECTS || redirects.dynamic > MAX_DYNAMIC_REDIRECTS) {
  console.error(
    `Cloudflare Pages siniri asildi: en fazla ${MAX_STATIC_REDIRECTS} sabit ve ${MAX_DYNAMIC_REDIRECTS} dinamik yonlendirme okunur. ` +
      "Fazlasi sessizce yok sayilir; app/siteRedirects.ts listesini kisaltin ya da dinamik kurallari birlestirin.",
  );
  process.exit(1);
}
console.log(`${nofollowQueryLinks()} parametreli site ici baglantiya rel="nofollow" eklendi`);

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

// 7. Site haritasi denetimi (scripts/sitemapGuard.ts): dizine acik her sayfa haritada olmali.
const map = checkSitemap(OUT);
if (map.missing.length || map.orphaned.length) {
  for (const u of map.missing) console.error(`Site haritası denetimi: ${u} dizine açık ama sitemap.xml'de yok (app/sitemap.ts).`);
  for (const u of map.orphaned) console.error(`Site haritası denetimi: ${u} sitemap.xml'de var ama böyle bir sayfa derlenmedi.`);
  process.exit(1);
}
console.log(`Site haritası denetimi geçti (${map.listed} adres)`);
