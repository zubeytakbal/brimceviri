"use client";

import { useMemo, useState } from "react";
import {
  commonCompounds,
  commonSubstances,
  elementSubstances,
} from "../converter/commonSubstances";
import {
  calculateMol,
  type MolTarget,
} from "../converter/molCalculator";
import { parseMolecularFormula } from "../converter/molecularFormulaParser";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 4) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

function formatScientific(value: number) {
  if (!Number.isFinite(value) || value === 0) {
    return "0";
  }

  const exponent = Math.floor(Math.log10(Math.abs(value)));
  const mantissa = value / Math.pow(10, exponent);

  return `${formatNumber(mantissa, 3)} × 10^${exponent}`;
}

export default function MolCalculator() {
  const [target, setTarget] = useState<MolTarget>("moles");
  const [substanceId, setSubstanceId] = useState("custom");
  const [molarMass, setMolarMass] = useState("18.02");
  const [massGrams, setMassGrams] = useState("36");
  const [moles, setMoles] = useState("2");
  const [formulaInput, setFormulaInput] = useState("");

  const result = useMemo(
    () =>
      calculateMol({
        target,
        molarMass: parseNumericValue(molarMass),
        massGrams: parseNumericValue(massGrams),
        moles: parseNumericValue(moles),
      }),
    [target, molarMass, massGrams, moles]
  );

  const formulaResult = useMemo(
    () => parseMolecularFormula(formulaInput),
    [formulaInput]
  );

  function applySubstance(id: string) {
    setSubstanceId(id);
    setFormulaInput("");

    const substance = commonSubstances.find((item) => item.id === id);

    if (substance && substance.molarMass) {
      setMolarMass(substance.molarMass);
    }
  }

  function handleFormulaChange(value: string) {
    setFormulaInput(value);

    const parsed = parseMolecularFormula(value);

    if (parsed) {
      setSubstanceId("custom");
      setMolarMass(parsed.molarMass.toFixed(3));
    }
  }

  const steps = useMemo(() => {
    if (!result) {
      return null;
    }

    const stepList: { title: string; lines: string[] }[] = [];

    if (target === "moles") {
      stepList.push({
        title: "1. Adım — Kütleden mol sayısı",
        lines: [
          "n = m / M",
          `n = ${formatNumber(result.massGrams)} g / ${formatNumber(result.molarMass)} g/mol`,
          `n ≈ ${formatNumber(result.moles)} mol`,
        ],
      });
    } else {
      stepList.push({
        title: "1. Adım — Mol sayısından kütle",
        lines: [
          "m = n × M",
          `m = ${formatNumber(result.moles)} mol × ${formatNumber(result.molarMass)} g/mol`,
          `m ≈ ${formatNumber(result.massGrams)} g`,
        ],
      });
    }

    stepList.push({
      title: "2. Adım — Parçacık sayısı",
      lines: [
        "N = n × Nₐ",
        `N = ${formatNumber(result.moles)} × 6,02214076 × 10²³`,
        `N ≈ ${formatScientific(result.particleCount)}`,
      ],
    });

    return stepList;
  }, [result, target]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: elindeki iki değeri gir (mesela kütle ve molar
          kütle), üçüncüsünü ve parçacık sayısını biz hesaplayalım.
        </p>
        <div className="engineering-targets">
          <span>Neyi hesaplamak istiyorsun?</span>

          <div className="engineering-target-grid hydrostatic-target-grid">
            <button
              type="button"
              className={`engineering-target-button${target === "moles" ? " is-active" : ""}`}
              onClick={() => setTarget("moles")}
            >
              Mol Sayısı (kütleden)
            </button>
            <button
              type="button"
              className={`engineering-target-button${target === "mass" ? " is-active" : ""}`}
              onClick={() => setTarget("mass")}
            >
              Kütle (mol sayısından)
            </button>
          </div>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Madde veya element (ön ayar, opsiyonel)</span>
            <select
              value={substanceId}
              onChange={(event) => applySubstance(event.target.value)}
            >
              <option value="custom">Özel değer</option>
              <optgroup label="Sık kullanılan bileşikler">
                {commonCompounds.map((substance) => (
                  <option key={substance.id} value={substance.id}>
                    {substance.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Elementler (periyodik tablo)">
                {elementSubstances.map((substance) => (
                  <option key={substance.id} value={substance.id}>
                    {substance.label}
                  </option>
                ))}
              </optgroup>
            </select>
          </label>

          <label className="category-general-converter-field">
            <span>Kimyasal Formül (opsiyonel)</span>
            <input
              type="text"
              placeholder="Örn: H2O, Fe2O3, Al2(SO4)3"
              value={formulaInput}
              onChange={(event) => handleFormulaChange(event.target.value)}
            />
          </label>

          {formulaInput.trim() && (
            <p
              className={`mol-formula-hint${formulaResult ? "" : " mol-formula-hint-error"}`}
            >
              {formulaResult
                ? `${formulaResult.composition
                    .map((item) => `${item.count}×${item.nameTr}`)
                    .join(" + ")} = ${formatNumber(formulaResult.molarMass, 3)} g/mol`
                : "Formül tanınamadı — element sembollerini büyük harfle başlat (örn. Na, Cl, O)."}
            </p>
          )}

          <label className="category-general-converter-field">
            <span>Molar Kütle (g/mol)</span>
            <input
              inputMode="decimal"
              type="text"
              value={molarMass}
              onChange={(event) => {
                setMolarMass(event.target.value);
                setSubstanceId("custom");
                setFormulaInput("");
              }}
            />
          </label>

          {target === "moles" ? (
            <label className="category-general-converter-field">
              <span>Kütle (g)</span>
              <input
                inputMode="decimal"
                type="text"
                value={massGrams}
                onChange={(event) => setMassGrams(event.target.value)}
              />
            </label>
          ) : (
            <label className="category-general-converter-field">
              <span>Mol Sayısı</span>
              <input
                inputMode="decimal"
                type="text"
                value={moles}
                onChange={(event) => setMoles(event.target.value)}
              />
            </label>
          )}
        </div>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>Geçerli bir molar kütle ve değer girerek sonucu görebilirsin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Mol Sayısı</span>
              <strong>{formatNumber(result.moles)} mol</strong>
            </div>
            <div>
              <span>Kütle</span>
              <strong>{formatNumber(result.massGrams)} g</strong>
            </div>
            <div>
              <span>Molar Kütle</span>
              <strong>{formatNumber(result.molarMass)} g/mol</strong>
            </div>
            <div>
              <span>Parçacık Sayısı</span>
              <strong>{formatScientific(result.particleCount)}</strong>
            </div>
          </div>
        )}
      </div>

      {steps && (
        <div className="calculator-steps">
          <h3>Adım Adım Çözüm</h3>
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
