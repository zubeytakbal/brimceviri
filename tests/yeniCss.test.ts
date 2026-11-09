import { readFileSync } from "node:fs";
import postcss from "postcss";
import { describe, expect, it } from "vitest";

// Tarayici bozuk CSS'i sessizce atlar ama derleme durur; hatayi push'tan once yakalar.
describe("yeni.css", () => {
  it("söz dizimi geçerli", () => {
    const css = readFileSync("app/components/yeni/yeni.css", "utf8");
    expect(() => postcss.parse(css)).not.toThrow();
  });
});
