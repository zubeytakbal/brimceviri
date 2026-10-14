import { describe, expect, it } from "vitest";
import { boltLoads, classById, decodeClass, identifyPipeThread, identifyThread, PIPE_THREADS, threadById } from "../app/converter/mechanics/threads";

// Referans değerler: ISO 724 (temel çaplar), ISO 898-1:2013 Tablo 4–7 (gerilme alanı, en az kopma ve deneme yükleri),
// ISO 228-1 (G dişi diş dibi çapı).
describe("ISO 724 metrik vida çapları", () => {
  it("M10: d2 = 9,026, d3 = 8,160, D1 = 8,376", () => {
    const t = threadById("M10")!;
    expect(t.P).toBe(1.5);
    expect(t.d2).toBeCloseTo(9.026, 3);
    expect(t.d3).toBeCloseTo(8.16, 2);
    expect(t.D1).toBeCloseTo(8.376, 3);
  });
  it("kılavuz matkapları: M6 → 5, M8 → 6,8, M10 → 8,5, M12 → 10,2, M10x1 → 9", () => {
    expect(threadById("M6")!.tapDrill).toBe(5);
    expect(threadById("M8")!.tapDrill).toBe(6.8);
    expect(threadById("M10")!.tapDrill).toBe(8.5);
    expect(threadById("M12")!.tapDrill).toBe(10.2);
    expect(threadById("M10x1")!.tapDrill).toBe(9);
  });
});

describe("ISO 898-1 gerilme alanı ve yükler", () => {
  const near = (a: number, b: number) => expect(Math.abs(a - b) / b).toBeLessThan(0.005);
  it("gerilme alanları: M8 36,6, M12 84,3, M20 245, M30 561 mm²", () => {
    near(threadById("M8")!.As, 36.6);
    near(threadById("M12")!.As, 84.3);
    near(threadById("M20")!.As, 245);
    near(threadById("M30")!.As, 561);
  });
  it("8.8 en az kopma yükü: M8 29 200 N, M12 67 400 N, M20 203 000 N (d > 16'da Rm 830)", () => {
    const c = classById("8.8")!;
    near(boltLoads(threadById("M8")!, c).breaking, 29200);
    near(boltLoads(threadById("M12")!, c).breaking, 67400);
    near(boltLoads(threadById("M20")!, c).breaking, 203000);
  });
  it("10.9 M12 kopma 87 700 N; 8.8 M12 deneme yükü 48 900 N", () => {
    near(boltLoads(threadById("M12")!, classById("10.9")!).breaking, 87700);
    near(boltLoads(threadById("M12")!, classById("8.8")!).proof, 48900);
  });
  it("sınıf kodu çözümü: 8.8 → Rm 800, Re 640", () => {
    expect(decodeClass("8.8")).toEqual({ rm: 800, re: 640, ratio: 0.8 });
    expect(decodeClass("10,9")!.re).toBe(900);
    expect(decodeClass("abc")).toBeNull();
  });
});

describe("vida tanıma", () => {
  it("7,9 mm ölçülen vida M8; adım 1 verilirse M8x1", () => {
    expect(identifyThread(7.9)[0].id).toBe("M8");
    expect(identifyThread(7.9, 1)[0].id).toBe("M8x1");
  });
});

describe("boru dişleri", () => {
  it("G 1/2 diş dibi 18,631 mm, G 1 30,291 mm (ISO 228-1)", () => {
    expect(PIPE_THREADS.find((p) => p.size === "1/2")!.bspMinor).toBeCloseTo(18.631, 2);
    expect(PIPE_THREADS.find((p) => p.size === "1")!.bspMinor).toBeCloseTo(30.291, 2);
  });
  it("kumpasla 20,8 mm ölçülen diş 1/2 inç", () => {
    expect(identifyPipeThread(20.8).bsp.size).toBe("1/2");
    expect(identifyPipeThread(20.8).npt.size).toBe("1/2");
  });
});
