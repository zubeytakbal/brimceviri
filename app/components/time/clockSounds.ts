"use client";

import { unlockAudio } from "./timeSounds";

// Saat sesleri: tik-tak mekanizmalari ve saat basi calmalari. Hepsi Web Audio
// ile anlik sentezlenir (dosya yok, telif yok). Zamanlama gercek saate kilitlidir:
// tikler tam saniye (ya da vurus) sinirlarinda, calmalar tam saat basinda duyulur.

export type TickProfile = "none" | "quartz" | "wall" | "pendulum" | "pocket" | "wrist" | "alarm" | "flap";
export type ChimeProfile =
  | "none"
  | "westminster"
  | "tower"
  | "mantel"
  | "cuckoo"
  | "bell"
  | "school"
  | "ship"
  | "beep"
  | "ring"
  | "digital";

// Saniyedeki vurus sayisi (mekanik saatlerin gercek degerlerine yakin).
const BEATS_PER_SECOND: Record<TickProfile, number> = {
  none: 0,
  quartz: 1,
  wall: 1,
  pendulum: 1,
  pocket: 5, // 18.000 vurus/saat
  wrist: 8, // 28.800 vurus/saat (otomatik kol saati)
  alarm: 2,
  flap: 1 / 60, // flip saat: dakikada bir kart duser
};

let noiseBuffer: AudioBuffer | null = null;

function getNoise(ctx: AudioContext) {
  if (!noiseBuffer || noiseBuffer.sampleRate !== ctx.sampleRate) {
    noiseBuffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
  }
  return noiseBuffer;
}

function click(
  ctx: AudioContext,
  out: AudioNode,
  at: number,
  { freq, q = 6, dur, vol, type = "bandpass" }: { freq: number; q?: number; dur: number; vol: number; type?: BiquadFilterType }
) {
  const source = ctx.createBufferSource();
  source.buffer = getNoise(ctx);
  const filter = ctx.createBiquadFilter();
  filter.type = type;
  filter.frequency.value = freq;
  filter.Q.value = q;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(vol, at + 0.001);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  source.connect(filter).connect(gain).connect(out);
  source.start(at, Math.random() * 0.5);
  source.stop(at + dur + 0.02);
}

function ping(ctx: AudioContext, out: AudioNode, at: number, freq: number, dur: number, vol: number, type: OscillatorType = "sine") {
  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.value = freq;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(vol, at + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  osc.connect(gain).connect(out);
  osc.start(at);
  osc.stop(at + dur + 0.05);
}

// Tek bir tik. index: tik/tak ayrimi icin vurus sirasi.
function playTick(ctx: AudioContext, out: AudioNode, profile: TickProfile, at: number, index: number) {
  const alt = index % 2 === 0;
  switch (profile) {
    case "quartz":
      click(ctx, out, at, { freq: 3200, q: 4, dur: 0.012, vol: 0.35 });
      break;
    case "wall":
      click(ctx, out, at, { freq: alt ? 2300 : 1800, q: 8, dur: 0.03, vol: 0.6 });
      ping(ctx, out, at, alt ? 1150 : 950, 0.05, 0.08, "triangle");
      break;
    case "pendulum":
      // Buyuk ahsap kasa: derin "tok" ve govde yankisi.
      click(ctx, out, at, { freq: alt ? 1300 : 1000, q: 5, dur: 0.07, vol: 0.7 });
      ping(ctx, out, at, alt ? 190 : 165, 0.16, 0.22);
      ping(ctx, out, at + 0.003, alt ? 620 : 540, 0.08, 0.05, "triangle");
      break;
    case "pocket":
      click(ctx, out, at, { freq: alt ? 5200 : 4600, q: 10, dur: 0.009, vol: 0.28 });
      break;
    case "wrist":
      click(ctx, out, at, { freq: alt ? 6200 : 5600, q: 12, dur: 0.006, vol: 0.18 });
      break;
    case "alarm":
      // Metal kasali zilli calar saat: yuksek ve madeni.
      click(ctx, out, at, { freq: alt ? 3600 : 3000, q: 9, dur: 0.035, vol: 0.75 });
      ping(ctx, out, at, 2750, 0.06, 0.05, "square");
      break;
    case "flap":
      click(ctx, out, at, { freq: 2400, q: 1.2, dur: 0.035, vol: 0.55, type: "lowpass" });
      click(ctx, out, at + 0.045, { freq: 1800, q: 1.2, dur: 0.03, vol: 0.4, type: "lowpass" });
      break;
    default:
      break;
  }
}

// Kilise/salon cani: kismi harmonikler, uzun sonumlenme.
function bell(ctx: AudioContext, out: AudioNode, at: number, freq: number, vol: number, length = 3.2) {
  const partials: Array<[number, number, number]> = [
    [0.5, 0.35, 1],
    [1, 1, 0.8],
    [1.19, 0.45, 0.6],
    [1.5, 0.3, 0.5],
    [2, 0.4, 0.45],
    [2.52, 0.18, 0.3],
    [3.01, 0.12, 0.25],
  ];
  for (const [ratio, amp, decay] of partials) {
    ping(ctx, out, at, freq * ratio, length * decay, vol * amp);
  }
}

const WESTMINSTER = { gs: 415.3, fs: 369.99, e: 329.63, b: 246.94 };
const WESTMINSTER_PHRASES: Array<Array<keyof typeof WESTMINSTER>> = [
  ["gs", "fs", "e", "b"],
  ["e", "gs", "fs", "b"],
  ["e", "fs", "gs", "e"],
  ["gs", "e", "fs", "b"],
  ["b", "fs", "gs", "e"],
];

function cuckooCall(ctx: AudioContext, out: AudioNode, at: number, vol: number) {
  // Iki borulu "gu-guk": inen kucuk uclu, nefesli.
  for (const [offset, freq] of [
    [0, 700],
    [0.32, 585],
  ] as const) {
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq * 1.01, at + offset);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.985, at + offset + 0.26);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, at + offset);
    gain.gain.exponentialRampToValueAtTime(vol, at + offset + 0.03);
    gain.gain.setValueAtTime(vol, at + offset + 0.18);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + offset + 0.3);
    osc.connect(gain).connect(out);
    osc.start(at + offset);
    osc.stop(at + offset + 0.35);
    click(ctx, out, at + offset, { freq: freq * 2, q: 2, dur: 0.25, vol: vol * 0.08 });
  }
}

