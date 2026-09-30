import { describe, expect, it } from "vitest";
import { zipOku } from "../app/converter/arsiv/zipOku";
import { zipOlustur, zipSikistir } from "../app/converter/gorsel/zip";
import {
  ayiriciBul,
  csvAyristir,
  csvYaz,
  jsonHataKonumu,
  jsonTablo,
  tabloJson,
} from "../app/converter/veri/csv";
import {
  hucreKonumu,
  seriTarih,
  sutunAdi,
  xlsxOku,
  xlsxYaz,
} from "../app/converter/veri/xlsx";

describe("csv", () => {
  it("ayırıcıyı tahmin eder ve tırnaklı alanları ayrıştırır", () => {
    const m =
      '﻿ad;not;açıklama\r\nAyşe;85,5;"çok ""iyi""; dikkatli"\r\nMehmet;70;"iki\nsatır"';
    expect(ayiriciBul(m)).toBe(";");
    expect(csvAyristir(m)).toEqual([
      ["ad", "not", "açıklama"],
      ["Ayşe", "85,5", 'çok "iyi"; dikkatli'],
      ["Mehmet", "70", "iki\nsatır"],
    ]);
  });
  it("yazarken gerekli alanları tırnaklar ve geri okunur", () => {
    const t = [
      ["a", "b"],
      ['x"y', "1;2"],
      [null, 3],
    ];
    const csv = csvYaz(t, ";");
    expect(csv).toBe('a;b\r\n"x""y";"1;2"\r\n;3');
    expect(csvAyristir(csv, ";")).toEqual([
      ["a", "b"],
      ['x"y', "1;2"],
      ["", "3"],
    ]);
  });
});

describe("json", () => {
  it("nesne dizisini düzleştirip tabloya çevirir", () => {
    const t = jsonTablo([
      { ad: "Ali", adres: { il: "İzmir" }, etiket: ["a", "b"] },
      { ad: "Can", yas: 30 },
    ]);
    expect(t[0]).toEqual(["ad", "adres.il", "etiket", "yas"]);
    expect(t[1]).toEqual(["Ali", "İzmir", '["a","b"]', null]);
    expect(t[2]).toEqual(["Can", null, null, 30]);
  });
  it("tek dizi içeren kökü açar", () => {
    expect(jsonTablo({ kayitlar: [{ x: 1 }] })).toEqual([["x"], [1]]);
  });
  it("tabloyu türleri ve iç içe alanlarıyla JSON'a çevirir", () => {
    expect(
      tabloJson([
        ["ad", "yas", "adres.il", "aktif", "tc", "tel"],
        ["Ali", "30", "Ankara", "true", "01234", "12345678901"],
        ["", "", "", "", "", ""],
      ]),
    ).toEqual([
      { ad: "Ali", yas: 30, adres: { il: "Ankara" }, aktif: true, tc: "01234", tel: "12345678901" },
    ]);
  });
  it("hata konumunu bulur", () => {
    expect(
      jsonHataKonumu(
        '{\n  "a": 1,\n}',
        "Unexpected token } in JSON at position 12",
      ),
    ).toEqual({
      satir: 3,
      sutun: 1,
    });
  });
});

describe("zip", () => {
  it("sıkıştırarak yazar, okur ve açar", async () => {
    const enc = new TextEncoder();
    const uzun = enc.encode("merhaba dünya ".repeat(200));
    const z = await zipSikistir([
      { ad: "klasör/şiir.txt", veri: uzun },
      { ad: "kısa.bin", veri: new Uint8Array([1, 2, 3]) },
    ]);
    const g = zipOku(z);
    expect(g.map((x) => [x.ad, x.yontem, x.boyut])).toEqual([
      ["klasör/şiir.txt", 8, uzun.length],
      ["kısa.bin", 0, 3],
    ]);
    expect(g[0].sikisik).toBeLessThan(uzun.length / 10);
    expect(new TextDecoder().decode(await g[0].ac())).toBe(
      "merhaba dünya ".repeat(200),
    );
    expect([...(await g[1].ac())]).toEqual([1, 2, 3]);
  });
  it("UTF-8 bayrağı olmayan CP857 adları çözer", () => {
    // adı "ş.txt" CP857 (0x9F) ile değiştir, UTF-8 bayrağını kaldır
    const tek = new Uint8Array([0x9f, 0x2e, 0x74, 0x78, 0x74]);
    const yeni = zipOlustur([{ ad: "ABCDE", veri: new Uint8Array() }]);
    const cd = yeni.findIndex(
      (_, i) =>
        yeni[i] === 0x50 &&
        yeni[i + 1] === 0x4b &&
        yeni[i + 2] === 1 &&
        yeni[i + 3] === 2,
    );
    yeni.set(tek, cd + 46);
    yeni[cd + 8] = 0;
    yeni[cd + 9] = 0;
    expect(zipOku(yeni)[0].ad).toBe("ş.txt");
  });
});

describe("xlsx", () => {
  it("hücre adresleri ve tarih serileri", () => {
    expect(hucreKonumu("B3")).toEqual([1, 2]);
    expect(hucreKonumu("AA10")).toEqual([26, 9]);
    expect(sutunAdi(0)).toBe("A");
    expect(sutunAdi(27)).toBe("AB");
    expect(seriTarih(45292)).toBe("2024-01-01");
    expect(seriTarih(45292.5)).toBe("2024-01-01 12:00:00");
    expect(seriTarih(1)).toBe("1900-01-01");
  });
  it("yazdığını okur (Türkçe, sayı, mantıksal, boş hücre, çok sayfa)", async () => {
    const x = await xlsxYaz([
      {
        ad: "Öğrenciler",
        satirlar: [
          ["ad", "not", "geçti"],
          ["Çağla <&>", 92.5, true],
          [null, 40, false],
        ],
      },
      { ad: "Boş/Sayfa?", satirlar: [["tek"]] },
    ]);
    const s = await xlsxOku(x);
    expect(s.map((p) => p.ad)).toEqual(["Öğrenciler", "Boş Sayfa"]);
    expect(s[0].satirlar).toEqual([
      ["ad", "not", "geçti"],
      ["Çağla <&>", 92.5, true],
      [null, 40, false],
    ]);
  });
});
