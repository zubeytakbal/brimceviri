"use client";

import { useState } from "react";
import { estimatedAverageGlucose, hba1cToIfcc, ifccToHba1c, LAB_TESTS, toConventional, toSi } from "../../converter/lab/labValues";

const fmt = (v: number) => (Number.isFinite(v) ? Number(v.toPrecision(4)).toLocaleString("tr-TR", { maximumFractionDigits: 6 }) : "—");

export default function LabValueTool({ defaultTest = "kolesterol" }: { defaultTest?: string }) {
  const [testId, setTestId] = useState(defaultTest);
  const [toSiDirection, setToSiDirection] = useState(true);
  const [value, setValue] = useState(defaultTest === "kolesterol" ? "200" : "");
  const n = Number(value.replace(",", "."));
  const valid = value.trim() !== "" && Number.isFinite(n) && n >= 0;
  const isA1c = testId === "hba1c";
  const test = LAB_TESTS.find((t) => t.id === testId);

  const from = isA1c ? (toSiDirection ? "%" : "mmol/mol") : toSiDirection ? test!.conventional : test!.si;
  const to = isA1c ? (toSiDirection ? "mmol/mol" : "%") : toSiDirection ? test!.si : test!.conventional;
  const result = !valid ? NaN : isA1c ? (toSiDirection ? hba1cToIfcc(n) : ifccToHba1c(n)) : toSiDirection ? toSi(test!, n) : toConventional(test!, n);
  const a1cPercent = isA1c && valid ? (toSiDirection ? n : ifccToHba1c(n)) : NaN;

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Tahlil</span>
            <select value={testId} onChange={(e) => setTestId(e.target.value)}>
              {LAB_TESTS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.conventional} ↔ {t.si})
                </option>
              ))}
              <option value="hba1c">HbA1c (% ↔ mmol/mol)</option>
            </select>
          </label>
          <label className="date-calc-field">
            <span>Değer ({from})</span>
            <input type="text" inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} />
          </label>
        </div>
        <div className="date-calc-chips" role="group" aria-label="Çevirme yönü">
          <button type="button" aria-pressed={toSiDirection} onClick={() => setToSiDirection(true)}>
            {isA1c ? "% → mmol/mol" : `${test!.conventional} → ${test!.si}`}
          </button>
          <button type="button" aria-pressed={!toSiDirection} onClick={() => setToSiDirection(false)}>
            {isA1c ? "mmol/mol → %" : `${test!.si} → ${test!.conventional}`}
          </button>
        </div>
      </div>
      <div className="date-calc-results" aria-live="polite">
        <div className="date-calc-stat is-main">
          <span>{isA1c ? "HbA1c" : test!.name}</span>
          <strong>
            {valid ? `${fmt(n)} ${from} = ${fmt(result)} ${to}` : "—"}
          </strong>
          <em>
            {isA1c
              ? "IFCC = (NGSP % − 2,152) × 10,929"
              : `${test!.conventional} × ${fmt(test!.factor)} = ${test!.si}`}
            {test?.note ? ` · ${test.note}` : ""}
          </em>
        </div>
        {isA1c && valid && (
          <div className="date-calc-stat">
            <span>Tahmini ortalama kan şekeri (eAG)</span>
            <strong>
              {fmt(estimatedAverageGlucose(a1cPercent))} mg/dL · {fmt(estimatedAverageGlucose(a1cPercent) / 18.016)} mmol/L
            </strong>
            <em>Son 2–3 ayın ortalaması; eAG = 28,7 × HbA1c − 46,7</em>
          </div>
        )}
      </div>
    </div>
  );
}
