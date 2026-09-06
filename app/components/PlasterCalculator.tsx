"use client";

import { useMemo, useState } from "react";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import {
  calculatePlaster,
  type PlasterType,
} from "../converter/plasterCalculator";

type SupportedLocale = "tr" | "en";

const typeLabels: Record<PlasterType, string> = {
  alci: "Alçı Sıva (İç Cephe)",
  cimento: "Çimento Esaslı Sıva (Dış Cephe)",
};

const defaultsByType: Record<PlasterType, { kgPerM2PerCm: string; bagWeightKg: string; thicknessCm: string }> = {
  alci: { kgPerM2PerCm: "9", bagWeightKg: "30", thicknessCm: "1.5" },
  cimento: { kgPerM2PerCm: "16", bagWeightKg: "25", thicknessCm: "2" },
};

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

export default function PlasterCalculator({
  locale = "tr",
}: {
  locale?: SupportedLocale;
}) {
  const [plasterType, setPlasterType] = useState<PlasterType>("alci");
  const [area, setArea] = useState("50");
  const [thicknessCm, setThicknessCm] = useState(defaultsByType.alci.thicknessCm);
  const [kgPerM2PerCm, setKgPerM2PerCm] = useState(defaultsByType.alci.kgPerM2PerCm);
  const [bagWeightKg, setBagWeightKg] = useState(defaultsByType.alci.bagWeightKg);
  const [wasteFactor, setWasteFactor] = useState("5");

  function handleTypeChange(nextType: PlasterType) {
    const defaults = defaultsByType[nextType];
    setPlasterType(nextType);
    setThicknessCm(defaults.thicknessCm);
    setKgPerM2PerCm(defaults.kgPerM2PerCm);
    setBagWeightKg(defaults.bagWeightKg);
  }

  const result = useMemo(
    () =>
      calculatePlaster({
        plasterType,
        area: parseNumericValue(area),
        thicknessCm: parseNumericValue(thicknessCm),
        kgPerM2PerCm: parseNumericValue(kgPerM2PerCm),
        bagWeightKg: parseNumericValue(bagWeightKg),
        wasteFactor: parseNumericValue(wasteFactor),
      }),
    [plasterType, area, thicknessCm, kgPerM2PerCm, bagWeightKg, wasteFactor]
  );

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Sıva Türü</span>
          <div className="engineering-target-grid">
            {(Object.keys(typeLabels) as PlasterType[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`engineering-target-button${plasterType === key ? " is-active" : ""}`}
                onClick={() => handleTypeChange(key)}
              >
                {typeLabels[key]}
              </button>
            ))}
          </div>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Sıvanacak Alan (m²)</span>
            <input
              inputMode="decimal"
              type="text"
              value={area}
              onChange={(event) => setArea(event.target.value)}
            />
          </label>
          <label className="category-general-converter-field">
            <span>Kalınlık (cm)</span>
            <input
              inputMode="decimal"
              type="text"
              value={thicknessCm}
              onChange={(event) => setThicknessCm(event.target.value)}
            />
          </label>
          <label className="category-general-converter-field">
            <span>m² Başına kg (1 cm için)</span>
            <input
              inputMode="decimal"
              type="text"
              value={kgPerM2PerCm}
              onChange={(event) => setKgPerM2PerCm(event.target.value)}
            />
          </label>
          <label className="category-general-converter-field">
            <span>Torba Ağırlığı (kg)</span>
            <input
              inputMode="decimal"
              type="text"
              value={bagWeightKg}
              onChange={(event) => setBagWeightKg(event.target.value)}
            />
          </label>
          <label className="category-general-converter-field">
            <span>Fire Payı (%)</span>
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
          <strong>{result.message}</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Gereken Malzeme</span>
              <strong>
                {formatLocalizedNumber(result.result.totalKg, locale, {
                  maximumFractionDigits: 0,
                })}{" "}
                kg
              </strong>
            </div>
            <div>
              <span>Fire Dahil Malzeme</span>
              <strong>
                {formatLocalizedNumber(result.result.totalKgWithWaste, locale, {
                  maximumFractionDigits: 0,
                })}{" "}
                kg
              </strong>
            </div>
            <div>
              <span>Torba Sayısı</span>
              <strong>
                {formatLocalizedNumber(result.result.bagCount, locale, {
                  maximumFractionDigits: 0,
                })}
              </strong>
            </div>
          </div>
        )}
      </div>

      <p className="paint-calculator-liters">
        Not: m² başına kg değeri ve torba ağırlığı ürün markasına göre
        değişir — bu araç yaygın alçı ve çimento esaslı sıva ürünlerine
        dayanan varsayılan değerler kullanır; kullandığın ürünün
        ambalajındaki tüketim tablosuna göre bu alanları güncelleyebilirsin.
      </p>
    </div>
  );
}
