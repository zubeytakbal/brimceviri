"use client";

import { useMemo, useState } from "react";
import {
  calculateCombination,
  calculatePermutation,
  calculateProbability,
} from "../converter/combinatoricsCalculator";

type CalculatorMode = "permutasyon" | "kombinasyon" | "olasilik";

function parseIntegerValue(rawValue: string) {
  const normalizedValue = rawValue.trim();

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatBigInt(value: bigint) {
  return value.toLocaleString("tr-TR");
}

function formatNumber(value: number, maximumFractionDigits = 6) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

export default function CombinatoricsCalculator() {
  const [mode, setMode] = useState<CalculatorMode>("permutasyon");

  const [nInput, setNInput] = useState("6");
  const [rInput, setRInput] = useState("3");
  const n = useMemo(() => parseIntegerValue(nInput), [nInput]);
  const r = useMemo(() => parseIntegerValue(rInput), [rInput]);

  const permutationOutcome = useMemo(() => calculatePermutation(n, r), [n, r]);
  const combinationOutcome = useMemo(() => calculateCombination(n, r), [n, r]);

  const [favorableInput, setFavorableInput] = useState("1");
  const [totalInput, setTotalInput] = useState("6");
  const favorable = useMemo(() => parseIntegerValue(favorableInput), [favorableInput]);
  const total = useMemo(() => parseIntegerValue(totalInput), [totalInput]);
  const probabilityOutcome = useMemo(
    () => calculateProbability(favorable, total),
    [favorable, total]
  );

  const permutationSteps = useMemo(() => {
    if (!permutationOutcome.success) {
      return null;
    }
    const { n: pn, r: pr, value } = permutationOutcome.result;
    if (pr === 0) {
      return [
        {
          title: "1. Adım — Tanım gereği",
          lines: [`${pn}P0 = 1 (hiçbir eleman seçilmediğinde tek bir sıralama vardır)`],
        },
      ];
    }
    const chain = Array.from({ length: pr }, (_, index) => pn - index).join(" × ");
    return [
      {
        title: "1. Adım — nPr = n! / (n-r)!",
        lines: [`${pn}P${pr} = ${pn}! / (${pn}-${pr})! = ${chain} = ${formatBigInt(value)}`],
      },
    ];
  }, [permutationOutcome]);

  const combinationSteps = useMemo(() => {
    if (!combinationOutcome.success) {
      return null;
    }
    const { n: cn, r: cr, value } = combinationOutcome.result;
    return [
      {
        title: "1. Adım — nCr = n! / (r!(n-r)!)",
        lines: [`${cn}C${cr} = ${cn}! / (${cr}! × (${cn}-${cr})!) = ${formatBigInt(value)}`],
      },
    ];
  }, [combinationOutcome]);

  const probabilitySteps = useMemo(() => {
    if (!probabilityOutcome.success) {
      return null;
    }
    const { favorable: pf, total: pt, probability, percentage } =
      probabilityOutcome.result;
    return [
      {
        title: "1. Adım — Olasılık = İstenen durum / Toplam durum",
        lines: [
          `P = ${pf} / ${pt} = ${formatNumber(probability, 6)}`,
          `P = %${formatNumber(percentage, 4)}`,
        ],
      },
    ];
  }, [probabilityOutcome]);

  return (
    <div className="log-calculator-wrapper">
      <div className="log-mode-toggle">
        <button
          type="button"
          className={`log-mode-toggle-button${mode === "permutasyon" ? " is-active" : ""}`}
          onClick={() => setMode("permutasyon")}
        >
          Permütasyon
        </button>
        <button
          type="button"
          className={`log-mode-toggle-button${mode === "kombinasyon" ? " is-active" : ""}`}
          onClick={() => setMode("kombinasyon")}
        >
          Kombinasyon
        </button>
        <button
          type="button"
          className={`log-mode-toggle-button${mode === "olasilik" ? " is-active" : ""}`}
          onClick={() => setMode("olasilik")}
        >
          Olasılık
        </button>
      </div>

      <div className="category-general-converter">
        {mode === "olasilik" ? (
          <>
            <div className="engineering-calculator-card">
              <p className="calculator-usage-hint">
                Nasıl çalışır: istenen (uygun) durum sayısını ve toplam durum
                sayısını gir — klasik olasılık P = (istenen durum) / (toplam
                durum) formülüyle hesaplansın. Örneğin bir zarda tek sayı
                gelme olasılığı için istenen=3, toplam=6 gir.
              </p>

              <div className="paint-calculator-grid">
                <label className="category-general-converter-field">
                  <span>İstenen durum sayısı</span>
                  <input
                    inputMode="numeric"
                    type="text"
                    value={favorableInput}
                    onChange={(event) => setFavorableInput(event.target.value)}
                  />
                </label>
                <label className="category-general-converter-field">
                  <span>Toplam durum sayısı</span>
                  <input
                    inputMode="numeric"
                    type="text"
                    value={totalInput}
                    onChange={(event) => setTotalInput(event.target.value)}
                  />
                </label>
              </div>
            </div>

            <div
              aria-live="polite"
              className="category-general-converter-result paint-calculator-result"
            >
              {!probabilityOutcome.success ? (
                <strong>{probabilityOutcome.message}</strong>
              ) : (
                <div className="paint-calculator-result-grid">
                  <div>
                    <span>Olasılık (ondalık)</span>
                    <strong>{formatNumber(probabilityOutcome.result.probability)}</strong>
                  </div>
                  <div>
                    <span>Olasılık (yüzde)</span>
                    <strong>%{formatNumber(probabilityOutcome.result.percentage)}</strong>
                  </div>
                </div>
              )}
            </div>

            {probabilitySteps && (
              <div className="calculator-steps">
                <h3>Adım Adım Çözüm</h3>
                {probabilitySteps.map((step) => (
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
          </>
        ) : (
          <>
            <div className="engineering-calculator-card">
              <p className="calculator-usage-hint">
                {mode === "permutasyon"
                  ? "Nasıl çalışır: n elemanlı bir kümeden, sıralama önemli olacak şekilde r eleman seçmenin kaç farklı yolu olduğunu (nPr) hesaplar."
                  : "Nasıl çalışır: n elemanlı bir kümeden, sıralama önemli olmayacak şekilde r eleman seçmenin kaç farklı yolu olduğunu (nCr) hesaplar."}
              </p>

              <div className="paint-calculator-grid">
                <label className="category-general-converter-field">
                  <span>n (toplam eleman sayısı)</span>
                  <input
                    inputMode="numeric"
                    type="text"
                    value={nInput}
                    onChange={(event) => setNInput(event.target.value)}
                  />
                </label>
                <label className="category-general-converter-field">
                  <span>r (seçilecek eleman sayısı)</span>
                  <input
                    inputMode="numeric"
                    type="text"
                    value={rInput}
                    onChange={(event) => setRInput(event.target.value)}
                  />
                </label>
              </div>
            </div>

            <div
              aria-live="polite"
              className="category-general-converter-result paint-calculator-result"
            >
              {mode === "permutasyon" ? (
                !permutationOutcome.success ? (
                  <strong>{permutationOutcome.message}</strong>
                ) : (
                  <div className="paint-calculator-result-grid">
                    <div>
                      <span>
                        {permutationOutcome.result.n}P{permutationOutcome.result.r}
                      </span>
                      <strong>{formatBigInt(permutationOutcome.result.value)}</strong>
                    </div>
                  </div>
                )
              ) : !combinationOutcome.success ? (
                <strong>{combinationOutcome.message}</strong>
              ) : (
                <div className="paint-calculator-result-grid">
                  <div>
                    <span>
                      {combinationOutcome.result.n}C{combinationOutcome.result.r}
                    </span>
                    <strong>{formatBigInt(combinationOutcome.result.value)}</strong>
                  </div>
                </div>
              )}
            </div>

            {(mode === "permutasyon" ? permutationSteps : combinationSteps) && (
              <div className="calculator-steps">
                <h3>Adım Adım Çözüm</h3>
                {(mode === "permutasyon" ? permutationSteps : combinationSteps)!.map(
                  (step) => (
                    <div className="calculator-step" key={step.title}>
                      <p className="calculator-step-title">{step.title}</p>
                      {step.lines.map((line) => (
                        <p className="calculator-step-line" key={line}>
                          {line}
                        </p>
                      ))}
                    </div>
                  )
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
