"use client";

import { useMemo, useState } from "react";
import type { Locale } from "../i18n/config";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import {
  calculateLengthComparisons,
  lengthComparisonUnitToMeters,
  type LengthComparisonUnit,
} from "../converter/lengthComparison";

const unitOptionLabels: Record<
  Locale,
  Record<LengthComparisonUnit, string>
> = {
  tr: {
    cm: "Santimetre (cm)",
    m: "Metre (m)",
    km: "Kilometre (km)",
  },
  en: {
    cm: "Centimeter (cm)",
    m: "Meter (m)",
    km: "Kilometer (km)",
  },
  de: {
    cm: "Zentimeter (cm)",
    m: "Meter (m)",
    km: "Kilometer (km)",
  },
  ar: {
    cm: "سنتيمتر (سم)",
    m: "متر (م)",
    km: "كيلومتر (كم)",
  },
uz: {
    cm: "Santimetr (sm)",
    m: "Metr (m)",
    km: "Kilometr (km)",
  },
bn: {
    cm: "সেন্টিমিটার (cm)",
    m: "মিটার (m)",
    km: "কিলোমিটার (km)",
  },
fr: {
    cm: "Centimètre (cm)",
    m: "Mètre (m)",
    km: "Kilomètre (km)",
  },
  es: {
    cm: "Centímetro (cm)",
    m: "Metro (m)",
    km: "Kilómetro (km)",
  },
  "es-419": {
    cm: "Centímetro (cm)",
    m: "Metro (m)",
    km: "Kilómetro (km)",
  },
  pt: {
    cm: "Centímetro (cm)",
    m: "Metro (m)",
    km: "Quilômetro (km)",
  },
  it: {
    cm: "Centimetro (cm)",
    m: "Metro (m)",
    km: "Chilometro (km)",
  },
  nl: {
    cm: "Centimeter (cm)",
    m: "Meter (m)",
    km: "Kilometer (km)",
  },
  sv: {
    cm: "Centimeter (cm)",
    m: "Meter (m)",
    km: "Kilometer (km)",
  },
  no: {
    cm: "Centimeter (cm)",
    m: "Meter (m)",
    km: "Kilometer (km)",
  },
  da: {
    cm: "Centimeter (cm)",
    m: "Meter (m)",
    km: "Kilometer (km)",
  },
  ru: {
    cm: "Сантиметр (см)",
    m: "Метр (м)",
    km: "Километр (км)",
  },
};

const unitShortLabels: Record<Locale, Record<LengthComparisonUnit, string>> = {
  tr: { cm: "cm", m: "m", km: "km" },
  en: { cm: "cm", m: "m", km: "km" },
  de: { cm: "cm", m: "m", km: "km" },
  ar: { cm: "سم", m: "م", km: "كم" },
uz: { cm: "sm", m: "m", km: "km" },
bn: { cm: "cm", m: "m", km: "km" },
fr: { cm: "cm", m: "m", km: "km" },
  es: { cm: "cm", m: "m", km: "km" },
  "es-419": { cm: "cm", m: "m", km: "km" },
  pt: { cm: "cm", m: "m", km: "km" },
  it: { cm: "cm", m: "m", km: "km" },
  nl: { cm: "cm", m: "m", km: "km" },
  sv: { cm: "cm", m: "m", km: "km" },
  no: { cm: "cm", m: "m", km: "km" },
  da: { cm: "cm", m: "m", km: "km" },
  ru: { cm: "см", m: "м", km: "км" },
};

