"use client";

import { useMemo, useState } from "react";
import type { Locale } from "../i18n/config";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import { formatWithCurrency } from "./localeCurrency";
import {
  calculateElectricityConsumption,
  type ElectricityConsumptionInput,
} from "../converter/electricityConsumptionCalculator";

const copyByLocale: Record<
  Exclude<Locale, "ru">,
  {
    labels: {
      power: string;
      hours: string;
      days: string;
      price: string;
    };
    placeholder: string;
    emptyState: string;
    resultLabels: {
      monthly: string;
      daily: string;
      yearly: string;
      yearlyCost: string;
      costHint: string;
    };
  }
> = {
  tr: {
    labels: {
      power: "Cihaz Gucu (Watt)",
      hours: "Gunluk Kullanim Suresi (saat)",
      days: "Ayda Kac Gun Kullaniliyor",
      price: "Elektrik Birim Fiyati (TL/kWh) - istege bagli",
    },
    placeholder: "Faturandaki kWh fiyati",
    emptyState: "Gecerli degerler girerek sonucu gorebilirsin.",
    resultLabels: {
      monthly: "Aylik tuketim",
      daily: "Gunluk tuketim",
      yearly: "Yillik tuketim",
      yearlyCost: "Yillik maliyet",
      costHint: "Maliyeti de gormek icin faturandaki kWh birim fiyatini gir.",
    },
  },
  en: {
    labels: {
      power: "Appliance Power (Watt)",
      hours: "Daily Usage Time (hours)",
      days: "Days Used Per Month",
      price: "Electricity Rate (EUR/kWh) - optional",
    },
    placeholder: "Price per kWh from your bill",
    emptyState: "Enter valid values to see the result.",
    resultLabels: {
      monthly: "Monthly consumption",
      daily: "Daily consumption",
      yearly: "Yearly consumption",
      yearlyCost: "Yearly cost",
      costHint: "Enter your electricity price per kWh to see the cost estimate.",
    },
  },
  fr: {
    labels: {
      power: "Puissance de l'appareil (watts)",
      hours: "Durée d'utilisation par jour (heures)",
      days: "Jours d'utilisation par mois",
      price: "Prix de l'électricité (EUR/kWh) - facultatif",
    },
    placeholder: "Prix du kWh indiqué sur votre facture",
    emptyState: "Saisissez des valeurs valides pour voir le résultat.",
    resultLabels: {
      monthly: "Consommation mensuelle",
      daily: "Consommation journalière",
      yearly: "Consommation annuelle",
      yearlyCost: "Coût annuel",
      costHint: "Saisissez le prix du kWh pour estimer le coût.",
    },
  },
  es: {
    labels: {
      power: "Potencia del aparato (vatios)",
      hours: "Tiempo de uso diario (horas)",
      days: "Días de uso al mes",
      price: "Precio de la electricidad (EUR/kWh) - opcional",
    },
    placeholder: "Precio del kWh de tu factura",
    emptyState: "Introduce valores válidos para ver el resultado.",
    resultLabels: {
      monthly: "Consumo mensual",
      daily: "Consumo diario",
      yearly: "Consumo anual",
      yearlyCost: "Coste anual",
      costHint: "Introduce el precio del kWh para estimar el coste.",
    },
  },
  "es-419": {
    labels: {
      power: "Potencia del aparato (watts)",
      hours: "Tiempo de uso diario (horas)",
      days: "Días de uso al mes",
      price: "Tarifa eléctrica ($/kWh) - opcional",
    },
    placeholder: "Precio del kWh de tu recibo",
    emptyState: "Ingresa valores válidos para ver el resultado.",
    resultLabels: {
      monthly: "Consumo mensual",
      daily: "Consumo diario",
      yearly: "Consumo anual",
      yearlyCost: "Costo anual",
      costHint: "Ingresa el precio del kWh para estimar el costo.",
    },
  },
  pt: {
    labels: {
      power: "Potência do aparelho (watts)",
      hours: "Tempo de uso diário (horas)",
      days: "Dias de uso por mês",
      price: "Tarifa de energia (R$/kWh) - opcional",
    },
    placeholder: "Preço do kWh na sua conta de luz",
    emptyState: "Digite valores válidos para ver o resultado.",
    resultLabels: {
      monthly: "Consumo mensal",
      daily: "Consumo diário",
      yearly: "Consumo anual",
      yearlyCost: "Custo anual",
      costHint: "Digite o preço do kWh para estimar o custo.",
    },
  },
  it: {
    labels: {
      power: "Potenza dell'apparecchio (watt)",
      hours: "Tempo di utilizzo giornaliero (ore)",
      days: "Giorni di utilizzo al mese",
      price: "Prezzo dell'energia (EUR/kWh) - facoltativo",
    },
    placeholder: "Prezzo del kWh in bolletta",
    emptyState: "Inserisci valori validi per vedere il risultato.",
    resultLabels: {
      monthly: "Consumo mensile",
      daily: "Consumo giornaliero",
      yearly: "Consumo annuo",
      yearlyCost: "Costo annuo",
      costHint: "Inserisci il prezzo del kWh per stimare il costo.",
    },
  },
  nl: {
    labels: {
      power: "Vermogen van het apparaat (watt)",
      hours: "Dagelijkse gebruiksduur (uur)",
      days: "Gebruiksdagen per maand",
      price: "Stroomprijs (EUR/kWh) - optioneel",
    },
    placeholder: "Prijs per kWh op je energierekening",
    emptyState: "Voer geldige waarden in om het resultaat te zien.",
    resultLabels: {
      monthly: "Maandelijks verbruik",
      daily: "Dagelijks verbruik",
      yearly: "Jaarlijks verbruik",
      yearlyCost: "Jaarlijkse kosten",
      costHint: "Vul je prijs per kWh in om de kosten te schatten.",
    },
  },
  sv: {
    labels: {
      power: "Apparatens effekt (watt)",
      hours: "Daglig användningstid (timmar)",
      days: "Användningsdagar per månad",
      price: "Elpris (kr/kWh) - valfritt",
    },
    placeholder: "Pris per kWh från din elräkning",
    emptyState: "Ange giltiga värden för att se resultatet.",
    resultLabels: {
      monthly: "Månadsförbrukning",
      daily: "Daglig förbrukning",
      yearly: "Årsförbrukning",
      yearlyCost: "Årskostnad",
      costHint: "Ange ditt elpris per kWh för att se en kostnadsuppskattning.",
    },
  },
  no: {
    labels: {
      power: "Apparatets effekt (watt)",
      hours: "Daglig brukstid (timer)",
      days: "Bruksdager per måned",
      price: "Strømpris (kr/kWh) - valgfritt",
    },
    placeholder: "Pris per kWh fra strømregningen",
    emptyState: "Angi gyldige verdier for å se resultatet.",
    resultLabels: {
      monthly: "Månedlig forbruk",
      daily: "Daglig forbruk",
      yearly: "Årlig forbruk",
      yearlyCost: "Årlig kostnad",
      costHint: "Angi strømprisen per kWh for å se et kostnadsestimat.",
    },
  },
  da: {
    labels: {
      power: "Apparatets effekt (watt)",
      hours: "Daglig brugstid (timer)",
      days: "Brugsdage pr. måned",
      price: "Elpris (kr./kWh) - valgfrit",
    },
    placeholder: "Pris pr. kWh fra din elregning",
    emptyState: "Indtast gyldige værdier for at se resultatet.",
    resultLabels: {
      monthly: "Månedligt forbrug",
      daily: "Dagligt forbrug",
      yearly: "Årligt forbrug",
      yearlyCost: "Årlig udgift",
      costHint: "Indtast din elpris pr. kWh for at se et prisoverslag.",
    },
  },
  de: {
    labels: {
      power: "Geräteleistung (Watt)",
      hours: "Tägliche Nutzungsdauer (Stunden)",
      days: "Nutzungstage pro Monat",
      price: "Strompreis (EUR/kWh) - optional",
    },
    placeholder: "Preis pro kWh aus Ihrer Rechnung",
    emptyState: "Geben Sie gültige Werte ein, um das Ergebnis zu sehen.",
    resultLabels: {
      monthly: "Monatlicher Verbrauch",
      daily: "Täglicher Verbrauch",
      yearly: "Jährlicher Verbrauch",
      yearlyCost: "Jährliche Kosten",
      costHint: "Geben Sie Ihren Strompreis pro kWh ein, um die Kosten zu sehen.",
    },
  },
  ar: {
    labels: {
      power: "قدرة الجهاز (واط)",
      hours: "مدة الاستخدام اليومية (ساعة)",
      days: "عدد أيام الاستخدام شهريًا",
      price: "سعر الكهرباء (لكل kWh) - اختياري",
    },
    placeholder: "سعر الكيلوواط ساعة من فاتورتك",
    emptyState: "أدخل قيمًا صحيحة لعرض النتيجة.",
    resultLabels: {
      monthly: "الاستهلاك الشهري",
      daily: "الاستهلاك اليومي",
      yearly: "الاستهلاك السنوي",
      yearlyCost: "التكلفة السنوية",
      costHint: "أدخل سعر الكهرباء لكل kWh لعرض تقدير التكلفة.",
    },
  },
uz: {
    labels: {
      power: "Qurilma Quvvati (Vatt)",
      hours: "Kunlik Foydalanish Vaqti (soat)",
      days: "Oyiga Necha Kun Ishlatiladi",
      price: "Elektr Narxi (so'm/kWh) - ixtiyoriy",
    },
    placeholder: "Hisob-fakturangizdagi kWh narxi",
    emptyState: "Natijani ko'rish uchun to'g'ri qiymatlar kiriting.",
    resultLabels: {
      monthly: "Oylik sarf",
      daily: "Kunlik sarf",
      yearly: "Yillik sarf",
      yearlyCost: "Yillik xarajat",
      costHint: "Xarajatni ham ko'rish uchun hisob-fakturangizdagi kWh narxini kiriting.",
    },
  },
bn: {
    labels: {
      power: "যন্ত্রের ক্ষমতা (ওয়াট)",
      hours: "দৈনিক ব্যবহারের সময় (ঘণ্টা)",
      days: "মাসে ব্যবহারের দিন",
      price: "বিদ্যুতের দাম (৳/kWh) - ঐচ্ছিক",
    },
    placeholder: "বিল অনুযায়ী প্রতি kWh-এর দাম",
    emptyState: "ফলাফল দেখতে বৈধ মান লিখুন।",
    resultLabels: {
      monthly: "মাসিক খরচ (বিদ্যুৎ)",
      daily: "দৈনিক খরচ (বিদ্যুৎ)",
      yearly: "বার্ষিক খরচ (বিদ্যুৎ)",
      yearlyCost: "বার্ষিক ব্যয়",
      costHint: "খরচের হিসাব দেখতে প্রতি kWh-এর দাম লিখুন।",
    },
  },
};

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return null;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatKwh(value: number, locale: Locale) {
  return `${formatLocalizedNumber(value, locale, { maximumFractionDigits: 2 })} kWh`;
}

