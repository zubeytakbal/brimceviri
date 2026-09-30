import { describe, expect, it } from "vitest";
import { fark, metinKarsilastir } from "../app/converter/metin/fark";
import {
  epostaQr,
  qrCoz,
  telefonNormal,
  vcardQr,
  whatsappQr,
  wifiQr,
} from "../app/converter/metin/qrIcerik";
import {
  entropi,
  gucEtiketi,
  kirmaSuresi,
  rastgele,
  sifreUret,
} from "../app/converter/metin/sifre";

describe("qr içerik", () => {
  it("Wi-Fi özel karakterleri kaçışlar ve geri çözer", () => {
    const q = wifiQr("Ev;Ağı", 'a:b"c', "WPA");
    expect(q).toBe(String.raw`WIFI:T:WPA;S:Ev\;Ağı;P:a\:b\"c;;`);
    expect(qrCoz(q).alanlar).toEqual([
      ["Ağ adı (SSID)", "Ev;Ağı"],
      ["Şifre", 'a:b"c'],
      ["Güvenlik", "WPA"],
    ]);
    expect(wifiQr("Misafir", "x", "nopass", true)).toBe(
      "WIFI:T:nopass;S:Misafir;H:true;;",
    );
  });
  it("vCard, telefon, e-posta ve WhatsApp", () => {
    const v = vcardQr({
      ad: "Ayşe",
      soyad: "Yılmaz",
      kurum: "A, B Ltd.",
      telefon: "0532 123 45 67",
    });
    expect(v).toContain("N:Yılmaz;Ayşe;;;");
    expect(v).toContain("ORG:A\\, B Ltd.");
    expect(v).toContain("TEL;TYPE=CELL:05321234567");
    expect(qrCoz(v).alanlar[0]).toEqual(["Ad", "Ayşe Yılmaz"]);
    expect(telefonNormal("0532 123 45 67")).toBe("+905321234567");
    expect(telefonNormal("5321234567")).toBe("+905321234567");
    expect(telefonNormal("0049 30 1234")).toBe("+49301234");
    expect(epostaQr("a@b.com", "Merhaba dünya")).toBe(
      "mailto:a@b.com?subject=Merhaba%20d%C3%BCnya",
    );
    expect(whatsappQr("0532 123 45 67", "Selam")).toBe(
      "https://wa.me/905321234567?text=Selam",
    );
  });
});

describe("şifre", () => {
  it("modulo sapması olmadan aralıkta sayı üretir", () => {
    let s = 0;
    const kaynak = (a: Uint32Array) => {
      a[0] = [0xffffffff, 7][s++ % 2];
      return a;
    };
    // 0xffffffff sınırın üstünde → reddedilir, 7 kabul edilir
    expect(rastgele(10, kaynak)).toBe(7);
  });
  it("seçilen her türden en az bir karakter içerir", () => {
    for (let i = 0; i < 50; i++) {
      const s = sifreUret({
        uzunluk: 8,
        kumeler: ["buyuk", "kucuk", "rakam", "sembol"],
        benzerleriCikar: true,
      });
      expect(s).toHaveLength(8);
      expect(s).toMatch(/[A-Z]/);
      expect(s).toMatch(/[a-z]/);
      expect(s).toMatch(/\d/);
      expect(s).toMatch(/[^A-Za-z0-9]/);
      expect(s).not.toMatch(/[Il1O0]/);
    }
    expect(() =>
      sifreUret({ uzunluk: 8, kumeler: [], benzerleriCikar: false }),
    ).toThrow();
  });
  it("entropi, güç ve kırma süresi", () => {
    const b = entropi({
      uzunluk: 16,
      kumeler: ["buyuk", "kucuk", "rakam"],
      benzerleriCikar: false,
    });
    expect(b).toBeCloseTo(16 * Math.log2(62));
    expect(gucEtiketi(b).ad).toBe("Çok güçlü");
    expect(kirmaSuresi(20)).toBe("anında");
    expect(kirmaSuresi(60)).toMatch(/yıl|gün/);
  });
});

describe("fark", () => {
  it("en kısa düzenlemeyi bulur", () => {
    const p = fark("ABCABBA".split(""), "CBABAC".split(""));
    expect(p.filter((x) => x.tur !== "ayni").length).toBe(5);
    expect(
      p
        .filter((x) => x.tur !== "eklendi")
        .map((x) => x.deger)
        .join(""),
    ).toBe("ABCABBA");
    expect(
      p
        .filter((x) => x.tur !== "silindi")
        .map((x) => x.deger)
        .join(""),
    ).toBe("CBABAC");
  });
  it("satır ve kelime farkı, seçenekler", () => {
    const k = metinKarsilastir("bir\niki üç\ndört", "bir\niki dört\nbeş\ndört");
    expect(k.map((x) => x.tur)).toEqual(["ayni", "degisti", "eklendi", "ayni"]);
    expect(
      k[1].solParcalar!.filter((x) => x.tur === "silindi").map((x) => x.deger),
    ).toEqual(["üç"]);
    expect(
      metinKarsilastir("Istanbul  ", "ıstanbul", {
        boslukYoksay: true,
        harfYoksay: true,
      }).map((x) => x.tur),
    ).toEqual(["ayni"]);
    expect(
      metinKarsilastir("İstanbul  ", "istanbul", {
        boslukYoksay: true,
        harfYoksay: true,
      })[0].tur,
    ).toBe("ayni");
    expect(metinKarsilastir("", "a").map((x) => x.tur)).toEqual(["degisti"]);
  });
});

describe("qr üretimi", async () => {
  const { qrMatris, qrSvg, kontrast } =
    await import("../app/converter/metin/qr");
  const jsQR = (await import("jsqr")).default;
  it("Türkçe metni üretir ve jsQR ile geri okur", () => {
    const metin = "Çağla Şükrü İĞÜŞÖÇ ığüşöç — https://birimceviri.app";
    const m = qrMatris(metin, "H");
    const olcek = 4;
    const kenar = 4;
    const t = (m.boyut + 2 * kenar) * olcek;
    const px = new Uint8ClampedArray(t * t * 4).fill(255);
    for (let r = 0; r < m.boyut; r++)
      for (let c = 0; c < m.boyut; c++)
        if (m.koyu(r, c))
          for (let y = 0; y < olcek; y++)
            for (let x = 0; x < olcek; x++) {
              const i =
                (((r + kenar) * olcek + y) * t + (c + kenar) * olcek + x) * 4;
              px[i] = px[i + 1] = px[i + 2] = 0;
            }
    expect(jsQR(px, t, t)?.data).toBe(metin);
    expect(qrSvg(m)).toMatch(/^<svg[^>]+viewBox="0 0 \d+ \d+"/);
    expect(() => qrMatris("x".repeat(5000))).toThrow();
  });
  it("kontrast oranı", () => {
    expect(kontrast("#000000", "#ffffff")).toBeCloseTo(21);
    expect(kontrast("#777777", "#888888")).toBeLessThan(1.5);
  });
});
