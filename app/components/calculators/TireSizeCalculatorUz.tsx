"use client";

import { useMemo, useState } from "react";
import {
  calculateSpeedometerDeviation,
  type TireSizeInput,
} from "../../converter/tireSizeCalculator";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 1) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString("uz-UZ", { maximumFractionDigits });
}

function TireFields({
  legend,
  width,
  setWidth,
  aspect,
  setAspect,
  rim,
  setRim,
}: {
  legend: string;
  width: string;
  setWidth: (value: string) => void;
  aspect: string;
  setAspect: (value: string) => void;
  rim: string;
  setRim: (value: string) => void;
}) {
  return (
    <fieldset className="tire-size-fieldset">
      <legend>{legend}</legend>
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Kenglik (mm)</span>
          <input
            inputMode="decimal"
            type="text"
            value={width}
            onChange={(event) => setWidth(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Yon Devor Nisbati (%)</span>
          <input
            inputMode="decimal"
            type="text"
            value={aspect}
            onChange={(event) => setAspect(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Disk Diametri (dyuym)</span>
          <input
            inputMode="decimal"
            type="text"
            value={rim}
            onChange={(event) => setRim(event.target.value)}
          />
        </label>
      </div>
    </fieldset>
  );
}

export default function TireSizeCalculatorUz() {
  const [originalWidth, setOriginalWidth] = useState("205");
  const [originalAspect, setOriginalAspect] = useState("55");
  const [originalRim, setOriginalRim] = useState("16");

  const [replacementWidth, setReplacementWidth] = useState("215");
  const [replacementAspect, setReplacementAspect] = useState("55");
  const [replacementRim, setReplacementRim] = useState("17");

  const original: TireSizeInput = useMemo(
    () => ({
      widthMm: parseNumericValue(originalWidth),
      aspectRatioPercent: parseNumericValue(originalAspect),
      rimDiameterInch: parseNumericValue(originalRim),
    }),
    [originalWidth, originalAspect, originalRim]
  );

  const replacement: TireSizeInput = useMemo(
    () => ({
      widthMm: parseNumericValue(replacementWidth),
      aspectRatioPercent: parseNumericValue(replacementAspect),
      rimDiameterInch: parseNumericValue(replacementRim),
    }),
    [replacementWidth, replacementAspect, replacementRim]
  );

  const result = useMemo(
    () => calculateSpeedometerDeviation(original, replacement),
    [original, replacement]
  );

  return (
    <div className="category-general-converter">
      <TireFields
        legend="Original Shina O'lchami"
        width={originalWidth}
        setWidth={setOriginalWidth}
        aspect={originalAspect}
        setAspect={setOriginalAspect}
        rim={originalRim}
        setRim={setOriginalRim}
      />

      <TireFields
        legend="Yangi/Solishtiriladigan Shina O'lchami"
        width={replacementWidth}
        setWidth={setReplacementWidth}
        aspect={replacementAspect}
        setAspect={setReplacementAspect}
        rim={replacementRim}
        setRim={setReplacementRim}
      />

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>
            To&apos;g&apos;ri shina o&apos;lchamlarini kiritib
            natijani ko&apos;rishingiz mumkin.
          </strong>
        ) : (
          <>
            <div className="paint-calculator-result-grid">
              <div>
                <span>Original Tashqi Diametr</span>
                <strong>
                  {formatNumber(result.original.outerDiameterMm)} mm (
                  {formatNumber(result.original.outerDiameterInch)}
                  &Prime;)
                </strong>
              </div>
              <div>
                <span>Yangi Tashqi Diametr</span>
                <strong>
                  {formatNumber(result.replacement.outerDiameterMm)} mm
                  ({formatNumber(result.replacement.outerDiameterInch)}
                  &Prime;)
                </strong>
              </div>
              <div>
                <span>Original Aylana / km Uchun Aylanish</span>
                <strong>
                  {formatNumber(result.original.circumferenceMm)} mm /{" "}
                  {formatNumber(result.original.revolutionsPerKm, 0)}{" "}
                  marta
                </strong>
              </div>
              <div>
                <span>Yangi Aylana / km Uchun Aylanish</span>
                <strong>
                  {formatNumber(result.replacement.circumferenceMm)} mm
                  /{" "}
                  {formatNumber(result.replacement.revolutionsPerKm, 0)}{" "}
                  marta
                </strong>
              </div>
            </div>

            <p className="category-general-converter-equality">
              Spidometr sapishi:{" "}
              <strong>
                {result.deviationPercent >= 0 ? "+" : ""}
                {formatNumber(result.deviationPercent, 2)}%
              </strong>{" "}
              — spidometr 100 km/soat ko&apos;rsatganda haqiqiy tezlik
              taxminan{" "}
              <strong>{formatNumber(result.actualSpeedAt100, 1)} km/soat</strong>
              dir.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
