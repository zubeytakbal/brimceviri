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
  ar: {
    metric: "النظام المتري",
    imperial: "الأمريكي / الإمبراطوري",
    kitchen: "مقاييس المطبخ",
    traditional: "وحدات تقليدية وإقليمية",
    scientific: "وحدات علمية",
  },
  uz: {
    metric: "Metrik",
    imperial: "AQSH / Britaniya",
    kitchen: "Oshxona o'lchovlari",
    traditional: "An'anaviy va mintaqaviy",
    scientific: "Ilmiy",
  },
  bn: {
    metric: "মেট্রিক",
    imperial: "মার্কিন / ইম্পেরিয়াল",
    kitchen: "রান্নাঘরের মাপ",
    traditional: "প্রচলিত ও আঞ্চলিক",
    scientific: "বৈজ্ঞানিক",
  },
  fr: {
    metric: "Métrique",
    imperial: "US / impérial",
    kitchen: "Mesures de cuisine",
    traditional: "Traditionnelles et régionales",
    scientific: "Scientifiques",
  },
  es: {
    metric: "Métrico",
    imperial: "EE. UU. / imperial",
    kitchen: "Medidas de cocina",
    traditional: "Tradicionales y regionales",
    scientific: "Científicas",
  },
  pt: {
    metric: "Métrico",
    imperial: "EUA / imperial",
    kitchen: "Medidas de cozinha",
    traditional: "Tradicionais e regionais",
    scientific: "Científicas",
  },
  it: {
    metric: "Metrico",
    imperial: "USA / imperiale",
    kitchen: "Misure da cucina",
    traditional: "Tradizionali e regionali",
    scientific: "Scientifiche",
  },
  nl: {
    metric: "Metrisch",
    imperial: "VS / imperiaal",
    kitchen: "Keukenmaten",
    traditional: "Traditioneel en regionaal",
    scientific: "Wetenschappelijk",
  },
  sv: {
    metric: "Metriska",
    imperial: "USA / imperial",
    kitchen: "Köksmått",
    traditional: "Traditionella och regionala",
    scientific: "Vetenskapliga",
  },
  no: {
    metric: "Metriske",
    imperial: "USA / imperial",
    kitchen: "Kjøkkenmål",
    traditional: "Tradisjonelle og regionale",
    scientific: "Vitenskapelige",
  },
  da: {
    metric: "Metriske",
    imperial: "USA / imperial",
    kitchen: "Køkkenmål",
    traditional: "Traditionelle og regionale",
    scientific: "Videnskabelige",
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
  ar: {
    category: "{value} بجميع الوحدات",
    pair: "{value} بالوحدات الأخرى",
    hint: "تتغير القيم مع المحوّل أعلاه. اختر صفًا لفتح صفحة ذلك التحويل بالتفصيل.",
  },
  uz: {
    category: "{value} barcha birliklarda",
    pair: "{value} boshqa birliklarda",
    hint: "Qiymatlar yuqoridagi konvertor bilan birga yangilanadi. Batafsil sahifani ochish uchun qatorni tanlang.",
  },
  bn: {
    category: "সব এককে {value}",
    pair: "অন্যান্য এককে {value}",
    hint: "উপরের কনভার্টারের সাথে মানগুলো বদলায়। বিস্তারিত পাতা খুলতে একটি সারি বেছে নিন।",
  },
  fr: {
    category: "{value} dans toutes les unités",
    pair: "{value} dans les autres unités",
    hint: "Les valeurs suivent le convertisseur ci-dessus. Choisissez une ligne pour ouvrir la page détaillée de cette conversion.",
  },
  es: {
    category: "{value} en todas las unidades",
    pair: "{value} en otras unidades",
    hint: "Los valores cambian con el conversor de arriba. Elige una fila para abrir la página detallada de esa conversión.",
  },
  "es-419": {
    category: "{value} en todas las unidades",
    pair: "{value} en otras unidades",
    hint: "Los valores cambian con el conversor de arriba. Elige una fila para abrir la página detallada de esa conversión.",
  },
  pt: {
    category: "{value} em todas as unidades",
    pair: "{value} em outras unidades",
    hint: "Os valores acompanham o conversor acima. Escolha uma linha para abrir a página detalhada dessa conversão.",
  },
  it: {
    category: "{value} in tutte le unità",
    pair: "{value} in altre unità",
    hint: "I valori seguono il convertitore qui sopra. Scegli una riga per aprire la pagina dettagliata di quella conversione.",
  },
  nl: {
    category: "{value} in alle eenheden",
    pair: "{value} in andere eenheden",
    hint: "De waarden volgen de omrekenaar hierboven. Kies een rij om de uitgebreide pagina van die omrekening te openen.",
  },
  sv: {
    category: "{value} i alla enheter",
    pair: "{value} i andra enheter",
    hint: "Värdena följer omvandlaren ovan. Välj en rad för att öppna den detaljerade sidan för den omvandlingen.",
  },
  no: {
    category: "{value} i alle enheter",
    pair: "{value} i andre enheter",
    hint: "Verdiene følger omregneren over. Velg en rad for å åpne den detaljerte siden for den omregningen.",
  },
  da: {
    category: "{value} i alle enheder",
    pair: "{value} i andre enheder",
    hint: "Værdierne følger omregneren ovenfor. Vælg en række for at åbne den detaljerede side for den omregning.",
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
  const labels =
    groupLabels[locale] ??
    (locale === "es-419" ? groupLabels.es : groupLabels.en);
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
