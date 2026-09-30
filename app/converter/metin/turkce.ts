// Türkçe metin işlemleri: harf dönüşümü (İ/ı kuralıyla), Türkçe karakter kaldırma, hece ayırma,
// sayıyı yazıya çevirme. Tamamen yerel hesap.

export type HarfKipi = "buyuk" | "kucuk" | "baslik" | "cumle" | "ters";

const buyuk = (s: string, tr: boolean) =>
  tr ? s.toLocaleUpperCase("tr") : s.toUpperCase();
const kucuk = (s: string, tr: boolean) =>
  tr ? s.toLocaleLowerCase("tr") : s.toLowerCase();

/** Büyük/küçük harf dönüşümü. `tr` false ise İngilizce kuralı (i ↔ I) uygulanır. */
export function harfDonustur(metin: string, kip: HarfKipi, tr = true): string {
  switch (kip) {
    case "buyuk":
      return buyuk(metin, tr);
    case "kucuk":
      return kucuk(metin, tr);
    case "baslik":
      // her kelimenin ilk harfi büyük; kesme işaretinden sonrası küçük kalır (Ankara'da)
      return kucuk(metin, tr).replace(
        /(^|[\s"“(«\-–—/])(\p{L})/gu,
        (_, a: string, b: string) => a + buyuk(b, tr),
      );
    case "cumle": {
      const k = kucuk(metin, tr);
      return k.replace(
        /(^\s*|[.!?…]\s+|\n\s*)(\p{L})/gu,
        (_, a: string, b: string) => a + buyuk(b, tr),
      );
    }
    case "ters":
      return Array.from(metin)
        .map((c) => {
          const b = buyuk(c, tr);
          return c === b ? kucuk(c, tr) : b;
        })
        .join("");
  }
}

const ASCII: Record<string, string> = {
  ç: "c",
  Ç: "C",
  ğ: "g",
  Ğ: "G",
  ı: "i",
  İ: "I",
  ö: "o",
  Ö: "O",
  ş: "s",
  Ş: "S",
  ü: "u",
  Ü: "U",
  â: "a",
  Â: "A",
  î: "i",
  Î: "I",
  û: "u",
  Û: "U",
};

/** Türkçe karakterleri İngilizce karşılıklarına çevirir (ç→c, ğ→g, ı→i, İ→I …). */
export const turkceKaldir = (s: string) =>
  s.replace(/[çÇğĞıİöÖşŞüÜâÂîÎûÛ]/g, (c) => ASCII[c]);

/** Web adresi (slug) üretir: "Şişli'de Kira Artışı 2026" → "sislide-kira-artisi-2026" */
export function slugYap(s: string) {
  return turkceKaldir(s.toLocaleLowerCase("tr"))
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ------------------------------------------------------------------ hece

const UNLU = /[aeıioöuüâîûAEIİOÖUÜÂÎÛ]/;

/** Tek bir kelimeyi hecelerine ayırır: "kardeşlik" → ["kar","deş","lik"] */
export function kelimeHecele(k: string): string[] {
  const unluler: number[] = [];
  for (let i = 0; i < k.length; i++) if (UNLU.test(k[i])) unluler.push(i);
  if (unluler.length <= 1) return [k];
  const sinirlar: number[] = [];
  for (let n = 1; n < unluler.length; n++) {
    const v = unluler[n];
    // iki ünlü arasında ünsüz yoksa (sa-at) sınır ünlünün önü; varsa son ünsüzün önü
    sinirlar.push(v - 1 > unluler[n - 1] ? v - 1 : v);
  }
  const out: string[] = [];
  let bas = 0;
  for (const s of sinirlar) {
    out.push(k.slice(bas, s));
    bas = s;
  }
  out.push(k.slice(bas));
  return out;
}

export type HeceSatiri = { satir: string; heceli: string; sayi: number };

/** Metni satır satır heceler; her satırın hece sayısını (hece ölçüsü) verir. */
export function heceleMetin(metin: string): HeceSatiri[] {
  return metin.split(/\r?\n/).map((satir) => {
    let sayi = 0;
    const heceli = satir.replace(/\p{L}+/gu, (k) => {
      const h = kelimeHecele(k);
      sayi += h.filter((x) => UNLU.test(x)).length;
      return h.join("-");
    });
    return { satir, heceli, sayi };
  });
}

// ------------------------------------------------------------------ sayıyı yazıya

const BIRLER = [
  "",
  "bir",
  "iki",
  "üç",
  "dört",
  "beş",
  "altı",
  "yedi",
  "sekiz",
  "dokuz",
];
const ONLAR = [
  "",
  "on",
  "yirmi",
  "otuz",
  "kırk",
  "elli",
  "altmış",
  "yetmiş",
  "seksen",
  "doksan",
];
const BUYUK = [
  "",
  "bin",
  "milyon",
  "milyar",
  "trilyon",
  "katrilyon",
  "kentilyon",
];

function ucHane(n: number): string[] {
  const y = Math.floor(n / 100);
  const o = Math.floor((n % 100) / 10);
  const b = n % 10;
  const p: string[] = [];
  if (y) p.push(...(y > 1 ? [BIRLER[y]] : []), "yüz");
  if (o) p.push(ONLAR[o]);
  if (b) p.push(BIRLER[b]);
  return p;
}

/** Tam sayıyı kelime dizisine çevirir: 1250 → ["bin","iki","yüz","elli"] */
export function sayiKelimeler(n: bigint): string[] {
  if (n === BigInt(0)) return ["sıfır"];
  const eksi = n < BigInt(0);
  let x = eksi ? -n : n;
  const gruplar: number[] = [];
  const bin = BigInt(1000);
  while (x > BigInt(0)) {
    gruplar.push(Number(x % bin));
    x /= bin;
  }
  if (gruplar.length > BUYUK.length) throw new Error("Sayı çok büyük.");
  const p: string[] = [];
  for (let i = gruplar.length - 1; i >= 0; i--) {
    const g = gruplar[i];
    if (!g) continue;
    // "bir bin" denmez, "bin" denir
    if (!(i === 1 && g === 1)) p.push(...ucHane(g));
    if (BUYUK[i]) p.push(BUYUK[i]);
  }
  return eksi ? ["eksi", ...p] : p;
}

/** Kullanıcı girdisini (1.234,56 / 1234.56 / 1 234,5) tam ve kuruş kısmına ayırır. */
export function tutarAyristir(
  girdi: string,
): { tam: bigint; kurus: number; eksi: boolean } | null {
  let s = girdi.trim().replace(/\s|₺|TL|tl/g, "");
  const eksi = s.startsWith("-");
  if (eksi) s = s.slice(1);
  if (!s || !/^[\d.,]+$/.test(s)) return null;
  let tam = s;
  let ondalik = "";
  const vIdx = s.lastIndexOf(",");
  const nIdx = s.lastIndexOf(".");
  if (vIdx >= 0 && vIdx > nIdx) {
    tam = s.slice(0, vIdx).replace(/\./g, "");
    ondalik = s.slice(vIdx + 1);
  } else if (nIdx >= 0) {
    const son = s.slice(nIdx + 1);
    const noktaSayisi = (s.match(/\./g) ?? []).length;
    // tek nokta ve arkasında 1–2 hane: ondalık (1234.5); aksi hâlde binlik ayırıcı
    if (noktaSayisi === 1 && son.length <= 2 && vIdx < 0) {
      tam = s.slice(0, nIdx);
      ondalik = son;
    } else tam = s.replace(/[.,]/g, "");
  }
  if (/[.,]/.test(ondalik) || !/^\d*$/.test(tam) || !/^\d*$/.test(ondalik))
    return null;
  if (!tam && !ondalik) return null;
  // kuruş iki haneye yuvarlanır
  const kurusHam = Number(`0.${ondalik || "0"}`);
  let kurus = Math.round(kurusHam * 100);
  let t = BigInt(tam || "0");
  if (kurus === 100) {
    kurus = 0;
    t += BigInt(1);
  }
  return { tam: t, kurus, eksi };
}

export type YaziAyar = {
  para: "yok" | "tl" | "turkLirasi";
  bitisik: boolean;
  buyukHarf: boolean;
};

const ilkBuyuk = (s: string) =>
  s.charAt(0).toLocaleUpperCase("tr") + s.slice(1);

/** Tutarı yazıya çevirir: 1250,50 → "bin iki yüz elli Türk lirası elli kuruş" */
export function sayiYaziya(girdi: string, ayar: YaziAyar): string | null {
  const t = tutarAyristir(girdi);
  if (!t) return null;
  const birlestir = (k: string[]) =>
    ayar.bitisik ? k.map(ilkBuyuk).join("") : k.join(" ");
  let ana: string[];
  try {
    ana = sayiKelimeler(t.tam);
  } catch {
    return null;
  }
  const parcalar: string[] = [];
  if (t.eksi) parcalar.push(ayar.bitisik ? "Eksi" : "eksi");
  if (ayar.para === "yok") {
    parcalar.push(birlestir(ana));
    if (t.kurus)
      parcalar.push(
        ayar.bitisik ? "Virgül" : "virgül",
        birlestir(
          t.kurus < 10
            ? ["sıfır", ...sayiKelimeler(BigInt(t.kurus))]
            : sayiKelimeler(BigInt(t.kurus)),
        ),
      );
  } else {
    const lira =
      ayar.para === "tl" ? "TL" : ayar.bitisik ? "TürkLirası" : "Türk lirası";
    const kr = ayar.para === "tl" ? "Kr" : ayar.bitisik ? "Kuruş" : "kuruş";
    if (t.tam > BigInt(0) || !t.kurus) parcalar.push(birlestir(ana), lira);
    if (t.kurus) parcalar.push(birlestir(sayiKelimeler(BigInt(t.kurus))), kr);
  }
  let s = ayar.bitisik ? parcalar.join("") : parcalar.join(" ");
  if (ayar.buyukHarf) s = s.toLocaleUpperCase("tr");
  return s;
}
