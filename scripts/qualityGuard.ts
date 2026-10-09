// İçerik kalite denetimi (standart: docs/icerik-kalite-standardi.md). Dizine açık her
// sayfa aşağıdaki kurallarla ölçülür:
//   ozgun-metin  Sayfaya özgü metin OZGUN_HEDEF karakterin altında. Aynı dildeki sayfaların
//                en az %2'sinde (ve en az 3 sayfada) geçen 6'lı kelime grupları ortak kalıp
//                sayılır (ör. "ilgili araçlar" bloğu, sabit uyarılar); ortak bir gruba giren her
//                kelime düşülür, geriye kalan metin özgündür.
//   link-yigini  <main> metninin yarısından fazlası link metni (sayfa link listesi gibi okunuyor).
//   yapi         <h1> tam olarak bir değil ya da ikiden az <h2> bölüm başlığı var.
//   meta         Açıklama (meta description) yok ya da aynı dilde başka bir sayfanın başlığı
//                veya açıklamasıyla aynı.
// BASELINE (scripts/qualityBaseline.json) bugünkü kusurları tutar ve yalnızca küçülür: listede
// olmayan bir kusur (yeni sayfa ya da gerileme) build'i durdurur. Düzeltilen sayfalar uyarı
// olarak raporlanır; UPDATE_QUALITY_BASELINE=1 ile liste küçültülür.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { LOCALE_DEFINITIONS } from "../app/i18n/config";

export const OZGUN_HEDEF = 1500;
export const LINK_ORANI = 0.5;
const KALIP_ORANI = 0.02;
const KALIP_MIN = 3;
const K = 6;

export const BASELINE_PATH = join("scripts", "qualityBaseline.json");

export type Kusur = "ozgun-metin" | "link-yigini" | "yapi" | "meta";

export type PageQuality = {
  url: string;
  locale: string;
  chars: number;
  uniqueChars: number;
  linkRatio: number;
  h1: number;
  h2: number;
  kusurlar: Kusur[];
};

type Parsed = {
  url: string;
  locale: string;
  words: string[];
  chars: number;
  linkChars: number;
  h1: number;
  h2: number;
  title: string;
  description: string;
};

const PREFIX_TO_LOCALE = new Map(
  Object.values(LOCALE_DEFINITIONS)
    .filter((d) => d.pathPrefix)
    .map((d) => [d.pathPrefix.slice(1), d.code]),
);

const plain = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

function parse(root: string, file: string): Parsed | null {
  const html = readFileSync(file, "utf8");
  if (/<meta name="robots" content="[^"]*noindex/.test(html) || html.includes('http-equiv="refresh"')) return null;
  const url = ("/" + relative(root, file).replace(/\\/g, "/").replace(/\.html$/, "")).replace(/\/index$/, "") || "/";
  if (url.startsWith("/404") || url.startsWith("/_")) return null;
  const main = (html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? "").replace(
    /<(script|style|svg|select|button|nav)\b[\s\S]*?<\/\1>/g,
    " ",
  );
  const text = plain(main);
  const linkChars = [...main.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/g)].reduce((n, m) => n + plain(m[1]).length, 0);
  return {
    url,
    locale: PREFIX_TO_LOCALE.get(url.split("/")[1]) ?? "tr",
    words: text.toLowerCase().split(" ").filter(Boolean),
    chars: text.length,
    linkChars,
    h1: (main.match(/<h1\b/g) ?? []).length,
    h2: (main.match(/<h2\b/g) ?? []).length,
    title: html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "",
    description: html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "",
  };
}

function walk(dir: string, out: string[]) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "_next") walk(path, out);
    } else if (entry.name.endsWith(".html")) out.push(path);
  }
}

