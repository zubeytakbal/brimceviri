"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { timeToolsCopy } from "./timeToolsCopy";
import { intervalCopy, intervalPresets, type FocusLang } from "./focusCopy";
import { beep, unlockAudio } from "./timeSounds";
import { formatDuration, nowMs, useNow } from "./useNow";
import { useWakeLock } from "./useWakeLock";

// Aralikli antrenman (Tabata / HIIT / EMOM): hazirlan -> calis -> dinlen dongusu.
// Faz sinirlari gercek saate kilitli zamanlayicilarla tetiklenir; son 3 saniyede bip,
// faz basinda istege bagli sesli komut.

type PhaseKind = "prepare" | "work" | "rest";
type Phase = { kind: PhaseKind; seconds: number; round: number };
type Plan = { prepare: number; work: number; rest: number; rounds: number };

const STORAGE_KEY = "birimceviri:interval";

function buildPhases(plan: Plan): Phase[] {
  const phases: Phase[] = [];
  if (plan.prepare > 0) phases.push({ kind: "prepare", seconds: plan.prepare, round: 1 });
  for (let round = 1; round <= plan.rounds; round += 1) {
    phases.push({ kind: "work", seconds: plan.work, round });
    if (plan.rest > 0 && round < plan.rounds) phases.push({ kind: "rest", seconds: plan.rest, round });
  }
  return phases;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value) || 0));

