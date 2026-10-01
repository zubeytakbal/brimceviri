// Kategori sayfalarindaki cevirici acilir listesi icin birim etiketlerini
// sayfanin dilinde hazirlar. categoryUnitOptions yalnizca tr/en/de/uz/nl
// etiketlerini bildigi icin diger dillerde birimler Ingilizce gorunuyordu.
// Bu dosya sunucu tarafinda calisir (sayfa -> unitOptions prop'u); dil
// dosyalarini istemci paketine eklememek icin bilesenin icinde cagrilmaz.
// O dilde sayfasi olmayan birimler Ingilizce etikette kalir.
import { getCategoryUnitOptions } from "../components/categoryUnitOptions";
import { scandinavianUnitNames, type ScandinavianLocale } from "../i18n/scandinavianUnitNames";
import { bengaliUnitPages } from "./localizedBengaliUnitPages";
import { danishUnitPages } from "./localizedDanishUnitPages";
import { es419UnitPages } from "./localizedEs419UnitPages";
import { frenchUnitPages } from "./localizedFrenchUnitPages";
import { italianUnitPages } from "./localizedItalianUnitPages";
import { norwegianUnitPages } from "./localizedNorwegianUnitPages";
import { portugueseUnitPages } from "./localizedPortugueseUnitPages";
import { spanishUnitPages } from "./localizedSpanishUnitPages";
import { swedishUnitPages } from "./localizedSwedishUnitPages";
import { getUnitSystemGroup } from "./unitSystemGroups";

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

function isScandinavian(locale: UnitOptionLocale): locale is ScandinavianLocale {
  return locale === "sv" || locale === "no" || locale === "da";
}

// Türk su bardağı gibi bir yöreye özgü mutfak ölçüleri; İskandinav dillerinde
// karşılığı yoksa gösterilmez.
const REGIONAL_KITCHEN_UNITS = new Set(["hacim|sb"]);

export function getLocalizedUnitOptions(category: string, locale: UnitOptionLocale) {
  const pages: LocalizedUnitName[] = unitPagesByLocale[locale];

  return getCategoryUnitOptions(category, locale).flatMap((option) => {
    const pageName = pages.find((page) => page.category === category && page.unit === option.value)?.name;

    if (!isScandinavian(locale)) {
      return [{ ...option, label: pageName ?? option.label }];
    }

    // İskandinav dillerinde: önce birim sayfasının adı, sonra ad sözlüğü.
    // İkisi de yoksa arşın, dönüm, okka gibi başka bir ülkenin yöresel
    // birimi İngilizce adıyla listeye düşmesin diye gizlenir.
    const key = `${category}|${option.value}`;
    const localName = pageName ?? scandinavianUnitNames[key]?.[locale];
    const isRegional =
      getUnitSystemGroup(category, option.value) === "traditional" || REGIONAL_KITCHEN_UNITS.has(key);

    if (!localName && isRegional) return [];
    return [{ ...option, label: localName ?? option.label }];
  });
}
