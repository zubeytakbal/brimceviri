// Tek basina "uygulama" olarak yuklenebilen zaman araclari (PWA). Her birinin
// kendi manifesti (/manifests/<id>) ve simgesi (/app-icons/<id>/<boyut>) vardir;
// boylece kullanici ornegin yalnizca "Online Saat"i masaustune/ana ekrana koyabilir.
export type AppIconKind = "clock" | "alarm" | "timer" | "stopwatch" | "tomato" | "globe" | "interval";

export type InstallableApp = {
  id: string;
  lang: "tr" | "en";
  path: string;
  name: string;
  shortName: string;
  description: string;
  icon: AppIconKind;
  background: string;
  accent: string;
  fullscreen?: boolean;
};

const tr = (id: string, path: string, name: string, shortName: string, description: string, icon: AppIconKind, background: string, accent: string, fullscreen = false): InstallableApp => ({
  id,
  lang: "tr",
  path,
  name,
  shortName,
  description,
  icon,
  background,
  accent,
  fullscreen,
});
const en = (id: string, path: string, name: string, shortName: string, description: string, icon: AppIconKind, background: string, accent: string, fullscreen = false): InstallableApp => ({
  id,
  lang: "en",
  path,
  name,
  shortName,
  description,
  icon,
  background,
  accent,
  fullscreen,
});

export const installableApps: InstallableApp[] = [
  tr("saat", "/online-saat", "Online Saat — BirimCeviri", "Saat", "34 temalı canlı saat: sarkaçlı, guguklu, flip, neon; tam ekran masa saati.", "clock", "#1f4f66", "#3fa7a7", true),
  tr("alarm", "/online-alarm-kur", "Online Alarm — BirimCeviri", "Alarm", "Tekrarlayan alarm, kendi müziğin ve erteleme.", "alarm", "#8e1616", "#ef5350"),
  tr("zamanlayici", "/zamanlayici", "Zamanlayıcı — BirimCeviri", "Zamanlayıcı", "Sesli geri sayım: 10 saniyeden 24 saate.", "timer", "#0f5d34", "#22a35a"),
  tr("kronometre", "/kronometre", "Kronometre — BirimCeviri", "Kronometre", "Salise hassasiyetinde kronometre ve tur kaydı.", "stopwatch", "#13315c", "#3b7ddd"),
  tr("pomodoro", "/pomodoro", "Pomodoro — BirimCeviri", "Pomodoro", "25 dakika odak, 5 dakika mola; günlük odak süresi.", "tomato", "#7a1f2b", "#f07a4a"),
  tr("dunya-saatleri", "/dunya-saatleri", "Dünya Saatleri — BirimCeviri", "Dünya Saatleri", "97 şehrin canlı saati ve saat farkları.", "globe", "#0b1026", "#5b8def"),
  tr("tabata", "/tabata-zamanlayici", "Tabata Zamanlayıcı — BirimCeviri", "Tabata", "Tabata ve HIIT için sesli aralık zamanlayıcı.", "interval", "#1f2937", "#22a35a"),
  en("clock", "/en/online-clock", "Online Clock — BirimCeviri", "Clock", "Live clock with 34 themes and a full screen desk clock.", "clock", "#1f4f66", "#3fa7a7", true),
  en("alarm-clock", "/en/alarm-clock", "Alarm Clock — BirimCeviri", "Alarm", "Repeating alarms, your own sound and snooze.", "alarm", "#8e1616", "#ef5350"),
  en("timer", "/en/timer", "Timer — BirimCeviri", "Timer", "Countdown timer from 10 seconds to 24 hours.", "timer", "#0f5d34", "#22a35a"),
  en("stopwatch", "/en/stopwatch", "Stopwatch — BirimCeviri", "Stopwatch", "Stopwatch with laps to the hundredth of a second.", "stopwatch", "#13315c", "#3b7ddd"),
  en("pomodoro-timer", "/en/pomodoro-timer", "Pomodoro Timer — BirimCeviri", "Pomodoro", "25-minute focus sessions with breaks and daily stats.", "tomato", "#7a1f2b", "#f07a4a"),
  en("world-clock", "/en/world-clock", "World Clock — BirimCeviri", "World Clock", "Live time in 97 cities with time differences.", "globe", "#0b1026", "#5b8def"),
  en("interval-timer", "/en/interval-timer", "Interval Timer — BirimCeviri", "Intervals", "Tabata and HIIT interval timer with voice cues.", "interval", "#1f2937", "#22a35a"),
];

export function findInstallableApp(id: string) {
  return installableApps.find((app) => app.id === id) ?? null;
}