const referenceLabels: Record<Locale, Record<string, string>> = {
  tr: {
    "insan-boyu": "Yetişkin insan boyu (ortalama)",
    zurafa: "Zürafa boyu (ortalama)",
    "sehir-otobusu": "Şehir otobüsü uzunluğu",
    "mavi-balina": "Mavi balina uzunluğu (ortalama)",
    "futbol-sahasi": "Futbol sahası uzunluğu",
    "eyfel-kulesi": "Eyfel Kulesi yüksekliği (anten dahil)",
    "bogaz-koprusu": "15 Temmuz Şehitler Köprüsü uzunluğu",
  },
  en: {
    "insan-boyu": "Average adult human height",
    zurafa: "Average giraffe height",
    "sehir-otobusu": "City bus length",
    "mavi-balina": "Average blue whale length",
    "futbol-sahasi": "Football field length",
    "eyfel-kulesi": "Eiffel Tower height (with antenna)",
    "bogaz-koprusu": "15 July Martyrs Bridge length",
  },
  de: {
    "insan-boyu": "Durchschnittliche Koerpergroesse eines Erwachsenen",
    zurafa: "Durchschnittliche Giraffenhöhe",
    "sehir-otobusu": "Länge eines Stadtbusses",
    "mavi-balina": "Durchschnittliche Länge eines Blauwals",
    "futbol-sahasi": "Länge eines Fußballfelds",
    "eyfel-kulesi": "Höhe des Eiffelturms (mit Antenne)",
    "bogaz-koprusu": "Länge der 15.-Juli-Märtyrer-Brücke",
  },
  ar: {
    "insan-boyu": "متوسط طول الإنسان البالغ",
    zurafa: "متوسط طول الزرافة",
    "sehir-otobusu": "طول حافلة مدينة",
    "mavi-balina": "متوسط طول الحوت الأزرق",
    "futbol-sahasi": "طول ملعب كرة قدم",
    "eyfel-kulesi": "ارتفاع برج إيفل مع الهوائي",
    "bogaz-koprusu": "طول جسر شهداء 15 يوليو",
  },
uz: {
    "insan-boyu": "O'rtacha voyaga yetgan inson bo'yi",
    zurafa: "O'rtacha jirafa bo'yi",
    "sehir-otobusu": "Shahar avtobusi uzunligi",
    "mavi-balina": "O'rtacha ko'k kit uzunligi",
    "futbol-sahasi": "Futbol maydoni uzunligi",
    "eyfel-kulesi": "Eyfel minorasi balandligi (antennasi bilan)",
    "bogaz-koprusu": "15-iyul Shahidlar ko'prigi uzunligi",
  },
bn: {
    "insan-boyu": "একজন প্রাপ্তবয়স্ক মানুষের গড় উচ্চতা",
    zurafa: "জিরাফের গড় উচ্চতা",
    "sehir-otobusu": "শহরের বাসের দৈর্ঘ্য",
    "mavi-balina": "নীল তিমির গড় দৈর্ঘ্য",
    "futbol-sahasi": "ফুটবল মাঠের দৈর্ঘ্য",
    "eyfel-kulesi": "আইফেল টাওয়ারের উচ্চতা (অ্যান্টেনাসহ)",
    "bogaz-koprusu": "১৫ জুলাই শহীদ সেতুর দৈর্ঘ্য (ইস্তাম্বুল)",
  },
fr: {
    "insan-boyu": "Taille moyenne d'un adulte",
    zurafa: "Taille moyenne d'une girafe",
    "sehir-otobusu": "Longueur d'un bus urbain",
    "mavi-balina": "Longueur moyenne d'une baleine bleue",
    "futbol-sahasi": "Longueur d'un terrain de football",
    "eyfel-kulesi": "Hauteur de la tour Eiffel (avec antenne)",
    "bogaz-koprusu": "Longueur du pont des Martyrs-du-15-Juillet (Istanbul)",
  },
  es: {
    "insan-boyu": "Estatura media de un adulto",
    zurafa: "Altura media de una jirafa",
    "sehir-otobusu": "Longitud de un autobús urbano",
    "mavi-balina": "Longitud media de una ballena azul",
    "futbol-sahasi": "Longitud de un campo de fútbol",
    "eyfel-kulesi": "Altura de la Torre Eiffel (con antena)",
    "bogaz-koprusu": "Longitud del Puente de los Mártires del 15 de Julio (Estambul)",
  },
  "es-419": {
    "insan-boyu": "Estatura promedio de un adulto",
    zurafa: "Altura promedio de una jirafa",
    "sehir-otobusu": "Longitud de un autobús urbano",
    "mavi-balina": "Longitud promedio de una ballena azul",
    "futbol-sahasi": "Longitud de una cancha de fútbol",
    "eyfel-kulesi": "Altura de la Torre Eiffel (con antena)",
    "bogaz-koprusu": "Longitud del Puente de los Mártires del 15 de Julio (Estambul)",
  },
  pt: {
    "insan-boyu": "Altura média de um adulto",
    zurafa: "Altura média de uma girafa",
    "sehir-otobusu": "Comprimento de um ônibus urbano",
    "mavi-balina": "Comprimento médio de uma baleia-azul",
    "futbol-sahasi": "Comprimento de um campo de futebol",
    "eyfel-kulesi": "Altura da Torre Eiffel (com antena)",
    "bogaz-koprusu": "Comprimento da Ponte dos Mártires de 15 de Julho (Istambul)",
  },
  it: {
    "insan-boyu": "Altezza media di un adulto",
    zurafa: "Altezza media di una giraffa",
    "sehir-otobusu": "Lunghezza di un autobus urbano",
    "mavi-balina": "Lunghezza media di una balenottera azzurra",
    "futbol-sahasi": "Lunghezza di un campo da calcio",
    "eyfel-kulesi": "Altezza della Torre Eiffel (con antenna)",
    "bogaz-koprusu": "Lunghezza del Ponte dei Martiri del 15 luglio (Istanbul)",
  },
  nl: {
    "insan-boyu": "Gemiddelde lengte van een volwassene",
    zurafa: "Gemiddelde hoogte van een giraf",
    "sehir-otobusu": "Lengte van een stadsbus",
    "mavi-balina": "Gemiddelde lengte van een blauwe vinvis",
    "futbol-sahasi": "Lengte van een voetbalveld",
    "eyfel-kulesi": "Hoogte van de Eiffeltoren (met antenne)",
    "bogaz-koprusu": "Lengte van de 15 Juli Martelarenbrug (Istanbul)",
  },
  sv: {
    "insan-boyu": "Genomsnittlig längd för en vuxen",
    zurafa: "Genomsnittlig höjd för en giraff",
    "sehir-otobusu": "Längd på en stadsbuss",
    "mavi-balina": "Genomsnittlig längd för en blåval",
    "futbol-sahasi": "Längd på en fotbollsplan",
    "eyfel-kulesi": "Eiffeltornets höjd (med antenn)",
    "bogaz-koprusu": "Längd på 15 juli-martyrernas bro (Istanbul)",
  },
  no: {
    "insan-boyu": "Gjennomsnittlig høyde for en voksen",
    zurafa: "Gjennomsnittlig høyde for en sjiraff",
    "sehir-otobusu": "Lengde på en bybuss",
    "mavi-balina": "Gjennomsnittlig lengde for en blåhval",
    "futbol-sahasi": "Lengde på en fotballbane",
    "eyfel-kulesi": "Eiffeltårnets høyde (med antenne)",
    "bogaz-koprusu": "Lengde på 15. juli-martyrenes bro (Istanbul)",
  },
  da: {
    "insan-boyu": "Gennemsnitlig højde for en voksen",
    zurafa: "Gennemsnitlig højde for en giraf",
    "sehir-otobusu": "Længde på en bybus",
    "mavi-balina": "Gennemsnitlig længde for en blåhval",
    "futbol-sahasi": "Længde på en fodboldbane",
    "eyfel-kulesi": "Eiffeltårnets højde (med antenne)",
    "bogaz-koprusu": "Længde på 15. juli-martyrernes bro (Istanbul)",
  },
  ru: {
    "insan-boyu": "Средний рост взрослого человека",
    zurafa: "Средний рост жирафа",
    "sehir-otobusu": "Длина городского автобуса",
    "mavi-balina": "Средняя длина синего кита",
    "futbol-sahasi": "Длина футбольного поля",
    "eyfel-kulesi": "Высота Эйфелевой башни (с антенной)",
    "bogaz-koprusu": "Длина моста 15 июля",
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
    placeholder: "Orn. 3",
    emptyState: "Geçerli bir değer girerek karşılaştırmaları görebilirsin.",
    intro: "için karşılaştırmalar:",
    closestMatch: "En yakın karşılaştırma",
  },
  en: {
    labels: {
      value: "Value",
      unit: "Unit",
    },
    placeholder: "E.g. 3",
    emptyState: "Enter a valid value to see the comparisons.",
    intro: "Comparisons for",
    closestMatch: "Closest comparison",
  },
  fr: {
    labels: {
      value: "Valeur",
      unit: "Unité",
    },
    placeholder: "E.g. 3",
    emptyState: "Saisissez une valeur valide pour voir les comparaisons.",
    intro: "Comparaisons pour",
    closestMatch: "Comparaison la plus proche",
  },
  es: {
    labels: {
      value: "Valor",
      unit: "Unidad",
    },
    placeholder: "E.g. 3",
    emptyState: "Introduce un valor válido para ver las comparaciones.",
    intro: "Comparaciones para",
    closestMatch: "Comparación más cercana",
  },
  "es-419": {
    labels: {
      value: "Valor",
      unit: "Unidad",
    },
    placeholder: "E.g. 3",
    emptyState: "Ingresa un valor válido para ver las comparaciones.",
    intro: "Comparaciones para",
    closestMatch: "Comparación más cercana",
  },
  pt: {
    labels: {
      value: "Valor",
      unit: "Unidade",
    },
    placeholder: "E.g. 3",
    emptyState: "Digite um valor válido para ver as comparações.",
    intro: "Comparações para",
    closestMatch: "Comparação mais próxima",
  },
  it: {
    labels: {
      value: "Valore",
      unit: "Unità",
    },
    placeholder: "E.g. 3",
    emptyState: "Inserisci un valore valido per vedere i confronti.",
    intro: "Confronti per",
    closestMatch: "Confronto più vicino",
  },
  nl: {
    labels: {
      value: "Waarde",
      unit: "Eenheid",
    },
    placeholder: "E.g. 3",
    emptyState: "Voer een geldige waarde in om de vergelijkingen te zien.",
    intro: "Vergelijkingen voor",
    closestMatch: "Dichtstbijzijnde vergelijking",
  },
  sv: {
    labels: {
      value: "Värde",
      unit: "Enhet",
    },
    placeholder: "E.g. 3",
    emptyState: "Ange ett giltigt värde för att se jämförelserna.",
    intro: "Jämförelser för",
    closestMatch: "Närmaste jämförelse",
  },
  no: {
    labels: {
      value: "Verdi",
      unit: "Enhet",
    },
    placeholder: "E.g. 3",
    emptyState: "Skriv inn en gyldig verdi for å se sammenligningene.",
    intro: "Sammenligninger for",
    closestMatch: "Nærmeste sammenligning",
  },
  da: {
    labels: {
      value: "Værdi",
      unit: "Enhed",
    },
    placeholder: "E.g. 3",
    emptyState: "Indtast en gyldig værdi for at se sammenligningerne.",
    intro: "Sammenligninger for",
    closestMatch: "Nærmeste sammenligning",
  },
  de: {
    labels: {
      value: "Wert",
      unit: "Einheit",
    },
    placeholder: "Z. B. 3",
    emptyState: "Geben Sie einen gültigen Wert ein, um die Vergleiche zu sehen.",
    intro: "Vergleiche für",
    closestMatch: "Nächster Vergleich",
  },
  ar: {
    labels: {
      value: "القيمة",
      unit: "الوحدة",
    },
    placeholder: "مثال: 3",
    emptyState: "أدخل قيمة صحيحة لعرض المقارنات.",
    intro: "مقارنات للقيمة",
    closestMatch: "أقرب مقارنة",
  },
uz: {
    labels: {
      value: "Qiymat",
      unit: "Birlik",
    },
    placeholder: "Mas. 3",
    emptyState: "Solishtirishlarni ko'rish uchun to'g'ri qiymat kiriting.",
    intro: "uchun solishtirishlar:",
    closestMatch: "Eng yaqin solishtirish",
  },
  bn: {
    labels: {
      value: "মান",
      unit: "একক",
    },
    placeholder: "E.g. 3",
    emptyState: "তুলনা দেখতে একটি সঠিক মান লিখুন।",
    intro: "এর জন্য তুলনা:",
    closestMatch: "সবচেয়ে কাছের তুলনা",
  },
  ru: {
    labels: {
      value: "Значение",
      unit: "Единица",
    },
    placeholder: "Например, 3",
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

export default function LengthComparisonTool({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const copy = copyByLocale[locale];
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState<LengthComparisonUnit>("m");

  const valueInMeters =
    parseNumericValue(value) * lengthComparisonUnitToMeters[unit];

  const comparisons = useMemo(
    () => calculateLengthComparisons(valueInMeters),
    [valueInMeters]
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
              setUnit(event.target.value as LengthComparisonUnit)
            }
          >
            <option value="cm">{unitOptionLabels[locale].cm}</option>
            <option value="m">{unitOptionLabels[locale].m}</option>
            <option value="km">{unitOptionLabels[locale].km}</option>
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
