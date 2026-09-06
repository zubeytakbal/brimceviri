"use client";

import { useMemo, useState } from "react";
import {
  calculatePixelSize,
  type PixelSolveFor,
  type SizeUnit,
} from "../converter/pixelCalculator";

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

const solveForLabels: Record<PixelSolveFor, string> = {
  pixels: "Piksel Sayısı",
  size: "Fiziksel Boyut",
  dpi: "DPI/PPI",
};

const sizeUnitLabels: Record<SizeUnit, string> = {
  cm: "cm",
  inch: "inç",
};

const dpiPresets = [72, 96, 150, 300, 600];

export default function PixelCalculator() {
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
        <span>Neyi Hesaplamak İstiyorsun?</span>
        <select
          value={solveFor}
          onChange={(event) =>
            setSolveFor(event.target.value as PixelSolveFor)
          }
        >
          <option value="pixels">{solveForLabels.pixels}</option>
          <option value="size">{solveForLabels.size}</option>
          <option value="dpi">{solveForLabels.dpi}</option>
        </select>
      </label>

      <div className="paint-calculator-grid">
        {solveFor !== "pixels" && (
          <label className="category-general-converter-field">
            <span>Piksel Sayısı</span>
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
            <span>Fiziksel Boyut</span>
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
                <option value="cm">{sizeUnitLabels.cm}</option>
                <option value="inch">{sizeUnitLabels.inch}</option>
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
              list="dpi-presets"
            />
            <datalist id="dpi-presets">
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
          <strong>Geçerli değerler girerek sonucu görebilirsin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Piksel Sayısı</span>
              <strong>{formatNumber(result.pixels, 0)} px</strong>
            </div>
            <div>
              <span>Fiziksel Boyut</span>
              <strong>
                {formatNumber(result.sizeCm)} cm ({formatNumber(result.sizeInch)} inç)
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
        Formül: piksel = (fiziksel boyut / 2,54 cm) × DPI. Web ve
        ekran tasarımı için 72-96 DPI, standart baskı için 300 DPI,
        yüksek kaliteli baskı için 600 DPI yaygın kullanılan
        değerlerdir.
      </p>
    </div>
  );
}
