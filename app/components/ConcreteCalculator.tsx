"use client";

import { useMemo, useState } from "react";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import {
  calculateConcrete,
  type ConcreteShape,
} from "../converter/concreteCalculator";

type SupportedLocale = "tr" | "en";

type ConcreteCopy = {
  shapeLabel: string;
  shapes: Record<ConcreteShape, string>;
  length: string;
  width: string;
  thickness: string;
  diameter: string;
  height: string;
  waste: string;
  emptyState: string;
  resultVolume: string;
  resultVolumeWithWaste: string;
  resultBagCount: string;
  resultCement: string;
  resultSand: string;
  resultGravel: string;
  resultWater: string;
  note: string;
};

const copyByLocale: Record<SupportedLocale, ConcreteCopy> = {
  tr: {
    shapeLabel: "Şekil",
    shapes: { dikdortgen: "Dikdörtgen (temel/döşeme)", silindir: "Silindir (kolon)" },
    length: "Uzunluk (m)",
    width: "Genişlik (m)",
    thickness: "Kalınlık (m)",
    diameter: "Çap (m)",
    height: "Yükseklik (m)",
    waste: "Fire Payı (%)",
    emptyState: "Geçerli ölçüler girerek sonucu görebilirsin.",
    resultVolume: "Beton hacmi",
    resultVolumeWithWaste: "Fire dahil hacim",
    resultBagCount: "25 kg torba çimento",
    resultCement: "Çimento",
    resultSand: "Kum",
    resultGravel: "Çakıl (agrega)",
    resultWater: "Su",
    note: "Not: standart C25 beton karışım oranına (yaklaşık 350 kg/m³ çimento) dayanan bir tahmindir; gerçek oran beton sınıfına ve hazır beton santraline göre değişebilir.",
  },
  en: {
    shapeLabel: "Shape",
    shapes: { dikdortgen: "Rectangle (footing/slab)", silindir: "Cylinder (column)" },
    length: "Length (m)",
    width: "Width (m)",
    thickness: "Thickness (m)",
    diameter: "Diameter (m)",
    height: "Height (m)",
    waste: "Waste Allowance (%)",
    emptyState: "Enter valid dimensions to see the result.",
    resultVolume: "Concrete volume",
    resultVolumeWithWaste: "Volume with waste",
    resultBagCount: "25 kg cement bags",
    resultCement: "Cement",
    resultSand: "Sand",
    resultGravel: "Gravel (aggregate)",
    resultWater: "Water",
    note: "Note: this is an estimate based on a standard C25 concrete mix ratio (about 350 kg/m³ cement); the actual ratio varies by concrete class and ready-mix plant.",
  },
};

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatVolume(value: number, locale: SupportedLocale) {
  return `${formatLocalizedNumber(value, locale, { maximumFractionDigits: 3 })} m³`;
}

export default function ConcreteCalculator({
  locale = "tr",
}: {
  locale?: SupportedLocale;
}) {
  const copy = copyByLocale[locale];

  const [shape, setShape] = useState<ConcreteShape>("dikdortgen");
  const [length, setLength] = useState("5");
  const [width, setWidth] = useState("4");
  const [thickness, setThickness] = useState("0.15");
  const [diameter, setDiameter] = useState("0.3");
  const [height, setHeight] = useState("3");
  const [wasteFactor, setWasteFactor] = useState("5");

  const result = useMemo(
    () =>
      calculateConcrete({
        shape,
        length: parseNumericValue(length),
        width: parseNumericValue(width),
        thickness: parseNumericValue(thickness),
        diameter: parseNumericValue(diameter),
        height: parseNumericValue(height),
        wasteFactor: parseNumericValue(wasteFactor),
      }),
    [shape, length, width, thickness, diameter, height, wasteFactor]
  );

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>{copy.shapeLabel}</span>
          <div className="engineering-target-grid">
            {(Object.keys(copy.shapes) as ConcreteShape[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`engineering-target-button${shape === key ? " is-active" : ""}`}
                onClick={() => setShape(key)}
              >
                {copy.shapes[key]}
              </button>
            ))}
          </div>
        </div>

        <div className="paint-calculator-grid">
          {shape === "dikdortgen" ? (
            <>
              <label className="category-general-converter-field">
                <span>{copy.length}</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={length}
                  onChange={(event) => setLength(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>{copy.width}</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={width}
                  onChange={(event) => setWidth(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>{copy.thickness}</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={thickness}
                  onChange={(event) => setThickness(event.target.value)}
                />
              </label>
            </>
          ) : (
            <>
              <label className="category-general-converter-field">
                <span>{copy.diameter}</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={diameter}
                  onChange={(event) => setDiameter(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>{copy.height}</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={height}
                  onChange={(event) => setHeight(event.target.value)}
                />
              </label>
            </>
          )}

          <label className="category-general-converter-field">
            <span>{copy.waste}</span>
            <input
              inputMode="decimal"
              type="text"
              value={wasteFactor}
              onChange={(event) => setWasteFactor(event.target.value)}
            />
          </label>
        </div>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result.success ? (
          <strong>{result.message ?? copy.emptyState}</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>{copy.resultVolume}</span>
              <strong>{formatVolume(result.result.volumeM3, locale)}</strong>
            </div>
            <div>
              <span>{copy.resultVolumeWithWaste}</span>
              <strong>{formatVolume(result.result.volumeWithWasteM3, locale)}</strong>
            </div>
            <div>
              <span>{copy.resultBagCount}</span>
              <strong>{formatLocalizedNumber(result.result.bagCount25kg, locale, { maximumFractionDigits: 0 })}</strong>
            </div>
            <div>
              <span>{copy.resultCement}</span>
              <strong>{formatLocalizedNumber(result.result.cementKg, locale, { maximumFractionDigits: 0 })} kg</strong>
            </div>
            <div>
              <span>{copy.resultSand}</span>
              <strong>{formatVolume(result.result.sandM3, locale)}</strong>
            </div>
            <div>
              <span>{copy.resultGravel}</span>
              <strong>{formatVolume(result.result.gravelM3, locale)}</strong>
            </div>
            <div>
              <span>{copy.resultWater}</span>
              <strong>{formatLocalizedNumber(result.result.waterL, locale, { maximumFractionDigits: 0 })} L</strong>
            </div>
          </div>
        )}
      </div>

      <p className="paint-calculator-liters">{copy.note}</p>
    </div>
  );
}
