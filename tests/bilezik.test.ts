import { describe, expect, it } from "vitest";
import { bilezikKarsiligi } from "../app/converter/turkishAltin";

describe("çeyrek → bilezik", () => {
  it("10 çeyrek: işçiliksiz ≈ 17,5 g, 30 milyem işçilikle ≈ 16,95 g", () => {
    const r = bilezikKarsiligi({ "ceyrek-altin": 10 }, 30)!;
    expect(r.brut).toBeCloseTo(17.54, 2);
    expect(r.has).toBeCloseTo(16.077, 2);
    expect(r.isciliksiz).toBeCloseTo(17.55, 1);
    expect(r.iscilikli).toBeCloseTo(16.99, 1);
    expect(r.iscilikli).toBeLessThan(r.isciliksiz);
  });
  it("karışık ve geçersiz", () => {
    expect(bilezikKarsiligi({ "ceyrek-altin": 2, "yarim-altin": 1 }, 0)!.brut).toBeCloseTo(7.016, 3);
    expect(bilezikKarsiligi({}, 30)).toBeNull();
  });
});
