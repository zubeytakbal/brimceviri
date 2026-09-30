// Birden çok dosyayı tek ZIP olarak indirmek için küçük bir yazıcı.
// Görseller zaten sıkıştırılmış olduğu için "store" (sıkıştırmasız) yöntemi kullanılır.

const CRC_TABLO = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

export function crc32(veri: Uint8Array) {
  let c = 0xffffffff;
  for (let i = 0; i < veri.length; i++)
    c = CRC_TABLO[(c ^ veri[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

/** Aynı adı taşıyan dosyalara (1), (2) ekler. */
export function benzersizAdlar(adlar: string[]) {
  const sayac = new Map<string, number>();
  return adlar.map((ad) => {
    const n = sayac.get(ad) ?? 0;
    sayac.set(ad, n + 1);
    if (!n) return ad;
    const m = ad.match(/^(.*?)(\.[^.]+)?$/)!;
    return `${m[1]} (${n})${m[2] ?? ""}`;
  });
}

export function zipOlustur(
  dosyalar: Array<{ ad: string; veri: Uint8Array }>,
): Uint8Array {
  const enc = new TextEncoder();
  const adlar = benzersizAdlar(dosyalar.map((d) => d.ad));
  const yerel: Uint8Array[] = [];
  const merkez: Uint8Array[] = [];
  let ofset = 0;
  dosyalar.forEach((d, i) => {
    const ad = enc.encode(adlar[i]);
    const crc = crc32(d.veri);
    const boy = d.veri.length;
    const b = new Uint8Array(30 + ad.length);
    const v = new DataView(b.buffer);
    v.setUint32(0, 0x04034b50, true);
    v.setUint16(4, 20, true);
    v.setUint16(6, 0x0800, true); // UTF-8 dosya adı
    v.setUint16(8, 0, true); // store
    v.setUint16(10, 0, true);
    v.setUint16(12, 0x21, true); // 1980-01-01
    v.setUint32(14, crc, true);
    v.setUint32(18, boy, true);
    v.setUint32(22, boy, true);
    v.setUint16(26, ad.length, true);
    v.setUint16(28, 0, true);
    b.set(ad, 30);
    yerel.push(b, d.veri);
    const c = new Uint8Array(46 + ad.length);
    const w = new DataView(c.buffer);
    w.setUint32(0, 0x02014b50, true);
    w.setUint16(4, 20, true);
    w.setUint16(6, 20, true);
    w.setUint16(8, 0x0800, true);
    w.setUint16(10, 0, true);
    w.setUint16(12, 0, true);
    w.setUint16(14, 0x21, true);
    w.setUint32(16, crc, true);
    w.setUint32(20, boy, true);
    w.setUint32(24, boy, true);
    w.setUint16(28, ad.length, true);
    w.setUint32(42, ofset, true);
    c.set(ad, 46);
    merkez.push(c);
    ofset += b.length + boy;
  });
  const merkezBoy = merkez.reduce((s, c) => s + c.length, 0);
  const son = new Uint8Array(22);
  const e = new DataView(son.buffer);
  e.setUint32(0, 0x06054b50, true);
  e.setUint16(8, dosyalar.length, true);
  e.setUint16(10, dosyalar.length, true);
  e.setUint32(12, merkezBoy, true);
  e.setUint32(16, ofset, true);
  const parcalar = [...yerel, ...merkez, son];
  const out = new Uint8Array(parcalar.reduce((s, p) => s + p.length, 0));
  let i = 0;
  for (const p of parcalar) {
    out.set(p, i);
    i += p.length;
  }
  return out;
}
