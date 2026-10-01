// next build (output: "export") sonrasinda calisir: app/siteRedirects.ts
// listesini Cloudflare Pages'in okudugu out/_redirects dosyasina yazar.
import { writeFileSync } from "node:fs";
import { siteRedirects } from "../app/siteRedirects";

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

writeFileSync("out/_redirects", lines.join("\n") + "\n");
console.log(`out/_redirects: ${lines.length} yonlendirme yazildi`);
