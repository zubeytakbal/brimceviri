import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { measureQuality } from "../scripts/qualityGuard";

const SHARED = "Bu blok her sayfada aynı şekilde tekrar eden ortak bir uyarı metnidir ve özgün sayılmamalıdır.";

function page(title: string, description: string, body: string) {
  return `<html><head><title>${title}</title><meta name="description" content="${description}"/></head><body><main>${body}</main></body></html>`;
}

function prose(seed: number, words: number) {
  return Array.from({ length: words }, (_, i) => `kelime${seed}x${i}`).join(" ");
}

function site(files: Record<string, string>) {
  const root = mkdtempSync(join(tmpdir(), "quality-"));
  for (const [path, html] of Object.entries(files)) {
    mkdirSync(join(root, path, ".."), { recursive: true });
    writeFileSync(join(root, path), html);
  }
  return root;
}

describe("qualityGuard", () => {
  it("ortak blokları özgün metin saymaz ve kusurları ayırt eder", () => {
    const files: Record<string, string> = {};
    for (let i = 0; i < 5; i++) {
      files[`a${i}.html`] = page(`Başlık ${i}`, `Açıklama ${i}`, `<h1>A${i}</h1><h2>x</h2><h2>y</h2><p>${SHARED}</p><p>${prose(i, 200)}</p>`);
    }
    files["kisa.html"] = page("Kısa", "Kısa açıklama", `<h1>K</h1><p>${SHARED}</p><p>${prose(9, 20)}</p>`);
    files["linkler.html"] = page(
      "Linkler",
      "Açıklama 0",
      `<h1>L</h1><h2>a</h2><h2>b</h2><p>${prose(7, 200)}</p>${Array.from({ length: 300 }, (_, i) => `<a href="/${i}">bağlantı${i}</a>`).join("")}`,
    );
    files["gizli.html"] = page("Gizli", "x", "").replace("<head>", '<head><meta name="robots" content="noindex"/>');
    files["en/x.html"] = page("Başlık 0", "Açıklama 0", `<h1>E</h1><h2>a</h2><h2>b</h2><p>${prose(5, 200)}</p>`);

    const result = Object.fromEntries(measureQuality(site(files)).map((p) => [p.url, p]));

    expect(result["/gizli"]).toBeUndefined();
    expect(result["/a1"].kusurlar).toEqual([]);
    expect(result["/a1"].uniqueChars).toBeLessThan(result["/a1"].chars - SHARED.length + 10);
    expect(result["/a0"].kusurlar).toEqual(["meta"]);
    expect(result["/kisa"].kusurlar).toEqual(["ozgun-metin", "yapi"]);
    expect(result["/linkler"].kusurlar).toEqual(["link-yigini", "meta"]);
    expect(result["/en/x"].locale).toBe("en");
    expect(result["/en/x"].kusurlar).toEqual([]);
  });
});
