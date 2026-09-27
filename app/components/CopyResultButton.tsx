"use client";

import { useEffect, useState } from "react";

const copyLabels: Record<string, { copy: string; copied: string }> = {
  tr: { copy: "Kopyala", copied: "Kopyalandı" },
  en: { copy: "Copy", copied: "Copied" },
  de: { copy: "Kopieren", copied: "Kopiert" },
  ar: { copy: "نسخ", copied: "تم النسخ" },
  uz: { copy: "Nusxalash", copied: "Nusxalandi" },
  bn: { copy: "কপি", copied: "কপি হয়েছে" },
  fr: { copy: "Copier", copied: "Copié" },
  es: { copy: "Copiar", copied: "Copiado" },
  "es-419": { copy: "Copiar", copied: "Copiado" },
  pt: { copy: "Copiar", copied: "Copiado" },
  it: { copy: "Copia", copied: "Copiato" },
  nl: { copy: "Kopiëren", copied: "Gekopieerd" },
  ru: { copy: "Копировать", copied: "Скопировано" },
  sv: { copy: "Kopiera", copied: "Kopierat" },
  no: { copy: "Kopier", copied: "Kopiert" },
  da: { copy: "Kopiér", copied: "Kopieret" },
};

async function writeClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  }
}

export default function CopyResultButton({
  text,
  locale,
  className,
}: {
  text: string;
  locale: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const labels = copyLabels[locale] ?? copyLabels.en;

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  return (
    <button
      type="button"
      className={`copy-result-button${copied ? " is-copied" : ""}${
        className ? ` ${className}` : ""
      }`}
      disabled={!text}
      onClick={async () => {
        if (await writeClipboard(text)) {
          setCopied(true);
        }
      }}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16">
        {copied ? (
          <path
            d="M5 12.5l4.5 4.5L19 7.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <>
            <rect
              x="8.5"
              y="8.5"
              width="11"
              height="11"
              rx="2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M15.5 5.5V5a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 5v8A1.5 1.5 0 0 0 6 14.5h.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </>
        )}
      </svg>
      <span aria-live="polite">{copied ? labels.copied : labels.copy}</span>
    </button>
  );
}
