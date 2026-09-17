"use client";

import { useMemo, useState } from "react";
import {
  calculatePeptideMolarMass,
  isPeptideCalculationError,
} from "../converter/peptideCalculator";

function formatNumber(value: number, maximumFractionDigits = 3): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

export default function PeptideMolarMassCalculator() {
  const [sequenceInput, setSequenceInput] = useState("Gly-Ala-Val");

  const result = useMemo(() => {
    const codes = sequenceInput.split(/[-\s,]+/).filter(Boolean);
    return calculatePeptideMolarMass(codes);
  }, [sequenceInput]);

  const hasError = isPeptideCalculationError(result);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: amino asitleri 3 harfli kodlarıyla (Gly, Ala, Val,
          Leu...) tire veya boşlukla ayırarak yaz, peptit zincirinin molar
          kütlesini anında hesapla (her peptit bağında 1 su molekülü kaybı
          hesaba katılır).
        </p>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Amino Asit Dizisi</span>
            <input
              type="text"
              value={sequenceInput}
              onChange={(event) => setSequenceInput(event.target.value)}
              placeholder="örn. Gly-Ala-Val"
            />
          </label>
        </div>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {hasError ? (
          <strong>
            {result.error === "empty" &&
              "Amino asit kodlarını yazarak hesaplamayı gör."}
            {result.error === "unknown-code" &&
              `"${result.unknownCode}" tanınan bir amino asit kodu değil. 3 harfli kodları kullan (Gly, Ala, Val...).`}
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Peptit Molar Kütlesi</span>
              <strong>{formatNumber(result.peptideMolarMass)} g/mol</strong>
            </div>
            <div>
              <span>Serbest Amino Asitler Toplamı</span>
              <strong>{formatNumber(result.sumOfFreeAminoAcids)} g/mol</strong>
            </div>
            <div>
              <span>Peptit Bağı Sayısı</span>
              <strong>{result.peptideBondCount}</strong>
            </div>
            <div>
              <span>Kaybedilen Su</span>
              <strong>{formatNumber(result.waterLost)} g/mol</strong>
            </div>
          </div>
        )}
      </div>

      {!hasError && (
        <div className="calculator-steps">
          <h3>Zincir</h3>
          <p className="calculator-step-line">
            {result.residues.map((r) => `${r.nameTr} (${r.code})`).join(" — ")}
          </p>
        </div>
      )}
    </div>
  );
}
