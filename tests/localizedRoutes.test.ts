// Site yalniz tr, en ve de dillerinde yayinda; kaldirilan dillerin adresleri (/sv, /fr/...) yalnizca
// postbuild'in /en'e 301 yonlendirmesinde yasar. Kodda bu dillere yeniden baglanti verilmesin.
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = path.resolve(__dirname, "..");
const KALDIRILAN = ["uz", "sv", "no", "da", "es", "ar", "bn", "it", "fr", "pt", "nl", "ru"];
const ADRES = new RegExp(`["'\`]/(${KALDIRILAN.join("|")})(/[^"'\`]*)?["'\`]`);

function dosyalar(dizin: string): string[] {
  return readdirSync(dizin).flatMap((ad) => {
    const yol = path.join(dizin, ad);
    if (statSync(yol).isDirectory()) return dosyalar(yol);
    return /\.(tsx?|mjs)$/.test(ad) ? [yol] : [];
  });
}

describe("kaldirilan diller", () => {
  it("kodda kaldirilan dillere baglanti yok", () => {
    const bulunan = dosyalar(path.join(ROOT, "app")).flatMap((f) =>
      readFileSync(f, "utf8")
        .split(/\r?\n/)
        .map((satir, i) => (ADRES.test(satir) ? `${path.relative(ROOT, f)}:${i + 1}: ${satir.trim()}` : null))
        .filter((s): s is string => s !== null),
    );
    expect(bulunan).toEqual([]);
  }, 30_000);
});
