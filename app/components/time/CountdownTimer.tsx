"use client";

// Zamanlayici: dolan halka, hazir sureler, +1 dk, tam ekran, bitince ses.
import { useEffect, useRef, useState } from "react";
import SoundPicker from "./SoundPicker";
import { playSound, startRinging, unlockAudio, type TimeSoundId } from "./timeSounds";
import { timeToolsCopy, type TimeToolsLocale } from "./timeToolsCopy";
import { formatDuration, nowMs, useNow } from "./useNow";
import { useWakeLock } from "./useWakeLock";

// Hizli secim dugmeleri (saniye).
const PREFS_KEY = "birimceviri:timer-prefs";
const THEMES = ["teal", "night", "sunset", "forest", "mono"] as const;
type TimerTheme = (typeof THEMES)[number];
type Prefs = { sound: TimeSoundId; volume: number; theme: TimerTheme };

function loadPrefs(): Prefs {
  const fallback: Prefs = { sound: "chime", volume: 0.8, theme: "teal" };
  try {
    const parsed = JSON.parse(window.localStorage.getItem(PREFS_KEY) ?? "{}") as Partial<Prefs>;
    return {
      sound: (["classic", "chime", "digital", "soft", "custom"] as TimeSoundId[]).includes(parsed.sound as TimeSoundId) ? (parsed.sound as TimeSoundId) : fallback.sound,
      volume: typeof parsed.volume === "number" ? Math.min(1, Math.max(0.1, parsed.volume)) : fallback.volume,
      theme: (THEMES as readonly string[]).includes(parsed.theme as string) ? (parsed.theme as TimerTheme) : fallback.theme,
    };
  } catch {
    return fallback;
  }
}

const PRESET_SECONDS = [30, 60, 120, 180, 300, 600, 900, 1200, 1500, 1800, 2700, 3600, 5400, 7200];

