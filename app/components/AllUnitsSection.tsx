// "Tum birimler" panelini her dilin kategori ve cift sayfalarina ayni
// sekilde baglamak icin sunucu bileseni: birim etiketlerini sayfanin
// dilinde hazirlar ve satirlari o dildeki cift sayfalarina baglar.
import { getLocalizedUnitOptions } from "../converter/localizedUnitOptions";
import { englishDisplaySymbol } from "../converter/englishUnitDisplay";
import { getArabicUnitName } from "../i18n/arabicLocalization";
import AllUnitsPanel from "./AllUnitsPanel";
import { buildPairHrefs } from "./allUnitsPanelData";
import { getCategoryUnitOptions } from "./categoryUnitOptions";
import type { SiteNumberLocale } from "./readableNumber";

export type AllUnitsLocale = Exclude<SiteNumberLocale, "ru">;

export function getPanelUnitOptions(category: string, locale: AllUnitsLocale) {
  switch (locale) {
    case "bn":
    case "da":
    case "es":
    case "fr":
    case "it":
    case "no":
    case "pt":
    case "sv":
      return getLocalizedUnitOptions(category, locale);
    case "ar":
      return getCategoryUnitOptions(category, "en").map((option) => ({
        ...option,
        label: getArabicUnitName({
          englishName: option.label,
          symbol: option.value,
        }),
      }));
    case "en":
      return getCategoryUnitOptions(category, "en").map((option) => ({
        ...option,
        symbol: englishDisplaySymbol(category, option.value),
      }));
    default:
      return getCategoryUnitOptions(category, locale);
  }
}

type AllUnitsSectionProps = {
  category: string;
  locale: AllUnitsLocale;
  conversions: Array<{
    category: string;
    fromUnit: string;
    toUnit: string;
    slug: string;
  }>;
  hrefPrefix: string;
  variant: "category" | "pair";
  defaultUnit?: string;
  defaultValue?: number;
  // Converter ile paylasilan anahtar (varsayilan: kategori).
  syncKey?: string;
};

export default function AllUnitsSection({
  category,
  locale,
  conversions,
  hrefPrefix,
  variant,
  defaultUnit,
  defaultValue = 1,
  syncKey,
}: AllUnitsSectionProps) {
  const unitOptions = getPanelUnitOptions(category, locale);
  const startUnit = defaultUnit ?? unitOptions[0]?.value;

  if (
    !startUnit ||
    !unitOptions.some((option) => option.value === startUnit)
  ) {
    return null;
  }

  const panel = (
    <AllUnitsPanel
      category={category}
      locale={locale}
      unitOptions={unitOptions}
      defaultValue={defaultValue}
      defaultUnit={startUnit}
      pairHrefs={buildPairHrefs(
        conversions.filter((conversion) => conversion.category === category),
        (slug) => `${hrefPrefix}${slug}`
      )}
      syncKey={syncKey}
      variant={variant}
    />
  );

  return variant === "pair" ? (
    <div className="all-units-shell">{panel}</div>
  ) : (
    panel
  );
}
