"use client";

import { useState } from "react";
import {
  calculateBitrateFromFileSize,
  calculateFileSizeFromBitrate,
} from "../../converter/videoBitrateCalculator";

type Target = "fileSize" | "bitrate";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatNumber(value: number, maximumFractionDigits = 1): string {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits });
}

export default function VideoBitrateCalculatorUz() {
  const [target, setTarget] = useState<Target>("fileSize");
  const [bitrateInput, setBitrateInput] = useState("8");
  const [fileSizeInput, setFileSizeInput] = useState("");
  const [durationInput, setDurationInput] = useState("600");

  const duration = parseNumericValue(durationInput);

  const result =
    target === "fileSize"
      ? (() => {
          const bitrate = parseNumericValue(bitrateInput);
          return bitrate !== null && duration !== null
            ? calculateFileSizeFromBitrate(bitrate, duration)
            : null;
        })()
      : (() => {
          const fileSize = parseNumericValue(fileSizeInput);
          return fileSize !== null && duration !== null
            ? calculateBitrateFromFileSize(fileSize, duration)
            : null;
        })();

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Nimani hisoblamoqchisiz?</span>
          <div className="engineering-target-grid hydrostatic-target-grid">
            <button
              type="button"
              className={`engineering-target-button${target === "fileSize" ? " is-active" : ""}`}
              onClick={() => setTarget("fileSize")}
            >
              Fayl Hajmi
            </button>
            <button
              type="button"
              className={`engineering-target-button${target === "bitrate" ? " is-active" : ""}`}
              onClick={() => setTarget("bitrate")}
            >
              Bit Tezligi
            </button>
          </div>
        </div>

        <div className="paint-calculator-grid">
          {target === "fileSize" ? (
            <label className="category-general-converter-field">
              <span>Bit Tezligi (Mbps)</span>
              <input
                type="text"
                inputMode="decimal"
                value={bitrateInput}
                onChange={(event) => setBitrateInput(event.target.value)}
              />
            </label>
          ) : (
            <label className="category-general-converter-field">
              <span>Fayl Hajmi (MB)</span>
              <input
                type="text"
                inputMode="decimal"
                value={fileSizeInput}
                onChange={(event) => setFileSizeInput(event.target.value)}
                placeholder="masalan 600"
              />
            </label>
          )}
          <label className="category-general-converter-field">
            <span>Davomiylik (soniya)</span>
            <input
              type="text"
              inputMode="decimal"
              value={durationInput}
              onChange={(event) => setDurationInput(event.target.value)}
            />
          </label>
        </div>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>To&apos;g&apos;ri qiymatlar kiritib natijani ko&apos;rishingiz mumkin.</strong>
        ) : target === "fileSize" ? (
          <strong>Fayl Hajmi: {formatNumber(result)} MB</strong>
        ) : (
          <strong>Bit Tezligi: {formatNumber(result)} Mbps</strong>
        )}
      </div>
    </div>
  );
}
