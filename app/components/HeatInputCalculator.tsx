"use client";

import { useState } from "react";
import { calculateHeatInput } from "../converter/weldingCalculator";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatKjPerMm(value: number): string {
  return `${value.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} kJ/mm`;
}

export default function HeatInputCalculator() {
  const [voltageInput, setVoltageInput] = useState("25");
  const [currentInput, setCurrentInput] = useState("150");
  const [speedInput, setSpeedInput] = useState("200");

  const voltage = parseNumericValue(voltageInput);
  const current = parseNumericValue(currentInput);
  const speed = parseNumericValue(speedInput);

  const result =
    voltage !== null && current !== null && speed !== null
      ? calculateHeatInput(voltage, current, speed)
      : null;

  const invalid = Boolean(voltageInput.trim() || currentInput.trim() || speedInput.trim()) && !result;

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Voltaj (V)</span>
          <input
            type="text"
            inputMode="decimal"
            value={voltageInput}
            onChange={(event) => setVoltageInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Akım (A)</span>
          <input
            type="text"
            inputMode="decimal"
            value={currentInput}
            onChange={(event) => setCurrentInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Kaynak Hızı (mm/dakika)</span>
          <input
            type="text"
            inputMode="decimal"
            value={speedInput}
            onChange={(event) => setSpeedInput(event.target.value)}
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {invalid ? (
          <strong>Geçerli değerler gir.</strong>
        ) : !result ? (
          <strong>Voltaj, akım ve kaynak hızını girerek ısı girdisini görebilirsin.</strong>
        ) : (
          <strong>Isı Girdisi: {formatKjPerMm(result)}</strong>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Not:</strong> Formül EN 1011 standardına dayanan genel
        ısı girdisi hesabıdır (verim katsayısı dahil değildir);
        malzemeye özel prosedür şartnamesi (WPS) her zaman esas
        alınmalıdır.
      </p>
    </div>
  );
}
