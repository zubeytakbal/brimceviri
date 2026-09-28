import type { Metadata } from "next";
import { SITE_NAME } from "./siteConfig";

// Arama sonuclarinda basliklar ~60 karakterden sonra kesilir. Kok layout her basliga
// " | BirimCeviri.app" ekler; sigmayan basliklarda bu ek kaldirilir ve gerekirse
// sayfanin verdigi daha kisa bir alternatif kullanilir.

export const TITLE_MAX = 60;
const SUFFIX = ` | ${SITE_NAME}`;

/**
 * Adaylar en ayrintilidan en kisaya sirali verilir. Sonekle birlikte sigan ilk aday
 * olduğu gibi (sonekli) doner; hicbiri sigmazsa sonek olmadan sigan ilk aday, o da
 * yoksa en kisa aday sonekisiz kullanilir.
 */
export function seoTitle(...candidates: string[]): NonNullable<Metadata["title"]> {
  const list = candidates.filter(Boolean);
  const withSuffix = list.find((t) => t.length + SUFFIX.length <= TITLE_MAX);
  if (withSuffix) return withSuffix;
  const bare = list.find((t) => t.length <= TITLE_MAX) ?? list.reduce((a, b) => (b.length < a.length ? b : a));
  return { absolute: bare };
}

/** Sosyal paylasim basliklari icin duz metin (sonek eklenmez). */
export function plainTitle(title: NonNullable<Metadata["title"]>): string {
  if (typeof title === "string") return title;
  if ("absolute" in title && title.absolute) return title.absolute;
  return "default" in title ? String(title.default) : "";
}
