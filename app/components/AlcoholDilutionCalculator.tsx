"use client";

import { useMemo, useState } from "react";
import {
  calculateDilution,
  type DilutionTarget,
} from "../converter/dilutionCalculator";

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

  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

const targetLabels: Record<DilutionTarget, string> = {
  c1: "Stok Derişim (%)",
  v1: "Stok Hacim (mL)",
  c2: "Hedef Derişim (%)",
  v2: "Hedef Hacim (mL)",
};

export default function AlcoholDilutionCalculator() {
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
          Nasıl çalışır: bildiğin üç değeri gir (stok derişim/hacim ve
          hedef derişim/hacimden ikisi), eksik olan dördüncüyü biz
          bulalım. Aynı C₁V₁ = C₂V₂ bağıntısını, mol/L yerine yüzde (%)
          derişim ile kullanır.
        </p>
        <div className="engineering-targets">
          <span>Hangi değeri hesaplamak istiyorsun?</span>

          <div className="engineering-target-grid hydrostatic-target-grid">
            {(Object.keys(targetLabels) as DilutionTarget[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`engineering-target-button${target === key ? " is-active" : ""}`}
                onClick={() => setTarget(key)}
              >
                {targetLabels[key]}
              </button>
            ))}
          </div>
        </div>

        <div className="paint-calculator-grid">
          {target !== "c1" && (
            <label className="category-general-converter-field">
              <span>Stok Derişim (%)</span>
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
              <span>Stok Hacim (mL)</span>
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
              <span>Hedef Derişim (%)</span>
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
              <span>Hedef Hacim (mL)</span>
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
          <strong>Geçerli değerler girerek sonucu görebilirsin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Stok Derişim</span>
              <strong>%{formatNumber(result.c1)}</strong>
            </div>
            <div>
              <span>Stok Hacim</span>
              <strong>{formatNumber(result.v1)} mL</strong>
            </div>
            <div>
              <span>Hedef Derişim</span>
              <strong>%{formatNumber(result.c2)}</strong>
            </div>
            <div>
              <span>Hedef Hacim</span>
              <strong>{formatNumber(result.v2)} mL</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Önemli:</strong> Bu araç yalnızca C₁V₁ = C₂V₂
        bağıntısıyla birim çevirimi yapar — hangi hedef derişimin
        (örn. antiseptik için) uygun olduğunu belirlemez veya önermez.
      </p>
    </div>
  );
}
