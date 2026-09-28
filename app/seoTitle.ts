import type { Metadata } from "next";
import { SITE_NAME } from "./siteConfig";

// Arama sonuclarinda basliklar ~60 karakterden sonra kesilir. Kok layout her basliga
// " | BirimCeviri.app" ekler; sigmayan basliklarda bu ek kaldirilir ve gerekirse
// sayfanin verdigi daha kisa bir alternatif kullanilir.

export const TITLE_MAX = 60;
const SUFFIX = ` | ${SITE_NAME}`;

/**
 * Adaylar tercih sirasina gore (en ayrintilidan en kisaya) verilir ve sirayla denenir:
 * sonekle sigan aday sonekli, yalnizca kendisi sigan aday soneksiz kullanilir. Hicbiri
 * sigmazsa en kisa aday soneksiz kullanilir.
 */
export function seoTitle(...candidates: string[]): NonNullable<Metadata["title"]> {
  const list = candidates.filter(Boolean);
  for (const t of list) {
    if (t.length + SUFFIX.length <= TITLE_MAX) return t;
    if (t.length <= TITLE_MAX) return { absolute: t };
  }
  return { absolute: list.reduce((a, b) => (b.length < a.length ? b : a)) };
}

/** Sosyal paylasim basliklari icin duz metin (sonek eklenmez). */
export function plainTitle(title: NonNullable<Metadata["title"]>): string {
  if (typeof title === "string") return title;
  if ("absolute" in title && title.absolute) return title.absolute;
  return "default" in title ? String(title.default) : "";
}
