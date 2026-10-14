"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { isTrackablePath, recordRecentTool } from "../converter/recentTools";

export default function RecentToolsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    if (!isTrackablePath(pathname)) {
      return;
    }

    const rawTitle = document.title;
    const title = rawTitle.split(" | ")[0]?.trim();

    if (!title) {
      return;
    }

    recordRecentTool({ href: pathname, title });
  }, [pathname]);

  return null;
}
