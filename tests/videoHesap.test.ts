import { describe, expect, it } from "vitest";
import {
  ciftYukseklik,
  hedefBitHizi,
  hedefUlasilabilir,
  kaliteBitHizi,
  MIN_VIDEO_BPS,
  onerilenGenislik,
} from "../app/converter/video/videoHesap";

describe("videoHesap", () => {
  it("hedef boyuttan bit hızını hesaplar", () => {
    // 25 MB, 60 sn, 128 kbps ses → 25e6*8*0.94/60 - 128000 = 3 005 333
    expect(hedefBitHizi(25, 60, 128_000)).toBe(3_005_333);
    expect(hedefBitHizi(1, 3600, 128_000)).toBe(MIN_VIDEO_BPS);
  });
  it("ulaşılabilirliği ve çözünürlük önerisini verir", () => {
    expect(hedefUlasilabilir(25, 60, 128_000)).toBe(true);
    expect(hedefUlasilabilir(1, 3600, 128_000)).toBe(false);
    expect(onerilenGenislik(3_000_000, 1920)).toBe(1280);
    expect(onerilenGenislik(5_000_000, 1280)).toBe(1280);
    expect(onerilenGenislik(200_000, 1920)).toBe(480);
  });
  it("kalite bit hızı ve çift yükseklik", () => {
    expect(kaliteBitHizi(1280, 720, "orta")).toBe(1_658_880);
    expect(ciftYukseklik(854, 1920, 1080)).toBe(480);
    expect(ciftYukseklik(640, 1080, 1920) % 2).toBe(0);
  });
});
