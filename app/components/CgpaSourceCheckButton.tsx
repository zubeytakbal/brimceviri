"use client";

// Resmi kaynagi istek uzerine kontrol eder ve sonucu kaynak linkiyle gosterir.
import { useState } from "react";

type CheckResponse = {
  status: "baseline_established" | "unchanged" | "changed" | "fetch_error" | "unknown";
  checkedAt: string | null;
  cached: boolean;
  alertActive: boolean;
  sourceUrl: string;
};

function formatTime(iso: string | null) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso));
}

export default function CgpaSourceCheckButton({ slug, sourceUrl, sourceTitle }: { slug: string; sourceUrl: string; sourceTitle: string }) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [result, setResult] = useState<CheckResponse | null>(null);

  const check = async () => {
    setState("loading");
    try {
      const response = await fetch("/api/cgpa-source-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      if (!response.ok) throw new Error(String(response.status));
      setResult((await response.json()) as CheckResponse);
      setState("done");
    } catch {
      setState("error");
    }
  };

  let message: string | null = null;
  if (state === "done" && result) {
    const when = formatTime(result.checkedAt);
    if (result.alertActive || result.status === "changed") {
      message = `⚠ The official source has changed${when ? ` (checked ${when})` : ""}. We are re-checking the formula — confirm your result with the official document below.`;
    } else if (result.status === "unchanged" || result.status === "baseline_established") {
      message = `✓ Official source checked${when ? ` ${when}` : ""}: no change since the formula was verified.`;
    } else if (result.status === "fetch_error") {
      message = `The official website could not be reached${when ? ` (${when})` : ""}. The formula on this page is the last verified version.`;
    } else {
      message = "The official source has not been checked yet. The formula on this page is the last verified version.";
    }
  }

  return (
    <div className="cgpa-source-check">
      <button type="button" className="engineering-target-button" onClick={check} disabled={state === "loading"}>
        {state === "loading" ? "Checking the official source…" : "Check the official source now"}
      </button>
      <p aria-live="polite" className="cgpa-source-check-result">
        {state === "error"
          ? "The check could not be completed right now. The formula on this page is the last verified version."
          : (message ?? "Compares the official document with the version this formula was verified against.")}{" "}
        Source:{" "}
        <a href={sourceUrl} rel="noopener noreferrer" target="_blank">
          {sourceTitle}
        </a>
      </p>
    </div>
  );
}
