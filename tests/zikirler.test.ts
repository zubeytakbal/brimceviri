import { describe, expect, it } from "vitest";
import { gunlukEkle, istatistik, siraKonumu, sonGunler, TESBIHAT } from "../app/converter/dini/zikirler";

describe("zikirmatik", () => {
  it("tesbihat sırası: 33 + 33 + 33 + 1 = 100", () => {
    expect(TESBIHAT.reduce((t, a) => t + a.adet, 0)).toBe(100);
    expect(siraKonumu(TESBIHAT, 0)).toEqual({ adim: 0, adimIci: 0, bitti: false });
    expect(siraKonumu(TESBIHAT, 33)).toEqual({ adim: 1, adimIci: 0, bitti: false });
    expect(siraKonumu(TESBIHAT, 98)).toEqual({ adim: 2, adimIci: 32, bitti: false });
    expect(siraKonumu(TESBIHAT, 99)).toEqual({ adim: 3, adimIci: 0, bitti: false });
    expect(siraKonumu(TESBIHAT, 100)).toEqual({ adim: 3, adimIci: 1, bitti: true });
  });

  it("istatistik: bugün, 7 gün, seri", () => {
    let s = {};
    s = gunlukEkle(s, "2026-10-17", 100);
    s = gunlukEkle(s, "2026-10-18", 33);
    s = gunlukEkle(s, "2026-10-19", 10);
    s = gunlukEkle(s, "2026-10-10", 5);
    const r = istatistik(s, "2026-10-19");
    expect(r).toMatchObject({ bugun: 10, hafta: 143, ay: 148, seri: 3, tumu: 148 });
    // Bugün henüz çekilmediyse seri dünden sayılır
    expect(istatistik(s, "2026-10-20").seri).toBe(3);
    expect(istatistik(s, "2026-10-21").seri).toBe(0);
    expect(sonGunler(s, "2026-10-19", 3).map((g) => g.sayi)).toEqual([100, 33, 10]);
  });
});
