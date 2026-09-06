"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { solveLinearEquation } from "../converter/equationTemplates";
import { formatNumber } from "../converter/mathDisplay";
import QuadraticEquationCalculator from "./QuadraticEquationCalculator";

type Template = "dogrusal" | "ikinci-dereceden";

const templateLabels: Record<Template, string> = {
  dogrusal: "Doğrusal (ax + b = c)",
  "ikinci-dereceden": "İkinci Dereceden (ax² + bx + c = 0)",
};

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

export default function EquationTemplateCalculator() {
  const [template, setTemplate] = useState<Template>("dogrusal");
  const [aInput, setAInput] = useState("2");
  const [bInput, setBInput] = useState("3");
  const [cInput, setCInput] = useState("11");

  const a = useMemo(() => parseNumericValue(aInput), [aInput]);
  const b = useMemo(() => parseNumericValue(bInput), [bInput]);
  const c = useMemo(() => parseNumericValue(cInput), [cInput]);

  const linearOutcome = useMemo(() => solveLinearEquation(a, b, c), [a, b, c]);

  return (
    <>
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: hazır bir denklem kalıbı seç, katsayıları (a, b, c)
          sadece sayı olarak gir — özel bir yazım kuralı bilmene gerek yok.
        </p>

        <div className="engineering-targets">
          <span>Hangi kalıp?</span>
          <div className="engineering-target-grid">
            {(Object.keys(templateLabels) as Template[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`engineering-target-button${template === key ? " is-active" : ""}`}
                onClick={() => setTemplate(key)}
              >
                {templateLabels[key]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {template === "dogrusal" ? (
        <>
          <div className="engineering-calculator-card">
            <p className="calculator-usage-hint">
              ax + b = c denklemindeki a, b, c katsayılarını gir.
            </p>

            <div className="paint-calculator-grid">
              <label className="category-general-converter-field">
                <span>a</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={aInput}
                  onChange={(event) => setAInput(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>b</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={bInput}
                  onChange={(event) => setBInput(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>c</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={cInput}
                  onChange={(event) => setCInput(event.target.value)}
                />
              </label>
            </div>
          </div>

          <div
            aria-live="polite"
            className="category-general-converter-result paint-calculator-result"
          >
            {!linearOutcome.success ? (
              <strong>{linearOutcome.message}</strong>
            ) : (
              <div className="paint-calculator-result-grid">
                <div>
                  <span>x</span>
                  <strong>{formatNumber(linearOutcome.result.x)}</strong>
                </div>
              </div>
            )}
          </div>

          {linearOutcome.success && (
            <div className="calculator-steps">
              <h3>Adım Adım Çözüm</h3>
              {linearOutcome.result.steps.map((step) => (
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
          <QuadraticEquationCalculator />
          <p className="calculator-usage-hint">
            Delta&apos;nın anlamını ve kök durumlarını (iki farklı kök, çift
            kök, gerçek kök yok) daha ayrıntılı açıklamasıyla görmek
            istersen{" "}
            <Link href="/bilim-hesaplayicilari/matematik/ikinci-dereceden-denklem-cozme">
              İkinci Dereceden Denklem Çözme (Delta)
            </Link>{" "}
            sayfasına bakabilirsin.
          </p>
        </>
      )}
    </>
  );
}
