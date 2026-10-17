import { describe, expect, it } from "vitest";
import { getFloatingButtonLabels } from "../app/converter/floatingButtonLabels";

describe("getFloatingButtonLabels", () => {
  it("uses Turkish on Turkish pages without English text", () => {
    const l = getFloatingButtonLabels("/bmi-hesaplama");
    expect(l.favoriteAdd).toBe("Favorilere ekle");
    expect(Object.values(l).join(" ")).not.toMatch(/ \/ /);
  });
  it("uses English on English pages and falls back to English for other locales", () => {
    expect(getFloatingButtonLabels("/en/foo").copyLink).toBe("Copy link");
    expect(getFloatingButtonLabels("/fr/foo").copyLink).toBe("Copy link");
  });
});
