/// <reference types="vite/client" />
// Her dilin kategori sayfalari listesinde ayni adres (slug) veya ayni
// kategori iki kez olmamali; aksi halde ayni konu iki adreste yayinlanir.
import { describe, expect, it } from "vitest";

const modules = import.meta.glob("../app/converter/localized*CategoryPages.ts", { eager: true }) as Record<
  string,
  Record<string, unknown>
>;

const lists = Object.entries(modules).flatMap(([file, exports]) =>
  Object.entries(exports)
    .filter(([, value]) => Array.isArray(value) && (value as unknown[]).every((item) => typeof item === "object" && item !== null && "slug" in item))
    .map(([name, value]) => [`${file.split("/").pop()} ${name}`, value as Array<{ slug: string; category?: string }>] as const)
);

const duplicates = (values: string[]) => values.filter((value, index) => values.indexOf(value) !== index);

describe("kategori sayfalari", () => {
  it("en az bir liste bulundu", () => {
    expect(lists.length).toBeGreaterThan(5);
  });

  it.each(lists)("%s: adresler ve kategoriler benzersiz", (_name, pages) => {
    expect(duplicates(pages.map((page) => page.slug))).toEqual([]);
    expect(duplicates(pages.flatMap((page) => (page.category ? [page.category] : [])))).toEqual([]);
  });
});
