import { describe, expect, it } from "vitest";
import { zipOlustur } from "../app/converter/gorsel/zip";
import { zipOku } from "../app/converter/arsiv/zipOku";
import { xmlAyristir, hepsi, metin } from "../app/converter/belge/xml";
import {
  renkCoz,
  udfHtml,
  udfIcerikCoz,
  udfMetin,
  udfOku,
} from "../app/converter/belge/udf";
import { gorselBoyutu, udfDocx } from "../app/converter/belge/docx";
import { eypAc, tarihMetni, turTahmin } from "../app/converter/belge/eyp";

const enc = new TextEncoder();
const dec = new TextDecoder();

// 1x1 PNG
const PNG =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==";

const METIN =
  "T.C.\nİSTANBUL 3. ASLİYE HUKUK MAHKEMESİ\nEsas No\t: 2026/15 <&>\nDavacı\nAyşe Yılmaz\n\n";
const CONTENT = `<?xml version="1.0" encoding="UTF-8"?>
<template format_id="1.8">
<content><![CDATA[${METIN}]]></content>
<properties><pageFormat mediaSizeName="1" leftMargin="42.5" rightMargin="42.5" topMargin="56.7" bottomMargin="56.7" paperOrientation="1"/></properties>
<elements resolver="hvl-default">
<header><paragraph><content startOffset="0" length="0"/></paragraph></header>
<paragraph Alignment="1" resolver="hvl-default"><content bold="true" startOffset="0" length="5"/></paragraph>
<paragraph Alignment="1" SpaceAbove="6"><content bold="true" size="14" startOffset="5" length="35"/></paragraph>
<paragraph LeftIndent="20"><content startOffset="40" length="7"/><tab startOffset="47" length="1"/><content foreground="-65536" startOffset="48" length="14"/></paragraph>
<table tableName="Sabit" columnCount="2" columnSpans="100,300" border="borderCell">
<row rowName="r1"><cell><paragraph><content startOffset="62" length="7"/></paragraph></cell><cell><paragraph><content italic="true" startOffset="69" length="12"/></paragraph></cell></row>
</table>
<page-break/>
<paragraph><content startOffset="81" length="1"/></paragraph>
<paragraph><image imageData="${PNG}" width="40" height="40" startOffset="81" length="1"/></paragraph>
</elements>
<styles><style name="default" family="Dialog" size="12"/><style name="hvl-default" family="Times New Roman" size="12"/></styles>
</template>`;

describe("xml", () => {
  it("CDATA, varlıklar, önekler ve sıra korunur", () => {
    const k = xmlAyristir(
      `<?xml version="1.0"?><!-- yorum --><a:kok xmlns:a="x"><a:b n='1 > 0'>x &amp; &#305;<![CDATA[<y>]]></a:b><c/><b>2</b></a:kok>`,
    );
    expect(k.yerel).toBe("kok");
    expect(k.cocuk.map((c) => (typeof c === "string" ? c : c.ad))).toEqual([
      "a:b",
      "c",
      "b",
    ]);
    const b = hepsi(k, "b");
    expect(b.length).toBe(2);
    expect(b[0].oz.n).toBe("1 > 0");
    expect(metin(b[0])).toBe("x & ı<y>");
  });
});

