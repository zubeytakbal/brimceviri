import { describe, expect, it } from "vitest";
import { KREDI_TURLERI, krediHesapla } from "../app/converter/turkishKredi";

describe("kredi hesaplama", () => {
  it("ihtiyaç kredisinde faize KKDF ve BSMV ekleyerek taksiti bulur", () => {
    // 100.000 TL, 12 ay, aylık %3, KKDF %15 + BSMV %15 → vergili oran %3,9
    const r = krediHesapla({ anapara: 100_000, vade: 12, aylikFaiz: 3, kkdf: 15, bsmv: 15 })!;
    expect(r.vergiliAylikOran).toBeCloseTo(3.9, 10);
    expect(r.taksit).toBeCloseTo(10_593.48, 2);
    expect(r.toplamOdeme).toBeCloseTo(127_121.82, 1);
  });

  it("ödeme planı tutarlı: anapara ödemeleri krediye, toplamlar taksitlere eşit", () => {
    const r = krediHesapla({ anapara: 250_000, vade: 36, aylikFaiz: 2.79, kkdf: 15, bsmv: 15 })!;
    const anaparaToplami = r.plan.reduce((s, row) => s + row.anapara, 0);
    expect(anaparaToplami).toBeCloseTo(250_000, 6);
    expect(r.plan.at(-1)!.kalan).toBe(0);
    expect(r.toplamOdeme).toBeCloseTo(250_000 + r.toplamMaliyet, 4);
    // KKDF ve BSMV her ay faizin %15'i
    for (const row of r.plan) {
      expect(row.kkdf).toBeCloseTo(row.faiz * 0.15, 8);
      expect(row.bsmv).toBeCloseTo(row.faiz * 0.15, 8);
      expect(row.anapara + row.faiz + row.kkdf + row.bsmv).toBeCloseTo(row.taksit, 6);
    }
  });

  it("konut kredisinde vergi yoksa düz anüite formülünü verir", () => {
    const konut = KREDI_TURLERI.find((t) => t.id === "konut")!;
    const r = krediHesapla({ anapara: 2_000_000, vade: 120, aylikFaiz: 2.5, kkdf: konut.kkdf, bsmv: konut.bsmv })!;
    expect(r.taksit).toBeCloseTo(52_723.59, 1);
    expect(r.toplamKkdf).toBe(0);
    expect(r.toplamBsmv).toBe(0);
  });

  it("sıfır faizde anapara vadeye eşit bölünür", () => {
    const r = krediHesapla({ anapara: 12_000, vade: 12, aylikFaiz: 0, kkdf: 15, bsmv: 15 })!;
    expect(r.taksit).toBe(1_000);
    expect(r.toplamMaliyet).toBe(0);
  });

  it("geçersiz girdide sonuç vermez", () => {
    expect(krediHesapla({ anapara: 0, vade: 12, aylikFaiz: 3, kkdf: 15, bsmv: 15 })).toBeNull();
    expect(krediHesapla({ anapara: 1000, vade: 0, aylikFaiz: 3, kkdf: 15, bsmv: 15 })).toBeNull();
    expect(krediHesapla({ anapara: 1000, vade: 2.5, aylikFaiz: 3, kkdf: 15, bsmv: 15 })).toBeNull();
    expect(krediHesapla({ anapara: 1000, vade: 12, aylikFaiz: Number.NaN, kkdf: 15, bsmv: 15 })).toBeNull();
  });
});
