import { describe, expect, it } from "vitest";
import { hisabMukafaa, nisbatIstihqaq } from "../app/converter/saNihayatKhidma";

const d = (s: string) => {
  const [year, month, day] = s.split("-").map(Number);
  return { year, month, day };
};

describe("مكافأة نهاية الخدمة", () => {
  it("applies Article 84 tiers", () => {
    // 2555 يومًا = 7 سنوات بالضبط (365 × 7)
    const r = hisabMukafaa(d("2019-01-01"), d("2025-12-30"), 10000, "inhaa")!;
    expect(r.ayyam).toBe(2555);
    expect(r.shariha1).toBeCloseTo(25000);
    expect(r.shariha2).toBeCloseTo(20000);
    expect(r.mustahaqq).toBeCloseTo(45000);
  });

  it("applies Article 85 resignation shares", () => {
    const r = hisabMukafaa(
      d("2019-01-01"),
      d("2025-12-30"),
      10000,
      "istiqala",
    )!;
    expect(r.mustahaqq).toBeCloseTo(30000);
    expect(nisbatIstihqaq("istiqala", 1.99)).toBe(0);
    expect(nisbatIstihqaq("istiqala", 2)).toBeCloseTo(1 / 3);
    expect(nisbatIstihqaq("istiqala", 5)).toBeCloseTo(1 / 3);
    expect(nisbatIstihqaq("istiqala", 5.01)).toBeCloseTo(2 / 3);
    expect(nisbatIstihqaq("istiqala", 10)).toBe(1);
    expect(nisbatIstihqaq("mada87", 1)).toBe(1);
    expect(nisbatIstihqaq("mada80", 20)).toBe(0);
  });

  it("prorates partial years", () => {
    const r = hisabMukafaa(d("2024-01-01"), d("2025-07-02"), 6000, "inhaa")!;
    // 548 يومًا → 1.5014 سنة × 3000
    expect(r.mustahaqq).toBeCloseTo((548 / 365) * 3000, 5);
    expect(
      hisabMukafaa(d("2025-01-01"), d("2024-01-01"), 5000, "inhaa"),
    ).toBeNull();
  });
});