function formatCurrency(value: number, locale: Locale) {
  return formatWithCurrency(formatLocalizedNumber(value, locale, { maximumFractionDigits: 2 }), locale);
}

export default function ElectricityConsumptionCalculator({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const copy = copyByLocale[locale === "ru" ? "en" : locale];
  const [powerWatt, setPowerWatt] = useState("1500");
  const [hoursPerDay, setHoursPerDay] = useState("2");
  const [daysPerMonth, setDaysPerMonth] = useState("30");
  const [kwhPrice, setKwhPrice] = useState("");

  const input: ElectricityConsumptionInput = useMemo(
    () => ({
      powerWatt: parseNumericValue(powerWatt) ?? Number.NaN,
      hoursPerDay: parseNumericValue(hoursPerDay) ?? Number.NaN,
      daysPerMonth: parseNumericValue(daysPerMonth) ?? Number.NaN,
      kwhPrice: parseNumericValue(kwhPrice),
    }),
    [powerWatt, hoursPerDay, daysPerMonth, kwhPrice]
  );

  const result = useMemo(
    () => calculateElectricityConsumption(input),
    [input]
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>{copy.labels.power}</span>
          <input
            inputMode="decimal"
            type="text"
            value={powerWatt}
            onChange={(event) => setPowerWatt(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.hours}</span>
          <input
            inputMode="decimal"
            type="text"
            value={hoursPerDay}
            onChange={(event) => setHoursPerDay(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.days}</span>
          <input
            inputMode="numeric"
            type="text"
            value={daysPerMonth}
            onChange={(event) => setDaysPerMonth(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.price}</span>
          <input
            inputMode="decimal"
            type="text"
            placeholder={copy.placeholder}
            value={kwhPrice}
            onChange={(event) => setKwhPrice(event.target.value)}
          />
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>{copy.emptyState}</strong>
        ) : (
          <>
            <p className="paint-calculator-liters">
              {copy.resultLabels.monthly}: <strong>{formatKwh(result.monthlyKwh, locale)}</strong>
              {result.monthlyCost !== null && (
                <>
                  {" "}
                  ~ <strong>{formatCurrency(result.monthlyCost, locale)}</strong>
                </>
              )}
            </p>

            <div className="paint-calculator-result-grid">
              <div>
                <span>{copy.resultLabels.daily}</span>
                <strong>{formatKwh(result.dailyKwh, locale)}</strong>
              </div>
              <div>
                <span>{copy.resultLabels.yearly}</span>
                <strong>{formatKwh(result.yearlyKwh, locale)}</strong>
              </div>
              {result.yearlyCost !== null && (
                <div>
                  <span>{copy.resultLabels.yearlyCost}</span>
                  <strong>{formatCurrency(result.yearlyCost, locale)}</strong>
                </div>
              )}
            </div>

            {result.monthlyCost === null && (
              <p className="category-general-converter-equality">
                {copy.resultLabels.costHint}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
