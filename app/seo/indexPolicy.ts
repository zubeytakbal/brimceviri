import { conversionPages } from "../converter/conversionPages";
import { TURKISH_SEO_OVERRIDES } from "../converter/turkishConversionSeo";
import { GERMAN_SEO_OVERRIDES } from "../converter/germanConversionSeo";
import { englishEditorialConversions } from "../converter/englishEditorialConversions";
import {
  englishConversionPages,
  findEnglishPageByTurkishSlug,
} from "../converter/localizedConversionPages";
import {
  germanConversionPages,
  findGermanPageByTurkishSlug,
} from "../converter/localizedGermanConversionPages";
import { bengaliConversionPages } from "../converter/localizedBengaliConversionPages";
import { findEnglishStandaloneToolBySlug } from "../i18n/englishStandaloneTools";
import { findGermanStandaloneToolBySlug } from "../i18n/germanStandaloneTools";
import { findArabicStandaloneToolBySlug } from "../i18n/arabicStandaloneTools";

// AdSense incelemesi site haritasındaki şablon URL sayısına bakıyor.
// Tıklama alan araçlar ve özgün içerikli çeviriler dizinde kalır; geri kalan
// sayfalar yayında durur ama noindex + sitemap dışı bırakılır.

/** Bu dillerin tamamı şablon çeviri; neredeyse hiç tıklama yok. */
export const NOINDEX_LOCALES = ["uz", "fr", "es", "pt", "it", "nl", "sv", "no", "da"] as const;

const NOINDEX_LOCALE_SET = new Set<string>(NOINDEX_LOCALES);

/**
 * Alt sayfaları dizinden çıkarılır; hub'ın kendisi (sondaki / olmadan) kalır.
 * Üç parçalı yollar (il-il mesafe) ayrıca aşağıda kesilir.
 */
const NOINDEX_CHILD_PREFIXES = [
  "/ulkeler/",
  "/en/countries/",
  "/de/laender/",
  "/dunya-saatleri/",
  "/en/world-clock/",
  "/de/uhrzeit/",
  "/birimler/",
  "/en/units/",
  "/de/einheiten/",
  "/malzeme-ozellikleri/",
  "/gokcisimleri-ozellikleri/",
  "/bilim-hesaplayicilari/kimya/periyodik-tablo/",
  "/de/periodensystem/",
  "/bilim-hesaplayicilari/kimya/bilesikler/",
  "/il-rakimlari/",
  "/seferi-mesafe-hesaplama/",
  "/dunyanin-en-yuksek-daglari/",
];

/** Gömülebilir araçlar zaten noindex. */
const ALWAYS_NOINDEX_PREFIXES = ["/embed"];

/** popularEmbedSlugs + özel SEO metni olan Türkçe çiftler. */
const TR_CONVERSION_KEEP = new Set<string>([
  "kilogram-pound",
  "pound-kilogram",
  "santigrat-fahrenhayt",
  "fahrenhayt-santigrat",
  "kilometre-mil",
  "mil-kilometre",
  "santimetre-inc",
  "inc-santimetre",
  "metre-fit",
  "fit-metre",
  "kilogram-gram",
  "gram-kilogram",
  "litre-galon",
  "galon-litre",
  "metre-santimetre",
  "santimetre-metre",
  "santimetre-milimetre",
  "milimetre-santimetre",
  "kilometre-metre",
  "metre-kilometre",
  "gram-miligram",
  "miligram-gram",
  "ons-gram",
  "gram-ons",
  "ton-kilogram",
  "kilogram-ton",
  "pound-ons",
  "ons-pound",
  "mililitre-litre",
  "litre-mililitre",
  "mil-saat-kilometre-saat",
  "kilometre-saat-mil-saat",
  "bar-psi",
  "psi-bar",
  "megabayt-gigabayt",
  "gigabayt-megabayt",
  "kilobayt-megabayt",
  "megabayt-kilobayt",
  "saniye-saat",
  "saat-saniye",
  "dakika-saat",
  "saat-dakika",
  "metrekare-fitkare",
  "fitkare-metrekare",
  "donum-dekar",
  "dekar-donum",
  "donum-hektar",
  "hektar-donum",
  "joule-kalori",
  "kalori-joule",
  "watt-saat-kilovatsaat",
  "kilovatsaat-watt-saat",
  "santigrat-kelvin",
  "kelvin-santigrat",
  "yarda-metre",
  "metre-yarda",
  "inc-fit",
  "fit-inc",
  ...Object.keys(TURKISH_SEO_OVERRIDES),
]);

const EN_CONVERSION_KEEP = new Set<string>([
  ...englishEditorialConversions.map((page) => page.slug),
]);
const DE_CONVERSION_KEEP = new Set<string>(Object.keys(GERMAN_SEO_OVERRIDES));

