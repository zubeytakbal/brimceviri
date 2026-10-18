import { describe, expect, it } from "vitest";
import { estimatedAverageGlucose, hba1cToIfcc, ifccToHba1c, LAB_TESTS, toConventional, toSi } from "../app/converter/lab/labValues";

const t = (id: string) => LAB_TESTS.find((x) => x.id === id)!;

describe("tahlil değerleri", () => {
  it("kolesterol 200 mg/dL ≈ 5,17 mmol/L; trigliserid 150 mg/dL ≈ 1,69 mmol/L", () => {
    expect(toSi(t("kolesterol"), 200)).toBeCloseTo(5.17, 2);
    expect(toSi(t("trigliserid"), 150)).toBeCloseTo(1.69, 2);
  });
  it("glukoz 100 mg/dL ≈ 5,55 mmol/L; kreatinin 1 mg/dL = 88,4 µmol/L", () => {
    expect(toSi(t("glukoz"), 100)).toBeCloseTo(5.55, 2);
    expect(toSi(t("kreatinin"), 1)).toBeCloseTo(88.4, 6);
  });
  it("ters yön tutarlı", () => {
    for (const test of LAB_TESTS) expect(toConventional(test, toSi(test, 7.3))).toBeCloseTo(7.3, 9);
  });
  it("HbA1c %6,5 = 48 mmol/mol; %7 → eAG 154 mg/dL", () => {
    expect(Math.round(hba1cToIfcc(6.5))).toBe(48);
    expect(ifccToHba1c(53)).toBeCloseTo(7.0, 1);
    expect(estimatedAverageGlucose(7)).toBeCloseTo(154.2, 1);
  });
});
