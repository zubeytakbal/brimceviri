"use client";

import dynamic from "next/dynamic";
import { useMemo, useRef, useState } from "react";
import { solveMathInput, solveMathInputFromLatex } from "../converter/logEquationSolver";
import EquationTemplateCalculator from "./EquationTemplateCalculator";
import MathSolveOutcomePanel from "./MathSolveOutcomePanel";

// Görsel editörün (MathLive tabanlı EquationVisualInput) varsayılan LaTeX
// içeriğiyle aynı ifade — burada düz metin olarak tutulur ki mathlive
// paketi (SSR ile uyumsuz, sadece istemcide çalışan bir özel eleman
// tanımlıyor) bu dosyaya statik olarak sızmasın; görsel mod sadece
// dynamic(..., { ssr: false }) ile aşağıda tembel yüklenir.
const DEFAULT_VISUAL_LATEX = "2x+3=11";

const EquationVisualInput = dynamic(() => import("./EquationVisualInput"), {
  loading: () => <p className="calculator-usage-hint">Yükleniyor…</p>,
  ssr: false,
});

async function recognizeEquationImage(file: File): Promise<string> {
  const Tesseract = (await import("tesseract.js")).default;
  const { data } = await Tesseract.recognize(file, "eng");
  return data.text;
}

function cleanOcrText(rawText: string) {
  return rawText.replace(/\s+/g, "").trim();
}

const EXAMPLE_EQUATIONS = [
  "2*x+3=11",
  "log(2*x+1,3)=4",
  "log(x,2)+log(x+1,2)=3",
  "x^2-4>0",
  "d(x^3+log(x),x)",
  "integral(x^2,x,0,5)",
  "lim(sin(x)/x,x,0)",
];

type InputMode = "yazi" | "gorsel" | "kalip";

export default function EquationSolverCalculator() {
  const [inputMode, setInputMode] = useState<InputMode>("yazi");
  const [equationInput, setEquationInput] = useState("2*x+3=11");
  const [visualLatexInput, setVisualLatexInput] = useState(DEFAULT_VISUAL_LATEX);
  const [ocrStatus, setOcrStatus] = useState<"idle" | "reading" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const outcome = useMemo(() => {
    if (inputMode === "kalip") {
      return null;
    }
    if (inputMode === "gorsel") {
      return visualLatexInput.trim() ? solveMathInputFromLatex(visualLatexInput) : null;
    }
    return equationInput.trim() ? solveMathInput(equationInput) : null;
  }, [inputMode, equationInput, visualLatexInput]);

  async function handlePhotoSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setOcrStatus("reading");
    try {
      const rawText = await recognizeEquationImage(file);
      const cleaned = cleanOcrText(rawText);
      if (cleaned) {
        setEquationInput(cleaned);
      }
      setOcrStatus("idle");
    } catch {
      setOcrStatus("error");
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  return (
    <div className="log-equation-panel">
      <div className="log-mode-toggle">
        <button
          type="button"
          className={`log-mode-toggle-button${inputMode === "yazi" ? " is-active" : ""}`}
          onClick={() => setInputMode("yazi")}
        >
          Yazıyla Gir
        </button>
        <button
          type="button"
          className={`log-mode-toggle-button${inputMode === "gorsel" ? " is-active" : ""}`}
          onClick={() => setInputMode("gorsel")}
        >
          Görsel Editör
        </button>
        <button
          type="button"
          className={`log-mode-toggle-button${inputMode === "kalip" ? " is-active" : ""}`}
          onClick={() => setInputMode("kalip")}
        >
          Hazır Kalıplar
        </button>
      </div>

      <div className="category-general-converter">
        {inputMode === "kalip" ? (
          <EquationTemplateCalculator />
        ) : inputMode === "gorsel" ? (
          <EquationVisualInput onChange={setVisualLatexInput} />
        ) : (
          <div className="engineering-calculator-card">
            <p className="calculator-usage-hint">
              Nasıl çalışır: bir bilinmeyen içeren bir denklem (=) ya da
              eşitsizlik (&lt;, &gt;, &lt;=, &gt;=) gir (x, y, t — hangi harfi
              kullandığını otomatik tanırız), veya &quot;=&quot; işareti olmadan düz bir
              ifade yaz (örn. log(43)) — direkt değerini hesaplayalım.
              Logaritma için log(x,2) yaz (taban belirtmezsen doğal logaritma —
              ln — varsayılır). Denklemler adım adım cebirsel çözülür (çözüm
              yoksa sayısal yöntemle); eşitsizlikler işaret analiziyle çözülür.
              Türev için d(ifade, değişken) — örn. d(x^2, x); belirli integral
              için integral(ifade, değişken, alt, üst) — örn. integral(x^2, x,
              0, 5); limit için lim(ifade, değişken, hedef) — örn.
              lim(sin(x)/x, x, 0), sonsuz hedef için Infinity/-Infinity yaz.
            </p>

            <div className="log-equation-ocr">
              <label className="log-equation-ocr-button">
                📷 Fotoğraftan Oku (deneysel)
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoSelected}
                  hidden
                />
              </label>
              {ocrStatus === "reading" && <span>Okunuyor…</span>}
              {ocrStatus === "error" && (
                <span>Fotoğraf okunamadı, elle yazmayı dene.</span>
              )}
            </div>

            <label className="category-general-converter-field log-equation-input">
              <span>Denklem veya Eşitsizlik</span>
              <input
                type="text"
                value={equationInput}
                onChange={(event) => setEquationInput(event.target.value)}
                placeholder="2*x+3=11"
              />
            </label>

            <div className="log-equation-examples">
              <span>Örnekler:</span>
              {EXAMPLE_EQUATIONS.map((example) => (
                <button
                  key={example}
                  type="button"
                  className="log-equation-example-button"
                  onClick={() => setEquationInput(example)}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}

        {inputMode !== "kalip" && (
          <MathSolveOutcomePanel outcome={outcome} emptyMessage="Çözülecek bir denklem yaz." />
        )}
      </div>
    </div>
  );
}
