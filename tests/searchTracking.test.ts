import { describe, expect, it } from "vitest";
import { sanitizeSearchTerm } from "../app/components/useSearchTracking";

describe("site search tracking", () => {
  it("keeps normal searches, normalised", () => {
    expect(sanitizeSearchTerm("  Kaza   Namazı ")).toBe("kaza namazı");
    expect(sanitizeSearchTerm("5 km mil")).toBe("5 km mil");
    expect(sanitizeSearchTerm("x".repeat(150))).toHaveLength(100);
  });

  it("drops too short input and possible personal data", () => {
    expect(sanitizeSearchTerm("km")).toBeNull();
    expect(sanitizeSearchTerm("ali@example.com")).toBeNull();
    expect(sanitizeSearchTerm("0532 123 45 67")).toBeNull();
    expect(sanitizeSearchTerm("+90-532-1234567")).toBeNull();
  });
});
