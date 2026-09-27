"use client";

import { useMemo } from "react";
import Link from "@/app/components/SiteLink";
import { convert } from "../converter/convert";
import {
  getUnitSystemGroup,
  hasUnitSystemGroups,
  UNIT_SYSTEM_GROUP_ORDER,
  type UnitSystemGroup,
} from "../converter/unitSystemGroups";
import { useConverterState } from "./converterSync";
import {
  formatReadableNumber,
  type SiteNumberLocale,
} from "./readableNumber";

type UnitOption = {
  value: string;
  label: string;
  symbol: string;
};

type AllUnitsPanelProps = {
  category: string;
  locale: SiteNumberLocale;
  unitOptions: UnitOption[];
  // Ceviricinin ilk degeri; sunucu ciktisi ve ilk cizim bununla yapilir.
  defaultValue: number;
  defaultUnit: string;
  // "m²|dönüm" -> "/metrekare-donum" gibi cift sayfasi baglantilari.
  pairHrefs?: Record<string, string>;
  syncKey?: string;
  // "pair": ceviri sayfasinda ("diger birimlerde"), "category": kategori
  // sayfasinda ("tum birimlerde").
  variant?: "category" | "pair";
};

const groupLabels: Record<string, Record<UnitSystemGroup, string>> = {
  tr: {
    metric: "Metrik",
    imperial: "ABD / İngiliz",
    kitchen: "Mutfak ölçüleri",
    traditional: "Geleneksel ve yöresel",
    scientific: "Bilimsel",
  },
  en: {
    metric: "Metric",
    imperial: "US / Imperial",
    kitchen: "Kitchen measures",
    traditional: "Traditional and regional",
    scientific: "Scientific",
  },
  de: {
    metric: "Metrisch",
    imperial: "US / Imperial",
    kitchen: "Küchenmaße",
    traditional: "Traditionell und regional",
    scientific: "Wissenschaftlich",
  },
};

const headingTemplates: Record<
  string,
  { category: string; pair: string; hint: string }
> = {
  tr: {
    category: "{value} tüm birimlerde",
    pair: "{value} diğer birimlerde",
    hint: "Değer yukarıdaki çeviriciyle birlikte güncellenir. Bir satıra tıklayarak o dönüşümün ayrıntılı sayfasına geçebilirsiniz.",
  },
  en: {
    category: "{value} in every unit",
    pair: "{value} in other units",
    hint: "Values update with the converter above. Select a row to open that conversion's detailed page.",
  },
  de: {
    category: "{value} in allen Einheiten",
    pair: "{value} in anderen Einheiten",
    hint: "Die Werte folgen dem Umrechner oben. Eine Zeile öffnet die ausführliche Seite dieser Umrechnung.",
  },
};

export default function AllUnitsPanel({
  category,
  locale,
  unitOptions,
  defaultValue,
  defaultUnit,
  pairHrefs = {},
  syncKey = category,
  variant = "category",
}: AllUnitsPanelProps) {
  const syncedState = useConverterState(syncKey);
  const value = syncedState ? syncedState.value : defaultValue;
  const unit = syncedState?.unit ?? defaultUnit;
  const fromOption = unitOptions.find((option) => option.value === unit);
  const labels = groupLabels[locale] ?? groupLabels.en;
  const template = headingTemplates[locale] ?? headingTemplates.en;
  const grouped = hasUnitSystemGroups(category);

  const groups = useMemo(() => {
    const buckets = new Map<UnitSystemGroup, UnitOption[]>();

    for (const option of unitOptions) {
      if (option.value === unit) {
        continue;
      }

      const group = grouped
        ? getUnitSystemGroup(category, option.value)
        : "metric";
      buckets.set(group, [...(buckets.get(group) ?? []), option]);
    }

    return UNIT_SYSTEM_GROUP_ORDER.flatMap((group) => {
      const options = buckets.get(group);
      return options ? [{ group, options }] : [];
    });
  }, [category, grouped, unit, unitOptions]);

  if (unitOptions.length < 3) {
    return null;
  }

  const hasValue = value !== null && Number.isFinite(value);
  const headingValue = hasValue
    ? `${formatReadableNumber(value, locale)} ${fromOption?.symbol ?? unit}`
    : (fromOption?.label ?? unit);
  const heading = template[variant].replace("{value}", headingValue);

  return (
    <section
      className="all-units-panel"
      aria-labelledby={`all-units-${syncKey}`}
    >
      <div className="all-units-panel-heading">
        <h2 id={`all-units-${syncKey}`}>{heading}</h2>
        <p>{template.hint}</p>
      </div>

      <div
        className={`all-units-groups${
          groups.length === 1 ? " is-single" : ""
        }`}
      >
        {groups.map(({ group, options }) => (
          <div className="all-units-group" key={group}>
            {grouped && groups.length > 1 && <h3>{labels[group]}</h3>}

            <ul>
              {options.map((option) => {
                const convertedValue = hasValue
                  ? convert(category, value, unit, option.value)
                  : Number.NaN;
                const href = pairHrefs[`${unit}|${option.value}`];
                const content = (
                  <>
                    <span className="all-units-name">{option.label}</span>
                    <span className="all-units-value">
                      <strong>
                        {formatReadableNumber(convertedValue, locale)}
                      </strong>{" "}
                      <span>{option.symbol}</span>
                    </span>
                  </>
                );

                return (
                  <li key={option.value}>
                    {href ? (
                      <Link className="all-units-row is-link" href={href}>
                        {content}
                      </Link>
                    ) : (
                      <div className="all-units-row">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
