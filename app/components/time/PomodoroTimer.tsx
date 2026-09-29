"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { pomodoroCopy, type FocusLang } from "./focusCopy";
import SoundPicker from "./SoundPicker";
import { startRinging, unlockAudio, type TimeSoundId } from "./timeSounds";
import { timeToolsCopy } from "./timeToolsCopy";
import { formatDuration, nowMs, useNow } from "./useNow";
import { useWakeLock } from "./useWakeLock";

// Pomodoro: odak / kisa mola / uzun mola donguleri. Sure gercek saate gore tutulur,
// tur bitince ses + (izin varsa) bildirim; gunun tamamlanan turlari cihazda saklanir.

type Mode = "work" | "short" | "long";
type Settings = { work: number; short: number; long: number; longEvery: number; autoStart: boolean; notify: boolean; sound: TimeSoundId; volume: number };
type LogItem = { task: string; minutes: number; at: number };

const SETTINGS_KEY = "birimceviri:pomodoro";
const LOG_KEY = "birimceviri:pomodoro-log";
const DEFAULTS: Settings = { work: 25, short: 5, long: 15, longEvery: 4, autoStart: false, notify: false, sound: "chime", volume: 0.8 };

const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

function clampMinutes(value: number, max: number) {
  return Math.min(max, Math.max(1, Math.round(value) || 1));
}

