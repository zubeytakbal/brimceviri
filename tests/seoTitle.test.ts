import { describe, expect, it } from "vitest";
import { plainTitle, seoTitle } from "../app/seoTitle";

describe("seoTitle", () => {
  it("keeps the site suffix when the title fits", () => {
    expect(seoTitle("Ar Nedir?")).toBe("Ar Nedir?");
  });

  it("falls back to a shorter candidate that fits with the suffix", () => {
    const long = "Kilogram-kuvvet/Santimetrekare Nedir? Tanımı, Tarihçesi ve Bilimsel Bilgiler";
    expect(seoTitle(long, "Kilogram-kuvvet/Santimetrekare Nedir?")).toBe("Kilogram-kuvvet/Santimetrekare Nedir?");
  });

  it("drops the suffix when only the bare title fits", () => {
    const t = "Afyonkarahisar'dan İllere Mesafe (Karayolu ve Kuş Uçuşu)";
    expect(seoTitle(t)).toEqual({ absolute: t });
    expect(plainTitle(seoTitle(t))).toBe(t);
  });

  it("uses the shortest candidate when nothing fits", () => {
    const a = "x".repeat(90);
    const b = "y".repeat(70);
    expect(seoTitle(a, b)).toEqual({ absolute: b });
  });
});