describe("udf", () => {
  it("renk çözümü", () => {
    expect(renkCoz("-65536")).toBe("#ff0000");
    expect(renkCoz("-16777216")).toBeUndefined();
  });
  it("içerik modeli", () => {
    const b = udfIcerikCoz(CONTENT);
    expect(b.font).toBe("Times New Roman");
    expect(b.sayfa.genislik).toBeCloseTo(595.28);
    expect(b.sayfa.sol).toBe(42.5);
    expect(b.govde.map((x) => x.tur)).toEqual([
      "paragraf",
      "paragraf",
      "paragraf",
      "tablo",
      "sayfaSonu",
      "paragraf",
      "paragraf",
    ]);
    const p0 = b.govde[0];
    if (p0.tur !== "paragraf") throw new Error();
    expect(p0.hiza).toBe(1);
    expect(p0.parcalar).toEqual([
      expect.objectContaining({ metin: "T.C.", kalin: true }),
    ]);
    const p2 = b.govde[2];
    if (p2.tur !== "paragraf") throw new Error();
    expect(p2.solGirinti).toBe(20);
    expect(p2.parcalar.map((x) => x.tur)).toEqual(["metin", "sekme", "metin"]);
    expect(p2.parcalar[2]).toMatchObject({ renk: "#ff0000" });
    const t = b.govde[3];
    if (t.tur !== "tablo") throw new Error();
    expect(t.genislikler).toEqual([100, 300]);
    const hp = t.satirlar[0][1].bloklar[0];
    if (hp.tur !== "paragraf") throw new Error();
    expect(hp.parcalar[0]).toMatchObject({
      metin: "Ayşe Yılmaz",
      italik: true,
    });
  });
  it("HTML ve düz metin", () => {
    const b = { ...udfIcerikCoz(CONTENT), imzali: false };
    const h = udfHtml(b);
    expect(h).toContain("@page{size:595.28pt 841.89pt");
    expect(h).toContain("2026/15 &lt;&amp;&gt;");
    expect(h).toContain("color:#ff0000");
    expect(h).toContain('<col style="width:75.00%">');
    expect(h).toContain("data:image/png;base64,");
    const m = udfMetin(b);
    expect(m).toContain("İSTANBUL 3. ASLİYE HUKUK MAHKEMESİ\r\n");
    expect(m).toContain("Esas No\t: 2026/15 <&>");
    expect(m).toContain("Davacı\tAyşe Yılmaz");
  });
  it("ZIP'li .udf, doğrulama kodu ve imza", async () => {
    const z = zipOlustur([
      { ad: "content.xml", veri: enc.encode(CONTENT) },
      {
        ad: "documentproperties.xml",
        veri: enc.encode(
          `<?xml version="1.0"?><properties><entry key="uyapdogrulamakodu">AbC123=</entry></properties>`,
        ),
      },
      { ad: "sign.sgn", veri: new Uint8Array([1, 2, 3]) },
    ]);
    const b = await udfOku(z);
    expect(b.dogrulamaKodu).toBe("AbC123=");
    expect(b.imzali).toBe(true);
    await expect(udfOku(enc.encode("merhaba"))).rejects.toThrow(/UDF/);
  });
  it("DOCX üretimi", async () => {
    const b = { ...udfIcerikCoz(CONTENT), imzali: false };
    const d = await udfDocx(b);
    const g = zipOku(d);
    const ad = g.map((x) => x.ad);
    expect(ad).toContain("[Content_Types].xml");
    expect(ad).toContain("word/media/image1.png");
    const doc = dec.decode(
      await g.find((x) => x.ad === "word/document.xml")!.ac(),
    );
    expect(doc).toContain('<w:jc w:val="center"/>');
    expect(doc).toContain("<w:b/>");
    expect(doc).toContain('<w:sz w:val="28"/>');
    expect(doc).toContain("<w:tab/>");
    expect(doc).toContain('<w:color w:val="ff0000"/>');
    expect(doc).toContain("2026/15 &lt;&amp;&gt;");
    expect(doc).toContain('<w:br w:type="page"/>');
    expect(doc).toContain('<w:pgSz w:w="11906" w:h="16838"/>');
    expect(doc).toContain('<w:gridCol w:w="2552"/>');
    const rels = dec.decode(
      await g.find((x) => x.ad === "word/_rels/document.xml.rels")!.ac(),
    );
    expect(rels).toContain('Target="media/image1.png"');
    // XML iyi biçimli mi
    expect(() => xmlAyristir(doc)).not.toThrow();
  });
  it("liste, satır birleştirme ve iç içe tablo", async () => {
    const T = "a\nb\nc\nd\ne\nf\n";
    const c = (o: number) => `<content startOffset="${o}" length="2"/>`;
    const x = `<template><content><![CDATA[${T}]]></content><elements>
<paragraph Numbered="true" ListLevel="0" ListId="3">${c(0)}</paragraph>
<paragraph Numbered="true" ListLevel="1" ListId="3" NumberType="NUMBER_TYPE_LETTER_SMALL">${c(2)}</paragraph>
<paragraph Numbered="true" ListLevel="0" ListId="3">${c(4)}</paragraph>
<table columnSpans="1,1"><row><cell rowspan="2" fillColor="-256" align="vcenter"><paragraph>${c(6)}</paragraph></cell><cell borderSpec="5"><paragraph>${c(8)}</paragraph></cell></row>
<row><cell><table><row><cell><paragraph>${c(10)}</paragraph></cell></row></table></cell></row></table>
</elements></template>`;
    const b = { ...udfIcerikCoz(x), imzali: false };
    const lis = b.govde
      .slice(0, 3)
      .map((p) => (p.tur === "paragraf" ? p.liste?.isaret : null));
    expect(lis).toEqual(["1.", "a)", "2."]);
    const t = b.govde[3];
    if (t.tur !== "tablo") throw new Error();
    expect(t.satirlar[0][0]).toMatchObject({
      satirBirlesik: 2,
      zemin: "#ffff00",
      dikey: "middle",
      kenar: 15,
    });
    expect(t.satirlar[0][1].kenar).toBe(5);
    expect(t.satirlar[1][0].bloklar[0].tur).toBe("tablo");
    const h = udfHtml(b);
    expect(h).toContain('rowspan="2"');
    expect(h).toContain("border-top:0.75pt solid #000;border-right:none");
    expect(udfMetin(b)).toContain("  a) b");
    const g = zipOku(await udfDocx(b));
    const doc = dec.decode(
      await g.find((z) => z.ad === "word/document.xml")!.ac(),
    );
    expect(doc).toContain('<w:vMerge w:val="restart"/>');
    expect(doc.match(/<w:vMerge\/>/g)?.length).toBe(1);
    expect(doc).toContain('w:fill="ffff00"');
    expect(doc).toContain('<w:vAlign w:val="center"/>');
    expect(doc.match(/<w:tbl>/g)?.length).toBe(2);
    expect(() => xmlAyristir(doc)).not.toThrow();
  });
  it("görsel boyutu", () => {
    const v = Uint8Array.from(atob(PNG), (c) => c.charCodeAt(0));
    expect(gorselBoyutu(v)).toEqual([1, 1]);
  });
});

