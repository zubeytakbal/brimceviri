import { describe, expect, it } from "vitest";
import {
  doluGunler,
  ETKINLIKLER,
  etkinlikTarihleri,
  findEtkinlik,
  gunBilgisi,
  halkDonemi,
  sonrakiTarih,
  yilEtkinlikleri,
} from "../app/converter/calendar/trTakvim";
import { siradakiFirtinalar } from "../app/converter/calendar/firtinaTakvimi";
import { ymdKey } from "../app/converter/time/dateMath";

const tarih = (id: string, year: number) =>
  etkinlikTarihleri(findEtkinlik(id)!, year).map((t) => ymdKey(t.tarih));

describe("Türkiye takvimi", () => {
  it("matches the Diyanet 2026 religious days", () => {
    expect(tarih("regaib-kandili", 2025)).toEqual(["2025-01-02", "2025-12-25"]);
    expect(tarih("mirac-kandili", 2026)).toEqual(["2026-01-15"]);
    expect(tarih("berat-kandili", 2026)).toEqual(["2026-02-02"]);
    expect(tarih("ramazan-baslangici", 2026)).toEqual(["2026-02-19"]);
    expect(tarih("kadir-gecesi", 2026)).toEqual(["2026-03-16"]);
    expect(tarih("ramazan-bayrami", 2026)).toEqual(["2026-03-20"]);
    expect(tarih("kurban-bayrami", 2026)).toEqual(["2026-05-27"]);
    expect(tarih("hicri-yilbasi", 2026)).toEqual(["2026-06-16"]);
    expect(tarih("mevlid-kandili", 2026)).toEqual(["2026-08-24"]);
    expect(tarih("uc-aylar", 2026)).toEqual(["2026-12-10"]);
    expect(tarih("regaib-kandili", 2026)).toEqual(["2026-12-10"]);
  });

  it("matches the Diyanet 2027 religious days", () => {
    expect(tarih("mirac-kandili", 2027)).toEqual(["2027-01-04", "2027-12-24"]);
    expect(tarih("berat-kandili", 2027)).toEqual(["2027-01-22"]);
    expect(tarih("ramazan-baslangici", 2027)).toEqual(["2027-02-08"]);
    expect(tarih("kadir-gecesi", 2027)).toEqual(["2027-03-05"]);
    expect(tarih("hicri-yilbasi", 2027)).toEqual(["2027-06-06"]);
    expect(tarih("asure-gunu", 2027)).toEqual(["2027-06-15"]);
    expect(tarih("mevlid-kandili", 2027)).toEqual(["2027-08-13"]);
    expect(tarih("regaib-kandili", 2027)).toEqual(["2027-12-02"]);
    expect(
      etkinlikTarihleri(findEtkinlik("berat-kandili")!, 2028).every(
        (t) => t.tahmini,
      ),
    ).toBe(true);
  });

  it("covers bayram days and rule-based dates", () => {
    const k = etkinlikTarihleri(findEtkinlik("kurban-bayrami")!, 2026)[0];
    expect(ymdKey(k.bitis!)).toBe("2026-05-30");
    expect(tarih("anneler-gunu", 2026)).toEqual(["2026-05-10"]);
    expect(tarih("babalar-gunu", 2026)).toEqual(["2026-06-21"]);
    expect(tarih("ilkbahar", 2026)).toEqual(["2026-03-20"]);
    expect(tarih("kis", 2026)).toEqual(["2026-12-21"]);
    expect(tarih("sonbahar", 2026)).toEqual(["2026-09-23"]);
  });

  it("builds day information", () => {
    const g = gunBilgisi({ year: 2026, month: 5, day: 28 });
    expect(g.gunAdi).toBe("Perşembe");
    expect(g.etkinlikler.map((e) => e.etkinlik.id)).toContain("kurban-bayrami");
    expect(g.hicriMetin).toContain("Zilhicce 1447");
    const y = gunBilgisi({ year: 2026, month: 1, day: 1 });
    expect(y.yilinGunu).toBe(1);
    expect(y.kalanGun).toBe(364);
  });

  it("lists every event every year without gaps", () => {
    for (const year of [2026, 2027, 2028]) {
      const ids = new Set(yilEtkinlikleri(year).map((t) => t.etkinlik.id));
      for (const e of ETKINLIKLER)
        if (e.id !== "regaib-kandili" && e.id !== "uc-aylar")
          expect(ids.has(e.id), `${e.id} ${year}`).toBe(true);
      expect(doluGunler(year).length).toBeGreaterThan(30);
    }
    expect(
      ymdKey(
        sonrakiTarih(findEtkinlik("29-ekim")!, {
          year: 2026,
          month: 11,
          day: 1,
        })!.tarih,
      ),
    ).toBe("2027-10-29");
  });
});

describe("Halk takvimi", () => {
  it("counts Kasım/Hızır days and Erbain/Hamsin", () => {
    const h = halkDonemi({ year: 2026, month: 9, day: 29 });
    expect(h.buyuk).toEqual({ ad: "Hızır günleri", gun: 147 });
    expect(h.kucuk).toBeNull();
    const e = halkDonemi({ year: 2027, month: 1, day: 30 });
    expect(e.buyuk.ad).toBe("Kasım günleri");
    expect(e.kucuk).toEqual({ ad: "Erbain", gun: 40, toplam: 40 });
    expect(halkDonemi({ year: 2027, month: 3, day: 21 }).kucuk).toEqual({
      ad: "Hamsin",
      gun: 50,
      toplam: 50,
    });
    expect(halkDonemi({ year: 2026, month: 11, day: 8 }).buyuk).toEqual({
      ad: "Kasım günleri",
      gun: 1,
    });
  });

  it("lists the three cemre dates", () => {
    const c = etkinlikTarihleri(findEtkinlik("cemre")!, 2027).map(
      (t) => `${ymdKey(t.tarih)} ${t.not}`,
    );
    expect(c).toEqual([
      "2027-02-20 havaya",
      "2027-02-27 suya",
      "2027-03-06 toprağa",
    ]);
  });

  it("finds the next storm, including one still running", () => {
    expect(
      siradakiFirtinalar({ year: 2026, month: 9, day: 29 }, 1)[0].f.ad,
    ).toBe("Turna geçimi fırtınası");
    expect(
      siradakiFirtinalar({ year: 2026, month: 3, day: 14 }, 1)[0].f.ad,
    ).toContain("Kocakarı");
    expect(
      siradakiFirtinalar({ year: 2026, month: 12, day: 20 }, 1)[0].tarih,
    ).toEqual({ year: 2027, month: 1, day: 14 });
  });
});

describe("Geçmiş yıllar", () => {
  it("does not show days before they were established", () => {
    expect(etkinlikTarihleri(findEtkinlik("15-temmuz")!, 1990)).toEqual([]);
    expect(etkinlikTarihleri(findEtkinlik("ogretmenler-gunu")!, 1975)).toEqual([]);
    expect(etkinlikTarihleri(findEtkinlik("29-ekim")!, 1990)).toHaveLength(1);
    expect(gunBilgisi({ year: 1990, month: 5, day: 27 }).gunAdi).toBe("Pazar");
  });
});
