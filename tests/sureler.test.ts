import { describe, expect, it } from "vitest";
import { CUZ_BASLANGIC, SURELER, TOPLAM_AYET, cuzIcerigi, findSure, sureCuzBolumleri } from "../app/converter/sureler";

describe("Sure ve cüz verisi", () => {
  it("114 sure, 6.236 ayet, benzersiz adresler", () => {
    expect(SURELER).toHaveLength(114);
    expect(TOPLAM_AYET).toBe(6236);
    expect(new Set(SURELER.map((s) => s.slug)).size).toBe(114);
    SURELER.forEach((s, i) => expect(s.no).toBe(i + 1));
  });

  it("bilinen sureler", () => {
    expect(findSure("yasin")).toMatchObject({ no: 36, ayet: 83, cuzBas: 22, cuzSon: 23 });
    expect(findSure("bakara")).toMatchObject({ no: 2, ayet: 286, cuzBas: 1, cuzSon: 3 });
    expect(findSure("mulk")).toMatchObject({ no: 67, ayet: 30, cuzBas: 29 });
    expect(findSure("kehf")).toMatchObject({ no: 18, ayet: 110, cuzBas: 15, cuzSon: 16 });
    expect(findSure("ihlas")).toMatchObject({ no: 112, ayet: 4, cuzBas: 30 });
  });

  it("cüz başlangıçları standart listeyle aynı", () => {
    // Bağımsız standart liste (Hafs, Medine tertibi cüz taksimi)
    const standart = [[1,1],[2,142],[2,253],[3,93],[4,24],[4,148],[5,82],[6,111],[7,88],[8,41],[9,93],[11,6],[12,53],[15,1],[17,1],[18,75],[21,1],[23,1],[25,21],[27,56],[29,46],[33,31],[36,28],[39,32],[41,47],[46,1],[51,31],[58,1],[67,1],[78,1]];
    expect(CUZ_BASLANGIC).toEqual(standart);
  });

  it("cüz içerikleri tüm ayetleri bir kez kapsar", () => {
    let toplam = 0;
    for (let c = 1; c <= 30; c++) {
      for (const p of cuzIcerigi(c)) {
        expect(p.ilkAyet).toBeGreaterThanOrEqual(1);
        expect(p.sonAyet).toBeLessThanOrEqual(p.sure.ayet);
        toplam += p.sonAyet - p.ilkAyet + 1;
      }
    }
    expect(toplam).toBe(6236);
  });

  it("örnek cüz ve sure bölümleri", () => {
    expect(cuzIcerigi(28).map((p) => p.sure.ad)).toEqual(["Mücadele", "Haşr", "Mümtehine", "Saf", "Cuma", "Münafikun", "Tegabün", "Talak", "Tahrim"]);
    expect(sureCuzBolumleri(findSure("bakara")!)).toEqual([
      { cuz: 1, ilkAyet: 1, sonAyet: 141 },
      { cuz: 2, ilkAyet: 142, sonAyet: 252 },
      { cuz: 3, ilkAyet: 253, sonAyet: 286 },
    ]);
    expect(sureCuzBolumleri(findSure("yasin")!)).toEqual([
      { cuz: 22, ilkAyet: 1, sonAyet: 27 },
      { cuz: 23, ilkAyet: 28, sonAyet: 83 },
    ]);
  });
});
