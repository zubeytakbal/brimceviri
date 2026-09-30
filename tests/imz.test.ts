import { describe, expect, it } from "vitest";
import {
  asilAd,
  dosyaTuru,
  imzaCoz,
  ikiliyeCevir,
} from "../app/converter/belge/imz";
import * as O from "./imzOrnekleri";

const b64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
const enc = new TextEncoder();
const dec = new TextDecoder();

describe("imz", () => {
  it("RSA imzalı dosyayı açar ve doğrular", async () => {
    const p = await imzaCoz(b64(O.RSA));
    expect(dec.decode(p.icerik)).toBe(O.ASIL);
    expect(p.ayrik).toBe(false);
    expect(p.imzacilar).toHaveLength(1);
    const i = p.imzacilar[0];
    expect(i.sonuc).toBe("gecerli");
    expect(i.ozetEslesiyor).toBe(true);
    expect(i.ozetAlg).toBe("SHA-256");
    expect(i.imzaZamani).toBeInstanceOf(Date);
    expect(i.sertifika).toMatchObject({
      ad: "AYŞE YILMAZ",
      seriAlan: "12345678950",
      ulke: "TR",
      anahtar: { tur: "RSA", bit: 2048 },
    });
    expect(i.sertifika!.bitis!.getTime()).toBeGreaterThan(Date.now());
  });
  it("ECDSA (P-256) imzayı doğrular", async () => {
    const p = await imzaCoz(b64(O.EC));
    expect(p.imzacilar[0].sertifika?.ad).toBe("MEHMET ÖZ");
    expect(p.imzacilar[0].sertifika?.anahtar).toEqual({
      tur: "EC",
      egri: "P-256",
    });
    expect(p.imzacilar[0].sonuc).toBe("gecerli");
  });
  it("BER (belirsiz uzunluk, parçalı içerik)", async () => {
    const p = await imzaCoz(b64(O.BER));
    expect(dec.decode(p.icerik)).toBe(O.ASIL);
    expect(p.imzacilar[0].sonuc).toBe("gecerli");
  });
  it("PEM biçimi", async () => {
    expect(ikiliyeCevir(enc.encode(O.PEM))[0]).toBe(0x30);
    const p = await imzaCoz(enc.encode(O.PEM));
    expect(p.imzacilar[0].sonuc).toBe("gecerli");
  });
  it("değiştirilmiş içerik geçersiz çıkar", async () => {
    const p = await imzaCoz(b64(O.BOZUK));
    expect(p.imzacilar[0].ozetEslesiyor).toBe(false);
    expect(p.imzacilar[0].sonuc).toBe("gecersiz");
  });
  it("ayrık imza: asıl dosyayla doğrulanır", async () => {
    const p = await imzaCoz(b64(O.AYRIK));
    expect(p.ayrik).toBe(true);
    expect(p.icerik).toBeUndefined();
    expect(p.imzacilar[0].ozetEslesiyor).toBeUndefined();
    expect(p.imzacilar[0].sonuc).toBe("asilGerekli");
    const q = await imzaCoz(b64(O.AYRIK), enc.encode(O.ASIL));
    expect(q.imzacilar[0].sonuc).toBe("gecerli");
    const r = await imzaCoz(b64(O.AYRIK), enc.encode("başka"));
    expect(r.imzacilar[0].sonuc).toBe("gecersiz");
  });
  it("iç içe (seri) imza katmanları açılır", async () => {
    const p = await imzaCoz(b64(O.SERI));
    expect(dec.decode(p.icerik)).toBe(O.ASIL);
    expect(
      p.imzacilar.map((i) => [i.katman, i.sertifika?.ad, i.sonuc]),
    ).toEqual([
      [1, "MEHMET ÖZ", "gecerli"],
      [2, "AYŞE YILMAZ", "gecerli"],
    ]);
  });
  it("imza olmayan dosyayı reddeder", async () => {
    await expect(imzaCoz(enc.encode("%PDF-1.4"))).rejects.toThrow(/e-imza/);
    await expect(
      imzaCoz(new Uint8Array([0x30, 0x03, 1, 2, 3])),
    ).rejects.toThrow();
  });
  it("tür ve ad tahmini", () => {
    const t = dosyaTuru(enc.encode(O.ASIL));
    expect(t.uzanti).toBe("pdf");
    expect(asilAd("sozlesme.pdf.imz", t)).toBe("sozlesme.pdf");
    expect(asilAd("dilekce.imz", t)).toBe("dilekce.pdf");
    expect(asilAd("x.p7s", t)).toBe("x.pdf");
    expect(dosyaTuru(new Uint8Array([0x89, 0x50, 0x4e, 0x47])).uzanti).toBe(
      "png",
    );
  });
});