/** 6'lı kelime grubunun 32 bit FNV-1a özeti; 8.000+ sayfada dize anahtarlardan çok daha az bellek tutar. */
function shingleHashes(words: string[]): Uint32Array {
  const n = Math.max(0, words.length - K + 1);
  const out = new Uint32Array(n);
  for (let i = 0; i < n; i++) {
    let h = 0x811c9dc5;
    for (let k = i; k < i + K; k++) {
      const w = words[k];
      for (let c = 0; c < w.length; c++) h = Math.imul(h ^ w.charCodeAt(c), 0x01000193);
      h = Math.imul(h ^ 32, 0x01000193);
    }
    out[i] = h >>> 0;
  }
  return out;
}

export function measureQuality(root: string): PageQuality[] {
  const files: string[] = [];
  walk(root, files);
  const pages = files.map((f) => parse(root, f)).filter((p): p is Parsed => p !== null);
  const hashes = pages.map((p) => shingleHashes(p.words));

  const freq = new Map<string, Map<number, number>>();
  const count = new Map<string, number>();
  const titles = new Map<string, number>();
  const descriptions = new Map<string, number>();
  pages.forEach((p, i) => {
    count.set(p.locale, (count.get(p.locale) ?? 0) + 1);
    const m = freq.get(p.locale) ?? new Map<number, number>();
    freq.set(p.locale, m);
    for (const h of new Set(hashes[i])) m.set(h, (m.get(h) ?? 0) + 1);
    titles.set(p.locale + "\n" + p.title, (titles.get(p.locale + "\n" + p.title) ?? 0) + 1);
    descriptions.set(p.locale + "\n" + p.description, (descriptions.get(p.locale + "\n" + p.description) ?? 0) + 1);
  });

  return pages.map((p, i) => {
    const m = freq.get(p.locale)!;
    const limit = Math.max(KALIP_MIN, count.get(p.locale)! * KALIP_ORANI);
    const own = new Uint8Array(p.words.length).fill(1);
    hashes[i].forEach((h, j) => {
      if (m.get(h)! >= limit) own.fill(0, j, j + K);
    });
    let uniqueChars = 0;
    p.words.forEach((w, j) => {
      if (own[j]) uniqueChars += w.length + 1;
    });
    const linkRatio = p.chars ? p.linkChars / p.chars : 0;
    const kusurlar: Kusur[] = [];
    if (uniqueChars < OZGUN_HEDEF) kusurlar.push("ozgun-metin");
    if (linkRatio > LINK_ORANI) kusurlar.push("link-yigini");
    if (p.h1 !== 1 || p.h2 < 2) kusurlar.push("yapi");
    if (
      !p.description ||
      titles.get(p.locale + "\n" + p.title)! > 1 ||
      descriptions.get(p.locale + "\n" + p.description)! > 1
    )
      kusurlar.push("meta");
    return { url: p.url, locale: p.locale, chars: p.chars, uniqueChars, linkRatio, h1: p.h1, h2: p.h2, kusurlar };
  });
}

export function readBaseline(): Record<string, Kusur[]> {
  return JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
}

export function checkQuality(root: string) {
  const pages = measureQuality(root);
  const baseline = readBaseline();
  const failed: Array<{ page: PageQuality; yeni: Kusur[] }> = [];
  const next: Record<string, Kusur[]> = {};
  let fixed = 0;
  const seen = new Set<string>();
  for (const page of pages) {
    seen.add(page.url);
    const allowed = baseline[page.url] ?? [];
    const yeni = page.kusurlar.filter((k) => !allowed.includes(k));
    if (yeni.length) failed.push({ page, yeni });
    const kept = allowed.filter((k) => page.kusurlar.includes(k));
    fixed += allowed.length - kept.length;
    if (kept.length) next[page.url] = kept;
  }
  for (const [url, list] of Object.entries(baseline)) if (!seen.has(url)) fixed += list.length;
  const pending = Object.values(next).reduce((n, l) => n + l.length, 0);
  return { pages, failed, fixed, pending, next };
}

export function writeBaseline(next: Record<string, Kusur[]>) {
  const lines = Object.entries(next)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([url, list]) => `  ${JSON.stringify(url)}: ${JSON.stringify(list)}`);
  writeFileSync(BASELINE_PATH, `{\n${lines.join(",\n")}\n}\n`);
}
