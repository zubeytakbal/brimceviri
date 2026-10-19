import { describe, expect, it } from "vitest";
import { yeniYilSirasi, yerelYilbasiAni, yilbasiTatili } from "../app/converter/time/yeniYil";

describe("yılbaşı", () => {
  it("yeni yıla giriş anları (UTC)", () => {
    expect(new Date(yerelYilbasiAni("Pacific/Kiritimati", 2027)).toISOString()).toBe("2026-12-31T10:00:00.000Z");
    expect(new Date(yerelYilbasiAni("Europe/Istanbul", 2027)).toISOString()).toBe("2026-12-31T21:00:00.000Z");
    expect(new Date(yerelYilbasiAni("Pacific/Auckland", 2027)).toISOString()).toBe("2026-12-31T11:00:00.000Z"); // yaz saati UTC+13
    expect(new Date(yerelYilbasiAni("Pacific/Pago_Pago", 2027)).toISOString()).toBe("2027-01-01T11:00:00.000Z");
  });
  it("sıralama: ilk Kiribati, son Amerikan Samoası", () => {
    const s = yeniYilSirasi(2027);
    expect(s[0].ulke).toBe("Kiribati, Line Adaları");
    expect(s[s.length - 1].ulke).toBe("Amerikan Samoası");
  });
  it("yılbaşı tatili", () => {
    expect(yilbasiTatili(2027)).toMatchObject({ gun: 5, sure: 3 }); // 1 Ocak 2027 Cuma
    expect(yilbasiTatili(2028)).toMatchObject({ gun: 6, sure: 2 }); // Cumartesi
    expect(yilbasiTatili(2026).kopru).toContain("Cuma"); // 1 Ocak 2026 Perşembe
  });
});
