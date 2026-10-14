import { describe, expect, it } from "vitest";
import { rankSearchResults, scoreSearchItem } from "../app/converter/homeSearchRanking";

const includes = (text: string, q: string) => text.includes(q);

describe("homeSearchRanking", () => {
  it("scores exact, prefix, word-prefix, contains and other matches in order", () => {
    expect(scoreSearchItem({ label: "Metre", searchText: "" }, "metre")).toBe(0);
    expect(scoreSearchItem({ label: "Metre Kare", searchText: "" }, "metre")).toBe(1);
    expect(scoreSearchItem({ label: "Kare Metre", searchText: "" }, "metre")).toBe(2);
    expect(scoreSearchItem({ label: "Santimetre", searchText: "" }, "metre")).toBe(3);
    expect(scoreSearchItem({ label: "Uzunluk", searchText: "" }, "metre")).toBe(4);
  });

  it("puts label matches before description-only matches and respects the limit", () => {
    const items = [
      { label: "Uzunluk Çevirici", searchText: "uzunluk cevirici metre" },
      { label: "Santimetre", searchText: "santimetre metre" },
      { label: "Metre", searchText: "metre" },
    ];
    const ranked = rankSearchResults(items, "metre", includes, 2);
    expect(ranked.map((i) => i.label)).toEqual(["Metre", "Santimetre"]);
  });

  it("matches Turkish dotless/dotted letters when folding labels", () => {
    expect(scoreSearchItem({ label: "Işık", searchText: "" }, "isik")).toBe(0);
  });

  it("keeps original order for equal scores", () => {
    const items = [
      { label: "B kilo", searchText: "kilo" },
      { label: "A kilo", searchText: "kilo" },
    ];
    expect(rankSearchResults(items, "kilo", includes, 8).map((i) => i.label)).toEqual(["B kilo", "A kilo"]);
  });
});
