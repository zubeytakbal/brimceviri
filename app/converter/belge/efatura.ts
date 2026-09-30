// e-Fatura / e-Arşiv fatura (UBL-TR 1.2, UBL 2.1 Invoice) XML okuyucu.
// Ad alanı önekleri (cbc:, cac:) farklı olabildiği için öneksiz adlarla okunur.
import { zipOku } from "../arsiv/zipOku";
import type { Tablo } from "../veri/csv";
import { altlar, bul, metin, xmlAyristir, type XmlDugum } from "./xml";

export type Taraf = {
  unvan: string;
  vkn?: string;
  tckn?: string;
  digerKimlik: Array<[string, string]>;
  vergiDairesi?: string;
  adres: string;
  telefon?: string;
  eposta?: string;
  web?: string;
};

export type Kalem = {
  sira: string;
  ad: string;
  aciklama?: string;
  kod?: string;
  miktar: number;
  birim: string;
  birimFiyat: number;
  iskonto: number;
  tutar: number;
  kdvOrani?: number;
  kdvTutari: number;
  not?: string;
};

export type Vergi = {
  ad: string;
  kod?: string;
  oran?: number;
  matrah: number;
  tutar: number;
};

export type Fatura = {
  profil: string;
  tip: string;
  no: string;
  ettn: string;
  tarih: string;
  saat?: string;
  paraBirimi: string;
  kur?: number;
  notlar: string[];
  siparisNo?: string;
  irsaliyeler: string[];
  satici: Taraf;
  alici: Taraf;
  kalemler: Kalem[];
  vergiler: Vergi[];
  tevkifatlar: Vergi[];
  toplam: {
    malHizmet: number;
    iskonto: number;
    vergiHaric: number;
    vergiDahil: number;
    odenecek: number;
  };
  /** Faturaya gömülü görüntüleme şablonu (XSLT) */
  xslt?: string;
};

const k = (d: XmlDugum | undefined, ...yol: string[]) => {
  let x = d;
  for (const y of yol) x = bul(x, y);
  return x;
};
const m = (d: XmlDugum | undefined, ...yol: string[]) =>
  metin(k(d, ...yol)).trim();
const n = (d: XmlDugum | undefined, ...yol: string[]) => {
  const v = parseFloat(m(d, ...yol).replace(",", "."));
  return Number.isFinite(v) ? v : 0;
};
const hepsiAlt = (d: XmlDugum | undefined, ad: string) =>
  d ? altlar(d).filter((x) => x.yerel === ad) : [];

/** UN/ECE Rec. 20 birim kodlarının Türkçe karşılıkları (e-Faturada en sık kullanılanlar). */
export const BIRIM: Record<string, string> = {
  C62: "Adet",
  NIU: "Adet",
  H87: "Adet",
  KGM: "kg",
  GRM: "g",
  TNE: "ton",
  LTR: "L",
  MLT: "mL",
  MTR: "m",
  CMT: "cm",
  MMT: "mm",
  KTM: "km",
  MTK: "m²",
  MTQ: "m³",
  HUR: "Saat",
  MIN: "Dakika",
  DAY: "Gün",
  WEE: "Hafta",
  MON: "Ay",
  ANN: "Yıl",
  KWH: "kWh",
  KWT: "kW",
  MWH: "MWh",
  SET: "Set",
  PR: "Çift",
  BX: "Kutu",
  PA: "Paket",
  CT: "Karton",
  PK: "Paket",
  DZN: "Düzine",
  R9: "1000 m³",
  SM3: "Sm³",
};

