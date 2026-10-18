import { describe, expect, it } from "vitest";
import { METEOR_SHOWERS, meteorPeak, nightName, skyEvents } from "../app/converter/time/skyEvents";

const events = skyEvents(new Date("2026-10-18T00:00:00Z"), new Date("2027-10-18T00:00:00Z"));
const find = (title: string) => events.find((e) => e.title.startsWith(title))!;
const shower = (id: string) => METEOR_SHOWERS.find((s) => s.id === id)!;

describe("gökyüzü olayları", () => {
  it("olaylar zaman sırasında ve aralığın içinde", () => {
    for (let i = 1; i < events.length; i++) expect(events[i].at.getTime()).toBeGreaterThanOrEqual(events[i - 1].at.getTime());
    expect(events[0].at.getTime()).toBeGreaterThanOrEqual(Date.parse("2026-10-18T00:00:00Z"));
  });

  it("kış gündönümü 21 Aralık 2026 20:50 UTC", () => {
    expect(Math.abs(find("Kış gündönümü").at.getTime() - Date.parse("2026-12-21T20:50:00Z"))).toBeLessThan(5 * 60000);
  });

  it("2026'nın süper ayı 24 Aralık, 356.740 km (yayımlanmış değer)", () => {
    const e = find("Süper ay: 2026");
    expect(e.at.toISOString().slice(0, 10)).toBe("2026-12-24");
    expect(e.detail).toContain("356.74");
  });

  it("Mars karşı konumu 19 Şubat 2027, Dünya günberisi 3 Ocak 2027", () => {
    expect(find("Mars karşı konumda").at.toISOString().slice(0, 10)).toBe("2027-02-19");
    expect(find("Dünya Güneş'e en yakın").at.toISOString().slice(0, 10)).toBe("2027-01-03");
  });

  it("2 Ağustos 2027 güneş tutulması Türkiye'den görülür", () => {
    expect(find("Tam güneş tutulması").detail).toContain("İzmir %71");
  });

  it("Geminidler 2026 zirvesi 13–14 Aralık gecesi, Ankara'dan radyant yüksekte", () => {
    const m = meteorPeak(shower("gem"), 2026);
    expect(nightName(m.nightMid)).toBe("13–14 Aralık gecesi");
    expect(m.best!.altitude).toBeGreaterThan(70);
    expect(m.expected).toBeGreaterThan(130);
  });

  it("ay sonu geceleri iki ayın adını yazar", () => {
    expect(nightName(new Date("2026-12-31T21:00:00Z"))).toBe("31 Aralık – 1 Ocak gecesi");
  });

  it("Ay–gezegen yakınlaşmaları Türkiye'den karanlıkta görülebilen anlara verilir", () => {
    const conj = events.filter((e) => e.title.startsWith("Ay ve "));
    expect(conj.length).toBeGreaterThan(5);
    for (const e of conj) expect(e.detail).toMatch(/civarında (kuzey|güney|doğu|batı)/);
  });
});
