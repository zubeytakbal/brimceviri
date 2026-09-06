"use client";

import { useState } from "react";
import {
  calculateBitrateFromFileSize,
  calculateFileSizeFromBitrate,
} from "../converter/videoBitrateCalculator";

type Target = "fileSize" | "bitrate";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatNumber(value: number, maximumFractionDigits = 1): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

export default function VideoBitrateCalculator() {
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
          <span>Neyi hesaplamak istiyorsun?</span>
          <div className="engineering-target-grid hydrostatic-target-grid">
            <button
              type="button"
              className={`engineering-target-button${target === "fileSize" ? " is-active" : ""}`}
              onClick={() => setTarget("fileSize")}
            >
              Dosya Boyutu
            </button>
            <button
              type="button"
              className={`engineering-target-button${target === "bitrate" ? " is-active" : ""}`}
              onClick={() => setTarget("bitrate")}
            >
              Bit Hızı
            </button>
          </div>
        </div>

        <div className="paint-calculator-grid">
          {target === "fileSize" ? (
            <label className="category-general-converter-field">
              <span>Bit Hızı (Mbps)</span>
              <input
                type="text"
                inputMode="decimal"
                value={bitrateInput}
                onChange={(event) => setBitrateInput(event.target.value)}
              />
            </label>
          ) : (
            <label className="category-general-converter-field">
              <span>Dosya Boyutu (MB)</span>
              <input
                type="text"
                inputMode="decimal"
                value={fileSizeInput}
                onChange={(event) => setFileSizeInput(event.target.value)}
                placeholder="örn. 600"
              />
            </label>
          )}
          <label className="category-general-converter-field">
            <span>Süre (saniye)</span>
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
          <strong>Geçerli değerler girerek sonucu görebilirsin.</strong>
        ) : target === "fileSize" ? (
          <strong>Dosya Boyutu: {formatNumber(result)} MB</strong>
        ) : (
          <strong>Bit Hızı: {formatNumber(result)} Mbps</strong>
        )}
      </div>
    </div>
  );
}
