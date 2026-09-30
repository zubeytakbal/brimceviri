// e-İmzalı dosya (.imz, .p7s, .p7m — CAdES / CMS SignedData) çözücü.
// İmzalanan asıl dosyayı çıkarır, imzacı sertifikasını okur ve imzayı WebCrypto ile
// matematiksel olarak doğrular. Sertifika zinciri ve iptal (OCSP/SİL) durumu denetlenmez.
import {
  asn1Oku,
  hex,
  icerik,
  ham,
  metinDegeri,
  oid,
  oktet,
  zaman,
  type Asn1,
} from "./asn1";

const OID = {
  signedData: "1.2.840.113549.1.7.2",
  data: "1.2.840.113549.1.7.1",
  messageDigest: "1.2.840.113549.1.9.4",
  signingTime: "1.2.840.113549.1.9.5",
  counterSignature: "1.2.840.113549.1.9.6",
  timeStamp: "1.2.840.113549.1.9.16.2.14",
  rsa: "1.2.840.113549.1.1.1",
  rsaPss: "1.2.840.113549.1.1.10",
  ec: "1.2.840.10045.2.1",
  ski: "2.5.29.14",
};

const OZET: Record<string, string> = {
  "1.3.14.3.2.26": "SHA-1",
  "2.16.840.1.101.3.4.2.1": "SHA-256",
  "2.16.840.1.101.3.4.2.2": "SHA-384",
  "2.16.840.1.101.3.4.2.3": "SHA-512",
  // imza algoritması OID'lerinden özet
  "1.2.840.113549.1.1.5": "SHA-1",
  "1.2.840.113549.1.1.11": "SHA-256",
  "1.2.840.113549.1.1.12": "SHA-384",
  "1.2.840.113549.1.1.13": "SHA-512",
  "1.2.840.10045.4.1": "SHA-1",
  "1.2.840.10045.4.3.2": "SHA-256",
  "1.2.840.10045.4.3.3": "SHA-384",
  "1.2.840.10045.4.3.4": "SHA-512",
};

const EGRI: Record<string, [string, number]> = {
  "1.2.840.10045.3.1.7": ["P-256", 32],
  "1.3.132.0.34": ["P-384", 48],
  "1.3.132.0.35": ["P-521", 66],
};

const AD_ALANI: Record<string, string> = {
  "2.5.4.3": "CN",
  "2.5.4.5": "serialNumber",
  "2.5.4.6": "C",
  "2.5.4.7": "L",
  "2.5.4.10": "O",
  "2.5.4.11": "OU",
  "2.5.4.4": "SN",
  "2.5.4.42": "GN",
  "1.2.840.113549.1.9.1": "E",
};

export type Sertifika = {
  ad: string;
  /** Konu alanındaki seri numarası (Türk nitelikli sertifikalarında genellikle TCKN) */
  seriAlan?: string;
  kurum?: string;
  ulke?: string;
  eposta?: string;
  yayinci: string;
  baslangic: Date | null;
  bitis: Date | null;
  seriNo: string;
  ski?: string;
  anahtar: { tur: "RSA" | "EC" | "?"; egri?: string; bit?: number };
  spki: Uint8Array;
};

export type ImzaSonuc =
  | "gecerli"
  | "gecersiz"
  | "dogrulanamadi"
  | "asilGerekli";

export type Imzaci = {
  sertifika?: Sertifika;
  imzaZamani?: Date;
  zamanDamgasi?: Date;
  ozetAlg: string;
  /** Asıl dosyanın özeti imzadakiyle eşleşiyor mu (asıl dosya yoksa undefined) */
  ozetEslesiyor?: boolean;
  sonuc: ImzaSonuc;
  /** Bu imzayı onaylayan seri (karşı) imzalar */
  seriImzalar: Imzaci[];
  /** Kaçıncı sarmal katmanda (iç içe imzalama) */
  katman: number;
};

