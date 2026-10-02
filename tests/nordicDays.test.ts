import { describe, expect, it } from "vitest";
import { midsommarafton, upcomingTargets } from "../app/converter/time/nordicDays";

describe("İskandinav gün sayacı", () => {
  it("Midsommarafton 19–25 Haziran arasındaki cuma", () => {
    expect(midsommarafton(2026)).toEqual({ year: 2026, month: 6, day: 19 });
    expect(midsommarafton(2027)).toEqual({ year: 2027, month: 6, day: 25 });
    expect(midsommarafton(2028)).toEqual({ year: 2028, month: 6, day: 23 });
  });

  it("geçmiş tarih bir sonraki yıla kayar ve liste yakından uzağa sıralanır", () => {
    const today = { year: 2026, month: 10, day: 2 };
    const sv = upcomingTargets("sv", today);
    expect(sv[0]).toMatchObject({ name: "Julafton", date: { year: 2026, month: 12, day: 24 }, days: 83 });
    expect(sv.find((t) => t.name === "Midsommarafton")!.date).toEqual({ year: 2027, month: 6, day: 25 });
    expect(sv.map((t) => t.days)).toEqual([...sv.map((t) => t.days)].sort((a, b) => a - b));
    expect(upcomingTargets("no", today).find((t) => t.name === "17. mai")!.date).toEqual({ year: 2027, month: 5, day: 17 });
  });
});
