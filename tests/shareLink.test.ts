import { describe, expect, it } from "vitest";
import { buildShareUrl } from "../app/converter/shareLink";

describe("buildShareUrl", () => {
  it("drops hash and tracking params but keeps others", () => {
    expect(buildShareUrl("https://birimceviri.app/bmi?kg=70&utm_source=x&fbclid=1#sonuc")).toBe(
      "https://birimceviri.app/bmi?kg=70"
    );
  });
  it("leaves clean urls untouched", () => {
    expect(buildShareUrl("https://birimceviri.app/en/foo")).toBe("https://birimceviri.app/en/foo");
  });
});
