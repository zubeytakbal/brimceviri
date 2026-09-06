"use client";

import { useMemo, useState } from "react";
import { calculateMeld } from "../converter/meldCalculator";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

export default function MeldCalculator() {
  const [bilirubin, setBilirubin] = useState("1.0");
  const [inr, setInr] = useState("1.0");
  const [creatinine, setCreatinine] = useState("1.0");
  const [onDialysis, setOnDialysis] = useState(false);

  const result = useMemo(
    () =>
      calculateMeld({
        bilirubinMgDl: parseNumericValue(bilirubin),
        inr: parseNumericValue(inr),
        creatinineMgDl: parseNumericValue(creatinine),
        onDialysis,
      }),
    [bilirubin, inr, creatinine, onDialysis]
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Bilirubin (mg/dL)</span>
          <input
            inputMode="decimal"
            type="text"
            value={bilirubin}
            onChange={(event) => setBilirubin(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>INR</span>
          <input
            inputMode="decimal"
            type="text"
            value={inr}
            onChange={(event) => setInr(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Kreatinin (mg/dL)</span>
          <input
            inputMode="decimal"
            type="text"
            value={creatinine}
            onChange={(event) => setCreatinine(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>Son 1 haftada ≥2 diyaliz</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={onDialysis}
              onChange={(event) => setOnDialysis(event.target.checked)}
            />
            Evet (kreatinin 4,0 kabul edilir)
          </span>
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>Geçerli değerler girerek sonucu görebilirsin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>MELD Skoru</span>
              <strong>{result} / 40</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
