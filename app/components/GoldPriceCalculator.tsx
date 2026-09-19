"use client";

import { useMemo, useState } from "react";

type Metal = "gold" | "silver";
type WeightUnit = "gram" | "ounce" | "mesghal";

const WEIGHT_UNIT_IN_GRAMS: Record<WeightUnit, number> = {
  gram: 1,
  ounce: 31.1034768,
  mesghal: 4.608,
};

const weightUnitLabels: Record<WeightUnit, string> = {
  gram: "جرام",
  ounce: "أونصة (troy)",
  mesghal: "مثقال",
};

const currencyOptions: Array<{ code: string; label: string }> = [
  { code: "USD", label: "دولار أمريكي" },
  { code: "SAR", label: "ريال سعودي" },
  { code: "AED", label: "درهم إماراتي" },
  { code: "EGP", label: "جنيه مصري" },
  { code: "KWD", label: "دينار كويتي" },
  { code: "QAR", label: "ريال قطري" },
  { code: "BHD", label: "دينار بحريني" },
  { code: "OMR", label: "ريال عماني" },
  { code: "JOD", label: "دينار أردني" },
  { code: "IQD", label: "دينار عراقي" },
  { code: "MAD", label: "درهم مغربي" },
  { code: "DZD", label: "دينار جزائري" },
  { code: "TND", label: "دينار تونسي" },
  { code: "LYD", label: "دينار ليبي" },
  { code: "SYP", label: "ليرة سورية" },
  { code: "YER", label: "ريال يمني" },
  { code: "SDG", label: "جنيه سوداني" },
  { code: "EUR", label: "يورو" },
  { code: "GBP", label: "جنيه إسترليني" },
  { code: "TRY", label: "ليرة تركية" },
];

type GoldPriceCalculatorProps = {
  goldPricePerGramUsd?: number | null;
  silverPricePerGramUsd?: number | null;
  usdRates?: Record<string, number> | null;
};

export default function GoldPriceCalculator({
  goldPricePerGramUsd = null,
  silverPricePerGramUsd = null,
  usdRates = null,
}: GoldPriceCalculatorProps) {
  const [metal, setMetal] = useState<Metal>("gold");
  const [weight, setWeight] = useState("1");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("gram");
  const [karat, setKarat] = useState("21");
  const [currency, setCurrency] = useState("USD");
  const [manualPricePerGramUsd, setManualPricePerGramUsd] = useState("");

  const livePricePerGramUsd = metal === "gold" ? goldPricePerGramUsd : silverPricePerGramUsd;
  const effectivePricePerGramUsd = livePricePerGramUsd ?? (Number(manualPricePerGramUsd) || null);

  const exchangeRate = usdRates?.[currency] ?? (currency === "USD" ? 1 : null);

  const result = useMemo(() => {
    const weightValue = Number(weight);
    if (
      !Number.isFinite(weightValue) ||
      weightValue <= 0 ||
      !effectivePricePerGramUsd ||
      !exchangeRate
    ) {
      return null;
    }

    const grams = weightValue * WEIGHT_UNIT_IN_GRAMS[weightUnit];
    const purityFraction = metal === "gold" ? Number(karat) / 24 : 1;
    const pureGrams = grams * purityFraction;
    const valueUsd = pureGrams * effectivePricePerGramUsd;
    const valueInCurrency = valueUsd * exchangeRate;
    const pricePerGramInCurrency = effectivePricePerGramUsd * exchangeRate * purityFraction;

    return { valueInCurrency, pricePerGramInCurrency, pureGrams };
  }, [weight, weightUnit, karat, metal, effectivePricePerGramUsd, exchangeRate]);

  const currencyLabel = currencyOptions.find((item) => item.code === currency)?.label ?? currency;

  return (
    <div className="category-general-converter">
      <div className="engineering-targets">
        <span>المعدن</span>
        <div className="engineering-target-grid hydrostatic-target-grid">
          <button
            type="button"
            className={`engineering-target-button${metal === "gold" ? " is-active" : ""}`}
            onClick={() => setMetal("gold")}
          >
            الذهب
          </button>
          <button
            type="button"
            className={`engineering-target-button${metal === "silver" ? " is-active" : ""}`}
            onClick={() => setMetal("silver")}
          >
            الفضة
          </button>
        </div>
      </div>

      {!livePricePerGramUsd ? (
        <label className="category-general-converter-field">
          <span>سعر الجرام الخالص بالدولار (تعذّر جلب السعر الحي)</span>
          <input
            inputMode="decimal"
            type="text"
            value={manualPricePerGramUsd}
            onChange={(event) => setManualPricePerGramUsd(event.target.value)}
          />
        </label>
      ) : null}

      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>الوزن</span>
          <input inputMode="decimal" type="text" value={weight} onChange={(event) => setWeight(event.target.value)} />
        </label>
        <label className="category-general-converter-field">
          <span>وحدة الوزن</span>
          <select value={weightUnit} onChange={(event) => setWeightUnit(event.target.value as WeightUnit)}>
            {(Object.keys(weightUnitLabels) as WeightUnit[]).map((unit) => (
              <option key={unit} value={unit}>
                {weightUnitLabels[unit]}
              </option>
            ))}
          </select>
        </label>
        {metal === "gold" ? (
          <label className="category-general-converter-field">
            <span>العيار</span>
            <select value={karat} onChange={(event) => setKarat(event.target.value)}>
              <option value="24">24 (خالص)</option>
              <option value="22">22</option>
              <option value="21">21</option>
              <option value="18">18</option>
              <option value="14">14</option>
              <option value="9">9</option>
            </select>
          </label>
        ) : null}
        <label className="category-general-converter-field">
          <span>العملة</span>
          <select value={currency} onChange={(event) => setCurrency(event.target.value)}>
            {currencyOptions.map((item) => (
              <option key={item.code} value={item.code}>
                {item.label} ({item.code})
              </option>
            ))}
          </select>
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>
            {exchangeRate
              ? "أدخل وزنًا صحيحًا وتأكد من توفر سعر المعدن."
              : "تعذّر جلب سعر صرف هذه العملة حاليًا."}
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>القيمة الإجمالية</span>
              <strong>
                {result.valueInCurrency.toLocaleString("ar", { maximumFractionDigits: 2 })} {currency}
              </strong>
            </div>
            <div>
              <span>سعر الجرام ({currencyLabel})</span>
              <strong>
                {result.pricePerGramInCurrency.toLocaleString("ar", { maximumFractionDigits: 3 })} {currency}
              </strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        {livePricePerGramUsd
          ? "السعر مبني على سعر السوق العالمي الحي للأونصة (تروي)، ويُحدَّث تلقائيًا كل ساعة تقريبًا."
          : "تعذّر جلب السعر الحي حاليًا، السعر المدخل يدويًا هو المستخدم في الحساب."}
        {" "}أسعار الصرف تقريبية وقد تختلف قليلًا عن سعر الصرافة أو السوق
        الموازية في بلدك، كما أن سعر محلات الذهب الفعلي يضيف عادة مصنعية
        وهامش ربح فوق سعر المعدن الخام.
      </p>
    </div>
  );
}
