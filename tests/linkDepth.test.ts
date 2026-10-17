import { describe, expect, it } from "vitest";
import { buildDepthReport, computeDepths, extractHrefs, normalizeInternalHref } from "../scripts/linkDepthLib";

const O = "https://x.test";

describe("linkDepth", () => {
  it("extracts hrefs", () => {
    expect(extractHrefs(`<a class="a" href="/a">x</a><a href='/b'>y</a><link href="/c.css">`)).toEqual(["/a", "/b"]);
  });

  it("normalizes internal links and skips external/assets/anchors", () => {
    expect(normalizeInternalHref("/a/", "/", O)).toBe("/a");
    expect(normalizeInternalHref("b", "/x/", O)).toBe("/x/b");
    expect(normalizeInternalHref("/a?x=1#h", "/", O)).toBe("/a");
    expect(normalizeInternalHref("https://other.test/a", "/", O)).toBeNull();
    expect(normalizeInternalHref("#top", "/", O)).toBeNull();
    expect(normalizeInternalHref("/logo.png", "/", O)).toBeNull();
    expect(normalizeInternalHref("mailto:a@b.c", "/", O)).toBeNull();
    expect(normalizeInternalHref("/_next/x", "/", O)).toBeNull();
  });

  it("computes BFS depths using the shortest path", () => {
    const graph = new Map([
      ["/", ["/a", "/b"]],
      ["/a", ["/c"]],
      ["/b", ["/c", "/missing"]],
      ["/c", ["/d"]],
      ["/d", []],
      ["/orphan", ["/d"]],
    ]);
    const d = computeDepths(graph);
    expect(d.get("/c")).toBe(2);
    expect(d.get("/d")).toBe(3);
    expect(d.has("/orphan")).toBe(false);
    expect(d.has("/missing")).toBe(false);
  });

  it("reports deep pages, orphans and histogram", () => {
    const graph = new Map([
      ["/", ["/a"]],
      ["/a", ["/b"]],
      ["/b", ["/c"]],
      ["/c", ["/d"]],
      ["/d", []],
      ["/orphan", []],
    ]);
    const r = buildDepthReport(graph, 3);
    expect(r.deep).toEqual([{ path: "/d", depth: 4 }]);
    expect(r.orphans).toEqual(["/orphan"]);
    expect(r.histogram).toEqual({ 0: 1, 1: 1, 2: 1, 3: 1, 4: 1 });
    expect(r.reachable).toBe(5);
  });
});
