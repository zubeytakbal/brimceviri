"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import {
  clearRecentTools,
  getRecentToolsServerSnapshot,
  getRecentToolsSnapshot,
  subscribeToRecentTools,
} from "../converter/recentTools";

const copyByLocale = {
  tr: { heading: "Son Baktiklarin", clear: "Temizle" },
  en: { heading: "Recently Viewed", clear: "Clear" },
  ar: { heading: "شوهدت مؤخرا", clear: "مسح" },
} as const;

export default function RecentToolsWidget({
  locale = "tr",
}: {
  locale?: "tr" | "en" | "ar";
}) {
  const items = useSyncExternalStore(
    subscribeToRecentTools,
    getRecentToolsSnapshot,
    getRecentToolsServerSnapshot
  );

  if (items.length === 0) {
    return null;
  }

  const strings = copyByLocale[locale];

  return (
    <section className="recent-tools-section">
      <div className="recent-tools-heading-row">
        <h2>{strings.heading}</h2>
        <button
          type="button"
          className="recent-tools-clear"
          onClick={() => clearRecentTools()}
        >
          {strings.clear}
        </button>
      </div>
      <ul className="recent-tools-list">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
