"use client";

import { useEffect, useRef } from "react";

// Sends what visitors type into the site search to Google Analytics 4, so we
// can see which tools people look for — above all the searches that return
// nothing (search_no_results), which are direct ideas for new tools.
// Events fire after the visitor stops typing, at most once per distinct term.

type Gtag = (command: "event", name: string, params: Record<string, string | number>) => void;

const PAUSE_MS = 1500;
const MIN_LENGTH = 3;
const MAX_LENGTH = 100;

/** Drops input that could be personal data (e-mail addresses, long digit runs such as phone numbers). */
export function sanitizeSearchTerm(raw: string): string | null {
  const term = raw.trim().replace(/\s+/g, " ").slice(0, MAX_LENGTH).toLocaleLowerCase();
  if (term.length < MIN_LENGTH) return null;
  if (/\S+@\S+/.test(term)) return null;
  if (/\d[\d\s-]{7,}\d/.test(term)) return null;
  return term;
}

export function useSearchTracking(locale: string, query: string, resultCount: number) {
  const sent = useRef(new Set<string>());

  useEffect(() => {
    const term = sanitizeSearchTerm(query);
    if (!term || sent.current.has(term)) return;
    const timer = window.setTimeout(() => {
      const gtag = (window as unknown as { gtag?: Gtag }).gtag;
      if (typeof gtag !== "function") return;
      sent.current.add(term);
      const params = { search_term: term, results_count: resultCount, site_locale: locale };
      gtag("event", "search", params);
      if (resultCount === 0) gtag("event", "search_no_results", params);
    }, PAUSE_MS);
    return () => window.clearTimeout(timer);
  }, [locale, query, resultCount]);
}
