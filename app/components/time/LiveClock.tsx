"use client";

import { useEffect, useRef, useState } from "react";
import AnalogClock, { type AnalogTheme } from "./AnalogClock";
import { previewChime, startClockSound } from "./clockSounds";
import { clockFamilies, clockThemeDefs, clockThemeIds, themesInFamily, type ClockTheme } from "./clockThemes";
import { CuckooClock, NixieClock, PendulumClock, PocketWatch, TwinBellClock } from "./faces/VintageFaces";
import {
  Hourglass,
  MantelClock,
  MoonPhaseWatch,
  RadioClock,
  SchoolClock,
  ShipClock,
  SkeletonWatch,
  SunMoon,
  TowerClock,
  WordClock,
} from "./faces/MoreFaces";
import { ChronographWatch, DiveWatch, DressWatch, FieldWatch, LcdWatch, SmartWatch } from "./faces/WatchFaces";
import { timeToolsCopy, type TimeToolsLocale } from "./timeToolsCopy";
import { unlockAudio } from "./timeSounds";
import { pad2, useNow } from "./useNow";
import { useWakeLock } from "./useWakeLock";

const STORAGE_KEY = "birimceviri:clock";

const ANALOG_THEME: Partial<Record<ClockTheme, AnalogTheme>> = {
  analog: "classic",
  station: "station",
  roman: "roman",
  gold: "gold",
  night: "night",
};

type Settings = { theme: ClockTheme; hour24: boolean; seconds: boolean; date: boolean; tick: boolean; chime: boolean; volume: number };

