"use client";

import { useMemo, useState } from "react";
import {
  calculatePipeFlow,
  type FlowUnit,
  type PipeFlowSolveFor,
} from "../../converter/pipeFlowCalculator";

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

const solveForLabelsUz: Record<PipeFlowSolveFor, string> = {
  diameter: "Quvur Diametri",
  flow: "Sarf",
  velocity: "Oqim Tezligi",
};

const flowUnitLabelsUz: Record<FlowUnit, string> = {
  lps: "L/s",
  lpm: "L/daq",
  m3h: "m³/soat",
  cfm: "ft³/daq",
  gpm: "gal/daq (AQSH)",
};

export default function PipeFlowCalculatorUz() {
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
        <span>Nimani Hisoblamoqchisiz?</span>
        <select
          value={solveFor}
          onChange={(event) =>
            setSolveFor(event.target.value as PipeFlowSolveFor)
          }
        >
          <option value="diameter">{solveForLabelsUz.diameter}</option>
          <option value="flow">{solveForLabelsUz.flow}</option>
          <option value="velocity">{solveForLabelsUz.velocity}</option>
        </select>
      </label>

      <div className="paint-calculator-grid">
        {solveFor !== "flow" && (
          <label className="category-general-converter-field">
            <span>Sarf</span>
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
                <option value="lps">{flowUnitLabelsUz.lps}</option>
                <option value="lpm">{flowUnitLabelsUz.lpm}</option>
                <option value="m3h">{flowUnitLabelsUz.m3h}</option>
              </select>
            </div>
          </label>
        )}

        {solveFor !== "velocity" && (
          <label className="category-general-converter-field">
            <span>Oqim Tezligi (m/s)</span>
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
            <span>Quvur Diametri (mm)</span>
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
          <strong>To&apos;g&apos;ri qiymatlar kiritib natijani ko&apos;rishingiz mumkin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Quvur Diametri</span>
              <strong>{formatNumber(result.diameterMm)} mm</strong>
            </div>
            <div>
              <span>Sarf</span>
              <strong>
                {formatNumber(result.flowLps)} L/s (
                {formatNumber(result.flowM3h)} m³/soat)
              </strong>
            </div>
            <div>
              <span>Oqim Tezligi</span>
              <strong>{formatNumber(result.velocityMs)} m/s</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        Formula uzluksizlik tenglamasiga (Q = A×v) asoslangan va
        bosimli suv/suyuqlik liniyalari uchun amal qiladi. Ichimlik
        suvi tarmoqlarida tavsiya etilgan oqim tezligi odatda 0,5-2,5
        m/s oralig&apos;idadir; tabiiy gaz ichki tarmog&apos;i kabi
        bosim yo&apos;qotilishi va gaz zichligiga bog&apos;liq
        hisoblar uchun alohida standart hisob talab qilinadi.
      </p>
    </div>
  );
}
