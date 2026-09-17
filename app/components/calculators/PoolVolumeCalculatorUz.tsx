"use client";

import { useState } from "react";
import {
  calculateRectangularPoolVolume,
  calculateRoundPoolVolume,
} from "../../converter/poolCalculator";

type Shape = "rectangular" | "round";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatM3(value: number): string {
  return `${value.toLocaleString("uz-UZ", { maximumFractionDigits: 1 })} m³`;
}

export default function PoolVolumeCalculatorUz() {
  const [shape, setShape] = useState<Shape>("rectangular");
  const [lengthInput, setLengthInput] = useState("10");
  const [widthInput, setWidthInput] = useState("5");
  const [diameterInput, setDiameterInput] = useState("6");
  const [depthInput, setDepthInput] = useState("1.5");

  const depth = parseNumericValue(depthInput);

  const result =
    shape === "rectangular"
      ? (() => {
          const length = parseNumericValue(lengthInput);
          const width = parseNumericValue(widthInput);
          return length !== null && width !== null && depth !== null
            ? calculateRectangularPoolVolume(length, width, depth)
            : null;
        })()
      : (() => {
          const diameter = parseNumericValue(diameterInput);
          return diameter !== null && depth !== null
            ? calculateRoundPoolVolume(diameter, depth)
            : null;
        })();

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Hovuz Shakli</span>
          <div className="engineering-target-grid hydrostatic-target-grid">
            <button
              type="button"
              className={`engineering-target-button${shape === "rectangular" ? " is-active" : ""}`}
              onClick={() => setShape("rectangular")}
            >
              To&apos;rtburchak
            </button>
            <button
              type="button"
              className={`engineering-target-button${shape === "round" ? " is-active" : ""}`}
              onClick={() => setShape("round")}
            >
              Yumaloq
            </button>
          </div>
        </div>

        <div className="paint-calculator-grid">
          {shape === "rectangular" ? (
            <>
              <label className="category-general-converter-field">
                <span>Uzunlik (m)</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={lengthInput}
                  onChange={(event) => setLengthInput(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>Kenglik (m)</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={widthInput}
                  onChange={(event) => setWidthInput(event.target.value)}
                />
              </label>
            </>
          ) : (
            <label className="category-general-converter-field">
              <span>Diametr (m)</span>
              <input
                type="text"
                inputMode="decimal"
                value={diameterInput}
                onChange={(event) => setDiameterInput(event.target.value)}
              />
            </label>
          )}
          <label className="category-general-converter-field">
            <span>O&apos;rtacha Chuqurlik (m)</span>
            <input
              type="text"
              inputMode="decimal"
              value={depthInput}
              onChange={(event) => setDepthInput(event.target.value)}
            />
          </label>
        </div>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>To&apos;g&apos;ri o&apos;lchamlarni kiritib hovuz hajmini ko&apos;rishingiz mumkin.</strong>
        ) : (
          <strong>Hovuz Hajmi: {formatM3(result)}</strong>
        )}
      </div>
    </div>
  );
}
