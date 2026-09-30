import { describe, expect, it } from "vitest";
import { icoOlustur, webManifest } from "../app/converter/gorsel/ico";

describe("icoOlustur", () => {
  it("başlık, dizin girişleri ve PNG verilerini doğru yazar", () => {
    const a = new Uint8Array([1, 2, 3]);
    const b = new Uint8Array([4, 5, 6, 7, 8]);
    const ico = icoOlustur([
      { boyut: 16, png: a },
      { boyut: 256, png: b },
    ]);
    const v = new DataView(ico.buffer);
    expect([
      v.getUint16(0, true),
      v.getUint16(2, true),
      v.getUint16(4, true),
    ]).toEqual([0, 1, 2]);
    expect(ico.length).toBe(6 + 32 + 8);
    // 1. giriş
    expect([ico[6], ico[7]]).toEqual([16, 16]);
    expect(v.getUint16(6 + 6, true)).toBe(32);
    expect(v.getUint32(6 + 8, true)).toBe(3);
    expect(v.getUint32(6 + 12, true)).toBe(38);
    // 256 piksel 0 olarak yazılır
    expect([ico[22], ico[23]]).toEqual([0, 0]);
    expect(v.getUint32(22 + 12, true)).toBe(41);
    expect([...ico.subarray(38)]).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("geçersiz boyutu reddeder", () => {
    expect(() =>
      icoOlustur([{ boyut: 512, png: new Uint8Array(1) }]),
    ).toThrow();
  });

  it("geçerli manifest üretir", () => {
    const m = JSON.parse(webManifest("Site", "#ffffff"));
    expect(m.icons).toHaveLength(2);
    expect(m.icons[1].sizes).toBe("512x512");
  });
});
