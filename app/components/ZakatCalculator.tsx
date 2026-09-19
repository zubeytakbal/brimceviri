"use client";

import { useMemo, useState } from "react";
import { computeZakat, type NisabStandard } from "../converter/zakatCalculator";

type ZakatCalculatorProps = {
  goldPricePerGramUsd?: number | null;
  silverPricePerGramUsd?: number | null;
  priceUpdatedAtIso?: string | null;
};

function useNumericField(initial = "") {
  return useState(initial);
}

export default function ZakatCalculator({
  goldPricePerGramUsd = null,
  silverPricePerGramUsd = null,
  priceUpdatedAtIso = null,
}: ZakatCalculatorProps) {
  const [cash, setCash] = useNumericField("");
  const [bankSavings, setBankSavings] = useNumericField("");
  const [businessInventoryValue, setBusinessInventoryValue] = useNumericField("");
  const [receivables, setReceivables] = useNumericField("");
  const [debtsOwed, setDebtsOwed] = useNumericField("");
  const [goldGrams, setGoldGrams] = useNumericField("");
  const [goldKarat, setGoldKarat] = useState("21");
  const [silverGrams, setSilverGrams] = useNumericField("");
  const [silverPurityPercent, setSilverPurityPercent] = useState("92.5");
  const [nisabStandard, setNisabStandard] = useState<NisabStandard>("silver");

  const [manualGoldPrice, setManualGoldPrice] = useState("");
  const [manualSilverPrice, setManualSilverPrice] = useState("");

  const effectiveGoldPrice = goldPricePerGramUsd ?? (Number(manualGoldPrice) || null);
  const effectiveSilverPrice = silverPricePerGramUsd ?? (Number(manualSilverPrice) || null);

  const result = useMemo(() => {
    return computeZakat({
      cash: Number(cash),
      bankSavings: Number(bankSavings),
      businessInventoryValue: Number(businessInventoryValue),
      receivables: Number(receivables),
      debtsOwed: Number(debtsOwed),
      goldGrams: Number(goldGrams),
      goldKarat: Number(goldKarat),
      silverGrams: Number(silverGrams),
      silverPurityPercent: Number(silverPurityPercent),
      nisabStandard,
      goldPricePerGramUsd: effectiveGoldPrice,
      silverPricePerGramUsd: effectiveSilverPrice,
    });
  }, [
    cash,
    bankSavings,
    businessInventoryValue,
    receivables,
    debtsOwed,
    goldGrams,
    goldKarat,
    silverGrams,
    silverPurityPercent,
    nisabStandard,
    effectiveGoldPrice,
    effectiveSilverPrice,
  ]);

  function formatUsd(value: number) {
    return `$${value.toLocaleString("ar", { maximumFractionDigits: 2 })}`;
  }

  return (
    <div className="category-general-converter">
      {goldPricePerGramUsd ? (
        <p className="calculator-usage-hint">
          سعر الذهب الحالي: {formatUsd(goldPricePerGramUsd)} للجرام (خالص){" "}
          {silverPricePerGramUsd ? (
            <>
              — سعر الفضة الحالي: {formatUsd(silverPricePerGramUsd)} للجرام (خالصة)
            </>
          ) : null}
          {priceUpdatedAtIso ? " — سعر السوق العالمي، يُحدَّث تلقائيًا." : ""}
        </p>
      ) : (
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>سعر جرام الذهب الخالص (دولار)</span>
            <input
              inputMode="decimal"
              type="text"
              value={manualGoldPrice}
              onChange={(event) => setManualGoldPrice(event.target.value)}
              placeholder="تعذّر جلب السعر الحي، أدخله يدويًا"
            />
          </label>
          <label className="category-general-converter-field">
            <span>سعر جرام الفضة الخالصة (دولار)</span>
            <input
              inputMode="decimal"
              type="text"
              value={manualSilverPrice}
              onChange={(event) => setManualSilverPrice(event.target.value)}
              placeholder="تعذّر جلب السعر الحي، أدخله يدويًا"
            />
          </label>
        </div>
      )}

      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>النقد الحاضر (دولار)</span>
          <input inputMode="decimal" type="text" value={cash} onChange={(event) => setCash(event.target.value)} />
        </label>
        <label className="category-general-converter-field">
          <span>أرصدة البنوك والمدخرات (دولار)</span>
          <input
            inputMode="decimal"
            type="text"
            value={bankSavings}
            onChange={(event) => setBankSavings(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>قيمة عروض التجارة الحالية (دولار)</span>
          <input
            inputMode="decimal"
            type="text"
            value={businessInventoryValue}
            onChange={(event) => setBusinessInventoryValue(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>ديون مرجوة السداد لك (دولار)</span>
          <input
            inputMode="decimal"
            type="text"
            value={receivables}
            onChange={(event) => setReceivables(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>ديون مستحقة عليك (دولار)</span>
          <input
            inputMode="decimal"
            type="text"
            value={debtsOwed}
            onChange={(event) => setDebtsOwed(event.target.value)}
          />
        </label>
      </div>

      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>وزن الذهب (جرام)</span>
          <input
            inputMode="decimal"
            type="text"
            value={goldGrams}
            onChange={(event) => setGoldGrams(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>عيار الذهب</span>
          <select value={goldKarat} onChange={(event) => setGoldKarat(event.target.value)}>
            <option value="24">24 (خالص)</option>
            <option value="22">22</option>
            <option value="21">21</option>
            <option value="18">18</option>
            <option value="14">14</option>
          </select>
        </label>
        <label className="category-general-converter-field">
          <span>وزن الفضة (جرام)</span>
          <input
            inputMode="decimal"
            type="text"
            value={silverGrams}
            onChange={(event) => setSilverGrams(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>نقاوة الفضة (%)</span>
          <input
            inputMode="decimal"
            type="text"
            value={silverPurityPercent}
            onChange={(event) => setSilverPurityPercent(event.target.value)}
          />
        </label>
      </div>

      <div className="engineering-targets">
        <span>معيار النصاب</span>
        <div className="engineering-target-grid hydrostatic-target-grid">
          <button
            type="button"
            className={`engineering-target-button${nisabStandard === "silver" ? " is-active" : ""}`}
            onClick={() => setNisabStandard("silver")}
          >
            نصاب الفضة (595غ) — أحوط للفقراء
          </button>
          <button
            type="button"
            className={`engineering-target-button${nisabStandard === "gold" ? " is-active" : ""}`}
            onClick={() => setNisabStandard("gold")}
          >
            نصاب الذهب (85غ)
          </button>
        </div>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>أدخل بياناتك لعرض النتيجة.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>إجمالي المال الزكوي</span>
              <strong>{formatUsd(result.totalZakatableWealthUsd)}</strong>
            </div>
            <div>
              <span>قيمة النصاب المطلوب</span>
              <strong>{result.nisabValueUsd !== null ? formatUsd(result.nisabValueUsd) : "أدخل سعر المعدن أولًا"}</strong>
            </div>
            <div>
              <span>هل بلغ النصاب؟</span>
              <strong>{result.isAboveNisab ? "نعم، تجب الزكاة" : "لا، لم يبلغ النصاب بعد"}</strong>
            </div>
            <div>
              <span>الزكاة الواجبة (2.5%)</span>
              <strong>{formatUsd(result.zakatDueUsd)}</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        هذه الحاسبة تغطي زكاة النقد والمدخرات وعروض التجارة والذهب والفضة
        فقط، بشرط مرور حول (سنة هجرية كاملة) على بلوغ النصاب. لا تشمل زكاة
        الزروع والثمار أو الأنعام أو الركاز، فلها أحكام مختلفة. حلي الذهب
        والفضة المستخدم شخصيًا محل خلاف فقهي معتبر بين وجوب الزكاة فيه
        وعدمه، فإن كان لديك حلي استعمال يُفضّل استشارة جهة إفتاء موثوقة في
        بلدك. الأسعار والنتائج بالدولار الأمريكي للتبسيط، ويمكنك تحويلها
        إلى عملتك بسعر الصرف الحالي.
      </p>
    </div>
  );
}
