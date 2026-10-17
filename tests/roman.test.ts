import { describe, expect, it } from "vitest";
import { fromRoman, toRoman } from "../app/converter/text/roman";

describe("roma rakamları", () => {
  it("sayıdan Roma rakamına", () => {
    expect(toRoman(1)).toBe("I");
    expect(toRoman(4)).toBe("IV");
    expect(toRoman(1923)).toBe("MCMXXIII");
    expect(toRoman(2026)).toBe("MMXXVI");
    expect(toRoman(3999)).toBe("MMMCMXCIX");
    expect(toRoman(5000)).toBe("V̅");
    expect(toRoman(0)).toBeNull();
  });
  it("Roma rakamından sayıya", () => {
    expect(fromRoman("mcmxxiii")).toEqual({ value: 1923, canonical: "MCMXXIII", standard: true });
    expect(fromRoman("XXI")!.value).toBe(21);
    expect(fromRoman("IIII")).toEqual({ value: 4, canonical: "IV", standard: false });
    expect(fromRoman("ABC")).toBeNull();
    expect(fromRoman(toRoman(12345)!)!.value).toBe(12345);
  });
  it("1–3999 gidiş dönüş", () => {
    for (let n = 1; n < 4000; n++) expect(fromRoman(toRoman(n)!)!.value).toBe(n);
  });
});
