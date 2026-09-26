// Ceviri kalite testleri.
// - Ozel harfleri bozulmus kelimeler ("langd" yerine "längd" gibi) geri gelmesin.
// - Ayni kelimede hem Iskandinav hem Turkce harf olmasin ("ärşın" gibi arac hatalari).
// - Bir dilin bolumune yeni cevrilmemis Ingilizce metin eklenmesin. Bugun var olan
//   cevrilmemis metinler englishBaseline.json'da; bu liste yalnizca kucultulebilir.
//   Bir metni cevirdikten sonra listeyi guncellemek icin:
//   UPDATE_I18N_BASELINE=1 npx vitest run tests/i18n
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import forbiddenWords from "./forbiddenWords.json";
import { LOCALES, type Locale, localeSegments, looksEnglish } from "./localeText";

const BASELINE_FILE = path.join(__dirname, "englishBaseline.json");
const baseline: Record<string, string[]> = fs.existsSync(BASELINE_FILE)
  ? JSON.parse(fs.readFileSync(BASELINE_FILE, "utf8"))
  : {};

const locales = Object.keys(LOCALES) as Locale[];
const segmentsByLocale = new Map(locales.map((locale) => [locale, localeSegments(locale)]));
const WORD = /[\p{L}]+/gu;

describe("ceviri kalitesi", () => {
  it.each(Object.keys(forbiddenWords).filter((key) => !key.startsWith("_")))(
    "%s: bozuk (ozel harfsiz) yazim yok",
    (locale) => {
      const forbidden = new Set((forbiddenWords as unknown as Record<string, string[]>)[locale]);
      const hits = segmentsByLocale
        .get(locale as Locale)!
        .filter((segment) => !looksEnglish(segment.text))
        .flatMap((segment) =>
          (segment.text.match(WORD) ?? [])
            .filter((word) => forbidden.has(word.toLowerCase()))
            .map((word) => `${segment.file}:${segment.line} "${word}"`)
        );
      expect(hits).toEqual([]);
    }
  );

  it.each(locales)("%s: ayni kelimede Iskandinav ve Turkce harf karismiyor", (locale) => {
    const mixed = segmentsByLocale
      .get(locale)!
      .flatMap((segment) =>
        (segment.text.match(WORD) ?? [])
          .filter((word) => /[åäöæø]/i.test(word) && /[şğı]/i.test(word))
          .map((word) => `${segment.file}:${segment.line} "${word}"`)
      );
    expect(mixed).toEqual([]);
  });

  it("yeni cevrilmemis Ingilizce metin eklenmemis", () => {
    const current: Record<string, string[]> = {};
    for (const locale of locales) {
      if (locale === "en") continue;
      const keys = segmentsByLocale
        .get(locale)!
        .filter((segment) => looksEnglish(segment.text))
        .map((segment) => `${segment.file} :: ${segment.text.trim()}`);
      current[locale] = [...new Set(keys)].sort();
    }

    if (process.env.UPDATE_I18N_BASELINE) {
      fs.writeFileSync(BASELINE_FILE, JSON.stringify(current, null, 1) + "\n");
      return;
    }

    const added = Object.entries(current).flatMap(([locale, keys]) =>
      keys.filter((key) => !(baseline[locale] ?? []).includes(key)).map((key) => `${locale}: ${key}`)
    );
    expect(added).toEqual([]);
  });
});
