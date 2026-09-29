import { describe, expect, it } from "vitest";
import {
  doluGunler,
  ETKINLIKLER,
  etkinlikTarihleri,
  findEtkinlik,
  gunBilgisi,
  sonrakiTarih,
  yilEtkinlikleri,
} from "../app/converter/calendar/trTakvim";
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
