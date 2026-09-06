"use client";

import { useMemo, useState } from "react";
import {
  commonCompounds,
  commonSubstances,
  elementSubstances,
} from "../converter/commonSubstances";
import { convert } from "../converter/convert";
import {
  calculateMolality,
  type MolalityTarget,
} from "../converter/molalityCalculator";
import { parseMolecularFormula } from "../converter/molecularFormulaParser";

const massUnits = [
  { symbol: "mg", label: "mg" },
  { symbol: "g", label: "g" },
  { symbol: "kg", label: "kg" },
];

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

const targetLabels: Record<MolalityTarget, string> = {
  molalite: "Molalite (mol/kg)",
  molSayisi: "Mol Sayısı",
  cozucuKutlesi: "Çözücü Kütlesi",
};

export default function MolalityCalculator() {
  const [target, setTarget] = useState<MolalityTarget>("molalite");
  const [molaliteInput, setMolaliteInput] = useState("1");
  const [molSayisiInput, setMolSayisiInput] = useState("0.5");
  const [cozucuInput, setCozucuInput] = useState("500");
  const [cozucuUnit, setCozucuUnit] = useState("g");

  const [molSayisiMode, setMolSayisiMode] = useState<"direct" | "mass">(
    "direct"
  );
  const [substanceId, setSubstanceId] = useState("custom");
  const [formulaInput, setFormulaInput] = useState("");
  const [molarMassInput, setMolarMassInput] = useState("58.44");
  const [soluteMassInput, setSoluteMassInput] = useState("29.22");

  const cozucuKutlesiKg = useMemo(() => {
    const value = parseNumericValue(cozucuInput);

    if (!Number.isFinite(value)) {
      return Number.NaN;
    }

    return convert("kutle", value, cozucuUnit, "kg");
  }, [cozucuInput, cozucuUnit]);

  const formulaResult = useMemo(
    () => parseMolecularFormula(formulaInput),
    [formulaInput]
  );

  const molSayisiFromMass = useMemo(() => {
    const mass = parseNumericValue(soluteMassInput);
    const molarMass = parseNumericValue(molarMassInput);

    if (
      !Number.isFinite(mass) ||
      !Number.isFinite(molarMass) ||
      molarMass <= 0
    ) {
      return Number.NaN;
    }

    return mass / molarMass;
  }, [soluteMassInput, molarMassInput]);

  const effectiveMolSayisi =
    molSayisiMode === "mass"
      ? molSayisiFromMass
      : parseNumericValue(molSayisiInput);

  const result = useMemo(
    () =>
      calculateMolality({
        target,
        molalite: parseNumericValue(molaliteInput),
        molSayisi: effectiveMolSayisi,
        cozucuKutlesiKg,
      }),
    [target, molaliteInput, effectiveMolSayisi, cozucuKutlesiKg]
  );

  function cozucuInSelectedUnit(kgValue: number) {
    return convert("kutle", kgValue, "kg", cozucuUnit);
  }

  function applySubstance(id: string) {
    setSubstanceId(id);
    setFormulaInput("");

    const substance = commonSubstances.find((item) => item.id === id);

    if (substance && substance.molarMass) {
      setMolarMassInput(substance.molarMass);
    }
  }

  function handleFormulaChange(value: string) {
    setFormulaInput(value);

    const parsed = parseMolecularFormula(value);

    if (parsed) {
      setSubstanceId("custom");
      setMolarMassInput(parsed.molarMass.toFixed(3));
    }
  }

  const steps = useMemo(() => {
    if (!result) {
      return null;
    }

    if (target === "molalite") {
      return [
        {
          title: "1. Adım — Molalite",
          lines: [
            "m = n / kg(çözücü)",
            `m = ${formatNumber(result.molSayisi)} mol / ${formatNumber(result.cozucuKutlesiKg)} kg`,
            `m ≈ ${formatNumber(result.molalite)} mol/kg`,
          ],
        },
      ];
    }

    if (target === "molSayisi") {
      return [
        {
          title: "1. Adım — Mol sayısı",
          lines: [
            "n = m × kg(çözücü)",
            `n = ${formatNumber(result.molalite)} mol/kg × ${formatNumber(result.cozucuKutlesiKg)} kg`,
            `n ≈ ${formatNumber(result.molSayisi)} mol`,
          ],
        },
      ];
    }

    return [
      {
        title: "1. Adım — Çözücü kütlesi",
        lines: [
          "kg(çözücü) = n / m",
          `kg(çözücü) = ${formatNumber(result.molSayisi)} mol / ${formatNumber(result.molalite)} mol/kg`,
          `kg(çözücü) ≈ ${formatNumber(result.cozucuKutlesiKg)} kg`,
        ],
      },
    ];
  }, [result, target]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: bildiğin iki değeri gir (mesela mol sayısı ve
          çözücü kütlesi), eksik olan üçüncüyü biz bulalım. Molarite'den
          farkı: burada çözelti hacmi değil, çözücünün kütlesi (kg) esas
          alınır.
        </p>

        <div className="engineering-targets">
          <span>Neyi hesaplamak istiyorsun?</span>
          <div className="engineering-target-grid">
            {(Object.keys(targetLabels) as MolalityTarget[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`engineering-target-button${target === key ? " is-active" : ""}`}
                onClick={() => setTarget(key)}
              >
                {targetLabels[key]}
              </button>
            ))}
          </div>
        </div>

        <div className="paint-calculator-grid">
          {target !== "molalite" && (
            <label className="category-general-converter-field">
              <span>Molalite (mol/kg)</span>
              <input
                inputMode="decimal"
                type="text"
                value={molaliteInput}
                onChange={(event) => setMolaliteInput(event.target.value)}
              />
            </label>
          )}

          {target !== "molSayisi" && (
            <>
              <label className="category-general-converter-field mol-mode-field">
                <span>Mol Sayısı Nasıl Girilecek?</span>
                <div className="engineering-target-grid hydrostatic-target-grid">
                  <button
                    type="button"
                    className={`engineering-target-button${molSayisiMode === "direct" ? " is-active" : ""}`}
                    onClick={() => setMolSayisiMode("direct")}
                  >
                    Doğrudan gir
                  </button>
                  <button
                    type="button"
                    className={`engineering-target-button${molSayisiMode === "mass" ? " is-active" : ""}`}
                    onClick={() => setMolSayisiMode("mass")}
                  >
                    Kütleden hesapla
                  </button>
                </div>
              </label>

              {molSayisiMode === "direct" ? (
                <label className="category-general-converter-field">
                  <span>Mol Sayısı</span>
                  <input
                    inputMode="decimal"
                    type="text"
                    value={molSayisiInput}
                    onChange={(event) => setMolSayisiInput(event.target.value)}
                  />
                </label>
              ) : (
                <>
                  <label className="category-general-converter-field">
                    <span>Çözünen madde veya element (opsiyonel)</span>
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
                      placeholder="Örn: NaCl, C6H12O6"
                      value={formulaInput}
                      onChange={(event) =>
                        handleFormulaChange(event.target.value)
                      }
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
                        : "Formül tanınamadı."}
                    </p>
                  )}

                  <label className="category-general-converter-field">
                    <span>Molar Kütle (g/mol)</span>
                    <input
                      inputMode="decimal"
                      type="text"
                      value={molarMassInput}
                      onChange={(event) => {
                        setMolarMassInput(event.target.value);
                        setSubstanceId("custom");
                        setFormulaInput("");
                      }}
                    />
                  </label>

                  <label className="category-general-converter-field">
                    <span>Çözünen Kütlesi (g)</span>
                    <input
                      inputMode="decimal"
                      type="text"
                      value={soluteMassInput}
                      onChange={(event) => setSoluteMassInput(event.target.value)}
                    />
                  </label>

                  <p className="mol-formula-hint">
                    ≈ {formatNumber(molSayisiFromMass)} mol
                  </p>
                </>
              )}
            </>
          )}

          {target !== "cozucuKutlesi" && (
            <>
              <label className="category-general-converter-field">
                <span>Çözücü Kütlesi</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={cozucuInput}
                  onChange={(event) => setCozucuInput(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>Birim</span>
                <select
                  value={cozucuUnit}
                  onChange={(event) => setCozucuUnit(event.target.value)}
                >
                  {massUnits.map((unit) => (
                    <option key={unit.symbol} value={unit.symbol}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}

          {target === "cozucuKutlesi" && (
            <label className="category-general-converter-field">
              <span>Sonuç Birimi</span>
              <select
                value={cozucuUnit}
                onChange={(event) => setCozucuUnit(event.target.value)}
              >
                {massUnits.map((unit) => (
                  <option key={unit.symbol} value={unit.symbol}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>Geçerli değerler girerek sonucu görebilirsin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Molalite</span>
              <strong>{formatNumber(result.molalite)} mol/kg</strong>
            </div>
            <div>
              <span>Mol Sayısı</span>
              <strong>{formatNumber(result.molSayisi)} mol</strong>
            </div>
            <div>
              <span>Çözücü Kütlesi</span>
              <strong>
                {formatNumber(cozucuInSelectedUnit(result.cozucuKutlesiKg))}{" "}
                {cozucuUnit}
              </strong>
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