export function appManifestPath(id: string) {
  return `/manifests/${id}`;
}

/** Simge SVG'si (512 birim). Maskelenebilir: onemli cizim merkezdeki %60 alanda. */
export function appIconSvg(app: InstallableApp) {
  const face = (inner: string) =>
    `<circle cx="256" cy="256" r="150" fill="#ffffff"/>${inner}<circle cx="256" cy="256" r="12" fill="${app.background}"/>`;
  const hands = `<line x1="256" y1="256" x2="256" y2="160" stroke="${app.background}" stroke-width="18" stroke-linecap="round"/><line x1="256" y1="256" x2="320" y2="290" stroke="${app.background}" stroke-width="14" stroke-linecap="round"/>`;
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6;
    const x1 = 256 + Math.sin(a) * 128;
    const y1 = 256 - Math.cos(a) * 128;
    const x2 = 256 + Math.sin(a) * (i % 3 === 0 ? 108 : 116);
    const y2 = 256 - Math.cos(a) * (i % 3 === 0 ? 108 : 116);
    return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${app.accent}" stroke-width="${i % 3 === 0 ? 10 : 6}" stroke-linecap="round"/>`;
  }).join("");
  let body = "";
  switch (app.icon) {
    case "clock":
      body = face(ticks + hands);
      break;
    case "alarm":
      body = `<path d="M150 170 A60 60 0 0 1 220 110" fill="none" stroke="#ffffff" stroke-width="26" stroke-linecap="round"/><path d="M362 170 A60 60 0 0 0 292 110" fill="none" stroke="#ffffff" stroke-width="26" stroke-linecap="round"/>${face(ticks + hands)}<line x1="190" y1="400" x2="170" y2="425" stroke="#ffffff" stroke-width="20" stroke-linecap="round"/><line x1="322" y1="400" x2="342" y2="425" stroke="#ffffff" stroke-width="20" stroke-linecap="round"/>`;
      break;
    case "timer":
      body = `<circle cx="256" cy="266" r="140" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="34"/><path d="M256 126 A140 140 0 1 1 135 336" fill="none" stroke="#ffffff" stroke-width="34" stroke-linecap="round"/><rect x="226" y="86" width="60" height="26" rx="10" fill="#ffffff"/><line x1="256" y1="266" x2="256" y2="190" stroke="#ffffff" stroke-width="20" stroke-linecap="round"/>`;
      break;
    case "stopwatch":
      body = `<rect x="230" y="84" width="52" height="34" rx="10" fill="#ffffff"/><rect x="336" y="126" width="34" height="22" rx="8" fill="#ffffff" transform="rotate(40 353 137)"/>${face(ticks)}<line x1="256" y1="256" x2="300" y2="170" stroke="${app.accent}" stroke-width="16" stroke-linecap="round"/>`;
      break;
    case "tomato":
      body = `<ellipse cx="256" cy="280" rx="160" ry="140" fill="#ef4444"/><ellipse cx="206" cy="236" rx="40" ry="26" fill="#ffffff" opacity="0.28"/><path d="M256 150 L226 118 L256 132 L286 104 L276 142 L320 132 L284 164 L256 176 L222 166 L186 140 L232 146 Z" fill="#3fa34d"/><line x1="256" y1="140" x2="262" y2="96" stroke="#3fa34d" stroke-width="14" stroke-linecap="round"/>`;
      break;
    case "globe":
      body = `<circle cx="256" cy="256" r="150" fill="none" stroke="#ffffff" stroke-width="18"/><ellipse cx="256" cy="256" rx="64" ry="150" fill="none" stroke="#ffffff" stroke-width="14"/><line x1="106" y1="256" x2="406" y2="256" stroke="#ffffff" stroke-width="14"/><path d="M128 186 Q256 216 384 186 M128 326 Q256 296 384 326" fill="none" stroke="#ffffff" stroke-width="12"/><circle cx="330" cy="150" r="26" fill="${app.accent}"/>`;
      break;
    case "interval":
      body = `<rect x="110" y="300" width="60" height="90" rx="12" fill="#ffffff"/><rect x="190" y="220" width="60" height="170" rx="12" fill="${app.accent}"/><rect x="270" y="270" width="60" height="120" rx="12" fill="#ffffff"/><rect x="350" y="170" width="60" height="220" rx="12" fill="${app.accent}"/><path d="M130 190 L230 130 L300 170 L400 110" fill="none" stroke="#ffffff" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>`;
      break;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${app.background}"/><stop offset="1" stop-color="${app.accent}"/></linearGradient></defs><rect width="512" height="512" fill="url(#g)"/>${body}</svg>`;
}
