"use client";

import { useMemo, useState } from "react";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import { calculateStairs } from "../converter/stairCalculator";

type SupportedLocale = "tr" | "en";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

export default function StairCalculator({
  locale = "tr",
}: {
  locale?: SupportedLocale;
}) {
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
            <span>Toplam Yükseklik (cm)</span>
            <input
              inputMode="decimal"
              type="text"
              value={totalHeightCm}
              onChange={(event) => setTotalHeightCm(event.target.value)}
            />
          </label>
          <label className="category-general-converter-field">
            <span>İstenen Rıht Yüksekliği (cm)</span>
            <input
              inputMode="decimal"
              type="text"
              value={desiredRiserCm}
              onChange={(event) => setDesiredRiserCm(event.target.value)}
            />
          </label>
          <label className="category-general-converter-field">
            <span>Kullanılabilir Yatay Uzunluk (cm, opsiyonel)</span>
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
          <strong>{result.message}</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Basamak (Rıht) Sayısı</span>
              <strong>{result.result.stepCount}</strong>
            </div>
            <div>
              <span>Rıht Yüksekliği</span>
              <strong>
                {formatLocalizedNumber(result.result.riserCm, locale, {
                  maximumFractionDigits: 2,
                })}{" "}
                cm
              </strong>
            </div>
            <div>
              <span>Basamak Derinliği (Blondel)</span>
              <strong>
                {formatLocalizedNumber(result.result.treadCm, locale, {
                  maximumFractionDigits: 2,
                })}{" "}
                cm
              </strong>
            </div>
            <div>
              <span>Toplam Yatay Uzunluk</span>
              <strong>
                {formatLocalizedNumber(result.result.totalRunCm, locale, {
                  maximumFractionDigits: 1,
                })}{" "}
                cm
              </strong>
            </div>
            <div>
              <span>Rıht Konforu</span>
              <strong>
                {result.result.isRiserComfortable ? "Uygun (16-20 cm)" : "Aralık Dışı"}
              </strong>
            </div>
            <div>
              <span>Basamak Konforu</span>
              <strong>
                {result.result.isTreadComfortable ? "Uygun (24-33 cm)" : "Aralık Dışı"}
              </strong>
            </div>
            {result.result.exceedsAvailableRun && (
              <div>
                <span>Uyarı</span>
                <strong>Yatay uzunluk, belirttiğin alanı aşıyor</strong>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="paint-calculator-liters">
        Not: basamak derinliği, mimarlıkta yaygın kullanılan Blondel
        formülüyle (2 × rıht + basamak derinliği ≈ 63 cm) hesaplanır. Bu,
        rahat ve güvenli bir adım uzunluğu vermek için kullanılan genel bir
        kuraldır; projenin yönetmelik/statik gereksinimlerine göre nihai
        ölçüleri bir mimar veya mühendisle doğrulaman önerilir.
      </p>
    </div>
  );
}
