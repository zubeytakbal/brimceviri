// Kategori sayfalarindaki cevirici acilir listesi icin birim etiketlerini
// sayfanin dilinde hazirlar. categoryUnitOptions yalnizca tr/en/de/uz/nl
// etiketlerini bildigi icin diger dillerde birimler Ingilizce gorunuyordu.
// Bu dosya sunucu tarafinda calisir (sayfa -> unitOptions prop'u); dil
// dosyalarini istemci paketine eklememek icin bilesenin icinde cagrilmaz.
// O dilde sayfasi olmayan birimler Ingilizce etikette kalir.
import { getCategoryUnitOptions } from "../components/categoryUnitOptions";
import { bengaliUnitPages } from "./localizedBengaliUnitPages";
import { danishUnitPages } from "./localizedDanishUnitPages";
import { es419UnitPages } from "./localizedEs419UnitPages";
import { frenchUnitPages } from "./localizedFrenchUnitPages";
import { italianUnitPages } from "./localizedItalianUnitPages";
import { norwegianUnitPages } from "./localizedNorwegianUnitPages";
import { portugueseUnitPages } from "./localizedPortugueseUnitPages";
import { spanishUnitPages } from "./localizedSpanishUnitPages";
import { swedishUnitPages } from "./localizedSwedishUnitPages";

type LocalizedUnitName = { category: string; unit: string; name: string };

const unitPagesByLocale = {
  bn: bengaliUnitPages,
  da: danishUnitPages,
  "es-419": es419UnitPages,
  fr: frenchUnitPages,
  it: italianUnitPages,
  no: norwegianUnitPages,
  pt: portugueseUnitPages,
  es: spanishUnitPages,
  sv: swedishUnitPages,
} satisfies Record<string, LocalizedUnitName[]>;

export type UnitOptionLocale = keyof typeof unitPagesByLocale;

export function getLocalizedUnitOptions(category: string, locale: UnitOptionLocale) {
  const pages: LocalizedUnitName[] = unitPagesByLocale[locale];

  return getCategoryUnitOptions(category, locale).map((option) => ({
    ...option,
    label:
      pages.find((page) => page.category === category && page.unit === option.value)?.name ??
      option.label,
  }));
}