describe("eyp", () => {
  const USTVERI = `<?xml version="1.0" encoding="utf-8"?>
<tipler:Ustveri xmlns:tipler="urn:dpt:eyazisma:schema:xsd:Tipler-1">
<tipler:BelgeId>7F3A</tipler:BelgeId>
<tipler:Konu>Personel görevlendirmesi</tipler:Konu>
<tipler:Tarih>2026-03-05T14:20:00</tipler:Tarih>
<tipler:BelgeNo>E-12345678-903.02-999</tipler:BelgeNo>
<tipler:GuvenlikKodu>TSD</tipler:GuvenlikKodu>
<tipler:Olusturan><tipler:KurumKurulus><tipler:KKK>123</tipler:KKK><tipler:Adi>Örnek Bakanlığı</tipler:Adi></tipler:KurumKurulus></tipler:Olusturan>
<tipler:Dagitimlar><tipler:Dagitim><tipler:KurumKurulus><tipler:Adi>Ankara Valiliği</tipler:Adi></tipler:KurumKurulus></tipler:Dagitim></tipler:Dagitimlar>
<tipler:Ekler><tipler:Ek><tipler:Id>1</tipler:Id><tipler:Tur>DED</tipler:Tur><tipler:DosyaAdi>Liste.pdf</tipler:DosyaAdi><tipler:Ad>Görevli listesi</tipler:Ad><tipler:Sira>1</tipler:Sira></tipler:Ek>
<tipler:Ek><tipler:Tur>FZK</tipler:Tur><tipler:Ad>CD (1 adet)</tipler:Ad></tipler:Ek></tipler:Ekler>
</tipler:Ustveri>`;
  const RELS = `<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="a" Type="http://eyazisma.dpt/iliskiler/ustyazi" Target="/UstYazi/belge.pdf"/>
<Relationship Id="b" Type="http://eyazisma.dpt/iliskiler/ustveri" Target="Ustveri/Ustveri.xml"/>
</Relationships>`;
  it("tür tahmini", () => {
    expect(turTahmin("ÜstYazı/x.pdf")).toBe("ustYazi");
    expect(turTahmin("Ekler/liste.pdf")).toBe("ek");
    expect(turTahmin("Imzalar/ImzaCades.imz")).toBe("imza");
    expect(turTahmin("PaketOzeti/PaketOzeti.xml")).toBe("paketOzeti");
  });
  it("paketi açar, ekleri eşler", async () => {
    const z = zipOlustur([
      { ad: "[Content_Types].xml", veri: enc.encode("<Types/>") },
      { ad: "_rels/.rels", veri: enc.encode(RELS) },
      { ad: "UstYazi/belge.pdf", veri: enc.encode("%PDF-1.7 ana") },
      { ad: "Ustveri/Ustveri.xml", veri: enc.encode(USTVERI) },
      { ad: "Ekler/Liste.pdf", veri: enc.encode("%PDF-1.7 ek") },
      { ad: "Ekler/Tablo.xlsx", veri: enc.encode("x") },
      { ad: "Imzalar/ImzaCades.imz", veri: enc.encode("imza") },
    ]);
    const p = await eypAc(z);
    expect(p.ustYazi?.yol).toBe("UstYazi/belge.pdf");
    expect(p.imzali).toBe(true);
    const u = p.ustveri!;
    expect(u.konu).toBe("Personel görevlendirmesi");
    expect(u.belgeNo).toBe("E-12345678-903.02-999");
    expect(u.olusturan).toBe("Örnek Bakanlığı");
    expect(u.dagitimlar).toEqual(["Ankara Valiliği"]);
    expect(p.ekler.map((e) => [e.ad, e.tur, e.bilesen?.ad])).toEqual([
      ["Görevli listesi", "DED", "Liste.pdf"],
      ["CD (1 adet)", "FZK", undefined],
      ["Tablo.xlsx", undefined, "Tablo.xlsx"],
    ]);
    expect(tarihMetni(u.tarih!)).toBe("05.03.2026 14:20");
  });
  it("EYP olmayan dosyayı reddeder", async () => {
    await expect(eypAc(enc.encode("abc"))).rejects.toThrow(/EYP/);
    const z = zipOlustur([{ ad: "a.txt", veri: enc.encode("x") }]);
    await expect(eypAc(z)).rejects.toThrow(/üst yazı/);
  });
});
