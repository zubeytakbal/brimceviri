"use client";

import { useMemo, useState } from "react";
import {
  calculateAverageAtomicMass,
  type Isotope,
} from "../converter/atomicMassCalculator";
import { numberLocales, type ContentLocale } from "./contentLocale";

type IsotopeRow = {
  id: number;
  massInput: string;
  abundanceInput: string;
};

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatNumber(value: number, locale: ContentLocale, maximumFractionDigits = 4) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString(numberLocales[locale], { maximumFractionDigits });
}

const copy = {
  tr: {
    isotopeLine: (index: number) => `İzotop ${index}: `,
    step1: "1. Adım — Her izotobun katkısı",
    step2: "2. Adım — Ağırlıklı ortalama",
    average: "Ortalama",
    formula: "Ortalama = Σ(kütle × bolluk) / Σ(bolluk)",
    hint: (
      <>
        Nasıl çalışır: elementin bilinen her izotopunun kütlesini (u) ve
        doğal bolluk yüzdesini gir; ağırlıklı ortalama alarak periyodik
        tablodaki atom kütlesini hesaplayalım. Bolluk yüzdeleri toplamı
        100 olmasa da hesap makinesi oranlayarak doğru sonucu verir.
      </>
    ),
    massLabel: (index: number) => <>İzotop {index}: kütle (u)</>,
    abundanceLabel: "Bolluk (%)",
    removeLabel: (index: number) => `İzotop ${index}'i kaldır`,
    addIsotope: "+ İzotop Ekle",
    invalid: "Geçerli izotop kütlesi ve bolluk yüzdesi girerek sonucu görebilirsin.",
    averageMass: "Ortalama Atom Kütlesi",
    totalAbundance: "Toplam Bolluk",
    stepsTitle: "Adım Adım Çözüm",
  },
  de: {
    isotopeLine: (index: number) => `Isotop ${index}: `,
    step1: "Schritt 1 — Beitrag jedes Isotops",
    step2: "Schritt 2 — Gewichteter Durchschnitt",
    average: "Durchschnitt",
    formula: "Durchschnitt = Σ(Masse × Häufigkeit) / Σ(Häufigkeit)",
    hint: (
      <>
        So funktioniert es: Gib für jedes bekannte Isotop des Elements
        die Masse (u) und die natürliche Häufigkeit in Prozent ein; wir
        berechnen den gewichteten Durchschnitt, also die Atommasse aus
        dem Periodensystem. Auch wenn die Häufigkeiten nicht genau 100
        ergeben, berechnet der Rechner das korrekte Ergebnis
        anteilig.
      </>
    ),
    massLabel: (index: number) => <>Isotop {index}: Masse (u)</>,
    abundanceLabel: "Häufigkeit (%)",
    removeLabel: (index: number) => `Isotop ${index} entfernen`,
    addIsotope: "+ Isotop hinzufügen",
    invalid: "Gib gültige Isotopmassen und Häufigkeiten ein, um das Ergebnis zu sehen.",
    averageMass: "Durchschnittliche Atommasse",
    totalAbundance: "Gesamthäufigkeit",
    stepsTitle: "Schritt-für-Schritt-Lösung",
  },
};

let nextId = 3;

export default function AtomicMassCalculator({ locale = "tr" }: { locale?: ContentLocale } = {}) {
  const t = copy[locale];
  const [rows, setRows] = useState<IsotopeRow[]>([
    { id: 1, massInput: "34.969", abundanceInput: "75.77" },
    { id: 2, massInput: "36.966", abundanceInput: "24.23" },
  ]);

  const isotopes: Isotope[] = useMemo(
    () =>
      rows.map((row) => ({
        mass: parseNumericValue(row.massInput),
        abundancePercent: parseNumericValue(row.abundanceInput),
      })),
    [rows]
  );

  const result = useMemo(
    () => calculateAverageAtomicMass(isotopes),
    [isotopes]
  );

  const totalAbundance = useMemo(
    () =>
      isotopes.reduce(
        (sum, isotope) =>
          Number.isFinite(isotope.abundancePercent)
            ? sum + isotope.abundancePercent
            : sum,
        0
      ),
    [isotopes]
  );

  function updateRow(id: number, field: "massInput" | "abundanceInput", value: string) {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  }

  function addRow() {
    setRows((prev) => [
      ...prev,
      { id: nextId++, massInput: "", abundanceInput: "" },
    ]);
  }

  function removeRow(id: number) {
    setRows((prev) => (prev.length > 1 ? prev.filter((row) => row.id !== id) : prev));
  }

  const steps = useMemo(() => {
    if (result === null) {
      return null;
    }

    const isotopeLines = isotopes.map(
      (isotope, index) =>
        `${t.isotopeLine(index + 1)}${formatNumber(isotope.mass, locale)} × ${formatNumber(isotope.abundancePercent, locale, 2)} = ${formatNumber(isotope.mass * isotope.abundancePercent, locale)}`
    );

    const weightedSum = isotopes.reduce(
      (sum, isotope) => sum + isotope.mass * isotope.abundancePercent,
      0
    );

    return [
      {
        title: t.step1,
        lines: isotopeLines,
      },
      {
        title: t.step2,
        lines: [
          t.formula,
          `${t.average} = ${formatNumber(weightedSum, locale)} / ${formatNumber(totalAbundance, locale, 2)}`,
          `${t.average} ≈ ${formatNumber(result, locale, 4)} u`,
        ],
      },
    ];
  }, [result, isotopes, totalAbundance, t, locale]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">{t.hint}</p>

        <div className="atomic-mass-isotope-list">
          {rows.map((row, index) => (
            <div className="atomic-mass-isotope-row" key={row.id}>
              <label className="category-general-converter-field">
                <span>{t.massLabel(index + 1)}</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={row.massInput}
                  onChange={(event) =>
                    updateRow(row.id, "massInput", event.target.value)
                  }
                />
              </label>
              <label className="category-general-converter-field">
                <span>{t.abundanceLabel}</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={row.abundanceInput}
                  onChange={(event) =>
                    updateRow(row.id, "abundanceInput", event.target.value)
                  }
                />
              </label>
              {rows.length > 1 && (
                <button
                  type="button"
                  className="atomic-mass-remove-button"
                  onClick={() => removeRow(row.id)}
                  aria-label={t.removeLabel(index + 1)}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="engineering-target-button atomic-mass-add-button"
          onClick={addRow}
        >
          {t.addIsotope}
        </button>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>{t.invalid}</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>{t.averageMass}</span>
              <strong>{formatNumber(result, locale, 4)} u</strong>
            </div>
            <div>
              <span>{t.totalAbundance}</span>
              <strong>{formatNumber(totalAbundance, locale, 2)} %</strong>
            </div>
          </div>
        )}
      </div>

      {steps && (
        <div className="calculator-steps">
          <h3>{t.stepsTitle}</h3>
          {steps.map((step) => (
            <div className="calculator-step" key={step.title}>
              <p className="calculator-step-title">{step.title}</p>
              {step.lines.map((line) => (
                <p className="calculator-step-line" key={line}>
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
