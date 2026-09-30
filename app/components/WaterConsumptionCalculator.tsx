"use client";

import { useMemo, useState } from "react";
import type { Locale } from "../i18n/config";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import {
  calculateWaterConsumption,
  type WaterConsumptionCalculatorInput,
} from "../converter/waterConsumptionCalculator";

type WaterCopy = {
  labels: {
    consumption: string;
    price: string;
    fixedFee: string;
  };
  emptyState: string;
  resultLabels: {
    totalCost: string;
    liters: string;
  };
  note: string;
};

const copyByLocale: Record<Exclude<Locale, "ru">, WaterCopy> = {
  tr: {
    labels: {
      consumption: "Tüketim (m³)",
      price: "Birim Fiyat (₺/m³)",
      fixedFee: "Sabit Ücret (₺, isteğe bağlı)",
    },
    emptyState: "Geçerli tüketim ve fiyat girerek sonucu görebilirsin.",
    resultLabels: {
      totalCost: "Toplam Su Faturası",
      liters: "Tüketilen Su",
    },
    note: "Not: Hesaplanan değer, fiyat ve varsa sabit ücretin toplamıdır; gerçek faturadaki ek ücretler ayrı kalabilir.",
  },
  en: {
    labels: {
      consumption: "Consumption (m³)",
      price: "Unit Price (USD/m³)",
      fixedFee: "Fixed Fee (USD, optional)",
    },
    emptyState: "Enter valid consumption and price to see the result.",
    resultLabels: {
      totalCost: "Total Water Bill",
      liters: "Water Used",
    },
    note: "Note: This estimate includes the per-unit charge and any fixed fee. Additional invoice items may be separate.",
  },
  uz: {
    labels: {
      consumption: "Sarf (m³)",
      price: "Birlik Narxi (so'm/m³)",
      fixedFee: "Doimiy to'lov (so'm, ixtiyoriy)",
    },
    emptyState: "Natijani ko'rish uchun to'g'ri sarf va narx kiriting.",
    resultLabels: {
      totalCost: "Umumiy suv hisob-fakturası",
      liters: "Iste'mol qilingan suv",
    },
    note: "Eslatma: hisob-kitob birlik narxi va kerak bo'lsa doimiy to'lovni o'z ichiga oladi; haqiqiy hisob-fakturada qo'shimcha to'lovlar alohida bo'lishi mumkin.",
  },
  de: {
    labels: {
      consumption: "Verbrauch (m³)",
      price: "Einzelpreis (EUR/m³)",
      fixedFee: "Fixgebühr (EUR, optional)",
    },
    emptyState: "Geben Sie einen gültigen Verbrauch und Preis ein, um das Ergebnis zu sehen.",
    resultLabels: {
      totalCost: "Gesamtwasserrechnung",
      liters: "Verwendetes Wasser",
    },
    note: "Hinweis: Die Berechnung enthält den Verbrauchspreis und ggf. eine Fixgebühr; zusätzliche Rechnungspositionen können separat sein.",
  },
  fr: {
    labels: {
      consumption: "Consommation (m³)",
      price: "Prix unitaire (EUR/m³)",
      fixedFee: "Frais fixes (EUR, optionnel)",
    },
    emptyState: "Saisissez une consommation et un prix valides pour voir le résultat.",
    resultLabels: {
      totalCost: "Facture totale d'eau",
      liters: "Eau consommée",
    },
    note: "Note : le calcul inclut le prix au m³ et éventuellement des frais fixes ; d'autres éléments de facture peuvent être séparés.",
  },
  es: {
    labels: {
      consumption: "Consumo (m³)",
      price: "Precio unitario (EUR/m³)",
      fixedFee: "Cargo fijo (EUR, opcional)",
    },
    emptyState: "Introduce valores válidos para ver el resultado.",
    resultLabels: {
      totalCost: "Factura total de agua",
      liters: "Agua consumida",
    },
    note: "Nota: el cálculo incluye el precio por m³ y, si procede, un cargo fijo; otros conceptos pueden aparecer por separado.",
  },
  pt: {
    labels: {
      consumption: "Consumo (m³)",
      price: "Preço unitário (EUR/m³)",
      fixedFee: "Taxa fixa (EUR, opcional)",
    },
    emptyState: "Digite valores válidos para ver o resultado.",
    resultLabels: {
      totalCost: "Conta total de água",
      liters: "Água consumida",
    },
    note: "Nota: o cálculo inclui o preço por m³ e, se aplicável, uma taxa fixa; outros itens da conta podem ser separados.",
  },
  it: {
    labels: {
      consumption: "Consumo (m³)",
      price: "Prezzo unitario (EUR/m³)",
      fixedFee: "Canone fisso (EUR, opzionale)",
    },
    emptyState: "Inserisci valori validi per vedere il risultato.",
    resultLabels: {
      totalCost: "Bolletta totale dell'acqua",
      liters: "Acqua consumata",
    },
    note: "Nota: il calcolo include il prezzo per m³ e, se previsto, un canone fisso; altri elementi della bolletta possono essere separati.",
  },
  nl: {
    labels: {
      consumption: "Verbruik (m³)",
      price: "Prijs per eenheid (EUR/m³)",
      fixedFee: "Vaste vergoeding (EUR, optioneel)",
    },
    emptyState: "Voer geldige waarden in om het resultaat te zien.",
    resultLabels: {
      totalCost: "Totale waterrekening",
      liters: "Verbruikt water",
    },
    note: "Opmerking: de berekening bevat de prijs per m³ en een eventuele vaste vergoeding; extra rekeningposten kunnen apart staan.",
  },
  sv: {
    labels: {
      consumption: "Förbrukning (m³)",
      price: "Enhetspris (SEK/m³)",
      fixedFee: "Fast avgift (SEK, valfritt)",
    },
    emptyState: "Ange giltiga värden för att se resultatet.",
    resultLabels: {
      totalCost: "Total vattenräkning",
      liters: "Använt vatten",
    },
    note: "Obs: beräkningen inkluderar pris per m³ och eventuell fast avgift; extra fakturaposteringar kan vara separata.",
  },
  no: {
    labels: {
      consumption: "Forbruk (m³)",
      price: "Enhetspris (NOK/m³)",
      fixedFee: "Fast avgift (NOK, valgfritt)",
    },
    emptyState: "Angi gyldige verdier for å se resultatet.",
    resultLabels: {
      totalCost: "Total vannregning",
      liters: "Brukt vann",
    },
    note: "Merk: beregningen inkluderer pris per m³ og eventuell fast avgift; ekstra fakturaposteringer kan være separate.",
  },
  da: {
    labels: {
      consumption: "Forbrug (m³)",
      price: "Enhedspris (DKK/m³)",
      fixedFee: "Fast afgift (DKK, valgfri)",
    },
    emptyState: "Indtast gyldige værdier for at se resultatet.",
    resultLabels: {
      totalCost: "Samlet vandregning",
      liters: "Brugt vand",
    },
    note: "Bemærk: beregningen inkluderer pris pr. m³ og eventuel fast afgift; ekstra fakturaposter kan være adskilt.",
  },
  ar: {
    labels: {
      consumption: "الاستهلاك (م³)",
      price: "سعر الوحدة (لـ /م³)",
      fixedFee: "رسوم ثابتة (اختياري)",
    },
    emptyState: "أدخل قيمًا صحيحة لعرض النتيجة.",
    resultLabels: {
      totalCost: "إجمالي فاتورة المياه",
      liters: "الماء المستهلك",
    },
    note: "ملاحظة: الحساب يشمل سعر الوحدة وأي رسوم ثابتة إذا كانت موجودة، وقد تكون البنود الإضافية في الفاتورة منفصلة.",
  },
  bn: {
    labels: {
      consumption: "খরচ (m³)",
      price: "একক মূল্য (৳/m³)",
      fixedFee: "ফিক্সড ফি (৳, ঐচ্ছিক)",
    },
    emptyState: "ফলাফল দেখতে বৈধ মান লিখুন।",
    resultLabels: {
      totalCost: "মোট জল বিল",
      liters: "ব্যবহৃত জল",
    },
    note: "নোট: গণনা m³ প্রতি মূল্য এবং প্রযোজ্য ফিক্সড ফি নিয়ে তৈরি; ফ্যাক্টুর অন্যান্য আইটেম আলাদা থাকতে পারে।",
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

function formatCurrency(value: number, locale: Locale) {
  return `${formatLocalizedNumber(value, locale, { maximumFractionDigits: 2 })} ${locale === "tr" ? "₺" : locale === "en" ? "$" : locale === "de" ? "€" : locale === "uz" ? "so'm" : "€"}`;
}

export default function WaterConsumptionCalculator({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const copy = copyByLocale[locale === "ru" ? "en" : locale];

  const [consumptionM3, setConsumptionM3] = useState("20");
  const [pricePerM3, setPricePerM3] = useState("12");
  const [fixedFee, setFixedFee] = useState("");

  const input: WaterConsumptionCalculatorInput = useMemo(
    () => ({
      consumptionM3: parseNumericValue(consumptionM3),
      pricePerM3: parseNumericValue(pricePerM3),
      fixedFee: fixedFee.trim() ? parseNumericValue(fixedFee) : null,
    }),
    [consumptionM3, pricePerM3, fixedFee],
  );

  const result = useMemo(() => calculateWaterConsumption(input), [input]);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>{copy.labels.consumption}</span>
          <input
            inputMode="decimal"
            type="text"
            value={consumptionM3}
            onChange={(event) => setConsumptionM3(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.price}</span>
          <input
            inputMode="decimal"
            type="text"
            value={pricePerM3}
            onChange={(event) => setPricePerM3(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.fixedFee}</span>
          <input
            inputMode="decimal"
            type="text"
            placeholder="0"
            value={fixedFee}
            onChange={(event) => setFixedFee(event.target.value)}
          />
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>{copy.emptyState}</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>{copy.resultLabels.totalCost}</span>
              <strong>{formatCurrency(result.totalCost, locale)}</strong>
            </div>
            <div>
              <span>{copy.resultLabels.liters}</span>
              <strong>
                {formatLocalizedNumber(result.liters, locale, {
                  maximumFractionDigits: 0,
                })}{" "}L
              </strong>
            </div>
          </div>
        )}
      </div>

      <p className="paint-calculator-liters">{copy.note}</p>
    </div>
  );
}
