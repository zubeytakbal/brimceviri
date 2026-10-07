// Şablon sayfa denetimi: aynı klasördeki kardeş sayfalar (ör. /il-rakimlari/*) birbirinin
// kopyasıysa build durur. Her klasörden örnek sayfa çiftleri alınır, <main> metninin
// 5'li kelime grupları karşılaştırılır (Jaccard). Ortalama örtüşme ESIK'i aşan bir klasör,
// PENDING listesinde değilse hata verir. PENDING yalnızca küçülür: bir grup düzeltilince
// listeden çıkarılır; listede olup artık eşiği geçmeyen grup da uyarı olarak raporlanır.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ESIK = 0.2;
const MIN_SAYFA = 5;
const CIFT = 30;
const ORNEK = 24;

/**
 * Henüz özgünleştirilmemiş gruplar (plan adım 2-7). Düzeltildikçe silinir, yenisi eklenmez.
 * "/x/*" alt klasörlerin hepsini kapsar.
 */
export const PENDING = new Set<string>([]);

function isPending(group: string) {
  if (PENDING.has(group)) return true;
  for (const p of PENDING) if (p.endsWith("/*") && group.startsWith(p.slice(0, -1))) return true;
  return false;
}

function htmlFiles(dir: string, out: Map<string, string[]>) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "_next") htmlFiles(path, out);
    } else if (entry.name.endsWith(".html")) {
      const list = out.get(dir) ?? [];
      list.push(path);
      out.set(dir, list);
    }
  }
}

function shingles(path: string): Set<string> {
  // Form denetimleri (açılır liste, giriş etiketi, düğme; ör. 100 şehirlik saat dilimi seçicisi) ve SVG
  // haritalardaki il/ülke adları sayfa metni sayılmaz.
  const html = readFileSync(path, "utf8").replace(
    /<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<select[\s\S]*?<\/select>|<label[\s\S]*?<\/label>|<button[\s\S]*?<\/button>|<svg[\s\S]*?<\/svg>/g,
    "",
  );
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? "";
  const words = main.replace(/<[^>]+>/g, " ").toLowerCase().split(/\s+/).filter(Boolean);
  const set = new Set<string>();
  for (let i = 0; i + 5 <= words.length; i++) set.add(words.slice(i, i + 5).join(" "));
  return set;
}

/** Tekrarlanabilir örnekleme için basit sözde rastgele üreteç. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

function overlap(files: string[]): number {
  const rand = rng(files.length * 7919);
  const pool = [...files].sort();
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const sample = pool.slice(0, ORNEK).map(shingles).filter((s) => s.size > 0);
  if (sample.length < 2) return 0;
  let total = 0;
  for (let k = 0; k < CIFT; k++) {
    const a = Math.floor(rand() * sample.length);
    let b = Math.floor(rand() * (sample.length - 1));
    if (b >= a) b++;
    let inter = 0;
    for (const x of sample[a]) if (sample[b].has(x)) inter++;
    total += inter / (sample[a].size + sample[b].size - inter);
  }
  return total / CIFT;
}

export type GuardResult = { failed: { group: string; n: number; avg: number }[]; fixed: string[]; pending: number };

export function checkTemplates(outDir: string): GuardResult {
  const groups = new Map<string, string[]>();
  htmlFiles(outDir, groups);
  const failed: GuardResult["failed"] = [];
  const over = new Set<string>();
  for (const [dir, files] of groups) {
    if (dir === outDir || files.length < MIN_SAYFA || !statSync(dir).isDirectory()) continue;
    const group = "/" + relative(outDir, dir);
    const avg = overlap(files);
    if (avg <= ESIK) continue;
    over.add(group);
    if (!isPending(group)) failed.push({ group, n: files.length, avg });
  }
  const fixed = [...PENDING].filter((p) =>
    p.endsWith("/*") ? ![...over].some((g) => g.startsWith(p.slice(0, -1))) : !over.has(p),
  );
  return { failed, fixed, pending: PENDING.size - fixed.length };
}