export type ImzaPaketi = {
  /** İmzalanan asıl dosya; ayrık imzada yoktur */
  icerik?: Uint8Array;
  ayrik: boolean;
  imzacilar: Imzaci[];
  sertifikalar: Sertifika[];
};

/** PEM veya düz Base64 olarak kaydedilmiş imzayı ikiliye çevirir. */
export function ikiliyeCevir(v: Uint8Array): Uint8Array {
  if (v[0] === 0x30) return v;
  const bas = v.subarray(0, 4096);
  if (
    !bas.every((x) => x === 9 || x === 10 || x === 13 || (x >= 32 && x < 127))
  )
    return v;
  let s = new TextDecoder().decode(v);
  s = s.replace(/-----(BEGIN|END)[^-]*-----/g, "").replace(/\s+/g, "");
  if (!/^[A-Za-z0-9+/]+=*$/.test(s)) return v;
  try {
    const b = atob(s);
    const out = new Uint8Array(b.length);
    for (let i = 0; i < b.length; i++) out[i] = b.charCodeAt(i);
    return out;
  } catch {
    return v;
  }
}

function adCoz(a: Asn1): Record<string, string> {
  const out: Record<string, string> = {};
  for (const set of a.cocuk)
    for (const s of set.cocuk) {
      if (s.cocuk.length < 2) continue;
      const k = AD_ALANI[oid(s.cocuk[0])];
      if (k && !out[k]) out[k] = metinDegeri(s.cocuk[1]).trim();
    }
  return out;
}

const adMetni = (n: Record<string, string>) =>
  n.CN || [n.GN, n.SN].filter(Boolean).join(" ") || n.O || n.OU || "";

export function sertifikaCoz(c: Asn1): Sertifika | null {
  const tbs = c.cocuk[0];
  if (!tbs || tbs.etiket !== 0x30) return null;
  const k = tbs.cocuk[0]?.etiket === 0xa0 ? 1 : 0;
  const [seri, , yayinci, gecerlilik, konu, spki] = tbs.cocuk.slice(k);
  if (!spki) return null;
  const n = adCoz(konu);
  const y = adCoz(yayinci);
  let ski: string | undefined;
  const uzanti = tbs.cocuk.find((x) => x.etiket === 0xa3);
  for (const e of uzanti?.cocuk[0]?.cocuk ?? [])
    if (oid(e.cocuk[0]) === OID.ski) {
      try {
        ski = hex(icerik(asn1Oku(oktet(e.cocuk[e.cocuk.length - 1]))));
      } catch {
        /* yok say */
      }
    }
  const alg = spki.cocuk[0];
  const algOid = oid(alg.cocuk[0]);
  let anahtar: Sertifika["anahtar"] = { tur: "?" };
  if (algOid === OID.rsa) {
    try {
      const bit = icerik(spki.cocuk[1]).subarray(1);
      const mod = icerik(asn1Oku(bit).cocuk[0]);
      anahtar = {
        tur: "RSA",
        bit: (mod.length - (mod[0] === 0 ? 1 : 0)) * 8,
      };
    } catch {
      anahtar = { tur: "RSA" };
    }
  } else if (algOid === OID.ec) {
    const e = alg.cocuk[1] ? EGRI[oid(alg.cocuk[1])] : undefined;
    anahtar = { tur: "EC", egri: e?.[0] };
  }
  return {
    ad: adMetni(n),
    seriAlan: n.serialNumber,
    kurum: n.O,
    ulke: n.C,
    eposta: n.E,
    yayinci: adMetni(y),
    baslangic: gecerlilik?.cocuk[0] ? zaman(gecerlilik.cocuk[0]) : null,
    bitis: gecerlilik?.cocuk[1] ? zaman(gecerlilik.cocuk[1]) : null,
    seriNo: hex(icerik(seri)).replace(/^00/, ""),
    ski,
    anahtar,
    spki: ham(spki).slice(),
  };
}

async function ozet(alg: string, veri: Uint8Array) {
  return new Uint8Array(await crypto.subtle.digest(alg, veri as BufferSource));
}