for (const slug of TR_CONVERSION_KEEP) {
  const en = findEnglishPageByTurkishSlug(slug);
  if (en) EN_CONVERSION_KEEP.add(en.slug);
  const de = findGermanPageByTurkishSlug(slug);
  if (de) DE_CONVERSION_KEEP.add(de.slug);
}

const TR_CONVERSION_SLUGS = new Set(conversionPages.map((page) => page.slug));
const EN_CONVERSION_SLUGS = new Set(englishConversionPages.map((page) => page.slug));
const DE_CONVERSION_SLUGS = new Set(germanConversionPages.map((page) => page.slug));
const BN_CONVERSION_SLUGS = new Set(bengaliConversionPages.map((page) => page.slug));

export function normalizePath(pathname: string): string {
  if (!pathname) return "/";
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

function firstSegment(path: string): string {
  return path.split("/").filter(Boolean)[0] ?? "";
}

function isThinLocalePath(path: string): boolean {
  const seg = firstSegment(path);
  return NOINDEX_LOCALE_SET.has(seg);
}

/** /iller-arasi-mesafe/istanbul kalır; /iller-arasi-mesafe/istanbul/adana çıkmaz. */
function isDeepPairPath(path: string): boolean {
  const parts = path.split("/").filter(Boolean);
  if (parts[0] === "iller-arasi-mesafe" && parts.length >= 3) return true;
  if (parts[0] === "de" && parts[1] === "entfernung" && parts.length >= 4) return true;
  return false;
}

function isFactoryChild(path: string): boolean {
  for (const prefix of NOINDEX_CHILD_PREFIXES) {
    if (path.startsWith(prefix)) return true;
  }
  return isDeepPairPath(path);
}

function conversionKeep(locale: "tr" | "en" | "de", slug: string): boolean {
  if (locale === "tr") return TR_CONVERSION_KEEP.has(slug);
  if (locale === "en") return EN_CONVERSION_KEEP.has(slug);
  return DE_CONVERSION_KEEP.has(slug);
}

/** Şablon çeviri sayfası mı, yoksa hesaplayıcı / araç mı? */
function isDroppedConversion(path: string): boolean {
  const parts = path.split("/").filter(Boolean);
  if (parts.length === 1 && TR_CONVERSION_SLUGS.has(parts[0])) {
    return !conversionKeep("tr", parts[0]);
  }
  if (parts.length === 2 && parts[0] === "en" && EN_CONVERSION_SLUGS.has(parts[1])) {
    if (findEnglishStandaloneToolBySlug(parts[1])) return false;
    return !conversionKeep("en", parts[1]);
  }
  if (parts.length === 2 && parts[0] === "de" && DE_CONVERSION_SLUGS.has(parts[1])) {
    if (findGermanStandaloneToolBySlug(parts[1])) return false;
    return !conversionKeep("de", parts[1]);
  }
  if (parts.length === 2 && parts[0] === "ar" && EN_CONVERSION_SLUGS.has(parts[1])) {
    if (findArabicStandaloneToolBySlug(parts[1])) return false;
    return true;
  }
  if (parts.length === 2 && parts[0] === "bn" && BN_CONVERSION_SLUGS.has(parts[1])) {
    return true;
  }
  return false;
}

export function shouldIndexPath(pathname: string): boolean {
  const path = normalizePath(pathname);
  if (ALWAYS_NOINDEX_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))) {
    return false;
  }
  if (isThinLocalePath(path)) return false;
  if (isFactoryChild(path)) return false;
  if (isDroppedConversion(path)) return false;
  return true;
}

export function pathRobots(pathname: string): { index: boolean; follow: boolean } {
  return shouldIndexPath(pathname) ? { index: true, follow: true } : { index: false, follow: true };
}

/** Cloudflare Pages `_headers` önek kuralları (kök çeviri sayfaları meta ile kapanır). */
export function noindexHeaderRules(): string {
  const prefixes = [
    ...NOINDEX_LOCALES.map((locale) => `/${locale}/`),
    ...NOINDEX_LOCALES.map((locale) => `/${locale}`),
    ...NOINDEX_CHILD_PREFIXES,
    "/embed/",
    "/embed",
  ];
  const unique = [...new Set(prefixes)];
  const lines = [
    "# AdSense dizin küçültme: şablon yolları noindex. Asıl kural app/seo/indexPolicy.ts.",
  ];
  for (const prefix of unique) {
    const pattern = prefix.endsWith("/") ? `${prefix}*` : prefix;
    lines.push(pattern, "  X-Robots-Tag: noindex, follow");
  }
  return `${lines.join("\n")}\n`;
}
