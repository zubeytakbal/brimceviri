import { describe, expect, it } from "vitest";
import { findRelatedTools, localeFromPathname } from "../app/converter/relatedTools";

const items = [
  { id: "1", href: "/a", label: "A", categoryLabel: "Uzunluk" },
  { id: "2", href: "/b", label: "B", categoryLabel: "Uzunluk" },
  { id: "3", href: "/c/", label: "C", categoryLabel: "Uzunluk" },
  { id: "4", href: "/d", label: "D", categoryLabel: "Kütle" },
  { id: "5", href: "/b", label: "B dup", categoryLabel: "Uzunluk" },
];

describe("relatedTools", () => {
  it("returns same-category items excluding self and duplicates", () => {
    expect(findRelatedTools(items, "/a").map((i) => i.label)).toEqual(["B", "C"]);
  });
  it("handles trailing slashes and limit", () => {
    expect(findRelatedTools(items, "/c", 1).map((i) => i.label)).toEqual(["A"]);
  });
  it("returns nothing for unknown pages", () => {
    expect(findRelatedTools(items, "/zzz")).toEqual([]);
  });
  it("detects locale from path", () => {
    expect(localeFromPathname("/en/foo")).toBe("en");
    expect(localeFromPathname("/de")).toBe("de");
    expect(localeFromPathname("/bmi-hesaplama")).toBe("tr");
  });
});