const esit = (a: Uint8Array, b: Uint8Array) =>
  a.length === b.length && a.every((x, i) => x === b[i]);

/** DER ECDSA imzasını (SEQUENCE{r,s}) WebCrypto'nun r||s biçimine çevirir. */
function ecdsaHam(der: Uint8Array, boy: number) {
  const s = asn1Oku(der);
  const out = new Uint8Array(boy * 2);
  s.cocuk.slice(0, 2).forEach((x, i) => {
    let b = icerik(x);
    while (b.length > boy && b[0] === 0) b = b.subarray(1);
    out.set(b, i * boy + (boy - b.length));
  });
  return out;
}

async function imzaDogrula(
  sert: Sertifika,
  imzaAlgOid: string,
  ozetAlg: string,
  veri: Uint8Array,
  imza: Uint8Array,
): Promise<ImzaSonuc> {
  if (imzaAlgOid === OID.rsaPss) return "dogrulanamadi";
  try {
    if (sert.anahtar.tur === "RSA") {
      const k = await crypto.subtle.importKey(
        "spki",
        sert.spki as BufferSource,
        { name: "RSASSA-PKCS1-v1_5", hash: ozetAlg },
        false,
        ["verify"],
      );
      return (await crypto.subtle.verify(
        "RSASSA-PKCS1-v1_5",
        k,
        imza as BufferSource,
        veri as BufferSource,
      ))
        ? "gecerli"
        : "gecersiz";
    }
    if (sert.anahtar.tur === "EC" && sert.anahtar.egri) {
      const boy = Object.values(EGRI).find(
        ([e]) => e === sert.anahtar.egri,
      )![1];
      const k = await crypto.subtle.importKey(
        "spki",
        sert.spki as BufferSource,
        { name: "ECDSA", namedCurve: sert.anahtar.egri },
        false,
        ["verify"],
      );
      return (await crypto.subtle.verify(
        { name: "ECDSA", hash: ozetAlg },
        k,
        ecdsaHam(imza, boy) as BufferSource,
        veri as BufferSource,
      ))
        ? "gecerli"
        : "gecersiz";
    }
  } catch {
    return "dogrulanamadi";
  }
  return "dogrulanamadi";
}

function nitelik(attrs: Asn1 | undefined, o: string) {
  return attrs?.cocuk.find((a) => oid(a.cocuk[0]) === o)?.cocuk[1]?.cocuk;
}

