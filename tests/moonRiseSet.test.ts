import { describe, expect, it } from "vitest";
import { compassPoint, moonEventsForDay } from "../app/converter/time/moonRiseSet";

// Referans anlar astronomy-engine (yuksek hassasiyetli) ile hesaplandi.
const minutesApart = (a: Date | null, iso: string) => Math.abs((a?.getTime() ?? 0) - Date.parse(iso)) / 60000;

describe("moonEventsForDay", () => {
  it("İstanbul, 15 Ocak 2026", () => {
    const ev = moonEventsForDay(new Date(Date.UTC(2026, 0, 15, -3)), 41.01, 28.98);
    expect(minutesApart(ev.rise, "2026-01-15T03:00:03Z")).toBeLessThan(5);
    expect(minutesApart(ev.set, "2026-01-15T11:39:09Z")).toBeLessThan(5);
    expect(ev.transit).not.toBeNull();
  });

  it("Londra, 15 Ocak 2026", () => {
    const ev = moonEventsForDay(new Date(Date.UTC(2026, 0, 15)), 51.51, -0.13);
    expect(minutesApart(ev.rise, "2026-01-15T06:00:19Z")).toBeLessThan(5);
    expect(minutesApart(ev.set, "2026-01-15T12:39:34Z")).toBeLessThan(5);
  });

  it("pusula yönleri", () => {
    expect(compassPoint(0, "tr")).toBe("kuzey");
    expect(compassPoint(170, "tr")).toBe("güney");
    expect(compassPoint(350, "en")).toBe("north");
  });
});
