"use client";

import { useMemo, useState } from "react";
import type { Locale } from "../i18n/config";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import {
  calculateAcCapacity,
  type AcCapacityInput,
} from "../converter/acCapacityCalculator";

const copyByLocale: Record<
  Locale,
  {
    labels: {
      area: string;
      people: string;
      sunny: string;
      sunnyCheckbox: string;
      topFloor: string;
      topFloorCheckbox: string;
    };
    emptyState: string;
    resultLabels: {
      suggested: string;
      base: string;
      occupant: string;
      total: string;
    };
  }
> = {
  tr: {
    labels: {
      area: "Oda Alani (m2)",
      people: "Odada Bulunan Kisi Sayisi",
      sunny: "Oda gun boyu gunes aliyor mu?",
      sunnyCheckbox: "Evet, dogrudan gunes aliyor",
      topFloor: "Ust kat / cati kati mi?",
      topFloorCheckbox: "Evet, en ust kat veya cati kati",
    },
    emptyState: "Gecerli degerler girerek sonucu gorebilirsin.",
    resultLabels: {
      suggested: "Onerilen klima kapasitesi",
      base: "Alan bazli ihtiyac",
      occupant: "Kisi bazli ek yuk",
      total: "Toplam hesaplanan ihtiyac",
    },
  },
  en: {
    labels: {
      area: "Room Area (m2)",
      people: "Number of People in the Room",
      sunny: "Does the room get sun all day?",
      sunnyCheckbox: "Yes, it receives direct sunlight",
      topFloor: "Top floor / attic room?",
      topFloorCheckbox: "Yes, top floor or attic",
    },
    emptyState: "Enter valid values to see the result.",
    resultLabels: {
      suggested: "Suggested AC capacity",
      base: "Area-based load",
      occupant: "Occupant load",
      total: "Total estimated load",
    },
  },
  de: {
    labels: {
      area: "Raumflaeche (m2)",
      people: "Anzahl Personen im Raum",
      sunny: "Bekommt der Raum den ganzen Tag Sonne?",
      sunnyCheckbox: "Ja, direkte Sonneneinstrahlung",
      topFloor: "Obergeschoss / Dachgeschoss?",
      topFloorCheckbox: "Ja, oberste Etage oder Dachgeschoss",
    },
    emptyState: "Geben Sie gueltige Werte ein, um das Ergebnis zu sehen.",
    resultLabels: {
      suggested: "Empfohlene Klima-Leistung",
      base: "Flaechenbasierter Bedarf",
      occupant: "Zusatzlast durch Personen",
      total: "Gesamter berechneter Bedarf",
    },
  },
  ar: {
    labels: {
      area: "مساحة الغرفة (م2)",
      people: "عدد الأشخاص في الغرفة",
      sunny: "هل تتعرض الغرفة للشمس طوال اليوم؟",
      sunnyCheckbox: "نعم، يوجد تعرض مباشر للشمس",
      topFloor: "هل الغرفة في الطابق الأخير أو العلية؟",
      topFloorCheckbox: "نعم، في الطابق الأخير أو العلية",
    },
    emptyState: "أدخل قيمًا صحيحة لعرض النتيجة.",
    resultLabels: {
      suggested: "السعة المقترحة للمكيف",
      base: "الحمل الأساسي حسب المساحة",
      occupant: "الحمل الإضافي بسبب الأشخاص",
      total: "إجمالي الحمل المحسوب",
    },
  },
  uz: {
    labels: {
      area: "Room Area (m2)",
      people: "Number of People in the Room",
      sunny: "Does the room get sun all day?",
      sunnyCheckbox: "Yes, it receives direct sunlight",
      topFloor: "Top floor / attic room?",
      topFloorCheckbox: "Yes, top floor or attic",
    },
    emptyState: "Enter valid values to see the result.",
    resultLabels: {
      suggested: "Suggested AC capacity",
      base: "Area-based load",
      occupant: "Occupant load",
      total: "Total estimated load",
    },
  },
  bn: {
    labels: {
      area: "Room Area (m2)",
      people: "Number of People in the Room",
      sunny: "Does the room get sun all day?",
      sunnyCheckbox: "Yes, it receives direct sunlight",
      topFloor: "Top floor / attic room?",
      topFloorCheckbox: "Yes, top floor or attic",
    },
    emptyState: "Enter valid values to see the result.",
    resultLabels: {
      suggested: "Suggested AC capacity",
      base: "Area-based load",
      occupant: "Occupant load",
      total: "Total estimated load",
    },
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

function formatBtu(value: number, locale: Locale) {
  return `${formatLocalizedNumber(Math.round(value), locale)} BTU`;
}

export default function AcCapacityCalculator({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const copy = copyByLocale[locale];
  const [areaM2, setAreaM2] = useState("20");
  const [occupantCount, setOccupantCount] = useState("1");
  const [isSunny, setIsSunny] = useState(false);
  const [isTopFloor, setIsTopFloor] = useState(false);

  const input: AcCapacityInput = useMemo(
    () => ({
      areaM2: parseNumericValue(areaM2),
      occupantCount: parseNumericValue(occupantCount),
      isSunny,
      isTopFloor,
    }),
    [areaM2, occupantCount, isSunny, isTopFloor]
  );

  const result = useMemo(() => calculateAcCapacity(input), [input]);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>{copy.labels.area}</span>
          <input
            inputMode="decimal"
            type="text"
            value={areaM2}
            onChange={(event) => setAreaM2(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.people}</span>
          <input
            inputMode="numeric"
            type="text"
            value={occupantCount}
            onChange={(event) => setOccupantCount(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>{copy.labels.sunny}</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={isSunny}
              onChange={(event) => setIsSunny(event.target.checked)}
            />
            {copy.labels.sunnyCheckbox}
          </span>
        </label>

        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>{copy.labels.topFloor}</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={isTopFloor}
              onChange={(event) => setIsTopFloor(event.target.checked)}
            />
            {copy.labels.topFloorCheckbox}
          </span>
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>{copy.emptyState}</strong>
        ) : (
          <>
            <p className="paint-calculator-liters">
              {copy.resultLabels.suggested}:{" "}
              <strong>{formatBtu(result.suggestedCapacity, locale)}</strong>
            </p>

            <div className="paint-calculator-result-grid">
              <div>
                <span>{copy.resultLabels.base}</span>
                <strong>{formatBtu(result.baseBtu, locale)}</strong>
              </div>
              <div>
                <span>{copy.resultLabels.occupant}</span>
                <strong>{formatBtu(result.occupantBtu, locale)}</strong>
              </div>
              <div>
                <span>{copy.resultLabels.total}</span>
                <strong>{formatBtu(result.totalBtu, locale)}</strong>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
