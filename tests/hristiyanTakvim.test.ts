import { describe, expect, it } from "vitest";
import { orthodoxEaster, westernEaster } from "../app/converter/christian/christianCalc";
import { paskalyaGunleri } from "../app/converter/christian/paskalya";
import { etkinlikTarihleri, findEtkinlik } from "../app/converter/calendar/trTakvim";
import { ayEtiketleri } from "../app/converter/calendar/gunEtiketleri";
import { easterSunday, findCountdownEvent, orthodoxEasterSunday, upcomingOccurrences } from "../app/converter/time/countdownEvents";

describe("Hristiyan bayramları", () => {
  it("Ortodoks Paskalyası İngilizce araçtaki hesapla 1900-2099 aynı", () => {
    for (let y = 1900; y <= 2099; y += 1) {
      expect(orthodoxEasterSunday(y)).toEqual(orthodoxEaster(y));
      expect(easterSunday(y)).toEqual(westernEaster(y));
    }
  });

  it("bilinen tarihler: 2027 Batı 28 Mart, Ortodoks 2 Mayıs; Mardin Süryani Paskalyası 2018 ve 2022", () => {
    expect(easterSunday(2027)).toEqual({ year: 2027, month: 3, day: 28 });
    expect(orthodoxEasterSunday(2027)).toEqual({ year: 2027, month: 5, day: 2 });
    expect(orthodoxEasterSunday(2018)).toEqual({ year: 2018, month: 4, day: 8 });
    expect(orthodoxEasterSunday(2022)).toEqual({ year: 2022, month: 4, day: 24 });
  });

  it("Kül Çarşambası ve Temiz Pazartesi", () => {
    expect(paskalyaGunleri(2027, false).find((g) => g.id === "kul-carsambasi")!.tarih).toEqual({ year: 2027, month: 2, day: 10 });
    expect(paskalyaGunleri(2027, true).find((g) => g.id === "temiz-pazartesi")!.tarih).toEqual({ year: 2027, month: 3, day: 15 });
    expect(etkinlikTarihleri(findEtkinlik("temiz-pazartesi")!, 2027)[0].tarih).toEqual({ year: 2027, month: 3, day: 15 });
  });

  it("Aya Yorgi geri sayımı yılın iki tarihini sırayla verir", () => {
    const e = findCountdownEvent("tr", "aya-yorgi")!;
    const sonraki = upcomingOccurrences(e, new Date(Date.UTC(2026, 4, 1)), 3);
    expect(sonraki).toEqual([
      { year: 2026, month: 9, day: 24 },
      { year: 2027, month: 4, day: 23 },
      { year: 2027, month: 9, day: 24 },
    ]);
  });

  it("takvimde Hristiyan bayramı etiketleri", () => {
    const nisan = ayEtiketleri(2027, 4);
    expect(nisan.get(23)!.some((e) => e.tur === "hristiyan" && e.href === "/geri-sayim/aya-yorgi")).toBe(true);
    expect(ayEtiketleri(2027, 5).get(2)!.some((e) => e.tur === "hristiyan" && e.ad === "Ortodoks Paskalyası")).toBe(true);
  });
});

describe("Advent, Göğe Yükseliş, Pentekost", () => {
  it("2026: Advent 29 Kasım; 2027: Göğe Yükseliş 6 Mayıs, Pentekost 16 Mayıs", () => {
    expect(etkinlikTarihleri(findEtkinlik("advent")!, 2026)[0].tarih).toEqual({ year: 2026, month: 11, day: 29 });
    expect(etkinlikTarihleri(findEtkinlik("advent")!, 2027)[0].tarih).toEqual({ year: 2027, month: 11, day: 28 });
    expect(etkinlikTarihleri(findEtkinlik("goge-yukselis")!, 2027)[0].tarih).toEqual({ year: 2027, month: 5, day: 6 });
    expect(etkinlikTarihleri(findEtkinlik("pentekost")!, 2027)[0].tarih).toEqual({ year: 2027, month: 5, day: 16 });
  });
});
