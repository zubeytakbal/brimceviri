// next build (output: "export") sonrasinda calisir:
// 1. Next.js'in sayfa gecis verisi dosyalarini (<sayfa>.txt, __next.*.txt)
//    siler. Site ici linkler duz <a> oldugu icin kullanilmazlar; silinmezse
//    site ~115.000 dosyaya cikar ve Cloudflare Pages'in 20.000 dosya
//    sinirini asar.
// 2. app/siteRedirects.ts listesini Cloudflare Pages'in okudugu
//    out/_redirects dosyasina yazar.
import { existsSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { siteRedirects } from "../app/siteRedirects";

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

console.log(`${removeRscPayloads(OUT)} sayfa gecis verisi (.txt) silindi`);
console.log(`out/_redirects: ${writeRedirects()} yonlendirme yazildi`);
