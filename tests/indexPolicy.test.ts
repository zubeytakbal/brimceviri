import { describe, expect, it } from "vitest";
import { isClosedPath } from "../app/indexPolicy";

describe("dizin politikası", () => {
  it("tıklama alan sayfa her dilde açık", () => {
    expect(isClosedPath("/en/24k-gold-to-22k-gold")).toBe(false);
  });
  it("kısmi dillerde ana sayfa, yasal sayfalar ve tıklama alanlar açık", () => {
    expect(isClosedPath("/en")).toBe(false);
    expect(isClosedPath("/en/privacy")).toBe(false);
    expect(isClosedPath("/de/datenschutz")).toBe(false);
  });
  it("İngilizce ve Almanca tamamen açık", () => {
    expect(isClosedPath("/en/meters-to-centimeters")).toBe(false);
    expect(isClosedPath("/de/kalenderwoche")).toBe(false);
  });
  it("Türkçe sayfaların hepsi açık", () => {
    expect(isClosedPath("/")).toBe(false);
    expect(isClosedPath("/metre-santimetre")).toBe(false);
    expect(isClosedPath("/roma-rakamlari-cevirme")).toBe(false);
    expect(isClosedPath("/malzeme-ozellikleri")).toBe(false);
    expect(isClosedPath("/malzeme-ozellikleri/bal")).toBe(false);
    expect(isClosedPath("/altin-hesaplama/ceyrek-altin")).toBe(false);
    expect(isClosedPath("/bilim-hesaplayicilari/fizik/egik-atis-hesaplama")).toBe(false);
    expect(isClosedPath("/saat-hesaplama")).toBe(false);
  });
});
