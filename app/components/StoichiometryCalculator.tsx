"use client";

import { useMemo, useState } from "react";
import {
  commonCompounds,
  commonSubstances,
  elementSubstances,
} from "../converter/commonSubstances";
import { convert } from "../converter/convert";
import {
  calculateEquationStoichiometry,
  type EquationCompoundInput,
} from "../converter/equationStoichiometryCalculator";
import { parseEquationString } from "../converter/equationStringParser";
import { parseMolecularFormula } from "../converter/molecularFormulaParser";
import { presetReactions } from "../converter/presetReactions";

type CompoundSide = "reactant" | "product";

type CompoundRow = {
  id: number;
  side: CompoundSide;
  coefficientInput: string;
  substanceId: string;
  formulaInput: string;
  molarMassInput: string;
};

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

let nextId = 100;

function createRow(
  side: CompoundSide,
  coefficient: string,
  molarMass: string
): CompoundRow {
  return {
    id: nextId++,
    side,
    coefficientInput: coefficient,
    substanceId: "custom",
    formulaInput: "",
    molarMassInput: molarMass,
  };
}

function compoundLabel(row: CompoundRow, index: number) {
  return row.side === "reactant" ? `Reaktan ${index + 1}` : `Ürün ${index + 1}`;
}

export default function StoichiometryCalculator() {
  const [rows, setRows] = useState<CompoundRow[]>([
    { id: 1, side: "reactant", coefficientInput: "2", substanceId: "h2o", formulaInput: "", molarMassInput: "18.02" },
    { id: 2, side: "product", coefficientInput: "2", substanceId: "custom", formulaInput: "H2", molarMassInput: "2.016" },
    { id: 3, side: "product", coefficientInput: "1", substanceId: "o2", formulaInput: "", molarMassInput: "32.00" },
  ]);
  const [knownId, setKnownId] = useState(1);
  const [equationTextInput, setEquationTextInput] = useState("");
  const [equationTextError, setEquationTextError] = useState("");
  const [inputMode, setInputMode] = useState<"mass" | "moles">("mass");
  const [knownMassInput, setKnownMassInput] = useState("36");
  const [knownMolesInput, setKnownMolesInput] = useState("2");
  const [massUnit, setMassUnit] = useState("g");

  const reactants = rows.filter((row) => row.side === "reactant");
  const products = rows.filter((row) => row.side === "product");

  function sideIndex(row: CompoundRow) {
    const sideRows = row.side === "reactant" ? reactants : products;
    return sideRows.findIndex((item) => item.id === row.id);
  }

  function updateRow(id: number, patch: Partial<CompoundRow>) {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, ...patch } : row))
    );
  }

  function applySubstance(id: number, substanceId: string) {
    const substance = commonSubstances.find((item) => item.id === substanceId);
    updateRow(id, {
      substanceId,
      formulaInput: "",
      ...(substance && substance.molarMass
        ? { molarMassInput: substance.molarMass }
        : {}),
    });
  }

  function handleFormulaChange(id: number, value: string) {
    const parsed = parseMolecularFormula(value);
    updateRow(id, {
      formulaInput: value,
      ...(parsed
        ? { substanceId: "custom", molarMassInput: parsed.molarMass.toFixed(3) }
        : {}),
    });
  }

  function addRow(side: CompoundSide) {
    setRows((prev) => [...prev, createRow(side, "1", "")]);
  }

  function removeRow(id: number) {
    setRows((prev) => {
      if (prev.length <= 2) {
        return prev;
      }
      const next = prev.filter((row) => row.id !== id);
      if (knownId === id && next.length > 0) {
        setKnownId(next[0].id);
      }
      return next;
    });
  }

  function applyPresetReaction(id: string) {
    const preset = presetReactions.find((reaction) => reaction.id === id);

    if (!preset) {
      return;
    }

    const newRows: CompoundRow[] = [
      ...preset.reactants.map((compound) => ({
        id: nextId++,
        side: "reactant" as CompoundSide,
        coefficientInput: compound.coefficient.toString(),
        substanceId: "custom",
        formulaInput: compound.formula,
        molarMassInput: compound.molarMass.toString(),
      })),
      ...preset.products.map((compound) => ({
        id: nextId++,
        side: "product" as CompoundSide,
        coefficientInput: compound.coefficient.toString(),
        substanceId: "custom",
        formulaInput: compound.formula,
        molarMassInput: compound.molarMass.toString(),
      })),
    ];

    setRows(newRows);
    setKnownId(newRows[0].id);
  }

  function applyEquationText() {
    const parsed = parseEquationString(equationTextInput);

    if (!parsed) {
      setEquationTextError(
        "Denklem tanınamadı. Örnek biçim: 2H2O -> 2H2 + O2 (ok için ->, → veya = kullanabilirsin)."
      );
      return;
    }

    const buildRows = (terms: typeof parsed.reactants, side: CompoundSide) =>
      terms.map((term) => {
        const formulaResult = parseMolecularFormula(term.formula);
        return {
          id: nextId++,
          side,
          coefficientInput: term.coefficient.toString(),
          substanceId: "custom",
          formulaInput: term.formula,
          molarMassInput: formulaResult ? formulaResult.molarMass.toFixed(3) : "",
        };
      });

    const newReactantRows = buildRows(parsed.reactants, "reactant");
    const newProductRows = buildRows(parsed.products, "product");
    const unresolvedFormula = [...newReactantRows, ...newProductRows].find(
      (row) => !row.molarMassInput
    );

    if (unresolvedFormula) {
      setEquationTextError(
        `"${unresolvedFormula.formulaInput}" formülü tanınamadı — element sembollerini büyük harfle başlat (örn. Na, Cl, O).`
      );
      return;
    }

    setEquationTextError("");
    const newRows = [...newReactantRows, ...newProductRows];
    setRows(newRows);
    setKnownId(newRows[0].id);
  }

  const knownRow = rows.find((row) => row.id === knownId);

  const knownMassGrams = useMemo(() => {
    const value = parseNumericValue(knownMassInput);
    if (!Number.isFinite(value)) {
      return Number.NaN;
    }
    return convert("kutle", value, massUnit, "g");
  }, [knownMassInput, massUnit]);

  const knownMoles = useMemo(() => {
    if (inputMode === "moles") {
      return parseNumericValue(knownMolesInput);
    }
    const knownMolarMass = knownRow
      ? parseNumericValue(knownRow.molarMassInput)
      : Number.NaN;
    if (!Number.isFinite(knownMolarMass) || knownMolarMass <= 0) {
      return Number.NaN;
    }
    return knownMassGrams / knownMolarMass;
  }, [inputMode, knownMolesInput, knownMassGrams, knownRow]);

  const equationCompounds: EquationCompoundInput[] = useMemo(
    () =>
      rows.map((row) => ({
        id: row.id,
        coefficient: parseNumericValue(row.coefficientInput),
        molarMass: parseNumericValue(row.molarMassInput),
      })),
    [rows]
  );

  const results = useMemo(
    () => calculateEquationStoichiometry(equationCompounds, knownId, knownMoles),
    [equationCompounds, knownId, knownMoles]
  );

  function resultFor(id: number) {
    return results?.find((item) => item.id === id) ?? null;
  }

  function massInSelectedUnit(gramValue: number) {
    return convert("kutle", gramValue, "g", massUnit);
  }

  function renderCompoundRow(row: CompoundRow, index: number) {
    const formulaResult = parseMolecularFormula(row.formulaInput);
    const isKnown = row.id === knownId;

    return (
      <div
        className={`equation-compound-row${isKnown ? " equation-compound-row-known" : ""}`}
        key={row.id}
      >
        <div className="equation-compound-header">
          <span>{compoundLabel(row, index)}</span>
          <label className="equation-known-radio">
            <input
              type="radio"
              name="known-compound"
              checked={isKnown}
              onChange={() => setKnownId(row.id)}
            />
            {isKnown ? "✓ Miktarını biliyorum (aşağıya gir)" : "Miktarını biliyorum"}
          </label>
          {rows.length > 2 && (
            <button
              type="button"
              className="atomic-mass-remove-button"
              onClick={() => removeRow(row.id)}
              aria-label={`${compoundLabel(row, index)} kaldır`}
            >
              ✕
            </button>
          )}
        </div>

        <div className="equation-compound-fields">
          <label className="category-general-converter-field">
            <span>Katsayı</span>
            <input
              inputMode="decimal"
              type="text"
              value={row.coefficientInput}
              onChange={(event) =>
                updateRow(row.id, { coefficientInput: event.target.value })
              }
            />
          </label>

          <label className="category-general-converter-field">
            <span>Madde / element</span>
            <select
              value={row.substanceId}
              onChange={(event) => applySubstance(row.id, event.target.value)}
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
            <span>Formül (opsiyonel)</span>
            <input
              type="text"
              placeholder="Örn: H2O, O2"
              value={row.formulaInput}
              onChange={(event) => handleFormulaChange(row.id, event.target.value)}
            />
          </label>

          <label className="category-general-converter-field">
            <span>Molar kütle (g/mol)</span>
            <input
              inputMode="decimal"
              type="text"
              value={row.molarMassInput}
              onChange={(event) =>
                updateRow(row.id, {
                  molarMassInput: event.target.value,
                  substanceId: "custom",
                  formulaInput: "",
                })
              }
            />
          </label>
        </div>

        {row.formulaInput.trim() && (
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

        {isKnown && (
          <div className="equation-known-quantity">
            <div className="engineering-target-grid hydrostatic-target-grid">
              <button
                type="button"
                className={`engineering-target-button${inputMode === "mass" ? " is-active" : ""}`}
                onClick={() => setInputMode("mass")}
              >
                Kütleden
              </button>
              <button
                type="button"
                className={`engineering-target-button${inputMode === "moles" ? " is-active" : ""}`}
                onClick={() => setInputMode("moles")}
              >
                Mol Sayısından
              </button>
            </div>

            <div className="equation-compound-fields">
              {inputMode === "mass" ? (
                <>
                  <label className="category-general-converter-field">
                    <span>Kütle</span>
                    <input
                      inputMode="decimal"
                      type="text"
                      value={knownMassInput}
                      onChange={(event) => setKnownMassInput(event.target.value)}
                    />
                  </label>
                  <label className="category-general-converter-field">
                    <span>Birim</span>
                    <select
                      value={massUnit}
                      onChange={(event) => setMassUnit(event.target.value)}
                    >
                      {massUnits.map((unit) => (
                        <option key={unit.symbol} value={unit.symbol}>
                          {unit.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </>
              ) : (
                <label className="category-general-converter-field">
                  <span>Mol Sayısı</span>
                  <input
                    inputMode="decimal"
                    type="text"
                    value={knownMolesInput}
                    onChange={(event) => setKnownMolesInput(event.target.value)}
                  />
                </label>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  const steps = useMemo(() => {
    if (!results || !knownRow) {
      return null;
    }

    const knownResult = resultFor(knownId);
    if (!knownResult) {
      return null;
    }

    const stepList: { title: string; lines: string[] }[] = [];

    if (inputMode === "mass") {
      stepList.push({
        title: "1. Adım — Bilinen maddenin mol sayısı",
        lines: [
          "n = m / M",
          `n = ${formatNumber(knownMassGrams)} g / ${formatNumber(parseNumericValue(knownRow.molarMassInput))} g/mol`,
          `n ≈ ${formatNumber(knownResult.moles)} mol`,
        ],
      });
    } else {
      stepList.push({
        title: "1. Adım — Bilinen maddenin mol sayısı",
        lines: ["Mol sayısı doğrudan verildi.", `n = ${formatNumber(knownResult.moles)} mol`],
      });
    }

    const otherRows = rows.filter((row) => row.id !== knownId);
    otherRows.forEach((row, index) => {
      const rowResult = resultFor(row.id);
      if (!rowResult) return;
      stepList.push({
        title: `${index + 2}. Adım — ${compoundLabel(row, sideIndex(row))} mol ve kütlesi`,
        lines: [
          "n(X) = n(bilinen) × (katsayı_X / katsayı_bilinen)",
          `n(X) = ${formatNumber(knownResult.moles)} × (${formatNumber(parseNumericValue(row.coefficientInput), 0)} / ${formatNumber(parseNumericValue(knownRow.coefficientInput), 0)}) ≈ ${formatNumber(rowResult.moles)} mol`,
          `m(X) = n × M = ${formatNumber(rowResult.moles)} × ${formatNumber(parseNumericValue(row.molarMassInput))} ≈ ${formatNumber(rowResult.massGrams)} g`,
        ],
      });
    });

    return stepList;
  }, [results, knownRow, knownId, inputMode, knownMassGrams, rows]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: hazır bir tepkime seç ya da kendi denklemini kur
          (reaktan ve ürün ekle/çıkar), hangi bileşiğin miktarını
          bildiğini işaretle ve değeri gir — diğer tüm bileşiklerin mol ve
          kütlesini aynı anda hesaplayalım.
        </p>

        <label className="category-general-converter-field">
          <span>Hazır tepkime seç (opsiyonel)</span>
          <select
            value=""
            onChange={(event) => {
              if (event.target.value) {
                applyPresetReaction(event.target.value);
              }
            }}
          >
            <option value="">Kendi denklemimi kuracağım</option>
            {presetReactions.map((reaction) => (
              <option key={reaction.id} value={reaction.id}>
                {reaction.label}
              </option>
            ))}
          </select>
        </label>

        <div className="equation-text-input-row">
          <label className="category-general-converter-field">
            <span>Ya da denklemi kendin yaz</span>
            <input
              type="text"
              placeholder="Örn: 2H2O -> 2H2 + O2"
              value={equationTextInput}
              onChange={(event) => {
                setEquationTextInput(event.target.value);
                setEquationTextError("");
              }}
            />
          </label>
          <button
            type="button"
            className="engineering-target-button"
            onClick={applyEquationText}
          >
            Denklemi Uygula
          </button>
        </div>

        {equationTextError && (
          <p className="mol-formula-hint mol-formula-hint-error">
            {equationTextError}
          </p>
        )}

        <div className="equation-builder">
          <div className="equation-side">
            <h3>Reaktanlar (Girenler)</h3>
            {reactants.map((row, index) => renderCompoundRow(row, index))}
            <button
              type="button"
              className="engineering-target-button atomic-mass-add-button"
              onClick={() => addRow("reactant")}
            >
              + Reaktan Ekle
            </button>
          </div>

          <div className="equation-arrow" aria-hidden="true">
            →
          </div>

          <div className="equation-side">
            <h3>Ürünler (Çıkanlar)</h3>
            {products.map((row, index) => renderCompoundRow(row, index))}
            <button
              type="button"
              className="engineering-target-button atomic-mass-add-button"
              onClick={() => addRow("product")}
            >
              + Ürün Ekle
            </button>
          </div>
        </div>

        <label className="category-general-converter-field equation-result-unit-field">
          <span>Sonuç kütle birimi (tüm bileşikler için)</span>
          <select
            value={massUnit}
            onChange={(event) => setMassUnit(event.target.value)}
          >
            {massUnits.map((unit) => (
              <option key={unit.symbol} value={unit.symbol}>
                {unit.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result"
      >
        {!results ? (
          <strong>Geçerli değerler girerek sonucu görebilirsin.</strong>
        ) : (
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Bileşik</th>
                  <th>Taraf</th>
                  <th>Katsayı</th>
                  <th>Mol</th>
                  <th>Kütle</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const rowResult = resultFor(row.id);
                  return (
                    <tr key={row.id}>
                      <td>
                        {compoundLabel(row, sideIndex(row))}
                        {row.id === knownId ? " (bilinen)" : ""}
                      </td>
                      <td>{row.side === "reactant" ? "Reaktan" : "Ürün"}</td>
                      <td>{row.coefficientInput}</td>
                      <td>{rowResult ? formatNumber(rowResult.moles) : "—"}</td>
                      <td>
                        {rowResult
                          ? `${formatNumber(massInSelectedUnit(rowResult.massGrams))} ${massUnit}`
                          : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
