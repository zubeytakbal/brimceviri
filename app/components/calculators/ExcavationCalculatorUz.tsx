"use client";

import { useMemo, useState } from "react";
import {
  calculateExcavation,
  calculateTruckCountFromVolume,
  type ExcavationInput,
} from "../../converter/excavationCalculator";

type InputMode = "dimensions" | "volume";

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

export default function ExcavationCalculatorUz() {
  const [mode, setMode] = useState<InputMode>("dimensions");

  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("8");
  const [depth, setDepth] = useState("1.5");
  const [swellPercent, setSwellPercent] = useState("25");
  const [truckCapacity, setTruckCapacity] = useState("10");

  const [knownVolume, setKnownVolume] = useState("150");
  const [directTruckCapacity, setDirectTruckCapacity] = useState("10");

  const input: ExcavationInput = useMemo(
    () => ({
      length: parseNumericValue(length),
      width: parseNumericValue(width),
      depth: parseNumericValue(depth),
      swellPercent: parseNumericValue(swellPercent),
      truckCapacityM3: parseNumericValue(truckCapacity),
    }),
    [length, width, depth, swellPercent, truckCapacity]
  );

  const result = useMemo(() => calculateExcavation(input), [input]);

  const directTruckCount = useMemo(
    () =>
      calculateTruckCountFromVolume({
        looseVolumeM3: parseNumericValue(knownVolume),
        truckCapacityM3: parseNumericValue(directTruckCapacity),
      }),
    [knownVolume, directTruckCapacity]
  );

  return (
    <div className="category-general-converter">
      <div className="calculator-mode-toggle" role="tablist" aria-label="Hisoblash usuli">
        <button
          type="button"
          role="tab"
          aria-selected={mode === "dimensions"}
          className={mode === "dimensions" ? "is-active" : ""}
          onClick={() => setMode("dimensions")}
        >
          O&apos;lchamlardan Hisoblash
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "volume"}
          className={mode === "volume" ? "is-active" : ""}
          onClick={() => setMode("volume")}
        >
          m³ Allaqachon Ma&apos;lum
        </button>
      </div>

      {mode === "dimensions" ? (
        <>
          <div className="paint-calculator-grid">
            <label className="category-general-converter-field">
              <span>Qazish Uzunligi (m)</span>
              <input
                inputMode="decimal"
                type="text"
                value={length}
                onChange={(event) => setLength(event.target.value)}
              />
            </label>

            <label className="category-general-converter-field">
              <span>Qazish Kengligi (m)</span>
              <input
                inputMode="decimal"
                type="text"
                value={width}
                onChange={(event) => setWidth(event.target.value)}
              />
            </label>

            <label className="category-general-converter-field">
              <span>Qazish Chuqurligi (m)</span>
              <input
                inputMode="decimal"
                type="text"
                value={depth}
                onChange={(event) => setDepth(event.target.value)}
              />
            </label>

            <label className="category-general-converter-field">
              <span>Bo&apos;shashish/Shishish Payi (%)</span>
              <input
                inputMode="decimal"
                type="text"
                value={swellPercent}
                onChange={(event) => setSwellPercent(event.target.value)}
              />
            </label>

            <label className="category-general-converter-field">
              <span>Yuk Mashinasi Kuzovi Hajmi (m³)</span>
              <input
                inputMode="decimal"
                type="text"
                value={truckCapacity}
                onChange={(event) => setTruckCapacity(event.target.value)}
              />
            </label>
          </div>

          <div
            aria-live="polite"
            className="category-general-converter-result paint-calculator-result"
          >
            {!result ? (
              <strong>
                To&apos;g&apos;ri o&apos;lchamlar kiritib natijani ko&apos;rishingiz mumkin.
              </strong>
            ) : (
              <div className="paint-calculator-result-grid">
                <div>
                  <span>Joyida (Bank) Qazish Hajmi</span>
                  <strong>{formatNumber(result.bankVolumeM3)} m³</strong>
                </div>
                <div>
                  <span>Bo&apos;shashgan (Shishgan) Hajm</span>
                  <strong>{formatNumber(result.looseVolumeM3)} m³</strong>
                </div>
                <div>
                  <span>Kerakli Yuk Mashinasi Reysi</span>
                  <strong>{result.truckLoadCount} mashina</strong>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="paint-calculator-grid">
            <label className="category-general-converter-field">
              <span>Tashiladigan Hajm (m³)</span>
              <input
                inputMode="decimal"
                type="text"
                value={knownVolume}
                onChange={(event) => setKnownVolume(event.target.value)}
              />
              <small className="calculator-field-note">
                Qazuvchining yoki hujjatning bergan, allaqachon
                tashiladigan (bo&apos;shashgan) hajmini kiriting —
                bo&apos;shashish payi qo&apos;shimcha qo&apos;shilmaydi.
              </small>
            </label>

            <label className="category-general-converter-field">
              <span>Yuk Mashinasi Kuzovi Hajmi (m³)</span>
              <input
                inputMode="decimal"
                type="text"
                value={directTruckCapacity}
                onChange={(event) => setDirectTruckCapacity(event.target.value)}
              />
            </label>
          </div>

          <div
            aria-live="polite"
            className="category-general-converter-result paint-calculator-result"
          >
            {directTruckCount === null ? (
              <strong>To&apos;g&apos;ri qiymatlar kiritib natijani ko&apos;rishingiz mumkin.</strong>
            ) : (
              <div className="paint-calculator-result-grid">
                <div>
                  <span>Kerakli Yuk Mashinasi Reysi</span>
                  <strong>{directTruckCount} mashina</strong>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
