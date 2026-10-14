// Tiklama derinligi hesabi icin saf yardimcilar: ana sayfadan baslayip ic baglantilari izleyerek
// her sayfanin kac tiklamada bulundugunu hesaplar (BFS). Derleme ciktisindan (out/) HTML okuyan
// betik scripts/linkDepth.ts bunlari kullanir.

/** HTML icindeki <a href> degerlerini dondurur. */
export function extractHrefs(html: string): string[] {
  const hrefs: string[] = [];
  const re = /<a\b[^>]*?\shref=(?:"([^"]*)"|'([^']*)')/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html))) hrefs.push(match[1] ?? match[2] ?? "");
  return hrefs;
}

/** Ic baglantiyi "/yol" biciminde normallestirir; dis, mailto, dosya (uzantili) ve statik varlik baglantilarinda null doner. */
export function normalizeInternalHref(href: string, fromPath: string, siteOrigin: string): string | null {
  const trimmed = href.trim();
  if (!trimmed || trimmed.startsWith("#") || /^(mailto:|tel:|javascript:)/i.test(trimmed)) return null;
  let url: URL;
  try {
    url = new URL(trimmed, `${siteOrigin}${fromPath}`);
  } catch {
    return null;
  }
  if (url.origin !== siteOrigin) return null;
  let path = decodeURI(url.pathname);
  if (path.startsWith("/_next/")) return null;
  if (/\.[a-z0-9]{2,5}$/i.test(path)) return null;
  if (path.length > 1) path = path.replace(/\/+$/, "");
  return path;
}

/** graph: sayfa yolu -> bu sayfanin verdigi ic baglantilar. Ulasilan her sayfanin derinligini dondurur ("/" = 0). */
export function computeDepths(graph: Map<string, string[]>, root = "/"): Map<string, number> {
  const depths = new Map<string, number>([[root, 0]]);
  const queue = [root];
  for (let i = 0; i < queue.length; i++) {
    const page = queue[i];
    const depth = depths.get(page)!;
    for (const target of graph.get(page) ?? []) {
      if (!graph.has(target) || depths.has(target)) continue;
      depths.set(target, depth + 1);
      queue.push(target);
    }
  }
  return depths;
}

export type DepthReport = {
  total: number;
  reachable: number;
  orphans: string[];
  histogram: Record<number, number>;
  deep: Array<{ path: string; depth: number }>;
};

export function buildDepthReport(graph: Map<string, string[]>, maxDepth = 3, root = "/"): DepthReport {
  const depths = computeDepths(graph, root);
  const histogram: Record<number, number> = {};
  for (const d of depths.values()) histogram[d] = (histogram[d] ?? 0) + 1;
  const orphans = [...graph.keys()].filter((p) => !depths.has(p)).sort();
  const deep = [...depths.entries()]
    .filter(([, d]) => d > maxDepth)
    .map(([path, depth]) => ({ path, depth }))
    .sort((a, b) => b.depth - a.depth || a.path.localeCompare(b.path));
  return { total: graph.size, reachable: depths.size, orphans, histogram, deep };
}
