// Metin karşılaştırma: Myers fark algoritması (satır ve kelime düzeyinde).

export type FarkParca<T = string> = {
  tur: "ayni" | "silindi" | "eklendi";
  deger: T;
};

/** İki dizinin en kısa düzenleme dizisini (Myers, O((N+M)D)) döndürür. */
export function fark<T>(
  a: T[],
  b: T[],
  esit: (x: T, y: T) => boolean = (x, y) => x === y,
): FarkParca<T>[] {
  const n = a.length;
  const m = b.length;
  const max = n + m;
  const v = new Int32Array(2 * max + 2);
  const izler: Int32Array[] = [];
  let bulundu = false;
  for (let d = 0; d <= max && !bulundu; d++) {
    izler.push(v.slice());
    for (let k = -d; k <= d; k += 2) {
      let x =
        k === -d || (k !== d && v[max + k - 1] < v[max + k + 1])
          ? v[max + k + 1]
          : v[max + k - 1] + 1;
      let y = x - k;
      while (x < n && y < m && esit(a[x], b[y])) {
        x++;
        y++;
      }
      v[max + k] = x;
      if (x >= n && y >= m) {
        bulundu = true;
        break;
      }
    }
  }
  // Geri izleme
  const out: FarkParca<T>[] = [];
  let x = n;
  let y = m;
  for (let d = izler.length - 1; d >= 0 && (x > 0 || y > 0); d--) {
    const vd = izler[d];
    const k = x - y;
    const onceK =
      k === -d || (k !== d && vd[max + k - 1] < vd[max + k + 1])
        ? k + 1
        : k - 1;
    const oncX = vd[max + onceK];
    const oncY = oncX - onceK;
    while (x > oncX && y > oncY) {
      out.push({ tur: "ayni", deger: a[--x] });
      y--;
    }
    if (d > 0) {
      if (x === oncX) out.push({ tur: "eklendi", deger: b[--y] });
      else out.push({ tur: "silindi", deger: a[--x] });
    }
  }
  return out.reverse();
}

export type SatirKarsilastirma = {
  sol: string | null;
  sag: string | null;
  tur: "ayni" | "degisti" | "silindi" | "eklendi";
  solParcalar?: FarkParca[];
  sagParcalar?: FarkParca[];
};

const kelimeler = (s: string) =>
  s.match(/\s+|[\p{L}\p{N}_]+|[^\s\p{L}\p{N}_]/gu) ?? [];

/** Satır satır karşılaştırır; karşılıklı değişen satırlarda kelime farkını da hesaplar. */
export function metinKarsilastir(
  sol: string,
  sag: string,
  { boslukYoksay = false, harfYoksay = false } = {},
): SatirKarsilastirma[] {
  const norm = (s: string) => {
    let t = s;
    if (boslukYoksay) t = t.replace(/\s+/g, " ").trim();
    if (harfYoksay) t = t.toLocaleLowerCase("tr");
    return t;
  };
  const a = sol.split(/\r?\n/);
  const b = sag.split(/\r?\n/);
  const p = fark(a, b, (x, y) => norm(x) === norm(y));
  const out: SatirKarsilastirma[] = [];
  for (let i = 0; i < p.length; ) {
    if (p[i].tur === "ayni") {
      out.push({ sol: p[i].deger, sag: p[i].deger, tur: "ayni" });
      i++;
      continue;
    }
    const silinen: string[] = [];
    const eklenen: string[] = [];
    while (i < p.length && p[i].tur !== "ayni") {
      (p[i].tur === "silindi" ? silinen : eklenen).push(p[i].deger);
      i++;
    }
    const n = Math.max(silinen.length, eklenen.length);
    for (let j = 0; j < n; j++) {
      const s = silinen[j] ?? null;
      const e = eklenen[j] ?? null;
      if (s !== null && e !== null) {
        const kp = fark(
          kelimeler(s),
          kelimeler(e),
          (x, y) => norm(x) === norm(y),
        );
        out.push({
          sol: s,
          sag: e,
          tur: "degisti",
          solParcalar: kp.filter((x) => x.tur !== "eklendi"),
          sagParcalar: kp.filter((x) => x.tur !== "silindi"),
        });
      } else
        out.push({ sol: s, sag: e, tur: s === null ? "eklendi" : "silindi" });
    }
  }
  return out;
}