async function imzaciCoz(
  si: Asn1,
  sertifikalar: Sertifika[],
  icerikVeri: Uint8Array | undefined,
  katman: number,
): Promise<Imzaci> {
  const c = si.cocuk;
  const sid = c[1];
  let sert: Sertifika | undefined;
  if (sid.etiket === 0x30) {
    const seri = hex(icerik(sid.cocuk[1])).replace(/^00/, "");
    sert = sertifikalar.find((s) => s.seriNo === seri);
  } else if (sid.etiket === 0x80) {
    const ski = hex(icerik(sid));
    sert = sertifikalar.find((s) => s.ski === ski);
  }
  if (!sert && sertifikalar.length === 1) sert = sertifikalar[0];
  const ozetAlg = OZET[oid(c[2].cocuk[0])] ?? "SHA-256";
  let i = 3;
  const imzaliNit = c[i]?.etiket === 0xa0 ? c[i++] : undefined;
  const imzaAlg = c[i++];
  const imzaDegeri = oktet(c[i++]);
  const imzasizNit = c[i]?.etiket === 0xa1 ? c[i] : undefined;

  let imzaZamani: Date | undefined;
  const st = nitelik(imzaliNit, OID.signingTime)?.[0];
  if (st) imzaZamani = zaman(st) ?? undefined;

  let ozetEslesiyor: boolean | undefined;
  let sonuc: ImzaSonuc = "dogrulanamadi";
  let imzalanan: Uint8Array | undefined;
  if (imzaliNit) {
    // İmzalı nitelikler [0] yerine SET (0x31) etiketiyle imzalanır
    imzalanan = ham(imzaliNit).slice();
    imzalanan[0] = 0x31;
    const md = nitelik(imzaliNit, OID.messageDigest)?.[0];
    if (md && icerikVeri)
      ozetEslesiyor = esit(oktet(md), await ozet(ozetAlg, icerikVeri));
  } else if (icerikVeri) imzalanan = icerikVeri;
  if (sert && imzalanan) {
    const algOid = oid(imzaAlg.cocuk[0]);
    sonuc = await imzaDogrula(
      sert,
      algOid,
      OZET[algOid] ?? ozetAlg,
      imzalanan,
      imzaDegeri,
    );
    if (ozetEslesiyor === false) sonuc = "gecersiz";
    // Ayrık imzada asıl dosya yoksa yalnızca imzalı nitelikler doğrulanmıştır
    else if (sonuc === "gecerli" && !icerikVeri) sonuc = "asilGerekli";
  }

  let zamanDamgasi: Date | undefined;
  const ts = nitelik(imzasizNit, OID.timeStamp)?.[0];
  if (ts) {
    try {
      const sd = ts.cocuk[1].cocuk[0];
      const eci = sd.cocuk.find(
        (x, k) => k > 0 && x.etiket === 0x30 && x.cocuk[0]?.etiket === 0x06,
      );
      const tst = asn1Oku(oktet(eci!.cocuk[1].cocuk[0]));
      const gt = tst.cocuk.find((x) => x.etiket === 0x18);
      if (gt) zamanDamgasi = zaman(gt) ?? undefined;
    } catch {
      /* zaman damgası okunamadı */
    }
  }

  const seriImzalar: Imzaci[] = [];
  for (const k of nitelik(imzasizNit, OID.counterSignature) ?? [])
    seriImzalar.push(await imzaciCoz(k, sertifikalar, imzaDegeri, katman));

  return {
    sertifika: sert,
    imzaZamani,
    zamanDamgasi,
    ozetAlg,
    ozetEslesiyor,
    sonuc,
    seriImzalar,
    katman,
  };
}

function signedDataBul(v: Uint8Array): Asn1 | null {
  let k: Asn1;
  try {
    k = asn1Oku(v);
  } catch {
    return null;
  }
  if (k.etiket !== 0x30 || k.cocuk.length < 2) return null;
  if (k.cocuk[0].etiket !== 0x06 || oid(k.cocuk[0]) !== OID.signedData)
    return null;
  return k.cocuk[1]?.cocuk[0] ?? null;
}

/**
 * İmzalı dosyayı çözer. `asil` verilirse (ayrık imzada imzalanan dosya) özet onunla denetlenir.
 * İç içe imzalanmış (imzalı dosyanın tekrar imzalandığı) paketler katman katman açılır.
 */
export async function imzaCoz(
  veri: Uint8Array,
  asil?: Uint8Array,
): Promise<ImzaPaketi> {
  let sd: Asn1 | null = signedDataBul(ikiliyeCevir(veri));
  if (!sd)
    throw new Error(
      "Bu dosya bir e-imza (CAdES/PKCS#7) dosyası değil. PDF içine gömülü imzalar (PAdES) için PDF'i doğrudan açın.",
    );
  const imzacilar: Imzaci[] = [];
  const tumSertifikalar: Sertifika[] = [];
  let icerikVeri: Uint8Array | undefined;
  let ayrik = false;
  for (let katman = 1; sd && katman <= 10; katman++) {
    const c: Asn1[] = sd.cocuk;
    const eci = c[2];
    const eicerik = eci?.cocuk[1]?.cocuk[0];
    icerikVeri = eicerik ? oktet(eicerik) : undefined;
    ayrik = !icerikVeri;
    if (ayrik && asil) icerikVeri = asil;
    const sertifikalar: Sertifika[] = [];
    const sertBlok = c.find((x) => x.etiket === 0xa0);
    for (const s of sertBlok?.cocuk ?? []) {
      const z = s.etiket === 0x30 ? sertifikaCoz(s) : null;
      if (z) sertifikalar.push(z);
    }
    tumSertifikalar.push(...sertifikalar);
    const siSet = c[c.length - 1];
    if (siSet?.etiket === 0x31)
      for (const si of siSet.cocuk)
        imzacilar.push(await imzaciCoz(si, sertifikalar, icerikVeri, katman));
    // imzalanan içerik yine bir imzalı dosyaysa (seri imza) içini aç
    sd = icerikVeri && !ayrik ? signedDataBul(icerikVeri) : null;
  }
  return {
    icerik: ayrik ? undefined : icerikVeri,
    ayrik,
    imzacilar,
    sertifikalar: tumSertifikalar,
  };
}

