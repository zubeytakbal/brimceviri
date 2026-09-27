"use client";

import { pad2 } from "./useNow";

// Buyuk rakamli saat/dakika secici (alarm ve zamanlayici).
export default function TimeStepper({
  label,
  value,
  onChange,
  max,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  max: number;
  step?: number;
}) {
  const wrap = (next: number) => ((next % max) + max) % max;
  return (
    <div className="sleep-stepper">
      <span className="sleep-stepper-label">{label}</span>
      <button type="button" aria-label={`${label} +`} onClick={() => onChange(wrap(value + step))}>
        ▲
      </button>
      <output className="sleep-stepper-value">{pad2(value)}</output>
      <button type="button" aria-label={`${label} −`} onClick={() => onChange(wrap(value - step))}>
        ▼
      </button>
    </div>
  );
}
