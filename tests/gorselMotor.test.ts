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
