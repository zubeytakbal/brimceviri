"use client";

import Link from "@/app/components/SiteLink";
import { useSyncExternalStore } from "react";
import { getFavoritesServerSnapshot, getFavoritesSnapshot, subscribeToFavorites } from "../converter/favoriteTools";

const headingByLocale = {
  tr: "Favorilerin",
  en: "Your Favorites",
  ar: "المفضلة",
  uz: "Sevimlilar",
  de: "Deine Favoriten",
} as const;

export default function FavoriteToolsWidget({ locale = "tr" }: { locale?: "tr" | "en" | "ar" | "uz" | "de" }) {
  const items = useSyncExternalStore(subscribeToFavorites, getFavoritesSnapshot, getFavoritesServerSnapshot);
  if (items.length === 0) return null;

  return (
    <section className="recent-tools-section">
      <div className="recent-tools-heading-row">
        <h2>{headingByLocale[locale]}</h2>
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
