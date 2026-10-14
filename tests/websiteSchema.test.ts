import { describe, expect, it } from "vitest";
import { buildWebsiteSchema, serializeJsonLd } from "../app/converter/websiteSchema";

describe("websiteSchema", () => {
  it("builds a WebSite schema", () => {
    const schema = buildWebsiteSchema("tr");
    expect(schema["@type"]).toBe("WebSite");
    expect(schema.inLanguage).toBe("tr");
    expect(schema.url).toMatch(/^https:\/\/.+\/$/);
  });
  it("escapes < so the script tag cannot be closed", () => {
    expect(serializeJsonLd({ a: "</script>" })).not.toContain("<");
  });
});