function taraf(p: XmlDugum | undefined): Taraf {
  const kimlikler: Array<[string, string]> = hepsiAlt(p, "PartyIdentification")
    .map((x) => {
      const id = bul(x, "ID");
      return [(id?.oz.schemeID ?? "").toUpperCase(), metin(id).trim()] as [
        string,
        string,
      ];
    })
    .filter(([, v]) => v);
  const kisi = k(p, "Person");
  const kisiAdi = [
    m(kisi, "Title"),
    m(kisi, "FirstName"),
    m(kisi, "MiddleName"),
    m(kisi, "FamilyName"),
  ]
    .filter(Boolean)
    .join(" ");
  const a = k(p, "PostalAddress");
  const sokak = [
    m(a, "Room") && `No: ${m(a, "Room")}`,
    m(a, "StreetName"),
    m(a, "BuildingName"),
    m(a, "BuildingNumber") && `No: ${m(a, "BuildingNumber")}`,
    m(a, "District"),
  ]
    .filter(Boolean)
    .join(" ");
  const sehir = [
    m(a, "PostalZone"),
    [m(a, "CitySubdivisionName"), m(a, "CityName")].filter(Boolean).join(" / "),
    m(a, "Country", "Name"),
  ]
    .filter(Boolean)
    .join(" ");
  const iletisim = k(p, "Contact");
  return {
    unvan: m(p, "PartyName", "Name") || kisiAdi || "—",
    vkn: kimlikler.find(([s]) => s === "VKN")?.[1],
    tckn: kimlikler.find(([s]) => s === "TCKN")?.[1],
    digerKimlik: kimlikler.filter(([s]) => s !== "VKN" && s !== "TCKN"),
    vergiDairesi: m(p, "PartyTaxScheme", "TaxScheme", "Name") || undefined,
    adres: [sokak, sehir].filter(Boolean).join(", "),
    telefon: m(iletisim, "Telephone") || undefined,
    eposta: m(iletisim, "ElectronicMail") || undefined,
    web: m(p, "WebsiteURI") || undefined,
  };
}

function vergiler(toplam: XmlDugum[]): Vergi[] {
  return toplam.flatMap((t) =>
    hepsiAlt(t, "TaxSubtotal").map((s) => {
      const ts = k(s, "TaxCategory", "TaxScheme");
      const oran = m(s, "Percent");
      return {
        ad: m(ts, "Name") || m(ts, "TaxTypeCode") || "Vergi",
        kod: m(ts, "TaxTypeCode") || undefined,
        oran: oran ? parseFloat(oran) : undefined,
        matrah: n(s, "TaxableAmount"),
        tutar: n(s, "TaxAmount"),
      };
    }),
  );
}

function b64Metin(b64: string) {
  const s = atob(b64.replace(/\s+/g, ""));
  const b = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) b[i] = s.charCodeAt(i);
  return new TextDecoder().decode(b);
}

