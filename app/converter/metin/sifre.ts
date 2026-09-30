// Güvenli rastgele şifre üretimi (Web Crypto) ve güç tahmini.

export const KUMELER = {
  buyuk: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  kucuk: "abcdefghijklmnopqrstuvwxyz",
  rakam: "0123456789",
  sembol: "!@#$%&*+-=?_.:;,",
} as const;
export type Kume = keyof typeof KUMELER;

/** Birbirine benzeyen karakterler (I, l, 1, O, 0 …). */
const BENZER = /[Il1O0oS5Z2B8]/g;

export type SifreAyar = {
  uzunluk: number;
  kumeler: Kume[];
  benzerleriCikar: boolean;
};

/** [0, n) aralığında eşit dağılımlı rastgele tam sayı (modulo sapması olmadan). */
export function rastgele(
  n: number,
  kaynak: (a: Uint32Array) => Uint32Array = (a) => crypto.getRandomValues(a),
) {
  const sinir = Math.floor(0x100000000 / n) * n;
  const a = new Uint32Array(1);
  for (;;) {
    kaynak(a);
    if (a[0] < sinir) return a[0] % n;
  }
}

export function havuzlar(a: SifreAyar) {
  return a.kumeler.map((k) =>
    a.benzerleriCikar ? KUMELER[k].replace(BENZER, "") : KUMELER[k],
  );
}

/** Seçilen her kümeden en az bir karakter içeren şifre üretir. */
export function sifreUret(
  a: SifreAyar,
  kaynak?: (a: Uint32Array) => Uint32Array,
): string {
  const h = havuzlar(a).filter(Boolean);
  if (!h.length) throw new Error("En az bir karakter türü seçin.");
  const n = Math.max(a.uzunluk, h.length);
  const tum = h.join("");
  const k = [
    ...h.map((p) => p[rastgele(p.length, kaynak)]),
    ...Array.from(
      { length: n - h.length },
      () => tum[rastgele(tum.length, kaynak)],
    ),
  ];
  // Fisher–Yates karıştırma
  for (let i = k.length - 1; i > 0; i--) {
    const j = rastgele(i + 1, kaynak);
    [k[i], k[j]] = [k[j], k[i]];
  }
  return k.join("");
}

/** Rastgele üretilmiş şifrenin entropisi (bit). */
export const entropi = (a: SifreAyar) =>
  Math.max(a.uzunluk, 1) * Math.log2(Math.max(1, havuzlar(a).join("").length));

export function gucEtiketi(bit: number) {
  if (bit < 40) return { ad: "Zayıf", duzey: 1 };
  if (bit < 60) return { ad: "Orta", duzey: 2 };
  if (bit < 80) return { ad: "Güçlü", duzey: 3 };
  return { ad: "Çok güçlü", duzey: 4 };
}

/** Saniyede 10 milyar deneme yapan bir saldırgan için ortalama kırma süresi (metin). */
export function kirmaSuresi(bit: number) {
  const sn = 2 ** (bit - 1) / 1e10;
  const birimler: Array<[number, string]> = [
    [3.156e7 * 1e9, "milyar yıl"],
    [3.156e7 * 1e6, "milyon yıl"],
    [3.156e7, "yıl"],
    [86400, "gün"],
    [3600, "saat"],
    [60, "dakika"],
    [1, "saniye"],
  ];
  if (sn < 1) return "anında";
  for (const [b, ad] of birimler)
    if (sn >= b) {
      const d = sn / b;
      return d >= 1000 && ad === "milyar yıl"
        ? "evrenin yaşından çok daha uzun"
        : `${Math.round(d).toLocaleString("tr-TR")} ${ad}`;
    }
  return "anında";
}
