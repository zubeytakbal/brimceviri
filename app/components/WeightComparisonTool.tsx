"use client";

import { useMemo, useState } from "react";
import type { Locale } from "../i18n/config";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import {
  calculateWeightComparisons,
  weightComparisonUnitToKg,
  type WeightComparisonUnit,
} from "../converter/weightComparison";

const unitOptionLabels: Record<
  Locale,
  Record<WeightComparisonUnit, string>
> = {
  tr: {
    g: "Gram (g)",
    kg: "Kilogram (kg)",
    ton: "Ton",
  },
  en: {
    g: "Gram (g)",
    kg: "Kilogram (kg)",
    ton: "Ton",
  },
  de: {
    g: "Gramm (g)",
    kg: "Kilogramm (kg)",
    ton: "Tonne",
  },
  ar: {
    g: "غرام (g)",
    kg: "كيلوغرام (kg)",
    ton: "طن",
  },
uz: {
    g: "Gramm (g)",
    kg: "Kilogramm (kg)",
    ton: "Tonna",
  },
bn: {
    g: "গ্রাম (g)",
    kg: "কিলোগ্রাম (kg)",
    ton: "টন",
  },
fr: {
    g: "Gramme (g)",
    kg: "Kilogramme (kg)",
    ton: "Tonne",
  },
  es: {
    g: "Gramo (g)",
    kg: "Kilogramo (kg)",
    ton: "Tonelada",
  },
  "es-419": {
    g: "Gramo (g)",
    kg: "Kilogramo (kg)",
    ton: "Tonelada",
  },
  pt: {
    g: "Grama (g)",
    kg: "Quilograma (kg)",
    ton: "Tonelada",
  },
  it: {
    g: "Grammo (g)",
    kg: "Chilogrammo (kg)",
    ton: "Tonnellata",
  },
  nl: {
    g: "Gram (g)",
    kg: "Kilogram (kg)",
    ton: "Ton",
  },
  sv: {
    g: "Gram (g)",
    kg: "Kilogram (kg)",
    ton: "Ton",
  },
  no: {
    g: "Gram (g)",
    kg: "Kilogram (kg)",
    ton: "Tonn",
  },
  da: {
    g: "Gram (g)",
    kg: "Kilogram (kg)",
    ton: "Ton",
  },
  ru: {
    g: "Грамм (г)",
    kg: "Килограмм (кг)",
    ton: "Тонна (т)",
  },
};

const unitShortLabels: Record<Locale, Record<WeightComparisonUnit, string>> = {
  tr: { g: "g", kg: "kg", ton: "ton" },
  en: { g: "g", kg: "kg", ton: "ton" },
  de: { g: "g", kg: "kg", ton: "t" },
  ar: { g: "غ", kg: "كجم", ton: "طن" },
uz: { g: "g", kg: "kg", ton: "t" },
bn: { g: "g", kg: "kg", ton: "t" },
fr: { g: "g", kg: "kg", ton: "t" },
  es: { g: "g", kg: "kg", ton: "t" },
  "es-419": { g: "g", kg: "kg", ton: "t" },
  pt: { g: "g", kg: "kg", ton: "t" },
  it: { g: "g", kg: "kg", ton: "t" },
  nl: { g: "g", kg: "kg", ton: "t" },
  sv: { g: "g", kg: "kg", ton: "t" },
  no: { g: "g", kg: "kg", ton: "t" },
  da: { g: "g", kg: "kg", ton: "t" },
  ru: { g: "г", kg: "кг", ton: "т" },
};

