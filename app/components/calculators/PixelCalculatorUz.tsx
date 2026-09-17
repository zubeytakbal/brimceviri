"use client";

import { useMemo, useState } from "react";
import {
  calculatePixelSize,
  type PixelSolveFor,
  type SizeUnit,
} from "../../converter/pixelCalculator";

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

const solveForLabelsUz: Record<PixelSolveFor, string> = {
  pixels: "Piksel Soni",
  size: "Fizik O'lcham",
  dpi: "DPI/PPI",
};

const sizeUnitLabelsUz: Record<SizeUnit, string> = {
  cm: "sm",
  inch: "dyuym",
};

const dpiPresets = [72, 96, 150, 300, 600];

export default function PixelCalculatorUz() {
  const [solveFor, setSolveFor] = useState<PixelSolveFor>("pixels");
  const [pixelsInput, setPixelsInput] = useState("1000");
  const [sizeInput, setSizeInput] = useState("10");
  const [sizeUnit, setSizeUnit] = useState<SizeUnit>("cm");
  const [dpiInput, setDpiInput] = useState("300");

  const result = useMemo(
    () =>
      calculatePixelSize({
        solveFor,
        pixels: parseNumericValue(pixelsInput),
        sizeValue: parseNumericValue(sizeInput),
        sizeUnit,
        dpi: parseNumericValue(dpiInput),
      }),
    [solveFor, pixelsInput, sizeInput, sizeUnit, dpiInput]
  );

  return (
    <div className="category-general-converter">
      <label className="category-general-converter-field">
        <span>Nimani Hisoblamoqchisiz?</span>
        <select
          value={solveFor}
          onChange={(event) =>
            setSolveFor(event.target.value as PixelSolveFor)
          }
        >
          <option value="pixels">{solveForLabelsUz.pixels}</option>
          <option value="size">{solveForLabelsUz.size}</option>
          <option value="dpi">{solveForLabelsUz.dpi}</option>
        </select>
      </label>

      <div className="paint-calculator-grid">
        {solveFor !== "pixels" && (
          <label className="category-general-converter-field">
            <span>Piksel Soni</span>
            <input
              inputMode="decimal"
              type="text"
              value={pixelsInput}
              onChange={(event) => setPixelsInput(event.target.value)}
            />
          </label>
        )}

        {solveFor !== "size" && (
          <label className="category-general-converter-field">
            <span>Fizik O&apos;lcham</span>
            <div className="paint-calculator-checkbox-row">
              <input
                inputMode="decimal"
                type="text"
                value={sizeInput}
                onChange={(event) => setSizeInput(event.target.value)}
              />
              <select
                value={sizeUnit}
                onChange={(event) =>
                  setSizeUnit(event.target.value as SizeUnit)
                }
              >
                <option value="cm">{sizeUnitLabelsUz.cm}</option>
                <option value="inch">{sizeUnitLabelsUz.inch}</option>
              </select>
            </div>
          </label>
        )}

        {solveFor !== "dpi" && (
          <label className="category-general-converter-field">
            <span>DPI / PPI</span>
            <input
              inputMode="decimal"
              type="text"
              value={dpiInput}
              onChange={(event) => setDpiInput(event.target.value)}
              list="dpi-presets-uz"
            />
            <datalist id="dpi-presets-uz">
              {dpiPresets.map((preset) => (
                <option key={preset} value={preset} />
              ))}
            </datalist>
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
              <span>Piksel Soni</span>
              <strong>{formatNumber(result.pixels, 0)} px</strong>
            </div>
            <div>
              <span>Fizik O&apos;lcham</span>
              <strong>
                {formatNumber(result.sizeCm)} sm ({formatNumber(result.sizeInch)} dyuym)
              </strong>
            </div>
            <div>
              <span>DPI / PPI</span>
              <strong>{formatNumber(result.dpi)}</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        Formula: piksel = (fizik o&apos;lcham / 2,54 sm) × DPI. Veb va
        ekran dizayni uchun 72-96 DPI, standart chop etish uchun 300
        DPI, yuqori sifatli chop etish uchun 600 DPI keng
        ishlatiladigan qiymatlardir.
      </p>
    </div>
  );
}
