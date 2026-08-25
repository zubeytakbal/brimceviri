"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { recordRecentTool } from "../converter/recentTools";

// Yalnizca gercek arac/icerik sayfalarini (tek bir donusum, tek bir
// hesaplayici, tek bir birim rehberi, tek bir kategori sayfasi) izliyoruz
// -- sadece baska sayfalari listeleyen saf dizin/hub sayfalarini
// (anasayfa, "Diger Donusumler", "Muhendislik Hesaplayicilari", "Tum
// Birimler") degil, cunku bunlarin kendisi bir "arac" degil.
const EXCLUDED_PATHS = new Set([
  "/",
  "/en",
  "/de",
  "/diger-donusumler",
  "/en/other-conversions",
  "/muhendislik-hesaplayicilari",
  "/en/engineering-calculators",
  "/de/ingenieurrechner",
  "/muhendislik-hesaplayicilari/elektrik-hesaplari",
  "/en/engineering-calculators/electrical-calculators",
  "/de/ingenieurrechner/elektrorechner",
  "/tum-birimler",
  "/en/all-conversions",
  "/de/alle-umrechnungen",
  "/gelistirici-api",
  "/cevrimdisi",
]);

const EXCLUDED_PREFIXES = ["/embed/", "/api/"];

export default function RecentToolsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    if (EXCLUDED_PATHS.has(pathname)) {
      return;
    }

    if (EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
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
