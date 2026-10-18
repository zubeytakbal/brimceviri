import { describe, expect, it } from "vitest";
import { ayTumEtiketleri } from "../app/converter/calendar/gokyuzuEtiketleri";
import { ayEtiketleri } from "../app/converter/calendar/gunEtiketleri";

const adlar = (m: Map<number, { ad: string }[]>, day: number) => (m.get(day) ?? []).map((e) => e.ad);

describe("takvim gün etiketleri", () => {
  it("Kasım 2026: anma günü, fırtına, okul ara tatili ve ay evresi aynı takvimde", () => {
    const m = ayEtiketleri(2026, 11);
    expect(adlar(m, 10)).toContain("Atatürk'ü Anma Günü");
    expect(adlar(m, 12)).toContain("Lodos fırtınası");
    expect(adlar(m, 9)).toContain("Yeni ay");
    const ara = (d: number) => m.get(d)!.find((e) => e.tur === "okul")!;
    expect(ara(16).devam).toBe(false);
    expect(ara(20).devam).toBe(true);
  });

  it("Hamsin özel günlerde olduğu için fırtına listesinden ikinci kez eklenmez", () => {
    const subat = adlar(ayEtiketleri(2027, 2), 1);
    expect(subat.filter((a) => a.startsWith("Hamsin"))).toHaveLength(0);
    expect(adlar(ayEtiketleri(2027, 1), 31).filter((a) => a.startsWith("Hamsin"))).toHaveLength(1);
  });

  it("gökyüzü olayları eklenir; süper ay gününde ayrıca Dolunay yazılmaz", () => {
    const aralik = ayTumEtiketleri(2026, 12);
    expect(adlar(aralik, 14)).toContain("Geminidler meteor yağmuru");
    expect(adlar(aralik, 24)).toContain("Süper ay: 2026 yılının en büyük dolunayı");
    expect(adlar(aralik, 24)).not.toContain("Dolunay");
  });
});
