// CSV ayrıştırma/yazma ve JSON ile tablo arasında dönüşüm (tarayıcı ve Node).

export type Hucre = string | number | boolean | null;
export type Tablo = Hucre[][];

const ADAYLAR = [",", ";", "\t", "|"];

/** Tırnak dışındaki karakterlere bakarak ayırıcıyı tahmin eder (Türkçe Excel ';' kullanır). */
export function ayiriciBul(metin: string): string {
  const ornek = metin.slice(0, 20000);
  const say = new Map(ADAYLAR.map((a) => [a, 0]));
  let tirnak = false;
  let satir = 0;
  for (const c of ornek) {
    if (c === '"') tirnak = !tirnak;
    else if (!tirnak && c === "\n" && ++satir > 20) break;
    else if (!tirnak && say.has(c)) say.set(c, say.get(c)! + 1);
  }
  return [...say.entries()].sort((a, b) => b[1] - a[1])[0][1] > 0
    ? [...say.entries()].sort((a, b) => b[1] - a[1])[0][0]
    : ",";
}

/** RFC 4180 uyumlu CSV ayrıştırıcı: tırnaklı alanlar, "" kaçışı, satır içi satır sonları, BOM. */
export function csvAyristir(
  metin: string,
  ayirici = ayiriciBul(metin),
): string[][] {
  const s = metin.replace(/^﻿/, "");
  const out: string[][] = [];
  let satir: string[] = [];
  let alan = "";
  let tirnak = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (tirnak) {
      if (c === '"') {
        if (s[i + 1] === '"') {
          alan += '"';
          i++;
        } else tirnak = false;
      } else alan += c;
    } else if (c === '"' && alan === "") tirnak = true;
    else if (c === ayirici) {
      satir.push(alan);
      alan = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && s[i + 1] === "\n") i++;
      satir.push(alan);
      out.push(satir);
      satir = [];
      alan = "";
    } else alan += c;
  }
  if (alan !== "" || satir.length) {
    satir.push(alan);
    out.push(satir);
  }
  return out;
}

const metneCevir = (h: Hucre) => (h === null ? "" : String(h));

/** Tabloyu CSV metnine çevirir; gerektiğinde alanları tırnaklar. */
export function csvYaz(t: Tablo, ayirici = ","): string {
  return t
    .map((r) =>
      r
        .map((h) => {
          const m = metneCevir(h);
          return /["\r\n]/.test(m) || m.includes(ayirici) || /^\s|\s$/.test(m)
            ? `"${m.replace(/"/g, '""')}"`
            : m;
        })
        .join(ayirici),
    )
    .join("\r\n");
}

function duzlestir(o: unknown, onek: string, hedef: Record<string, Hucre>) {
  if (o !== null && typeof o === "object" && !Array.isArray(o)) {
    const girdiler = Object.entries(o as Record<string, unknown>);
    if (!girdiler.length && onek) hedef[onek] = "";
    for (const [k, v] of girdiler)
      duzlestir(v, onek ? `${onek}.${k}` : k, hedef);
  } else if (Array.isArray(o)) {
    hedef[onek] = JSON.stringify(o);
  } else {
    hedef[onek] =
      typeof o === "string" || typeof o === "number" || typeof o === "boolean"
        ? o
        : o === null || o === undefined
          ? null
          : String(o);
  }
}

/** JSON değerini tabloya çevirir: nesne dizisi → başlık satırı + satırlar (iç içe alanlar "a.b"). */
export function jsonTablo(deger: unknown): Tablo {
  let dizi: unknown[];
  if (Array.isArray(deger)) dizi = deger;
  else if (deger && typeof deger === "object") {
    // { "kayitlar": [...] } gibi tek dizi içeren nesneler
    const diziler = Object.values(deger).filter(Array.isArray);
    dizi = diziler.length === 1 ? (diziler[0] as unknown[]) : [deger];
  } else dizi = [deger];
  if (dizi.every(Array.isArray))
    return (dizi as unknown[][]).map((r) =>
      r.map((h) =>
        h !== null && typeof h === "object" ? JSON.stringify(h) : (h as Hucre),
      ),
    );
  const satirlar = dizi.map((o) => {
    const d: Record<string, Hucre> = {};
    duzlestir(o, "", d);
    if ("" in d) {
      d.deger = d[""];
      delete d[""];
    }
    return d;
  });
  const basliklar: string[] = [];
  for (const s of satirlar)
    for (const k of Object.keys(s))
      if (!basliklar.includes(k)) basliklar.push(k);
  return [
    basliklar,
    ...satirlar.map((s) => basliklar.map((b) => (b in s ? s[b] : null))),
  ];
}

/** "123", "1.5", "true" gibi metinleri sayı/mantıksal değere çevirir. */
export function turTahmin(m: string): Hucre {
  if (m === "") return null;
  if (/^(true|false)$/i.test(m)) return m.toLowerCase() === "true";
  // 10 haneden uzun tam sayılar (TC kimlik, telefon, hesap no) metin kalır; Excel bunları bilimsel gösterimle bozar.
  if (/^-?(0|[1-9]\d{0,9})(\.\d+)?([eE][+-]?\d+)?$/.test(m)) return Number(m);
  return m;
}

/** Tabloyu JSON nesne dizisine çevirir; "a.b" başlıkları iç içe nesne olur. */
export function tabloJson(
  t: Tablo,
  { baslikVar = true, turler = true, icIce = true } = {},
): unknown[] {
  const deger = (h: Hucre) =>
    turler && typeof h === "string" ? turTahmin(h) : h === "" ? null : h;
  if (!baslikVar) return t.map((r) => r.map(deger));
  const [bas = [], ...govde] = t;
  const adlar = bas.map((b, i) => metneCevir(b).trim() || `sutun${i + 1}`);
  return govde
    .filter((r) => r.some((h) => h !== null && h !== ""))
    .map((r) => {
      const o: Record<string, unknown> = {};
      adlar.forEach((ad, i) => {
        const v = deger(r[i] ?? null);
        if (!icIce || !ad.includes(".")) {
          o[ad] = v;
          return;
        }
        const yol = ad.split(".");
        let h = o;
        for (const p of yol.slice(0, -1)) {
          if (typeof h[p] !== "object" || h[p] === null) h[p] = {};
          h = h[p] as Record<string, unknown>;
        }
        h[yol[yol.length - 1]] = v;
      });
      return o;
    });
}

/** JSON hata mesajından satır/sütun bulur (Chrome ve Node "position N" verir). */
export function jsonHataKonumu(metin: string, mesaj: string) {
  const m =
    mesaj.match(/position (\d+)/) ?? mesaj.match(/line (\d+) column (\d+)/);
  if (!m) return null;
  if (m.length === 3) return { satir: Number(m[1]), sutun: Number(m[2]) };
  const onceki = metin.slice(0, Number(m[1])).split("\n");
  return { satir: onceki.length, sutun: onceki[onceki.length - 1].length + 1 };
}
