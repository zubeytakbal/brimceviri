// Görsel dosyasına çözünürlük (DPI) bilgisi yazma. Görüntü verisi değişmez;
// baskı ve tasarım programları görseli bu bilgiye göre doğru santimetrede açar.
import { crc32 } from "./zip";

/** JPEG'in JFIF (APP0) başlığına DPI yazar. JFIF başlığı yoksa dosyayı olduğu gibi döndürür. */
export function jpegDpiYaz(veri: Uint8Array, dpi: number): Uint8Array {
  const d = Math.max(1, Math.min(65535, Math.round(dpi)));
  if (veri[0] !== 0xff || veri[1] !== 0xd8) return veri;
  const j =
    veri[2] === 0xff &&
    veri[3] === 0xe0 &&
    String.fromCharCode(...veri.subarray(6, 11)) === "JFIF\0";
  if (!j) return veri;
  const out = veri.slice();
  out[13] = 1; // birim: inç başına nokta
  out[14] = d >> 8;
  out[15] = d & 0xff;
  out[16] = d >> 8;
  out[17] = d & 0xff;
  return out;
}

/** PNG'ye pHYs parçası ekler veya günceller (metre başına piksel). */
export function pngDpiYaz(veri: Uint8Array, dpi: number): Uint8Array {
  const imza = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (!imza.every((b, i) => veri[i] === b)) return veri;
  const ppm = Math.round(dpi / 0.0254);
  const parca = new Uint8Array(21);
  const v = new DataView(parca.buffer);
  v.setUint32(0, 9);
  parca.set([0x70, 0x48, 0x59, 0x73], 4); // "pHYs"
  v.setUint32(8, ppm);
  v.setUint32(12, ppm);
  parca[16] = 1;
  v.setUint32(17, crc32(parca.subarray(4, 17)));
  // IHDR her zaman ilk parçadır: 8 (imza) + 4 + 4 + 13 + 4 = 33
  const dv = new DataView(veri.buffer, veri.byteOffset, veri.byteLength);
  const parcalar: Uint8Array[] = [veri.subarray(0, 33), parca];
  let i = 33;
  while (i + 8 <= veri.length) {
    const uz = dv.getUint32(i);
    const tur = String.fromCharCode(...veri.subarray(i + 4, i + 8));
    const son = i + 12 + uz;
    if (tur !== "pHYs") parcalar.push(veri.subarray(i, son));
    i = son;
  }
  const out = new Uint8Array(parcalar.reduce((s, p) => s + p.length, 0));
  let k = 0;
  for (const p of parcalar) {
    out.set(p, k);
    k += p.length;
  }
  return out;
}