export default function IntervalTimer({ lang, initialPreset = "tabata" }: { lang: FocusLang; initialPreset?: string }) {
  const copy = intervalCopy[lang];
  const wakeLock = useWakeLock();
  const startPreset = intervalPresets.find((p) => p.id === initialPreset) ?? intervalPresets[0];
  const [plan, setPlan] = useState<Plan>({ prepare: startPreset.prepare, work: startPreset.work, rest: startPreset.rest, rounds: startPreset.rounds });
  const [presetId, setPresetId] = useState(startPreset.id);
  const [voice, setVoice] = useState(true);
  const [beeps, setBeeps] = useState(true);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [phaseEndAt, setPhaseEndAt] = useState<number | null>(null);
  const [phaseRemaining, setPhaseRemaining] = useState(startPreset.prepare * 1000 || startPreset.work * 1000);
  const [finished, setFinished] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const running = phaseEndAt !== null;
  const now = useNow(running);
  const phases = useMemo(() => buildPhases(plan), [plan]);
  const phase = phases[Math.min(phaseIndex, phases.length - 1)];
  const settingsRef = useRef({ voice, beeps, lang });
  useEffect(() => {
    settingsRef.current = { voice, beeps, lang };
  }, [voice, beeps, lang]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}") as { voice?: boolean; beeps?: boolean };
        if (typeof saved.voice === "boolean") setVoice(saved.voice);
        if (typeof saved.beeps === "boolean") setBeeps(saved.beeps);
      } catch {
        // Varsayilanlar kullanilir.
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ voice, beeps }));
    } catch {
      // Kaydedilemezse yalnizca bu ziyarette gecerli.
    }
  }, [voice, beeps]);

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const speak = (text: string) => {
    if (!settingsRef.current.voice || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = settingsRef.current.lang === "tr" ? "tr-TR" : settingsRef.current.lang === "de" ? "de-DE" : "en-US";
      window.speechSynthesis.speak(utterance);
    } catch {
      // Konusma desteklenmiyorsa yalnizca bip calar.
    }
  };

  // Faz zamanlayicilari: son 3 saniye bip + faz sonunda gecis.
  useEffect(() => {
    if (phaseEndAt === null) return;
    const timers: number[] = [];
    const left = phaseEndAt - nowMs();
    if (settingsRef.current.beeps) {
      for (const s of [3, 2, 1]) {
        const at = left - s * 1000;
        if (at > 0) timers.push(window.setTimeout(() => beep(660, 0.1), at));
      }
    }
    timers.push(
      window.setTimeout(() => {
        const next = phaseIndex + 1;
        if (next >= phases.length) {
          beep(1046, 0.5);
          window.setTimeout(() => beep(1318, 0.6), 250);
          speak(copy.finished.replace(/ 💪$/, ""));
          setPhaseEndAt(null);
          setPhaseRemaining(0);
          setFinished(true);
          return;
        }
        const nextPhase = phases[next];
        beep(nextPhase.kind === "work" ? 1046 : 520, 0.35);
        speak(copy.phases[nextPhase.kind]);
        setPhaseIndex(next);
        setPhaseEndAt(phaseEndAt + nextPhase.seconds * 1000);
      }, Math.max(0, left))
    );
    return () => timers.forEach((id) => window.clearTimeout(id));
    // speak/copy degisimi zamanlamayi yeniden kurmayi gerektirmez.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phaseEndAt, phaseIndex, phases]);

  const reset = (nextPlan = plan) => {
    setPhaseEndAt(null);
    setPhaseIndex(0);
    setFinished(false);
    const first = buildPhases(nextPlan)[0];
    setPhaseRemaining(first ? first.seconds * 1000 : 0);
  };

  const start = () => {
    unlockAudio();
    if (finished) {
      reset();
      const first = phases[0];
      speak(copy.phases[first.kind]);
      setPhaseEndAt(nowMs() + first.seconds * 1000);
      return;
    }
    if (phaseRemaining === phase.seconds * 1000 && phaseIndex === 0) speak(copy.phases[phase.kind]);
    setPhaseEndAt(nowMs() + phaseRemaining);
  };

  const pause = () => {
    if (phaseEndAt === null) return;
    setPhaseRemaining(Math.max(0, phaseEndAt - nowMs()));
    setPhaseEndAt(null);
  };

  const skip = () => {
    const next = phaseIndex + 1;
    if (next >= phases.length) return;
    setPhaseIndex(next);
    if (running) setPhaseEndAt(nowMs() + phases[next].seconds * 1000);
    else setPhaseRemaining(phases[next].seconds * 1000);
  };

  const applyPreset = (id: string) => {
    const preset = intervalPresets.find((p) => p.id === id);
    if (!preset) return;
    const next = { prepare: preset.prepare, work: preset.work, rest: preset.rest, rounds: preset.rounds };
    setPresetId(id);
    setPlan(next);
    reset(next);
  };

  const updatePlan = (patch: Partial<Plan>) => {
    const next = { ...plan, ...patch };
    setPresetId("custom");
    setPlan(next);
    reset(next);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void panelRef.current?.requestFullscreen?.();
  };

  const phaseLeft = running && now ? Math.max(0, phaseEndAt - now.getTime()) : phaseRemaining;
  const totalMs = phases.reduce((sum, p) => sum + p.seconds * 1000, 0);
  const doneMs = phases.slice(0, phaseIndex).reduce((sum, p) => sum + p.seconds * 1000, 0) + (phase ? phase.seconds * 1000 - phaseLeft : 0);
  const workoutLeft = finished ? 0 : Math.max(0, totalMs - doneMs);
  const kind = finished ? "done" : phase?.kind ?? "work";

  return (
    <div className="time-tool category-general-converter interval">
      <div ref={panelRef} className={`interval-panel is-${kind}`}>
        <p className="interval-phase">{finished ? copy.finished : copy.phases[phase.kind]}</p>
        <strong className="interval-clock" aria-live="off">
          {finished ? "00:00" : formatDuration(Math.ceil(phaseLeft / 1000) * 1000)}
        </strong>
        <div className="interval-meta">
          <span>
            {copy.round} {finished ? plan.rounds : phase.round}/{plan.rounds}
          </span>
          <span>
            {copy.remaining} {formatDuration(Math.ceil(workoutLeft / 1000) * 1000)}
          </span>
        </div>
        <div className="interval-bar" aria-hidden="true">
          <span style={{ width: `${totalMs ? Math.min(100, (doneMs / totalMs) * 100) : 0}%` }} />
        </div>
        <div className="time-timer-controls">
          {running ? (
            <button type="button" className="time-tool-button" onClick={pause}>
              {copy.pause}
            </button>
          ) : (
            <button type="button" className="time-tool-button" onClick={start}>
              {finished || (phaseIndex === 0 && phaseRemaining === phases[0]?.seconds * 1000) ? copy.start : copy.resume}
            </button>
          )}
          <button type="button" className="time-tool-button is-secondary" onClick={skip} disabled={finished}>
            {copy.skip} ⏭
          </button>
          <button type="button" className="time-tool-button is-secondary" onClick={() => reset()}>
            {copy.reset}
          </button>
          <button type="button" className="time-tool-button is-secondary" onClick={toggleFullscreen}>
            {isFullscreen ? copy.exitFullscreen : copy.fullscreen}
          </button>
        </div>
      </div>

      <div className="engineering-calculator-card">
        <p className="sleep-flow-title">{copy.presets}</p>
        <div className="time-tool-chips">
          {intervalPresets.map((preset) => (
            <button key={preset.id} type="button" className={presetId === preset.id ? "is-active" : undefined} onClick={() => applyPreset(preset.id)}>
              {lang === "tr" ? preset.tr : lang === "de" ? preset.de : preset.en}
            </button>
          ))}
        </div>
        <p className="sleep-flow-title">{copy.custom}</p>
        <div className="time-tool-options interval-grid">
          {(
            [
              ["prepare", copy.prepareSec, 0, 120],
              ["work", copy.workSec, 5, 600],
              ["rest", copy.restSec, 0, 600],
              ["rounds", copy.rounds, 1, 50],
            ] as const
          ).map(([key, text, min, max]) => (
            <label key={key}>
              <span>{text}</span>
              <input type="number" min={min} max={max} value={plan[key]} onChange={(event) => updatePlan({ [key]: clamp(Number(event.target.value), min, max) })} />
            </label>
          ))}
        </div>
        <p className="live-clock-sound-hint">
          {copy.total}: <strong>{formatDuration(totalMs)}</strong>
        </p>
        <div className="live-clock-toggles">
          <label className={`live-clock-toggle${voice ? " is-on" : ""}`}>
            <input type="checkbox" checked={voice} onChange={(event) => setVoice(event.target.checked)} />
            <span>🗣 {copy.voice}</span>
          </label>
          <label className={`live-clock-toggle${beeps ? " is-on" : ""}`}>
            <input type="checkbox" checked={beeps} onChange={(event) => setBeeps(event.target.checked)} />
            <span>🔔 {copy.beeps}</span>
          </label>
        </div>
      </div>

      <div className="time-tool-footer">
        <button type="button" className="time-tool-button is-secondary" onClick={wakeLock.toggle} disabled={!wakeLock.supported}>
          {wakeLock.supported ? `☀ ${wakeLock.enabled ? timeToolsCopy[lang].wakeLock.on : timeToolsCopy[lang].wakeLock.off}` : ""}
        </button>
      </div>
    </div>
  );
}
