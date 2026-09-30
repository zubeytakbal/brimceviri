import { degrees, PDFDocument, PDFName, PDFRawStream } from "pdf-lib";
import { describe, expect, it } from "vitest";
import {
  aralikCoz,
  birlestir,
  bol,
  esitGruplar,
  gorsellerdenPdf,
  katmanEkle,
  sayfaNumarasiEkle,
  sayfalariAl,
} from "../app/converter/pdf/pdfIslem";

async function pdfUret(n: number, genislik = 300) {
  const pdf = await PDFDocument.create();
  for (let i = 0; i < n; i++) pdf.addPage([genislik + i, 400]);
  return pdf.save();
}
const genislikler = async (v: Uint8Array) =>
  (await PDFDocument.load(v)).getPages().map((p) => Math.round(p.getWidth()));

// 1×1 piksel PNG
const PNG = Uint8Array.from(
  atob(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  ),
  (c) => c.charCodeAt(0),
);

describe("PDF işlemleri", () => {
  it("parses page ranges", () => {
    expect(aralikCoz("1-3, 5, 8-", 10)).toEqual([0, 1, 2, 4, 7, 8, 9]);
    expect(aralikCoz("3,1,3", 5)).toEqual([2, 0]);
    expect(aralikCoz("-2", 5)).toEqual([0, 1]);
    expect(() => aralikCoz("0-2", 5)).toThrow();
    expect(() => aralikCoz("4-2", 5)).toThrow();
    expect(() => aralikCoz("7", 5)).toThrow();
    expect(() => aralikCoz("a", 5)).toThrow();
    expect(esitGruplar(5, 2)).toEqual([[0, 1], [2, 3], [4]]);
  });

  it("merges, splits and reorders pages", async () => {
    const a = await pdfUret(2, 300);
    const b = await pdfUret(3, 500);
    const m = await birlestir([a, b]);
    expect(await genislikler(m)).toEqual([300, 301, 500, 501, 502]);
    const parcalar = await bol(m, esitGruplar(5, 2));
    expect(parcalar.length).toBe(3);
    expect(await genislikler(parcalar[2])).toEqual([502]);
    const sirali = await sayfalariAl(m, [4, 0], { 4: 90 });
    const d = await PDFDocument.load(sirali);
    expect(d.getPages().map((p) => Math.round(p.getWidth()))).toEqual([
      502, 300,
    ]);
    expect(d.getPage(0).getRotation().angle).toBe(90);
  });

  it("builds a PDF from images and adds page numbers", async () => {
    const pdf = await gorsellerdenPdf(
      [
        { veri: PNG, tur: "png", genislik: 800, yukseklik: 600 },
        { veri: PNG, tur: "png", genislik: 600, yukseklik: 800 },
      ],
      { sayfa: "a4", yon: "otomatik", kenar: 20 },
    );
    const d = await PDFDocument.load(pdf);
    expect(
      d
        .getPages()
        .map((p) => [Math.round(p.getWidth()), Math.round(p.getHeight())]),
    ).toEqual([
      [842, 595],
      [595, 842],
    ]);
    const n = await sayfaNumarasiEkle(pdf, {
      konum: "alt-orta",
      bicim: "n / toplam",
      baslangic: 1,
      boyut: 11,
      ilkSayfaAtla: false,
    });
    expect((await PDFDocument.load(n)).getPageCount()).toBe(2);
    await expect(birlestir([new Uint8Array([1, 2, 3])])).rejects.toThrow(
      "PDF dosyası okunamadı.",
    );
  });
});

const PNG_1X1 = Uint8Array.from(
  atob(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
  ),
  (c) => c.charCodeAt(0),
);

describe("katmanEkle", () => {
  it("görünen boyutla katman ister, aynı boyutları paylaşır, sayfa seçer", async () => {
    const d = await PDFDocument.create();
    d.addPage([595, 842]);
    d.addPage([595, 842]).setRotation(degrees(90));
    d.addPage([595, 842]);
    d.addPage([300, 300]);
    const istek: string[] = [];
    const cikti = await katmanEkle(
      await d.save(),
      async (w, h, i) => {
        istek.push(`${i}:${w}x${h}`);
        return PNG_1X1;
      },
      [0, 1, 2],
    );
    expect(istek).toEqual(["0:595x842", "1:842x595"]);
    const o = await PDFDocument.load(cikti);
    expect(o.getPageCount()).toBe(4);
    const gorsel = o.context
      .enumerateIndirectObjects()
      .filter(
        ([, x]) =>
          x instanceof PDFRawStream &&
          x.dict.get(PDFName.of("Subtype")) === PDFName.of("Image") &&
          x.dict.has(PDFName.of("SMask")),
      );
    // saydam PNG: her katman bir görsel + maskesi
    expect(gorsel.length).toBe(2);
  });
});
