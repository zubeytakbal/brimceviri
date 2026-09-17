"use client";

import { useMemo, useState } from "react";
import {
  calculateDilution,
  type DilutionTarget,
} from "../../converter/dilutionCalculator";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 2) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString("uz-UZ", { maximumFractionDigits });
}

const targetLabelsUz: Record<DilutionTarget, string> = {
  c1: "Boshlang'ich Konsentratsiya (%)",
  v1: "Boshlang'ich Hajm (mL)",
  c2: "Maqsadli Konsentratsiya (%)",
  v2: "Maqsadli Hajm (mL)",
};

export default function AlcoholDilutionCalculatorUz() {
  const [target, setTarget] = useState<DilutionTarget>("v1");
  const [c1Input, setC1Input] = useState("96");
  const [v1Input, setV1Input] = useState("");
  const [c2Input, setC2Input] = useState("70");
  const [v2Input, setV2Input] = useState("1000");

  const result = useMemo(
    () =>
      calculateDilution({
        target,
        c1: parseNumericValue(c1Input),
        v1: parseNumericValue(v1Input),
        c2: parseNumericValue(c2Input),
        v2: parseNumericValue(v2Input),
      }),
    [target, c1Input, v1Input, c2Input, v2Input]
  );

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Qanday ishlaydi: bilgan uchta qiymatni kiriting (boshlang&apos;ich
          konsentratsiya/hajm va maqsadli konsentratsiya/hajmdan
          ikkitasini), yetishmayotgan to&apos;rtinchisini biz topamiz.
          Xuddi C₁V₁ = C₂V₂ bog&apos;liqligidan, mol/L o&apos;rniga
          foiz (%) konsentratsiya bilan foydalanadi.
        </p>
        <div className="engineering-targets">
          <span>Qaysi qiymatni hisoblamoqchisiz?</span>

          <div className="engineering-target-grid hydrostatic-target-grid">
            {(Object.keys(targetLabelsUz) as DilutionTarget[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`engineering-target-button${target === key ? " is-active" : ""}`}
                onClick={() => setTarget(key)}
              >
                {targetLabelsUz[key]}
              </button>
            ))}
          </div>
        </div>

        <div className="paint-calculator-grid">
          {target !== "c1" && (
            <label className="category-general-converter-field">
              <span>Boshlang&apos;ich Konsentratsiya (%)</span>
              <input
                inputMode="decimal"
                type="text"
                value={c1Input}
                onChange={(event) => setC1Input(event.target.value)}
              />
            </label>
          )}

          {target !== "v1" && (
            <label className="category-general-converter-field">
              <span>Boshlang&apos;ich Hajm (mL)</span>
              <input
                inputMode="decimal"
                type="text"
                value={v1Input}
                onChange={(event) => setV1Input(event.target.value)}
              />
            </label>
          )}

          {target !== "c2" && (
            <label className="category-general-converter-field">
              <span>Maqsadli Konsentratsiya (%)</span>
              <input
                inputMode="decimal"
                type="text"
                value={c2Input}
                onChange={(event) => setC2Input(event.target.value)}
              />
            </label>
          )}

          {target !== "v2" && (
            <label className="category-general-converter-field">
              <span>Maqsadli Hajm (mL)</span>
              <input
                inputMode="decimal"
                type="text"
                value={v2Input}
                onChange={(event) => setV2Input(event.target.value)}
              />
            </label>
          )}
        </div>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>To&apos;g&apos;ri qiymatlar kiritib natijani ko&apos;rishingiz mumkin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Boshlang&apos;ich Konsentratsiya</span>
              <strong>%{formatNumber(result.c1)}</strong>
            </div>
            <div>
              <span>Boshlang&apos;ich Hajm</span>
              <strong>{formatNumber(result.v1)} mL</strong>
            </div>
            <div>
              <span>Maqsadli Konsentratsiya</span>
              <strong>%{formatNumber(result.c2)}</strong>
            </div>
            <div>
              <span>Maqsadli Hajm</span>
              <strong>{formatNumber(result.v2)} mL</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Muhim:</strong> Bu vosita faqat C₁V₁ = C₂V₂
        bog&apos;liqligi bilan birlik aylantirishini amalga oshiradi —
        qaysi maqsadli konsentratsiyaning (masalan antiseptik uchun)
        mos ekanligini belgilamaydi yoki tavsiya qilmaydi.
      </p>
    </div>
  );
}
