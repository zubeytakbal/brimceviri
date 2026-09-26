// Latin alfabeli dillerde bolum adresleri o dilde (orn. /sv/enhetsguider).
// Eski Ingilizce adresler (/sv/unit-guides) yalnizca next.config.ts'deki
// kalici yonlendirmelerde gecebilir; kodda yeniden kullanilmasin.
import { execSync } from "node:child_process";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = path.resolve(__dirname, "..");
const OLD_PATH =
  "/(sv|no|da|pt|es|es-419|it|nl)/(unit-guides|categories|historical-units|kitchen-measurement-converter|recipe-converter|shoe-size-converter)([^a-z0-9-]|$)|/fr/(unit-guides|historical-units|kitchen-measurement-converter|recipe-converter|shoe-size-converter)([^a-z0-9-]|$)|/uz/(about|contact|privacy|terms)([^a-z0-9-]|$)";

describe("dile ozel bolum adresleri", () => {
  it("kodda eski Ingilizce bolum adresi kullanilmiyor", () => {
    const output = execSync(`git grep -nE '${OLD_PATH}' -- app || true`, { cwd: ROOT }).toString().trim();
    expect(output).toBe("");
  });
});
