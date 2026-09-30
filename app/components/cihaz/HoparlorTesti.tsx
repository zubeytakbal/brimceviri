"use client";

import { useEffect, useRef, useState } from "react";

type Kanal = "sol" | "sag" | "ikisi";

const FREKANSLAR = [50, 100, 440, 1000, 4000, 10000, 15000];

/** Hoparlör / kulaklık testi: sol-sağ kanal, stereo ve frekans. */
export default function HoparlorTesti() {
  const ctx = useRef<AudioContext | null>(null);
  const kaynak = useRef<{ stop: () => void } | null>(null);
  const [calan, setCalan] = useState<string>("");
  const [ses, setSes] = useState(0.3);

  const dur = () => {
    kaynak.current?.stop();
    kaynak.current = null;
    setCalan("");
  };
  useEffect(() => () => dur(), []);

  const ac = () => {
    ctx.current ??= new AudioContext();
    void ctx.current.resume();
    return ctx.current;
  };

  /** Kanalı sesli söyleyen yerine tanınır bir ton dizisi çalar. */
  const kanalCal = (k: Kanal) => {
    dur();
    const c = ac();
    const g = c.createGain();
    g.gain.value = ses;
    const p = c.createStereoPanner();
    p.pan.value = k === "sol" ? -1 : k === "sag" ? 1 : 0;
    g.connect(p).connect(c.destination);
    const osc: OscillatorNode[] = [];
    const t0 = c.currentTime;
    // üç kısa bip: kanal net anlaşılsın
    for (let i = 0; i < 3; i++) {
      const o = c.createOscillator();
      o.frequency.value = k === "sol" ? 523 : k === "sag" ? 784 : 659;
      const e = c.createGain();
      e.gain.setValueAtTime(0, t0 + i * 0.5);
      e.gain.linearRampToValueAtTime(1, t0 + i * 0.5 + 0.02);
      e.gain.setValueAtTime(1, t0 + i * 0.5 + 0.3);
      e.gain.linearRampToValueAtTime(0, t0 + i * 0.5 + 0.35);
      o.connect(e).connect(g);
      o.start(t0 + i * 0.5);
      o.stop(t0 + i * 0.5 + 0.4);
      osc.push(o);
    }
    setCalan(k);
    const z = setTimeout(() => setCalan(""), 1500);
    kaynak.current = {
      stop: () => {
        clearTimeout(z);
        osc.forEach((o) => {
          try {
            o.stop();
          } catch {
            /* zaten durdu */
          }
        });
      },
    };
  };

  const tonCal = (f: number) => {
    dur();
    const c = ac();
    const o = c.createOscillator();
    o.frequency.value = f;
    const g = c.createGain();
    g.gain.value = ses * (f >= 10000 ? 0.6 : 1);
    o.connect(g).connect(c.destination);
    o.start();
    setCalan(`${f}`);
    kaynak.current = { stop: () => o.stop() };
  };

  const tarama = () => {
    dur();
    const c = ac();
    const o = c.createOscillator();
    const g = c.createGain();
    g.gain.value = ses * 0.7;
    o.frequency.setValueAtTime(20, c.currentTime);
    o.frequency.exponentialRampToValueAtTime(20000, c.currentTime + 12);
    o.connect(g).connect(c.destination);
    o.start();
    o.stop(c.currentTime + 12);
    setCalan("tarama");
    const z = setTimeout(() => setCalan(""), 12000);
    kaynak.current = {
      stop: () => {
        clearTimeout(z);
        try {
          o.stop();
        } catch {
          /* */
        }
      },
    };
  };

  return (
    <div className="date-calc gorsel-arac">
      <p className="video-uyari">
        Başlamadan önce sesi kısın; özellikle kulaklıkla yüksek frekanslı tonlar
        rahatsız edici olabilir.
      </p>
      <label className="date-calc-field">
        <span>Ses düzeyi: %{Math.round(ses * 100)}</span>
        <span className="date-calc-field-row">
          <input
            type="range"
            min={0.05}
            max={1}
            step={0.05}
            value={ses}
            onChange={(e) => setSes(Number(e.target.value))}
          />
        </span>
      </label>
      <div className="hoparlor-kanallar">
        {(
          [
            ["sol", "◀ Sol"],
            ["ikisi", "Stereo (ikisi)"],
            ["sag", "Sağ ▶"],
          ] as const
        ).map(([k, ad]) => (
          <button
            key={k}
            type="button"
            className={`hoparlor-dugme${calan === k ? " is-calan" : ""}`}
            onClick={() => kanalCal(k)}
          >
            {ad}
          </button>
        ))}
      </div>
      <h3 className="eyp-baslik">Frekans testi</h3>
      <div className="ag-ornekler">
        {FREKANSLAR.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={calan === `${f}`}
            className={calan === `${f}` ? "is-active" : undefined}
            onClick={() => (calan === `${f}` ? dur() : tonCal(f))}
          >
            {f >= 1000 ? `${f / 1000} kHz` : `${f} Hz`}
          </button>
        ))}
        <button
          type="button"
          onClick={() => (calan === "tarama" ? dur() : tarama())}
        >
          {calan === "tarama"
            ? "Taramayı durdur"
            : "20 Hz → 20 kHz tarama (12 sn)"}
        </button>
        {calan ? (
          <button type="button" onClick={dur}>
            ⏹ Durdur
          </button>
        ) : null}
      </div>
      <p className="date-calc-note">
        Sol düğmede ses yalnızca sol hoparlörden/kulaktan, sağ düğmede yalnızca
        sağdan gelmelidir. Sesler cihazınızda üretilir; internet gerekmez.
      </p>
    </div>
  );
}
