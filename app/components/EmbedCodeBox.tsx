"use client";

import { useEffect, useRef, useState } from "react";
import { DecorativeIcon } from "./siteIcons";
import { buildSiteUrl } from "../siteConfig";

export default function EmbedCodeBox({
  embedPath,
  title,
  height = 560,
  maxWidth = 480,
}: {
  embedPath: string;
  title: string;
  height?: number;
  maxWidth?: number;
}) {
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const [showCode, setShowCode] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const snippet = `<iframe src="${buildSiteUrl(
    embedPath
  )}" width="100%" height="${height}" style="border:0;max-width:${maxWidth}px" title="${title}"></iframe>`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopyState("copied");

      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }

      copyTimeoutRef.current = setTimeout(() => {
        setCopyState("idle");
      }, 1500);
    } catch {
      // Pano erişimi engellenmiş olabilir; sessizce yoksay.
    }
  }

  return (
    <div className="embed-widget-badge">
      <span className="embed-widget-badge-pin" aria-hidden="true" />

      <span className="embed-widget-badge-icon" aria-hidden="true">
        <DecorativeIcon name="embed" size={22} />
      </span>

      <p className="embed-widget-badge-title">Sitene ücretsiz ekle</p>
      <p className="embed-widget-badge-text">
        Bu aracı kendi sitene göm, ziyaretçilerin çevrimiçi kullansın.
      </p>

      <button type="button" onClick={handleCopy}>
        {copyState === "copied" ? "Kopyalandı ✓" : "Kodu Kopyala"}
      </button>

      <button
        type="button"
        className="embed-widget-badge-toggle"
        onClick={() => {
          setShowCode((current) => !current);
        }}
      >
        {showCode ? "Kodu gizle" : "Kodu görüntüle"}
      </button>

      {showCode && <code className="embed-code-box-snippet">{snippet}</code>}
    </div>
  );
}
