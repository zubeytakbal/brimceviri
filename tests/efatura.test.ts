import { describe, expect, it } from "vitest";
import {
  faturaCoz,
  faturaHtml,
  faturalariOku,
  faturaTablolari,
  para,
  tekillestir,
} from "../app/converter/belge/efatura";
import { zipOlustur } from "../app/converter/gorsel/zip";
import { FATURA } from "./faturaOrnek";

const enc = new TextEncoder();

describe("e-Fatura", () => {
  it("başlık, taraflar ve toplamlar", () => {
    const f = faturaCoz(FATURA);
    expect(f).toMatchObject({
      profil: "TICARIFATURA",
      tip: "TEVKIFAT",
      no: "ABC2026000000123",
      ettn: "F47AC10B-58CC-4372-A567-0E02B2C3D479",
      tarih: "2026-03-05",
      siparisNo: "SP-77",
      irsaliyeler: ["IRS2026000000009"],
      notlar: ["Yalnız on iki bin TL'dir.", "Ödeme 30 gün vadelidir."],
    });
    expect(f.satici).toMatchObject({
      unvan: "Örnek Yazılım A.Ş.",
      vkn: "1234567890",
      vergiDairesi: "Kadıköy",
      adres: "Atatürk Cad. No: 12, 34710 Kadıköy / İstanbul Türkiye",
      eposta: "fatura@ornek.com.tr",
    });
    expect(f.satici.digerKimlik).toEqual([["MERSISNO", "0123456789000015"]]);
    expect(f.alici).toMatchObject({
      unvan: "Ayşe Yılmaz",
      tckn: "12345678950",
    });
    expect(f.toplam).toEqual({
      malHizmet: 10000,
      iskonto: 500,
      vergiHaric: 10000,
      vergiDahil: 12000,
      odenecek: 11000,
    });
    expect(f.vergiler).toEqual([
      { ad: "KDV", kod: "0015", oran: 20, matrah: 10000, tutar: 2000 },
    ]);
    expect(f.tevkifatlar[0]).toMatchObject({
      kod: "616",
      oran: 50,
      tutar: 1000,
    });
    expect(f.xslt).toContain("ŞABLON");
  });
  it("kalemler", () => {
    const [a, b] = faturaCoz(FATURA).kalemler;
    expect(a).toMatchObject({
      ad: "Yazılım geliştirme hizmeti",
      kod: "YZL-01",
      miktar: 40,
      birim: "Saat",
      birimFiyat: 200,
      iskonto: 500,
      tutar: 7500,
      kdvOrani: 20,
      kdvTutari: 1500,
      not: "Mart ayı",
    });
    expect(b).toMatchObject({
      ad: "Lisans & destek",
      aciklama: "Yıllık",
      birim: "Adet",
    });
  });
  it("HTML görünümü kaçışlı", () => {
    const h = faturaHtml(faturaCoz(FATURA));
    expect(h).toContain("Ticari e-Fatura");
    expect(h).toContain("Tevkifat faturası");
    expect(h).toContain("Lisans &amp; destek");
    expect(h).toContain(para(11000));
    expect(h).toContain("Tevkifat Yazılım Hizmeti Tevkifatı (%50)");
    expect(h).not.toContain("<script");
  });
  it("toplu okuma: ZIP, hatalı dosya, tekrar", async () => {
    const z = zipOlustur([
      { ad: "a.xml", veri: enc.encode(FATURA) },
      {
        ad: "b.xml",
        veri: enc.encode(
          FATURA.replace("ABC2026000000123", "ABC2026000000124").replace(
            "F47AC10B-58CC",
            "A47AC10B-58CC",
          ),
        ),
      },
      { ad: "not.txt", veri: enc.encode("x") },
    ]);
    const { faturalar, hatalar } = await faturalariOku([
      { ad: "paket.zip", veri: z },
      { ad: "a.xml", veri: enc.encode(FATURA) },
      { ad: "bozuk.xml", veri: enc.encode("<DespatchAdvice/>") },
    ]);
    expect(faturalar).toHaveLength(3);
    expect(tekillestir(faturalar)).toHaveLength(2);
    expect(hatalar).toEqual([
      { ad: "bozuk.xml", mesaj: expect.stringMatching(/İrsaliye/) },
    ]);
    const t = faturaTablolari(tekillestir(faturalar).map((x) => x.fatura));
    expect(t.ozet).toHaveLength(3);
    expect(t.ozet[1].slice(0, 2)).toEqual(["05.03.2026", "ABC2026000000123"]);
    expect(t.ozet[1].slice(-5)).toEqual([2000, 0, 1000, 12000, 11000]);
    expect(t.kalemler).toHaveLength(5);
  });
  it("fatura olmayan XML", () => {
    expect(() => faturaCoz("<Order/>")).toThrow(/e-Fatura/);
  });
});
