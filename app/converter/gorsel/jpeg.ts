// JPEG yardımcıları.

/**
 * JPEG dosyasını en az `minBayt` boyutuna tamamlar. Başlangıç işaretinin (SOI) hemen ardına
 * yorum (COM, 0xFFFE) bölümleri eklenir; görüntü verisi değişmez, dosya her görüntüleyicide aynı açılır.
 * Bazı başvuru sistemleri (ör. e-Okul) küçük ölçülü fotoğraflarda alt dosya boyutu sınırı koyar.
 */
export function jpegDoldur(veri: Uint8Array, minBayt: number): Uint8Array {
  if (veri.length < 2 || veri[0] !== 0xff || veri[1] !== 0xd8)
    throw new Error("Geçerli bir JPEG değil");
  let eksik = minBayt - veri.length;
  if (eksik <= 0) return veri;
  const bolumler: Uint8Array[] = [];
  const METIN = new TextEncoder().encode("birimceviri.app ");
  while (eksik > 0) {
    // Bir bölüm en az 4 bayt (işaret + uzunluk), en fazla 65535 + 2 bayt olabilir.
    const toplam = Math.min(Math.max(eksik, 4), 65537);
    const b = new Uint8Array(toplam);
    b[0] = 0xff;
    b[1] = 0xfe;
    const uzunluk = toplam - 2;
    b[2] = uzunluk >> 8;
    b[3] = uzunluk & 0xff;
    for (let i = 4; i < toplam; i++) b[i] = METIN[(i - 4) % METIN.length];
    bolumler.push(b);
    eksik -= toplam;
  }
  const ek = bolumler.reduce((s, b) => s + b.length, 0);
  const out = new Uint8Array(veri.length + ek);
  out.set(veri.subarray(0, 2), 0);
  let i = 2;
  for (const b of bolumler) {
    out.set(b, i);
    i += b.length;
  }
  out.set(veri.subarray(2), i);
  return out;
}
