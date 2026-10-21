// Site haritasindaki <lastmod> tarihlerini sayfanin icerigi gercekten degistigi gune gore yazar.
// Her sayfanin <main> metninden (rakamlar haric: geri sayim, kur gibi her gun degisen sayilar sayilmaz) bir ozet
// cikarilir ve out/lastmod.json'a yazilir. Bir sonraki derlemede canli sitedeki lastmod.json okunur: ozeti ayni kalan
// sayfa eski tarihini korur, degisen ya da yeni sayfa derleme anini alir. Canli dosyaya ulasilamazsa (ilk yayin, ag
// hatasi) scripts/lastmodSeed.json'daki tarih, o da yoksa site haritasindaki tarih kullanilir; bu durumda hicbir
// sayfa "bugun degisti" sayilmaz.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SITE = "https://www.birimceviri.app";
type Kayit = { h: string; d: string };

function htmlYolu(root: string, path: string) {
  if (path === "/") return join(root, "index.html");
  const duz = join(root, `${path}.html`);
  return existsSync(duz) ? duz : join(root, path, "index.html");
}

export function icerikOzeti(html: string) {
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? html;
  const metin = main
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[0-9]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return createHash("sha1").update(metin).digest("hex").slice(0, 16);
}

function canliKayitlar(): Record<string, Kayit> | null {
  try {
    const adres = process.env.LASTMOD_URL ?? `${SITE}/lastmod.json`;
    const json = execFileSync("curl", ["-sSf", "--max-time", "30", adres], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      maxBuffer: 64 * 1024 * 1024,
    });
    const veri = JSON.parse(json) as Record<string, Kayit>;
    return veri && typeof veri === "object" ? veri : null;
  } catch {
    return null;
  }
}

function tohum(): Record<string, string> {
  try {
    return JSON.parse(readFileSync(join("scripts", "lastmodSeed.json"), "utf8")) as Record<string, string>;
  } catch {
    return {};
  }
}

export function writeLastmod(root: string) {
  const haritaYolu = join(root, "sitemap.xml");
  const harita = readFileSync(haritaYolu, "utf8");
  const onceki = canliKayitlar();
  const baslangic = onceki ? {} : tohum();
  const simdi = new Date().toISOString();
  const yeni: Record<string, Kayit> = {};
  let degisen = 0;

  const sonuc = harita.replace(/<url>([\s\S]*?)<\/url>/g, (blok, ic: string) => {
    const loc = ic.match(/<loc>(.*?)<\/loc>/)?.[1];
    if (!loc) return blok;
    const path = loc.replace(SITE, "") || "/";
    const dosya = htmlYolu(root, path);
    if (!existsSync(dosya)) return blok;
    const h = icerikOzeti(readFileSync(dosya, "utf8"));
    const eski = ic.match(/<lastmod>(.*?)<\/lastmod>/)?.[1] ?? simdi;
    let d: string;
    if (onceki) {
      const k = onceki[path];
      d = k && k.h === h ? k.d : simdi;
      if (d === simdi) degisen++;
    } else {
      d = baslangic[path] ?? eski;
    }
    yeni[path] = { h, d };
    return blok.replace(/<lastmod>.*?<\/lastmod>/, `<lastmod>${d}</lastmod>`);
  });

  writeFileSync(haritaYolu, sonuc);
  writeFileSync(join(root, "lastmod.json"), JSON.stringify(yeni));
  return { canli: Boolean(onceki), sayfa: Object.keys(yeni).length, degisen };
}
