"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import {
  getFavoritesServerSnapshot,
  getFavoritesSnapshot,
  subscribeToFavorites,
  toggleFavorite,
} from "../converter/favoriteTools";
import { getFloatingButtonLabels } from "../converter/floatingButtonLabels";
import { isTrackablePath } from "../converter/recentTools";

// Arac sayfalarinda sag altta kucuk bir yildiz dugmesi; sayfayi favorilere ekler/cikarir.
export default function FavoriteToggle() {
  const pathname = usePathname();
  const favorites = useSyncExternalStore(subscribeToFavorites, getFavoritesSnapshot, getFavoritesServerSnapshot);

  if (!pathname || !isTrackablePath(pathname)) return null;

  const active = favorites.some((item) => item.href === pathname);
  const labels = getFloatingButtonLabels(pathname);
  const label = active ? labels.favoriteRemove : labels.favoriteAdd;

  return (
    <button
      type="button"
      className={`favorite-toggle${active ? " is-active" : ""}`}
      aria-pressed={active}
      aria-label={label}
      title={label}
      onClick={() => {
        const title = document.title.split(" | ")[0]?.trim();
        if (title) toggleFavorite({ href: pathname, title });
      }}
    >
      {active ? "★" : "☆"}
    </button>
  );
}
