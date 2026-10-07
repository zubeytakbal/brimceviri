"use client";

// Online alarm: birden fazla alarm, not, ses secimi, erteleme, sekme
// basliginda geri sayim, "ekrani acik tut". Alarmlar cihazda saklanir.
import { useEffect, useMemo, useRef, useState } from "react";
import AnalogClock from "./AnalogClock";
import TimeStepper from "./TimeStepper";
import SoundPicker from "./SoundPicker";
import { playSound, startRinging, unlockAudio, type TimeSoundId } from "./timeSounds";
import { timeToolsCopy, type TimeToolsCopy, type TimeToolsLocale } from "./timeToolsCopy";
import { formatClock, makeId, nowMs, pad2, useNow } from "./useNow";
import { useWakeLock } from "./useWakeLock";

type Repeat = "once" | "daily" | "weekdays";
type Alarm = { id: string; time: string; label: string; sound: TimeSoundId; enabled: boolean; at: number; repeat?: Repeat };

const STORAGE_KEY = "birimceviri:alarms";

function nextAt(time: string, from = Date.now(), repeat: Repeat = "once") {
  const [hours, minutes] = time.split(":").map(Number);
  const target = new Date(from);
  target.setHours(hours, minutes, 0, 0);
  if (target.getTime() <= from) target.setDate(target.getDate() + 1);
  // Hafta ici: cumartesi (6) ve pazar (0) atlanir.
  while (repeat === "weekdays" && (target.getDay() === 0 || target.getDay() === 6)) target.setDate(target.getDate() + 1);
  return target.getTime();
}

// Telefonda titresim: calarken 2 saniyede bir desen tekrarlanir.
function startVibration() {
  if (typeof navigator === "undefined" || !("vibrate" in navigator)) return () => {};
  const pattern = [600, 300, 600];
  navigator.vibrate(pattern);
  const id = window.setInterval(() => navigator.vibrate(pattern), 2000);
  return () => {
    window.clearInterval(id);
    navigator.vibrate(0);
  };
}

function untilText(ms: number, copy: TimeToolsCopy) {
  const totalMinutes = Math.max(1, Math.ceil(ms / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours > 0 ? `${hours} ${copy.alarm.hours} ${minutes} ${copy.alarm.minutes}` : `${minutes} ${copy.alarm.minutes}`;
}

function loadAlarms(): Alarm[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as Alarm[]) : [];
    return Array.isArray(parsed)
      ? parsed
          .filter((alarm) => typeof alarm?.time === "string" && /^\d{2}:\d{2}$/.test(alarm.time))
          .map((alarm) => ({ ...alarm, at: alarm.enabled ? nextAt(alarm.time, Date.now(), alarm.repeat) : 0 }))
      : [];
  } catch {
    return [];
  }
}

