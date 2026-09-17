"use client";

import { useState } from "react";
import { calculateSubcooling, calculateSuperheat } from "../../converter/hvacCalculator";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatDelta(value: number): string {
  return `${value.toLocaleString("uz-UZ", { maximumFractionDigits: 1 })} °C`;
}

export default function SuperheatSubcoolingCalculatorUz() {
  const [evapMeasuredInput, setEvapMeasuredInput] = useState("");
  const [evapSaturationInput, setEvapSaturationInput] = useState("");

  const [condSaturationInput, setCondSaturationInput] = useState("");
  const [condMeasuredInput, setCondMeasuredInput] = useState("");

  const evapMeasured = parseNumericValue(evapMeasuredInput);
  const evapSaturation = parseNumericValue(evapSaturationInput);
  const superheat =
    evapMeasured !== null && evapSaturation !== null
      ? calculateSuperheat(evapMeasured, evapSaturation)
      : null;

  const condSaturation = parseNumericValue(condSaturationInput);
  const condMeasured = parseNumericValue(condMeasuredInput);
  const subcooling =
    condSaturation !== null && condMeasured !== null
      ? calculateSubcooling(condSaturation, condMeasured)
      : null;

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Superheat (Ortiqcha Qizdirish)</span>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Bug&apos;latgich Chiqish Harorati (°C, o&apos;lchangan)</span>
            <input
              type="text"
              inputMode="decimal"
              value={evapMeasuredInput}
              onChange={(event) => setEvapMeasuredInput(event.target.value)}
              placeholder="masalan 8"
            />
          </label>
          <label className="category-general-converter-field">
            <span>To&apos;yinganlik Harorati (°C, P-T kartasidan)</span>
            <input
              type="text"
              inputMode="decimal"
              value={evapSaturationInput}
              onChange={(event) => setEvapSaturationInput(event.target.value)}
              placeholder="masalan 2"
            />
          </label>
        </div>

        <div
          aria-live="polite"
          className="category-general-converter-result paint-calculator-result"
        >
          {superheat === null ? (
            <strong>Ikki haroratni kiritib superheat qiymatini ko&apos;rishingiz mumkin.</strong>
          ) : (
            <strong>Superheat: {formatDelta(superheat)}</strong>
          )}
        </div>
      </div>

      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Subcooling (Qo&apos;shimcha Sovutish)</span>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>To&apos;yinganlik Harorati (°C, P-T kartasidan)</span>
            <input
              type="text"
              inputMode="decimal"
              value={condSaturationInput}
              onChange={(event) => setCondSaturationInput(event.target.value)}
              placeholder="masalan 45"
            />
          </label>
          <label className="category-general-converter-field">
            <span>Suyuqlik Liniyasi Harorati (°C, o&apos;lchangan)</span>
            <input
              type="text"
              inputMode="decimal"
              value={condMeasuredInput}
              onChange={(event) => setCondMeasuredInput(event.target.value)}
              placeholder="masalan 38"
            />
          </label>
        </div>

        <div
          aria-live="polite"
          className="category-general-converter-result paint-calculator-result"
        >
          {subcooling === null ? (
            <strong>Ikki haroratni kiritib subcooling qiymatini ko&apos;rishingiz mumkin.</strong>
          ) : (
            <strong>Subcooling: {formatDelta(subcooling)}</strong>
          )}
        </div>
      </div>

      <p className="calculator-usage-hint">
        <strong>Eslatma:</strong> To&apos;yinganlik haroratini
        ishlatayotgan sovutuvchi gazingizga xos bosim-harorat (P-T)
        kartasidan yoki ilovasidan o&apos;qing — bu vosita P-T
        aylantirish qilmaydi, faqat harorat farqini hisoblaydi.
      </p>
    </div>
  );
}
