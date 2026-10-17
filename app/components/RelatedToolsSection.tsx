"use client";

import Link from "@/app/components/SiteLink";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  findRelatedTools,
  localeFromPathname,
  type RelatedIndexItem,
} from "../converter/relatedTools";
import { isTrackablePath } from "../converter/recentTools";

const headingByLocale: Record<string, string> = {
  tr: "İlgili Araçlar",
  en: "Related Tools",
  de: "Ähnliche Rechner",
  uz: "Tegishli vositalar",
  ar: "أدوات ذات صلة",
};

// Sayfanin altinda ayni kategorideki araclari listeler. Arama dizini yalnizca bolum
// gorunur olunca indirilir; dizinde sayfa yoksa veya istek basarisizsa hicbir sey gosterilmez.
export default function RelatedToolsSection() {
  const pathname = usePathname();
  const anchor = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<{ path: string; items: RelatedIndexItem[] } | null>(null);
  const trackable = !!pathname && isTrackablePath(pathname);

  useEffect(() => {
    const node = anchor.current;
    if (!trackable || !pathname || !node || typeof IntersectionObserver === "undefined") return;
    let cancelled = false;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      fetch(`/arama-dizini/${localeFromPathname(pathname)}.json`)
        .then((r) => r.json())
        .then((data: RelatedIndexItem[]) => {
          if (!cancelled) setState({ path: pathname, items: findRelatedTools(data, pathname) });
        })
        .catch(() => {});
    }, { rootMargin: "300px" });
    observer.observe(node);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [pathname, trackable]);

  const items = state && state.path === pathname ? state.items : [];

  return (
    <div ref={anchor}>
      {trackable && pathname && items.length > 0 ? (
        <section className="recent-tools-section">
          <div className="recent-tools-heading-row">
            <h2>{headingByLocale[localeFromPathname(pathname)] ?? headingByLocale.en}</h2>
          </div>
          <ul className="recent-tools-list">
            {items.map((item) => (
              <li key={item.id}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