export function faturaCoz(xml: string): Fatura {
  const kok = xmlAyristir(xml);
  if (kok.yerel !== "Invoice")
    throw new Error(
      kok.yerel === "DespatchAdvice"
        ? "Bu bir e-İrsaliye; bu araç faturaları gösterir."
        : "Bu XML bir e-Fatura (UBL Invoice) değil.",
    );
  const kalemler: Kalem[] = hepsiAlt(kok, "InvoiceLine").map((l) => {
    const mik = bul(l, "InvoicedQuantity");
    const birimKod = mik?.oz.unitCode ?? "";
    const vergi = vergiler(hepsiAlt(l, "TaxTotal"));
    const kdv = vergi.find((v) => v.kod === "0015") ?? vergi[0];
    const iskonto = hepsiAlt(l, "AllowanceCharge")
      .filter((a) => m(a, "ChargeIndicator") !== "true")
      .reduce((t, a) => t + n(a, "Amount"), 0);
    return {
      sira: m(l, "ID"),
      ad: m(l, "Item", "Name") || m(l, "Item", "Description") || "—",
      aciklama:
        (m(l, "Item", "Name") && m(l, "Item", "Description")) || undefined,
      kod:
        m(l, "Item", "SellersItemIdentification", "ID") ||
        m(l, "Item", "BuyersItemIdentification", "ID") ||
        undefined,
      miktar: n(l, "InvoicedQuantity"),
      birim: BIRIM[birimKod] ?? birimKod,
      birimFiyat: n(l, "Price", "PriceAmount"),
      iskonto,
      tutar: n(l, "LineExtensionAmount"),
      kdvOrani: kdv?.oran,
      kdvTutari: vergi.reduce((t, v) => t + v.tutar, 0),
      not:
        hepsiAlt(l, "Note")
          .map((x) => metin(x).trim())
          .filter(Boolean)
          .join(" ") || undefined,
    };
  });
  const lmt = bul(kok, "LegalMonetaryTotal");
  let xslt: string | undefined;
  for (const r of hepsiAlt(kok, "AdditionalDocumentReference")) {
    const o = k(r, "Attachment", "EmbeddedDocumentBinaryObject");
    const ad = (o?.oz.filename ?? "").toLowerCase();
    if (
      o &&
      (ad.endsWith(".xslt") ||
        ad.endsWith(".xsl") ||
        /xslt/i.test(m(r, "DocumentType")))
    ) {
      try {
        xslt = b64Metin(metin(o));
        break;
      } catch {
        /* bozuk şablon */
      }
    }
  }
  return {
    profil: m(kok, "ProfileID"),
    tip: m(kok, "InvoiceTypeCode"),
    no: m(kok, "ID"),
    ettn: m(kok, "UUID"),
    tarih: m(kok, "IssueDate"),
    saat: m(kok, "IssueTime") || undefined,
    paraBirimi: m(kok, "DocumentCurrencyCode") || "TRY",
    kur: n(kok, "PricingExchangeRate", "CalculationRate") || undefined,
    notlar: hepsiAlt(kok, "Note")
      .map((x) => metin(x).trim())
      .filter(Boolean),
    siparisNo: m(kok, "OrderReference", "ID") || undefined,
    irsaliyeler: hepsiAlt(kok, "DespatchDocumentReference")
      .map((x) => m(x, "ID"))
      .filter(Boolean),
    satici: taraf(k(kok, "AccountingSupplierParty", "Party")),
    alici: taraf(k(kok, "AccountingCustomerParty", "Party")),
    kalemler,
    vergiler: vergiler(hepsiAlt(kok, "TaxTotal")),
    tevkifatlar: vergiler(hepsiAlt(kok, "WithholdingTaxTotal")),
    toplam: {
      malHizmet: n(lmt, "LineExtensionAmount"),
      iskonto: n(lmt, "AllowanceTotalAmount"),
      vergiHaric: n(lmt, "TaxExclusiveAmount"),
      vergiDahil: n(lmt, "TaxInclusiveAmount"),
      odenecek: n(lmt, "PayableAmount"),
    },
    xslt,
  };
}

/** XML, ZIP veya birden çok dosyadan faturaları okur. Hatalı dosyalar ayrıca listelenir. */
export async function faturalariOku(
  dosyalar: Array<{ ad: string; veri: Uint8Array }>,
): Promise<{
  faturalar: Array<{ ad: string; fatura: Fatura; xml: string }>;
  hatalar: Array<{ ad: string; mesaj: string }>;
}> {
  const faturalar: Array<{ ad: string; fatura: Fatura; xml: string }> = [];
  const hatalar: Array<{ ad: string; mesaj: string }> = [];
  const isle = (ad: string, veri: Uint8Array) => {
    try {
      const xml = new TextDecoder().decode(veri);
      faturalar.push({ ad, fatura: faturaCoz(xml), xml });
    } catch (e) {
      hatalar.push({
        ad,
        mesaj: e instanceof Error ? e.message : "Okunamadı.",
      });
    }
  };
  for (const d of dosyalar) {
    if (d.veri[0] === 0x50 && d.veri[1] === 0x4b) {
      try {
        const g = zipOku(d.veri).filter(
          (x) => !x.klasor && /\.xml$/i.test(x.ad),
        );
        if (!g.length) hatalar.push({ ad: d.ad, mesaj: "ZIP içinde XML yok." });
        for (const x of g) isle(`${d.ad} › ${x.ad}`, await x.ac());
      } catch (e) {
        hatalar.push({
          ad: d.ad,
          mesaj: e instanceof Error ? e.message : "ZIP açılamadı.",
        });
      }
    } else isle(d.ad, d.veri);
  }
  return { faturalar, hatalar };
}