export type DosyaTuru = { uzanti: string; mime: string; ad: string };

/** Dosyanın ilk baytlarından türünü tahmin eder. */
export function dosyaTuru(v: Uint8Array): DosyaTuru {
  const s = new TextDecoder("latin1").decode(v.subarray(0, 2048));
  if (s.startsWith("%PDF"))
    return { uzanti: "pdf", mime: "application/pdf", ad: "PDF belgesi" };
  if (s.startsWith("PK\u0003\u0004")) {
    if (s.includes("content.xml") && !s.includes("mimetype"))
      return {
        uzanti: "udf",
        mime: "application/octet-stream",
        ad: "UYAP UDF belgesi",
      };
    if (s.includes("word/"))
      return {
        uzanti: "docx",
        mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ad: "Word belgesi",
      };
    if (s.includes("xl/"))
      return {
        uzanti: "xlsx",
        mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ad: "Excel tablosu",
      };
    if (s.includes("Ustveri") || s.includes("UstYazi"))
      return {
        uzanti: "eyp",
        mime: "application/octet-stream",
        ad: "e-Yazışma Paketi",
      };
    return { uzanti: "zip", mime: "application/zip", ad: "ZIP arşivi" };
  }
  if (v[0] === 0xff && v[1] === 0xd8)
    return { uzanti: "jpg", mime: "image/jpeg", ad: "JPG görsel" };
  if (v[0] === 0x89 && v[1] === 0x50)
    return { uzanti: "png", mime: "image/png", ad: "PNG görsel" };
  if (s.startsWith("II*\u0000") || s.startsWith("MM\u0000*"))
    return { uzanti: "tif", mime: "image/tiff", ad: "TIFF görsel" };
  if (s.startsWith("ÐÏ\u0011à"))
    return {
      uzanti: "doc",
      mime: "application/msword",
      ad: "Eski Office belgesi",
    };
  if (s.startsWith("{\\rtf"))
    return { uzanti: "rtf", mime: "application/rtf", ad: "RTF belgesi" };
  if (/^\s*(﻿)?<\?xml|^\s*</.test(s))
    return { uzanti: "xml", mime: "application/xml", ad: "XML belgesi" };
  if (signedDataBul(v))
    return {
      uzanti: "imz",
      mime: "application/pkcs7-mime",
      ad: "İmzalı dosya",
    };
  try {
    new TextDecoder("utf-8", { fatal: true }).decode(v.subarray(0, 4096));
    return { uzanti: "txt", mime: "text/plain", ad: "Metin" };
  } catch {
    return { uzanti: "bin", mime: "application/octet-stream", ad: "Dosya" };
  }
}

/** "sozlesme.pdf.imz" → "sozlesme.pdf"; uzantı yoksa içerikten tahmin eder. */
export function asilAd(dosyaAdi: string, tur: DosyaTuru) {
  const ic = dosyaAdi.replace(/\.(imz|p7s|p7m|p7b|sgn)$/i, "");
  if (ic === dosyaAdi) return `${ic.replace(/\.[^.]*$/, "")}.${tur.uzanti}`;
  return /\.[a-z0-9]{2,5}$/i.test(ic) ? ic : `${ic}.${tur.uzanti}`;
}
