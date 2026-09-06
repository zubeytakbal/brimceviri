"use client";

import { MathfieldElement } from "mathlive";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { useRef } from "react";

// Türkiye'de ondalık ayırıcı virgüldür — MathLive'ın varsayılanı nokta,
// bunu değiştirmezsek kullanıcı "," tuşuna bastığında ondalık değil,
// farklı bir LaTeX yapısı ({,}) ekler ve çözücü bunu ayrıştıramaz.
MathfieldElement.decimalSeparator = ",";

// MathLive kendi konumuna göre font yolunu otomatik tahmin etmeye çalışır,
// ama Next.js/Turbopack'in bundle yapısında bu tahmin yanlış çıkıyor
// ("fonts could not be loaded from .../chunks/fonts" konsol hatası — gerçek
// bir kullanıcı raporuyla doğrulandı). Fontları public/mathlive-fonts'a
// kopyalayıp yolu burada açıkça belirtiyoruz.
MathfieldElement.fontsDirectory = "/mathlive-fonts";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace -- required for JSX.IntrinsicElements augmentation
  namespace JSX {
    interface IntrinsicElements {
      "math-field": DetailedHTMLProps<
        HTMLAttributes<MathfieldElement>,
        MathfieldElement
      >;
    }
  }
}

export const DEFAULT_VISUAL_LATEX = "2x+3=11";

const EXAMPLES = [
  { label: "2x+3=11", latex: "2x+3=11" },
  { label: "log₂(x)=5", latex: "\\log_{2}\\left(x\\right)=5" },
  {
    label: "log₂(x)+log₂(x+1)=3",
    latex: "\\log_{2}\\left(x\\right)+\\log_{2}\\left(x+1\\right)=3",
  },
  { label: "x²-4>0", latex: "x^{2}-4>0" },
  { label: "d/dx(x³+log₂x)", latex: "\\dfrac{\\mathrm{d}}{\\mathrm{d}x}x^{3}+\\log_{2}\\left(x\\right)" },
  { label: "∫₀⁵ x² dx", latex: "\\int_{0}^{5}x^{2}\\,\\mathrm{d}x" },
  { label: "lim x→0 sin(x)/x", latex: "\\lim_{x\\to0}\\frac{\\sin\\left(x\\right)}{x}" },
];

interface EquationVisualInputProps {
  onChange: (latex: string) => void;
  defaultLatex?: string;
}

export default function EquationVisualInput({
  onChange,
  defaultLatex = DEFAULT_VISUAL_LATEX,
}: EquationVisualInputProps) {
  const mathFieldRef = useRef<MathfieldElement>(null);

  function applyExample(exampleLatex: string) {
    if (mathFieldRef.current) {
      mathFieldRef.current.value = exampleLatex;
    }
    onChange(exampleLatex);
  }

  return (
    <div className="engineering-calculator-card">
      <p className="calculator-usage-hint">
        Nasıl çalışır: aşağıdaki alana gerçek matematik yazısı gibi
        dokun/tıkla veya klavyeyle yaz — üs, taban gibi kısımlar gerçek
        konumunda görünür. Dokunmatik matematik klavyesi otomatik açılır.
        Denklem (=) ya da eşitsizlik (&lt;, &gt;, ≤, ≥) yazabilirsin, ya da
        sadece bir ifade (örn. log(43)) yazıp direkt değerini
        görebilirsin. Hangi harfi bilinmeyen olarak kullandığını (x, y,
        t...) otomatik tanırız.
      </p>

      <div className="log-visual-mathfield-wrap">
        <math-field
          ref={mathFieldRef}
          className="log-visual-mathfield"
          onInput={(event) =>
            onChange((event.target as MathfieldElement).value)
          }
        >
          {defaultLatex}
        </math-field>
      </div>

      <div className="log-equation-examples">
        <span>Örnekler:</span>
        {EXAMPLES.map((example) => (
          <button
            key={example.label}
            type="button"
            className="log-equation-example-button"
            onClick={() => applyExample(example.latex)}
          >
            {example.label}
          </button>
        ))}
      </div>
    </div>
  );
}