const kimlik = (t: Taraf) => t.vkn ?? t.tckn ?? "";
const trTarih = (t: string) => {
  const r = /^(\d{4})-(\d{2})-(\d{2})/.exec(t);
  return r ? `${r[3]}.${r[2]}.${r[1]}` : t;
};

/** Toplu Excel için iki tablo: fatura özetleri ve kalemler. */
export function faturaTablolari(liste: Fatura[]): {
  ozet: Tablo;
  kalemler: Tablo;
} {
  const ozet: Tablo = [
    [
      "Tarih",
      "Fatura No",
      "ETTN",
      "Senaryo",
      "Tip",
      "Satıcı",
      "Satıcı VKN/TCKN",
      "Alıcı",
      "Alıcı VKN/TCKN",
      "Para Birimi",
      "Mal/Hizmet Toplamı",
      "İskonto",
      "Vergiler Hariç",
      "KDV",
      "Diğer Vergiler",
      "Tevkifat",
      "Vergiler Dahil",
      "Ödenecek",
    ],
  ];
  const kalemler: Tablo = [
    [
      "Tarih",
      "Fatura No",
      "Satıcı",
      "Alıcı",
      "Sıra",
      "Mal/Hizmet",
      "Kod",
      "Miktar",
      "Birim",
      "Birim Fiyat",
      "İskonto",
      "KDV %",
      "KDV Tutarı",
      "Tutar",
      "Para Birimi",
    ],
  ];
  for (const f of liste) {
    const kdv = f.vergiler
      .filter((v) => v.kod === "0015")
      .reduce((t, v) => t + v.tutar, 0);
    const diger = f.vergiler
      .filter((v) => v.kod !== "0015")
      .reduce((t, v) => t + v.tutar, 0);
    ozet.push([
      trTarih(f.tarih),
      f.no,
      f.ettn,
      f.profil,
      f.tip,
      f.satici.unvan,
      kimlik(f.satici),
      f.alici.unvan,
      kimlik(f.alici),
      f.paraBirimi,
      f.toplam.malHizmet,
      f.toplam.iskonto,
      f.toplam.vergiHaric,
      kdv,
      diger,
      f.tevkifatlar.reduce((t, v) => t + v.tutar, 0),
      f.toplam.vergiDahil,
      f.toplam.odenecek,
    ]);
    for (const l of f.kalemler)
      kalemler.push([
        trTarih(f.tarih),
        f.no,
        f.satici.unvan,
        f.alici.unvan,
        l.sira,
        l.ad,
        l.kod ?? "",
        l.miktar,
        l.birim,
        l.birimFiyat,
        l.iskonto,
        l.kdvOrani ?? null,
        l.kdvTutari,
        l.tutar,
        f.paraBirimi,
      ]);
  }
  return { ozet, kalemler };
}

const kac = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function para(v: number, birim = "TRY") {
  const s = v.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return birim === "TRY" ? `${s} TL` : `${s} ${birim}`;
}

const TIP: Record<string, string> = {
  SATIS: "Satış",
  IADE: "İade",
  TEVKIFAT: "Tevkifat",
  ISTISNA: "İstisna",
  OZELMATRAH: "Özel Matrah",
  IHRACKAYITLI: "İhraç Kayıtlı",
  SGK: "SGK",
  KOMISYONCU: "Komisyoncu",
  KONAKLAMAVERGISI: "Konaklama Vergisi",
};
const PROFIL: Record<string, string> = {
  TEMELFATURA: "Temel e-Fatura",
  TICARIFATURA: "Ticari e-Fatura",
  EARSIVFATURA: "e-Arşiv Fatura",
  IHRACAT: "İhracat",
  YOLCUBERABERFATURA: "Yolcu Beraber",
  KAMU: "Kamu",
};

