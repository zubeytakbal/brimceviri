import { describe, expect, it } from "vitest";
import { convertRedenomination } from "../app/converter/money/redenomination";

// Oranlar: 5083 sayılı Kanun (1 YTL = 1.000.000 TL), Azerbaycan 2006 ve Türkmenistan 2009 (1 yeni = 5.000 eski manat).
describe("para sadeleştirme", () => {
  it("eski TL → TL", () => {
    expect(convertRedenomination("tr", 1_000_000, "eski-tl", "tl")).toBe(1);
    expect(convertRedenomination("tr", 250_000_000, "eski-tl", "ytl")).toBe(250);
    expect(convertRedenomination("tr", 7.5, "tl", "eski-tl")).toBe(7_500_000);
    expect(convertRedenomination("tr", 3, "ytl", "tl")).toBe(3);
  });
  it("manatlar", () => {
    expect(convertRedenomination("az", 100_000, "azm", "azn")).toBe(20);
    expect(convertRedenomination("tm", 5_000, "tmm", "tmt")).toBe(1);
  });
  it("farklı ülkelerin paraları birbirine çevrilmez", () => {
    expect(convertRedenomination("tr", 1, "azm", "tl")).toBeNull();
  });
});
