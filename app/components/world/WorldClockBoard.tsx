"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "@/app/components/SiteLink";
import { shortDifference, useSecondNow, WORLD_LOCALE, zoneOffsetMinutes, type WorldLang } from "./useSecondNow";

export type BoardCity = { slug: string; href: string; name: string; country: string; timeZone: string; region: string };

export type BoardCopy = {
  search: string;
  all: string;
  favorites: string;
  addFavorite: string;
  removeFavorite: string;
  yourTime: string;
  noResults: string;
  today: string;
  tomorrow: string;
  yesterday: string;
};

const STORAGE_KEY = "birimceviri:world-favorites";

function normalize(text: string) {
  return text
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ı/g, "i");
}

// Dunya saati panosu: tum sehirlerin canli saati, arama, bolge filtresi ve favoriler.
export default function WorldClockBoard({
  cities,
  regions,
  lang,
  copy,
}: {
  cities: BoardCity[];
  regions: Array<{ id: string; name: string }>;
  lang: WorldLang;
  copy: BoardCopy;
}) {
  const now = useSecondNow();
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const locale = WORLD_LOCALE[lang];

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) setFavorites((JSON.parse(raw) as string[]).filter((slug) => typeof slug === "string"));
      } catch {
        // Kayit okunamazsa favoriler bos baslar.
      }
      setLoaded(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Gizli sekme: favoriler yalnizca bu ziyarette kalir.
    }
  }, [favorites, loaded]);

  const formatters = useMemo(() => {
    const map = new Map<string, Intl.DateTimeFormat>();
    for (const city of cities) {
      if (!map.has(city.timeZone)) map.set(city.timeZone, new Intl.DateTimeFormat(locale, { timeZone: city.timeZone, hour: "2-digit", minute: "2-digit", hour12: lang === "en" }));
    }
    return map;
  }, [cities, locale, lang]);

  const visible = useMemo(() => {
    const q = normalize(query.trim());
    return cities.filter((city) => {
      if (region === "favorites" && !favorites.includes(city.slug)) return false;
      if (region !== "all" && region !== "favorites" && city.region !== region) return false;
      return !q || normalize(`${city.name} ${city.country}`).includes(q);
    });
  }, [cities, query, region, favorites]);

  const toggleFavorite = (slug: string) =>
    setFavorites((current) => (current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug]));

  const localMinutes = now ? -now.getTimezoneOffset() : 0;
  const localDay = now ? now.getDate() : 0;

  const dayLabel = (timeZone: string) => {
    if (!now) return "";
    const day = Number(new Intl.DateTimeFormat("en-US", { timeZone, day: "numeric" }).format(now));
    if (day === localDay) return copy.today;
    const diff = zoneOffsetMinutes(timeZone, now) - localMinutes;
    return diff > 0 ? copy.tomorrow : copy.yesterday;
  };

  const isNight = (timeZone: string) => {
    if (!now) return false;
    const hour = Number(new Intl.DateTimeFormat("en-US", { timeZone, hour: "numeric", hourCycle: "h23" }).format(now));
    return hour < 6 || hour >= 19;
  };

  const sorted = [...visible].sort((a, b) => Number(favorites.includes(b.slug)) - Number(favorites.includes(a.slug)));

  return (
    <div className="world-board">
      <div className="world-board-local">
        <span>{copy.yourTime}</span>
        <strong>{now ? new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: lang === "en" }).format(now) : "--:--:--"}</strong>
        <em>{now ? Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g, " ") : ""}</em>
      </div>

      <div className="world-board-controls">
        <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.search} aria-label={copy.search} />
        <div className="world-board-filters" role="tablist">
          {[{ id: "all", name: copy.all }, { id: "favorites", name: `★ ${copy.favorites}` }, ...regions].map((item) => (
            <button key={item.id} type="button" role="tab" aria-selected={region === item.id} className={region === item.id ? "is-active" : undefined} onClick={() => setRegion(item.id)}>
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {sorted.length === 0 ? (
        <p className="world-board-empty">{copy.noResults}</p>
      ) : (
        <ul className="world-board-grid">
          {sorted.map((city) => {
            const favorite = favorites.includes(city.slug);
            const diff = now ? zoneOffsetMinutes(city.timeZone, now) - localMinutes : 0;
            return (
              <li key={city.slug} className={`world-card${isNight(city.timeZone) ? " is-night" : ""}${favorite ? " is-favorite" : ""}`}>
                <Link href={city.href} prefetch={false} className="world-card-link">
                  <span className="world-card-name">{city.name}</span>
                  <span className="world-card-country">{city.country}</span>
                  <strong className="world-card-time">{now ? formatters.get(city.timeZone)!.format(now) : "--:--"}</strong>
                  <span className="world-card-meta">
                    {isNight(city.timeZone) ? "☾" : "☀"} {dayLabel(city.timeZone)} · {now ? shortDifference(diff, lang) : ""}
                  </span>
                </Link>
                <button
                  type="button"
                  className="world-card-star"
                  aria-pressed={favorite}
                  aria-label={favorite ? copy.removeFavorite : copy.addFavorite}
                  onClick={() => toggleFavorite(city.slug)}
                >
                  {favorite ? "★" : "☆"}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
