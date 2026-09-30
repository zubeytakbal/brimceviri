import { describe, expect, it } from "vitest";
import { ciktiAdi, formatTahmin } from "../app/converter/gorsel/formatlar";
import {
  kaliteAra,
  mmPiksel,
  olcuHesapla,
} from "../app/converter/gorsel/sikistirma";
import { benzersizAdlar, crc32, zipOlustur } from "../app/converter/gorsel/zip";

describe("görsel formatları", () => {
  it("guesses formats and output names", () => {
    expect(formatTahmin("IMG_1.JPEG")).toBe("jpg");
    expect(formatTahmin("a.bin", "image/webp")).toBe("webp");
    expect(formatTahmin("a.gif")).toBeNull();
    expect(ciktiAdi("tatil.foto.png", "jpg")).toBe("tatil.foto.jpg");
    expect(ciktiAdi(".png", "webp")).toBe("gorsel.webp");
  });
});

describe("boyutlandırma", () => {
  it("keeps aspect ratio", () => {
    expect(
      olcuHesapla({ genislik: 4000, yukseklik: 3000 }, { genislik: 1200 }),
    ).toEqual({ genislik: 1200, yukseklik: 900 });
    expect(
      olcuHesapla(
        { genislik: 4000, yukseklik: 3000 },
        { genislik: 1000, yukseklik: 1000 },
      ),
    ).toEqual({ genislik: 1000, yukseklik: 750 });
    expect(
      olcuHesapla(
        { genislik: 400, yukseklik: 300 },
        { genislik: 133, yukseklik: 171, oranKoru: false },
      ),
    ).toEqual({ genislik: 133, yukseklik: 171 });
    expect(mmPiksel(50, 300)).toBe(591);
    expect(mmPiksel(60, 300)).toBe(709);
  });

  it("finds the highest quality under a target size", async () => {
    const kodla = async (q: number) => Math.round(10000 + q * 190000);
    const r = await kaliteAra(kodla, 100000);
    expect(r!.bayt).toBeLessThanOrEqual(100000);
    expect(r!.kalite).toBeGreaterThan(0.45);
    expect(await kaliteAra(kodla, 5000)).toBeNull();
    expect((await kaliteAra(kodla, 500000))!.kalite).toBe(0.95);
  });
});

describe("zip", () => {
  it("computes CRC-32 and writes a valid archive", () => {
    expect(crc32(new TextEncoder().encode("123456789"))).toBe(0xcbf43926);
    expect(benzersizAdlar(["a.jpg", "a.jpg", "b.png", "a.jpg"])).toEqual([
      "a.jpg",
      "a (1).jpg",
      "b.png",
      "a (2).jpg",
    ]);
    const z = zipOlustur([
      { ad: "ç.txt", veri: new TextEncoder().encode("merhaba") },
      { ad: "b.txt", veri: new Uint8Array([1, 2, 3]) },
    ]);
    const v = new DataView(z.buffer);
    expect(v.getUint32(0, true)).toBe(0x04034b50);
    expect(v.getUint32(z.length - 22, true)).toBe(0x06054b50);
    expect(v.getUint16(z.length - 12, true)).toBe(2);
  });
});

describe("jpegDoldur", () => {
  it("pads a JPEG with comment segments without touching image data", async () => {
    const { jpegDoldur } = await import("../app/converter/gorsel/jpeg");
    const jpeg = new Uint8Array([
      0xff, 0xd8, 0xff, 0xe0, 0x00, 0x04, 0x01, 0x02, 0xff, 0xd9,
    ]);
    const out = jpegDoldur(jpeg, 21000);
    expect(out.length).toBe(21000);
    expect([...out.subarray(0, 4)]).toEqual([0xff, 0xd8, 0xff, 0xfe]);
    const len = (out[4] << 8) | out[5];
    expect([...out.subarray(4 + len, 4 + len + 2)]).toEqual([0xff, 0xe0]);
    expect([...out.subarray(-2)]).toEqual([0xff, 0xd9]);
    expect(jpegDoldur(jpeg, 5)).toBe(jpeg);
    expect(jpegDoldur(jpeg, 200000).length).toBe(200000);
    expect(() => jpegDoldur(new Uint8Array([1, 2, 3]), 10)).toThrow();
  });
});

describe("kırpma", () => {
  it("builds fixed-ratio crop boxes inside the image", async () => {
    const { kirpmaBolgesi, kirpmaSinirla } =
      await import("../app/converter/gorsel/sikistirma");
    const yatay = kirpmaBolgesi({ genislik: 4000, yukseklik: 3000 }, 133 / 171);
    expect(yatay.h).toBe(3000);
    expect(yatay.w).toBe(2333);
    expect(yatay.x).toBe(833);
    const dikey = kirpmaBolgesi({ genislik: 3000, yukseklik: 4000 }, 133 / 171);
    expect(dikey.w).toBe(3000);
    expect(dikey.h).toBe(3857);
    expect(dikey.y).toBe(50);
    const yakin = kirpmaBolgesi(
      { genislik: 3000, yukseklik: 4000 },
      133 / 171,
      0.5,
      { x: 100, y: 100 },
    );
    expect(yakin.x).toBe(0);
    expect(yakin.y).toBe(0);
    expect(
      kirpmaSinirla(
        { x: 3900, y: -20, w: 500, h: 500 },
        { genislik: 4000, yukseklik: 3000 },
      ),
    ).toEqual({ x: 3500, y: 0, w: 500, h: 500 });
  });
});

