"use client";

import { useMemo, useState } from "react";
import type { Locale } from "../i18n/config";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import {
  calculateAcCapacity,
  type AcCapacityInput,
} from "../converter/acCapacityCalculator";

const copyByLocale: Record<
  Exclude<Locale, "ru">,
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
  // fr: bu bileşen hiçbir Fransızca rotadan çağrılmıyor (Fransızca için
  // hesaplayıcı planlanmıyor); Locale birleşimine "fr" eklenince tip
  // güvenliği için İngilizce kopya yeniden kullanıldı.
  fr: {
    labels: {
      area: "Surface de la pièce (m²)",
      people: "Nombre de personnes dans la pièce",
      sunny: "La pièce est-elle ensoleillée toute la journée ?",
      sunnyCheckbox: "Oui, elle reçoit la lumière directe du soleil",
      topFloor: "Pièce sous les toits / dernier étage ?",
      topFloorCheckbox: "Oui, dernier étage ou combles",
    },
    emptyState: "Saisissez des valeurs valides pour voir le résultat.",
    resultLabels: {
      suggested: "Puissance de climatisation conseillée",
      base: "Charge liée à la surface",
      occupant: "Charge liée aux occupants",
      total: "Charge totale estimée",
    },
  },
  es: {
    labels: {
      area: "Superficie de la habitación (m²)",
      people: "Número de personas en la habitación",
      sunny: "¿Le da el sol todo el día?",
      sunnyCheckbox: "Sí, recibe luz solar directa",
      topFloor: "¿Último piso / buhardilla?",
      topFloorCheckbox: "Sí, último piso o buhardilla",
    },
    emptyState: "Introduce valores válidos para ver el resultado.",
    resultLabels: {
      suggested: "Capacidad de aire acondicionado recomendada",
      base: "Carga por superficie",
      occupant: "Carga por ocupantes",
      total: "Carga total estimada",
    },
  },
  "es-419": {
    labels: {
      area: "Superficie de la habitación (m²)",
      people: "Número de personas en la habitación",
      sunny: "¿Le da el sol todo el día?",
      sunnyCheckbox: "Sí, recibe luz solar directa",
      topFloor: "¿Último piso / ático?",
      topFloorCheckbox: "Sí, último piso o ático",
    },
    emptyState: "Ingresa valores válidos para ver el resultado.",
    resultLabels: {
      suggested: "Capacidad de aire acondicionado recomendada",
      base: "Carga por superficie",
      occupant: "Carga por ocupantes",
      total: "Carga total estimada",
    },
  },
  pt: {
    labels: {
      area: "Área do cômodo (m²)",
      people: "Número de pessoas no cômodo",
      sunny: "O cômodo recebe sol o dia todo?",
      sunnyCheckbox: "Sim, recebe luz solar direta",
      topFloor: "Último andar / sótão?",
      topFloorCheckbox: "Sim, último andar ou sótão",
    },
    emptyState: "Digite valores válidos para ver o resultado.",
    resultLabels: {
      suggested: "Capacidade de ar-condicionado sugerida",
      base: "Carga pela área",
      occupant: "Carga pelos ocupantes",
      total: "Carga total estimada",
    },
  },
  it: {
    labels: {
      area: "Superficie della stanza (m²)",
      people: "Numero di persone nella stanza",
      sunny: "La stanza prende sole tutto il giorno?",
      sunnyCheckbox: "Sì, riceve luce solare diretta",
      topFloor: "Ultimo piano / mansarda?",
      topFloorCheckbox: "Sì, ultimo piano o mansarda",
    },
    emptyState: "Inserisci valori validi per vedere il risultato.",
    resultLabels: {
      suggested: "Potenza del climatizzatore consigliata",
      base: "Carico dovuto alla superficie",
      occupant: "Carico dovuto alle persone",
      total: "Carico totale stimato",
    },
  },
  nl: {
    labels: {
      area: "Oppervlakte van de kamer (m²)",
      people: "Aantal personen in de kamer",
      sunny: "Krijgt de kamer de hele dag zon?",
      sunnyCheckbox: "Ja, er valt direct zonlicht binnen",
      topFloor: "Bovenste verdieping / zolderkamer?",
      topFloorCheckbox: "Ja, bovenste verdieping of zolder",
    },
    emptyState: "Voer geldige waarden in om het resultaat te zien.",
    resultLabels: {
      suggested: "Aanbevolen airco-capaciteit",
      base: "Belasting op basis van oppervlakte",
      occupant: "Belasting door personen",
      total: "Totale geschatte belasting",
    },
  },
  sv: {
    labels: {
      area: "Rummets yta (m²)",
      people: "Antal personer i rummet",
      sunny: "Får rummet sol hela dagen?",
      sunnyCheckbox: "Ja, det får direkt solljus",
      topFloor: "Översta våningen / vindsrum?",
      topFloorCheckbox: "Ja, översta våningen eller vind",
    },
    emptyState: "Ange giltiga värden för att se resultatet.",
    resultLabels: {
      suggested: "Rekommenderad kylkapacitet",
      base: "Last baserad på yta",
      occupant: "Last från personer",
      total: "Total uppskattad last",
    },
  },
  no: {
    labels: {
      area: "Romareal (m²)",
      people: "Antall personer i rommet",
      sunny: "Får rommet sol hele dagen?",
      sunnyCheckbox: "Ja, det får direkte sollys",
      topFloor: "Øverste etasje / loftsrom?",
      topFloorCheckbox: "Ja, øverste etasje eller loft",
    },
    emptyState: "Angi gyldige verdier for å se resultatet.",
    resultLabels: {
      suggested: "Anbefalt kjølekapasitet",
      base: "Last basert på areal",
      occupant: "Last fra personer",
      total: "Total beregnet last",
    },
  },
  da: {
    labels: {
      area: "Rummets areal (m²)",
      people: "Antal personer i rummet",
      sunny: "Får rummet sol hele dagen?",
      sunnyCheckbox: "Ja, det får direkte sollys",
      topFloor: "Øverste etage / loftsrum?",
      topFloorCheckbox: "Ja, øverste etage eller loft",
    },
    emptyState: "Indtast gyldige værdier for at se resultatet.",
    resultLabels: {
      suggested: "Anbefalet kølekapacitet",
      base: "Belastning ud fra areal",
      occupant: "Belastning fra personer",
      total: "Samlet anslået belastning",
    },
  },
  de: {
    labels: {
      area: "Raumfläche (m2)",
      people: "Anzahl Personen im Raum",
      sunny: "Bekommt der Raum den ganzen Tag Sonne?",
      sunnyCheckbox: "Ja, direkte Sonneneinstrahlung",
      topFloor: "Obergeschoss / Dachgeschoss?",
      topFloorCheckbox: "Ja, oberste Etage oder Dachgeschoss",
    },
    emptyState: "Geben Sie gültige Werte ein, um das Ergebnis zu sehen.",
    resultLabels: {
      suggested: "Empfohlene Klima-Leistung",
      base: "Flächenbasierter Bedarf",
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
      area: "Xona Maydoni (m2)",
      people: "Xonadagi Odamlar Soni",
      sunny: "Xona kun bo'yi quyosh nurini oladimi?",
      sunnyCheckbox: "Ha, to'g'ridan-to'g'ri quyosh tushadi",
      topFloor: "Eng yuqori qavat / chordoq xonami?",
      topFloorCheckbox: "Ha, eng yuqori qavat yoki chordoq",
    },
    emptyState: "Natijani ko'rish uchun to'g'ri qiymatlar kiriting.",
    resultLabels: {
      suggested: "Tavsiya etilgan konditsioner quvvati",
      base: "Maydonga asoslangan ehtiyoj",
      occupant: "Odamlarga bog'liq qo'shimcha yuk",
      total: "Jami hisoblangan ehtiyoj",
    },
  },
  bn: {
    labels: {
      area: "ঘরের ক্ষেত্রফল (বর্গমিটার)",
      people: "ঘরে মানুষের সংখ্যা",
      sunny: "ঘরে কি সারাদিন রোদ আসে?",
      sunnyCheckbox: "হ্যাঁ, সরাসরি সূর্যের আলো পায়",
      topFloor: "সবচেয়ে উপরের তলা / চিলেকোঠা?",
      topFloorCheckbox: "হ্যাঁ, উপরের তলা বা চিলেকোঠা",
    },
    emptyState: "ফলাফল দেখতে বৈধ মান লিখুন।",
    resultLabels: {
      suggested: "প্রস্তাবিত এসির ক্ষমতা",
      base: "ক্ষেত্রফলভিত্তিক লোড",
      occupant: "মানুষের কারণে লোড",
      total: "মোট আনুমানিক লোড",
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
  const copy = copyByLocale[locale === "ru" ? "en" : locale];
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
