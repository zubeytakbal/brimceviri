"use client";

import { useEffect, useState } from "react";

// "Uygulama olarak yukle": Chrome/Edge/Android'de tek tik (beforeinstallprompt),
// iPhone/iPad'de Paylas -> Ana Ekrana Ekle talimati. Zaten yuklu acildiysa gizlenir.
type PromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: "accepted" | "dismissed" }> };
type Mode = "hidden" | "prompt" | "ios" | "installed";

declare global {
  interface Window {
    __bcInstallPrompt?: PromptEvent;
  }
}

const COPY = {
  tr: {
    install: (name: string) => `📲 ${name} uygulamasını yükle`,
    ios: (name: string) => `📲 ${name}'i ana ekrana eklemek için Safari'de Paylaş ⎋ düğmesine, sonra "Ana Ekrana Ekle"ye dokun.`,
    installed: "✓ Uygulama yüklendi — ana ekranından ya da masaüstünden açabilirsin.",
    hint: "Kendi simgesiyle açılır, internet yokken de çalışır.",
  },
  en: {
    install: (name: string) => `📲 Install the ${name} app`,
    ios: (name: string) => `📲 To add ${name} to your home screen, tap Share ⎋ in Safari, then "Add to Home Screen".`,
    installed: "✓ App installed — open it from your home screen or desktop.",
    hint: "Opens with its own icon and works offline.",
  },
};

export default function InstallAppButton({ name, lang }: { name: string; lang: "tr" | "en" }) {
  const [mode, setMode] = useState<Mode>("hidden");
  const copy = COPY[lang];

  useEffect(() => {
    const standalone = window.matchMedia("(display-mode: standalone)").matches || window.matchMedia("(display-mode: fullscreen)").matches;
    if (standalone) return;
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) && !/crios|fxios/i.test(navigator.userAgent);
    const ready = () => setMode(window.__bcInstallPrompt ? "prompt" : ios ? "ios" : "hidden");
    const frame = requestAnimationFrame(ready);
    const installed = () => setMode("installed");
    window.addEventListener("bc-install-ready", ready);
    window.addEventListener("appinstalled", installed);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("bc-install-ready", ready);
      window.removeEventListener("appinstalled", installed);
    };
  }, []);

  if (mode === "hidden") return null;

  const install = async () => {
    const event = window.__bcInstallPrompt;
    if (!event) return;
    await event.prompt();
    const choice = await event.userChoice;
    window.__bcInstallPrompt = undefined;
    setMode(choice.outcome === "accepted" ? "installed" : "hidden");
  };

  return (
    <div className="install-app">
      {mode === "prompt" && (
        <>
          <button type="button" className="time-tool-button" onClick={() => void install()}>
            {copy.install(name)}
          </button>
          <small>{copy.hint}</small>
        </>
      )}
      {mode === "ios" && <p>{copy.ios(name)}</p>}
      {mode === "installed" && <p>{copy.installed}</p>}
    </div>
  );
}
