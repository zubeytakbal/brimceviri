"use client";

import { useMemo, useState } from "react";
import {
  calculatePipeFlow,
  type FlowUnit,
  type PipeFlowSolveFor,
} from "../converter/pipeFlowCalculator";

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

const solveForLabels: Record<PipeFlowSolveFor, string> = {
  diameter: "Boru Çapı",
  flow: "Debi",
  velocity: "Akış Hızı",
};

const flowUnitLabels: Record<FlowUnit, string> = {
  lps: "L/s",
  lpm: "L/dk",
  m3h: "m³/sa",
};

export default function PipeFlowCalculator() {
  const [solveFor, setSolveFor] = useState<PipeFlowSolveFor>("diameter");
  const [flowInput, setFlowInput] = useState("1.5");
  const [flowUnit, setFlowUnit] = useState<FlowUnit>("lps");
  const [velocityInput, setVelocityInput] = useState("1.5");
  const [diameterInput, setDiameterInput] = useState("50");

  const result = useMemo(
    () =>
      calculatePipeFlow({
        solveFor,
        flowValue: parseNumericValue(flowInput),
        flowUnit,
        velocityMs: parseNumericValue(velocityInput),
        diameterMm: parseNumericValue(diameterInput),
      }),
    [solveFor, flowInput, flowUnit, velocityInput, diameterInput]
  );

  return (
    <div className="category-general-converter">
      <label className="category-general-converter-field">
        <span>Neyi Hesaplamak İstiyorsun?</span>
        <select
          value={solveFor}
          onChange={(event) =>
            setSolveFor(event.target.value as PipeFlowSolveFor)
          }
        >
          <option value="diameter">{solveForLabels.diameter}</option>
          <option value="flow">{solveForLabels.flow}</option>
          <option value="velocity">{solveForLabels.velocity}</option>
        </select>
      </label>

      <div className="paint-calculator-grid">
        {solveFor !== "flow" && (
          <label className="category-general-converter-field">
            <span>Debi</span>
            <div className="paint-calculator-checkbox-row">
              <input
                inputMode="decimal"
                type="text"
                value={flowInput}
                onChange={(event) => setFlowInput(event.target.value)}
              />
              <select
                value={flowUnit}
                onChange={(event) =>
                  setFlowUnit(event.target.value as FlowUnit)
                }
              >
                <option value="lps">{flowUnitLabels.lps}</option>
                <option value="lpm">{flowUnitLabels.lpm}</option>
                <option value="m3h">{flowUnitLabels.m3h}</option>
              </select>
            </div>
          </label>
        )}

        {solveFor !== "velocity" && (
          <label className="category-general-converter-field">
            <span>Akış Hızı (m/s)</span>
            <input
              inputMode="decimal"
              type="text"
              value={velocityInput}
              onChange={(event) => setVelocityInput(event.target.value)}
            />
          </label>
        )}

        {solveFor !== "diameter" && (
          <label className="category-general-converter-field">
            <span>Boru Çapı (mm)</span>
            <input
              inputMode="decimal"
              type="text"
              value={diameterInput}
              onChange={(event) => setDiameterInput(event.target.value)}
            />
          </label>
        )}
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
              <span>Boru Çapı</span>
              <strong>{formatNumber(result.diameterMm)} mm</strong>
            </div>
            <div>
              <span>Debi</span>
              <strong>
                {formatNumber(result.flowLps)} L/s (
                {formatNumber(result.flowM3h)} m³/sa)
              </strong>
            </div>
            <div>
              <span>Akış Hızı</span>
              <strong>{formatNumber(result.velocityMs)} m/s</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        Formül, süreklilik denklemine (Q = A×v) dayanır ve basınçlı su/sıvı
        hatları için geçerlidir. İçme suyu şebekelerinde tavsiye edilen
        akış hızı genelde 0,5-2,5 m/s aralığındadır; doğalgaz iç
        tesisatı gibi basınç kaybı ve gaz yoğunluğuna bağlı hesaplar
        için TS 7363 standardına göre ayrı bir hesap gerekir.
      </p>
    </div>
  );
}
