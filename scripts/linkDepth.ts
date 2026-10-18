// Ana sayfadan her sayfaya kac tiklamada ulasildigini olcer. Once `npm run build` ile out/ uretilmeli.
// Calistirma: npx tsx scripts/linkDepth.ts [--max=3] [--dir=out]
// Yalnizca rapor verir; siteyi veya derleme ciktisini degistirmez.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { buildDepthReport, extractHrefs, normalizeInternalHref } from "./linkDepthLib";

const args = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, "").split("=")));
const outDir = resolve(String(args.dir ?? "out"));
const maxDepth = Number(args.max ?? 3);
const ORIGIN = "https://site.invalid";

if (!existsSync(outDir)) {
  console.error(`${outDir} bulunamadi; once npm run build calistirin.`);
  process.exit(1);
}

function* htmlFiles(dir: string): Generator<string> {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name === "_next") continue;
      yield* htmlFiles(full);
    } else if (name.endsWith(".html")) yield full;
  }
}

function pathOf(file: string): string {
  let rel = "/" + relative(outDir, file).split("\\").join("/").replace(/\.html$/, "");
  if (rel.endsWith("/index")) rel = rel.slice(0, -"/index".length) || "/";
  return rel;
}

const graph = new Map<string, string[]>();
for (const file of htmlFiles(outDir)) {
  const path = pathOf(file);
  if (path === "/404" || path === "/_not-found") continue;
  const links = new Set<string>();
  for (const href of extractHrefs(readFileSync(file, "utf8"))) {
    const target = normalizeInternalHref(href, path, ORIGIN);
    if (target && target !== path) links.add(target);
  }
  graph.set(path, [...links]);
}

const report = buildDepthReport(graph, maxDepth);
console.log(`Sayfa: ${report.total}, ana sayfadan ulasilan: ${report.reachable}, yetim: ${report.orphans.length}`);
console.log("Derinlik dagilimi:", report.histogram);
console.log(`Derinligi ${maxDepth} uzeri: ${report.deep.length}`);
for (const { path, depth } of report.deep.slice(0, 50)) console.log(`  ${depth}  ${path}`);
if (report.orphans.length) {
  console.log("Yetim sayfalar (ilk 50):");
  for (const p of report.orphans.slice(0, 50)) console.log(`  ${p}`);
}
