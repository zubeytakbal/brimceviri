"use client";

import { useEffect } from "react";

/** Birleştirilmiş sayfalar: eski adresten ?param=id ile gelen ziyaretçiyi o bölüme kaydırır. */
export default function ScrollToQuery({ param }: { param: string }) {
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const id = new URLSearchParams(window.location.search).get(param);
      if (id && /^[a-z0-9-]+$/.test(id)) document.getElementById(id)?.scrollIntoView();
    });
    return () => cancelAnimationFrame(frame);
  }, [param]);
  return null;
}