describe("boyutlandırma planı ve DPI", () => {
  it("plans pixel, percent and cm resizing", async () => {
    const { boyutPlani } = await import("../app/converter/gorsel/sikistirma");
    const k = { genislik: 4000, yukseklik: 3000 };
    expect(boyutPlani(k, { mod: "yuzde", yuzde: 25 })).toEqual({
      genislik: 1000,
      yukseklik: 750,
    });
    expect(
      boyutPlani(k, {
        mod: "piksel",
        genislik: 1080,
        yukseklik: 1080,
        oranKoru: true,
        sigdirma: "sigdir",
      }),
    ).toEqual({ genislik: 1080, yukseklik: 810 });
    const doldur = boyutPlani(k, {
      mod: "piksel",
      genislik: 1080,
      yukseklik: 1080,
      oranKoru: true,
      sigdirma: "doldur",
    });
    expect(doldur).toMatchObject({
      genislik: 1080,
      yukseklik: 1080,
      bolge: { x: 500, y: 0, w: 3000, h: 3000 },
    });
    expect(
      boyutPlani(k, {
        mod: "piksel",
        genislik: 800,
        oranKoru: true,
        sigdirma: "sigdir",
      }),
    ).toEqual({ genislik: 800, yukseklik: 600 });
    expect(
      boyutPlani(k, {
        mod: "piksel",
        genislik: 500,
        yukseklik: 500,
        oranKoru: false,
        sigdirma: "sigdir",
      }),
    ).toEqual({ genislik: 500, yukseklik: 500 });
    expect(
      boyutPlani(k, {
        mod: "cm",
        genislikCm: 15,
        yukseklikCm: 10,
        dpi: 300,
        oranKoru: true,
        sigdirma: "esnet",
      }),
    ).toEqual({ genislik: 1772, yukseklik: 1181 });
  });

  it("writes DPI into JPEG and PNG headers", async () => {
    const { jpegDpiYaz, pngDpiYaz } =
      await import("../app/converter/gorsel/dpi");
    const { crc32 } = await import("../app/converter/gorsel/zip");
    const jfif = new Uint8Array([
      0xff, 0xd8, 0xff, 0xe0, 0, 16, 0x4a, 0x46, 0x49, 0x46, 0, 1, 1, 0, 0, 1,
      0, 1, 0, 0, 0xff, 0xd9,
    ]);
    const j = jpegDpiYaz(jfif, 300);
    expect([...j.subarray(13, 18)]).toEqual([1, 1, 44, 1, 44]);
    expect(jfif[13]).toBe(0);
    // En küçük PNG: imza + IHDR + IEND
    const parca = (tur: string, veri: number[]) => {
      const b = new Uint8Array(12 + veri.length);
      const v = new DataView(b.buffer);
      v.setUint32(0, veri.length);
      b.set(
        [...tur].map((c) => c.charCodeAt(0)),
        4,
      );
      b.set(veri, 8);
      v.setUint32(8 + veri.length, crc32(b.subarray(4, 8 + veri.length)));
      return [...b];
    };
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
      ...parca("pHYs", [0, 0, 0, 1, 0, 0, 0, 1, 0]),
      ...parca("IEND", []),
    ]);
    const p = pngDpiYaz(png, 300);
    const s = String.fromCharCode(...p);
    expect(s.split("pHYs").length - 1).toBe(1);
    const i = s.indexOf("pHYs");
    const dv = new DataView(p.buffer);
    expect(dv.getUint32(i + 4)).toBe(11811);
    expect(dv.getUint32(i + 13)).toBe(crc32(p.subarray(i, i + 13)));
    expect(s.endsWith("IEND" + String.fromCharCode(...p.subarray(-4)))).toBe(
      true,
    );
  });
});

describe("boşluklu sığdırma", () => {
  it("centers the image inside the exact box", async () => {
    const { boyutPlani } = await import("../app/converter/gorsel/sikistirma");
    expect(
      boyutPlani(
        { genislik: 4000, yukseklik: 3000 },
        {
          mod: "piksel",
          genislik: 1080,
          yukseklik: 1080,
          oranKoru: true,
          sigdirma: "bosluk",
        },
      ),
    ).toEqual({
      genislik: 1080,
      yukseklik: 1080,
      yerlesim: { x: 0, y: 135, w: 1080, h: 810 },
    });
  });
});

describe("köşe tutamacı", () => {
  it("resizes from a corner keeping the opposite corner fixed", async () => {
    const { koseSurukle } = await import("../app/converter/gorsel/sikistirma");
    const k = { genislik: 1000, yukseklik: 800 };
    const b = { x: 100, y: 100, w: 400, h: 300 };
    expect(koseSurukle(b, "gd", 50, 20, k)).toEqual({ x: 100, y: 100, w: 450, h: 320 });
    expect(koseSurukle(b, "ku", 50, 20, k)).toEqual({ x: 150, y: 120, w: 350, h: 280 });
    expect(koseSurukle(b, "gd", 100, 0, k, 1)).toEqual({ x: 100, y: 100, w: 500, h: 500 });
    // sınır: sağ alt köşe görselin dışına çıkamaz, oran korunur
    expect(koseSurukle(b, "gd", 900, 900, k, 1)).toEqual({ x: 100, y: 100, w: 700, h: 700 });
    expect(koseSurukle(b, "gd", -1000, -1000, k)).toEqual({ x: 100, y: 100, w: 16, h: 16 });
  });
});