export default function AlarmClock({ locale, initialTime }: { locale: TimeToolsLocale; initialTime?: string }) {
  const copy = timeToolsCopy[locale];
  const now = useNow();
  const wakeLock = useWakeLock();
  const [hour, setHour] = useState(() => Number(initialTime?.split(":")[0] ?? 7));
  const [minute, setMinute] = useState(() => Number(initialTime?.split(":")[1] ?? 0));
  const [label, setLabel] = useState("");
  const [sound, setSound] = useState<TimeSoundId>("classic");
  const [repeat, setRepeat] = useState<Repeat>("once");
  const [volume, setVolume] = useState(0.7);
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [ringing, setRinging] = useState<Alarm | null>(null);
  const stopRef = useRef<(() => void) | null>(null);

  // localStorage yalnizca tarayicida okunur; ilk karede yukle (hidrasyon uyumlu).
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setAlarms(loadAlarms());
      setLoaded(true);
      // Eski hazır saat sayfaları "?t=07:30" ile buraya yönlenir; saat seçicilere yaz.
      const t = new URLSearchParams(window.location.search).get("t");
      const m = t ? /^([01]\d|2[0-3]):([0-5]\d)$/.exec(t) : null;
      if (m) {
        setHour(Number(m[1]));
        setMinute(Number(m[2]));
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(alarms));
    } catch {
      // Gizli sekme vb.: kayit yapilamazsa alarm yine bu sayfada calisir.
    }
  }, [alarms, loaded]);

  // Zamani gelen alarmi cal: her 250 ms'de gercek saatle karsilastir.
  useEffect(() => {
    if (ringing) return;
    const id = window.setInterval(() => {
      const due = alarms.find((alarm) => alarm.enabled && alarm.at && nowMs() >= alarm.at);
      if (!due) return;
      window.clearInterval(id);
      setRinging(due);
      // Tekrarlayan alarm bir sonraki gune kurulur; tek seferlik kapanir.
      setAlarms((current) =>
        current.map((alarm) =>
          alarm.id !== due.id
            ? alarm
            : alarm.repeat && alarm.repeat !== "once"
              ? { ...alarm, at: nextAt(alarm.time, due.at + 60000, alarm.repeat) }
              : { ...alarm, enabled: false, at: 0 }
        )
      );
      const stopSound = startRinging(due.sound, volume);
      const stopVibration = startVibration();
      stopRef.current = () => {
        stopSound();
        stopVibration();
      };
    }, 250);
    return () => window.clearInterval(id);
  }, [alarms, ringing, volume]);

  useEffect(() => () => stopRef.current?.(), []);

  const next = useMemo(
    () => alarms.filter((alarm) => alarm.enabled && alarm.at).sort((a, b) => a.at - b.at)[0],
    [alarms]
  );

  // Sekme basliginda siradaki alarm.
  useEffect(() => {
    const original = document.title;
    return () => {
      document.title = original;
    };
  }, []);
  useEffect(() => {
    if (!now) return;
    const base = document.title.replace(/^⏰ [^|]*\| /, "");
    document.title = ringing
      ? `⏰ ${ringing.time} | ${base}`
      : next
        ? `⏰ ${next.time} · ${untilText(next.at - now.getTime(), copy)} | ${base}`
        : base;
  }, [now, next, ringing, copy]);

  const addAlarm = (time: string) => {
    unlockAudio();
    const alarm: Alarm = { id: makeId(), time, label: label.trim(), sound, enabled: true, at: nextAt(time, nowMs(), repeat), repeat };
    setAlarms((current) => [...current, alarm].sort((a, b) => a.time.localeCompare(b.time)));
    setLabel("");
  };

  const quickAdd = (minutesFromNow: number) => {
    const target = new Date(nowMs() + minutesFromNow * 60000);
    addAlarm(`${pad2(target.getHours())}:${pad2(target.getMinutes())}`);
  };

  const stop = () => {
    stopRef.current?.();
    stopRef.current = null;
    setRinging(null);
  };

  const snooze = () => {
    if (!ringing) return;
    const snoozed: Alarm = { ...ringing, id: `${ringing.id}-z${Date.now()}`, enabled: true, at: Date.now() + 5 * 60000, repeat: "once" };
    const target = new Date(snoozed.at);
    snoozed.time = `${pad2(target.getHours())}:${pad2(target.getMinutes())}`;
    stop();
    setAlarms((current) => [...current, snoozed]);
  };

  return (
    <div className="time-tool category-general-converter">
      <div className="time-tool-hero">
        <AnalogClock date={now} size={220} label={copy.alarm.nowLabel} />
        <div className="time-tool-digital" aria-live="off">
          <span className="time-tool-caption">{copy.alarm.nowLabel}</span>
          <strong suppressHydrationWarning>{now ? formatClock(now) : "--:--:--"}</strong>
          {next && now && (
            <span className="time-tool-next">
              ⏰ {next.time} · {copy.alarm.inTime(untilText(next.at - now.getTime(), copy))}
            </span>
          )}
        </div>
      </div>

      {ringing && (
        <div className="time-tool-ringing" role="alert">
          <strong>
            ⏰ {copy.alarm.ringingTitle} · {ringing.time}
            {ringing.label ? ` · ${ringing.label}` : ""}
          </strong>
          <div>
            <button type="button" className="time-tool-button is-secondary" onClick={snooze}>
              {copy.alarm.snooze}
            </button>
            <button type="button" className="time-tool-button" onClick={stop}>
              {copy.alarm.stop}
            </button>
          </div>
        </div>
      )}

      <div className="engineering-calculator-card sleep-flow">
        <p className="sleep-flow-title">{copy.alarm.newAlarm}</p>
        <div className="sleep-time-picker">
          <TimeStepper label={copy.timer.hours} value={hour} onChange={setHour} max={24} />
          <span className="sleep-time-colon" aria-hidden="true">
            :
          </span>
          <TimeStepper label={copy.timer.minutes} value={minute} onChange={setMinute} max={60} />
        </div>
        <div className="time-tool-options">
          <label>
            <span>{copy.alarm.label}</span>
            <input value={label} maxLength={40} placeholder={copy.alarm.labelPlaceholder} onChange={(event) => setLabel(event.target.value)} />
          </label>
          <label>
            <span>{copy.alarm.sound}</span>
            <SoundPicker value={sound} onChange={setSound} copy={copy} />
          </label>
          <label>
            <span>{copy.repeat.label}</span>
            <select value={repeat} onChange={(event) => setRepeat(event.target.value as Repeat)}>
              <option value="once">{copy.repeat.once}</option>
              <option value="daily">{copy.repeat.daily}</option>
              <option value="weekdays">{copy.repeat.weekdays}</option>
            </select>
          </label>
          <label>
            <span>{copy.alarm.volume}</span>
            <input type="range" min={0.1} max={1} step={0.1} value={volume} onChange={(event) => setVolume(Number(event.target.value))} />
          </label>
        </div>
        <div className="time-tool-actions">
          <button type="button" className="sleep-secondary-button is-compact" onClick={() => playSound(sound, volume)}>
            🔊 {copy.alarm.test}
          </button>
          <button type="button" className="sleep-primary-button" onClick={() => addAlarm(`${pad2(hour)}:${pad2(minute)}`)}>
            ⏰ {copy.alarm.add} · {pad2(hour)}:{pad2(minute)}
          </button>
        </div>
        <div className="time-tool-quick">
          <span>{copy.alarm.quick}:</span>
          {[5, 10, 15, 30, 60].map((value) => (
            <button type="button" key={value} onClick={() => quickAdd(value)}>
              +{value >= 60 ? `1 ${copy.alarm.hours}` : `${value} ${copy.alarm.minutes}`}
            </button>
          ))}
        </div>
      </div>

      <div className="category-general-converter-result">
        <p className="sleep-result-intro">{copy.alarm.list}</p>
        {alarms.length === 0 ? (
          <p className="time-tool-empty">{copy.alarm.empty}</p>
        ) : (
          <ul className="time-alarm-list">
            {alarms.map((alarm) => (
              <li key={alarm.id} className={alarm.enabled ? "is-enabled" : undefined}>
                <strong>{alarm.time}</strong>
                <span>
                  {alarm.label || copy.sounds[alarm.sound]}
                  {alarm.repeat && alarm.repeat !== "once" && <em className="time-alarm-repeat"> · {copy.repeat[alarm.repeat]}</em>}
                </span>
                <label className="time-switch">
                  <input
                    type="checkbox"
                    checked={alarm.enabled}
                    onChange={(event) => {
                      unlockAudio();
                      const enabled = event.target.checked;
                      setAlarms((current) =>
                        current.map((item) => (item.id === alarm.id ? { ...item, enabled, at: enabled ? nextAt(item.time, Date.now(), item.repeat) : 0 } : item))
                      );
                    }}
                  />
                  <span>{alarm.enabled ? copy.alarm.on : copy.alarm.off}</span>
                </label>
                <button type="button" onClick={() => setAlarms((current) => current.filter((item) => item.id !== alarm.id))}>
                  {copy.alarm.remove}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="time-tool-footer">
        <button type="button" className="time-tool-button is-secondary" onClick={wakeLock.toggle} disabled={!wakeLock.supported}>
          {wakeLock.supported ? (wakeLock.enabled ? `☀ ${copy.wakeLock.on}` : `☀ ${copy.wakeLock.off}`) : copy.wakeLock.unsupported}
        </button>
        <p>{copy.alarm.tabNote}</p>
      </div>
    </div>
  );
}
