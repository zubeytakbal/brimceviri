// Kategori sayfalarindaki cevirici acilir listesi icin birim etiketlerini
// sayfanin dilinde hazirlar. categoryUnitOptions yalnizca tr/en/de/uz/nl
// etiketlerini bildigi icin diger dillerde birimler Ingilizce gorunuyordu.
// Bu dosya sunucu tarafinda calisir (sayfa -> unitOptions prop'u); dil
// dosyalarini istemci paketine eklememek icin bilesenin icinde cagrilmaz.
// O dilde sayfasi olmayan birimler Ingilizce etikette kalir.
import { getCategoryUnitOptions } from "../components/categoryUnitOptions";
import { bengaliUnitPages } from "./localizedBengaliUnitPages";
import { frenchUnitPages } from "./localizedFrenchUnitPages";
import { italianUnitPages } from "./localizedItalianUnitPages";
import { portugueseUnitPages } from "./localizedPortugueseUnitPages";
import { spanishUnitPages } from "./localizedSpanishUnitPages";

type LocalizedUnitName = { category: string; unit: string; name: string };

const unitPagesByLocale = {
  bn: bengaliUnitPages,
  fr: frenchUnitPages,
  it: italianUnitPages,
  pt: portugueseUnitPages,
  es: spanishUnitPages,
} satisfies Record<string, LocalizedUnitName[]>;

export type UnitOptionLocale = keyof typeof unitPagesByLocale;

export function getLocalizedUnitOptions(category: string, locale: UnitOptionLocale) {
  const pages: LocalizedUnitName[] = unitPagesByLocale[locale];

  return getCategoryUnitOptions(category, locale).flatMap((option) => {
    const pageName = pages.find((page) => page.category === category && page.unit === option.value)?.name;

    return [{ ...option, label: pageName ?? option.label }];
  });
}
