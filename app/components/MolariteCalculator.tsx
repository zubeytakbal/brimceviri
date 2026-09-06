"use client";

import { useMemo, useState } from "react";
import {
  commonCompounds,
  commonSubstances,
  elementSubstances,
} from "../converter/commonSubstances";
import { convert } from "../converter/convert";
import {
  calculateMolarite,
  type MolariteTarget,
} from "../converter/molariteCalculator";
import { parseMolecularFormula } from "../converter/molecularFormulaParser";

const volumeUnits = [
  { symbol: "mL", label: "mL" },
  { symbol: "L", label: "L" },
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

const targetLabels: Record<MolariteTarget, string> = {
  molarite: "Molarite (mol/L)",
  molSayisi: "Mol Sayısı",
  hacim: "Hacim",
};

export default function MolariteCalculator() {
  const [target, setTarget] = useState<MolariteTarget>("molarite");
  const [molariteInput, setMolariteInput] = useState("1");
  const [molSayisiInput, setMolSayisiInput] = useState("0.5");
  const [hacimInput, setHacimInput] = useState("500");
  const [volumeUnit, setVolumeUnit] = useState("mL");

  const [molSayisiMode, setMolSayisiMode] = useState<"direct" | "mass">(
    "direct"
  );
  const [substanceId, setSubstanceId] = useState("custom");
  const [formulaInput, setFormulaInput] = useState("");
  const [molarMassInput, setMolarMassInput] = useState("58.44");
  const [massInput, setMassInput] = useState("29.22");

  const hacimLitre = useMemo(() => {
    const value = parseNumericValue(hacimInput);

    if (!Number.isFinite(value)) {
      return Number.NaN;
    }

    return convert("hacim", value, volumeUnit, "L");
  }, [hacimInput, volumeUnit]);

  const formulaResult = useMemo(
    () => parseMolecularFormula(formulaInput),
    [formulaInput]
  );

  const molSayisiFromMass = useMemo(() => {
    const mass = parseNumericValue(massInput);
    const molarMass = parseNumericValue(molarMassInput);

    if (!Number.isFinite(mass) || !Number.isFinite(molarMass) || molarMass <= 0) {
      return Number.NaN;
    }

    return mass / molarMass;
  }, [massInput, molarMassInput]);

  const effectiveMolSayisi =
    molSayisiMode === "mass"
      ? molSayisiFromMass
      : parseNumericValue(molSayisiInput);

  const result = useMemo(
    () =>
      calculateMolarite({
        target,
        molarite: parseNumericValue(molariteInput),
        molSayisi: effectiveMolSayisi,
        hacimLitre,
      }),
    [target, molariteInput, effectiveMolSayisi, hacimLitre]
  );

  const resultHacimInSelectedUnit = useMemo(() => {
    if (!result) {
      return Number.NaN;
    }

    return convert("hacim", result.hacimLitre, "L", volumeUnit);
  }, [result, volumeUnit]);

  const steps = useMemo(() => {
    if (!result) {
      return null;
    }

    if (target === "molarite") {
      return [
        {
          title: "1. Adım — Molarite",
          lines: [
            "M = n / V",
            `M = ${formatNumber(result.molSayisi)} mol / ${formatNumber(result.hacimLitre)} L`,
            `M ≈ ${formatNumber(result.molarite)} mol/L`,
          ],
        },
      ];
    }

    if (target === "molSayisi") {
      return [
        {
          title: "1. Adım — Mol sayısı",
          lines: [
            "n = M × V",
            `n = ${formatNumber(result.molarite)} mol/L × ${formatNumber(result.hacimLitre)} L`,
            `n ≈ ${formatNumber(result.molSayisi)} mol`,
          ],
        },
      ];
    }

    return [
      {
        title: "1. Adım — Hacim",
        lines: [
          "V = n / M",
          `V = ${formatNumber(result.molSayisi)} mol / ${formatNumber(result.molarite)} mol/L`,
          `V ≈ ${formatNumber(result.hacimLitre)} L`,
        ],
      },
    ];
  }, [result, target]);

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

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: bildiğin iki değeri gir (mesela mol sayısı ve
          hacim), eksik olan üçüncüyü biz bulalım.
        </p>
        <div className="engineering-targets">
          <span>Neyi hesaplamak istiyorsun?</span>

          <div className="engineering-target-grid">
            {(Object.keys(targetLabels) as MolariteTarget[]).map((key) => (
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
          {target !== "molarite" && (
            <label className="category-general-converter-field">
              <span>Molarite (mol/L)</span>
              <input
                inputMode="decimal"
                type="text"
                value={molariteInput}
                onChange={(event) => setMolariteInput(event.target.value)}
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
                        : "Formül tanınamadı — element sembollerini büyük harfle başlat (örn. Na, Cl, O)."}
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
                    <span>Kütle (g)</span>
                    <input
                      inputMode="decimal"
                      type="text"
                      value={massInput}
                      onChange={(event) => setMassInput(event.target.value)}
                    />
                  </label>

                  <p className="mol-formula-hint">
                    ≈ {formatNumber(molSayisiFromMass)} mol
                  </p>
                </>
              )}
            </>
          )}

          {target !== "hacim" && (
            <>
              <label className="category-general-converter-field">
                <span>Hacim</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={hacimInput}
                  onChange={(event) => setHacimInput(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>Birim</span>
                <select
                  value={volumeUnit}
                  onChange={(event) => setVolumeUnit(event.target.value)}
                >
                  {volumeUnits.map((unit) => (
                    <option key={unit.symbol} value={unit.symbol}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}

          {target === "hacim" && (
            <label className="category-general-converter-field">
              <span>Sonuç Birimi</span>
              <select
                value={volumeUnit}
                onChange={(event) => setVolumeUnit(event.target.value)}
              >
                {volumeUnits.map((unit) => (
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
              <span>Molarite</span>
              <strong>{formatNumber(result.molarite)} mol/L</strong>
            </div>
            <div>
              <span>Mol Sayısı</span>
              <strong>{formatNumber(result.molSayisi)} mol</strong>
            </div>
            <div>
              <span>Hacim</span>
              <strong>
                {formatNumber(resultHacimInSelectedUnit)} {volumeUnit}
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
