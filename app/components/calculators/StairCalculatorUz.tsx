"use client";

import { useMemo, useState } from "react";
import { calculateStairs } from "../../converter/stairCalculator";

const errorMessagesUz: Record<string, string> = {
  "Toplam yükseklik 0'dan büyük olmalı.": "Umumiy balandlik 0 dan katta bo'lishi kerak.",
  "İstenen rıht yüksekliği 0'dan büyük olmalı.": "Xohlagan zina balandligi 0 dan katta bo'lishi kerak.",
};

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

export default function StairCalculatorUz() {
  const [totalHeightCm, setTotalHeightCm] = useState("280");
  const [desiredRiserCm, setDesiredRiserCm] = useState("17.5");
  const [availableRunCm, setAvailableRunCm] = useState("");

  const result = useMemo(
    () =>
      calculateStairs({
        totalHeightCm: parseNumericValue(totalHeightCm),
        desiredRiserCm: parseNumericValue(desiredRiserCm),
        availableRunCm: parseNumericValue(availableRunCm),
      }),
    [totalHeightCm, desiredRiserCm, availableRunCm]
  );

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Umumiy Balandlik (sm)</span>
            <input
              inputMode="decimal"
              type="text"
              value={totalHeightCm}
              onChange={(event) => setTotalHeightCm(event.target.value)}
            />
          </label>
          <label className="category-general-converter-field">
            <span>Xohlagan Zina Balandligi (sm)</span>
            <input
              inputMode="decimal"
              type="text"
              value={desiredRiserCm}
              onChange={(event) => setDesiredRiserCm(event.target.value)}
            />
          </label>
          <label className="category-general-converter-field">
            <span>Mavjud Gorizontal Uzunlik (sm, ixtiyoriy)</span>
            <input
              inputMode="decimal"
              type="text"
              value={availableRunCm}
              onChange={(event) => setAvailableRunCm(event.target.value)}
            />
          </label>
        </div>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result.success ? (
          <strong>{errorMessagesUz[result.message] ?? result.message}</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Zinapoya Soni</span>
              <strong>{result.result.stepCount}</strong>
            </div>
            <div>
              <span>Zina Balandligi</span>
              <strong>{formatNumber(result.result.riserCm)} sm</strong>
            </div>
            <div>
              <span>Zina Chuqurligi (Blondel)</span>
              <strong>{formatNumber(result.result.treadCm)} sm</strong>
            </div>
            <div>
              <span>Umumiy Gorizontal Uzunlik</span>
              <strong>{formatNumber(result.result.totalRunCm, 1)} sm</strong>
            </div>
            <div>
              <span>Zina Balandligi Qulayligi</span>
              <strong>
                {result.result.isRiserComfortable ? "Mos (16-20 sm)" : "Oraliqdan Tashqari"}
              </strong>
            </div>
            <div>
              <span>Zina Chuqurligi Qulayligi</span>
              <strong>
                {result.result.isTreadComfortable ? "Mos (24-33 sm)" : "Oraliqdan Tashqari"}
              </strong>
            </div>
            {result.result.exceedsAvailableRun && (
              <div>
                <span>Ogohlantirish</span>
                <strong>Gorizontal uzunlik ko&apos;rsatgan joyingizdan oshib ketmoqda</strong>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="paint-calculator-liters">
        Eslatma: zina chuqurligi me&apos;morchilikda keng
        qo&apos;llaniladigan Blondel formulasi bilan (2 × zina
        balandligi + zina chuqurligi ≈ 63 sm) hisoblanadi. Bu qulay va
        xavfsiz qadam uzunligini ta&apos;minlash uchun ishlatiladigan
        umumiy qoida; loyihaning me&apos;yoriy/statik talablariga
        qarab yakuniy o&apos;lchamlarni me&apos;mor yoki muhandis bilan
        tekshirish tavsiya etiladi.
      </p>
    </div>
  );
}
