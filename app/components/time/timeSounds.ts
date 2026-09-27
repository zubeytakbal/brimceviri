"use client";

// Alarm/zamanlayici sesleri: dosya yok, Web Audio ile uretilir (telif yok,
// hafif). AudioContext kullanici tiklamasi sirasinda acilmalidir.
export type TimeSoundId = "classic" | "chime" | "digital" | "soft";

export const TIME_SOUND_IDS: TimeSoundId[] = ["classic", "chime", "digital", "soft"];

let context: AudioContext | null = null;

export function unlockAudio() {
  if (typeof window === "undefined") return null;
  if (!context) {
    const AudioContextClass =
      window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return null;
    context = new AudioContextClass();
  }
  void context.resume();
  return context;
}

function tone(ctx: AudioContext, frequency: number, start: number, duration: number, type: OscillatorType, volume: number) {
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain).connect(ctx.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.05);
}

// Bir "tur" ses calar; ~1 sn surer.
export function playSound(id: TimeSoundId, volume = 0.5) {
  const ctx = unlockAudio();
  if (!ctx) return;
  const now = ctx.currentTime;
  const v = Math.max(0.02, Math.min(1, volume)) * 0.6;
  if (id === "classic") {
    tone(ctx, 880, now, 0.18, "square", v * 0.6);
    tone(ctx, 880, now + 0.25, 0.18, "square", v * 0.6);
    tone(ctx, 880, now + 0.5, 0.18, "square", v * 0.6);
  } else if (id === "chime") {
    tone(ctx, 1046.5, now, 0.9, "sine", v);
    tone(ctx, 1318.5, now + 0.15, 0.8, "sine", v * 0.8);
    tone(ctx, 1568, now + 0.3, 0.7, "sine", v * 0.6);
  } else if (id === "digital") {
    tone(ctx, 1200, now, 0.08, "square", v * 0.5);
    tone(ctx, 1200, now + 0.12, 0.08, "square", v * 0.5);
    tone(ctx, 1600, now + 0.24, 0.12, "square", v * 0.5);
  } else {
    tone(ctx, 523.25, now, 0.9, "triangle", v);
    tone(ctx, 659.25, now + 0.3, 0.9, "triangle", v * 0.7);
  }
}

// Durdurulana kadar her saniye tekrar eder.
export function startRinging(id: TimeSoundId, volume = 0.5) {
  playSound(id, volume);
  const interval = window.setInterval(() => playSound(id, volume), 1200);
  return () => window.clearInterval(interval);
}
