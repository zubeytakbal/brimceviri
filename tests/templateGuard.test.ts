import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { checkTemplates } from "../scripts/templateGuard";

const words = "elma armut kiraz erik ayva nar incir dut kayısı şeftali vişne çilek kavun karpuz üzüm limon".split(" ");
let dir = "";

function page(path: string, text: string) {
  mkdirSync(join(dir, path, ".."), { recursive: true });
  writeFileSync(join(dir, path), `<html><body><nav>menü</nav><main><p>${text}</p></main></body></html>`);
}

afterEach(() => rmSync(dir, { recursive: true, force: true }));

describe("şablon sayfa denetimi", () => {
  it("yalnızca adı değişen kardeş sayfaları yakalar", () => {
    dir = mkdtempSync(join(tmpdir(), "guard-"));
    const kalip = Array.from({ length: 60 }, (_, i) => words[i % words.length]).join(" ");
    for (let i = 0; i < 6; i++) page(`kopya/s${i}.html`, `sayfa ${i} ${kalip}`);
    const r = checkTemplates(dir);
    expect(r.failed.map((f) => f.group)).toEqual(["/kopya"]);
  });

  it("özgün içerikli kardeş sayfaları geçirir", () => {
    dir = mkdtempSync(join(tmpdir(), "guard-"));
    for (let i = 0; i < 6; i++) {
      const metin = Array.from({ length: 60 }, (_, k) => `${words[(k * (i + 2)) % words.length]}${i}${k}`).join(" ");
      page(`ozgun/s${i}.html`, metin);
    }
    expect(checkTemplates(dir).failed).toEqual([]);
  });
});
