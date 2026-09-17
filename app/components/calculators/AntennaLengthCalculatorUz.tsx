"use client";

import { useState } from "react";
import {
  calculateAntennaLengths,
  calculateResonantFrequencyFromDipole,
} from "../../converter/antennaCalculator";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatMeters(value: number): string {
  return `${value.toLocaleString("uz-UZ", { maximumFractionDigits: 2 })} m`;
}

function formatMHz(value: number): string {
  return `${value.toLocaleString("uz-UZ", { maximumFractionDigits: 3 })} MHz`;
}

export default function AntennaLengthCalculatorUz() {
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
            <span>Chastota (MHz)</span>
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
            <strong>To&apos;g&apos;ri chastota kiriting.</strong>
          ) : !lengths ? (
            <strong>Chastota kiritib anten uzunliklarini ko&apos;rishingiz mumkin.</strong>
          ) : (
            <div className="paint-calculator-result-grid">
              <div>
                <span>To&apos;liq To&apos;lqin Uzunligi (λ, nazariy)</span>
                <strong>{formatMeters(lengths.fullWavelengthM)}</strong>
              </div>
              <div>
                <span>Yarim To&apos;lqin Dipol (λ/2)</span>
                <strong>{formatMeters(lengths.halfWaveDipoleM)}</strong>
              </div>
              <div>
                <span>Chorak To&apos;lqin Vertikal (λ/4)</span>
                <strong>{formatMeters(lengths.quarterWaveVerticalM)}</strong>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Qo&apos;limdagi dipol uzunligidan rezonans chastotasini toping</span>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Yarim To&apos;lqin Dipol Uzunligi (m)</span>
            <input
              type="text"
              inputMode="decimal"
              value={dipoleLengthInput}
              onChange={(event) => setDipoleLengthInput(event.target.value)}
              placeholder="masalan 10"
            />
          </label>
        </div>

        <div
          aria-live="polite"
          className="category-general-converter-result paint-calculator-result"
        >
          {dipoleInvalid ? (
            <strong>To&apos;g&apos;ri uzunlik kiriting.</strong>
          ) : !resonantFrequency ? (
            <strong>Dipol uzunligini kiritib rezonans chastotasini ko&apos;rishingiz mumkin.</strong>
          ) : (
            <strong>Rezonans Chastotasi: {formatMHz(resonantFrequency)}</strong>
          )}
        </div>
      </div>

      <p className="calculator-usage-hint">
        <strong>Eslatma:</strong> Yarim to&apos;lqin dipol va chorak
        to&apos;lqin vertikal formulalari uch effektini (end effect)
        hisobga oluvchi amaliy koeffitsientlardan foydalanadi; haqiqiy
        anten uzunligi o&apos;rnatish balandligi, atrofdagi narsalar va
        ishlatilgan o&apos;tkazgich turiga qarab kichik farqlar
        ko&apos;rsatishi mumkin.
      </p>
    </div>
  );
}
