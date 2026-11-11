import { describe, expect, it } from "vitest";
import { formatOkunur, formatSayi, sayiOku } from "../app/components/yeni/sayi";

describe("sayi bicimi", () => {
  it("metin ve tablolarda e-9 yerine 10'un kuvveti yazilir", () => {
    expect(formatOkunur(1e-9)).toBe("1 × 10⁻⁹");
    expect(formatOkunur(6.213712e-7)).toBe("6,213712 × 10⁻⁷");
    expect(formatOkunur(9.46073e15)).toBe("9,46073 × 10¹⁵");
    expect(formatOkunur(1000)).toBe("1.000");
  });
  it("cevirici kutusundaki bilimsel deger geri okunabilir", () => {
    for (const v of [1e-9, 6.213712e-7, 3.085678e16]) expect(sayiOku(formatSayi(v))).toBeCloseTo(v, 20);
    expect(formatSayi(1e-12)).toBe("1e-12");
  });
});
