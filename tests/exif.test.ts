import { describe, expect, it } from "vitest";
import {
  jpegExifOku,
  jpegTemizle,
  pngExifOku,
  pngTemizle,
} from "../app/converter/gorsel/exif";
import { crc32 } from "../app/converter/gorsel/zip";

/** Küçük uçlu (II) TIFF: IFD0 (Make, Model, Orientation=6, GPS işaretçisi) + GPS IFD (41°0'36"K, 28°58'48"D). */
function tiff() {
  const b = new Uint8Array(260);
  const v = new DataView(b.buffer);
  b.set([0x49, 0x49, 0x2a, 0], 0);
  v.setUint32(4, 8, true);
  const girdiler: Array<[number, number, number, number]> = [
    [0x010f, 2, 6, 120], // Make -> "Apple\0"
    [0x0110, 2, 10, 128], // Model -> "iPhone 15\0"
    [0x0112, 3, 1, 6], // Orientation (değer içinde)
    [0x8825, 4, 1, 150], // GPS IFD
  ];
  v.setUint16(8, girdiler.length, true);
  girdiler.forEach(([tag, tur, sayi, deger], i) => {
    const e = 10 + i * 12;
    v.setUint16(e, tag, true);
    v.setUint16(e + 2, tur, true);
    v.setUint32(e + 4, sayi, true);
    if (tur === 3) v.setUint16(e + 8, deger, true);
    else v.setUint32(e + 8, deger, true);
  });
  b.set(new TextEncoder().encode("Apple\0"), 120);
  b.set(new TextEncoder().encode("iPhone 15\0"), 128);
  // GPS IFD @150: 4 girdi
  v.setUint16(150, 4, true);
  const gps: Array<[number, number, number, number]> = [
    [1, 2, 2, 0x4e], // "N"
    [2, 5, 3, 210],
    [3, 2, 2, 0x45], // "E"
    [4, 5, 3, 234],
  ];
  gps.forEach(([tag, tur, sayi, deger], i) => {
    const e = 152 + i * 12;
    v.setUint16(e, tag, true);
    v.setUint16(e + 2, tur, true);
    v.setUint32(e + 4, sayi, true);
    if (tur === 2) b[e + 8] = deger;
    else v.setUint32(e + 8, deger, true);
  });
  const rasyonel = (o: number, d: number, m: number, s: number) =>
    [d, m, s].forEach((x, i) => {
      v.setUint32(o + i * 8, x, true);
      v.setUint32(o + i * 8 + 4, 1, true);
    });
  rasyonel(210, 41, 0, 36);
  rasyonel(234, 28, 58, 48);
  return b;
}

function jpeg() {
  const t = tiff();
  const seg = (isaret: number, govde: number[]) => [
    0xff,
    isaret,
    (govde.length + 2) >> 8,
    (govde.length + 2) & 0xff,
    ...govde,
  ];
  const exif = seg(
    0xe1,
    [..."Exif\0\0"].map((c) => c.charCodeAt(0)).concat([...t]),
  );
  const app0 = seg(
    0xe0,
    [0x4a, 0x46, 0x49, 0x46, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
  );
  const icc = seg(
    0xe2,
    [..."ICC_PROFILE\0"].map((c) => c.charCodeAt(0)).concat([1, 1, 9, 9]),
  );
  const xmp = seg(
    0xe1,
    [..."http://ns.adobe.com/xap/1.0/\0<x/>"].map((c) => c.charCodeAt(0)),
  );
  const com = seg(
    0xfe,
    [..."gizli not"].map((c) => c.charCodeAt(0)),
  );
  const dqt = seg(0xdb, [0, 1, 2, 3]);
  const sos = [0xff, 0xda, 0, 4, 1, 2, 0x11, 0x22, 0x33, 0xff, 0xd9];
  return new Uint8Array([
    0xff,
    0xd8,
    ...app0,
    ...exif,
    ...icc,
    ...xmp,
    ...com,
    ...dqt,
    ...sos,
  ]);
}

describe("EXIF", () => {
  it("reads camera, orientation and GPS from a JPEG", () => {
    const b = jpegExifOku(jpeg())!;
    expect(b.marka).toBe("Apple");
    expect(b.model).toBe("iPhone 15");
    expect(b.yon).toBe(6);
    expect(b.gps!.enlem).toBeCloseTo(41.01, 2);
    expect(b.gps!.boylam).toBeCloseTo(28.98, 2);
    expect(b.turler).toEqual(["EXIF", "XMP", "Yorum"]);
  });

  it("strips metadata losslessly but keeps orientation and ICC", () => {
    const orijinal = jpeg();
    const t = jpegTemizle(orijinal);
    const b = jpegExifOku(t)!;
    expect(b.gps).toBeUndefined();
    expect(b.marka).toBeUndefined();
    expect(b.yon).toBe(6);
    expect(b.turler).toEqual(["EXIF"]);
    const s = String.fromCharCode(...t);
    expect(s.includes("ICC_PROFILE")).toBe(true);
    expect(s.includes("gizli not")).toBe(false);
    expect(s.includes("iPhone")).toBe(false);
    // görüntü verisi (SOS sonrası) aynen korunur
    expect([...t.subarray(-11)]).toEqual([...orijinal.subarray(-11)]);
  });

  it("cleans PNG text and eXIf chunks", () => {
    const parca = (tur: string, veri: number[]) => {
      const x = new Uint8Array(12 + veri.length);
      const v = new DataView(x.buffer);
      v.setUint32(0, veri.length);
      x.set(
        [...tur].map((c) => c.charCodeAt(0)),
        4,
      );
      x.set(veri, 8);
      v.setUint32(8 + veri.length, crc32(x.subarray(4, 8 + veri.length)));
      return [...x];
    };
    const yazi = [..."Author\0Ayse"].map((c) => c.charCodeAt(0));
    const png = new Uint8Array([
      0x89,
      0x50,
      0x4e,
      0x47,
      0x0d,
      0x0a,
      0x1a,
      0x0a,
      ...parca("IHDR", [0, 0, 0, 1, 0, 0, 0, 1, 8, 2, 0, 0, 0]),
      ...parca("tEXt", yazi),
      ...parca("IDAT", [1, 2, 3]),
      ...parca("IEND", []),
    ]);
    expect(pngExifOku(png)!.turler).toEqual(["PNG metni"]);
    const t = pngTemizle(png);
    expect(pngExifOku(t)!.turler).toEqual([]);
    expect(String.fromCharCode(...t).includes("Ayse")).toBe(false);
    expect(t.length).toBe(png.length - 12 - yazi.length);
  });
});