function westminster(ctx: AudioContext, out: AudioNode, at: number, strikes: number, v: number, pitch: number, pace: number) {
  let t = at;
  for (const phrase of WESTMINSTER_PHRASES.slice(1)) {
    for (const note of phrase) {
      bell(ctx, out, t, WESTMINSTER[note] * pitch, v * 0.22, 2.6 / Math.sqrt(pitch));
      t += 0.72 * pace;
    }
    t += 0.72 * pace;
  }
  t += 0.8 * pace;
  for (let i = 0; i < strikes; i += 1) {
    bell(ctx, out, t, 164.81 * pitch, v * 0.34, 4 / Math.sqrt(pitch));
    t += 1.9 * pace;
  }
  return t - at + 2;
}

/** Gemi canlari: 4 saatlik vardiyada her yarim saat bir vurus eklenir (1-8), ciftler halinde. */
export function shipBellCount(date: Date) {
  const halfHours = (date.getHours() % 4) * 2 + (date.getMinutes() >= 30 ? 1 : 0);
  return halfHours === 0 ? 8 : halfHours;
}

/** Calma araligi: gemi canlari yarim saatte bir, digerleri saat basi. */
export function chimeIntervalMs(profile: ChimeProfile) {
  return profile === "ship" ? 1800000 : 3600000;
}

