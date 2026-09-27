import { describe, expect, it } from "vitest";
import { moonPhasesBetween, moonState, phaseName } from "../app/converter/time/moon";

// Referans: timeanddate.com / USNO 2026 dolunay saatleri (UTC)
const FULL_MOONS_2026 = [
  "2026-02-01T22:09Z",
  "2026-03-03T11:37Z",
  "2026-04-02T02:11Z",
  "2026-05-01T17:23Z",
  "2026-05-31T08:45Z",
  "2026-06-29T23:56Z",
  "2026-07-29T14:35Z",
  "2026-08-28T04:18Z",
  "2026-09-26T16:49Z",
];

describe("moon phases", () => {
  it("matches published 2026 full moons within 3 minutes", () => {
    const fulls = moonPhasesBetween(new Date("2026-01-20T00:00Z"), new Date("2026-10-01T00:00Z")).filter((e) => e.kind === "full");
    expect(fulls).toHaveLength(FULL_MOONS_2026.length);
    fulls.forEach((event, index) => {
      const diff = Math.abs(event.date.getTime() - new Date(FULL_MOONS_2026[index]).getTime()) / 60000;
      expect(diff).toBeLessThanOrEqual(3);
    });
  });

  it("orders phases new -> first -> full -> last", () => {
    const events = moonPhasesBetween(new Date("2026-01-01T00:00Z"), new Date("2026-03-01T00:00Z"));
    for (let i = 1; i < events.length; i += 1) expect(events[i].date.getTime()).toBeGreaterThan(events[i - 1].date.getTime());
    const order = ["new", "first", "full", "last"];
    for (let i = 1; i < events.length; i += 1) expect(order.indexOf(events[i].kind)).toBe((order.indexOf(events[i - 1].kind) + 1) % 4);
  });

  it("reports near-full illumination at a full moon", () => {
    const state = moonState(new Date("2026-09-26T16:49Z"));
    expect(state.illumination).toBeGreaterThan(0.99);
    expect(phaseName(state.age)).toBe("full");
  });
});
