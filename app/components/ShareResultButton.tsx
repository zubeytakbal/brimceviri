"use client";

import { useState } from "react";

type ShareResultButtonProps = {
  shareText: string;
  shareUrl: string;
};

export default function ShareResultButton({ shareText, shareUrl }: ShareResultButtonProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  async function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ text: shareText, url: shareUrl });
        return;
      } catch {
        // Kullanıcı paylaşımı iptal etti ya da tarayıcı reddetti --
        // panoya kopyalama yedegine dus.
      }
    }

    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2500);
    } catch {
      setCopyState("error");
      setTimeout(() => setCopyState("idle"), 2500);
    }
  }

  return (
    <button type="button" className="share-result-button" onClick={handleShare}>
      {copyState === "copied"
        ? "Kopyalandı ✓"
        : copyState === "error"
          ? "Kopyalanamadı"
          : "Sonucu Paylaş"}
    </button>
  );
}
