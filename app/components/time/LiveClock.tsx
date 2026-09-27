"use client";

import { useEffect, useRef, useState } from "react";
import AnalogClock, { type AnalogTheme } from "./AnalogClock";
import {
  analogClockThemes,
  digitalClockThemes,
  timeToolsCopy,
  type ClockTheme,
  type TimeToolsLocale,
} from "./timeToolsCopy";
import { pad2, useNow } from "./useNow";
import { useWakeLock } from "./useWakeLock";

const STORAGE_KEY = "birimceviri:clock";
const THEMES: readonly ClockTheme[] = [...analogClockThemes, ...digitalClockThemes];
const ANALOG_THEME: Record<string, AnalogTheme> = {
  analog: "classic",
  station: "station",
  roman: "roman",
  gold: "gold",
  night: "night",
};

type Settings = { theme: ClockTheme; hour24: boolean; seconds: boolean; date: boolean };

function loadSettings(fallback: Settings): Settings {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<Settings>;
    return {
      theme: THEMES.includes(parsed.theme as ClockTheme) ? (parsed.theme as ClockTheme) : fallback.theme,
      hour24: typeof parsed.hour24 === "boolean" ? parsed.hour24 : fallback.hour24,
      seconds: typeof parsed.seconds === "boolean" ? parsed.seconds : fallback.seconds,
      date: typeof parsed.date === "boolean" ? parsed.date : fallback.date,
    };
  } catch {
    return fallback;
  }
}

// Flip tema: rakam degisince kart yeniden olusur ve CSS ile "katlanir".
function FlipDigits({ value }: { value: string }) {
  return (
    <span className="flip-group">
      {value.split("").map((digit, index) => (
        <span className="flip-card" key={index}>
          <span className="flip-card-inner" key={digit}>
            {digit}
          </span>
        </span>
      ))}
    </span>
  );
}

// LED tema: gercek yedi segment gosterge; sonuk segmentler hafifce gorunur.
const SEGMENTS: Record<string, string> = {
  "0": "abcdef",
  "1": "bc",
  "2": "abged",
  "3": "abgcd",
  "4": "fgbc",
  "5": "afgcd",
  "6": "afgedc",
  "7": "abc",
  "8": "abcdefg",
  "9": "abcdfg",
  "-": "g",
};
const SEGMENT_POINTS: Record<string, string> = {
  a: "12,6 16,2 44,2 48,6 44,10 16,10",
  b: "50,8 54,12 54,44 50,48 46,44 46,12",
  c: "50,52 54,56 54,88 50,92 46,88 46,56",
  d: "12,94 16,90 44,90 48,94 44,98 16,98",
  e: "10,52 14,56 14,88 10,92 6,88 6,56",
  f: "10,8 14,12 14,44 10,48 6,44 6,12",
  g: "12,50 16,46 44,46 48,50 44,54 16,54",
};

function SevenSegment({ value }: { value: string }) {
  return (
    <span className="seg-group">
      {value.split("").map((digit, index) => (
        <svg key={index} className="seg-digit" viewBox="0 0 60 100" aria-hidden="true">
          {Object.entries(SEGMENT_POINTS).map(([segment, points]) => (
            <polygon key={segment} points={points} className={(SEGMENTS[digit] ?? "").includes(segment) ? "is-on" : undefined} />
          ))}
        </svg>
      ))}
    </span>
  );
}

function FullscreenIcon({ exit }: { exit: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      {exit ? (
        <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
      ) : (
        <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
      )}
    </svg>
  );
}

// Ikili (BCD) saat: her rakam 4 bitlik bir sutun; yanan nokta 1'dir.
function BinaryDigits({ value }: { value: string }) {
  return (
    <span className="binary-group">
      {value.split("").map((digit, index) => (
        <span className="binary-column" key={index}>
          {[8, 4, 2, 1].map((bit) => (
            <span key={bit} className={Number(digit) & bit ? "binary-dot is-on" : "binary-dot"} />
          ))}
          <span className="binary-digit">{digit}</span>
        </span>
      ))}
    </span>
  );
}

