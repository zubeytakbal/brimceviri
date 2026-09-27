import { describe, expect, it } from "vitest";
import {
  cgpaToPercentage,
  cgpaUniversities,
  findCgpaUniversity,
  formulaText,
  percentageToCgpa,
  sgpaToCgpa,
} from "../app/converter/india/cgpaUniversities";

const u = (slug: string) => findCgpaUniversity(slug)!;

describe("CGPA to percentage", () => {
  it("applies each university's official formula", () => {
    expect(cgpaToPercentage(8, u("vtu"))).toBeCloseTo(72.5, 10);
    expect(cgpaToPercentage(7.5, u("anna-university"))).toBeCloseTo(75, 10);
    expect(cgpaToPercentage(7.5, u("jntuh"))).toBeCloseTo(70, 10);
    expect(cgpaToPercentage(7.5, u("gtu"))).toBeCloseTo(70, 10);
    expect(cgpaToPercentage(6.25, u("makaut"))).toBeCloseTo(55, 10);
    expect(cgpaToPercentage(8.2, u("delhi-university"))).toBeCloseTo(77.9, 10);
    expect(cgpaToPercentage(8, u("sppu"))).toBeCloseTo(71.2, 10);
    expect(cgpaToPercentage(9.5, u("cbse"))).toBeCloseTo(90.25, 10);
    expect(cgpaToPercentage(7.5, u("ikgptu"))).toBeCloseTo(75, 10);
    expect(cgpaToPercentage(8, u("calicut-university"))).toBeCloseTo(80, 10);
    expect(cgpaToPercentage(8, u("dbatu"))).toBeCloseTo(75, 10);
    expect(cgpaToPercentage(8, u("kerala-university"))).toBeCloseTo(77.5, 10);
    expect(cgpaToPercentage(7.5, u("jntua"))).toBeCloseTo(70, 10);
  });

  it("rejects values outside the scale and reverses the formula", () => {
    expect(cgpaToPercentage(11, u("vtu"))).toBeNull();
    expect(percentageToCgpa(72.5, u("vtu"))).toBeCloseTo(8, 10);
    expect(percentageToCgpa(100, u("vtu"))).toBeNull();
  });

  it("describes the formula", () => {
    expect(formulaText(u("vtu"))).toBe("Percentage = (CGPA − 0.75) × 10");
    expect(formulaText(u("cbse"))).toBe("Percentage = CGPA × 9.5");
  });

  it("has unique slugs, https sources and a verification date", () => {
    const slugs = cgpaUniversities.map((entry) => entry.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const entry of cgpaUniversities) {
      expect(/^https?:\/\//.test(entry.sourceUrl)).toBe(true);
      expect(entry.verifiedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});

describe("SGPA to CGPA", () => {
  it("weights by credits", () => {
    expect(sgpaToCgpa([{ sgpa: 8, credits: 20 }, { sgpa: 9, credits: 20 }])).toBeCloseTo(8.5, 10);
    expect(sgpaToCgpa([{ sgpa: 8, credits: 10 }, { sgpa: 9, credits: 30 }])).toBeCloseTo(8.75, 10);
    expect(sgpaToCgpa([])).toBeNull();
  });
});

describe("source change alerts", () => {
  it("stays active until the formula is re-verified after the change", async () => {
    const { isAlertActive } = await import("../app/converter/cgpaSourceMonitor");
    expect(isAlertActive({ verifiedOn: "2026-09-27" }, "2026-10-05T03:00:00.000Z")).toBe(true);
    expect(isAlertActive({ verifiedOn: "2026-10-06" }, "2026-10-05T03:00:00.000Z")).toBe(false);
    expect(isAlertActive({ verifiedOn: "2026-09-27" }, null)).toBe(false);
  });
});

describe("university requests", () => {
  it("validates and normalises names", async () => {
    const { validateUniversityName, requestKey } = await import("../app/converter/cgpaRequests");
    expect(validateUniversityName("  University   of Mumbai ")).toBe("University of Mumbai");
    expect(validateUniversityName("x")).toBeNull();
    expect(validateUniversityName("see https://spam.example")).toBeNull();
    expect(validateUniversityName("12345")).toBeNull();
    expect(validateUniversityName(42)).toBeNull();
    expect(requestKey("University of Mumbai!")).toBe(requestKey("university  of mumbai"));
  });
});
