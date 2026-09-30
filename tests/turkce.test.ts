import Deasciifier from "turkish-deasciifier";
import { describe, expect, it } from "vitest";
import {
  harfDonustur,
  heceleMetin,
  kelimeHecele,
  sayiKelimeler,
  sayiYaziya,
  slugYap,
  turkceKaldir,
  tutarAyristir,
} from "../app/converter/metin/turkce";
import {
  ibanDogrula,
  tcknDogrula,
  vknDogrula,
} from "../app/converter/metin/dogrulama";
import * as O from "./dogrulamaOrnekleri";

describe("harf dönüşümü", () => {
  it("Türkçe İ/ı kuralı", () => {
    expect(harfDonustur("istanbul ılık", "buyuk")).toBe("İSTANBUL ILIK");
    expect(harfDonustur("İSTANBUL ILIK", "kucuk")).toBe("istanbul ılık");
    expect(harfDonustur("istanbul", "buyuk", false)).toBe("ISTANBUL");
    expect(harfDonustur("ANKARA'DA İKİ ışık", "baslik")).toBe(
      "Ankara'da İki Işık",
    );
    expect(
      harfDonustur("merhaba. nasılsın? iyiyim!\nyeni satır", "cumle"),
    ).toBe("Merhaba. Nasılsın? İyiyim!\nYeni satır");
    expect(harfDonustur("İyi ı", "ters")).toBe("iYİ I");
  });
  it("Türkçe karakter kaldırma ve slug", () => {
    expect(turkceKaldir("Çağrı Şükrü Öğüt İlhan")).toBe(
      "Cagri Sukru Ogut Ilhan",
    );
    expect(slugYap("Şişli'de Kira Artışı 2026!")).toBe(
      "sislide-kira-artisi-2026",
    );
  });
  it("karakter düzeltici paketi", () => {
    const d = new Deasciifier();
    expect(d.deasciify("Turkce karakter duzeltme cok kolay")).toBe(
      "Türkçe karakter düzeltme çok kolay",
    );
  });
});

describe("hece", () => {
  it("kelimeler", () => {
    const h = (k: string) => kelimeHecele(k).join("-");
    expect(h("kardeşlik")).toBe("kar-deş-lik");
    expect(h("saat")).toBe("sa-at");
    expect(h("Türkçe")).toBe("Türk-çe");
    expect(h("sporcu")).toBe("spor-cu");
    expect(h("elma")).toBe("el-ma");
    expect(h("okul")).toBe("o-kul");
    expect(h("ç")).toBe("ç");
  });
  it("hece ölçüsü", () => {
    const r = heceleMetin(
      "Korkma, sönmez bu şafaklarda yüzen al sancak;\nSönmeden yurdumun üstünde tüten en son ocak.",
    );
    expect(r[0].heceli).toBe(
      "Kork-ma, sön-mez bu şa-fak-lar-da yü-zen al san-cak;",
    );
    expect(r.map((x) => x.sayi)).toEqual([14, 15]);
  });
});

describe("sayıyı yazıya", () => {
  const k = (n: number | string) => sayiKelimeler(BigInt(n)).join(" ");
  it("tam sayılar", () => {
    expect(k(0)).toBe("sıfır");
    expect(k(1000)).toBe("bin");
    expect(k(1100)).toBe("bin yüz");
    expect(k(101)).toBe("yüz bir");
    expect(k(2001000)).toBe("iki milyon bin");
    expect(k(1000000)).toBe("bir milyon");
    expect(k(981_234_567)).toBe(
      "dokuz yüz seksen bir milyon iki yüz otuz dört bin beş yüz altmış yedi",
    );
    expect(k("1000000000000")).toBe("bir trilyon");
  });
  it("tutar ayrıştırma", () => {
    expect(tutarAyristir("1.234,56")).toEqual({
      tam: BigInt(1234),
      kurus: 56,
      eksi: false,
    });
    expect(tutarAyristir("1234.5")).toEqual({
      tam: BigInt(1234),
      kurus: 50,
      eksi: false,
    });
    expect(tutarAyristir("1.234.567")).toEqual({
      tam: BigInt(1234567),
      kurus: 0,
      eksi: false,
    });
    expect(tutarAyristir("12,999")).toEqual({
      tam: BigInt(13),
      kurus: 0,
      eksi: false,
    });
    expect(tutarAyristir("abc")).toBeNull();
  });
  it("para biçimleri", () => {
    expect(
      sayiYaziya("1250,50", {
        para: "turkLirasi",
        bitisik: false,
        buyukHarf: false,
      }),
    ).toBe("bin iki yüz elli Türk lirası elli kuruş");
    expect(
      sayiYaziya("1250,50", { para: "tl", bitisik: true, buyukHarf: false }),
    ).toBe("BinİkiYüzElliTLElliKr");
    expect(
      sayiYaziya("0,75", { para: "tl", bitisik: false, buyukHarf: false }),
    ).toBe("yetmiş beş Kr");
    expect(
      sayiYaziya("3,05", { para: "yok", bitisik: false, buyukHarf: true }),
    ).toBe("ÜÇ VİRGÜL SIFIR BEŞ");
  });
});

describe("doğrulama", () => {
  it("TCKN, python-stdnum ile aynı", () => {
    for (const t of O.TCKN_GECERLI) expect(tcknDogrula(t).gecerli).toBe(true);
    for (const t of O.TCKN_GECERSIZ) expect(tcknDogrula(t).gecerli).toBe(false);
    expect(tcknDogrula("01234567890").neden).toMatch(/İlk hane/);
    expect(tcknDogrula("123").neden).toMatch(/11 hane/);
  });
  it("VKN, python-stdnum ile aynı", () => {
    for (const t of O.VKN_GECERLI) expect(vknDogrula(t).gecerli).toBe(true);
    for (const t of O.VKN_GECERSIZ) expect(vknDogrula(t).gecerli).toBe(false);
  });
  it("IBAN, python-stdnum ile aynı", () => {
    for (const t of O.IBAN_GECERLI) {
      const r = ibanDogrula(t.replace(/(.{4})/g, "$1 ").toLowerCase());
      expect(r.gecerli).toBe(true);
      expect(r.bankaKodu).toBe(t.slice(4, 9));
    }
    for (const t of O.IBAN_GECERSIZ) expect(ibanDogrula(t).gecerli).toBe(false);
    expect(ibanDogrula("DE89370400440532013000").gecerli).toBe(true);
    expect(ibanDogrula("TR12345").neden).toMatch(/26 karakter/);
  });
});
