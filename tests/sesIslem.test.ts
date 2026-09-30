import { describe, expect, it } from "vitest";
import {
  dalgaOzeti,
  kes,
  monoYap,
  sureMetni,
  wavKodla,
} from "../app/converter/ses/sesIslem";

describe("sesIslem", () => {
  it("geçerli bir WAV başlığı ve 16 bit örnekler yazar", () => {
    const w = wavKodla(
      [new Float32Array([0, 1, -1]), new Float32Array([0.5, 0, 0])],
      8000,
    );
    const v = new DataView(w.buffer);
    expect(String.fromCharCode(...w.subarray(0, 4))).toBe("RIFF");
    expect(String.fromCharCode(...w.subarray(8, 12))).toBe("WAVE");
    expect(v.getUint16(22, true)).toBe(2);
    expect(v.getUint32(24, true)).toBe(8000);
    expect(v.getUint32(40, true)).toBe(12);
    expect(w.length).toBe(56);
    // L0 R0 L1 R1 L2 R2
    expect([0, 1, 2, 3, 4, 5].map((i) => v.getInt16(44 + i * 2, true))).toEqual(
      [0, 16383, 32767, 0, -32768, 0],
    );
  });

  it("aralığı keser ve yumuşak giriş/çıkış uygular", () => {
    const k = new Float32Array(100).fill(1);
    const [p] = kes([k], 10, 2, 8, 0.4, 0.4);
    expect(p.length).toBe(60);
    expect(p[0]).toBe(0);
    expect(p[2]).toBeCloseTo(0.5);
    expect(p[30]).toBe(1);
    expect(p[59]).toBe(0);
    // kaynak değişmez
    expect(k[20]).toBe(1);
  });

  it("aralık dışı değerleri sınırlar", () => {
    const [p] = kes([new Float32Array(10)], 10, -5, 50);
    expect(p.length).toBe(10);
  });

  it("mono, dalga özeti ve süre metni", () => {
    const [m] = monoYap([new Float32Array([1, 0]), new Float32Array([0, 1])]);
    expect([...m]).toEqual([0.5, 0.5]);
    const o = dalgaOzeti([new Float32Array([0, 0, 0, 0, 0.5, 0, 0, 0])], 2);
    expect(o).toEqual([0, 0.5]);
    expect(sureMetni(75.25)).toBe("1:15,3");
    expect(sureMetni(5, false)).toBe("0:05");
  });
});
