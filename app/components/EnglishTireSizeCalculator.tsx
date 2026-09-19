"use client";

import { useMemo, useState } from "react";
import { calculateSpeedometerDeviation, type TireSizeInput } from "../converter/tireSizeCalculator";

function number(value: string) {
  const parsed = Number(value.trim().replace(/,/g, "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function format(value: number, digits = 1) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
}

function TireFields({ legend, values, set }: { legend: string; values: { width: string; aspect: string; rim: string }; set: (key: "width" | "aspect" | "rim") => (value: string) => void }) {
  return <fieldset className="tire-size-fieldset"><legend>{legend}</legend><div className="paint-calculator-grid"><label className="category-general-converter-field"><span>Section width (mm)</span><input inputMode="decimal" type="text" value={values.width} onChange={(event) => set("width")(event.target.value)} /></label><label className="category-general-converter-field"><span>Aspect ratio (%)</span><input inputMode="decimal" type="text" value={values.aspect} onChange={(event) => set("aspect")(event.target.value)} /></label><label className="category-general-converter-field"><span>Rim diameter (in)</span><input inputMode="decimal" type="text" value={values.rim} onChange={(event) => set("rim")(event.target.value)} /></label></div></fieldset>;
}

export default function EnglishTireSizeCalculator() {
  const [originalValues, setOriginalValues] = useState({ width: "205", aspect: "55", rim: "16" });
  const [replacementValues, setReplacementValues] = useState({ width: "215", aspect: "55", rim: "17" });
  const setOriginal = (key: keyof typeof originalValues) => (value: string) => setOriginalValues((current) => ({ ...current, [key]: value }));
  const setReplacement = (key: keyof typeof replacementValues) => (value: string) => setReplacementValues((current) => ({ ...current, [key]: value }));
  const toInput = (values: typeof originalValues): TireSizeInput => ({ widthMm: number(values.width), aspectRatioPercent: number(values.aspect), rimDiameterInch: number(values.rim) });
  const result = useMemo(() => calculateSpeedometerDeviation(toInput(originalValues), toInput(replacementValues)), [originalValues, replacementValues]);

  return <div className="category-general-converter"><p className="calculator-usage-hint">Enter sizes such as 205/55 R16 as width 205, aspect 55 and rim 16. This compares rolling dimensions only.</p><TireFields legend="Original tire size" values={originalValues} set={setOriginal} /><TireFields legend="Replacement tire size" values={replacementValues} set={setReplacement} /><div aria-live="polite" className="category-general-converter-result paint-calculator-result">{!result ? <strong>Enter valid positive width, aspect-ratio and rim-diameter values for both tires.</strong> : <><div className="paint-calculator-result-grid"><div><span>Original outer diameter</span><strong>{format(result.original.outerDiameterMm)} mm / {format(result.original.outerDiameterInch)} in</strong></div><div><span>Replacement outer diameter</span><strong>{format(result.replacement.outerDiameterMm)} mm / {format(result.replacement.outerDiameterInch)} in</strong></div><div><span>Original circumference</span><strong>{format(result.original.circumferenceMm)} mm</strong></div><div><span>Replacement circumference</span><strong>{format(result.replacement.circumferenceMm)} mm</strong></div><div><span>Original revolutions per km</span><strong>{format(result.original.revolutionsPerKm, 0)}</strong></div><div><span>Replacement revolutions per km</span><strong>{format(result.replacement.revolutionsPerKm, 0)}</strong></div></div><p className="category-general-converter-equality">Circumference difference: <strong>{result.deviationPercent >= 0 ? "+" : ""}{format(result.deviationPercent, 2)}%</strong>. At an indicated 100 km/h, the estimated actual speed is <strong>{format(result.actualSpeedAt100)} km/h</strong>; at an indicated 60 mph, it is <strong>{format(60 * (1 + result.deviationPercent / 100))} mph</strong>.</p></>}</div><p className="calculator-usage-hint"><strong>Safety:</strong> Do not use this comparison as fitment approval. Confirm the vehicle maker&apos;s approved size, load index, speed rating, wheel clearance and cold tire pressure before changing tires.</p></div>;
}
