import { describe, expect, it } from "vitest";
import { MAX_FAVORITES, parseFavorites, toggleFavoriteEntry } from "../app/converter/favoriteTools";
import { isTrackablePath } from "../app/converter/recentTools";

describe("favoriteTools", () => {
  it("adds to the front and removes on second toggle", () => {
    const a = { href: "/a", title: "A" };
    const b = { href: "/b", title: "B" };
    const list = toggleFavoriteEntry(toggleFavoriteEntry([], a), b);
    expect(list.map((i) => i.href)).toEqual(["/b", "/a"]);
    expect(toggleFavoriteEntry(list, a).map((i) => i.href)).toEqual(["/b"]);
  });

  it("caps the list length", () => {
    let list: { href: string; title: string }[] = [];
    for (let i = 0; i < MAX_FAVORITES + 3; i++) list = toggleFavoriteEntry(list, { href: `/${i}`, title: `${i}` });
    expect(list).toHaveLength(MAX_FAVORITES);
  });

  it("parses invalid storage safely", () => {
    expect(parseFavorites(null)).toEqual([]);
    expect(parseFavorites("{bad")).toEqual([]);
    expect(parseFavorites('{"a":1}')).toEqual([]);
    expect(parseFavorites('[{"href":"/x","title":"X"},{"href":1}]')).toEqual([{ href: "/x", title: "X" }]);
  });

  it("does not offer favorites on hub pages", () => {
    expect(isTrackablePath("/")).toBe(false);
    expect(isTrackablePath("/embed/foo")).toBe(false);
    expect(isTrackablePath("/bmi-hesaplama")).toBe(true);
  });
});
