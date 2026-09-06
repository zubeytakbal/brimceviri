"use client";

import { useState } from "react";
import {
  hexToRgb,
  hslToRgb,
  parseHslInput,
  parseRgbInput,
  rgbToHex,
  rgbToHsl,
  type RgbColor,
} from "../converter/colorCodeCalculator";

const DEFAULT_RGB: RgbColor = { r: 54, g: 125, b: 165 };
const defaultHsl = rgbToHsl(DEFAULT_RGB);

function formatRgbText(rgb: RgbColor) {
  return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
}

function formatHslText(hsl: { h: number; s: number; l: number }) {
  return `${hsl.h}, ${hsl.s}%, ${hsl.l}%`;
}

export default function ColorCodeCalculator() {
  const [rgb, setRgb] = useState<RgbColor>(DEFAULT_RGB);
  const [hexText, setHexText] = useState(rgbToHex(DEFAULT_RGB));
  const [rgbText, setRgbText] = useState(formatRgbText(DEFAULT_RGB));
  const [hslText, setHslText] = useState(formatHslText(defaultHsl));
  const [hexError, setHexError] = useState(false);
  const [rgbError, setRgbError] = useState(false);
  const [hslError, setHslError] = useState(false);

  const syncFrom = (nextRgb: RgbColor, source: "hex" | "rgb" | "hsl") => {
    setRgb(nextRgb);
    if (source !== "hex") setHexText(rgbToHex(nextRgb));
    if (source !== "rgb") setRgbText(formatRgbText(nextRgb));
    if (source !== "hsl") setHslText(formatHslText(rgbToHsl(nextRgb)));
  };

  const handleHexChange = (value: string) => {
    setHexText(value);
    const parsed = hexToRgb(value);
    setHexError(!parsed);
    if (parsed) syncFrom(parsed, "hex");
  };

  const handleRgbChange = (value: string) => {
    setRgbText(value);
    const parsed = parseRgbInput(value);
    setRgbError(!parsed);
    if (parsed) syncFrom(parsed, "rgb");
  };

  const handleHslChange = (value: string) => {
    setHslText(value);
    const parsed = parseHslInput(value);
    setHslError(!parsed);
    if (parsed) syncFrom(hslToRgb(parsed), "hsl");
  };

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>HEX</span>
            <input
              type="text"
              value={hexText}
              onChange={(event) => handleHexChange(event.target.value)}
              placeholder="#367da5"
            />
          </label>
          <label className="category-general-converter-field">
            <span>RGB</span>
            <input
              type="text"
              value={rgbText}
              onChange={(event) => handleRgbChange(event.target.value)}
              placeholder="54, 125, 165"
            />
          </label>
          <label className="category-general-converter-field">
            <span>HSL</span>
            <input
              type="text"
              value={hslText}
              onChange={(event) => handleHslChange(event.target.value)}
              placeholder="201, 51%, 43%"
            />
          </label>
        </div>

        {(hexError || rgbError || hslError) && (
          <p className="calculator-usage-hint">
            Geçersiz bir değer girdin, o alan güncellenmedi.
          </p>
        )}
      </div>

      <div
        aria-hidden="true"
        className="color-code-swatch"
        style={{ backgroundColor: rgbToHex(rgb) }}
      />
    </div>
  );
}