export default function LiveClock({ locale, initialTheme = "analog" }: { locale: TimeToolsLocale; initialTheme?: ClockTheme }) {
  const copy = timeToolsCopy[locale];
  const now = useNow();
  const wakeLock = useWakeLock();
  const stageRef = useRef<HTMLDivElement>(null);
  const defaults: Settings = { theme: initialTheme, hour24: locale !== "en", seconds: true, date: true };
  const [settings, setSettings] = useState<Settings>(defaults);
  const [loaded, setLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [timeZone, setTimeZone] = useState("");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setSettings((current) => loadSettings(current));
      setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
      setLoaded(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Kayit yapilamazsa ayarlar yalnizca bu ziyarette gecerli olur.
    }
  }, [settings, loaded]);

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const update = (patch: Partial<Settings>) => setSettings((current) => ({ ...current, ...patch }));

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void stageRef.current?.requestFullscreen?.();
  };

  const hours = now ? now.getHours() : 0;
  const hourText = now ? pad2(settings.hour24 ? hours : hours % 12 || 12) : "--";
  const minuteText = now ? pad2(now.getMinutes()) : "--";
  const secondText = now ? pad2(now.getSeconds()) : "--";
  const meridiem = settings.hour24 ? null : hours < 12 ? copy.clock.am : copy.clock.pm;
  const dateText = now
    ? new Intl.DateTimeFormat(copy.clock.dateLocale, { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(now)
    : " ";
  const ariaTime = now ? `${hourText}:${minuteText}${meridiem ? ` ${meridiem}` : ""}` : undefined;
  const analogTheme = ANALOG_THEME[settings.theme];

  return (
    <div className="time-tool category-general-converter">
      <div ref={stageRef} className={`live-clock-stage is-${settings.theme}${isFullscreen ? " is-fullscreen" : ""}`}>
        <button type="button" className="live-clock-fullscreen" onClick={toggleFullscreen} aria-label={isFullscreen ? copy.exitFullscreen : copy.fullscreen}>
          <FullscreenIcon exit={isFullscreen} />
        </button>

        {analogTheme ? (
          <div className="live-clock-analog">
            <AnalogClock date={now} size={340} theme={analogTheme} label={ariaTime} allNumbers />
            <p className="live-clock-analog-digital">
              {hourText}:{minuteText}
              {settings.seconds ? `:${secondText}` : ""}
              {meridiem ? ` ${meridiem}` : ""}
            </p>
          </div>
        ) : settings.theme === "flip" ? (
          <div className="live-clock-flip" role="img" aria-label={ariaTime}>
            <FlipDigits value={hourText} />
            <span className="flip-sep">:</span>
            <FlipDigits value={minuteText} />
            {settings.seconds && (
              <>
                <span className="flip-sep">:</span>
                <FlipDigits value={secondText} />
              </>
            )}
            {meridiem && <span className="flip-meridiem">{meridiem}</span>}
          </div>
        ) : settings.theme === "led" ? (
          <div className="live-clock-led" role="img" aria-label={ariaTime}>
            <SevenSegment value={hourText} />
            <span className="seg-colon" aria-hidden="true">
              <i />
              <i />
            </span>
            <SevenSegment value={minuteText} />
            {settings.seconds && (
              <span className="seg-seconds">
                <SevenSegment value={secondText} />
              </span>
            )}
            {meridiem && <span className="flip-meridiem">{meridiem}</span>}
          </div>
        ) : settings.theme === "binary" ? (
          <div className="live-clock-binary" role="img" aria-label={ariaTime}>
            <BinaryDigits value={hourText} />
            <BinaryDigits value={minuteText} />
            {settings.seconds && <BinaryDigits value={secondText} />}
            {meridiem && <span className="flip-meridiem">{meridiem}</span>}
          </div>
        ) : (
          <div className="live-clock-digital" role="img" aria-label={ariaTime}>
            {settings.theme === "terminal" && <span className="live-clock-prompt">&gt;</span>}
            <span>{hourText}</span>
            <span className="live-clock-colon">:</span>
            <span>{minuteText}</span>
            {settings.seconds && <small>{secondText}</small>}
            {meridiem && <em>{meridiem}</em>}
            {settings.theme === "terminal" && <span className="live-clock-cursor" aria-hidden="true" />}
          </div>
        )}

        {settings.date && <p className="live-clock-date">{dateText}</p>}
      </div>

      <div className="engineering-calculator-card live-clock-settings">
        <p className="sleep-flow-title">{copy.clock.theme}</p>
        {(
          [
            [copy.clock.analogGroup, analogClockThemes],
            [copy.clock.digitalGroup, digitalClockThemes],
          ] as const
        ).map(([groupLabel, themes]) => (
          <div key={groupLabel} className="live-clock-theme-group">
            <span className="live-clock-theme-group-label">{groupLabel}</span>
            <div className="live-clock-themes" role="radiogroup" aria-label={`${copy.clock.theme}: ${groupLabel}`}>
              {themes.map((theme) => (
                <button
                  key={theme}
                  type="button"
                  role="radio"
                  aria-checked={settings.theme === theme}
                  className={`live-clock-theme-swatch is-${theme}${settings.theme === theme ? " is-active" : ""}`}
                  onClick={() => update({ theme })}
                >
                  <span className="live-clock-swatch-preview" aria-hidden="true">
                    {ANALOG_THEME[theme] ? (theme === "roman" ? "XII" : "◷") : theme === "binary" ? "⠿⠷" : theme === "terminal" ? ">12:30" : "12:30"}
                  </span>
                  {copy.clock.themes[theme]}
                </button>
              ))}
            </div>
          </div>
        ))}

        <p className="sleep-flow-title">{copy.clock.options}</p>
        <div className="live-clock-toggles">
          {(
            [
              ["hour24", copy.clock.hour24],
              ["seconds", copy.clock.seconds],
              ["date", copy.clock.date],
            ] as const
          ).map(([key, text]) => (
            <label key={key} className={`live-clock-toggle${settings[key] ? " is-on" : ""}`}>
              <input type="checkbox" checked={settings[key]} onChange={(event) => update({ [key]: event.target.checked })} />
              <span>{text}</span>
            </label>
          ))}
          <button type="button" className="time-tool-button is-secondary" onClick={toggleFullscreen}>
            <FullscreenIcon exit={false} /> {copy.fullscreen}
          </button>
        </div>
      </div>

      <div className="time-tool-footer">
        <button type="button" className="time-tool-button is-secondary" onClick={wakeLock.toggle} disabled={!wakeLock.supported}>
          {wakeLock.supported ? (wakeLock.enabled ? `☀ ${copy.wakeLock.on}` : `☀ ${copy.wakeLock.off}`) : copy.wakeLock.unsupported}
        </button>
        {timeZone && (
          <p>
            {copy.clock.timeZone}: <strong>{timeZone.replace(/_/g, " ")}</strong>
          </p>
        )}
      </div>
    </div>
  );
}
