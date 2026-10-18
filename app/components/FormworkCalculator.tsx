"use client";

import { useMemo, useState } from "react";
import { calculateFormworkArea, type FormworkElement } from "../converter/formworkCalculator";

const elementLabels: Record<FormworkElement, string> = {
  doseme: "Döşeme",
  kolon: "Kolon",
  kiris: "Kiriş",
  "tekil-temel": "Tekil temel",
};

function parseNumber(value: string) {
  const parsed = Number(value.trim().replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatNumber(value: number) {
  return value.toLocaleString("tr-TR", { maximumFractionDigits: 2 });
}

export default function FormworkCalculator() {
  const [element, setElement] = useState<FormworkElement>("doseme");
  const [length, setLength] = useState("5");
  const [width, setWidth] = useState("4");
  const [height, setHeight] = useState("3");
  const [quantity, setQuantity] = useState("1");

  const result = useMemo(
    () =>
      calculateFormworkArea({
        element,
        lengthM: parseNumber(length),
        widthM: parseNumber(width),
        heightM: parseNumber(height),
        quantity: parseNumber(quantity),
      }),
    [element, length, width, height, quantity]
  );

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Kalıp yapılacak eleman</span>
          <div className="engineering-target-grid">
            {(Object.keys(elementLabels) as FormworkElement[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`engineering-target-button${element === key ? " is-active" : ""}`}
                aria-pressed={element === key}
                onClick={() => setElement(key)}
              >
                {elementLabels[key]}
              </button>
            ))}
          </div>
        </div>
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>{element === "kolon" || element === "tekil-temel" ? "Uzun Kenar (m)" : "Uzunluk (m)"}</span>
            <input inputMode="decimal" type="text" value={length} onChange={(event) => setLength(event.target.value)} />
          </label>
          <label className="category-general-converter-field">
            <span>{element === "kolon" || element === "tekil-temel" ? "Kısa Kenar (m)" : "Genişlik (m)"}</span>
            <input inputMode="decimal" type="text" value={width} onChange={(event) => setWidth(event.target.value)} />
          </label>
          {element !== "doseme" && (
            <label className="category-general-converter-field">
              <span>{element === "kolon" ? "Kolon Yüksekliği (m)" : element === "kiris" ? "Kiriş Yüksekliği (m)" : "Temel Kalınlığı (m)"}</span>
              <input inputMode="decimal" type="text" value={height} onChange={(event) => setHeight(event.target.value)} />
            </label>
          )}
          <label className="category-general-converter-field">
            <span>Eleman Adedi</span>
            <input inputMode="numeric" type="text" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
          </label>
        </div>
      </div>
      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>Geçerli ölçüler ve pozitif bir tam adet girerek sonucu görebilirsin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Bir Elemanın Kalıp Alanı</span>
              <strong>{formatNumber(result.areaPerElementM2)} m²</strong>
            </div>
            <div>
              <span>Toplam Kalıp Alanı</span>
              <strong>{formatNumber(result.totalAreaM2)} m²</strong>
            </div>
          </div>
        )}
      </div>
      <p className="paint-calculator-liters">
        Döşemede alt yüzey, kirişte alt ve iki yan yüz, kolon ve tekil temelde dört yan yüz hesaplanır. Kalıp alanı ölçümüdür; taşıyıcı sistem veya kalıp güvenliği hesabı değildir.
      </p>
    </div>
  );
}
