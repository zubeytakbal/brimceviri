"use client";

import { useState } from "react";
import CountdownTimer from "./CountdownTimer";

import { EGG_SIZES, EGG_STAGES } from "./eggTimes";

export default function GermanEggTimer() {
  const [stage, setStage] = useState<(typeof EGG_STAGES)[number]["id"]>("weich");
  const [size, setSize] = useState<(typeof EGG_SIZES)[number]["id"]>("M");
  const st = EGG_STAGES.find((s) => s.id === stage)!;
  const sz = EGG_SIZES.find((s) => s.id === size)!;
  const seconds = Math.round((st.minutes + sz.delta) * 60);

  return (
    <div className="date-calc">
      <div className="date-converter-modes is-light" role="radiogroup" aria-label="Garstufe">
        {EGG_STAGES.map((s) => (
          <button key={s.id} type="button" role="radio" aria-checked={stage === s.id} className={stage === s.id ? "is-active" : undefined} onClick={() => setStage(s.id)}>
            {s.label}
          </button>
        ))}
      </div>
      <div className="date-converter-modes is-light" role="radiogroup" aria-label="Eigröße">
        {EGG_SIZES.map((s) => (
          <button key={s.id} type="button" role="radio" aria-checked={size === s.id} className={size === s.id ? "is-active" : undefined} onClick={() => setSize(s.id)}>
            Größe {s.label}
          </button>
        ))}
      </div>
      <p className="date-calc-note">
        {st.label}, Größe {sz.label}: <strong>{(seconds / 60).toLocaleString("de-DE", { maximumFractionDigits: 1 })} Minuten</strong> – {st.text}.
      </p>
      <CountdownTimer key={seconds} locale="de" initialSeconds={seconds} />
    </div>
  );
}