export default function PomodoroTimer({ lang }: { lang: FocusLang }) {
  const copy = pomodoroCopy[lang];
  const baseCopy = timeToolsCopy[lang];
  const wakeLock = useWakeLock();
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [loaded, setLoaded] = useState(false);
  const [mode, setMode] = useState<Mode>("work");
  const [endAt, setEndAt] = useState<number | null>(null);
  const [remainingMs, setRemainingMs] = useState(DEFAULTS.work * 60000);
  const [completed, setCompleted] = useState(0);
  const [task, setTask] = useState("");
  const [log, setLog] = useState<LogItem[]>([]);
  const [notice, setNotice] = useState("");
  const running = endAt !== null;
  const now = useNow(running);
  const state = useRef({ settings, mode, completed, task });
  useEffect(() => {
    state.current = { settings, mode, completed, task };
  }, [settings, mode, completed, task]);

  const durationOf = useCallback((m: Mode, s: Settings) => (m === "work" ? s.work : m === "short" ? s.short : s.long) * 60000, []);
  const current = running && now ? Math.max(0, endAt - now.getTime()) : remainingMs;
  const total = durationOf(mode, settings);

  // Ayarlar ve gunun kaydi: ilk karede yukle.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const saved = JSON.parse(window.localStorage.getItem(SETTINGS_KEY) ?? "{}") as Partial<Settings>;
        const merged = { ...DEFAULTS, ...saved };
        setSettings(merged);
        setRemainingMs(merged.work * 60000);
        const savedLog = JSON.parse(window.localStorage.getItem(LOG_KEY) ?? "{}") as { date?: string; items?: LogItem[] };
        if (savedLog.date === todayKey() && Array.isArray(savedLog.items)) setLog(savedLog.items);
      } catch {
        // Kayit okunamazsa varsayilanlar kullanilir.
      }
      setLoaded(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      window.localStorage.setItem(LOG_KEY, JSON.stringify({ date: todayKey(), items: log }));
    } catch {
      // Gizli sekme: yalnizca bu ziyarette gecerli.
    }
  }, [settings, log, loaded]);

  const goTo = useCallback(
    (next: Mode, autoStart: boolean) => {
      const ms = durationOf(next, state.current.settings);
      setMode(next);
      setRemainingMs(ms);
      setEndAt(autoStart ? nowMs() + ms : null);
    },
    [durationOf]
  );

  const nextMode = useCallback((finishedWork: boolean) => {
    const { mode: m, completed: c, settings: s } = state.current;
    if (m !== "work") return "work" as Mode;
    const count = finishedWork ? c + 1 : c;
    return count > 0 && count % s.longEvery === 0 ? ("long" as Mode) : ("short" as Mode);
  }, []);

  // Tur bitisi: bitis anina kurulmus tek zamanlayici.
  useEffect(() => {
    if (endAt === null) return;
    const id = window.setTimeout(() => {
      const { settings: s, mode: m, task: t } = state.current;
      const stop = startRinging(s.sound, s.volume);
      window.setTimeout(stop, 4000);
      setNotice(copy.done[m]);
      if (s.notify && typeof Notification !== "undefined" && Notification.permission === "granted") {
        try {
          new Notification(copy.done[m], { body: t || copy.modes[m], tag: "pomodoro" });
        } catch {
          // Bazi mobil tarayicilar sayfa icinden bildirim acmaya izin vermez.
        }
      }
      if (m === "work") {
        setLog((items) => [...items, { task: t.trim(), minutes: s.work, at: Date.now() }]);
        setCompleted((c) => c + 1);
      }
      goTo(nextMode(m === "work"), s.autoStart);
    }, Math.max(0, endAt - nowMs()));
    return () => window.clearTimeout(id);
  }, [endAt, copy, goTo, nextMode]);

  // Sekme basligi.
  useEffect(() => {
    const original = document.title;
    return () => {
      document.title = original;
    };
  }, []);
  useEffect(() => {
    const base = document.title.replace(/^🍅 [^|]*\| /, "");
    document.title = running ? `🍅 ${formatDuration(current)} · ${copy.modes[mode]} | ${base}` : base;
  }, [current, running, mode, copy]);

  const start = () => {
    unlockAudio();
    setNotice("");
    setEndAt(nowMs() + (remainingMs > 0 ? remainingMs : total));
  };
  const pause = () => {
    setRemainingMs(current);
    setEndAt(null);
  };
  const toggle = useCallback(() => {
    if (endAt !== null) {
      setRemainingMs(Math.max(0, endAt - nowMs()));
      setEndAt(null);
    } else {
      unlockAudio();
      setNotice("");
      setEndAt(nowMs() + (remainingMs > 0 ? remainingMs : durationOf(state.current.mode, state.current.settings)));
    }
  }, [endAt, remainingMs, durationOf]);

  // Bosluk tusu: baslat / duraklat (yazi alanlari haric).
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (event.code !== "Space" || target?.closest("input, textarea, select, button")) return;
      event.preventDefault();
      toggle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  const updateSettings = (patch: Partial<Settings>) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    if (!running && ("work" in patch || "short" in patch || "long" in patch)) setRemainingMs(durationOf(mode, next));
  };

  const toggleNotify = async (enabled: boolean) => {
    if (!enabled) return updateSettings({ notify: false });
    if (typeof Notification === "undefined") return setNotice(copy.notifyDenied);
    const permission = Notification.permission === "default" ? await Notification.requestPermission() : Notification.permission;
    if (permission === "granted") updateSettings({ notify: true });
    else setNotice(copy.notifyDenied);
  };

  const radius = 92;
  const circumference = 2 * Math.PI * radius;
  const progress = total > 0 ? current / total : 0;
  const focusMinutes = log.reduce((sum, item) => sum + item.minutes, 0);
  const locale = lang === "tr" ? "tr-TR" : lang === "de" ? "de-DE" : "en-US";

  return (
    <div className="time-tool category-general-converter pomodoro">
      <div className={`time-timer-panel pomodoro-panel is-${mode}`}>
        <div className="pomodoro-modes" role="tablist">
          {(["work", "short", "long"] as Mode[]).map((m) => (
            <button key={m} type="button" role="tab" aria-selected={mode === m} className={mode === m ? "is-active" : undefined} onClick={() => goTo(m, false)}>
              {copy.modes[m]}
            </button>
          ))}
        </div>
        <svg className="time-timer-ring" viewBox="0 0 220 220" role="img" aria-label={formatDuration(current)}>
          <circle cx="110" cy="110" r={radius} className="time-timer-track" />
          <circle
            cx="110"
            cy="110"
            r={radius}
            className="pomodoro-progress"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            transform="rotate(-90 110 110)"
          />
        </svg>
        <div className="time-timer-readout">
          <strong aria-live="off">{formatDuration(current)}</strong>
          <span className="time-timer-ends">
            {copy.session} {(completed % settings.longEvery) + (mode === "work" ? 1 : 0) || settings.longEvery}/{settings.longEvery}
          </span>
        </div>
        <div className="time-timer-controls">
          {running ? (
            <button type="button" className="time-tool-button" onClick={pause}>
              {copy.pause}
            </button>
          ) : (
            <button type="button" className="time-tool-button" onClick={start}>
              {remainingMs < total ? copy.resume : copy.start}
            </button>
          )}
          <button type="button" className="time-tool-button is-secondary" onClick={() => goTo(nextMode(false), running)}>
            {copy.skip} ⏭
          </button>
          <button type="button" className="time-tool-button is-secondary" onClick={() => goTo(mode, false)}>
            {copy.reset}
          </button>
        </div>
        {notice && <p className="pomodoro-notice">{notice}</p>}
      </div>

      <div className="engineering-calculator-card pomodoro-settings">
        <label className="pomodoro-task">
          <span>{copy.task}</span>
          <input value={task} maxLength={80} placeholder={copy.taskPlaceholder} onChange={(event) => setTask(event.target.value)} />
        </label>
        <p className="sleep-flow-title">{copy.settings}</p>
        <div className="time-tool-options pomodoro-grid">
          {(
            [
              ["work", copy.workMin, 120],
              ["short", copy.shortMin, 60],
              ["long", copy.longMin, 90],
            ] as const
          ).map(([key, text, max]) => (
            <label key={key}>
              <span>{text}</span>
              <input type="number" min={1} max={max} value={settings[key]} onChange={(event) => updateSettings({ [key]: clampMinutes(Number(event.target.value), max) })} />
            </label>
          ))}
          <label>
            <span>{copy.longEvery}</span>
            <select value={settings.longEvery} onChange={(event) => updateSettings({ longEvery: Number(event.target.value) })}>
              {[2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} {copy.pomodoros}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>{baseCopy.alarm.sound}</span>
            <SoundPicker value={settings.sound} onChange={(sound) => updateSettings({ sound })} copy={baseCopy} />
          </label>
          <label>
            <span>{baseCopy.alarm.volume}</span>
            <input type="range" min={0.1} max={1} step={0.1} value={settings.volume} onChange={(event) => updateSettings({ volume: Number(event.target.value) })} />
          </label>
        </div>
        <div className="live-clock-toggles">
          <label className={`live-clock-toggle${settings.autoStart ? " is-on" : ""}`}>
            <input type="checkbox" checked={settings.autoStart} onChange={(event) => updateSettings({ autoStart: event.target.checked })} />
            <span>{copy.autoStart}</span>
          </label>
          <label className={`live-clock-toggle${settings.notify ? " is-on" : ""}`}>
            <input type="checkbox" checked={settings.notify} onChange={(event) => void toggleNotify(event.target.checked)} />
            <span>{copy.notify}</span>
          </label>
        </div>
        <p className="live-clock-sound-hint">{copy.keyboard}</p>
      </div>

      <div className="category-general-converter-result pomodoro-log">
        <p className="sleep-result-intro">
          {copy.today}: <strong>{log.length}</strong> {copy.pomodoros} · <strong>{focusMinutes}</strong> {copy.focusMinutes}
        </p>
        {log.length === 0 ? (
          <p className="time-tool-empty">{copy.noHistory}</p>
        ) : (
          <>
            <ol className="time-lap-list">
              {log.map((item, index) => (
                <li key={item.at}>
                  <span>🍅 {index + 1}</span>
                  <strong>{item.task || copy.modes.work}</strong>
                  <span>
                    {item.minutes} {lang === "tr" ? "dk" : lang === "de" ? "Min." : "min"}
                  </span>
                  <em>{new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }).format(new Date(item.at))}</em>
                </li>
              ))}
            </ol>
            <button type="button" className="time-tool-button is-secondary" onClick={() => setLog([])}>
              {copy.clearHistory}
            </button>
          </>
        )}
      </div>

      <div className="time-tool-footer">
        <button type="button" className="time-tool-button is-secondary" onClick={wakeLock.toggle} disabled={!wakeLock.supported}>
          {wakeLock.supported ? (wakeLock.enabled ? `☀ ${baseCopy.wakeLock.on}` : `☀ ${baseCopy.wakeLock.off}`) : baseCopy.wakeLock.unsupported}
        </button>
      </div>
    </div>
  );
}