const referenceLabels: Record<Locale, Record<string, string>> = {
  tr: {
    kedi: "Ev kedisi (ortalama)",
    insan: "Yetişkin insan (ortalama)",
    motosiklet: "Motosiklet (ortalama)",
    at: "Binicilik ati (ortalama)",
    otomobil: "Binek otomobil (ortalama)",
    fil: "Afrika fili (yetişkin, ortalama)",
    "mavi-balina": "Mavi balina (yetişkin, ortalama)",
  },
  en: {
    kedi: "Average house cat",
    insan: "Average adult human",
    motosiklet: "Average motorcycle",
    at: "Average riding horse",
    otomobil: "Average passenger car",
    fil: "Average adult African elephant",
    "mavi-balina": "Average adult blue whale",
  },
  de: {
    kedi: "Durchschnittliche Hauskatze",
    insan: "Durchschnittlicher Erwachsener",
    motosiklet: "Durchschnittliches Motorrad",
    at: "Durchschnittliches Reitpferd",
    otomobil: "Durchschnittlicher Pkw",
    fil: "Durchschnittlicher afrikanischer Elefant",
    "mavi-balina": "Durchschnittlicher Blauwal",
  },
  ar: {
    kedi: "متوسط وزن قطة منزلية",
    insan: "متوسط وزن إنسان بالغ",
    motosiklet: "متوسط وزن دراجة نارية",
    at: "متوسط وزن حصان ركوب",
    otomobil: "متوسط وزن سيارة ركاب",
    fil: "متوسط وزن فيل إفريقي بالغ",
    "mavi-balina": "متوسط وزن حوت أزرق بالغ",
  },
uz: {
    kedi: "O'rtacha uy mushugi",
    insan: "O'rtacha voyaga yetgan inson",
    motosiklet: "O'rtacha mototsikl",
    at: "O'rtacha minish oti",
    otomobil: "O'rtacha yengil avtomobil",
    fil: "O'rtacha voyaga yetgan Afrika fili",
    "mavi-balina": "O'rtacha voyaga yetgan ko'k kit",
  },
bn: {
    kedi: "গড় পোষা বিড়াল",
    insan: "গড় প্রাপ্তবয়স্ক মানুষ",
    motosiklet: "গড় মোটরসাইকেল",
    at: "গড় সওয়ারি ঘোড়া",
    otomobil: "গড় যাত্রীবাহী গাড়ি",
    fil: "গড় প্রাপ্তবয়স্ক আফ্রিকান হাতি",
    "mavi-balina": "গড় প্রাপ্তবয়স্ক নীল তিমি",
  },
fr: {
    kedi: "Chat domestique moyen",
    insan: "Adulte moyen",
    motosiklet: "Moto moyenne",
    at: "Cheval de selle moyen",
    otomobil: "Voiture particulière moyenne",
    fil: "Éléphant d'Afrique adulte moyen",
    "mavi-balina": "Baleine bleue adulte moyenne",
  },
  es: {
    kedi: "Gato doméstico promedio",
    insan: "Adulto promedio",
    motosiklet: "Moto promedio",
    at: "Caballo de silla promedio",
    otomobil: "Turismo promedio",
    fil: "Elefante africano adulto promedio",
    "mavi-balina": "Ballena azul adulta promedio",
  },
  "es-419": {
    kedi: "Gato doméstico promedio",
    insan: "Adulto promedio",
    motosiklet: "Motocicleta promedio",
    at: "Caballo de montar promedio",
    otomobil: "Auto promedio",
    fil: "Elefante africano adulto promedio",
    "mavi-balina": "Ballena azul adulta promedio",
  },
  pt: {
    kedi: "Gato doméstico médio",
    insan: "Adulto médio",
    motosiklet: "Moto média",
    at: "Cavalo de montaria médio",
    otomobil: "Carro de passeio médio",
    fil: "Elefante-africano adulto médio",
    "mavi-balina": "Baleia-azul adulta média",
  },
  it: {
    kedi: "Gatto domestico medio",
    insan: "Adulto medio",
    motosiklet: "Moto media",
    at: "Cavallo da sella medio",
    otomobil: "Autovettura media",
    fil: "Elefante africano adulto medio",
    "mavi-balina": "Balenottera azzurra adulta media",
  },
  nl: {
    kedi: "Gemiddelde huiskat",
    insan: "Gemiddelde volwassene",
    motosiklet: "Gemiddelde motorfiets",
    at: "Gemiddeld rijpaard",
    otomobil: "Gemiddelde personenauto",
    fil: "Gemiddelde volwassen Afrikaanse olifant",
    "mavi-balina": "Gemiddelde volwassen blauwe vinvis",
  },
  sv: {
    kedi: "Genomsnittlig huskatt",
    insan: "Genomsnittlig vuxen",
    motosiklet: "Genomsnittlig motorcykel",
    at: "Genomsnittlig ridhäst",
    otomobil: "Genomsnittlig personbil",
    fil: "Genomsnittlig vuxen afrikansk elefant",
    "mavi-balina": "Genomsnittlig vuxen blåval",
  },
  no: {
    kedi: "Gjennomsnittlig huskatt",
    insan: "Gjennomsnittlig voksen",
    motosiklet: "Gjennomsnittlig motorsykkel",
    at: "Gjennomsnittlig ridehest",
    otomobil: "Gjennomsnittlig personbil",
    fil: "Gjennomsnittlig voksen afrikansk elefant",
    "mavi-balina": "Gjennomsnittlig voksen blåhval",
  },
  da: {
    kedi: "Gennemsnitlig huskat",
    insan: "Gennemsnitlig voksen",
    motosiklet: "Gennemsnitlig motorcykel",
    at: "Gennemsnitlig ridehest",
    otomobil: "Gennemsnitlig personbil",
    fil: "Gennemsnitlig voksen afrikansk elefant",
    "mavi-balina": "Gennemsnitlig voksen blåhval",
  },
  ru: {
    kedi: "Средняя домашняя кошка",
    insan: "Средний взрослый человек",
    motosiklet: "Средний мотоцикл",
    at: "Средняя верховая лошадь",
    otomobil: "Средний легковой автомобиль",
    fil: "Средний взрослый африканский слон",
    "mavi-balina": "Средний взрослый синий кит",
  },
};

