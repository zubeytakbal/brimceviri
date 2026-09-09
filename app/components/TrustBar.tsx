"use client";

import { useEffect, useState } from "react";
import { CaretDown, ThumbsDown, ThumbsUp } from "@phosphor-icons/react";
import { getVoteForPage, recordVoteForPage } from "../converter/voteTracking";

export type TrustBarSource = {
  label: string;
  href: string;
};

export default function TrustBar({
  pageId,
  creator = "Emirhan",
  sources,
  lastVerified,
}: {
  pageId: string;
  creator?: string;
  sources: TrustBarSource[];
  lastVerified: string;
}) {
  const [counts, setCounts] = useState<{ up: number; down: number } | null>(null);
  const [myVote, setMyVote] = useState<"up" | "down" | null>(null);
  const [sourcesOpen, setSourcesOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const vote = getVoteForPage(pageId);
      const response = await fetch(`/api/vote?pageId=${encodeURIComponent(pageId)}`).catch(
        () => null,
      );
      const data = response && response.ok ? await response.json().catch(() => null) : null;

      if (cancelled) return;
      setMyVote(vote);
      if (data) setCounts({ up: data.up, down: data.down });
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [pageId]);

  function handleVote(vote: "up" | "down") {
    if (myVote) return;
    setMyVote(vote);
    recordVoteForPage(pageId, vote);
    setCounts((prev) => ({
      up: (prev?.up ?? 0) + (vote === "up" ? 1 : 0),
      down: (prev?.down ?? 0) + (vote === "down" ? 1 : 0),
    }));
    fetch("/api/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageId, vote }),
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (data) setCounts({ up: data.up, down: data.down });
      })
      .catch(() => undefined);
  }

  return (
    <div className="trust-bar">
      <div className="trust-bar-row">
        <span className="trust-bar-item">
          <strong>Oluşturan:</strong> {creator}
        </span>
        <span className="trust-bar-item">
          <strong>Son doğrulama:</strong> {lastVerified}
        </span>
      </div>

      <div className="trust-bar-row">
        <div className="trust-bar-sources">
          <button
            type="button"
            className="trust-bar-sources-toggle"
            onClick={() => setSourcesOpen((open) => !open)}
            aria-expanded={sourcesOpen}
          >
            📚 {sources.length} kaynağa dayanıyor{" "}
            <CaretDown size={14} weight="bold" className={sourcesOpen ? "is-open" : undefined} />
          </button>
          {sourcesOpen && (
            <ul className="trust-bar-sources-list">
              {sources.map((source) => (
                <li key={source.href}>
                  <a href={source.href} target="_blank" rel="noopener noreferrer nofollow">
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="trust-bar-votes">
          <button
            type="button"
            className={`trust-bar-vote-button${myVote === "up" ? " is-active" : ""}`}
            onClick={() => handleVote("up")}
            disabled={myVote !== null}
            aria-label="Faydalı buldum"
          >
            <ThumbsUp size={16} weight={myVote === "up" ? "fill" : "regular"} />
            {counts ? counts.up : "…"}
          </button>
          <button
            type="button"
            className={`trust-bar-vote-button${myVote === "down" ? " is-active" : ""}`}
            onClick={() => handleVote("down")}
            disabled={myVote !== null}
            aria-label="Faydalı bulmadım"
          >
            <ThumbsDown size={16} weight={myVote === "down" ? "fill" : "regular"} />
            {counts ? counts.down : "…"}
          </button>
        </div>
      </div>
    </div>
  );
}
