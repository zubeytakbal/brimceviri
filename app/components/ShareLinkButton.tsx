"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { buildShareUrl } from "../converter/shareLink";
import { isTrackablePath } from "../converter/recentTools";

// Arac sayfalarinda baglantiyi panoya kopyalar (tarayici izin vermezse sessizce hicbir sey yapmaz).
export default function ShareLinkButton() {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  if (!pathname || !isTrackablePath(pathname)) return null;

  const label = copied ? "Bağlantı kopyalandı / Link copied" : "Bağlantıyı kopyala / Copy link";

  return (
    <button
      type="button"
      className={`share-link-button${copied ? " is-copied" : ""}`}
      aria-label={label}
      title={label}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(buildShareUrl(window.location.href));
          setCopied(true);
        } catch {
          // panoya yazilamadi -- sessizce yoksay
        }
      }}
    >
      {copied ? "✓" : "🔗"}
    </button>
  );
}
