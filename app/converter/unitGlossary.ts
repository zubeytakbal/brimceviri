// Ayrı birim rehberi sayfası olmayan dillerde (es, fr, pt, it, nl, sv, no, da, bn, ar, uz) birim bilgisi
// o dilin kategori sayfasındaki sözlükte durur. Eski rehber adresleri buraya yönlenir.
import { arabicCategoryPages } from "./localizedArabicCategoryPages";
import { arabicUnitPages } from "./localizedArabicUnitPages";
import { bengaliCategoryPages } from "./localizedBengaliCategoryPages";
import { bengaliUnitPages } from "./localizedBengaliUnitPages";
import { uzbekCategoryPages } from "./localizedUzbekCategoryPages";
import { uzbekUnitPages } from "./localizedUzbekUnitPages";
import { danishCategoryPages } from "./localizedDanishCategoryPages";
import { danishUnitPages } from "./localizedDanishUnitPages";
import { frenchCategoryPages } from "./localizedFrenchCategoryPages";
import { frenchUnitPages } from "./localizedFrenchUnitPages";
import { italianCategoryPages } from "./localizedItalianCategoryPages";
import { italianUnitPages } from "./localizedItalianUnitPages";
import { nederlandsCategoryPages } from "./localizedNederlandsCategoryPages";
import { nederlandsUnitPages } from "./localizedNederlandsUnitPages";
import { norwegianCategoryPages } from "./localizedNorwegianCategoryPages";
import { norwegianUnitPages } from "./localizedNorwegianUnitPages";
import { portugueseCategoryPages } from "./localizedPortugueseCategoryPages";
import { portugueseUnitPages } from "./localizedPortugueseUnitPages";
import { spanishCategoryPages } from "./localizedSpanishCategoryPages";
import { spanishUnitPages } from "./localizedSpanishUnitPages";
import { swedishCategoryPages } from "./localizedSwedishCategoryPages";
import { swedishUnitPages } from "./localizedSwedishUnitPages";

type Page = { slug: string; category: string };

export const GLOSSARY_LOCALES = {
  es: { guides: "/es/guias-de-unidades", categories: "/es/categorias", units: spanishUnitPages, cats: spanishCategoryPages },
  fr: { guides: "/fr/guides-des-unites", categories: "/fr/categories", units: frenchUnitPages, cats: frenchCategoryPages },
  pt: { guides: "/pt/guias-de-unidades", categories: "/pt/categorias", units: portugueseUnitPages, cats: portugueseCategoryPages },
  it: { guides: "/it/guide-alle-unita", categories: "/it/categorie", units: italianUnitPages, cats: italianCategoryPages },
  nl: { guides: "/nl/eenheidsgidsen", categories: "/nl/categorieen", units: nederlandsUnitPages, cats: nederlandsCategoryPages },
  sv: { guides: "/sv/enhetsguider", categories: "/sv/kategorier", units: swedishUnitPages, cats: swedishCategoryPages },
  no: { guides: "/no/enhetsguider", categories: "/no/kategorier", units: norwegianUnitPages, cats: norwegianCategoryPages },
  da: { guides: "/da/enhedsguider", categories: "/da/kategorier", units: danishUnitPages, cats: danishCategoryPages },
  // Bu üç dilde eski adresler tek kalıp kuralla yönlenir (Cloudflare satır sınırı).
  bn: { guides: "/bn/unit-guides", categories: "/bn/categories", units: bengaliUnitPages, cats: bengaliCategoryPages },
  ar: { guides: "/ar/unit-guides", categories: "/ar/categories", units: arabicUnitPages, cats: arabicCategoryPages },
  uz: { guides: "/uz/birliklar", categories: "/uz/turkumlar", units: uzbekUnitPages, cats: uzbekCategoryPages },
} as const satisfies Record<string, { guides: string; categories: string; units: readonly Page[]; cats: readonly Page[] }>;

const PATTERN_LOCALES = new Set<string>(["bn", "ar", "uz"]);

export type GlossaryLocale = keyof typeof GLOSSARY_LOCALES;

/** Birimin, kendi dilindeki kategori sayfasındaki sözlük girdisi: /fr/categories/longueur#pied */
export function unitGlossaryHref(locale: GlossaryLocale, unit: Page) {
  const conf = GLOSSARY_LOCALES[locale];
  const category = (conf.cats as readonly Page[]).find((c) => c.category === unit.category);
  return category ? `${conf.categories}/${category.slug}#${unit.slug}` : conf.categories;
}

/** Eski rehber adresleri → kategori sayfası (301). */
export function unitGuideRedirects() {
  return Object.entries(GLOSSARY_LOCALES).flatMap(([locale, conf]) => {
    const cats = conf.cats as readonly Page[];
    if (PATTERN_LOCALES.has(locale)) {
      return [
        { source: conf.guides, destination: conf.categories },
        { source: `${conf.guides}/:slug`, destination: conf.categories },
      ];
    }
    return [
      { source: conf.guides, destination: conf.categories },
      ...(conf.units as readonly Page[]).map((unit) => {
        const category = cats.find((c) => c.category === unit.category);
        return { source: `${conf.guides}/${unit.slug}`, destination: category ? `${conf.categories}/${category.slug}` : conf.categories };
      }),
    ];
  });
}