const copyByLocale: Record<
  Locale,
  {
    labels: {
      value: string;
      unit: string;
    };
    placeholder: string;
    emptyState: string;
    intro: string;
    closestMatch: string;
  }
> = {
  tr: {
    labels: {
      value: "Deger",
      unit: "Birim",
    },
    placeholder: "Orn. 25",
    emptyState: "Geçerli bir değer girerek karşılaştırmaları görebilirsin.",
    intro: "için karşılaştırmalar:",
    closestMatch: "En yakın karşılaştırma",
  },
  en: {
    labels: {
      value: "Value",
      unit: "Unit",
    },
    placeholder: "E.g. 25",
    emptyState: "Enter a valid value to see the comparisons.",
    intro: "Comparisons for",
    closestMatch: "Closest comparison",
  },
  fr: {
    labels: {
      value: "Valeur",
      unit: "Unité",
    },
    placeholder: "E.g. 25",
    emptyState: "Saisissez une valeur valide pour voir les comparaisons.",
    intro: "Comparaisons pour",
    closestMatch: "Comparaison la plus proche",
  },
  es: {
    labels: {
      value: "Valor",
      unit: "Unidad",
    },
    placeholder: "E.g. 25",
    emptyState: "Introduce un valor válido para ver las comparaciones.",
    intro: "Comparaciones para",
    closestMatch: "Comparación más cercana",
  },
  "es-419": {
    labels: {
      value: "Valor",
      unit: "Unidad",
    },
    placeholder: "E.g. 25",
    emptyState: "Ingresa un valor válido para ver las comparaciones.",
    intro: "Comparaciones para",
    closestMatch: "Comparación más cercana",
  },
  pt: {
    labels: {
      value: "Valor",
      unit: "Unidade",
    },
    placeholder: "E.g. 25",
    emptyState: "Digite um valor válido para ver as comparações.",
    intro: "Comparações para",
    closestMatch: "Comparação mais próxima",
  },
  it: {
    labels: {
      value: "Valore",
      unit: "Unità",
    },
    placeholder: "E.g. 25",
    emptyState: "Inserisci un valore valido per vedere i confronti.",
    intro: "Confronti per",
    closestMatch: "Confronto più vicino",
  },
  nl: {
    labels: {
      value: "Waarde",
      unit: "Eenheid",
    },
    placeholder: "E.g. 25",
    emptyState: "Voer een geldige waarde in om de vergelijkingen te zien.",
    intro: "Vergelijkingen voor",
    closestMatch: "Dichtstbijzijnde vergelijking",
  },
  sv: {
    labels: {
      value: "Värde",
      unit: "Enhet",
    },
    placeholder: "E.g. 25",
    emptyState: "Ange ett giltigt värde för att se jämförelserna.",
    intro: "Jämförelser för",
    closestMatch: "Närmaste jämförelse",
  },
  no: {
    labels: {
      value: "Verdi",
      unit: "Enhet",
    },
    placeholder: "E.g. 25",
    emptyState: "Skriv inn en gyldig verdi for å se sammenligningene.",
    intro: "Sammenligninger for",
    closestMatch: "Nærmeste sammenligning",
  },
  da: {
    labels: {
      value: "Værdi",
      unit: "Enhed",
    },
    placeholder: "E.g. 25",
    emptyState: "Indtast en gyldig værdi for at se sammenligningerne.",
    intro: "Sammenligninger for",
    closestMatch: "Nærmeste sammenligning",
  },
  de: {
    labels: {
      value: "Wert",
      unit: "Einheit",
    },
    placeholder: "Z. B. 25",
    emptyState: "Geben Sie einen gültigen Wert ein, um die Vergleiche zu sehen.",
    intro: "Vergleiche für",
    closestMatch: "Nächster Vergleich",
  },
  ar: {
    labels: {
      value: "القيمة",
      unit: "الوحدة",
    },
    placeholder: "مثال: 25",
    emptyState: "أدخل قيمة صحيحة لعرض المقارنات.",
    intro: "مقارنات للقيمة",
    closestMatch: "أقرب مقارنة",
  },
uz: {
    labels: {
      value: "Qiymat",
      unit: "Birlik",
    },
    placeholder: "Mas. 25",
    emptyState: "Solishtirishlarni ko'rish uchun to'g'ri qiymat kiriting.",
    intro: "uchun solishtirishlar:",
    closestMatch: "Eng yaqin solishtirish",
  },
  bn: {
    labels: {
      value: "মান",
      unit: "একক",
    },
    placeholder: "E.g. 25",
    emptyState: "তুলনা দেখতে একটি সঠিক মান লিখুন।",
    intro: "এর জন্য তুলনা:",
    closestMatch: "সবচেয়ে কাছের তুলনা",
  },
  ru: {
    labels: {
      value: "Значение",
      unit: "Единица",
    },
    placeholder: "Например, 25",
    emptyState: "Введите корректное значение, чтобы увидеть сравнения.",
    intro: "Сравнения для",
    closestMatch: "Ближайшее сравнение",
  },
};

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatMultiplier(ratio: number, locale: Locale) {
  if (ratio >= 10) {
    return `${formatLocalizedNumber(Math.round(ratio), locale)}x`;
  }

  return `${formatLocalizedNumber(ratio, locale, { maximumFractionDigits: 2 })}x`;
}

