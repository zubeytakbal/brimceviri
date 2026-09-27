"use client";

// Alarm/zamanlayici sesleri: dosya yok, Web Audio ile uretilir (telif yok,
// hafif). AudioContext kullanici tiklamasi sirasinda acilmalidir.
export type TimeSoundId = "classic" | "chime" | "digital" | "soft" | "custom";

export const TIME_SOUND_IDS: TimeSoundId[] = ["classic", "chime", "digital", "soft"];

// Kullanicinin kendi ses dosyasi (IndexedDB'den yuklenen blob'un object URL'i).
let customUrl: string | null = null;
let previewAudio: HTMLAudioElement | null = null;

export function setCustomSoundUrl(url: string | null) {
  customUrl = url;
}

export function hasCustomSound() {
  return customUrl !== null;
}

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

// Bir "tur" ses calar; ~1 sn surer. Kendi ses dosyasinda ilk 6 saniyeyi dinletir.
export function playSound(id: TimeSoundId, volume = 0.5) {
  if (id === "custom") {
    if (!customUrl) return playSound("classic", volume);
    previewAudio?.pause();
    previewAudio = new Audio(customUrl);
    previewAudio.volume = Math.max(0.05, Math.min(1, volume));
    void previewAudio.play().catch(() => {});
    const audio = previewAudio;
    window.setTimeout(() => audio.pause(), 6000);
    return;
  }
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
  if (id === "custom" && customUrl) {
    const audio = new Audio(customUrl);
    audio.loop = true;
    audio.volume = Math.max(0.05, Math.min(1, volume));
    // Otomatik oynatma engellenirse klasik zil devreye girer.
    let fallback: (() => void) | null = null;
    void audio.play().catch(() => {
      fallback = startRinging("classic", volume);
    });
    return () => {
      audio.pause();
      fallback?.();
    };
  }
  if (id === "custom") return startRinging("classic", volume);
  playSound(id, volume);
  const interval = window.setInterval(() => playSound(id, volume), 1200);
  return () => window.clearInterval(interval);
}

/** Kisa bip (aralikli antrenman geri sayimi / faz degisimi). */
export function beep(frequency = 880, duration = 0.12, volume = 0.6) {
  const ctx = unlockAudio();
  if (!ctx) return;
  tone(ctx, frequency, ctx.currentTime, duration, "square", Math.max(0.02, Math.min(1, volume)) * 0.35);
}
