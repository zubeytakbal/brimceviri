import { describe, expect, it } from "vitest";
import { ayetId, cuzAraligi, dagit, ezberPlani, parcaMetni, SON_ID, sayfaOf } from "../app/converter/kuranPlan";
import { CUZ_CEYREKLERI, SAYFA_BASLANGIC, SECDE_AYETLERI, SURE_META } from "../app/converter/sureMeta";

describe("Sure verisi (quran-meta)", () => {
  it("bilinen değerler", () => {
    expect(Object.keys(SURE_META)).toHaveLength(114);
    expect(SURE_META[1]).toMatchObject({ mekki: true, nuzul: 5, sayfaBas: 1 });
    expect(SURE_META[2]).toMatchObject({ mekki: false, nuzul: 87, sayfaBas: 2, sayfaSon: 49 });
    expect(SURE_META[96].nuzul).toBe(1);
    expect(Object.values(SURE_META).filter((m) => m.mekki)).toHaveLength(86);
    expect(SAYFA_BASLANGIC).toHaveLength(604);
    expect(SECDE_AYETLERI).toHaveLength(15);
    expect(CUZ_CEYREKLERI[0]).toEqual([[1, 1], [2, 26], [2, 44], [2, 60], [2, 75], [2, 92], [2, 106], [2, 124]]);
  });
});

describe("Ezber planı ve hatim dağıtımı", () => {
  it("Yasin günde 5 ayetle 17 gün", () => {
    const plan = ezberPlani(36, 5);
    expect(plan).toHaveLength(17);
    expect(plan[16]).toEqual({ gun: 17, ilk: 81, son: 83 });
  });

  it("hatmi kişilere eksiksiz ve örtüşmeden böler", () => {
    const paylar = dagit(1, SON_ID, 7);
    expect(paylar).toHaveLength(7);
    expect(paylar[0].sayfaBas).toBe(1);
    expect(paylar[6].sayfaSon).toBe(604);
    const sayfalar = paylar.map((p) => p.sayfaSon - p.sayfaBas + 1);
    expect(Math.max(...sayfalar) - Math.min(...sayfalar)).toBeLessThanOrEqual(1);
    for (let i = 1; i < paylar.length; i++) expect(paylar[i].sayfaBas).toBe(paylar[i - 1].sayfaSon + 1);
  });

  it("bir cüzü cüz sınırları içinde böler", () => {
    const [ilk, son] = cuzAraligi(30);
    const paylar = dagit(ilk, son, 2);
    expect(parcaMetni(paylar[0].parcalar).startsWith("Nebe")).toBe(true);
    expect(parcaMetni(paylar[1].parcalar).endsWith("Nas (tamamı)")).toBe(true);
    expect(sayfaOf(ayetId(114, 6))).toBe(604);
  });
});
