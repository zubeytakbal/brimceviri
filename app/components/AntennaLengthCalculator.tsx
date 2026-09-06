"use client";

import { useState } from "react";
import {
  calculateAntennaLengths,
  calculateResonantFrequencyFromDipole,
} from "../converter/antennaCalculator";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatMeters(value: number): string {
  return `${value.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} m`;
}

function formatMHz(value: number): string {
  return `${value.toLocaleString("tr-TR", { maximumFractionDigits: 3 })} MHz`;
}

export default function AntennaLengthCalculator() {
  const [frequencyInput, setFrequencyInput] = useState("14.2");
  const [dipoleLengthInput, setDipoleLengthInput] = useState("");

  const frequency = parseNumericValue(frequencyInput);
  const lengths = frequency !== null ? calculateAntennaLengths(frequency) : null;
  const frequencyInvalid = frequencyInput.trim().length > 0 && !lengths;

  const dipoleLength = parseNumericValue(dipoleLengthInput);
  const resonantFrequency =
    dipoleLength !== null ? calculateResonantFrequencyFromDipole(dipoleLength) : null;
  const dipoleInvalid = dipoleLengthInput.trim().length > 0 && !resonantFrequency;

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Frekans (MHz)</span>
            <input
              type="text"
              inputMode="decimal"
              value={frequencyInput}
              onChange={(event) => setFrequencyInput(event.target.value)}
              placeholder="14.2"
            />
          </label>
        </div>

        <div
          aria-live="polite"
          className="category-general-converter-result paint-calculator-result"
        >
          {frequencyInvalid ? (
            <strong>Geçerli bir frekans gir.</strong>
          ) : !lengths ? (
            <strong>Bir frekans girerek anten uzunluklarını görebilirsin.</strong>
          ) : (
            <div className="paint-calculator-result-grid">
              <div>
                <span>Tam Dalga Boyu (λ, teorik)</span>
                <strong>{formatMeters(lengths.fullWavelengthM)}</strong>
              </div>
              <div>
                <span>Yarım Dalga Dipol (λ/2)</span>
                <strong>{formatMeters(lengths.halfWaveDipoleM)}</strong>
              </div>
              <div>
                <span>Çeyrek Dalga Vertikal (λ/4)</span>
                <strong>{formatMeters(lengths.quarterWaveVerticalM)}</strong>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Elimdeki dipol uzunluğundan rezonans frekansını bul</span>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Yarım Dalga Dipol Uzunluğu (m)</span>
            <input
              type="text"
              inputMode="decimal"
              value={dipoleLengthInput}
              onChange={(event) => setDipoleLengthInput(event.target.value)}
              placeholder="örn. 10"
            />
          </label>
        </div>

        <div
          aria-live="polite"
          className="category-general-converter-result paint-calculator-result"
        >
          {dipoleInvalid ? (
            <strong>Geçerli bir uzunluk gir.</strong>
          ) : !resonantFrequency ? (
            <strong>Bir dipol uzunluğu girerek rezonans frekansını görebilirsin.</strong>
          ) : (
            <strong>Rezonans Frekansı: {formatMHz(resonantFrequency)}</strong>
          )}
        </div>
      </div>

      <p className="calculator-usage-hint">
        <strong>Not:</strong> Yarım dalga dipol ve çeyrek dalga vertikal
        formülleri, uç etkisini (end effect) hesaba katan pratik
        katsayılar kullanır; gerçek anten uzunluğu montaj yüksekliği,
        çevredeki nesneler ve kullanılan iletken tipine göre küçük
        farklar gösterebilir.
      </p>
    </div>
  );
}