function getReferenceLabel(id: string, locale: Locale, fallback: string) {
  return referenceLabels[locale][id] ?? fallback;
}

// Bu dillerde "icin karsilastirmalar" ifadesi degerden sonra gelir.
const introAfterValueLocales = new Set<Locale>(["tr", "uz", "bn"]);

export default function WeightComparisonTool({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const copy = copyByLocale[locale];
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState<WeightComparisonUnit>("kg");

  const valueInKg = parseNumericValue(value) * weightComparisonUnitToKg[unit];

  const comparisons = useMemo(
    () => calculateWeightComparisons(valueInKg),
    [valueInKg]
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>{copy.labels.value}</span>
          <input
            inputMode="decimal"
            type="text"
            placeholder={copy.placeholder}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.unit}</span>
          <select
            value={unit}
            onChange={(event) =>
              setUnit(event.target.value as WeightComparisonUnit)
            }
          >
            <option value="g">{unitOptionLabels[locale].g}</option>
            <option value="kg">{unitOptionLabels[locale].kg}</option>
            <option value="ton">{unitOptionLabels[locale].ton}</option>
          </select>
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result">
        {!comparisons ? (
          <strong>{copy.emptyState}</strong>
        ) : (
          <>
            <p className="length-comparison-intro">
              {introAfterValueLocales.has(locale)
                ? `${value} ${unitShortLabels[locale][unit]} ${copy.intro}`
                : locale === "ar"
                  ? `${copy.intro} ${value} ${unitShortLabels[locale][unit]}`
                  : `${copy.intro} ${value} ${unitShortLabels[locale][unit]}:`}
            </p>

            <div className="length-comparison-top">
              <span>{copy.closestMatch}</span>
              <strong>
                {formatMultiplier(comparisons[0].ratio, locale)}{" "}
                {getReferenceLabel(comparisons[0].id, locale, comparisons[0].label)}
              </strong>
            </div>

            <ul className="length-comparison-list">
              {comparisons.map((row) => (
                <li className="length-comparison-row" key={row.id}>
                  <div className="length-comparison-row-head">
                    <span>
                      {formatMultiplier(row.ratio, locale)}{" "}
                      {getReferenceLabel(row.id, locale, row.label)}
                    </span>
                  </div>
                  <div className="length-comparison-bar-track">
                    <div
                      className="length-comparison-bar-fill"
                      style={{ width: `${Math.min(row.ratio, 1) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