function loadSettings(fallback: Settings): Settings {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<Settings>;
    const bool = (value: unknown, def: boolean) => (typeof value === "boolean" ? value : def);
    return {
      theme: clockThemeIds.includes(parsed.theme as ClockTheme) ? (parsed.theme as ClockTheme) : fallback.theme,
      hour24: bool(parsed.hour24, fallback.hour24),
      seconds: bool(parsed.seconds, fallback.seconds),
      date: bool(parsed.date, fallback.date),
      // Ses her ziyarette kapali baslar (tarayicilar izinsiz sesi engeller).
      tick: false,
      chime: false,
      volume: typeof parsed.volume === "number" ? Math.min(1, Math.max(0.05, parsed.volume)) : fallback.volume,
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

export function SevenSegment({ value }: { value: string }) {
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

export default function LiveClock({
  locale,
  initialTheme = "analog",
  lockTheme = false,
}: {
  locale: TimeToolsLocale;
  initialTheme?: ClockTheme;
  /** Tema sayfalarinda baslangic temasi kayitli tercihi ezer. */
  lockTheme?: boolean;
}) {
  const copy = timeToolsCopy[locale];
  const now = useNow();
  const wakeLock = useWakeLock();
  const stageRef = useRef<HTMLDivElement>(null);
  const [settings, setSettings] = useState<Settings>({
    theme: initialTheme,
    hour24: locale !== "en",
    seconds: true,
    date: true,
    tick: false,
    chime: false,
    volume: 0.6,
  });
  const [loaded, setLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [timeZone, setTimeZone] = useState("");
  const [activeUntil, setActiveUntil] = useState(0);
  const soundRef = useRef<ReturnType<typeof startClockSound> | null>(null);
  const def = clockThemeDefs[settings.theme];

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setSettings((current) => {
        const stored = loadSettings(current);
        return lockTheme ? { ...stored, theme: initialTheme } : stored;
      });
      setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
      setLoaded(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [lockTheme, initialTheme]);

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

  // Ses motoru: tik-tak ya da saat basi acikken calisir, tema degisince guncellenir.
  const soundOn = settings.tick || settings.chime;
  useEffect(() => {
    if (!soundOn) return;
    const engine = startClockSound({ tick: "none", chime: "none", tickOn: false, chimeOn: false, volume: 0.6 });
    soundRef.current = engine;
    return () => {
      engine.stop();
      soundRef.current = null;
    };
  }, [soundOn]);

  useEffect(() => {
    soundRef.current?.update({
      tick: def.tick,
      chime: def.chime,
      tickOn: settings.tick,
      chimeOn: settings.chime,
      volume: settings.volume,
      onChime: (_hour, durationMs) => setActiveUntil(Date.now() + durationMs),
    });
  }, [def.tick, def.chime, settings.tick, settings.chime, settings.volume, soundOn]);

  const update = (patch: Partial<Settings>) => setSettings((current) => ({ ...current, ...patch }));

  const toggleSound = (key: "tick" | "chime") => {
    unlockAudio();
    update({ [key]: !settings[key] });
  };

  const listen = () => {
    const seconds = previewChime(def.chime, settings.volume);
    setActiveUntil(Date.now() + seconds * 1000);
  };

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
    : "\u00a0";
  const shortDate = now ? new Intl.DateTimeFormat(copy.clock.dateLocale, { weekday: "short", day: "numeric", month: "short" }).format(now) : "";
  const weekday = now ? new Intl.DateTimeFormat(copy.clock.dateLocale, { weekday: "short" }).format(now).slice(0, 2).toUpperCase() : "--";
  const ariaTime = now ? `${hourText}:${minuteText}${meridiem ? ` ${meridiem}` : ""}` : undefined;
  const active = now ? now.getTime() < activeUntil : false;
  const analogTheme = ANALOG_THEME[settings.theme];
  const digitalLine = (
    <p className="live-clock-analog-digital">
      {hourText}:{minuteText}
      {settings.seconds ? `:${secondText}` : ""}
      {meridiem ? ` ${meridiem}` : ""}
    </p>
  );

  const renderFace = () => {
    if (analogTheme)
      return (
        <div className="live-clock-analog">
          <AnalogClock date={now} size={340} theme={analogTheme} label={ariaTime} allNumbers motion={def.motion} />
          {digitalLine}
        </div>
      );
    switch (settings.theme) {
      case "pendulum":
      case "cuckoo":
      case "pocket":
      case "twinbell": {
        const Face = { pendulum: PendulumClock, cuckoo: CuckooClock, pocket: PocketWatch, twinbell: TwinBellClock }[settings.theme];
        return (
          <div className="live-clock-analog is-object">
            <Face date={now} label={ariaTime} active={active} />
            {digitalLine}
          </div>
        );
      }
      case "mantel":
      case "tower":
      case "school":
      case "ship":
      case "hourglass":
      case "sunmoon": {
        const Face = {
          mantel: MantelClock,
          tower: TowerClock,
          school: SchoolClock,
          ship: ShipClock,
          hourglass: Hourglass,
          sunmoon: SunMoon,
        }[settings.theme];
        return (
          <div className={`live-clock-analog is-object is-${settings.theme}-face`}>
            <Face date={now} label={ariaTime} active={active} />
            {digitalLine}
          </div>
        );
      }
      case "word":
        return (
          <div className="live-clock-analog">
            <WordClock date={now} locale={locale} label={ariaTime} />
            {digitalLine}
          </div>
        );
      case "radio":
        return (
          <RadioClock
            label={ariaTime}
            flip={
              <>
                <FlipDigits value={hourText} />
                <span className="flip-sep">:</span>
                <FlipDigits value={minuteText} />
                {meridiem && <span className="flip-meridiem">{meridiem}</span>}
              </>
            }
          />
        );
      case "diver":
      case "chrono":
      case "dress":
      case "field":
      case "skeleton":
      case "moonphase": {
        const Face = {
          diver: DiveWatch,
          chrono: ChronographWatch,
          dress: DressWatch,
          field: FieldWatch,
          skeleton: SkeletonWatch,
          moonphase: MoonPhaseWatch,
        }[settings.theme];
        return (
          <div className="live-clock-analog is-object is-watch">
            <Face date={now} label={ariaTime} />
            {digitalLine}
          </div>
        );
      }
      case "nixie":
        return <NixieClock hourText={hourText} minuteText={minuteText} secondText={secondText} showSeconds={settings.seconds} label={ariaTime} />;
      case "lcd":
        return (
          <LcdWatch
            hourText={hourText}
            minuteText={minuteText}
            secondText={secondText}
            meridiem={meridiem}
            weekday={weekday}
            day={now ? String(now.getDate()) : "--"}
            segments={(value) => <SevenSegment value={value} />}
            label={ariaTime}
          />
        );
      case "smart":
        return <SmartWatch date={now} hourText={hourText} minuteText={minuteText} dateText={shortDate} label={ariaTime} />;
      case "flip":
        return (
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
        );
      case "led":
        return (
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
        );
      case "binary":
        return (
          <div className="live-clock-binary" role="img" aria-label={ariaTime}>
            <BinaryDigits value={hourText} />
            <BinaryDigits value={minuteText} />
            {settings.seconds && <BinaryDigits value={secondText} />}
            {meridiem && <span className="flip-meridiem">{meridiem}</span>}
          </div>
        );
      default:
        return (
          <div className="live-clock-digital" role="img" aria-label={ariaTime}>
            {settings.theme === "terminal" && <span className="live-clock-prompt">&gt;</span>}
            <span>{hourText}</span>
            <span className="live-clock-colon">:</span>
            <span>{minuteText}</span>
            {settings.seconds && <small>{secondText}</small>}
            {meridiem && <em>{meridiem}</em>}
            {settings.theme === "terminal" && <span className="live-clock-cursor" aria-hidden="true" />}
          </div>
        );
    }
  };

  const hasObjectDate = settings.theme === "lcd" || settings.theme === "smart";

  return (
    <div className="time-tool category-general-converter">
      <div ref={stageRef} className={`live-clock-stage is-${settings.theme} is-family-${def.family}${isFullscreen ? " is-fullscreen" : ""}`}>
        <button type="button" className="live-clock-fullscreen" onClick={toggleFullscreen} aria-label={isFullscreen ? copy.exitFullscreen : copy.fullscreen}>
          <FullscreenIcon exit={isFullscreen} />
        </button>
        {renderFace()}
        {settings.date && !hasObjectDate && <p className="live-clock-date">{dateText}</p>}
      </div>

      <div className="engineering-calculator-card live-clock-settings">
        <p className="sleep-flow-title">{copy.clock.theme}</p>
        {clockFamilies.map((family) => (
          <div key={family} className="live-clock-theme-group">
            <span className="live-clock-theme-group-label">{copy.clock.families[family]}</span>
            <div className="live-clock-themes" role="radiogroup" aria-label={copy.clock.families[family]}>
              {themesInFamily(family).map((theme) => (
                <button
                  key={theme}
                  type="button"
                  role="radio"
                  aria-checked={settings.theme === theme}
                  className={`live-clock-theme-swatch is-${theme}${settings.theme === theme ? " is-active" : ""}`}
                  onClick={() => update({ theme })}
                >
                  <span className="live-clock-swatch-preview" aria-hidden="true" />
                  {copy.clock.themes[theme]}
                </button>
              ))}
            </div>
          </div>
        ))}

        <p className="sleep-flow-title">{copy.clock.sound}</p>
        <div className="live-clock-toggles">
          <label className={`live-clock-toggle${settings.tick ? " is-on" : ""}${def.tick === "none" ? " is-disabled" : ""}`}>
            <input type="checkbox" checked={settings.tick} disabled={def.tick === "none"} onChange={() => toggleSound("tick")} />
            <span>{copy.clock.tick}</span>
          </label>
          <label className={`live-clock-toggle${settings.chime ? " is-on" : ""}${def.chime === "none" ? " is-disabled" : ""}`}>
            <input type="checkbox" checked={settings.chime} disabled={def.chime === "none"} onChange={() => toggleSound("chime")} />
            <span>{copy.clock.chime}</span>
          </label>
          <button type="button" className="time-tool-button is-secondary" onClick={listen} disabled={def.chime === "none"}>
            ♪ {copy.clock.listen}
          </button>
          <label className="live-clock-volume">
            <span className="sr-only">{copy.alarm.volume}</span>
            <input
              type="range"
              min={0.05}
              max={1}
              step={0.05}
              value={settings.volume}
              onChange={(event) => update({ volume: Number(event.target.value) })}
              aria-label={copy.alarm.volume}
            />
          </label>
        </div>
        <p className="live-clock-sound-hint">{copy.clock.soundHint}</p>

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