/** Saat basi calmasini planlar; toplam suresini (sn) dondurur. */
export function scheduleChime(ctx: AudioContext, out: AudioNode, profile: ChimeProfile, at: number, when: Date, volume: number) {
  const strikes = when.getHours() % 12 || 12;
  const v = Math.max(0.02, Math.min(1, volume));
  switch (profile) {
    case "westminster":
      return westminster(ctx, out, at, strikes, v, 1, 1);
    case "tower":
      // Buyuk kule: bir oktav pes, daha agir tempo.
      return westminster(ctx, out, at, strikes, v * 1.1, 0.5, 1.35);
    case "mantel":
      // Somine saati: ince teller, hizli tempo.
      return westminster(ctx, out, at, strikes, v * 0.8, 2, 0.7);
    case "school": {
      // Elektrikli okul zili: cekic saniyede ~22 kez vurur.
      for (let i = 0; i < 48; i += 1) {
        const t = at + i * 0.045;
        ping(ctx, out, t, 1480, 0.09, v * 0.12, "triangle");
        ping(ctx, out, t, 3720, 0.04, v * 0.05);
      }
      return 2.6;
    }
    case "ship": {
      const count = shipBellCount(when);
      let t = at;
      for (let i = 0; i < count; i += 1) {
        bell(ctx, out, t, 880, v * 0.26, 2.2);
        t += i % 2 === 0 ? 0.42 : 1.15;
      }
      return t - at + 2;
    }
    case "cuckoo": {
      for (let i = 0; i < strikes; i += 1) cuckooCall(ctx, out, at + i * 1.05, v * 0.32);
      return strikes * 1.05 + 0.5;
    }
    case "bell": {
      for (let i = 0; i < strikes; i += 1) bell(ctx, out, at + i * 1.6, 220, v * 0.3, 3.4);
      return strikes * 1.6 + 2;
    }
    case "ring": {
      // Iki can arasinda cekic: hizli vuruslar.
      for (let i = 0; i < 26; i += 1) {
        const t = at + i * 0.055;
        ping(ctx, out, t, i % 2 ? 2480 : 2210, 0.12, v * 0.14);
        ping(ctx, out, t, i % 2 ? 5100 : 4600, 0.05, v * 0.05);
      }
      return 1.8;
    }
    case "beep": {
      ping(ctx, out, at, 4000, 0.07, v * 0.12, "square");
      ping(ctx, out, at + 0.14, 4000, 0.07, v * 0.12, "square");
      return 0.4;
    }
    case "digital": {
      ping(ctx, out, at, 1318.5, 0.35, v * 0.22);
      ping(ctx, out, at + 0.18, 1760, 0.5, v * 0.2);
      return 0.8;
    }
    default:
      return 0;
  }
}

export type ClockSoundConfig = {
  tick: TickProfile;
  chime: ChimeProfile;
  tickOn: boolean;
  chimeOn: boolean;
  volume: number;
  onChime?: (hour24: number, durationMs: number) => void;
};

/** Gercek saate kilitli ses dongusu. Donen fonksiyonlarla guncellenir/durdurulur. */
export function startClockSound(initial: ClockSoundConfig) {
  const ctx = unlockAudio();
  if (!ctx) return { update: () => {}, stop: () => {} };
  let config = initial;
  const master = ctx.createGain();
  master.gain.value = config.volume;
  master.connect(ctx.destination);

  let scheduledUntil = Date.now();
  const timers = new Set<number>();

  const loop = () => {
    const nowMs = Date.now();
    const horizon = nowMs + 200;
    const toCtx = (ms: number) => ctx.currentTime + Math.max(0, ms - nowMs) / 1000;

    const bps = BEATS_PER_SECOND[config.tick];
    if (config.tickOn && bps > 0) {
      const beatMs = 1000 / bps;
      let beat = Math.floor(scheduledUntil / beatMs) + 1;
      for (; beat * beatMs <= horizon; beat += 1) {
        if (beat * beatMs < nowMs - 20) continue;
        playTick(ctx, master, config.tick, toCtx(beat * beatMs), beat);
      }
    }

    if (config.chimeOn && config.chime !== "none") {
      const stepMs = chimeIntervalMs(config.chime);
      const offset = new Date().getTimezoneOffset() * 60000;
      const nextHour = Math.floor((scheduledUntil - offset) / stepMs + 1) * stepMs + offset;
      if (nextHour > scheduledUntil && nextHour <= horizon) {
        const when = new Date(nextHour + 1000);
        const hour = when.getHours();
        const seconds = scheduleChime(ctx, master, config.chime, toCtx(nextHour), when, 1);
        const id = window.setTimeout(() => {
          timers.delete(id);
          config.onChime?.(hour, seconds * 1000);
        }, Math.max(0, nextHour - nowMs));
        timers.add(id);
      }
    }

    scheduledUntil = horizon;
  };

  loop();
  const interval = window.setInterval(loop, 60);

  return {
    update(next: ClockSoundConfig) {
      config = next;
      master.gain.setTargetAtTime(next.volume, ctx.currentTime, 0.05);
    },
    stop() {
      window.clearInterval(interval);
      for (const id of timers) window.clearTimeout(id);
      master.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.03);
      window.setTimeout(() => master.disconnect(), 400);
    },
  };
}

/** "Dinle" dugmesi: su anki saatin calmasini hemen calar. */
export function previewChime(profile: ChimeProfile, volume: number) {
  const ctx = unlockAudio();
  if (!ctx) return 0;
  const out = ctx.createGain();
  out.gain.value = volume;
  out.connect(ctx.destination);
  const seconds = scheduleChime(ctx, out, profile, ctx.currentTime + 0.05, new Date(), 1);
  window.setTimeout(() => out.disconnect(), (seconds + 1) * 1000);
  return seconds;
}
