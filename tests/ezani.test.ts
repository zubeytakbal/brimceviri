import { describe, expect, it } from "vitest";
import { fromEzani, sunsetMs, toEzani } from "../app/converter/time/ezani";

const IST = { lat: 41.0082, lon: 28.9784 };

describe("ezani saat", () => {
  it("gün batımı anı ezani 12:00'dır", () => {
    const s = sunsetMs(2026, 6, 21, IST.lat, IST.lon)!;
    const e = toEzani(s, IST.lat, IST.lon)!;
    expect(e.hour12).toBe(12);
    expect(e.minute).toBe(0);
    expect(e.half).toBe("gece");
  });

  it("batıştan 3 saat 15 dakika sonra ezani 3:15", () => {
    const s = sunsetMs(2026, 12, 21, IST.lat, IST.lon)!;
    const e = toEzani(s + (3 * 60 + 15) * 60000, IST.lat, IST.lon)!;
    expect([e.hour12, e.minute, e.half]).toEqual([3, 15, "gece"]);
  });

  it("sabah saatleri bir önceki akşamın batışından sayılır", () => {
    const s = sunsetMs(2026, 3, 20, IST.lat, IST.lon)!;
    const morning = s + 14 * 3600000;
    const e = toEzani(morning, IST.lat, IST.lon)!;
    expect([e.hour12, e.half]).toEqual([2, "gunduz"]);
  });

  it("ezani → normal saat, ters çevrimle aynı anı verir", () => {
    const ms = fromEzani(2026, 10, 17, 5, 30, "gece", IST.lat, IST.lon)!;
    const e = toEzani(ms, IST.lat, IST.lon)!;
    expect([e.hour12, e.minute, e.half]).toEqual([5, 30, "gece"]);
  });
});
