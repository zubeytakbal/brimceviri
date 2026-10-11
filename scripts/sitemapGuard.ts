// Site haritasi denetimi: dizine acik (noindex olmayan, asil adresi kendisi olan) her sayfa
// sitemap.xml'de yer almali; unutulan sayfa Google'a gec ulasir. Eksik sayfa varsa build durur.
// Ters yon de denetlenir: haritadaki adres derlenmis bir sayfaya karsilik gelmeli.
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const SITE = "https://www.birimceviri.app";

function walk(dir: string, out: string[]) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "_next") walk(path, out);
    } else if (entry.name.endsWith(".html")) out.push(path);
  }
}

function urlOf(root: string, file: string) {
  const rel = "/" + relative(root, file).replace(/\\/g, "/").replace(/\.html$/, "");
  if (rel === "/index") return "/";
  return rel.endsWith("/index") ? rel.slice(0, -6) : rel;
}

export function checkSitemap(root: string) {
  const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
  const listed = new Set([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].replace(SITE, "") || "/"));
  const files: string[] = [];
  walk(root, files);
  const pages = new Set<string>();
  const missing: string[] = [];
  for (const file of files) {
    const url = urlOf(root, file);
    pages.add(url);
    const html = readFileSync(file, "utf8");
    if (/<meta name="robots" content="[^"]*noindex/.test(html) || html.includes('http-equiv="refresh"')) continue;
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]?.replace(SITE, "") || "/";
    if (canonical !== url) continue; // baska sayfanin kopyasi: haritaya girmez
    if (url === "/404" || url === "/_not-found") continue;
    if (!listed.has(url)) missing.push(url);
  }
  const orphaned = [...listed].filter((url) => !pages.has(url));
  return { missing, orphaned, listed: listed.size };
}
