// Parça parça (akış) çalışan özet algoritmaları: büyük dosyalar belleğe tümüyle alınmadan hesaplanır.
// MD5 (RFC 1321), SHA-1 ve SHA-256 (FIPS 180-4), CRC-32 (IEEE 802.3). SHA-384/512 WebCrypto ile.

export interface Ozetleyici {
  guncelle(v: Uint8Array): void;
  bitir(): Uint8Array;
}

/** 64 baytlık bloklarla çalışan Merkle–Damgård özetleri için ortak tampon. */
abstract class Blok64 implements Ozetleyici {
  private tampon = new Uint8Array(64);
  private dolu = 0;
  private uzunluk = 0;
  protected abstract blok(v: DataView, o: number): void;
  protected abstract sonuc(): Uint8Array;
  protected abstract buyukSonlu: boolean;

  guncelle(v: Uint8Array) {
    this.uzunluk += v.length;
    let i = 0;
    if (this.dolu) {
      const al = Math.min(64 - this.dolu, v.length);
      this.tampon.set(v.subarray(0, al), this.dolu);
      this.dolu += al;
      i = al;
      if (this.dolu === 64) {
        this.blok(new DataView(this.tampon.buffer), 0);
        this.dolu = 0;
      }
    }
    const dv = new DataView(v.buffer, v.byteOffset, v.byteLength);
    for (; i + 64 <= v.length; i += 64) this.blok(dv, i);
    if (i < v.length) {
      this.tampon.set(v.subarray(i), 0);
      this.dolu = v.length - i;
    }
  }

  bitir() {
    const bit = this.uzunluk * 8;
    const dolgu = new Uint8Array((this.dolu < 56 ? 56 : 120) - this.dolu + 8);
    dolgu[0] = 0x80;
    const dv = new DataView(dolgu.buffer);
    const yuksek = Math.floor(bit / 2 ** 32);
    const dusuk = bit >>> 0;
    const k = dolgu.length - 8;
    if (this.buyukSonlu) {
      dv.setUint32(k, yuksek);
      dv.setUint32(k + 4, dusuk);
    } else {
      dv.setUint32(k, dusuk, true);
      dv.setUint32(k + 4, yuksek, true);
    }
    const uz = this.uzunluk;
    this.guncelle(dolgu);
    this.uzunluk = uz;
    return this.sonuc();
  }
}

const S_MD5 = [
  7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5,
  9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11,
  16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15,
  21,
];
const K_MD5 = Array.from(
  { length: 64 },
  (_, i) => Math.floor(Math.abs(Math.sin(i + 1)) * 2 ** 32) >>> 0,
);

export class Md5 extends Blok64 {
  protected buyukSonlu = false;
  private h = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476];
  protected blok(v: DataView, o: number) {
    const m = Array.from({ length: 16 }, (_, i) =>
      v.getUint32(o + i * 4, true),
    );
    let [a, b, c, d] = this.h;
    for (let i = 0; i < 64; i++) {
      let f: number;
      let g: number;
      if (i < 16) {
        f = (b & c) | (~b & d);
        g = i;
      } else if (i < 32) {
        f = (d & b) | (~d & c);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        f = b ^ c ^ d;
        g = (3 * i + 5) % 16;
      } else {
        f = c ^ (b | ~d);
        g = (7 * i) % 16;
      }
      const t = d;
      d = c;
      c = b;
      const x = (a + f + K_MD5[i] + m[g]) | 0;
      b = (b + ((x << S_MD5[i]) | (x >>> (32 - S_MD5[i])))) | 0;
      a = t;
    }
    this.h = [
      (this.h[0] + a) | 0,
      (this.h[1] + b) | 0,
      (this.h[2] + c) | 0,
      (this.h[3] + d) | 0,
    ];
  }
  protected sonuc() {
    const out = new Uint8Array(16);
    const dv = new DataView(out.buffer);
    this.h.forEach((x, i) => dv.setUint32(i * 4, x, true));
    return out;
  }
}

const rotl = (x: number, n: number) => (x << n) | (x >>> (32 - n));

export class Sha1 extends Blok64 {
  protected buyukSonlu = true;
  private h = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];
  private w = new Int32Array(80);
  protected blok(v: DataView, o: number) {
    const w = this.w;
    for (let i = 0; i < 16; i++) w[i] = v.getInt32(o + i * 4);
    for (let i = 16; i < 80; i++)
      w[i] = rotl(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16], 1);
    let [a, b, c, d, e] = this.h;
    for (let i = 0; i < 80; i++) {
      const f =
        i < 20
          ? ((b & c) | (~b & d)) + 0x5a827999
          : i < 40
            ? (b ^ c ^ d) + 0x6ed9eba1
            : i < 60
              ? ((b & c) | (b & d) | (c & d)) + 0x8f1bbcdc
              : (b ^ c ^ d) + 0xca62c1d6;
      const t = (rotl(a, 5) + f + e + w[i]) | 0;
      e = d;
      d = c;
      c = rotl(b, 30);
      b = a;
      a = t;
    }
    this.h = this.h.map((x, i) => (x + [a, b, c, d, e][i]) | 0);
  }
  protected sonuc() {
    const out = new Uint8Array(20);
    const dv = new DataView(out.buffer);
    this.h.forEach((x, i) => dv.setUint32(i * 4, x >>> 0));
    return out;
  }
}

