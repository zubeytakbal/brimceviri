"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function DocumentLanguage() {
  const pathname = usePathname();
  const isEnglish =
    pathname === "/en" || pathname.startsWith("/en/");

  useEffect(() => {
    document.documentElement.lang = isEnglish ? "en" : "tr";
  }, [isEnglish]);

  return null;
}