/** Faturanın okunaklı, yazdırılabilir HTML görünümü (sitenin kendi şablonu). */
export function faturaHtml(f: Fatura) {
  const p = (v: number) => kac(para(v, f.paraBirimi));
  const tarafHtml = (
    baslik: string,
    t: Taraf,
  ) => `<div class="taraf"><h3>${baslik}</h3>
<b>${kac(t.unvan)}</b>
${t.adres ? `<div>${kac(t.adres)}</div>` : ""}
${t.vergiDairesi ? `<div>Vergi Dairesi: ${kac(t.vergiDairesi)}</div>` : ""}
${t.vkn ? `<div>VKN: ${kac(t.vkn)}</div>` : ""}${t.tckn ? `<div>TCKN: ${kac(t.tckn)}</div>` : ""}
${t.digerKimlik.map(([s, v]) => `<div>${kac(s)}: ${kac(v)}</div>`).join("")}
${t.telefon ? `<div>Tel: ${kac(t.telefon)}</div>` : ""}${t.eposta ? `<div>E-posta: ${kac(t.eposta)}</div>` : ""}${t.web ? `<div>Web: ${kac(t.web)}</div>` : ""}
</div>`;
  const satirlar = f.kalemler
    .map(
      (l) =>
        `<tr><td>${kac(l.sira)}</td><td>${kac(l.ad)}${l.aciklama ? `<small>${kac(l.aciklama)}</small>` : ""}${l.not ? `<small>${kac(l.not)}</small>` : ""}</td><td class="s">${l.miktar.toLocaleString("tr-TR", { maximumFractionDigits: 6 })} ${kac(l.birim)}</td><td class="s">${p(l.birimFiyat)}</td><td class="s">${l.iskonto ? p(l.iskonto) : ""}</td><td class="s">${l.kdvOrani !== undefined ? `%${l.kdvOrani.toLocaleString("tr-TR")}` : ""}</td><td class="s">${p(l.kdvTutari)}</td><td class="s">${p(l.tutar)}</td></tr>`,
    )
    .join("");
  const toplamSatir = (ad: string, v: number, kalin = false) =>
    `<tr${kalin ? ' class="kalin"' : ""}><th>${kac(ad)}</th><td>${p(v)}</td></tr>`;
  const vergiSatir = (v: Vergi, tevkifat = false) =>
    toplamSatir(
      `${tevkifat ? "Tevkifat" : "Hesaplanan"} ${v.ad}${v.oran !== undefined ? ` (%${v.oran.toLocaleString("tr-TR")})` : ""}`,
      v.tutar,
    );
  return `<!doctype html><html lang="tr"><head><meta charset="utf-8"><title>Fatura ${kac(f.no)}</title><style>
@page{size:A4;margin:12mm}
html{background:#e9ecef}body{margin:0;font:13px/1.45 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;color:#111}
.sayfa{background:#fff;max-width:210mm;margin:16px auto;padding:14mm;box-sizing:border-box;box-shadow:0 1px 6px rgba(0,0,0,.18)}
.ust{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;border-bottom:2px solid #111;padding-bottom:10px;margin-bottom:12px}
h1{font-size:22px;margin:0}h3{font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:#555;margin:0 0 4px}
.bilgi{border-collapse:collapse}.bilgi th{text-align:left;padding:2px 10px 2px 0;color:#555;font-weight:600}.bilgi td{padding:2px 0}
.taraflar{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:14px}.taraf{border:1px solid #ddd;border-radius:6px;padding:10px}
table.kalem{width:100%;border-collapse:collapse;margin:8px 0}table.kalem th,table.kalem td{border-bottom:1px solid #ddd;padding:5px 6px;vertical-align:top;text-align:left}
table.kalem th{background:#f3f4f6;font-size:12px}.s{text-align:right!important;white-space:nowrap}small{display:block;color:#666}
.toplam{margin-left:auto;border-collapse:collapse;min-width:280px}.toplam th{text-align:left;font-weight:500;padding:3px 12px 3px 0}.toplam td{text-align:right;padding:3px 0;white-space:nowrap}
.toplam .kalin th,.toplam .kalin td{font-weight:700;border-top:2px solid #111;padding-top:6px}
.notlar{margin-top:14px;padding:10px;background:#f8f9fa;border-radius:6px;white-space:pre-wrap}
.ettn{font-family:ui-monospace,monospace;font-size:12px}
@media (max-width:640px){.sayfa{margin:0;padding:16px;box-shadow:none}.taraflar{grid-template-columns:1fr}table.kalem{font-size:11px}}
@media print{html{background:#fff}.sayfa{margin:0;padding:0;box-shadow:none;max-width:none}}
</style></head><body><div class="sayfa">
<div class="ust"><div><h1>${kac(PROFIL[f.profil] ?? (f.profil || "Fatura"))}</h1><div>${kac(TIP[f.tip] ?? f.tip)} faturası</div></div>
<table class="bilgi"><tr><th>Fatura No</th><td>${kac(f.no)}</td></tr><tr><th>Tarih</th><td>${kac(trTarih(f.tarih))}${f.saat ? ` ${kac(f.saat.slice(0, 5))}` : ""}</td></tr><tr><th>ETTN</th><td class="ettn">${kac(f.ettn)}</td></tr>${f.siparisNo ? `<tr><th>Sipariş No</th><td>${kac(f.siparisNo)}</td></tr>` : ""}${f.irsaliyeler.length ? `<tr><th>İrsaliye</th><td>${kac(f.irsaliyeler.join(", "))}</td></tr>` : ""}${f.kur ? `<tr><th>Kur</th><td>${f.kur.toLocaleString("tr-TR", { maximumFractionDigits: 6 })}</td></tr>` : ""}</table></div>
<div class="taraflar">${tarafHtml("Satıcı", f.satici)}${tarafHtml("Alıcı", f.alici)}</div>
<table class="kalem"><thead><tr><th>#</th><th>Mal / Hizmet</th><th class="s">Miktar</th><th class="s">Birim Fiyat</th><th class="s">İskonto</th><th class="s">KDV</th><th class="s">KDV Tutarı</th><th class="s">Tutar</th></tr></thead><tbody>${satirlar}</tbody></table>
<table class="toplam">${toplamSatir("Mal / Hizmet Toplamı", f.toplam.malHizmet)}${f.toplam.iskonto ? toplamSatir("Toplam İskonto", f.toplam.iskonto) : ""}${f.vergiler.map((v) => vergiSatir(v)).join("")}${f.tevkifatlar.map((v) => vergiSatir(v, true)).join("")}${toplamSatir("Vergiler Dahil Toplam", f.toplam.vergiDahil)}${toplamSatir("Ödenecek Tutar", f.toplam.odenecek, true)}</table>
${f.notlar.length ? `<div class="notlar"><h3>Notlar</h3>${f.notlar.map(kac).join("\n")}</div>` : ""}
</div></body></html>`;
}

/** Aynı ETTN'li faturaları ayıklar (ZIP + ayrı XML birlikte seçildiğinde). */
export function tekillestir<T extends { fatura: Fatura }>(l: T[]): T[] {
  const gorulen = new Set<string>();
  return l.filter((x) => {
    const a = x.fatura.ettn || `${x.fatura.no}|${x.fatura.tarih}`;
    if (gorulen.has(a)) return false;
    gorulen.add(a);
    return true;
  });
}
