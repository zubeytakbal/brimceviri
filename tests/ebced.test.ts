import { describe, expect, it } from "vitest";
import { ebcedValue, numberToEbced } from "../app/converter/text/ebced";

describe("ebced hesabı", () => {
  it("besmele 786 eder", () => {
    expect(ebcedValue("بسم الله الرحمن الرحيم").total).toBe(786);
  });

  it("İstanbul'un fethi: beldetün tayyibetün = 857 (ة te sayılır)", () => {
    expect(ebcedValue("بلدة طيبة").total).toBe(857);
    expect(ebcedValue("بلدة طيبة", "he").total).toBe(67);
  });

  it("harekeler sayılmaz, Osmanlı harfleri benzer harfin değerini alır", () => {
    expect(ebcedValue("مُحَمَّد").total).toBe(92);
    expect(ebcedValue("چ").total).toBe(3);
    expect(ebcedValue("abc").unknown).toBe(3);
  });

  it("sayıdan harfe", () => {
    expect(numberToEbced(1453)).toBe("غتنج");
    expect(numberToEbced(786)).toBe("ذفو");
    expect(numberToEbced(2000)).toBe("بغ");
    expect(numberToEbced(0)).toBeNull();
    expect(ebcedValue(numberToEbced(1923)!).total).toBe(1923);
  });
});
