"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function DocumentLanguage() {
  const pathname = usePathname();
  const locale =
    pathname === "/en" || pathname.startsWith("/en/")
      ? "en"
      : pathname === "/de" || pathname.startsWith("/de/")
        ? "de"
        : "tr";

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