export default function CountdownTimer({
  locale,
  initialSeconds = 300,
  presetLinks,
}: {
  locale: TimeToolsLocale;
  initialSeconds?: number;
  presetLinks?: Record<number, string>;
}) {
  const copy = timeToolsCopy[locale];
  const [durationMs, setDurationMs] = useState(initialSeconds * 1000);
  const [remainingMs, setRemainingMs] = useState(initialSeconds * 1000);
  const [endAt, setEndAt] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [hours, setHours] = useState(Math.floor(initialSeconds / 3600));
  const [minutes, setMinutes] = useState(Math.floor((initialSeconds % 3600) / 60));
  const [seconds, setSeconds] = useState(initialSeconds % 60);
  const running = endAt !== null;
  const now = useNow(running);
  const stopRef = useRef<(() => void) | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>({ sound: "chime", volume: 0.8, theme: "teal" });
  const [prefsLoaded, setPrefsLoaded] = useState(false);
  const prefsRef = useRef(prefs);
  useEffect(() => {
    prefsRef.current = prefs;
  }, [prefs]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setPrefs(loadPrefs());
      setPrefsLoaded(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!prefsLoaded) return;
    try {
      window.localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    } catch {
      // Kayit yapilamazsa tercih yalnizca bu ziyarette gecerli.
    }
  }, [prefs, prefsLoaded]);
  const wakeLock = useWakeLock();

  const current = running && now ? Math.max(0, endAt - now.getTime()) : remainingMs;

  // Bitis anina zamanlanmis tek bir zamanlayici; arka plan sekmesinde gecikirse ilk firsatta calar.
  useEffect(() => {
    if (endAt === null) return;
    const id = window.setTimeout(() => {
      setEndAt(null);
      setRemainingMs(0);
      setFinished(true);
      stopRef.current = startRinging(prefsRef.current.sound, prefsRef.current.volume);
    }, Math.max(0, endAt - nowMs()));
    return () => window.clearTimeout(id);
  }, [endAt]);

  useEffect(() => () => stopRef.current?.(), []);

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    const original = document.title;
    return () => {
      document.title = original;
    };
  }, []);
  useEffect(() => {
    const base = document.title.replace(/^(⏳|⏰) [^|]*\| /, "");
    document.title = finished ? `⏰ ${copy.timer.done} | ${base}` : running ? `⏳ ${formatDuration(current)} | ${base}` : base;
  }, [current, running, finished, copy]);

  const setDuration = (totalSeconds: number) => {
    stopSound();
    const ms = Math.max(1, totalSeconds) * 1000;
    setDurationMs(ms);
    setRemainingMs(ms);
    setEndAt(null);
    setHours(Math.floor(totalSeconds / 3600));
    setMinutes(Math.floor((totalSeconds % 3600) / 60));
    setSeconds(totalSeconds % 60);
  };

  const stopSound = () => {
    stopRef.current?.();
    stopRef.current = null;
    setFinished(false);
  };

  const start = () => {
    unlockAudio();
    stopSound();
    const base = remainingMs > 0 ? remainingMs : durationMs;
    if (remainingMs <= 0) setRemainingMs(durationMs);
    setEndAt(nowMs() + base);
  };

  const pause = () => {
    setRemainingMs(current);
    setEndAt(null);
  };

  const reset = () => {
    stopSound();
    setEndAt(null);
    setRemainingMs(durationMs);
  };

  const addMinute = () => {
    if (running && endAt) setEndAt(endAt + 60000);
    else setRemainingMs((value) => value + 60000);
    setDurationMs((value) => value + 60000);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void panelRef.current?.requestFullscreen?.();
  };

  const progress = durationMs > 0 ? current / durationMs : 0;
  const radius = 92;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="time-tool category-general-converter">
      <div ref={panelRef} className={`time-timer-panel is-theme-${prefs.theme}${finished ? " is-finished" : ""}`}>
        <svg className="time-timer-ring" viewBox="0 0 220 220" role="img" aria-label={formatDuration(current)}>
          <defs>
            <linearGradient id="timer-ring-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#58c1c1" />
              <stop offset="100%" stopColor="#86c700" />
            </linearGradient>
          </defs>
          <circle cx="110" cy="110" r={radius} className="time-timer-track" />
          <circle
            cx="110"
            cy="110"
            r={radius}
            className="time-timer-progress"
            stroke="url(#timer-ring-gradient)"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            transform="rotate(-90 110 110)"
          />
        </svg>
        <div className="time-timer-readout">
          <strong aria-live="off">{finished ? copy.timer.done : formatDuration(current)}</strong>
          {running && endAt && (
            <span className="time-timer-ends">
              {copy.timer.endsAt}{" "}
              {new Intl.DateTimeFormat(copy.numberLocale, { hour: "2-digit", minute: "2-digit" }).format(new Date(endAt))}
            </span>
          )}
        </div>
        <div className="time-timer-controls">
          {finished ? (
            <button type="button" className="time-tool-button" onClick={stopSound}>
              {copy.timer.stop}
            </button>
          ) : running ? (
            <button type="button" className="time-tool-button" onClick={pause}>
              {copy.timer.pause}
            </button>
          ) : (
            <button type="button" className="time-tool-button" onClick={start}>
              {remainingMs < durationMs && remainingMs > 0 ? copy.timer.resume : copy.timer.start}
            </button>
          )}
          <button type="button" className="time-tool-button is-secondary" onClick={addMinute}>
            {copy.timer.addMinute}
          </button>
          <button type="button" className="time-tool-button is-secondary" onClick={reset}>
            {copy.timer.reset}
          </button>
          <button type="button" className="time-tool-button is-secondary" onClick={toggleFullscreen}>
            {isFullscreen ? copy.exitFullscreen : copy.fullscreen}
          </button>
        </div>
      </div>

      <div className="engineering-calculator-card">
        <p className="sleep-flow-title">{copy.timer.presets}</p>
        <div className="time-tool-chips">
          {PRESET_SECONDS.map((value) => {
            const href = presetLinks?.[value];
            const labelText =
              value < 60 || value === 90
                ? `${value} ${copy.timer.secondShort}`
                : value >= 7200 && value % 3600 === 0
                  ? `${value / 3600} ${copy.timer.hourShort}`
                  : `${value / 60} ${copy.timer.minuteShort}`;
            return href ? (
              <a key={value} href={href} onClick={(event) => { event.preventDefault(); setDuration(value); window.history.replaceState(null, "", href); }}>
                {labelText}
              </a>
            ) : (
              <button type="button" key={value} onClick={() => setDuration(value)}>
                {labelText}
              </button>
            );
          })}
        </div>
        <p className="sleep-flow-title">{copy.alarm.sound}</p>
        <div className="time-tool-options time-timer-sound">
          <label>
            <span>{copy.alarm.sound}</span>
            <SoundPicker value={prefs.sound} onChange={(sound) => setPrefs((p) => ({ ...p, sound }))} copy={copy} />
          </label>
          <label>
            <span>{copy.alarm.volume}</span>
            <input type="range" min={0.1} max={1} step={0.1} value={prefs.volume} onChange={(event) => setPrefs((p) => ({ ...p, volume: Number(event.target.value) }))} />
          </label>
          <button type="button" className="sleep-secondary-button is-compact" onClick={() => playSound(prefs.sound, prefs.volume)}>
            🔊 {copy.alarm.test}
          </button>
        </div>
        <div className="time-timer-themes" role="radiogroup" aria-label={copy.timer.theme}>
          {THEMES.map((theme) => (
            <button
              key={theme}
              type="button"
              role="radio"
              aria-checked={prefs.theme === theme}
              aria-label={copy.timer.themes[theme]}
              title={copy.timer.themes[theme]}
              className={`time-timer-theme is-theme-${theme}${prefs.theme === theme ? " is-active" : ""}`}
              onClick={() => setPrefs((p) => ({ ...p, theme }))}
            />
          ))}
        </div>
        <p className="sleep-flow-title">{copy.timer.custom}</p>
        <div className="time-timer-inputs">
          {[
            [copy.timer.hours, hours, setHours, 23],
            [copy.timer.minutes, minutes, setMinutes, 59],
            [copy.timer.seconds, seconds, setSeconds, 59],
          ].map(([labelText, value, setter, max]) => (
            <label key={labelText as string}>
              <span>{labelText as string}</span>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                max={max as number}
                value={value as number}
                onChange={(event) => (setter as (value: number) => void)(Math.max(0, Math.min(max as number, Number(event.target.value) || 0)))}
              />
            </label>
          ))}
          <button type="button" className="sleep-primary-button is-compact" onClick={() => setDuration(hours * 3600 + minutes * 60 + seconds)}>
            ✓
          </button>
        </div>
      </div>

      <div className="time-tool-footer">
        <button type="button" className="time-tool-button is-secondary" onClick={wakeLock.toggle} disabled={!wakeLock.supported}>
          {wakeLock.supported ? (wakeLock.enabled ? `☀ ${copy.wakeLock.on}` : `☀ ${copy.wakeLock.off}`) : copy.wakeLock.unsupported}
        </button>
        <p>{copy.wakeLock.hint}</p>
      </div>
    </div>
  );
}
