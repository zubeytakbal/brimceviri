// ZIP okuyucu: merkez dizini okur, dosyaları "store" veya "deflate" yöntemiyle açar (tarayıcı ve Node 18+).

/** Türkçe Windows'un eski ZIP'lerinde dosya adları CP857 kodlamasıyla yazılır. */
const CP857 =
  "\u00c7\u00fc\u00e9\u00e2\u00e4\u00e0\u00e5\u00e7\u00ea\u00eb\u00e8\u00ef\u00ee\u0131\u00c4\u00c5\u00c9\u00e6\u00c6\u00f4\u00f6\u00f2\u00fb\u00f9\u0130\u00d6\u00dc\u00f8\u00a3\u00d8\u015e\u015f\u00e1\u00ed\u00f3\u00fa\u00f1\u00d1\u011e\u011f\u00bf\u00ae\u00ac\u00bd\u00bc\u00a1\u00ab\u00bb\u2591\u2592\u2593\u2502\u2524\u00c1\u00c2\u00c0\u00a9\u2563\u2551\u2557\u255d\u00a2\u00a5\u2510\u2514\u2534\u252c\u251c\u2500\u253c\u00e3\u00c3\u255a\u2554\u2569\u2566\u2560\u2550\u256c\u00a4\u00ba\u00aa\u00ca\u00cb\u00c8?\u00cd\u00ce\u00cf\u2518\u250c\u2588\u2584\u00a6\u00cc\u2580\u00d3\u00df\u00d4\u00d2\u00f5\u00d5\u00b5?\u00d7\u00da\u00db\u00d9\u00ec\u00ff\u00af\u00b4\u00ad\u00b1?\u00be\u00b6\u00a7\u00f7\u00b8\u00b0\u00a8\u00b7\u00b9\u00b3\u00b2\u25a0\u00a0";

export type ZipGirdi = {
  ad: string;
  klasor: boolean;
  boyut: number;
  sikisik: number;
  yontem: number;
  sifreli: boolean;
  tarih: Date | null;
  /** Dosya içeriğini açar. */
  ac: () => Promise<Uint8Array>;
};

function adCoz(b: Uint8Array, utf8: boolean) {
  if (utf8) return new TextDecoder().decode(b);
  if (b.every((x) => x < 0x80)) return String.fromCharCode(...b);
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(b);
  } catch {
    return Array.from(b, (x) =>
      x < 0x80 ? String.fromCharCode(x) : CP857[x - 0x80],
    ).join("");
  }
}

function dosTarih(t: number, d: number) {
  if (!d) return null;
  return new Date(
    1980 + (d >> 9),
    ((d >> 5) & 15) - 1,
    d & 31,
    t >> 11,
    (t >> 5) & 63,
    (t & 31) * 2,
  );
}

export async function inflateRaw(veri: Uint8Array): Promise<Uint8Array> {
  const akis = new Blob([veri as BlobPart])
    .stream()
    .pipeThrough(new DecompressionStream("deflate-raw"));
  return new Uint8Array(await new Response(akis).arrayBuffer());
}

/** ZIP dosyasındaki girdileri listeler. */
export function zipOku(z: Uint8Array): ZipGirdi[] {
  const v = new DataView(z.buffer, z.byteOffset, z.byteLength);
  let son = -1;
  for (let i = z.length - 22; i >= Math.max(0, z.length - 65557); i--)
    if (v.getUint32(i, true) === 0x06054b50) {
      son = i;
      break;
    }
  if (son < 0) throw new Error("Bu dosya geçerli bir ZIP arşivi değil.");
  let adet = v.getUint16(son + 10, true);
  let konum = v.getUint32(son + 16, true);
  // ZIP64
  if (konum === 0xffffffff || adet === 0xffff) {
    const loc = son - 20;
    if (loc >= 0 && v.getUint32(loc, true) === 0x07064b50) {
      const z64 = Number(v.getBigUint64(loc + 8, true));
      adet = Number(v.getBigUint64(z64 + 32, true));
      konum = Number(v.getBigUint64(z64 + 48, true));
    }
  }
  const out: ZipGirdi[] = [];
  for (let n = 0; n < adet; n++) {
    if (v.getUint32(konum, true) !== 0x02014b50)
      throw new Error("ZIP dizini bozuk.");
    const bayrak = v.getUint16(konum + 8, true);
    const yontem = v.getUint16(konum + 10, true);
    const saat = v.getUint16(konum + 12, true);
    const gun = v.getUint16(konum + 14, true);
    let sikisik = v.getUint32(konum + 20, true);
    let boyut = v.getUint32(konum + 24, true);
    const adBoy = v.getUint16(konum + 28, true);
    const ekBoy = v.getUint16(konum + 30, true);
    const notBoy = v.getUint16(konum + 32, true);
    let yerel = v.getUint32(konum + 42, true);
    const ad = adCoz(
      z.subarray(konum + 46, konum + 46 + adBoy),
      !!(bayrak & 0x800),
    ).replace(/\\/g, "/");
    // ZIP64 ek alanı
    let e = konum + 46 + adBoy;
    const eSon = e + ekBoy;
    while (e + 4 <= eSon) {
      const id = v.getUint16(e, true);
      const b = v.getUint16(e + 2, true);
      if (id === 1) {
        let p = e + 4;
        if (boyut === 0xffffffff) {
          boyut = Number(v.getBigUint64(p, true));
          p += 8;
        }
        if (sikisik === 0xffffffff) {
          sikisik = Number(v.getBigUint64(p, true));
          p += 8;
        }
        if (yerel === 0xffffffff) yerel = Number(v.getBigUint64(p, true));
      }
      e += 4 + b;
    }
    const baslangic = yerel;
    const sk = sikisik;
    out.push({
      ad,
      klasor: ad.endsWith("/"),
      boyut,
      sikisik,
      yontem,
      sifreli: !!(bayrak & 1),
      tarih: dosTarih(saat, gun),
      ac: async () => {
        if (bayrak & 1) throw new Error("Şifreli ZIP dosyaları açılamaz.");
        const lAd = v.getUint16(baslangic + 26, true);
        const lEk = v.getUint16(baslangic + 28, true);
        const veri = z.subarray(
          baslangic + 30 + lAd + lEk,
          baslangic + 30 + lAd + lEk + sk,
        );
        if (yontem === 0) return veri.slice();
        if (yontem === 8) return inflateRaw(veri);
        throw new Error(
          "Bu sıkıştırma yöntemi desteklenmiyor (yalnızca Deflate).",
        );
      },
    });
    konum += 46 + adBoy + ekBoy + notBoy;
  }
  return out;
}
