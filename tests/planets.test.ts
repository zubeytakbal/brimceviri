import { describe, expect, it } from "vitest";
import { planetNight } from "../app/converter/time/planets";

const IST = { lat: 41.0082, lon: 28.9784 };
const night = (iso: string) => planetNight(new Date(iso), IST.lat, IST.lon);

describe("gezegen görünürlüğü", () => {
  it("Venüs alt kavuşum yakınında (Ekim 2026) görünmez", () => {
    const v = night("2026-10-23T21:00:00Z").planets.find((p) => p.id === "venus")!;
    expect(v.elongation).toBeLessThan(10);
    expect(v.visibility).toBe("none");
  });
  it("Mars karşı konum yakınında (Şubat 2027) gecenin büyük bölümünde görünür", () => {
    const m = night("2027-02-18T21:00:00Z").planets.find((p) => p.id === "mars")!;
    expect(m.visibility).toBe("all-night");
    expect(m.magnitude).toBeLessThan(-1);
  });
  it("gün batımı ve doğumu sırayla", () => {
    const n = night("2026-10-17T21:00:00Z");
    expect(n.sunset!.getTime()).toBeLessThan(n.sunrise!.getTime());
    expect(n.planets).toHaveLength(5);
  });
});
