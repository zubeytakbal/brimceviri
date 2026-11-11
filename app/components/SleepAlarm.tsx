"use client";

// Uyku hesaplayicisindaki "Bu saate alarm kur": tarayici sekmesi acik
// kaldigi surece calan basit alarm (Web Audio bip sesi). Telefonlarda ekran
// kilitlenince tarayici uyuyabilir; bu yuzden kullaniciya acikca soylenir.
import { useEffect, useRef, useState } from "react";

type AlarmCopy = {
  setFor: (time: string) => string;
  active: (time: string) => string;
  cancel: string;
  ringing: (time: string) => string;
  stop: string;
};

export const alarmCopy: Record<string, AlarmCopy> = {
  tr: {
    setFor: (time) => `⏰ ${time} için alarm kur`,
    active: (time) => `Alarm ${time} için kuruldu. Bu sekmeyi açık tutun; telefonda ekran kilitlenirse alarm çalmayabilir, yedek olarak telefonunuzun alarmını da kurun.`,
    cancel: "Alarmı iptal et",
    ringing: (time) => `⏰ Günaydın! Saat ${time}`,
    stop: "Durdur",
  },
  en: {
    setFor: (time) => `⏰ Set an alarm for ${time}`,
    active: (time) => `Alarm set for ${time}. Keep this tab open; on a phone the browser may sleep when the screen locks, so set your phone's alarm too.`,
    cancel: "Cancel alarm",
    ringing: (time) => `⏰ Good morning! It's ${time}`,
    stop: "Stop",
  },
  de: {
    setFor: (time) => `⏰ Wecker auf ${time} Uhr stellen`,
    active: (time) => `Wecker auf ${time} Uhr gestellt. Lass diesen Tab geöffnet; auf dem Handy kann der Browser bei gesperrtem Bildschirm pausieren – stell zur Sicherheit auch den Handywecker.`,
    cancel: "Wecker abbrechen",
    ringing: (time) => `⏰ Guten Morgen! Es ist ${time} Uhr`,
    stop: "Stopp",
  },
};

function nextOccurrence(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  const target = new Date();
  target.setHours(hours, minutes, 0, 0);
  if (target.getTime() <= Date.now()) target.setDate(target.getDate() + 1);
  return target.getTime();
}

export function useBrowserAlarm() {
  const [alarm, setAlarm] = useState<{ time: string; at: number } | null>(null);
  const [ringing, setRinging] = useState<string | null>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const beepTimer = useRef<number | null>(null);

  const stopSound = () => {
    if (beepTimer.current !== null) window.clearInterval(beepTimer.current);
    beepTimer.current = null;
  };

  const beep = () => {
    const context = audioRef.current;
    if (!context) return;
    void context.resume();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = 880;
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.4, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.45);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.5);
  };

  useEffect(() => {
    if (!alarm) return;
    const check = window.setInterval(() => {
      if (Date.now() >= alarm.at) {
        window.clearInterval(check);
        setAlarm(null);
        setRinging(alarm.time);
        beep();
        beepTimer.current = window.setInterval(beep, 1000);
        // En fazla 5 dakika calar.
        window.setTimeout(stopSound, 5 * 60 * 1000);
      }
    }, 1000);
    return () => window.clearInterval(check);
  }, [alarm]);

  useEffect(() => stopSound, []);

  return {
    alarm,
    ringing,
    set(time: string) {
      // AudioContext kullanici tiklamasi sirasinda olusturulur ki sonra ses calabilsin.
      if (!audioRef.current) {
        const AudioContextClass =
          window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) audioRef.current = new AudioContextClass();
      }
      void audioRef.current?.resume();
      setRinging(null);
      setAlarm({ time, at: nextOccurrence(time) });
    },
    cancel() {
      setAlarm(null);
    },
    stop() {
      stopSound();
      setRinging(null);
    },
  };
}

export function AlarmStatus({
  copy,
  alarm,
  ringing,
  onCancel,
  onStop,
}: {
  copy: AlarmCopy;
  alarm: { time: string } | null;
  ringing: string | null;
  onCancel: () => void;
  onStop: () => void;
}) {
  if (ringing) {
    return (
      <div className="sleep-alarm-status is-ringing" role="alert">
        <strong>{copy.ringing(ringing)}</strong>
        <button type="button" onClick={onStop}>
          {copy.stop}
        </button>
      </div>
    );
  }
  if (!alarm) return null;
  return (
    <div className="sleep-alarm-status" role="status">
      <span>{copy.active(alarm.time)}</span>
      <button type="button" onClick={onCancel}>
        {copy.cancel}
      </button>
    </div>
  );
}
