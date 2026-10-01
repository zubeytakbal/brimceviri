"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";

export type TrustBarSource = {
  label: string;
  href: string;
};

export default function TrustBar({
  creator = "Emirhan",
  sources,
  lastVerified,
}: {
  creator?: string;
  sources: TrustBarSource[];
  lastVerified: string;
}) {
  const [sourcesOpen, setSourcesOpen] = useState(false);

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

      </div>
    </div>
  );
}