const K256 = new Int32Array([
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
  0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
  0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
  0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
  0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
  0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
]);
const rotr = (x: number, n: number) => (x >>> n) | (x << (32 - n));

export class Sha256 extends Blok64 {
  protected buyukSonlu = true;
  private h = new Int32Array([
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c,
    0x1f83d9ab, 0x5be0cd19,
  ]);
  private w = new Int32Array(64);
  protected blok(v: DataView, o: number) {
    const w = this.w;
    for (let i = 0; i < 16; i++) w[i] = v.getInt32(o + i * 4);
    for (let i = 16; i < 64; i++) {
      const s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ (w[i - 15] >>> 3);
      const s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
    }
    const h = this.h;
    let a = h[0],
      b = h[1],
      c = h[2],
      d = h[3],
      e = h[4],
      f = h[5],
      g = h[6],
      hh = h[7];
    for (let i = 0; i < 64; i++) {
      const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
      const ch = (e & f) ^ (~e & g);
      const t1 = (hh + S1 + ch + K256[i] + w[i]) | 0;
      const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const t2 = (S0 + maj) | 0;
      hh = g;
      g = f;
      f = e;
      e = (d + t1) | 0;
      d = c;
      c = b;
      b = a;
      a = (t1 + t2) | 0;
    }
    h[0] += a;
    h[1] += b;
    h[2] += c;
    h[3] += d;
    h[4] += e;
    h[5] += f;
    h[6] += g;
    h[7] += hh;
  }
  protected sonuc() {
    const out = new Uint8Array(32);
    const dv = new DataView(out.buffer);
    this.h.forEach((x, i) => dv.setInt32(i * 4, x));
    return out;
  }
}

const CRC_TABLO = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[i] = c >>> 0;
  }
  return t;
})();

export class Crc32 implements Ozetleyici {
  private c = 0xffffffff;
  guncelle(v: Uint8Array) {
    let c = this.c;
    for (let i = 0; i < v.length; i++)
      c = CRC_TABLO[(c ^ v[i]) & 255] ^ (c >>> 8);
    this.c = c;
  }
  bitir() {
    const out = new Uint8Array(4);
    new DataView(out.buffer).setUint32(0, (this.c ^ 0xffffffff) >>> 0);
    return out;
  }
}

export type HashAlg =
  | "MD5"
  | "SHA-1"
  | "SHA-256"
  | "SHA-384"
  | "SHA-512"
  | "CRC32";
export const HASH_ALGLAR: HashAlg[] = [
  "MD5",
  "SHA-1",
  "SHA-256",
  "SHA-384",
  "SHA-512",
  "CRC32",
];
/** Akışla hesaplanabilenler; diğerleri WebCrypto ile tek parça. */
export const AKIS_ALG: Partial<Record<HashAlg, () => Ozetleyici>> = {
  MD5: () => new Md5(),
  "SHA-1": () => new Sha1(),
  "SHA-256": () => new Sha256(),
  CRC32: () => new Crc32(),
};
/** WebCrypto ile tek parça hesaplanabilecek en büyük dosya */
export const TEK_PARCA_SINIR = 1024 * 1024 * 1024;

export const hexYaz = (b: Uint8Array) =>
  Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");

export function base64Yaz(b: Uint8Array) {
  let s = "";
  for (const x of b) s += String.fromCharCode(x);
  return btoa(s);
}

/** Tek seferde (bellekteki veri için) özet. */
export async function ozetAl(alg: HashAlg, v: Uint8Array): Promise<Uint8Array> {
  const a = AKIS_ALG[alg];
  if (a) {
    const o = a();
    o.guncelle(v);
    return o.bitir();
  }
  return new Uint8Array(await crypto.subtle.digest(alg, v as BufferSource));
}

/** Karşılaştırma için bir özet metnini normalleştirir (boşluk, büyük harf, "sha256:" öneki). */
export function ozetNormal(s: string) {
  return s
    .trim()
    .toLowerCase()
    .replace(/^(md5|sha-?\d+|crc32)[:=\s]+/, "")
    .replace(/[\s:-]/g, "")
    .split(/\s+/)[0];
}

/** Uzunluğa göre algoritmayı tahmin eder (hex). */
export function algTahmin(hex: string): HashAlg | null {
  const n = ozetNormal(hex);
  if (!/^[0-9a-f]+$/.test(n)) return null;
  return (
    (
      {
        8: "CRC32",
        32: "MD5",
        40: "SHA-1",
        64: "SHA-256",
        96: "SHA-384",
        128: "SHA-512",
      } as Record<number, HashAlg>
    )[n.length] ?? null
  );
}
