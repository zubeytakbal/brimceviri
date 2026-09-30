import { deflateSync } from "node:zlib";
import { PDFDocument, PDFName, PDFRawStream } from "pdf-lib";
import { describe, expect, it } from "vitest";
import {
  pdfSikistir,
  pngOngoruCoz,
  type KaynakGorsel,
} from "../app/converter/pdf/pdfSikistir";

/** Basit bir RGB PNG üretir (her satır "Sub" öngörüsüyle). */
function png(w: number, h: number): Uint8Array {
  const crcTablo = Array.from({ length: 256 }, (_, n) => {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    return c >>> 0;
  });
  const crc = (b: Buffer) => {
    let c = 0xffffffff;
    for (const x of b) c = crcTablo[(c ^ x) & 255] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  };
  const parca = (tip: string, veri: Buffer) => {
    const u = Buffer.alloc(4);
    u.writeUInt32BE(veri.length);
    const tv = Buffer.concat([Buffer.from(tip), veri]);
    const c = Buffer.alloc(4);
    c.writeUInt32BE(crc(tv));
    return Buffer.concat([u, tv, c]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  const ham = Buffer.alloc((w * 3 + 1) * h);
  for (let y = 0; y < h; y++) {
    ham[y * (w * 3 + 1)] = 0;
    for (let x = 0; x < w * 3; x++)
      ham[y * (w * 3 + 1) + 1 + x] = (x + y) & 255;
  }
  return new Uint8Array(
    Buffer.concat([
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
      parca("IHDR", ihdr),
      parca("IDAT", deflateSync(ham)),
      parca("IEND", Buffer.alloc(0)),
    ]),
  );
}

describe("pdfSikistir", () => {
  it("PNG öngörülerini çözer", () => {
    // 2×2 gri; satır 1 Sub, satır 2 Up
    const v = new Uint8Array([1, 10, 5, 2, 1, 1]);
    expect([...pngOngoruCoz(v, 2, 2, 1)]).toEqual([10, 15, 11, 16]);
  });

  it("gömülü görseli çözüp kodlayıcıya verir ve JPEG ile değiştirir", async () => {
    const d = await PDFDocument.create();
    const img = await d.embedPng(png(200, 150));
    d.addPage([400, 300]).drawImage(img, {
      x: 0,
      y: 0,
      width: 400,
      height: 300,
    });
    d.addPage().drawText("Metin kalir");
    const veri = await d.save();
    let gelen: KaynakGorsel | null = null;
    const { pdf, rapor } = await pdfSikistir(veri, async (g) => {
      gelen = g;
      return { veri: new Uint8Array(500).fill(7), w: 100, h: 75 };
    });
    expect(gelen).not.toBeNull();
    const g = gelen as unknown as KaynakGorsel;
    expect(g.tur).toBe("ham");
    expect([g.w, g.h]).toEqual([200, 150]);
    // piksel (x=1, y=2) kırmızı kanal = (3 + 2) & 255
    expect(g.veri[(2 * 200 + 1) * 3]).toBe(5);
    expect(rapor.kucultulen).toBe(1);
    expect(pdf.length).toBeLessThan(veri.length);
    const o = await PDFDocument.load(pdf);
    expect(o.getPageCount()).toBe(2);
    const akis = o.context
      .enumerateIndirectObjects()
      .map(([, x]) => x)
      .find(
        (x) =>
          x instanceof PDFRawStream &&
          x.dict.get(PDFName.of("Subtype")) === PDFName.of("Image"),
      ) as PDFRawStream;
    expect(akis.dict.get(PDFName.of("Filter"))).toBe(PDFName.of("DCTDecode"));
    expect(akis.contents.length).toBe(500);
  });

  it("küçülmezse orijinali döndürür", async () => {
    const d = await PDFDocument.create();
    d.addPage().drawText("Sadece metin");
    const veri = await d.save();
    const { pdf, rapor } = await pdfSikistir(veri, async () => null);
    expect(pdf).toBe(veri);
    expect(rapor.kucultulen).toBe(0);
  });
});
